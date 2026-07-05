import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckSquare, AlertCircle, ShoppingCart } from 'lucide-react';

export function DecisionEnginePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="glass-panel" style={{ padding: '24px', margin: '24px', textAlign: 'center' }}>
        <AlertCircle size={48} className="text-amber-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Belum ada Keputusan</h2>
        <p className="text-slate-400 mb-6">Jalankan prediksi terlebih dahulu untuk melihat hasil Decision Engine.</p>
        <button className="btn btn-primary" onClick={() => navigate('/app/input')}>Mulai Prediksi</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <CheckSquare size={20} className="text-indigo-400" /> Decision Engine Action
      </h2>

      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Rekomendasi Pemesanan</h3>
            
            <div className="p-4 rounded-lg bg-indigo-900/20 border border-indigo-500/30 mb-4">
              <div className="text-xs text-indigo-300 mb-1">Reorder Point (ROP)</div>
              <div className="text-2xl font-bold text-white">{result.calculated_rop_units} Unit</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 mb-4">
              <div className="text-xs text-slate-400 mb-1">Safety Stock Base</div>
              <div className="text-lg font-bold text-white">5 Unit</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="text-xs text-slate-400 mb-1">Priority Level</div>
              <div className="text-lg font-bold text-amber-400">High</div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Tindakan Selanjutnya</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Berdasarkan prediksi {result.predicted_lead_time_days} hari waktu tunggu pabrik, sistem merekomendasikan untuk 
              menyiapkan Purchase Order (PO) segera setelah stok gudang mendekati angka ROP ({result.calculated_rop_units} unit).
            </p>
            
            <div className="flex flex-col gap-3">
              <button className="btn btn-primary flex items-center justify-center gap-2" style={{ padding: '16px' }} onClick={() => alert('PO Approval dikirim ke sistem ERP.')}>
                <ShoppingCart size={18} /> Approve & Generate PO
              </button>
              <button className="btn btn-secondary flex items-center justify-center gap-2" style={{ padding: '16px' }} onClick={() => navigate('/app/simulasi')}>
                Jalankan Simulasi Ulang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
