# Migration Plan — GOV-005

**Date:** 2026-05-16 | **Type:** Governance restructure (no product code)

---

## 1. Files moved

### `.ai/` (canonical)

| New path | Former path |
|----------|-------------|
| `.ai/core/rules.md` | `.ai/rules.md` |
| `.ai/core/orchestration.md` | `.ai/orchestration.md` |
| `.ai/core/done-criteria.md` | `.ai/done-criteria.md` |
| `.ai/core/quality-gates.md` | `.ai/quality-gates.md` |
| `.ai/registry/agents.registry.md` | `.ai/agents.registry.md` |
| `.ai/registry/skills.registry.md` | `.ai/skills.registry.md` |
| `.ai/state/task-state.md` | `.ai/task-state.md` |
| `.ai/manifest/starter-manifest.md` | `.ai/starter-manifest.md` |
| `.ai/governance/*.md` | `docs/ai/{ARCHITECTURE_IMMUTABLES,AGENT_HANDOFF,...}.md` |
| `.ai/runtime/*.md` | `docs/ai/{BROWSER_AUTOMATION,UI_EXPLORATION,...}.md` |
| `.ai/planning/*.md` | `docs/ai/{TASK_GRAPH,PHASE_PLAN,...}.md` |
| `.ai/onboarding/*.md` | `docs/ai/{AI_ONBOARDING,CONTEXT_BUDGET,...}.md` |
| `.ai/tasks/P0-000.*` | `docs/ai/tasks/P0-000.*` |
| `.ai/evidence/runtime/` | `docs/ai/evidence/runtime/` |
| `.ai/evidence/regression/` | `docs/ai/evidence/regression/` |

### `docs/ai/` (retained)

| Path | Role |
|------|------|
| `docs/ai/INDEX.md` | Human index |
| `docs/ai/audits/*` | GOV-005 audit reports |
| `docs/ai/EXECUTIVE_SUMMARY.md` | Decision brief |
| `docs/ai/GOVERNANCE_HEALTH_REPORT.md` | Scores |
| `docs/ai/MIGRATION_PLAN.md` | This file |
| `docs/ai/CONTEXT_ROUTING_MATRIX.md` | Read routing SSOT |
| `docs/ai/*.md` stubs | Redirect to `.ai/` |

### Unchanged

- `docs/spec/**` — product SSOT, not moved
- `HANDOFF.md` — root human entry (paths updated)

---

## 2. References updated

- Bulk path replace across all `*.md` in repo
- Manual fixes: `P0-000.plan` workflow, validation report link, `rules.md` GOV-005 gate
- Encoding repair: `ftfy` on affected UTF-8 Vietnamese files

---

## 3. Deprecated / removed

| Path | Use instead |
|------|-------------|
| `docs/ai/AI_ONBOARDING.md` (stub) | `.ai/onboarding/AI_ONBOARDING.md` |
| `.ai/rules.md` (removed stub) | `.ai/core/rules.md` |
| `.ai/orchestration.md` (removed stub) | `.ai/core/orchestration.md` |
| `.ai/done-criteria.md` (removed stub) | `.ai/core/done-criteria.md` |
| `.ai/quality-gates.md` (removed stub) | `.ai/core/quality-gates.md` |
| `.ai/agents.registry.md` (removed stub) | `.ai/registry/agents.registry.md` |
| `.ai/skills.registry.md` (removed stub) | `.ai/registry/skills.registry.md` |
| `.ai/task-state.md` (removed stub) | `.ai/state/task-state.md` |
| `.ai/starter-manifest.md` (removed stub) | `.ai/manifest/starter-manifest.md` |

---

## 4. Merge recommendations

| Candidate | Action | Justification |
|-----------|--------|---------------|
| `starter-manifest` + `HANDOFF` | **Do not merge** | Different audience |
| `CONTEXT_BUDGET` + `CONTEXT_ROUTING_MATRIX` | **Cross-link only** | Budget = size; matrix = file list |
| KFP + ROLLBACK triggers | **Do not merge** | Different lifecycle |

---

## 5. Cleanup recommendations

| Item | Priority |
|------|----------|
| Add B8 MCP-unavailable to `BROWSER_AUTOMATION_RULES.md` | Low |
| Remove duplicate GOV-003 line in `task-state.md` history | Low |
| Flat `.ai/*.md` redirect stubs | **Done** — removed 2026-05-18 after `tools/cau_dao.py` made entrypoints explicit |
| Add `GOV-005` to `DECISION_LOG.md` | Done in this migration |

---

## 6. Rollback of migration

If layout must revert:

1. Move files back from `.ai/*/` to flat paths per table §1 (reverse)
2. Restore `docs/ai/` full files from `.ai/` copies
3. Remove stubs
4. Re-run path replace inverse

**Not recommended** — canonical folder layout is the forward-safe layout.

---

## 7. Task tracking

| Task | Status |
|------|--------|
| GOV-005 governance stabilization | `done` (this migration) |
| P0-000 scaffold | Unchanged — still `blocked` CP-0 |
