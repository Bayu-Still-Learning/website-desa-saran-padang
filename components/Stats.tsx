'use client'
import { animate, motion, useInView, useReducedMotion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion'
import { useEffect, useRef } from 'react'

function Count({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (inView && ref.current) {
      const c = animate(0, to, {
        duration: 1.6,
        onUpdate: v => { ref.current!.textContent = Math.round(v).toLocaleString('id-ID') + suffix },
      })
      return () => c.stop()
    }
  }, [inView, to, suffix])
  return <span ref={ref}>0</span>
}

// Angka contoh. Ganti dengan data resmi desa.
const stats = [
  ['Penduduk', 2150, ' jiwa'],
  ['Luas wilayah', 1240, ' ha'],
  ['Dusun', 4, ''],
  ['Komoditas utama', 6, ' jenis'],
] as const

function OrbitCard({ i, p, label, n, s, still }: { i: number; p: MotionValue<number>; label: string; n: number; s: string; still: boolean }) {
  const a = i * 0.07                       // jeda tiap kartu (efek spiral)
  const range = [a, 0.75 + a * 0.5]
  const rotateY = useTransform(p, range, [(i - 1.5) * 80, 0])   // berputar di orbit
  const rotateX = useTransform(p, range, [35 - i * 8, 0])
  const z = useTransform(p, range, [-600 - i * 60, 0])          // datang dari kedalaman
  const y = useTransform(p, range, [90 + i * 45, 0])            // naik melingkar
  const x = useTransform(p, range, [(i - 1.5) * -60, 0])
  const opacity = useTransform(p, [a, a + 0.25], [0, 1])
  return (
    <motion.div
      style={still ? undefined : { rotateY, rotateX, z, y, x, opacity, transformStyle: 'preserve-3d' }}
      className="rounded-2xl bg-cream2 p-6 shadow-sm"
    >
      <div className="font-head text-3xl font-bold text-forest"><Count to={n} suffix={s} /></div>
      <div className="mt-1 text-sm">{label}</div>
    </motion.div>
  )
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'center 0.55'] })
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 22 })
  const swing = useTransform(p, [0, 1], [-60, 0])   // seluruh grid ikut berayun mengorbit
  return (
    <section id="profil" ref={ref} className="sec overflow-x-clip">
      <h2 className="mb-8 text-3xl font-bold">Desa dalam angka</h2>
      <div style={{ perspective: 1200 }}>
        <motion.div
          style={reduce ? undefined : { rotateY: swing, transformStyle: 'preserve-3d' }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {stats.map(([l, n, s], i) => (
            <OrbitCard key={l} i={i} p={p} label={l} n={n} s={s} still={reduce} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}