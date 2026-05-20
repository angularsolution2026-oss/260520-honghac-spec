# G3 — Pillar Page Wireframe Template

**Status:** Draft v1 — dùng chung cho 7 pillar
**Authority:** [website-structure §4](../../spec/website-structure.md)

> Mọi pillar page dùng template này để giữ IA/silo nhất quán. Chỉ phần content giữa thay đổi theo từng pillar.

---

## Desktop wireframe

```
╔══════════════════════════════════════════════════════════════════╗
║   [Header same as homepage]                                       ║
╠══════════════════════════════════════════════════════════════════╣
║   ► Trang chủ ► [Pillar name]                  (Breadcrumb)       ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║   H1 (1 dòng, không tên sản phẩm)                                ║
║   Sub (≤30 từ, không số cứng nếu chưa Tier 1)                    ║
║                                                                   ║
║   ⓘ Disclaimer (nếu là trust/price page)                         ║
║                                                                   ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║   Section 1: [Pillar-specific]                                   ║
║                                                                   ║
║   ┌─────────────────────────┐  ┌──────────────────┐               ║
║   │ Body text (editorial)   │  │  Visual / image │               ║
║   │ ≤5 dòng/paragraph       │  │  hoặc data card │               ║
║   │ Tier 1/3 inline cite    │  │                  │               ║
║   └─────────────────────────┘  └──────────────────┘               ║
║                                                                   ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║   Section 2-6: [Pillar-specific content]                         ║
║                                                                   ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║   Internal links block (mandatory)                                ║
║                                                                   ║
║   ┌─────────┐ ┌─────────┐ ┌─────────┐                            ║
║   │/sa-ban  │ │/vay-mua │ │/phap-ly │                            ║
║   └─────────┘ └─────────┘ └─────────┘                            ║
║                                                                   ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║   Author/E-E-A-T block (nếu là pillar content có claim)          ║
║   ┌──────┐  Ngô Kim Quyên                                         ║
║   │photo │  Sales Manager · 10+ năm BĐS Đông Hà Nội              ║
║   └──────┘  Cập nhật: [date]                                      ║
║                                                                   ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║   Soft CTA (advisory, không sale pressure)                       ║
║                                                                   ║
╠══════════════════════════════════════════════════════════════════╣
║   Footer (same as homepage)                                       ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Special rules per pillar

| Pillar | Bắt buộc visible |
|---|---|
| `/sa-ban` | Full-width map, sidebar filter ≤320px, lot legend, fallback modal |
| `/phap-ly` | Tier 1/3 source list visible · disclaimer top |
| `/bang-gia` | Disclaimer top + bottom · CTA `/vay-mua` ≥1 |
| `/tiem-nang` | NO countdown · NO "ROI X%" số tuyệt đối |
| `/tien-do` | Timeline visual · source citations |
| `/vay-mua` | Calculator + disclaimer · bank_rates source visible |
| `/tu-van` | Author profile (E-E-A-T) + form full |

---

## Acceptance per pillar

- [ ] Breadcrumb schema + visible
- [ ] H1 không phải tên sản phẩm
- [ ] ≥1 link tới `/sa-ban`
- [ ] ≥1 link tới tool (`/vay-mua` hoặc `/tu-van`)
- [ ] Author block visible (nếu là claim content)
- [ ] Disclaimer phù hợp loại pillar
- [ ] Forbidden words grep clean
