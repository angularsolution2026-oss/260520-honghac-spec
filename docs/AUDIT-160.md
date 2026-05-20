# AUDIT 160 — Pre-Code Readiness Check

**Ngày audit:** 2026-05-18
**Phạm vi:** 19 file [docs/spec/](spec/) + governance `.ai/` hiện có
**Mục đích:** Xác định gap còn lại của **SPEC** trước khi viết code, để lần bàn giao này không bị trả về như các lần trước.
**Tham chiếu chấm điểm:** [16-scoring-quality-gate.md](spec/16-scoring-quality-gate.md)

---

## §0. TL;DR — Đọc đoạn này nếu chỉ có 60 giây

### Trạng thái spec (chưa có code)

- **Spec điểm tối đa khả thi: ~140/160** nếu implement đúng. Spec còn ~20 điểm bị "trần cứng" do thiết kế Sprint (P2 features chưa thuộc 1A: A/B experiment, AI matching, watchlist, comparison hub, ROI calc, blog cluster).
- **Spec điểm thực tế đang ready để code: ~118/160.** Có 7 nhóm gap **phải vá trước khi gõ phím** nếu muốn launch không bị fail.

### 3 lý do khách trả về lần trước → đã được spec xử lý ở đâu

| Lý do fail trước | Đã được spec giải quyết | Đánh giá |
|---|---|---|
| **Web giống landing page** | [00 §5–6, §13](spec/00-master-instruction.md), [website-structure §0–1](spec/website-structure.md): map-first lock, IA 10-gate, forbidden first-viewport framing, "no rebuild" rule | ✅ **Đủ chặt** — spec đã cấm rất rõ "Đăng ký ngay", brochure flow, sales tone |
| **SEO/Lead kém, không convert** | [09 SEO Strategy](spec/09-seo-strategy.md), [08 Lead+CRO](spec/08-lead-capture-cro.md), [16 §3.3 CRO gate](spec/16-scoring-quality-gate.md) | ⚠️ **Đủ về cấu trúc, thiếu về validation** — xem Gap G2, G6 |
| **UI/UX/Performance kém** | [07 Design](spec/07-ui-ux-design-system.md), [11 Performance](spec/11-performance.md) (Lighthouse ≥90 block merge) | ✅ **Đủ chặt** ở guard rail nhưng thiếu copy/wireframe thực — xem Gap G5 |

### 7 critical gaps phải vá trước khi code (chi tiết §3)

| # | Gap | Block điểm | Risk |
|---|---|---|---|
| **G1** | Không có copy/microcopy thực cho từng section homepage + 7 pillar | Cat 11 ≤ 7, Cat 15 ≤ 7 | **Cao** — dev viết tự phát → khách chê |
| **G2** | Keyword research & content brief cho 12+ cluster SEO chưa tồn tại | Cat 2 ≤ 7 | **Cao** — SEO không ra organic → vẫn phải đốt ads |
| **G3** | Wireframe/visual reference cho 11 homepage sections, mobile + desktop | Cat 11 ≤ 6 | **Cao** — "Luxury calm" không đo được, dev mỗi người hiểu một kiểu |
| **G4** | Tier 1 data pack thực tế (lot inventory, phases, legal docs, progress, media) chưa list được | Cat 13 < 6 (block deploy), Cat 6, 16 ≤ 6 | **Rất cao** — không có data thật = web rỗng = khách chê |
| **G5** | Author profile thực (Ngô Kim Quyên) — chưa có: bio dài, ảnh thật, credentials, sources đã publish, LinkedIn | Cat 16 ≤ 4 | **Cao** — E-E-A-T = 0 thì SEO authority = 0 |
| **G6** | Định nghĩa & metric của "lead chất lượng cao": ngoài lead_score, chưa có qualified→contract conversion model | Cat 5 ≤ 8 | **Trung bình–cao** — không đo được "leads ra hợp đồng" → mục tiêu kinh doanh không verify được |
| **G7** | A/B experiment hypothesis tối thiểu 1 cái phải design TRƯỚC khi launch để chạy được trong tuần 1 | Cat 3 < 9.5 cứng | **Trung bình** — chặn không đạt CRO ≥ 9.5 |

### Khuyến nghị "đập ra xây lại": **KHÔNG**

Architecture spec rất chặt và đã được lock ([00 §13](spec/00-master-instruction.md)). Đập lại spec = mất 2–3 tuần và risk cao hơn vá 7 gap trên (1–2 tuần). Vấn đề lần trước **không nằm ở architecture** — nằm ở: (a) thiếu content/data thật, (b) thiếu visual reference cụ thể, (c) thiếu definition of "qualified lead". Vá đúng những thứ đó, không phải đập spec.

---

## §1. Spec Health Summary (chấm spec, không phải runtime)

> Đây là điểm **khả thi tối đa nếu code đúng spec hiện tại**. Điểm runtime thực tế chỉ chấm được khi có evidence ([16 §4](spec/16-scoring-quality-gate.md)).

| # | Tiêu chí (max 10) | Spec ceiling | Lý do trần |
|---|---|---:|---|
| 1 | Spec Readiness | **9.5** | 19 file synced, cross-ref đầy đủ. Mất 0.5 vì spec-contract-audit còn 39 WARN. GAP-4/CP-1 đã đóng ở DEC-017. |
| 2 | SEO Strategy | **8.0** | Technical SEO + cluster structure đầy đủ. Mất 2 vì **không có keyword data, search volume, ranking target cụ thể** ([09 §3](spec/09-seo-strategy.md) chỉ list URL, không có intent metric/competitor analysis). |
| 3 | CRO / Lead Capture | **8.5** | Spec đầy đủ: 15+ surface, idempotency, progressive profiling, scoring. Mất 1.5 vì A/B experiment chưa designed (chặn 9.5 gate cứng), no UX-A/B variant defined. |
| 4 | Trust / Legal / Privacy | **9.5** | 4 disclaimer canonical, DSAR flow, consent banner, retention SSOT. Mất 0.5 vì DSAR Sprint 1A chỉ manual (chưa OTP) — acceptable nhưng giảm score. |
| 5 | CRM / Admin / Lead Ops | **8.0** | Kanban, Telegram, scoring, round-robin, SLA, audit đầy đủ. Mất 2 vì **chưa có model "qualified lead → contract"** (Cat KPI rỗng — chỉ đo submit, không đo conversion to deal). |
| 6 | Content Governance | **7.5** | Claim flow, Fact Ledger, review cycle có. Mất 2.5 vì **chưa có real content pipeline**: không có editorial calendar, không có 5–10 article first batch đã viết. |
| 7 | Differentiation / Moat | **8.0** | Map-first lock + decision platform positioning rõ. Mất 2 vì AI Matching + Watchlist + Comparison hub đều Sprint P2 — Sprint 1A launch không có moat hoạt động ngoài map shell. |
| 8 | Production Readiness | **9.0** | Lighthouse CI block merge, security headers, Sentry, fallback pages. Mất 1 vì chưa có disaster recovery doc, no incident runbook. |
| 9 | Overall Score | derived | — |
| 10 | Local SEO & Maps | **7.0** | NAP confirmed, local lead source enum đầy đủ. Mất 3 vì **chưa có Google Business Profile claim plan, không có review collection strategy, no local content brief**. |
| 11 | Visual & Sensory | **6.5** | Design tokens OK, a11y rules OK, motion budget OK. Mất 3.5 vì **không có wireframe, không có mood board, không có image library plan**. "Luxury calm" là tone, không phải spec đo được. |
| 12 | Financial Tools | **8.5** | Mortgage calc spec đầy đủ + bank_rates dynamic + disclaimer. Mất 1.5 vì ROI calc Sprint P2 + chưa có actual bank rate data source list. |
| 13 | Real-time Inventory | **7.5** | Schema OK, status enum + color OK, admin update + ISR revalidate OK. Mất 2.5 vì **chưa có inventory data thật** ([17 §3](spec/17-launch-data-readiness.md) liệt kê fixture path nhưng file chưa có). |
| 14 | Speed-to-Lead | **9.0** | ≤30s Telegram, SLA 3/5 phút HC, escalation, presence TTL, cron đầy đủ. Mất 1 vì chưa có sales playbook (sales làm gì sau khi nhận alert). |
| 15 | IA / Silo | **9.0** | website-structure rất tốt, IA 10-gate, internal link rules, footer/top nav locked. Mất 1 vì sitemap partition chưa có ví dụ chi tiết, Hồng Thịnh/Hồng Phúc DEFERRED còn phải confirm UX khi user click vào. |
| 16 | E-E-A-T | **5.0** | Ngô Kim Quyên là tên duy nhất, chưa có: bio dài, credentials list, ảnh thật approved, published works, LinkedIn URL, ≥2 author rotation. Mất 5 — **đây là tiêu chí điểm thấp nhất**. |
| **Sum Cat 1–8 + 10–16** | | **~120/150** | **80%** spec ceiling |

**Note:** Cat 9 (Overall) là derived, không tính. Trần lý thuyết = 150 điểm cho 15 cat scored. Spec đang ở 120 → còn ~30 điểm gap có thể vá ở bản spec.

---

## §2. So sánh "lý do fail trước" vs "spec hiện tại"

### 2.1. "Web giống landing page" — đã chặn ở 6 lớp

1. [00 §6 Hard Rules](spec/00-master-instruction.md): map-first, no fake urgency, lead score before call
2. [00 §5.3](spec/00-master-instruction.md): Homepage first viewport rule — `/sa-ban` phải xuất hiện trước price/lead-magnet
3. [00 §8](spec/00-master-instruction.md): CTA whitelist (cấm "Đăng ký ngay")
4. [website-structure §1](spec/website-structure.md): IA 10-gate, Gate 2 = "No brochure flow"
5. [16 §3.15](spec/16-scoring-quality-gate.md): IA score cap rules — nếu brochure order → Cat 15 max 7
6. [06 §2 Acceptance](spec/06-app-router-structure.md): block release nếu có "Mua ngay"/"Chốt căn"

**Đánh giá:** Đã được canh rất kỹ. Rủi ro lần này là **dev/AI implement không đọc kỹ** — không phải spec yếu. → Mitigation: bắt buộc PR template có checklist "Đã đọc 00 §5–8, website-structure §1".

### 2.2. "SEO/Lead chất lượng kém" — chặn 70%, thiếu 30%

**Đã có:**
- Cluster structure 12+ URL ([09 §3](spec/09-seo-strategy.md))
- Schema markup chi tiết ([14](spec/14-schema-markup.md))
- E-E-A-T governance ([00 §9](spec/00-master-instruction.md), [09 §6](spec/09-seo-strategy.md))
- Lead scoring + qualification ([08 §6](spec/08-lead-capture-cro.md))
- Source quality + CPL dashboard ([10 §2.4](spec/10-admin-dashboard.md))

**Còn thiếu (BLOCKER):**
- ❌ **Keyword research thực**: không có target keyword + search volume + competition data. Spec chỉ liệt kê URL.
- ❌ **Content brief per page**: page nào, target keyword nào, intent gì, độ dài, outline. Spec mới chỉ list URL.
- ❌ **Definition "qualified lead"** ngoài score ≥40: tỷ lệ qualified → contract chưa có target, không có funnel benchmark, không có sales feedback loop.
- ❌ **First-batch content**: chưa có 5–10 article đã viết sẵn để launch.

→ **Đây là root cause của "lead không convert" lần trước.** Lần này phải làm trước khi code.

### 2.3. "UI/UX/Performance kém" — chặn ở guardrail, thiếu visual brief

**Đã có:**
- Lighthouse Perf ≥90 block merge ([02 §4.2](spec/02-tech-stack.md), [11 §6](spec/11-performance.md))
- Bundle budget per route ([11 §5](spec/11-performance.md))
- Image rules, font loading, motion budget ([11 §3, §7, §9](spec/11-performance.md))
- Design tokens SSOT ([07 §5](spec/07-ui-ux-design-system.md))
- A11y axe-core CI ([07 §4](spec/07-ui-ux-design-system.md))

**Còn thiếu:**
- ❌ **Wireframe** cho 11 homepage section + 7 pillar (mobile + desktop)
- ❌ **Mood board / visual reference** — "Luxury calm như Phú Mỹ Hưng" là tone, không phải artifact
- ❌ **Image asset list** — cần ảnh gì, đã có gì, AbstractPlaceholder thay được những gì
- ❌ **Component visual examples** — Button states, Card variants, Form layouts (mới có code structure, chưa có visual)

→ **Spec chặn được "code chậm", nhưng không chặn được "thiết kế xấu".** Lần này phải có visual reference trước khi code UI.

---

## §3. 7 Critical Gaps — Phải vá trước khi code

### G1. Microcopy & Section Content cho Homepage + 7 Pillar

**Vấn đề:** Spec liệt kê section ([06 §2](spec/06-app-router-structure.md), [website-structure §3](spec/website-structure.md)) nhưng không có **bản nháp copy thực**. Dev sẽ viết copy tự phát → khách review chê "không đúng tone luxury", "ngôn từ chưa sắc", "không khác brochure" — đây có khả năng cao là lý do fail thực sự lần trước.

**Bằng chứng còn thiếu:**
- Homepage Hero: chỉ có rule "H1 về urban statement, không tên sản phẩm" ([07 §2.3](spec/07-ui-ux-design-system.md)) — không có draft H1 thật.
- DecisionPaths 3 card: chỉ có rule, không có draft headline + sub-copy.
- LifestyleSection: chỉ có schema, không có 3 story đã viết.
- FAQDecisionObjections: chưa có list 10–15 câu hỏi với câu trả lời.

**Fix trước khi code:**
- File mới: `docs/copy/homepage-copy.md` — draft mọi text trên homepage, version 1
- File mới: `docs/copy/pillar-pages-copy.md` — draft H1/sub/CTA cho 7 pillar
- Reviewer: chủ dự án + 1 copywriter có brief về luxury PropTech
- Thời gian: **3–5 ngày trước Phase 1A code**

### G2. Keyword Research & Content Brief

**Vấn đề:** [09 §3](spec/09-seo-strategy.md) liệt kê ~30 URL cluster, nhưng:
- Không có target keyword chính/phụ cho mỗi URL
- Không có search volume estimation (Ahrefs/Semrush)
- Không có competitor SERP analysis
- Không có content outline (H2/H3 skeleton)
- Không có internal link map giữa các cluster

**Hệ quả nếu skip:** Content được viết generic, không có intent match → SEO không ra organic → vẫn phải đốt ads (đúng đắn mục tiêu lần này muốn tránh).

**Fix trước khi code:**
- File mới: `docs/seo/keyword-map.md` — bảng: URL | target_kw | secondary_kw | search_volume | competition | top_3_competitors
- File mới: `docs/seo/OFFICIAL-SOURCE-REGISTER.md` — registry nguồn official Tier 1
- File mới: `docs/seo/content-briefs/*.md` — 1 file/cluster với outline + word count target
- Ưu tiên trước: 8 core P0 page + Hồng Phát cluster + 4 infrastructure SEO

### G3. Wireframe & Visual Reference

**Vấn đề:** "Luxury calm như Phú Mỹ Hưng" là tone, không phải spec đo được. Spec đã chặn fake urgency / Đăng ký ngay nhưng không chặn được layout xấu / typography sai / spacing lệch.

**Fix trước khi code:**
- File mới: `docs/design/wireframes/homepage.md` — ASCII hoặc link Figma cho 11 section
- File mới: `docs/design/wireframes/pillar-template.md` — template chung cho pillar
- File mới: `docs/design/mood-board.md` — 5–10 reference image (link external + lý do tham chiếu)
- File mới: `docs/design/component-states.md` — Button/Form/Card visual states
- Approval: chủ dự án ký trước khi code UI

### G4. Tier 1 Data Pack — Thực tế

**Vấn đề:** [17 §3](spec/17-launch-data-readiness.md) liệt kê 9 fixture path nhưng **chưa có file nào**. Không có data thật → launch website rỗng → khách chê.

**Phải có trước Phase 1B (sa bàn full map):**
- `data/seeds/inventory-lots.demo.json` — ≥50 lô Hồng Phát với Tier 1 fields đầy đủ
- `data/seeds/phases.demo.json` — phase Hồng Phát hiện tại với release/completion date
- `data/seeds/progress.demo.json` — 3–5 milestone đã verify
- `data/seeds/media-assets.demo.json` — list media + approval status
- `data/seeds/authors.demo.json` — Ngô Kim Quyên + ≥1 author phụ
- `data/seeds/tier-sources.demo.json` — Fact Ledger seed (vành đai 4, FDI Bắc Ninh, etc.)
- `data/seeds/bank-rates.demo.json` — 3 band rate hiện tại
- `data/seeds/admin-users.demo.json` — test admin + sales accounts

**Critical:** Cat 13 < 6.0 = **block deploy** ([16 §2](spec/16-scoring-quality-gate.md)). Không có data = không deploy được.

### G5. Author E-E-A-T Pack — Ngô Kim Quyên

**Vấn đề:** [00 §9](spec/00-master-instruction.md) ghi "đã xác nhận" nhưng spec không có:
- Bio dài (300–500 từ)
- Credentials list (chứng chỉ BĐS, năm kinh nghiệm, deal đã closed)
- Ảnh chân dung real, approved
- LinkedIn URL verifiable
- ≥3 published works để link sang
- Author 2 (rotation/backup)

**Hệ quả nếu thiếu:** Cat 16 max 4.0 ([16 §3.16](spec/16-scoring-quality-gate.md)). E-E-A-T = 0 thì Google sẽ không trust author → ranking không lên → SEO bể.

**Fix trước Phase 1A `/tu-van/[author-slug]`:**
- File mới: `docs/people/ngo-kim-quyen.md` — full profile
- Upload ảnh thật vào `data/seeds/media-assets.demo.json` với `approvedForPublic`
- (Khuyến nghị) Author 2 cho rotation

### G6. Qualified Lead → Contract Funnel Model

**Vấn đề:** Spec đo được:
- Submit rate ([12 §5](spec/12-analytics-tracking.md))
- Hot/Warm/Cold tier ([08 §6](spec/08-lead-capture-cro.md))
- Speed-to-lead P50 ([12 §5](spec/12-analytics-tracking.md))

Spec **KHÔNG** đo được:
- Qualified → site visit → negotiation → contract conversion rate
- Lead source nào ra hợp đồng nhiều nhất (ngoài "qualification rate")
- Sales feedback loop (sales đánh dấu lead xấu/tốt sau khi gọi để cải thiện scoring)
- CPL → Cost Per Contract (CPA real)

→ Mục tiêu kinh doanh "leads chất lượng → hợp đồng → giảm chi phí ads" chưa **đo được**.

**Fix trước Phase 2:**
- File mới: `docs/business/funnel-kpi.md` — funnel stage definition + target conversion per stage
- Extend `lead_status` enum với benchmark conversion rate per status
- Thêm field `sales_quality_feedback` vào `leads` (sales sau khi gọi đánh giá lead: real/fake/junk + lý do)
- Extend [10 §2.3](spec/10-admin-dashboard.md) dashboard: thêm CPC (Cost Per Contract), Win Rate, Lost Reason breakdown

### G7. A/B Experiment Hypothesis #1 — Pre-Design

**Vấn đề:** [16 §3.3](spec/16-scoring-quality-gate.md) ghi "CRO 9.5 gate: cần ≥1 completed experiment". Spec mới có registry framework ([04 §7](spec/04-features-priority.md)) chứ chưa có experiment cụ thể.

**Hệ quả nếu chưa thiết kế:** Sau launch không biết test gì → không có evidence → Cat 3 < 9.5 cứng → tổng overall < 9.

**Fix trước launch:**
- File mới: `docs/experiments/exp-001.md` — đề xuất 1 experiment với hypothesis falsifiable: "Nếu hero CTA primary là 'Khám phá sa bàn' (variant A) thay vì 'Tìm vị trí phù hợp' (variant B), thì lead submit rate trên homepage tăng ≥10% sau 14 ngày, vì A khớp định vị decision platform hơn."
- Đăng ký vào registry với `min_sample_size`, `primary_metric`, `guardrail_metrics`
- Status `approved` trước launch để chạy `running` ngay Sprint 1B

---

## §4. Spec gaps phụ (không block code nhưng nên vá)

| Gap | Nguồn | Severity | Khuyến nghị |
|---|---|---|---|
| GAP-4 top nav | [.ai/planning/GAP_REGISTER.md](../.ai/planning/GAP_REGISTER.md) | Closed | CP-1 approved in DEC-017: top nav excludes Bảng giá/Pháp lý and uses `Sa bàn` label |
| 39 WARN trong spec-contract-audit | [.ai/evidence/spec-contract-audit.md](../.ai/evidence/spec-contract-audit.md) | Low–Med | Phần lớn là missing cross-link giữa file (debounce/retry/feature-flag mention nhưng không link tới contract). Vá theo batch khi sửa từng spec file. |
| `LocalBusiness` schema có geo lat/long nhưng đây là geo của trụ sở Hà Nội, không phải Bắc Ninh | [14 §2.2b](spec/14-schema-markup.md) | Med | Cần thêm `LocalBusiness` thứ 2 cho điểm bán Bắc Ninh nếu có, hoặc clarify "addressLocality: Bắc Ninh" trong RealEstateListing |
| Cron `bank_rate_review_reminder_cron` mỗi thứ Hai nhưng không có owner email cho reminder | [02 §5](spec/02-tech-stack.md) | Low | Thêm env `BANK_RATE_REVIEWER_EMAIL` |
| DSAR Sprint 1A manual review 3 ngày — chưa có template email confirmation | [13 §5](spec/13-privacy-legal.md) | Low | Thêm `docs/templates/dsar-confirmation-email.md` |
| Phase 0 `P0-000` đang chờ `CP-0` approve | [.ai/state/task-state.md] | — | Approve CP-0 mới scaffold được Next.js |
| Không có incident runbook / on-call rotation | — | Med (sau launch) | Sau Phase 1A — `docs/ops/incident-runbook.md` |

---

## §5. Pre-Code Checklist — Ký trước khi gõ phím

Trước khi approve `CP-0` (scaffold Next.js), chủ dự án nên ký 7 mục dưới đây:

- [ ] **G1**: `docs/copy/homepage-copy.md` v1 — draft 11 section copy, signed off
- [ ] **G2**: `docs/seo/keyword-map.md` — keyword table cho ≥15 page Sprint 1A/1B
- [ ] **G3**: `docs/design/wireframes/homepage.md` + `mood-board.md` — visual reference signed
- [ ] **G4**: 9 file `data/seeds/*.demo.json` ít nhất có shape + data tối thiểu cho `local-demo` mode chạy được
- [ ] **G5**: `docs/people/ngo-kim-quyen.md` — bio + credentials + photo approval
- [ ] **G6**: `docs/business/funnel-kpi.md` — Win rate, CPC target, sales feedback model
- [ ] **G7**: `docs/experiments/exp-001.md` — ≥1 experiment design ready to run Sprint 1B
- [x] **Bonus**: GAP-4 CP-1 approved → top nav final lock (`Sa bàn`, no Bảng giá/Pháp lý)
- [ ] **Bonus**: PR template require checklist "Đã đọc 00 §5–8, website-structure §1, 16 §3"

---

## §6. Nếu skip 7 gap này thì điểm 16 cat sẽ bị "trần cứng" thế nào

| Cat | Spec ceiling | Nếu skip 7 gap, runtime ceiling thực tế |
|---|---:|---:|
| 1 Spec Readiness | 9.5 | 9.0 (39 WARN không vá) |
| 2 SEO Strategy | 8.0 | **5.5** (no keyword data → orphan SEO) |
| 3 CRO | 8.5 | **7.0** (no experiment → 9.5 gate fail) |
| 5 CRM/Lead Ops | 8.0 | **6.5** (no funnel KPI → không đo được "qualified") |
| 6 Content Gov | 7.5 | **5.5** (no real content batch) |
| 10 Local SEO | 7.0 | **5.0** (no GBP plan) |
| 11 Visual | 6.5 | **5.0** (no wireframe/mood) |
| 13 Inventory | 7.5 | **5.5** ⛔ block deploy < 6 |
| 16 E-E-A-T | 5.0 | **3.5** ⛔ rất thấp |

→ Nếu skip → **tổng overall ~6.0–6.5/10 → khách trả về lần thứ 4.**
→ Nếu vá đủ 7 gap → **tổng overall realistic ~8.5–9.0/10** ở thời điểm launch Sprint 1A, lên dần khi P1B/P2 release.

---

## §7. Kết luận

1. **Architecture spec rất tốt, không đập lại.** Spec đã giải quyết "web giống landing page" rất triệt để. Vấn đề lần trước có lẽ là **dev không bám spec**, không phải spec yếu.
2. **Vấn đề thật còn lại là content/data/visual** — không phải code/architecture.
3. **7 critical gap §3** là việc của CHỦ DỰ ÁN + COPYWRITER + SEO + SALES MANAGER, không phải dev. Vá xong rồi mới code.
4. **Pre-code checklist §5** nên là gate cứng trước khi approve `CP-0`.

Sau khi 7 gap được vá, có thể yên tâm gạt công tắc `P0-000` → scaffold Next.js → thực thi đúng spec → đạt mục tiêu 140+/160 và bàn giao thành công.

---

**Cross-refs:** [00](spec/00-master-instruction.md) · [04 §1 Manifest](spec/04-features-priority.md) · [16](spec/16-scoring-quality-gate.md) · [17](spec/17-launch-data-readiness.md) · [website-structure](spec/website-structure.md) · [GAP_REGISTER](../.ai/planning/GAP_REGISTER.md)
