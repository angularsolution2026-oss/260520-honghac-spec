# G1 — Homepage Copy v1

**Status:** Draft ready for review — dữ liệu thật vẫn được gắn `SOURCE_REQUIRED` / `ASSET_REQUIRED`
**Authority:** [00 §5.3, §8, §11](../spec/00-master-instruction.md) · [06 §2](../spec/06-app-router-structure.md) · [website-structure §3](../spec/website-structure.md) · [07 §2](../spec/07-ui-ux-design-system.md)
**Reviewer:** `HUMAN_REQUIRED`: chủ dự án + 1 copywriter có brief luxury PropTech
**Forbidden words check:** đã bỏ "Đăng ký ngay", "Mua ngay", "Chốt căn", "Giữ chỗ", "Giá gốc CĐT", "50 căn cuối", "Cơ hội cuối cùng", "Cam kết sinh lời", "Website chính thức", "Đại lý ủy quyền".

---

## §1. Section 1 — HeroDecisionConsole

### H1 (3 phương án — chọn 1)

**A.** Hiểu một đô thị 197 ha trước khi bước vào nó
**B.** Bản đồ quyết định cho một đô thị 20 năm
**C.** Hồng Hạc City Bắc Ninh — nhìn cả đô thị trước khi chọn một vị trí

> Recommendation: **A** (đặt câu hỏi về sự hiểu, không khoe sản phẩm — đúng tone luxury PropTech).

### Sub-copy (≤25 từ)

> Nền tảng tư vấn độc lập về dự án 197,76 ha tại Phường Song Liễu, Bắc Ninh — đồng sở hữu bởi Phú Mỹ Hưng (51%) và Nomura Real Estate Asia (49%). Khám phá · So sánh · Theo dõi — trước khi quyết định.

### Trust line (bắt buộc — disclaimer 00 §11.1)

> Thông tin tham khảo. Vui lòng đối chiếu nguồn chính thức của chủ đầu tư tại [honghacphumyhung.vn](https://honghacphumyhung.vn/).

### CTAs (theo 04 §3 + 00 §8)

| Vị trí | Label | Route |
|---|---|---|
| Primary | Khám phá sa bàn | `/sa-ban` |
| Secondary | Xem bảng giá tham khảo | `/bang-gia` |
| Tertiary | Nhận tư vấn riêng | `/tu-van` |

### Mini-map / SaBanPreview alt text

> Bản đồ tương tác toàn cảnh đô thị Hồng Hạc City — 197 ha, 3 phân khu, 20 năm phát triển.

---

## §2. Section 2 — DecisionPaths (3 card)

> 3 hành trình quyết định khác nhau. Bạn đang ở hành trình nào?

| Card | Headline (≤8 từ) | Sub-copy (≤20 từ) | CTA | Route |
|---|---|---|---|---|
| Mua để ở | Sống đúng nhịp của gia đình | Tìm phân khu hợp với lối sống và ngân sách của bạn | Tìm vị trí phù hợp | `/phong-cach-song` |
| Đầu tư dài hạn | Theo dõi giá trị qua từng giai đoạn | Phân tích tiềm năng tăng trưởng — không cam kết sinh lời | Xem phân tích tiềm năng | `/tiem-nang` |
| Theo dõi giai đoạn | Không vội — chờ phase phù hợp | Cập nhật tiến độ phân khu và hạ tầng khu vực | Theo dõi phase tiếp theo | `/tien-do` |

---

## §3. Section 3 — SourceTrustBand

### Headline
> Mọi thông tin trên trang này đều dẫn được về nguồn

### Sub-copy
> Tier 1: chủ đầu tư · Tier 3: báo chí kiểm chứng · Chúng tôi không tự nhận là website chính thức.

### Trust signals (text only — không logo nếu chưa approved)
- Pháp nhân chủ đầu tư: **Công ty Cổ phần Đầu tư Công đoàn Ngân hàng Công Thương** (MST 2300998544) — pháp nhân trên GPXD 158/2024 + HĐ thuê đất với UBND Bắc Ninh
- Đồng chủ sở hữu cổ phần: **Phú Mỹ Hưng 51%** (từ 2016) · **Nomura Real Estate Asia 49%** (từ 10/2025) — Top 10 BCI Asia 2019 (PMH)
- Quy mô **197,76 ha** quy hoạch · diện tích cấp phép HTKT giai đoạn 1: **1.985.132,8 m²** (GPXD 158/2024) · dân số dự kiến **~27.700 người**
- Vị trí: **Phường Song Liễu, Tỉnh Bắc Ninh** (hợp nhất 01/07/2025 từ Xuân Lâm, Hà Mãn, Ngũ Thái, Song Liễu — Thuận Thành cũ) — cửa ngõ Đông Bắc Hà Nội
- Mật độ xây dựng **27,9%** · cây xanh & mặt nước **19,6%**
- Nguyên tắc phát triển **7S**: Sustainability · Smart Planning · Service · Safety · Standards · Scarcity · Society

> Mọi số liệu Tier 1, dẫn nguồn từ [honghacphumyhung.vn](https://honghacphumyhung.vn/) và [nomura-re-vn.com](https://nomura-re-vn.com/du-an/hong-hac-city/). Xem [docs/data/HONG-HAC-FACTS.md](../data/HONG-HAC-FACTS.md).
> `APPROVAL_REQUIRED`: chỉ chèn logo CĐT khi `partnerLogoApprovalStatus = approved`.

---

## §4. Section 4 — CurrentReleaseIntelligence (Hồng Phát context)

### Headline
> Phân khu đang mở: Hồng Phát — "Khởi nguồn thịnh vượng"

### Sub-copy
> **1.074 căn** trên **3 tiểu khu** Hồng Phát — hiện **323 căn tiểu khu F1** được phép mở bán đợt 1 (từ 14/6/2025, theo Thông tư 05/2024/TT-BXD). Xem vị trí từng lô trên bản đồ và đối chiếu pháp lý/tiến độ trước khi đặt câu hỏi cho chuyên viên.

### Bullet (5 dòng — Tier 1)
- **323 căn F1 đợt 1 (được phép mở bán):** 17 BT đơn lập (325–418 m²) · 42 BT song lập (256–284 m²) · 170 shophouse (382–775 m²) · 94 townhouse (296–336 m²)
- **Phần còn lại (F2 + F3):** ~751 căn chưa có thông báo mở bán — không hứa giao dịch
- **Mật độ xây dựng phân khu:** 51,9%
- **Hình thức sở hữu:** Sở hữu lâu dài — sổ hồng riêng từng căn — chi tiết tại `/phap-ly`
- **Tiến độ:** Hạ tầng kỹ thuật F1 đang triển khai (cập nhật 04/2026) — chi tiết tại `/tien-do`

### CTA
> Xem Hồng Phát trên bản đồ → `/phan-khu/hong-phat`
> Khám phá sa bàn → `/sa-ban` (filter pre-applied: phân khu Hồng Phát)

---

## §5. Section 5 — UrbanIntelligencePreview (197 ha, 20-year vision)

### Headline
> Một đô thị 197,76 ha không xây trong một mùa

### Sub-copy (≤40 từ)
> 3 phân khu — Hồng Phát (Khởi nguồn thịnh vượng), Hồng Thịnh (Tiếp mạch phồn vinh), Hồng Phúc (Vững bền hạnh phúc) — mở bán theo từng giai đoạn. Bạn không cần chọn ngay; bạn chọn đúng phase phù hợp với mình.

### 3-column block
| Phân khu | Status | Slogan | Action |
|---|---|---|---|
| Hồng Phát | Đang mở (tiểu khu F1) | Khởi nguồn thịnh vượng | `/phan-khu/hong-phat` |
| Hồng Thịnh | Sắp công bố | Tiếp mạch phồn vinh | DEFERRED — chỉ subscribe phase |
| Hồng Phúc | Quy hoạch tương lai | Vững bền hạnh phúc | DEFERRED — chỉ subscribe phase |

### Connectivity block (Tier 1)
- Cách Vành đai 4: **2 km** · Hà Nội: **23 km** · TP Bắc Ninh: **20 km**
- Cách sân bay Nội Bài: **40 km** · sân bay Gia Bình (tương lai): **16 km**

### Tiện ích toàn dự án (Tier 1)
- **Giáo dục:** 8 trường các cấp · **Y tế:** 3 trung tâm · **Thương mại:** 1 TTTM + 2 trung tâm đa chức năng 25 tầng
- **Văn hóa thể thao:** 2 trung tâm · **Giao thông tĩnh:** 3 bãi đỗ xe nhiều tầng · Công viên · Clubhouse

### CTA
> Khám phá tầm nhìn đô thị → `/kham-pha-do-thi`

---

## §6. Section 6 — DecisionSupportPanel (4 link)

### Headline
> Bốn câu hỏi quyết định — bốn công cụ hỗ trợ

| Câu hỏi | Công cụ | Route |
|---|---|---|
| "Pháp lý có rõ không?" | Hub bằng chứng pháp lý | `/phap-ly` |
| "Giá ở phase này khoảng bao nhiêu?" | Bối cảnh giá tham khảo | `/bang-gia` |
| "Tôi vay được bao nhiêu?" | Tính phương án sở hữu | `/vay-mua` |
| "Tôi muốn nói chuyện với người thật" | Trao đổi cùng chuyên viên | `/tu-van` |

---

## §7. Section 7 — ProgressAndSignalPreview

### Headline
> Đô thị này đang thay đổi mỗi tháng

### Sub-copy
> Theo dõi tiến độ phân khu, hạ tầng khu vực, và các tín hiệu Vành đai 4 / Đông Hà Nội — cập nhật từ nguồn Tier 1/3.

### Mini timeline (3-4 mốc gần nhất — từ data)
- **04/2026 (Tier 1):** Tiểu khu F1 — đang xây dựng hạ tầng kỹ thuật ([honghacphumyhung.vn/hongphat](https://honghacphumyhung.vn/hongphat/))
- **02/2026 (Tier 1):** Khởi công đường nội khu phase 1 — [honghacphumyhung.vn](https://honghacphumyhung.vn/)
- **`SOURCE_REQUIRED` Tier 3:** Vành đai 4 đoạn Thuận Thành — chờ URL VnExpress (xem `tier3-vnexpress-vanhdai4` trong [tier-sources.demo.json](../../data/seeds/tier-sources.demo.json))

### CTA
> Xem toàn bộ tiến độ → `/tien-do`

---

## §8. Section 8 — LifestyleSection (3 story card)

### Headline
> Đô thị không chỉ là lô đất

### 3 card

| # | Category | Headline (≤8 từ) | Sub-copy (≤20 từ) | Ảnh |
|---|---|---|---|---|
| 1 | Gia đình | Buổi sáng của con đi học | Trường, công viên, đường về — trong bán kính đi bộ | `ASSET_REQUIRED`: ảnh thật hoặc AbstractPlaceholder `lifestyle` |
| 2 | Sống xanh | Khoảng thở giữa đô thị | Tỷ lệ cây xanh và không gian cộng đồng theo quy hoạch | `ASSET_REQUIRED`: ảnh thật hoặc AbstractPlaceholder `urban` |
| 3 | Cộng đồng | Hàng xóm cùng thế hệ | Tệp dân cư trẻ — cùng giai đoạn lập gia đình | `ASSET_REQUIRED`: ảnh thật hoặc AbstractPlaceholder `lifestyle` |

### CTA chung
> Khám phá phong cách sống → `/phong-cach-song`

---

## §9. Section 9 — LeadMagnetLibrary (4 asset — decision, không brochure)

### Headline
> Bốn tài liệu quyết định, không phải brochure bán hàng

| # | Title | Type | Useful for |
|---|---|---|---|
| 1 | Hướng dẫn chọn lô Hồng Phát theo hướng nhà & ngân sách | PDF | Mua để ở |
| 2 | Phân tích hạ tầng Đông Hà Nội (Vành đai 4 / FDI / Gia Lâm) | PDF | Đầu tư |
| 3 | Checklist pháp lý 12 mục trước khi đặt cọc bất kỳ dự án nào | PDF | Trust |
| 4 | Hướng dẫn tính khả năng vay theo thu nhập gia đình | PDF | Financial |

### Gate rule
- Phone hoặc email + consent_privacy = true → lấy signed URL từ GCS
- KHÔNG bắt điền full form. KHÔNG ép persona.
- Copy gate: *"Nhập số điện thoại để chúng tôi gửi tài liệu qua Zalo trong vòng 5 phút."*

---

## §10. Section 10 — FAQDecisionObjections (10 câu — chống objection thật)

> Các câu này là **objection thực** người mua nói khi đứng giữa quyết định, không phải FAQ trang trí.

1. **"Sao tôi nên xem trang này thay vì website chính thức của CĐT?"**
   → Chúng tôi không thay thế nguồn chính thức. Chúng tôi giúp bạn **so sánh, hiểu pháp lý, tính tài chính, theo dõi phase** trước khi đặt câu hỏi cho CĐT. Mọi fact đều dẫn nguồn về [honghacphumyhung.vn](https://honghacphumyhung.vn/).

2. **"Giá có rẻ hơn ở đây không?"**
   → Không. Giá do CĐT công bố — chúng tôi không tự định giá. Chúng tôi giúp bạn hiểu **tại sao giá thay đổi qua từng phase**.

3. **"Phân khu Hồng Phát có còn không?"**
   → Hồng Phát tổng **1.074 căn** (3 tiểu khu F1+F2+F3). Hiện chỉ **323 căn tiểu khu F1** được Sở Xây dựng Bắc Ninh cho phép mở bán đợt 1 (từ 14/6/2025, căn cứ Thông tư 05/2024/TT-BXD). Phần còn lại của Hồng Phát (F2, F3) và 2 phân khu Hồng Thịnh, Hồng Phúc chưa có thông báo mở bán. Trạng thái từng lô trong 323 căn được cập nhật real-time trên sa bàn — màu lô cho biết available/holding/deposited/sold.

4. **"Hồng Thịnh và Hồng Phúc khi nào mở?"**
   → Chưa công bố Tier 1. Chúng tôi không tạo countdown hay urgency giả. Bạn có thể đăng ký theo dõi phase.

5. **"Có bảo đảm sinh lời không?"**
   → Không. Chúng tôi cấm dùng từ "cam kết sinh lời" trong mọi nội dung — đây là quy định nội bộ của chúng tôi.

6. **"Tôi có 2 tỷ — mua được không?"**
   → Phụ thuộc loại sản phẩm. Tiểu khu F1 (323 căn đang được phép mở bán) có 4 loại: townhouse 94 căn (296–336 m²), shophouse 170 căn (382–775 m²), biệt thự song lập 42 căn (256–284 m²) và đơn lập 17 căn (325–418 m²). Giá do CĐT công bố theo từng đợt — dùng `/vay-mua` để tính khả năng vay, hoặc trao đổi 1-1 tại `/tu-van`.

7. **"Pháp lý dự án thế nào?"**
   → Xem `/phap-ly` — chúng tôi liệt kê nguồn Tier 1 và Tier 3 có thể kiểm chứng độc lập.

8. **"Bao giờ giao nhà?"**
   → Mốc giao nhà chỉ công bố khi CĐT xác nhận. Chúng tôi không hứa thay CĐT.

9. **"Vành đai 4 có làm thật không?"**
   → Có. Chúng tôi dẫn nguồn báo chí Tier 3 (VnExpress, Tuổi Trẻ) tại `/tiem-nang/vanh-dai-4`.

10. **"Tôi muốn gặp người thật, không phải chatbot."**
    → Đặt lịch tư vấn 1-1 tại `/tu-van`. Chuyên viên: **Ngô Kim Quyên** (xem profile + credentials).

---

## §11. Section 11 — FinalAdvisoryCTA

### Headline
> Bạn không cần quyết định hôm nay

### Sub-copy
> Bạn có thể bắt đầu bằng cách khám phá sa bàn, để lại số để nhận checklist pháp lý, hoặc đặt một cuộc trao đổi 30 phút với chuyên viên — không sale, không pressure.

### 3 mini-CTA
- Khám phá sa bàn → `/sa-ban`
- Nhận checklist pháp lý → form quick capture (`surface = homepage_final_cta`)
- Đặt lịch tư vấn 30 phút → `/tu-van`

### Closing trust line
> Hồng Hạc City Bắc Ninh · Nền tảng tư vấn độc lập · `bacninhhonghaccity.vn`
> Mọi thông tin tham khảo cần được xác nhận với chủ đầu tư tại honghacphumyhung.vn.

---

## §12. Footer copy

### Disclosure block (bắt buộc — 00 §11.1)
> Website này là nền tảng thông tin tư vấn bất động sản độc lập. Mọi thông tin cần được đối chiếu với nguồn chính thức từ chủ đầu tư. Thông tin giá, tiến độ, pháp lý có thể thay đổi theo từng giai đoạn.

### NAP block (theo 09 §6)
- **Pháp nhân chủ đầu tư:** Công ty Cổ phần Đầu tư Công đoàn Ngân hàng Công Thương (MST 2300998544)
- **Đồng chủ sở hữu cổ phần:** Phú Mỹ Hưng 51% · Nomura Real Estate Asia 49% (từ 10/2025)
- **Địa chỉ dự án:** Phường Song Liễu, Tỉnh Bắc Ninh (hợp nhất 01/07/2025 từ Xuân Lâm, Hà Mãn, Ngũ Thái, Song Liễu — Thuận Thành cũ)
- **Văn phòng Phú Mỹ Hưng (đối tác phát triển):** 677 Lạc Long Quân, Tây Hồ, Hà Nội
- **Hotline:** 0945375688 (Ngô Kim Quyên — tư vấn độc lập)
- **Hotline CĐT:** (028) 3874 8888 · (024) 3936 2640 · (0222) 3616 888
- **Email:** `ENV_REQUIRED`: contact email
- **Zalo OA:** [env: NEXT_PUBLIC_ZALO_OA_URL]

### Footer nav (theo website-structure §5)
Sa bàn · Pháp lý · Bảng giá tham khảo · Tính vay · Tiến độ · Tư vấn · Chính sách bảo mật · Yêu cầu dữ liệu cá nhân

---

## §13. Review checklist trước khi sign-off

- [ ] Không có forbidden words (00 §8): đã grep
- [ ] Mọi CTA khớp 00 §8 whitelist
- [ ] `/sa-ban` xuất hiện trong viewport 1 (Hero section)
- [ ] Trust disclaimer xuất hiện ở Hero + Footer (2 nơi)
- [ ] Không tự nhận "website chính thức"
- [ ] H1 không phải tên sản phẩm
- [ ] FAQ 10 câu là objection thật, không filler
- [ ] LeadMagnet là decision asset, không brochure
- [ ] `SOURCE_REQUIRED Tier 1` tagged và sẽ fill khi có data thật ([G4 seed data](../../data/seeds/inventory-lots.demo.json))
- [ ] Reviewer ký: ____________ Ngày: ____________
