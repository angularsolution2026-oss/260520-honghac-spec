# 15 — Content Governance (Hồng Hạc City)

**Version:** 3.0 | **Last updated:** 2026-05-16 | **Status:** Approved

---

## §1. Content Authoring Rules

### §1.1. Claim Status Flow (SSOT)

```
draft → review → approved_public
               ↘ rejected
```

| Status | Ai thấy | Publish được? | Index được? |
|---|---|---|---|
| `draft` | Chỉ tác giả | ❌ | ❌ |
| `review` | `admin_content` + `super_admin` | ❌ | ❌ |
| `approved_public` | Everyone | ✅ | ✅ |
| `rejected` | `admin_content` + `super_admin` | ❌ | ❌ |

**Rule:** Mọi fact (Giá, Tiến độ, CSBH, ROI projection) phải qua `review` trước khi `approved_public`.

### §1.2. Fact Ledger (sources JSON — SSOT)

Bắt buộc cho mọi bài có fact claim:

```json
{
  "claims": [
    {
      "claim_text": "Vành Đai 4 dự kiến hoàn thành năm 2027",
      "source_url": "https://vnexpress.net/...",
      "source_tier": "tier_3_media_verified",
      "source_name": "VnExpress",
      "accessed_date": "2026-05-10",
      "verified_by_uid": "admin_uid_hash_8chars"
    }
  ]
}
```

**Rules:**
- KHÔNG publish claim có `source_tier = tier_4` hoặc `tier_5`
- `tier_2` (internal) chỉ dùng trong logic ẩn — KHÔNG xuất hiện trong public content
- Mọi số liệu (% tăng giá, m², hecta) phải có Tier 1 hoặc Tier 3 source
- `accessed_date` là ngày tác giả kiểm tra URL — nếu URL thay đổi sau đó, cần re-verify

---

## §2. Article SEO Contract

| Field | Required | Format |
|---|---|---|
| `seo_title` | Yes | ≤ 60 chars, unique toàn site |
| `seo_description` | Yes | ≤ 160 chars, unique toàn site |
| `slug` | Yes | ASCII, lowercase, dashes — xem `06 §5.5` |
| `published_at` | Yes (khi published) | ISO 8601 |
| `updated_at` | Yes | ISO 8601 — phải reflect real content change |
| `author_id` | Yes | Ref tới author profile |
| `canonical_url` | Optional | Chỉ khi syndicate ra ngoài |

**Update date policy:** Chỉ update `updated_at` khi content thực sự thay đổi. KHÔNG update để "freshen" mà không có content change.

---

## §3. Image Caption & Attribution

- Mọi image của dự án phải có `approvalStatus = approvedForPublic` trước khi publish
- Ảnh từ third-party phải có license/attribution rõ ràng
- KHÔNG dùng stock photo có watermark hoặc signage nước ngoài không liên quan
- Drone/aerial CGI phải ghi caption: "Ảnh minh họa quy hoạch"

---

## §4. Content Types & Index Policy

| Type | Route pattern | Index policy |
|---|---|---|
| Pillar page | `/tiem-nang`, `/phong-cach-song` | Always index |
| Phase page | `/phan-khu/hong-phat` | Index khi ≥ 300 words unique content |
| SEO cluster | `/phan-khu/hong-phat/gan-cong-vien` | Index khi unique intent + ≥ 300 words |
| Blog article | `/blog/[slug]` | Index khi `claim_status = approved_public` |
| Comparison | `/tiem-nang/so-sanh/[slug]` | Index khi ≥ 500 words, Tier-verified cả hai phía |
| Lot detail | `/sa-ban/[lot-id]` | Conditional — xem `00 §4.2` |

---

## §5. Internal Linking Strategy

- Mọi cluster page → pillar page (breadcrumb + ≥ 1 contextual link)
- Pillar page → relevant cluster pages (≥ 2 links)
- Lot detail → phân khu page + `/sa-ban`
- Blog article → relevant pillar page (≥ 1 link)
- KHÔNG orphan pages: mọi page phải có ≥ 1 internal link trỏ vào
- `/sa-ban` phải xuất hiện trong top navigation + homepage (core product)

---

## §6. Comparison Page Governance

> Canonical tại `00 §10`. Chi tiết thực thi:

- Trung lập — KHÔNG bôi xấu đối thủ
- Chỉ so sánh dimension có Tier 1/3 source cho cả hai phía
- Disclaimer bắt buộc (xem `00 §11.4`): hiển thị nổi bật, KHÔNG buried footer
- Tên đối thủ: dùng đúng brand name, không keyword stuffing
- Review cycle: 6 tháng/lần hoặc khi đối thủ có thay đổi lớn

---

## §7. Content Review Cycle

| Content type | Review frequency |
|---|---|
| Price content | Monthly (hoặc khi phase mới mở) |
| Legal content | Quarterly |
| Progress content | Monthly |
| Market analysis | Quarterly |
| Infrastructure SEO | Bi-annual |
| Comparison pages | 6 months |

---

## §8. SEO Content Acceptance Criteria

Checklist trước khi set `claim_status = approved_public`:

- [ ] Unique intent — không duplicate intent với page khác
- [ ] Word count ≥ 300 (cluster) hoặc ≥ 800 (pillar)
- [ ] Tất cả facts có Tier 1/3 source trong Fact Ledger (`§1.2`)
- [ ] Author assigned với credentials
- [ ] `seo_title` + `seo_description`: unique, trong giới hạn ký tự
- [ ] Breadcrumb schema sẵn sàng (`14 §2.6`)
- [ ] Internal links: ≥ 2 pointing to pillar, ≥ 1 pointing from pillar
- [ ] Tất cả images: `approvalStatus = approvedForPublic` + alt text + optimized
- [ ] Disclosure phù hợp nếu là investment/price content (`00 §11`)
