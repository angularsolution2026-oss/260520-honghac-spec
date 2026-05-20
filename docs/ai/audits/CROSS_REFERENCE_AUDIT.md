# Cross-Reference Audit — GOV-005

**Date:** 2026-05-16 | **Method:** Inventory + path grep + manual spot-check

---

## A. Broken references (pre-fix)

| Reference | Issue | Status |
|-----------|-------|--------|
| `docs/ai/AI_ONBOARDING.md` | File moved | **Stub** → `.ai/onboarding/AI_ONBOARDING.md` |
| `.ai/rules.md` (flat) | File moved | **Removed stub** → use `.ai/core/rules.md` |
| `docs/ai/tasks/P0-000.*` | Moved | **Stub** → `.ai/tasks/` |
| `../../../.ai/core/done-criteria` in validation report | Wrong depth | **Fixed** → `../core/done-criteria.md` |
| `../TASK_GRAPH.md` in P0-000 plan | Wrong relative | **Fixed** → `../planning/TASK_GRAPH.md` |

**Spec references:** All `docs/spec/*.md` files present (18 + website-structure). **No broken spec paths.**

---

## B. Version drift

| Artifact | Version | Aligned? |
|----------|---------|----------|
| `rules.md` | 1.3 | Yes |
| `orchestration.md` | 1.2 (GOV-004) | Yes — includes HANDOFF_MERGE, RUNTIME_UI_PASS |
| `agents.registry.md` | 1.1 | Yes |
| `FILE_OWNERSHIP_MAP` | 1.1 (GOV-003) | OK |
| Runtime docs | 1.0 (GOV-004) | OK |
| Spec set | 3.0 | Consistent |
| `starter-manifest` | GOV-005 | Updated |
| `P0-000.plan` workflow | — | **Fixed** to match orchestration |

**Deprecated states:** None found (no `PARALLEL_MERGE` or old AUTO_FIX limits).

---

## C. Circular governance chains

| Chain | Circular? | Verdict |
|-------|-----------|---------|
| Onboarding → rules → onboarding | No — one-way |
| Onboarding → runtime → onboarding | **Risk** — parallel task adds runtime reads | **OK** — optional branch only |
| LOCALHOST → orchestration → LOCALHOST | Reference loop | **OK** — not circular read mandate |
| CONTEXT_BUDGET → AI_ONBOARDING → CONTEXT_BUDGET | Mutual cite | **OK** — budget selects depth |

**Rule added (CONTEXT_ROUTING_MATRIX):** Agents must not read full runtime pack for non-UI tasks.

---

## D. Redirect stub coverage

| Old path | Stub? |
|----------|-------|
| All moved `docs/ai/*.md` (20 files) | Yes |
| Flat `.ai/*.md` (8 files) | Removed on 2026-05-18; canonical paths live under `.ai/{core,registry,state,manifest}` |
| `docs/ai/tasks/*` (3 files) | Yes |

---

## E. Internal `.ai/` relative links

Spot-check after move:

| From | To | OK? |
|------|-----|-----|
| `onboarding/AI_ONBOARDING.md` | `.ai/core/rules.md` | Yes (absolute-style) |
| `tasks/P0-000.plan.md` | `../planning/TASK_GRAPH.md` | Yes |
| `governance/KFP` | `ARCHITECTURE_IMMUTABLES` | Yes (same folder refs) |

---

## Summary

| Check | Result |
|-------|--------|
| Broken paths | 0 after GOV-005 + stubs |
| Version drift | 0 critical |
| Circular mandates | 0 blocking |
| Spec integrity | Intact — not moved |

**Note:** Bulk path update caused temporary encoding corruption — **repaired** with `ftfy` during GOV-005 execution. Future edits: use UTF-8-safe tooling only.
