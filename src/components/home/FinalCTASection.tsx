import Link from 'next/link'

export function FinalCTASection() {
  return (
    <section className="section-padding bg-[var(--color-brand-secondary)]" aria-labelledby="final-cta-heading">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 id="final-cta-heading" className="mb-4 font-display text-3xl font-semibold text-white sm:text-4xl">
          Bắt đầu khám phá theo cách của bạn
        </h2>
        <p className="mb-8 text-white/70">
          Sa bàn tương tác, dữ liệu xác minh, chuyên viên tư vấn thực sự.
          Quyết định tốt hơn bắt đầu từ thông tin đúng.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/sa-ban"
            className="rounded-lg bg-[var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--color-brand-primary-dark)]"
          >
            Xem trên bản đồ tương tác
          </Link>
          <Link
            href="/tu-van"
            className="rounded-lg border border-white/30 px-6 py-3 font-medium text-white transition-all hover:border-white/60 hover:bg-white/10"
          >
            Trao đổi cùng chuyên viên tư vấn
          </Link>
        </div>
      </div>
    </section>
  )
}
