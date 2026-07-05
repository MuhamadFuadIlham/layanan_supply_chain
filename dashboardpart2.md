xgb_logistics_model.pkl → XGBRegressor, memprediksi Prediksi_Waktu_Tunggu (lead time) dari 14 fitur (harga jual, jumlah terjual, kuantitas pesanan, volume/waktu/biaya produksi, biaya operasional, tingkat cacat, hasil inspeksi, rasio efisiensi biaya, beban kerja pabrik, dan 3 kolom one-hot Segmen_Efisiensi_0/1/2 hasil clustering).
scaler_efisiensi.pkl → StandardScaler untuk 8 fitur efisiensi (waktu tunggu, stok gudang, volume/waktu/biaya produksi, biaya operasional, cacat produk, inspeksi) — dipakai sebelum clustering/inferensi.
CSV → 1.500 baris data SKU riil dengan kolom Otomatisasi_Reorder_Point_Unit (ROP), Selisih_Error_Hari (error prediksi vs aktual), Kategori_Waktu (Lancar/Macet), Nama_supplier, Vendor_ekspedisi, Lokasi_distribusi, dll.

Prompt di bawah sudah saya sisipkan skema data ini agar agent Antigravity tidak mengarang fitur.

markdown# ROLE

Bertindaklah sebagai gabungan dari:

- Senior Product Manager (AI Decision Support System)
- Senior UX Designer enterprise SaaS (kelas Oracle SCM / SAP IBP / Blue Yonder)
- Senior MLOps Architect
- Machine Learning Engineer yang memahami flow inference production
- Enterprise Supply Chain Consultant

Tugas Anda HANYA menghasilkan satu dokumen: `prd.md`.

JANGAN menulis kode React/Next.js.
JANGAN menulis kode backend/API.
JANGAN retrain atau memodifikasi model.
Dokumen ini adalah PRD analisis-UX-dan-redesign, bukan implementasi.

--------------------------------------------

# KONTEKS PROJECT

Nama aplikasi: **Supply Chain Oracle AI**
Kategori: AI Decision Support System (bukan ERP, bukan dashboard analytics biasa)
Tujuan: membantu Supply Chain Manager mengambil keputusan pembelian barang berdasarkan prediksi AI atas lead time distribusi dan Reorder Point (ROP) otomatis.

Ini adalah portofolio MLOps + Machine Learning yang modelnya SUDAH SELESAI DIBUAT dan sudah dipasang production-style. Tugas Anda BUKAN membangun model — tugas Anda adalah merancang ulang UX agar mencerminkan bagaimana model ini benar-benar dipakai sehari-hari oleh manager, bukan data scientist.

--------------------------------------------

# GROUND TRUTH TEKNIS (WAJIB DIPATUHI, JANGAN MENGARANG FITUR LAIN)

Berikut adalah skema nyata dari model dan data yang sudah ada. Seluruh desain halaman AI Prediksi, Oracle AI, dan Simulasi HARUS merujuk pada field-field ini — jangan menciptakan nama fitur baru yang tidak ada di daftar ini.

## Model 1 — XGBoost Regressor (`xgb_logistics_model.pkl`)
Output: **Prediksi_Waktu_Tunggu** (predicted lead time, dalam hari)

14 fitur input (urutan sesuai training):
1. `Harga_jual`
2. `Jumlah_produk_terjual`
3. `Kuantitas_pesanan`
4. `Volume_produksi_pabrik`
5. `Waktu_produksi_pabrik`
6. `Biaya_produksi_pabrik`
7. `Total_biaya_operasional`
8. `Tingkat_cacat_produk`
9. `Inspeksi_Encoded` (hasil inspeksi kualitas: Pass/Pending/Fail → encoded)
10. `Rasio_Efisiensi_Biaya`
11. `Beban_Kerja_Pabrik`
12. `Segmen_Efisiensi_0` (one-hot cluster)
13. `Segmen_Efisiensi_1` (one-hot cluster)
14. `Segmen_Efisiensi_2` (one-hot cluster)

## Model 2 — StandardScaler (`scaler_efisiensi.pkl`)
Menstandarisasi 8 fitur SEBELUM proses clustering (KMeans) dan sebelum sebagian masuk ke XGBoost:
`Total_waktu_tunggu`, `Tingkat_stok_gudang`, `Volume_produksi_pabrik`, `Waktu_produksi_pabrik`, `Biaya_produksi_pabrik`, `Total_biaya_operasional`, `Tingkat_cacat_produk`, `Inspeksi_Encoded`

## Field turunan Decision Engine (sudah ada di data historis, gunakan sebagai acuan output halaman):
- `Otomatisasi_Reorder_Point_Unit` → ROP hasil hitung otomatis
- `Selisih_Error_Hari` → deviasi prediksi vs aktual (dipakai untuk MLOps monitoring & confidence)
- `Kategori_Waktu` → label bisnis "Lancar (<=15 Hari)" / "Macet (>15 Hari)" — INI contoh bahasa bisnis yang harus dipertahankan gaya penulisannya
- `Rasio_Efisiensi_Biaya`, `Beban_Kerja_Pabrik` → indikator efisiensi produksi

## Dimensi konteks bisnis yang tersedia di data (pakai untuk filter/segmentasi UI):
`Jenis_produk`, `SKU`, `Nama_supplier`, `Vendor_ekspedisi`, `Lokasi_distribusi`, `Moda_transportasi`, `Rute_pengiriman`, `Hasil_inspeksi_kualitas`

## Flow inference yang sudah berjalan di backend (UX WAJIB mengikuti urutan ini secara naratif di halaman AI Prediksi, tanpa membahas implementasi API):
Input Manager (pilih SKU / isi parameter)
↓
Feature Engineering
↓
KMeans → menentukan Segmen_Efisiensi (cluster)
↓
One-Hot Encoding cluster
↓
StandardScaler (8 fitur efisiensi)
↓
XGBoost Regressor → Prediksi_Waktu_Tunggu
↓
Decision Engine → ROP, Safety Stock, Priority, Recommendation
↓
Hasil ditampilkan ke Manager

Catatan penting untuk desain: proses ini SELALU membutuhkan cluster efisiensi terlebih dahulu sebelum lead time bisa diprediksi. Artinya di halaman AI Prediksi, urutan visual hasil yang logis adalah: Segmen Efisiensi → Prediksi Lead Time → ROP & Safety Stock → Rekomendasi. Jangan menampilkan ROP sebelum lead time muncul — secara teknis maupun naratif itu salah urutan.

--------------------------------------------

# MASALAH YANG HARUS DISELESAIKAN PRD INI

1. Sidebar saat ini hanya navigasi, belum mengikuti workflow kerja Supply Chain Manager.
2. Belum ada halaman utama untuk benar-benar MENJALANKAN model ML — model ada tapi tidak punya "wajah".
3. Belum ada simulasi what-if (naikkan penjualan, ganti supplier, ubah safety stock, dst).
4. Oracle AI hanya ringkasan, belum explainable (belum menjelaskan "mengapa").
5. Alert hanya warna severity, belum ada prioritas/estimasi kerugian/deadline reorder.
6. Bahasa aplikasi masih campur Indonesia-Inggris. Seluruh istilah harus di-Indonesia-kan secara natural (Inventory → Persediaan, Demand Forecast → Prediksi Permintaan, Supplier → Pemasok, Warehouse → Gudang, Analytics → Analitik, dst — buat glosarium lengkap di PRD).
7. Belum ada jejak MLOps yang terlihat user (versi model, waktu inferensi, riwayat prediksi, confidence) ditampilkan secara profesional dan tidak terlalu teknis.

--------------------------------------------

# TARGET USER

Supply Chain Manager, Inventory Planner, Warehouse Supervisor, Purchasing Manager, General Manager — bukan data scientist. Mereka hanya peduli: produk apa yang harus dibeli, kapan, berapa banyak, apa risikonya, apa rekomendasi AI-nya.

--------------------------------------------

# YANG HARUS DIHASILKAN DI prd.md

Susun sebagai dokumen tunggal terstruktur, dengan urutan section berikut (boleh disesuaikan urutannya jika ada alasan UX lebih kuat, tapi seluruh isi wajib ada):

1. **Analisis Workflow Supply Chain Manager** — peta hari kerja nyata (pagi: cek alert → siang: jalankan prediksi untuk SKU bermasalah → sore: buat PO), bukan asumsi generik.
2. **Analisis Kekurangan Dashboard Saat Ini** — bedah 7 masalah di atas satu per satu, kaitkan dengan dampak bisnis nyata (bukan hanya "kurang bagus").
3. **Information Architecture (IA) baru** — peta halaman lengkap, hierarki menu, relasi antar halaman (mis. Alert → klik → AI Prediksi dengan SKU sudah terisi otomatis).
4. **Desain Ulang Sidebar** — urutan menu berbasis workflow (bukan alfabetis/random), sertakan alasan urutan tiap item.
5. **Halaman AI Prediksi** (halaman inti) — wajib memuat: pemilihan/informasi SKU, parameter input (mapping eksplisit ke 14 fitur XGBoost di atas — kelompokkan input mana yang wajib diisi manual vs mana yang auto-fetch dari data SKU), tombol jalankan prediksi, state loading AI, hasil prediksi berurutan sesuai flow model (Segmen Efisiensi → Lead Time → ROP/Safety Stock → Priority → Confidence → Rekomendasi), alert terkait, action button.
6. **Halaman Oracle AI (Explainable AI)** — desain naratif "mengapa" berbasis kontribusi fitur nyata (mis. jelaskan pengaruh `Tingkat_cacat_produk` tinggi, `Hasil_inspeksi_kualitas` Fail, atau `Waktu_produksi_pabrik` memanjang terhadap lead time — gunakan fitur asli, jangan generik "banyak faktor"). Sertakan bagaimana confidence dikomunikasikan tanpa menyebut istilah ML mentah ke user.
7. **Halaman Prediksi Permintaan (Forecast)** — beda fungsi dengan AI Prediksi (yang fokus lead time/ROP per SKU) — jelaskan batas dan hubungan keduanya.
8. **Halaman Alert** — redesign dengan prioritas, estimasi kerugian, estimasi penghematan, deadline reorder, pemasok paling berisiko, kategori produk paling berisiko — jelaskan dari kolom data mana tiap angka ini realistis dihitung.
9. **Halaman Persediaan** — hubungkan dengan `Otomatisasi_Reorder_Point_Unit` dan `Kategori_Waktu`.
10. **Halaman Pemasok** — hubungkan dengan `Nama_supplier`, `Vendor_ekspedisi`, `Moda_transportasi`, `Rute_pengiriman`, dan histori keterlambatan (`Selisih_Error_Hari`).
11. **Halaman Gudang** — hubungkan dengan `Tingkat_stok_gudang`, `Lokasi_distribusi`.
12. **Halaman Riwayat Prediksi** — mockup struktur log (SKU, waktu prediksi, versi model, hasil, apakah sudah jadi PO).
13. **Halaman Simulasi (What-If)** — desain UX untuk skenario: penjualan naik %, ganti pemasok, ubah safety stock, ubah harga, ubah lead time — jelaskan parameter mana yang trigger ulang scaler+KMeans+XGBoost secara penuh vs mana yang cukup dihitung ulang di Decision Engine saja (mis. ubah safety stock manual TIDAK perlu re-run XGBoost, tapi ubah harga jual/kuantitas pesanan PERLU re-run karena itu fitur model).
14. **UX Action Pasca-Prediksi** — simpan prediksi, export PDF/Excel, bandingkan prediksi, lihat riwayat, buat Purchase Order, kirim ke Purchasing — desain flow tiap aksi.
15. **Bagaimana Model ML Benar-Benar Digunakan User** — ringkasan end-to-end yang menyatukan poin 5-6-13, menegaskan tidak ada langkah model yang "tersembunyi tanpa penjelasan" dari sudut pandang manager.
16. **Elemen MLOps yang Ditampilkan ke User** — versi model, waktu inferensi, confidence, request log, model health — desain tampilan profesional non-teknis (contoh framing: "Model diperbarui 3 hari lalu, akurasi rata-rata 92%" bukan "v2.3.1-xgb-scaler-pipeline").
17. **Glosarium Bahasa Indonesia** — tabel lengkap istilah Inggris → Indonesia yang dipakai konsisten di seluruh aplikasi (minimal 20 istilah, termasuk seluruh nama field data di atas dalam versi bahasa manusia bisnis).

--------------------------------------------

# ATURAN BAHASA & NADA

- Seluruh UI copy dalam PRD harus Bahasa Indonesia formal-enterprise, bukan terjemahan literal, bukan gaya chatbot.
- Contoh nada yang benar: "Persediaan dalam kondisi sehat", bukan "Sistem mendeteksi inventory optimal".
- Istilah ML (XGBoost, KMeans, one-hot encoding, StandardScaler) TIDAK BOLEH muncul di copy yang dilihat user — istilah ini hanya boleh muncul di PRD sebagai catatan teknis untuk developer, dipisahkan jelas dari copy user-facing.

--------------------------------------------

# ATURAN UMUM

- Jangan menulis kode.
- Jangan membahas skema database/API/infrastruktur.
- Setiap keputusan desain harus punya justifikasi eksplisit yang mengaitkan ke flow model atau data nyata di atas — hindari klaim generik seperti "agar lebih modern" tanpa alasan fungsional.
- Jika ada asumsi yang harus dibuat karena data tidak menyediakan informasinya (misalnya harga per unit untuk estimasi kerugian Rupiah), nyatakan asumsi tersebut secara eksplisit di PRD, jangan diam-diam mengarang angka pasti.
- Output akhir: satu file `prd.md`, format Markdown, terstruktur dengan heading H1-H3, tabel di mana relevan (terutama mapping fitur→UI dan glosarium).