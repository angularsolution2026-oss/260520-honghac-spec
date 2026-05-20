import Link from 'next/link'

// Sprint 1A: Shell page — no maplibre-gl import
// Sprint 1B: Replace inner content with dynamic import SaBanMap (ssr:false)
// Per 02 §2: MapLibre ONLY loads in /sa-ban and ONLY via dynamic import

export function SaBanShell() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Page header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-semibold text-[var(--color-brand-secondary)]">
              Sa bàn Hồng Hạc City
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              197ha · Bắc Ninh · 3 phân khu
            </p>
          </div>
          <Link
            href="/kham-pha-do-thi"
            className="text-sm text-[var(--color-brand-primary)] hover:underline"
          >
            Tìm hiểu thêm về dự án
          </Link>
        </div>
      </div>

      {/* Map area — Sprint 1A: placeholder */}
      <div className="relative flex flex-1 items-center justify-center bg-[var(--color-brand-secondary)]">
        {/* Placeholder visual */}
        <div className="text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
            <svg className="h-10 w-10 text-[var(--color-brand-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <p className="mb-2 font-display text-2xl font-semibold text-white">
            Sa bàn tương tác
          </p>
          <p className="mb-6 max-w-sm text-sm text-white/60">
            Bản đồ quyết định đang được chuẩn bị trong Sprint 1B. Khám phá
            tiến độ và thông tin dự án trong khi chờ đợi.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/tien-do"
              className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Theo dõi tiến độ
            </Link>
            <Link
              href="/tu-van"
              className="rounded-lg bg-[var(--color-brand-primary)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-primary-dark)]"
            >
              Trao đổi cùng chuyên viên
            </Link>
          </div>
        </div>

        {/* Accessibility: text alternative for screen readers */}
        <div className="sr-only">
          Sa bàn tương tác Hồng Hạc City: bản đồ 197 hecta với 3 phân khu
          Hồng Phát, Hồng Thịnh, Hồng Phúc tại Bắc Ninh. Cho phép xem trạng
          thái từng lô đất và thông tin hạ tầng.
        </div>
      </div>
    </div>
  )
}
