# 16 — Website Scoring & Quality Gate (Hồng Hạc City)

**Version:** 3.0 | **Last updated:** 2026-05-16 | **Status:** Approved
**Anti-hallucination rule:** Score chỉ valid khi có runtime evidence package. Xem `00 §12`.

---

## §1. Scoring System

16 tiêu chí × 10 điểm = 160 điểm tối đa → normalized về 10.

**Score Levels:**
- 9.0–10.0: Mastery (production excellence)
- 7.0–8.9: Proficiency (deployment-ready)
- 5.0–6.9: Developing (needs improvement)
- < 5.0: Critical gap (block deployment)

---

## §2. 16 Tiêu Chí

| # | Category | Max | Block deploy? |
|---|---|---|---|
| 1 | Spec Readiness | 10 | Yes (< 7.0) |
| 2 | SEO Strategy | 10 | Yes (< 7.0) |
| 3 | CRO / Lead Capture | 10 | Yes (< 7.0) |
| 4 | Trust / Legal / Privacy | 10 | Yes (< 7.0) |
| 5 | CRM / Admin / Lead Ops | 10 | Yes (< 7.0) |
| 6 | Content Governance | 10 | No |
| 7 | Differentiation / Moat | 10 | No |
| 8 | Production Readiness | 10 | Yes (< 7.0) |
| 9 | Overall Score | 10 | — (derived) |
| 10 | Local SEO & Maps | 10 | No |
| 11 | Visual & Sensory | 10 | No |
| 12 | Financial Tools | 10 | No |
| 13 | Real-time Inventory | 10 | Yes (< 6.0) |
| 14 | Speed-to-Lead | 10 | Yes (< 7.0) |
| 15 | IA / Silo | 10 | No |
| 16 | E-E-A-T | 10 | No |

---

## §3. Scoring Criteria Details

### §3.1. Spec Readiness (Cat 1)

| Sub-criterion | Max | Condition |
|---|---|---|
| Architecture locked, không rebuild | 3 | Signed off `00 §13` |
| Tất cả 19 spec files synced và nhất quán | 3 | Xem §5 — Cross-ref index |
| Enum SSOT đồng bộ tất cả files | 2 | `05 §4` không có conflict |
| Acceptance criteria testable | 2 | Mọi section có AC đo được |

### §3.2. SEO Strategy (Cat 2)

| Sub-criterion | Max |
|---|---|
| Technical SEO complete (`06 §5`) | 2 |
| Sitemap/robots/canonical implemented | 2 |
| Schema markup valid + CI verified | 2 |
| Content clusters planned + unique intent | 2 |
| E-E-A-T foundation | 2 |

### §3.3. CRO / Lead Capture (Cat 3)

| Sub-criterion | Max |
|---|---|
| Multi-surface lead forms (≥ 5 surfaces) | 2 |
| Idempotency + error handling đầy đủ | 2 |
| Progressive profiling | 1 |
| A/B experiment ≥ 1 completed với runtime proof | 2 |
| No dark patterns (`04 §7`) | 2 |
| Form analytics (view/start/submit/success/error) | 1 |

**CRO 9.5 gate:** ≥ 1 `completed` experiment với `evidenceBasis` trước khi đạt score ≥ 9.5.

### §3.4. Trust / Legal / Privacy (Cat 4)

| Sub-criterion | Max |
|---|---|
| Disclaimer `00 §11.1` present ≥ 2 vị trí | 2 |
| Privacy policy complete + DSAR functional | 2 |
| Consent banner default-denied + functional | 2 |
| No forbidden claims (`00 §8`) | 2 |
| Fact Ledger cho tất cả claim content | 2 |

### §3.5. CRM / Admin / Lead Ops (Cat 5)

| Sub-criterion | Max |
|---|---|
| Lead pipeline (Kanban + Table) functional | 2 |
| Speed-to-lead Telegram alert ≤ 30s | 2 |
| Lead scoring formula implemented (`08 §6`) | 2 |
| Round-robin routing với SLA tracking | 2 |
| Export + audit trail (`03 §4.2`) | 2 |

### §3.6. Content Governance (Cat 6)

| Sub-criterion | Max |
|---|---|
| Claim review flow functional | 3 |
| Author profiles với real E-E-A-T | 3 |
| Content review cycle defined | 2 |
| Internal link strategy documented | 2 |

### §3.7. Differentiation / Moat (Cat 7)

| Sub-criterion | Max |
|---|---|
| Map-first experience (NOT brochure) | 3 |
| AI Matching (Sprint P2) | 2 |
| Comparison hub (neutral, Tier-verified) | 2 |
| Watchlist / phase follow | 2 |
| Editorial tone (luxury calm) | 1 |

### §3.8. Production Readiness (Cat 8)

| Sub-criterion | Max |
|---|---|
| Lighthouse CI gates passing (`11 §6`) | 2 |
| TypeScript strict, no build errors | 2 |
| Sentry + error monitoring active | 2 |
| not-found, error, offline pages (`06 §6`) | 2 |
| Security headers complete (`02 §7`) | 2 |

### §3.9. Overall Score (Cat 9)

Derived: `(Sum of Cat 1–8 + Cat 10–16) / 15 × 10`

### §3.10. Local SEO & Maps (Cat 10)

| Sub-criterion | Max |
|---|---|
| Google Business Profile claimed + optimized | 3 |
| Local intent pages implemented (`09 §3`) | 3 |
| Local lead source tracking (`05 §4.4`) | 2 |
| NAP consistent across pages + GBP | 2 |

### §3.11. Visual & Sensory (Cat 11)

| Sub-criterion | Max |
|---|---|
| Design tokens consistent (`07 §5`) | 2 |
| Mobile-first responsive (all breakpoints) | 2 |
| Luxury calm: no fake urgency, whitespace OK, motion OK | 3 |
| A11y WCAG AA (axe-core CI pass) | 2 |
| Real/approved images (no stock misuse) | 1 |

### §3.12. Financial Tools (Cat 12)

| Sub-criterion | Max |
|---|---|
| Mortgage calculator functional + disclaimer | 3 |
| Bank rate dynamic (from `bank_rates` — not hardcoded) | 2 |
| ROI calculator (Sprint P2) | 2 |
| Lead capture sau tool use | 2 |
| No hard financial guarantees | 1 |

### §3.13. Real-time Inventory (Cat 13)

| Sub-criterion | Max |
|---|---|
| Inventory data model (`05 §3.1`) implemented | 3 |
| Lot status live on map (color coding) | 3 |
| Admin can update lot status | 2 |
| Status change history tracked | 2 |

### §3.14. Speed-to-Lead (Cat 14)

| Sub-criterion | Max |
|---|---|
| Hot lead Telegram alert ≤ 30s (`08 §5`) | 3 |
| SLA tracking (met/breached badges) | 3 |
| Escalation khi SLA breach | 2 |
| Sales presence heartbeat + TTL cron | 2 |

### §3.15. IA / Silo (Cat 15)

| Sub-criterion | Max |
|---|---|
| Navigation matches `00 §5.1` exactly | 2 |
| No orphan pages | 2 |
| Map là core product (top nav + homepage first viewport + `/sa-ban` shell/full route) | 3 |
| Breadcrumbs trên tất cả sub-pages | 1 |
| Footer navigation complete | 2 |

**IA score cap rules:**
- If homepage first viewport does not expose `/sa-ban` or a SaBanPreview, Cat 15 max score = 6.
- If page flow resembles brochure order "Tổng quan -> Vị trí -> Tiện ích -> Bảng giá -> Đăng ký", Cat 15 max score = 7.
- If `/bang-gia` becomes a public bảng hàng / sales hook instead of price-context support, Cat 15 max score = 8 and Cat 3 must be reviewed for dark-pattern risk.
- If any public pillar has no path to `/sa-ban`, `/vay-mua`, `/phap-ly`, or `/tu-van`, Cat 15 max score = 8 until internal links are fixed.

### §3.16. E-E-A-T (Cat 16)

| Sub-criterion | Max |
|---|---|
| ≥ 1 real author profile (name + credentials + photo) | 3 |
| Disclosure `00 §11.1` ≥ 2 placements | 2 |
| Source citations (Tier 1/3) trong content | 2 |
| Published/Updated dates visible | 2 |
| Contact methods verifiable | 1 |

---

## §4. Evidence Package

Trước mỗi score claim phải có:
1. **Screenshot** của feature đang chạy (không mockup)
2. **URL** live deployment
3. **Lighthouse report** (JSON export)
4. **Date** evidence collected

Score thay đổi > 0.5 raw points phải có:
- `reasonForDelta`: mô tả cụ thể điều gì thay đổi
- `evidenceBasis`: URL hoặc file của evidence

---

## §5. Cross-Reference Index (19 Files)

| File | Title | Key refs |
|---|---|---|
| `00` | Master Instruction | All — authority file |
| `01` | Project Overview | `00 §2`, `00 §4` |
| `02` | Tech Stack | `04 §1`, `05 §4.9`, `05 §2.5` |
| `03` | User Roles & Permissions | `05 §2.1`, `05 §2.3` |
| `04` | Features & Sprint | `02 §5`, `05 §4.4`, `08 §6`, `10 §4` |
| `05` | Database Schema | `02 §5`, `03 §4`, `10 §3.5` |
| `06` | App Router | `04 §1`, `11 §6.2`, `09 §4` |
| `07` | UI/UX Design | `05 §4.6`, `00 §8`, `04 §3` |
| `08` | Lead Capture & CRO | `05 §4.4`, `10 §3`, `12 §2.2` |
| `09` | SEO Strategy | `06 §5`, `14`, `15 §2` |
| `10` | Admin Dashboard | `05 §1.1`, `03 §3`, `08 §6` |
| `11` | Performance | `06 §3`, `07 §5`, `04 §1` |
| `12` | Analytics | `08 §3`, `05 §4.4`, `13 §8` |
| `13` | Privacy & Legal | `00 §8`, `08 §7`, `05 §6` |
| `14` | Schema Markup | `09 §4`, `06 §5.3`, `05 §3.1` |
| `15` | Content Governance | `00 §4`, `09`, `05 §3.3` |
| `16` | Scoring & Quality Gate | `00 §12`, `04 §7`, all |
| `17` | Launch Data Readiness | `00 §4`, `15`, `website-structure` |
| `website-structure` | Site Map Visual | `00 §5`, `04 §1`, `06 §1`, `17` |
