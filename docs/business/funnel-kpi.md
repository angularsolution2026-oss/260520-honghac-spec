# G6 — Funnel KPI & Sales Feedback Model v1

**Status:** Framework ready — chờ sales manager (Ngô Kim Quyên) fill benchmark thật
**Authority:** [08 §6](../spec/08-lead-capture-cro.md) · [10 §2.3, §2.4](../spec/10-admin-dashboard.md) · [12 §5](../spec/12-analytics-tracking.md)

> **Mục tiêu kinh doanh:** SEO/CRO → **lead chất lượng cao → hợp đồng → giảm chi phí ads**. Để verify được mục tiêu này, phải đo full funnel chứ không chỉ submit rate.

---

## §1. Funnel stages (extend [05 §4.3](../spec/05-database-schema.md))

| Stage | `lead_status` enum | Mô tả | Target conv rate |
|---|---|---|---|
| 1. Submit | `new` | Form submitted, score computed | 100% (baseline) |
| 2. Contacted | `contacted` | Sales đã gọi trong SLA | `SALES_REQUIRED`: đề xuất khởi điểm ≥80% trong HC |
| 3. Qualified | `qualified` | Lead xác nhận nhu cầu thật, ngân sách match | `SALES_REQUIRED`: đề xuất khởi điểm ≥40% từ Contacted |
| 4. Site visit | `site_visit_scheduled` → `site_visit_done` | Đi xem dự án | `SALES_REQUIRED`: đề xuất khởi điểm ≥30% từ Qualified |
| 5. Negotiating | `negotiating` | Đàm phán đặt cọc / giá / lô | `SALES_REQUIRED`: đề xuất khởi điểm ≥50% từ Site visit |
| 6. **Contracted** | `contracted` | Đặt cọc hoặc ký HĐ | `SALES_REQUIRED`: đề xuất khởi điểm ≥40% từ Negotiating |
| Lost | `lost` | Drop ra khỏi funnel — phải có lý do |
| Spam | `spam` | Junk filter |

### Tổng target (đề xuất — sales fill thật)

> **Submit → Contract:** ≥80% × 40% × 30% × 50% × 40% = **~1.92%**
>
> Nghĩa là: 100 leads submit → khoảng 2 hợp đồng. Đây là benchmark thực tế cho BĐS luxury.
>
> `SALES_REQUIRED`: Quyên xác nhận con số này có realistic với trải nghiệm sale hiện tại không. Nếu khác, paste benchmark thật vào đây.

---

## §2. Lost reason taxonomy (mới — extend leads schema)

> Hiện tại [05 §2.1](../spec/05-database-schema.md) không có field `lost_reason`. Đề xuất thêm để sales feedback có cấu trúc.

**Đề xuất thêm field vào `leads` collection:**

```typescript
{
  lost_reason?: 'budget_mismatch' | 'timing_wait' | 'no_response' | 'competitor' | 'family_objection' | 'legal_concern' | 'price_high' | 'phase_wait' | 'other';
  lost_reason_note?: string;  // ≥10 chars nếu lost_reason = 'other'
  lost_at?: ISO8601;
  lost_by_uid?: string;  // sales đánh dấu
}
```

### Lost reason mapping → action

| Reason | Sales action | Marketing/CRO insight |
|---|---|---|
| `budget_mismatch` | Move to nurture / Cold | Tighten lead form persona/budget question |
| `timing_wait` | Watchlist enrollment (P2) | OK — không cần fix |
| `no_response` | 3 retry rồi archive | Check phone validation / speed-to-lead |
| `competitor` | Sales debrief: ai? vì sao? | **Comparison content opportunity** |
| `family_objection` | Lifestyle content nurture | Strengthen `/phong-cach-song` |
| `legal_concern` | Send Tier 1 evidence | Strengthen `/phap-ly` |
| `price_high` | Calc affordability nurture | Check `/bang-gia` messaging |
| `phase_wait` | Watchlist enrollment | OK |

---

## §3. Sales quality feedback model (mới)

> Sales sau khi gọi 1 lead, đánh giá lại để cải thiện scoring algorithm.

**Đề xuất thêm field:**

```typescript
{
  sales_quality_feedback?: {
    real_buyer: boolean;          // có thực sự định mua không
    budget_real: boolean;         // ngân sách khai có đúng không
    persona_match: boolean;       // persona khai có chính xác không
    notes?: string;
    submitted_by_uid: string;
    submitted_at: ISO8601;
  };
}
```

**Sử dụng:**
- Aggregated weekly: % real_buyer per `lead_source` → score adjustment
- Per lead: hiển thị trong admin detail view
- KPI: `real_buyer_rate` = (count real_buyer=true) / total

---

## §4. KPI Dashboard (extend [10 §2.3](../spec/10-admin-dashboard.md))

### §4.1. Funnel View (mới — required)

Hiển thị 6 stage với conversion rate giữa các stage, breakdown theo:
- Time range (7/30/90 ngày)
- `lead_source` (filter)
- `persona`
- `budget_range`

### §4.2. KPI mới phải đo

| KPI | Formula | Target benchmark |
|---|---|---|
| **Submit → Contract rate** | `contracted` / `total submit` | `SALES_REQUIRED`: % |
| **Cost Per Contract (CPC)** | Ad spend / `contracted` count | `SALES_REQUIRED`: VNĐ |
| **Real Buyer Rate** | `sales_quality_feedback.real_buyer = true` / total | `SALES_REQUIRED`: % |
| **Lost Reason — Top 3** | Group by `lost_reason`, count desc | — |
| **Time to Contract (P50)** | Median(`contracted_at` - `created_at`) | `SALES_REQUIRED`: ngày |
| **Source × Conversion Matrix** | Per source: submit / contracted / CPC | — |

### §4.3. Ads spend mapping

> Cần thêm collection `ads_spend` để compute CPC.

```typescript
// Firestore: ads_spend collection
{
  spend_id: string;
  utm_source: string;        // 'google_ads' / 'facebook_ads' / 'zalo_ads'
  utm_campaign: string;
  amount_vnd: number;
  date: ISO 8601;
  recorded_by_uid: string;
}
```

CPC = Σ amount_vnd / count(contracted leads matched by utm_source+utm_campaign).

---

## §5. Telegram alert extension

Alert mới ngoài Hot/Warm hiện tại ([08 §5.1](../spec/08-lead-capture-cro.md)):

| Alert | Channel | Trigger |
|---|---|---|
| 🎉 CONTRACT | `TELEGRAM_CHAT_ID_CONTRACT` (mới — `02 §3`) | `lead_status = contracted` |
| ⚠️ LOST | `TELEGRAM_CHAT_ID_LOST` (mới) | `lead_status = lost` với `lost_reason ≠ no_response` (để team biết lý do) |
| 📊 Weekly digest | `TELEGRAM_CHAT_ID_DIGEST` (mới) | Cron mỗi thứ Hai: top 3 lost_reason, real_buyer_rate, funnel summary |

Cả 3 alert KHÔNG include PII (theo [00 §6 Rule 7](../spec/00-master-instruction.md)).

---

## §6. Sales playbook (mới — khuyến nghị)

Spec hiện không có sales playbook (sales làm gì sau khi nhận Telegram alert). Đề xuất:

```
docs/business/sales-playbook.md
```

Nội dung:
- Hot lead (≤3 phút HC): script gọi, mục tiêu cuộc gọi 1
- Warm lead (≤5 phút HC): script gọi, mục tiêu cuộc gọi 1
- Cold lead nurture: tần suất Zalo/email
- Mục tiêu cuộc gọi 1: NOT closing, chỉ qualify + book site visit
- Mục tiêu cuộc gọi 2: site visit confirmation
- Mục tiêu cuộc gọi 3: negotiation
- Khi nào escalate manager: budget > `SALES_REQUIRED`, legal complex
- Khi nào mark lost: 3 lần no-response trong 14 ngày

> **SALES_REQUIRED Quyên:** Sau khi vá G6, tạo playbook này.

---

## §7. Pre-launch signoff

- [ ] §1 target conversion rate filled bởi sales manager
- [ ] §2 `lost_reason` enum added vào [05 §4](../spec/05-database-schema.md)
- [ ] §3 `sales_quality_feedback` shape added vào [05 §2.1](../spec/05-database-schema.md)
- [ ] §4.2 KPI mới spec'd vào [10 §2.3](../spec/10-admin-dashboard.md)
- [ ] §4.3 `ads_spend` collection added vào [05 §2](../spec/05-database-schema.md)
- [ ] §5 3 Telegram chat ID env vars added vào [02 §3](../spec/02-tech-stack.md)
- [ ] §6 sales playbook drafted
- [ ] Reviewer (Quyên + chủ dự án): ____________ Date: ____________
