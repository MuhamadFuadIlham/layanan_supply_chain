PRD — The Supply Chain Oracle | Landing Page
AI-Powered Supply Chain Intelligence Platform
Versi: 1.0 · Scope: Frontend Landing Page sahaja · Status: Draft untuk review

1. Executive Summary & Tujuan Bisnis
Masalah bisnis yang ingin diselesaikan landing page ini:
Landing page adalah titik pertama di mana calon pengguna memutuskan apakah The Supply Chain Oracle layak dicoba. Tujuannya bukan menjelaskan seluruh fitur produk, melainkan membangun kepercayaan dalam waktu kurang dari 8 detik, lalu menuntun pengunjung ke satu tindakan: mencoba produk atau menjadwalkan demo.
Tujuan bisnis spesifik:
TujuanMetrik KeberhasilanMeningkatkan pemahaman masalah supply chain oleh pengunjungScroll depth > 60% ke section "Solusi"Mengonversi pengunjung menjadi trial/demo userCTR CTA utama > 4%Membangun kepercayaan (kredibilitas produk baru)Time on page > 90 detikMenjelaskan ROI tanpa jargon teknisKlik ke section ROI/pricing > 25%Memisahkan segmen enterprise vs UMKMKlik CTA sekunder (UMKM) terukur terpisah
Prinsip inti: Jual solusi, bukan teknologi. Setiap section harus menjawab pertanyaan pengunjung: "Apa untungnya buat saya?" — bukan "Seberapa canggih AI-nya?"

2. Target User & Persona
PersonaPain Point UtamaBahasa yang ResonanCTA yang CocokOperational ManagerStockout, overstock, forecasting meleset"Berhenti menebak, mulai memprediksi""Lihat Cara Kerja"Supply Chain ManagerDemand planning tidak akurat, reorder manual"Rencanakan permintaan sebelum terjadi""Coba Forecast Engine"Warehouse ManagerStok mati, stok lambat, safety stock tidak presisi"Ketahui stok mana yang menggerogoti cashflow Anda""Lihat Analisis Inventory"Business OwnerProfitabilitas, cashflow, efisiensi operasional"Satu dashboard, satu keputusan lebih baik""Jadwalkan Demo"UMKMPencatatan manual, stok tidak terkontrol"Kelola stok Anda tanpa jadi ahli data""Mulai Gratis"
Implikasi desain: Landing page harus punya dua jalur emosional yang berjalan paralel — enterprise credibility (untuk Manager/Owner) dan simplicity/approachability (untuk UMKM) — tanpa terasa terpecah. Ini dicapai lewat copy yang berlapis: headline besar bersifat universal, sub-copy di tiap section menyasar persona spesifik.

3. Value Proposition & Positioning
Positioning statement:
The Supply Chain Oracle adalah platform yang mengubah data stok mentah menjadi keputusan bisnis yang jelas — tanpa memerlukan tim data scientist.
Value pillars (dipakai konsisten di seluruh copy):

Prediktif, bukan reaktif — tahu sebelum stok habis, bukan setelah.
Actionable, bukan sekadar dashboard — setiap angka disertai rekomendasi tindakan.
Mudah diadopsi — dari UMKM hingga enterprise, tanpa kurva belajar curam.

Differentiator utama untuk copy: "Business Guidance First" — produk tidak hanya menampilkan angka, tapi menuntun keputusan (kapan reorder, berapa safety stock, produk mana yang perlu diperhatikan).

4. Struktur Section & Urutan (Conversion-Optimized)
Urutan berikut disusun ulang dari draft awal berdasarkan prinsip narrative arc (masalah → empati → bukti → solusi → aksi), bukan urutan fitur:

Navbar (sticky, minimal)
Hero — janji utama + visual produk
Social Proof Strip — logo klien / angka kredibilitas (jika belum ada klien nyata, gunakan angka industri/riset sebagai kredibilitas sementara — lihat catatan di Section Detail)
Masalah (Problem Agitation) — bikin pengunjung merasa "ini gue banget"
Solusi (Value Framing) — transisi dari masalah ke solusi dalam satu breath
Visual Dashboard Showcase — bukti visual, bukan klaim
Cara Kerja (How It Works) — 3 langkah sederhana, menurunkan resistensi kognitif
AI Oracle Highlight — fitur pembeda utama, ditempatkan setelah trust terbangun
Forecast & Inventory Deep Dive — dua kartu besar, fitur inti
ROI / Impact Section — angka dampak bisnis (efisiensi stok, pengurangan stockout, dll)
Keunggulan / Kenapa Berbeda — perbandingan implisit vs cara lama
Pricing Preview — bukan tabel harga penuh, cukup 2-3 tier teaser
Testimonial/Trust Section (opsional, disiapkan strukturnya meski konten placeholder)
CTA Akhir (Final Conversion) — ajakan kuat, low-friction
Footer

Rasional perubahan dari draft awal: "Cara Kerja" dipindah lebih awal (sebelum AI Oracle/Forecast/Inventory) karena pengunjung baru perlu memahami bagaimana produk bekerja secara sederhana sebelum dijejali detail fitur — ini menurunkan bounce rate di paruh kedua halaman.

5. User Flow
Landing (Hero)
   │
   ├─ Scroll path (mayoritas user) ──► Problem ──► Solution ──► Dashboard Visual
   │                                        │
   │                                        ▼
   │                                  How It Works ──► Feature Deep Dive ──► ROI
   │                                        │
   │                                        ▼
   │                                  Pricing Preview ──► Final CTA
   │
   └─ Direct-intent path (user yang sudah yakin) ──► Klik CTA di Hero ──► Signup/Demo Form
Dua exit point CTA disiapkan: CTA di Hero (untuk high-intent user) dan CTA di akhir halaman (untuk user yang butuh diyakinkan). Navbar juga menyimpan CTA persisten di kanan atas.

6. UX Strategy & Conversion Strategy

Above the fold rule: Hero harus menjawab "apa produknya" dan "untuk siapa" tanpa scroll.
Progressive disclosure: informasi teknis (AI, forecasting algoritma) baru muncul setelah trust dasar terbangun di section Problem/Solution.
Single primary CTA per section — hindari lebih dari 1 CTA berbeda tujuan dalam satu section (mengurangi choice paralysis).
Micro-commitment ladder: CTA awal ringan ("Lihat Cara Kerja") → CTA pertengahan sedang ("Coba Demo") → CTA akhir kuat ("Mulai Gratis Sekarang").
Trust signals berlapis: angka dampak (ROI section), visual produk nyata (dashboard showcase), dan bahasa yang tidak berlebihan (menghindari hype words) — semua bekerja bersama membangun kredibilitas untuk produk yang relatif baru.
Objection handling terselip di copy: contoh, di section UMKM tegaskan "tanpa perlu tim IT" untuk mematahkan asumsi bahwa produk ini rumit.


7. Visual Hierarchy
LevelElemenTreatment1Headline HeroFont terbesar, bold, gradient text opsional pada 1-2 kata kunci2Section HeadlinesUkuran besar konsisten, selalu di atas body text3Dashboard Mockup / VisualElemen terbesar secara area, dengan glow/shadow untuk menonjol dari background4Body CopyKontras sedang, line-height lega, max-width dibatasi untuk keterbacaan (±65 karakter/baris)5Supporting Metrics/BadgesKecil, floating, sebagai aksen bukan fokus utama6CTA ButtonWarna accent paling terang di layar, selalu ada breathing space di sekitarnya
Prinsip: satu focal point per section. Tidak boleh ada dua elemen yang bersaing memperebutkan perhatian pada viewport yang sama.

8. Design System
8.1 Color System
TokenHexPenggunaan--bg-base#050816Background utama--bg-gradient#0B1D3AGradient section, panel background--accent-primary#4F7CFFCTA utama, link, highlight ikon--accent-secondary#6C63FFGradient pendamping, elemen sekunder--highlight#2CE6B8Metrik positif, badge sukses, growth indicator--warning#FFC857Indikator peringatan (mis. stok menipis dalam mockup)--danger#FF5C7AIndikator kritis (mis. stockout dalam mockup)--text-primary#F5F7FA (disarankan)Headline, teks utama--text-secondary#9BA5B8 (disarankan)Body text, caption--border-glassrgba(255,255,255,0.08)Border kartu glassmorphism
Aturan penggunaan:

Glow effect maksimal 2 layer per elemen, opacity rendah (12-20%), blur besar — hindari neon.
Gradient aurora hanya dipakai di background section besar (Hero, CTA akhir), bukan di setiap kartu.
Warning/Danger hanya dipakai dalam konteks data mockup (bukan dekorasi UI umum), agar makna semantiknya tetap kuat.

8.2 Typography

Font family: sans-serif geometris modern (contoh arah: Inter, Geist, atau Satoshi — dipilih saat implementasi).
Headline (H1 Hero): 56–72px desktop, bold/extrabold, letter-spacing sedikit rapat, line-height ketat (1.05–1.15).
H2 Section: 36–44px, bold.
H3 Card Title: 20–24px, semibold.
Body: 16–18px, regular, line-height 1.6–1.7.
Caption/Label: 13–14px, medium, uppercase-tracking untuk label kecil (mis. "AI ORACLE").
Nada suara tipografi: subjudul harus terdengar seperti ditulis manusia berpengalaman marketing produk (gaya Stripe) — pendek, spesifik, tidak generik.

8.3 Spacing System
Gunakan skala 8pt: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px.

Padding section (desktop): 96–128px vertikal.
Padding section (mobile): 48–64px vertikal.
Gap antar kartu dalam grid: 24–32px.
Container max-width: 1280px, dengan padding horizontal minimum 24px di mobile.

8.4 Icon Guideline

Gaya ikon: line icon minimalis, stroke 1.5–2px, sudut membulat — selaras dengan estetika Linear/Vercel.
Ikon fitur (Forecast, Inventory, AI Oracle) menggunakan container glass rounded dengan glow accent di belakangnya, bukan ikon polos.
Hindari ikon 3D/skeuomorphic — bertentangan dengan estetika minimal-premium yang diinginkan.

8.5 Dark Mode Guideline
Produk ini dark-first (bukan dark mode sebagai opsi tambahan). Landing page tidak menyediakan toggle light mode pada versi awal — seluruh sistem warna dirancang native untuk dark background. Jika light mode dibutuhkan di masa depan, dibutuhkan token warna terpisah (--bg-base-light, dst.) — dicatat di section Future Extensibility.

9. Component Guideline
9.1 Button
VarianPenggunaanStylePrimaryCTA utama (1 per section)Solid gradient accent, rounded-full atau rounded-xl, sedikit glow saat hoverSecondaryCTA pendampingOutline/ghost dengan border glass, teks accentTertiary/LinkAksi ringan ("Pelajari lebih lanjut")Teks + underline animasi saat hover

Ukuran minimum tap target: 44x44px (mobile-friendly).
State wajib: default, hover, active/pressed, focus (outline aksesibilitas), disabled.

9.2 Card

Base style: glassmorphism — background semi-transparan (rgba dari --bg-gradient), backdrop-blur, border tipis --border-glass, rounded-2xl/3xl.
Elevation via shadow lembut + glow warna accent tipis, bukan hard shadow hitam.
Hover state: sedikit translateY(-4px) + peningkatan border opacity — memberi kesan "mengambang".

9.3 Navbar

Sticky, transparan di top-of-page, berubah menjadi glass-blur solid saat scroll (>50px).
Struktur: Logo kiri — Menu tengah (Produk, Cara Kerja, Harga, Tentang) — CTA kanan (Login + CTA Primary).
Mobile: menu hamburger, drawer full-screen dengan animasi slide/fade.

9.4 Footer

Struktur 4 kolom: Produk, Perusahaan, Sumber Daya, Legal — plus kolom brand (logo + tagline + social icons).
Bottom bar: copyright + link privacy/terms.
Nada visual lebih tenang/minim dari section lain — tidak perlu glow besar, cukup border-top tipis sebagai pemisah.


10. Section Detail
10.1 Hero

Layout: split — teks kiri (headline, sub-headline, CTA ganda), visual kanan (mockup dashboard besar dengan floating metric cards).
Floating metrics contoh: "Stockout ↓32%", "Forecast Accuracy 94%" — ditampilkan sebagai kartu kecil melayang dengan animasi float halus (bukan berkedip).
Background: aurora gradient halus + noise/grain tipis agar tidak terasa flat.
CTA ganda: Primary ("Mulai Gratis" / "Coba Demo") + Secondary ghost ("Lihat Cara Kerja").

10.2 Social Proof Strip

Jika belum ada logo klien nyata, gunakan pendekatan alternatif yang tetap jujur: angka kategori industri yang dilayani ("Dirancang untuk manufaktur, distribusi, retail, dan UMKM") — hindari klaim angka pengguna yang tidak bisa diverifikasi.

10.3 Masalah (Problem Agitation)

Format: 3 kartu masalah singkat (stockout, overstock, keputusan lambat) dengan ikon + 1-2 kalimat tajam per kartu. Nada: empatik, spesifik, bukan dramatis berlebihan.

10.4 Solusi (Value Framing)

Transisi langsung dari masalah: "Oracle mengubah pola stok Anda menjadi rekomendasi yang jelas" — diikuti 3 pilar value (lihat Section 3).

10.5 Visual Dashboard Showcase

Mockup besar dashboard (statis/high-fidelity image atau interactive-looking screenshot), dikelilingi anotasi kecil yang menjelaskan bagian penting (panah/label minimal, gaya Linear).

10.6 Cara Kerja (How It Works)

3 langkah horizontal (desktop) / vertikal (mobile): "Hubungkan data stok Anda" → "Oracle menganalisis pola" → "Dapatkan rekomendasi harian". Setiap langkah punya ikon + visual mini.

10.7 AI Oracle Highlight

Section khusus menonjolkan "AI Oracle" sebagai asisten pengambilan keputusan — bukan chatbot generik. Gunakan visual percakapan/insight card, bukan klaim teknis algoritma.

10.8 Forecast & Inventory Deep Dive

Dua kartu besar berdampingan (desktop) / stack (mobile): Forecast Engine (grafik prediksi) dan Inventory Optimization (indikator reorder point/safety stock). Masing-masing dengan 1 CTA kecil "Pelajari lebih lanjut".

10.9 ROI / Impact

Grid angka besar (mis. "↓ Rata-rata 28% biaya stok berlebih", "↑ 94% akurasi prediksi permintaan") — angka harus disertai disclaimer kecil jika bersifat estimasi/riset, untuk menjaga kredibilitas.

10.10 Keunggulan

Perbandingan implisit "Cara Lama vs Oracle" dalam format 2 kolom ringkas — bukan tabel kompetitor eksplisit.

10.11 Pricing Preview

2-3 tier teaser (mis. Starter/UMKM, Growth, Enterprise) dengan highlight fitur utama saja, CTA "Lihat Detail Harga" mengarah ke halaman pricing terpisah (di luar scope saat ini).

10.12 Final CTA

Full-width section dengan aurora gradient kuat, headline penutup singkat, satu CTA besar. Ini adalah "last chance" conversion point.


11. Copywriting Guideline
Prinsip nada suara:

Pendek, percaya diri, tidak menjual berlebihan.
Hindari kata: "revolusi", "platform terbaik", "powered by AI", "transformasi digital", "solusi terdepan", "canggih".
Gunakan kata kerja aktif dan spesifik: "Prediksi stok 30 hari ke depan" lebih baik dari "AI canggih untuk prediksi".
Setiap headline section dijawab dalam 1 kalimat sub-copy yang menegaskan manfaat, bukan mengulang fitur.
Angka dan bukti lebih kuat dari adjektiva ("94% akurasi" > "sangat akurat").

Contoh arah headline Hero (untuk referensi tim copy, bukan final):
"Tahu kapan harus restock. Sebelum pelanggan tahu Anda kehabisan."

12. Interaction, Motion & Micro-interaction Guideline

Scroll animation: fade-up halus (opacity 0→1, translateY 16px→0) per elemen, staggered dengan delay 60-100ms antar elemen dalam satu section. Trigger sekali (tidak berulang tiap scroll ke atas-bawah) agar tidak mengganggu.
Hover interaction: kartu naik tipis + glow border menyala; tombol memiliki scale halus (1.0 → 1.02) + shadow membesar.
Micro-interaction: floating metric cards di Hero bergerak float halus (translateY loop lambat, ±6px, durasi 3-4 detik) untuk kesan "hidup" tanpa mengganggu.
Loading skeleton: untuk mockup dashboard yang dimuat sebagai gambar berat, gunakan skeleton shimmer dengan warna dasar --bg-gradient dan highlight bergerak tipis — konsisten dengan tema dark.
Empty state: tidak relevan untuk landing page murni (tidak ada data user), namun disiapkan sebagai guideline untuk mockup dashboard di Hero (agar mockup terlihat "terisi data" secara meyakinkan, bukan kosong).
Motion timing: durasi transisi standar 200-350ms, easing ease-out untuk masuk, ease-in untuk keluar — hindari bounce berlebihan agar tetap terasa premium bukan playful.


13. Responsive Guideline
BreakpointRangePerilaku KunciMobile< 640pxSingle column, navbar jadi hamburger drawer, hero visual di bawah teks, font headline diturunkan ke 32-40pxTablet640–1024px2-column grid untuk kartu, hero tetap stack vertikal atau split ringan tergantung lebarDesktop> 1024pxLayout penuh sesuai desain utama, split hero, grid multi-kolomLarge Desktop> 1440pxContainer tetap max-width 1280px, tambahan whitespace di sisi, bukan elemen melebar
Prioritas mobile: kecepatan load mockup (gunakan gambar teroptimasi/lazy load), CTA tetap mudah dijangkau ibu jari (sticky bottom CTA opsional untuk mobile).

14. Accessibility Guideline

Kontras teks minimum WCAG AA (4.5:1 untuk body text) — perlu diverifikasi khusus karena background dark dengan teks abu-abu (--text-secondary) rawan kontras rendah.
Semua elemen interaktif harus punya focus state yang terlihat jelas (outline accent), bukan hanya hover.
Ikon dekoratif diberi aria-hidden, ikon fungsional diberi label.
Animasi scroll harus menghormati preferensi prefers-reduced-motion.
Struktur heading semantik (H1 tunggal di Hero, H2 per section) untuk screen reader dan SEO.


15. SEO Strategy

Satu H1 di Hero yang mengandung value proposition utama, bukan sekadar nama produk.
Meta title & description berbasis masalah yang dicari user (mis. "Software Peramalan Stok & Inventory AI untuk Bisnis Indonesia").
Structured data SoftwareApplication/Organization untuk rich snippet.
Gambar mockup dashboard menggunakan alt text deskriptif, bukan generik.
URL bersih, satu landing page utama tanpa parameter berlebihan.
Core Web Vitals sebagai prioritas teknis (lihat Section 16) karena berdampak langsung ke ranking.


16. Performance Guideline

Target Lighthouse Performance score > 90 pada mobile.
Gambar mockup dashboard: format WebP/AVIF, responsive srcset, lazy-load di luar viewport pertama.
Font: preload font utama, gunakan font-display: swap.
Animasi berbasis CSS transform/opacity (GPU-accelerated), hindari animasi yang memicu reflow.
Framer Motion digunakan secukupnya — hindari animasi berat di elemen yang banyak (mis. daftar panjang), gunakan viewport={{ once: true }} untuk scroll trigger agar tidak re-render berulang.
Total JS bundle landing page dijaga ringan — tidak perlu memuat library dashboard/chart penuh (Recharts dsb.) karena landing page hanya menampilkan visual statis/mockup, bukan data real-time.


17. Frontend Architecture
17.1 Tech Stack (khusus landing page)
Next.js · Tailwind CSS · Framer Motion · shadcn/ui (untuk komponen dasar seperti button/dialog) — konsisten dengan stack yang sudah dipakai di proyek dashboard, agar transisi ke tahap berikutnya mulus.
17.2 React Component Hierarchy
<LandingPage>
 ├── <Navbar />
 ├── <HeroSection />
 │     ├── <HeroCopy />
 │     ├── <HeroVisual />
 │     └── <FloatingMetricCard /> (multiple)
 ├── <SocialProofStrip />
 ├── <ProblemSection />
 │     └── <ProblemCard /> (x3)
 ├── <SolutionSection />
 │     └── <ValuePillar /> (x3)
 ├── <DashboardShowcase />
 ├── <HowItWorksSection />
 │     └── <StepCard /> (x3)
 ├── <AIOracleSection />
 ├── <FeatureDeepDive />
 │     ├── <ForecastCard />
 │     └── <InventoryCard />
 ├── <ROISection />
 │     └── <MetricStat /> (multiple)
 ├── <AdvantageSection />
 ├── <PricingPreview />
 │     └── <PricingTierCard /> (x2-3)
 ├── <FinalCTASection />
 └── <Footer />
17.3 Folder Structure
/app
  /(landing)
    page.tsx
/components
  /landing
    Navbar.tsx
    HeroSection.tsx
    HeroVisual.tsx
    FloatingMetricCard.tsx
    ProblemSection.tsx
    ProblemCard.tsx
    SolutionSection.tsx
    DashboardShowcase.tsx
    HowItWorksSection.tsx
    AIOracleSection.tsx
    FeatureDeepDive.tsx
    ROISection.tsx
    AdvantageSection.tsx
    PricingPreview.tsx
    FinalCTASection.tsx
    Footer.tsx
  /ui  (shadcn primitives: button, card, badge, dll)
/lib
  animations.ts   (varian Framer Motion reusable)
  constants.ts    (copy/content terpusat)
/styles
  globals.css     (token warna, font, base style)
/public
  /images
  /mockups
17.4 State Management
Landing page bersifat mostly-static — tidak memerlukan state management global (Zustand/Redux). Kebutuhan state terbatas pada:

Local state per komponen (mis. navbar scroll state, mobile menu open/close) via useState.
Scroll-triggered animation state dikelola oleh Framer Motion (useInView/whileInView), bukan state manual.
Form submission (jika ada form early-access) menggunakan local state + submit handler sederhana, tanpa store global.


18. Image Assets & Illustration Guideline

Mockup dashboard: gunakan high-fidelity screenshot/render dari desain dashboard asli (bukan ilustrasi generik) agar kredibel — mengingat produk sudah punya desain dashboard yang dikembangkan terpisah.
Ilustrasi pendukung (jika dibutuhkan di section Problem/Cara Kerja): gaya line-art minimal dengan aksen gradient accent, konsisten dengan ikon.
Hindari stock photo generik (orang di kantor tersenyum ke laptop) — tidak sesuai estetika premium-tech yang ditargetkan.
Semua asset visual disiapkan dalam varian dark-optimized (tidak ada elemen putih solid besar yang menyilaukan di background gelap).


19. Future Extensibility
Dicatat sebagai catatan arsitektur untuk tahap berikutnya (di luar scope saat ini, tidak dikerjakan sekarang):

Struktur folder /components/landing dipisah dari /components/dashboard agar tidak bentrok saat pengembangan dashboard dimulai.
Token desain (/styles/globals.css) dirancang agar bisa direuse langsung oleh halaman dashboard, chat AI, dan fitur lain — menjaga konsistensi visual lintas produk.
Placeholder light mode token disiapkan strukturnya (belum diisi) untuk kemungkinan kebutuhan aksesibilitas di masa depan.
Section Pricing Preview dirancang agar mudah di-extend menjadi halaman /pricing penuh tanpa refactor besar.