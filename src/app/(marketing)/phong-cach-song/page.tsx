import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Phong cách sống — Hồng Hạc City Bắc Ninh',
  description:
    'Khám phá lối sống tại Hồng Hạc City: không gian xanh, tiện ích cộng đồng và nhịp sống đô thị hiện đại tại Bắc Ninh.',
  alternates: { canonical: '/phong-cach-song' },
}

export default function PhongCachSongPage() {
  return (
    <div className="section-padding">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="mb-6 text-4xl font-semibold text-[var(--color-brand-secondary)]">
          Phong cách sống
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Sprint P1 — nội dung editorial lifestyle đang được chuẩn bị.
        </p>
      </div>
    </div>
  )
}
