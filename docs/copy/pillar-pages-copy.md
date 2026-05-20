# G1 — Pillar Pages Copy v1 (7 pillar)

**Status:** Draft v1
**Authority:** [website-structure §4](../spec/website-structure.md) · [00 §7, §8, §11](../spec/00-master-instruction.md)
**Reviewer:** chủ dự án + copywriter

---

## §1. `/kham-pha-do-thi` — Urban Vision Pillar

### H1
> Một đô thị **197,76 ha** cho **27.700 cư dân** — đọc trước khi đi xem

### Sub
> Không phải brochure. Đây là cách chúng tôi đọc bài toán quy hoạch Hồng Hạc City — dự án thuộc Công ty Cổ phần Đầu tư Công đoàn Ngân hàng Công Thương (đồng sở hữu bởi **Phú Mỹ Hưng 51% × Nomura Real Estate Asia 49%**) tại Phường Song Liễu, Bắc Ninh (hợp nhất 01/07/2025 từ Xuân Lâm, Hà Mãn, Ngũ Thái, Song Liễu — Thuận Thành cũ) — để bạn quyết định có đáng theo dõi tiếp không.

### 6 section (theo website-structure §4.3)
1. **Quy mô 197,76 ha / dân số ~27.700 / mật độ XD 27,9% / cây xanh 19,6%** — số Tier 1
2. **Nguyên tắc phát triển 7S** — Sustainability · Smart Planning · Service · Safety · Standards · Scarcity · Society
3. **Pháp nhân CĐT + đồng chủ sở hữu PMH × Nomura** — Công ty CP Đầu tư Công đoàn Ngân hàng Công Thương (MST 2300998544, thành lập 2009) — PMH tiếp quản 99,68% cổ phần từ 2016, Nomura RE Asia (Nhật Bản) tham gia 49% từ 10/2025. Cross-verified 2 source Tier 1.
4. **Định vị Đông Bắc Hà Nội** — Vành đai 4 (2km) · Hà Nội (23km) · Nội Bài (40km) · sân bay Gia Bình tương lai (16km)
5. **Hành trình phát triển 3 phân khu** — Hồng Phát "Khởi nguồn thịnh vượng" · Hồng Thịnh "Tiếp mạch phồn vinh" · Hồng Phúc "Vững bền hạnh phúc"
6. **Tiện ích đô thị tích hợp** — 8 trường · 3 trung tâm y tế · 2 trung tâm đa chức năng 25 tầng · 1 TTTM · 2 trung tâm thể thao · 3 bãi đỗ xe nhiều tầng · công viên · clubhouse

### Internal links (mandatory)
→ `/sa-ban` (CTA chính) · `/phan-khu/hong-phat` · `/tien-do` · `/phap-ly`

### Disclaimer
00 §11.1 — Footer block

---

## §2. `/sa-ban` — Decision Map (Core Product)

### Sprint 1A shell
**H1:** Bản đồ quyết định Hồng Hạc City
**Sub:** Bản đồ tương tác đang được hoàn thiện. Trong khi chờ, bạn có thể khám phá Hồng Phát hoặc đặt lịch tư vấn riêng.
**Fallback CTA:**
- Xem Hồng Phát (phase đang mở) → `/phan-khu/hong-phat`
- Nhận checklist chọn lô → form (`surface = sa_ban`)
- Đặt câu hỏi cho chuyên viên → `/tu-van`

### Sprint 1B full (sau khi map ready)
**H1:** Bản đồ Hồng Hạc City — 197,76 ha · 3 phân khu · 1.074 căn (Hồng Phát)
**Sub:** Click vào bất kỳ lô nào để xem thông tin Tier 1. Lọc theo phân khu, phase, loại sản phẩm, diện tích.
**Lot legend:** Đang mở bán · Đang giữ chỗ · Đã đặt cọc · Đã bán · Cần xác nhận
**Filters:** Phân khu · Phase · Loại sản phẩm · Diện tích · (P2) Persona / Ngân sách

### Lot popup copy (theo 04 §5.3)
- Title: `[lot_code] · [product_type_label] · [area_range]`
- Body: `[phan_khu_name]` · trạng thái
- 2 CTA: "Nhận thông tin lô này" (lead form `sa_ban_lot`) · "Xem chi tiết" → `/sa-ban/[lot-id]`

---

## §3. `/phan-khu/hong-phat` — Current Release

### H1
> Hồng Phát — "Khởi nguồn thịnh vượng" · 1.074 căn · 3 tiểu khu

### Sub (≤30 từ)
> Phân khu đầu tiên mở bán tại Hồng Hạc City. Tiểu khu F1 đang available. Xem bản đồ từng lô, đối chiếu pháp lý/tiến độ — trước khi đặt câu hỏi cho chuyên viên.

### 7 section (theo website-structure §4.4)
1. **Tổng quan Hồng Phát** — 1.074 căn · 3 tiểu khu (F1/F2/F3) · mật độ XD 51,9% · sở hữu lâu dài (Tier 1)
2. **Bối cảnh phase hiện tại** — F1 đang mở bán, không "căn cuối", chỉ thông tin phase
3. **4 loại sản phẩm:**
   - Biệt thự đơn lập: **17 căn · 325,06–418,38 m²**
   - Biệt thự song lập: **42 căn · 256,12–284,53 m²**
   - Shophouse: **170 căn · 382,22–775,36 m²**
   - Townhouse (nhà phố liền kề): **94 căn · 295,87–336,01 m²**
4. **Vị trí & hạ tầng** — Vành đai 4 (2km) · Hà Nội (23km) · Bắc Ninh (20km) — cửa ngõ Đông Bắc HN
5. **Tiện ích Hồng Phát** — Trường mầm non/liên cấp/THPT · Trung tâm y tế · Trung tâm thể thao · Trung tâm đa chức năng & thương mại · Clubhouse · Công viên · Bãi đỗ xe
6. **Tiến độ thực tế** — Hạ tầng kỹ thuật F1 đang triển khai, cập nhật 04/2026 (Tier 1)
7. **CTA chính:** Xem trên sa bàn → `/sa-ban?phan_khu=hong_phat`
8. **Theo dõi phase tiếp theo** — Hồng Thịnh "Tiếp mạch phồn vinh" / Hồng Phúc "Vững bền hạnh phúc" chưa công bố Tier 1

### Sub-cluster pages (P1)
- `/phan-khu/hong-phat/gan-cong-vien`
- `/phan-khu/hong-phat/phu-hop-gia-dinh`
- `/phan-khu/hong-phat/view-xanh`
- `/phan-khu/hong-phat/khu-yen-tinh`

Mỗi sub-cluster ≥300 từ + ≥1 link tới `/sa-ban` + ≥1 link tới `/vay-mua`.

---

## §4. `/tiem-nang` — Market Intelligence

### H1
> Tiềm năng Hồng Hạc City — đọc số liệu, không cam kết sinh lời

### Sub
> Phân tích hạ tầng, FDI, kết nối Đông Hà Nội — dẫn nguồn Tier 1/3. Chúng tôi không hứa ROI cụ thể.

### Forbidden first
- KHÔNG: "Cam kết tăng giá X%/năm"
- KHÔNG: "Đầu tư chắc lời"
- KHÔNG: ROI số tuyệt đối không có scenario disclaimer

### Cluster pages
- `/tiem-nang/vanh-dai-4` — Vành đai 4 Thuận Thành (chỉ **2 km** từ Hồng Hạc — Tier 3 VnExpress/Tuổi Trẻ)
- `/tiem-nang/dong-ha-noi` — Eastern Hanoi growth · **23 km** đến trung tâm Hà Nội
- `/tiem-nang/bac-ninh-fdi` — FDI Samsung & vendor ecosystem (Tier 3 báo chí)
- `/tiem-nang/gia-lam-ket-noi` — Gia Lâm connectivity (Hồng Hạc tiếp giáp Gia Lâm)
- `/tiem-nang/mua-o-that-hay-dau-tu` — Decision page
- `/tiem-nang/nen-mua-giai-doan-dau-hay-sau` — Timing decision
- `/tiem-nang/2-ty-nen-mua-phan-khu-nao` — Budget decision
- `/tiem-nang/gia-dinh-2-con-chon-phan-khu` — Family fit

Mỗi page kết thúc bằng **1 decision action**, không phải lead form generic.

---

## §5. `/tien-do` — Progress Watch

### H1
> Tiến độ Hồng Hạc City — cập nhật từng tháng

### Sub
> Theo dõi mốc thi công, hạ tầng khu vực, và thay đổi giai đoạn. Mọi mốc đều có nguồn dẫn được.

### 6 section
1. Timeline tiến độ tổng (3-5 mốc gần nhất)
2. Tiến độ Hồng Phát chi tiết
3. Hạ tầng khu vực (Vành đai 4, đường nội khu)
4. Mốc thi công đã hoàn thành (before/after media nếu approved)
5. Phase tiếp theo cần theo dõi
6. Ghi chú nguồn — link đến `/phap-ly`

### Forbidden
- "Bàn giao tháng X năm Y" nếu chưa Tier 1
- "100% hoàn thành" nếu chưa verify

---

## §6. `/phong-cach-song` — Lifestyle Pillar

### H1
> Sống ở Hồng Hạc City có nghĩa là gì?

### Sub
> Không phải showroom. Đây là cách chúng tôi mô tả thói quen, tiện nghi và cộng đồng của một đô thị 197 ha.

### 6 section (theo website-structure §4.7)
1. Gia đình — trường, sinh hoạt, di chuyển
2. Sống xanh — không gian, mật độ
3. Giáo dục & cộng đồng
4. Cuối tuần — không gian giải trí, dịch vụ
5. Tương lai — phát triển 5/10/20 năm
6. Decision prompts → `/sa-ban` + `/tu-van`

### Asset rule
- Ảnh lived-in, KHÔNG glossy CGI nếu không có real asset
- Approved hoặc AbstractPlaceholder (07 §12)

---

## §7. `/bang-gia` — Price Context (KHÔNG bảng hàng)

### H1
> Bảng giá tham khảo — vì sao giá thay đổi theo phase

### Sub
> Chúng tôi không công bố bảng hàng. Bài này giúp bạn hiểu cơ chế giá để chuẩn bị tài chính phù hợp.

### 6 section (theo website-structure §4.8)
1. **Chính sách thông tin giá** — chúng tôi không hiển thị giá cứng từng lô
2. **Vì sao giá thay đổi theo phase** — tỷ lệ open, hạ tầng, chính sách
3. **Cái gì hiển thị được công khai, cái gì không** — minh bạch về Tier
4. **Bối cảnh tài chính** — gói vay phổ biến, kỳ hạn
5. **CTA:** Tính phương án sở hữu → `/vay-mua`
6. **CTA:** Trao đổi cùng chuyên viên → `/tu-van`

### FAQ riêng (4 câu)
1. "Sao không có bảng giá chi tiết từng lô?" → Vì giá thay đổi theo phase, hiển thị giá cũ gây hiểu sai. CĐT công bố giá tại thời điểm phù hợp.
2. "Có giá ưu đãi không?" → Chính sách giá là quyền CĐT — chúng tôi truyền đạt khi có Tier 1/2 thông tin.
3. "Tôi muốn biết giá phase trước để so sánh." → Liên hệ chuyên viên — đây là Tier 2 (nội bộ), không public.
4. "Có thể đặt cọc qua trang này không?" → Không. Mọi giao dịch đặt cọc phải qua CĐT chính thức.

### Disclaimer
00 §11.1 — top + footer

---

## §8. `/phap-ly` — Legal Evidence Hub

### H1
> Pháp lý Hồng Hạc City — 15 năm hồ sơ kiểm chứng được

### Sub
> 8 văn bản pháp lý Tier 1 từ UBND tỉnh Bắc Ninh, Sở Xây dựng, Bộ Xây dựng — công bố chính thức tại phumyhung.vn/congboduanhonghaccity. Bạn xác minh độc lập được.

### Sections (theo thứ tự render)

1. **Pháp nhân chủ đầu tư** (trust narrative — xem §8.1)
2. **Timeline pháp lý 15 năm** (visual timeline — xem §8.2)
3. **8 văn bản pháp lý Tier 1** (bảng PDF download — xem §8.3)
4. **Status pháp lý hiện tại** (xem §8.4)
5. **FAQ pháp lý 8 câu** (xem §8.5)
6. **Nguồn Tier 1 / Tier 3** (registry)
7. **Disclosure** — [00 §11.1](../spec/00-master-instruction.md)

---

### §8.1. Pháp nhân chủ đầu tư (trust narrative — bắt buộc)

> **Pháp nhân chủ đầu tư:** Công ty Cổ phần Đầu tư Công đoàn Ngân hàng Công Thương (MST 2300998544) — pháp nhân thành lập năm 2009 tại Phố Chùa Thầm, Phường Xuân Lâm (cũ — nay là Phường Song Liễu), Thị xã Thuận Thành (cũ), Bắc Ninh.
>
> Pháp nhân được Công ty TNHH Phát triển Phú Mỹ Hưng tiếp quản 99,68% cổ phần từ năm 2016. Tháng 10/2025, Nomura Real Estate Asia (Nhật Bản) chính thức trở thành đồng chủ sở hữu với 49% cổ phần, Phú Mỹ Hưng giữ 51%.
>
> Mọi hợp đồng mua bán với khách hàng được ký với pháp nhân này, không phải với Phú Mỹ Hưng hay Nomura trực tiếp.

**Wording note:** PMH × Nomura là **đồng chủ sở hữu cổ phần pháp nhân CĐT**, KHÔNG phải "JV đồng phát triển" hay "đồng chủ đầu tư". Cách diễn đạt này quan trọng pháp lý.

---

### §8.2. Timeline pháp lý 15 năm (visual — render bằng vertical timeline component)

| Năm | Mốc | Văn bản |
|---|---|---|
| 2009 | Pháp nhân CĐT thành lập | CTCP ĐT Công đoàn NHCT |
| 15/12/2010 | GCNĐT lần đầu | Số 21.1.2.1.000261 |
| 24/11/2011 | Giao đất | QĐ 1503/QĐ-UBND |
| 23/6/2016 | **Phú Mỹ Hưng tiếp nhận 99,68% cổ phần** | — |
| 2017 | Chấp thuận địa điểm + QHCT | QĐ 457/QĐ-UBND |
| 23/8/2017 | Phê duyệt mục đích SDĐ đợt 1 | QĐ 428/QĐ-UBND |
| 24/4/2019 | Phê duyệt MĐSDĐ (bổ sung) | QĐ 181/QĐ-UBND |
| 15/5/2019 | Hợp đồng thuê đất gốc | HĐ 34/HĐ-TĐ |
| 2019 | Điều chỉnh quy hoạch | QĐ 509/QĐ-UBND |
| 7/2024 | Tăng vốn điều lệ lên 4.620 tỷ đ | — |
| 9/2024 | Chủ trương đầu tư 27.000 tỷ đ | UBND Bắc Ninh |
| 13/9/2024 | **Giấy phép XD HTKT giai đoạn 1** | **GPXD 158/2024** |
| 8/4/2025 | Điều chỉnh QĐ giao đất | HĐ 32/HĐ-TĐ |
| 8/2025 | Thẩm định BCNCKT | CV 08/2025-SXD |
| 14/6/2025 | **Mở bán 323 căn F1 đợt 1** | TT 05/2024/TT-BXD |
| 3/10/2025 | **Công bố hợp tác PMH × Nomura** | PMH official |

---

### §8.3. 8 văn bản pháp lý Tier 1 (bảng PDF download)

Mọi PDF dưới đây công bố chính thức tại `phumyhung.vn/congboduanhonghaccity/` — link trực tiếp đến CĐT, không host lại.

| # | Văn bản | Cơ quan | Tier 1 source |
|---|---|---|---|
| 1 | QĐ 457/QĐ-UBND — Chấp thuận địa điểm | UBND tỉnh Bắc Ninh | `tier1-doc-457-2017` |
| 2 | QĐ 428/QĐ-UBND (23/8/2017) — Mục đích SDĐ đợt 1 | UBND tỉnh Bắc Ninh | `tier1-doc-428-2017` |
| 3 | QĐ 509/QĐ-UBND — Điều chỉnh quy hoạch | UBND tỉnh Bắc Ninh | `tier1-doc-509-2019` |
| 4 | HĐ 34/HĐ-TĐ (15/5/2019) — Hợp đồng thuê đất | Sở TNMT Bắc Ninh | `tier1-doc-34-hdtd-2019` |
| 5 | HĐ 32/HĐ-TĐ (8/4/2025) — Điều chỉnh giao đất | UBND tỉnh Bắc Ninh | `tier1-doc-32-hdtd-2025` |
| 6 | **GPXD 158/2024 (13/9/2024)** — XD HTKT giai đoạn 1 | Sở XD Bắc Ninh | `tier1-doc-gpxd-158-2024` |
| 7 | CV 08/2025-SXD — Thẩm định BCNCKT dự án TP 2 | Sở XD Bắc Ninh | `tier1-doc-tham-dinh-08-2025` |
| 8 | **Thông báo mở bán 323 căn F1** (14/6/2025) | Sở XD Bắc Ninh | `tier1-doc-mo-ban-323-2025` |

Cộng thêm: Thông tư 05/2024/TT-BXD (Bộ Xây dựng — căn cứ pháp lý mở bán), Nghị quyết 1658/NQ-UBTVQH15 (sáp nhập hành chính 01/07/2025).

---

### §8.4. Status pháp lý hiện tại

| Khía cạnh | Status | Public? |
|---|---|---|
| Quy hoạch 1/500 | ✅ Đã có (QĐ 457 + 509 điều chỉnh) | Public PDF |
| Giao đất + cho thuê đất | ✅ Đã có (HĐ 34/2019 + điều chỉnh 32/2025) | Public PDF |
| Mục đích sử dụng đất | ✅ Đã có (QĐ 428/2017 + 181/2019) | Public số văn bản |
| Giấy phép xây dựng HTKT giai đoạn 1 | ✅ Đã có (GPXD 158/2024) | Public PDF |
| Thẩm định BCNCKT | ✅ Đã có (CV 08/2025-SXD) | Public PDF |
| Cho phép mở bán | ✅ Đã có — **323 căn F1 từ 14/6/2025** | Public PDF |
| Sở hữu lâu dài, sổ hồng riêng từng căn | ✅ Tier 1 | Public |
| Thế chấp dự án bởi CĐT | ❌ Không có (đã tách sổ riêng từng lô) | Public |
| Hình thức ký HĐMB | Mẫu HĐMB chính thức, sales gửi khách trước ký | Public mô tả, không paste PDF mẫu |
| Ngân hàng liên kết vay | VCB, VietinBank, ACB, BIDV, Standard Chartered | Public tên NH |
| % lãi suất / chiết khấu / voucher | Chính sách thay đổi theo giai đoạn | KHÔNG public con số, sales tư vấn 1-1 |
| Ngày bàn giao F1 | Dự kiến 06/2027 | Public dạng "Dự kiến 06/2027" |

---

### §8.5. FAQ pháp lý (8 câu)

1. **Pháp nhân nào ký hợp đồng mua bán với tôi?**
   → **Công ty Cổ phần Đầu tư Công đoàn Ngân hàng Công Thương** (MST 2300998544) — pháp nhân chủ đầu tư có giấy phép xây dựng số 158/GPXD ngày 13/9/2024 và hợp đồng thuê đất với UBND tỉnh Bắc Ninh. Phú Mỹ Hưng (51%) và Nomura Real Estate Asia (49%) là đồng chủ sở hữu cổ phần của pháp nhân này.

2. **Dự án có quyết định quy hoạch 1/500 chưa?**
   → **Có.** Quy hoạch chi tiết đã được chấp thuận tại QĐ 457/QĐ-UBND (2017) và được điều chỉnh tại QĐ 509/QĐ-UBND (2019) — cả hai văn bản đều có PDF công khai tại `phumyhung.vn/congboduanhonghaccity/`. Số QĐ 1/500 cuối cùng sau điều chỉnh tổng thể 2024 chưa công bố URL trực tuyến — sales verify được khi khách yêu cầu.

3. **Hình thức sở hữu là gì?**
   → **Sở hữu lâu dài, sổ hồng riêng từng căn** đối với phân khu Hồng Phát (Tier 1 từ honghacphumyhung.vn/hongphat). Khách hàng hoàn tất thanh toán theo tiến độ và đóng 5% cuối là làm thủ tục sang tên.

4. **Dự án có bị thế chấp ngân hàng không?**
   → **Không có thế chấp dự án bởi CĐT.** Đất đã tách sổ hồng riêng từng lô. Khách hàng có thể tự thế chấp căn của mình sau khi nhận sổ — đây là quyền sử dụng tài sản riêng.

5. **Hợp đồng mua bán có theo mẫu chuẩn không?**
   → **Có.** Mẫu HĐMB chính thức đang sử dụng cho tiểu khu F1. Sales sẽ gửi khách bản tham khảo trước khi ký để khách có thời gian xem xét. Mẫu HĐMB không paste public dạng PDF — đây là document có chữ ký pháp nhân.

6. **Có ngân hàng nào hỗ trợ vay mua không?**
   → **Có 5 ngân hàng đối tác công bố:** Vietcombank (Nam Sài Gòn), VietinBank, ACB, BIDV, và Standard Chartered (ngân hàng quốc tế chỉ định 12/2025). Mỗi ngân hàng có gói vay khác nhau, lãi suất và tỷ lệ vay tối đa thay đổi theo từng đợt mở bán — sales tư vấn 1-1 để khớp đúng gói tại thời điểm khách quan tâm.

7. **Đã có giấy phép xây dựng và được phép mở bán chưa?**
   → **Cả hai đều đã có:**
   - **Giấy phép xây dựng:** GPXD 158/2024 cấp ngày 13/9/2024 bởi Sở Xây dựng Bắc Ninh — cấp phép xây dựng hạ tầng kỹ thuật giai đoạn 1 trên diện tích 1.985.132,8 m² (≈ 198,51 ha).
   - **Cho phép mở bán:** Thông báo cho phép mở bán **323 căn tiểu khu F1** đợt 1 từ 14/6/2025, căn cứ Thông tư 05/2024/TT-BXD. Đây là 323 căn duy nhất hiện được phép ký HĐMB hợp pháp. Phần còn lại của Hồng Phát (F2, F3) và phân khu Hồng Thịnh, Hồng Phúc chưa có thông báo mở bán.

8. **Khi nào bàn giao nhà?**
   → **Dự kiến 06/2027** cho tiểu khu F1. Mốc chính xác được CĐT công bố khi gần thời điểm bàn giao. Tiến độ hạ tầng F1 đang triển khai — cập nhật mới nhất tại `/tien-do`.

> **Disclosure:** Mọi văn bản pháp lý trên có thể xác minh độc lập tại Cổng TTĐT tỉnh Bắc Ninh, Sở Xây dựng Bắc Ninh, hoặc PDF công bố tại `phumyhung.vn/congboduanhonghaccity/`. Số quyết định và ngày tháng trong file này khớp với GPXD 158/2024 (Tier 1).
>
> **KHÔNG public ở trang này:** % chiết khấu, % lãi suất chi tiết, voucher theo giai đoạn, mốc CSBH nội bộ. Xem [Tier 2 sales-policy-internal](../../data/seeds/sales-policy-internal.demo.json).

---

## §9. `/tu-van` + `/lien-he`

### `/tu-van` — Advisory Conversion

**H1:** Đặt một cuộc trao đổi 30 phút — không sale, không pressure
**Sub:** Chuyên viên: **Ngô Kim Quyên** — Sales Manager · 21 năm BĐS · chuyên Bắc Ninh & Đông Hà Nội · Chứng chỉ hành nghề Số 151719. Cuộc trao đổi đầu tiên là tư vấn, không phải pitch.

**Form fields (full):** Phone *, Email, Tên, Persona, Ngân sách, Câu hỏi cụ thể (textarea), consent.

**Lịch trao đổi:** chỉ trong giờ HC (08:00–21:00 ICT).

**Disclaimer:** 00 §11.1 — Quyên không phải đại diện chính thức của CĐT.

### `/lien-he` — Utility

**3 Hotline chính thức (Tier 1 — honghacphumyhung.vn):**
- TP.HCM: `(028) 3874 8888`
- Hà Nội: `(024) 3936 2640`
- Bắc Ninh: `(0222) 3616 888`

**Email:** info@honghacphumyhung.vn (CĐT) · kimquyen@pmh.com.vn (Quyên)

**Form ngắn:** Phone + message + consent

**Zalo OA:** [env: NEXT_PUBLIC_ZALO_OA_URL]

**Địa chỉ văn phòng:** Công ty TNHH Phát triển Phú Mỹ Hưng — 677 Lạc Long Quân, Tây Hồ, Hà Nội (NAP)

**Giờ làm việc:** 08:00–21:00 ICT (HC)

---

## §10. Review checklist 7 pillar

- [ ] Mỗi pillar có link tới `/sa-ban`
- [ ] Mỗi decision/comparison page có link tới ≥1 tool (`/sa-ban`/`/vay-mua`/`/tu-van`)
- [ ] Mỗi trust-sensitive page có link tới `/phap-ly`
- [ ] Mỗi price/financial page có disclaimer + link `/vay-mua`
- [ ] Không có orphan public route
- [ ] Hồng Thịnh/Hồng Phúc DEFERRED, không CTA primary, không noindex thừa
- [ ] H1 không phải tên sản phẩm
- [ ] Forbidden words grep clean
- [ ] Reviewer ký: ____________
