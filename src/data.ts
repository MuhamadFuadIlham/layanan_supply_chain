// =====================================================
// SUPPLY CHAIN ORACLE — Types & Simulated Backend State
// =====================================================

export interface Supplier {
  id: string;
  name: string;
  city: string;
  contact: string;
}

export interface SkuItem {
  sku_code: string;
  name: string;
  category: string;
  price: number;
  supplier: Supplier;
  current_stock: number;
  daily_demand: number;
  lead_time: number;
  safety_stock: number;
  rop: number;
  eoq: number;
  status: 'urgent' | 'warning' | 'safe' | 'overstock';
  severity: 'critical' | 'warning' | 'info' | 'review';
  inspection_status: 'Passed' | 'Failed' | 'Pending';
  production_volume: number;
  last_reorder_date: string;
  last_reorder_qty: number;
}

export interface PredictionRecord {
  sku_code: string;
  predicted_lead_time: number;
  confidence_score: number;
  margin_error: number;
  confidence_interval_lower: number;
  confidence_interval_upper: number;
  daily_demand: number;
  recommended_safety_stock: number;
  recommended_rop: number;
  recommended_eoq: number;
  formula_breakdown: {
    daily_demand: number;
    lead_time: number;
    safety_stock: number;
    rop_calculation: string;
  };
  price: number;
  timestamp: string;
}

export interface PurchaseOrder {
  po_number: string;
  sku_code: string;
  quantity: number;
  supplier: string;
  order_date: string;
  expected_delivery: string;
  status: 'sent' | 'confirmed' | 'in-transit' | 'delivered';
}

export interface AlertRecord {
  alert_id: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  timestamp: string;
  type: string;
  items_affected: number;
  sku_list: string[];
  message: string;
  status: 'unread' | 'resolved' | 'ignored';
  action_taken?: string | null;
  outcome?: string | null;
}

// ── Mock Initial Data ──
export const SUPPLIERS: Supplier[] = [
  { id: 'SUP-001', name: 'PT Sentosa Jaya', city: 'Surabaya', contact: '+62 812-3456-7890' },
  { id: 'SUP-002', name: 'CV Makmur Abadi', city: 'Semarang', contact: '+62 813-2345-6789' },
  { id: 'SUP-003', name: 'PT Indo Manufaktur', city: 'Jakarta', contact: '+62 821-9876-5432' },
  { id: 'SUP-004', name: 'UD Berkah Jaya', city: 'Bandung', contact: '+62 857-1234-5678' },
  { id: 'SUP-005', name: 'PT Maju Bersama', city: 'Medan', contact: '+62 878-8765-4321' },
];

export const CATEGORIES = ['Elektronik', 'Pakaian', 'Makanan & Minuman', 'Peralatan Rumah', 'Otomotif', 'Kesehatan'];

// Generator for starting SKU list
export function generateInitialSkus(): SkuItem[] {
  const baseProducts = [
    { name: 'Kabel USB-C 1m', cat: 'Elektronik', price: 25000 },
    { name: 'Charger Fast 20W', cat: 'Elektronik', price: 85000 },
    { name: 'Earphone Bluetooth TWS', cat: 'Elektronik', price: 150000 },
    { name: 'Power Bank 10000mAh', cat: 'Elektronik', price: 180000 },
    { name: 'Screen Protector Tempered', cat: 'Elektronik', price: 15000 },
    { name: 'Mouse Wireless Ergonomic', cat: 'Elektronik', price: 95000 },
    { name: 'Keyboard Mechanical RGB', cat: 'Elektronik', price: 320000 },
    { name: 'Hub USB 4-Port', cat: 'Elektronik', price: 65000 },
    { name: 'Webcam HD 1080p', cat: 'Elektronik', price: 250000 },
    { name: 'Speaker Portable Mini', cat: 'Elektronik', price: 120000 },
    { name: 'Kaos Polos Cotton 30s', cat: 'Pakaian', price: 45000 },
    { name: 'Kemeja Flannel Pria', cat: 'Pakaian', price: 125000 },
    { name: 'Celana Jeans Slim Fit', cat: 'Pakaian', price: 175000 },
    { name: 'Hoodie Oversized Unisex', cat: 'Pakaian', price: 150000 },
    { name: 'Topi Baseball Cap', cat: 'Pakaian', price: 35000 },
    { name: 'Kaos Kaki Sport 3-Pack', cat: 'Pakaian', price: 28000 },
    { name: 'Jaket Windbreaker', cat: 'Pakaian', price: 220000 },
    { name: 'Celana Pendek Cargo', cat: 'Pakaian', price: 95000 },
    { name: 'Kopi Arabica Gayo 250g', cat: 'Makanan & Minuman', price: 65000 },
    { name: 'Teh Hijau Premium 100g', cat: 'Makanan & Minuman', price: 32000 },
    { name: 'Madu Hutan Murni 500ml', cat: 'Makanan & Minuman', price: 85000 },
    { name: 'Granola Mix 500g', cat: 'Makanan & Minuman', price: 55000 },
    { name: 'Sambal Matah Jar 250g', cat: 'Makanan & Minuman', price: 28000 },
    { name: 'Kerupuk Udang 500g', cat: 'Makanan & Minuman', price: 22000 },
    { name: 'Minyak Zaitun Extra 500ml', cat: 'Makanan & Minuman', price: 95000 },
    { name: 'Snack Bar Protein', cat: 'Makanan & Minuman', price: 18000 },
    { name: 'Panci Stainless 24cm', cat: 'Peralatan Rumah', price: 145000 },
    { name: 'Wajan Anti Lengket 28cm', cat: 'Peralatan Rumah', price: 125000 },
    { name: 'Set Pisau Dapur 5pcs', cat: 'Peralatan Rumah', price: 175000 },
    { name: 'Blender Portable USB', cat: 'Peralatan Rumah', price: 85000 },
    { name: 'Rak Susun 3 Tingkat', cat: 'Peralatan Rumah', price: 195000 },
    { name: 'Tempat Sampah Sensor', cat: 'Peralatan Rumah', price: 250000 },
    { name: 'Dispenser Sabun Otomatis', cat: 'Peralatan Rumah', price: 95000 },
    { name: 'Lampu LED Smart 9W', cat: 'Peralatan Rumah', price: 45000 },
    { name: 'Filter Oli Mesin', cat: 'Otomotif', price: 35000 },
    { name: 'Busi Iridium 4pcs', cat: 'Otomotif', price: 120000 },
    { name: 'Kampas Rem Depan', cat: 'Otomotif', price: 85000 },
    { name: 'Aki Motor 5Ah', cat: 'Otomotif', price: 195000 },
    { name: 'Ban Motor 70/90-17', cat: 'Otomotif', price: 165000 },
    { name: 'Oli Mesin Sintetik 1L', cat: 'Otomotif', price: 75000 },
    { name: 'Wiper Blade 18"', cat: 'Otomotif', price: 45000 },
    { name: 'Lampu HID Motor', cat: 'Otomotif', price: 55000 },
    { name: 'Masker KN95 50pcs', cat: 'Kesehatan', price: 65000 },
    { name: 'Hand Sanitizer 500ml', cat: 'Kesehatan', price: 28000 },
    { name: 'Vitamin C 1000mg 30tab', cat: 'Kesehatan', price: 45000 },
    { name: 'Thermometer Digital', cat: 'Kesehatan', price: 55000 },
    { name: 'Tensimeter Digital', cat: 'Kesehatan', price: 195000 },
    { name: 'Plester Luka Waterproof', cat: 'Kesehatan', price: 15000 },
    { name: 'Obat Tetes Mata 15ml', cat: 'Kesehatan', price: 22000 },
    { name: 'Kotak P3K Lengkap', cat: 'Kesehatan', price: 125000 },
  ];

  return baseProducts.map((p, i) => {
    const skuCode = `SK-${String(i + 1).padStart(3, '0')}`;
    const supplier = SUPPLIERS[i % SUPPLIERS.length];
    const dailyDemand = Math.floor(Math.random() * 20) + 4;
    const leadTime = +(Math.random() * 10 + 2.5).toFixed(1);
    const safetyStock = Math.floor(dailyDemand * 1.5 + Math.random() * 8);
    const rop = Math.floor(dailyDemand * leadTime + safetyStock);
    const eoq = Math.floor(Math.sqrt((2 * dailyDemand * 365 * 25000) / (p.price * 0.15)));

    // Deterministic distribution of states
    let currentStock = 0;
    const rem = i % 10;
    if (rem === 0 || rem === 3) {
      // 🔴 Urgent reorder
      currentStock = Math.floor(rop * 0.45);
    } else if (rem === 1 || rem === 6) {
      // 🟡 Warning planning
      currentStock = Math.floor(rop * 1.1);
    } else if (rem === 8) {
      // 🟣 Overstock
      currentStock = Math.floor(rop * 3.2);
    } else {
      // 🟢 Safe zone
      currentStock = Math.floor(rop * 1.8);
    }

    let status: 'urgent' | 'warning' | 'safe' | 'overstock';
    let severity: 'critical' | 'warning' | 'info' | 'review';

    if (currentStock < rop) {
      status = 'urgent';
      severity = 'critical';
    } else if (currentStock < rop + 50) {
      status = 'warning';
      severity = 'warning';
    } else if (currentStock > rop * 2.5) {
      status = 'overstock';
      severity = 'review';
    } else {
      status = 'safe';
      severity = 'info';
    }

    const inspectionStatus = (['Passed', 'Failed', 'Pending'][i % 3]) as 'Passed' | 'Failed' | 'Pending';
    const productionVolume = Math.floor(Math.random() * 4000) + 600;
    const lastReorderDate = new Date(Date.now() - (Math.floor(Math.random() * 15) + 1) * 86400000).toISOString().split('T')[0];

    return {
      sku_code: skuCode,
      name: p.name,
      category: p.cat,
      price: p.price,
      supplier,
      current_stock: currentStock,
      daily_demand: dailyDemand,
      lead_time: leadTime,
      safety_stock: safetyStock,
      rop,
      eoq,
      status,
      severity,
      inspection_status: inspectionStatus,
      production_volume: productionVolume,
      last_reorder_date: lastReorderDate,
      last_reorder_qty: Math.floor(eoq * 1.1),
    };
  });
}

// Global active database state inside the browser session
let SKU_STATE: SkuItem[] = generateInitialSkus();
let PO_STATE: PurchaseOrder[] = [
  { po_number: 'PO-2026-0042', sku_code: 'SK-003', quantity: 200, supplier: 'PT Indo Manufaktur', order_date: '2026-06-25', expected_delivery: '2026-07-02', status: 'in-transit' },
  { po_number: 'PO-2026-0041', sku_code: 'SK-011', quantity: 350, supplier: 'PT Sentosa Jaya', order_date: '2026-06-23', expected_delivery: '2026-06-30', status: 'confirmed' },
  { po_number: 'PO-2026-0040', sku_code: 'SK-027', quantity: 150, supplier: 'CV Makmur Abadi', order_date: '2026-06-20', expected_delivery: '2026-06-27', status: 'delivered' },
];
let PREDICTION_STATE: PredictionRecord[] = [];
let poCounter = 43;

// Alert List Generator based on SKU_STATE
export function getAlerts(): AlertRecord[] {
  const urgent = SKU_STATE.filter(s => s.status === 'urgent');
  const warning = SKU_STATE.filter(s => s.status === 'warning');

  const list: AlertRecord[] = [];
  const now = new Date();

  if (urgent.length > 0) {
    list.push({
      alert_id: 'ALERT-001',
      priority: 'critical',
      timestamp: new Date(now.getTime() - 2.5 * 3600000).toISOString(),
      type: 'urgent_reorder',
      items_affected: urgent.length,
      sku_list: urgent.map(s => s.sku_code),
      message: `${urgent.length} SKU menyentuh ROP kritis — butuh reorder segera!`,
      status: 'unread',
    });
  }

  if (warning.length > 0) {
    list.push({
      alert_id: 'ALERT-002',
      priority: 'high',
      timestamp: new Date(now.getTime() - 4.8 * 3600000).toISOString(),
      type: 'approaching_rop',
      items_affected: warning.length,
      sku_list: warning.map(s => s.sku_code),
      message: `${warning.length} SKU mendekati batas ROP — siapkan planning reorder.`,
      status: 'unread',
    });
  }

  // History logs
  list.push({
    alert_id: 'ALERT-H1',
    priority: 'critical',
    timestamp: new Date(now.getTime() - 24 * 3600000).toISOString(),
    type: 'urgent_reorder',
    items_affected: 4,
    sku_list: ['SK-005', 'SK-012'],
    message: `4 SKU memerlukan order mendesak dari PT Sentosa Jaya`,
    status: 'resolved',
    action_taken: 'PO Sent',
    outcome: 'Delivered +4 hours',
  });

  list.push({
    alert_id: 'ALERT-H2',
    priority: 'medium',
    timestamp: new Date(now.getTime() - 48 * 3600000).toISOString(),
    type: 'inspection_warning',
    items_affected: 1,
    sku_list: ['SK-019'],
    message: `Batch inspeksi SK-019 Pending di CV Makmur Abadi`,
    status: 'ignored',
    action_taken: 'None',
    outcome: 'Batch cleared manually',
  });

  return list;
}

// Simulated backend logic
export const apiSimulator = {
  getSkus(): Promise<SkuItem[]> {
    return Promise.resolve([...SKU_STATE]);
  },

  updateSkuStock(skuCode: string, newStock: number): Promise<SkuItem> {
    const idx = SKU_STATE.findIndex(s => s.sku_code === skuCode);
    if (idx !== -1) {
      const item = SKU_STATE[idx];
      item.current_stock = newStock;

      // Recalculate status
      if (item.current_stock < item.rop) {
        item.status = 'urgent';
        item.severity = 'critical';
      } else if (item.current_stock < item.rop + 50) {
        item.status = 'warning';
        item.severity = 'warning';
      } else if (item.current_stock > item.rop * 2.5) {
        item.status = 'overstock';
        item.severity = 'review';
      } else {
        item.status = 'safe';
        item.severity = 'info';
      }
      SKU_STATE[idx] = { ...item };
      return Promise.resolve({ ...item });
    }
    return Promise.reject(new Error('SKU not found'));
  },

  async predictLeadTime(params: {
    sku_code: string;
    price: number;
    reorder_qty: number;
    production_volume: number;
    inspection_status: 'Passed' | 'Failed' | 'Pending';
    supplier_id?: string;
    last_lead_time?: number;
  }): Promise<PredictionRecord> {
    const sku = SKU_STATE.find(s => s.sku_code === params.sku_code);
    if (!sku) throw new Error("SKU not found");

    // Prepare payload based on the agreed real API schema
    const payload = {
        Harga_jual: params.price,
        Jumlah_produk_terjual: sku.daily_demand * 365.0,
        Kuantitas_pesanan: params.reorder_qty > 0 ? params.reorder_qty : sku.eoq,
        Volume_produksi_pabrik: params.production_volume,
        Waktu_produksi_pabrik: 5.0, // Operational baseline
        Biaya_produksi_pabrik: params.production_volume * 15000.0,
        Total_biaya_operasional: (params.production_volume * 18000.0) + 5000000.0,
        Tingkat_cacat_produk: params.inspection_status === 'Failed' ? 5.5 : 1.5,
        Hasil_inspeksi_kualitas: params.inspection_status,
        Tingkat_stok_gudang: sku.current_stock
    };

    try {
        const response = await fetch('http://localhost:8000/api/v1/predict-rop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();

        const predictedLeadTime = data.predicted_lead_time_days;
        const rop = data.calculated_rop_units;
        const safetyStock = 5; // Standard buffer defined in backend
        const dailyDemand = sku.daily_demand;

        const record: PredictionRecord = {
          sku_code: params.sku_code,
          predicted_lead_time: predictedLeadTime,
          // Remove Math.random, use deterministic base confidence
          confidence_score: 0.95, 
          margin_error: 0.66, // Using static MAE base from ML audit
          confidence_interval_lower: Math.max(1.0, predictedLeadTime - 0.66),
          confidence_interval_upper: predictedLeadTime + 0.66,
          daily_demand: dailyDemand,
          recommended_safety_stock: safetyStock,
          recommended_rop: rop,
          recommended_eoq: payload.Kuantitas_pesanan,
          formula_breakdown: {
            daily_demand: dailyDemand,
            lead_time: predictedLeadTime,
            safety_stock: safetyStock,
            rop_calculation: `(${dailyDemand} × ${predictedLeadTime}) + ${safetyStock} = ${rop}`,
          },
          price: params.price,
          timestamp: new Date().toISOString(),
        };

        PREDICTION_STATE.unshift(record);
        return record;

    } catch (error) {
        console.error("Prediction API failed:", error);
        throw error;
    }
  },

  createPO(params: {
    sku_code: string;
    quantity: number;
  }): Promise<PurchaseOrder> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sku = SKU_STATE.find(s => s.sku_code === params.sku_code);
        const poNumber = `PO-2026-${String(poCounter++).padStart(4, '0')}`;
        const leadDays = sku ? sku.lead_time : 6;
        const deliveryDate = new Date(Date.now() + leadDays * 86400000);

        const newPo: PurchaseOrder = {
          po_number: poNumber,
          sku_code: params.sku_code,
          quantity: params.quantity,
          supplier: sku ? sku.supplier.name : 'Supplier General',
          order_date: new Date().toISOString().split('T')[0],
          expected_delivery: deliveryDate.toISOString().split('T')[0],
          status: 'sent',
        };

        PO_STATE.unshift(newPo);

        // Instantly simulated stock restoration on PO create to demonstrate interactive change
        if (sku) {
          // Increase stock by ordered quantity to simulate update
          const updatedStock = sku.current_stock + params.quantity;
          apiSimulator.updateSkuStock(params.sku_code, updatedStock);
        }

        resolve(newPo);
      }, 1200);
    });
  },

  getPOHistory(): Promise<PurchaseOrder[]> {
    return Promise.resolve([...PO_STATE]);
  },

  getPredictionHistory(): Promise<PredictionRecord[]> {
    return Promise.resolve([...PREDICTION_STATE]);
  },
};

// ── Helper Utilities ──
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'Baru saja';
  if (diffMin < 60) return `${diffMin} menit lalu`;
  if (diffHrs < 24) return `${diffHrs} jam lalu`;
  return `${diffDays} hari lalu`;
}

export function getStatusInfo(status: 'urgent' | 'warning' | 'safe' | 'overstock') {
  switch (status) {
    case 'urgent': return { emoji: '🔴', label: 'Urgent Reorder', color: 'var(--rose-400)', bgClass: 'urgent' };
    case 'warning': return { emoji: '🟡', label: 'Planning', color: 'var(--amber-400)', bgClass: 'warning' };
    case 'safe': return { emoji: '🟢', label: 'Aman', color: 'var(--emerald-400)', bgClass: 'safe' };
    case 'overstock': return { emoji: '🟣', label: 'Overstock', color: 'var(--purple-400)', bgClass: 'overstock' };
  }
}

