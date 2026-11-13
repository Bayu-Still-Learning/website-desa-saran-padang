'use client'
import { animate, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
function Count({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null); const inView = useInView(ref, { once: true })
  useEffect(() => { if (inView && ref.current) { const c = animate(0, to, { duration: 1.6, onUpdate: v => { ref.current!.textContent = Math.round(v).toLocaleString('id-ID') + suffix } }); return () => c.stop() } }, [inView, to, suffix])
  return <span ref={ref}>0</span>
}
// Angka contoh. Ganti dengan data resmi desa.
const stats = [['Penduduk', 2150, ' jiwa'], ['Luas wilayah', 1240, ' ha'], ['Dusun', 4, ''], ['Komoditas utama', 6, ' jenis']] as const
export default function Stats() {
  return (
    <section id="profil" className="sec">
      <h2 className="mb-8 text-3xl font-bold">Desa dalam angka</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map(([l, n, s]) => <div key={l} className="rounded-2xl bg-cream2 p-6"><div className="font-head text-3xl font-bold text-forest"><Count to={n} suffix={s} /></div><div className="mt-1 text-sm">{l}</div></div>)}
      </div>
    </section>
  )
}
