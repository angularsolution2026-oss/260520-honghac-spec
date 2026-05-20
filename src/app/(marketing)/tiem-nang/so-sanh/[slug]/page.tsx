import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

const VALID_SLUGS = ['hong-hac-vs-ecopark', 'hong-hac-vs-ciputra', 'hong-hac-vs-co-loa']

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  if (!VALID_SLUGS.includes(slug)) return {}
  return {
    title: `So sánh ${slug} — Hồng Hạc City`,
    description:
      'So sánh tham khảo. Thông tin được tổng hợp từ nguồn công khai tại thời điểm xuất bản.',
    robots: { index: false },
    alternates: { canonical: `/tiem-nang/so-sanh/${slug}` },
  }
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params
  if (!VALID_SLUGS.includes(slug)) notFound()

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="mb-6 text-4xl font-semibold text-[var(--color-brand-secondary)]">
          So sánh dự án
        </h1>
        <p className="mb-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4 text-sm text-[var(--color-text-secondary)]">
          Thông tin so sánh mang tính tham khảo, được tổng hợp từ nguồn công
          khai tại thời điểm xuất bản. Độ chính xác cần được xác minh trực
          tiếp.
        </p>
        <p className="text-[var(--color-text-secondary)]">
          Sprint P2 — nội dung so sánh đang được biên soạn.
        </p>
      </div>
    </div>
  )
}
