import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileInput, BrainCircuit, Bot, TrendingUp, Settings, ChevronLeft, ChevronRight, CheckSquare, Activity, ArchiveRestore, Gauge } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onBack: () => void;
}

const mlPipelineItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/app/dashboard' },
  { id: 'input', label: 'Input Prediksi', icon: FileInput, path: '/app/input' },
  { id: 'feature-engineering', label: 'Feature Engineering', icon: Activity, path: '/app/feature-engineering' },
  { id: 'context-layer', label: 'Context Layer', icon: BrainCircuit, path: '/app/context-layer' },
  { id: 'inference', label: 'Prediksi AI', icon: Bot, path: '/app/inference' },
  { id: 'decision-engine', label: 'Decision Engine', icon: CheckSquare, path: '/app/decision-engine' },
  { id: 'simulasi', label: 'Simulasi', icon: TrendingUp, path: '/app/simulasi' },
  { id: 'riwayat', label: 'Riwayat Prediksi', icon: ArchiveRestore, path: '/app/riwayat' },
  { id: 'monitoring', label: 'Monitoring Model', icon: Gauge, path: '/app/monitoring' },
];

const bottomItems = [
  { id: 'settings', label: 'Pengaturan', icon: Settings, path: '/app/pengaturan' },
];

export function DashboardSidebar({ collapsed, onToggle, onBack }: SidebarProps) {
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
          {!collapsed && <div className="sidebar-section-label">ML Pipeline</div>}
          {mlPipelineItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                title={collapsed ? item.label : undefined}
                style={{ textDecoration: 'none' }}
              >
                <Icon size={17} style={{ flexShrink: 0 }} />
                {!collapsed && <span className="sidebar-nav-label">{item.label}</span>}
              </NavLink>
            );
          })}

          <div style={{ flex: 1 }} />

          {!collapsed && <div className="sidebar-section-label" style={{ marginTop: 8 }}>Sistem</div>}
          {bottomItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
                title={collapsed ? item.label : undefined}
                style={{ textDecoration: 'none' }}
              >
                <Icon size={17} style={{ flexShrink: 0 }} />
                {!collapsed && <span className="sidebar-nav-label">{item.label}</span>}
              </NavLink>
            );
          })}

          {/* Back to Landing */}
          <button
            className="sidebar-nav-item"
            onClick={onBack}
            title={collapsed ? 'Kembali' : undefined}
            style={{ marginTop: 8, borderTop: '1px solid var(--border-default)', paddingTop: 12, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
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
