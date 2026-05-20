// Telegram speed-to-lead alert — 08 spec + 02 §5 async contract
// Async, non-blocking: failure logs to Sentry, does NOT fail lead submission
// NO PII in transit — 00 §6 Hard Rule 7

import type { ScoreBand } from './score'

interface TelegramAlertParams {
  lead_id: string
  phone_hash: string
  email_hash: string | null
  surface: string
  score: number
  band: ScoreBand
  persona?: string
  request_id: string
}

function getChatId(band: ScoreBand): string | null {
  switch (band) {
    case 'hot':  return process.env.TELEGRAM_CHAT_ID_HOT ?? null
    case 'warm': return process.env.TELEGRAM_CHAT_ID_WARM ?? null
    default:     return null
  }
}

function buildMessage(p: TelegramAlertParams): string {
  const bandEmoji = p.band === 'hot' ? '🔥' : '☀️'
  const lines = [
    `${bandEmoji} LEAD ${p.band.toUpperCase()} — Score: ${p.score}`,
    `ID: ${p.lead_id}`,
    `Surface: ${p.surface}`,
    p.persona ? `Persona: ${p.persona}` : null,
    `Phone: ${p.phone_hash ? `***${p.phone_hash.slice(-4)}` : 'N/A'}`,
    p.email_hash ? `Email: ***${p.email_hash.slice(-4)}` : null,
    `Req: ${p.request_id}`,
  ]
  return lines.filter(Boolean).join('\n')
}

export async function sendTelegramAlert(
  params: TelegramAlertParams
): Promise<void> {
  const chatId = getChatId(params.band)
  const token = process.env.TELEGRAM_BOT_TOKEN

  // Only alert hot (≥70) and warm (≥40) per 08 §6
  if (!chatId || !token) return

  const message = buildMessage(params)

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
        signal: AbortSignal.timeout(8000),
      }
    )

    if (!res.ok) {
      // Log without PII — only lead_id and request_id
      console.warn('[telegram] alert failed', {
        lead_id: params.lead_id,
        request_id: params.request_id,
        status: res.status,
      })
    }
  } catch (err) {
    // Non-blocking: Telegram down must not fail lead submission
    console.warn('[telegram] alert error', {
      lead_id: params.lead_id,
      request_id: params.request_id,
      error: err instanceof Error ? err.message : 'unknown',
    })
  }
}
