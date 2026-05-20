# 14 — Schema Markup (Hồng Hạc City)

**Version:** 3.0 | **Last updated:** 2026-05-16 | **Status:** Approved

---

## §1. Schema Policy

- KHÔNG render schema trên `noindex` pages
- Schema phải match visible on-page content (Google policy)
- Validate: Schema.org + Google Rich Results Test
- Format: JSON-LD (không Microdata, không RDFa)
- Render: Server-side trong `<head>` (KHÔNG client-inject sau hydration)
- Implementation: `components/seo/schemas/` — một file per schema type

---

## §2. Schema Inventory

### §2.2b. LocalBusiness (NAP + geo) — Homepage + Footer (global)

> Dùng khi muốn nhấn mạnh NAP + geo (Local SEO). Giá trị phải khớp visible content.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Công ty Cổ phần Đầu tư Công đoàn Ngân hàng Công Thương",
  "url": "https://bacninhhonghaccity.vn",
  "telephone": "0945375688",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Phố Chùa Thầm",
    "addressLocality": "Song Liễu",
    "addressRegion": "Bắc Ninh",
    "addressCountry": "VN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 21.0776,
    "longitude": 105.8158
  }
}
```

### §2.1. `WebSite` + `SearchAction` — Homepage only

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Hồng Hạc City",
  "url": "https://bacninhhonghaccity.vn",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://bacninhhonghaccity.vn/sa-ban?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### §2.2. `Organization` — Homepage + Footer (global)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Công ty Cổ phần Đầu tư Công đoàn Ngân hàng Công Thương",
  "url": "https://bacninhhonghaccity.vn",
  "logo": "https://bacninhhonghaccity.vn/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "0945375688",
    "contactType": "customer service",
    "areaServed": "VN",
    "availableLanguage": "Vietnamese"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Phố Chùa Thầm",
    "addressLocality": "Song Liễu",
    "addressRegion": "Bắc Ninh",
    "addressCountry": "VN"
  }
}
```

> Các giá trị (company name / hotline / site url) nên được inject từ env vars (`02 §3`) khi implement.

### §2.3. `RealEstateListing` — `/sa-ban/[lot-id]`

**Render conditions (tất cả phải có — xem `09 §4.3`):**
- `lot_code` (Tier 1)
- `phan_khu_name` (Tier 1)
- `product_type` (Tier 1)
- `area_range_min` + `area_range_max` (Tier 1)
- `legal_status_summary` (Tier 1)

Thiếu bất kỳ field nào → skip schema block (KHÔNG render partial schema).

```json
{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "[lot_code] — [product_type_label] tại [phan_khu_name]",
  "description": "[Generated from lot fields — không include price nếu hidden]",
  "url": "https://bacninhhonghaccity.vn/sa-ban/[lot-id]",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bắc Ninh",
    "addressCountry": "VN"
  },
  "floorSize": {
    "@type": "QuantitativeValue",
    "minValue": "[area_range_min]",
    "maxValue": "[area_range_max]",
    "unitText": "m²"
  }
}
```

**KHÔNG render** `price` hoặc `priceCurrency` nếu `price_visibility = hidden`.

### §2.4. `FAQPage` — `/bang-gia`, `/phap-ly`, FAQ sections

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text — phải khớp chính xác visible content]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer text — phải khớp chính xác visible content]"
      }
    }
  ]
}
```

**Rule:** Text trong schema phải khớp chính xác với visible content trên page. Không paraphrase.

### §2.5. `Article` + `Person` — `/blog/[slug]`

**Render conditions:** `claim_status = approved_public` VÀ author profile đầy đủ (name + credentials).

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[title]",
  "datePublished": "[published_at]",
  "dateModified": "[updated_at]",
  "author": {
    "@type": "Person",
    "name": "[author.name]",
    "url": "[author.profile_url]"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Công ty Cổ phần Đầu tư Công đoàn Ngân hàng Công Thương",
    "logo": {
      "@type": "ImageObject",
      "url": "https://bacninhhonghaccity.vn/logo.png"
    }
  }
}
```

### §2.6. `BreadcrumbList` — Tất cả non-homepage pages

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Trang chủ",
      "item": "https://bacninhhonghaccity.vn/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "[Page name]",
      "item": "https://bacninhhonghaccity.vn/[slug]"
    }
  ]
}
```

Nested routes (ví dụ `/phan-khu/hong-phat/gan-cong-vien`) → 3 items trong breadcrumb.

---

## §3. Implementation

- `components/seo/schemas/WebSiteSchema.tsx`
- `components/seo/schemas/OrganizationSchema.tsx`
- `components/seo/schemas/RealEstateListingSchema.tsx`
- `components/seo/schemas/FAQSchema.tsx`
- `components/seo/schemas/ArticleSchema.tsx`
- `components/seo/schemas/BreadcrumbSchema.tsx`

Mỗi component nhận typed props và render `<script type="application/ld+json">` trong `<head>`.

**CI validation:** schema-dts type checking + runtime check visible content match.
