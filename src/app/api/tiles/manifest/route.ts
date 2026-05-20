import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

// Sprint 1A: deny-by-default per 02 §6 + 06 §4.3
// No mock signed URLs returned even in stub mode

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
  // 1. Verify tile_token JWT (sig + aud + route + scope + allowed_layers + exp)
  // 2. Apply clock tolerance 30-60s
  // 3. Check JTI not revoked in tile_access_jtis
  // 4. Validate requested layers against allowed_layers claim
  // 5. Rate limit by ip_hash + uid_hash + jti_hash
  // 6. Generate GCS signed URLs per layer (TTL 5 min)
  // 7. Return { signed_urls, expires_at }

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
