import './globals.css'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
const head = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-head' })
const body = Inter({ subsets: ['latin'], variable: '--font-body' })
export const metadata: Metadata = { title: 'Desa Saran Padang — Dolok Silau, Simalungun', description: 'Profil dan layanan informasi Desa Saran Padang, Kecamatan Dolok Silau, Kabupaten Simalungun.' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="id" className={`${head.variable} ${body.variable}`}><body>{children}</body></html>
}
