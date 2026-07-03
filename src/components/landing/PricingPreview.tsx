import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../../lib/animations';

export const PricingPreview: React.FC = () => {
  return (
    <section className="container py-24 relative z-10" id="pricing">
      <motion.div 
        className="text-center mb-16"
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
          ◈ Harga & Paket
        </motion.div>

        <motion.h2
          variants={fadeUpVariant}
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em', fontWeight: 600 }}
          className="text-3xl md:text-4xl mb-4"
        >
          Investasi yang Kembali Dalam 30 Hari
        </motion.h2>
        <motion.p variants={fadeUpVariant} style={{ color: '#c3c5d7', maxWidth: '38rem', margin: '0 auto' }}>
          Skala harga fleksibel yang dirancang untuk tumbuh bersama efisiensi gudang Anda.
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Tier 1 — Starter / UMKM */}
        <motion.div
          variants={fadeUpVariant}
          className="glass-panel p-8 rounded-2xl"
        >
          <h3
            className="text-xl mb-2"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: '#dfe1f6' }}
          >
            Starter / UMKM
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#8d90a0', marginBottom: '1.5rem' }}>
            Cocok untuk retail dengan gudang tunggal yang ingin mulai teratur.
          </p>
          
          <div className="mb-8">
            <span
              style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 700, color: '#dfe1f6' }}
            >
              Gratis
            </span>
            <span style={{ color: '#8d90a0', marginLeft: '0.25rem' }}>/ selamanya</span>
          </div>
          
          <ul className="space-y-4 mb-8">
            {['Hingga 500 SKU', 'Prediksi ROP & Safety Stock', 'Dashboard Analisis Dasar', 'Email Alerts Mingguan'].map((feature, i) => (
              <li key={i} className="flex items-start gap-3" style={{ fontSize: '0.875rem', color: '#c3c5d7' }}>
                <Check size={16} style={{ color: '#1de0b2', flexShrink: 0, marginTop: '2px' }} />
                {feature}
              </li>
            ))}
          </ul>
          
          <button className="btn w-full btn-secondary">Mulai Gratis Sekarang</button>
        </motion.div>

        {/* Tier 2 — Growth (featured — ai-insight-card style) */}
        <motion.div
          variants={fadeUpVariant}
          className="ai-insight-card p-8 rounded-2xl relative overflow-hidden"
          style={{ transform: 'translateY(-8px)' }}
        >
          {/* Top gradient bar */}
          <div
            className="absolute top-0 inset-x-0 h-[2px]"
            style={{ background: 'linear-gradient(90deg, #648aff, #c4c0ff, #1de0b2)' }}
          />

          {/* "Paling Populer" badge — JetBrains Mono */}
          <div
            className="absolute top-4 right-4 rounded-full px-3 py-1"
            style={{
              background: 'rgba(100,138,255,0.12)',
              border: '1px solid rgba(100,138,255,0.25)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: '#b5c4ff',
            }}
          >
            PALING POPULER
          </div>

          {/* AI processing indicator */}
          <div
            className="inline-flex items-center gap-1.5 mb-4"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.05em',
              color: '#c4c0ff',
            }}
          >
            <Sparkles size={9} />
            AI-POWERED
          </div>
          
          <h3
            className="text-xl mb-2"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: '#dfe1f6' }}
          >
            Growth
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#8d90a0', marginBottom: '1.5rem' }}>
            Untuk distributor dengan multi-lokasi dan perputaran cepat.
          </p>
          
          <div className="mb-8">
            <span
              style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 700, color: '#dfe1f6' }}
            >
              Rp 2.5jt
            </span>
            <span style={{ color: '#8d90a0', marginLeft: '0.25rem' }}>/ bulan</span>
          </div>
          
          <ul className="space-y-4 mb-8">
            {['SKU Tanpa Batas', 'XGBoost Prediktif Lead Time', 'Integrasi API ERP', 'Smart Alert Real-Time (WA/App)', 'Auto-Generate PO'].map((feature, i) => (
              <li key={i} className="flex items-start gap-3" style={{ fontSize: '0.875rem', color: '#c3c5d7' }}>
                <Check size={16} style={{ color: '#b5c4ff', flexShrink: 0, marginTop: '2px' }} />
                {feature}
              </li>
            ))}
          </ul>
          
          <button className="btn w-full btn-primary">Coba Demo Gratis 14 Hari</button>
        </motion.div>
      </motion.div>
    </section>
  );
};
