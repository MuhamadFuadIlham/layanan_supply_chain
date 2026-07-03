import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Grid3X3, List, AlertTriangle } from 'lucide-react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { inventoryTreemap, formatRupiah } from '../../data/dashboardData';
import type { TreemapItem } from '../../data/dashboardData';

const statusColors: Record<string, string> = {
  safe: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  overstock: '#a855f7',
  dead: '#475569',
};

const statusLabels: Record<string, string> = {
  safe: 'Aman',
  warning: 'Perhatian',
  danger: 'Kritis',
  overstock: 'Overstock',
  dead: 'Stok Mati',
};

interface TreemapContentProps {
  root?: any;
  depth?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  payload?: TreemapItem;
  colors?: string[];
  rank?: number;
  name?: string;
  onItemClick?: (item: TreemapItem) => void;
}

function CustomTreemapContent({ depth, x, y, width, height, payload, onItemClick }: TreemapContentProps & { onItemClick?: (item: TreemapItem) => void }) {
  if (!payload || !width || !height || width < 30 || height < 30) return null;
  const color = statusColors[payload.status] || '#475569';
  const showText = width > 60 && height > 40;
  const showName = width > 80 && height > 50;

  return (
    <g>
      <rect
        x={x} y={y} width={width} height={height}
        rx={4} ry={4}
        style={{ fill: `${color}22`, stroke: `${color}50`, strokeWidth: 1.5, cursor: 'pointer', transition: 'fill 0.2s ease' }}
        onClick={() => onItemClick?.(payload)}
        onMouseEnter={e => (e.currentTarget.style.fill = `${color}40`)}
        onMouseLeave={e => (e.currentTarget.style.fill = `${color}22`)}
      />
      {showText && (
        <>
          {showName && (
            <text
              x={(x || 0) + (width || 0) / 2}
              y={(y || 0) + (height || 0) / 2 - 8}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fill: 'var(--text-primary)', fontSize: Math.min(11, (width || 0) / 7), fontWeight: 600, fontFamily: 'Inter, sans-serif', pointerEvents: 'none' }}
            >
              {payload.sku}
            </text>
          )}
          <text
            x={(x || 0) + (width || 0) / 2}
            y={(y || 0) + (height || 0) / 2 + (showName ? 8 : 0)}
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fill: color, fontSize: Math.min(10, (width || 0) / 8), fontWeight: 700, fontFamily: 'Inter, sans-serif', pointerEvents: 'none' }}
          >
            {statusLabels[payload.status]}
          </text>
        </>
      )}
    </g>
  );
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.[0]) return null;
  const d: TreemapItem = payload[0].payload;
  const color = statusColors[d.status];
  return (
    <div className="chart-tooltip-dark" style={{ minWidth: 200 }}>
      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white', marginBottom: 4 }}>{d.name}</div>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 8 }}>{d.sku} · {d.category}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontSize: '0.72rem', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ color: 'var(--text-muted)' }}>Stok Saat Ini</span>
          <span style={{ fontWeight: 700, color: 'white' }}>{d.stock.toLocaleString('id-ID')} unit</span>
        </div>
        <div style={{ fontSize: '0.72rem', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ color: 'var(--text-muted)' }}>Nilai Inventory</span>
          <span style={{ fontWeight: 700, color: 'white' }}>{formatRupiah(d.value)}</span>
        </div>
        <div style={{ fontSize: '0.72rem', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ color: 'var(--text-muted)' }}>Reorder Point</span>
          <span style={{ fontWeight: 700, color: 'white' }}>{d.reorderPoint} unit</span>
        </div>
        {d.daysToStockout !== undefined && (
          <div style={{ fontSize: '0.72rem', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ color: 'var(--text-muted)' }}>Habis dalam</span>
            <span style={{ fontWeight: 700, color }}>
              {d.daysToStockout === 0 ? 'HABIS' : `${d.daysToStockout} hari`}
            </span>
          </div>
        )}
      </div>
      <div style={{
        marginTop: 8, padding: '4px 8px', borderRadius: 'var(--radius-sm)',
        background: `${color}15`, color, fontSize: '0.68rem', fontWeight: 700, display: 'inline-flex',
        alignItems: 'center', gap: 4,
      }}>
        ● {statusLabels[d.status]}
      </div>
    </div>
  );
};

interface InventoryHealthSectionProps {
  onItemClick: (item: TreemapItem) => void;
}

export function InventoryHealthSection({ onItemClick }: InventoryHealthSectionProps) {
  const [view, setView] = useState<'treemap' | 'table'>('treemap');

  const statusCount = inventoryTreemap.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedTable = [...inventoryTreemap].sort((a, b) => {
    const priority = { danger: 0, warning: 1, overstock: 2, safe: 3, dead: 4 };
    return (priority[a.status] ?? 5) - (priority[b.status] ?? 5);
  });

  return (
    <motion.div className="section-card" id="section-inventory" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
      <div className="section-card-header">
        <div>
          <div className="section-card-title">
            <Package size={16} color="var(--accent-emerald)" />
            Inventory Health
          </div>
          <div className="section-card-subtitle">SKU mana yang sehat, mana yang berisiko, mana yang mati — ukuran blok = nilai, warna = status</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Status legend */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {Object.entries(statusColors).map(([status, color]) => (
              <div key={status} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
                {statusLabels[status]} ({statusCount[status] || 0})
              </div>
            ))}
          </div>
          <div className="view-toggle">
            <button className={`view-toggle-btn ${view === 'treemap' ? 'active' : ''}`} onClick={() => setView('treemap')}>
              <Grid3X3 size={12} /> Treemap
            </button>
            <button className={`view-toggle-btn ${view === 'table' ? 'active' : ''}`} onClick={() => setView('table')}>
              <List size={12} /> Tabel
            </button>
          </div>
        </div>
      </div>

      <div className="section-card-body">
        {view === 'treemap' ? (
          <div style={{ height: 360 }}>
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={inventoryTreemap}
                dataKey="value"
                aspectRatio={4 / 3}
                content={(props: any) => <CustomTreemapContent {...props} onItemClick={onItemClick} />}
              >
                <Tooltip content={<CustomTooltip />} />
              </Treemap>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="table-wrapper" style={{ maxHeight: 360, overflowY: 'auto' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Nama Produk</th>
                  <th>Kategori</th>
                  <th>Stok</th>
                  <th>Nilai</th>
                  <th>Status</th>
                  <th>Habis (hari)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedTable.map(item => (
                  <tr key={item.id} style={{ cursor: 'pointer' }} onClick={() => onItemClick(item)}>
                    <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', fontWeight: 700, fontSize: '0.78rem' }}>{item.sku}</td>
                    <td style={{ fontWeight: 600 }}>{item.name}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{item.category}</td>
                    <td style={{ fontWeight: 700 }}>{item.stock.toLocaleString('id-ID')}</td>
                    <td>{formatRupiah(item.value)}</td>
                    <td>
                      <span style={{
                        padding: '3px 10px', borderRadius: 'var(--radius-full)',
                        fontSize: '0.68rem', fontWeight: 700,
                        background: `${statusColors[item.status]}15`,
                        color: statusColors[item.status],
                        border: `1px solid ${statusColors[item.status]}30`,
                      }}>
                        {statusLabels[item.status]}
                      </span>
                    </td>
                    <td>
                      {item.daysToStockout !== undefined ? (
                        <span style={{ color: item.daysToStockout <= 3 ? '#ef4444' : item.daysToStockout <= 7 ? '#f59e0b' : 'var(--text-muted)', fontWeight: 700, fontSize: '0.82rem' }}>
                          {item.daysToStockout === 0 ? 'HABIS' : `${item.daysToStockout}h`}
                        </span>
                      ) : '—'}
                    </td>
                    <td>
                      <button className="btn btn-secondary btn-sm" style={{ fontSize: '0.7rem', padding: '4px 10px' }} onClick={e => { e.stopPropagation(); onItemClick(item); }}>
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}
