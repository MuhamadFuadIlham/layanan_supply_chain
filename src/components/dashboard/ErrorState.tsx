import React from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorState({ message = 'Gagal memuat data. Periksa koneksi Anda dan coba lagi.', onRetry }: ErrorStateProps) {
  return (
    <motion.div 
      className="error-state-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '3rem 2rem', textAlign: 'center', height: '100%', minHeight: 200,
        background: 'rgba(239, 68, 68, 0.03)', borderRadius: 'var(--radius-xl)', border: '1px dashed rgba(239, 68, 68, 0.2)'
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16
      }}>
        <AlertCircle size={24} color="#ef4444" />
      </div>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
        Gagal Memuat Data
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 20, maxWidth: 320 }}>
        {message}
      </p>
      <button className="btn btn-secondary" onClick={onRetry} style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
        <RefreshCw size={14} /> Coba Lagi
      </button>
    </motion.div>
  );
}
