'use client'
import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

const cats = ['Semua', 'Kopi', 'Padi', 'Jagung', 'Jeruk']

const items = [
  {
    c: 'Kopi',
    t: 'Kopi Arabika Simalungun',
    d: 'Dipetik merah, dijemur di para-para, dan dijual ke pengepul kecamatan.',
    cls: 'md:col-span-2 md:row-span-2',
    bg: 'bg-forest text-cream',
    img: '/img/kopi.jpg',
  },
  {
    c: 'Padi',
    t: 'Sawah bertingkat',
    d: 'Panen dua kali setahun di lahan berair.',
    cls: '',
    bg: 'bg-sage text-cream',
    img: '/img/padi.jpg',
  },
  {
    c: 'Jagung',
    t: 'Jagung pipil',
    d: 'Komoditas andalan musim kemarau.',
    cls: '',
    bg: 'bg-gold text-forest',
    img: '/img/jagung.jpg',
  },
  {
    c: 'Jeruk',
    t: 'Jeruk Manis',
    d: 'Hasil kebun dan sayuran dataran tinggi untuk pasar Pematang Raya.',
    cls: 'md:col-span-2',
    bg: 'bg-cream2',
    img: '/img/jeruk.jpg',
  },
  {
    c: 'Kopi',
    t: 'Pengolahan biji kopi',
    d: 'Petani mengolah sendiri sebelum dijual.',
    cls: '',
    bg: 'bg-cream2',
    img: '/img/gilingkopi.jpg',
  },
]

export default function BentoPertanian() {
  const [f, setF] = useState('Semua')

  return (
    <section id="pertanian" className="sec">
      <h2 className="text-3xl font-bold">Mayoritas warga adalah petani</h2>
      <p className="mt-2 max-w-xl">
        Tanah subur dataran tinggi Dolok Silau menghidupi kebun, ladang, dan sawah warga.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setF(c)}
            className={`rounded-full px-4 py-1.5 text-sm ${
              f === c ? 'bg-forest text-cream' : 'bg-cream2'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid auto-rows-[160px] gap-4 md:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {items
            .filter((i) => f === 'Semua' || i.c === f)
            .map((i) => (
              <motion.article
                layout
                key={i.t}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`group relative flex flex-col justify-end overflow-hidden rounded-3xl p-5 ${
                  i.cls
                } ${i.img ? 'text-white' : i.bg}`}
              >
                {i.img && (
                  <>
                    <Image
                      src={i.img}
                      alt={i.t}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  </>
                )}

                <div className="relative z-10">
                  <h3 className="text-lg font-bold !text-inherit">{i.t}</h3>
                  <p className="text-sm opacity-90">{i.d}</p>
                </div>
              </motion.article>
            ))}
        </AnimatePresence>
      </div>
    </section>
  )
}