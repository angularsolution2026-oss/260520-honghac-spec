import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yêu cầu dữ liệu (DSAR) — Hồng Hạc City',
  description:
    'Gửi yêu cầu xem, chỉnh sửa hoặc xóa dữ liệu cá nhân theo quyền DSAR.',
  alternates: { canonical: '/yeu-cau-du-lieu' },
}

export default function YeuCauDuLieuPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-6 text-4xl font-semibold text-[var(--color-brand-secondary)]">
          Yêu cầu dữ liệu cá nhân
        </h1>
        <p className="mb-6 text-[var(--color-text-secondary)]">
          Theo quyền DSAR (Data Subject Access Request), bạn có thể yêu cầu:
        </p>
        <ul className="mb-8 list-inside list-disc space-y-2 text-[var(--color-text-secondary)]">
          <li>Xem dữ liệu cá nhân chúng tôi đang lưu giữ</li>
          <li>Chỉnh sửa thông tin không chính xác</li>
          <li>Xóa dữ liệu cá nhân (right to erasure)</li>
        </ul>
        <p className="mb-4 text-sm text-[var(--color-text-muted)]">
          Sprint P0 — Quy trình DSAR thủ công. Gửi yêu cầu qua hotline hoặc
          email được cung cấp trên trang. OTP verification sẽ được triển khai
          trong Sprint 1B.
        </p>
        <a
          href={`tel:${process.env.NEXT_PUBLIC_HOTLINE ?? '0901234567'}`}
          className="inline-block rounded-lg bg-[var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--color-brand-primary-dark)]"
        >
          Gọi hotline để yêu cầu
        </a>
      </div>
    </div>
  )
}
