export default function Footer() {
  return (
    <footer id="kontak" className="bg-forest text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold !text-cream">Kantor Desa Saran Padang</h2>
          <p className="mt-2">Kec. Dolok Silau, Kab. Simalungun, Sumatera Utara</p>
          {/* Ganti nomor dengan WhatsApp resmi desa */}
          <a className="btn btn-alt mt-6" href="https://wa.me/6280000000000?text=Halo%20Pemerintah%20Desa%20Saran%20Padang">Hubungi lewat WhatsApp</a>
          <nav className="mt-6 flex gap-5 text-sm"><a href="/sejarah" className="underline">Sejarah</a><a href="/#kegiatan" className="underline">Kegiatan</a><a href="/#surat" className="underline">Layanan surat</a></nav>
        </div>
        <iframe title="Peta Desa Saran Padang" className="h-60 w-full rounded-2xl" loading="lazy" src="https://maps.google.com/maps?q=Dolok+Silau,+Simalungun&output=embed" />
      </div>
      <p className="pb-6 text-center text-xs opacity-70">© 2026 Pemerintah Desa Saran Padang</p>
    </footer>
  )
}
