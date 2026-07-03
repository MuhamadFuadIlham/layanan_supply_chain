import React, { useState } from 'react';
import { Search, Bell, Calendar, User, ChevronDown, BarChart3 } from 'lucide-react';

interface DashboardHeaderProps {
  sidebarCollapsed: boolean;
  dateRange: string;
  onDateRangeChange: (r: string) => void;
  alertCount: number;
}

const DATE_RANGES = ['Hari Ini', '7 Hari', '30 Hari', 'Custom'];

export function DashboardHeader({ sidebarCollapsed, dateRange, onDateRangeChange, alertCount }: DashboardHeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);

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
      <div className="dash-header-search" style={{ opacity: searchFocused ? 1 : 0.85 }}>
        <Search size={14} className="dash-header-search-icon" />
        <input
          placeholder="Cari SKU, supplier, transaksi..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
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
      <button className="dash-icon-btn" title="Notifikasi">
        <Bell size={16} />
        {alertCount > 0 && <span className="notif-badge">{alertCount}</span>}
      </button>

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
