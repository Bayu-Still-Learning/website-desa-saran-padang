import { db } from '@/lib/db'
export async function GET(req: Request) {
  const u = new URL(req.url); const q = u.searchParams.get('q') ?? ''; const d = u.searchParams.get('dusun') ?? ''
  if (!q && !d) return Response.json([])
  const rows = await db.warga.findMany({ where: { nama: { contains: q, mode: 'insensitive' }, ...(d && { dusun: d }) }, select: { nama: true, dusun: true, pekerjaan: true, status: true }, take: 30 })
  return Response.json(rows)
}
