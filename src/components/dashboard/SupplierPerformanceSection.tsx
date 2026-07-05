import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, Star } from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, Tooltip, Legend
} from 'recharts';
import { supplierRadarData, radarMetrics } from '../../data/dashboardData';
import { ChartSkeleton } from './ChartSkeleton';

const COLORS = ['#6366f1', '#22d3ee', '#10b981', '#f59e0b', '#a855f7'];
const METRIC_LABELS: Record<string, string> = {
  ketepatan: 'Ketepatan Waktu',
  kualitas: 'Kualitas',
  harga: 'Harga',
  responsivitas: 'Responsivitas',
  konsistensi: 'Konsistensi',
};

// Build radar data in recharts format: [{metric, sup1, sup2, ...}]
function buildRadarData(selectedSuppliers: string[]) {
  return radarMetrics.map(metric => {
    const row: Record<string, any> = { metric: METRIC_LABELS[metric] };
    selectedSuppliers.forEach(name => {
      const sup = supplierRadarData.find(s => s.supplier === name);
      row[name] = sup ? sup[metric as keyof typeof sup] : 0;
    });
    return row;
  });
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip-dark" style={{ minWidth: 160 }}>
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'white', marginBottom: 6 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ fontSize: '0.7rem', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ color: p.color }}>{p.name}</span>
          <span style={{ fontWeight: 700, color: 'white' }}>{p.value}/100</span>
        </div>
      ))}
    </div>
  );
};

export function SupplierPerformanceSection() {
  const [selected, setSelected] = useState<Set<string>>(new Set(supplierRadarData.slice(0, 3).map(s => s.supplier)));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const toggleSupplier = (name: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(name)) {
        if (next.size > 1) next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const selectedArr = Array.from(selected);
  const radarData = buildRadarData(selectedArr);
  const sorted = [...supplierRadarData].sort((a, b) => b.score - a.score);

  return (
    <motion.div className="section-card" id="section-supplier" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
      <div className="section-card-header">
        <div>
          <div className="section-card-title">
            <Truck size={16} color="var(--accent-amber)" />
            Supplier Performance
          </div>
          <div className="section-card-subtitle">Perbandingan multi-dimensi — supplier mana yang bisa diandalkan?</div>
        </div>
      </div>

      <div className="section-card-body">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
          {/* Radar */}
          <div>
            {isLoading ? (
              <ChartSkeleton variant="radar" height={320} />
            ) : (
              <>
                {/* Supplier selectors */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {supplierRadarData.map((sup, i) => (
                    <button
                      key={sup.supplier}
                      onClick={() => toggleSupplier(sup.supplier)}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        border: `1px solid ${selected.has(sup.supplier) ? COLORS[i % COLORS.length] + '80' : 'var(--border-default)'}`,
                        background: selected.has(sup.supplier) ? `${COLORS[i % COLORS.length]}18` : 'transparent',
                        color: selected.has(sup.supplier) ? COLORS[i % COLORS.length] : 'var(--text-muted)',
                        fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer',
                        fontFamily: 'var(--font-sans)', transition: 'all 0.2s ease',
                      }}
                    >
                      {sup.supplier.replace('PT ', '').replace('CV ', '').replace('UD ', '')}
                    </button>
                  ))}
                </div>

                <ResponsiveContainer width="100%" height={260}>
                  <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis
                      dataKey="metric"
                      tick={{ fontSize: 10, fill: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    {selectedArr.map((name, i) => (
                      <Radar
                        key={name}
                        name={name}
                        dataKey={name}
                        stroke={COLORS[supplierRadarData.findIndex(s => s.supplier === name) % COLORS.length]}
                        fill={COLORS[supplierRadarData.findIndex(s => s.supplier === name) % COLORS.length]}
                        fillOpacity={0.12}
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    ))}
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      formatter={(v) => <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{v}</span>}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </>
            )}
          </div>

          {/* Ranking list */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 12 }}>
              Ranking Reliability
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {sorted.map((sup, i) => (
                <div key={sup.supplier} className="supplier-rank-item">
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                    background: i === 0 ? 'rgba(245,158,11,0.2)' : i === 1 ? 'rgba(148,163,184,0.15)' : 'rgba(180,120,60,0.1)',
                    color: i === 0 ? '#f59e0b' : i === 1 ? '#94a3b8' : '#b47c3c',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', fontWeight: 800,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                      {sup.supplier}
                    </div>
                    {/* Score bar */}
                    <div style={{ marginTop: 4, height: 3, background: 'var(--border-default)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${sup.score}%`,
                        background: sup.score >= 85 ? '#10b981' : sup.score >= 70 ? '#f59e0b' : '#ef4444',
                        borderRadius: 2, transition: 'width 1s ease',
                      }} />
                    </div>
                  </div>
                  <div style={{
                    fontSize: '0.8rem', fontWeight: 800, flexShrink: 0,
                    color: sup.score >= 85 ? '#34d399' : sup.score >= 70 ? '#fbbf24' : '#f87171',
                  }}>
                    {sup.score}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
