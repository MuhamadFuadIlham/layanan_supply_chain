import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';
import type { OracleInsight } from '../../data/dashboardData';

interface OracleSummaryPanelProps {
  insights: OracleInsight[];
  onSectionJump: (section: string) => void;
  updatedMinutes?: number;
}

const insightTypeColors: Record<string, string> = {
  risk: '#f87171',
  opportunity: '#34d399',
  operational: '#fbbf24',
  financial: '#a5b4fc',
};

export function OracleSummaryPanel({ insights, onSectionJump, updatedMinutes = 3 }: OracleSummaryPanelProps) {
  return (
    <motion.div
      className="glass-panel oracle-panel"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ padding: '20px 24px', marginBottom: 24 }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, position: 'relative', zIndex: 1 }}>
        <div style={{ 
          width: 36, height: 36, borderRadius: '50%', 
          background: 'rgba(100, 138, 255, 0.15)', 
          border: '1px solid rgba(100, 138, 255, 0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 15px rgba(100, 138, 255, 0.3)'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#648aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Oracle AI — Ringkasan Hari Ini
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={11} />
            Diperbarui {updatedMinutes} menit lalu
          </div>
        </div>
        <div style={{
          padding: '3px 10px',
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.65rem', fontWeight: 700, color: '#a5b4fc',
          textTransform: 'uppercase', letterSpacing: '0.06em',
        }}>
          Live
        </div>
      </div>

      {/* Insights */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, position: 'relative', zIndex: 1 }}>
        {insights.map((insight, i) => (
          <motion.button
            key={insight.id}
            className="oracle-insight-item"
            onClick={() => onSectionJump(insight.section)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            style={{
              background: 'none', border: '1px solid transparent', width: '100%',
              fontFamily: 'var(--font-sans)', cursor: 'pointer', textAlign: 'left',
            }}
            whileHover={{ x: 4 }}
          >
            <span style={{ fontSize: '1rem', flexShrink: 0 }}>{insight.icon}</span>
            <span style={{
              fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1,
            }}>
              {insight.text}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
              <span style={{
                fontSize: '0.62rem', fontWeight: 700, color: insightTypeColors[insight.type],
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                {insight.type === 'risk' ? '⚠ Risiko' :
                 insight.type === 'opportunity' ? '↑ Peluang' :
                 insight.type === 'operational' ? '⚙ Operasi' : '💰 Finansial'}
              </span>
              <ChevronRight size={12} color="var(--text-muted)" />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
