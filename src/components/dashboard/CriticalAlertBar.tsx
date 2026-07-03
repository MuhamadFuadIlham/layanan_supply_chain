import React, { useState } from 'react';
import { X, AlertTriangle, Info, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { CriticalAlert } from '../../data/dashboardData';

interface CriticalAlertBarProps {
  alerts: CriticalAlert[];
  onSectionJump: (section: string) => void;
}

export function CriticalAlertBar({ alerts, onSectionJump }: CriticalAlertBarProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [currentIdx, setCurrentIdx] = useState(0);

  const visible = alerts.filter(a => !dismissed.has(a.id));
  if (visible.length === 0) return null;

  const current = visible[Math.min(currentIdx, visible.length - 1)];

  const dismiss = (id: string) => {
    setDismissed(prev => new Set([...prev, id]));
    setCurrentIdx(0);
  };

  const severityConfig = {
    danger: {
      bg: 'rgba(239,68,68,0.08)',
      border: 'rgba(239,68,68,0.25)',
      icon: <AlertTriangle size={14} color="#f87171" />,
      dotClass: 'danger',
      ctaColor: '#f87171',
    },
    warning: {
      bg: 'rgba(245,158,11,0.07)',
      border: 'rgba(245,158,11,0.25)',
      icon: <AlertTriangle size={14} color="#fbbf24" />,
      dotClass: 'warning',
      ctaColor: '#fbbf24',
    },
    info: {
      bg: 'rgba(99,102,241,0.06)',
      border: 'rgba(99,102,241,0.2)',
      icon: <Info size={14} color="#a5b4fc" />,
      dotClass: 'info',
      ctaColor: '#a5b4fc',
    },
  };

  const cfg = severityConfig[current.severity];

  return (
    <div style={{ background: cfg.bg, borderBottom: `1px solid ${cfg.border}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 24px' }}>
        {/* Severity dot */}
        <span className={`alert-severity-dot ${cfg.dotClass}`} />

        {/* Icon */}
        {cfg.icon}

        {/* Message */}
        <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', flex: 1, lineHeight: 1.4 }}>
          {current.message}
        </span>

        {/* CTA */}
        <button
          onClick={() => onSectionJump(current.section)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '4px 12px',
            background: `rgba(255,255,255,0.06)`,
            border: `1px solid ${cfg.border}`,
            borderRadius: 'var(--radius-full)',
            color: cfg.ctaColor,
            fontSize: '0.72rem', fontWeight: 700,
            cursor: 'pointer', fontFamily: 'var(--font-sans)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {current.cta} <ArrowRight size={12} />
        </button>

        {/* Navigation */}
        {visible.length > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            <button className="dash-icon-btn" style={{ width: 24, height: 24 }} onClick={() => setCurrentIdx(i => Math.max(0, i - 1))}>
              <ChevronLeft size={12} />
            </button>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', minWidth: 32, textAlign: 'center' }}>
              {Math.min(currentIdx + 1, visible.length)}/{visible.length}
            </span>
            <button className="dash-icon-btn" style={{ width: 24, height: 24 }} onClick={() => setCurrentIdx(i => Math.min(visible.length - 1, i + 1))}>
              <ChevronRight size={12} />
            </button>
          </div>
        )}

        {/* Dismiss */}
        <button
          className="dash-icon-btn"
          style={{ width: 26, height: 26, flexShrink: 0 }}
          onClick={() => dismiss(current.id)}
          title="Dismiss alert ini"
        >
          <X size={13} />
        </button>
      </div>
    </div>
  );
}
