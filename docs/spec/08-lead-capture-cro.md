# 08 — Lead Capture & CRO (Hồng Hạc City)

**Version:** 3.0 | **Last updated:** 2026-05-16 | **Status:** Approved

---

## §0. Implementation Contract References

Lead/CRO là vùng dễ tạo duplicate lead và sai consent nhất. Khi implement, bắt buộc áp dụng:

| Topic | Required contract |
|---|---|
| Lead field validation/idempotency | `05 §5`, `05 §5.3`, `06 §4.1` |
| Submit/loading/error/offline/success | `07 §10.1–10.2` |
| Modal/fallback/exit intent accessibility | `07 §10.3` |
| Delete/archive/unsubscribe/retention | `05 §5.2`, `05 §6`, `13` |
| Telegram/notification side effect | `02 §5.1–5.2`, `12`, `13` |
| Release/experiment/fallback form | `02 §5.3`, `04 §7`, `17 §8` |

No lead flow is complete without runtime submit evidence and duplicate-submit/idempotency evidence.

---

## §1. Lead Form Surfaces

Mọi `LeadForm` component phải nhận prop `surface: LeadSource` (enum `05 §4.4`).

| Surface | Page | Form type | Sprint |
|---|---|---|---|
| `homepage_hero` | Homepage Hero | Inline / CTA modal | 1A |
| `homepage_lead_magnet` | LeadMagnetSection | PDF gate | 1A |
| `homepage_final_cta` | FinalCTASection | Inline | 1A |
| `bang_gia` | Bảng giá | PDF gate + inline | 1A |
| `phap_ly` | Pháp lý | Inline | 1A |
| `tu_van` | Tư vấn | Full form | 1A |
| `lien_he` | Liên hệ | Full form | 1A |
| `sa_ban` | Sa bàn shell/full map | Quick capture / fallback advisory | 1A shell / 1B full |
| `sa_ban_lot` | Map lot click popup | Quick capture | 1B |
| `programmatic_lot` | `/sa-ban/[lot-id]` | Inline | 1B |
| `vay_mua` | Tính vay | Calculator lead | 1B |
| `popup_exit_intent` | Exit-intent | Modal | 1A |
| `popup_fallback` | FallbackModal | Modal | 1A |
| `footer` | Footer | Mini form | 1A |

---

## §2. Lead Form Field Contract

| Field | Type | Required | Validation |
|---|---|---|---|
| `phone` | string | Yes (hoặc email) | Việt Nam regex `05 §5` |
| `email` | string | Optional | Zod `email()` |
| `full_name` | string | Optional | 2–100 chars |
| `message` | string | Optional | max 500 chars |
| `persona` | enum `05 §4.1` | Conditional | Surface quyết định hiện hay ẩn |
| `budget_range` | enum `05 §4.5` | Optional | |
| `consent_privacy` | boolean | Yes (= true) | Block submit nếu false |
| `consent_marketing` | boolean | Optional | Default unchecked |
| `client_request_id` | UUIDv4 | Yes | Generated client-side trước submit |

---

## §3. CRO Principles

### §3.1. Form Length by Surface

| Surface | Fields shown | Strategy |
|---|---|---|
| Quick capture (map popup, exit-intent) | Phone + consent | Reduce friction |
| Standard (homepage, bang_gia) | Name + Phone + consent | Balanced |
| Full (tu_van, lien_he) | Name + Phone + Email + Message + Persona + Budget | High-intent |

### §3.2. Progressive Profiling

- Lần submit 1: Phone + consent (minimum viable)
- Lần submit 2 (return user — identified by `phone_hash`): Enrich với Persona + Budget band
- KHÔNG hỏi lại field đã có giá trị

### §3.3. Exit-Intent Popup Rules

- Trigger desktop: mouse leaves viewport top
- Trigger mobile: scroll velocity đổi chiều (scroll lên sau khi scroll xuống)
- Delay: ≥ 30 giây sau page load — KHÔNG show ngay khi vào trang
- Rate limit: 1 lần/session/device
- Suppress: nếu lead đã submit trong session hiện tại
- Copy: "Trước khi bạn rời đi — nhận gợi ý phân khu phù hợp với ngân sách của bạn"
- CTA: "Nhận gợi ý ngay" (KHÔNG "Đăng ký ngay")

### §3.4. Lead Magnet Strategy

**PDF gates phải:**
- Có title rõ ràng và useful (ví dụ: "Hướng dẫn chọn lô Hồng Phát theo hướng nhà")
- Cung cấp real value — không phải brochure bán hàng
- Yêu cầu tối thiểu: Phone + `consent_privacy`
- Delivery: signed URL từ GCS private bucket (KHÔNG expose raw GCS URL)
- Tracking: append `document_id` vào `leads.download_events[]`

**PDF types approved:**
- Hướng dẫn chọn lô theo tiêu chí
- Phân tích hạ tầng Đông Hà Nội
- Checklist pháp lý bất động sản
- Hướng dẫn tính khả năng vay

**Edge cases:**
- GCS signed URL generation fail → log Sentry, hiện "Tài liệu tạm thời không khả dụng. Chúng tôi sẽ gửi qua Zalo." + lead vẫn được lưu
- User đã submit trước đó (same `phone_hash`) → vẫn cấp download (không require re-submit), enrich profile nếu có thêm data

---

## §4. Submission Flow (UI layer — API contract tại `06 §4.1`)

```
User fills form (client)
  ↓
Client validation (Zod)
  ↓
Generate client_request_id (UUIDv4) — trước khi gọi Turnstile
  ↓
Cloudflare Turnstile solve (user interaction)
  ↓
POST /api/leads (06 §4.1)
  ↓
Show loading state (spinner, button disabled)
  ↓ (response)
  → 200 success → show success state (swap form)
  → 422 validation → show inline field errors
  → 403 turnstile → show retry message
  → 500 server error → show hotline fallback
  → Network error → show offline state
```

**UI states (LeadForm component):**
- `idle`: form bình thường
- `loading`: submit đang chạy (button disabled + spinner)
- `success`: form ẩn, success message hiện
- `error`: inline errors hiện, form vẫn editable
- `offline`: submit disabled, offline message

---

## §5. Speed-to-Lead (Telegram Alert — SSOT)

### §5.1. Trigger Conditions

| Lead score | Channel | SLA gọi | Message prefix |
|---|---|---|---|
| ≥ 70 (Hot) | `TELEGRAM_CHAT_ID_HOT` | ≤ 3 phút HC | 🔥 HOT LEAD |
| 40–69 (Warm) | `TELEGRAM_CHAT_ID_WARM` | ≤ 5 phút HC | ⚡ WARM LEAD |
| < 40 | Không alert | — | — |

> **HC = Hành chính = 08:00–21:00 ICT.** SLA chỉ tính trong HC. Ngoài HC: SLA tính từ đầu HC tiếp theo. Xem `04 §6`.

### §5.2. Telegram Message Template

```
{PREFIX} Lead mới

Nguồn: {lead_source_display}
Score: {lead_score} điểm
Persona: {persona_display}
Ngân sách: {budget_range_display}
Thời gian: {created_at_vn}

⚠️ SLA: Liên hệ trước {first_contact_due_at_vn}

[Xem lead →] {admin_dashboard_url}
```

**Rules:**
- KHÔNG include `phone`, `email`, `full_name` trong Telegram message
- `admin_dashboard_url` = đường dẫn nội bộ tới `/portals/admin/leads/{lead_id}` — KHÔNG expose raw Firestore path

**Edge cases:**
- Telegram API down/timeout → log Sentry warning level, lead đã lưu thành công vào Firestore, KHÔNG retry vô hạn (max 1 retry sau 5s)
- Score ≥ 70 nhưng không có sales nào `active` → gửi Telegram Hot + set `routing_status = unassigned`, cron sẽ xử lý

### §5.3. Escalation

- Trigger: Lead Hot nhưng không có `first_contact_at` sau 5 phút HC kể từ `first_contact_due_at`
- Action: Badge `BREACHED` trong admin dashboard + gửi `TELEGRAM_CHAT_ID_ESCALATION`
- HC: 08:00–21:00 ICT. Ngoài HC: SLA tính từ đầu HC tiếp theo

---

## §6. Lead Scoring Formula (Canonical SSOT — `04 §6` reference file này)

| Hành vi | Points | Notes |
|---|---|---|
| Xem sa bàn `/sa-ban` | +10 | Per session (không double-count) |
| Xem current release `/phan-khu/hong-phat` | +15 | |
| Dùng AI Matching | +20 | Sprint P2 |
| Dùng tính vay `/vay-mua` | +20 | |
| Xem bảng giá `/bang-gia` | +15 | |
| Xem pháp lý `/phap-ly` | +15 | |
| Xem tiến độ `/tien-do` | +10 | |
| Quay lại lần 2+ | +10 | Per session thứ 2 trở đi |
| Lưu 3+ vị trí (watchlist) | +25 | Sprint P2 |
| Đặt lịch tư vấn | +40 | |
| Tải PDF lead magnet | +15 | Per unique document |
| Xem comparison page | +10 | Sprint P2 |
| Dùng ROI calculator | +20 | Sprint P2 |

**Threshold:**
- Hot ≥ 70 → Telegram Hot alert, SLA ≤ 3 phút HC
- Warm 40–69 → Telegram Warm alert, SLA ≤ 5 phút HC
- Cold 20–39 → Nurture (email/Zalo digest)
- Junk < 20 → Không alert, không route

**Decay (Sprint P3 — chưa implement):**
- -5 điểm/tuần nếu không activity sau 30 ngày

---

## §7. Privacy & Consent Compliance

- Consent banner: default = `denied` cho analytics và marketing (`13 §3`)
- `consent_state` ghi vào `leads.consent_state = { analytics: bool, marketing: bool }`
- Marketing email/Zalo chỉ gửi nếu `consent_marketing = true`
- GA4 data chỉ collect nếu `consent_analytics = true`
- DSAR: User có thể request delete tại `/yeu-cau-du-lieu` (`13 §5`)
- KHÔNG gửi PII sang bên thứ ba nếu không có marketing consent (`13 §8`)

---

## §8. Watchlist / Phase Follow (Sprint P2)

- User có thể "Theo dõi phase tiếp theo" không cần submit full form
- Flow: Click → Quick capture (phone + consent) → `watchlist_item` created
- Notification khi phase mới mở: Zalo OA (nếu `consent_marketing = true`) hoặc reminder popup
- `lead_source` của watchlist action: surface của trang + tag `watchlist_action` trong `calculator_snapshot`
