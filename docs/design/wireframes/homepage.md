# G3 — Homepage Wireframe (ASCII v1)

**Status:** Draft v1 — replace bằng Figma sau khi designer được hire
**Authority:** [06 §2](../../spec/06-app-router-structure.md) · [website-structure §3](../../spec/website-structure.md) · [G1 homepage copy](../../copy/homepage-copy.md)

> Wireframe **desktop ≥1024px** trước. Mobile ≤768px: stack vertical, full-width.

---

## Desktop wireframe

```
╔══════════════════════════════════════════════════════════════════════════════╗
║  [LOGO]  Khám phá đô thị | Sa bàn | Tiềm năng | Tiến độ | Phong cách sống ║  ← Header (top nav 7 items)
║                       | Tư vấn | Đối tác          [hotline icon] [Zalo]      ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   ┌─────────────────────────────┐  ┌────────────────────────────────────┐   ║
║   │                             │  │                                    │   ║
║   │  H1: "Hiểu một đô thị       │  │                                    │   ║
║   │   197 ha trước khi bước     │  │     [SaBanPreview / mini-map]      │   ║
║   │   vào nó"                   │  │     (Phase 0: static image)        │   ║
║   │                             │  │     (Phase 1B: interactive)        │   ║
║   │  Sub: Nền tảng tư vấn       │  │                                    │   ║
║   │   độc lập...                │  │                                    │   ║
║   │                             │  │                                    │   ║
║   │  [Khám phá sa bàn ►]    │  │                                    │   ║
║   │  [Xem bảng giá] [Tư vấn]   │  │                                    │   ║
║   │                             │  └────────────────────────────────────┘   ║
║   │  ⓘ Disclaimer 00 §11.1     │                                            ║
║   └─────────────────────────────┘                                            ║
║                                                                              ║  ← S1: HeroDecisionConsole
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║                  3 hành trình quyết định khác nhau                           ║
║                                                                              ║
║   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                       ║
║   │ Mua để ở    │  │ Đầu tư dài    │  │ Theo dõi      │                       ║
║   │              │  │ hạn           │  │ giai đoạn     │                       ║
║   │ [Tìm vị trí]│  │ [Xem tiềm    │  │ [Theo dõi    │                       ║
║   │              │  │  năng]        │  │  phase]       │                       ║
║   └──────────────┘  └──────────────┘  └──────────────┘                       ║
║                                                                              ║  ← S2: DecisionPaths
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   SourceTrustBand: "Mọi thông tin dẫn được về nguồn"                        ║
║   Tier 1 · Tier 3 · Không tự nhận là website chính thức                     ║
║                                                                              ║  ← S3: SourceTrustBand
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   ┌────────────────────────────────┐  ┌────────────────────────────┐        ║
║   │  Phân khu đang mở: Hồng Phát   │  │  [Ảnh Hồng Phát approved]  │        ║
║   │  [Tier 1 bullets]              │  │  (hoặc AbstractPlaceholder)│        ║
║   │  [Xem trên bản đồ] [Pháp lý]  │  │                            │        ║
║   └────────────────────────────────┘  └────────────────────────────┘        ║
║                                                                              ║  ← S4: CurrentReleaseIntelligence
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║              Một đô thị 197 ha không xây trong một mùa                       ║
║                                                                              ║
║   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                       ║
║   │ Hồng Phát    │  │ Hồng Thịnh   │  │ Hồng Phúc    │                       ║
║   │ Đang mở      │  │ Sắp công bố  │  │ Quy hoạch    │                       ║
║   │ [→ map]      │  │ (no CTA)     │  │ (no CTA)     │                       ║
║   └──────────────┘  └──────────────┘  └──────────────┘                       ║
║                                                                              ║  ← S5: UrbanIntelligencePreview
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   Bốn câu hỏi quyết định — bốn công cụ hỗ trợ                                ║
║   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                                        ║
║   │Pháp  │ │Giá   │ │Vay   │ │Tư    │                                        ║
║   │lý    │ │      │ │      │ │vấn   │                                        ║
║   └──────┘ └──────┘ └──────┘ └──────┘                                        ║
║                                                                              ║  ← S6: DecisionSupportPanel
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   ProgressAndSignal — Mini timeline 3-4 mốc                                  ║
║   [→ /tien-do]                                                               ║
║                                                                              ║  ← S7: ProgressPreview
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║              Đô thị không chỉ là lô đất                                      ║
║                                                                              ║
║   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                       ║
║   │ [ảnh GĐ]    │  │ [ảnh xanh]   │  │ [ảnh CĐ]     │                       ║
║   │ Buổi sáng   │  │ Khoảng thở   │  │ Hàng xóm     │                       ║
║   │ của con     │  │ giữa đô thị  │  │ cùng thế hệ  │                       ║
║   └──────────────┘  └──────────────┘  └──────────────┘                       ║
║         [Khám phá phong cách sống →]                                         ║  ← S8: LifestyleSection
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   Bốn tài liệu quyết định, không phải brochure                               ║
║   ┌────┐ ┌────┐ ┌────┐ ┌────┐                                                ║
║   │PDF1│ │PDF2│ │PDF3│ │PDF4│  (mỗi card có 1 quick-form: phone + consent) ║
║   └────┘ └────┘ └────┘ └────┘                                                ║
║                                                                              ║  ← S9: LeadMagnetLibrary
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   FAQ — 10 câu objection thật (accordion)                                    ║
║   ► Sao tôi nên xem trang này thay vì website CĐT?                           ║
║   ► Giá có rẻ hơn ở đây không?                                               ║
║   ► ... (8 câu nữa)                                                          ║
║                                                                              ║  ← S10: FAQDecisionObjections
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║              Bạn không cần quyết định hôm nay                                ║
║   [Khám phá sa bàn]  [Nhận checklist]  [Đặt lịch tư vấn]                    ║
║                                                                              ║  ← S11: FinalAdvisoryCTA
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║   Footer:                                                                    ║
║   ┌──────────┬──────────┬──────────┬──────────┐                              ║
║   │Nav links │NAP block │Disclosure│Zalo OA   │                              ║
║   │8 items   │địa chỉ   │00 §11.1  │Email     │                              ║
║   └──────────┴──────────┴──────────┴──────────┘                              ║
║   Privacy · DSAR · © 2026                                                    ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

## Mobile wireframe (key sections only)

```
┌─────────────────────┐
│ ☰  [LOGO]    [📞]   │
├─────────────────────┤
│                     │
│  H1 (2 dòng)        │
│  Sub (3 dòng)       │
│                     │
│  [Khám phá sa bàn] │
│  [Bảng giá] [TV]   │
│                     │
│  [mini map image]   │
│                     │
│  ⓘ disclaimer       │
├─────────────────────┤
│  DecisionPaths      │
│  ┌──────┐          │
│  │Mua để│          │
│  │ ở    │          │
│  └──────┘          │
│  ┌──────┐          │
│  │Đầu tư│          │
│  └──────┘          │
│  ┌──────┐          │
│  │Theo  │          │
│  │dõi   │          │
│  └──────┘          │
├─────────────────────┤
│  ... (stack rest)   │
└─────────────────────┘
```

**Mobile rules ([07 §7](../../spec/07-ui-ux-design-system.md)):**
- Single column
- Touch target ≥48px
- Sticky CTA chỉ sau scroll >80% hero
- Font 16px+ body
- Bottom sheet cho map (Sprint 1B)

---

## First-viewport rule check (mandatory — [00 §5.3](../../spec/00-master-instruction.md))

Trong viewport đầu tiên phải có:
- [ ] Brand: "Hồng Hạc City Bắc Ninh"
- [ ] Independent platform disclosure
- [ ] Path tới `/sa-ban` rõ ràng (CTA primary)
- [ ] Map/decision preview (image hoặc shell, **không** import maplibre)
- [ ] CTA `Khám phá sa bàn`

**Forbidden trong first viewport:**
- [ ] "Đăng ký ngay" / "Giữ chỗ" / "Chốt căn"
- [ ] "Giá gốc CĐT"
- [ ] Official-site claim

---

## Reviewer signoff

- [ ] 11 section đầy đủ và đúng thứ tự
- [ ] First viewport rule pass
- [ ] Mobile stack reviewed
- [ ] Designer/PM ký: ____________ Date: ____________
