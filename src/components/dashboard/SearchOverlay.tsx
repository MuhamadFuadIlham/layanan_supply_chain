import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, AlertTriangle, ArrowRight } from 'lucide-react';
import { inventoryTreemap, supplierRadarData, criticalAlerts } from '../../data/dashboardData';

interface SearchOverlayProps {
  query: string;
  onClose: () => void;
  onSectionJump: (section: string) => void;
}

export function SearchOverlay({ query, onClose, onSectionJump }: SearchOverlayProps) {
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!query) return null;

  const searchLower = query.toLowerCase();

  // Search Results
  const skus = inventoryTreemap.filter(
    item => item.name.toLowerCase().includes(searchLower) || item.sku.toLowerCase().includes(searchLower)
  ).slice(0, 3);

  const suppliers = supplierRadarData.filter(
    s => s.supplier.toLowerCase().includes(searchLower)
  ).slice(0, 3);

  const alerts = criticalAlerts.filter(
    a => a.message.toLowerCase().includes(searchLower)
  ).slice(0, 3);

  const hasResults = skus.length > 0 || suppliers.length > 0 || alerts.length > 0;

  return (
    <motion.div
      ref={ref}
      className="search-overlay"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {!hasResults ? (
        <div style={{ padding: '32px 24px', textAlign: 'center' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Tidak ditemukan hasil untuk "{query}"
          </div>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.75rem', marginTop: 4 }}>
            Coba kata kunci lain
          </div>
        </div>
      ) : (
        <div className="search-results-container">
          {/* SKU Results */}
          {skus.length > 0 && (
            <div className="search-group">
              <div className="search-group-header">
                <Package size={14} /> <span>SKU & Produk</span>
              </div>
              {skus.map(sku => (
                <button
                  key={sku.id}
                  className="search-result-item"
                  onClick={() => {
                    onSectionJump('inventory');
                    onClose();
                  }}
                >
                  <div className="search-result-content">
                    <span className="search-result-title">{sku.name}</span>
                    <span className="search-result-desc">{sku.sku} · {sku.category}</span>
                  </div>
                  <ArrowRight size={14} className="search-result-arrow" />
                </button>
              ))}
            </div>
          )}

          {/* Supplier Results */}
          {suppliers.length > 0 && (
            <div className="search-group">
              <div className="search-group-header" style={{ color: 'var(--accent-amber)' }}>
                <Truck size={14} /> <span>Supplier</span>
              </div>
              {suppliers.map(sup => (
                <button
                  key={sup.supplier}
                  className="search-result-item"
                  onClick={() => {
                    onSectionJump('supplier');
                    onClose();
                  }}
                >
                  <div className="search-result-content">
                    <span className="search-result-title">{sup.supplier}</span>
                    <span className="search-result-desc">Reliability Score: {sup.score}/100</span>
                  </div>
                  <ArrowRight size={14} className="search-result-arrow" />
                </button>
              ))}
            </div>
          )}

          {/* Alert Results */}
          {alerts.length > 0 && (
            <div className="search-group">
              <div className="search-group-header" style={{ color: 'var(--accent-rose)' }}>
                <AlertTriangle size={14} /> <span>Alerts & Insight</span>
              </div>
              {alerts.map(alert => (
                <button
                  key={alert.id}
                  className="search-result-item"
                  onClick={() => {
                    onSectionJump(alert.section);
                    onClose();
                  }}
                >
                  <div className="search-result-content">
                    <span className="search-result-title">{alert.message}</span>
                    <span className="search-result-desc">Kritis · Tindakan Diperlukan</span>
                  </div>
                  <ArrowRight size={14} className="search-result-arrow" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
