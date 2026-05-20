import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ 'lot-id': string }>
}

// Sprint P1 — programmatic SEO per 00 §4.2
// lot_code invalid → 404 hard (no soft page, no lead form)
// ThinContentPolicy → noindex + safe-default fields

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { 'lot-id': lotId } = await params

  // TODO Sprint 1B: fetch from Payload CMS
  // Placeholder: noindex until data is confirmed Tier 1
  return {
    title: `Lô đất ${lotId} — Hồng Hạc City`,
    description: 'Thông tin lô đất đang được cập nhật.',
    robots: { index: false, follow: false },
    alternates: { canonical: `/sa-ban/${lotId}` },
  }
}

export default async function LotDetailPage({ params }: Props) {
  const { 'lot-id': lotId } = await params

  // Sprint 1A: deny all — return 404 until Tier 1 data exists
  // Sprint 1B: validate lot_code, apply NotFoundLotPolicy + ThinContentPolicy
  if (!lotId || lotId.trim() === '') {
    notFound()
  }

  // Stub — Sprint 1B will implement full lot detail
  notFound()
}
