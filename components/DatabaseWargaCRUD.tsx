'use client'
import { useCallback, useEffect, useState } from 'react'
const DUSUN = ['Saran Padang I', 'Saran Padang II', 'Dolok Mariah', 'Huta Bolon']
type W = { id: number; nik: string; nama: string; jk: string; tglLahir: string; dusun: string; pekerjaan: string; pendidikan: string; status: string }

export function CekWarga() {
  const [q, setQ] = useState(''); const [d, setD] = useState(''); const [rows, setRows] = useState<Partial<W>[] | null>(null)
  const cari = async () => setRows(await (await fetch(`/api/warga?q=${encodeURIComponent(q)}&dusun=${encodeURIComponent(d)}`)).json())
  return (
    <section id="warga" className="sec">
      <h2 className="text-3xl font-bold">Cek data warga</h2>
      <p className="mt-2">Hanya menampilkan nama, dusun, pekerjaan, dan status. NIK tidak ditampilkan.</p>
      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_220px_auto]">
        <input className="input" placeholder="Nama warga" value={q} onChange={e => setQ(e.target.value)} />
        <select className="input" value={d} onChange={e => setD(e.target.value)}><option value="">Semua dusun</option>{DUSUN.map(x => <option key={x}>{x}</option>)}</select>
        <button className="btn" onClick={cari}>Cari warga</button>
      </div>
      {rows && (rows.length ? <ul className="mt-6 divide-y divide-forest/10 rounded-2xl bg-cream2">{rows.map((r, i) => <li key={i} className="flex flex-wrap justify-between gap-2 px-5 py-3 text-sm"><b>{r.nama}</b><span>{r.dusun} · {r.pekerjaan} · {r.status}</span></li>)}</ul> : <p className="mt-6">Tidak ada warga yang cocok. Coba nama lain atau pilih semua dusun.</p>)}
    </section>
  )
}

const blank = { nik: '', nama: '', jk: 'Laki-laki', tglLahir: '', dusun: DUSUN[0], pekerjaan: 'Petani', pendidikan: 'SMA', status: 'Aktif' }
export function AdminWarga() {
  const [auth, setAuth] = useState<boolean | null>(null); const [pw, setPw] = useState('')
  const [rows, setRows] = useState<W[]>([]); const [q, setQ] = useState(''); const [dusun, setDusun] = useState('')
  const [form, setForm] = useState<any>(blank); const [msg, setMsg] = useState('')
  const load = useCallback(async () => {
    const r = await fetch(`/api/admin/warga?q=${encodeURIComponent(q)}&dusun=${encodeURIComponent(dusun)}`)
    if (r.status === 401) return setAuth(false)
    setAuth(true); setRows(await r.json())
  }, [q, dusun])
  useEffect(() => { load() }, [load])
  const login = async () => { const r = await fetch('/api/admin/login', { method: 'POST', body: JSON.stringify({ password: pw }) }); r.ok ? load() : setMsg('Kata sandi salah.') }
  const simpan = async () => {
    const r = await fetch('/api/admin/warga', { method: form.id ? 'PUT' : 'POST', body: JSON.stringify(form) })
    if (!r.ok) return setMsg('Gagal menyimpan. Pastikan NIK 16 digit dan belum terdaftar.')
    setForm(blank); setMsg('Tersimpan.'); load()
  }
  const hapus = async (id: number) => { if (confirm('Hapus data warga ini?')) { await fetch(`/api/admin/warga?id=${id}`, { method: 'DELETE' }); load() } }
  if (auth === null) return <p>Memuat…</p>
  if (!auth) return <div className="max-w-sm space-y-3"><input className="input" type="password" placeholder="Kata sandi admin" value={pw} onChange={e => setPw(e.target.value)} /><button className="btn" onClick={login}>Masuk</button><p className="text-sm">{msg}</p></div>
  const f = (k: string) => ({ className: 'input', value: form[k], onChange: (e: any) => setForm({ ...form, [k]: e.target.value }) })
  return (
    <div className="space-y-8">
      <div className="grid gap-3 rounded-2xl bg-cream2 p-5 md:grid-cols-4">
        <input {...f('nik')} placeholder="NIK (16 digit)" maxLength={16} /><input {...f('nama')} placeholder="Nama lengkap" />
        <select {...f('jk')}><option>Laki-laki</option><option>Perempuan</option></select><input {...f('tglLahir')} type="date" />
        <select {...f('dusun')}>{DUSUN.map(x => <option key={x}>{x}</option>)}</select>
        <select {...f('pekerjaan')}>{['Petani', 'Wiraswasta', 'PNS', 'Guru', 'Pelajar', 'Lainnya'].map(x => <option key={x}>{x}</option>)}</select>
        <select {...f('pendidikan')}>{['SD', 'SMP', 'SMA', 'D3', 'S1', 'S2'].map(x => <option key={x}>{x}</option>)}</select>
        <button className="btn" onClick={simpan}>{form.id ? 'Simpan perubahan' : 'Tambah warga'}</button>
        {msg && <p className="text-sm md:col-span-4">{msg}</p>}
      </div>
      <div className="flex gap-3"><input className="input" placeholder="Cari nama atau NIK" value={q} onChange={e => setQ(e.target.value)} /><select className="input max-w-52" value={dusun} onChange={e => setDusun(e.target.value)}><option value="">Semua dusun</option>{DUSUN.map(x => <option key={x}>{x}</option>)}</select></div>
      <div className="overflow-x-auto rounded-2xl border border-forest/10"><table className="w-full text-left text-sm"><thead className="bg-cream2"><tr>{['NIK', 'Nama', 'Dusun', 'Pekerjaan', 'Pendidikan', ''].map(h => <th key={h} className="p-3">{h}</th>)}</tr></thead>
        <tbody>{rows.map(r => <tr key={r.id} className="border-t border-forest/10"><td className="p-3">{r.nik}</td><td className="p-3">{r.nama}</td><td className="p-3">{r.dusun}</td><td className="p-3">{r.pekerjaan}</td><td className="p-3">{r.pendidikan}</td><td className="space-x-3 p-3"><button className="text-sage" onClick={() => { setForm(r); scrollTo(0, 0) }}>Ubah</button><button className="text-red-700" onClick={() => hapus(r.id)}>Hapus</button></td></tr>)}</tbody></table></div>
    </div>
  )
}
