import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tiến độ dự án — Hồng Hạc City Bắc Ninh',
  description:
    'Cập nhật tiến độ xây dựng và mở bán Hồng Hạc City theo từng giai đoạn, xác minh từ nguồn chính thức.',
  alternates: { canonical: '/tien-do' },
}

export default function TienDoPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="mb-6 text-4xl font-semibold text-[var(--color-brand-secondary)]">
          Tiến độ dự án
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Tiến độ đang được cập nhật. Đăng ký nhận thông báo mới nhất.
        </p>
      </div>
    </div>
  )
}
