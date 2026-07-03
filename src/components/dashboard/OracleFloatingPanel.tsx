import React from 'react';
import { motion } from 'framer-motion';
import { oracleInsights, recentActivity, timeAgoStr } from '../../data/dashboardData';
import { Zap, FileText, ShoppingCart, Download, ChevronRight, Clock } from 'lucide-react';

const activityIconMap: Record<string, { icon: string; color: string; bg: string }> = {
  reorder: { icon: '📦', color: '#6366f1', bg: 'rgba(99,102,241,0.15)' },
  alert: { icon: '⚠️', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  delivery: { icon: '🚚', color: '#10b981', bg: 'rgba(16,185,129,0.12)' },
  adjustment: { icon: '✏️', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  system: { icon: '🔮', color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
};

interface OracleFloatingPanelProps {
  onSectionJump: (section: string) => void;
}

export function OracleFloatingPanel({ onSectionJump }: OracleFloatingPanelProps) {
  return (
    <div className="oracle-float-panel">
      {/* Mini Oracle Summary */}
      <div>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-dim)', marginBottom: 12 }}>
          Oracle AI
        </div>
        <div style={{
          padding: '14px 16px',
          background: 'rgba(14,21,41,0.8)',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: 'var(--radius-lg)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '-30%', right: '-20%', width: '80%', height: '80%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem',
            }}>🔮</div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>Oracle Summary</div>
              <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                <Clock size={9} /> 3 menit lalu
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {oracleInsights.slice(0, 3).map(insight => (
              <button
                key={insight.id}
                onClick={() => onSectionJump(insight.section)}
                style={{
                  display: 'flex', gap: 8, padding: '6px 8px', borderRadius: 'var(--radius-sm)',
                  background: 'none', border: '1px solid transparent', cursor: 'pointer',
                  transition: 'all 0.2s ease', textAlign: 'left', fontFamily: 'var(--font-sans)',
                  width: '100%',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.15)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}
              >
                <span style={{ fontSize: '0.75rem', flexShrink: 0 }}>{insight.icon}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.4, flex: 1 }}>
                  {insight.text.length > 75 ? insight.text.slice(0, 75) + '…' : insight.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-dim)', marginBottom: 10 }}>
          Quick Actions
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { icon: <ShoppingCart size={14} />, label: 'Buat Purchase Order', color: 'var(--accent-primary)' },
            { icon: <FileText size={14} />, label: 'Tambah Transaksi Manual', color: 'var(--accent-cyan)' },
            { icon: <Download size={14} />, label: 'Export Laporan', color: 'var(--accent-emerald)' },
            { icon: <Zap size={14} />, label: 'Jalankan Bulk Reorder', color: 'var(--accent-amber)' },
          ].map(action => (
            <button key={action.label} className="quick-action-btn">
              <span style={{ color: action.color }}>{action.icon}</span>
              {action.label}
              <ChevronRight size={12} style={{ marginLeft: 'auto', opacity: 0.4 }} />
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-dim)', marginBottom: 10 }}>
          Aktivitas Terbaru
        </div>
        <div>
          {recentActivity.map(item => {
            const cfg = activityIconMap[item.type] || activityIconMap.system;
            return (
              <div key={item.id} className="activity-feed-item">
                <div className="activity-icon" style={{ background: cfg.bg, color: cfg.color }}>
                  {cfg.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {item.message}
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 3 }}>
                    <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>
                      {timeAgoStr(item.timestamp)}
                    </span>
                    {item.user && (
                      <span style={{ fontSize: '0.62rem', color: 'var(--text-dim)' }}>· {item.user}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
