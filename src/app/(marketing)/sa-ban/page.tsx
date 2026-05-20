import type { Metadata } from 'next'
import { SaBanShell } from '@/components/map/SaBanShell'

export const metadata: Metadata = {
  title: 'Sa bàn tương tác — Khám phá từng lô đất Hồng Hạc City',
  description:
    'Sa bàn quyết định tương tác. Khám phá 197ha đô thị Hồng Hạc City, xem trạng thái từng lô, hạ tầng và tiến độ theo thời gian thực.',
  alternates: {
    canonical: '/sa-ban',
  },
}

// Sprint 1A: SSG shell — no maplibre-gl import
// Sprint 1B: Hybrid SSR shell + CSR map via dynamic import
export default function SaBanPage() {
  return <SaBanShell />
}
