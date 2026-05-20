import Link from 'next/link'

export function CurrentReleaseSection() {
  return (
    <section className="section-padding bg-[var(--color-surface-elevated)]" aria-labelledby="current-release-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--color-brand-primary)]">
              Đang mở bán
            </p>
            <h2 id="current-release-heading" className="mb-4 font-display text-3xl font-semibold text-[var(--color-brand-secondary)] sm:text-4xl">
              Phân khu Hồng Phát
            </h2>
            <p className="mb-6 text-[var(--color-text-secondary)]">
              Phân khu đầu tiên của Hồng Hạc City đang trong giai đoạn mở bán.
              Xem trạng thái từng lô đất, thông tin pháp lý và tiến độ xây
              dựng trên sa bàn tương tác.
            </p>
            <p className="mb-8 text-xs text-[var(--color-text-muted)]">
              Tiến độ đang được cập nhật. Đăng ký nhận thông báo mới nhất.
            </p>
            <Link
              href="/sa-ban"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--color-brand-primary-dark)]"
            >
              Xem trên bản đồ tương tác
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Tổng diện tích', value: '197,76 ha', source: 'Tier 1' },
              { label: 'Phân khu đang MBán', value: 'Hồng Phát', source: 'Tier 1' },
              { label: 'Loại hình', value: 'Đang cập nhật', source: 'Tier 1' },
              { label: 'Tiến độ', value: 'Đang cập nhật', source: 'Tier 1' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
              >
                <p className="mb-1 text-xs text-[var(--color-text-muted)]">
                  {stat.label}
                </p>
                <p className="font-semibold text-[var(--color-brand-secondary)]">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-[var(--color-brand-primary)]">
                  {stat.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
