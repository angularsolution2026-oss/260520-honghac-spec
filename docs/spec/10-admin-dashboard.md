# 10 — Admin Dashboard (Hồng Hạc City)

**Version:** 3.0 | **Last updated:** 2026-05-16 | **Status:** Approved

---

## §0. Implementation Contract References

Admin dashboard touches PII, permissions, tables, status updates and async jobs. Implementation must apply:

| Topic | Required contract |
|---|---|
| RBAC/server-side authorization | `03 §2.1`, `06 §4.0` |
| Admin table/Kanban/query/index | `05 §5.1`, `05 §5.5` |
| Status update/audit/transaction | `05 §5.3`, `05 §5.6`, `03 §4` |
| PII reveal/export/delete | `03 §4`, `05 §5.2`, `13` |
| Loading/error/offline/rollback/modal a11y | `07 §10.1–10.4` |
| Revalidate/export/cron/job/webhook | `02 §5.1–5.2`, `06 §4.4` |
| Feature flags/admin-only rollout | `02 §5.3`, `17 §8` |

Admin task cannot be marked complete with build-only evidence; it needs permission, audit, UI state and Firestore/Payload persistence evidence.

---

## §1. Mục Đích & Tech

Dành cho `admin_content` và `super_admin`. Tech: Recharts + TanStack Table.

**Data source:** Firestore (SSOT leads) — xem `05 §1.1`.
KHÔNG dùng Payload mirror làm source chính cho leads.

---

## §2. Core Panels

### §2.1. Lead Management & Scoring

- Danh sách leads từ mọi surfaces
- Kanban view theo `lead_status` + Table view
- Server-side pagination: 50 records/page
- Lead scoring: tự động theo formula `08 §6`
- Filters: `lead_status`, `persona`, `budget_range`, `lead_source`, `routing_status`, `date_range`
- Mọi query mặc định filter `is_deleted = false`
- Toggle "Show deleted": chỉ `super_admin`

**Edge cases:**
- Firestore query timeout (> 10s) → hiện "Dữ liệu đang tải, vui lòng thử lại" + Sentry log
- Kanban drag-and-drop fail (network) → rollback UI state, hiện toast "Cập nhật thất bại"
- Bulk action (select nhiều leads) → confirm modal trước khi execute

### §2.2. Content & Claim Status

- Quản lý articles/pages qua Payload CMS
- Claim review: mọi fact (Giá, Tiến độ, CSBH) phải qua `claim_status` gate (`15 §1.1`)
- KHÔNG publish Tier 2 (internal) làm public fact
- Nút "Revalidate" — xem §2.2.1

#### §2.2.1. Manual Revalidate (Webhook Failsafe)

- Nút per-page + Nút global "Revalidate All Pillar" trên top-bar
- Action: `POST /api/revalidate` với `X-Revalidate-Secret` header
- Rate limit: 10 lần/phút/admin
- Reason ≥ 10 chars bắt buộc
- Audit log mandatory
- Quyền: `admin_content` + `super_admin`. `sales_agent` KHÔNG thấy.
- UI flow: Spinner → "Đang xử lý..." → Success toast với "Kiểm tra trang" link → Error toast + Sentry

### §2.3. Analytics Dashboard

Required views: Funnel | Source quality | CPL | Route performance | Lead quality

Required metrics:
- `sessions`, `organic_sessions`
- `lead_submit_rate`, `qualified_lead_rate`
- `source_quality_score`, `CPL`
- `cta_click_through_rate`, `form_error_rate`
- `speed_to_lead_latency` (P50)
- `page_speed_by_route`
- `consent_accept_rate`

**Rules:** KHÔNG hiện PII (phone/email/full_name) trong dashboard. Ads export chỉ với `consent_marketing = true`.

### §2.4. Source Quality & CPL Dashboard

Mỗi `lead_source` phải có:
- Submit count, qualified count, qualification rate, hot lead share
- CPL khi có spend mapping
- Filter: route, persona, interested_product, time range

### §2.5. Security Telemetry Panel

Xem `03 §5` cho access rules. Panel này tách biệt với marketing/CPL dashboard.

### §2.6. Ops Panel (System Health)

Hiển thị health của cron jobs (`02 §5`):
- `last_run_at`, `last_success_at`, `last_error_at` cho từng job
- Dead-letter jobs visibility
- Lead `unassigned` count (routing_status = unassigned, lead_status = new)
- Retry button cho failed jobs (confirm trước khi retry)

### §2.7. Inventory Management Panel

- List inventory lots (`05 §3.1`)
- Update `inventory_lot_status` (`05 §4.6`) — bulk update supported
- KHÔNG xóa lots — chỉ `is_deleted = true`
- Real-time sync: Sau khi update status, trigger ISR revalidate cho `/sa-ban` và lot pages liên quan

### §2.8. Bank Rate Admin Panel

- Review và cập nhật `bank_rates` collection (`05 §2.5`)
- `review_status` management: `current → pending_review → expired/archived`
- Weekly cron reminder (`02 §5`) khi có rates `pending_review`
- Sau khi update rates → trigger ISR revalidate `/vay-mua`

### §2.9. Experiment Readout Panel (Sprint P2)

- Hiển thị experiments registry (`04 §7`)
- Status per experiment
- Primary/guardrail metrics readout
- Winner declaration gate (confirm modal)

### §2.10. Competitor Source Registry (Informational)

- Danh sách URLs từ SERP competitor analysis
- Dùng để track keyword gaps
- KHÔNG public, KHÔNG leak competitor data

---

## §3. Lead Pipeline

### §3.1. Kanban View

Columns: `new` | `contacted` | `qualified` | `site_visit_scheduled` | `site_visit_done` | `negotiating` | `contracted` | `lost`

Drag-and-drop để update `lead_status`. Audit log mandatory cho mỗi status change.

### §3.2. Lead Detail View

| Section | Fields shown |
|---|---|
| Identity | `persona`, `budget_range` — PII (phone/email) chỉ hiện với confirm action |
| Behavioral | `lead_score`, `score_breakdown`, `lead_source`, `download_events` |
| Routing | `routing_status`, `routed_to_uid` (display name), `routing_sla_status`, `contact_sla_status` |
| Tool inputs | `calculator_snapshot` (JSON pretty-print) |
| Timeline | `created_at`, status history chronological |

> **PII access:** `admin_content` và `super_admin` có thể xem `phone`/`email` sau khi click "Xem thông tin liên hệ" + confirm. Mỗi lần xem được log vào audit.

### §3.3. SLA Badges

| State | Badge | Action |
|---|---|---|
| Trong SLA | ⏱️ "X phút còn lại" | — |
| Gần vi phạm (< 1 phút HC) | 🟡 Warning | Desktop notification |
| Đã vi phạm | 🔴 BREACHED | Escalation badge + Telegram |

### §3.4. Lead Scoring Manual Override

- `admin_content` và `super_admin` có thể manual adjust score
- Ghi vào `score_breakdown.manual_override`
- Reason bắt buộc ≥ 10 chars
- Audit log mandatory

### §3.5. Round-Robin Routing

- Pool: Chỉ sales có `sales_presence_status = active` (`05 §4.9`)
- Pool rỗng (tất cả idle/offline/busy/away) → lead lưu với `routed_to_uid = null`, `routing_status = unassigned`
- Cron `lead_unassigned_routing_cron` (mỗi 2 phút) gán leads unassigned khi có sales active
- Heartbeat mechanism: Mỗi request từ `/broker/*` → update `presence_updated_at = now()`, reset về `active` nếu đang `idle`
- TTL enforcement: Cron `sales_presence_ttl_cron` xem `05 §4.9`
- SLA breach → escalate: KHÔNG silent treo

**Edge cases:**
- Routing cron chạy nhưng vẫn không có sales active → leads tiếp tục `unassigned`, cron retry lần sau
- Sales đang có lead assigned thì đổi về offline → lead giữ nguyên assignment, SLA clock vẫn chạy, escalate nếu breach

---

## §4. Lead Scoring Details

| Tier | Score range | Action |
|---|---|---|
| Hot | ≥ 70 | Telegram Hot alert, SLA ≤ 3 phút HC |
| Warm | 40–69 | Telegram Warm alert, SLA ≤ 5 phút HC |
| Cold | 20–39 | Nurture (email/Zalo digest) |
| Junk | < 20 | Không alert, không route |

### §4.1. Score History Format (`score_breakdown` JSON)

```json
{
  "events": [
    { "type": "sa_ban_view", "points": 10, "ts": "2026-05-16T10:00:00Z" },
    { "type": "calculator_used", "points": 20, "ts": "2026-05-16T10:05:00Z" }
  ],
  "manual_override": {
    "delta": 5,
    "reason": "Xác nhận có nhu cầu thực sự qua điện thoại",
    "by_uid": "admin_uid_hash_8chars",
    "ts": "2026-05-16T11:00:00Z"
  },
  "total": 35
}
```

`manual_override` = `null` nếu chưa có manual adjustment.

### §4.2. Junk Filter Rules

Auto-mark `lead_status = spam` nếu:
- Phone format invalid (server double-check sau frontend)
- Submission rate > 3 từ same `phone_hash` trong 1h
- Score < 5 sau 7 ngày không activity → review flag (KHÔNG auto-archive, chỉ flag)

---

## §5. Export Rules

> Canonical: `03 §4.2`. File này reference, không duplicate.

Xem `03 §4.2` cho đầy đủ rules về rate limit, encryption, watermark, và audit requirements.
