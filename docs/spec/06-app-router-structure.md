# 06 — App Router Structure & Project Organization (Hồng Hạc City)

**Version:** 3.0 | **Last updated:** 2026-05-16 | **Status:** Approved

---

## §1. Directory Structure

```
app/
├── (marketing)/
│   ├── layout.tsx                      # Header, Footer, Sticky Zalo, Exit-intent popup
│   ├── page.tsx                        # / Homepage — Sprint P0
│   ├── kham-pha-do-thi/page.tsx        # /kham-pha-do-thi — Sprint P0/1A optional
│   ├── sa-ban/
│   │   ├── page.tsx                    # /sa-ban — Sprint 1A shell / Sprint 1B full map
│   │   └── [lot-id]/page.tsx           # /sa-ban/[lot-id] Programmatic — Sprint P1
│   ├── tiem-nang/
│   │   ├── page.tsx                    # /tiem-nang — Sprint P1
│   │   └── so-sanh/[slug]/page.tsx     # Comparison pages — Sprint P2
│   ├── tien-do/page.tsx                # /tien-do — Sprint P1
│   ├── phong-cach-song/page.tsx        # /phong-cach-song — Sprint P1
│   ├── phan-khu/[slug]/page.tsx        # /phan-khu/hong-phat — Sprint P1
│   │                                  # Canonical slugs: /phan-khu/hong-phat (P1), /phan-khu/hong-thinh (P2), /phan-khu/hong-phuc (P2)
│   ├── tu-van/
│   │   ├── page.tsx                    # /tu-van — Sprint P0
│   │   └── [author-slug]/page.tsx       # /tu-van/[author-slug] Author E-E-A-T profile — Sprint 1A
│   ├── doi-tac/page.tsx                # /doi-tac — Sprint P2
│   ├── phap-ly/page.tsx                # /phap-ly — Sprint P0
│   ├── bang-gia/page.tsx               # /bang-gia — Sprint P0
│   ├── vay-mua/page.tsx                # /vay-mua — Sprint P1
│   ├── roi/page.tsx                    # /roi — Sprint P2
│   ├── lien-he/page.tsx                # /lien-he — Sprint P0
│   └── blog/
│       ├── page.tsx                    # /blog listing — Sprint P2
│       └── [slug]/page.tsx             # /blog/[slug] — Sprint P2
├── (compliance)/
│   ├── yeu-cau-du-lieu/page.tsx        # /yeu-cau-du-lieu DSAR — Sprint P0
│   └── chinh-sach-bao-mat/page.tsx     # /chinh-sach-bao-mat — Sprint P0
├── portals/
│   └── admin/
│       ├── layout.tsx                  # Auth guard — admin_content + super_admin
│       ├── login/page.tsx
│       ├── access-denied/page.tsx
│       ├── leads/page.tsx
│       ├── inventory/page.tsx
│       ├── content/page.tsx
│       └── settings/page.tsx           # super_admin only
├── broker/
│   ├── layout.tsx                      # Auth guard — sales_agent
│   ├── login/page.tsx
│   └── dashboard/page.tsx
├── api/
│   ├── leads/route.ts                  # POST — lead submission (§4.1)
│   ├── revalidate/route.ts             # POST — ISR failsafe (§4.4)
│   ├── tiles/
│   │   ├── token/route.ts              # POST — PMTiles JWT (§4.2)
│   │   └── manifest/route.ts           # POST — signed URLs (§4.3)
│   └── security/telemetry/route.ts     # POST — first-party security ingest
├── not-found.tsx                       # 404 — P0 (§6.1)
├── error.tsx                           # 500 — P0 (§6.2)
├── offline.tsx                         # Offline — P0 (§6.3)
└── sitemap.ts                          # Dynamic sitemap index (§5.4)
```

---

## §2. Homepage Required Sections (Ordered — P0)

1. **HeroDecisionConsole** — First impression, SaBanPreview, 3 CTAs theo `04 §3`, trust disclaimer `00 §11.1`
2. **DecisionPaths** — 3 paths: Mua ở / Đầu tư dài hạn / Theo dõi giai đoạn (`07 §2.2`)
3. **SourceTrustBand** — Source-tier signals + official/platform distinction (text default; logo chỉ khi `partnerLogoApprovalStatus = approved`)
4. **CurrentReleaseIntelligence** — Phase hiện tại / Hồng Phát context, CTA → Sa bàn
5. **UrbanIntelligencePreview** — 197,76 ha, 20-year vision, 3 phân khu, CTA → `/kham-pha-do-thi`
6. **DecisionSupportPanel** — Links: `/phap-ly`, `/bang-gia`, `/vay-mua`, `/tu-van`
7. **ProgressAndSignalPreview** — Tiến độ + infrastructure watch
8. **LifestyleSection** — 3 story cards editorial (`07 §2.1`)
9. **LeadMagnetLibrary** — Decision assets, not generic brochure gates
10. **FAQDecisionObjections** — Trust objections
11. **FinalAdvisoryCTA** — Soft conversion, private consultation tone

**Acceptance criteria (block release nếu fail):**
- KHÔNG có "Mua ngay", "Chốt căn", "Cam kết sinh lời"
- Mọi CTA label khớp chính xác với `00 §8`
- Mọi LeadForm `surface` prop dùng enum `05 §4.4`
- `/sa-ban` / SaBanPreview xuất hiện trong first viewport trước mọi price/lead-magnet block
- LifestyleSection phải render (không skeleton) trước khi homepage được coi là complete
- Trust disclaimer `00 §11.1` xuất hiện trong HeroSection

---

## §3. Render Strategy

| Route type | Strategy | Notes |
|---|---|---|
| Homepage | SSG + ISR | Revalidate on Payload publish webhook |
| Pillar pages | SSG + ISR | `/bang-gia`, `/phap-ly`, `/kham-pha-do-thi`, etc. |
| `/sa-ban` | Sprint 1A: SSG/SSR shell; Sprint 1B: Hybrid SSR shell + CSR map | Phase 0/1A shell KHÔNG import `maplibre-gl`; full map dynamic import `ssr: false`, lazy load |
| `/sa-ban/[lot-id]` | SSG (`generateStaticParams`) | noindex nếu ThinContentPolicy — xem `00 §4.2` |
| `/blog/[slug]` | SSG + ISR | noindex nếu `claim_status ≠ approved_public` |
| Admin/Broker portals | CSR | Protected, always `noindex, nofollow, noarchive` |
| API routes | Server (no cache) | `Cache-Control: no-store` |

**Edge cases:**
- `generateStaticParams` timeout khi có 1000+ lots → paginate query, limit 500/batch
- ISR revalidate trigger khi Payload webhook fail → fallback: manual revalidate qua admin nút (`10 §2.2.1`)
- `/sa-ban/[lot-id]` không có trong `generateStaticParams` (lot thêm sau build) → `dynamicParams = true` + SSR on demand, sau đó cache

---

## §4. API Routes Contract

### §4.0. API Response Envelope & Error Registry

Áp dụng cho mọi API mới. `POST /api/leads` giữ response canonical tại §4.1 để không phá lead flow hiện có, nhưng client adapter vẫn phải map lỗi về các code trong bảng dưới đây.

**API contract SSOT / OpenAPI policy:**
- Trong Phase 0–1, file này là API contract SSOT. Nếu tạo OpenAPI/Swagger sau này, OpenAPI phải được generate hoặc review against `06 §4`, không được trở thành bản song song lệch nhau.
- Mọi endpoint mới phải được thêm vào `06 §4` trước khi code hoặc trong cùng PR/task với code.
- Nếu response schema thay đổi breaking change, phải cập nhật client usage, tests, `05` validation/data shape và evidence.

**Success envelope:**

```typescript
{
  ok: true;
  data: unknown;
  meta?: {
    request_id: string;
    page_info?: {
      page_size: number;
      next_cursor: string | null;
      has_more: boolean;
      sort: string;
    };
  };
}
```

**Error envelope:**

```typescript
{
  ok: false;
  error: {
    code: ApiErrorCode;
    message: string;
    field_errors?: Record<string, string>;
    retry_after_seconds?: number;
  };
  meta: {
    request_id: string;
  };
}
```

**Rules:**
- Mọi response lỗi phải có `request_id`.
- Error `message` là câu hiển thị được cho người dùng; không chứa stack trace, raw Firebase error, raw Firestore path hoặc PII.
- HTTP status phải khớp semantic. Không trả HTTP 200 cho lỗi thật, trừ duplicate idempotency đã được xử lý như success.
- List endpoint phải trả pagination meta theo `05 §5.1`.
- `204 No Content` chỉ dùng khi thật sự không có body; còn lại dùng envelope.

| Code | HTTP | User-facing message |
|---|---:|---|
| `validation_error` | 422 | "Vui lòng kiểm tra lại thông tin đã nhập." |
| `consent_required` | 422 | "Bạn cần đồng ý chính sách bảo mật trước khi gửi." |
| `turnstile_failed` | 403 | "Xác thực thất bại. Vui lòng thử lại." |
| `auth_required` | 401 | "Vui lòng đăng nhập lại để tiếp tục." |
| `forbidden` | 403 | "Bạn không có quyền thực hiện thao tác này." |
| `not_found` | 404 | "Không tìm thấy dữ liệu yêu cầu." |
| `conflict` | 409 | "Dữ liệu đã thay đổi. Vui lòng tải lại trang." |
| `stale_write` | 409 | "Dữ liệu đã được cập nhật ở nơi khác. Vui lòng tải lại trước khi lưu." |
| `rate_limited` | 429 | "Bạn thao tác quá nhanh. Vui lòng thử lại sau ít phút." |
| `timeout` | 504 | "Kết nối mất nhiều thời gian hơn dự kiến. Vui lòng thử lại." |
| `dependency_unavailable` | 503 | "Dịch vụ tạm thời chưa sẵn sàng. Vui lòng thử lại sau." |
| `server_error` | 500 | "Xin lỗi, có lỗi hệ thống. Vui lòng thử lại hoặc gọi hotline." |

### §4.1. `POST /api/leads` — Lead Submission (Canonical — file này là SSOT)

**Auth:** Cloudflare Turnstile verify (server-side)
**Body:**
```typescript
{
  client_request_id: string;   // UUIDv4 — idempotency key
  surface: LeadSource;         // enum 05 §4.4
  persona?: Persona;
  phone?: string;
  email?: string;
  full_name?: string;
  message?: string;
  consent_privacy: true;       // Must be true — server rejects false
  consent_state: { analytics: boolean; marketing: boolean };
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  calculator_snapshot?: object;
  turnstile_token: string;
}
```

**Server execution order:**
1. Validate `consent_privacy = true` → 422 nếu false
2. Verify Turnstile token → 403 nếu fail
3. Validate phone/email format (Zod) → 422 nếu fail
4. Check `submission_idempotency/{client_request_id}`:
   - `succeeded` → return `{ success: true, result_code: stored_result_code }` (no write)
   - `processing` → return 202
   - Not exists → proceed
5. Write `submission_idempotency` với status `processing`
6. Write `leads` (Firestore transaction)
7. Compute initial lead score
8. Update `submission_idempotency` với status `succeeded` + `lead_id`
9. Send Telegram alert nếu score ≥ 40
10. Return `{ success: true, result_code: "created" }`

**Response:** `{ success: true, result_code: "created" | "merged" }` — KHÔNG trả PII, KHÔNG trả raw lead_id

**Error responses:**
| Error | HTTP | Code | Client message |
|---|---|---|---|
| Turnstile fail | 403 | `turnstile_failed` | "Xác thực thất bại. Vui lòng thử lại." |
| Invalid phone | 422 | `validation_error` | Inline field error |
| Missing consent | 422 | `consent_required` | Inline error + refocus |
| Idempotency duplicate | 200 | `merged` | Same success state |
| Firestore write fail | 500 | `server_error` | "Xin lỗi, có lỗi. Vui lòng gọi hotline." + `tel:` |
| Network timeout | — | — | Offline state, disable submit |

**Edge cases:**
- Telegram down → log Sentry warning, KHÔNG fail lead submission (async, non-blocking)
- Firestore write thành công nhưng idempotency update fail → next replay sẽ try write again, Firestore transaction sẽ return `merged` nếu `phone_hash` trùng
- `client_request_id` đã tồn tại với status `processing` > 30s (stuck) → treat as failed, re-process

### §4.2. `POST /api/tiles/token`

**Sprint 1A mode:** Khi `MAP_TILES_ACCESS_MODE` missing hoặc `disabled`, endpoint phải deny-by-default.

- HTTP: `403`
- Body: error envelope `06 §4.0` với `code = "forbidden"`
- Headers: `Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0`, `Pragma: no-cache`, `Expires: 0`
- All non-POST methods: `405` + `Allow: POST` + same no-store headers
- Không verify Firebase/App Check thật trong Sprint 1A nếu app chưa wire; không return mock token.

**Sprint 1B+ protected mode (`MAP_TILES_ACCESS_MODE=protected`):**

Auth:
- Firebase App Check token required (`X-Firebase-AppCheck`)
- Firebase Auth ID token required (`Authorization: Bearer <idToken>`)
- Public map accepts Firebase Anonymous Auth; broker/admin scopes require Email Auth + role check

Validation:
1. Validate `Origin`/`Referer` against `NEXT_PUBLIC_SITE_URL` where available. Missing/stripped referer alone must not block if App Check + Auth pass, but should lower trust for telemetry/rate-limit.
2. Verify App Check token server-side.
3. Verify Firebase ID token server-side.
4. Rate limit by `ip_hash + uid_hash + app_check_hash`.
5. Validate requested route/scope/layers against whitelist.
6. Create JTI hash in `tile_access_jtis`.

Success response envelope:

```typescript
{
  ok: true;
  data: {
    token: string;
    expires_at: string; // ISO 8601
    refresh_after_seconds: number; // typically 180-240
  };
  meta: { request_id: string };
}
```

JWT TTL: 5 phút. Server verify phải dùng clock tolerance 30–60 giây.

Rate limit: 10 req/phút per `ip_hash + uid_hash` cho public map; broker/admin có limit riêng chặt hơn và audit nhiều hơn.

Token claims: xem `02 §6`. Token không được chứa raw PII, raw Firestore path, raw IP, hoặc secret.

### §4.3. `POST /api/tiles/manifest`

**Sprint 1A mode:** Khi `MAP_TILES_ACCESS_MODE` missing hoặc `disabled`, endpoint phải deny-by-default như `§4.2`, không return mock signed URL.

**Sprint 1B+ protected mode (`MAP_TILES_ACCESS_MODE=protected`):**

Auth: `tile_token` from §4.2

Validation:
1. Verify JWT signature, `aud`, `route`, `scope`, `allowed_layers`, `iat`, `exp`.
2. Apply clock tolerance 30–60 giây.
3. Check `jti` hash chưa revoked trong `tile_access_jtis`.
4. Reject requested layer nếu không nằm trong `allowed_layers`.
5. Rate limit by `ip_hash + uid_hash + jti_hash`.

Success response envelope:

```typescript
{
  ok: true;
  data: {
    signed_urls: Record<string, string>;
    expires_at: string; // ISO 8601, min expiry across signed URLs
  };
  meta: { request_id: string };
}
```

Cache: `no-store` for manifest response.

Signed URL TTL: default 5 phút; must not exceed tile token expiry by more than 60 giây.

Layer rules:
- Public manifest can include only public-safe layers.
- Broker/admin manifests must use separate scopes and role checks.
- Manifest response must not include raw bucket listing, GCS object inventory, internal metadata, or layers outside the requested scope.

**Edge case:** Token expired hoặc revoked → 401, client phải refresh token rồi retry
**UX edge case:** Manifest refresh fail khi map đang hiển thị → giữ map/layers cũ mounted, show calm degraded state/toast, retry theo backoff; KHÔNG unmount làm blank map.

### §4.4. `POST /api/revalidate`

Auth: `X-Revalidate-Secret` header (match `REVALIDATE_WEBHOOK_SECRET`)
Body: `{ paths?: string[], tags?: string[], reason: string (≥10 chars) }`
Rate limit: 10/phút/admin
Audit log bắt buộc

---

## §5. SEO Technical

### §5.1. Robots Policy

```
User-agent: *
Allow: /
Disallow: /portals/
Disallow: /broker/
Disallow: /api/
Sitemap: https://bacninhhonghaccity.vn/sitemap.xml
```

Staging environment: `Disallow: /` (toàn bộ)

### §5.2. Canonical URL Policy

- HTTPS only
- Lowercase path, no trailing slash
- Strip UTM params và ad click IDs từ canonical: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `fbclid`, `msclkid`, `ttclid`
- UTM/click ID vẫn capture server-side vào `leads.utm_*`

### §5.3. noindex Policy

| Route | Condition | robots meta |
|---|---|---|
| `/portals/*` | Always | `noindex, nofollow, noarchive` |
| `/broker/*` | Always | `noindex, nofollow, noarchive` |
| `/api/*` | Always | `noindex, nofollow` |
| `/sa-ban/[lot-id]` | `lot_code` invalid | 404 (không noindex) |
| `/sa-ban/[lot-id]` | ThinContentPolicy | `noindex` |
| `/blog/[slug]` | `claim_status ≠ approved_public` | `noindex` |
| `/blog` | < 3 approved articles | `noindex` |

### §5.4. Sitemap Partition

| File | Content | Rules |
|---|---|---|
| `sitemap.xml` | Index — trỏ tới sub-sitemaps | |
| `sitemap-core.xml` | Homepage + core routes + compliance | |
| `sitemap-cluster.xml` | Cluster pages (non-blog) | |
| `sitemap-blog.xml` | `/blog/[slug]` | Chunk 50k, chỉ `approved_public` |
| `sitemap-lot.xml` | `/sa-ban/[lot-id]` | Chunk 50k, chỉ non-noindex lots |

**Rules:**
- Mỗi URL CHỈ xuất hiện trong 1 child sitemap
- KHÔNG emit noindex URLs
- KHÔNG emit empty child sitemap (skip file nếu empty)

### §5.5. Slug Policy

- ASCII-only, lowercase, dùng `-` thay khoảng trắng
- Vietnamese diacritics stripped: `/phan-khu/hong-phat` (không phải `hồng-phát`)
- Max 80 chars
- Duplicate slug → CMS reject với error "Slug đã tồn tại"
- Helper: `lib/seo/slugify.ts`

### §5.6. Redirect Policy

| From | To | Type |
|---|---|---|
| `/bang-gia-hong-hac-city` | `/bang-gia` | 301 |
| `/phap-ly-hong-hac-city` | `/phap-ly` | 301 |
| `/vi-tri` | `/kham-pha-do-thi` | 301 |
| `http://` | `https://` | 301 |
| `/admin/login` | `/portals/admin/login?reason=auth` | 302 |

**Rules:** Chain tối đa 1 hop. KHÔNG dùng 302 cho SEO redirect. 302 chỉ cho auth redirect.

---

## §6. Fallback Pages (P0 — Block release nếu thiếu)

### §6.1. `not-found.tsx` (HTTP 404)

- H1: "Trang này không tồn tại"
- Sub: "Có thể đường dẫn thay đổi. Bạn cần hỗ trợ?"
- CTAs: Về trang chủ | Xem bảng giá | Liên hệ Zalo
- Hotline `tel:` link
- Event: `404_view` với `path_pattern` (sanitized regex — KHÔNG raw path)
- HTTP status: 404 (KHÔNG 200)

### §6.2. `error.tsx` (HTTP 500)

- H1: "Xin lỗi, có lỗi nhỏ"
- Sub: "Dữ liệu của bạn vẫn an toàn. Vui lòng thử lại."
- CTAs: Thử lại | Liên hệ qua Zalo
- Sentry capture tự động (không cần manual call)
- KHÔNG hiện stack trace — chỉ Error ID 8 chars (prefix của Sentry event ID)

### §6.3. `offline.tsx`

- H1: "Mất kết nối Internet"
- Hiển thị cached pages: `/`, `/bang-gia`, `/phap-ly`
- Lead form disabled khi offline (không queue ẩn)
- Hotline `tel:` vẫn hoạt động (không cần internet)
