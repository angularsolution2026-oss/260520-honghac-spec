# 09 — SEO Strategy (Hồng Hạc City)

**Version:** 3.0 | **Last updated:** 2026-05-16 | **Status:** Approved

---

## §0. Implementation Contract References

SEO page count/route planning không tự đủ để mark page complete. Khi implement SEO route/content, phải kéo thêm:

| Topic | Required contract |
|---|---|
| Route structure/API/data fetch | `06`, `05 §5.1`, `05 §5.5` |
| Content source/claim approval | `00 §4`, `15`, `17 §8` |
| Page completeness/acceptance/evidence | `website-structure.md`, `16`, `.ai/core/done-criteria.md` |
| Schema/canonical/noindex | `14`, `06 §5`, `00 §4.2` |
| Loading/empty/error states | `07 §10.1` |
| Feature/deferred SEO clusters | `02 §5.3`, `04`, `17` |

Indexed page must have source-safe content, schema eligibility, canonical policy and runtime verification evidence.

---

## §1. Mục Tiêu SEO

- Organic traffic → qualified leads → reduce ads dependency
- Target: Top 3 SERP cho intent cluster chiến lược
- Domain authority build thông qua E-E-A-T + topical authority

---

## §2. Page Architecture Philosophy

**Không tạo 1.000 trang sản phẩm index một cách máy móc.**

| Loại | Volume | Strategy |
|---|---|---|
| Core pages | 20–40 | Indexed, full content, schema |
| SEO cluster pages | 80–150 | Indexed, unique intent, pillar links |
| Phase pages | 20–50 | Indexed, phase-specific content |
| Lot utility pages | 500–2.000 | Noindex (nếu thin), explorable trong map |
| **Tổng indexed** | **~150–300** | Quality only |

**Lot pages:** 1.000 lô = 1.000 explorable entities trong map, KHÔNG phải 1.000 indexed pages mỏng.

---

## §3. SEO Intent Clusters

### §3.1. Core Pages (P0 — Sprint 1A)

| URL | Intent | Schema |
|---|---|---|
| `/` | Brand + discovery | `WebSite` + `Organization` |
| `/sa-ban` | Decision map / urban exploration | `WebPage` + `BreadcrumbList` |
| `/bang-gia` | Price intent | `FAQPage` |
| `/phap-ly` | Legal trust | `FAQPage` |
| `/kham-pha-do-thi` | Urban vision | `WebPage` |
| `/tiem-nang` | Investment intent | `WebPage` |
| `/tien-do` | Progress intent | `WebPage` |
| `/phong-cach-song` | Lifestyle intent | `WebPage` |

### §3.2. Phân Khu Cluster

| URL | Intent |
|---|---|
| `/phan-khu/hong-phat` | Hồng Phát overview |
| `/phan-khu/hong-phat/gan-cong-vien` | Near park intent |
| `/phan-khu/hong-phat/phu-hop-gia-dinh` | Family intent |
| `/phan-khu/hong-phat/view-xanh` | Greenery view |
| `/phan-khu/hong-phat/khu-yen-tinh` | Privacy/quiet |

Each subdivision page must link to `/sa-ban` as the primary exploration path. Hồng Thịnh and Hồng Phúc must remain deferred/hidden/noindex until their Tier 1 data pack is ready per `17 §8`.

### §3.3. Infrastructure SEO

| URL | Intent |
|---|---|
| `/tiem-nang/vanh-dai-4` | Vành đai 4 Thuận Thành |
| `/tiem-nang/dong-ha-noi` | Eastern Hanoi growth |
| `/tiem-nang/bac-ninh-fdi` | Bắc Ninh FDI Samsung |
| `/tiem-nang/gia-lam-ket-noi` | Gia Lâm connectivity |

### §3.4. Decision SEO

| URL | Intent |
|---|---|
| `/tiem-nang/mua-o-that-hay-dau-tu` | Buy to live vs invest |
| `/tiem-nang/nen-mua-giai-doan-dau-hay-sau` | Timing decision |
| `/tiem-nang/2-ty-nen-mua-phan-khu-nao` | Budget-based |
| `/tiem-nang/gia-dinh-2-con-chon-phan-khu` | Family size |

Decision SEO pages must not end in a generic lead form only. Each page must point to one concrete decision action: explore `/sa-ban`, calculate `/vay-mua`, verify `/phap-ly`, or request advisory help via `/tu-van`.

### §3.5. Comparison SEO (Sprint P2)

| URL | Intent |
|---|---|
| `/tiem-nang/so-sanh/hong-hac-vs-ecopark` | Direct comparison |
| `/tiem-nang/so-sanh/hong-hac-vs-ciputra` | Direct comparison |
| `/tiem-nang/so-sanh/hong-hac-vs-co-loa` | Direct comparison |

### §3.6. Progress SEO

| URL | Intent |
|---|---|
| `/tien-do/thang-6-2026` | Current month progress |
| `/tien-do/ha-tang-hong-phat` | Phase-specific infrastructure |
| `/tien-do/cap-nhat-vanh-dai-4` | Road infrastructure |

---

## §4. Schema JSON-LD

### §4.1. Schema Rules

- KHÔNG render schema trên page có `noindex`
- Schema phải match visible on-page content (Google policy)
- Validate với Schema.org + Google Rich Results Test
- Render server-side trong `<head>` (KHÔNG client-inject)
- Implementation: xem `14`

### §4.2. Schema Types by Page

| Page type | Schema |
|---|---|
| Homepage | `WebSite`, `Organization` |
| Pillar page | `WebPage`, `BreadcrumbList` |
| Lot detail `/sa-ban/[lot-id]` | `RealEstateListing` (chỉ khi đủ điều kiện `§4.3`) |
| FAQ sections | `FAQPage` |
| Blog articles | `Article`, `Person` (author) |
| Comparison pages | `WebPage`, `BreadcrumbList` |

### §4.3. `RealEstateListing` Render Conditions

PHẢI có đủ **tất cả** 5 fields sau mới render schema:
- `lot_code` (Tier 1)
- `phan_khu_name` (Tier 1)
- `product_type` (Tier 1)
- `area_range_min` + `area_range_max` (Tier 1)
- `legal_status_summary` (Tier 1)

Thiếu bất kỳ field nào → KHÔNG render `RealEstateListing`. Trang vẫn render, chỉ bỏ schema block.

---

## §5. Meta Tags Policy

### §5.1. Title Tag

- Format: `[Page-specific] | Hồng Hạc City Bắc Ninh`
- Max 60 chars (bao gồm separator)
- Homepage: `Hồng Hạc City Bắc Ninh — Khám phá đô thị 197ha`
- KHÔNG duplicate titles giữa các pages

### §5.2. Meta Description

- Max 160 chars
- Include main keyword tự nhiên
- Include clear value proposition
- KHÔNG duplicate descriptions

### §5.3. OG Tags

- `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- `og:image`: Minimum 1200×630px, `approvalStatus = approvedForPublic`
- Default OG image: khi không có page-specific image (fallback to brand image)
- `og:url`: phải khớp canonical URL (strip UTM — xem `06 §5.2`)

---

## §6. E-E-A-T Signals

| Signal | Implementation |
|---|---|
| Author profiles | Tên thật, credentials, ảnh thật, LinkedIn link |
| Published/Updated dates | Visible trên mọi article/analysis page |
| Source citations | Tier 1/3 inline links trong content |
| Fact Ledger | JSON trong `articles.sources` field (`15 §1.2`) |
| Business info | NAP (Name, Address, Phone) consistent |
| Physical address | Địa chỉ văn phòng thật trong footer |
| Contact methods | Email + hotline verifiable |

**NAP hiện tại (đã xác nhận):**
- Name: Công ty Cổ phần Đầu tư Công đoàn Ngân hàng Công Thương
- Address: Phố Chùa Thầm, Song Liễu, Bắc Ninh
- Phone: 0945375688

---

## §7. Technical SEO Checklist

Technical SEO SSOT nằm tại `06 §5` (robots/canonical/noindex/sitemap/slug/redirect). Bảng dưới đây là checklist tóm tắt theo `06 §5`.

| Item | Spec ref |
|---|---|
| Canonical URL policy | `06 §5.2` |
| noindex policy | `06 §5.3` |
| Sitemap partition | `06 §5.4` |
| Robots.txt | `06 §5.1` |
| Slug policy | `06 §5.5` |
| Redirect policy | `06 §5.6` |
| Core Web Vitals targets | `11 §2` |
| Image optimization | `11 §3` |
| Security headers | `02 §7` |
| HTTPS + HSTS | `02 §7`, `06 §5.2` |
| Schema markup implementation | `14` |

---

## §8. Local SEO

| Signal | Implementation |
|---|---|
| Google Business Profile | Bắc Ninh address, consistent NAP |
| Local intent pages | Xem `§3.4` slug list |
| Local lead source tracking | Enum `05 §4.4` — `local_*` values |
| Local schema | `PostalAddress` trong `Organization` schema (`14 §2.2`) |
| Reviews | Google reviews embed (Tier 3 verified only) |

**Local lead sources phải tracked:** `local_organic`, `local_gbp`, `local_map_intent`, `local_near_me`, `local_zalo`, `local_phone_call`, `local_poi_click`, `local_directions_click`

---

## §9. Content Publishing Governance (SEO-safe)

- Bài viết chỉ publish khi `claim_status = approved_public` (`05 §3.3`)
- Mọi fact claim phải có `sources` JSON với Tier 1/3 reference (`15 §1.2`)
- `updated_at` chỉ update khi content thực sự thay đổi — KHÔNG update date để "freshen" mà không có content change
- Không doorway spam: mỗi cluster page phải có unique value khác biệt rõ ràng
- Minimum word count: 300 (cluster), 800 (pillar) — xem `15 §8`
