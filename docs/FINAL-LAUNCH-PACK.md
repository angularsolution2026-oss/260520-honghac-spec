# Final Launch Pack

**Status:** Pre-code pack structurally complete; production launch still blocked by human/source data.  
**Last updated:** 2026-05-19  
**Authority:** [PRE-CODE-CHECKLIST](PRE-CODE-CHECKLIST.md) · [AUDIT-160](AUDIT-160.md) · [17 Launch Data Readiness](spec/17-launch-data-readiness.md)

> This pack is the handoff point before CP-0. It lets development start without rebuilding the architecture, while preventing fake claims, fake inventory, fake urgency, or unverified E-E-A-T from leaking into production.

---

## 1. Gate Status

| Gate | Status | Meaning |
|---|---|---|
| CP-0 | **PENDING** | Do not scaffold Next.js until owner explicitly approves. |
| CP-1 | **APPROVED** (DEC-017) | Public top nav locked per [00 §5.1](spec/00-master-instruction.md): `Khám phá đô thị · Sa bàn · Tiềm năng · Tiến độ · Phong cách sống · Tư vấn · Đối tác`. `Bảng giá`/`Pháp lý` reachable via footer/deep link only. |
| CP-2 | **APPROVED** | Env/spec alignment resolved (`.env.example` synced with [02 §3](spec/02-tech-stack.md)). |
| CP-3 | **APPROVED** | `/tu-van/[author-slug]` route included; first author profile `/tu-van/ngo-kim-quyen` ready ([docs/people/ngo-kim-quyen.md](people/ngo-kim-quyen.md)). |
| CP-4 | **PENDING** | Runtime validation can run only after scaffold/build exists. |

---

## 2. Pack Inventory

| Area | Primary files | Build status | Launch blocker |
|---|---|---|---|
| Architecture / spec | `docs/spec/*`, `.ai/*` | Ready for execution | CP-0 approval |
| IA / routes | `docs/spec/website-structure.md`, `docs/spec/06-app-router-structure.md` | Locked | None for scaffold |
| Copy | `docs/copy/homepage-copy.md`, `docs/copy/pillar-pages-copy.md` | Draft usable for Sprint 1A | Owner/copywriter review |
| SEO | `docs/seo/keyword-map.md`, `docs/seo/content-briefs/*`, `docs/seo/OFFICIAL-SOURCE-REGISTER.md` | Core briefs ready | Search volume/SERP data |
| Design | `docs/design/*` | Wireframe/mood direction ready | Owner selects final direction |
| Data seeds | `data/seeds/*.demo.json` | Local-demo fixtures ready | Tier 1 production data |
| E-E-A-T | `docs/people/ngo-kim-quyen.md`, `data/seeds/authors.demo.json` | **✅ Done 2026-05-19** — bio v2, LinkedIn, portrait approved, cert Số 151719 cited, Nomura JV Tier 1 cross-verified | (Optional) 3+ published works, Author 2 rotation for Cat 16 = 10/10 |
| CRO / lead ops | `docs/business/funnel-kpi.md`, `docs/experiments/exp-001.md` | Framework ready | Sales benchmark + baseline traffic |

---

## 3. Route Launch Matrix

| Route | Sprint | Can scaffold? | Can publish production? | Blocker rule |
|---|---:|---|---|---|
| `/` | 1A | Yes | Partial | Replace placeholder facts/media before production. |
| `/sa-ban` | 1A shell / 1B full | Yes | Shell only until inventory/map data approved | No fake lots or fake prices. |
| `/kham-pha-do-thi` | 1A | Yes | Yes with citations | All large factual claims must cite Tier 1. |
| `/bang-gia` | 1A | Yes | Yes as explanatory page only | No live price table without Tier 1 data. |
| `/phap-ly` | 1A | Yes | Yes with disclaimer | No legal guarantee claims. |
| `/tiem-nang` | 1A | Yes | Partial | Tier 3 evidence required for macro/infrastructure claims. |
| `/tien-do` | 1A | Yes | Partial | Milestones need date + source + media status. |
| `/phong-cach-song` | 1A | Yes | Partial | Separate existing vs planned amenities. |
| `/vay-mua` | 1B | Yes | Yes as calculator | Bank rates need review status and disclaimer. |
| `/tu-van/ngo-kim-quyen` | 1A | Yes | **✅ Yes** — bio + cert + LinkedIn + portrait verified 2026-05-19. Schema.org Person ready. | None for Sprint 1A. |

---

## 4. Human Data Needed

These are intentionally not filled by AI:

| Item | Owner | Status | Required for |
|---|---|---|---|
| ~~Ngô Kim Quyên long bio, LinkedIn, credentials, portrait~~ | Quyên | **✅ Done 2026-05-19** | E-E-A-T and author schema |
| Inventory / lot / phase Excel from official source | Chủ dự án / CĐT | ⏳ Pending | `/sa-ban`, `/sa-ban/[lot-id]`, inventory pages |
| Master plan and lifestyle media approved for public use | Chủ dự án / designer | ⏳ Pending | Homepage, pillars, OG images |
| Search volume and SERP validation | SEO specialist | ⏳ Pending | Keyword prioritization and launch SEO score |
| Sales conversion benchmarks (funnel KPI fill) | Quyên / sales manager | ⏳ Pending | Funnel dashboard and CRO scoring |
| Mood board direction approval (A/B/C/D/E) | Chủ dự án | ⏳ Pending | UI/visual lock before code |
| Homepage + 7 pillar copy review/signoff | Chủ dự án + copywriter | ⏳ Pending | Sprint 1A content |
| (Optional) 3+ Quyên published works link | Quyên | ⏳ Bonus | Cat 16 trần 10/10 |
| (Optional) Author 2 rotation | Chủ dự án | ⏳ Bonus | Cat 16 trần 10/10 |
| **CP-0 approval** | Chủ dự án | ⏳ Final gate | Start code scaffold |

---

## 5. Tier 1 Verifications Logged

Mọi public claim phải có Tier ≥ 3 ([00 §4](spec/00-master-instruction.md)). Bảng dưới là các Tier 1 fact đã được verify và ghi vào Fact Ledger trong [data/seeds/tier-sources.demo.json](../data/seeds/tier-sources.demo.json).

| Claim | Tier | Source(s) | Used in |
|---|---|---|---|
| Tên dự án + vị trí Bắc Ninh + 197,76 ha + tham chiếu PMH | Tier 1 | honghacphumyhung.vn, phumyhung.vn | Homepage, `/kham-pha-do-thi`, `/phan-khu/hong-phat` |
| **Hồng Hạc City là JV PMH × Nomura Real Estate Development (Nhật Bản)** | **Tier 1 (cross-verified 2 sources)** | `honghacphumyhung.vn/phu-my-hung-va-nomura-cung-dau-tu-hong-hac-city/` + `nomura-re-vn.com/du-an/hong-hac-city/` | Author bio §2, homepage SourceTrustBand |
| Phân khu Hồng Phát đang mở | Tier 1 | honghacphumyhung.vn/hongphat/ | `/phan-khu/hong-phat`, `/sa-ban` |
| Ngô Kim Quyên — Chứng chỉ môi giới BĐS Số 151719 (Sở Xây dựng TP.HCM) | Tier 1 (verifiable via cert number) | Sở Xây dựng TP.HCM | `/tu-van/ngo-kim-quyen` |

Tier 3 claim cần thêm sau (chưa block CP-0):
- Vành đai 4 Thuận Thành (VnExpress/Tuổi Trẻ URL)
- FDI Samsung Bắc Ninh
- Gia Lâm connectivity

---

## 6. Check Commands

Run before CP-0:

```powershell
python tools\spec_contract_audit.py
python tools\index_repo.py --git-tracked-only
python tools\build_corpus.py --git-tracked-only
python tools\ai_executor.py --task P0-000 --mode dry-run
```

Approve CP-0 in `.ai/state/checkpoints.json`, then:

```powershell
python tools\ai_executor.py --task P0-000 --mode execute
```

Runtime checks (`npm run typecheck`, `npm run lint`, `npm run build`, Playwright, Lighthouse ≥90, axe-core) are **N/A until CP-0 creates the app scaffold**. After scaffold, run them per [02 §4.1](spec/02-tech-stack.md).

---

## 7. Score Trajectory (Spec → Code → Launch)

| Phase | Cat 16 E-E-A-T | Tổng 160 | Note |
|---|---:|---:|---|
| AUDIT-160 §1 (spec-only ceiling) | 5.0 | ~120 | G5 chưa vá |
| Sau G5 (2026-05-19) | **9.5** | **~134** | +14 từ chỉ G5 done |
| Sau G1–G7 hoàn tất | 9.5–10 | ~140 | Spec/pack maximum |
| Sau Sprint 1A code + evidence | 9.5 | **~150** | Cần runtime evidence [16 §4](spec/16-scoring-quality-gate.md) |
| Sau Sprint 1B + experiment completed | 9.5–10 | **155–160** | CRO 9.5 gate unlocked |

---

## 8. Final Rule

Development may start after CP-0 because architecture, governance, route intent, demo data shape, content direction, and the first author E-E-A-T pack are all now defined. Production launch still requires the human/source items in §4. If a required source is missing, use `DEFERRED`, `HIDDEN`, `noindex`, or local-demo fallback per [17 §6](spec/17-launch-data-readiness.md).

**Do not invent data to fill a blocker.** It's better to ship `/sa-ban` shell only than to ship `/sa-ban` full with fabricated inventory.
