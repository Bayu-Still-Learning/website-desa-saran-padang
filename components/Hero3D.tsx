'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
const Scene = dynamic(() => import('./Scene3D'), { ssr: false })
export default function Hero3D() {
  const [ok, setOk] = useState(false)
  useEffect(() => { setOk(matchMedia('(min-width:768px)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) }, [])
  return (
    <section className="relative overflow-hidden bg-cream2">
      <div className="mx-auto grid min-h-[85vh] max-w-6xl items-center gap-6 px-5 py-16 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">Selamat Datang di Desa Saran Padang</h1>
          <p className="mt-4 max-w-md text-lg">Kecamatan Dolok Silau, Kabupaten Simalungun. Desa petani di dataran tinggi Simalungun</p>
          <div className="mt-8 flex gap-3"><a className="btn" href="#surat">Ajukan surat</a><a className="btn btn-alt" href="#pertanian">Lihat hasil bumi</a></div>
        </motion.div>
        <div className="h-[320px] md:h-[520px]" aria-hidden>
          {ok ? <Scene /> : <svg viewBox="0 0 400 260" className="h-full w-full"><circle cx="300" cy="50" r="24" fill="#C89B3C"/><path d="M0 260V170Q80 90 160 150T320 130 400 170V260Z" fill="#4A7C59"/><path d="M0 260V210Q120 150 220 200T400 190V260Z" fill="#1E3F20"/></svg>}
        </div>
      </div>
    </section>
  )
}
