import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  CheckCircle, 
  RefreshCw, 
  Search, 
  HelpCircle, 
  Sliders, 
  Clock, 
  ShieldAlert, 
  Mail, 
  Bell, 
  Info,
  ChevronDown,
  ArrowRight,
  Cpu,
  Activity,
  ArrowLeft
} from 'lucide-react';
import { Navbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { ProblemSection } from '../components/landing/ProblemSection';
import { SolutionSection } from '../components/landing/SolutionSection';
import { DashboardShowcase } from '../components/landing/DashboardShowcase';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { AIOracleSection } from '../components/landing/AIOracleSection';
import { FeatureDeepDive } from '../components/landing/FeatureDeepDive';
import { ROISection } from '../components/landing/ROISection';
import { AdvantageSection } from '../components/landing/AdvantageSection';
import { PricingPreview } from '../components/landing/PricingPreview';
import { FinalCTASection } from '../components/landing/FinalCTASection';
import { Footer } from '../components/landing/Footer';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Dot
} from 'recharts';
import { 
  apiSimulator, 
  SUPPLIERS, 
  CATEGORIES, 
  getAlerts,
  formatCurrency, 
  timeAgo 
} from '../data';
import type { 
  SkuItem, 
  PredictionRecord, 
  AlertRecord 
} from '../data';

// ──────────────────────────────────────────
// Custom Toast Type
// ──────────────────────────────────────────
interface ToastMsg {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
}

// ──────────────────────────────────────────
// Animated Counter Component
// ──────────────────────────────────────────
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    const startVal = display;

    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.floor(startVal + (value - startVal) * eased));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <>{display.toLocaleString('id-ID')}{suffix}</>;
}

// ──────────────────────────────────────────
// Main Landing Component
// ──────────────────────────────────────────
export function LandingPage() {
  const navigate = useNavigate();
  // ── Navigation ──
  const [activeTab, setActiveTab] = useState<'predictor' | 'inventory' | 'map' | 'alerts'>('predictor');
  const [navScrolled, setNavScrolled] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  
  // ── Core Data ──
  const [skus, setSkus] = useState<SkuItem[]>([]);
  const [alerts, setAlerts] = useState<AlertRecord[]>([]);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  // ── Filters ──
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState<'urgency' | 'stock_asc' | 'stock_desc' | 'lead_time'>('urgency');

  // ── Multi-Select ──
  const [selectedSkuCodes, setSelectedSkuCodes] = useState<string[]>([]);

  // ── Detail Panel ──
  const [selectedSkuDetail, setSelectedSkuDetail] = useState<SkuItem | null>(null);

  // ── Reorder Modal ──
  const [reorderModalSku, setReorderModalSku] = useState<SkuItem | null>(null);
  const [reorderQtyInput, setReorderQtyInput] = useState<number>(0);
  const [isSendingPo, setIsSendingPo] = useState(false);

  // ── Predictor Form ──
  const [predictorSkuCode, setPredictorSkuCode] = useState('SK-001');
  const [predictorPrice, setPredictorPrice] = useState(150000);
  const [predictorQty, setPredictorQty] = useState(250);
  const [predictorVolume, setPredictorVolume] = useState(1200);
  const [predictorInspect, setPredictorInspect] = useState<'Passed' | 'Failed' | 'Pending'>('Passed');
  const [predictorSupplier, setPredictorSupplier] = useState('SUP-003');
  const [predictorLastLead, setPredictorLastLead] = useState(7);

  // ── Predictor Result ──
  const [isPredicting, setIsPredicting] = useState(false);
  const [lastPredictionResult, setLastPredictionResult] = useState<PredictionRecord | null>(null);
  const [showFormula, setShowFormula] = useState(false);

  // ── Alert Settings ──
  const [alertInApp, setAlertInApp] = useState(true);
  const [alertEmail, setAlertEmail] = useState(true);
  const [alertSensitivity, setAlertSensitivity] = useState<'Aggressive' | 'Normal' | 'Conservative'>('Normal');
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(true);

  // ── UI State ──
  const [bannerVisible, setBannerVisible] = useState(true);
  const [showWorkbench, setShowWorkbench] = useState(false);

  // ── Scroll listener for nav ──
  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Load data ──
  useEffect(() => { loadAllData(); }, []);

  const loadAllData = async () => {
    const list = await apiSimulator.getSkus();
    setSkus(list);
    setAlerts(getAlerts());
  };

  // ── Toast ──
  const triggerToast = useCallback((type: ToastMsg['type'], title: string, message?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  // ── Filtered SKU ──
  const filteredSkus = useMemo(() => {
    return skus.filter(s => {
      const matchSearch = s.sku_code.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'All' || s.category === selectedCategory;
      const matchStatus = selectedStatus === 'All' || s.status === selectedStatus;
      return matchSearch && matchCat && matchStatus;
    }).sort((a, b) => {
      if (sortBy === 'stock_asc') return a.current_stock - b.current_stock;
      if (sortBy === 'stock_desc') return b.current_stock - a.current_stock;
      if (sortBy === 'lead_time') return b.lead_time - a.lead_time;
      const weight: Record<string, number> = { urgent: 0, warning: 1, overstock: 2, safe: 3 };
      return weight[a.status] - weight[b.status];
    });
  }, [skus, searchQuery, selectedCategory, selectedStatus, sortBy]);

  // ── Bulk Reorder ──
  const handleBulkReorder = () => {
    if (selectedSkuCodes.length === 0) {
      triggerToast('warning', 'Peringatan', 'Pilih minimal satu SKU untuk reorder massal.');
      return;
    }
    setIsSendingPo(true);
    setTimeout(async () => {
      for (const code of selectedSkuCodes) {
        const item = skus.find(s => s.sku_code === code);
        if (item) await apiSimulator.createPO({ sku_code: code, quantity: item.eoq });
      }
      setSelectedSkuCodes([]);
      await loadAllData();
      setIsSendingPo(false);
      triggerToast('success', 'Bulk Order Berhasil!', `${selectedSkuCodes.length} PO baru telah dikirim ke supplier.`);
    }, 1800);
  };

  // ── Confirm Reorder ──
  const handleConfirmReorder = async () => {
    if (!reorderModalSku) return;
    setIsSendingPo(true);
    try {
      await apiSimulator.createPO({ sku_code: reorderModalSku.sku_code, quantity: reorderQtyInput });
      await loadAllData();
      triggerToast('success', 'Purchase Order Terkirim', `PO berhasil terkirim ke ${reorderModalSku.supplier.name} sejumlah ${reorderQtyInput} unit.`);
      setReorderModalSku(null);
    } catch {
      triggerToast('error', 'Gagal Membuat PO', 'Silakan coba lagi beberapa saat lagi.');
    } finally {
      setIsSendingPo(false);
    }
  };

  // ── Predict Submit ──
  const handlePredictSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);
    setLastPredictionResult(null);
    try {
      const res = await apiSimulator.predictLeadTime({
        sku_code: predictorSkuCode,
        price: predictorPrice,
        reorder_qty: predictorQty,
        production_volume: predictorVolume,
        inspection_status: predictorInspect,
        supplier_id: predictorSupplier,
        last_lead_time: predictorLastLead
      });
      setLastPredictionResult(res);
      const targetSku = skus.find(s => s.sku_code === predictorSkuCode);
      if (targetSku) {
        targetSku.rop = res.recommended_rop;
        targetSku.lead_time = res.predicted_lead_time;
        if (targetSku.current_stock < res.recommended_rop) {
          targetSku.status = 'urgent';
          targetSku.severity = 'critical';
        } else if (targetSku.current_stock < res.recommended_rop + 50) {
          targetSku.status = 'warning';
          targetSku.severity = 'warning';
        } else {
          targetSku.status = 'safe';
          targetSku.severity = 'info';
        }
        setSkus([...skus]);
      }
      triggerToast('success', 'Prediksi Selesai', `Hasil ROP untuk ${predictorSkuCode} direkomendasikan ${res.recommended_rop} unit.`);
    } catch (err: any) {
      if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError'))) {
        triggerToast('error', 'Gagal Terhubung', 'Gagal terhubung ke Server AI Oracle. Pastikan backend FastAPI Anda aktif di port 8000.');
      } else {
        triggerToast('error', 'Prediksi Gagal', 'Model mengalami error saat mengkalkulasi regresi.');
      }
    } finally {
      setIsPredicting(false);
    }
  };

  // ── Scatter Data ──
  const scatterChartData = useMemo(() => {
    return skus.map(s => ({
      x: s.current_stock,
      y: s.lead_time,
      z: s.price,
      sku: s.sku_code,
      name: s.name,
      rop: s.rop,
      status: s.status,
      supplier: s.supplier.name
    }));
  }, [skus]);

  // ── Computed Stats ──
  const urgentCount = skus.filter(s => s.status === 'urgent').length;
  const warningCount = skus.filter(s => s.status === 'warning').length;
  const safeCount = skus.filter(s => s.status === 'safe').length;
  const overstockCount = skus.filter(s => s.status === 'overstock').length;

  // ════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════
  
  // ── Dashboard route ──
  useEffect(() => {
    if (showDashboard) {
      navigate('/app/dashboard');
    }
  }, [showDashboard, navigate]);

  if (showDashboard) {
    return null;
  }

  if (!showWorkbench) {
    return (
      <div className="relative min-h-screen">
        <div className="mesh-gradient-bg"></div>
        <Navbar onShowWorkbench={() => setShowDashboard(true)} />
        <main>
          <HeroSection onShowWorkbench={() => setShowDashboard(true)} />
          <ProblemSection />
          <SolutionSection />
          <DashboardShowcase />
          <HowItWorksSection />
          <AIOracleSection />
          <FeatureDeepDive />
          <ROISection />
          <AdvantageSection />
          <PricingPreview />
          <FinalCTASection onShowWorkbench={() => setShowDashboard(true)} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen" style={{ paddingBottom: '2rem' }}>
      {/* Animated Background Orbs */}
      <div className="glow-effect-1"></div>
      <div className="glow-effect-2"></div>
      <div className="glow-effect-3"></div>

      {/* ═══ WORKBENCH NAVBAR ═══ */}
      <nav className={`navbar ${navScrolled ? 'scrolled' : ''}`}>
        <div className="nav-brand">
          <div className="nav-brand-icon">⚡</div>
          <span className="nav-brand-text">Supply Chain Oracle</span>
        </div>
        <button 
          className="btn btn-secondary btn-sm flex items-center gap-2"
          onClick={() => setShowWorkbench(false)}
        >
          <ArrowLeft size={16} /> Kembali ke Beranda
        </button>
      </nav>
      
      <div style={{ height: '100px' }}></div> {/* Spacer for fixed navbar */}

      {/* ═══ STICKY URGENT BANNER ═══ */}
      {bannerVisible && urgentCount > 0 && (
        <div className="container relative z-10 mb-4">
          <div className="urgent-banner">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚨</span>
              <div>
                <div className="font-bold text-white">Alert Real-Time: {urgentCount} SKU Butuh Reorder Urgent!</div>
                <div className="text-sm text-red-100" style={{ opacity: 0.8 }}>Keseimbangan stok kritis terdeteksi pada Segmen Efisiensi operasional.</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                className="btn btn-danger btn-sm" 
                onClick={() => {
                  setActiveTab('inventory');
                  setSelectedStatus('urgent');
                  document.getElementById('workbench')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Lihat Detail & PO <ArrowRight size={14} />
              </button>
              <button 
                className="btn btn-ghost btn-sm"
                style={{ color: 'rgba(255,255,255,0.6)' }}
                onClick={() => setBannerVisible(false)}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ MAIN WORKBENCH ═══ */}
      <section id="workbench" className="container relative z-10 scroll-mt-6">
        <div className="text-center mb-8">
          <div className="section-divider"></div>
          <h2 className="font-extrabold mb-2">Interactive Decision Control Center</h2>
          <p className="text-sm text-slate-400">
            Pantau, prediksi, dan kelola seluruh inventory dari satu dashboard terpadu.
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="tab-headers">
          <button 
            className={`tab-btn ${activeTab === 'predictor' ? 'active' : ''}`}
            onClick={() => setActiveTab('predictor')}
          >
            <Cpu size={15} /> AI Predictor
          </button>
          <button 
            className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <Package size={15} /> Reorder Dashboard
          </button>
          <button 
            className={`tab-btn ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            <Activity size={15} /> Risk Alert Map
          </button>
          <button 
            className={`tab-btn ${activeTab === 'alerts' ? 'active' : ''}`}
            onClick={() => setActiveTab('alerts')}
          >
            <Bell size={15} /> Alert Preferences
          </button>
        </div>

        {/* ═══ TAB 1: AI PREDICTOR ═══ */}
        {activeTab === 'predictor' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="glass-panel p-6 lg:col-span-1">
              <h3 className="text-lg font-bold mb-4 text-indigo-400 flex items-center gap-2">
                <Sliders size={18} /> Model XGBoost v2 Input
              </h3>
              <form onSubmit={handlePredictSubmit}>
                <div className="form-group">
                  <label className="form-label">SKU Produk</label>
                  <select className="form-select" value={predictorSkuCode} onChange={e => setPredictorSkuCode(e.target.value)}>
                    {skus.map(s => (
                      <option key={s.sku_code} value={s.sku_code}>{s.sku_code} - {s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Harga Jual Unit (IDR)</label>
                  <input type="number" className="form-input" value={predictorPrice} onChange={e => setPredictorPrice(Math.max(1, parseInt(e.target.value) || 0))} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Kuantitas Pemesanan Ulang (EOQ)</label>
                  <input type="number" className="form-input" value={predictorQty} onChange={e => setPredictorQty(Math.max(1, parseInt(e.target.value) || 0))} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Volume Produksi Pabrik / Batch</label>
                  <input type="number" className="form-input" value={predictorVolume} onChange={e => setPredictorVolume(Math.max(1, parseInt(e.target.value) || 0))} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Status QC Inspeksi</label>
                  <select className="form-select" value={predictorInspect} onChange={e => setPredictorInspect(e.target.value as 'Passed' | 'Failed' | 'Pending')}>
                    <option value="Passed">Passed</option>
                    <option value="Failed">Failed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Pabrikan Supplier Utama</label>
                  <select className="form-select" value={predictorSupplier} onChange={e => setPredictorSupplier(e.target.value)}>
                    {SUPPLIERS.map((sup: any) => (
                      <option key={sup.id} value={sup.id}>{sup.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Lead Time Terakhir (Hari)</label>
                  <input type="number" className="form-input" value={predictorLastLead} onChange={e => setPredictorLastLead(Math.max(1, parseInt(e.target.value) || 0))} />
                </div>
                <button type="submit" className="btn btn-primary w-full mt-4" disabled={isPredicting}>
                  {isPredicting ? (
                    <>
                      <RefreshCw className="animate-spin" size={16} /> AI Menganalisis...
                    </>
                  ) : (
                    <>
                      <Cpu size={16} /> Jalankan Prediksi Regresi
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Result Display */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {!isPredicting && !lastPredictionResult ? (
                <div className="glass-panel p-8 flex flex-col items-center justify-center text-center h-full">
                  <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-lg)', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '1rem' }}>
                    🤖
                  </div>
                  <h4 className="text-lg font-bold mb-2">Siap untuk Kalkulasi</h4>
                  <p className="text-sm text-slate-500 max-w-sm">
                    Isi form parameters di sebelah kiri dan jalankan kalkulator prediksi lead time berbasis XGBoost.
                  </p>
                </div>
              ) : isPredicting ? (
                <div className="glass-panel p-8 flex flex-col items-center justify-center text-center h-full">
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', marginBottom: '1.5rem' }} className="brain-pulsate">
                    🧠
                  </div>
                  <h4 className="text-lg font-bold mb-1">AI sedang memproses model regresi...</h4>
                  <p className="text-sm text-slate-400 max-w-xs mb-4">
                    Mengukur korelasi volume inspeksi, lead time histori, dan normalisasi scaler.
                  </p>
                  <div className="shimmer-bg" style={{ height: 6, width: 200, borderRadius: 'var(--radius-full)' }}></div>
                </div>
              ) : (
                <div className="glass-panel p-6 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-lg font-bold text-indigo-400 mb-6 flex items-center gap-2">
                      <CheckCircle size={18} /> Output Keputusan AI & Estimasi ROP
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 stagger-in">
                      <div className="p-4 rounded-lg" style={{ background: 'rgba(99, 102, 241, 0.06)', border: '1px solid rgba(99, 102, 241, 0.15)' }}>
                        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Estimasi Lead Time</div>
                        <div className="text-4xl font-extrabold text-indigo-400">
                          {lastPredictionResult?.predicted_lead_time} <span className="text-lg">Hari</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs font-bold" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                            Confidence: {(lastPredictionResult!.confidence_score * 100).toFixed(2)}%
                          </span>
                          <span className="text-xs text-slate-400">Margin: ±{lastPredictionResult?.margin_error} Hari</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg" style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                        <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Rekomendasi Reorder Point (ROP)</div>
                        <div className="text-4xl font-extrabold text-emerald-400">
                          {lastPredictionResult?.recommended_rop} <span className="text-lg">Unit</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-2">
                          EOQ Optimal: {lastPredictionResult?.recommended_eoq} unit per order.
                        </div>
                      </div>
                    </div>

                    {/* Confidence Interval */}
                    <div className="p-4 rounded-lg mb-6" style={{ background: 'rgba(10, 15, 31, 0.6)', border: '1px solid var(--border-default)' }}>
                      <div className="text-xs font-bold text-slate-400 mb-2">95% Confidence Interval Range (Hari)</div>
                      <div className="progress-bar-track" style={{ height: 8 }}>
                        <div className="progress-bar-fill" style={{ width: '60%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>Min: {lastPredictionResult?.confidence_interval_lower} Hari</span>
                        <span>Max: {lastPredictionResult?.confidence_interval_upper} Hari</span>
                      </div>
                    </div>

                    {/* Formula Collapsible */}
                    <div className="border-t" style={{ paddingTop: '1rem' }}>
                      <button 
                        className="flex items-center gap-2 text-xs font-bold text-slate-400 cursor-pointer"
                        style={{ background: 'none', border: 'none', fontFamily: 'var(--font-sans)' }}
                        onClick={() => setShowFormula(!showFormula)}
                      >
                        <ChevronDown size={14} style={{ transform: showFormula ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }} />
                        {showFormula ? 'Sembunyikan Formula' : 'Tampilkan Rumus Matematika ROP'}
                      </button>
                      
                      {showFormula && (
                        <div className="font-mono text-xs mt-3 p-4 rounded-lg" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', color: '#cbd5e1', lineHeight: 1.8 }}>
                          <div>ROP = (Permintaan Harian × Lead Time) + Safety Stock</div>
                          <div style={{ color: '#64748b', margin: '4px 0' }}>Dimana:</div>
                          <div>· Permintaan Harian = {lastPredictionResult?.daily_demand} unit/hari</div>
                          <div>· Lead Time Prediksi = {lastPredictionResult?.predicted_lead_time} hari</div>
                          <div>· Safety Stock Buffer = {lastPredictionResult?.recommended_safety_stock} unit</div>
                          <div className="text-emerald-400 font-bold mt-2">
                            Kalkulasi: ({lastPredictionResult?.daily_demand} × {lastPredictionResult?.predicted_lead_time}) + {lastPredictionResult?.recommended_safety_stock} = {lastPredictionResult?.recommended_rop} unit
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6 border-t" style={{ paddingTop: '1rem' }}>
                    <button 
                      className="btn btn-primary flex-1 btn-sm"
                      onClick={() => {
                        const item = skus.find(s => s.sku_code === predictorSkuCode);
                        if (item) {
                          setReorderModalSku(item);
                          setReorderQtyInput(lastPredictionResult?.recommended_eoq || item.eoq);
                        }
                      }}
                    >
                      Kirim PO Sekarang (EOQ)
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setPredictorPrice(85000);
                        setPredictorQty(150);
                        setPredictorVolume(1000);
                        setLastPredictionResult(null);
                      }}
                    >
                      Reset Form
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ TAB 2: REORDER DASHBOARD ═══ */}
        {activeTab === 'inventory' && (
          <div className="glass-panel p-6">
            {/* Summary Counters */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 stagger-in">
              <div className="p-4 rounded-lg text-center" style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.15)' }}>
                <div className="text-2xl font-bold text-red-400"><AnimatedNumber value={urgentCount} /></div>
                <div className="text-xs text-slate-400 font-semibold">Urgent Reorder</div>
              </div>
              <div className="p-4 rounded-lg text-center" style={{ background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.15)' }}>
                <div className="text-2xl font-bold text-amber-400"><AnimatedNumber value={warningCount} /></div>
                <div className="text-xs text-slate-400 font-semibold">Mendekati ROP</div>
              </div>
              <div className="p-4 rounded-lg text-center" style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                <div className="text-2xl font-bold text-emerald-400"><AnimatedNumber value={safeCount} /></div>
                <div className="text-xs text-slate-400 font-semibold">Stok Aman</div>
              </div>
              <div className="p-4 rounded-lg text-center" style={{ background: 'rgba(168, 85, 247, 0.06)', border: '1px solid rgba(168, 85, 247, 0.15)' }}>
                <div className="text-2xl font-bold text-purple-400"><AnimatedNumber value={overstockCount} /></div>
                <div className="text-xs text-slate-400 font-semibold">Overstock</div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
              <div className="flex flex-wrap gap-3 items-center">
                <div className="relative">
                  <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} size={16} />
                  <input 
                    type="text" 
                    placeholder="Cari SKU atau nama..." 
                    className="form-input pl-9 w-64"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <select className="form-select w-44" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                  <option value="All">Semua Kategori</option>
                  {CATEGORIES.map((c: string) => <option key={c} value={c}>{c}</option>)}
                </select>
                <select className="form-select w-44" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
                  <option value="All">Semua Status</option>
                  <option value="urgent">🔴 Urgent Reorder</option>
                  <option value="warning">🟡 Warning Planning</option>
                  <option value="safe">🟢 Stok Aman</option>
                  <option value="overstock">🟣 Overstock</option>
                </select>
                <select className="form-select w-44" value={sortBy} onChange={e => setSortBy(e.target.value as 'urgency' | 'stock_asc' | 'stock_desc' | 'lead_time')}>
                  <option value="urgency">Urutkan: Prioritas</option>
                  <option value="stock_asc">Stok Terendah</option>
                  <option value="stock_desc">Stok Tertinggi</option>
                  <option value="lead_time">Lead Time Terpanjang</option>
                </select>
              </div>

              {selectedSkuCodes.length > 0 && (
                <button className="btn btn-primary btn-sm" onClick={handleBulkReorder} disabled={isSendingPo}>
                  <Package size={14} /> Bulk Reorder ({selectedSkuCodes.length} SKU)
                </button>
              )}
            </div>

            {/* Table */}
            <div className="table-wrapper">
              <table className="custom-table w-full">
                <thead>
                  <tr>
                    <th className="w-12 text-center">
                      <input 
                        type="checkbox"
                        checked={selectedSkuCodes.length === filteredSkus.length && filteredSkus.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSkuCodes(filteredSkus.map(s => s.sku_code));
                          } else {
                            setSelectedSkuCodes([]);
                          }
                        }}
                      />
                    </th>
                    <th>SKU Code</th>
                    <th>Nama SKU</th>
                    <th>Kategori</th>
                    <th>Current Stock</th>
                    <th>ROP (AI)</th>
                    <th>Status</th>
                    <th>Supplier</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSkus.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center" style={{ padding: '3rem 1rem', color: '#64748b' }}>
                        Tidak ada SKU produk yang cocok dengan pencarian / filter.
                      </td>
                    </tr>
                  ) : (
                    filteredSkus.map(sku => (
                      <tr 
                        key={sku.sku_code}
                        className={selectedSkuCodes.includes(sku.sku_code) ? 'selected-row' : ''}
                      >
                        <td className="text-center">
                          <input 
                            type="checkbox"
                            checked={selectedSkuCodes.includes(sku.sku_code)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedSkuCodes([...selectedSkuCodes, sku.sku_code]);
                              } else {
                                setSelectedSkuCodes(selectedSkuCodes.filter(c => c !== sku.sku_code));
                              }
                            }}
                          />
                        </td>
                        <td className="font-mono text-indigo-400 font-bold">{sku.sku_code}</td>
                        <td>
                          <button 
                            className="text-left font-semibold text-white cursor-pointer hover:text-indigo-300"
                            style={{ background: 'none', border: 'none', fontFamily: 'var(--font-sans)', fontSize: '0.85rem' }}
                            onClick={() => setSelectedSkuDetail(sku)}
                          >
                            {sku.name}
                          </button>
                        </td>
                        <td>{sku.category}</td>
                        <td className="font-bold">{sku.current_stock} Unit</td>
                        <td className="text-indigo-300 font-bold">{sku.rop} Unit</td>
                        <td>
                          <span className={`status-pill ${sku.status}`}>
                            {sku.status === 'urgent' && '🔴 Urgent'}
                            {sku.status === 'warning' && '🟡 Warning'}
                            {sku.status === 'safe' && '🟢 Safe'}
                            {sku.status === 'overstock' && '🟣 Overstock'}
                          </span>
                        </td>
                        <td>{sku.supplier.name}</td>
                        <td className="text-right">
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              setReorderModalSku(sku);
                              setReorderQtyInput(sku.eoq);
                            }}
                          >
                            Reorder
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ═══ TAB 3: RISK ALERT MAP ═══ */}
        {activeTab === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="glass-panel p-6 lg:col-span-2">
              <h3 className="text-lg font-bold mb-2 text-indigo-400 flex items-center gap-2">
                <Activity size={18} /> Peta Kerentanan Stok & Lead Time
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Sumbu X = level stok terkini · Sumbu Y = waktu tunggu pabrik (hari) · Titik merah = zona bahaya stockout.
              </p>

              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis type="number" dataKey="x" name="Stok Sekarang" unit=" unit" stroke="#475569" fontSize={11} />
                    <YAxis type="number" dataKey="y" name="Lead Time" unit=" hari" stroke="#475569" fontSize={11} />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="chart-tooltip">
                              <div className="font-bold text-white mb-1">{data.sku} - {data.name}</div>
                              <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: '4px 0' }} />
                              <div className="text-xs text-slate-400">Stok: <span className="text-white font-bold">{data.x} unit</span></div>
                              <div className="text-xs text-slate-400">Lead Time: <span className="text-white font-bold">{data.y} hari</span></div>
                              <div className="text-xs text-slate-400">ROP: <span className="text-white font-bold">{data.rop} unit</span></div>
                              <div className="text-xs text-slate-400">Supplier: <span className="text-white">{data.supplier}</span></div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter 
                      name="Produk" 
                      data={scatterChartData} 
                      onClick={(node: any) => {
                        const item = skus.find(s => s.sku_code === node.sku);
                        if (item) setSelectedSkuDetail(item);
                      }}
                    >
                      {scatterChartData.map((entry, index) => {
                        let fill = '#10b981';
                        if (entry.status === 'urgent') fill = '#ef4444';
                        else if (entry.status === 'warning') fill = '#f59e0b';
                        else if (entry.status === 'overstock') fill = '#a855f7';

                        return (
                          <Dot 
                            key={`cell-${index}`} 
                            cx={0} cy={0} 
                            r={entry.status === 'urgent' ? 9 : 6} 
                            fill={fill} 
                            style={{ cursor: 'pointer', filter: entry.status === 'urgent' ? `drop-shadow(0 0 6px ${fill})` : 'none' }}
                          />
                        );
                      })}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-center gap-6 mt-4 text-xs">
                <span className="flex items-center gap-1.5"><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span> Urgent</span>
                <span className="flex items-center gap-1.5"><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }}></span> Warning</span>
                <span className="flex items-center gap-1.5"><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span> Safe</span>
                <span className="flex items-center gap-1.5"><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#a855f7', display: 'inline-block' }}></span> Overstock</span>
              </div>
            </div>

            {/* Detail Sidebar */}
            <div className="glass-panel p-6 lg:col-span-1">
              <h3 className="text-lg font-bold mb-4 text-indigo-400 flex items-center gap-2">
                <Info size={18} /> Detail SKU Terpilih
              </h3>
              
              {selectedSkuDetail ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-black text-indigo-400">{selectedSkuDetail.sku_code}</span>
                    <span className={`status-pill ${selectedSkuDetail.status}`}>{selectedSkuDetail.status}</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-6">{selectedSkuDetail.name}</h4>

                  <div className="space-y-3">
                    {[
                      ['Kategori', selectedSkuDetail.category],
                      ['Stok Sekarang', `${selectedSkuDetail.current_stock} Unit`],
                      ['Reorder Point (ROP)', `${selectedSkuDetail.rop} Unit`],
                      ['Estimasi Lead Time', `${selectedSkuDetail.lead_time} Hari`],
                      ['Daily Demand', `${selectedSkuDetail.daily_demand} unit / hari`],
                      ['Safety Stock Buffer', `${selectedSkuDetail.safety_stock} unit`],
                      ['Supplier Pabrik', selectedSkuDetail.supplier.name],
                    ].map(([label, value], i) => (
                      <div key={i} className="flex justify-between text-sm border-b" style={{ padding: '6px 0' }}>
                        <span className="text-slate-400">{label}:</span>
                        <span className={`font-semibold ${label === 'Reorder Point (ROP)' ? 'text-indigo-400' : 'text-white'}`}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button 
                      className="btn btn-primary btn-sm flex-1"
                      onClick={() => {
                        setReorderModalSku(selectedSkuDetail);
                        setReorderQtyInput(selectedSkuDetail.eoq);
                      }}
                    >
                      Reorder Sekarang
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setPredictorSkuCode(selectedSkuDetail.sku_code);
                        setPredictorPrice(selectedSkuDetail.price);
                        setPredictorQty(selectedSkuDetail.eoq);
                        setPredictorVolume(selectedSkuDetail.production_volume);
                        setPredictorInspect(selectedSkuDetail.inspection_status);
                        setPredictorSupplier(selectedSkuDetail.supplier.id);
                        setActiveTab('predictor');
                      }}
                    >
                      Load di Predictor
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <HelpCircle style={{ margin: '0 auto 8px', opacity: 0.3, color: '#64748b' }} size={36} />
                  <p className="text-xs text-slate-500">Klik salah satu titik produk di peta visualisasi untuk menampilkan data metrik operasional.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ TAB 4: ALERTS CENTER ═══ */}
        {activeTab === 'alerts' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preferences */}
            <div className="glass-panel p-6">
              <h3 className="text-lg font-bold mb-4 text-indigo-400 flex items-center gap-2">
                <Sliders size={18} /> Konfigurasi Notifikasi
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg" style={{ background: 'rgba(10, 15, 31, 0.6)', border: '1px solid var(--border-default)' }}>
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      <Bell size={16} /> In-App Notification Toast
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Munculkan banner pop-up instan di dashboard.</div>
                  </div>
                  <input type="checkbox" checked={alertInApp} onChange={e => setAlertInApp(e.target.checked)} />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg" style={{ background: 'rgba(10, 15, 31, 0.6)', border: '1px solid var(--border-default)' }}>
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      <Mail size={16} /> E-mail Digest Harian (07:00 AM)
                    </div>
                    <div className="text-xs text-slate-400 mt-1">Kirim ringkasan SKU kritis langsung ke inbox setiap pagi.</div>
                  </div>
                  <input type="checkbox" checked={alertEmail} onChange={e => setAlertEmail(e.target.checked)} />
                </div>

                <div className="p-4 rounded-lg" style={{ background: 'rgba(10, 15, 31, 0.6)', border: '1px solid var(--border-default)' }}>
                  <div className="font-bold text-white mb-2 flex items-center gap-2">
                    <Clock size={16} /> Quiet Hours (22:00 - 06:00)
                  </div>
                  <div className="text-xs text-slate-400 mb-3">Tunda pengiriman notifikasi instan selama jam istirahat malam.</div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" id="quiet-hours"
                      checked={quietHoursEnabled} 
                      onChange={e => setQuietHoursEnabled(e.target.checked)}
                    />
                    <label htmlFor="quiet-hours" className="text-xs text-slate-300 cursor-pointer">Aktifkan Jam Sunyi</label>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ background: 'rgba(10, 15, 31, 0.6)', border: '1px solid var(--border-default)' }}>
                  <div className="font-bold text-white mb-3">Sensitivitas Batas ROP</div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Aggressive', 'Normal', 'Conservative'] as const).map(mode => (
                      <button
                        key={mode}
                        type="button"
                        className={`btn text-xs btn-sm ${alertSensitivity === mode ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => {
                          setAlertSensitivity(mode);
                          triggerToast('info', 'Sensitivitas Diubah', `Model sensitivitas ROP diatur ke ${mode}.`);
                        }}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Alert History */}
            <div className="glass-panel p-6">
              <h3 className="text-lg font-bold mb-4 text-indigo-400 flex items-center gap-2">
                <ShieldAlert size={18} /> Log Riwayat Notifikasi
              </h3>
              
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {alerts.map(a => (
                  <div 
                    key={a.alert_id} 
                    className="p-4 rounded-lg text-sm"
                    style={{
                      background: a.priority === 'critical' ? 'rgba(239, 68, 68, 0.04)' : 
                                  a.priority === 'high' ? 'rgba(245, 158, 11, 0.04)' : 'rgba(10, 15, 31, 0.4)',
                      border: `1px solid ${a.priority === 'critical' ? 'rgba(239, 68, 68, 0.15)' : 
                                           a.priority === 'high' ? 'rgba(245, 158, 11, 0.15)' : 'var(--border-default)'}`,
                    }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-bold ${a.priority === 'critical' ? 'text-red-400' : 'text-slate-200'}`}>
                        {a.message}
                      </span>
                      <span className="text-xs text-slate-500">{timeAgo(a.timestamp)}</span>
                    </div>
                    {a.action_taken && (
                      <div className="text-xs text-emerald-400 mt-2 p-2 rounded" style={{ background: 'rgba(16, 185, 129, 0.04)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                        <strong>Langkah Diambil:</strong> {a.action_taken} · <strong>Outcome:</strong> {a.outcome}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="site-footer container relative z-10">
        <div className="footer-brand">
          <div className="nav-brand-icon" style={{ width: 28, height: 28, fontSize: '0.8rem' }}>⚡</div>
          <span className="font-bold text-sm">Supply Chain Oracle</span>
        </div>
        <p className="footer-text">
          AI-Powered Inventory & Lead Time Prediction Platform<br />
          Built with XGBoost Regressor + FastAPI + React
        </p>
        <div className="footer-links">
          <button className="footer-link" onClick={() => document.getElementById('workbench')?.scrollIntoView({ behavior: 'smooth' })}>Dashboard</button>
          <button className="footer-link" onClick={() => document.getElementById('roi-calc')?.scrollIntoView({ behavior: 'smooth' })}>ROI Calculator</button>
          <button className="footer-link" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>Features</button>
        </div>
        <p className="footer-text mt-4" style={{ opacity: 0.5 }}>
          © 2026 Supply Chain Oracle. Platform MLOps Deployment.
        </p>
      </footer>

      {/* ═══ REORDER MODAL ═══ */}
      {reorderModalSku && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="text-lg font-bold">Buat Purchase Order Baru</h3>
              <button className="modal-close" onClick={() => setReorderModalSku(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="mb-4">
                <span className="text-xs text-slate-400 uppercase tracking-wider">SKU</span>
                <h4 className="text-lg font-bold text-white">{reorderModalSku.sku_code} - {reorderModalSku.name}</h4>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-xs text-slate-400" style={{ display: 'block' }}>Stok Saat Ini</span>
                  <span className="font-bold text-white">{reorderModalSku.current_stock} Unit</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400" style={{ display: 'block' }}>Lead Time Pabrik</span>
                  <span className="font-bold text-white">{reorderModalSku.lead_time} Hari</span>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label text-xs">Jumlah Unit yang Dipesan</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="number" className="form-input text-center font-bold"
                    value={reorderQtyInput}
                    onChange={e => setReorderQtyInput(Math.max(1, parseInt(e.target.value) || 0))}
                  />
                  <button className="btn btn-secondary btn-sm" onClick={() => setReorderQtyInput(reorderModalSku.eoq)}>
                    EOQ ({reorderModalSku.eoq})
                  </button>
                </div>
              </div>
              <div className="p-4 rounded-lg" style={{ background: 'rgba(10, 15, 31, 0.8)', border: '1px solid var(--border-default)' }}>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-slate-400">Supplier:</span>
                  <span className="text-white font-semibold">{reorderModalSku.supplier.name}</span>
                </div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-slate-400">Harga Satuan:</span>
                  <span className="text-white font-semibold">{formatCurrency(reorderModalSku.price)}</span>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid var(--border-default)', margin: '8px 0' }} />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-white">Estimasi Total Biaya:</span>
                  <span className="text-lg font-bold text-amber-400">{formatCurrency(reorderModalSku.price * reorderQtyInput)}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setReorderModalSku(null)} disabled={isSendingPo}>Batal</button>
              <button className="btn btn-primary btn-sm" onClick={handleConfirmReorder} disabled={isSendingPo}>
                {isSendingPo ? <><RefreshCw className="animate-spin" size={14} /> Mengirim...</> : 'Kirim PO ke Supplier'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ TOAST SYSTEM ═══ */}
      <div className="toasts-holder">
        {toasts.map(t => (
          <div key={t.id} className={`toast-item ${t.type}`}>
            <span style={{ fontSize: '1.1rem' }}>
              {t.type === 'success' && '✅'}
              {t.type === 'error' && '❌'}
              {t.type === 'warning' && '⚠️'}
              {t.type === 'info' && 'ℹ️'}
            </span>
            <div>
              <div className="font-bold text-xs">{t.title}</div>
              {t.message && <div className="text-xs text-slate-400 mt-0.5">{t.message}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
