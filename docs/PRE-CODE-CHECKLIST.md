# PRE-CODE CHECKLIST — Sign-off trước khi approve CP-0

**Mục đích:** Đảm bảo 7 critical gap đã được vá trước khi gạt công tắc scaffold Next.js.
**Authority:** [AUDIT-160](AUDIT-160.md) · [16](spec/16-scoring-quality-gate.md) · [17](spec/17-launch-data-readiness.md) · [FINAL-LAUNCH-PACK](FINAL-LAUNCH-PACK.md)

> Trạng thái hiện tại: AI đã đóng phần cấu trúc và tạo đủ pack để dev không phải đoán. Các mục cần dữ liệu thật vẫn giữ dạng blocker rõ ràng, không được AI tự bịa để lấy điểm.

---

## §1. Trạng thái gap (chốt ngày: 2026-05-19)

| Gap | File chính | Status v1 | Status final | Signoff |
|---|---|---|---|---|
| **G1** Microcopy 11 homepage + 7 pillar | [docs/copy/homepage-copy.md](copy/homepage-copy.md) + [pillar-pages-copy.md](copy/pillar-pages-copy.md) | ✅ Draft v1 | ☐ Reviewed | ____ |
| **G2** Keyword map + content brief | [docs/seo/keyword-map.md](seo/keyword-map.md) + [content-briefs/](seo/content-briefs/) + [OFFICIAL-SOURCE-REGISTER.md](seo/OFFICIAL-SOURCE-REGISTER.md) | ✅ Framework + core briefs + official source register | ☐ Search volume filled | ____ |
| **G3** Wireframe + mood board + states | [docs/design/](design/) (3 file) | ✅ ASCII v1 | ☐ Designer/PM approve | ____ |
| **G4** 9 seed data files | [data/seeds/](../data/seeds/) (9 file + README) | ✅ Demo fixtures | ☐ Real Tier 1 data | ____ |
| **G5** Author Ngô Kim Quyên | [docs/people/ngo-kim-quyen.md](people/ngo-kim-quyen.md) | ✅ Bio v2 + LinkedIn + Nomura Tier 1 cited | ✅ Done (bio + cert 151719 + LinkedIn + ảnh uploaded 2026-05-19) | Quyên + chủ DA |
| **G6** Funnel KPI + sales feedback | [docs/business/funnel-kpi.md](business/funnel-kpi.md) | ✅ Framework | ☐ Sales fill benchmark | ____ |
| **G7** A/B experiment #1 | [docs/experiments/exp-001.md](experiments/exp-001.md) | ✅ Design `approved` | ☐ Sample size confirmed | ____ |

**Status v1 = AI đã draft.** **Status final = bạn (con người) đã fill data thật và ký.**

**Kết luận pre-code:** Có thể approve CP-0 để code scaffold khi chủ dự án đồng ý. Không được coi là production launch-ready cho đến khi các ô `Status final` được ký.

---

## §2. Việc của Quyên (sales manager)

- [x] Paste bio dài 300+ từ vào [docs/people/ngo-kim-quyen.md §2](people/ngo-kim-quyen.md) — 2026-05-19
- [x] Fill credentials (≥2 mục) — Số 151719, Sở Xây dựng TP.HCM + Phòng KD PMH
- [x] Paste LinkedIn URL — https://www.linkedin.com/in/ngo-kim-quyen
- [x] Upload ảnh chân dung vào `/public/people/ngo-kim-quyen.jpg` — 2026-05-19
- [ ] Liệt kê 3+ published works (OPTIONAL — bonus Cat 16 trần 10/10)
- [x] Fill số năm kinh nghiệm — 21 năm (từ 2005)
- [ ] Confirm 4-8 keyword "sales nghe khách hay hỏi" — bổ sung vào [keyword-map.md](seo/keyword-map.md)
- [ ] Fill target conversion rate per stage [funnel-kpi.md §1](business/funnel-kpi.md)
- [ ] Confirm benchmark "100 leads → ~2 contracts" có realistic không
- [ ] Draft sales playbook [funnel-kpi.md §6](business/funnel-kpi.md)

---

## §3. Việc của chủ dự án

- [ ] Approve direction mood board (A/B/C/D/E) trong [design/mood-board.md §2](design/mood-board.md)
- [ ] Ký off 11 homepage section copy v1 (chỉnh sửa nếu cần)
- [ ] Ký off 7 pillar copy v1
- [ ] Quyết định có hire designer ngoài để chuyển ASCII → Figma không
- [ ] Cung cấp inventory Excel thật để thay `inventory-lots.demo.json`
- [ ] Cung cấp master plan + ảnh thật để thay `media-assets.demo.json` placeholder
- [ ] Approve experiment #1 (`exp-001`) launch trong Sprint 1B
- [ ] Approve `CP-0` để scaffold Next.js
- [x] Approve `CP-1` để lock top nav: `Sa bàn`, không Bảng giá/Pháp lý ([.ai/planning/GAP_REGISTER.md GAP-4](../.ai/planning/GAP_REGISTER.md))

---

## §4. Việc của SEO specialist (cần hire/tham vấn 1 buổi)

- [ ] Fill search volume thật vào [keyword-map.md](seo/keyword-map.md) cho ≥30 URL
- [ ] SERP top 10 analysis cho 8 P0 core page
- [ ] Tạo các content brief cluster còn lại từ template [content-briefs/bang-gia.md](seo/content-briefs/bang-gia.md); core briefs đã có cho P0/P1 pillar
- [ ] Setup Google Search Console + Ahrefs/Semrush trial

---

## §5. Việc của dev (sau khi 1-4 done)

- [ ] Re-run `python tools\spec_contract_audit.py` — confirm còn ≤10 WARN
- [ ] Re-run `python tools\index_repo.py --git-tracked-only`
- [ ] Re-run `python tools\build_corpus.py --git-tracked-only`
- [ ] Approve `CP-0` in [.ai/state/task-state.md](../.ai/state/task-state.md)
- [ ] Run `python tools\ai_executor.py --task P0-000 --mode dry-run` — verify
- [ ] Run `python tools\ai_executor.py --task P0-000 --mode execute` — scaffold Next.js
- [ ] Setup PR template với checklist:
  ```
  - [ ] Đã đọc 00 §5–8 (CTA + first viewport)
  - [ ] Đã đọc website-structure §1 (IA 10-gate)
  - [ ] Đã đọc 16 §3 cho cat liên quan
  - [ ] Không có forbidden words: "Đăng ký ngay" / "Chốt" / "Giá gốc CĐT" / "50 căn cuối"
  - [ ] Mọi CTA khớp 00 §8 whitelist
  - [ ] Lighthouse Perf ≥90 cho core route
  ```

---

## §6. Definition of "Pre-Code Done"

Tất cả mục dưới đây phải ✅ trước khi scaffold:

- [ ] §2 (Quyên) ≥80% done — bio + LinkedIn + ảnh là **bắt buộc**
- [ ] §3 (chủ dự án) ≥80% done — mood board direction là **bắt buộc**
- [ ] §4 (SEO) ≥50% done — keyword map có ≥15 URL có search volume thật
- [ ] G4 seed data có thể có demo fixture (thay sau cũng được)
- [ ] G7 experiment design `approved` (chưa cần `running`)

---

## §7. Definition of "Launch-Ready" (sau khi code Sprint 1A)

Trên runtime, evidence theo [16 §4](spec/16-scoring-quality-gate.md):

- [ ] Lighthouse Perf ≥90 cho 8 P0 core route
- [ ] axe-core CI no `serious`/`critical`
- [ ] Schema markup validated (Rich Results Test)
- [ ] All 11 homepage sections render
- [ ] `/sa-ban` shell + fallback modal work
- [ ] LeadForm idempotency tested (3 surfaces minimum)
- [ ] Telegram alert dry-run successful trong HC
- [ ] DSAR page submit works
- [ ] Consent banner default-denied works
- [ ] Author profile `/tu-van/ngo-kim-quyen` render đầy đủ
- [ ] Sitemap.xml validated, no noindex URLs leaked

---

## §8. Risk register (theo dõi liên tục)

| Risk | Mitigation | Owner |
|---|---|---|
| Quyên không kịp paste bio | Author 2 backup hoặc launch với "đang xây E-E-A-T" disclosure | Chủ dự án |
| Không có Tier 1 inventory data | Launch `/sa-ban` shell only, hold `/sa-ban` full + `/sa-ban/[lot-id]` | Chủ dự án + CĐT |
| Không có ảnh thật approved | Dùng `AbstractPlaceholder` cho tất cả lifestyle slots | Designer |
| SEO không kịp keyword research | Launch với 8 P0 page + 4 cluster, defer rest | SEO |
| A/B experiment chưa chạy được Sprint 1B | Push sang Sprint 2 | CRO |

---

## §9. Final sign-off

Khi **§6 Pre-Code Done** = 100%:

- Chủ dự án ký: ______________________ Ngày: __________
- Quyên ký: __________________________ Ngày: __________
- (Optional) Designer ký: ____________ Ngày: __________
- (Optional) SEO ký: _________________ Ngày: __________

→ Approve `CP-0` → scaffold Next.js → bắt đầu Sprint 1A code.
