# Context Routing Matrix

**Version:** 1.0 | **GOV-005** | **Purpose:** Token-efficient reads — **SSOT for "what to load"**

**Authority unchanged:** `docs/spec/` > `.ai/core/rules.md` > planning/governance docs

---

## 1. Pack definitions

| Pack | Max files | When |
|------|-----------|------|
| **S** (small) | ≤ 6 | Governance edit, typo, checklist tick |
| **M** (medium) | ≤ 12 | Single-domain task, `/plan` |
| **L** (large) | ≤ 20 | Scaffold, multi-route, parallel lanes |
| **R** (runtime) | ≤ 16 | UI task with browser pass (adds runtime folder) |

---

## 2. Universal session core (every pack)

| Order | File | Role |
|-------|------|------|
| 1 | `.ai/onboarding/AI_ONBOARDING.md` | Entry + core product |
| 2 | `.ai/state/task-state.md` | Live status |
| 3 | `.ai/core/rules.md` | Operating law |

**Forbidden default:** Full `docs/spec/01–17` scan

---

## 3. Pack S — small

| # | File |
|---|------|
| 4 | `.ai/planning/PROGRESS_CHECKLIST.md` (one row only) |
| 5 | Target doc being edited |
| 6 | `.ai/governance/FILE_OWNERSHIP_MAP.md` — zone `docs-governance` only |

**Skip:** runtime, SPEC_DIGEST, TASK_GRAPH (unless editing them)

---

## 4. Pack M — medium

**Core (3)** +

| # | File |
|---|------|
| 4 | `.ai/planning/PROGRESS_CHECKLIST.md` |
| 5 | `.ai/planning/GAP_REGISTER.md` |
| 6 | `.ai/planning/TASK_GRAPH.md` (if task has ID) |
| 7 | `.ai/planning/CURRENT_ARCHITECTURE.md` |
| 8 | `.ai/planning/SPEC_DIGEST.md` — **section only** |
| 9 | `.ai/governance/FILE_OWNERSHIP_MAP.md` |
| 10–12 | 1–2 `docs/spec/XX.md` for domain |

---

## 5. Pack L — large (e.g. P0-000)

**Core (3)** + Pack M files +

| # | File |
|---|------|
| 13 | `docs/spec/00-master-instruction.md` |
| 14 | `docs/spec/06-app-router-structure.md` |
| 15 | `.ai/tasks/P0-000.plan.md` (or active task plan) |
| 16 | `.ai/tasks/P0-000.parallel-lanes.md` |
| 17 | `.ai/registry/agents.registry.md` |
| 18 | `.ai/governance/AGENT_HANDOFF_PROTOCOL.md` |
| 19 | `.ai/governance/ARCHITECTURE_IMMUTABLES.md` |
| 20 | `.ai/core/quality-gates.md` |

**Parallel add:** `.ai/governance/KNOWN_FAILURE_PATTERNS.md` (skim IDs)

**Forbidden:** Runtime pack unless UI exists

---

## 6. Pack R — runtime (Phase 1+ UI)

**Pack M or L (for task)** +

| # | File |
|---|------|
| +1 | `.ai/runtime/LOCALHOST_RUNTIME_WORKFLOW.md` |
| +2 | `.ai/runtime/UI_EXPLORATION_PROTOCOL.md` |
| +3 | `.ai/runtime/BROWSER_AUTOMATION_RULES.md` |
| +4 | `.ai/runtime/VISUAL_REVIEW_CRITERIA.md` |
| +5 | `.ai/core/quality-gates.md` — Tier 2-UI |

**Skill shortcut:** `/localhost-runtime-pass`

---

## 7. Agent-specific minimum adds

| Agent | Beyond pack for active task |
|-------|----------------------------|
| **Orchestrator** | `TASK_GRAPH`, `orchestration.md`, task plan |
| **Architect** | `ARCHITECTURE_IMMUTABLES`, `CURRENT_ARCHITECTURE` |
| **Frontend** | `FILE_OWNERSHIP` zones routes/components, spec `07` |
| **Backend** | spec `05`, `06 §4`, ownership crm-lead |
| **QA Auditor** | Pack R + validation report template |
| **Performance** | Pack R (Lighthouse/DevTools sections only) |
| **SEO** | spec `09`, `14`, ownership seo zone |
| **Content Verifier** | spec `00 §8`, `VISUAL_REVIEW` brochure section |
| **Security** | spec `02 §6–7`, `next.config` ownership |
| **Launch/Data Readiness** | spec `17`, route entry in `website-structure.md`, affected data spec |

---

## 8. Forbidden unnecessary reads

| Situation | Do not read |
|-----------|-------------|
| Phase 0 scaffold | Entire runtime folder |
| Governance-only task | `docs/spec/*`, runtime pack |
| Copy-only task | Lighthouse, Playwright docs |
| Non-UI bugfix | `VISUAL_REVIEW_CRITERIA` full |
| Session start | All KFP entries (skim IDs only) |

---

## 9. MCP unavailable fallback

If browser/Lighthouse/Playwright MCP fails:

1. Run Tier 1 (`typecheck`, `lint`, `build`)
2. Document waiver in `task-state.md` + human approval
3. **Do not** `MARK_COMPLETE` UI tasks without runtime pass unless waived

---

## 10. Human quick paths

| Human need | Read |
|------------|------|
| 2 min status | `HANDOFF.md` |
| Approve Phase 0 | `HANDOFF.md` §4 + `.ai/tasks/P0-000.plan.md` |
| Audit results | `docs/ai/EXECUTIVE_SUMMARY.md` |

---

## Changelog

| Date | Note |
|------|------|
| 2026-05-16 | GOV-005 initial matrix |
