// PII hashing — 05 §2.1, 00 §6 Hard Rule 7
// phone_hash / email_hash: SHA-256, first 16 hex chars (dedup key only)
// NEVER log raw PII — only log hash

import { createHash } from 'crypto'

export function hashPii(value: string): string {
  return createHash('sha256')
    .update(value.toLowerCase().trim())
    .digest('hex')
    .slice(0, 16)
}

export function hashRequestShape(params: {
  surface: string
  phone?: string
  email?: string
}): string {
  const normalized = JSON.stringify({
    surface: params.surface,
    phone_present: !!params.phone,
    email_present: !!params.email,
  })
  return createHash('sha256').update(normalized).digest('hex').slice(0, 16)
}
