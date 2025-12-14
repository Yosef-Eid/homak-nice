// app/api/admin/check/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { password } = await req.json()

  if (password === process.env.ADMIN_DASHBOARD_PASSWORD) {
    return NextResponse.json({ ok: true })
  }

  return new NextResponse('Unauthorized', { status: 401 })
}
