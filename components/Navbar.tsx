'use client'
import { useState } from 'react'
const links = [['Profil','/#profil'],['Sejarah','/sejarah'],['Pertanian','/#pertanian'],['Kegiatan','/#kegiatan'],['Cek warga','/#warga'],['Layanan surat','/#surat'],['Kontak','/#kontak']]
export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="/" className="font-head text-lg font-bold text-forest">Saran Padang</a>
        <button className="md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
        <ul className={`${open ? 'flex' : 'hidden'} absolute left-0 top-full w-full flex-col gap-4 bg-cream p-5 md:static md:flex md:w-auto md:flex-row md:p-0`}>
          {links.map(([t, h]) => <li key={h}><a href={h} onClick={() => setOpen(false)} className="text-sm font-medium hover:text-sage">{t}</a></li>)}
        </ul>
      </nav>
    </header>
  )
}
