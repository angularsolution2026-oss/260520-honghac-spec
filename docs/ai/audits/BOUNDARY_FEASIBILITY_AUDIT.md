# Boundary & Feasibility Audit — GOV-005

**Date:** 2026-05-16

---

## A. Boundary ambiguity

| Boundary | Agents | Clarity | Resolution |
|----------|--------|---------|------------|
| QA vs Performance | QA = walkthrough, visual, Playwright; Perf = Lighthouse, DevTools, CLS | Medium → **Clear** in `agents.registry` v1.1 |
| QA vs Content Verifier | Visual "brochure smell" — QA flags, Content adjudicates copy | Documented in `VISUAL_REVIEW_CRITERIA` §6 |
| Frontend vs SEO | `page.tsx` body vs `generateMetadata` | `FILE_OWNERSHIP_MAP` zones |
| Architect vs Orchestrator | Architect REVIEW_VERDICT; Orchestrator MARK_COMPLETE | OK |
| `CURRENT_ARCHITECTURE` vs `SPEC_DIGEST` | Memory vs condensed law | **Clarified:** digest = read spec fast; architecture = repo reality post-scaffold |
| `AI_ONBOARDING` vs `rules.md` | Onboarding = read order; rules = law | OK after GOV-005 routing matrix |
| Orchestrator vs subagents | Orchestrator only merges; no direct subagent chat | `AGENT_HANDOFF_PROTOCOL` §1 |

**Overlap risk:** `tailwind.config` Lane A vs B — **feasible** via merge waves (documented).

---

## B. Unrealistic requirements

| Requirement | Feasible? | Note |
|-------------|-----------|------|
| Full `/localhost-runtime-pass` every governance edit | No | N/A for governance-only tasks |
| 14 files minimum read every session | Was heavy | **Mitigated** by CONTEXT_ROUTING_MATRIX packs (6–20 files) |
| 3 viewports × 25 routes × 3 screenshots | High volume | Capped by BROWSER_AUTOMATION (max routes, screenshots) |
| Luxury audit on stub `null` pages | No | Phase 0 exception documented |
| Human approval per gap | Yes | Required by design |
| HANDOFF_PACKET every lane every time | Yes | Overhead acceptable for parallel safety |

**Verdict:** System is operable with routing matrix; not over-constrained for Phase 0.

---

## C. Weak acceptance criteria

| Criterion | Weakness | Hardening |
|-----------|----------|-----------|
| "Luxury calm feeling" | Subjective | `VISUAL_REVIEW_CRITERIA` PASS/WARNING/FAIL tables + forbidden patterns |
| "Brochure smell" | Subjective | Auto-FAIL list (countdown, price-first hero, etc.) |
| "Map-centric" | Partially measurable | ≤2 clicks to `/sa-ban`; P0 route tier |
| `RUNTIME_REPORT overall: pass` | Needs fields | YAML template with required keys |
| Governance task done | Was vague | done-criteria §9 checklist |

**Measurable indicators added (GOV-004/005):**

- Lighthouse ≥ 90 (numeric)
- Zero critical console errors
- Horizontal scroll V-M = FAIL
- KFP pattern IDs for failures

---

## D. Autonomous behavior risks

| Risk | Control |
|------|---------|
| Silent scaffold | CP-0 + rules §14 |
| Crawler behavior | BROWSER_AUTOMATION rate limits |
| Destructive clicks | BROWSER_AUTOMATION §3 |
| Architecture drift | ARCHITECTURE_IMMUTABLES + REVIEW_VERDICT |

---

## Summary

| Area | Status |
|------|--------|
| Agent boundaries | PASS with registry v1.1 |
| Feasibility | PASS for Phase 0; runtime pack deferred to Phase 1+ |
| Acceptance criteria | PASS after VISUAL_REVIEW + RUNTIME_REPORT template |
| Autonomous safety | PASS |
