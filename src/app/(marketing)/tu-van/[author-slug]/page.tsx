import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'

interface Props {
  params: Promise<{ 'author-slug': string }>
}

const AUTHORS: Record<string, { name: string; title: string; bio: string; certId: string; photo: string }> = {
  'ngo-kim-quyen': {
    name: 'Ngô Kim Quyên',
    title: 'Chuyên viên tư vấn bất động sản — 21 năm kinh nghiệm',
    bio: 'Chuyên gia tư vấn bất động sản với hơn 21 năm kinh nghiệm tại thị trường TP.HCM và các tỉnh lân cận. Chứng chỉ hành nghề môi giới bất động sản số 151719 do Sở Xây dựng TP.HCM cấp.',
    certId: '#151719',
    photo: '/people/ngo-kim-quyen.jpg',
  },
}

export async function generateStaticParams() {
  return Object.keys(AUTHORS).map((slug) => ({ 'author-slug': slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { 'author-slug': slug } = await params
  const author = AUTHORS[slug]
  if (!author) return {}
  return {
    title: `${author.name} — Chuyên viên tư vấn`,
    description: author.bio,
    alternates: { canonical: `/tu-van/${slug}` },
  }
}

export default async function AuthorPage({ params }: Props) {
  const { 'author-slug': slug } = await params
  const author = AUTHORS[slug]
  if (!author) notFound()

  return (
    <div className="section-padding">
      <div className="mx-auto max-w-3xl px-4">
        <div className="flex flex-col items-start gap-8 md:flex-row">
          <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-full">
            <Image
              src={author.photo}
              alt={`Ảnh chân dung ${author.name}`}
              fill
              className="object-cover"
              sizes="192px"
            />
          </div>
          <div>
            <h1 className="mb-2 text-3xl font-semibold text-[var(--color-brand-secondary)]">
              {author.name}
            </h1>
            <p className="mb-4 font-medium text-[var(--color-brand-primary)]">
              {author.title}
            </p>
            <p className="mb-4 text-[var(--color-text-secondary)]">
              {author.bio}
            </p>
            <p className="text-sm text-[var(--color-text-muted)]">
              Chứng chỉ hành nghề: {author.certId}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
