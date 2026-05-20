# Content Brief — `/vay-mua`

| Field | Value |
|---|---|
| URL | `/vay-mua` |
| Sprint | 1B |
| Target kw | tính vay mua hồng hạc |
| Secondary kw | tính khoản vay mua nhà bắc ninh, vay mua hồng phát |
| Intent | Financial tool / affordability |
| Word count target | 600–1000 + calculator UI |
| Schema | `WebPage` + `BreadcrumbList` |
| Tier required | Bank-rate data from `bank_rates`; Tier 1 project facts only |
| Forbidden | cam kết vay được, lãi suất cố định không nguồn, tư vấn tài chính thay ngân hàng |

## Outline H2/H3

1. **H2: Tính phương án sở hữu trước khi hỏi giá**
2. **H2: Những dữ liệu cần nhập**
   - H3: Giá trị dự kiến
   - H3: Tỷ lệ vốn tự có
   - H3: Thời hạn vay
   - H3: Dải lãi suất
3. **H2: Cách đọc kết quả**
4. **H2: Vì sao kết quả chỉ là tham khảo**
5. **H2: Bước tiếp theo sau khi tính vay**

## Internal links bắt buộc

→ `/bang-gia` · `/sa-ban` · `/phap-ly` · `/tu-van`

## Source / fact ledger

| Claim | Tier | Source |
|---|---|---|
| Project context | Tier 1 | `OFFICIAL-HHC` |
| Hồng Phát product context | Tier 1 | `OFFICIAL-HONGPHAT` |
| Bank-rate bands | Operational | `bank_rates` collection or fallback disclaimer per `17 §8` |

## Acceptance

- [ ] Disclaimer calculator `00 §11.2` visible.
- [ ] No hardcoded live bank rate without source.
- [ ] Lead capture after tool use uses `surface = vay_mua`.
- [ ] Reviewer: ____________
