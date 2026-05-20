'use client'

import { useState, useId } from 'react'
import type { LeadSource } from '@/types/lead'
import type { ApiResponse } from '@/types/api'

interface Props {
  surface: LeadSource
  onSuccess?: () => void
}

type FormState = 'idle' | 'submitting' | 'success' | 'error' | 'offline'

// Lead form — 07 §10, 08, 06 §4.1
// phone OR email required; consent_privacy default unchecked
export function LeadForm({ surface, onSuccess }: Props) {
  const formId = useId()
  const [state, setState] = useState<FormState>('idle')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!navigator.onLine) {
      setState('offline')
      return
    }

    setState('submitting')
    setFieldErrors({})
    setErrorMsg('')

    const form = e.currentTarget
    const data = new FormData(form)

    const phone = (data.get('phone') as string | null)?.trim() || undefined
    const email = (data.get('email') as string | null)?.trim() || undefined
    const full_name = (data.get('full_name') as string | null)?.trim() || undefined
    const consent = data.get('consent_privacy') === 'on'

    const body = {
      client_request_id: crypto.randomUUID(),
      surface,
      phone,
      email,
      full_name,
      consent_privacy: consent as true,
      consent_state: { analytics: false, marketing: false },
      turnstile_token: 'stub-sprint-p0',
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const json: ApiResponse<{ result_code: string }> = await res.json()

      if (!json.ok) {
        if (json.error.field_errors) setFieldErrors(json.error.field_errors)
        setErrorMsg(json.error.message)
        setState('error')
        // Focus first field with error — 07 §10.3
        const firstErrorField = Object.keys(json.error.field_errors ?? {})[0]
        if (firstErrorField) {
          const el = form.querySelector<HTMLElement>(`[name="${firstErrorField}"]`)
          el?.focus()
        }
        return
      }

      setState('success')
      onSuccess?.()
    } catch {
      setState('error')
      setErrorMsg('Xin lỗi, có lỗi hệ thống. Vui lòng thử lại hoặc gọi hotline.')
    }
  }

  if (state === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-[var(--color-success)] bg-[var(--color-success-bg)] p-6 text-center"
      >
        <p className="font-medium text-[var(--color-success)]">
          Cảm ơn bạn. Chúng tôi sẽ liên hệ trong thời gian sớm nhất.
        </p>
      </div>
    )
  }

  const isOffline = state === 'offline'
  const isSubmitting = state === 'submitting'

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Form liên hệ tư vấn">
      {isOffline && (
        <div role="alert" aria-live="assertive" className="mb-4 rounded-lg border border-[var(--color-warning)] bg-[var(--color-warning-bg)] px-4 py-3 text-sm text-[var(--color-warning)]">
          Vui lòng kiểm tra kết nối Internet
        </div>
      )}
      {state === 'error' && errorMsg && !Object.keys(fieldErrors).length && (
        <div role="alert" aria-live="assertive" className="mb-4 rounded-lg border border-[var(--color-error)] bg-[var(--color-error-bg)] px-4 py-3 text-sm text-[var(--color-error)]">
          {errorMsg}
        </div>
      )}

      <div className="space-y-4">
        {/* Phone */}
        <div>
          <label
            htmlFor={`${formId}-phone`}
            className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]"
          >
            Số điện thoại
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            inputMode="numeric"
            placeholder="0901 234 567"
            autoComplete="tel"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-base text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] transition-colors focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]"
            aria-describedby={fieldErrors['phone'] ? `${formId}-phone-error` : undefined}
            aria-invalid={!!fieldErrors['phone']}
            disabled={isSubmitting}
          />
          {fieldErrors['phone'] && (
            <p id={`${formId}-phone-error`} role="alert" className="mt-1 text-xs text-[var(--color-error)]">
              {fieldErrors['phone']}
            </p>
          )}
        </div>

        {/* Full name */}
        <div>
          <label
            htmlFor={`${formId}-name`}
            className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]"
          >
            Họ tên <span className="text-[var(--color-text-muted)]">(không bắt buộc)</span>
          </label>
          <input
            id={`${formId}-name`}
            name="full_name"
            type="text"
            placeholder="Nguyễn Văn A"
            autoComplete="name"
            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-base text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] transition-colors focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]"
            disabled={isSubmitting}
          />
        </div>

        {/* Consent — default unchecked per 07 §10 */}
        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              name="consent_privacy"
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[var(--color-brand-primary)]"
              required
              aria-required="true"
              aria-describedby={fieldErrors['consent_privacy'] ? `${formId}-consent-error` : undefined}
              disabled={isSubmitting}
            />
            <span className="text-sm text-[var(--color-text-secondary)]">
              Tôi đồng ý với{' '}
              <a
                href="/chinh-sach-bao-mat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-brand-primary)] underline"
              >
                Chính sách bảo mật
              </a>
            </span>
          </label>
          {fieldErrors['consent_privacy'] && (
            <p id={`${formId}-consent-error`} role="alert" className="mt-1 text-xs text-[var(--color-error)]">
              {fieldErrors['consent_privacy']}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || isOffline}
          className="w-full rounded-lg bg-[var(--color-brand-primary)] px-6 py-3 font-medium text-white transition-colors hover:bg-[var(--color-brand-primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
          aria-describedby={isSubmitting ? `${formId}-submitting` : undefined}
        >
          {isSubmitting ? (
            <span id={`${formId}-submitting`}>Đang gửi...</span>
          ) : (
            'Nhận tư vấn riêng'
          )}
        </button>
      </div>
    </form>
  )
}
