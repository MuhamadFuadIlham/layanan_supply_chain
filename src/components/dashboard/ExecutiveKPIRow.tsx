import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { KPICard } from './KPICard';
import type { KPIData } from '../../data/dashboardData';

interface ExecutiveKPIRowProps {
  kpis: KPIData[];
}

export function ExecutiveKPIRow({ kpis }: ExecutiveKPIRowProps) {
  const [showSecondary, setShowSecondary] = useState(false);
  const primary = kpis.slice(0, 4);
  const secondary = kpis.slice(4);

  return (
    <div style={{ marginBottom: 24 }}>
      {/* Primary */}
      <div className="kpi-grid">
        {primary.map((kpi, i) => (
          <KPICard key={kpi.id} kpi={kpi} delay={i * 0.07} />
        ))}
      </div>

      {/* Toggle secondary */}
      {secondary.length > 0 && (
        <>
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <button
              onClick={() => setShowSecondary(s => !s)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 16px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-muted)',
                cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                transition: 'all 0.2s ease',
              }}
            >
              {showSecondary ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {showSecondary ? 'Sembunyikan KPI' : `Lihat ${secondary.length} KPI lainnya`}
            </button>
          </div>

          <AnimatePresence>
            {showSecondary && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div className="kpi-grid-secondary" style={{ marginTop: 16 }}>
                  {secondary.map((kpi, i) => (
                    <KPICard key={kpi.id} kpi={kpi} delay={i * 0.06} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
