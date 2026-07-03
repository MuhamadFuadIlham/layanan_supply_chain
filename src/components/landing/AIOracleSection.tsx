import React from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../lib/animations';
import { Bot } from 'lucide-react';

export const AIOracleSection: React.FC = () => {
  return (
    <section className="container py-24 relative z-10">
      <motion.div 
        className="glass-panel p-8 md:p-12 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUpVariant}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-6">
            <Bot size={14} /> AI Oracle Assistant
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Seperti Memiliki Data Scientist 24/7
          </h2>
          <p className="text-slate-400 mb-6">
            Platform kami tidak hanya menyajikan grafik, tapi menceritakan apa arti grafik tersebut. AI Oracle memonitor ribuan SKU secara real-time dan hanya mengingatkan Anda pada hal yang butuh perhatian instan.
          </p>
        </motion.div>
        
        <motion.div variants={fadeUpVariant} className="flex justify-center">
           <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col gap-4 shadow-xl">
             <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex-shrink-0 flex items-center justify-center text-cyan-400">⚡</div>
               <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none text-sm text-slate-300">
                 Stok SK-042 (Biji Kopi Arabica) diprediksi akan habis dalam 14 hari karena lonjakan permintaan akhir pekan.
               </div>
             </div>
             <div className="flex gap-4 flex-row-reverse">
               <div className="bg-indigo-600 p-3 rounded-2xl rounded-tr-none text-sm text-white">
                 Berapa unit yang harus saya pesan?
               </div>
             </div>
             <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex-shrink-0 flex items-center justify-center text-cyan-400">⚡</div>
               <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-none text-sm text-slate-300">
                 Berdasarkan lead time supplier (7 hari), kami merekomendasikan pemesanan sebanyak <strong>320 unit</strong> hari ini.
                 <div className="mt-2 pt-2 border-t border-slate-700">
                   <button className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors">Buat Draft PO →</button>
                 </div>
               </div>
             </div>
           </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
