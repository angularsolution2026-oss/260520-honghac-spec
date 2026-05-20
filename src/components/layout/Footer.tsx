import Link from 'next/link'

// Disclaimer 00 §11.1 — bắt buộc xuất hiện ít nhất 2 vị trí
const DISCLAIMER_WEBSITE =
  'Website này là nền tảng thông tin tư vấn bất động sản độc lập. Mọi thông tin cần được đối chiếu với nguồn chính thức từ chủ đầu tư. Thông tin giá, tiến độ, pháp lý có thể thay đổi theo từng giai đoạn.'

export function Footer() {
  const hotline = process.env.NEXT_PUBLIC_HOTLINE ?? '0901234567'
  const zaloUrl = process.env.NEXT_PUBLIC_ZALO_OA_URL ?? 'https://zalo.me'

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-brand-secondary)]" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="font-display text-lg font-semibold text-white">
              Hồng Hạc City Bắc Ninh
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              Nền tảng thông tin tư vấn bất động sản độc lập.
            </p>
            {/* Disclaimer 00 §11.1 */}
            <p className="mt-4 text-xs leading-relaxed text-[var(--color-text-muted)]">
              {DISCLAIMER_WEBSITE}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="mb-4 text-sm font-medium text-white">Khám phá</p>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li><Link href="/sa-ban" className="transition-colors hover:text-white">Sa bàn tương tác</Link></li>
              <li><Link href="/kham-pha-do-thi" className="transition-colors hover:text-white">Khám phá đô thị</Link></li>
              <li><Link href="/tiem-nang" className="transition-colors hover:text-white">Tiềm năng</Link></li>
              <li><Link href="/tien-do" className="transition-colors hover:text-white">Tiến độ</Link></li>
              <li><Link href="/phong-cach-song" className="transition-colors hover:text-white">Phong cách sống</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-sm font-medium text-white">Liên hệ</p>
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              <li>
                <a
                  href={`tel:${hotline}`}
                  className="transition-colors hover:text-white"
                  aria-label={`Gọi hotline ${hotline}`}
                >
                  Hotline: {hotline}
                </a>
              </li>
              <li>
                <a
                  href={zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Zalo OA
                </a>
              </li>
              <li><Link href="/tu-van" className="transition-colors hover:text-white">Tư vấn riêng</Link></li>
              <li><Link href="/lien-he" className="transition-colors hover:text-white">Liên hệ</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'Hồng Hạc City Bắc Ninh'}. Nền tảng tư vấn độc lập.
          </p>
          <div className="flex gap-4 text-xs text-[var(--color-text-muted)]">
            <Link href="/chinh-sach-bao-mat" className="transition-colors hover:text-white">
              Chính sách bảo mật
            </Link>
            <Link href="/yeu-cau-du-lieu" className="transition-colors hover:text-white">
              Yêu cầu dữ liệu
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
