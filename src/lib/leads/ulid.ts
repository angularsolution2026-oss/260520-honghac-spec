// ULID generator — used for lead_id document IDs
// Monotonically sortable, URL-safe

const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
const ENCODING_LEN = ENCODING.length
const TIME_LEN = 10
const RANDOM_LEN = 16

function encodeTime(now: number, len: number): string {
  let str = ''
  for (let i = len - 1; i >= 0; i--) {
    const mod = now % ENCODING_LEN
    str = ENCODING[mod] + str
    now = Math.floor(now / ENCODING_LEN)
  }
  return str
}

function encodeRandom(len: number): string {
  let str = ''
  const bytes = new Uint8Array(len)
  // Node.js crypto.randomFillSync for server-side
  if (typeof globalThis.crypto !== 'undefined' && globalThis.crypto.getRandomValues) {
    globalThis.crypto.getRandomValues(bytes)
  } else {
    const { randomFillSync } = require('crypto') as typeof import('crypto')
    randomFillSync(bytes)
  }
  for (let i = 0; i < len; i++) {
    str += ENCODING[bytes[i]! % ENCODING_LEN]
  }
  return str
}

export function generateUlid(): string {
  const now = Date.now()
  return encodeTime(now, TIME_LEN) + encodeRandom(RANDOM_LEN)
}
