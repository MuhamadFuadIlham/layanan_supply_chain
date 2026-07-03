import React from 'react';
import { motion } from 'framer-motion';
import { Warehouse } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { warehouseData } from '../../data/dashboardData';

// Progress Ring SVG
function ProgressRing({ value, max = 100, color, size = 80 }: { value: number; max?: number; color: string; size?: number }) {
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const offset = circ * (1 - pct);

  return (
    <svg width={size} height={size}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={7} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={7}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
      />
      <text x={size / 2} y={size / 2 + 4} textAnchor="middle" style={{ fill: 'white', fontSize: size < 70 ? 11 : 14, fontWeight: 800, fontFamily: 'Inter, sans-serif' }}>
        {value.toFixed(1)}%
      </text>
    </svg>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="chart-tooltip-dark">
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'white', marginBottom: 4 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ fontSize: '0.7rem', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ color: p.fill || 'var(--text-muted)' }}>{p.name}</span>
          <span style={{ fontWeight: 700, color: 'white' }}>{p.value}%</span>
        </div>
      ))}
    </div>
  );
};

export function WarehousePerformanceSection() {
  const overall = warehouseData[0]; // Primary warehouse

  return (
    <motion.div className="section-card" id="section-warehouse" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="section-card-header">
        <div>
          <div className="section-card-title">
            <Warehouse size={16} color="var(--accent-primary)" />
            Warehouse Performance
          </div>
          <div className="section-card-subtitle">Efisiensi operasional gudang — fulfillment rate, akurasi, kapasitas</div>
        </div>
      </div>

      <div className="section-card-body">
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'start' }}>
          {/* Rings */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: 16, alignItems: 'center' }}>
            {[
              { label: 'Order Fulfillment', value: overall.fulfillment, color: '#10b981' },
              { label: 'Pick Accuracy', value: overall.accuracy, color: '#6366f1' },
              { label: 'Kapasitas Terisi', value: overall.capacity, color: '#f59e0b' },
              { label: 'On-Time Ship', value: 96.4, color: '#22d3ee' },
            ].map(ring => (
              <div key={ring.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <ProgressRing value={ring.value} color={ring.color} size={88} />
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textAlign: 'center', fontWeight: 600, maxWidth: 80 }}>
                  {ring.label}
                </div>
              </div>
            ))}
          </div>

          {/* Bar chart per warehouse */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 12 }}>
              Fulfillment Rate per Lokasi Gudang
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={warehouseData} barSize={28} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 9.5, fill: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}
                  axisLine={false} tickLine={false}
                />
                <YAxis
                  domain={[80, 100]} tick={{ fontSize: 9, fill: 'var(--text-muted)' }}
                  axisLine={false} tickLine={false} unit="%" tickCount={5}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="fulfillment" name="Fulfillment" radius={[4, 4, 0, 0]}>
                  {warehouseData.map((entry, i) => (
                    <Cell key={i} fill={entry.fulfillment >= 95 ? '#10b981' : entry.fulfillment >= 90 ? '#f59e0b' : '#ef4444'} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
