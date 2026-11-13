# Website Profil & Layanan Desa Saran Padang

Website profil dan layanan administrasi digital sederhana untuk **Desa Saran Padang**, Kecamatan Dolok Silau, Kabupaten Simalungun[cite: 1]. 

> **Catatan:** Proyek ini dibuat murni untuk keperluan belajar dan eksplorasi (*gabut* produktif). Seluruh data warga, angka statistik, maupun nomor kontak yang tercantum di dalam aplikasi ini bersifat **fiktif / contoh** dan bukan merupakan data resmi pemerintahan desa.

---

## Fitur Utama
* **Profil & Sejarah Desa:** Informasi singkat mengenai profil wilayah, sejarah, serta statistik desa[cite: 1].
* **Potensi Pertanian (Bento Grid):** Galeri komoditas unggulan warga (kopi, padi, jagung, dan hortikultura) lengkap dengan filter kategori[cite: 5, 7].
* **Cek Data Warga:** Pencarian status data kependudukan berbasis database[cite: 1].
* **Layanan Surat:** Pengajuan surat keterangan desa secara daring[cite: 1].
* **Panel Admin:** Halaman pengelolaan data warga (`/admin/warga`) yang dilindungi autentikasi kata sandi.

## Teknologi yang Digunakan
* **Framework:** Next.js (App Router) & TypeScript[cite: 2, 8]
* **Styling & Animasi:** Tailwind CSS & Framer Motion[cite: 2, 8]
* **Database & ORM:** Prisma ORM

---

## Prasyarat Sistem
Pastikan perangkat Anda sudah terpasang:
* **Node.js** `v24.14.1` (atau versi LTS terbaru yang kompatibel)
* **npm** `v11.11.0`

## Cara Menjalankan di Komputer Lokal

1. **Clone repositori & masuk ke folder proyek:**
   ```bash
   git clone <url-repositori-anda>
   cd saran-padang
