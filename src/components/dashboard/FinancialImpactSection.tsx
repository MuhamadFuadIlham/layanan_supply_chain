import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { waterfallData, formatRupiah } from '../../data/dashboardData';

// Build waterfall running total
function buildWaterfallBars() {
  let running = 0;
  return waterfallData.map((item, i) => {
    if (item.type === 'start') {
      running = item.value;
      return { ...item, base: 0, bar: item.value, displayValue: item.value };
    } else if (item.type === 'end') {
      return { ...item, base: 0, bar: item.value, displayValue: item.value };
    } else {
      const base = item.value < 0 ? running + item.value : running;
      const bar = Math.abs(item.value);
      running += item.value;
      return { ...item, base, bar, displayValue: item.value };
    }
  });
}

const bars = buildWaterfallBars();

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.[0]) return null;
  const data = bars.find(b => b.name === label);
  if (!data) return null;
  const color = data.color || '#6366f1';
  return (
    <div className="chart-tooltip-dark" style={{ minWidth: 180 }}>
      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'white', marginBottom: 4, lineHeight: 1.3 }}>
        {label.replace('\n', ' ')}
      </div>
      <div style={{ fontSize: '0.72rem', color, fontWeight: 700 }}>
        {data.displayValue >= 0 ? '+' : ''}{formatRupiah(data.displayValue)}
      </div>
    </div>
  );
};

export function FinancialImpactSection() {
  return (
    <motion.div className="section-card" id="section-financial" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
      <div className="section-card-header">
        <div>
          <div className="section-card-title">
            <DollarSign size={16} color="var(--accent-emerald)" />
            Financial Impact
          </div>
          <div className="section-card-subtitle">
            Bagaimana keputusan operasional mentransformasi proyeksi profit — dalam Rupiah
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 2 }}>Proyeksi Akhir</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>
              {formatRupiah(waterfallData.find(d => d.type === 'end')?.value || 0)}
            </div>
          </div>
        </div>
      </div>

      <div className="section-card-body">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={bars} margin={{ top: 24, right: 20, bottom: 20, left: 0 }} barSize={48}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 9.5, fill: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}
              axisLine={{ stroke: 'var(--border-default)' }}
              tickLine={false}
              height={40}
            />
            <YAxis
              tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => formatRupiah(v)}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Invisible base bar for waterfall offset */}
            <Bar dataKey="base" stackId="wf" fill="transparent" />
            {/* Visible colored bar */}
            <Bar dataKey="bar" stackId="wf" radius={[4, 4, 0, 0]}>
              {bars.map((entry, i) => (
                <Cell key={i} fill={entry.color || '#6366f1'} fillOpacity={0.75} />
              ))}
              <LabelList
                dataKey="displayValue"
                position="top"
                formatter={(v: number) => (v >= 0 ? '+' : '') + formatRupiah(v)}
                style={{ fontSize: 9, fill: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 16, marginTop: 8, flexWrap: 'wrap' }}>
          {[
            { color: '#10b981', label: 'Pendapatan / Penghematan' },
            { color: '#ef4444', label: 'Kerugian / Biaya' },
            { color: '#6366f1', label: 'Baseline & Target' },
          ].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: l.color, opacity: 0.75 }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
