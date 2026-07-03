import React from 'react';
import { motion } from 'framer-motion';
import { X, Package, AlertTriangle, BarChart3, ShoppingCart } from 'lucide-react';
import { formatRupiah } from '../../data/dashboardData';
import type { TreemapItem } from '../../data/dashboardData';

interface DetailDrawerProps {
  item: TreemapItem | null;
  onClose: () => void;
}

const statusColors: Record<string, string> = {
  safe: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  overstock: '#a855f7',
  dead: '#475569',
};

const statusLabels: Record<string, string> = {
  safe: 'Stok Aman',
  warning: 'Perlu Perhatian',
  danger: 'Kritis — Segera Reorder',
  overstock: 'Overstock',
  dead: 'Stok Mati (0 Pergerakan)',
};

export function DetailDrawer({ item, onClose }: DetailDrawerProps) {
  if (!item) return null;

  const color = statusColors[item.status] || '#94a3b8';
  const stockPct = Math.min((item.stock / (item.reorderPoint * 3)) * 100, 100);
  const isRisk = item.status === 'danger' || item.status === 'dead';

  return (
    <>
      <div className="detail-drawer-overlay" onClick={onClose} />
      <motion.div
        className="detail-drawer"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px', borderBottom: '1px solid var(--border-default)',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
          background: `${color}08`,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{
                padding: '3px 10px', borderRadius: 'var(--radius-full)',
                fontSize: '0.65rem', fontWeight: 700,
                background: `${color}20`, color, border: `1px solid ${color}40`,
              }}>
                {statusLabels[item.status]}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {item.sku}
              </span>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {item.name}
            </h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>{item.category}</div>
          </div>
          <button className="dash-icon-btn" onClick={onClose} style={{ flexShrink: 0, marginTop: 4 }}>
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Stock level */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Level Stok Saat Ini</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 900, color }}>
                {item.stock.toLocaleString('id-ID')} <span style={{ fontSize: '0.8rem' }}>unit</span>
              </span>
            </div>
            <div style={{ height: 8, background: 'var(--border-default)', borderRadius: 4, overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', background: color, borderRadius: 4 }}
                initial={{ width: 0 }}
                animate={{ width: `${stockPct}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: '0.65rem', color: 'var(--text-dim)' }}>
              <span>0</span>
              <span>ROP: {item.reorderPoint}</span>
              <span>Target: {item.reorderPoint * 3}</span>
            </div>
          </div>

          {/* Key metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'Nilai Inventory', value: formatRupiah(item.value), color: '#a5b4fc' },
              { label: 'Reorder Point', value: `${item.reorderPoint} unit`, color: '#22d3ee' },
              { label: 'Kategori', value: item.category, color: 'var(--text-secondary)' },
              { label: 'Habis Dalam', value: item.daysToStockout !== undefined ? (item.daysToStockout === 0 ? 'HABIS' : `${item.daysToStockout} hari`) : 'N/A', color: item.daysToStockout !== undefined && item.daysToStockout <= 5 ? '#f87171' : 'var(--text-secondary)' },
            ].map(m => (
              <div key={m.label} style={{
                padding: '12px 14px', borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-default)',
              }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>

          {/* Risk alert */}
          {isRisk && (
            <div style={{
              padding: '12px 16px',
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 'var(--radius-md)', display: 'flex', gap: 10,
            }}>
              <AlertTriangle size={16} color="#f87171" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f87171', marginBottom: 3 }}>
                  Tindakan Segera Diperlukan
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {item.status === 'dead'
                    ? 'SKU ini tidak bergerak dalam 180+ hari. Pertimbangkan liquidasi atau reklasifikasi untuk melepas modal yang terkunci.'
                    : `Stok akan habis dalam ${item.daysToStockout} hari. Oracle merekomendasikan reorder segera untuk mencegah kehilangan penjualan.`
                  }
                </div>
              </div>
            </div>
          )}

          {/* Stock movement placeholder */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <BarChart3 size={14} /> Riwayat Pergerakan (30 Hari)
            </div>
            <div style={{ height: 60, background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'flex-end', gap: 3, padding: '8px 10px', overflow: 'hidden' }}>
              {Array.from({ length: 30 }, (_, i) => {
                const h = Math.max(5, Math.random() * 100);
                const active = i > 24;
                return (
                  <div key={i} style={{
                    flex: 1, height: `${h}%`, borderRadius: '2px 2px 0 0',
                    background: active ? color : `${color}40`,
                    transition: 'height 0.5s ease',
                  }} />
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
            <button className="btn btn-primary" style={{ flex: 1, fontSize: '0.82rem' }}>
              <ShoppingCart size={14} /> Buat Purchase Order
            </button>
            <button className="btn btn-secondary" style={{ fontSize: '0.82rem' }}>
              <Package size={14} /> Adjusment
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
