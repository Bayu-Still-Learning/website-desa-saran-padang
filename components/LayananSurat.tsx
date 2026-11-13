'use client'
import { useState } from 'react'
export default function LayananSurat() {
  const [s, setS] = useState<'idle' | 'ok' | 'err'>('idle')
  async function kirim(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = e.currentTarget
    const r = await fetch('/api/surat', { method: 'POST', body: JSON.stringify(Object.fromEntries(new FormData(f))) })
    if (r.ok) { setS('ok'); f.reset() } else setS('err')
  }
  return (
    <section id="surat" className="sec">
      <h2 className="text-3xl font-bold">Ajukan surat dari HP</h2>
      <form onSubmit={kirim} className="mt-6 grid max-w-2xl gap-3 md:grid-cols-2">
        <select name="jenis" className="input md:col-span-2" required><option>Surat Keterangan Domisili</option><option>Surat Keterangan Usaha Pertanian</option><option>Surat Keterangan Tidak Mampu</option></select>
        <input name="nama" className="input" placeholder="Nama lengkap" required />
        <input name="nik" className="input" placeholder="NIK (16 digit)" pattern="\d{16}" required />
        <input name="hp" className="input md:col-span-2" placeholder="Nomor WhatsApp" inputMode="tel" required />
        <textarea name="keperluan" className="input md:col-span-2" placeholder="Keperluan surat" rows={3} required />
        <button className="btn md:col-span-2">Kirim pengajuan</button>
        {s === 'ok' && <p className="md:col-span-2">Pengajuan terkirim. Perangkat desa akan menghubungi lewat WhatsApp.</p>}
        {s === 'err' && <p className="md:col-span-2 text-red-700">Gagal mengirim. Periksa NIK (16 digit) dan isian lain.</p>}
      </form>
    </section>
  )
}
