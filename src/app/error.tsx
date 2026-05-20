'use client'

import { useEffect } from 'react'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

// Sentry captures automatically via next-config integration
// Error ID shown is first 8 chars of digest — no stack trace exposed
export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    // Sentry auto-captures; additional manual logging if needed
    console.error('[GlobalError]', error.digest)
  }, [error])

  const errorId = error.digest?.slice(0, 8) ?? 'unknown'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="mb-2 text-sm font-medium uppercase tracking-widest text-[var(--color-error)]">
        Lỗi hệ thống
      </p>
      <h1 className="mb-4 text-3xl font-semibold text-[var(--color-brand-secondary)]">
        Xin lỗi, có lỗi nhỏ
      </h1>
      <p className="mb-2 max-w-md text-[var(--color-text-secondary)]">
        Dữ liệu của bạn vẫn an toàn. Vui lòng thử lại.
      </p>
      <p className="mb-8 text-xs text-[var(--color-text-muted)]">
        Mã lỗi: {errorId}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={reset}
          className="rounded-lg bg-[var(--color-brand-primary)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-primary-dark)]"
        >
          Thử lại
        </button>
        <a
          href="https://zalo.me/placeholder"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface-subtle)]"
        >
          Liên hệ qua Zalo
        </a>
      </div>
    </div>
  )
}
