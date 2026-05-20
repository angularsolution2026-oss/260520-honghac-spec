// Lead source enum — 05 §4.4 (prop name = surface, DB field = lead_source)
export type LeadSource =
  | 'hero_cta'
  | 'sa_ban_popup'
  | 'bang_gia_page'
  | 'phap_ly_page'
  | 'tu_van_page'
  | 'lien_he_page'
  | 'exit_intent'
  | 'popup_fallback'
  | 'lead_magnet'
  | 'footer_form'
  | 'vay_mua_calculator'
  | 'roi_calculator'
  | 'tien_do_page'
  | 'kham_pha_do_thi_page'
  | 'phan_khu_page'

export type Persona = 'buyer_live' | 'investor' | 'broker'

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'site_visit' | 'negotiating' | 'contracted' | 'lost'

export interface LeadSubmission {
  client_request_id: string
  surface: LeadSource
  persona?: Persona
  phone?: string
  email?: string
  full_name?: string
  message?: string
  consent_privacy: true
  consent_state: {
    analytics: boolean
    marketing: boolean
  }
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  calculator_snapshot?: Record<string, unknown>
  turnstile_token: string
}
