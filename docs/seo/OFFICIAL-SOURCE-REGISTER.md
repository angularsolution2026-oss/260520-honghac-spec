# Official Source Register — Hồng Hạc City

**Status:** Approved source list v1  
**Purpose:** Dùng làm nguồn Tier 1/official cho content brief, copy, schema, Fact Ledger. Không dùng để copy nguyên văn.

---

## Source IDs

| ID | Source | URL | Use for | Tier |
|---|---|---|---|---|
| `OFFICIAL-HHC` | Website chính thức Hồng Hạc City | https://honghacphumyhung.vn/ | Tổng quan dự án, quy mô, vị trí, phân khu, tiện ích, chủ đầu tư | Tier 1 |
| `OFFICIAL-HONGPHAT` | Trang chính thức phân khu Hồng Phát | https://honghacphumyhung.vn/hongphat/ | Hồng Phát, sản phẩm, quy mô phân khu, tiện ích, mặt bằng, tiến độ | Tier 1 |
| `OFFICIAL-PMH` | Website Phú Mỹ Hưng | https://phumyhung.vn/ | Bối cảnh thương hiệu Phú Mỹ Hưng, dự án nổi bật, thông tin doanh nghiệp | Tier 1 |

---

## Approved Facts Snapshot

Chỉ dùng các fact dưới đây khi có link nguồn hiển thị hoặc Fact Ledger trong CMS.

| Fact | Source ID | Notes |
|---|---|---|
| Hồng Hạc City có quy mô 197,76 ha | `OFFICIAL-HHC` | Dùng cho homepage, đô thị, sa bàn |
| Dự án có 3 phân khu thấp tầng: Hồng Phát, Hồng Thịnh, Hồng Phúc | `OFFICIAL-HHC` | Không tự thêm phân khu khác |
| Loại hình sản phẩm gồm nhà phố liền kề, biệt thự song lập, biệt thự đơn lập | `OFFICIAL-HHC` | Hồng Phát có thêm shophouse/townhouse theo trang phân khu |
| Hồng Hạc City thuộc phường Song Liễu, tỉnh Bắc Ninh | `OFFICIAL-HHC` | Kiểm tra lại nếu địa giới hành chính thay đổi |
| Hồng Phát là phân khu đầu tiên mở bán | `OFFICIAL-HONGPHAT` | Dùng cho current release |
| Hồng Phát có 3 tiểu khu, 1.074 sản phẩm, mật độ xây dựng 51,9% | `OFFICIAL-HONGPHAT` | Không dùng làm inventory live |
| Hình thức sở hữu Hồng Phát: sở hữu lâu dài | `OFFICIAL-HONGPHAT` | Cần đối chiếu pháp lý khi viết trang legal |
| Hồng Phát có biệt thự đơn lập, biệt thự song lập, nhà phố liền kề | `OFFICIAL-HONGPHAT` | Product detail page phải kiểm chứng lại theo lot |
| Phú Mỹ Hưng là thương hiệu phát triển đô thị có lịch sử hơn 30 năm | `OFFICIAL-PMH` | Chỉ dùng như bối cảnh thương hiệu, không suy diễn bảo chứng lợi nhuận |

---

## Usage Rules

- Không tự nhận `bacninhhonghaccity.vn` là website chính thức.
- Không copy headline/paragraph từ nguồn official; chỉ paraphrase có dẫn nguồn.
- Không dùng nguồn official để tạo claim giá, lợi nhuận, khan hiếm, hoặc cam kết sinh lời.
- Nếu fact không nằm trong bảng này hoặc CMS Fact Ledger, đánh dấu `SOURCE_REQUIRED`.
- Nếu có mâu thuẫn giữa nguồn official và brief, nguồn official thắng.
