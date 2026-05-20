# 01 — Project Overview (Hồng Hạc City)

**Version:** 3.0 | **Last updated:** 2026-05-16 | **Status:** Approved
**Authority:** `00 §2`, `00 §4`

---

## §0. Implementation Contract References

Project overview chỉ mô tả sản phẩm và journey. Khi biến overview thành code, bắt buộc kéo thêm contract chi tiết:

| Topic | Required contract |
|---|---|
| Form, lead, advisory flow | `05 §5`, `06 §4.0`, `07 §10.1–10.4`, `08` |
| Search/filter/map/list interaction | `05 §5.1`, `05 §5.5`, `07 §10.4` |
| Email/Zalo/Telegram/notification | `02 §5.1–5.2`, `12`, `13` |
| Inventory/status/score/routing | `05 §5.3`, `05 §5.6`, `10` |
| Feature release/roadmap/deferred route | `02 §5.3`, `04`, `17 §8` |

Overview không phải acceptance criteria đầy đủ. Phase/task phải có evidence theo `.ai/core/done-criteria.md`.

---

## §1. Thông Tin Dự Án (Tier 1 Verified)

| Thông số | Giá trị | Nguồn |
|---|---|---|
| Tên dự án | Hồng Hạc City | Tier 1 |
| Vị trí | Bắc Ninh | Tier 1 |
| Quy mô | ~197,76 ha | Tier 1 |
| Tầm nhìn phát triển | ~20 năm | Tier 1 |
| Mô hình | Mở bán từng giai đoạn — không bán toàn bộ một lần | Tier 1 |
| Tham chiếu thương hiệu | Phú Mỹ Hưng | Tier 1 |
| Official website của CĐT | `honghacphumyhung.vn` | — |
| Website platform của chúng ta | `https://bacninhhonghaccity.vn` (env: `NEXT_PUBLIC_SITE_URL`) | — |

---

## §2. Phân Khu Chính

| Phân khu | Slug | Status | Sprint |
|---|---|---|---|
| Hồng Phát | `/phan-khu/hong-phat` | Active | 1B |
| Hồng Thịnh | `/phan-khu/hong-thinh` | Roadmap | 2 |
| Hồng Phúc | `/phan-khu/hong-phuc` | Roadmap | 2 |

Safe-default khi data null: xem `00 §7`.

---

## §3. Định Vị Website

**Không phải:**
- Sales landing page
- Brochure microsite
- Clone official site của CĐT
- Website mở bán
- Môi giới truyền thống

**Phải là:**
- Luxury PropTech Platform
- Urban Intelligence Platform
- Interactive Decision Experience
- SEO + CRO + Trust Engine

---

## §4. Core Product

> **Interactive Urban Decision Map** (`/sa-ban`)

Mọi tính năng phải quay về map: AI Matching, Financial tools, Phase/giai đoạn, Tiến độ, Lifestyle overlay, Advisory flow.

---

## §5. User Journey

```
Wonder → Explore → Interact → Understand → Compare → Trust → Follow → Convert
```

Không ép form ở bước 1–3. Form xuất hiện tự nhiên ở bước 5–7.

---

## §6. Lead System Architecture

| Loại lead | Trigger | Score weight |
|---|---|---|
| Watchlist Lead | Theo dõi phase tiếp theo | +15 |
| Progress Lead | Theo dõi tiến độ & hạ tầng | +10 |
| Financial Lead | Tính phương án sở hữu | +20 |
| Matching Lead | Tìm vị trí phù hợp | +20 |
| Advisory Lead | Tư vấn riêng | +40 |

**Flow:** Anonymous Intent → Soft Lead → Intent-qualified Lead → Advisory Lead → Contract

Scoring formula đầy đủ: `08 §6`.

---

## §7. SEO Architecture

- 20–40 core pages (indexed)
- 80–150 SEO cluster pages (indexed)
- 20–50 phase pages (indexed)
- 500–2.000 lot pages (utility — noindex nếu thin content)
- **Tổng indexed: ~150–300 trang chất lượng**

**Index:** Core, phase, lifestyle clusters, investment clusters, infrastructure, legal, comparison pages
**Noindex:** Lot utility (thin content), temporary filters, internal map states, thin duplicate pages

Mỗi indexed page phải có: unique search intent, nội dung khác biệt, value thật, internal links, schema phù hợp.

---

## §8. SEO Intent Clusters

### §8.1. Phân khu intent
- `/phan-khu/hong-phat/gan-cong-vien`
- `/phan-khu/hong-phat/phu-hop-gia-dinh`
- `/phan-khu/hong-phat/view-xanh`
- `/phan-khu/hong-phat/khu-yen-tinh`

### §8.2. Infrastructure SEO
- `/tiem-nang/vanh-dai-4`
- `/tiem-nang/dong-ha-noi`
- `/tiem-nang/bac-ninh-fdi`
- `/tiem-nang/gia-lam-ket-noi`

### §8.3. Decision SEO
- `/tiem-nang/mua-o-that-hay-dau-tu`
- `/tiem-nang/nen-mua-giai-doan-dau-hay-sau`
- `/tiem-nang/2-ty-nen-mua-phan-khu-nao`
- `/tiem-nang/gia-dinh-2-con-chon-phan-khu`

### §8.4. Progress SEO
- `/tien-do/thang-6-2026`
- `/tien-do/ha-tang-hong-phat`
- `/tien-do/cap-nhat-vanh-dai-4`

---

## §9. Image Strategy

| Tầng | Loại ảnh |
|---|---|
| Urban Scale | Toàn khu 197ha, ecosystem, infrastructure, aerial |
| Lifestyle | Walking, greenery, family, community — ít render, nhiều lived-in feeling |
| Evolution | Timeline, before/after, progress photos |
| Interactive | Highlighted lots, filtered map, AI suggestions, phase overlays |

**Rules:**
- Không stock photo gây hiểu sai
- Ảnh drone/render phải có `approvalStatus = approvedForPublic`
- Chưa có asset thật → Abstract Premium Placeholder + disclaimer "Ảnh thực tế đang được cập nhật"
- Ảnh OG (`og:image`) minimum 1200×630px, phải có `approvalStatus = approvedForPublic`
