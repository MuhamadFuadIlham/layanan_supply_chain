import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from 'recharts';
import { leadTimeGauge, leadTimeSuppliers } from '../../data/dashboardData';

// SVG Arc Gauge
function Gauge({ current, target, max }: { current: number; target: number; max: number }) {
  const r = 70;
  const cx = 90;
  const cy = 85;
  const startAngle = -210;
  const endAngle = 30;
  const totalArc = endAngle - startAngle;

  const pct = Math.min(current / max, 1);
  const angle = startAngle + totalArc * pct;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const arcPath = (from: number, to: number, inner: number, outer: number) => {
    const fx = cx + outer * Math.cos(toRad(from));
    const fy = cy + outer * Math.sin(toRad(from));
    const tx = cx + outer * Math.cos(toRad(to));
    const ty = cy + outer * Math.sin(toRad(to));
    const ix = cx + inner * Math.cos(toRad(to));
    const iy = cy + inner * Math.sin(toRad(to));
    const jx = cx + inner * Math.cos(toRad(from));
    const jy = cy + inner * Math.sin(toRad(from));
    const large = to - from > 180 ? 1 : 0;
    return `M ${fx} ${fy} A ${outer} ${outer} 0 ${large} 1 ${tx} ${ty} L ${ix} ${iy} A ${inner} ${inner} 0 ${large} 0 ${jx} ${jy} Z`;
  };

  const targetAngle = startAngle + totalArc * (target / max);
  const needleX = cx + (r - 10) * Math.cos(toRad(angle));
  const needleY = cy + (r - 10) * Math.sin(toRad(angle));
  const isOverTarget = current > target;

  return (
    <svg width="180" height="120" className="gauge-svg">
      {/* Track */}
      <path d={arcPath(startAngle, endAngle, r - 18, r)} fill="rgba(255,255,255,0.06)" />
      {/* Fill */}
      <path d={arcPath(startAngle, angle, r - 18, r)} fill={isOverTarget ? '#ef4444' : '#10b981'} opacity={0.8} />
      {/* Target mark */}
      <line
        x1={cx + (r - 20) * Math.cos(toRad(targetAngle))}
        y1={cy + (r - 20) * Math.sin(toRad(targetAngle))}
        x2={cx + (r + 4) * Math.cos(toRad(targetAngle))}
        y2={cy + (r + 4) * Math.sin(toRad(targetAngle))}
        stroke="#22d3ee" strokeWidth={2.5} strokeDasharray="3 2"
      />
      {/* Needle */}
      <line
        x1={cx} y1={cy}
        x2={needleX} y2={needleY}
        stroke="white" strokeWidth={2.5} strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={5} fill="white" />
      {/* Center text */}
      <text x={cx} y={cy - 18} textAnchor="middle" style={{ fill: 'white', fontSize: 22, fontWeight: 800, fontFamily: 'Inter, sans-serif' }}>
        {current}
      </text>
      <text x={cx} y={cy - 4} textAnchor="middle" style={{ fill: 'var(--text-muted)', fontSize: 9, fontFamily: 'Inter, sans-serif' }}>
        hari rata-rata
      </text>
      <text x={cx} y={cy + 28} textAnchor="middle" style={{ fill: '#22d3ee', fontSize: 9, fontFamily: 'Inter, sans-serif' }}>
        Target: {target}h
      </text>
    </svg>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="chart-tooltip-dark">
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'white', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: '0.7rem', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {payload.map((p: any) => (
          <div key={p.dataKey} style={{ color: p.color, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span>{p.name}</span>
            <span style={{ fontWeight: 700 }}>{p.value} hari</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export function LeadTimeSection() {
  return (
    <motion.div className="section-card" id="section-leadtime" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="section-card-header">
        <div>
          <div className="section-card-title">
            <Clock size={16} color="var(--accent-amber)" />
            Lead Time Prediction
          </div>
          <div className="section-card-subtitle">Kapan barang benar-benar akan sampai vs kapan seharusnya sampai</div>
        </div>
      </div>

      <div className="section-card-body">
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32, alignItems: 'center' }}>
          {/* Gauge */}
          <div className="gauge-wrapper">
            <Gauge current={leadTimeGauge.current} target={leadTimeGauge.target} max={leadTimeGauge.max} />
            <div style={{ display: 'flex', gap: 12, fontSize: '0.65rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: '#22d3ee' }} />
                Target ({leadTimeGauge.target}h)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: '#ef4444' }} />
                Aktual ({leadTimeGauge.current}h)
              </div>
            </div>
          </div>

          {/* Bar chart per supplier */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 12 }}>
              Aktual vs Target per Supplier
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={leadTimeSuppliers} layout="vertical" barSize={14} margin={{ left: 0, right: 40 }}>
                <XAxis type="number" tick={{ fontSize: 9, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} unit=" hr" />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} width={110} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine x={leadTimeGauge.target} stroke="#22d3ee" strokeDasharray="4 3" strokeWidth={1.5} />
                <Bar dataKey="target" name="Target" fill="rgba(34,211,238,0.2)" radius={[0, 2, 2, 0]} />
                <Bar dataKey="actual" name="Aktual" radius={[0, 2, 2, 0]}>
                  {leadTimeSuppliers.map((entry, i) => (
                    <Cell key={i} fill={entry.actual > entry.target ? '#ef4444' : '#10b981'} fillOpacity={0.75} />
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
