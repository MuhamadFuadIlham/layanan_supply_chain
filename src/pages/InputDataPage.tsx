import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, RefreshCw, FileInput } from 'lucide-react';

export function InputDataPage() {
  const navigate = useNavigate();
  const [isPredicting, setIsPredicting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    Harga_jual: 150000,
    Jumlah_produk_terjual: 3650,
    Kuantitas_pesanan: 250,
    Volume_produksi_pabrik: 1200,
    Waktu_produksi_pabrik: 5,
    Biaya_produksi_pabrik: 12000000,
    Total_biaya_operasional: 15000000,
    Tingkat_cacat_produk: 1.5,
    Hasil_inspeksi_kualitas: 'Pass',
    Tingkat_stok_gudang: 100, // Added to match backend requirements
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'Hasil_inspeksi_kualitas' ? value : Number(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);

    // Simulate navigating to feature-engineering then inference
    setTimeout(() => {
      // Navigate to inference page with data
      navigate('/app/inference', { state: { requestPayload: formData } });
    }, 1000);
  };

  return (
    <div className="glass-panel" style={{ padding: '24px', margin: '24px' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FileInput size={20} className="text-indigo-400" /> Input Data Prediksi
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.85rem' }}>
        Masukkan feature variabel independen untuk mensimulasikan inferensi model XGBoost.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
        <div className="form-group">
          <label className="form-label">Harga Jual (IDR)</label>
          <input type="number" className="form-input" name="Harga_jual" value={formData.Harga_jual} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Jumlah Produk Terjual (Tahunan)</label>
          <input type="number" className="form-input" name="Jumlah_produk_terjual" value={formData.Jumlah_produk_terjual} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Kuantitas Pesanan (Order Qty)</label>
          <input type="number" className="form-input" name="Kuantitas_pesanan" value={formData.Kuantitas_pesanan} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Volume Produksi Pabrik</label>
          <input type="number" className="form-input" name="Volume_produksi_pabrik" value={formData.Volume_produksi_pabrik} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Waktu Produksi Pabrik (Hari)</label>
          <input type="number" className="form-input" name="Waktu_produksi_pabrik" value={formData.Waktu_produksi_pabrik} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Biaya Produksi Pabrik</label>
          <input type="number" className="form-input" name="Biaya_produksi_pabrik" value={formData.Biaya_produksi_pabrik} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Total Biaya Operasional</label>
          <input type="number" className="form-input" name="Total_biaya_operasional" value={formData.Total_biaya_operasional} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Tingkat Cacat Produk (%)</label>
          <input type="number" step="0.1" className="form-input" name="Tingkat_cacat_produk" value={formData.Tingkat_cacat_produk} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Stok Gudang Terkini</label>
          <input type="number" className="form-input" name="Tingkat_stok_gudang" value={formData.Tingkat_stok_gudang} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label className="form-label">Status Inspeksi QC</label>
          <select className="form-select" name="Hasil_inspeksi_kualitas" value={formData.Hasil_inspeksi_kualitas} onChange={handleChange}>
            <option value="Pass">Pass</option>
            <option value="Pending">Pending</option>
            <option value="Fail">Fail</option>
          </select>
        </div>

        <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }} disabled={isPredicting}>
            {isPredicting ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <RefreshCw className="animate-spin" size={16} /> Meneruskan ke Pipeline AI...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Cpu size={16} /> Submit ke Engine
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
