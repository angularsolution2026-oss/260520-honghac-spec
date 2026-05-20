// API error codes — 06 §4.0 canonical registry
export type ApiErrorCode =
  | 'validation_error'
  | 'consent_required'
  | 'turnstile_failed'
  | 'auth_required'
  | 'forbidden'
  | 'not_found'
  | 'conflict'
  | 'stale_write'
  | 'rate_limited'
  | 'timeout'
  | 'dependency_unavailable'
  | 'server_error'

export interface ApiSuccessResponse<T = unknown> {
  ok: true
  data: T
  meta?: {
    request_id: string
    page_info?: {
      page_size: number
      next_cursor: string | null
      has_more: boolean
      sort: string
    }
  }
}

export interface ApiErrorResponse {
  ok: false
  error: {
    code: ApiErrorCode
    message: string
    field_errors?: Record<string, string>
    retry_after_seconds?: number
  }
  meta: {
    request_id: string
  }
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse
