import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

// Sprint 1A: deny-by-default per 02 §6 + 06 §4.2
// MAP_TILES_ACCESS_MODE missing or 'disabled' → 403
// Sprint 1B: implement full Firebase App Check + JWT flow

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  Pragma: 'no-cache',
  Expires: '0',
}

export async function POST(_req: NextRequest) {
  const mode = process.env.MAP_TILES_ACCESS_MODE

  if (!mode || mode === 'disabled') {
    return NextResponse.json(
      {
        ok: false,
        error: {
          code: 'forbidden',
          message: 'Bạn không có quyền thực hiện thao tác này.',
        },
        meta: { request_id: nanoid(12) },
      },
      { status: 403, headers: NO_STORE_HEADERS }
    )
  }

  // Sprint 1B: implement protected mode
  // 1. Verify Firebase App Check token (X-Firebase-AppCheck)
  // 2. Verify Firebase ID token (Authorization: Bearer)
  // 3. Rate limit by ip_hash + uid_hash
  // 4. Create JTI hash in tile_access_jtis Firestore
  // 5. Sign JWT with TILE_JWT_SECRET (TTL 5 min)
  // 6. Return { token, expires_at, refresh_after_seconds }

  return NextResponse.json(
    {
      ok: false,
      error: {
        code: 'forbidden',
        message: 'Chức năng bản đồ chưa sẵn sàng.',
      },
      meta: { request_id: nanoid(12) },
    },
    { status: 403, headers: NO_STORE_HEADERS }
  )
}

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      error: { code: 'forbidden', message: 'Phương thức không được phép.' },
      meta: { request_id: nanoid(12) },
    },
    { status: 405, headers: { Allow: 'POST', ...NO_STORE_HEADERS } }
  )
}
