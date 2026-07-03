import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../../lib/animations';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
};

export const ROISection: React.FC = () => {
  const [roiSkus, setRoiSkus] = useState(1500);
  const [roiAvgCost, setRoiAvgCost] = useState(800000);

  const calculatedSavings = useMemo(() => {
    const timeSaved = 10 * 4 * 150000;
    const stockoutReduction = 4 * 5000000;
    const inventoryFreed = Math.floor(roiSkus * (roiAvgCost * 0.15));
    const totalPotentialSaved = timeSaved + stockoutReduction + (inventoryFreed * 0.10);
    return { time: timeSaved, stockout: stockoutReduction, freed: inventoryFreed, total: totalPotentialSaved };
  }, [roiSkus, roiAvgCost]);

  return (
    <section className="container py-24 relative z-10" id="roi-calc">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeUpVariant} className="text-3xl md:text-4xl font-bold mb-4">
            Berhenti Menebak,<br/>Mulai <span className="text-emerald-400">Menghasilkan</span>
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="text-slate-400 mb-8 max-w-lg leading-relaxed">
            Keuntungan sejati supply chain ada pada kas yang dibebaskan dari overstock dan hilangnya penjualan akibat stockout. Hitung langsung potensi ROI bisnis Anda dengan beralih ke Oracle AI.
          </motion.p>

          <motion.div variants={fadeUpVariant} className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl font-bold text-white mb-1">↓ 28%</div>
              <div className="text-sm text-slate-400">Rata-rata Pengurangan Biaya Stok Berlebih*</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl font-bold text-white mb-1">↑ 94%</div>
              <div className="text-sm text-slate-400">Akurasi Prediksi Permintaan*</div>
            </div>
          </motion.div>
          <motion.p variants={fadeUpVariant} className="text-xs text-slate-500 mt-4 italic">
            * Berdasarkan simulasi data historis pada industri distribusi ritel menengah.
          </motion.p>
        </motion.div>

        {/* ROI Calculator Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="glass-panel p-8 rounded-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-emerald-400">
            <DollarSign size={20} /> Kalkulator ROI Bisnis Anda
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 relative z-10">
            <div className="form-group mb-0">
              <label className="form-label">Total SKU Terkelola</label>
              <input 
                type="number" 
                className="form-input bg-slate-900/80" 
                value={roiSkus} 
                onChange={e => setRoiSkus(Math.max(1, parseInt(e.target.value) || 0))}
              />
            </div>
            <div className="form-group mb-0">
              <label className="form-label">Rata-rata Nilai Stok per SKU</label>
              <input 
                type="number" 
                className="form-input bg-slate-900/80" 
                value={roiAvgCost} 
                onChange={e => setRoiAvgCost(Math.max(1, parseInt(e.target.value) || 0))}
              />
            </div>
          </div>

          <div className="p-6 rounded-xl relative z-10" style={{ background: 'rgba(10, 15, 31, 0.8)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-slate-400">Efisiensi Waktu (per Bulan):</span>
              <span className="text-white font-semibold">{formatCurrency(calculatedSavings.time)}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-slate-400">Mitigasi Biaya Stockout:</span>
              <span className="text-white font-semibold">{formatCurrency(calculatedSavings.stockout)}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-slate-400">Kas Bebas (dari Overstock):</span>
              <span className="text-amber-400 font-semibold">{formatCurrency(calculatedSavings.freed)}</span>
            </div>
            
            <hr className="border-slate-800 my-4" />
            
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-emerald-400">Total Potensi Keuntungan:</span>
              <span className="text-2xl font-black text-emerald-400">{formatCurrency(calculatedSavings.total)}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
