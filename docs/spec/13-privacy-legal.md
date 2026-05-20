# 13 — Privacy & Legal Compliance (Hồng Hạc City)

**Version:** 3.0 | **Last updated:** 2026-05-16 | **Status:** Approved

---

## §1. Applicable Law

- Nghị định 13/2023/NĐ-CP (Bảo vệ dữ liệu cá nhân Việt Nam)
- Luật An ninh mạng 2018
- GDPR (cho EU visitors nếu có)

---

## §2. Data Collection Principles

1. **Minimization**: Chỉ collect data cần thiết cho business purpose
2. **Consent**: Explicit consent trước khi collect analytics/marketing data
3. **Transparency**: Rõ ràng về mục đích sử dụng
4. **Security**: Encrypted at rest và in transit
5. **Retention**: Xem `05 §6` (SSOT cho data retention)

---

## §3. Consent Banner

- Default state: `denied` cho analytics và marketing
- Xuất hiện: Lần đầu visit, blocking viewport partially (không full modal)
- Options: "Chấp nhận tất cả" | "Chỉ cần thiết" | "Tùy chỉnh"
- Consent state ghi vào `leads.consent_state` (khi lead submit) và `localStorage`
- Không có "X" để đóng banner mà không chọn (GDPR compliant)
- Link tới `/chinh-sach-bao-mat` (opens same tab)

**Edge cases:**
- `localStorage` bị clear → banner hiện lại, consent reset về `denied`
- User thay đổi consent sau lần đầu → cập nhật `localStorage`, gửi GTM event `consent_update`
- Incognito mode → banner hiện mỗi session (không persist)

---

## §4. Privacy Policy Page (`/chinh-sach-bao-mat`)

Phải có (block release nếu thiếu):
- Tên công ty + địa chỉ + email liên hệ (data controller)
- Loại data được thu thập và mục đích
- Thời gian lưu trữ (reference `05 §6`)
- Quyền của người dùng: xem, sửa, xóa (DSAR)
- Cách liên hệ để request
- Ngày cập nhật chính sách

---

## §5. DSAR Page (`/yeu-cau-du-lieu`)

**Flow Sprint 1A (manual review):**
1. User nhập `phone` (lookup key)
2. Server lookup bằng `phone_hash` — KHÔNG return PII raw trong response
3. Response: "Nếu số điện thoại tồn tại trong hệ thống, chúng tôi sẽ liên hệ xác nhận trong vòng 3 ngày làm việc."
4. Admin review + verify identity thủ công qua phone/Zalo
5. Sau verify: soft-delete lead (không instant hard-delete)
6. Email confirmation với `dsar_request_id` gửi tới địa chỉ email user (nếu có)
7. Audit log entry mandatory

**Flow Sprint 1B (OTP):**
- Bước 3: Server gửi OTP 6 số tới phone
- Bước 4: User nhập OTP → auto-verify
- Sau verify: proceed to soft-delete

**Edge cases:**
- Phone không tồn tại trong hệ thống → response giống nhau: "Chúng tôi sẽ liên hệ xác nhận..." (tránh enumeration attack)
- Multiple leads với cùng `phone_hash` → soft-delete tất cả
- Lead đã bị soft-delete rồi → response giống nhau (idempotent)
- `dsar_request_id` conflict (cực kỳ hiếm) → generate mới

---

## §6. Legal Disclaimers

> Canonical tại `00 §11`. File này reference, không duplicate.

4 loại disclaimer tại `00 §11.1`–`00 §11.4`. Vị trí bắt buộc:
- `00 §11.1` Website disclaimer: Footer (mọi trang) + HeroSection (trang chủ) + `/bang-gia` + `/phap-ly`
- `00 §11.2` Calculator disclaimer: `/vay-mua` + mọi nơi hiện kết quả mortgage
- `00 §11.3` ROI disclaimer: `/roi` + mọi nơi có investment projection
- `00 §11.4` Comparison disclaimer: Tất cả `/tiem-nang/so-sanh/*`

---

## §7. Data Retention Policy

> Canonical tại `05 §6`. File này reference, không duplicate.

Xem `05 §6` cho đầy đủ retention windows và actions.

---

## §8. Third-Party Data Sharing

| Bên thứ ba | Data gửi | Condition |
|---|---|---|
| Google Ads | Conversion events (hashed) | `consent_marketing = true` |
| Facebook Ads | Conversion events | `consent_marketing = true` |
| Zalo OA | Phone (hashed) | `consent_marketing = true` |
| Google Analytics | Behavior events | `consent_analytics = true` |
| Sentry | Error logs (no PII) | Always (legitimate interest) |
| Telegram | Alert metadata (no PII) | Always (internal only) |

**Absolute rule:** KHÔNG gửi raw `phone`, `email`, `full_name` sang bất kỳ bên thứ ba nào — xem `00 §6 Rule 7`.

---

## §9. Forbidden Claims

> Canonical tại `00 §8`. Dưới đây là reminder cho content team.

**Không bao giờ dùng** nếu không có bằng chứng/ủy quyền:
- "chính thức", "độc quyền", "giá gốc", "bảng giá chủ đầu tư"
- "rổ hàng nội bộ", "minh bạch 100%"
- "cam kết sinh lời", "bảo chứng chắc chắn", "tăng giá chắc chắn"
- "website chính thức của chủ đầu tư" (chúng ta KHÔNG phải)

**Dùng thay thế:** "tham khảo", "cập nhật theo giai đoạn", "cần xác nhận tại thời điểm giao dịch", "dữ liệu phân tích"
