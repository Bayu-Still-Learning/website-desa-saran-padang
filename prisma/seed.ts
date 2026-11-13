import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()
const first = ['Ruben','Marlina','Johan','Rosmawati','Tonggo','Lasmaria','Sarmedi','Herlina','Bonar','Elisabet','Jalius','Dame']
const marga = ['Saragih','Purba','Damanik','Sinaga','Girsang','Sipayung']
const dusun = ['Saran Padang I','Saran Padang II','Dolok Mariah','Huta Bolon']
const kerja = ['Petani','Petani','Petani','Petani','Wiraswasta','PNS','Guru','Pelajar']
const didik = ['SD','SMP','SMA','SMA','D3','S1']
async function main() {
  await db.warga.deleteMany()
  for (let i = 0; i < 36; i++) {
    await db.warga.create({ data: {
      nik: '1208' + String(100000000000 + i * 7919).slice(0, 12),
      nama: `${first[i % 12]} ${marga[(i * 5) % 6]}`,
      jk: i % 2 ? 'Perempuan' : 'Laki-laki',
      tglLahir: `${1960 + (i * 3) % 40}-${String(1 + (i % 12)).padStart(2, '0')}-${String(1 + (i * 2) % 27).padStart(2, '0')}`,
      dusun: dusun[i % 4], pekerjaan: kerja[i % 8], pendidikan: didik[i % 6], status: 'Aktif' } })
  }
}
main().then(() => db.$disconnect())
