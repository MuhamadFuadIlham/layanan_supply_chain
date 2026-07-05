import React from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div 
      className="empty-state-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '3rem 2rem', textAlign: 'center', height: '100%', minHeight: 200,
        background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-xl)', border: '1px dashed var(--border-default)'
      }}
    >
      <div style={{
        width: 56, height: 56, borderRadius: '50%', background: 'var(--bg-elevated)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
        color: 'var(--text-muted)', border: '1px solid var(--border-bright)'
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: action ? 24 : 0, maxWidth: 320 }}>
        {description}
      </p>
      {action && (
        <button className="btn btn-secondary" onClick={action.onClick} style={{ fontSize: '0.8rem' }}>
          {action.label}
        </button>
      )}
    </motion.div>
  );
}
