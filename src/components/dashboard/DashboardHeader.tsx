import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Calendar, User, ChevronDown, BarChart3, X } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';
import { SearchOverlay } from './SearchOverlay';
import { criticalAlerts } from '../../data/dashboardData';
import { AnimatePresence } from 'framer-motion';

interface DashboardHeaderProps {
  sidebarCollapsed: boolean;
  dateRange: string;
  onDateRangeChange: (r: string) => void;
  alertCount: number;
  onSectionJump: (section: string) => void;
}

const DATE_RANGES = ['Hari Ini', '7 Hari', '30 Hari', 'Custom'];

export function DashboardHeader({ sidebarCollapsed, dateRange, onDateRangeChange, alertCount, onSectionJump }: DashboardHeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Close search overlay if clicking outside when it's not focused
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`dash-header ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Title on small */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <BarChart3 size={18} color="var(--accent-primary)" />
        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
          Decision Center
        </span>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', flex: 1, maxWidth: 400 }} ref={searchRef}>
        <div className="dash-header-search" style={{ opacity: searchFocused || searchQuery ? 1 : 0.85 }}>
          <Search size={14} className="dash-header-search-icon" />
          <input
            placeholder="Cari SKU, supplier, transaksi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
          />
          {searchQuery && (
            <button className="dash-icon-btn" style={{ padding: 4 }} onClick={() => setSearchQuery('')}>
               <X size={14} color="var(--text-muted)" />
            </button>
          )}
        </div>
        
        <AnimatePresence>
          {searchFocused && searchQuery && (
            <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 50 }}>
              <SearchOverlay query={searchQuery} onClose={() => setSearchFocused(false)} onSectionJump={onSectionJump} />
            </div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ flex: 1 }} />

      {/* Date Range */}
      <div className="date-range-tabs">
        {DATE_RANGES.map(r => (
          <button
            key={r}
            className={`date-range-tab ${dateRange === r ? 'active' : ''}`}
            onClick={() => onDateRangeChange(r)}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Icons */}
      <div style={{ position: 'relative' }}>
        <button 
          className="dash-icon-btn" 
          title="Notifikasi"
          onClick={() => setShowNotifications(!showNotifications)}
          style={{ background: showNotifications ? 'rgba(255,255,255,0.05)' : 'transparent' }}
        >
          <Bell size={16} />
          {alertCount > 0 && <span className="notif-badge">{alertCount}</span>}
        </button>

        <AnimatePresence>
          {showNotifications && (
            <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 50, width: 320 }}>
              <NotificationDropdown 
                alerts={criticalAlerts} 
                onClose={() => setShowNotifications(false)} 
                onSectionJump={onSectionJump} 
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Avatar */}
      <button
        className="dash-icon-btn"
        style={{ width: 'auto', padding: '0 12px', gap: 8, borderRadius: 'var(--radius-full)' }}
        title="Profil"
      >
        <div style={{
          width: 24, height: 24, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-cyan))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.65rem', fontWeight: 700, color: 'white', flexShrink: 0
        }}>
          SM
        </div>
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Supply Mgr</span>
        <ChevronDown size={12} />
      </button>
    </header>
  );
}
