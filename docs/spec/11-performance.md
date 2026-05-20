# 11 — Performance & Core Web Vitals (Hồng Hạc City)

**Version:** 3.0 | **Last updated:** 2026-05-16 | **Status:** Approved

---

## §1. Performance Philosophy

Luxury calm = fast loading. Mọi animation, image, JS phải serve performance, không sacrifice it.
**Rule:** Nếu một feature làm Lighthouse Performance < target → feature bị block hoặc lazy-load thêm.

---

## §2. Core Web Vitals Targets

| Metric | Target | Fail threshold | Notes |
|---|---|---|---|
| LCP | ≤ 2.5s | > 4.0s | Hero image phải có `priority={true}` |
| INP (thay FID) | ≤ 100ms | > 200ms | |
| CLS | ≤ 0.1 | > 0.25 | Reserve space cho images và map |
| TTFB | ≤ 800ms | — | ISR/Edge caching |
| FCP | ≤ 1.8s | — | |

---

## §3. Image Optimization Rules

- Tất cả images phải dùng `next/image`
- Format: WebP primary, AVIF optional (progressive enhancement)
- `sizes` attribute phải chính xác theo breakpoint thực tế — KHÔNG dùng `100vw` cho tất cả
- LCP image phải có `priority={true}` (preload)
- Lazy load tất cả images below the fold
- KHÔNG dùng raw `<img>` tag (ESLint rule bắt buộc)
- `alt` bắt buộc cho meaningful images; `alt=""` (empty string) cho decorative

**Edge cases:**
- Hero image chưa có `approvalStatus = approvedForPublic` → render `AbstractPlaceholder` (`07 §12`), KHÔNG skip `priority` prop
- Image 404 → `onError` handler swap sang placeholder, log Sentry

---

## §4. JavaScript Optimization

- React Server Components cho mọi page content
- `SaBanMap` (MapLibre, PMTiles): Client Component, `dynamic(() => import(), { ssr: false })`, lazy load
- Framer Motion: lazy import, không load trên SSR, `AnimatePresence` only khi cần
- Calculator components: Client Component, lazy import
- Route-based code splitting: tự động với Next.js App Router
- Third-party scripts (GTM, Sentry): `strategy="afterInteractive"` hoặc `lazyOnload`
- KHÔNG import MapLibre hoặc PMTiles ở bất kỳ route nào ngoài `/sa-ban`
- Map token/manifest refresh phải giữ map hiện tại mounted trong lúc refresh. Không unmount hoặc clear layer cũ chỉ vì token đang renew.
- Token/manifest refresh should happen 60–120 giây trước expiry. Không phụ thuộc duy nhất vào `setTimeout`; refresh cũng phải chạy lại khi tab regain focus/visibility hoặc khi MapLibre request gặp 401/403 signed URL expiry.

---

## §5. Bundle Budget

| Route | JS Budget (gzipped) | CSS Budget |
|---|---|---|
| Homepage (`/`) | ≤ 120 KB | ≤ 30 KB |
| `/sa-ban` (map shell, không tính map chunk) | ≤ 150 KB | ≤ 30 KB |
| Map chunk (lazy loaded) | ≤ 500 KB | — |
| Other pages | ≤ 100 KB | ≤ 30 KB |

Bundle over budget → PR flag (không block merge, nhưng phải có resolution plan trong PR description).

---

## §6. Lighthouse CI Targets

### §6.1. Score Targets

| Route type | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Core pages 1A (required) | ≥ 90 | ≥ 90 | ≥ 90 | ≥ 90 |
| Pillar pages | ≥ 85 | ≥ 90 | ≥ 90 | ≥ 90 |
| `/sa-ban` (map) | ≥ 80 | ≥ 85 | ≥ 90 | ≥ 85 |

**Block merge conditions:**
- Core page Performance < 90
- Any page Accessibility < 85
- SEO < 90 cho bất kỳ indexed page nào

### §6.2. Route Selection for CI

**Source of truth:** `04 §1` Sprint Route Manifest.
KHÔNG hardcode route list riêng trong CI config.
KHÔNG fail CI cho routes thuộc Sprint 1B hoặc 2 chưa implement.

---

## §7. Font Loading Strategy

```html
<!-- Preconnect trước -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Display font — display=swap để không block render -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet" />

<!-- Body font -->
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

Font fallback: `Georgia, serif` cho display; `Inter, sans-serif` cho body.

**Edge case:** Nếu Google Fonts unavailable → fallback fonts phải không gây CLS (font-size và metrics tương đương).

---

## §8. Caching Strategy

| Resource type | Cache-Control |
|---|---|
| Next.js static assets (`_next/static/`) | `public, max-age=31536000, immutable` |
| SSG pages (ISR) | Vercel Edge Cache, auto-revalidate khi webhook trigger |
| API routes (`/api/*`) | `no-store` |
| Tile token/manifest | `no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0` |
| Sprint 1A tile API stubs | `no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0` |
| PMTiles signed URL | `private, max-age=300` hoặc thấp hơn signed URL TTL; không dùng `no-store` cho tile binary |
| PMTiles static fallback | `public, max-age=86400` |
| Images (CDN) | `public, max-age=2592000` |

**Map cache rules:**
- Token and manifest responses are secrets/control-plane metadata and must never be stored by browser/CDN.
- PMTiles signed URL is a bearer URL; TTL must be short, but tile binary needs short private caching for smooth pan/zoom.
- If signed URL expires mid-session, client must refresh manifest and retry once before showing degraded fallback.
- Intermediary CDN/proxy must not cache token/manifest. Public tile binary cache must never outlive signed URL validity unless the object is an explicitly public static fallback.

---

## §9. Motion Performance

- Framer Motion: chỉ animate `opacity` và `transform` (GPU composited)
- KHÔNG animate `width`, `height`, `top`, `left` (gây layout thrash)
- Max animation duration: 600ms (`07 §5`)
- `prefers-reduced-motion`: disable ALL animation — kiểm tra trong CI axe-core
- Page transitions: fade opacity ≤ 200ms

---

## §10. Service Worker / PWA

- Sprint 1A: Cache static shell cho offline: `/`, `/bang-gia`, `/phap-ly`
- Precache total limit: ≤ 500 KB
- SW update strategy: `stale-while-revalidate` cho shell, `network-first` cho content pages
- Lead form: KHÔNG queue offline (Sprint 1A) — disable submit khi offline (`06 §6.3`)

**Edge case:** SW update available → hiện unobtrusive banner "Phiên bản mới đã sẵn sàng" với nút "Cập nhật ngay" (không tự force reload).
