# 17 - Launch Data Readiness (Hong Hac City)

**Version:** 1.0 | **Last updated:** 2026-05-18 | **Status:** Approved
**Authority:** Defines the minimum data, assets, fixtures, and external-service modes required before any agent may claim "run-ready", "public launch ready", or "production ready".

---

## §1. Purpose

The website must not become "code complete but unusable". This file closes that gap.

An AI coding agent may finish a phase only when it separates these four states:

| State | Meaning |
|---|---|
| `Implementation PASS` | Code is implemented, integrated, and tested for the scoped phase |
| `Demo Run PASS` | The app can run locally/staging with approved fixtures or live data |
| `Live Content Ready` | CMS/public content, source citations, approved media, and external data are available |
| `Public Launch Ready` | Implementation, data, content, assets, SEO, performance, and runtime verification all pass |

`Implementation PASS` is not the same as `Public Launch Ready`.

---

## §2. Run Modes

Every feature that depends on external data must declare and support one of these modes:

| Mode | Purpose | Allowed data source | Public launch? |
|---|---|---|---|
| `local-demo` | Developer/demo run on local machine | seed fixtures + test credentials | No |
| `staging` | QA before production | staging Firebase/Payload + approved test data | No |
| `production` | Public website | live CMS/Firebase + approved public content | Yes |

Required env:

```env
NEXT_PUBLIC_RUN_MODE=local-demo|staging|production
```

Rules:

- `local-demo` must never require real customer PII.
- `staging` must use test accounts and test leads only.
- `production` must not use demo fixtures for public-facing facts, prices, bank rates, inventory, progress, or legal claims.
- If `NEXT_PUBLIC_RUN_MODE` is missing, the app must default to safe behavior and must not claim production readiness.

---

## §3. Required Launch Data Pack

Before a route can be marked `FULL`, the required data pack for that route must exist either as approved live data or as an explicitly labeled demo fixture.

Recommended fixture paths:

```text
data/seeds/bank-rates.demo.json
data/seeds/inventory-lots.demo.json
data/seeds/phases.demo.json
data/seeds/progress.demo.json
data/seeds/media-assets.demo.json
data/seeds/authors.demo.json
data/seeds/admin-users.demo.json
data/seeds/tier-sources.demo.json
data/seeds/lead-test-data.demo.json
```

Fixture rules:

- Demo fixtures must be clearly labeled as demo/test data in code and UI where user-facing.
- Demo fixtures may support `local-demo` and `staging`.
- Demo fixtures must not silently power `production`.
- Any fixture claim shown publicly must still obey `00 §4` and `15`.

---

## §4. Route Data Requirements

| Route | Minimum data/assets needed for `FULL` |
|---|---|
| `/` | Homepage 11 decision-platform sections, first-viewport SaBanPreview, valid CTAs, disclosure, source-safe claims, lead magnet asset or honest non-download CTA |
| `/kham-pha-do-thi` | Six P1 content pillars, source-safe references, decision links, no unsupported metrics |
| `/sa-ban` | Sprint 1A shell: SaBanPreview/fallback/instrumentation; Sprint 1B full: map manifest, lot geometry/data, current collection block, safe status labels, fallback when map data is unavailable |
| `/sa-ban/[lot-id]` | Valid lot ID, whitelist fields from `00 §4.2`, noindex policy when thin, lead CTA |
| `/tiem-nang` | P1 content pillars, Tier 1/3 citations for FDI/infrastructure claims, no invented ROI or appreciation claims |
| `/tien-do` | Timeline content, progress source notes, media slots or approved images, no specific handover promise unless verified |
| `/phong-cach-song` | Lifestyle pillars, approved images/media slots, no stock-like misleading content |
| `/phan-khu/hong-phat` | Subdivision overview, current release context, masterplan/media asset or CMS-ready slot, source-safe wording |
| `/bang-gia` | Safe price language, phase/policy context, no official-price claim unless Tier 1/2 allows display |
| `/phap-ly` | Tier 1/3 legal references, evidence links, disclaimer, no unsupported legal guarantee |
| `/tu-van` | Lead form, consent, Turnstile mode, success/error states, valid lead source |
| `/vay-mua` | Mortgage calculator, disclaimer, bank-rate data source or visible fallback band, lead capture |
| `/doi-tac` | Partner program content and distribution policy; otherwise `DEFERRED` or `PLACEHOLDER`, not `FULL` |
| `/roi` | ROI calculator and investment disclaimer; otherwise `DEFERRED` or hidden |
| `/blog` | Editorial content model, author, updated date, source rules; otherwise hidden/deferred |
| `/portals/admin/*` | Test admin users, role allowlist, 2FA path for `super_admin`, Firestore test data |

If a route has the right component structure but lacks required data/assets, status must be:

```text
Implementation PASS
Route Structure FULL or PARTIAL
Live Content Readiness BLOCKED
Public Launch Readiness NO
Blocker type: CONTENT / DATA / ASSET
```

---

## §5. External Service Readiness

| Service | Demo/staging requirement | Production requirement |
|---|---|---|
| Firebase Auth | test anonymous map auth + `admin_content` and `super_admin` users documented | real anonymous auth enabled for public map; real admin users provisioned, least privilege |
| Firebase App Check | debug/test mode documented for local/staging; enforcement can be off until metrics pass | enforced for `/api/tiles/token` and `/api/tiles/manifest`; failure path verified |
| Firestore leads | seed/test leads available | live collections and security rules verified |
| Payload CMS | fixtures or staging CMS entries | approved public entries, no draft leakage |
| Telegram | dry-run mode and live-mode smoke test without PII | hot/warm alert works, no PII, failure does not block lead save |
| Turnstile | test mode or bypass token for automated tests | live site key/secret, failure UI verified |
| GA4/GTM | debug mode with no PII | production tags verified, no PII |
| Sentry | DSN optional in local, test event allowed in staging | enabled and monitored |
| Lighthouse | local or CI path documented | mobile/desktop report collected or waiver recorded |
| PMTiles / GCS | local-demo fixture or disabled tile API stubs; private bucket path documented | private PMTiles bucket, signed URL smoke test, no public ACL/object exposure |
| Bank rates | fallback demo bands allowed | live `bank_rates` source or explicit public fallback disclaimer |

---

## §6. Required Evidence

Any claim of `Demo Run PASS`, `Live Content Ready`, or `Public Launch Ready` must include:

1. Run mode used.
2. Data source used: fixture, staging DB, or production DB.
3. Routes visited.
4. Browser actions performed.
5. Screenshots or Playwright evidence.
6. Console error summary.
7. Typecheck, lint, build results.
8. External service result: Telegram, Turnstile, Firebase/Auth, Firebase App Check, Firestore, Payload, PMTiles/GCS where relevant.
9. Remaining blockers classified as `CODE`, `CONTENT`, `DATA`, `ASSET`, `TOOLING`, or `HUMAN_DECISION`.

Forbidden final status:

- "Done, just needs content"
- "Production ready except data"
- "PASS with blocker"
- "Route FULL" when required live data/assets are missing and no approved fixture/fallback is declared

Allowed final status example:

```text
Phase 4 Implementation: PASS
Phase 4 P1 Structure: FULL
Phase 4 Demo Run: PASS
Phase 4 Live Content Readiness: BLOCKED
Public Launch Readiness: NO
Blocker type: CONTENT / DATA / ASSET
```

---

## §7. Agent Execution Rule

Before coding any phase or task, the agent must answer:

1. Which route/feature is in scope?
2. Which run mode is being verified?
3. Which data source will power it?
4. Which required fixture/live dataset is missing?
5. If missing, will the agent add an approved fixture, create a CMS-ready fallback, or mark the route blocked?

The agent must not ask the human to manually inspect every route after implementation. It must produce a route/data matrix and evidence package.

---

## §8. Data Source Routing Matrix

This table is the practical routing layer for data. It does not replace `00 §4`, `05`, `15`, or `website-structure.md`; it tells agents which source to use for each feature and what to do when data is missing.

| Feature / route | Public data source | Operational source | Approval gate | Fallback / blocked state |
|---|---|---|---|---|
| Homepage `/` | Payload CMS sections + Tier 1/3 citations where facts appear | — | `claim_status = approved_public`; images `approvedForPublic` | Safe copy + CMS media slot; not `Public Launch Ready` if lead magnet/media missing |
| Legal `/phap-ly` | Tier 1 official docs, Tier 3 context, Fact Ledger | Payload CMS legal content | All claims cited; disclaimer visible | Source pending block; no unsupported legal guarantees |
| Pricing `/bang-gia` | Public-safe price policy copy only | Tier 2/internal price references; `bank_rates` where relevant | Tier 2 must not render as official public fact | Safe wording: contact for current stage; no official-price claim |
| Urban / lifestyle pillars | Payload CMS content + Tier 1/3 citations for factual claims | CMS media/GCS | `approved_public`; images `approvedForPublic` | Abstract/CMS media slot + source pending note |
| Investment `/tiem-nang` | Tier 1/3 citations for infrastructure, FDI, market claims | Payload CMS articles/pages | Fact Ledger required | No invented metrics, ROI, appreciation, or yield |
| Progress `/tien-do` | Official/proven progress references + approved media | Payload CMS progress entries/media | Progress claims must cite source; media approved | Text-only progress summary + media slot; no handover promise |
| Subdivision `/phan-khu/hong-phat` | Tier 1 subdivision facts + approved masterplan/media | Payload inventory/phases/media | Tier 1 for core fields; media approved | Safe-default summary + noindex if thin |
| Hong Thinh / Hong Phuc | Tier 1 data only | Payload inventory/phases | Implement only when Tier 1 data exists | `DEFERRED` or hidden; not placeholder in primary nav |
| Sa ban `/sa-ban` | Approved map/lot data suitable for public advisory view | Payload inventory_lots, phases; PMTiles/GCS; Firebase Anonymous Auth; App Check | Tier 1 for displayed lot identity/core fields; App Check/Auth/token/manifest checks pass in protected mode | Sprint 1A: shell/fallback + tile API stubs deny-by-default. Sprint 1B: map fallback, safe status labels, signed manifest, no public inventory/price claim |
| Lot detail `/sa-ban/[lot-id]` | Whitelisted Tier 1 fields from `00 §4.2` | Payload inventory_lots | Valid lot ID + enough whitelist fields | Invalid -> 404; thin -> safe-default + `noindex` |
| Mortgage `/vay-mua` | Reviewed bank-rate bands or explicit public fallback | `bank_rates` collection | `review_status = current`, not expired | Fallback 7-12% band + disclaimer + warning log |
| ROI `/roi` | Scenario assumptions with investment disclaimer | Future calculator config | P2 only; no guaranteed return | `DEFERRED`/hidden until implemented |
| Blog `/blog/[slug]` | Payload article with Fact Ledger | Payload CMS | `claim_status = approved_public`; author assigned | Draft/review -> `noindex`; blog hidden if too few articles |
| Comparison pages | Tier 1/3 sources for both compared sides | Payload CMS comparison content | Neutral copy + Fact Ledger + disclaimer | `DEFERRED` until both sides are source-verified |
| Lead forms | User-submitted data only | Firestore `leads`, `submission_idempotency` | Consent + Turnstile + server validation | Inline error/offline state; no hidden queue in Sprint 1A |
| Admin leads | — | Firestore leads SSOT | RBAC, PII mask, audit log | Do not read Payload mirror as lead SSOT |
| Admin content | Payload CMS | Payload CMS | Claim review flow; cannot publish Tier 2 as public fact | Revalidate only after approved content |
| Admin inventory | Payload inventory_lots/phases | Payload CMS; audit log | Role guard + status history | Soft delete only; revalidate affected map/lot pages |
| PII reveal | — | Firestore encrypted lead fields | Confirm action + audit log | Mask by default; block without reason/audit |
| Telegram alerts | Lead metadata only | Firestore lead score/routing metadata | No PII; score tier only | Failure logs Sentry; lead save must still succeed |
| Analytics GA4/GTM | Behavior/event metadata only | Consent state + dataLayer | No PII; consent-gated | If no consent, block analytics tags |
| Sentry | Error/performance telemetry without PII | App runtime | No secrets/PII in logs | Always allowed for errors under legitimate interest |
| Tile token / manifest APIs | Public-safe layer metadata only | Firebase Auth, App Check, Firestore `tile_access_jtis`, GCS signed URLs | `MAP_TILES_ACCESS_MODE=protected`, scoped JWT, JTI not revoked, no PII, no internal layer in public scope | If disabled/missing mode: `403 forbidden` envelope + `no-store`; if dependency unavailable: degraded map fallback |
| Turnstile | Verification token | Cloudflare Turnstile server verify | Required for lead submit | 403 + retry message |
| Schema JSON-LD | Visible page content only | Payload/inventory/env | Render conditions in `14`; source/visibility gates pass | Skip schema block; never render partial misleading schema |
| Sitemap/indexing | Approved routes/content only | Route matrix + Payload status | No noindex/placeholder/demo fixture pages | Omit empty child sitemap; hidden/deferred not indexed |
| Images/media | Approved CMS media/GCS assets | Payload media + GCS | `approvalStatus = approvedForPublic` | Premium placeholder + caption, not launch-ready if required media missing |
| PDF/lead magnet | Approved downloadable asset | GCS private bucket + signed URL | Asset approved; lead capture rules pass | Save lead, show "will send via Zalo" if signed URL fails |
| Admin users / 2FA | — | Firebase Auth + Firestore admin 2FA records | Role allowlist; `super_admin` TOTP verified | Phase remains partial until test account/bootstrap path exists |

Rules:

- Public content must come from Tier 1/Tier 3 approved sources or CMS entries with `approved_public` status.
- Internal sales data may support advisory logic, scoring, routing, and admin workflows, but must not be displayed as official public fact unless explicitly approved and source-tagged.
- Firestore is the source of truth for leads, sessions, auth-adjacent operational state, audit logs, SLA/routing, and security telemetry.
- Payload CMS is the source of truth for public content, inventory, phases, articles, media, progress, and editorial source citations.
- GCS stores private PDFs, PMTiles, and media binaries; the public app must use signed/approved access paths.
- Public map tiles must contain only public-safe data. Internal price, reservation/deposit details, customer data, broker/sales notes, CRM IDs, raw telemetry IDs, and unapproved legal/progress claims must never be present in public tile payloads.
- `/sa-ban` must not become login-only. Public users use Firebase Anonymous Auth + App Check; visible CAPTCHA/Turnstile is reserved for suspicious behavior or lead submit, not default map view.
- If a feature's required source is unavailable, the agent must choose one of: approved fixture for `local-demo`, CMS-ready fallback, `DEFERRED`, `HIDDEN`, `noindex`, or `BLOCKED`. It must not invent data.
