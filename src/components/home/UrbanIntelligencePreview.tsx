import Link from 'next/link'

export function UrbanIntelligencePreview() {
  return (
    <section className="section-padding bg-[var(--color-brand-secondary)]" aria-labelledby="urban-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--color-brand-primary)]">
            Tầm nhìn 20 năm
          </p>
          <h2 id="urban-heading" className="mb-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Đô thị 197ha tại cửa ngõ Bắc Ninh
          </h2>
          <p className="mb-10 mx-auto max-w-2xl text-white/70">
            Hồng Hạc City là khu đô thị quy mô lớn, nằm trong vùng kinh tế
            trọng điểm phía Bắc. 3 phân khu chức năng, hạ tầng kết nối liên
            vùng và tầm nhìn phát triển dài hạn.
          </p>

          <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { value: '197,76 ha', label: 'Tổng diện tích quy hoạch', note: 'Xác minh Tier 1' },
              { value: '3 phân khu', label: 'Hồng Phát · Hồng Thịnh · Hồng Phúc', note: 'Quy hoạch phân khu' },
              { value: 'Bắc Ninh', label: 'Tỉnh cửa ngõ Hà Nội phía Đông', note: 'Vị trí chiến lược' },
            ].map((item) => (
              <div key={item.value} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <p className="mb-1 font-display text-2xl font-semibold text-[var(--color-brand-primary)]">
                  {item.value}
                </p>
                <p className="text-sm text-white/70">{item.label}</p>
                <p className="mt-1 text-xs text-white/40">{item.note}</p>
              </div>
            ))}
          </div>

          <Link
            href="/kham-pha-do-thi"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-medium text-white transition-all hover:border-white/60 hover:bg-white/10"
          >
            Nhận cập nhật hạ tầng
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
