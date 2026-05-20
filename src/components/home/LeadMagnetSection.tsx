import { LeadForm } from '@/components/forms/LeadForm'

export function LeadMagnetSection() {
  return (
    <section className="section-padding bg-[var(--color-surface-subtle)]" aria-labelledby="lead-magnet-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 id="lead-magnet-heading" className="mb-4 font-display text-3xl font-semibold text-[var(--color-brand-secondary)] sm:text-4xl">
              Nhận gợi ý cá nhân hóa
            </h2>
            <p className="mb-6 text-[var(--color-text-secondary)]">
              Trao đổi cùng chuyên viên tư vấn về phương án phù hợp với nhu
              cầu và ngân sách của bạn. Không có cam kết, không có áp lực.
            </p>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              {[
                'Thông tin pháp lý từ nguồn xác minh',
                'Phân tích tiềm năng theo giai đoạn',
                'Tính phương án sở hữu cụ thể',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-primary)]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-sm">
            <LeadForm surface="lead_magnet" />
          </div>
        </div>
      </div>
    </section>
  )
}
