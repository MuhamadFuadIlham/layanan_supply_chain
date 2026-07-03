import React from 'react';
import { motion } from 'framer-motion';
import { Database, MessageSquare, Link } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../../lib/animations';

const steps = [
  {
    num: '01',
    icon: <Database size={26} />,
    color: '#b5c4ff',
    colorRgb: '100,138,255',
    title: 'Hubungkan Data',
    body: 'Upload file Excel Anda atau integrasikan API sistem ERP dalam beberapa klik.',
  },
  {
    num: '02',
    icon: <MessageSquare size={26} />,
    color: '#1de0b2',
    colorRgb: '29,224,178',
    title: 'Oracle Menganalisis',
    body: 'Model AI kami memetakan tren historis, anomali, dan seasonality stok Anda secara instan.',
  },
  {
    num: '03',
    icon: <Link size={26} />,
    color: '#c4c0ff',
    colorRgb: '196,192,255',
    title: 'Dapatkan Rekomendasi',
    body: 'Mulai terima notifikasi harian produk mana yang harus di-restock dan berapa jumlahnya.',
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="container py-24 relative z-10" id="how-it-works">
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
            color: '#b5c4ff',
            textTransform: 'uppercase',
          }}
        >
          → Cara Kerja
        </motion.div>

        <motion.h2
          variants={fadeUpVariant}
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em', fontWeight: 600 }}
          className="text-3xl md:text-4xl mb-4"
        >
          Tiga Langkah Menuju Supply Chain Cerdas
        </motion.h2>
        <motion.p variants={fadeUpVariant} style={{ color: '#c3c5d7', maxWidth: '38rem', margin: '0 auto' }}>
          Tidak perlu migrasi berbulan-bulan. Mulai kendalikan inventaris Anda dalam waktu singkat.
        </motion.p>
      </motion.div>

      <div className="relative">
        {/* Connecting line desktop — warna token primary */}
        <div
          className="hidden md:block absolute top-[3.5rem] left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(to right, transparent, rgba(100,138,255,0.25), rgba(29,224,178,0.20), transparent)' }}
        />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {steps.map((step, idx) => (
            <motion.div key={idx} variants={fadeUpVariant} className="flex flex-col items-center text-center">
              {/* Step number + icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 relative"
                style={{
                  background: 'var(--bg-elevated)',
                  border: `1px solid rgba(${step.colorRgb},0.35)`,
                  boxShadow: `0 0 20px rgba(${step.colorRgb},0.15)`,
                  color: step.color,
                }}
              >
                {/* Step number badge — JetBrains Mono */}
                <span
                  className="absolute -top-3 -left-3 w-7 h-7 rounded-full flex items-center justify-center text-white"
                  style={{
                    background: `rgba(${step.colorRgb},1)`,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                  }}
                >
                  {step.num}
                </span>
                {step.icon}
              </div>

              <h3
                className="text-xl mb-3"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: '#dfe1f6' }}
              >
                {step.title}
              </h3>
              <p style={{ color: '#c3c5d7', fontSize: '0.875rem', lineHeight: 1.65 }}>
                {step.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
