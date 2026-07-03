import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { KPIData } from '../../data/dashboardData';
import { formatRupiah } from '../../data/dashboardData';

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    const startVal = 0;
    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(startVal + (value - startVal) * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [value]);

  const formatted = suffix === 'IDR'
    ? formatRupiah(display)
    : suffix === '/100' || suffix === 'x/thn' || suffix === '%'
    ? `${display.toFixed(suffix === '%' ? 1 : suffix === 'x/thn' ? 1 : 0)}${suffix}`
    : `${Math.round(display).toLocaleString('id-ID')}${suffix}`;

  return <>{formatted}</>;
}

interface KPICardProps {
  kpi: KPIData;
  delay?: number;
}

export function KPICard({ kpi, delay = 0 }: KPICardProps) {
  const trendClass = kpi.trendDir === 'flat' ? 'neutral' : kpi.trendGood === (kpi.trendDir === 'up') ? 'positive' : 'negative';

  return (
    <motion.div
      className={`kpi-card ${kpi.severity || 'safe'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.3 }}>
          {kpi.label}
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: 'var(--radius-md)',
          background: `${kpi.color}18`,
          border: `1px solid ${kpi.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: kpi.color, boxShadow: `0 0 8px ${kpi.color}60` }} />
        </div>
      </div>

      {/* Value */}
      <div className="kpi-value" style={{ color: kpi.color }}>
        <AnimatedNumber value={kpi.value} suffix={kpi.unit} />
      </div>

      {/* Trend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
        <span className={`kpi-trend ${trendClass}`}>
          {kpi.trendDir === 'up' ? <TrendingUp size={10} /> :
           kpi.trendDir === 'down' ? <TrendingDown size={10} /> : <Minus size={10} />}
          {kpi.trend > 0 ? '+' : ''}{kpi.trend}%
        </span>
        {kpi.subtitle && (
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{kpi.subtitle}</span>
        )}
      </div>

      {/* Benchmark */}
      {kpi.benchmark && (
        <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: 6, borderTop: '1px solid var(--border-subtle)', paddingTop: 6 }}>
          {kpi.benchmark}
        </div>
      )}
    </motion.div>
  );
}
