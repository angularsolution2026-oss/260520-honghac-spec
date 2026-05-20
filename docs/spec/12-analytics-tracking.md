# 12 — Analytics & Tracking (Hồng Hạc City)

**Version:** 3.0 | **Last updated:** 2026-05-16 | **Status:** Approved

---

## §1. Analytics Stack

| Tool | Purpose | Config |
|---|---|---|
| GA4 | Pageviews, events, conversions | Via GTM, no PII |
| GTM | Tag management container | `NEXT_PUBLIC_GTM_ID` |
| Sentry | Frontend errors + performance traces | `NEXT_PUBLIC_SENTRY_DSN` |
| First-party telemetry | Security events (tile abuse) | `/api/security/telemetry` |

**Rules:**
- KHÔNG gửi raw `phone`, `email`, `full_name` sang GA4/GTM (xem `00 §6 Rule 7`)
- GA4 chỉ collect nếu `consent_analytics = true`
- Ads conversion (GCLID, FBCLID) chỉ gửi nếu `consent_marketing = true`

---

## §2. Event Taxonomy (Canonical SSOT)

### §2.1. Navigation Events

| Event | Parameters |
|---|---|
| `page_view` | `page_title`, `page_location`, `content_group` |
| `navigation_click` | `nav_item`, `destination` |
| `404_view` | `path_pattern` (sanitized regex — KHÔNG raw path) |

### §2.2. Lead Events (Bắt buộc Sprint 1A)

| Event | Trigger | Parameters |
|---|---|---|
| `lead_form_view` | Form enters viewport (Intersection Observer) | `surface`, `page_path` |
| `lead_form_start` | First field interaction | `surface`, `persona` |
| `lead_form_submit` | Submit button clicked | `surface`, `persona`, `has_phone`, `has_email` |
| `lead_submit_success` | Server returns 200 | `surface`, `persona`, `score_tier` |
| `lead_submit_error` | Server error hoặc validation fail | `surface`, `error_code` |

**Strict rules:**
- KHÔNG include `phone`, `email`, `full_name` trong bất kỳ event
- `score_tier` chỉ gửi `hot/warm/cold/junk` — KHÔNG gửi raw score number
- `has_phone` và `has_email` là boolean (không gửi giá trị actual)

### §2.3. Map Events

| Event | Parameters |
|---|---|
| `map_view` | `phase_highlighted` |
| `map_lot_click` | `lot_id_anonymous` (hash của lot_code — không raw) |
| `map_filter_apply` | `filter_type`, `filter_value` |
| `map_layer_toggle` | `layer_name`, `new_state` |
| `map_ai_matching_start` | `persona` |
| `map_ai_matching_result` | `lots_count` |

### §2.4. Calculator Events

| Event | Parameters |
|---|---|
| `calculator_start_mortgage` | `surface` |
| `calculator_submit_mortgage` | `surface`, `loan_term_band`, `rate_band` |
| `calculator_result_view_mortgage` | `affordability_tier` |
| `calculator_lead_submit_mortgage` | `surface`, `score_tier` |
| `calculator_start_roi` | `surface` |
| `calculator_submit_roi` | `surface`, `holding_period`, `scenario` |
| `calculator_result_view_roi` | `surface` |
| `calculator_lead_submit_roi` | `surface`, `score_tier` |

### §2.5. CRO Events

| Event | Parameters |
|---|---|
| `cta_click` | `cta_label`, `destination`, `surface` |
| `pdf_download_gate_view` | `doc_type`, `surface` |
| `pdf_download_success` | `doc_id`, `surface` |
| `exit_intent_shown` | `page_path` |
| `exit_intent_dismissed` | — |
| `exit_intent_converted` | `surface` |

### §2.6. Content Events

| Event | Parameters |
|---|---|
| `content_scroll_depth` | `section_name`, `depth_pct` (`25/50/75/100`) |
| `comparison_view` | `slug` |
| `faq_expand` | `question_id` |

### §2.7. Local SEO Events

| Event | Parameters | Source |
|---|---|---|
| `local_phone_call` | `source: local_phone_call` | Call tracking |
| `local_directions_click` | `source: local_directions_click` | GBP |
| `local_poi_click` | `poi_name`, `poi_category` (enum `05 §4.12`) | Map |

---

## §3. GTM DataLayer Contract

```javascript
// Standard push format
window.dataLayer.push({
  event: 'event_name',
  // Parameters — KHÔNG có PII
  surface: 'lead_source_enum',  // giá trị từ 05 §4.4
  persona: 'mua_de_o' | 'dau_tu' | 'moi_gioi' | 'chua_xac_dinh',
  // etc.
});
```

**Tuyệt đối KHÔNG push object chứa:** `phone`, `email`, `full_name`, `lead_id`, `ip_address`

**Edge case:** Consent chưa được grant khi GTM script load → GTM chạy nhưng GA4 tag bị block bởi consent mode. DataLayer push vẫn xảy ra — consent mode filter ở GTM layer.

---

## §4. Conversion Tracking

| Conversion | GA4 Event | Ads Network | Consent required |
|---|---|---|---|
| Lead submit | `lead_submit_success` | Google Ads (enhanced conv) | `consent_marketing = true` |
| Calendar book | `consultation_booked` | Google Ads | `consent_marketing = true` |
| PDF download | `pdf_download_success` | — | `consent_analytics = true` |
| Watchlist | `watchlist_created` | — | `consent_analytics = true` |

---

## §5. Dashboard KPIs (Business)

| KPI | Formula |
|---|---|
| Lead Submit Rate | `lead_submit_success` / sessions |
| Qualified Lead Rate | `qualified_leads` / `total_leads` |
| Cost Per Lead | Ad spend / `lead_submit_success` (khi có spend mapping) |
| Hot Lead Rate | `hot_leads` / `total_leads` |
| Speed-to-Lead P50 | Median (`first_contact_at` - `created_at`) trong HC |
| Form Error Rate | `lead_submit_error` / `lead_form_start` |
| Consent Accept Rate | Consented / banner_shown |
