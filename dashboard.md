PRD — The Supply Chain Oracle | Dashboard Frontend
Decision Intelligence Dashboard
Versi: 1.0 · Scope: Frontend Dashboard sahaja · Status: Draft untuk review

1. Executive Summary & Filosofi Dashboard
Dashboard ini bukan ruang pameran data — ia adalah ruang pengambilan keputusan. Setiap elemen di layar harus lolos satu uji sederhana: "Jika elemen ini dihapus, apakah manager kehilangan kemampuan mengambil keputusan?" Jika jawabannya tidak, elemen tersebut tidak layak ada di dashboard utama.
Lima pertanyaan yang harus terjawab dalam < 5 detik pertama:
PertanyaanDijawab olehApa yang sedang terjadi?Oracle Summary + Critical AlertMengapa hal itu terjadi?AI Recommendation (konteks disertakan)Apa dampaknya?Executive KPI + Financial ImpactApa rekomendasi AI?Oracle AI PanelApa tindakan berikutnya?Quick Actions + CTA pada tiap kartu
Prinsip desain non-negotiable: setiap chart harus punya business question yang dijawabnya, ditulis eksplisit di spesifikasi (lihat Section 6). Tidak ada chart dekoratif.

2. Target User & Kebutuhan Kognitif
PersonaWaktu yang tersedia saat buka dashboardKebutuhan utamaCEO / Business Owner10–15 detik, sekali sehariAngka besar: kesehatan bisnis, risiko finansialOperational/Supply Chain Manager5–10 menit, beberapa kali sehariDetail actionable: SKU mana, kapan reorderWarehouse/Plant ManagerSepanjang hari, referensi berkalaStatus stok real-time, alert operasionalUMKM OwnerSingkat, tidak teknisBahasa sederhana, rekomendasi langsung tanpa istilah teknis
Implikasi desain: dashboard perlu layered depth — layer teratas (Oracle Summary + Executive KPI) cukup untuk CEO, layer tengah (Forecast, Inventory Health) untuk Manager, layer detail (tabel, Supplier Performance) untuk operasional harian. Tidak semua user perlu scroll ke bawah — desain harus mengasumsikan sebagian besar user berhenti di layer pertama.

3. Struktur Dashboard (Reordered untuk Decision Flow)
Struktur berikut disusun ulang dari draft awal berdasarkan prinsip "alert dan uang dulu, detail kemudian" — manager perlu tahu apa yang butuh perhatian sebelum melihat angka rutin, dan perlu tahu dampak finansial sebelum tenggelam di data operasional.
Header (persistent)
   ↓
Critical Alert Bar          ← paling atas: hal yang butuh tindakan HARI INI
   ↓
Oracle AI Summary Panel     ← ringkasan naratif, bukan chatbot
   ↓
Executive KPI Row           ← angka besar, kesehatan bisnis sekilas
   ↓
AI Recommendation Cards     ← tindakan konkret yang disarankan
   ↓
Demand Forecast             ← proyeksi ke depan
   ↓
Inventory Health            ← kondisi stok saat ini
   ↓
Financial Impact            ← dampak Rupiah dari semua di atas
   ↓
Lead Time & Supplier Performance
   ↓
Warehouse Performance
   ↓
Trend Analytics (historis, opsional expand)
   ↓
Recent Activity & Quick Actions (sidebar kanan atau bottom panel)
Perubahan dari draft awal & alasan:

Critical Alert dipindah di atas Oracle Summary. Alasan: alert bersifat time-sensitive (ada tenggat), sementara Oracle Summary bersifat naratif/kontekstual. Manager perlu tahu "ada kebakaran" sebelum membaca "cerita hari ini".
Financial Impact dinaikkan (sebelumnya di urutan lebih bawah), ditempatkan tepat setelah Inventory Health — karena pertanyaan "apa dampaknya ke uang" biasanya muncul segera setelah melihat kondisi stok, bukan di akhir.
Supplier Performance digabung dekat Lead Time karena keduanya menjawab pertanyaan bisnis yang sama: "apakah pemasok bisa diandalkan untuk jadwal saya".


4. Layout & Grid System
Struktur utama: 2-zone layout desktop —

Primary Zone (kiri, ±70% lebar): konten scroll utama (Alert → KPI → Forecast → Inventory → dst.)
Persistent Zone (kanan, ±30% lebar, sticky): Oracle AI Panel versi ringkas + Quick Actions — selalu terlihat saat scroll, karena Oracle adalah anchor experience.

Alternatif untuk layar lebih kecil (laptop 13"–14"): Oracle Panel menjadi collapsible drawer dari kanan, dipicu tombol floating, bukan sticky penuh — mencegah konten utama terlalu sempit.
Grid: 12-column grid, gutter 24px, container max-width 1600px (dashboard butuh ruang lebih lebar dari landing page karena densitas data lebih tinggi).
Card sizing standar:

KPI Card: 1/4 lebar row (4 kartu per baris desktop)
Chart Card besar (Forecast, Inventory Health): 2/3 atau full-width
Chart Card sedang (Lead Time, Supplier): 1/2 lebar


5. Section Detail & Komponen
5.1 Header (Persistent)

Kiri: Logo + nama workspace/perusahaan aktif (untuk multi-tenant).
Tengah: Search global (cari SKU, supplier, transaksi).
Kanan: Date range selector (default: Hari Ini / 7 Hari / 30 Hari), notification bell, avatar/profile dropdown.
Height ringkas (~64px), tidak scroll bersama konten (sticky).

5.2 Critical Alert Bar

Tujuan bisnis: menjawab "apa yang harus saya lakukan HARI INI sebelum terlambat".
Tampilan: strip horizontal tipis di bawah header, warna latar mengikuti severity (danger/warning), bisa berisi lebih dari satu alert dalam carousel horizontal jika jumlahnya banyak.
Isi tiap alert: ikon severity + 1 kalimat ringkas + CTA kecil ("Lihat Detail" / "Reorder Sekarang").
Interaksi: dapat di-dismiss per alert (tidak permanen — muncul lagi jika kondisi masih berlaku esok hari), klik membuka detail di drawer, bukan pindah halaman (menjaga konteks).
Kondisi kosong: jika tidak ada alert kritis, bar ini hilang sepenuhnya (bukan menampilkan "Tidak ada alert" — ruang dikembalikan ke konten lain).

5.3 Oracle AI Summary Panel

Tujuan bisnis: menggantikan kebutuhan manager membaca seluruh dashboard secara manual — Oracle merangkumnya dalam bahasa naratif.
Format konten: 3–5 kalimat naratif per hari, contoh nada (bukan chatbot, bukan Q&A):

Insight risiko ("14 SKU berisiko stockout minggu ini")
Insight peluang ("Permintaan kategori X diproyeksikan naik")
Insight operasional ("Supplier A berpotensi terlambat")
Insight dampak finansial ("Estimasi penghematan jika reorder dilakukan sekarang")


Tampilan: kartu glass besar dengan aksen glow lembut, avatar/icon "Oracle" kecil di pojok (memberi identitas tanpa terasa seperti chatbot), teks disusun sebagai paragraf singkat atau bullet naratif — bukan tabel.
Interaksi: setiap kalimat insight bisa diklik untuk melompat/highlight ke section terkait di bawah (mis. klik insight stockout → scroll+highlight ke Inventory Health, kartu SKU terkait).
Update cadence: ditampilkan sebagai "Diperbarui [waktu]" kecil di pojok kartu — memberi rasa live tanpa mengklaim real-time streaming.

5.4 Executive KPI Row
Lihat detail tiap KPI di Section 6. Ditampilkan sebagai 4 kartu di baris pertama (KPI paling kritis untuk eksekutif): Business Health Score, Revenue Impact, Stockout Risk, Inventory Turnover — 4 lainnya (Cashflow, Service Level, dst.) di baris kedua yang bisa di-collapse/expand ("Lihat KPI lainnya").
5.5 AI Recommendation Cards

Tujuan bisnis: menjembatani insight (Oracle Summary) dengan tindakan konkret.
Format: kartu horizontal scroll (carousel) berisi 3-6 rekomendasi, tiap kartu: judul aksi ("Reorder SKU-2291"), justifikasi singkat ("Stok habis dalam 4 hari berdasarkan tren penjualan"), estimasi dampak ("Mencegah kerugian ±Rp 4,2jt"), dan CTA ("Setujui" / "Lihat Detail").
Beda dengan Alert: Alert bersifat reaktif/urgent, Recommendation bersifat proaktif/optimalisasi.

5.6 Demand Forecast

Tujuan bisnis: menjawab "berapa yang akan terjual, dan seberapa yakin kita".
Visualisasi: Area Chart dengan band confidence interval (area lebih terang untuk garis prediksi, area shaded lebih tipis untuk rentang ketidakpastian atas-bawah) — dipilih karena forecast selalu punya ketidakpastian, dan menyembunyikannya menyesatkan keputusan manager.
Interaksi: toggle horizon (7/30/90 hari), hover menampilkan tooltip dengan angka pasti + confidence %, filter per kategori/SKU di atas chart.
Elemen pendukung: badge kecil "Forecast Accuracy: 94%" di pojok kartu — transparansi model tanpa membahas cara kerja teknis.

5.7 Lead Time Prediction

Tujuan bisnis: "kapan barang benar-benar akan sampai, bukan kapan seharusnya sampai".
Visualisasi: kombinasi Gauge (rata-rata lead time vs target) + mini Timeline horizontal per supplier menampilkan estimasi vs historis keterlambatan.

5.8 Inventory Health

Tujuan bisnis: "SKU mana yang sehat, mana yang berisiko, mana yang mati".
Visualisasi: Treemap dipilih sebagai visual utama — ukuran blok merepresentasikan nilai inventory, warna merepresentasikan status kesehatan (hijau/kuning/merah). Treemap dipilih di atas bar chart panjang karena memungkinkan manager memindai ratusan SKU sekaligus dan langsung menangkap pola tanpa scroll.
Pendamping: tab/toggle untuk beralih ke tampilan tabel (untuk user yang butuh presisi angka per SKU, bukan hanya pola visual).
Interaksi: klik blok treemap membuka drawer detail SKU (stok saat ini, reorder point, safety stock, riwayat pergerakan).

5.9 Financial Impact

Tujuan bisnis: menerjemahkan seluruh kondisi operasional di atas menjadi bahasa yang dipahami CEO/Owner — Rupiah.
Visualisasi: Waterfall Chart — dipilih karena secara natural menunjukkan bagaimana nilai bergerak dari titik awal (mis. proyeksi profit) melalui faktor-faktor penambah/pengurang (biaya overstock, potensi kerugian stockout, penghematan dari rekomendasi AI) ke titik akhir. Ini menjawab "dari mana asalnya angka ini" secara visual, bukan hanya menampilkan angka akhir.

5.10 Supplier Performance

Tujuan bisnis: "supplier mana yang bisa diandalkan".
Visualisasi: Radar Chart per supplier (dimensi: ketepatan waktu, kualitas, konsistensi harga, responsivitas) untuk perbandingan multi-dimensi cepat — cocok karena membandingkan beberapa supplier pada beberapa kriteria sekaligus, bukan satu angka linear.
Pendamping: ranking list sederhana di sampingnya (skor reliability terurut) untuk user yang ingin jawaban cepat tanpa membaca radar.

5.11 Warehouse Performance

Tujuan bisnis: efisiensi operasional gudang (fulfillment rate, waktu proses).
Visualisasi: kombinasi Progress Ring (order fulfillment rate) + Bar Chart kecil (perbandingan performa antar gudang/lokasi jika multi-lokasi).

5.12 Trend Analytics

Tujuan bisnis: konteks historis — "apakah ini pola baru atau musiman".
Visualisasi: Line Chart multi-series dengan overlay pola musiman (dashed line untuk pola tahun lalu sebagai pembanding) — section ini defaultnya collapsed/di bagian bawah karena sifatnya eksploratif, bukan actionable harian.

5.13 Recent Activity & Quick Actions

Recent Activity: feed vertikal ringkas (transaksi terbaru, perubahan stok signifikan, aksi user lain jika multi-user) — gaya seperti activity log, teks kecil, timestamp relatif ("2 jam lalu").
Quick Actions: shortcut ke aksi umum (Buat Purchase Order, Tambah Transaksi Manual, Export Laporan) — ditempatkan di zona persistent kanan agar selalu dapat diakses tanpa scroll.


6. KPI Specification
Setiap KPI dijelaskan dengan format: Mengapa penting → Tampilan → Interaksi.
KPIMengapa PentingTampilanInteraksiBusiness Health ScoreSatu angka gabungan (0-100) agar CEO tak perlu membaca semua KPI lain untuk tahu "apakah bisnis baik-baik saja"Gauge/skor besar dengan label kualitatif ("Sehat", "Perlu Perhatian") — angka mentah tanpa label kualitatif bisa disalahartikanKlik membuka breakdown komponen skorRevenue ImpactMenghubungkan keputusan stok dengan pendapatan aktual/potensialKPI Card dengan angka besar + trend arrow (↑/↓) vs periode sebelumnyaHover menampilkan perbandingan periodeStockout RiskRisiko kehabisan stok = kehilangan penjualan langsungKPI Card dengan indikator warna severity + jumlah SKU terdampakKlik → filter Inventory Health ke SKU berisikoOverstock RiskModal terkunci di stok berlebih = cashflow tertahanKPI Card serupa Stockout Risk, warna warning bukan danger (kurang urgent)Sama seperti di atasForecast AccuracyKredibilitas rekomendasi AI bergantung pada ini — transparansi modelBadge persentase kecil, ditempel di kartu Forecast (bukan KPI besar berdiri sendiri)Tooltip menjelaskan periode pengukuranLead Time Prediction / Average Lead TimeDasar perhitungan kapan harus reorderKPI Card angka (hari) + perbandingan vs lead time kontrak/SLA-Purchase CostKontrol biaya pembelianKPI Card dengan breakdown mini (per kategori) saat hover-Inventory TurnoverEfisiensi modal kerja — seberapa cepat stok "berputar" jadi penjualanKPI Card dengan angka rasio + benchmark industri kecil sebagai konteks-CashflowKesehatan likuiditas jangka pendekMini area chart trend dalam KPI card (bukan hanya angka statis)Klik → detail Financial ImpactSupplier ReliabilityRisiko rantai pasok dari sisi eksternalKPI Card dengan skor + ringkasan link ke Supplier Performance-Service LevelSeberapa baik memenuhi permintaan pelanggan tanpa stockoutProgress ring dengan target line-Order FulfillmentEfisiensi operasional gudangProgress ring, ditempel di section Warehouse Performance-Inventory Health ScoreSkor gabungan kondisi stok (kombinasi turnover, stockout risk, overstock risk)Ditampilkan sebagai warna dominan pada Treemap, bukan angka terpisahKlik legend untuk filter by statusAI ConfidenceTransparansi — seberapa yakin AI terhadap rekomendasi yang diberikanBadge kecil di setiap AI Recommendation Card (bukan KPI global)Tooltip menjelaskan faktor confidenceROI (dari penggunaan Oracle)Membuktikan nilai produk ke Owner/CEO — penting untuk retensiDitampilkan sebagai bagian dari Financial Impact waterfall, bukan KPI card terpisah-
Catatan desain penting: tidak semua 18 KPI di brief ditampilkan sebagai kartu besar berdiri sendiri — sebagian (Forecast Accuracy, AI Confidence, ROI) lebih efektif sebagai elemen kontekstual menempel pada section terkait, karena berdiri sendiri akan membuat Executive KPI Row terlalu padat dan kehilangan fokus. Ini keputusan UX untuk menjaga scannability.

7. Visualization Selection Rationale (Ringkasan)
DataChart DipilihAlasan UtamaForecast permintaanArea chart + confidence bandMenampilkan ketidakpastian, bukan angka palsu pastiInventory ratusan SKUTreemapScan cepat pola, proporsional terhadap nilaiFinancial breakdownWaterfallMenjelaskan "dari mana" angka akhir berasalSupplier multi-kriteriaRadarBandingkan banyak dimensi sekaligusLead time vs targetGaugeJawaban cepat: on-target atau tidakFulfillment rateProgress ringRepresentasi persentase yang intuitifHistoris + musimanLine chart multi-seriesPerbandingan pola dari waktu ke waktuAktivitas terbaruTimeline/feedKronologis, bukan analitis
Chart yang sengaja tidak dipakai: Scatter Plot dan Bubble Chart (terlalu eksploratif/statistikal untuk decision-making cepat manager — lebih cocok untuk analis, bukan dashboard eksekutif), Network Diagram (kompleksitas visual tinggi, hanya relevan jika ada fitur pemetaan rantai pasok multi-tier yang di luar scope dashboard utama saat ini).

8. Component Specification
KomponenSpesifikasi KunciNavbar/HeaderSticky, height 64px, search global, notification bell dengan badge count, avatar dropdownSidebarCollapsible (icon-only ↔ expanded), navigasi antar modul (Dashboard, Forecast, Inventory, dst — modul lain di luar scope dokumen ini), active state dengan indikator accent bar kiriCardGlass style konsisten dengan landing page (#0E1728/#132238, border rgba(255,255,255,0.08)), padding 24px, rounded-2xlChart ContainerHeader kartu wajib berisi: judul, subtitle konteks singkat, kontrol (filter/toggle), badge info (mis. accuracy) — konsisten di semua chart cardAlert3 severity level (info/warning/danger), warna sesuai token, dismissible, dengan CTA opsionalButtonSama seperti landing page (primary/secondary/tertiary) + tambahan varian Icon Button untuk aksi dalam tabel/kartuInput & DropdownStyle gelap konsisten, focus state accent border, dropdown dengan search-filter untuk list panjang (mis. pilih SKU)Date PickerPreset cepat (Hari Ini/7 Hari/30 Hari/Custom) sebagai default view, kalender custom hanya muncul saat "Custom" dipilih — mengurangi friksi untuk kasus penggunaan mayoritasSearchGlobal search di header (cross-entity: SKU, supplier, PO) dengan hasil dikelompokkan per kategoriNotificationDropdown panel dari bell icon, dikelompokkan (Critical/Info), link ke Alert terkaitModalUntuk aksi yang butuh fokus penuh & konfirmasi (mis. approve reorder besar)DrawerUntuk detail tanpa kehilangan konteks halaman (mis. detail SKU dari Treemap) — preferensi utama dibanding modal untuk eksplorasi dataFloating Oracle AI PanelVersi ringkas Oracle Summary yang tetap terlihat/collapsible saat scroll — lihat Section 4

9. Micro-interaction Guideline
InteraksiPenerapanAnimated NumberSemua KPI angka besar melakukan count-up animation (300-500ms) saat pertama dimuat/data berubah — memberi kesan "hidup", bukan statisLoading SkeletonSetiap chart card menampilkan shimmer skeleton mengikuti bentuk kasar chart-nya (bukan skeleton generik kotak) selama data dimuatHover pada ChartTooltip kontekstual dengan angka presisi + label bisnis (bukan hanya angka mentah)Card ElevationHover pada kartu interaktif (AI Recommendation, SKU di Treemap) → translateY halus + border glow accentGradient/Glow AnimationTerbatas pada Oracle AI Panel saja (identitas visual khusus) — bukan diterapkan ke semua kartu, agar tidak mendevaluasi fokus visualSmooth Transition antar Date RangeChart bertransisi (bukan reload instan) saat filter tanggal berubah, dengan durasi 250-300msEmpty StateIlustrasi minimal + copy actionable (mis. "Belum ada data penjualan pada rentang ini — coba perluas rentang tanggal") bukan hanya "No data"Error StatePesan jelas + tombol retry, tidak menyalahkan user, nada tenang ("Gagal memuat data. Coba lagi")

10. UX Writing Guideline (Dashboard-specific)

Nada: bahasa manager berpengalaman, bukan laporan sistem teknis.
Contoh perbandingan:

HindariGunakan"Sistem mendeteksi anomali stok""3 SKU bergerak di luar pola normal""Model AI memprediksi peningkatan permintaan""Permintaan diproyeksikan naik 18% minggu depan""Data tidak tersedia""Belum ada cukup data untuk periode ini""Error 404" (jika muncul di konteks user)"Data tidak ditemukan — coba muat ulang"

Semua label KPI menggunakan istilah bisnis standar Indonesia yang familiar bagi manager operasional (bukan terjemahan literal istilah teknis Inggris).


11. Responsive Guideline
BreakpointPerilakuDesktop (>1440px)Layout penuh 2-zone (primary + persistent Oracle panel), grid KPI 4 kolomLaptop (1024–1440px)Oracle panel menjadi collapsible drawer (lihat Section 4), grid KPI tetap 4 kolom tapi lebih padatTablet (768–1024px)Single column, KPI grid jadi 2 kolom, chart besar tetap full-width, sidebar default collapsed (icon-only)Mobile (<768px)Bukan prioritas utama (dashboard desktop-first sesuai brief), namun tetap harus dapat diakses fungsional: single column penuh, Oracle Summary jadi kartu teratas (bukan drawer), navigasi sidebar jadi bottom sheet, chart kompleks (Treemap, Radar) disederhanakan jadi list/summary alternatif karena chart tersebut sulit dibaca di layar sempit
Catatan strategi mobile: untuk Treemap dan Radar Chart di layar mobile, sediakan tampilan alternatif berbasis list/ranking (bukan memaksakan chart yang sama diperkecil) — chart kompleks yang diperkecil paksa justru merusak kegunaannya.

12. Accessibility Guideline

Kontras teks minimum WCAG AA, terutama diverifikasi untuk teks di atas kartu semi-transparan (glassmorphism berisiko menurunkan kontras efektif).
Seluruh chart menyediakan mode color-blind friendly: gunakan kombinasi warna + pattern/ikon (bukan warna semata) untuk membedakan status severity (mis. ikon segitiga untuk warning, bukan hanya warna kuning).
Navigasi penuh via keyboard: tab order logis mengikuti hierarki informasi (Alert → Oracle → KPI → ...), focus state terlihat jelas pada semua elemen interaktif termasuk titik data chart yang bisa difokus.
ARIA labels pada semua chart (deskripsi ringkas data untuk screen reader, mis. "Grafik forecast permintaan, tren naik 18%").
Loading/Empty/Error state selalu punya representasi teks yang dapat dibaca screen reader, bukan hanya visual skeleton/ilustrasi.


13. Frontend Architecture
13.1 Component Hierarchy
<DashboardLayout>
 ├── <Header />
 ├── <Sidebar />
 ├── <MainContent>
 │     ├── <CriticalAlertBar />
 │     ├── <OracleSummaryPanel />
 │     ├── <ExecutiveKPIRow>
 │     │     └── <KPICard /> (xN)
 │     ├── <AIRecommendationCarousel>
 │     │     └── <RecommendationCard /> (xN)
 │     ├── <DemandForecastSection />
 │     ├── <LeadTimeSection />
 │     ├── <InventoryHealthSection>
 │     │     ├── <InventoryTreemap />
 │     │     └── <InventoryTable /> (toggle view)
 │     ├── <FinancialImpactSection>
 │     │     └── <WaterfallChart />
 │     ├── <SupplierPerformanceSection>
 │     │     ├── <SupplierRadarChart />
 │     │     └── <SupplierRankingList />
 │     ├── <WarehousePerformanceSection />
 │     └── <TrendAnalyticsSection /> (collapsed default)
 ├── <PersistentPanel> (sticky/drawer)
 │     ├── <OracleFloatingPanel />
 │     ├── <RecentActivityFeed />
 │     └── <QuickActionsPanel />
 ├── <NotificationDropdown />
 ├── <SearchOverlay />
 └── <DetailDrawer /> (shared, dipicu dari berbagai section)
13.2 Folder Structure
/app
  /(dashboard)
    page.tsx
/components
  /dashboard
    Header.tsx
    Sidebar.tsx
    CriticalAlertBar.tsx
    OracleSummaryPanel.tsx
    OracleFloatingPanel.tsx
    ExecutiveKPIRow.tsx
    KPICard.tsx
    AIRecommendationCarousel.tsx
    RecommendationCard.tsx
    DemandForecastSection.tsx
    LeadTimeSection.tsx
    InventoryHealthSection.tsx
    InventoryTreemap.tsx
    InventoryTable.tsx
    FinancialImpactSection.tsx
    WaterfallChart.tsx
    SupplierPerformanceSection.tsx
    SupplierRadarChart.tsx
    WarehousePerformanceSection.tsx
    TrendAnalyticsSection.tsx
    RecentActivityFeed.tsx
    QuickActionsPanel.tsx
    DetailDrawer.tsx
  /charts
    (wrapper komponen chart generik: AreaChart, Treemap, Waterfall, Radar, Gauge, ProgressRing — reusable lintas section)
  /ui
    (shadcn primitives: card, badge, dropdown, dialog, tooltip, skeleton)
/lib
  chart-theme.ts    (mapping token warna ke konfigurasi chart library)
  animations.ts
  constants.ts      (label KPI, copy UX terpusat)
/styles
  globals.css
13.3 State Management

Global state (Zustand) dibutuhkan di sini (berbeda dari landing page) untuk: filter tanggal aktif (dipakai lintas banyak section), status sidebar (collapsed/expanded), state drawer aktif (SKU/supplier mana yang sedang dilihat detail).
Server state (data KPI, forecast, dll — sumber data di luar scope dokumen ini) idealnya dikelola terpisah dari UI state (mis. via query-cache pattern) agar chart tidak re-render berlebihan saat filter UI berubah tapi data belum perlu di-refetch.
Local state: hover/tooltip chart, expand/collapse per section individual (Trend Analytics default collapsed).

13.4 Theme Management

Token warna terpusat di chart-theme.ts, memastikan semua library chart (Recharts dkk.) menggunakan palet yang identik dengan token desain sistem (#4F7CFF, #2CE6B8, dst.) — mencegah drift warna antara UI dan chart.
Dashboard dark-first, konsisten dengan landing page (lihat PRD Landing Page Section 8.5).

13.5 Animation Guideline

Library: Framer Motion, konsisten dengan landing page.
Section-level: fade-up sekali saat pertama render (tidak berulang saat scroll biasa, dashboard bukan halaman marketing).
Data-level: animated number, chart transition — lihat Section 9.
Prioritas performa > dekorasi: dashboard dimuat berkali-kali sehari oleh user yang sama, animasi berlebihan yang terasa lambat setelah pemakaian ke-10 kali akan mengurangi kepuasan, bukan menambah.


14. Future Extensibility

Struktur /components/dashboard terpisah dari /components/landing, dengan /components/charts sebagai layer reusable bersama — memudahkan modul lain (Chat AI, Inventory detail page, dll — di luar scope dokumen ini) memakai chart yang sama tanpa duplikasi.
Drawer/Modal pattern dirancang generik (<DetailDrawer />) agar bisa dipakai ulang saat modul lain (mis. halaman Inventory penuh) dikembangkan.
Mobile experience saat ini "cukup fungsional" — jika ke depan mobile menjadi prioritas (mis. untuk Warehouse Manager yang mobile-first di lapangan), perlu PRD terpisah khusus mobile dashboard, bukan sekadar reflow dari desktop.