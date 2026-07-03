import React from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../lib/animations';
import { Layers } from 'lucide-react';

export const AdvantageSection: React.FC = () => {
  return (
    <section className="container py-24 relative z-10">
      <motion.div 
        className="glass-panel p-8 md:p-12 rounded-3xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Layers className="text-indigo-400" /> Cara Lama vs Oracle
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
             <h3 className="text-xl font-bold text-rose-400 mb-6 text-center border-b border-slate-800 pb-4">Cara Lama (Spreadsheet)</h3>
             <ul className="space-y-4">
               <li className="flex gap-3 text-slate-400"><span className="text-rose-400 font-bold">✕</span> Rata-rata kasaran untuk memprediksi lead time.</li>
               <li className="flex gap-3 text-slate-400"><span className="text-rose-400 font-bold">✕</span> Safety stock statis yang rawan stockout.</li>
               <li className="flex gap-3 text-slate-400"><span className="text-rose-400 font-bold">✕</span> Keputusan lambat karena harus compile data manual.</li>
             </ul>
          </div>
          
          <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
             <h3 className="text-xl font-bold text-emerald-400 mb-6 text-center border-b border-indigo-500/20 pb-4">Supply Chain Oracle</h3>
             <ul className="space-y-4">
               <li className="flex gap-3 text-white"><span className="text-emerald-400 font-bold">✓</span> XGBoost Regressor memprediksi lead time dengan presisi jam.</li>
               <li className="flex gap-3 text-white"><span className="text-emerald-400 font-bold">✓</span> Dynamic Reorder Point berdasarkan volatilitas data real-time.</li>
               <li className="flex gap-3 text-white"><span className="text-emerald-400 font-bold">✓</span> Rekomendasi action (One-Click PO) langsung di tangan Anda.</li>
             </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
