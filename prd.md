# Product Requirements Document (PRD)
**Produk:** Supply Chain Oracle AI
**Modul:** Intelligence, Trust, & Decision Support Layer (Pengganti UI MLOps Tradisional)
**Standar UX:** Enterprise SaaS (Setara Palantir Foundry, SAP IBP, Microsoft Dynamics 365, Oracle SCM)
**Target Audiens Dokumen:** UX Designer, Frontend Engineer, Product Manager

---

## 1. Executive Summary

Supply Chain Oracle AI tidak berfokus pada eksperimen data science, melainkan pada eksekusi operasional. Modul ini dirancang untuk menerjemahkan kompleksitas model Machine Learning (XGBoost Regressor & Clustering) menjadi wawasan bisnis yang dapat ditindaklanjuti secara instan oleh Supply Chain Manager. 

**Filosofi Utama UX:**
1. **Membangun Kepercayaan (Trust):** Pengguna harus yakin bahwa sistem beroperasi dengan akurasi tinggi melalui bukti historis yang dapat diaudit, bukan klaim teknis.
2. **Dukungan Keputusan (Decision Support):** Menghilangkan kebingungan dalam bertindak. Informasi disajikan untuk menyelesaikan masalah rantai pasok secepat mungkin.
3. **Keterjelasan (Explainability):** AI harus mampu menjawab alasan logis di balik setiap prediksinya. 

**Prinsip Desain (The 3 Core Questions):**
Setiap layar dan komponen harus mampu menjawab 3 pertanyaan esensial dari Manager:
1. *"Apa yang sedang terjadi?"* (Visibilitas terhadap risiko dan prediksi).
2. *"Mengapa ini terjadi?"* (Penjelasan sebab-akibat dari AI).
3. *"Apa tindakan yang harus saya lakukan sekarang?"* (Rekomendasi yang dapat dieksekusi).

---

## 2. Struktur Navigasi & Halaman

Arsitektur sistem dibangun dengan menyembunyikan istilah MLOps (seperti RMSE, Data Drift, Inference, Model Registry) dan menggantinya dengan bahasa operasional bisnis.

1. **Global AI Status:** Berada di navbar/header.
2. **Prediction Risk & Recommended Actions:** Area aksi utama saat melihat SKU atau rute pemasok.
3. **Explainable AI (XAI) & Business Impact:** Panel detail yang muncul saat pengguna butuh alasan (Why?).
4. **AI Trust Center & Prediction History:** Halaman dedikasi pengganti "Model Registry & Monitoring".
5. **ROI Dashboard & Activity Timeline:** Halaman untuk melihat nilai finansial dari prediksi AI.

---

## 3. Spesifikasi Komponen & Halaman

### 3.1 Global AI Status (Header/Navbar)
**Tujuan Bisnis:** Memberikan indikator instan bahwa "otak" dari sistem (AI) sedang bekerja secara stabil atau memerlukan perhatian ekstra akibat perubahan pasar, tanpa mendominasi tampilan dashboard utama.
**User Story:** "Sebagai Manager, saya ingin melihat indikator kecil di atas layar yang memberitahu saya apakah rekomendasi AI saat ini sangat akurat, atau jika saya perlu waspada karena pasar sedang bergejolak."

*   **Layout Wireframe:** Sebuah *dot indicator* kecil dengan dropdown menu ringkas di sisi kanan atas Topbar, di sebelah profil pengguna.
*   **Komponen UI:** 
    *   *Status Badge:* Indikator Titik (Hijau/Kuning).
    *   *Dropdown Popover:* Ringkasan keandalan sistem dalam 24 jam terakhir.
*   **Microcopy:**
    *   (Hijau) "Status Sistem: Optimal. Akurasi rekomendasi pemesanan sangat tinggi."
    *   (Kuning) "Perhatian Ekstra: Terjadi lonjakan keterlambatan distribusi di rute regional. Tinjau ulang rekomendasi dengan seksama."
*   **Empty/Loading State:** Ikon berkedip halus (pulsing) warna abu-abu dengan teks *"Mensinkronisasi data pasar..."*
*   **Error State:** Titik berwarna merah dengan teks *"Gagal mengambil metrik keandalan sistem. Muat ulang."*
*   **Alasan UX:** Menggantikan konsep *Data Drift Warning*. Alih-alih mengatakan "Drift Terdeteksi", sistem menerjemahkannya menjadi implikasi bisnis ("pasar berubah, berhati-hatilah").

### 3.2 Prediction Risk & Recommended Actions (Pusat Keputusan)
**Tujuan Bisnis:** Mengurangi *cognitive load* manager saat mengevaluasi risiko kehabisan stok (stockout) atau kelebihan stok (overstock) dengan langsung memberikan tindakan yang disarankan.
**User Story:** "Sebagai Manager, saat saya melihat sebuah SKU yang berisiko, saya ingin sistem memberi tahu saya tepatnya berapa unit yang harus dipesan dan kepada siapa, sehingga saya bisa langsung mengambil keputusan."

*   **Layout Wireframe:** Format *Card/Panel* prioritas di halaman Dashboard atau Detail SKU. Dipecah menjadi dua sisi: [Sisi Kiri: Risiko Saat Ini] | [Sisi Kanan: Rekomendasi Tindakan].
*   **Komponen UI:**
    *   *Risk Indicator Level:* Label (Risiko Tinggi/Sedang/Rendah).
    *   *Action Button:* Tombol eksekusi utama (misal: "Setujui Pemesanan", "Ubah Pemasok").
    *   *Secondary Action:* Tombol "Lihat Alasan AI" yang membuka panel XAI.
*   **Microcopy:** 
    *   *Risk:* "Risiko Tinggi: Keterlambatan pasokan 3 hari diprediksi untuk SKU-1042."
    *   *Action:* "Saran AI: Tingkatkan Titik Pemesanan (ROP) menjadi 250 unit segera. [Setujui & Buat Draft PO]"
*   **Empty State:** Ikon checklist dengan pesan *"Tidak ada tindakan darurat yang diperlukan saat ini. Semua SKU berada pada level aman."*
*   **Loading State:** *Skeleton loader* berbentuk kartu ganda dengan animasi *shimmer*.
*   **Error State:** Panel kartu dengan batas oranye *"Tidak dapat mengambil rekomendasi terbaru. Anda dapat menggunakan konfigurasi pemesanan standar."*
*   **Alasan UX:** Meniadakan konsep "Inference Output". Manusia tidak mencari probabilitas prediksi, mereka mencari apa yang harus dilakukan terhadap probabilitas tersebut. 

### 3.3 Explainable AI (XAI) & Business Impact (Panel Pemahaman)
**Tujuan Bisnis:** Menjawab pertanyaan "Mengapa ini terjadi?" secara logis. Ini sangat krusial di level Enterprise untuk meyakinkan audiens eksekutif bahwa AI tidak mengambil keputusan "secara gaib" (black-box).
**User Story:** "Sebagai Manager, sebelum saya menyetujui rekomendasi pembelian senilai Rp 500 Juta, saya butuh sistem menjelaskan faktor-faktor operasional apa yang membuat prediksi tersebut."

*   **Layout Wireframe:** Panel geser (*Slide-over/Drawer*) dari kanan layar atau Modal lebar, yang muncul saat mengeklik "Lihat Alasan AI".
*   **Komponen UI:**
    *   *Impact Waterfall Chart:* Grafik sederhana yang menunjukkan kontribusi positif/negatif.
    *   *Natural Language Generation (NLG) Text:* Penjelasan naratif AI.
    *   *Financial Impact Box:* Kotak tebal berisi implikasi rupiah.
*   **Microcopy:**
    *   "Mengapa AI merekomendasikan Waktu Tunggu 12 Hari?"
    *   "1. **Tingkat Cacat Pemasok (Negatif):** Pemasok A memiliki riwayat penolakan kualitas sebesar 4% minggu ini, menambah risiko +2 hari."
    *   "2. **Beban Kerja Pabrik (Negatif):** Produksi sedang pada kapasitas puncak (98%), menambah +1 hari."
    *   "3. **Efisiensi Rute (Positif):** Cuaca pengiriman optimal menghemat -1 hari."
    *   *Impact:* "Mengabaikan saran ini berisiko kehilangan pendapatan sebesar Rp 45.000.000 akibat kehabisan stok."
*   **Empty/Loading State:** Spinner melingkar *"Menganalisis faktor operasional..."*
*   **Error State:** *"Penjelasan detail sedang tidak tersedia, namun rekomendasi utama tetap berlaku berdasarkan data historis."*
*   **Alasan UX:** Menggantikan konsep teknis *Feature Importance* (SHAP values). Pengguna tidak perlu tahu bobot matematika, mereka hanya perlu tahu realita operasional (cacat pemasok tinggi = pengiriman lama).

### 3.4 AI Trust Center & Prediction History (Pusat Keandalan & Audit)
**Tujuan Bisnis:** Berfungsi sebagai buku besar (audit trail) untuk membuktikan bahwa AI ini kompeten. Membangun kepercayaan dengan transparansi mutlak atas kapan sistem benar dan kapan sistem meleset.
**User Story:** "Sebagai Manager, saya ingin melihat rekam jejak seberapa akurat rekomendasi sistem ini di masa lalu, dan apakah sistem ini cukup andal (sehat) untuk saya jadikan sandaran evaluasi KPI saya."

*   **Layout Wireframe:** Halaman penuh (Full Page) dengan dua tab utama: [Status Keandalan] dan [Riwayat Akurasi Prediksi].
*   **Komponen UI:**
    *   *Performance Metric Cards:* Kartu skor ringkas di bagian atas.
    *   *Audit Data Table:* Tabel log prediksi historis dengan fitur filter (Pemasok, SKU).
    *   *Deviation Timeline:* Grafik garis perbandingan antara "Prediksi AI" vs "Realisasi Aktual" di lapangan.
*   **Microcopy:**
    *   (Sebagai pengganti RMSE/MAE): "Rentang Akurasi: Prediksi waktu tunggu biasanya presisi dengan margin meleset maksimal ±0.4 hari."
    *   "Status Pengetahuan Sistem: Pembaruan data terbaru dilakukan 24 jam yang lalu. AI sangat memahami kondisi pasar saat ini."
    *   *Tabel Kolom:* ID Prediksi | SKU | Saran Waktu Tunggu | Waktu Tiba Aktual | Status (Tepat Waktu / Meleset 1 Hari).
*   **Empty State (Tabel):** *"Belum ada siklus pengiriman yang selesai untuk dibandingkan dengan prediksi. Data akurasi akan muncul setelah pesanan tiba."*
*   **Loading State:** Skeleton table rows.
*   **Error State:** Notifikasi banner *"Koneksi ke riwayat historis terputus. Silakan coba beberapa saat lagi."*
*   **Alasan UX:** Menggantikan *Model Registry* dan *Model Monitoring*. Kata "Trust Center" memiliki beban psikologis yang jauh lebih menenangkan bagi eksekutif dibanding "Model Monitoring" yang terdengar seperti sistem rawan rusak.

### 3.5 ROI Dashboard & Activity Timeline (Pusat Dampak Bisnis)
**Tujuan Bisnis:** Mengukur dan membenarkan (justify) investasi pada perangkat lunak AI dengan menunjukkan nilai finansial dan waktu yang dihemat.
**User Story:** "Sebagai Direktur/Manager, saya ingin melihat dashboard rekapitulasi berapa banyak uang dan waktu yang berhasil dihemat perusahaan sejak kami mengikuti rekomendasi sistem ini."

*   **Layout Wireframe:** Widget pada Halaman Utama (Dashboard) atau Halaman Laporan.
*   **Komponen UI:**
    *   *Big Number Stats:* Angka besar berwarna hijau terang (Positif).
    *   *Activity Feed / Timeline:* Log kronologis tindakan otomatis yang diambil AI.
*   **Microcopy:**
    *   "Dampak Finansial Bulan Ini: **Rp 125.000.000** diselamatkan dari optimalisasi stok mati."
    *   "Efisiensi Waktu: **48 Jam** dihemat dari otomatisasi perencanaan."
    *   *Timeline:* "Hari ini, 10:00 AM - AI secara otomatis merekomendasikan kenaikan stok penyangga untuk SKU-991 karena peringatan badai. [Tinjau Aksi]"
*   **Empty/Loading State:** Angka 'Rp 0' dengan keterangan *"Menghitung akumulasi efisiensi minggu ini..."*
*   **Error State:** Angka tidak muncul, diganti dengan tanda strip (`-`) dan ikon peringatan kecil.
*   **Alasan UX:** Tingkat adopsi enterprise didorong oleh kalkulasi Return on Investment. AI tidak dinilai dari *precision-recall curve*, melainkan dari *cost-saved*. 

---

## 4. Glosarium Enterprise (Pemetaan UX)

Pemetaan bahasa ini bersifat wajib dan harus diterapkan di seluruh *copywriting* aplikasi, *tooltips*, dan materi manual pelatihan pengguna.

| Istilah Ilmu Data & MLOps (JANGAN DIGUNAKAN DI UI) | Standar Enterprise SCM (GUNAKAN INI DI UI) |
| :--- | :--- |
| **Inference / Prediction** | Saran Keputusan / Rekomendasi Operasional |
| **Model Registry / Versioning** | Profil Kecerdasan / Pusat Pembaruan Pengetahuan |
| **Model Health / Monitoring** | Indikator Keandalan Sistem / Status Kepercayaan |
| **Data Drift / Concept Drift** | Pergeseran Pola Pasar / Fluktuasi Tren Distribusi |
| **Confidence Score / Probability** | Tingkat Kepastian / Label Risiko (Tinggi, Sedang, Rendah) |
| **RMSE / MAE / Error Rate** | Rentang Akurasi / Rata-rata Deviasi Hari |
| **Feature Importance / SHAP** | Faktor Penentu / Penggerak Utama Keputusan (Key Drivers) |
| **Clustering / KMeans Segment** | Profiling Pemasok / Segmentasi Efisiensi Operasional |
| **Retraining Model** | Sinkronisasi Pengetahuan Pasar / Adaptasi Tren Terbaru |
| **Threshold / Alert Trigger** | Batas Toleransi / Ambang Peringatan Operasional |
| **False Positive / False Negative** | Anomali Saran / Rekomendasi Meleset |
| **Baseline Data** | Standar Operasional Historis (Historical Baseline) |

---
**Dokumen ini merupakan panduan final (Single Source of Truth) untuk fase desain antarmuka Intelligence & Decision Support Layer pada The Supply Chain Oracle AI.**
