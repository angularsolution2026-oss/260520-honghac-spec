# Content Brief — `/sa-ban`

| Field | Value |
|---|---|
| URL | `/sa-ban` |
| Sprint | 1A shell / 1B full |
| Target kw | sa bàn hồng hạc city |
| Secondary kw | bản đồ hồng hạc city, mặt bằng hồng hạc, sa bàn dự án bắc ninh |
| Intent | Decision/explore |
| Word count target | 600–900 shell; 900–1400 full |
| Schema | `WebPage` + `BreadcrumbList` |
| Tier required | Tier 1 cho mọi fact dự án/sản phẩm |
| Forbidden | bảng hàng public, giá từng lô, giữ chỗ, AI gimmick, claim inventory live nếu chưa có data |

## Outline H2/H3

1. **H2: Sa bàn Hồng Hạc City dùng để làm gì**
2. **H2: Nhìn toàn đô thị trước khi chọn vị trí**
   - H3: 197,76 ha và 3 phân khu
   - H3: Hồng Phát là phân khu đang cần theo dõi đầu tiên
3. **H2: Các lớp thông tin trên bản đồ**
   - H3: Phân khu, phase, loại sản phẩm, tiện ích, hạ tầng
   - H3: Trạng thái hiển thị công khai và trạng thái cần xác minh
4. **H2: Khi bản đồ chưa có đủ dữ liệu**
   - H3: Shell/fallback Sprint 1A
   - H3: Cách nhận tư vấn mà không bịa inventory
5. **H2: Bước tiếp theo**

## Internal links bắt buộc

→ `/phan-khu/hong-phat` · `/phap-ly` · `/tien-do` · `/vay-mua` · `/tu-van`

## Source / fact ledger

| Claim | Tier | Source |
|---|---|---|
| Quy mô 197,76 ha, 3 phân khu | Tier 1 | `OFFICIAL-HHC` |
| Hồng Phát là phân khu đầu tiên mở bán | Tier 1 | `OFFICIAL-HONGPHAT` |
| Product/lot detail | Tier 1 | `OFFICIAL-HONGPHAT` + Payload inventory khi có |

## Acceptance

- [ ] `/sa-ban` là decision tool, không phải bảng hàng.
- [ ] Có fallback rõ nếu map/inventory chưa sẵn sàng.
- [ ] Không có `maplibre-gl` ngoài route `/sa-ban`.
- [ ] Không hiển thị giá/lợi nhuận/cam kết.
- [ ] Reviewer: ____________
