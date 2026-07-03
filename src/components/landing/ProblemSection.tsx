import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, TrendingDown } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../../lib/animations';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: <AlertTriangle size={22} />,
      iconBg: 'rgba(255,180,171,0.10)',
      iconBorder: 'rgba(255,180,171,0.22)',
      iconColor: '#ffb4ab',
      title: 'Stockout Mendadak',
      body: 'Kehabisan stok barang terlaris tepat saat permintaan melonjak, menyebabkan hilangnya potensi pendapatan secara langsung.',
      chipLabel: 'DISRUPTED',
      chipClass: 'status-chip disrupted',
    },
    {
      icon: <TrendingDown size={22} />,
      iconBg: 'rgba(245,158,11,0.10)',
      iconBorder: 'rgba(245,158,11,0.22)',
      iconColor: '#f59e0b',
      title: 'Overstock & Dead Stock',
      body: 'Membeli terlalu banyak karena panik atau prediksi meleset, membuat uang cash Anda tertahan dan ruang gudang terbuang.',
      chipLabel: 'AT RISK',
      chipClass: 'status-chip at-risk',
    },
    {
      icon: <Clock size={22} />,
      iconBg: 'rgba(100,138,255,0.10)',
      iconBorder: 'rgba(100,138,255,0.22)',
      iconColor: '#b5c4ff',
      title: 'Keputusan Lambat',
      body: 'Membutuhkan berjam-jam setiap minggu hanya untuk mengumpulkan data dari berbagai file Excel sebelum berani membuat PO.',
      chipLabel: 'INEFFICIENT',
      chipClass: 'status-chip at-risk',
    },
  ];

  return (
    <section className="container py-24 md:py-32 relative z-10" id="problem">
      <motion.div 
        className="text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Section label — JetBrains Mono per DESIGN.md label-md */}
        <motion.div
          variants={fadeUpVariant}
          className="inline-block mb-4"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: '#ffb4ab',
            textTransform: 'uppercase',
          }}
        >
          ⚠ Tantangan Operasional
        </motion.div>

        <motion.h2
          variants={fadeUpVariant}
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em', fontWeight: 600 }}
          className="text-3xl md:text-4xl mb-4"
        >
          Tebakan Manual Menelan Biaya Besar
        </motion.h2>
        <motion.p variants={fadeUpVariant} style={{ color: '#c3c5d7', maxWidth: '38rem', margin: '0 auto' }}>
          Masalah supply chain sering kali baru disadari setelah terjadi. Jika Anda masih menggunakan insting dan spreadsheet, bisnis Anda menanggung risiko ini setiap hari:
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {problems.map((p, idx) => (
          <motion.div
            key={idx}
            variants={fadeUpVariant}
            className="glass-panel p-8 rounded-2xl flex flex-col items-start gap-4"
          >
            {/* Status chip — DESIGN.md component */}
            <span className={p.chipClass}>{p.chipLabel}</span>

            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: p.iconBg,
                border: `1px solid ${p.iconBorder}`,
                color: p.iconColor,
              }}
            >
              {p.icon}
            </div>
            <h3
              className="text-xl"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: '#dfe1f6' }}
            >
              {p.title}
            </h3>
            <p style={{ color: '#c3c5d7', fontSize: '0.875rem', lineHeight: 1.65 }}>
              {p.body}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
