import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Target, Sparkles } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../../lib/animations';

export const SolutionSection: React.FC = () => {
  return (
    <section className="container py-24 relative z-10" id="solution">
      <div
        className="absolute inset-0 pointer-events-none rounded-[3rem]"
        style={{ background: 'linear-gradient(to bottom, rgba(100,138,255,0.06) 0%, transparent 100%)' }}
      />
      
      <motion.div 
        className="text-center mb-16 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Section label — JetBrains Mono */}
        <motion.div
          variants={fadeUpVariant}
          className="inline-block mb-4"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: '#1de0b2',
            textTransform: 'uppercase',
          }}
        >
          ✦ Solusi Oracle
        </motion.div>

        <motion.h2
          variants={fadeUpVariant}
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em', fontWeight: 600 }}
          className="text-3xl md:text-4xl mb-4"
        >
          Oracle mengubah pola stok mentah<br />
          menjadi{' '}
          <span style={{ color: '#b5c4ff' }}>tindakan yang jelas</span>.
        </motion.h2>
        <motion.p variants={fadeUpVariant} style={{ color: '#c3c5d7', maxWidth: '38rem', margin: '0 auto' }}>
          Berhenti menganalisis data, mulailah mengambil keputusan. Sistem kami memandu Anda kapan harus reorder dan berapa jumlah pastinya.
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Card 1 — Predictive */}
        <motion.div
          variants={fadeUpVariant}
          className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center gap-4"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
            style={{
              background: 'rgba(29,224,178,0.08)',
              border: '1px solid rgba(29,224,178,0.22)',
              color: '#1de0b2',
            }}
          >
            <Brain size={26} />
          </div>
          <h3
            className="text-xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: '#dfe1f6' }}
          >
            Prediktif, Bukan Reaktif
          </h3>
          <p style={{ color: '#c3c5d7', fontSize: '0.875rem', lineHeight: 1.65 }}>
            Algoritma kami mengetahui tren sebelum terjadi, memprediksi kapan stok akan habis jauh sebelum alarm gudang Anda berbunyi.
          </p>
          <span className="status-chip optimized">OPTIMIZED</span>
        </motion.div>

        {/* Card 2 — AI Insight (DESIGN.md: secondary border glow + shimmer) */}
        <motion.div
          variants={fadeUpVariant}
          className="ai-insight-card p-8 rounded-2xl flex flex-col items-center text-center gap-4"
        >
          {/* Top accent bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
            style={{ background: 'linear-gradient(90deg, #648aff, #c4c0ff)' }}
          />
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-2 mt-2"
            style={{
              background: 'rgba(100,138,255,0.10)',
              border: '1px solid rgba(181,196,255,0.22)',
              color: '#b5c4ff',
            }}
          >
            <Zap size={26} />
          </div>
          <h3
            className="text-xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: '#dfe1f6' }}
          >
            Rekomendasi Actionable
          </h3>
          <p style={{ color: '#c3c5d7', fontSize: '0.875rem', lineHeight: 1.65 }}>
            Setiap metrik dilengkapi dengan tombol aksi. Lihat "Stok Kritis", lalu klik "Kirim PO" langsung dari platform dalam hitungan detik.
          </p>
          {/* AI live indicator */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
            style={{
              background: 'rgba(196,192,255,0.08)',
              border: '1px solid rgba(196,192,255,0.20)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.05em',
              color: '#c4c0ff',
            }}
          >
            <Sparkles size={10} />
            AI PROCESSING LIVE
          </div>
        </motion.div>

        {/* Card 3 — Easy Adoption */}
        <motion.div
          variants={fadeUpVariant}
          className="glass-panel p-8 rounded-2xl flex flex-col items-center text-center gap-4"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
            style={{
              background: 'rgba(29,224,178,0.08)',
              border: '1px solid rgba(29,224,178,0.22)',
              color: '#1de0b2',
            }}
          >
            <Target size={26} />
          </div>
          <h3
            className="text-xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: '#dfe1f6' }}
          >
            Mudah Diadopsi
          </h3>
          <p style={{ color: '#c3c5d7', fontSize: '0.875rem', lineHeight: 1.65 }}>
            Tidak butuh gelar statistik. Antarmuka yang ramah pengguna memastikan tim Anda bisa langsung menggunakannya sejak hari pertama.
          </p>
          <span className="status-chip optimized">ZERO LEARNING CURVE</span>
        </motion.div>
      </motion.div>
    </section>
  );
};
