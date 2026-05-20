import Link from 'next/link'

export function ProgressAndSignalPreview() {
  return (
    <section className="section-padding bg-[var(--color-surface-subtle)]" aria-labelledby="progress-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex items-center justify-between">
          <h2 id="progress-heading" className="font-display text-3xl font-semibold text-[var(--color-brand-secondary)] sm:text-4xl">
            Tiến độ & Tín hiệu
          </h2>
          <Link href="/tien-do" className="text-sm text-[var(--color-brand-primary)] hover:underline">
            Xem chi tiết
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              phase: 'Giai đoạn hiện tại',
              title: 'Hồng Phát — Đang mở bán',
              status: 'active' as const,
              note: 'Tiến độ đang được cập nhật từ nguồn chính thức',
            },
            {
              phase: 'Giai đoạn tiếp theo',
              title: 'Hồng Thịnh',
              status: 'upcoming' as const,
              note: 'Theo dõi phase tiếp theo',
            },
            {
              phase: 'Giai đoạn tương lai',
              title: 'Hồng Phúc',
              status: 'future' as const,
              note: 'Thông tin đang được cập nhật',
            },
          ].map((item) => (
            <div
              key={item.phase}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5"
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    item.status === 'active'
                      ? 'bg-[var(--color-success)]'
                      : item.status === 'upcoming'
                      ? 'bg-[var(--color-warning)]'
                      : 'bg-[var(--color-color-border)]'
                  }`}
                  aria-hidden="true"
                />
                <p className="text-xs text-[var(--color-text-muted)]">{item.phase}</p>
              </div>
              <p className="mb-2 font-semibold text-[var(--color-brand-secondary)]">
                {item.title}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
