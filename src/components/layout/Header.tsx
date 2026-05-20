'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Navigation per 00 §5.1 (locked)
const NAV_ITEMS = [
  { label: 'Khám phá đô thị', href: '/kham-pha-do-thi' },
  { label: 'Sa bàn', href: '/sa-ban' },
  { label: 'Tiềm năng', href: '/tiem-nang' },
  { label: 'Tiến độ', href: '/tien-do' },
  { label: 'Phong cách sống', href: '/phong-cach-song' },
  { label: 'Tư vấn', href: '/tu-van' },
] as const

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      {/* Skip to main content — WCAG 2.1 AA */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[var(--color-brand-primary)] focus:px-4 focus:py-2 focus:text-white"
      >
        Bỏ qua đến nội dung chính
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-[var(--duration-base)] ${
          scrolled
            ? 'bg-[var(--color-surface)] shadow-sm'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--color-brand-secondary)]"
            aria-label="Hồng Hạc City — Trang chủ"
          >
            <span className="font-display text-lg font-semibold leading-none">
              Hồng Hạc City
            </span>
            <span className="hidden text-xs text-[var(--color-text-muted)] sm:inline">
              Bắc Ninh
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Navigation chính" className="hidden lg:block">
            <ul className="flex items-center gap-1" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded px-3 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-brand-secondary)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/sa-ban"
              className="hidden rounded-lg bg-[var(--color-brand-primary)] px-4 py-2 text-sm font-medium text-white transition-colors duration-[var(--duration-fast)] hover:bg-[var(--color-brand-primary-dark)] sm:inline-block"
            >
              Khám phá sa bàn
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded text-[var(--color-text-secondary)] lg:hidden"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <nav
            id="mobile-nav"
            aria-label="Navigation di động"
            className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 pb-4 pt-2 lg:hidden"
          >
            <ul className="flex flex-col gap-1" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded px-3 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-brand-secondary)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  href="/sa-ban"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg bg-[var(--color-brand-primary)] px-4 py-2.5 text-center text-sm font-medium text-white"
                >
                  Khám phá sa bàn
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Spacer to prevent content hidden behind fixed header */}
      <div className="h-16" aria-hidden="true" />
    </>
  )
}
