export function OrganizationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bacninhhonghaccity.vn'
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'Tư vấn Hồng Hạc City Bắc Ninh'
  const hotline = process.env.NEXT_PUBLIC_HOTLINE ?? ''

  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: companyName,
    url: siteUrl,
    description:
      'Nền tảng thông tin tư vấn bất động sản độc lập tại dự án Hồng Hạc City, Bắc Ninh. Không phải website chính thức của chủ đầu tư.',
    areaServed: {
      '@type': 'Place',
      name: 'Bắc Ninh, Việt Nam',
    },
    ...(hotline && {
      telephone: hotline,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: hotline,
        contactType: 'customer service',
        availableLanguage: 'Vietnamese',
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
