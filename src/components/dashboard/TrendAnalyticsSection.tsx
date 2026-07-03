import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ChevronDown, ChevronUp } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine
} from 'recharts';
import { trendData } from '../../data/dashboardData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip-dark">
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'white', marginBottom: 6 }}>{label}</div>
      {payload.map((p: any) => (
        p.value > 0 && (
          <div key={p.name} style={{ fontSize: '0.7rem', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ color: p.color }}>{p.name}</span>
            <span style={{ fontWeight: 700, color: 'white' }}>{(p.value / 1000).toFixed(0)}k unit</span>
          </div>
        )
      ))}
    </div>
  );
};

export function TrendAnalyticsSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div className="section-card" id="section-trend" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* Collapse Header */}
      <div className="collapse-section-header" onClick={() => setExpanded(e => !e)}>
        <div>
          <div className="section-card-title">
            <Activity size={16} color="var(--accent-purple)" />
            Trend Analytics
            <span style={{
              marginLeft: 8, padding: '2px 8px',
              background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)',
              borderRadius: 'var(--radius-full)', fontSize: '0.62rem', fontWeight: 700, color: '#c084fc',
            }}>Opsional</span>
          </div>
          <div className="section-card-subtitle" style={{ marginLeft: 24 }}>
            Konteks historis — apakah ini pola baru atau musiman?
          </div>
        </div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="section-card-body" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={trendData} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(v) => <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{v}</span>}
                  />
                  <Line
                    dataKey="tahunLalu"
                    name="Tahun Lalu"
                    stroke="rgba(148,163,184,0.4)"
                    strokeWidth={2}
                    strokeDasharray="6 3"
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                  <Line
                    dataKey="tahunIni"
                    name="Tahun Ini"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: '#6366f1' }}
                    activeDot={{ r: 5 }}
                  />
                  <Line
                    dataKey="forecast"
                    name="Forecast"
                    stroke="#22d3ee"
                    strokeWidth={2}
                    strokeDasharray="5 3"
                    dot={{ r: 3, fill: '#22d3ee' }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              {/* Insight callout */}
              <div style={{
                marginTop: 16, padding: '12px 16px',
                background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)',
                borderRadius: 'var(--radius-md)', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5,
              }}>
                📊 <strong style={{ color: 'var(--text-primary)' }}>Insight:</strong> Permintaan tahun ini konsisten lebih tinggi 18–22% vs tahun lalu di semua bulan — menunjukkan pertumbuhan struktural, bukan efek musiman semata. Forecast Q3 diproyeksikan melanjutkan tren ini.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
