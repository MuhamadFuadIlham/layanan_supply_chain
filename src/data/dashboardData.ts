// ─────────────────────────────────────────────────────────────────────────────
// SUPPLY CHAIN ORACLE — Dashboard Mock Data
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ──────────────────────────────────────────────────────────────────

export interface CriticalAlert {
  id: string;
  severity: 'danger' | 'warning' | 'info';
  message: string;
  cta: string;
  section: string;
}

export interface OracleInsight {
  id: string;
  type: 'risk' | 'opportunity' | 'operational' | 'financial';
  text: string;
  section: string;
  icon: string;
}

export interface KPIData {
  id: string;
  label: string;
  value: number;
  unit: string;
  trend: number; // percent change
  trendDir: 'up' | 'down' | 'flat';
  trendGood: boolean; // is up trend good?
  severity?: 'safe' | 'warning' | 'danger';
  benchmark?: string;
  subtitle?: string;
  color: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  justification: string;
  impact: string;
  confidence: number; // 0-1
  urgency: 'high' | 'medium' | 'low';
  category: string;
}

export interface ForecastPoint {
  date: string;
  actual?: number;
  forecast: number;
  upper: number;
  lower: number;
}

export interface TreemapItem {
  id: string;
  name: string;
  sku: string;
  value: number; // inventory value in IDR
  stock: number;
  status: 'safe' | 'warning' | 'danger' | 'overstock' | 'dead';
  category: string;
  reorderPoint: number;
  daysToStockout?: number;
  safetyStock?: number;
  dailyDemand?: number;
  movementData?: number[];
}

export interface WaterfallItem {
  name: string;
  value: number;
  type: 'start' | 'positive' | 'negative' | 'end';
  color?: string;
}

export interface SupplierRadarData {
  supplier: string;
  ketepatan: number;
  kualitas: number;
  harga: number;
  responsivitas: number;
  konsistensi: number;
  score: number;
}

export interface WarehouseData {
  name: string;
  fulfillment: number;
  processTime: number; // hours
  accuracy: number;
  capacity: number;
}

export interface TrendPoint {
  month: string;
  tahunIni: number;
  tahunLalu: number;
  forecast?: number;
}

export interface ActivityItem {
  id: string;
  type: 'reorder' | 'alert' | 'delivery' | 'adjustment' | 'system';
  message: string;
  sku?: string;
  timestamp: Date;
  user?: string;
}

// ── Critical Alerts ────────────────────────────────────────────────────────

export const criticalAlerts: CriticalAlert[] = [
  {
    id: 'a1',
    severity: 'danger',
    message: '7 SKU akan habis stok dalam 72 jam — segera lakukan reorder sebelum kehilangan Rp 18,4jt',
    cta: 'Reorder Sekarang',
    section: 'inventory',
  },
  {
    id: 'a2',
    severity: 'danger',
    message: 'Supplier PT Maju Jaya berpotensi terlambat 5–8 hari — 14 PO aktif terdampak',
    cta: 'Lihat Detail',
    section: 'supplier',
  },
  {
    id: 'a3',
    severity: 'warning',
    message: '23 SKU kategori Elektronik mendekati batas minimum stok — review forecast minggu ini',
    cta: 'Lihat Forecast',
    section: 'forecast',
  },
];

// ── Oracle AI Insights ─────────────────────────────────────────────────────

export const oracleInsights: OracleInsight[] = [
  {
    id: 'o1',
    type: 'risk',
    icon: '⚠️',
    text: '14 SKU berisiko stockout minggu ini berdasarkan tren penjualan 30 hari terakhir — kategori Elektronik paling rentan.',
    section: 'inventory',
  },
  {
    id: 'o2',
    type: 'opportunity',
    icon: '📈',
    text: 'Permintaan kategori Peralatan Rumah diproyeksikan naik 23% dalam 14 hari ke depan — pertimbangkan safety stock tambahan.',
    section: 'forecast',
  },
  {
    id: 'o3',
    type: 'operational',
    icon: '🚚',
    text: 'PT Maju Jaya (Supplier Tier-1) menunjukkan pola keterlambatan berulang 3 minggu terakhir — rekomendasikan evaluasi kontrak.',
    section: 'supplier',
  },
  {
    id: 'o4',
    type: 'financial',
    icon: '💰',
    text: 'Estimasi penghematan Rp 8,2jt jika 7 reorder dilakukan hari ini vs menunggu 3 hari lagi — window optimal akan menutup Jumat.',
    section: 'financial',
  },
];

// ── Executive KPI Data ─────────────────────────────────────────────────────

export const kpiData: KPIData[] = [
  {
    id: 'health',
    label: 'Business Health Score',
    value: 74,
    unit: '/100',
    trend: -3,
    trendDir: 'down',
    trendGood: false,
    severity: 'warning',
    subtitle: 'Perlu Perhatian',
    color: '#f59e0b',
  },
  {
    id: 'revenue',
    label: 'Revenue Impact',
    value: 284500000,
    unit: 'IDR',
    trend: 12.4,
    trendDir: 'up',
    trendGood: true,
    severity: 'safe',
    subtitle: 'vs. bulan lalu',
    color: '#10b981',
  },
  {
    id: 'stockout',
    label: 'Risiko Stockout',
    value: 14,
    unit: ' SKU',
    trend: 40,
    trendDir: 'up',
    trendGood: false,
    severity: 'danger',
    subtitle: 'butuh tindakan segera',
    color: '#ef4444',
  },
  {
    id: 'turnover',
    label: 'Inventory Turnover',
    value: 8.3,
    unit: 'x/thn',
    trend: 5.1,
    trendDir: 'up',
    trendGood: true,
    severity: 'safe',
    benchmark: 'Benchmark Industri: 7.5x',
    subtitle: 'Di atas rata-rata industri',
    color: '#6366f1',
  },
  // Secondary KPIs
  {
    id: 'cashflow',
    label: 'Cashflow Operasional',
    value: 142000000,
    unit: 'IDR',
    trend: -8.2,
    trendDir: 'down',
    trendGood: false,
    severity: 'warning',
    subtitle: 'vs. 30 hari lalu',
    color: '#f59e0b',
  },
  {
    id: 'service',
    label: 'Service Level',
    value: 94.7,
    unit: '%',
    trend: 1.2,
    trendDir: 'up',
    trendGood: true,
    severity: 'safe',
    benchmark: 'Target: 95%',
    subtitle: 'Mendekati target',
    color: '#22d3ee',
  },
  {
    id: 'reliability',
    label: 'Supplier Reliability',
    value: 81,
    unit: '/100',
    trend: -4,
    trendDir: 'down',
    trendGood: false,
    severity: 'warning',
    subtitle: 'Turun dari bulan lalu',
    color: '#a855f7',
  },
  {
    id: 'fulfillment',
    label: 'Order Fulfillment',
    value: 97.2,
    unit: '%',
    trend: 0.3,
    trendDir: 'up',
    trendGood: true,
    severity: 'safe',
    subtitle: 'Excellent',
    color: '#10b981',
  },
];

// ── AI Recommendations ─────────────────────────────────────────────────────

export const aiRecommendations: AIRecommendation[] = [
  {
    id: 'r1',
    title: 'Reorder SKU-2291 (Kabel HDMI 2m)',
    justification: 'Stok akan habis dalam 4 hari berdasarkan tren penjualan. ROP sudah terlewati 2 hari lalu.',
    impact: 'Mencegah kerugian penjualan ±Rp 4,2jt',
    confidence: 0.97,
    urgency: 'high',
    category: 'Reorder',
  },
  {
    id: 'r2',
    title: 'Naikkan Safety Stock Kategori Elektronik',
    justification: 'Permintaan diproyeksikan naik 23% minggu depan — safety stock saat ini tidak mencukupi.',
    impact: 'Mengurangi risiko stockout Rp 12,8jt',
    confidence: 0.88,
    urgency: 'medium',
    category: 'Planning',
  },
  {
    id: 'r3',
    title: 'Evaluasi Kontrak PT Maju Jaya',
    justification: 'Keterlambatan rata-rata 6,3 hari vs kontrak 2 hari — 3 insiden berturut-turut dalam 3 minggu.',
    impact: 'Hemat biaya penalty & expediting ~Rp 7,5jt/bulan',
    confidence: 0.91,
    urgency: 'medium',
    category: 'Supplier',
  },
  {
    id: 'r4',
    title: 'Liquidasi Stok Mati SKU-1183',
    justification: '180 hari tanpa pergerakan. Modal Rp 6,2jt terkunci, risiko kadaluarsa meningkat.',
    impact: 'Melepas modal Rp 6,2jt untuk produk aktif',
    confidence: 0.94,
    urgency: 'low',
    category: 'Inventory',
  },
  {
    id: 'r5',
    title: 'Bundling Pembelian Supplier CV Pratama',
    justification: 'Threshold diskon volume CV Pratama tercapai jika 3 PO digabung — penghematan 8% per unit.',
    impact: 'Hemat ±Rp 3,1jt dari diskon volume',
    confidence: 0.85,
    urgency: 'low',
    category: 'Cost Saving',
  },
];

// ── Demand Forecast ────────────────────────────────────────────────────────

function genForecast(days: number): ForecastPoint[] {
  const data: ForecastPoint[] = [];
  const today = new Date();
  let base = 1200;
  for (let i = -14; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const label = d.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' });
    const noise = (Math.random() - 0.5) * 200;
    const trend = i * 8;
    const seasonal = Math.sin((i / 7) * Math.PI) * 150;
    const val = Math.round(Math.max(500, base + trend + seasonal + noise));
    const conf = Math.round(val * 0.15);
    if (i <= 0) {
      data.push({ date: label, actual: val, forecast: val, upper: val + conf, lower: val - conf });
    } else {
      data.push({ date: label, forecast: val, upper: val + conf * (1 + i * 0.02), lower: Math.max(0, val - conf * (1 + i * 0.02)) });
    }
  }
  return data;
}

export const forecastData7 = genForecast(7);
export const forecastData30 = genForecast(30);
export const forecastData90 = genForecast(90);

// ── Inventory Treemap ─────────────────────────────────────────────────────

export const inventoryTreemap: TreemapItem[] = [
  { id: 't1', sku: 'SK-001', name: 'Kabel HDMI 2m', value: 45000000, stock: 320, status: 'safe', category: 'Elektronik', reorderPoint: 150, safetyStock: 80, dailyDemand: 12, movementData: Array.from({length: 30}, () => Math.floor(Math.random() * 50) + 10) },
  { id: 't2', sku: 'SK-002', name: 'Power Bank 20000mAh', value: 82000000, stock: 45, status: 'danger', category: 'Elektronik', reorderPoint: 80, daysToStockout: 3, safetyStock: 30, dailyDemand: 15, movementData: Array.from({length: 30}, () => Math.floor(Math.random() * 40) + 5) },
  { id: 't3', sku: 'SK-003', name: 'Mouse Wireless', value: 31500000, stock: 210, status: 'safe', category: 'Komputer', reorderPoint: 100, safetyStock: 50, dailyDemand: 8, movementData: Array.from({length: 30}, () => Math.floor(Math.random() * 30) + 15) },
  { id: 't4', sku: 'SK-004', name: 'Keyboard Mechanical', value: 67200000, stock: 88, status: 'warning', category: 'Komputer', reorderPoint: 100, daysToStockout: 12, safetyStock: 40, dailyDemand: 6, movementData: Array.from({length: 30}, () => Math.floor(Math.random() * 20) + 5) },
  { id: 't5', sku: 'SK-005', name: 'Monitor LED 24"', value: 124000000, stock: 35, status: 'danger', category: 'Elektronik', reorderPoint: 50, daysToStockout: 5, safetyStock: 20, dailyDemand: 4, movementData: Array.from({length: 30}, () => Math.floor(Math.random() * 10) + 2) },
  { id: 't6', sku: 'SK-006', name: 'Headphone BT', value: 28800000, stock: 160, status: 'safe', category: 'Audio', reorderPoint: 60, safetyStock: 30, dailyDemand: 7, movementData: Array.from({length: 30}, () => Math.floor(Math.random() * 25) + 10) },
  { id: 't7', sku: 'SK-007', name: 'Flash Disk 128GB', value: 18500000, stock: 450, status: 'overstock', category: 'Storage', reorderPoint: 100, safetyStock: 40, dailyDemand: 15, movementData: Array.from({length: 30}, () => Math.floor(Math.random() * 60) + 20) },
  { id: 't8', sku: 'SK-008', name: 'Kabel Type-C', value: 12000000, stock: 680, status: 'overstock', category: 'Aksesori', reorderPoint: 200, safetyStock: 100, dailyDemand: 25, movementData: Array.from({length: 30}, () => Math.floor(Math.random() * 80) + 30) },
  { id: 't9', sku: 'SK-009', name: 'SSD 512GB', value: 95000000, stock: 62, status: 'warning', category: 'Storage', reorderPoint: 70, daysToStockout: 18, safetyStock: 30, dailyDemand: 5, movementData: Array.from({length: 30}, () => Math.floor(Math.random() * 15) + 3) },
  { id: 't10', sku: 'SK-010', name: 'Router WiFi 6', value: 56000000, stock: 28, status: 'danger', category: 'Jaringan', reorderPoint: 40, daysToStockout: 6, safetyStock: 20, dailyDemand: 4, movementData: Array.from({length: 30}, () => Math.floor(Math.random() * 12) + 2) },
  { id: 't11', sku: 'SK-011', name: 'Webcam HD 1080p', value: 22400000, stock: 95, status: 'safe', category: 'Komputer', reorderPoint: 50, safetyStock: 20, dailyDemand: 6, movementData: Array.from({length: 30}, () => Math.floor(Math.random() * 20) + 5) },
  { id: 't12', sku: 'SK-012', name: 'Speaker Portable', value: 38000000, stock: 130, status: 'safe', category: 'Audio', reorderPoint: 60, safetyStock: 25, dailyDemand: 8, movementData: Array.from({length: 30}, () => Math.floor(Math.random() * 25) + 8) },
  { id: 't13', sku: 'SK-013', name: 'Charger Fast 65W', value: 15600000, stock: 10, status: 'danger', category: 'Aksesori', reorderPoint: 80, daysToStockout: 2, safetyStock: 30, dailyDemand: 12, movementData: Array.from({length: 30}, () => Math.floor(Math.random() * 30) + 5) },
  { id: 't14', sku: 'SK-014', name: 'HDD Eksternal 1TB', value: 44000000, stock: 55, status: 'warning', category: 'Storage', reorderPoint: 60, daysToStockout: 21, safetyStock: 25, dailyDemand: 4, movementData: Array.from({length: 30}, () => Math.floor(Math.random() * 15) + 2) },
  { id: 't15', sku: 'SK-015', name: 'Stand Laptop Adjustable', value: 9800000, stock: 0, status: 'dead', category: 'Aksesori', reorderPoint: 30, daysToStockout: 0, safetyStock: 15, dailyDemand: 0, movementData: Array.from({length: 30}, () => 0) },
  { id: 't16', sku: 'SK-016', name: 'Hub USB 7-Port', value: 24500000, stock: 190, status: 'overstock', category: 'Aksesori', reorderPoint: 80, safetyStock: 35, dailyDemand: 10, movementData: Array.from({length: 30}, () => Math.floor(Math.random() * 35) + 10) },
  { id: 't17', sku: 'SK-017', name: 'Printer Inkjet', value: 68000000, stock: 18, status: 'danger', category: 'Printer', reorderPoint: 25, daysToStockout: 7, safetyStock: 10, dailyDemand: 2, movementData: Array.from({length: 30}, () => Math.floor(Math.random() * 8) + 1) },
  { id: 't18', sku: 'SK-018', name: 'Toner Cartridge', value: 31200000, stock: 240, status: 'safe', category: 'Printer', reorderPoint: 80, safetyStock: 40, dailyDemand: 14, movementData: Array.from({length: 30}, () => Math.floor(Math.random() * 40) + 12) },
];

// ── Financial Impact Waterfall ─────────────────────────────────────────────

export const waterfallData: WaterfallItem[] = [
  { name: 'Proyeksi Profit\nAwal Bulan', value: 142000000, type: 'start', color: '#6366f1' },
  { name: 'Pendapatan\nPenjualan', value: 87500000, type: 'positive', color: '#10b981' },
  { name: 'Penghematan\nRekomendasi AI', value: 18200000, type: 'positive', color: '#22d3ee' },
  { name: 'Kerugian\nStockout', value: -24800000, type: 'negative', color: '#ef4444' },
  { name: 'Biaya Modal\nOverstock', value: -11300000, type: 'negative', color: '#f59e0b' },
  { name: 'Biaya Logistik\n& Gudang', value: -9400000, type: 'negative', color: '#f97316' },
  { name: 'Proyeksi Profit\nAkhir Periode', value: 202200000, type: 'end', color: '#10b981' },
];

// ── Lead Time ─────────────────────────────────────────────────────────────

export interface LeadTimeSupplier {
  name: string;
  actual: number;
  target: number;
  variance: number;
}

export const leadTimeGauge = { current: 8.3, target: 7.0, max: 15 };
export const leadTimeSuppliers: LeadTimeSupplier[] = [
  { name: 'PT Maju Jaya', actual: 11.2, target: 5, variance: 6.2 },
  { name: 'CV Pratama', actual: 6.8, target: 7, variance: -0.2 },
  { name: 'PT Indo Tech', actual: 7.5, target: 8, variance: -0.5 },
  { name: 'UD Berkah', actual: 9.1, target: 6, variance: 3.1 },
  { name: 'PT Sinar Mas', actual: 5.2, target: 6, variance: -0.8 },
];

// ── Supplier Performance Radar ─────────────────────────────────────────────

export const supplierRadarData: SupplierRadarData[] = [
  { supplier: 'PT Maju Jaya', ketepatan: 45, kualitas: 88, harga: 92, responsivitas: 60, konsistensi: 50, score: 67 },
  { supplier: 'CV Pratama', ketepatan: 90, kualitas: 82, harga: 75, responsivitas: 88, konsistensi: 87, score: 84 },
  { supplier: 'PT Indo Tech', ketepatan: 78, kualitas: 91, harga: 68, responsivitas: 80, konsistensi: 79, score: 79 },
  { supplier: 'UD Berkah', ketepatan: 65, kualitas: 74, harga: 95, responsivitas: 70, konsistensi: 62, score: 73 },
  { supplier: 'PT Sinar Mas', ketepatan: 95, kualitas: 88, harga: 72, responsivitas: 92, konsistensi: 94, score: 88 },
];

export const radarMetrics = ['ketepatan', 'kualitas', 'harga', 'responsivitas', 'konsistensi'];

// ── Warehouse Performance ──────────────────────────────────────────────────

export const warehouseData: WarehouseData[] = [
  { name: 'Gudang Jakarta Pusat', fulfillment: 97.2, processTime: 2.1, accuracy: 99.1, capacity: 78 },
  { name: 'Gudang Bekasi Timur', fulfillment: 94.8, processTime: 3.4, accuracy: 97.6, capacity: 91 },
  { name: 'Gudang Tangerang', fulfillment: 91.3, processTime: 2.8, accuracy: 98.2, capacity: 65 },
  { name: 'Gudang Depok', fulfillment: 88.7, processTime: 4.2, accuracy: 96.8, capacity: 84 },
];

// ── Trend Analytics ────────────────────────────────────────────────────────

export const trendData: TrendPoint[] = [
  { month: 'Jan', tahunIni: 1820000, tahunLalu: 1540000 },
  { month: 'Feb', tahunIni: 1650000, tahunLalu: 1420000 },
  { month: 'Mar', tahunIni: 2100000, tahunLalu: 1780000 },
  { month: 'Apr', tahunIni: 1980000, tahunLalu: 1850000 },
  { month: 'Mei', tahunIni: 2340000, tahunLalu: 1920000 },
  { month: 'Jun', tahunIni: 2180000, tahunLalu: 2050000 },
  { month: 'Jul', tahunIni: 2560000, tahunLalu: 2100000, forecast: 2700000 },
  { month: 'Agu', forecast: 2850000, tahunLalu: 2280000, tahunIni: 0 },
  { month: 'Sep', forecast: 3100000, tahunLalu: 2410000, tahunIni: 0 },
];

// ── Recent Activity ────────────────────────────────────────────────────────

export const recentActivity: ActivityItem[] = [
  { id: 'ac1', type: 'reorder', message: 'PO #4521 dikirim ke CV Pratama — 200 unit Kabel Type-C', sku: 'SK-008', timestamp: new Date(Date.now() - 12 * 60000), user: 'Andi S.' },
  { id: 'ac2', type: 'alert', message: 'Stok SKU-013 (Charger 65W) kritis — 10 unit tersisa', sku: 'SK-013', timestamp: new Date(Date.now() - 38 * 60000) },
  { id: 'ac3', type: 'delivery', message: 'PO #4508 diterima — 150 unit Mouse Wireless dari PT Indo Tech', sku: 'SK-003', timestamp: new Date(Date.now() - 2.1 * 3600000) },
  { id: 'ac4', type: 'adjustment', message: 'Penyesuaian stok manual SKU-007 (+50 unit) oleh Budi W.', sku: 'SK-007', timestamp: new Date(Date.now() - 4.5 * 3600000), user: 'Budi W.' },
  { id: 'ac5', type: 'system', message: 'Oracle AI memperbarui forecast permintaan — akurasi model 94.2%', timestamp: new Date(Date.now() - 6 * 3600000) },
  { id: 'ac6', type: 'reorder', message: 'Bulk reorder disetujui — 5 SKU urgent dikirim ke 3 supplier', timestamp: new Date(Date.now() - 8 * 3600000), user: 'Manager SCO' },
];

// ── Helpers ────────────────────────────────────────────────────────────────

export function formatRupiah(val: number): string {
  if (Math.abs(val) >= 1_000_000_000) return `Rp ${(val / 1_000_000_000).toFixed(1)}M`;
  if (Math.abs(val) >= 1_000_000) return `Rp ${(val / 1_000_000).toFixed(1)}jt`;
  if (Math.abs(val) >= 1_000) return `Rp ${(val / 1_000).toFixed(0)}rb`;
  return `Rp ${val}`;
}

export function timeAgoStr(date: Date): string {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 60) return `${mins} menit lalu`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} jam lalu`;
  return `${Math.floor(hrs / 24)} hari lalu`;
}
