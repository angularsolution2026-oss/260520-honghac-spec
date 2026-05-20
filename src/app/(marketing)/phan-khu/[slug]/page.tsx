import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FallbackModal } from '@/components/forms/FallbackModal'

interface Props {
  params: Promise<{ slug: string }>
}

const ACTIVE_SLUGS = ['hong-phat'] as const
const DEFERRED_SLUGS = ['hong-thinh', 'hong-phuc'] as const

const PHAN_KHU_META: Record<string, { name: string; description: string }> = {
  'hong-phat': {
    name: 'Phân khu Hồng Phát',
    description:
      'Khám phá phân khu Hồng Phát tại Hồng Hạc City: vị trí, quy hoạch, tiến độ và các lô đất đang mở bán.',
  },
  'hong-thinh': {
    name: 'Phân khu Hồng Thịnh',
    description: 'Thông tin phân khu Hồng Thịnh đang được cập nhật.',
  },
  'hong-phuc': {
    name: 'Phân khu Hồng Phúc',
    description: 'Thông tin phân khu Hồng Phúc đang được cập nhật.',
  },
}

export async function generateStaticParams() {
  return [...ACTIVE_SLUGS, ...DEFERRED_SLUGS].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const meta = PHAN_KHU_META[slug]
  if (!meta) return {}
  return {
    title: `${meta.name} — Hồng Hạc City Bắc Ninh`,
    description: meta.description,
    alternates: { canonical: `/phan-khu/${slug}` },
  }
}

export default async function PhanKhuPage({ params }: Props) {
  const { slug } = await params
  const meta = PHAN_KHU_META[slug]
  if (!meta) notFound()

  const isDeferred = (DEFERRED_SLUGS as readonly string[]).includes(slug)

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="mb-6 text-4xl font-semibold text-[var(--color-brand-secondary)]">
          {meta.name}
        </h1>
        {isDeferred ? (
          <p className="text-[var(--color-text-secondary)]">
            Thông tin phân khu đang được cập nhật. Theo dõi phase tiếp theo.
          </p>
        ) : (
          <p className="text-[var(--color-text-secondary)]">
            Sprint P1 — nội dung chi tiết phân khu Hồng Phát đang được chuẩn
            bị từ nguồn Tier 1.
          </p>
        )}
      </div>
      <FallbackModal trigger={`cta_phan_khu_${slug}`} />
    </div>
  )
}
