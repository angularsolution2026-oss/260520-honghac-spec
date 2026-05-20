# G2 — Keyword Map v1

**Status:** Framework ready — `SEO_REQUIRED` fill search volume thật
**Authority:** [09 §3](../spec/09-seo-strategy.md) · [website-structure §6](../spec/website-structure.md)
**Reviewer:** SEO specialist + sales manager (Ngô Kim Quyên) — keyword sales nghe khách dùng
**Tool đề xuất:** Ahrefs / Semrush / Google Keyword Planner — hoặc free: Keywordtool.io + SERP manual check

> **Cách dùng:** Mỗi URL trong [09 §3](../spec/09-seo-strategy.md) cần 1 row. Cột `vol_est` để `SEO_REQUIRED` cho đến khi có tool data. Cột `intent` + `target_kw` có thể fill ngay từ logic spec.

---

## §1. Core Pages (P0 — Sprint 1A)

| URL | Target keyword | Secondary keywords | Intent | Vol estimate | Difficulty | Top 3 competitor |
|---|---|---|---|---|---|---|
| `/` | hồng hạc city bắc ninh | hồng hạc city, hồng hạc phú mỹ hưng, dự án hồng hạc | Brand discovery | `SEO_REQUIRED` | `SEO_REQUIRED` | honghacphumyhung.vn · batdongsan.com.vn · phumyhung.vn |
| `/sa-ban` | sa bàn hồng hạc city | bản đồ hồng hạc, sa bàn dự án bắc ninh | Decision/explore | `SEO_REQUIRED` | `SEO_REQUIRED` | honghacphumyhung.vn |
| `/kham-pha-do-thi` | đô thị hồng hạc 197ha | quy hoạch hồng hạc city, hồng hạc bắc ninh quy hoạch | Vision | `SEO_REQUIRED` | `SEO_REQUIRED` | — |
| `/bang-gia` | giá hồng hạc city | bảng giá hồng hạc, giá hồng phát hồng hạc | Price intent | **Cao** | **Cao** | batdongsan, sales sites |
| `/phap-ly` | pháp lý hồng hạc city | hồng hạc city có sổ đỏ, pháp lý dự án bắc ninh | Trust | **Trung bình** | Trung bình | — |
| `/tiem-nang` | tiềm năng hồng hạc city | đầu tư hồng hạc, hồng hạc có nên mua | Investment | **Trung-cao** | Cao | batdongsan |
| `/tien-do` | tiến độ hồng hạc city | tiến độ thi công hồng hạc, hồng hạc bắc ninh khi nào bàn giao | Progress | Trung bình | Trung bình | — |
| `/phong-cach-song` | sống tại hồng hạc city | hồng hạc city tiện ích, hồng hạc sống có tốt không | Lifestyle | Thấp-Trung | Thấp | — |
| `/tu-van` | tư vấn hồng hạc city | tư vấn mua hồng hạc, môi giới hồng hạc | Advisory | Trung bình | Cao (sales sites) | nhiều landing |
| `/vay-mua` | tính vay mua hồng hạc | tính khoản vay mua nhà bắc ninh | Tool | Thấp | Thấp | tools generic |

---

## §2. Phân Khu Cluster (P1)

| URL | Target keyword | Intent |
|---|---|---|
| `/phan-khu/hong-phat` | phân khu hồng phát hồng hạc city | Current release |
| `/phan-khu/hong-phat/gan-cong-vien` | hồng phát gần công viên | Family fit (view/green) |
| `/phan-khu/hong-phat/phu-hop-gia-dinh` | hồng phát phù hợp gia đình | Family persona |
| `/phan-khu/hong-phat/view-xanh` | hồng phát view xanh | Green view |
| `/phan-khu/hong-phat/khu-yen-tinh` | hồng phát khu yên tĩnh | Privacy intent |
| `/phan-khu/hong-thinh` | (DEFERRED) | — |
| `/phan-khu/hong-phuc` | (DEFERRED) | — |

---

## §3. Infrastructure SEO (P1)

| URL | Target keyword | Intent | Tier sources |
|---|---|---|---|
| `/tiem-nang/vanh-dai-4` | vành đai 4 thuận thành bắc ninh | Infra | Tier 3: VnExpress, Tuổi Trẻ |
| `/tiem-nang/dong-ha-noi` | tiềm năng đông hà nội bắc ninh | Macro | Tier 3 |
| `/tiem-nang/bac-ninh-fdi` | fdi bắc ninh samsung | Economic | Tier 3 |
| `/tiem-nang/gia-lam-ket-noi` | kết nối gia lâm bắc ninh | Connectivity | Tier 3 |

---

## §4. Decision SEO (P1)

| URL | Target keyword | Intent |
|---|---|---|
| `/tiem-nang/mua-o-that-hay-dau-tu` | mua nhà ở thật hay đầu tư | Decision |
| `/tiem-nang/nen-mua-giai-doan-dau-hay-sau` | nên mua giai đoạn đầu hay cuối | Timing |
| `/tiem-nang/2-ty-nen-mua-phan-khu-nao` | 2 tỷ mua được gì hồng hạc | Budget |
| `/tiem-nang/gia-dinh-2-con-chon-phan-khu` | gia đình có con chọn phân khu nào | Family fit |

---

## §5. Local SEO (P1)

| Local intent | URL/anchor | Action |
|---|---|---|
| Google Business Profile (GBP) | Off-site | `HUMAN_REQUIRED`: claim GBP cho "Hồng Hạc City Bắc Ninh" — local map intent |
| "gần đây" / "near me" | Map `/sa-ban` | `local_near_me` tracking |
| "tư vấn hồng hạc bắc ninh" | `/tu-van` | `local_organic` |
| Map directions | GBP | `local_directions_click` |

---

## §6. Forbidden keyword pattern

KHÔNG target:
- "hồng hạc city giá rẻ" — không "giá rẻ" cho luxury
- "hồng hạc city ưu đãi sốc" — fake urgency
- "hồng hạc city website chính thức" — KHÔNG được, vì đây không phải official
- "đại lý ủy quyền hồng hạc" — chưa có bằng chứng

---

## §7. Internal link map (theo SEO silo — website-structure §6)

```
Brand / Urban Thesis
├── /kham-pha-do-thi ──┬─→ /sa-ban
├── /phong-cach-song ──┤
└── /tien-do ──────────┘

Decision Map
├── /sa-ban ←─── (from all pillars)
├── /sa-ban/[lot-id] ──→ /phan-khu/hong-phat
└── /phan-khu/hong-phat ──→ /sa-ban (filter applied)

Market Intelligence
├── /tiem-nang ──┬─→ /sa-ban
├── /tiem-nang/* ┤  ├─→ /vay-mua
└── /tiem-nang/so-sanh/* ──→ /tu-van

Trust / Conversion
├── /phap-ly ←── (all trust-sensitive)
├── /bang-gia ──→ /vay-mua
├── /vay-mua ──→ /tu-van
└── /tu-van
```

**Rule:** Mỗi cluster page → ≥2 link tới pillar, ≥1 link tới tool. Mỗi pillar → ≥2 link tới cluster relevant.

---

## §8. To fill before launch (action items)

| Item | Owner | Deadline |
|---|---|---|
| Search volume thật cho 30+ keyword | SEO specialist | T-7 trước launch |
| SERP top 10 analysis cho 8 core page | SEO specialist | T-5 |
| Content brief outline cho 8 core P0 page | Copywriter + SEO | T-5 |
| 4 keyword "sales nghe khách hay hỏi" (qualitative) | Ngô Kim Quyên | T-3 |
| Google Search Console + Ahrefs setup | DevOps | T-1 |

---

## §9. Content brief coverage

Official source register: [`OFFICIAL-SOURCE-REGISTER.md`](OFFICIAL-SOURCE-REGISTER.md)

Core briefs đã có:

| URL | Brief |
|---|---|
| `/` | [`../copy/homepage-copy.md`](../copy/homepage-copy.md) |
| `/sa-ban` | [`content-briefs/sa-ban.md`](content-briefs/sa-ban.md) |
| `/kham-pha-do-thi` | [`content-briefs/kham-pha-do-thi.md`](content-briefs/kham-pha-do-thi.md) |
| `/phan-khu/hong-phat` | [`content-briefs/phan-khu-hong-phat.md`](content-briefs/phan-khu-hong-phat.md) |
| `/bang-gia` | [`content-briefs/bang-gia.md`](content-briefs/bang-gia.md) |
| `/phap-ly` | [`content-briefs/phap-ly.md`](content-briefs/phap-ly.md) |
| `/tiem-nang` | [`content-briefs/tiem-nang.md`](content-briefs/tiem-nang.md) |
| `/tien-do` | [`content-briefs/tien-do.md`](content-briefs/tien-do.md) |
| `/phong-cach-song` | [`content-briefs/phong-cach-song.md`](content-briefs/phong-cach-song.md) |
| `/vay-mua` | [`content-briefs/vay-mua.md`](content-briefs/vay-mua.md) |

Remaining before launch: create briefs for cluster pages in §2–§4 after search volume/SERP validation.

---

## §10. Reviewer signoff

- [ ] Search volume data đã có cho ≥80% URL
- [ ] Competitor SERP analysis xong cho 8 P0 core
- [ ] Sales keyword (4-8 từ Ngô Kim Quyên) đã merge vào
- [ ] Forbidden keyword grep clean
- [ ] Reviewer: ____________ Date: ____________
