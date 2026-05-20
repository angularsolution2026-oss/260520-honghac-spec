import Link from 'next/link'

// PersonaSplitter — 07 §2.2 (copy canonical)
const PATHS = [
  {
    id: 'buyer',
    headline: 'Sống đúng nhịp của gia đình bạn',
    subCopy: 'Tìm không gian phù hợp với lối sống',
    cta: 'Tìm vị trí phù hợp',
    href: '/sa-ban',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'investor',
    headline: 'Theo dõi tiềm năng tăng trưởng dài hạn',
    subCopy: 'Phân tích đầu tư theo từng giai đoạn',
    cta: 'Tính phương án đầu tư',
    href: '/tiem-nang',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    id: 'broker',
    headline: 'Tài nguyên cho nhà tư vấn chuyên nghiệp',
    subCopy: 'Cập nhật thông tin dự án theo thời gian thực',
    cta: 'Liên hệ hợp tác',
    href: '/tu-van',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export function DecisionPaths() {
  return (
    <section className="section-padding bg-[var(--color-surface)]" aria-labelledby="decision-paths-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 id="decision-paths-heading" className="font-display text-3xl font-semibold text-[var(--color-brand-secondary)] sm:text-4xl">
            Bạn đang tìm kiếm điều gì?
          </h2>
          <p className="mt-3 text-[var(--color-text-secondary)]">
            Chọn con đường phù hợp để nhận thông tin có giá trị nhất với bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PATHS.map((path) => (
            <div
              key={path.id}
              className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 transition-all duration-[var(--duration-base)] hover:border-[var(--color-brand-primary)] hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]">
                {path.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[var(--color-brand-secondary)]">
                {path.headline}
              </h3>
              <p className="mb-6 text-sm text-[var(--color-text-secondary)]">
                {path.subCopy}
              </p>
              <Link
                href={path.href}
                className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-brand-primary)] transition-gap duration-[var(--duration-fast)] hover:gap-2"
              >
                {path.cta}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
