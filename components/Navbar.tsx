'use client'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAnimationControls, useReducedMotion, motion } from 'framer-motion'

const links = [
  ['Profil', '/#profil'],
  ['Sejarah', '/sejarah'],
  ['Pertanian', '/#pertanian'],
  ['Kegiatan', '/#kegiatan'],
  ['Cek warga', '/#warga'],
  ['Layanan surat', '/#surat'],
  ['Kontak', '/#kontak'],
] as const

const REPEAT = 6 // jumlah salinan teks di dalam "reel"; makin besar, makin panjang putarannya

function SlotLink({ label, href, onGo }: { label: string; href: string; onGo: (h: string) => void }) {
  const controls = useAnimationControls()
  const reduce = useReducedMotion()
  const busy = useRef(false)

  const spin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return // biarkan buka tab baru bekerja normal
    e.preventDefault()
    if (reduce) return onGo(href)
    if (busy.current) return
    busy.current = true
    controls
      .start({
        y: `-${(100 * (REPEAT - 1)) / REPEAT}%`,
        filter: ['blur(0px)', 'blur(1.5px)', 'blur(0px)'],
        transition: {
          y: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
          filter: { duration: 0.7, times: [0, 0.4, 1] },
        },
      })
      .then(() => {
        try {
          controls.set({ y: '0%', filter: 'blur(0px)' }) // salinan terakhir = salinan pertama, jadi reset tidak terlihat
        } catch {}
        busy.current = false
      })
    setTimeout(() => onGo(href), 550) // beri waktu animasi sebelum pindah halaman/scroll
  }

  return (
    <a href={href} onClick={spin} aria-label={label} className="block text-sm font-medium hover:text-sage">
      <span className="block h-5 overflow-hidden">
        <motion.span animate={controls} className="flex flex-col" aria-hidden>
          {Array.from({ length: REPEAT }, (_, i) => (
            <span key={i} className="block h-5 leading-5">{label}</span>
          ))}
        </motion.span>
      </span>
    </a>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const go = (href: string) => { setOpen(false); router.push(href) }

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="/" className="font-head text-lg font-bold text-forest">Saran Padang</a>
        <button className="md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
        <ul className={`${open ? 'flex' : 'hidden'} absolute left-0 top-full w-full flex-col gap-4 bg-cream p-5 md:static md:flex md:w-auto md:flex-row md:p-0`}>
          {links.map(([t, h]) => <li key={h}><SlotLink label={t} href={h} onGo={go} /></li>)}
        </ul>
      </nav>
    </header>
  )
}