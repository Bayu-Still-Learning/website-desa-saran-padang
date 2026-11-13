const data = [
  ['Gendang Guro-Guro Aron', '06-07 Juli 2026', 'Losd Desa Saran Padang', 'Selesai'],
  ['Musyawarah Desa RKPDes 2027', '5 Des 2026', 'Balai Desa', 'Akan Datang'],
  ['Posyandu Balita & Lansia', '18 Nov 2026', 'Dusun II', 'Akan Datang'],
  ['Pertemuan Karang Taruna', '25 Okt 2026', 'Sekretariat', 'Selesai'],
  ['Pesta budaya Simalungun', '12 Okt 2026', 'Lapangan desa', 'Selesai'],
]
export default function KegiatanSection() {
  return (
    <section id="kegiatan" className="sec">
      <h2 className="mb-8 text-3xl font-bold">Agenda dan kegiatan kegiatan</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {data.map(([t, d, p, s]) => (
          <article key={t} className="flex items-start justify-between gap-4 rounded-2xl border border-forest/10 bg-cream2 p-5">
            <div><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm">{d} — {p}</p></div>
            <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${s === 'Selesai' ? 'bg-char/10' : 'bg-gold/30 text-forest'}`}>{s}</span>
          </article>))}
      </div>
    </section>
  )
}
