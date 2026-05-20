# FINAL_SPEC — Hồng Hạc City Complete Reference

**Status:** ACTIVE | **Last updated:** 2026-05-19 | **Authority:** Canonical source

---

## What is this?

**FINAL_SPEC** consolidates 115+ spec, governance, and planning files into **8 canonical documents**. No duplicates, no diffs, no conflicts.

- **Old structure:** `docs/spec/` (19 files) + `docs/ai/` (30+ files duplicate) + `.ai/` (40+ files governance) = 100+ files, conflicts galore
- **New structure:** 8 focused files = single source of truth (SSOT)

Old files remain for historical reference. **This folder is the truth.**

---

## Start here

**If you're a developer:** Read in this order:
1. [PRODUCT_LAW.md](#productlawmd) — What we're building
2. [TECH_STACK.md](#techstackmd) — How we're building it
3. [ROUTES_API.md](#routesapimd) — Where everything goes
4. [DATABASE.md](#databasemd) — Where data lives

**If you're an AI agent:** Read in this order:
1. [GOVERNANCE.md](#governancemd) — How you work
2. [DECISIONS.md](#decisionsmd) — What was approved
3. [GAP_TRACKER.md](#gaptrackermd) — What's left

---

## File guide

### PRODUCT_LAW.md

**What:** Core product definition, user journey, positioning, source trust rules, navigation.

**Contains (consolidated from 00, 01, 08, 09, 13, 14, 15, website-structure):**
- Core product: Interactive Urban Decision Map (`/sa-ban`)
- User journey: Wonder → Explore → Interact → Understand → Compare → Trust → Follow → Convert
- Brand: Decision platform (not brochure, not sales funnel)
- Source trust tiers (Tier 1 = official, Tier 5 = forbidden)
- Top navigation structure
- Route priority matrix
- Glossary (SSOT terms)
- Schema markup rules
- Content governance
- Legal + PII boundaries

**Who needs it:** Everyone (decisions are here)

---

### TECH_STACK.md

**What:** Technology choices, environment variables, performance targets, quality gates.

**Contains (consolidated from 02, 07, 11, 12, 16):**
- Framework: Next.js 15 App Router, TypeScript strict, Tailwind CSS
- Stack table (all tools)
- Environment variables (all 29)
- Performance targets (Core Web Vitals, Lighthouse CI)
- Bundle budgets
- Quality gates (typecheck, lint, build, verify)
- Security headers (CSP, X-Frame-Options, etc.)
- Cron jobs + async contracts
- Feature flag strategy

**Who needs it:** Developers, DevOps, QA

---

### DATABASE.md

**What:** Data model, schema, dual-database SSOT, field enums.

**Contains (from 05, 10):**
- Dual database rule: Firestore = leads; Payload = content
- Firestore collections: `leads`, `submission_idempotency`, `tile_access_jtis`, `bank_rates`
- Payload collections: `inventory_lots`, `phases`, `articles`, `media`
- All field enums (lead_status, lead_source, product_type, etc.)
- Lead scoring breakdown
- Idempotency contract
- Admin permissions + RBAC

**Who needs it:** Backend devs, database engineers, API designers

---

### ROUTES_API.md

**What:** Route tree, API contracts, error envelopes.

**Contains (from 06, 08):**
- Route tree (all groups: marketing, compliance, admin, broker, api)
- Route → component mapping
- API endpoints (GET/POST contracts, params, responses)
- Lead form endpoint spec (LCP form location, mobile vs desktop)
- Error envelope format
- CTA canonical language (4 types)
- Form validation rules
- Lead intent matching (persona, product, budget)

**Who needs it:** Frontend devs, API engineers, QA

---

### GOVERNANCE.md

**What:** How AI agents work, file ownership, approval gates.

**Contains (from .ai/core/, .ai/governance/):**
- Mandatory entry: `/plan` (plan mode before code)
- Core product rule (map-first, decision platform)
- Architecture immutables (10 boundaries)
- File ownership map (who can edit what)
- No architecture rebuild rule
- Known failure patterns (KFP-001 through KFP-X)
- Agent handoff protocol
- Rollback policy (when to revert)

**Who needs it:** AI agents, orchestrators, reviewers

---

### DECISIONS.md

**What:** Human-approved decisions that changed spec or closed gaps.

**Contains (from .ai/planning/DECISION_LOG.md):**
- All DEC-### entries (newest first)
- Context, decision, spec impact, approval chain
- Related gaps

**Latest:**
- **DEC-022** (2026-05-19): COMPANY_NAME = CĐT legal entity, not PMH
- **DEC-017** (2026-05-18): Top nav = "Sa bàn" not "Sa bàn AI"
- **DEC-016** (2026-05-18): Removed duplicate `.ai/` redirect stubs

**Who needs it:** Architects, decision-makers, compliance

---

### GAP_TRACKER.md

**What:** Known gaps (missing features, data, assets) and their status.

**Contains (from .ai/planning/GAP_REGISTER.md):**
- All GAP-### entries (closed + open)
- Blocker type (CONTENT, DATA, ASSET, CODE, TOOLING)
- Assigned to
- Planned closure date

**Current status:**
- **Closed:** GAP-1, GAP-2, GAP-5 (env, company name, etc.)
- **Open:** GAP-X (Phase 0 blockers, external service integrations)

**Who needs it:** Product managers, orchestrators, Phase planners

---

## Key constraints (read these!)

1. **Interactive Urban Decision Map** is the center. All routes, CTAs, content, analytics must serve `/sa-ban`.

2. **No architecture rebuild.** Immutables are locked (dual database, map isolation, route groups). Change requires DECISION.

3. **Dual database SSOT:**
   - **Firestore:** leads (ops truth)
   - **Payload:** content, inventory, articles (editorial truth)

4. **Map isolation:** MapLibre + PMTiles on `/sa-ban` only. Never import globally.

5. **Source trust tiers:** Public = Tier 1 (official) or Tier 3 (media). Tier 2 (internal) = hidden logic only.

6. **No fake urgency.** "Đăng ký ngay" forbidden. Decision platform tone.

7. **No PII in analytics.** Phone, email → Firestore encrypted only. GA4/GTM get booleans/tiers.

8. **Idempotent leads.** `client_request_id` (UUIDv4) prevents duplicates.

---

## File ownership

| File | Owner | Can edit |
|------|-------|----------|
| PRODUCT_LAW.md | Product | Issues, marketing, copy |
| TECH_STACK.md | Tech lead | Architects, backend, DevOps |
| DATABASE.md | Database lead | Schema, migrations |
| ROUTES_API.md | Frontend lead | Route tree, API contracts |
| GOVERNANCE.md | Process owner | Orchestrators, QA |
| DECISIONS.md | Approval chain | Documented decisions only |
| GAP_TRACKER.md | Orchestrator | Status updates only |

---

## How to use FINAL_SPEC

1. **Reference:** Link to this folder, not `docs/spec/` or `docs/ai/`
2. **Update:** If you find a gap or inconsistency, file an issue with context
3. **Never revert to old structure:** `docs/spec/*` and `docs/ai/*` are historical; FINAL_SPEC is canonical
4. **Lint:** Each file has a frontmatter version/status; bump when you change content

---

## Next steps

- **Phase 0:** Await CP-0 approval, then run `create-next-app` per `FINAL_SPEC/TECH_STACK.md`
- **Handoff:** Use `.ai/onboarding/AI_ONBOARDING.md` + link to FINAL_SPEC
- **Consistency:** All new docs must consolidate into FINAL_SPEC, not duplicate elsewhere

---

**Questions?** Start with the file guide above. Everything is here.
