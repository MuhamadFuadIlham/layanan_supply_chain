# ROLE

Anda adalah gabungan dari:

- Senior MLOps Architect
- Senior Machine Learning Engineer
- Senior UX Researcher untuk sistem AI Enterprise
- Senior Product Manager Enterprise SaaS (Oracle SCM / SAP IBP / Blue Yonder)

Tugas Anda HANYA menghasilkan satu dokumen: `prd.md`.

Scope dokumen ini SEMPIT dan SPESIFIK: **bagaimana lapisan MLOps ditampilkan dan digunakan oleh Supply Chain Manager sehari-hari** — bukan redesign seluruh aplikasi, bukan halaman AI Prediksi, bukan Simulasi (dokumen itu sudah ada terpisah). Fokus di sini adalah 5 halaman/komponen berikut:

1. Model Registry
2. Monitoring MLOps (Model Health & Drift)
3. Prediction History (Riwayat Inferensi)
4. Model Confidence (bagaimana dikomunikasikan ke user non-teknis)
5. Notifikasi/Status Model yang muncul di luar 4 halaman di atas (mis. badge di header, alert jika model bermasalah)

JANGAN menulis kode.
JANGAN membahas endpoint API/skema database.
JANGAN membahas cara retrain model.
JANGAN merancang ulang halaman AI Prediksi atau Simulasi secara detail — cukup singgung titik integrasinya saja.

--------------------------------------------

# KONTEKS PROJECT

Nama aplikasi: **Supply Chain Oracle AI** — AI Decision Support System (bukan ERP), portofolio Machine Learning + MLOps.

Prinsip yang harus dipegang: **MLOps di aplikasi ini bukan untuk data scientist, tapi untuk membangun kepercayaan Supply Chain Manager terhadap rekomendasi AI.** Setiap elemen MLOps yang ditampilkan harus menjawab pertanyaan manager: *"Kenapa saya harus percaya angka ini?"* — bukan menjawab pertanyaan engineer *"apakah model ini sehat secara teknis?"*. Jika sebuah metrik MLOps tidak bisa diterjemahkan menjadi alasan kepercayaan bisnis, jangan ditampilkan sebagai elemen utama — cukup taruh di detail/expand.

--------------------------------------------

# GROUND TRUTH TEKNIS & DATA NYATA (WAJIB DIPAKAI, JANGAN MENGARANG ANGKA LAIN)

Model dan data berikut SUDAH ADA dan sudah dianalisis. Gunakan angka-angka ini sebagai baseline realistis untuk mockup Monitoring/Registry — jangan menciptakan angka akurasi fiktif seperti "99.9%" tanpa dasar.

## Spesifikasi Model (untuk halaman Model Registry)
- **Algoritma:** XGBoost Regressor
- **Target prediksi:** Prediksi_Waktu_Tunggu (lead time distribusi, dalam hari)
- **Jumlah fitur input:** 14 fitur (lihat daftar di PRD sebelumnya — Harga_jual, Jumlah_produk_terjual, Kuantitas_pesanan, Volume_produksi_pabrik, Waktu_produksi_pabrik, Biaya_produksi_pabrik, Total_biaya_operasional, Tingkat_cacat_produk, Inspeksi_Encoded, Rasio_Efisiensi_Biaya, Beban_Kerja_Pabrik, Segmen_Efisiensi_0/1/2)
- **Hyperparameter kunci:** 150 pohon (n_estimators), kedalaman maksimum 5, learning rate 0.05, subsample 80%, colsample_bytree 80%
- **Preprocessing pendamping:** StandardScaler untuk 8 fitur efisiensi sebelum clustering (KMeans 3 cluster)

## Metrik Performa Aktual (dihitung dari data historis 1.500 SKU — pakai sebagai baseline "Model Health" saat ini)
- **MAE (rata-rata deviasi prediksi):** ±0,42 hari
- **RMSE:** 0,60 hari
- **Korelasi prediksi vs aktual:** 0,998 (sangat kuat)
- **Akurasi dalam toleransi ±2 hari:** 98,9% dari seluruh prediksi
- **Akurasi dalam toleransi ±5 hari:** 99,9%
- **Rentang error terburuk yang tercatat:** -3,27 hari sampai +5,51 hari

Gunakan angka-angka ini sebagai contoh konkret di mockup "Model Confidence" dan "Model Health" — misalnya framing bisnis seperti "Dalam 1.500 prediksi terakhir, 99 dari 100 prediksi meleset kurang dari 2 hari" — jauh lebih meyakinkan bagi manager dibanding menyebut MAE/RMSE mentah.

## Distribusi Data Historis (untuk contoh chart drift/distribusi di Monitoring)
- Distribusi cluster efisiensi (Context Layer / KMeans): Segmen 0 = 570 SKU, Segmen 1 = 450 SKU, Segmen 2 = 480 SKU
- Distribusi kategori lead time: "Lancar (≤15 Hari)" = 690 SKU, "Macet (>15 Hari)" = 810 SKU
- Distribusi hasil inspeksi kualitas: Pending = 615, Fail = 540, Pass = 345

Field `Selisih_Error_Hari` di data adalah bukti bahwa sistem SUDAH mencatat deviasi prediksi vs aktual per SKU — ini adalah dasar nyata untuk halaman Prediction History (kolom "Akurasi Prediksi Ini") dan halaman Monitoring (grafik tren error dari waktu ke waktu).

--------------------------------------------

# YANG HARUS DIHASILKAN DI prd.md

## 1. Filosofi MLOps yang User-Facing
Jelaskan prinsip: kapan sebuah metrik MLOps layak jadi elemen utama UI, kapan cukup jadi detail tersembunyi. Berikan 3-5 contoh konkret metrik yang "terlalu teknis untuk ditampilkan langsung" vs versi terjemahan bisnisnya (mis. RMSE → "Rata-rata Meleset X Hari").

## 2. Halaman Model Registry
- Tujuan halaman ini bagi manager (bukan bagi engineer): membangun kepercayaan bahwa AI yang dipakai adalah versi yang tervalidasi, bukan eksperimen.
- Informasi yang ditampilkan: nama model aktif, versi, tanggal terakhir diperbarui *(catat sebagai asumsi placeholder karena data training date tidak tersedia di file yang ada)*, ringkasan performa (pakai angka MAE/akurasi di atas dengan framing bisnis), status ("Aktif" / "Dalam Evaluasi" / "Digantikan").
- Jika ada riwayat versi sebelumnya: bagaimana membandingkan versi lama vs baru tanpa membuat manager bingung (framing "Model baru 12% lebih akurat" bukan tabel hyperparameter).
- Tegaskan: halaman ini READ-ONLY bagi Supply Chain Manager — tidak ada aksi retrain/deploy dari sini (itu di luar peran mereka).

## 3. Halaman Monitoring (Model Health & Drift)
- Definisikan "Model Health" dalam bahasa bisnis: apakah model masih bisa dipercaya HARI INI.
- Rancang indikator drift: bagaimana menampilkan jika distribusi data terbaru (mis. proporsi SKU yang masuk kategori "Macet") mulai bergeser signifikan dari baseline historis di atas — dan apa artinya bagi manager (bukan "data drift terdeteksi", tapi "Pola pengiriman berubah, akurasi prediksi mungkin menurun sementara").
- Rancang visualisasi tren akurasi dari waktu ke waktu (harian/mingguan) menggunakan `Selisih_Error_Hari` sebagai basis data.
- Rancang alert otomatis: kondisi apa yang memicu notifikasi ke manager (mis. akurasi turun di bawah ambang tertentu) dan bagaimana bahasa notifikasi tersebut ditulis.
- Jelaskan siapa yang bertindak jika model "tidak sehat" — manager hanya diberi tahu, bukan diminta memperbaiki model (out of scope peran mereka) — tapi mereka perlu tahu implikasinya ke keputusan reorder yang sedang mereka buat.

## 4. Halaman Prediction History (Riwayat Inferensi)
- Struktur log: SKU, waktu prediksi, hasil (lead time, ROP, priority), versi model yang dipakai saat itu, status tindak lanjut (jadi PO / diabaikan / masih dipantau).
- Kolom "Akurasi Prediksi Ini" — muncul HANYA setelah waktu aktual terlewati dan data pembanding tersedia (`Selisih_Error_Hari`) — jelaskan bagaimana UI menangani kasus "belum bisa dinilai" vs "sudah terverifikasi akurat/meleset".
- Fitur bandingkan 2+ prediksi historis (untuk SKU sama di waktu berbeda, atau SKU berbeda side-by-side).
- Filter yang relevan secara bisnis: per pemasok, per kategori produk, per rentang akurasi.

## 5. Model Confidence — Komunikasi ke User Non-Teknis
- Rancang bagaimana confidence score (yang secara teknis berasal dari kestabilan prediksi/rentang error model) diterjemahkan menjadi label kualitatif ("Tinggi", "Sedang", "Perlu Ditinjau") plus satu kalimat penjelas berbasis konteks SKU tersebut (mis. "Keyakinan tinggi karena data historis SKU ini konsisten dan hasil inspeksi Pass").
- Tegaskan: confidence TIDAK ditampilkan sebagai angka desimal mentah (0.87) ke manager sebagai elemen utama — boleh muncul kecil di detail teknis (expandable), tapi elemen utama harus label + alasan.

## 6. Titik Integrasi ke Bagian Lain Aplikasi (ringkas, bukan redesign ulang)
- Bagaimana status model muncul sebagai badge kecil di Header/Topbar (mis. titik hijau "Model Aktif" vs kuning "Perlu Perhatian") tanpa mengganggu fokus utama dashboard.
- Bagaimana halaman AI Prediksi menautkan ke Model Registry/Prediction History tanpa memindahkan fokus dari tugas utama (mis. link kecil "Lihat riwayat SKU ini", bukan tombol besar yang bersaing dengan CTA utama).
- Bagaimana Alert yang dipicu oleh drift/model health berbeda secara visual dari Alert bisnis biasa (stockout, dsb.) — supaya manager tidak salah kira "masalah model" sebagai "masalah stok".

## 7. Glosarium Istilah MLOps → Bahasa Bisnis
Tabel wajib minimal 12 istilah: Model Version, Drift, Confidence Score, Inference, MAE/RMSE, Model Health, Feature Engineering, Cluster/Segmentasi, Retraining, Baseline, Threshold, Model Registry — masing-masing dengan versi bahasa Indonesia bisnis yang dipakai di UI.

--------------------------------------------

# ATURAN BAHASA & NADA

- Semua copy user-facing: Bahasa Indonesia formal-enterprise, natural, tidak terjemahan literal.
- Istilah teknis (drift, RMSE, hyperparameter, dsb.) HANYA boleh muncul di catatan developer dalam PRD ini, dipisah jelas dari copy yang dilihat manager.
- Nada MLOps di UI harus tenang dan meyakinkan, tidak alarmis — bahkan saat menampilkan model "tidak sehat", bahasa tetap solutif (mis. "Prediksi mungkin kurang presisi untuk kategori ini, disarankan verifikasi manual" bukan "MODEL ERROR").

--------------------------------------------

# ATURAN UMUM

- Setiap keputusan desain di 5 komponen di atas harus dikaitkan eksplisit ke: (a) kepercayaan manager terhadap AI, dan (b) data/angka nyata yang sudah disediakan di atas — hindari klaim generik.
- Jika sebuah kebutuhan MLOps butuh data yang tidak tersedia di file yang ada (mis. tanggal training model, log request harian), nyatakan secara eksplisit sebagai asumsi/placeholder di PRD — jangan mengarang seolah-olah data itu ada.
- Output akhir: satu file `prd.md`, Markdown, heading terstruktur H1-H3, gunakan tabel untuk spesifikasi metrik dan glosarium.