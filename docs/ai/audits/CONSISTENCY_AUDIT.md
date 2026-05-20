# Consistency Audit — GOV-005

**Date:** 2026-05-16 | **Scope:** `.ai/**`, `docs/ai/**`, cross-check `docs/spec/**`  
**Method:** Full file inventory + grep for workflow terms, versions, paths

---

## A. Terminology drift

| Issue | Locations | Severity | Resolution |
|-------|-----------|----------|------------|
| `MARK_COMPLETE` vs `/mark-complete` vs `mark-complete` | rules, onboarding, done-criteria, skills | Low | **Normalized:** command = `/mark-complete`; state = `MARK_COMPLETE` (documented in CONTEXT_ROUTING_MATRIX) |
| `docs/ai/` vs `.ai/` split | 40+ refs pre-GOV-005 | Medium | **Fixed:** canonical under `.ai/`; `docs/ai/*.md` = redirect stubs |
| Core product naming | Consistent: "Interactive Urban Decision Map", `/sa-ban` | — | OK |
| Agent names | `agents.registry.md` vs lane labels (Lane A/B) | Low | OK — lanes are task-specific aliases |
| `Sa bàn` vs `/sa-ban` | HANDOFF, spec `00 §5.1` | Low | OK — public label vs route; DEC-017 removed `AI` from nav label |

---

## B. Logic contradictions

| ID | Finding | Before | Fix |
|----|---------|--------|-----|
| C-01 | Scaffold gate cited **GOV-003** only | `.ai/core/rules.md` §14 | Updated to **GOV-005** |
| C-02 | `P0-000.plan.md` workflow omitted `HANDOFF_MERGE`, `RUNTIME_UI_PASS` | Plan § orchestration | Aligned with `.ai/core/orchestration.md` v1.2 |
| C-03 | `starter-manifest` blocker "GOV-001" | manifest | → CP-0 after GOV-005 |
| C-04 | `PHASE_PLAN` Pre-0 = GOV-001 only | planning/PHASE_PLAN | → GOV-001–005 |
| C-05 | Tier 2-UI required vs Phase 0 null stubs | quality-gates vs validation | **Clarified:** Tier 2-UI N/A for Phase 0 (workflow §8, gates matrix) |
| C-06 | `done-criteria` governance list missing GOV-004/005 | done-criteria §9 | Extended |

**No contradiction** found between immutables and spec `00 §13` after review.

---

## C. Data-flow mismatches

| Flow | Issue | Fix |
|------|-------|-----|
| TASK_PACKET → HANDOFF_PACKET | Formats aligned in `AGENT_HANDOFF_PROTOCOL.md` | OK |
| RUNTIME_REPORT | Template in `LOCALHOST_RUNTIME_WORKFLOW.md`; evidence path now `.ai/evidence/runtime/` | Paths updated |
| Validation report → done-criteria link | Was `../../../.ai/core/` | → `../core/done-criteria.md` |
| PROGRESS_CHECKLIST ↔ TASK_GRAPH | IDs must match | Verified P0-000, GOV-* |

---

## D. Spec vs governance

| Check | Result |
|-------|--------|
| Routes in governance match `06 §1` | OK |
| Env keys in validation G8 vs `02 §3` | OK |
| Governance does not override spec authority | OK — hierarchy preserved in rules §4 |

---

## Summary

| Metric | Count |
|--------|-------|
| Critical contradictions | 0 (after fix) |
| Medium drift items | 1 (path split — resolved by GOV-005 layout) |
| Low terminology items | 3 (documented, acceptable) |

**Status:** PASS after GOV-005 patches
