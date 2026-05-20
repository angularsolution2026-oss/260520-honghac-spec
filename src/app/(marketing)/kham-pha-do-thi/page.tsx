import type { Metadata } from 'next'
import { FallbackModal } from '@/components/forms/FallbackModal'

export const metadata: Metadata = {
  title: 'Khám phá đô thị — Hồng Hạc City 197ha Bắc Ninh',
  description:
    'Tìm hiểu quy hoạch đô thị Hồng Hạc City: 197,76ha tại Bắc Ninh, tầm nhìn 20 năm, hạ tầng kết nối và 3 phân khu chức năng.',
  alternates: { canonical: '/kham-pha-do-thi' },
}

export default function KhamPhaDoThiPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="mb-6 text-4xl font-semibold text-[var(--color-brand-secondary)]">
          Khám phá đô thị Hồng Hạc City
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Nội dung đang được cập nhật. Sprint 1A — trang này sẽ có đầy đủ phân
          tích hạ tầng, quy hoạch và tiềm năng đô thị trong Sprint 1B.
        </p>
      </div>
      <FallbackModal trigger="cta_kham_pha_do_thi" />
    </div>
  )
}
