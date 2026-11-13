'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
const cats = ['Semua', 'Kopi', 'Padi', 'Jagung', 'Hortikultura']
// Ganti `bg` dengan foto asli (next/image) bila sudah tersedia.
const items = [
  { c: 'Kopi', t: 'Kopi Arabika Simalungun', d: 'Dipetik merah, dijemur di para-para, dan dijual ke pengepul kecamatan.', cls: 'md:col-span-2 md:row-span-2', bg: 'bg-forest text-cream' },
  { c: 'Padi', t: 'Sawah bertingkat', d: 'Panen dua kali setahun di lahan berair.', cls: '', bg: 'bg-sage text-cream' },
  { c: 'Jagung', t: 'Jagung pipil', d: 'Komoditas andalan musim kemarau.', cls: '', bg: 'bg-gold text-forest' },
  { c: 'Hortikultura', t: 'Kol, cabai, dan tomat', d: 'Sayuran dataran tinggi untuk pasar Pematang Raya.', cls: 'md:col-span-2', bg: 'bg-cream2' },
  { c: 'Kopi', t: 'Pengolahan biji kopi', d: 'Petani mengolah sendiri sebelum dijual.', cls: '', bg: 'bg-cream2' },
]
export default function BentoPertanian() {
  const [f, setF] = useState('Semua')
  return (
    <section id="pertanian" className="sec">
      <h2 className="text-3xl font-bold">Mayoritas warga adalah petani</h2>
      <p className="mt-2 max-w-xl">Tanah subur dataran tinggi Dolok Silau menghidupi kebun, ladang, dan sawah warga.</p>
      <div className="mt-6 flex flex-wrap gap-2">{cats.map(c => <button key={c} onClick={() => setF(c)} className={`rounded-full px-4 py-1.5 text-sm ${f === c ? 'bg-forest text-cream' : 'bg-cream2'}`}>{c}</button>)}</div>
      <div className="mt-6 grid auto-rows-[160px] gap-4 md:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {items.filter(i => f === 'Semua' || i.c === f).map(i => (
            <motion.article layout key={i.t} initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className={`flex flex-col justify-end rounded-3xl p-5 ${i.cls} ${i.bg}`}>
              <h3 className="text-lg font-bold !text-inherit">{i.t}</h3><p className="text-sm opacity-90">{i.d}</p>
            </motion.article>))}
        </AnimatePresence>
      </div>
    </section>
  )
}
