# 07 — UI/UX & Design System (Hồng Hạc City)

**Version:** 3.0 | **Last updated:** 2026-05-16 | **Status:** Approved

---

## §1. Design Philosophy — Luxury PropTech

**Tone:** Intelligent, calm, editorial — không aggressive sales.
**Reference:** Phú Mỹ Hưng brand expression.

| Nguyên tắc | Chi tiết |
|---|---|
| Whitespace | Generous — section padding: 80px mobile, 120px desktop |
| CTA pressure | Giảm thiểu — không sticky CTA trên every scroll |
| Text density | Tối đa 5 dòng mỗi paragraph editorial |
| Motion | Subtle — ≤ 600ms, `ease-out`, không bouncy |
| Trust | Tăng — citations, real data, real author |
| Realism | Tăng — lived-in photography > glossy CGI render |

---

## §2. Content Section Templates

### §2.1. LifestyleSection (3 story cards)

Mỗi card có:
- Ảnh editorial (lived-in style — xem `01 §9`)
- Category label: `Gia đình` | `Sống xanh` | `Cộng đồng` | `Nghỉ dưỡng`
- Headline: ≤ 8 words
- Sub-copy: ≤ 20 words
- CTA: link tới `/phong-cach-song`

**Acceptance criteria:**
- KHÔNG dùng stock photo có logo nước ngoài hoặc signage không liên quan
- KHÔNG dùng render CGI quá bóng bẩy nếu không có real asset
- Ảnh phải có `approvalStatus = approvedForPublic` hoặc dùng `AbstractPlaceholder` (`§12`)

### §2.2. PersonaSplitter (3 cards — copy canonical)

| Card | Headline | Sub-copy | CTA label |
|---|---|---|---|
| Mua để ở | "Sống đúng nhịp của gia đình bạn" | "Tìm không gian phù hợp với lối sống" | Tìm vị trí phù hợp |
| Đầu tư | "Theo dõi tiềm năng tăng trưởng dài hạn" | "Phân tích đầu tư theo từng giai đoạn" | Tính phương án đầu tư |
| Môi giới | "Tài nguyên cho nhà tư vấn chuyên nghiệp" | "Cập nhật thông tin dự án theo thời gian thực" | Liên hệ hợp tác |

**Rule:** CTA text phải khớp chính xác với `00 §8`. KHÔNG dùng: "Đăng ký ngay", "Book now".

### §2.3. HeroSection

- **H1**: Về urban statement — không phải tên sản phẩm, không phải "Mua ngay"
- **Sub-copy**: ≤ 25 words, không có số cứng về giá
- **Primary CTA**: "Khám phá sa bàn" → `/sa-ban`
- **Secondary CTA**: "Xem bảng giá tham khảo" → `/bang-gia`
- **Tertiary CTA**: "Nhận tư vấn riêng" → `/tu-van`
- **Trust line**: "Thông tin tham khảo. Vui lòng xác nhận với nguồn chính thức của chủ đầu tư."
- Mini interactive map preview: static image Sprint 1A, interactive Sprint 1B

---

## §3. Component Library Structure

```
components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── StickyZaloButton.tsx
│   └── ExitIntentPopup.tsx
├── home/
│   ├── HeroSection.tsx
│   ├── TrustBand.tsx
│   ├── LifestyleSection.tsx
│   ├── PersonaSplitter.tsx
│   ├── CurrentReleaseSection.tsx
│   ├── DecisionSupportSection.tsx
│   ├── EasternHanoiGrowthSection.tsx
│   ├── LiveProgressPreview.tsx
│   ├── LeadMagnetSection.tsx
│   ├── FAQSection.tsx
│   └── FinalCTASection.tsx
├── forms/
│   ├── LeadForm.tsx              # Multi-surface, prop: surface (05 §4.4)
│   ├── LeadFormModal.tsx         # Modal wrapper cho LeadForm
│   └── FallbackModal.tsx         # Khi route chưa implement — surface: popup_fallback
├── map/
│   ├── SaBanMap.tsx              # Client-only, dynamic import ssr:false, lazy
│   ├── LotPopup.tsx              # Owner của lot click popup (04 §5.3)
│   ├── LayerToggle.tsx
│   └── MapFilters.tsx
├── tools/
│   ├── VayMuaCalculator.tsx      # Sprint P1
│   └── ROICalculator.tsx         # Sprint P2
├── seo/
│   ├── PageMeta.tsx
│   └── schemas/
│       ├── WebSiteSchema.tsx
│       ├── OrganizationSchema.tsx
│       ├── RealEstateListingSchema.tsx
│       ├── FAQSchema.tsx
│       ├── ArticleSchema.tsx
│       └── BreadcrumbSchema.tsx
└── ui/
    ├── Button.tsx
    ├── Card.tsx
    ├── Badge.tsx
    ├── Skeleton.tsx
    ├── ProgressBar.tsx
    └── AbstractPlaceholder.tsx   # (§12)
```

---

## §4. Accessibility (A11y) Requirements

| Requirement | Standard | Sprint |
|---|---|---|
| Color contrast text | WCAG 2.1 AA (4.5:1 normal, 3:1 large) | 1A |
| Keyboard navigation | Tất cả interactive elements | 1A |
| ARIA labels | Tất cả icon buttons, map controls | 1A |
| Skip to main content | Link trên header | 1A |
| Focus visible | Không xóa outline | 1A |
| Image alt text | Tất cả meaningful images | 1A |
| Form error messages | Accessible announcement (aria-live) | 1A |
| Map alternative | Text fallback cho screen readers | 1B |
| axe-core CI | Không có `serious` hoặc `critical` violations | 1A |

---

## §5. Design Tokens (SSOT — `tailwind.config.ts`)

```typescript
// Colors
'--color-brand-primary': '#B5893A'    // Luxury gold
'--color-brand-secondary': '#1C2B3A' // Deep navy
'--color-surface': '#FAFAF8'          // Warm off-white
'--color-text-primary': '#1C2B3A'
'--color-text-secondary': '#6B7280'
'--color-text-muted': '#9CA3AF'
'--color-border': '#E5E7EB'
'--color-success': '#16A34A'
'--color-warning': '#D97706'
'--color-error': '#DC2626'

// Lot status colors (map) — sync với 05 §4.6
'--color-lot-available': '#22C55E'
'--color-lot-holding': '#EAB308'
'--color-lot-deposited': '#F97316'
'--color-lot-sold': '#6B7280'
'--color-lot-unknown': '#D1D5DB'
'--color-lot-stale': '#E5E7EB'

// Typography
'--font-display': 'Playfair Display, Georgia, serif'    // H1, H2
'--font-body': 'Be Vietnam Pro, Inter, sans-serif'       // Body, UI
'--font-mono': 'JetBrains Mono, monospace'               // Code/data

// Spacing
'--section-padding-mobile': '80px'
'--section-padding-desktop': '120px'

// Motion
'--motion-duration-fast': '200ms'
'--motion-duration-base': '400ms'
'--motion-duration-slow': '600ms'
'--motion-easing': 'cubic-bezier(0.4, 0, 0.2, 1)'
```

---

## §6. Map UI Rules (Owner: `SaBanMap` + `LotPopup`)

- Map phải là **full-width** trên `/sa-ban`
- Sidebar filters: max-width 320px, collapsible trên mobile
- Lot click → `LotPopup` (KHÔNG navigate trực tiếp) — spec popup: `04 §5.3`
- AI Matching results → highlighted lots với glow ring animation (≤ 400ms)
- Layer toggle: icon + label — KHÔNG chỉ icon (a11y)
- Loading state: Skeleton shimmer, KHÔNG spinner giữa map
- Map tile error (GCS signed URL expired) → hiện toast "Bản đồ đang tải lại" + auto retry 1 lần

---

## §7. Mobile Requirements

- Breakpoints: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px
- Map trên mobile: full-screen với bottom sheet panel (swipeable)
- Lead form: single column, input height ≥ 48px (touch target)
- Sticky CTA bar: chỉ hiện SAU khi scroll qua 80% hero — KHÔNG show khi load
- Font size minimum: 16px body (tránh iOS auto-zoom)
- Framer Motion: respect `prefers-reduced-motion` — tắt animation hoàn toàn

---

## §8. TrustBand Partner Logo Policy

- KHÔNG hiển thị logo đối tác nếu chưa có `partnerLogoApprovalStatus = approved`
- Default khi chưa có logo: text-based trust signals
- Trust signals text safe (không cần approval): "Tham chiếu thương hiệu Phú Mỹ Hưng", "Dự án 197ha tại Bắc Ninh"

---

## §9. Asset Management Rules

- Ảnh drone/render phải có `approvalStatus = approvedForPublic`
- Chưa có asset thật → `AbstractPlaceholder` component (`§12`)
- Ảnh lifestyle KHÔNG được có logo nước ngoài, signage không liên quan
- Video phải có `autoplay`, `muted`, `playsInline`, `loop`, `poster` fallback image

---

## §10. Lead Form UX Rules (UI layer — logic tại `08`)

- `phone` hoặc `email` — 1 trong 2 bắt buộc (không require cả 2)
- `full_name` optional nhưng strongly encouraged (hint text)
- Checkbox `consent_privacy` bắt buộc, **default unchecked**
- Label consent có link tới `/chinh-sach-bao-mat` (opens new tab)
- Form error: inline message dưới field, KHÔNG dùng browser `alert()`
- Submit loading: spinner trong button, button `disabled`, text = "Đang gửi..."
- Submit success: swap form sang success state (không reload page)
- Success copy: "Cảm ơn bạn. Chúng tôi sẽ liên hệ trong thời gian sớm nhất."
- Offline state: disable submit button, hiện "Vui lòng kiểm tra kết nối Internet"

### §10.1. Global UI State Matrix

Áp dụng cho public pages, admin portal, broker portal và mọi interactive tool. Một route không được coi là hoàn tất nếu chỉ render happy path.

| State | Required UI behavior | Required engineering behavior |
|---|---|---|
| Loading | Skeleton hoặc spinner đúng vị trí, không nhảy layout | Không chặn toàn trang nếu chỉ một panel đang tải |
| Empty | Copy nói rõ chưa có dữ liệu + next action hợp lý | Không render bảng/card trống không nhãn |
| Error | Inline error hoặc toast; không dùng browser `alert()` | Log `request_id`; không expose stack trace |
| Offline | Hiển thị trạng thái mất kết nối; disable network actions | Không tạo duplicate request khi online lại |
| Timeout | Hiển thị retry affordance | Request có timeout rõ ràng; retry không phá idempotency |
| Saving/Submitting | Button disabled, text đổi sang "Đang lưu..." hoặc "Đang gửi..." | Double-click không tạo duplicate write |
| Success | Xác nhận nhẹ, giữ ngữ cảnh người dùng | Không reload toàn trang trừ khi cần refresh auth/session |
| Conflict/Stale data | Báo dữ liệu đã thay đổi, yêu cầu tải lại | API trả `409 stale_write` theo `06 §4.0` |
| Forbidden/Auth expired | Redirect login/access denied có lý do ngắn | Không leak dữ liệu route bị chặn |
| Optimistic update rollback | Nếu fail, trả UI về trạng thái cũ + message | Chỉ optimistic khi có snapshot trước đó |

**Interaction rules:**
- Mọi nút ghi dữ liệu phải có disabled state trong lúc request chạy.
- Destructive action phải có confirm modal; hard delete/PII reveal dùng rule riêng tại `03`.
- Form dài phải giữ dữ liệu khi lỗi mạng, auth hết hạn hoặc user bị redirect login.
- Error text dùng tiếng Việt rõ nghĩa, không hiển thị mã kỹ thuật làm nội dung chính.
- Các trạng thái quan trọng phải có `aria-live` hoặc thông báo accessible tương đương.

### §10.2. Retry / Backoff / Optimistic UI

| Interaction | Default behavior |
|---|---|
| Lead submit | Không optimistic. Chờ server success; retry thủ công để tránh duplicate, dựa vào `client_request_id` |
| Admin status update/Kanban | Có thể optimistic nếu giữ snapshot cũ và rollback khi API fail |
| Search/filter | Không retry tự động vô hạn; retry tối đa 1 lần nếu network glitch |
| Read-only route data | Retry tối đa 2 lần: 500ms → 1500ms, sau đó hiện error/empty state |
| Third-party widget fail | Không chặn page; hiện degraded state nếu widget critical |

**Backoff rules:**
- Transient read retry: 500ms → 1500ms.
- Mutation retry tự động chỉ khi operation có idempotency key hoặc safe retry guarantee.
- Không retry 4xx trừ `409 stale_write` có user action reload.
- Khi API trả `retry_after_seconds`, UI phải tôn trọng delay đó.

**Optimistic UI rules:**
- Mọi optimistic update phải có rollback state.
- Khi rollback, UI phải hiển thị lý do ngắn và giữ người dùng ở cùng ngữ cảnh.
- Nếu conflict/stale-write, không tự ghi đè; yêu cầu reload latest data.

### §10.3. Focus Management & Keyboard Navigation

| Component | Requirement |
|---|---|
| Modal/dialog | Focus trap khi mở; `Escape` đóng nếu không phải destructive confirmation |
| Confirm modal | Focus mặc định vào safe action; destructive action không được là focus đầu tiên |
| Drawer/mobile nav | Tab order tuần tự; đóng drawer trả focus về nút mở |
| Form error | Sau submit fail, focus vào field lỗi đầu tiên hoặc summary có `aria-live` |
| Toast/status message | Không yêu cầu focus, nhưng phải có accessible announcement |
| Map/tool panels | Keyboard có thể tab tới control chính; không kẹt focus trong map canvas |

Mọi UI interactive phải test được bằng keyboard cơ bản trước khi mark complete: Tab, Shift+Tab, Enter/Space, Escape với modal/drawer.

### §10.4. Debounce / Throttle Rules

| Interaction | Rule |
|---|---|
| Search text input | Debounce 300–500ms; chỉ search khi ≥2 ký tự nếu không phải local tiny list |
| Filter checkbox/select | Có thể apply ngay, nhưng phải cancel request cũ nếu request mới hơn |
| Slider/calculator | Debounce expensive calculation/API 150–300ms; local math có thể update immediate |
| Map pan/zoom fetch | Throttle/debounce theo viewport; không gọi API từng pixel movement |
| Admin table filter | Debounce 300ms + reset cursor về trang đầu |

Nếu dùng debounce/throttle, UI vẫn phải có loading/saving state rõ ràng theo `§10.1`.

---

## §11. Luxury Principles Checklist (Trước release)

- [ ] Không có "Mua ngay", "Chốt", "Giá sốc", "50 căn cuối"
- [ ] Section padding ≥ 80px mobile
- [ ] Không quá 3 CTAs trong một viewport
- [ ] Framer Motion max 600ms, `prefers-reduced-motion` respected
- [ ] Sticky CTA bar chỉ sau scroll 80% hero
- [ ] `--font-display` dùng cho H1/H2 — KHÔNG dùng cho body text
- [ ] Tất cả images: WebP, có `alt` phù hợp
- [ ] Trust disclaimer `00 §11.1` xuất hiện ít nhất 1 lần trên mỗi critical page
- [ ] Không sticky CTA bar ngay khi load

---

## §12. AbstractPlaceholder Component Contract

```typescript
interface AbstractPlaceholderProps {
  aspectRatio: '16/9' | '4/3' | '1/1' | '3/2';
  label?: string;  // Default: "Ảnh thực tế đang được cập nhật"
  category?: 'urban' | 'lifestyle' | 'infrastructure' | 'interior';
}
```

- Render: gradient background + minimal typography + `label`
- Khi `approvalStatus` của asset thay đổi thành `approvedForPublic` → swap sang real image tự động (ISR revalidate)
- `alt` text = `label` value
