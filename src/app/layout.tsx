import type { Metadata } from 'next'
import { Playfair_Display, Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-be-vietnam',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bacninhhonghaccity.vn'
  ),
  title: {
    default: 'Hồng Hạc City Bắc Ninh — Nền tảng quyết định bất động sản',
    template: '%s | Hồng Hạc City Bắc Ninh',
  },
  description:
    'Nền tảng thông tin tư vấn bất động sản độc lập. Khám phá sa bàn tương tác, phân tích hạ tầng, pháp lý và tiềm năng tại dự án Hồng Hạc City, Bắc Ninh.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Hồng Hạc City Bắc Ninh',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="vi"
      className={`${playfairDisplay.variable} ${beVietnamPro.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
