# G3 — Mood Board v1

**Status:** Draft v1 — chờ chủ dự án approve direction
**Authority:** [07 §1, §5](../spec/07-ui-ux-design-system.md) · [16 §3.11](../spec/16-scoring-quality-gate.md)

> Đây là reference cho **tone visual**, không phải spec đo được. Mục đích: dev/designer hiểu "luxury calm" trông như thế nào.

---

## §1. Direction lock

**Tone:** Intelligent · Calm · Editorial
**Anti-tone:** Aggressive sales · Bright primary colors · Bouncy animation · Density · Stock CGI

---

## §2. Visual reference (5 hướng — chọn 1)

### A. Phú Mỹ Hưng style (Recommended — đúng brief)
- **Reference URL:** https://www.phumyhung.vn/
- **Lý do:** Brief gốc đã ghi "tham chiếu thương hiệu Phú Mỹ Hưng" ([01 §1](../spec/01-project-overview.md))
- **Lift:** Whitespace, serif display font, ảnh editorial lived-in, không sticky CTA bar
- **Avoid:** Bright marketing banner ở trên

### B. Capitaland / Keppel Land
- **Reference URL:** https://www.capitaland.com/ · https://www.keppelland.com.sg/
- **Lift:** Editorial grid, typography mix (display serif + sans body), bản đồ minimal

### C. The Modern Real Estate (NYT style)
- **Reference URL:** https://www.nytimes.com/section/realestate
- **Lift:** Editorial article layout, citation density, author profile prominence

### D. Airbnb Luxe / Plus listings
- **Lift:** Full-bleed lived-in photography, generous spacing, soft CTA

### E. Notion / Linear marketing pages
- **Lift:** Calm gradient, no aggressive marketing, type-led layout

> **Recommendation:** Direction A (PMH) + sprinkle C (editorial citations).

---

## §3. Color palette (lock từ [07 §5](../spec/07-ui-ux-design-system.md))

```
Brand Primary:   #B5893A  (luxury gold)
Brand Secondary: #1C2B3A  (deep navy)
Surface:         #FAFAF8  (warm off-white)
Text Primary:    #1C2B3A
Text Secondary:  #6B7280
Border:          #E5E7EB
```

**Lot status colors (map only):** đã lock tại [05 §4.6](../spec/05-database-schema.md), không đổi.

---

## §4. Typography

```
Display (H1/H2):  Playfair Display, Georgia, serif
Body/UI:          Be Vietnam Pro, Inter, sans-serif
Mono (data):      JetBrains Mono
```

- H1 chỉ dùng display serif
- Body 16px minimum (tránh iOS zoom)
- Line height ≥1.6 cho body editorial
- ≤5 dòng/paragraph editorial ([07 §1](../spec/07-ui-ux-design-system.md))

---

## §5. Spacing & rhythm

- Section padding: 80px mobile · 120px desktop ([07 §5](../spec/07-ui-ux-design-system.md))
- Card spacing: 24-32px gap
- Max 3 CTA trong 1 viewport ([07 §11](../spec/07-ui-ux-design-system.md))
- Whitespace dồi dào — KHÔNG cố lấp đầy

---

## §6. Photography rule

| Type | Allowed | Forbidden |
|---|---|---|
| Lived-in editorial | ✅ family, real moments | ❌ Stock photo có watermark/logo nước ngoài |
| Drone aerial | ✅ với caption "Ảnh minh họa quy hoạch" | ❌ CGI quá glossy không có disclaimer |
| Product render | ✅ khi có `approvalStatus = approvedForPublic` | ❌ Render từ web khác |
| Interior shots | ✅ real shoot | ❌ Pinterest mood board misleading |
| Logo CĐT | ⚠️ chỉ khi `partnerLogoApprovalStatus = approved` | ❌ Tự ý dùng |

**Fallback khi chưa có asset:** [`AbstractPlaceholder` component](../spec/07-ui-ux-design-system.md) — gradient + minimal label.

---

## §7. Motion budget

- Max duration: 600ms ([07 §5](../spec/07-ui-ux-design-system.md))
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-out)
- KHÔNG bouncy spring
- Animate chỉ `opacity` + `transform` ([11 §9](../spec/11-performance.md))
- `prefers-reduced-motion`: tắt hoàn toàn ([11 §9](../spec/11-performance.md))

**Forbidden:**
- Particle effects
- Parallax full-page
- Auto-rotating hero carousel
- Sticky CTA bar bật ngay khi load

---

## §8. Forbidden visual patterns (theo [website-structure §1 Gate 9](../spec/website-structure.md))

- ❌ Sticky CTA bar bật trước scroll 80% hero
- ❌ Countdown timer
- ❌ "50 căn cuối" badge
- ❌ "Hot deal" / "Flash sale" overlay
- ❌ Bright red urgency button
- ❌ Multi-step funnel với progress bar gây pressure
- ❌ Pop-up < 30s sau page load
- ❌ Exit-intent popup ngay (phải ≥30s — [08 §3.3](../spec/08-lead-capture-cro.md))

---

## §9. Reviewer signoff

- [ ] Direction approved (A/B/C/D/E)
- [ ] Color palette không đổi từ [07 §5](../spec/07-ui-ux-design-system.md)
- [ ] Typography load strategy OK ([11 §7](../spec/11-performance.md))
- [ ] Photography rule reviewed với chủ dự án
- [ ] Reviewer: ____________ Date: ____________
