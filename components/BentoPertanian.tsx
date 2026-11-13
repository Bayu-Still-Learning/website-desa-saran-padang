'use client'
import { useRef, useState } from 'react'
import { AnimatePresence, motion, MotionValue, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

const cats = ['Semua', 'Kopi', 'Padi', 'Jagung', 'Jeruk']

type Item = { c: string; t: string; d: string; cls: string; bg: string; big?: boolean; img?: string }
// Isi `img` dengan path foto Anda, contoh: img: '/foto/kopi.jpg'
const items: Item[] = [
  { c: 'Kopi', t: 'Kopi Arabika Simalungun', d: 'Dipetik merah, dijemur di para-para, dan dijual ke pengepul kecamatan.', cls: 'md:col-span-2 md:row-span-2', bg: 'bg-forest text-cream', big: true },
  { c: 'Padi', t: 'Sawah bertingkat', d: 'Panen dua kali setahun di lahan berair.', cls: '', bg: 'bg-sage text-cream' },
  { c: 'Jagung', t: 'Jagung pipil', d: 'Komoditas andalan musim kemarau.', cls: '', bg: 'bg-gold text-forest' },
  { c: 'Jeruk', t: 'Jeruk Manis', d: 'Buah dataran tinggi yang dijual ke pasar sekitar.', cls: 'md:col-span-2', bg: 'bg-cream2', big: true },
  { c: 'Kopi', t: 'Pengolahan biji kopi', d: 'Petani mengolah sendiri sebelum dijual.', cls: '', bg: 'bg-cream2' },
]

const MAX = 8 // derajat maksimal tilt kursor

function Card({ item, i, p, still }: { item: Item; i: number; p: MotionValue<number>; still: boolean }) {
  const f = item.big ? 1 : 0.45                                   // kartu besar bergerak lebih jauh dari kartu kecil
  const z = useTransform(p, [0, 0.5, 1], [-60 * f, 40 * f, -60 * f])
  const rx = useTransform(p, [0, 0.5, 1], [8 * f, 0, -8 * f])
  const y = useTransform(p, [0, 1], [26 * f, -26 * f])
  const tx = useMotionValue(0)
  const ty = useMotionValue(0)
  const srx = useSpring(ty, { stiffness: 160, damping: 18 })
  const sry = useSpring(tx, { stiffness: 160, damping: 18 })
  const sh = useTransform(srx, v => `0 ${14 + Math.abs(v) * 2}px 28px -12px rgba(30,63,32,0.35)`)

  const move = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return
    const r = e.currentTarget.getBoundingClientRect()
    tx.set(((e.clientX - r.left) / r.width - 0.5) * 2 * MAX)
    ty.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * MAX)
  }
  const leave = () => { tx.set(0); ty.set(0) }
  const light = !!item.img
  return (
    <motion.div style={still ? undefined : { z, rotateX: rx, y, transformPerspective: 1000, willChange: 'transform' }} className="h-full">
      <motion.article
        style={still ? undefined : { rotateX: srx, rotateY: sry, boxShadow: sh, transformPerspective: 900, transformStyle: 'preserve-3d' }}
        onPointerMove={still ? undefined : move}
        onPointerLeave={still ? undefined : leave}
        className={`relative flex h-full flex-col justify-end rounded-3xl p-5 ${item.bg} ${light ? 'text-cream' : ''}`}
      >
        {light && (
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${item.img})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/75 via-forest/10 to-transparent" />
          </div>
        )}
        <div className="relative" style={still ? undefined : { transform: 'translateZ(25px)' }}>
          <h3 className="text-lg font-bold !text-inherit">{item.t}</h3>
          <p className="text-sm opacity-90">{item.d}</p>
        </div>
      </motion.article>
    </motion.div>
  )
}

export default function BentoPertanian() {
  const [f, setF] = useState('Semua')
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 22 })
  const list = items.filter(i => f === 'Semua' || i.c === f)

  return (
    <section id="pertanian" className="sec overflow-x-clip">
      <h2 className="text-3xl font-bold">Mayoritas warga adalah petani</h2>
      <p className="mt-2 max-w-xl">Tanah subur dataran tinggi Dolok Silau menghidupi kebun, ladang, dan sawah warga.</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {cats.map(c => {
          const on = f === c
          return (
            <motion.button
              key={c}
              onClick={() => setF(c)}
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.93, y: 3 }}
              transition={{ type: 'spring', stiffness: 500, damping: 12 }}
              aria-pressed={on}
              className={`rounded-full px-5 py-2 text-sm font-semibold ${
                on
                  ? 'bg-forest text-cream shadow-[0_4px_0_#0f2410,0_8px_14px_-6px_rgba(30,63,32,0.5)]'
                  : 'bg-cream2 text-char shadow-[0_4px_0_rgba(30,63,32,0.18),0_8px_14px_-8px_rgba(30,63,32,0.3)]'
              }`}
            >
              {c}
            </motion.button>
          )
        })}
      </div>

      <div ref={ref} className="mt-8 grid auto-rows-[160px] gap-4 md:grid-cols-4" style={{ perspective: 1000 }}>
        <AnimatePresence mode="popLayout">
          {list.map((item, i) => (
            <motion.div
              layout={!reduce}
              key={item.t}
              initial={reduce ? { opacity: 0 } : { opacity: 0, rotateY: -70, scale: 0.85 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, rotateY: 0, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, rotateY: 70, scale: 0.85 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              style={{ transformPerspective: 1000 }}
              className={item.cls}
            >
              <Card item={item} i={i} p={p} still={reduce} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}