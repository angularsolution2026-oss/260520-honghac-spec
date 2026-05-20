# Scope & Structure Audit — GOV-005

**Date:** 2026-05-16

---

## A. Redundancy

| Duplication | Files | Recommendation |
|-------------|-------|----------------|
| Workflow pipeline | `orchestration.md`, `LOCALHOST_RUNTIME_WORKFLOW.md`, `HANDOFF.md` §6, `skills.registry` `/localhost-runtime-pass` | **Keep all** — different audiences (state machine vs runtime vs human vs skill). Cross-link only. |
| Multi-agent safety | `AGENT_HANDOFF_PROTOCOL`, `FILE_OWNERSHIP_MAP`, `parallel-lanes` | **Keep** — protocol = packets; map = zones; lanes = task instance |
| Core product rule | `rules.md` §2, `AI_ONBOARDING`, `ARCHITECTURE_IMMUTABLES` §1, HANDOFF §2 | **Keep** — repetition intentional for onboarding |
| Mark-complete sync | `rules` §10.1, `done-criteria` §8, `skills` `/mark-complete` | **Merged intent** — single checklist in done-criteria; others reference it |

**Entropy risk:** Planning artifacts listed in 3 places (rules §13, onboarding, CONTEXT_BUDGET). **Mitigation:** `CONTEXT_ROUTING_MATRIX.md` is now SSOT for reads.

---

## B. Over-specification

| Item | Assessment |
|------|------------|
| P0-000 plan command blocks | OK — task-specific, not global governance |
| ESLint rule names in validation | OK — testable |
| Luxury UX criteria | Borderline — emotional dimensions in `VISUAL_REVIEW_CRITERIA` paired with PASS/WARNING/FAIL tables (acceptable) |
| Wave merge order in 3 files | OK — task plan + ownership map + protocol |

**Action:** Do not move implementation commands from `P0-000.plan.md` into global rules.

---

## C. Missing edge cases (gaps to document)

| Scenario | Was documented? | Action in GOV-005 |
|----------|-------------------|-------------------|
| Localhost unavailable | Partial | Add to `LOCALHOST_RUNTIME_WORKFLOW` retry + escalate (existing §4) |
| MCP browser unavailable | **Missing** | **Add** — CONTEXT_ROUTING_MATRIX: fall back to Tier 1 + manual waiver |
| Build partial pass (typecheck only) | Implicit | orchestration: TESTING requires Tier 1 complete |
| Runtime QA skipped | Partial | done-criteria §6.1 blocks UI tasks |
| Merge conflict unresolved | Yes — KFP-002, ROLLBACK R6 |
| Screenshot failure | **Missing** | **Add** — BROWSER_AUTOMATION: log WARNING, continue if ≥1 checkpoint |
| Lighthouse timeout | Partial | LOCALHOST §5 timeout 120s |
| Playwright hangs | **Missing** | **Add** — BROWSER_AUTOMATION session max 20 min; kill + escalate |
| Phase 0 luxury audit on null pages | Yes — workflow §8 |

**Follow-up:** Patch `BROWSER_AUTOMATION_RULES.md` §7 with MCP-unavailable trigger (B8) — recommended in MIGRATION_PLAN.

---

## D. Structure assessment (pre/post GOV-005)

| Before | After |
|--------|-------|
| Flat `.ai/` (8 files) + flat `docs/ai/` (20+ files) | `.ai/{core,registry,state,governance,runtime,planning,onboarding,tasks,evidence}` |
| Unclear entry | `.ai/README.md` + `docs/ai/INDEX.md` |
| Audits mixed with ops docs | `docs/ai/audits/` |

**Maintainability:** Improved — role-based folders, redirect stubs preserve old links.

---

## Summary

| Category | Score (1–5) | Note |
|----------|-------------|------|
| Redundancy control | 3 | Acceptable intentional overlap |
| Over-spec | 4 | Plans appropriately detailed |
| Edge-case coverage | 3 | 3 gaps flagged for small patches |
| Structure | 5 | Post GOV-005 layout |
