import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Info, Sparkles } from 'lucide-react';
import type { AIRecommendation } from '../../data/dashboardData';
import { formatRupiah } from '../../data/dashboardData';

interface AIRecommendationCarouselProps {
  recommendations: AIRecommendation[];
}

const categoryColors: Record<string, string> = {
  Reorder: 'var(--accent-rose)',
  Planning: 'var(--accent-cyan)',
  Supplier: 'var(--accent-amber)',
  Inventory: 'var(--accent-purple)',
  'Cost Saving': 'var(--accent-emerald)',
};

export function AIRecommendationCarousel({ recommendations }: AIRecommendationCarouselProps) {
  return (
    <div className="section-card" style={{ marginBottom: 20 }}>
      <div className="section-card-header">
        <div>
          <div className="section-card-title">
            <Sparkles size={16} color="var(--accent-cyan)" />
            Rekomendasi AI
          </div>
          <div className="section-card-subtitle">Tindakan konkret yang disarankan Oracle untuk optimasi hari ini</div>
        </div>
        <span style={{
          fontSize: '0.68rem', fontWeight: 700, color: '#34d399',
          background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
          borderRadius: 'var(--radius-full)', padding: '3px 10px',
        }}>
          {recommendations.length} Rekomendasi Aktif
        </span>
      </div>

      <div className="section-card-body" style={{ paddingTop: 16 }}>
        <div className="ai-rec-carousel">
          {recommendations.map((rec, i) => (
            <motion.div
              key={rec.id}
              className="ai-rec-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, gap: 8 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span
                    className="urgency-badge"
                    style={{ background: `${categoryColors[rec.category] || 'var(--accent-primary)'}18`, color: categoryColors[rec.category] || 'var(--accent-primary)', border: `1px solid ${categoryColors[rec.category] || 'var(--accent-primary)'}30` }}
                  >
                    {rec.category}
                  </span>
                  <span className={`urgency-badge ${rec.urgency}`}>
                    {rec.urgency === 'high' ? '🔴 Urgent' : rec.urgency === 'medium' ? '🟡 Medium' : '🟢 Low'}
                  </span>
                </div>
                <span className="ai-confidence-badge">
                  ✦ {(rec.confidence * 100).toFixed(0)}%
                </span>
              </div>

              {/* Title */}
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.3 }}>
                {rec.title}
              </div>

              {/* Justification */}
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 12 }}>
                {rec.justification}
              </div>

              {/* Impact */}
              <div style={{
                padding: '8px 12px',
                background: 'rgba(16,185,129,0.06)',
                border: '1px solid rgba(16,185,129,0.15)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.75rem', color: '#34d399', fontWeight: 600, marginBottom: 14,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <Info size={12} />
                {rec.impact}
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary btn-sm" style={{ flex: 1, fontSize: '0.75rem', padding: '7px 12px' }}>
                  <CheckCircle size={13} /> Setujui
                </button>
                <button className="btn btn-secondary btn-sm" style={{ fontSize: '0.75rem', padding: '7px 12px' }}>
                  Detail
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
