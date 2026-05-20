import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Trang không tồn tại — Hồng Hạc City',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[var(--color-brand-primary)]">
        404
      </p>
      <h1 className="mb-4 text-3xl font-semibold text-[var(--color-brand-secondary)]">
        Trang này không tồn tại
      </h1>
      <p className="mb-8 max-w-md text-[var(--color-text-secondary)]">
        Có thể đường dẫn đã thay đổi. Bạn cần hỗ trợ?
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-[var(--color-brand-primary)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-primary-dark)]"
        >
          Về trang chủ
        </Link>
        <Link
          href="/bang-gia"
          className="rounded-lg border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface-subtle)]"
        >
          Xem bảng giá
        </Link>
        <a
          href={`https://zalo.me/placeholder`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface-subtle)]"
        >
          Liên hệ Zalo
        </a>
      </div>
    </div>
  )
}
