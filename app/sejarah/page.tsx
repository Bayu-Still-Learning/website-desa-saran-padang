import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SejarahContent from '@/components/SejarahContent'
import { sumberReferensi } from '@/data/sejarahDesa'
export const metadata: Metadata = { title: 'Sejarah Desa & Kerajaan Dolok Silau — Saran Padang' }

// Ornamen geometris tipis bergaya anyaman Simalungun
const orn = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='8'%3E%3Cpath d='M0 4l6-3 6 3 6-3 6 3' fill='none' stroke='%23C89B3C' stroke-width='1'/%3E%3C/svg%3E\")"

export default function Sejarah() {
  return (
    <>
      <Navbar />
      <main>
        <header className="bg-cream2">
          <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <div className="mb-6 h-2 w-40" style={{ backgroundImage: orn }} aria-hidden />
            <h1 className="max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">Sejarah &amp; Asal-Usul Wilayah Saran Padang — Dolok Silau</h1>
            <div className="mt-6 h-2 w-full max-w-3xl" style={{ backgroundImage: orn }} aria-hidden />
          </div>
        </header>
        <SejarahContent />
        <section className="mx-auto max-w-6xl px-5 pb-20">
          <blockquote className="max-w-3xl border-l-4 border-gold bg-cream2 px-6 py-4 text-sm italic">{sumberReferensi}</blockquote>
        </section>
      </main>
      <Footer />
    </>
  )
}
