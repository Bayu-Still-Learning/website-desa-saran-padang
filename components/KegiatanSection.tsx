'use client'
import { useRef } from 'react'
import { motion, MotionValue, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

// Edit daftar kegiatan di sini: [judul, tanggal, tempat, status]
const data = [
  ['Gendang Guro-Guro Aron', '06-07 Juli 2026', 'Losd Desa Saran Padang', 'Selesai'],
  ['Musyawarah Desa RKPDes 2027', '5 Des 2026', 'Balai Desa', 'Akan Datang'],
  ['Posyandu Balita & Lansia', '18 Nov 2026', 'Dusun II', 'Akan Datang'],
  ['Pertemuan Karang Taruna', '25 Okt 2026', 'Sekretariat', 'Selesai'],
  ['Pesta budaya Simalungun', '12 Okt 2026', 'Lapangan desa', 'Selesai'],
] as const

type Item = (typeof data)[number]
const badge = (s: string) => `shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${s === 'Selesai' ? 'bg-char/10' : 'bg-gold/30 text-forest'}`
const cardCls = 'flex items-start justify-between gap-4 rounded-2xl border border-forest/10 bg-cream2 p-5'

function FloatCard({ item, i, p }: { item: Item; i: number; p: MotionValue<number> }) {
  const [t, d, pl, s] = item
  const depth = 28 + (i % 3) * 22                                    // tiap kartu punya kedalaman berbeda
  const y = useTransform(p, [0, 1], [depth, -depth])                 // paralaks saat scroll
  const tilt = useTransform(p, [0, 0.5, 1], [7, 0, -7])              // kemiringan perspektif halus
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 18 })
  const sry = useSpring(ry, { stiffness: 150, damping: 18 })
  const move = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10)              // maks. ±5 derajat
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10)
  }
  const leave = () => { rx.set(0); ry.set(0) }
  return (
    <motion.div style={{ y, rotateX: tilt, transformPerspective: 1000 }}>
      <motion.div
        animate={{ y: [0, -9, 0] }}                                  // melayang terus-menerus
        transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.45 }}
      >
        <motion.article
          style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
          onPointerMove={move}
          onPointerLeave={leave}
          className={`${cardCls} shadow-[0_18px_30px_-14px_rgba(30,63,32,0.3)]`}
        >
          <div><h3 className="font-bold">{t}</h3><p className="mt-1 text-sm">{d} — {pl}</p></div>
          <span className={badge(s)}>{s}</span>
        </motion.article>
      </motion.div>
    </motion.div>
  )
}

export default function KegiatanSection() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 22 })

  return (
    <section id="kegiatan" ref={ref} className="sec overflow-x-clip">
      <h2 className="mb-10 text-3xl font-bold">Agenda dan kegiatan</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {data.map((item, i) =>
          reduce ? (
            <article key={item[0]} className={cardCls}>
              <div><h3 className="font-bold">{item[0]}</h3><p className="mt-1 text-sm">{item[1]} — {item[2]}</p></div>
              <span className={badge(item[3])}>{item[3]}</span>
            </article>
          ) : (
            <FloatCard key={item[0]} item={item} i={i} p={p} />
          )
        )}
      </div>
    </section>
  )
}