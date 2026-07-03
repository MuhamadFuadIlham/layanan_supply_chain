import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Package, ArrowRight } from 'lucide-react';
import { fadeUpVariant, hoverCardVariant, staggerContainer } from '../../lib/animations';

export const FeatureDeepDive: React.FC = () => {
  return (
    <section className="container py-24 relative z-10" id="features">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Forecast Engine Card */}
        <motion.div variants={fadeUpVariant} whileHover="hover" className="glass-panel p-8 md:p-10 rounded-[2rem] flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent z-0 pointer-events-none"></div>
          
          <div className="relative z-10 mb-8">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4">XGBoost Forecast Engine</h3>
            <p className="text-slate-400 mb-6 line-clamp-3">
              Katakan selamat tinggal pada rata-rata bergerak (moving average) yang kuno. Mesin prediktif kami memodelkan volatilitas permintaan dengan akurasi 94%, memperhitungkan lead time supplier dan penundaan.
            </p>
            <button className="flex items-center gap-2 text-indigo-400 font-bold text-sm hover:text-indigo-300 transition-colors">
              Pelajari teknologi prediksi kami <ArrowRight size={16} />
            </button>
          </div>
          
          {/* Mockup visual */}
          <div className="relative z-10 mt-auto h-40 bg-slate-900/80 rounded-xl border border-[rgba(255,255,255,0.05)] overflow-hidden p-4 flex items-end gap-2 group-hover:border-indigo-500/30 transition-colors">
            {/* Simple CSS Chart */}
            {[20, 30, 25, 45, 65, 55, 80, 70, 95, 85].map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-sm opacity-80" style={{ height: `${h}%` }}></div>
            ))}
            {/* Trend line SVG mock */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,80 Q10,70 20,75 T40,55 T60,45 T80,30 T100,15" fill="none" stroke="rgba(34, 211, 238, 0.8)" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
          </div>
        </motion.div>

        {/* Inventory Optimization Card */}
        <motion.div variants={fadeUpVariant} whileHover="hover" className="glass-panel p-8 md:p-10 rounded-[2rem] flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/5 to-transparent z-0 pointer-events-none"></div>
          
          <div className="relative z-10 mb-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
              <Package size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Dynamic Inventory Control</h3>
            <p className="text-slate-400 mb-6 line-clamp-3">
              Safety stock yang statis seringkali merugikan. Oracle menghitung ulang Reorder Point (ROP) dan Economic Order Quantity (EOQ) secara dinamis setiap hari berdasarkan kondisi real-time.
            </p>
            <button className="flex items-center gap-2 text-emerald-400 font-bold text-sm hover:text-emerald-300 transition-colors">
              Lihat simulasi ROP <ArrowRight size={16} />
            </button>
          </div>
          
          {/* Mockup visual */}
          <div className="relative z-10 mt-auto h-40 bg-slate-900/80 rounded-xl border border-[rgba(255,255,255,0.05)] overflow-hidden p-5 flex flex-col gap-3 group-hover:border-emerald-500/30 transition-colors">
             <div className="flex justify-between items-center text-xs text-slate-400">
               <span>Current Stock</span>
               <span className="text-emerald-400 font-bold">Safe</span>
             </div>
             <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500 w-3/4"></div>
             </div>
             
             <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
               <span>Safety Stock Limit</span>
               <span className="text-rose-400 font-bold">Urgent</span>
             </div>
             <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden relative">
               <div className="h-full bg-rose-500 w-1/4"></div>
               <div className="absolute top-0 bottom-0 left-[35%] w-0.5 bg-white/50"></div>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
