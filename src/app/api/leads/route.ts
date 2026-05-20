import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { writeLead } from '@/lib/leads/write'
import type { ApiErrorCode } from '@/types/api'

// Lead source enum — 05 §4.4
const LeadSourceEnum = z.enum([
  'hero_cta',
  'sa_ban_popup',
  'bang_gia_page',
  'phap_ly_page',
  'tu_van_page',
  'lien_he_page',
  'exit_intent',
  'popup_fallback',
  'lead_magnet',
  'footer_form',
  'vay_mua_calculator',
  'roi_calculator',
  'tien_do_page',
  'kham_pha_do_thi_page',
  'phan_khu_page',
])

const LeadSubmissionSchema = z.object({
  client_request_id: z.string().uuid('client_request_id phải là UUIDv4'),
  surface: LeadSourceEnum,
  persona: z.enum(['buyer_live', 'investor', 'broker']).optional(),
  phone: z.string().regex(/^(\+84|84|0)[0-9]{8,10}$/, 'Số điện thoại không hợp lệ').optional(),
  email: z.string().email('Email không hợp lệ').optional(),
  full_name: z.string().max(100).optional(),
  message: z.string().max(1000).optional(),
  consent_privacy: z.literal(true, {
    errorMap: () => ({ message: 'Bạn cần đồng ý chính sách bảo mật trước khi gửi.' }),
  }),
  consent_state: z.object({
    analytics: z.boolean(),
    marketing: z.boolean(),
  }),
  utm_source: z.string().max(100).optional(),
  utm_medium: z.string().max(100).optional(),
  utm_campaign: z.string().max(100).optional(),
  turnstile_token: z.string().min(1),
})

function errorResponse(
  code: ApiErrorCode,
  message: string,
  status: number,
  fieldErrors?: Record<string, string>
): NextResponse {
  const requestId = nanoid(12)
  return NextResponse.json(
    {
      ok: false,
      error: { code, message, ...(fieldErrors && { field_errors: fieldErrors }) },
      meta: { request_id: requestId },
    },
    { status, headers: { 'Cache-Control': 'no-store' } }
  )
}

export async function POST(req: NextRequest) {
  const requestId = nanoid(12)

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return errorResponse('validation_error', 'Vui lòng kiểm tra lại thông tin đã nhập.', 422)
  }

  const parsed = LeadSubmissionSchema.safeParse(body)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path.join('.')
      fieldErrors[field] = issue.message
    }

    // Check specifically for consent error
    const hasConsentError = parsed.error.issues.some(
      (i) => i.path.includes('consent_privacy')
    )
    if (hasConsentError) {
      return errorResponse('consent_required', 'Bạn cần đồng ý chính sách bảo mật trước khi gửi.', 422, fieldErrors)
    }

    return errorResponse('validation_error', 'Vui lòng kiểm tra lại thông tin đã nhập.', 422, fieldErrors)
  }

  const data = parsed.data

  // Require at least phone or email
  if (!data.phone && !data.email) {
    return errorResponse(
      'validation_error',
      'Vui lòng điền số điện thoại hoặc email.',
      422,
      { contact: 'Cần ít nhất một phương thức liên hệ.' }
    )
  }

  // Sprint P0: Turnstile verification stubbed — verify in Sprint 1B
  // const turnstileOk = await verifyTurnstile(data.turnstile_token, req)
  // if (!turnstileOk) return errorResponse('turnstile_failed', 'Xác thực thất bại. Vui lòng thử lại.', 403)

  try {
    const result = await writeLead({
      client_request_id: data.client_request_id,
      surface: data.surface,
      persona: data.persona,
      phone: data.phone,
      email: data.email,
      full_name: data.full_name,
      message: data.message,
      consent_privacy: data.consent_privacy,
      consent_state: data.consent_state,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      referrer: req.headers.get('referer') ?? undefined,
      request_id: requestId,
    })

    if (result.result_code === 'processing') {
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: 'conflict' as ApiErrorCode,
            message: 'Yêu cầu đang được xử lý. Vui lòng thử lại sau vài giây.',
          },
          meta: { request_id: requestId },
        },
        { status: 409, headers: { 'Cache-Control': 'no-store' } }
      )
    }

    return NextResponse.json(
      {
        ok: true,
        data: { result_code: result.result_code },
        meta: { request_id: requestId },
      },
      { status: result.result_code === 'created' ? 201 : 200, headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (err) {
    console.error('[api/leads] write error', {
      request_id: requestId,
      error: err instanceof Error ? err.message : 'unknown',
    })
    return errorResponse('server_error', 'Đã xảy ra lỗi. Vui lòng thử lại sau.', 500)
  }
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: { code: 'forbidden', message: 'Phương thức không được phép.' }, meta: { request_id: nanoid(12) } },
    { status: 405, headers: { Allow: 'POST', 'Cache-Control': 'no-store' } }
  )
}
