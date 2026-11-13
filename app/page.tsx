import Navbar from '@/components/Navbar'
import Hero3D from '@/components/Hero3D'
import Stats from '@/components/Stats'
import BentoPertanian from '@/components/BentoPertanian'
import KegiatanSection from '@/components/KegiatanSection'
import { CekWarga } from '@/components/DatabaseWargaCRUD'
import LayananSurat from '@/components/LayananSurat'
import Footer from '@/components/Footer'
export default function Home() {
  return <><Navbar /><main><Hero3D /><Stats /><BentoPertanian /><KegiatanSection /><CekWarga /><LayananSurat /></main><Footer /></>
}
