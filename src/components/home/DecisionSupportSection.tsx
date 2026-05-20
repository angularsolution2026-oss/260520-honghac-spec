import Link from 'next/link'

const SUPPORT_LINKS = [
  {
    href: '/phap-ly',
    icon: '⚖',
    label: 'Pháp lý',
    desc: 'Hồ sơ pháp lý xác minh từ nguồn chính thức',
  },
  {
    href: '/bang-gia',
    icon: '₫',
    label: 'Bảng giá',
    desc: 'Giá tham khảo theo từng giai đoạn mở bán',
  },
  {
    href: '/vay-mua',
    icon: '🏦',
    label: 'Tính phương án',
    desc: 'Công cụ tính phương án sở hữu nhà',
  },
  {
    href: '/tu-van',
    icon: '💬',
    label: 'Tư vấn riêng',
    desc: 'Trao đổi cùng chuyên viên tư vấn',
  },
]

export function DecisionSupportSection() {
  return (
    <section className="section-padding bg-[var(--color-surface)]" aria-labelledby="decision-support-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 id="decision-support-heading" className="mb-10 font-display text-3xl font-semibold text-[var(--color-brand-secondary)] sm:text-4xl">
          Công cụ hỗ trợ quyết định
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SUPPORT_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5 transition-all duration-[var(--duration-base)] hover:border-[var(--color-brand-primary)] hover:shadow-md"
            >
              <span className="mb-3 text-2xl" role="img" aria-hidden="true">{item.icon}</span>
              <p className="mb-1 font-semibold text-[var(--color-brand-secondary)] group-hover:text-[var(--color-brand-primary)]">
                {item.label}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
