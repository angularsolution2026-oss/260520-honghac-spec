# Content Brief — `/bang-gia`

**Template — copy file này cho 30+ URL khác.**

| Field | Value |
|---|---|
| URL | `/bang-gia` |
| Sprint | P0 / 1A |
| Target kw | giá hồng hạc city |
| Secondary kw | bảng giá hồng hạc, giá hồng phát |
| Intent | Price intent (commercial investigation) |
| Word count target | 800–1200 (pillar) |
| Schema | `FAQPage` ([14 §2.4](../../spec/14-schema-markup.md)) |
| Tier required | 1 cho mọi price-related claim |
| Forbidden | "Giá rẻ", "Giá gốc CĐT", "Ưu đãi sốc", "Đặt cọc qua trang", "Giữ chỗ" |

## Outline H2/H3

1. **H2: Vì sao chúng tôi không công bố bảng giá chi tiết**
2. **H2: Cơ chế giá theo phase trong dự án 20 năm**
   - H3: Phase đầu — phase giữa — phase cuối
   - H3: Yếu tố ảnh hưởng giá (hạ tầng, mật độ open, chính sách)
3. **H2: Cái gì hiển thị công khai, cái gì không**
   - H3: Tier 1 (CĐT công bố) vs Tier 2 (nội bộ) vs Tier 3 (báo chí)
4. **H2: Bối cảnh tài chính phổ biến**
   - H3: Gói vay phổ biến · Kỳ hạn · Lãi suất hiện tại (link `/vay-mua`)
5. **H2: FAQ giá (4 câu — schema FAQPage)**
6. **H2: Bước tiếp theo**
   - CTA: `/vay-mua` · `/tu-van`

## Internal links bắt buộc

→ `/vay-mua` (tool) · `/phap-ly` (trust) · `/sa-ban` (core product) · `/tu-van` (advisory)

## Source / fact ledger

| Claim | Tier | Source |
|---|---|---|
| Project context / phase-based public context | Tier 1 | `OFFICIAL-HHC`, `OFFICIAL-HONGPHAT` |
| Giá thay đổi theo phase | Tier 1/2 | CĐT/chính sách được duyệt; không render Tier 2 như official fact |
| Lãi suất tham khảo 7-12% | Tier 3 | NHNN báo chí + bank_rates |

## Acceptance

- [ ] ≥800 từ, không filler
- [ ] FAQPage schema render conditions pass ([14 §2.4](../../spec/14-schema-markup.md))
- [ ] Disclaimer 00 §11.1 ở top + footer
- [ ] CTA "Tính phương án sở hữu" → `/vay-mua` xuất hiện ≥1 lần
- [ ] Không forbidden words (grep)
- [ ] Reviewer: ____________
