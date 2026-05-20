// Lead write service — 05 §2.1, 06 §4.1, 05 §5.6 (atomicity)
// Execution order per 06 §4.1 §server-execution-order
// NO raw PII in logs — only hashes + request_id

import { FieldValue, Timestamp } from 'firebase-admin/firestore'
import { getAdminDb } from '@/lib/firebase/admin'
import { generateUlid } from './ulid'
import { hashPii, hashRequestShape } from './hash'
import { computeInitialScore } from './score'
import { sendTelegramAlert } from './telegram'
import type { LeadSource } from '@/types/lead'

export interface WriteLeadParams {
  client_request_id: string
  surface: LeadSource
  persona?: string
  phone?: string
  email?: string
  full_name?: string
  message?: string
  consent_privacy: true
  consent_state: { analytics: boolean; marketing: boolean }
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  calculator_snapshot?: Record<string, unknown>
  referrer?: string
  request_id: string
}

export type WriteLeadResult =
  | { result_code: 'created'; lead_id: string }
  | { result_code: 'merged'; lead_id: string }
  | { result_code: 'processing' }

// Normalise: trim, empty string → null per 05 §5
function norm(v: string | undefined): string | null {
  const t = v?.trim()
  return t && t.length > 0 ? t : null
}

export async function writeLead(
  params: WriteLeadParams
): Promise<WriteLeadResult> {
  const db = getAdminDb()
  const idempotencyRef = db
    .collection('submission_idempotency')
    .doc(params.client_request_id)

  // Step 4: Check idempotency — 06 §4.1
  const existing = await idempotencyRef.get()
  if (existing.exists) {
    const data = existing.data()!
    if (data.status === 'succeeded') {
      return {
        result_code: data.stored_result_code ?? 'merged',
        lead_id: data.lead_id,
      }
    }
    if (data.status === 'processing') {
      // Stuck >30s → treat as failed, re-process
      const createdAt = (data.created_at as Timestamp).toMillis()
      if (Date.now() - createdAt < 30_000) {
        return { result_code: 'processing' }
      }
      // Stale processing — fall through to re-process
    }
  }

  // Step 5: Write idempotency record as 'processing'
  const now = FieldValue.serverTimestamp()
  const requestHash = hashRequestShape({
    surface: params.surface,
    phone: params.phone,
    email: params.email,
  })

  await idempotencyRef.set({
    client_request_id: params.client_request_id,
    status: 'processing',
    lead_id: null,
    stored_result_code: null,
    request_hash: requestHash,
    surface: params.surface,
    route: '/api/leads',
    created_at: now,
    expires_at: Timestamp.fromMillis(Date.now() + 24 * 60 * 60 * 1000),
  })

  // Step 6 + 7: Write lead + compute score (Firestore transaction)
  const phoneHash = params.phone ? hashPii(params.phone) : null
  const emailHash = params.email ? hashPii(params.email) : null
  const leadId = generateUlid()

  const scoreResult = computeInitialScore({
    surface: params.surface,
    phone: params.phone,
    email: params.email,
    full_name: params.full_name,
  })

  const leadRef = db.collection('leads').doc(leadId)

  let resultCode: 'created' | 'merged' = 'created' as 'created' | 'merged'

  await db.runTransaction(async (tx) => {
    // Check for dedup by phone_hash to detect merge
    if (phoneHash) {
      const dupeSnap = await db
        .collection('leads')
        .where('phone_hash', '==', phoneHash)
        .where('is_deleted', '==', false)
        .limit(1)
        .get()

      if (!dupeSnap.empty) {
        // Existing lead — update score if higher, update surface
        const dupeRef = dupeSnap.docs[0]!.ref
        const existingScore = dupeSnap.docs[0]!.data().lead_score ?? 0
        const newScore = Math.max(existingScore, scoreResult.score)
        tx.update(dupeRef, {
          lead_score: newScore,
          updated_at: now,
        })
        // Return merged via idempotency update below
        resultCode = 'merged'
        return
      }
    }

    // New lead write
    tx.set(leadRef, {
      lead_id: leadId,
      full_name: norm(params.full_name),
      phone: norm(params.phone),
      email: norm(params.email),
      phone_hash: phoneHash,
      email_hash: emailHash,
      persona: params.persona ?? null,
      interested_product: null,
      budget_range: 'chua_xac_dinh',
      message: norm(params.message),
      lead_source: params.surface,
      lead_status: 'new',
      lead_score: scoreResult.score,
      score_breakdown: scoreResult.breakdown,
      consent_privacy: params.consent_privacy,
      consent_state: params.consent_state,
      calculator_snapshot: params.calculator_snapshot ?? null,
      download_events: [],
      utm_source: norm(params.utm_source),
      utm_medium: norm(params.utm_medium),
      utm_campaign: norm(params.utm_campaign),
      referrer: norm(params.referrer),
      routing_status: 'unassigned',
      routing_sla_status: 'pending',
      contact_sla_status: 'pending',
      routed_to_uid: null,
      first_contact_due_at: null,
      first_contact_at: null,
      is_deleted: false,
      deleted_at: null,
      delete_reason: null,
      delete_type: null,
      dsar_request_id: null,
      created_at: now,
      updated_at: now,
    })
  })

  const finalLeadId = resultCode === 'merged'
    ? 'merged'  // don't expose raw lead_id on merge
    : leadId

  // Step 8: Update idempotency to 'succeeded'
  await idempotencyRef.update({
    status: 'succeeded',
    lead_id: finalLeadId,
    stored_result_code: resultCode,
  })

  // Step 9: Send Telegram alert if score >= 40 — async, non-blocking
  // Per 02 §5: Telegram failure must not fail lead submission
  if (scoreResult.score >= 40) {
    void sendTelegramAlert({
      lead_id: finalLeadId,
      phone_hash: phoneHash ?? '',
      email_hash: emailHash,
      surface: params.surface,
      score: scoreResult.score,
      band: scoreResult.band,
      persona: params.persona,
      request_id: params.request_id,
    })
  }

  return { result_code: resultCode, lead_id: finalLeadId }
}
