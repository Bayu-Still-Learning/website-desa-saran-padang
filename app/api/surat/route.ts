import { db } from '@/lib/db'
export async function POST(req: Request) {
  const b = await req.json()
  if (!/^\d{16}$/.test(b.nik ?? '') || !b.nama || !b.jenis || !b.hp || !b.keperluan) return Response.json({ error: 'invalid' }, { status: 400 })
  await db.surat.create({ data: { jenis: b.jenis, nama: b.nama, nik: b.nik, hp: b.hp, keperluan: b.keperluan } })
  return Response.json({ ok: true })
}
