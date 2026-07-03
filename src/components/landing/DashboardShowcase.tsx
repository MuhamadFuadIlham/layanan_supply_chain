import React from 'react';
import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../../lib/animations';

export const DashboardShowcase: React.FC = () => {
  return (
    <section className="container py-24 relative z-10" id="showcase">
      <motion.div 
        className="text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2 variants={fadeUpVariant} className="text-3xl md:text-4xl font-bold mb-4">
          Visualisasi yang Jelas. <br />Aksi yang Nyata.
        </motion.h2>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl border border-indigo-500/20 bg-[#0a0f1f]/80 p-4 md:p-8 shadow-2xl mx-auto max-w-5xl"
      >
        {/* Placeholder for actual dashboard screenshot */}
        <div className="aspect-video rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden relative">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-emerald-500/5 mix-blend-overlay"></div>
           <span className="text-slate-500 text-sm font-mono">Mockup Interactive Decision Control Center</span>
        </div>
      </motion.div>
    </section>
  );
};
