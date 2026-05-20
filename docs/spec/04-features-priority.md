# 04 — Features & Sprint Priority (Hồng Hạc City)

**Version:** 3.0 | **Last updated:** 2026-05-16 | **Status:** Approved
**Authority:** Sprint Route Manifest — Lighthouse CI phải đọc file này để chọn route list. KHÔNG hardcode riêng trong CI.

---

## §0. Implementation Contract References

File này quyết định phase/priority/route manifest, không thay thế contract chi tiết. Khi implement một feature trong bảng dưới đây, phải đọc thêm:

| Topic | Required contract |
|---|---|
| Route/API/page acceptance | `.ai/core/done-criteria.md`, `06 §4.0`, `16` |
| Kanban/table/list/search/filter | `05 §5.1`, `05 §5.5`, `07 §10.1`, `07 §10.4` |
| Status update/inventory/score/routing | `05 §5.3`, `05 §5.6`, `10` |
| Telegram/email/webhook/event | `02 §5.1–5.2`, `12`, `13` |
| Calculator slider/input | `07 §10.2`, `07 §10.4` |
| A/B experiment/hidden/deferred/release | `02 §5.3`, `04 §7`, `17 §8` |

Every feature task must include acceptance criteria and evidence before mark complete.

---

## §1. Sprint Route Manifest (Source of Truth cho CI)

### §1.1. Sprint 1A — Required (Lighthouse CI fail nếu không pass)

| Route | Status | Lighthouse Perf min |
|---|---|---|
| `/` | `implemented` | ≥ 90 |
| `/sa-ban` | `implemented_shell` | ≥ 90 |
| `/bang-gia` | `implemented` | ≥ 90 |
| `/phap-ly` | `implemented` | ≥ 90 |
| `/tu-van` | `implemented` | ≥ 90 |
| `/lien-he` | `implemented` | ≥ 90 |
| `/yeu-cau-du-lieu` | `implemented` | ≥ 90 |
| `/chinh-sach-bao-mat` | `implemented` | ≥ 90 |

### §1.2. Sprint 1A — Optional (CI KHÔNG fail nếu chưa implement)

| Route | Điều kiện include trong CI |
|---|---|
| `/kham-pha-do-thi` | `implemented = true` |
| `/phan-khu/hong-phat` | `implemented = true` |

### §1.3. Sprint 1B — Excluded khỏi 1A CI

`/sa-ban/[lot-id]`, `/tiem-nang`, `/tien-do`, `/phong-cach-song`, `/phan-khu/hong-thinh`, `/phan-khu/hong-phuc`, `/vay-mua`, `/roi`, `/blog/[slug]`

`/sa-ban` full interactive map remains Sprint 1B. Sprint 1A only requires the route shell, SaBanPreview, core-product positioning, fallback modal, and instrumentation. Phase 0 still creates route stubs only per `P0-000`; no `maplibre-gl` import is allowed before the mapped implementation phase.

### §1.4. Sprint 2

`/doi-tac`, `/tiem-nang/so-sanh/*`, A/B experiments

---

## §2. Feature Priority

### P0 — Sprint 1A (Block release nếu thiếu)

| ID | Feature | Route | Notes |
|---|---|---|---|
| P0-01 | Homepage | `/` | Hero + Lifestyle + PersonaSplitter + LeadMagnet |
| P0-02 | Lead form (multi-surface) | All 1A routes | Firestore write + Telegram |
| P0-03 | Bảng giá tham khảo | `/bang-gia` | Price policy + lead magnet |
| P0-04 | Pháp lý | `/phap-ly` | Legal evidence + FAQ |
| P0-05 | Tư vấn / Liên hệ | `/tu-van`, `/lien-he` | Advisory CTA |
| P0-06 | Consent banner (PDPA) | Global | Default = denied |
| P0-07 | Speed-to-lead Telegram | Server | ≤ 30s từ submit |
| P0-08 | Privacy + DSAR pages | `/chinh-sach-bao-mat`, `/yeu-cau-du-lieu` | Compliance |
| P0-09 | Admin lead dashboard (basic) | `/portals/admin` | Kanban + scoring |
| P0-10 | Fallback pages | Global | not-found, error, offline |
| P0-11 | Sa bàn shell | `/sa-ban` | Core-product route shell, SaBanPreview, FallbackModal; no MapLibre import |

### P1 — Sprint 1B

| ID | Feature | Route | Notes |
|---|---|---|---|
| P1-01 | Sa bàn — Map tương tác | `/sa-ban` | MapLibre + PMTiles |
| P1-02 | Khám phá đô thị | `/kham-pha-do-thi` | Vision 20 năm |
| P1-03 | Hồng Phát phân khu | `/phan-khu/hong-phat` | Current release |
| P1-04 | Tiến độ | `/tien-do` | Progress timeline |
| P1-05 | Tiềm năng | `/tiem-nang` | Market intelligence |
| P1-06 | Phong cách sống | `/phong-cach-song` | Lifestyle content |
| P1-07 | Calculator tính vay | `/vay-mua` | Mortgage tool |
| P1-08 | Programmatic lot pages | `/sa-ban/[lot-id]` | SSG + conditional noindex |
| P1-09 | Admin inventory management | `/portals/admin/inventory` | Lot status update |
| P1-10 | Round-robin lead routing | Server cron | SLA 2/5 phút |

### P2 — Sprint 2

| ID | Feature | Route/Notes |
|---|---|---|
| P2-01 | ROI/Cashflow calculator | `/roi` |
| P2-02 | AI Matching Engine | Persona → highlighted lots on map |
| P2-03 | Comparison hub | Trung lập, Tier-verified — xem `00 §10` |
| P2-04 | Hồng Thịnh, Hồng Phúc | Khi data Tier 1 available |
| P2-05 | Blog / Content cluster | `/blog/[slug]` |
| P2-06 | Watchlist / Phase follow | Email/Zalo drip |
| P2-07 | Đối tác page | `/doi-tac` |
| P2-08 | A/B Experimentation | Requires experiment registry `§7` |

---

## §3. Homepage CTA Binding Table (Sprint 1A — Bắt buộc)

| CTA label | Target | Sprint 1A status | Fallback nếu chưa implement |
|---|---|---|---|
| Khám phá sa bàn | `/sa-ban` | implemented shell | `FallbackModal` inside shell for unavailable map/actions |
| Tính phương án sở hữu | `/vay-mua` | excluded | `FallbackModal` |
| Xem thông tin pháp lý | `/phap-ly` | implemented | direct link |
| Nhận thông tin tư vấn | `/tu-van` | implemented | direct link |
| Xem bảng giá tham khảo | `/bang-gia` | implemented | direct link |
| Mua để ở (PersonaSplitter) | `/tu-van` hoặc lead form | implemented | direct link |
| Đầu tư (PersonaSplitter) | `/tu-van` hoặc lead form | implemented | direct link |
| Môi giới (PersonaSplitter) | `/lien-he` | implemented | direct link |

**Rules:**
- KHÔNG có CTA dẫn tới 404. Mọi CTA phải có fallback rõ ràng.
- Homepage first viewport must expose "Khám phá sa bàn" or equivalent `00 §8` CTA before price/lead-magnet sections.
- `FallbackModal` copy cố định: "Nội dung đang được cập nhật. Bạn có thể để lại thông tin nhận tư vấn theo nhu cầu mới nhất."
- `FallbackModal` surface: `popup_fallback` (lead form bên trong modal)

---

## §4. Financial Tools Contract

### §4.1. Tính Vay — `/vay-mua`

**Inputs:**
- `property_value` (VNĐ) — slider, min 500M, max 100B
- `down_payment_pct` (%) — slider 20–50%
- `loan_term_years` — select: 5, 10, 15, 20, 25, 30
- `interest_rate_band` — select: `5_7`, `7_10`, `10_15`

**Outputs:** Monthly payment range | Debt ratio indicator | Affordability indicator

**Rules:**
- Disclaimer bắt buộc: xem `00 §11.2`
- KHÔNG hardcode lãi suất tuyệt đối — luôn đọc từ `bank_rates` collection (`05 §2.5`)
- Khi `bank_rates` không có data hoặc expired → hiện disclaimer "Lãi suất tham khảo đang được cập nhật" + giá trị default trung bình phổ biến thị trường

**Edge cases:**
- User nhập `property_value` < `down_payment` → validation inline "Số tiền vay phải > 0"
- `bank_rates` collection rỗng hoặc tất cả rates đã expired → dùng hardcoded fallback range (7–12%) với disclaimer rõ ràng, log warning lên Sentry
- Calculator crash (exception) → error boundary, hiện "Công cụ tạm thời không khả dụng. Liên hệ tư vấn để được hỗ trợ." + lead form

### §4.2. ROI Calculator — `/roi` (Sprint P2)

**Inputs:** `purchase_price_band`, `holding_period_band` (`short_3y/mid_5y/long_7y`), `scenario_type` (`conservative/base/optimistic`)

**Outputs:** Appreciation range | Rental yield range | Scenario comparison chart

**Rules:**
- Disclaimer bắt buộc: xem `00 §11.3`
- KHÔNG claim "ROI chắc chắn X%"
- Tracking events: `calculator_start_roi`, `calculator_submit_roi`, `calculator_result_view_roi`, `calculator_lead_submit_roi` — xem `12 §2.4`

---

## §5. Sa bàn Feature Spec

### §5.1. Map Layers

| Layer | Sprint | Owner component |
|---|---|---|
| Base map (PMTiles vector) | 1B | `SaBanMap` |
| Lot overlay (status colors) | 1B | `SaBanMap` |
| Phase highlight | 1B | `SaBanMap` |
| Infrastructure overlay | 1B | `SaBanMap` |
| Greenery heatmap | 2 | `SaBanMap` |
| Sunlight orientation | 2 | `SaBanMap` |
| Privacy/density score | 2 | `SaBanMap` |

### §5.2. AI Matching (Sprint P2)

Input: Persona + Budget band + Goals + Family size + Lifestyle
Output: Highlighted lots on map + recommendation cards
Constraint: KHÔNG render price/legal nếu null — xem `00 §4.2`

### §5.3. Lot Click Popup (Owner: `LotPopup` component)

Khi user click lô trên map:
- Hiển thị: `lot_code`, `phan_khu_name`, `area_range`, `product_type`
- Nếu field null → safe-default wording từ `00 §7`
- CTA: "Nhận thông tin lô này" → mở `LeadFormModal` với `surface = sa_ban_lot`
- Link: "Xem chi tiết" → `/sa-ban/[lot-id]`
- KHÔNG render price/legal nếu `price_visibility = hidden` hoặc `status ∈ {hidden, sold}`

**Edge cases:**
- Lot không tồn tại trong DB nhưng có trên map tile → hiện popup tối giản "Thông tin lô đang được cập nhật" không có CTA
- Map tile lag/chưa load → spinner placeholder trong popup
- User click nhiều lô nhanh → chỉ hiện popup của lô cuối cùng, hủy popup trước

---

## §6. Lead Scoring Summary

> Bảng đầy đủ và canonical tại `08 §6`. Dưới đây là summary để tham chiếu nhanh.

| Hành vi | Score |
|---|---|
| Xem sa bàn | +10 |
| Xem current release | +15 |
| Dùng AI Matching | +20 |
| Dùng tính vay | +20 |
| Xem bảng giá | +15 |
| Đặt lịch tư vấn | +40 |

**Threshold:** Hot ≥ 70 → Sales gọi ≤ 3 phút (HC). Warm 40–69 → SLA 5 phút (HC). Cold 20–39 → nurture. Junk < 20 → filter.

> **HC = Hành chính = 08:00–21:00 ICT.** SLA chỉ tính trong giờ HC. Ngoài HC: SLA tính từ đầu giờ HC tiếp theo.

---

## §7. A/B Experimentation Registry

**Fields bắt buộc per experiment:**

| Field | Type | Required |
|---|---|---|
| `experiment_id` | string (slug) | Yes |
| `hypothesis` | string (falsifiable — "Nếu X thì Y vì Z") | Yes |
| `variants` | string[] (≥ 2) | Yes |
| `primary_metric` | GA4 event name | Yes |
| `guardrail_metrics` | string[] | Yes |
| `min_sample_size` | number (per variant) | Yes |
| `status` | `draft/approved/running/paused/completed/rolled_back` | Yes |
| `start_date` | ISO 8601 date | Yes (khi `running`) |
| `end_date` | ISO 8601 date | Yes (khi `completed/rolled_back`) |
| `winner` | string \| null | Yes (khi `completed`) |

**Forbidden trong experiments:**
- Dark patterns
- Fake urgency timers
- PII-based assignment
- Hiding consent controls
- Experiments trên pages có `noindex`

**CRO 9.5 gate:** Cần ≥ 1 `completed` experiment với `evidenceBasis` runtime trước khi đạt CRO score ≥ 9.5 (xem `16 §3.3`).
