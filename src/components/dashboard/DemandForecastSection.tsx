import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Filter } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend
} from 'recharts';
import type { ForecastPoint } from '../../data/dashboardData';
import { forecastData7, forecastData30, forecastData90 } from '../../data/dashboardData';

const HORIZONS = ['7 Hari', '30 Hari', '90 Hari'];
const dataMap: Record<string, ForecastPoint[]> = {
  '7 Hari': forecastData7,
  '30 Hari': forecastData30,
  '90 Hari': forecastData90,
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip-dark" style={{ minWidth: 160 }}>
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ fontSize: '0.72rem', color: p.color, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <span>{p.name}</span>
          <span style={{ fontWeight: 700 }}>{p.value?.toLocaleString('id-ID')} unit</span>
        </div>
      ))}
    </div>
  );
};

export function DemandForecastSection() {
  const [horizon, setHorizon] = useState('30 Hari');
  const data = dataMap[horizon];
  const todayIdx = data.findIndex(d => d.actual !== undefined && data[data.indexOf(d) + 1]?.actual === undefined);
  const todayLabel = todayIdx >= 0 ? data[todayIdx].date : undefined;

  return (
    <motion.div
      className="section-card"
      id="section-forecast"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-card-header">
        <div>
          <div className="section-card-title">
            <TrendingUp size={16} color="var(--accent-cyan)" />
            Demand Forecast
          </div>
          <div className="section-card-subtitle">Proyeksi permintaan ke depan berdasarkan model AI — seberapa yakin kita?</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{
            padding: '3px 10px',
            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: 'var(--radius-full)', fontSize: '0.65rem', fontWeight: 700, color: '#34d399',
          }}>
            Forecast Accuracy: 94%
          </div>
          <div className="date-range-tabs">
            {HORIZONS.map(h => (
              <button key={h} className={`date-range-tab ${horizon === h ? 'active' : ''}`} onClick={() => setHorizon(h)}>
                {h}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="section-card-body">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="gradActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradBand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.08} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="date"
              stroke="var(--text-muted)"
              tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
              interval={Math.floor(data.length / 8)}
              axisLine={{ stroke: 'var(--border-default)' }}
              tickLine={false}
            />
            <YAxis
              stroke="var(--text-muted)"
              tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Confidence band */}
            <Area dataKey="upper" stroke="none" fill="url(#gradBand)" fillOpacity={1} legendType="none" />
            <Area dataKey="lower" stroke="none" fill="var(--bg-void)" fillOpacity={1} legendType="none" />

            {/* Actual */}
            <Area
              dataKey="actual"
              name="Aktual"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#gradActual)"
              dot={false}
              activeDot={{ r: 4, fill: '#6366f1', stroke: '#fff', strokeWidth: 1.5 }}
            />

            {/* Forecast */}
            <Area
              dataKey="forecast"
              name="Forecast AI"
              stroke="#22d3ee"
              strokeWidth={2}
              strokeDasharray="6 3"
              fill="url(#gradForecast)"
              dot={false}
              activeDot={{ r: 4, fill: '#22d3ee', stroke: '#fff', strokeWidth: 1.5 }}
            />

            {/* Today line */}
            {todayLabel && (
              <ReferenceLine x={todayLabel} stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" label={{ value: 'Hari Ini', position: 'top', fill: '#94a3b8', fontSize: 10 }} />
            )}
          </AreaChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 20, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            <div style={{ width: 24, height: 2, background: '#6366f1', borderRadius: 1 }} />
            Penjualan Aktual
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            <div style={{ width: 24, height: 2, background: '#22d3ee', borderRadius: 1, borderTop: '2px dashed #22d3ee', opacity: 0.8 }} />
            Forecast AI
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            <div style={{ width: 24, height: 8, background: 'rgba(34,211,238,0.15)', borderRadius: 2 }} />
            Confidence Band
          </div>
        </div>
      </div>
    </motion.div>
  );
}
