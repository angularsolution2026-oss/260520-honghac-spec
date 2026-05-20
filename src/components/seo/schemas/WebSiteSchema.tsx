// JSON-LD schema — 14 spec. Only render when conditions met.
// Never on noindex pages.

export function WebSiteSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bacninhhonghaccity.vn'
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'Hồng Hạc City Bắc Ninh'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: companyName,
    url: siteUrl,
    description:
      'Nền tảng thông tin tư vấn bất động sản độc lập tại dự án Hồng Hạc City, Bắc Ninh.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/sa-ban?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
