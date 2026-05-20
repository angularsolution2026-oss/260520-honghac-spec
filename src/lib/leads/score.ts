// Lead scoring — 08 §6 (canonical SSOT)
// Initial score tính tại submit time từ surface + persona

import type { LeadSource } from '@/types/lead'

// Points per surface at submit time
const SURFACE_POINTS: Partial<Record<LeadSource, number>> = {
  vay_mua_calculator:   20,
  roi_calculator:       20,
  phan_khu_page:        15,
  bang_gia_page:        15,
  phap_ly_page:         15,
  lead_magnet:          15,
  sa_ban_popup:         10,
  tu_van_page:          10,
  lien_he_page:         10,
  tien_do_page:         10,
  footer_form:          10,
  exit_intent:           5,
  popup_fallback:        5,
  kham_pha_do_thi_page:  5,
  hero_cta:              5,
}

export type ScoreBand = 'hot' | 'warm' | 'cold' | 'junk'

export interface ScoreResult {
  score: number
  band: ScoreBand
  breakdown: {
    surface_points: number
    has_phone: boolean
    has_email: boolean
    has_name: boolean
  }
}

export function computeInitialScore(params: {
  surface: LeadSource
  phone?: string
  email?: string
  full_name?: string
}): ScoreResult {
  let score = 0

  // Surface points
  const surfacePoints = SURFACE_POINTS[params.surface] ?? 0
  score += surfacePoints

  // Contact richness bonus
  const hasPhone = !!params.phone
  const hasEmail = !!params.email
  const hasName = !!params.full_name

  if (hasPhone) score += 10
  if (hasEmail) score += 5
  if (hasPhone && hasEmail) score += 5  // both = higher intent
  if (hasName) score += 5

  const band: ScoreBand =
    score >= 70 ? 'hot' :
    score >= 40 ? 'warm' :
    score >= 20 ? 'cold' :
    'junk'

  return {
    score,
    band,
    breakdown: {
      surface_points: surfacePoints,
      has_phone: hasPhone,
      has_email: hasEmail,
      has_name: hasName,
    },
  }
}
