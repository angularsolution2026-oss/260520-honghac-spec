import Link from 'next/link'
import { SaBanPreview } from '@/components/map/SaBanPreview'

// Disclaimer 00 §11.1 — second occurrence (Footer is first)
const DISCLAIMER =
  'Thông tin tham khảo. Vui lòng xác nhận với nguồn chính thức của chủ đầu tư.'

export function HeroSection() {
  return (
    <section
      data-hero
      className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-[var(--color-brand-secondary)] px-4 py-20 text-center lg:flex-row lg:text-left"
      aria-labelledby="hero-heading"
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at 60% 40%, #B5893A 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        {/* Text content */}
        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--color-brand-primary)]">
            Nền tảng tư vấn độc lập · Hồng Hạc City Bắc Ninh
          </p>
          {/* H1: urban statement — 00 §8, 07 §2.3 */}
          <h1
            id="hero-heading"
            className="mb-6 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Khám phá đô thị tương lai{' '}
            <span className="text-[var(--color-brand-primary)]">197 ha</span>{' '}
            tại Bắc Ninh
          </h1>
          <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/70">
            Hệ thống phân tích quyết định bất động sản. Xem sa bàn, theo dõi
            tiến độ, hiểu pháp lý — trước khi quyết định.
          </p>

          {/* Trust disclaimer — 00 §11.1 */}
          <p className="mb-8 text-xs text-white/40">{DISCLAIMER}</p>

          {/* CTAs — canonical 00 §8. No "Đăng ký ngay" */}
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link
              href="/sa-ban"
              className="rounded-lg bg-[var(--color-brand-primary)] px-6 py-3 font-medium text-white shadow-lg transition-all duration-[var(--duration-fast)] hover:bg-[var(--color-brand-primary-dark)] hover:shadow-xl"
            >
              Khám phá sa bàn
            </Link>
            <Link
              href="/bang-gia"
              className="rounded-lg border border-white/30 px-6 py-3 font-medium text-white transition-all duration-[var(--duration-fast)] hover:border-white/60 hover:bg-white/10"
            >
              Xem bảng giá tham khảo
            </Link>
            <Link
              href="/tu-van"
              className="rounded-lg border border-white/20 px-6 py-3 font-medium text-white/70 transition-all duration-[var(--duration-fast)] hover:border-white/40 hover:text-white"
            >
              Nhận tư vấn riêng
            </Link>
          </div>
        </div>

        {/* Sa bàn preview — Sprint 1A: static shell, NO maplibre-gl */}
        <div className="flex justify-center lg:justify-end">
          <SaBanPreview />
        </div>
      </div>
    </section>
  )
}
