import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bảng giá tham khảo — Hồng Hạc City Bắc Ninh',
  description:
    'Thông tin giá tham khảo Hồng Hạc City. Giá thực tế theo từng giai đoạn — liên hệ để nhận thông tin phù hợp.',
  alternates: { canonical: '/bang-gia' },
}

export default function BangGiaPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="mb-6 text-4xl font-semibold text-[var(--color-brand-secondary)]">
          Bảng giá tham khảo
        </h1>
        <p className="mb-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4 text-sm text-[var(--color-text-secondary)]">
          Kết quả tính toán mang tính tham khảo. Giá thực tế phụ thuộc giai
          đoạn mở bán và chính sách của chủ đầu tư. Cần xác nhận trực tiếp
          trước khi quyết định.
        </p>
        <p className="text-[var(--color-text-secondary)]">
          Liên hệ để nhận thông tin giá phù hợp với giai đoạn hiện tại.
        </p>
      </div>
    </div>
  )
}
