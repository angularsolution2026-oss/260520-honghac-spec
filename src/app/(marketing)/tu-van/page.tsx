import type { Metadata } from 'next'
import { LeadForm } from '@/components/forms/LeadForm'

export const metadata: Metadata = {
  title: 'Tư vấn riêng — Hồng Hạc City Bắc Ninh',
  description:
    'Trao đổi cùng chuyên viên tư vấn về Hồng Hạc City. Nhận gợi ý cá nhân hóa phù hợp với nhu cầu và ngân sách của bạn.',
  alternates: { canonical: '/tu-van' },
}

export default function TuVanPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-4 text-4xl font-semibold text-[var(--color-brand-secondary)]">
          Trao đổi cùng chuyên viên
        </h1>
        <p className="mb-8 text-[var(--color-text-secondary)]">
          Nhận gợi ý cá nhân hóa phù hợp với nhu cầu gia đình và ngân sách
          của bạn. Không có cam kết, không có áp lực.
        </p>
        <LeadForm surface="tu_van_page" />
      </div>
    </div>
  )
}
