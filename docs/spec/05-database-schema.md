# 05 — Database Schema & Data Model (Hồng Hạc City)

**Version:** 3.0 | **Last updated:** 2026-05-16 | **Status:** Approved

---

## §1. Dual Database Architecture

| Database | SSOT cho | Ghi chú |
|---|---|---|
| **Payload CMS (Postgres)** | Content, Inventory, Price, Progress, Media | Không phải SSOT lead |
| **Firestore** | Leads, Sessions, Auth, Audit, Tile security | Không lưu list lô đất ở đây |

### §1.1. Lead Storage SSOT

- Firestore = SSOT cho tất cả leads (Sprint 1A và sau đó)
- Admin dashboard đọc Firestore trực tiếp (hoặc qua Lead API backed by Firestore)
- Payload mirror là optional P2 — chỉ một chiều: Firestore → Payload qua `lead_sync_jobs`
- Mirror failure KHÔNG block public UX và KHÔNG block admin dashboard

---

## §2. Firestore Collections

### §2.1. `leads`

| Field | Type | Notes |
|---|---|---|
| `lead_id` | string (ULID) | Document ID |
| `full_name` | string \| null | Encrypted at rest |
| `phone` | string \| null | Encrypted at rest |
| `email` | string \| null | Encrypted at rest |
| `phone_hash` | string (SHA-256, 8 chars) | Dedup key — không encrypted |
| `persona` | enum §4.1 | |
| `interested_product` | string \| null | |
| `budget_range` | enum §4.5 | |
| `message` | string \| null | Encrypted at rest |
| `lead_source` | enum §4.4 | Surface submit — xem `00 §3` về surface vs lead_source |
| `lead_status` | enum §4.3 | |
| `lead_score` | number | Auto-computed — xem `08 §6` |
| `score_breakdown` | JSON | Format: xem `10 §4.1` |
| `consent_privacy` | boolean | Must = true trước khi lưu |
| `consent_state` | JSON `{analytics: bool, marketing: bool}` | |
| `calculator_snapshot` | JSON \| null | Tool inputs tại thời điểm submit |
| `download_events` | string[] | document_id list (PDF downloads) |
| `utm_source` | string \| null | |
| `utm_medium` | string \| null | |
| `utm_campaign` | string \| null | |
| `referrer` | string \| null | Sanitized — strip PII |
| `routing_status` | enum §4.10 | |
| `routing_sla_status` | enum §4.13 | |
| `contact_sla_status` | enum §4.14 | |
| `routed_to_uid` | string \| null | `sales_agent` UID |
| `first_contact_due_at` | ISO 8601 \| null | Computed khi assign |
| `first_contact_at` | ISO 8601 \| null | Set khi sales contact |
| `is_deleted` | boolean (default false) | Soft delete flag |
| `deleted_at` | ISO 8601 \| null | |
| `delete_reason` | string \| null | ≥ 10 chars |
| `delete_type` | enum §4.11 | |
| `dsar_request_id` | UUID \| null | Link tới DSAR request |
| `created_at` | timestamp | |
| `updated_at` | timestamp | Auto-update on any write |

### §2.2. `submission_idempotency/{client_request_id}`

| Field | Type | Notes |
|---|---|---|
| `client_request_id` | string (UUIDv4) | Document ID |
| `status` | `processing/succeeded/failed` | |
| `lead_id` | string \| null | Sau khi `succeeded` |
| `stored_result_code` | `created/merged/failed` \| null | Canonical — KHÔNG mutate khi replay |
| `request_hash` | string | Non-PII shape hash |
| `surface` | string | |
| `route` | string | Sanitized pathname |
| `created_at` | timestamp | |
| `expires_at` | timestamp | TTL 24h |

> `stored_result_code` chỉ set một lần. Replay (same `client_request_id`) → return `stored_result_code` cũ, KHÔNG write lại.

### §2.3. `tile_access_jtis`

PMTiles broker — rate-limit và revoke. Không lưu raw UID.

| Field | Type |
|---|---|
| `jti` | string (hash) |
| `uid_hash` | string |
| `issued_at` | timestamp |
| `expires_at` | timestamp (TTL 1h) |
| `revoked` | boolean |
| `revoked_at` | ISO 8601 \| null |

### §2.4. `security_telemetry_events`

Redacted tile abuse events. Retention 30 ngày. KHÔNG join với `leads`.

### §2.5. `bank_rates`

| Field | Type | Notes |
|---|---|---|
| `rate_id` | string (ULID) | Document ID |
| `rate_type` | `short_term/mid_term/long_term` | |
| `rate_min` | number | % |
| `rate_max` | number | % |
| `source` | string | Tên ngân hàng — Tier 1/3 only |
| `effective_date` | ISO 8601 | |
| `review_status` | enum §4.8 | |
| `reviewed_by_uid` | string | Admin UID hash |
| `expires_at` | ISO 8601 | |

**Edge case:** Khi `review_status = expired` hoặc không có `bank_rates` current → calculator fallback: xem `04 §4.1`.

### §2.6. `social_proof_items`

| Field | Type | Notes |
|---|---|---|
| `item_id` | string (ULID) | Document ID |
| `type` | `testimonial/case_study` | |
| `moderation_status` | enum §4.7 | |
| `content` | string | |
| `author_display_name` | string | |
| `consent_verified` | boolean | |
| `consent_evidence_url` | string \| null | Signed GCS URL |
| `approved_at` | ISO 8601 \| null | |

---

## §3. Payload CMS Collections (Postgres)

### §3.1. `inventory_lots`

| Field | Type | Notes |
|---|---|---|
| `lot_code` | string (unique, ASCII) | Route identity — `/sa-ban/[lot-code]` |
| `phan_khu_name` | `hong_phat/hong_thinh/hong_phuc` | |
| `phase_id` | string | FK → `phases.phase_id` |
| `area_range_min` | number (m²) | |
| `area_range_max` | number (m²) | |
| `product_type` | enum §4.2 | |
| `geo_lat` | number \| null | Tier 1 only |
| `geo_lng` | number \| null | Tier 1 only |
| `legal_status_summary` | string \| null | Tier 1 |
| `progress_summary` | string \| null | Tier 1 |
| `status` | enum §4.6 | |
| `price_visibility` | `public/hidden` | |
| `is_deleted` | boolean | Soft delete |
| `created_at` | timestamp | |
| `updated_at` | timestamp | |

**Rules:**
- KHÔNG render price/legal nếu `price_visibility = hidden` hoặc `status ∈ {hidden, sold}`
- KHÔNG hard-delete lots — chỉ `is_deleted = true`
- `lot_code` = slug duy nhất, ASCII, lowercase — xem `06 §5.5`

### §3.2. `phases`

| Field | Type | Notes |
|---|---|---|
| `phase_id` | string (ULID) | |
| `phase_name` | string | |
| `phan_khu` | `hong_phat/hong_thinh/hong_phuc` | |
| `release_date` | date \| null | |
| `completion_date` | date \| null | |
| `status` | `upcoming/current/completed` | |

### §3.3. `articles`

| Field | Type | Notes |
|---|---|---|
| `slug` | string (unique, ASCII) | Diacritics stripped — xem `06 §5.5` |
| `title` | string | |
| `content` | rich text | |
| `claim_status` | `draft/review/approved_public/rejected` | |
| `sources` | JSON (Fact Ledger) | Bắt buộc cho claim content — format: `15 §1.2` |
| `author_id` | string | FK → author profile |
| `published_at` | ISO 8601 \| null | |
| `updated_at` | ISO 8601 | Must reflect real content change |
| `seo_title` | string | ≤ 60 chars |
| `seo_description` | string | ≤ 160 chars |
| `is_deleted` | boolean | |

---

## §4. Enums (Canonical SSOT — Không thay đổi không qua review)

### §4.1. `persona`
`mua_de_o` | `dau_tu` | `moi_gioi` | `chua_xac_dinh`

### §4.2. `product_type`
`nha_pho` | `biet_thu` | `shophouse` | `lien_ke` | `dat_nen` | `khac`

### §4.3. `lead_status`
`new` | `contacted` | `qualified` | `site_visit_scheduled` | `site_visit_done` | `negotiating` | `contracted` | `lost` | `spam` | `archived`

### §4.4. `lead_source` (surface enum — canonical)

Homepage: `homepage_hero` | `homepage_lifestyle` | `homepage_persona` | `homepage_lead_magnet` | `homepage_final_cta` | `footer`
Pages: `bang_gia` | `phap_ly` | `tu_van` | `lien_he` | `tien_do` | `phong_cach_song` | `kham_pha_do_thi`
Map: `sa_ban` | `sa_ban_lot` | `programmatic_lot` | `phan_khu_hong_phat` | `phan_khu_hong_thinh` | `phan_khu_hong_phuc`
Tools: `vay_mua` | `calculator_roi` | `ai_matching`
Popup: `popup_exit_intent` | `popup_fallback`
Local SEO: `local_organic` | `local_gbp` | `local_map_intent` | `local_near_me` | `local_zalo` | `local_phone_call` | `local_poi_click` | `local_directions_click`
Other: `comparison_page`

> **Nhắc lại `00 §3`:** Trong code, prop name của component là `surface`. Khi lưu vào Firestore, field name là `lead_source`. Hai tên này refer đến cùng một enum ở đây.

### §4.5. `budget_range`
`lt_2ty` | `2_5ty` | `5_10ty` | `10_20ty` | `20_50ty` | `gt_50ty` | `chua_xac_dinh`

### §4.6. `inventory_lot_status`
`available` | `holding` | `deposited` | `sold` | `unavailable` | `hidden` | `stale` | `unknown`

**Lot color legend (map):**

| Status | Color Token | Label hiển thị |
|---|---|---|
| `available` | `--color-lot-available` (green) | Đang mở bán |
| `holding` | `--color-lot-holding` (yellow) | Đang giữ chỗ |
| `deposited` | `--color-lot-deposited` (orange) | Đã đặt cọc |
| `sold` | `--color-lot-sold` (grey) | Đã bán |
| `unknown` | `--color-lot-unknown` (light grey) | Không xác định |
| `stale` | `--color-lot-stale` (lighter grey) | Cần xác nhận |
| `hidden` | Không hiển thị trên map | — |
| `unavailable` | Không hiển thị trên map | — |

### §4.7. `social_proof_state`
`pending_moderation` | `approved_public` | `rejected` | `archived`

### §4.8. `bank_rate_review_status`
`current` | `pending_review` | `expired` | `archived`

### §4.9. `sales_presence_status`
`active` | `idle` | `offline` | `busy` | `away`

**TTL rules (enforced by `sales_presence_ttl_cron`, xem `02 §5`):**
- `active → idle`: sau 30 phút không có request từ `/broker/*`
- `idle → offline`: sau thêm 60 phút (tổng 90 phút từ request cuối)
- Heartbeat: Mỗi request từ `/broker/*` → update `presence_updated_at = now()` và set `active` nếu đang `idle/offline`

### §4.10. `routing_status`
`unassigned` | `assigned` | `escalated` | `manual_override`

### §4.11. `delete_type`
`soft_delete` | `retention_delete` | `hard_delete_emergency`

### §4.12. `poi_category` (12-item — KHÔNG thêm/bớt không qua review)
`school` | `hospital` | `market` | `park` | `mall` | `industrial_park` | `transport_hub` | `major_road` | `government` | `sport_complex` | `cultural_venue` | `lifestyle`

> POI categories này dùng cho map infrastructure overlay (`04 §5.1`) và tracking event `local_poi_click` (`12 §2.7`).

### §4.13. `routing_sla_status`
`pending` | `met` | `breached` | `escalated`

### §4.14. `contact_sla_status`
`pending` | `met` | `breached` | `escalated`

---

## §5. Field Validation Matrix (P0)

**Global validation rules:**
- Mọi server write phải validate bằng Zod hoặc schema validator tương đương. Client validation chỉ là UX, không thay thế server validation.
- Unknown fields bị reject, trừ khi endpoint ghi rõ `passthrough`.
- Optional string: trim trước khi lưu; chuỗi rỗng sau trim lưu thành `null`, không lưu `""`.
- Date/time trong API dùng ISO 8601 UTC string. Firestore có thể lưu `Timestamp`, nhưng khi trả về client phải normalize về ISO 8601.
- Không log raw PII vào console, Sentry, analytics, audit message hoặc job error. Chỉ log `lead_id`, `phone_hash`, `email_hash`, `request_id`.

| Field | Format | Required | Rule |
|---|---|---|---|
| `phone` | Việt Nam: 03x/07x/08x/09x, 10 digits | Yes (hoặc email) | Regex + Zod — cả client lẫn server |
| `email` | RFC 5322 | Optional | Zod `email()` |
| `full_name` | 2–100 chars | Optional | Zod `min(2).max(100)` |
| `consent_privacy` | boolean = true | Yes | Block submit nếu false — server double-check |
| `client_request_id` | UUIDv4 | Yes | Zod `uuid()` |
| `lot_code` | ASCII alphanumeric + dash | Yes (lot pages) | Regex `/^[a-z0-9-]+$/` |
| `geo_lat` | -90 to 90 | Conditional | Zod number range |
| `geo_lng` | -180 to 180 | Conditional | Zod number range |
| `message` | max 500 chars | Optional | Zod `max(500)` |
| `utm_source` / `utm_medium` / `utm_campaign` | 1–120 chars | Optional | Strip control chars; không chứa PII |
| `referrer` | URL, max 500 chars | Optional | Strip query params có PII trước khi lưu |
| `reason` / `audit_reason` | 10–500 chars | Conditional | Required cho PII reveal, archive, hard delete, manual override |
| `page_size` | integer 1–100 | Optional | Default 50; admin export dùng async job riêng nếu >500 |
| `cursor` | opaque string | Optional | Không expose raw DB path |
| `sort` | enum whitelist | Optional | Không nhận arbitrary field name từ client |
| `bank_rates.rate_min` / `rate_max` | number 0–30 | Conditional | `rate_min <= rate_max`; đơn vị phần trăm/năm |
| `amount_vnd` | integer >= 0 | Conditional | Không dùng float cho tiền VND |
| `slug` | lowercase ASCII + dash | Conditional | Regex `/^[a-z0-9]+(?:-[a-z0-9]+)*$/` |

### §5.1. Pagination, Sort & Filter Standard

Áp dụng cho mọi API list/admin table/Kanban/search route nếu file task không ghi khác.

| Rule | Standard |
|---|---|
| Pagination type | Cursor-based ưu tiên; offset chỉ dùng cho static CMS list nhỏ |
| Default page size | 50 items |
| Max page size | 100 items cho UI; 500 cho internal maintenance; lớn hơn phải dùng async export job |
| Default sort | `updated_at desc`, tie-breaker `id desc` |
| Public content sort | `published_at desc`, tie-breaker `slug asc` nếu là editorial |
| Admin leads sort | SLA priority desc → `created_at desc` |
| Filters | Whitelist enum; reject unknown filter key |
| Empty page | Trả `items: []` + `has_more: false`, không trả lỗi |
| Cursor | Opaque; client không được tự dựng cursor từ DB internals |

Response list tối thiểu:

```typescript
{
  items: T[];
  page_info: {
    page_size: number;
    next_cursor: string | null;
    has_more: boolean;
    sort: string;
  };
}
```

### §5.2. Delete / Archive Policy Matrix

Mặc định là **soft delete hoặc archive**, không hard delete, trừ khi bảng dưới đây cho phép.

| Data | Default action | Hard delete allowed? | Notes |
|---|---|---|---|
| `leads` | Soft delete: `deleted_at`, `deleted_by`, `delete_reason` | Chỉ qua `lead.hard_delete_emergency` | Sensitive fields bị purge bởi retention cron sau 30 ngày |
| `admin_audit_log` | Append-only | Không, chỉ retention cron | Không sửa/xóa thủ công |
| `security_telemetry` | TTL retention | Chỉ retention cron | Không hiển thị PII |
| `submission_idempotency` | TTL auto-delete | Có, TTL | Không dùng cho reporting |
| CMS article/page | Archive/unpublish | Không trong UI thường | Giữ lịch sử publish |
| Public media | Archive + remove public approval | Không trong UI thường | Không xóa nếu đang được route tham chiếu |
| `bank_rates` | Archive old rate set | Không trong UI thường | Giữ nguồn, ngày review, người duyệt |
| Inventory/lot records | Mark unavailable/hidden | Không trong UI thường | Không xóa để tránh gãy deep link |
| Admin user | Disable/deactivate | Không trong UI thường | Giữ audit và ownership |

### §5.3. Concurrency / Write Safety

- Create operations phải có `client_request_id` hoặc `idempotency_key` nếu có thể retry từ UI/network.
- Update operations trên admin data phải dùng `updated_at` hoặc `version` để chống stale write.
- Nếu client gửi version cũ, API trả `409 stale_write` và UI phải yêu cầu reload dữ liệu mới nhất.
- Status transitions phải append audit log; không chỉ overwrite field.
- UI phải disable nút submit/save khi request đang chạy. Double-click không được tạo duplicate record.
- Optimistic update chỉ được dùng khi có rollback rõ ràng nếu API fail.

### §5.4. Schema Migration Strategy

Áp dụng cho Payload/Postgres, Firestore collection shape, seed data và mọi field mới trong public/admin APIs.

| Area | Strategy | Rollback |
|---|---|---|
| Payload/Postgres schema | Dùng Payload migration hoặc SQL migration được commit cùng code | Migration down hoặc forward-fix migration; không sửa DB thủ công không ghi log |
| Firestore schema | Versioned document shape + lazy backfill/one-off script có dry-run | Không xóa field cũ trong cùng release; giữ compatibility ít nhất 1 phase |
| Enum changes | Phải cập nhật `05 §4`, API validators, UI labels, analytics mapping | Rollback enum bằng mapping legacy value → safe default |
| Required field mới | Triển khai 2 bước: nullable/default trước, backfill, rồi mới enforce required | Revert enforcement, không drop data |
| Data backfill | Script phải có dry-run, count preview, idempotency key và report | Backfill phải reversible hoặc có snapshot/export trước khi chạy |

**Rules:**
- Mọi migration phải ghi vào phase/task evidence: command, dry-run result, apply result, rollback plan.
- Không được đổi field public/API breaking change nếu chưa cập nhật `06 §4.0`, UI state tại `07 §10.1`, và data readiness tại `17`.
- Nếu migration ảnh hưởng SEO route, phải kiểm tra sitemap/canonical/schema sau migration.

### §5.5. Index & Query Optimization

Mọi list/search/filter/sort route phải có index trước khi được coi là production-ready.

| Query surface | Required index/query rule |
|---|---|
| Admin leads inbox/Kanban | `lead_status`, `assigned_to`, `created_at desc`, `score_band`, SLA priority fields |
| Lead lookup/idempotency | `client_request_id`, `phone_hash`, `email_hash` nếu dùng merge/dedupe |
| Inventory/lot map | `phan_khu`, `phase_id`, `status`, `lot_code`, map tile/bounds key nếu có |
| Public content | `slug`, `published_at desc`, `status`, `content_type` |
| Bank rates | `status`, `reviewed_at desc`, `effective_from/effective_to` |
| Audit logs | `actor_id`, `action`, `target_id`, `created_at desc` |

**Query rules:**
- Không full scan collection lớn trong request path.
- Firestore composite index thiếu → task chưa PASS cho tới khi index requirement được ghi vào evidence.
- Search/filter input phải có pagination theo `§5.1`; không tải toàn bộ dataset về client để lọc nếu dataset có thể tăng.
- Query mới phải ghi rõ default sort và max page size.

### §5.6. Transaction / ACID / Atomicity Rules

Operation chạm nhiều document/table phải dùng transaction/batch write hoặc thiết kế idempotent với compensation rõ ràng.

| Operation | Atomicity requirement |
|---|---|
| Lead create | Idempotency record + lead record + initial score phải nằm trong transaction hoặc có recovery logic chống duplicate |
| Lead status update | Update status + append audit log phải atomic/batch; nếu audit fail thì không được âm thầm mất audit |
| PII reveal | Audit log phải ghi trước hoặc cùng lúc với reveal grant; không reveal nếu audit write fail |
| Inventory status update | Lot status + admin audit + revalidate trigger phải có ordering rõ ràng |
| Bank rate publish/archive | New active rate + archive old rate + audit log phải tránh trạng thái 2 active sets không chủ ý |
| Routing/SLA escalation | Assignment/escalation + notification job enqueue phải idempotent |

Nếu không thể đảm bảo ACID vì phụ thuộc bên thứ ba, spec/task phải ghi rõ:
1. trạng thái trung gian,
2. retry/compensation,
3. audit trail,
4. cách UI hiển thị trạng thái pending/failed.

---

## §6. Data Retention Policy (SSOT)

> File `13 §7` reference file này. Đây là SSOT cho retention.

| Data type | Retention | Action sau |
|---|---|---|
| Lead (active) | Indefinite khi active | Manual archive |
| Lead (soft-deleted) | 30 ngày | Cron hard-delete sensitive fields (`retention_hard_delete_cron`) |
| Lead (anonymized sau hard-delete) | 24 tháng | Chỉ còn `phone_hash`, `lead_source`, `created_at`, `deleted_*` |
| Audit logs | 12 tháng | Cron delete |
| Security telemetry | 30 ngày | Cron delete |
| Submission idempotency | 24h | Firestore TTL auto-delete |
| Tile JTIs | 1h | Firestore TTL |
| `bank_rates` (archived) | 12 tháng | Manual cleanup |
