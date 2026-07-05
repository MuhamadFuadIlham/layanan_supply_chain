import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, Check, X } from 'lucide-react';
import type { CriticalAlert } from '../../data/dashboardData';

interface NotificationDropdownProps {
  alerts: CriticalAlert[];
  onClose: () => void;
  onSectionJump: (section: string) => void;
}

export function NotificationDropdown({ alerts, onClose, onSectionJump }: NotificationDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const critical = alerts.filter(a => a.severity === 'danger');
  const warning = alerts.filter(a => a.severity === 'warning');
  const info = alerts.filter(a => a.severity === 'info');

  const renderItem = (a: CriticalAlert) => (
    <div
      key={a.id}
      className="notif-item"
      onClick={() => {
        onSectionJump(a.section);
        onClose();
      }}
    >
      <div className={`notif-icon ${a.severity}`}>
        {a.severity === 'danger' || a.severity === 'warning' ? (
          <AlertTriangle size={14} />
        ) : (
          <Info size={14} />
        )}
      </div>
      <div style={{ flex: 1 }}>
        <div className="notif-message">{a.message}</div>
        <div className="notif-time">Baru saja</div>
      </div>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      className="notif-dropdown"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="notif-header">
        <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>Notifikasi</div>
        <button className="notif-mark-read">
          <Check size={12} /> Tandai Dibaca
        </button>
      </div>

      <div className="notif-body">
        {critical.length > 0 && (
          <div className="notif-group">
            <div className="notif-group-label danger">Kritis ({critical.length})</div>
            {critical.map(renderItem)}
          </div>
        )}
        
        {warning.length > 0 && (
          <div className="notif-group">
            <div className="notif-group-label warning">Peringatan ({warning.length})</div>
            {warning.map(renderItem)}
          </div>
        )}

        {info.length > 0 && (
          <div className="notif-group">
            <div className="notif-group-label info">Info ({info.length})</div>
            {info.map(renderItem)}
          </div>
        )}

        {alerts.length === 0 && (
          <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            Tidak ada notifikasi baru
          </div>
        )}
      </div>
    </motion.div>
  );
}
