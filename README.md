# Desa Saran Padang

Prasyarat: Node.js v24.14.1, npm v11.11.0.

```bash
npm install
npx prisma generate

npm run db:seed     # isi data warga contoh (fiktif)
npm run dev         # http://localhost:3000
```
Admin: http://localhost:3000/admin/warga — kata sandi ada di `.env` (`ADMIN_PASSWORD`). Ganti `ADMIN_TOKEN` dengan string acak sebelum deploy.
Semua angka, nomor WhatsApp, dan data warga adalah contoh. Ganti dengan data resmi desa.
