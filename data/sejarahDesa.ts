// Konten halaman /sejarah. Admin desa cukup mengedit teks di file ini.
export type Pangulu = { nama: string; periode: string }
export type BagianSejarah = { id: string; label: string; judul: string; isi: string; pangulu?: Pangulu[] }

export const bagianSejarah: BagianSejarah[] = [
  {
    id: 'profil', label: 'Kedudukan wilayah',
    judul: 'Pusat Pemerintahan Kecamatan Dolok Silau',
    isi: 'Saran Padang merupakan ibu kota sekaligus pusat pemerintahan dari Kecamatan Dolok Silau, Kabupaten Simalungun, Sumatera Utara. Wilayah ini didominasi oleh masyarakat etnis Batak Simalungun yang hidup berdampingan secara harmonis dengan masyarakat etnis Batak Karo di beberapa nagori sekitar seperti Cingkes, Bawang, dan Paribuan. Sejak dahulu hingga sekarang, mayoritas penduduk menggantungkan hidup dari sektor pertanian dengan komoditas unggulan berupa sayuran dan buah-buahan dataran tinggi.',
  },
  {
    id: 'akar', label: 'Sekitar tahun 1450',
    judul: 'Akar Sejarah dari Pustaha Bandar Hanopan',
    isi: 'Berdasarkan catatan pustaka lama Pustaha Bandar Hanopan di Kecamatan Silau Kahean, Kabupaten Simalungun, sejarah wilayah Dolok Silau tidak terlepas dari Kerajaan Silau dan kemunculan marga Purba Dasuha sekitar tahun 1450. Nama Sidasuha berasal dari kata "si" (orang), "da" (sang), dan "suha" dari kata suha-suha (sisa-sisa minuman tuak/aren), yang bermakna julukan bagi peminum sisa tuak aren yang pertama kali muncul di Silau Buttu (wilayah Kecamatan Raya sekarang).',
  },
  {
    id: 'petani', label: 'Kisah leluhur',
    judul: 'Ketekunan Sang Petani yang Menjadi Cikal Bakal Pemimpin',
    isi: 'Sejarah ini bermula dari kisah dua bersaudara putra Raja Silau bermarga Purba Tambak. Putra sulung memiliki sifat petualang yang gemar mengembara (mardagang), sedangkan putra bungsu dikenal sebagai sosok pendiam, tekun bertani, rajin mengurus ladang, serta menyadap tuak dari pohon enau (maragad) sepulang berkebun. Semangat ketekunan dalam mengolah lahan pertanian dan kesahajaan hidup dari kisah leluhur inilah yang terus diwariskan dan menjadi karakter utama masyarakat petani di Saran Padang dan Dolok Silau hingga masa kini.',
  },
  {
    id: 'nagori', label: 'Masa pemerintahan nagori',
    judul: 'Kepemimpinan Nagori Saran Padang dari Masa ke Masa',
    isi: 'Berikut daftar Pangulu (Kepala Desa) yang pernah memimpin Nagori Saran Padang.',
    // PLACEHOLDER: ganti nama dan periode dengan data resmi.
    pangulu: [
      { nama: '[Nama Pangulu ke-1]', periode: '1985 – 1993' },
      { nama: '[Nama Pangulu ke-2]', periode: '1993 – 2001' },
      { nama: '[Nama Pangulu ke-3]', periode: '2001 – 2013' },
      { nama: '[Nama Pangulu ke-4]', periode: '2013 – sekarang' },
    ],
  },
]

export const kartuSorotan = [
  { judul: 'Ibu Kota Dolok Silau', isi: 'Saran Padang menjadi pusat pemerintahan kecamatan.' },
  { judul: 'Warisan Pustaha Bandar Hanopan (1450)', isi: 'Catatan pustaka lama tentang Kerajaan Silau dan marga Purba Dasuha.' },
  { judul: 'Sentra Sayuran & Buah-buahan', isi: 'Hasil bumi dataran tinggi yang menghidupi mayoritas warga.' },
]

export const sumberReferensi = 'Sumber Referensi Sejarah: Sari pati catatan Pustaha Bandar Hanopan & Sejarah Kerajaan Dolok Silau.'
