import { cookies } from 'next/headers'
export async function POST(req: Request) {
  const { password } = await req.json()
  if (password !== process.env.ADMIN_PASSWORD) return Response.json({ error: 'salah' }, { status: 401 })
  ;(await cookies()).set('adm', process.env.ADMIN_TOKEN!, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 8 })
  return Response.json({ ok: true })
}
