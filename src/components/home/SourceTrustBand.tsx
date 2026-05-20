// Trust signals text — 07 §8 (no partner logos until partnerLogoApprovalStatus = approved)
// Platform/official-site distinction per 00 §2

export function SourceTrustBand() {
  return (
    <section
      className="border-y border-[var(--color-border)] bg-[var(--color-surface-subtle)] py-6"
      aria-label="Nguồn thông tin và tính minh bạch"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-between">
          <p className="text-xs text-[var(--color-text-muted)]">
            Thông tin tham chiếu từ nguồn Tier 1:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              'Quyết định QH 197,76ha',
              'CTCP ĐT Công đoàn NHCT',
              'Hợp tác Nomura Real Estate',
              'Nền tảng tư vấn độc lập',
            ].map((signal) => (
              <span
                key={signal}
                className="text-xs font-medium text-[var(--color-text-secondary)]"
              >
                {signal}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
