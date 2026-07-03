import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../../lib/animations';

interface FinalCTASectionProps {
  onShowWorkbench: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onShowWorkbench }) => {
  return (
    <section className="container py-32 relative z-10">
      <motion.div 
        className="glass-panel p-12 md:p-16 rounded-[2.5rem] text-center relative overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {/* Background gradient overlay — token warna DESIGN.md */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(100,138,255,0.12) 0%, rgba(56,38,205,0.10) 50%, rgba(29,224,178,0.08) 100%)',
          }}
        />
        {/* Radial center glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0"
          style={{
            width: '80%',
            height: '80%',
            background: 'radial-gradient(ellipse at center, rgba(100,138,255,0.12) 0%, transparent 70%)',
          }}
        />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          {/* AI indicator — JetBrains Mono */}
          <motion.div
            variants={fadeUpVariant}
            className="inline-flex items-center gap-2 mb-6 rounded-full px-4 py-2"
            style={{
              background: 'rgba(196,192,255,0.08)',
              border: '1px solid rgba(196,192,255,0.18)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.06em',
              color: '#c4c0ff',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={11} />
            Supply Chain Intelligence Platform
          </motion.div>

          <motion.h2
            variants={fadeUpVariant}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: '#dfe1f6',
              marginBottom: '1.5rem',
            }}
          >
            Satu Dashboard.<br />
            Satu Keputusan Lebih Baik.
          </motion.h2>

          <motion.p
            variants={fadeUpVariant}
            style={{ fontSize: '1.05rem', color: '#c3c5d7', marginBottom: '2.5rem', lineHeight: 1.75 }}
          >
            Berhenti membuang waktu dengan kompilasi data manual. Bergabung dengan ekosistem supply chain modern hari ini.
          </motion.p>

          <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn btn-primary btn-lg" onClick={onShowWorkbench}>
              Mulai Gratis Sekarang
            </button>
            <button className="btn btn-secondary btn-lg" onClick={onShowWorkbench}>
              Jadwalkan Demo
            </button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
