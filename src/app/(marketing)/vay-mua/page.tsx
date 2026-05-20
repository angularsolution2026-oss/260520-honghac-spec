import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tính phương án vay mua — Hồng Hạc City Bắc Ninh',
  description:
    'Công cụ tính phương án sở hữu nhà tại Hồng Hạc City. Lãi suất tham khảo — cần xác nhận với ngân hàng trước khi quyết định.',
  alternates: { canonical: '/vay-mua' },
}

export default function VayMuaPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-4 text-4xl font-semibold text-[var(--color-brand-secondary)]">
          Tính phương án sở hữu
        </h1>
        <p className="mb-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4 text-sm text-[var(--color-text-secondary)]">
          Kết quả tính toán mang tính tham khảo. Lãi suất thực tế phụ thuộc
          ngân hàng và thời điểm vay. Cần xác nhận với ngân hàng trước khi
          quyết định.
        </p>
        <p className="text-[var(--color-text-secondary)]">
          Sprint P1 — công cụ tính toán đang được phát triển.
        </p>
      </div>
    </div>
  )
}
