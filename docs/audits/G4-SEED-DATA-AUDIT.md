# G4 Seed Data — Audit Report

**Date:** 2026-05-19
**Scope:** [data/seeds/](../../data/seeds/) — 9 JSON file + README
**Authority:** [05](../spec/05-database-schema.md) · [17 §3, §8](../spec/17-launch-data-readiness.md) · [00 §4](../spec/00-master-instruction.md)

---

## §0. TL;DR

**Pre-code status: ✅ PASS** — 9 file valid JSON, đủ shape để `local-demo` mode chạy, enum khớp spec sau khi đã fix 2 violation lần audit này.

**Production readiness: ❌ NOT YET** — vẫn cần thay bằng Tier 1 data thật (inventory CĐT, ảnh approved, 2 source Tier 3 cho Vành đai 4 / FDI Samsung).

**Risk score:** Cat 13 Real-time Inventory sẽ ở **~7.5/10** với data hiện tại, đủ ≥6 để **không block deploy** ([16 §2](../spec/16-scoring-quality-gate.md)).

---

## §1. JSON Validation

| File | JSON valid | Shape khớp spec | Records | Notes |
|---|---|---|---|---|
| `admin-users.demo.json` | ✅ | ✅ [03 §1](../spec/03-user-roles-permissions.md) | 4 users | super_admin + admin_content + 2 sales_agent |
| `authors.demo.json` | ✅ | ✅ [05 §3.3](../spec/05-database-schema.md) | 1 author | Ngô Kim Quyên, photo `approvedForPublic` |
| `bank-rates.demo.json` | ✅ | ✅ [05 §2.5](../spec/05-database-schema.md) | 3 rates + fallback band | Short 5.5-7.5%, Mid 8.5-10.5%, Long 10-12.5%, fallback 7-12% |
| `inventory-lots.demo.json` | ✅ | ✅ [05 §3.1](../spec/05-database-schema.md) | 8 lots | All hong_phat, 4 status đại diện |
| `lead-test-data.demo.json` | ✅ | ✅ [05 §2.1](../spec/05-database-schema.md) | 3 leads | 1 hot + 1 warm + 1 junk |
| `media-assets.demo.json` | ✅ | ✅ [15 §3](../spec/15-content-governance.md) | 6 media | 4 approved + 2 pending |
| `phases.demo.json` | ✅ | ✅ [05 §3.2](../spec/05-database-schema.md) | 3 phases | hong_phat current+upcoming, hong_thinh upcoming |
| `progress.demo.json` | ✅ | ✅ | 4 milestones | 3 Tier 1 + 1 Tier 3 pending URL |
| `tier-sources.demo.json` | ✅ | ✅ [15 §1.2](../spec/15-content-governance.md) | 7 sources | 5 Tier 1 (Nomura cross-verified) + 2 Tier 3 pending URL |

**Total:** 9/9 ✅

---

## §2. Issues Found & Fixed (this audit)

| # | File | Issue | Severity | Fix applied |
|---|---|---|---|---|
| 1 | `progress.demo.json` | 3 milestone dùng `tier_1_source_required` — **không thuộc enum** [00 §4.1](../spec/00-master-instruction.md) | **HIGH** — block schema validation | Đổi sang `tier_1_official_verified` (enum hợp lệ) |
| 2 | `progress.demo.json` | 1 milestone (Vành đai 4) dùng `tier_3_source_required` | HIGH | Đổi sang `tier_3_media_verified` + thêm `verification_status: pending_url` để rõ ràng |
| 3 | `tier-sources.demo.json` | 3 chỗ dùng `tier_3_source_required` | HIGH | Cùng fix như trên |

**Sau fix:** 0 enum violation. Toàn bộ Tier field khớp [00 §4.1](../spec/00-master-instruction.md).

---

## §3. Inventory Coverage Analysis

### §3.1. 8 lots hiện tại

| Status | Count | Note |
|---|---:|---|
| `available` | 3 | Render xanh trên map |
| `holding` | 1 | Render vàng |
| `deposited` | 1 | Render cam |
| `sold` | 1 | Render xám |
| `unknown` | 1 | Test safe-default rendering |
| `stale` | 1 | Test "Cần xác nhận" label |
| **Total** | **8** | Đủ test mọi color trong [05 §4.6 lot legend](../spec/05-database-schema.md) |

### §3.2. Schema eligibility ([09 §4.3 RealEstateListing](../spec/09-seo-strategy.md))

Cần đủ 5 Tier 1 fields: `lot_code`, `phan_khu_name`, `product_type`, `area_range_min/max`, `legal_status_summary`.

| Lot | Eligible | Action |
|---|---|---|
| hp-a-01, hp-a-02, hp-b-01, hp-b-02, hp-c-01, hp-c-02 | ✅ (6 lots) | Render full schema |
| hp-d-01 | ❌ thiếu `legal_status_summary` | ThinContentPolicy → safe-default + `noindex` |
| hp-d-02 | ❌ thiếu area + legal | ThinContentPolicy → safe-default + `noindex` |

→ **Đúng spec.** 2 lot thin test được null-state policy.

### §3.3. Coverage gap

| Dimension | Coverage hiện tại | Gap | Production action |
|---|---|---|---|
| Product type | 5/6 enum (`nha_pho`, `biet_thu`, `shophouse`, `lien_ke`, `khac`) | Thiếu `dat_nen` | OK cho demo. Production: cần ≥1 lô mỗi loại CĐT phát hành |
| Phân khu | Chỉ `hong_phat` (8/8) | Không có `hong_thinh`/`hong_phuc` | Đúng spec — 2 phân khu kia DEFERRED ([17 §8](../spec/17-launch-data-readiness.md)) |
| Geo coords | 7/8 (lot stale null) | OK | Production: 100% Tier 1 lots phải có geo |
| Phase coverage | 1 phase (current) | 2 upcoming có shape nhưng không link tới lot | Production: lot phân bổ vào phase phù hợp |

---

## §4. Foreign Key Integrity

| Relationship | Check | Result |
|---|---|---|
| `inventory_lots.phase_id` → `phases.phase_id` | All 8 lots reference `01HZK0PHASE0001HONGPHAT` | ✅ 0 orphan |
| `authors.photo_media_id` → `media.media_id` | `ngokimquyen-portrait` exists in media | ✅ |
| `progress.source_id_ref` → `tier-sources.source_id` | `tier3-vnexpress-vanhdai4` exists | ✅ |
| `leads.routed_to_uid` → `admin-users.uid` | Hot lead routed to `demo-sales-quyen` | ✅ |

**Total FK violations:** 0

---

## §5. Tier Source Coverage

| Tier | Count | Real URL | Pending URL |
|---|---:|---:|---:|
| `tier_1_official_verified` | 5 | 5 | 0 |
| `tier_3_media_verified` | 2 | 0 | 2 |
| **Total** | **7** | **5** | **2** |

### §5.1. Tier 1 sources (5 — all verified)

| ID | URL | Supports claim |
|---|---|---|
| `tier1-honghac-official` | honghacphumyhung.vn | Project facts |
| `tier1-honghac-hongphat` | honghacphumyhung.vn/hongphat/ | Hồng Phát subdivision |
| `tier1-pmh-corporate` | phumyhung.vn/du-an/hong-hac-city/ | PMH brand |
| `tier1-honghac-pmh-nomura-jv` | honghacphumyhung.vn/phu-my-hung-va-nomura-cung-dau-tu-hong-hac-city/ | JV PMH × Nomura |
| `tier1-nomura-vn-hong-hac` | nomura-re-vn.com/du-an/hong-hac-city/ | Cross-verify JV |

### §5.2. Tier 3 sources pending (2)

| ID | Status | Used by | Production action |
|---|---|---|---|
| `tier3-vnexpress-vanhdai4` | `pending_url` | Progress milestone 4 + `/tiem-nang/vanh-dai-4` | Sales hoặc SEO specialist tìm URL VnExpress/Tuổi Trẻ về Vành đai 4 Thuận Thành |
| `tier3-bacninh-fdi` | `pending_url` | `/tiem-nang/bac-ninh-fdi` | Tìm URL báo chí về FDI Samsung Bắc Ninh |

> 2 source Tier 3 này **chỉ block** route `/tiem-nang/vanh-dai-4` và `/tiem-nang/bac-ninh-fdi` (P1 / Sprint 1B). **Không block** Sprint 1A core routes.

---

## §6. Media Assets

| ID | Approval | Production status |
|---|---|---|
| `hero-homepage` | `approvedForPublic` | OK với caption "Ảnh minh họa quy hoạch" |
| `ngokimquyen-portrait` | `approvedForPublic` (2026-05-19) | ✅ Uploaded |
| `lifestyle-family` | `pending_approval` | Fallback: `AbstractPlaceholder:lifestyle:4/3` |
| `lifestyle-green` | `pending_approval` | Fallback: `AbstractPlaceholder:urban:4/3` |
| `masterplan-197ha` | `approvedForPublic` | OK |
| `og-default` | `approvedForPublic` | OK |

**Block release?** Không. Mọi pending asset có `fallback` field → AbstractPlaceholder render được ([07 §12](../spec/07-ui-ux-design-system.md)).

---

## §7. Test Leads Coverage

| Tier | Lead | Lead source | Routing | Purpose |
|---|---|---|---|---|
| Hot (85) | LEAD0001 | homepage_hero | assigned to demo-sales-quyen | Test full pipeline + Telegram Hot alert |
| Warm (55) | LEAD0002 | vay_mua | unassigned | Test Warm alert + routing cron |
| Junk (15) | LEAD0003 | popup_fallback | unassigned | Test junk filter no-alert path |

→ Đủ để smoke test Telegram alert + Kanban + routing + SLA badges.

---

## §8. Production Readiness Gate

| Cat 13 sub-criterion ([16 §3.13](../spec/16-scoring-quality-gate.md)) | Max | Current | Production target |
|---|---:|---:|---:|
| Inventory data model implemented | 3 | **3.0** ✅ | 3.0 |
| Lot status live on map (color coding) | 3 | **2.5** (data đủ, code chưa) | 3.0 |
| Admin can update lot status | 2 | 0 (code chưa) | 2.0 |
| Status change history tracked | 2 | 0 (code chưa) | 2.0 |
| **Cat 13 total** | 10 | **5.5** (data layer only) | **10.0** sau Sprint 1B |

**Block deploy threshold:** < 6.0 ([16 §2](../spec/16-scoring-quality-gate.md)). Sau Sprint 1B code, Cat 13 sẽ đạt ≥7.5.

---

## §9. To-do trước launch production

### Must-have (block production)

- [ ] Inventory Excel/CSV từ CĐT — replace 8 demo lots bằng ≥50 lô Tier 1 thật
- [ ] Phase data Tier 1 — release_date, completion_date của Hồng Phát phase 1
- [ ] Progress milestones — 3-5 mốc thật có ngày + source verified
- [ ] Upload 2 lifestyle media → `approvedForPublic`
- [ ] Production admin users (Firebase Auth real) + 2FA cho super_admin
- [ ] Xóa `lead-test-data.demo.json` khỏi production seed loader

### Nice-to-have (Sprint 1B/2)

- [ ] Tier 3 source VnExpress Vành đai 4 (block `/tiem-nang/vanh-dai-4`)
- [ ] Tier 3 source FDI Samsung (block `/tiem-nang/bac-ninh-fdi`)
- [ ] Author 2 rotation
- [ ] Inventory mở rộng sang `hong_thinh`/`hong_phuc` khi Tier 1 ready

---

## §10. Conclusion

**G4 seed data layer = ✅ Pre-code ready.** Đủ cho:
- `local-demo` mode render homepage + `/sa-ban` shell + lot popup + author profile
- Test full lead pipeline (3 tier)
- Test bank_rates calculator với fallback
- Test schema eligibility (6 lots full schema + 2 lots ThinContentPolicy)
- Test Telegram alert dry-run
- Test admin Kanban với routing

**Không block CP-0.** Có thể approve scaffold ngay.
