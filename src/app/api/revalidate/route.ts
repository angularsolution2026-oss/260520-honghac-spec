import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { nanoid } from 'nanoid'

export async function POST(req: NextRequest) {
  const requestId = nanoid(12)
  const secret = req.headers.get('x-revalidate-secret')

  if (!secret || secret !== process.env.REVALIDATE_WEBHOOK_SECRET) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: 'forbidden', message: 'Bạn không có quyền thực hiện thao tác này.' },
        meta: { request_id: requestId },
      },
      { status: 403, headers: { 'Cache-Control': 'no-store' } }
    )
  }

  let body: { paths?: string[]; tags?: string[]; reason: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: { code: 'validation_error', message: 'Vui lòng kiểm tra lại thông tin đã nhập.' },
        meta: { request_id: requestId },
      },
      { status: 422, headers: { 'Cache-Control': 'no-store' } }
    )
  }

  if (!body.reason || body.reason.length < 10) {
    return NextResponse.json(
      {
        ok: false,
        error: { code: 'validation_error', message: 'reason phải có ít nhất 10 ký tự.' },
        meta: { request_id: requestId },
      },
      { status: 422, headers: { 'Cache-Control': 'no-store' } }
    )
  }

  const revalidated: string[] = []

  if (body.paths) {
    for (const path of body.paths) {
      revalidatePath(path)
      revalidated.push(`path:${path}`)
    }
  }

  if (body.tags) {
    for (const tag of body.tags) {
      revalidateTag(tag)
      revalidated.push(`tag:${tag}`)
    }
  }

  return NextResponse.json(
    {
      ok: true,
      data: { revalidated },
      meta: { request_id: requestId },
    },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  )
}
