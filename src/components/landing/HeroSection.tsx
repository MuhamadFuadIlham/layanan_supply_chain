import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, ChevronRight, Activity, Cpu } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../../lib/animations';

interface HeroSectionProps {
  onShowWorkbench: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShowWorkbench }) => {
  return (
    <section className="hero-section">
      <div className="hero-glow"></div>
      <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-12 pt-12 md:pt-20">
        
        {/* Left Copy */}
        <motion.div 
          className="flex-1 text-left"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge — JetBrains Mono per DESIGN.md label-md */}
          <motion.div
            variants={fadeUpVariant}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(100, 138, 255, 0.08)',
              border: '1px solid rgba(181, 196, 255, 0.18)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              color: '#b5c4ff',
              textTransform: 'uppercase',
            }}
          >
            <TrendingUp size={13} />
            AI-Powered Supply Chain Intelligence
          </motion.div>
          
          {/* Heading — Geist font via CSS var(--font-display) */}
          <motion.h1
            variants={fadeUpVariant}
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
            className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6"
          >
            Tahu kapan harus restock.{' '}
            <br className="hidden md:block" />
            <span className="gradient-text">Sebelum pelanggan tahu</span>{' '}
            <br className="hidden md:block" />
            Anda kehabisan.
          </motion.h1>
          
          <motion.p
            variants={fadeUpVariant}
            style={{ color: '#c3c5d7', fontSize: '1.05rem', lineHeight: 1.75 }}
            className="mb-8 max-w-xl"
          >
            The Supply Chain Oracle adalah platform yang mengubah data stok mentah menjadi keputusan bisnis yang jelas — tanpa memerlukan tim data scientist.
          </motion.p>
          
          <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-4">
            <button className="btn btn-primary btn-lg group" onClick={onShowWorkbench}>
              Mulai Gratis <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Lihat Cara Kerja
            </button>
          </motion.div>
        </motion.div>

        {/* Right Visual / Dashboard Mockup Preview */}
        <motion.div 
          className="flex-1 w-full max-w-2xl relative"
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
        >
          <div
            className="relative rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center p-6"
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(27,31,46,0.75)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(100,138,255,0.08) 0%, transparent 60%)' }}
            />
            
            {/* Mockup Dashboard UI */}
            <div className="w-full h-full flex flex-col gap-4">
               {/* Header mock */}
               <div className="flex justify-between items-center mb-2">
                 <div className="w-32 h-6 rounded-md" style={{ background: 'rgba(53,56,73,0.7)' }}></div>
                 <div className="w-10 h-10 rounded-full" style={{ background: 'rgba(53,56,73,0.7)' }}></div>
               </div>
               
               {/* KPI Cards mock — token warna DESIGN.md */}
               <div className="grid grid-cols-2 gap-4">
                 <div
                   className="h-28 rounded-xl p-4 relative overflow-hidden"
                   style={{
                     background: 'rgba(100,138,255,0.08)',
                     border: '1px solid rgba(100,138,255,0.20)',
                   }}
                 >
                    <div className="text-xs font-bold mb-2" style={{ fontFamily: 'var(--font-mono)', color: '#b5c4ff', letterSpacing: '0.04em' }}>LEAD TIME</div>
                    <div className="text-3xl font-black" style={{ color: '#648aff' }}>14 <span className="text-sm font-normal">Hari</span></div>
                    <div className="absolute -bottom-4 -right-4" style={{ color: 'rgba(100,138,255,0.15)' }}><Activity size={64} /></div>
                 </div>
                 <div
                   className="h-28 rounded-xl p-4 relative overflow-hidden"
                   style={{
                     background: 'rgba(29,224,178,0.08)',
                     border: '1px solid rgba(29,224,178,0.20)',
                   }}
                 >
                    <div className="text-xs font-bold mb-2" style={{ fontFamily: 'var(--font-mono)', color: '#1de0b2', letterSpacing: '0.04em' }}>REORDER PT.</div>
                    <div className="text-3xl font-black" style={{ color: '#1de0b2' }}>320 <span className="text-sm font-normal">Unit</span></div>
                    <div className="absolute -bottom-4 -right-4" style={{ color: 'rgba(29,224,178,0.15)' }}><Zap size={64} /></div>
                 </div>
               </div>

               {/* Chart mock — bar chart dengan warna token */}
               <div
                 className="flex-1 rounded-xl p-4 flex items-end gap-2"
                 style={{ background: 'rgba(10,13,28,0.60)', border: '1px solid rgba(255,255,255,0.06)' }}
               >
                 {[40, 60, 30, 80, 50, 90, 45, 70, 85, 100].map((h, i) => (
                   <div
                     key={i}
                     className="flex-1 rounded-t-sm"
                     style={{
                       height: `${h}%`,
                       background: h > 75
                         ? 'rgba(29,224,178,0.35)'
                         : 'rgba(100,138,255,0.20)',
                     }}
                   />
                 ))}
               </div>
            </div>

            {/* Floating Metric 1 — Stockout reduction */}
            <motion.div 
              className="absolute -left-6 top-1/4 p-3 rounded-xl backdrop-blur-md shadow-xl flex items-center gap-3"
              style={{ background: 'rgba(27,31,46,0.92)', border: '1px solid rgba(29,224,178,0.20)' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(29,224,178,0.12)', color: '#1de0b2' }}
              >
                <TrendingUp size={16} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#8d90a0', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Stockout</div>
                <div className="text-sm font-bold" style={{ color: '#dfe1f6' }}>↓ 32%</div>
              </div>
            </motion.div>

            {/* Floating Metric 2 — Forecast Accuracy */}
            <motion.div 
              className="absolute -right-6 bottom-1/4 p-3 rounded-xl backdrop-blur-md shadow-xl flex items-center gap-3"
              style={{ background: 'rgba(27,31,46,0.92)', border: '1px solid rgba(100,138,255,0.20)' }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(100,138,255,0.12)', color: '#648aff' }}
              >
                <Cpu size={16} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#8d90a0', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Forecast Acc.</div>
                <div className="text-sm font-bold" style={{ color: '#dfe1f6' }}>94%</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
