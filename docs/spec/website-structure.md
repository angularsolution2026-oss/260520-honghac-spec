# HỒNG HẠC CITY — Website Structure / IA Lock

> Platform domain: `https://bacninhhonghaccity.vn` (env: `NEXT_PUBLIC_SITE_URL`)
> Official CĐT site (khác): `honghacphumyhung.vn`
> Xem `00 §2` để hiểu sự khác biệt giữa hai domain.
> Route completeness must be audited together with `17-launch-data-readiness.md`. A route can have full structure but still be blocked for public launch if required live content, data, or approved assets are missing.

---

## §0. Positioning Lock

Website này là **Luxury PropTech / Urban Intelligence Decision Platform**, không phải sales microsite.

**Mental model bắt buộc:**

```text
Official website = authority source / công bố chính thức
bacninhhonghaccity.vn = decision platform / công cụ hiểu - so sánh - theo dõi - tính toán - chọn vị trí phù hợp
```

**Không được để IA trượt về:**
- landing page bán hàng một trang
- brochure dự án
- trang mở bán / giỏ hàng / bảng hàng
- clone official site
- site môi giới truyền thống với CTA lộ

**Luồng trải nghiệm chuẩn:**

```text
Wonder
  -> Explore the city
  -> Interact with Sa bàn
  -> Understand phase / legal / progress / price context
  -> Compare options
  -> Calculate affordability
  -> Follow phase / position
  -> Ask for advisory help
```

Mọi route public phải trả lời ít nhất một câu hỏi quyết định của người mua:

| Question | Primary route |
|---|---|
| Dự án này là gì và khác gì official site? | `/`, `/kham-pha-do-thi` |
| Tôi nên nhìn dự án qua bản đồ nào? | `/sa-ban` |
| Giai đoạn/phân khu nào phù hợp với tôi? | `/sa-ban`, `/phan-khu/hong-phat`, `/tu-van` |
| Có căn/vị trí nào đáng theo dõi? | `/sa-ban`, `/sa-ban/[lot-id]` |
| Pháp lý, tiến độ, nguồn tin có đáng tin không? | `/phap-ly`, `/tien-do` |
| Tôi có đủ khả năng tài chính không? | `/vay-mua`, `/bang-gia` |
| Nên mua để ở, đầu tư, hay theo dõi thêm? | `/tiem-nang`, `/tu-van` |

---

## §1. IA 100/100 Gate

Không được claim "đạt 100/100" khi chưa có runtime evidence (`00 §12`, `16 §4`). Tuy nhiên, cấu trúc website chỉ được xem là **IA-ready** khi pass toàn bộ 10 gate dưới đây.

| Gate | Requirement | Blocker nếu fail |
|---|---|---|
| 1. Map-first | `/sa-ban` có mặt trong top nav, homepage first viewport và footer decision path | Core product bị chôn sâu |
| 2. No brochure flow | Homepage không đi theo thứ tự Tổng quan -> Vị trí -> Tiện ích -> Bảng giá -> Đăng ký | Dễ rebuild thành microsite |
| 3. Decision jobs | Mỗi pillar gắn với một user decision job rõ ràng | Page trang trí / content filler |
| 4. Soft CRO | CTA dùng ngôn ngữ `00 §8`, không "Đăng ký ngay", không fake urgency | Sales tone lộ |
| 5. Trust separation | Official source và platform role được phân biệt ở hero, footer, pháp lý | Nhập nhằng authority |
| 6. SEO silo | Pillar -> cluster -> tool -> advisory link nội bộ rõ ràng | Orphan / doorway spam |
| 7. Data honesty | Route thiếu data phải `DEFERRED`, `HIDDEN`, `noindex`, hoặc safe fallback theo `17` | Public claim rỗng |
| 8. Instrumentable | Mỗi route có primary event và lead surface nếu có conversion | Không đo được CRO |
| 9. Luxury calm | Không có layout/copy ép mua, countdown, bảng hàng lộ trên nav | Mất định vị premium |
| 10. No rebuild trigger | Bất kỳ thay đổi route lớn phải chứng minh không lệch `00 §13` | Nguy cơ đập lại web |

---

## §2. Canonical Route Tree

```text
/
├── /kham-pha-do-thi
├── /sa-ban
│   └── /sa-ban/[lot-id]
├── /phan-khu
│   ├── /phan-khu/hong-phat
│   │   ├── /phan-khu/hong-phat/gan-cong-vien
│   │   ├── /phan-khu/hong-phat/phu-hop-gia-dinh
│   │   ├── /phan-khu/hong-phat/view-xanh
│   │   └── /phan-khu/hong-phat/khu-yen-tinh
│   ├── /phan-khu/hong-thinh
│   └── /phan-khu/hong-phuc
├── /tiem-nang
│   ├── /tiem-nang/vanh-dai-4
│   ├── /tiem-nang/dong-ha-noi
│   ├── /tiem-nang/bac-ninh-fdi
│   ├── /tiem-nang/gia-lam-ket-noi
│   ├── /tiem-nang/mua-o-that-hay-dau-tu
│   ├── /tiem-nang/nen-mua-giai-doan-dau-hay-sau
│   ├── /tiem-nang/2-ty-nen-mua-phan-khu-nao
│   ├── /tiem-nang/gia-dinh-2-con-chon-phan-khu
│   └── /tiem-nang/so-sanh/[slug]
├── /tien-do
│   ├── /tien-do/thang-6-2026
│   ├── /tien-do/ha-tang-hong-phat
│   └── /tien-do/cap-nhat-vanh-dai-4
├── /phong-cach-song
├── /bang-gia
├── /phap-ly
├── /vay-mua
├── /roi
├── /tu-van
│   └── /tu-van/[author-slug]
├── /doi-tac
├── /lien-he
├── /blog
│   └── /blog/[slug]
├── /yeu-cau-du-lieu
├── /chinh-sach-bao-mat
├── /portals/admin/*
└── /broker/*
```

---

## §3. Homepage Structure — Decision Platform First

Homepage không được là "dự án này có gì". Homepage phải là **entry console** dẫn vào decision system.

```text
/ TRANG CHỦ (Sprint 1A)
├── HeroDecisionConsole
│   ├── H1: "Hồng Hạc City Bắc Ninh"
│   ├── Sub: decision-platform positioning, không tự nhận official
│   ├── MiniDecisionMap / SaBanPreview (không import MapLibre ở Phase 0)
│   ├── Primary CTA: "Khám phá sa bàn" -> /sa-ban hoặc FallbackModal
│   ├── Secondary CTA: "Tìm vị trí phù hợp" -> /tu-van hoặc matching fallback
│   └── Disclosure `00 §11.1`
├── DecisionPaths
│   ├── Mua để ở -> /phong-cach-song + /vay-mua
│   ├── Đầu tư dài hạn -> /tiem-nang + /roi fallback
│   └── Theo dõi giai đoạn -> /tien-do + /phan-khu/hong-phat
├── SourceTrustBand
│   ├── Official source distinction
│   ├── Tier 1/3 citation affordance
│   └── No unapproved logo claim
├── CurrentReleaseIntelligence
│   ├── Hồng Phát context
│   ├── Phase status: public-safe wording
│   └── CTA -> /phan-khu/hong-phat + /sa-ban
├── UrbanIntelligencePreview
│   ├── 197,76 ha
│   ├── 20-year vision
│   ├── 3 phân khu: Hồng Phát / Hồng Thịnh / Hồng Phúc
│   └── CTA -> /kham-pha-do-thi
├── DecisionSupportPanel
│   ├── `/phap-ly`: kiểm chứng nguồn
│   ├── `/bang-gia`: hiểu chính sách/giai đoạn, không bảng hàng official
│   ├── `/vay-mua`: tính phương án sở hữu
│   └── `/tu-van`: trao đổi riêng
├── ProgressAndSignalPreview
│   ├── Timeline / progress notes
│   ├── Infrastructure watch
│   └── CTA -> /tien-do
├── LeadMagnetLibrary
│   ├── Checklist chọn vị trí
│   ├── Checklist pháp lý
│   ├── Hướng dẫn tính phương án vay
│   └── No generic brochure gate
├── FAQDecisionObjections
└── FinalAdvisoryCTA
    └── Tone: private advisory, not sales push
```

**Homepage block release nếu fail:**
- `/sa-ban` không xuất hiện trong first viewport.
- Có CTA "Đăng ký ngay", "Mua ngay", "Chốt căn", "Giữ chỗ", "Giá gốc chủ đầu tư".
- Hero tự nhận official site / đại lý ủy quyền / độc quyền khi chưa có bằng chứng.
- Lead magnet chỉ là brochure bán hàng, không phải decision asset.
- Không có disclosure `00 §11.1`.

---

## §4. Route Specs

### §4.1. `/sa-ban` — Core Product / Decision Map

**Sprint strategy:**
- Sprint 1A: route shell + SaBanPreview + FallbackModal + instrumentation. Không import `maplibre-gl`.
- Sprint 1B: MapLibre + PMTiles interactive map.
- Sprint 2: AI matching, watchlist, advanced layers.

**Required modules:**
- Decision map shell
- Phase/current release highlight
- Filter model: persona, budget band, product type, phan_khu, status visibility
- Lot status legend with safe labels
- Map unavailable fallback
- CTA: "Tìm vị trí phù hợp", "Theo dõi phase tiếp theo", "Tính phương án sở hữu"

**Primary job:** Help visitor understand where to look, what to compare, and what to follow.

### §4.2. `/sa-ban/[lot-id]` — Programmatic Lot Utility

SSG/SSR hybrid per `06 §3`; conditional noindex per `00 §4.2`.

**Public content rules:**
- Render only whitelisted Tier 1 fields publicly.
- Price and internal sales status must not appear as official public fact.
- Thin pages render safe-default + `noindex`.
- Invalid lot -> 404, no lead form.

### §4.3. `/kham-pha-do-thi` — Urban Vision Pillar

**Purpose:** Explain the 197,76 ha urban thesis and 20-year vision without copying official brochure.

Sections:
- Vision 20 years
- Urban planning principles
- PMH legacy as context, not endorsement overclaim
- Eastern Hanoi / Bắc Ninh positioning with Tier 1/3 citations
- Development journey
- Multi-generation living logic

### §4.4. `/phan-khu/hong-phat` — Current Release Intelligence

**Purpose:** Convert official subdivision facts into decision guidance.

Sections:
- Hồng Phát overview
- Current release context
- Product type explorer
- Location/infrastructure context
- Lifestyle fit
- Map link / lot exploration
- Follow phase CTA

**Rule:** Hồng Thịnh and Hồng Phúc stay `DEFERRED` or thin/noindex until Tier 1 data pack exists (`17 §8`).

### §4.5. `/tiem-nang` — Market Intelligence Pillar

**Purpose:** Help users evaluate long-term potential, not promise returns.

Clusters:
- `/tiem-nang/vanh-dai-4`
- `/tiem-nang/dong-ha-noi`
- `/tiem-nang/bac-ninh-fdi`
- `/tiem-nang/gia-lam-ket-noi`
- `/tiem-nang/mua-o-that-hay-dau-tu`
- `/tiem-nang/nen-mua-giai-doan-dau-hay-sau`
- `/tiem-nang/2-ty-nen-mua-phan-khu-nao`
- `/tiem-nang/gia-dinh-2-con-chon-phan-khu`

Each page must link back to `/sa-ban`, `/vay-mua`, and `/tu-van` where relevant.

### §4.6. `/tien-do` — Progress / Infrastructure Watch

**Purpose:** Track what is changing over time.

Sections:
- Progress timeline
- Hạ tầng khu vực
- Milestones
- Before/after media if approved
- Future phases watch
- Source notes

### §4.7. `/phong-cach-song` — Lifestyle Decision Pillar

**Purpose:** Help family/lifestyle users see fit without becoming decorative editorial.

Sections:
- Family living
- Green/wellness
- Education/community
- Weekend experience
- Future living
- Decision prompts to `/sa-ban` and `/tu-van`

### §4.8. `/bang-gia` — Price Context / Financial Readiness

This route is **not** a public bảng hàng.

Sections:
- Price information policy
- Why prices change by phase
- What can/cannot be shown publicly
- Financing/payment context
- CTA: "Tính phương án sở hữu" -> `/vay-mua`
- CTA: "Trao đổi cùng chuyên viên tư vấn" -> `/tu-van`

**Forbidden:**
- "Giá gốc chủ đầu tư"
- official price claim without approved source
- scarcity pressure
- public display of Tier 2 internal price as official fact

### §4.9. `/phap-ly` — Legal Evidence Hub

Sections:
- Quy hoạch
- Hồ sơ pháp lý
- Tier 1/3 source list
- Evidence system
- FAQ
- Disclosure

Known source references:
- `https://honghacphumyhung.vn/`
- `https://honghacphumyhung.vn/hongphat/`
- `https://phumyhung.vn/du-an/hong-hac-city/`
- Official PDFs listed in existing legal spec / CMS fact ledger

### §4.10. `/vay-mua` and `/roi`

`/vay-mua` is Sprint 1B and should become the main financial decision tool.

`/roi` is Sprint 2 and must stay hidden/deferred until scenario assumptions, disclaimer, and data source are ready.

### §4.11. `/tu-van`, `/lien-he`, `/doi-tac`

`/tu-van` is advisory, not sales pressure:
- persona-specific guidance
- budget/context capture
- author/advisor E-E-A-T link
- no fake urgency

`/lien-he` is utility/contact.

`/doi-tac` is P2 and not a main conversion path for buyers.

---

## §5. Navigation And Linking

### Top nav (locked by `00 §5.1`)

```text
Khám phá đô thị | Sa bàn | Tiềm năng | Tiến độ | Phong cách sống | Tư vấn | Đối tác
```

**Do not place in top nav:** Bảng giá, Pháp lý, Tin tức, Hotline, Đăng ký ngay.

### Footer nav must include

- Sa bàn
- Pháp lý
- Bảng giá tham khảo / Price context
- Tính vay
- Tiến độ
- Tư vấn
- Privacy / DSAR
- Official source disclosure

### Internal link rules

- Every pillar page must link to `/sa-ban`.
- Every decision/comparison page must link to one tool: `/sa-ban`, `/vay-mua`, or `/tu-van`.
- Every trust-sensitive page must link to `/phap-ly`.
- Every price/financial page must include disclaimer and link to `/vay-mua`.
- No orphan public route.

---

## §6. SEO Silo Model

```text
Brand / Urban Thesis
├── /kham-pha-do-thi
├── /phong-cach-song
└── /tien-do

Decision Map / Inventory Utility
├── /sa-ban
├── /sa-ban/[lot-id]
└── /phan-khu/hong-phat

Market Intelligence
├── /tiem-nang
├── /tiem-nang/*
└── /tiem-nang/so-sanh/*

Trust / Conversion Support
├── /phap-ly
├── /bang-gia
├── /vay-mua
├── /tu-van
└── /lien-he
```

SEO cluster pages must not be doorway pages. Each cluster must provide a distinct decision lens and link back to the relevant pillar/tool.

---

## §7. Route Status Matrix

| Route | Sprint | IA role | Public launch rule |
|---|---|---|---|
| `/` | 1A | Decision console | Full only with 11 sections, disclosure, first-viewport SaBanPreview |
| `/sa-ban` | 1A shell / 1B full | Core product | Shell can launch; full map needs map/data pack |
| `/kham-pha-do-thi` | 1A optional | Urban thesis | Full only with source-safe content |
| `/bang-gia` | 1A | Price context | No public official-price claim unless approved |
| `/phap-ly` | 1A | Evidence hub | Tier 1/3 citations required |
| `/tu-van` | 1A | Advisory conversion | Lead form + consent + states required |
| `/lien-he` | 1A | Contact utility | Verifiable contact methods |
| `/vay-mua` | 1B | Financial tool | Bank rate source/fallback + disclaimer |
| `/phan-khu/hong-phat` | 1B | Current release intelligence | Tier 1 subdivision facts + media/data readiness |
| `/tiem-nang` | 1B | Market intelligence | No ROI/appreciation guarantees |
| `/tien-do` | 1B | Progress watch | No unsupported handover/progress claim |
| `/phong-cach-song` | 1B | Lifestyle fit | Approved media or clear placeholder |
| `/roi` | 2 | Investment simulator | Hidden/deferred until assumptions approved |
| `/doi-tac` | 2 | Partner portal | Not buyer primary flow |
| `/blog` | 2 | Editorial scale | Hidden/noindex until enough approved articles |

---

## §8. Instrumentation Map

| Route | Primary event | Conversion surface |
|---|---|---|
| `/` | `homepage_decision_console_view` | `homepage_hero`, `homepage_lead_magnet`, `homepage_final_cta` |
| `/sa-ban` | `sa_ban_view` | `sa_ban` |
| `/sa-ban/[lot-id]` | `lot_detail_view` | `programmatic_lot` |
| `/phan-khu/hong-phat` | `current_release_view` | `sa_ban_lot` or `tu_van` |
| `/bang-gia` | `price_context_view` | `bang_gia` |
| `/phap-ly` | `legal_evidence_view` | `phap_ly` |
| `/vay-mua` | `mortgage_calculator_start` | `vay_mua` |
| `/tiem-nang` | `market_intelligence_view` | `tu_van` |
| `/tien-do` | `progress_watch_view` | `tu_van` |
| `/tu-van` | `advisory_form_view` | `tu_van` |

Events must not contain PII (`00 §6`, `12`, `13`).

---

## §9. Implementation Contract References

This file locks IA and route intent; it does not replace implementation contracts.

| Topic triggered by this IA | Required contract |
|---|---|
| Lead form / advisory form / fallback modal | `08 §2-§4`, `06 §4.1`, `07 §10.1-§10.3`; must define loading, disabled, success, error, offline and timeout states |
| Sa bàn filters/search | `05 §5.1`, `07 §10.4`; filter inputs must use debounce/throttle, minimum characters where relevant, empty/loading states and rate limit behavior |
| Payment plan / price context / mortgage tool | `04 §4`, `05 §5.3`, `06 §4.0`; any retryable submit must use `client_request_id` / idempotency_key, dedupe behavior and duplicate-safe success |
| Deferred/hidden route or feature | `02 §5.3`, `04 §7`, `17 §8`; must be controlled by feature flag/toggle, default off, with rollout/kill switch rule where public exposure changes |
| Analytics or conversion event | `12`, `13`; event dispatch failure must be non-blocking with timeout, retry/backoff where queued, dead-letter/logging where server-side, and no PII |
| External data or map unavailable | `17 §5-§8`; fallback must be explicit, not silent, and route must not claim Public Launch Ready |

**Route IA acceptance criteria:**
- Given a public route is implemented, when audited against this file, then it must expose its decision job, primary internal link, data-readiness status, and allowed conversion surface.
- Given `/sa-ban` full map is not ready, when user opens `/sa-ban`, then shell/fallback states must explain availability and offer advisory next steps without fake inventory or price claims.
- Given any page includes a form, filter, calculator, event, or deferred feature, then the specialist contract above must be checked before mark complete.

---

## §10. References

The IA intentionally differentiates this platform from:
- Official Hồng Hạc City website: official overview, project sections, hotline/register flows.
- Hồng Phát official page: subdivision facts, product types, masterplan-style exploration.
- Phú Mỹ Hưng corporate website: corporate authority and brand ecosystem.
- Current `bacninhhonghaccity.vn`: existing sales-oriented signals to be replaced by decision-platform structure.
