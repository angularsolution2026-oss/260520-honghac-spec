import type { Metadata } from 'next'
import { LeadForm } from '@/components/forms/LeadForm'

export const metadata: Metadata = {
  title: 'Liên hệ — Hồng Hạc City Bắc Ninh',
  description: 'Liên hệ tư vấn về dự án Hồng Hạc City Bắc Ninh.',
  alternates: { canonical: '/lien-he' },
}

export default function LienHePage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-4 text-4xl font-semibold text-[var(--color-brand-secondary)]">
          Liên hệ
        </h1>
        <LeadForm surface="lien_he_page" />
      </div>
    </div>
  )
}
