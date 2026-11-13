'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const Scene = dynamic(() => import('./Scene3D'), { ssr: false })

function Words({ text, mode, base = 0 }: { text: string; mode: 'mask' | 'fade'; base?: number }) {
  const reduce = useReducedMotion()
  if (reduce) return <>{text}</>
  const from = mode === 'mask' ? { y: '110%' } : { opacity: 0.15, y: 10, filter: 'blur(4px)' }
  const to = mode === 'mask' ? { y: '0%' } : { opacity: 1, y: 0, filter: 'blur(0px)' }
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split(' ').map((w, i) => (
          <span
            key={i}
            className={`mr-[0.25em] inline-block align-bottom ${mode === 'mask' ? '-mb-[0.12em] overflow-hidden pb-[0.12em]' : ''}`}
          >
            <motion.span
              className="inline-block"
              initial={from}
              whileInView={to}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.7, delay: base + i * (mode === 'mask' ? 0.08 : 0.04), ease: [0.2, 0.8, 0.2, 1] }}
            >
              {w}
            </motion.span>
          </span>
        ))}
      </span>
    </>
  )
}

export default function Hero3D() {
  const [cfg, setCfg] = useState<{ low: boolean; still: boolean } | null>(null)
  useEffect(() => {
    setCfg({
      low: !matchMedia('(min-width:768px)').matches,                 // HP: pohon lebih sedikit agar ringan
      still: matchMedia('(prefers-reduced-motion: reduce)').matches, // tanpa animasi jika diminta
    })
  }, [])
  return (
    <section className="relative overflow-hidden bg-cream2">
      <div className="mx-auto grid min-h-[85vh] max-w-6xl items-center gap-6 px-5 py-16 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            <Words text="Selamat Datang di Desa Saran Padang" mode="mask" />
          </h1>
          <p className="mt-4 max-w-md text-lg">
            <Words
              mode="fade"
              base={0.5}
              text="Kecamatan Dolok Silau, Kabupaten Simalungun. Desa petani di dataran tinggi Simalungun: kopi, padi, jagung, dan sayuran."
            />
          </p>
          <div className="mt-8 flex gap-3">
            <a className="btn" href="#surat">Ajukan surat</a>
            <a className="btn btn-alt" href="#pertanian">Lihat hasil bumi</a>
          </div>
        </div>
        <div className="h-[320px] md:h-[520px]" aria-hidden>
          {cfg && <Scene low={cfg.low} still={cfg.still} />}
        </div>
      </div>
    </section>
  )
}