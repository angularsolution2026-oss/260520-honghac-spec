# G3 — Component States Reference

**Status:** Draft v1
**Authority:** [07 §10.1](../spec/07-ui-ux-design-system.md)

> Visual reference cho mọi state. Khi dev code component, phải implement đủ states này.

---

## Button

| State | Visual | Notes |
|---|---|---|
| Default | `bg-brand-primary text-white` | Solid |
| Hover | +5% darker | Transition 200ms |
| Focus | `outline-2 outline-offset-2 outline-brand-primary` | A11y ([07 §4](../spec/07-ui-ux-design-system.md)) |
| Active/Pressed | scale 0.98 | Subtle |
| Disabled | `opacity-50 cursor-not-allowed` | KHÔNG remove from DOM |
| Loading | spinner 16px + text "Đang gửi..." | Button vẫn disabled |

**Variants:** Primary (gold) · Secondary (outline navy) · Tertiary (text only)

---

## LeadForm

| State | Visual |
|---|---|
| idle | Form fields editable, submit enabled if valid |
| loading | All inputs disabled, button spinner |
| success | Form swap → success card + checkmark + closing copy |
| error | Inline error below field (red) + aria-live announce |
| offline | Submit disabled + banner "Vui lòng kiểm tra Internet" |
| timeout | Retry button visible + previous data preserved |

---

## Card

| Variant | Use case |
|---|---|
| `decision-path` | DecisionPaths 3-card | 1:1.2 aspect, subtle border, hover lift |
| `lifestyle` | LifestyleSection | 4:3 aspect, full-bleed image top |
| `lead-magnet` | LeadMagnetLibrary | Square, title+icon |
| `lot-popup` | Map click popup | Compact, max-width 320px |

---

## Map states

| State | Visual |
|---|---|
| Loading | Skeleton shimmer, NO spinner ([07 §6](../spec/07-ui-ux-design-system.md)) |
| Tile error | Toast "Bản đồ đang tải lại" + auto retry 1× |
| Token expired | Transparent re-auth, retry |
| No lot data | Map render with safe-default popup "Đang cập nhật" |

---

## Modal

- Focus trap khi mở ([07 §10.3](../spec/07-ui-ux-design-system.md))
- ESC để đóng (trừ destructive confirm)
- Default focus vào safe action, không destructive
- Backdrop click đóng (trừ form đang fill)
- Trả focus về trigger sau khi đóng

---

## Reviewer signoff

- [ ] Mọi component có spec 8 states tối thiểu
- [ ] A11y axe-core CI pass
- [ ] Reviewer: ____________
