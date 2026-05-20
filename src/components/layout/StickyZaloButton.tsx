'use client'

import { useEffect, useState } from 'react'

// Sticky CTA bar chỉ hiện SAU khi scroll qua 80% hero — 07 §7
export function StickyZaloButton() {
  const [visible, setVisible] = useState(false)
  const zaloUrl = process.env.NEXT_PUBLIC_ZALO_OA_URL ?? 'https://zalo.me'

  useEffect(() => {
    const handler = () => {
      const heroEl = document.querySelector('[data-hero]')
      if (!heroEl) {
        setVisible(window.scrollY > 200)
        return
      }
      const heroBottom = heroEl.getBoundingClientRect().bottom + window.scrollY
      setVisible(window.scrollY > heroBottom * 0.8)
    }

    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  if (!visible) return null

  return (
    <a
      href={zaloUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Liên hệ qua Zalo"
      className="fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#0068FF] shadow-lg transition-transform duration-[var(--duration-fast)] hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0068FF]"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.944 9.944 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.95 13.618c-.2.562-.993 1.03-1.623 1.165-.43.09-.99.162-2.877-.618-2.418-.988-3.973-3.448-4.093-3.608-.12-.16-.978-1.302-.978-2.484s.62-1.763.839-2.004c.22-.242.48-.302.64-.302.16 0 .32 0 .46.008.148.008.346-.056.54.413.2.482.68 1.663.74 1.784.06.12.1.261.02.42-.08.162-.12.262-.24.402-.12.14-.252.313-.36.42-.12.12-.244.25-.104.49.14.24.62.983 1.33 1.591.914.782 1.685 1.024 1.924 1.138.24.114.38.095.52-.057.14-.152.6-.702.76-.943.16-.242.32-.202.54-.122.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.562-.14 1.047z" />
      </svg>
    </a>
  )
}
