# 03 — User Roles & Permissions (Hồng Hạc City)

**Version:** 3.0 | **Last updated:** 2026-05-16 | **Status:** Approved

---

## §0. Implementation Contract References

File này là SSOT cho role/permission, nhưng khi implement UI/API liên quan quyền phải kéo thêm contract sau:

| Topic | Required contract |
|---|---|
| Server-side auth/forbidden response | `06 §4.0` |
| PII reveal/export/hard delete audit | `03 §4`, `05 §5.2`, `13` |
| Confirm modal/focus/keyboard | `07 §10.1–10.3` |
| Idempotent submit/action retry | `05 §5.3`, `02 §5.1` |
| Admin list/query permissions | `05 §5.1`, `05 §5.5`, `10` |

---

## §1. Roles

| Role | Mô tả | Portal truy cập |
|---|---|---|
| `visitor` | Khách ẩn danh — xem public pages, submit lead form | Public website |
| `sales_agent` | Nhân viên bán hàng — xem leads được gán, cập nhật status | `/broker` portal |
| `admin_content` | Quản lý content, leads, inventory, export | `/portals/admin` |
| `super_admin` | Full access: settings, security, telemetry, hard-delete | `/portals/admin` |

> Thuật ngữ `sales_agent` = nhân viên trong hệ thống. Trong `/broker` portal, giao diện có thể hiển thị "Chào [tên]" nhưng code và DB luôn dùng `sales_agent`. Xem `00 §3`.

---

## §2. Permission Matrix

| Permission | visitor | sales_agent | admin_content | super_admin |
|---|---|---|---|---|
| Xem public pages | ✅ | ✅ | ✅ | ✅ |
| Submit lead form | ✅ | — | — | — |
| Xem leads được gán | — | ✅ | — | — |
| Xem tất cả leads | — | — | ✅ | ✅ |
| `lead.update.status` | — | ✅ (assigned only) | ✅ | ✅ |
| `lead.update.score` (manual override) | — | — | ✅ | ✅ |
| `lead.update.routed_to` | — | — | ✅ | ✅ |
| `lead.archive` (soft delete) | — | — | ✅ | ✅ |
| `lead.hard_delete_emergency` | — | — | ❌ | ✅ |
| `lead.export_csv` | — | — | ✅ (rate-limited) | ✅ |
| `content.create_edit_publish` | — | — | ✅ | ✅ |
| `content.revalidate` | — | — | ✅ | ✅ |
| `inventory.update_status` | — | — | ✅ | ✅ |
| `telemetry.read_aggregated` | — | — | ✅ | ✅ |
| `telemetry.read_raw` | — | — | — | ✅ |
| `telemetry.snapshot_redacted` | — | — | — | ✅ |
| `tileaccess.revoke_jti` | — | — | — | ✅ |
| `settings.security` | — | — | — | ✅ |
| `users.manage` | — | — | — | ✅ |

### §2.1. Permission Clarifications

RBAC mặc định là **deny-by-default**. Ẩn nút trên UI không đủ; mọi API mutation phải kiểm tra role/permission phía server.

| Action | Required role/permission | Notes |
|---|---|---|
| Publish/unpublish public content | `content.create_edit_publish` | Phải ghi audit log và trigger revalidate |
| Approve public media | `content.create_edit_publish` | Media chưa approved không được dùng làm public claim |
| Review/update `bank_rates` | `content.create_edit_publish` hoặc `settings.security` | Phải lưu source, review date, reviewer |
| Archive `bank_rates` | `content.create_edit_publish` hoặc `settings.security` | Không hard delete trong UI thường |
| Bulk inventory update | `inventory.update_status` | Required dry-run preview + audit log |
| PII reveal | `lead.update.status` với lead được phép xem, hoặc admin role | Required reason ≥10 chars + audit log |
| Export leads | `lead.export_csv` | Async job nếu vượt limit tại `05 §5.1`; rate-limited |
| Read audit logs | `admin_content` hoặc `super_admin` | `admin_content` không xem raw security telemetry |
| Reset super_admin 2FA | `settings.security` + `users.manage` | super_admin only |
| Emergency hard delete | `lead.hard_delete_emergency` | super_admin only; theo §4.1 |

Nếu một action không nằm trong matrix này hoặc §2, dev/AI phải mặc định là **không được phép** cho đến khi spec được cập nhật.

---

## §3. Authentication Rules

| Rule | Chi tiết |
|---|---|
| Admin login URL | `/portals/admin/login` |
| Broker login URL | `/broker/login` |
| Auth method | Firebase Email Auth |
| Session timeout | Admin = 8h; Broker = 4h |
| 2FA | Bắt buộc `super_admin` (TOTP) |
| Unauthorized redirect | `?reason=auth` — KHÔNG tiết lộ admin URL tồn tại |
| Anonymous visitor | Firebase Anonymous Auth (dùng cho tile token request, không cho lead) |

**Edge cases:**
- Session hết hạn khi đang ở giữa form → preserve form data trong sessionStorage, redirect login, sau login restore
- 2FA code sai 3 lần liên tiếp → lock account 15 phút, notify `COMPLIANCE_OFFICER_EMAIL`
- Admin bị remove khỏi hệ thống khi đang có session → next request trả 401, redirect login

---

## §4. Action Details

### §4.1. `lead.hard_delete_emergency` (super_admin only)

**Requirements (tất cả phải thỏa mãn trước khi execute):**
1. 2-step confirm modal với typing confirmation
2. Lý do ≥ 50 ký tự (free text)
3. Upload reference văn bản pháp lý (signed URL từ GCS trước khi submit)
4. Audit log bắt buộc với `evidence_document_url`
5. Email notification → `COMPLIANCE_OFFICER_EMAIL` ngay sau execute

**Edge cases:**
- GCS upload fail → block action, hiện error "Vui lòng tải lại tài liệu pháp lý"
- Email notification fail → log error vào Sentry, KHÔNG rollback delete (action đã committed)
- Lead không tồn tại (already deleted) → 404 response, log attempt vào audit

### §4.2. `lead.export_csv` — Export Rules (SSOT)

| Rule | admin_content | super_admin |
|---|---|---|
| Rate limit | 1 lần/giờ | Không giới hạn |
| Max records/lần | 5.000 | 5.000 |
| Encryption | AES-256 zip | AES-256 zip |
| Audit log | Bắt buộc | Bắt buộc |
| Lý do export | ≥ 20 ký tự | ≥ 20 ký tự |

**File watermark bắt buộc (3 fields thêm vào mỗi row):**
- `_exported_at`: ISO 8601 timestamp
- `_exported_by_email_hash`: SHA-256 8 chars
- `_export_id`: UUIDv4

**Edge cases:**
- Query trả > 5.000 records → truncate + hiện warning "Kết quả bị giới hạn 5.000 records. Dùng filter để thu hẹp."
- Export đang chạy (>30s) → async job, notify qua email khi xong
- `admin_content` gọi trong cooldown 1h → 429 response với `retry_after` header

### §4.3. `content.revalidate` (admin_content + super_admin)

- Rate limit: 10 lần/phút/admin
- Audit log bắt buộc: `{actor_email_hash, paths, tags, reason, ts, result_status, ip_hash}`
- Lý do ≥ 10 ký tự bắt buộc
- `sales_agent` KHÔNG thấy nút revalidate

**Edge cases:**
- Revalidate webhook secret sai → 403, log vào security telemetry
- ISR revalidation timeout (Vercel >10s) → hiện "Đang xử lý..." + polling status, tối đa 30s
- Revalidate thành công nhưng page vẫn stale (Vercel edge cache lag) → hiện link "Kiểm tra trang" để admin verify thủ công

---

## §5. Security Telemetry Panel Access

| Role | Quyền xem | Export |
|---|---|---|
| `admin_content` | Aggregated counters (turnstile_failed, rate_limited, top error routes) — không raw logs | ❌ |
| `super_admin` | Raw redacted telemetry (`telemetry.read_raw`) + snapshot (`telemetry.snapshot_redacted`) | ✅ (snapshot only) |

**Rules:**
- Telemetry panel KHÔNG đặt chung với marketing/CPL dashboard (tab riêng)
- CẤM dùng telemetry để tính KPI hoặc lead score
- Raw telemetry không chứa PII — chỉ IP hash, JTI hash, error codes
