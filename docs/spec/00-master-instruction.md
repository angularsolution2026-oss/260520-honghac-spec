# 00 — MASTER INSTRUCTION (Hồng Hạc City)

**Version:** 3.0 | **Last updated:** 2026-05-16 | **Status:** LOCKED — Final Architecture v3
**Authority:** Đây là file LUẬT CAO NHẤT. Mọi conflict → file này thắng.

---

## §1. Mục Đích & Phạm Vi

File này là bộ luật tối thượng cho mọi AI coding agent (Cursor, Claude, Grok, v.v.) khi làm việc với dự án Hồng Hạc City. Mọi file spec còn lại (`01`–`17` và `website-structure`) là **subordinate** — chỉ được chi tiết hóa, không được mâu thuẫn.

**Tổng số file spec: 19** (`00`–`17` + `website-structure`). Xem cross-reference đầy đủ tại `16 §5`.

---

## §2. Business Context & Objective

| Chiều | Nội dung |
|---|---|
| Mục tiêu kinh doanh | SEO organic → CRO → Lead chất lượng → Tư vấn → Hợp đồng → Giảm chi phí ads |
| Định vị website | **Decision Platform** — không phải sales landing page |
| Core product | **Interactive Urban Decision Map** (`/sa-ban`) |
| Official site của CĐT | `honghacphumyhung.vn` = authority nguồn chính thức |
| Website này (platform) | `https://bacninhhonghaccity.vn` — Decision platform hỗ trợ người mua (xem `02 §3`) |

> **Phân biệt rõ:** `honghacphumyhung.vn` là website chính thức của chủ đầu tư. `https://bacninhhonghaccity.vn` là platform tư vấn độc lập của chúng ta. Không được nhập nhằng hai domain này trong bất kỳ nội dung nào.

---

## §3. Glossary — Thuật Ngữ Chuẩn (SSOT)

> Mọi file spec phải dùng đúng thuật ngữ dưới đây. Không dùng từ đồng nghĩa tự phát.

| Thuật ngữ chuẩn | Không dùng | Ý nghĩa |
|---|---|---|
| `visitor` | khách, user ẩn danh | Người dùng chưa đăng nhập |
| `sales_agent` | broker, sales, môi giới | Nhân viên bán hàng trong portal |
| `admin_content` | admin, quản trị | Admin quản lý content & leads |
| `super_admin` | root, superuser | Admin có full quyền |
| `surface` | lead_source (khi dùng làm prop) | Điểm xuất phát của lead form (prop name = `surface`, DB field = `lead_source`) |
| `lead_source` | surface (khi nói về DB) | Giá trị enum lưu trong Firestore |
| `HC` (Hành chính) | giờ làm việc | 08:00–21:00 ICT — áp dụng cho SLA tính giờ |
| `phan_khu` | zone, khu | Phân khu trong dự án (hong_phat, hong_thinh, hong_phuc) |
| `lot` | lô đất, ô đất | Một đơn vị bất động sản trong inventory |
| `phase` | giai đoạn, đợt | Đợt mở bán trong một phan_khu |
| `FallbackModal` | popup thay thế | Modal hiện khi route chưa implement |

---

## §4. Source Trust Policy (Canonical)

### §4.1. Tier Mapping

| Tier | Enum key | Nguồn | Public? |
|---|---|---|---|
| Tier 1 | `tier_1_official_verified` | `honghacphumyhung.vn`, `phumyhung.vn` | ✅ |
| Tier 2 | `tier_2_internal_reference` | CSBH nội bộ, Admin-duyệt | ❌ (chỉ logic ẩn) |
| Tier 3 | `tier_3_media_verified` | Báo chí uy tín (VnExpress, Tuổi Trẻ, v.v.) | ✅ (context only) |
| Tier 4 | `tier_4_listing_claim` | Web môi giới, Batdongsan | ❌ |
| Tier 5 | `tier_5_unverified` | AI generate, blog rác | ❌ Tuyệt đối không dùng |

### §4.2. Programmatic SEO Whitelist (`/sa-ban/[lot-id]`)

| Field | Tier required | Safe-default khi null |
|---|---|---|
| `lot_code` | Tier 1 | 404 — KHÔNG render soft page |
| `phan_khu_name` | Tier 1 | "Đang cập nhật phân khu" |
| `area_range` | Tier 1 | "Diện tích đang được cập nhật" |
| `product_type` | Tier 1 | "Loại hình đang được cập nhật" |
| `legal_status_summary` | Tier 1 | "Thông tin pháp lý đang được xác minh" |
| `progress_summary` | Tier 1 | "Tiến độ đang được cập nhật" |
| `price_range` | Tier 2 — KHÔNG public | "Liên hệ để nhận thông tin giá" |
| `geo_lat`, `geo_lng` | Tier 1 | Bỏ key `geo` khỏi schema |

**Null-state policy:**
- `NotFoundLotPolicy`: `lot_code` invalid hoặc không tồn tại trong DB → `404`. KHÔNG render soft page, KHÔNG render lead form.
- `ThinContentPolicy`: `lot_code` hợp lệ nhưng thiếu ≥ 50% whitelist core fields → render safe-default + conditional lead form + `noindex`.

---

## §5. Navigation Architecture (LOCKED)

### §5.1. Top Navigation

```
[LOGO]  Khám phá đô thị | Sa bàn | Tiềm năng | Tiến độ | Phong cách sống | Tư vấn | Đối tác
```

**Không đưa vào top nav:** Bảng giá, Pháp lý, Tin tức, Hotline, Đăng ký ngay.

### §5.2. Route Map Canonical

| Route | Slug | Priority | Sprint |
|---|---|---|---|
| Trang chủ | `/` | P0 | 1A |
| Khám phá đô thị | `/kham-pha-do-thi` | P0 | 1A |
| Sa bàn | `/sa-ban` | P0 shell / P1 full | 1A shell / 1B full |
| Tiềm năng | `/tiem-nang` | P1 | 1B |
| Tiến độ | `/tien-do` | P1 | 1B |
| Phong cách sống | `/phong-cach-song` | P1 | 1B |
| Tư vấn | `/tu-van` | P0 | 1A |
| Đối tác | `/doi-tac` | P2 | 2 |
| Pháp lý | `/phap-ly` | P0 | 1A |
| Bảng giá | `/bang-gia` | P0 | 1A |
| Lot detail | `/sa-ban/[lot-id]` | P1 | 1B |
| Hồng Phát | `/phan-khu/hong-phat` | P1 | 1B |
| Hồng Thịnh | `/phan-khu/hong-thinh` | P2 | 2 |
| Hồng Phúc | `/phan-khu/hong-phuc` | P2 | 2 |

### §5.3. Homepage First-Viewport Rule

Homepage must make `/sa-ban` a first-viewport signal even before the full map is implemented. Sprint 1A may render a `SaBanPreview` / decision-map shell and route fallback, but must not bury the core product below sales, price, or brochure sections.

**Homepage first viewport must include:**
- Brand/project identity: "Hồng Hạc City Bắc Ninh"
- Independent decision-platform disclosure, not official-site claim
- Visible path to `/sa-ban`
- A map/urban decision preview that does not import `maplibre-gl` in Phase 0
- Primary CTA from `00 §8`, preferably "Khám phá sa bàn"

**Forbidden first-viewport framing:**
- "Đăng ký ngay", "Giữ chỗ", "Chốt căn", "Giá gốc chủ đầu tư"
- Bảng hàng/giỏ hàng as primary mental model
- Official-site / exclusive-agent claim without evidence

---

## §6. Hard Rules (Không được override)

1. **Map-first**: Mọi tính năng quay về `/sa-ban`
2. **Experience flow**: Wonder → Explore → Interact → Understand → Compare → Trust → Follow → Convert
3. **No fake urgency**: Cấm countdown, "50 căn cuối", "cơ hội cuối cùng"
4. **Fact-safe**: Mọi claim phải có Tier ≥ 3 trước khi public
5. **Lead score before call**: Hot (≥70) mới chuyển sales. Warm/Cold nurture bằng Zalo/email
6. **No rebuild architecture**: Chỉ optimize/instrument/measure/improve
7. **No PII in transit**: KHÔNG gửi `phone`, `email`, `full_name` ra bên ngoài server qua bất kỳ channel nào (GA4, GTM, Telegram)

### §6.1. Global Implementation Contracts

File này là luật cao nhất, nhưng không lặp toàn bộ contract kỹ thuật. Khi task chạm các vùng dưới đây, AI/dev bắt buộc đọc và áp dụng file tương ứng:

| Khi task chạm | Contract bắt buộc |
|---|---|
| Form/API/data write | `05 §5`, `05 §5.4–5.6`, `06 §4.0` |
| Search/filter/sort/list/Kanban | `05 §5.1`, `05 §5.5`, `07 §10.4` |
| Modal/drawer/form/interactive UI | `07 §10.1–10.4` |
| Email/Telegram/webhook/revalidate/job | `02 §5.1–5.2` |
| Feature rollout/hidden/deferred/experiment | `02 §5.3`, `04 §7`, `17 §8` |
| Admin/PII/permission/security | `03 §2.1`, `03 §4`, `13` |
| Multi-record update/status/inventory/audit | `05 §5.3`, `05 §5.6` |

Không được đánh dấu task done chỉ dựa vào file này; phải kiểm tra contract chuyên ngành tương ứng.

---

## §7. Safe-Default Wording (5 cases cố định)

| Case | Wording |
|---|---|
| Price null | "Liên hệ để nhận thông tin giá phù hợp với giai đoạn hiện tại" |
| Legal null | "Thông tin pháp lý đang được xác minh từ nguồn chính thức" |
| Progress null | "Tiến độ đang được cập nhật. Đăng ký nhận thông báo mới nhất" |
| Area/product null | "Thông tin lô đất đang được cập nhật" |
| ROI null | "Dữ liệu tham khảo, cần xác nhận tại thời điểm giao dịch" |

---

## §8. CTA Language (Canonical)

**Dùng:**
- Khám phá sa bàn
- Tìm vị trí phù hợp
- Xem trên bản đồ tương tác
- Theo dõi phase tiếp theo
- Tính phương án sở hữu
- Nhận gợi ý cá nhân hóa
- Trao đổi cùng chuyên viên tư vấn
- Nhận cập nhật hạ tầng

**Cấm tuyệt đối:**
- Đăng ký ngay / Book now
- Cơ hội cuối cùng / 50 căn cuối
- Cam kết sinh lời / Bảo chứng chắc chắn / Tăng giá chắc chắn
- Nhận báo giá sốc / Giá gốc chủ đầu tư
- Website chính thức / Đại lý ủy quyền / Độc quyền (nếu chưa có bằng chứng)

---

## §9. E-E-A-T Governance

- Phải có ≥ 1 author profile thật: tên thật + credentials + ảnh thật (không stock)
- Mọi bài phân tích thị trường phải ghi tác giả + ngày cập nhật
- Disclosure bắt buộc (xem §11): xuất hiện ở Footer (mọi trang), Hero (trang chủ), trang bảng giá, trang pháp lý
- CẤM tự nhận: "website chính thức", "đại lý ủy quyền", "độc quyền" nếu chưa có bằng chứng

**Author E‑E‑A‑T hiện tại (đã xác nhận):** Ngô Kim Quyên

---

## §10. Comparison Page Governance

- Trung lập — không bôi xấu đối thủ
- Chỉ so sánh các dimension có Tier 1 hoặc Tier 3 source cho cả hai phía
- Disclaimer bắt buộc (xem §11.4) hiển thị nổi bật — không buried footer
- Routes: `/tiem-nang/so-sanh/hong-hac-vs-ecopark`, `/hong-hac-vs-ciputra`, `/hong-hac-vs-co-loa`

---

## §11. Legal Disclaimers (Canonical — 4 loại)

### §11.1. Disclaimer Website (bắt buộc xuất hiện ≥ 2 vị trí)

> "Website này là nền tảng thông tin tư vấn bất động sản độc lập. Mọi thông tin cần được đối chiếu với nguồn chính thức từ chủ đầu tư. Thông tin giá, tiến độ, pháp lý có thể thay đổi theo từng giai đoạn."

### §11.2. Disclaimer Calculator

> "Kết quả tính toán mang tính tham khảo. Lãi suất thực tế phụ thuộc ngân hàng và thời điểm vay. Cần xác nhận với ngân hàng trước khi quyết định."

### §11.3. Disclaimer ROI/Investment

> "Mô phỏng tham khảo. Không phải cam kết sinh lời. Thị trường bất động sản có thể biến động. Quyết định đầu tư cần tư vấn chuyên sâu."

### §11.4. Disclaimer Comparison Pages

> "Thông tin so sánh mang tính tham khảo, được tổng hợp từ nguồn công khai tại thời điểm xuất bản. Độ chính xác cần được xác minh trực tiếp."

---

## §12. Anti-Hallucination & Score Rules

- KHÔNG claim Live Implementation Confidence > 2.0/10 khi chưa có runtime evidence (`16 §4`)
- KHÔNG claim "website đạt X/10" chỉ dựa trên spec Markdown
- Score thay đổi > 0.5 pts phải có `reasonForDelta` + `evidenceBasis`

---

## §13. Final Lock Rule

**KHÔNG rebuild architecture nữa.**

Kiểm tra trước khi quyết định thay đổi lớn:
1. Có lệch khỏi core product Interactive Urban Decision Map không?
2. Có biến thành sales brochure không?
3. Có chôn thứ quan trọng quá sâu không?
4. Có làm Google không crawl được không?
5. Có overbuild mất luxury calm không?

---

## §14. Positioning Statement

> Website should feel like: **An intelligent system to explore the evolution of a future city.**
> Not: **A project sales website.**
