import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pháp lý dự án — Hồng Hạc City Bắc Ninh',
  description:
    'Thông tin pháp lý Hồng Hạc City: quyết định phê duyệt quy hoạch, chủ đầu tư, hồ sơ pháp lý xác minh từ nguồn chính thức.',
  alternates: { canonical: '/phap-ly' },
}

export default function PhapLyPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="mb-6 text-4xl font-semibold text-[var(--color-brand-secondary)]">
          Pháp lý dự án
        </h1>
        <p className="mb-4 rounded-lg border border-[var(--color-warning)] bg-[var(--color-warning-bg)] p-4 text-sm text-[var(--color-text-secondary)]">
          Thông tin pháp lý đang được xác minh từ nguồn chính thức. Vui lòng
          đối chiếu với cơ quan nhà nước có thẩm quyền trước khi ra quyết định.
        </p>
        <p className="text-[var(--color-text-secondary)]">
          Sprint P0 — nội dung pháp lý đang được biên soạn từ nguồn Tier 1.
        </p>
      </div>
    </div>
  )
}
