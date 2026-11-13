'use client'
import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { bagianSejarah, kartuSorotan } from '@/data/sejarahDesa'

export default function SejarahContent() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const grow = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
  return (
    <>
      <section className="sec">
        <div ref={ref} className="relative pl-10 md:pl-14">
          <div className="absolute bottom-0 left-3 top-0 w-0.5 bg-forest/15 md:left-5" />
          <motion.div style={{ scaleY: grow }} className="absolute bottom-0 left-3 top-0 w-0.5 origin-top bg-gradient-to-b from-gold to-forest md:left-5" />
          <div className="space-y-16">
            {bagianSejarah.map(b => (
              <motion.article key={b.id} id={b.id} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: .7 }} className="relative">
                <motion.span initial={{ backgroundColor: '#FAF7F0' }} whileInView={{ backgroundColor: '#C89B3C' }} viewport={{ once: true, margin: '-80px' }} transition={{ delay: .2 }} className="absolute -left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-forest md:-left-[55px]" />
                <p className="text-sm font-semibold text-sage">{b.label}</p>
                <h2 className="mt-1 text-2xl font-bold md:text-3xl">{b.judul}</h2>
                <p className="mt-3 max-w-2xl leading-relaxed">{b.isi}</p>
                {b.pangulu && (
                  <ul className="mt-5 max-w-md divide-y divide-forest/10 rounded-2xl bg-cream2">
                    {b.pangulu.map(p => <li key={p.periode} className="flex justify-between gap-3 px-5 py-3 text-sm"><b>{p.nama}</b><span>{p.periode}</span></li>)}
                  </ul>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {kartuSorotan.map((k, i) => (
            <motion.div key={k.judul} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .12 }} className="rounded-2xl border border-forest/10 bg-cream2 p-6">
              <h3 className="font-bold">{k.judul}</h3><p className="mt-2 text-sm">{k.isi}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
