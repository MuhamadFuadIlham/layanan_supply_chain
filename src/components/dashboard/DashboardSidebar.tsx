import React, { useState } from 'react';
import { LayoutDashboard, Package, TrendingUp, Truck, BarChart3, Settings, ChevronLeft, ChevronRight, Activity, FileText, Users, Warehouse } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (s: string) => void;
  onBack: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'forecast', label: 'Demand Forecast', icon: TrendingUp },
  { id: 'inventory', label: 'Inventory', icon: Package },
  { id: 'supplier', label: 'Supplier', icon: Truck },
  { id: 'warehouse', label: 'Warehouse', icon: Warehouse },
  { id: 'reports', label: 'Laporan', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: Activity },
];

const bottomItems = [
  { id: 'team', label: 'Tim', icon: Users },
  { id: 'settings', label: 'Pengaturan', icon: Settings },
];

export function DashboardSidebar({ collapsed, onToggle, activeSection, onSectionChange, onBack }: SidebarProps) {
  return (
    <div className={`dashboard-sidebar-zone ${collapsed ? 'collapsed' : ''}`}>
      <div className="dash-sidebar">
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">⚡</div>
          {!collapsed && (
            <div>
              <div className="sidebar-brand-text">Supply Chain</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>Oracle AI</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {!collapsed && <div className="sidebar-section-label">Navigasi</div>}
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => onSectionChange(item.id)}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={17} style={{ flexShrink: 0 }} />
                {!collapsed && <span className="sidebar-nav-label">{item.label}</span>}
              </button>
            );
          })}

          <div style={{ flex: 1 }} />

          {!collapsed && <div className="sidebar-section-label" style={{ marginTop: 8 }}>Akun</div>}
          {bottomItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`sidebar-nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => onSectionChange(item.id)}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={17} style={{ flexShrink: 0 }} />
                {!collapsed && <span className="sidebar-nav-label">{item.label}</span>}
              </button>
            );
          })}

          {/* Back to Landing */}
          <button
            className="sidebar-nav-item"
            onClick={onBack}
            title={collapsed ? 'Kembali' : undefined}
            style={{ marginTop: 8, borderTop: '1px solid var(--border-default)', paddingTop: 12 }}
          >
            <ChevronLeft size={17} style={{ flexShrink: 0 }} />
            {!collapsed && <span className="sidebar-nav-label">Kembali ke Beranda</span>}
          </button>
        </nav>

        {/* Collapse Toggle */}
        <div className="sidebar-collapse-btn">
          <button className="dash-icon-btn" onClick={onToggle} title={collapsed ? 'Perluas Sidebar' : 'Perkecil Sidebar'}>
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>
      </div>
    </div>
  );
}
