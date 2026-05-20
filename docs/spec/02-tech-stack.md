# 02 — Tech Stack (Hồng Hạc City)

**Version:** 3.0 | **Last updated:** 2026-05-16 | **Status:** Approved

---

## §1. Stack Chính

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 15 App Router | RSC-first |
| Language | TypeScript (strict) | No `any` |
| Styling | Tailwind CSS | Design tokens từ `07 §5` |
| Animation | Framer Motion | Tiết chế — ≤ 600ms |
| CMS | Payload CMS 3 (Postgres) | SSOT: content, inventory, price, progress |
| Database operational | Firestore | SSOT: leads, sessions, auth, audit |
| Map | MapLibre GL + PMTiles | `/sa-ban` only — lazy load |
| Auth | Firebase Auth | Anonymous + Email + Portal |
| Hosting | Vercel (production) | Edge network |
| Monitoring | Sentry | Errors + performance traces |
| Analytics | GA4 + GTM | No PII — xem `13 §8` |
| Notification | Telegram Bot API | Speed-to-lead alerts |
| Bot protection | Cloudflare Turnstile | Lead form protection |
| Storage | GCS private bucket | PDF, PMTiles binary |
| Email (P2) | Resend | Cold lead digest |

---

## §2. Nguyên Tắc Kiến Trúc

1. **RSC trước** — Client Components chỉ khi cần interactivity (event handlers, browser APIs)
2. **Map và heavy JS lazy-load** — MapLibre/PMTiles KHÔNG load trên homepage hay bất kỳ route nào ngoài `/sa-ban`
3. **Image optimization** — `next/image`, WebP/AVIF, `sizes` chính xác theo breakpoint thực tế
4. **Schema JSON-LD** — chỉ render khi đủ điều kiện (`14 §1`)
5. **Route crawlable** — robots.txt theo `06 §5.1`
6. **Feature flags** — Components hiển thị giá/chiết khấu phải wrap trong env flag

---

## §3. Environment Variables

| Variable | Purpose | Scope |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL của platform (không phải CĐT) | Public |
| `NEXT_PUBLIC_COMPANY_NAME` | Tên công ty hiển thị (schema Organization/LocalBusiness, footer) | Public |
| `NEXT_PUBLIC_HOTLINE` | Tel link | Public |
| `NEXT_PUBLIC_ZALO_OA_URL` | Zalo OA link | Public |
| `NEXT_PUBLIC_GA_ID` | GA4 Measurement ID | Public |
| `NEXT_PUBLIC_GTM_ID` | GTM Container ID | Public |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN for frontend errors + performance traces | Public |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web SDK public config | Public |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Web SDK public config | Public |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Web SDK public config | Public |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase Web SDK public config | Public |
| `NEXT_PUBLIC_FIREBASE_APP_CHECK_SITE_KEY` | Firebase App Check web provider site key | Public |
| `NEXT_PUBLIC_MAPLIBRE_TOKEN` | MapLibre/tile access token | Public |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key | Public |
| `MAP_TILES_ACCESS_MODE` | Server-side map tile gate: `disabled` / `public_shell` / `protected` | Private |
| `TILE_JWT_SECRET` | Server-side JWT signing secret for scoped tile tokens | Private |
| `FIREBASE_ADMIN_SDK` | Service account JSON (base64) | Private |
| `PAYLOAD_SECRET` | Payload CMS JWT secret | Private |
| `DATABASE_URL` | Postgres connection string | Private |
| `TELEGRAM_BOT_TOKEN` | Bot token | Private |
| `TELEGRAM_CHAT_ID_HOT` | Hot lead alert channel | Private |
| `TELEGRAM_CHAT_ID_WARM` | Warm lead alert channel | Private |
| `TELEGRAM_CHAT_ID_ESCALATION` | SLA breach escalation channel | Private |
| `CLOUDFLARE_TURNSTILE_SECRET` | Turnstile server-side verify key | Private |
| `REVALIDATE_WEBHOOK_SECRET` | ISR webhook auth header | Private |
| `PMTILES_BUCKET_URL` | GCS bucket base path cho PMTiles | Private |
| `GCS_PRIVATE_BUCKET` | GCS bucket cho PDF/media | Private |
| `COMPLIANCE_OFFICER_EMAIL` | Nhận email khi hard_delete_emergency | Private |

> **Lưu ý:** Tên biến `NEXT_PUBLIC_MAPLIBRE_TOKEN` thay thế `NEXT_PUBLIC_MAPBOX_TOKEN` từ phiên bản cũ — stack dùng MapLibre, không phải Mapbox.

---

## §4. Quality Gate Execution Model

### §4.1. Model A (Primary — trước mọi release)

```bash
npm run typecheck   # TSC strict — block merge nếu fail
npm run lint        # ESLint — block merge nếu fail
npm run build       # Next.js production build — block merge nếu fail
npm run verify      # Lighthouse CI + schema validation + CSP check + axe-core
```

### §4.2. Fail Conditions

| Check | Threshold | Action |
|---|---|---|
| TypeScript errors | Any | Block merge |
| Build errors | Any | Block merge |
| Lighthouse Performance (core 1A routes) | < 90 | Block merge |
| A11y axe-core | `serious` hoặc `critical` | Block merge |
| Schema validation error | Any | Block merge |
| Bundle size over budget | Per `11 §5` | PR flag (không block) |

### §4.3. Lighthouse Route Selection

CI đọc Sprint Route Manifest từ `04 §1`. KHÔNG hardcode route list tách biệt trong CI config. Route nằm ngoài manifest KHÔNG được làm fail CI.

---

## §5. Cron Jobs

| Job | Trigger | Purpose | Spec ref |
|---|---|---|---|
| `lead_unassigned_routing_cron` | Mỗi 2 phút | Gán lead unassigned cho active sales | `05 §2.1`, `10 §3.5` |
| `lead_score_recompute_cron` | Mỗi 6h | Recompute score cho `new`/`contacted` leads | `10 §4` |
| `sales_presence_ttl_cron` | Mỗi 5 phút | active→idle→offline TTL enforcement | `05 §4.9` |
| `retention_hard_delete_cron` | Daily 02:00 ICT | Hard-delete sensitive fields của leads soft-deleted > 30 ngày | `05 §2.3`, `13 §7` |
| `bank_rate_review_reminder_cron` | Mỗi thứ Hai 09:00 ICT | Nhắc Admin review bank rate | `05 §2.5`, `10 §2.8` |
| `sitemap_revalidate_cron` | Daily 03:00 ICT | Rebuild sitemap | `06 §5.4` |

> **Presence mechanism:** `sales_presence_ttl_cron` chỉ enforce TTL (active→idle sau 30 phút không heartbeat, idle→offline sau 60 phút). Heartbeat thực sự được ghi bởi middleware `/broker/*` mỗi request — không cần cron cho heartbeat, chỉ cần cron cho cleanup TTL.

### §5.1. Async Job / Cron Contract

Mọi cron/background job/async export phải có job contract trước khi code. Không được chạy tác vụ nặng trực tiếp trong request-response nếu có thể vượt 30 giây.

**Job run fields tối thiểu:**

| Field | Type | Rule |
|---|---|---|
| `job_id` | string ULID/UUID | Unique per run |
| `job_name` | enum string | Whitelist theo bảng §5 |
| `idempotency_key` | string | `job_name + target + period` hoặc equivalent |
| `status` | enum | `queued` / `running` / `succeeded` / `failed` / `dead_letter` |
| `target` | object | Không chứa raw PII |
| `attempt` | integer | Bắt đầu từ 1 |
| `max_attempts` | integer | Default 3 nếu task không ghi khác |
| `locked_until` | ISO 8601 | Chống hai worker xử lý cùng job |
| `started_at` / `finished_at` | ISO 8601/null | Required khi chuyển state |
| `last_error_code` | string/null | Dùng error registry tại `06 §4.0` nếu phù hợp |
| `last_error_message` | string/null | Không chứa PII/stack trace dài |
| `created_at` / `updated_at` | ISO 8601 | Required |

**Execution rules:**
- Retry mặc định: 1 phút → 5 phút → 15 phút, sau đó `dead_letter`.
- Side effects phải idempotent: Telegram/email/revalidate/export không được gửi lặp nếu cùng `idempotency_key` đã `succeeded`.
- Nếu job bị lock quá hạn, worker khác được takeover sau `locked_until`.
- Job failure không được làm fail lead submission nếu job là side effect không đồng bộ; phải log Sentry warning/error.
- Admin UI phải hiển thị `last_run_at`, `last_status`, `last_error_code` cho job vận hành quan trọng.

### §5.2. Webhook / Event-driven Handling

Webhook/event handler áp dụng cùng contract với §5.1 và có thêm rule bảo mật.

| Requirement | Rule |
|---|---|
| Signature verification | Verify secret/signature trước khi parse side effect |
| Idempotency | Dedupe theo provider event id hoặc `idempotency_key` |
| Ordering | Không giả định event luôn đến đúng thứ tự; dùng version/timestamp nếu cần |
| Retry | 1m → 5m → 15m, sau đó `dead_letter` |
| Dead-letter | Lưu payload redacted + error code + replay instruction |
| Timeout | Handler phải trả nhanh; tác vụ nặng enqueue job |
| Audit | Event ảnh hưởng data public/admin phải ghi audit/job log |

Telegram/email/revalidate là side effect không đồng bộ: fail thì log + retry, không rollback dữ liệu chính đã commit.

### §5.3. Feature Flag / Toggle Strategy

Feature flag dùng để release an toàn, không thay thế phase governance.

| Field | Rule |
|---|---|
| `flag_key` | lowercase snake/kebab case, unique |
| `default_state` | `off` nếu feature chưa đủ data/content/asset |
| `owner` | role hoặc người chịu trách nhiệm |
| `scope` | `public`, `admin`, `broker`, `experiment`, `kill_switch` |
| `expires_at` | Required cho experiment/temp flag |
| `fallback_behavior` | Route hidden, noindex, fallback modal, hoặc disabled CTA |

**Rules:**
- Flag public feature thiếu data phải link tới `17 §8` data source/fallback.
- Kill switch phải có safe default và không cần deploy lại code.
- Không để flag tạm quá 1 phase nếu không có task cleanup.

---

## §6. PMTiles Security Architecture

- PMTiles binary lưu trên GCS private bucket (KHÔNG public URL)
- Anything not meant to be public must not be shipped to the browser. Tile security reduces scraping/abuse; it is not a substitute for data minimization.
- `MAP_TILES_ACCESS_MODE` default khi missing phải là `disabled`.
  - `disabled`: Sprint 1A/API stubs return `403 forbidden` with API error envelope + `Cache-Control: no-store`.
  - `public_shell`: `/sa-ban` shell/fallback can render, but real PMTiles manifest remains blocked.
  - `protected`: Sprint 1B+ full token/manifest flow enabled.
- Flow:
  1. Client gọi Firebase Anonymous Auth → nhận Firebase ID token
  2. Client lấy Firebase App Check token
  3. `POST /api/tiles/token` (xác thực App Check + Firebase ID token + rate limit + route scope) → trả `tile_token` (JWT signed by server, TTL 5 phút)
  4. `POST /api/tiles/manifest` (xác thực `tile_token`, scope, JTI, allowed layers) → trả signed GCS URLs per layer
  5. MapLibre fetch tiles qua signed URLs

**Scoped tile JWT claims tối thiểu:**

| Claim | Rule |
|---|---|
| `sub` | Firebase UID hash hoặc anonymous UID, không raw PII |
| `aud` | `sa-ban-tiles` |
| `route` | `/sa-ban` hoặc route map hợp lệ |
| `scope` | `public_map` / `broker_map` / `admin_map` |
| `allowed_layers` | Array whitelist layer IDs |
| `jti` | Unique token ID, hash lưu trong `tile_access_jtis` |
| `iat` / `exp` | TTL mặc định 5 phút |

**Clock tolerance:** JWT verify phải cho phép clock skew 30–60 giây. Client refresh token/manifest trước expiry 60–120 giây và giữ map hiện tại mounted trong lúc refresh; không blank map nếu refresh đang chạy.

**Layer access model:**

| Scope | Allowed layers | Auth |
|---|---|---|
| `public_map` | base/public-safe lot/phase/infrastructure layers | Firebase Anonymous Auth + App Check |
| `broker_map` | broker-only advisory layers, không chứa PII | Firebase Email Auth + `sales_agent` role + App Check |
| `admin_map` | admin ops layers | Firebase Email Auth + `admin_content`/`super_admin` role + App Check |

Public, broker, and admin layers must use separate manifest scopes and must not mix internal metadata into public layer payloads.

**Forbidden:**
- Full proxy PMTiles binary qua app server
- Expose raw GCS URL array trong manifest response
- Stream tile binary qua server
- Put internal price, reservation/deposit details, customer data, broker notes, sales notes, CRM IDs, unapproved legal/progress claims, or raw telemetry identifiers into public tiles
- Require login or default CAPTCHA/Turnstile for public `/sa-ban`

**Cache:**
- `tile_token` response: `Cache-Control: no-store`
- `manifest` response: `Cache-Control: no-store`
- PMTiles signed URL: `Cache-Control: private, max-age=300` hoặc thấp hơn signed URL TTL; KHÔNG dùng `no-store` cho tile binary vì sẽ phá pan/zoom performance
- Static tile fallback: `Cache-Control: public, max-age=86400`

**Edge cases:**
- `tile_token` hết hạn khi đang dùng map → client tự refresh token (transparent retry 1 lần)
- GCS signed URL expired → client gọi lại manifest endpoint (không cache manifest)
- `super_admin` có thể revoke JTI cụ thể qua `tileaccess.revoke_jti` permission
- App Check failure → API trả `403 forbidden` envelope, không hiện CAPTCHA mặc định; UI hiển thị degraded fallback nếu map không tải được
- Rate limit breach → API trả `429 rate_limited` envelope + ghi `security_telemetry_events` redacted, KHÔNG đưa vào lead scoring
- Sprint 1A stubs for tile endpoints must be deny-by-default with `no-store` headers and must follow `06 §4.0` error envelope

---

## §7. Security Headers (Bắt buộc — `next.config.ts`)

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Content-Security-Policy: [defined in next.config.ts — whitelist tile CDN origin, GTM, GA4, Sentry, Turnstile]
```
