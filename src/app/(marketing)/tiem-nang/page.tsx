import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tiềm năng đầu tư — Hồng Hạc City Bắc Ninh',
  description:
    'Phân tích tiềm năng tăng trưởng bất động sản Hồng Hạc City: hạ tầng kết nối, quy hoạch vùng và dữ liệu tham chiếu.',
  alternates: { canonical: '/tiem-nang' },
}

export default function TiemNangPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="mb-6 text-4xl font-semibold text-[var(--color-brand-secondary)]">
          Tiềm năng đầu tư
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Sprint P1 — nội dung phân tích tiềm năng đang được biên soạn từ
          nguồn Tier 1.
        </p>
      </div>
    </div>
  )
}
