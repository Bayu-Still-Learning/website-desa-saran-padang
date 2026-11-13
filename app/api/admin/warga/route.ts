import { db } from '@/lib/db'
import { isAdmin } from '@/lib/auth'
const no = () => Response.json({ error: 'unauthorized' }, { status: 401 })
const clean = (b: any) => ({ nik: b.nik, nama: b.nama, jk: b.jk, tglLahir: b.tglLahir, dusun: b.dusun, pekerjaan: b.pekerjaan, pendidikan: b.pendidikan, status: b.status ?? 'Aktif' })
const valid = (b: any) => /^\d{16}$/.test(b.nik ?? '') && b.nama && b.tglLahir
export async function GET(req: Request) {
  if (!(await isAdmin())) return no()
  const u = new URL(req.url); const q = u.searchParams.get('q') ?? ''; const d = u.searchParams.get('dusun') ?? ''
  return Response.json(await db.warga.findMany({ where: { OR: [{ nama: { contains: q, mode: 'insensitive' } }, { nik: { contains: q, mode: 'insensitive' } }], ...(d && { dusun: d }) }, orderBy: { nama: 'asc' }, take: 200 }))
}
export async function POST(req: Request) {
  if (!(await isAdmin())) return no(); const b = await req.json()
  if (!valid(b)) return Response.json({ error: 'invalid' }, { status: 400 })
  try { return Response.json(await db.warga.create({ data: clean(b) })) } catch { return Response.json({ error: 'duplicate' }, { status: 409 }) }
}
export async function PUT(req: Request) {
  if (!(await isAdmin())) return no(); const b = await req.json()
  if (!valid(b)) return Response.json({ error: 'invalid' }, { status: 400 })
  try { return Response.json(await db.warga.update({ where: { id: b.id }, data: clean(b) })) } catch { return Response.json({ error: 'fail' }, { status: 409 }) }
}
export async function DELETE(req: Request) {
  if (!(await isAdmin())) return no()
  await db.warga.delete({ where: { id: Number(new URL(req.url).searchParams.get('id')) } })
  return Response.json({ ok: true })
}
