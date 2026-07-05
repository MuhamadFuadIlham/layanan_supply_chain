import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { OracleFloatingPanel } from '../components/dashboard/OracleFloatingPanel';
import { CriticalAlertBar } from '../components/dashboard/CriticalAlertBar';
import { criticalAlerts } from '../data/dashboardData';

export function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState('30 Hari');
  const navigate = useNavigate();

  const handleSectionJump = (section: string) => {
    // Optionally handle legacy jump or convert to routing
    const el = document.getElementById(`section-${section}`) || document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.style.outline = '2px solid rgba(99,102,241,0.5)';
      el.style.outlineOffset = '4px';
      setTimeout(() => { el.style.outline = 'none'; }, 1500);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="dashboard-root">
      {/* Ambient background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 20% 20%, rgba(99,102,241,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(34,211,238,0.03) 0%, transparent 50%)',
      }} />

      {/* Sidebar */}
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(c => !c)}
        onBack={handleBack}
      />

      {/* Main zone */}
      <div className={`dashboard-main-zone ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Sticky Header */}
        <DashboardHeader
          sidebarCollapsed={sidebarCollapsed}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          alertCount={criticalAlerts.length}
          onSectionJump={handleSectionJump}
        />

        {/* Content below header */}
        <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
          <CriticalAlertBar alerts={criticalAlerts} onSectionJump={handleSectionJump} />

          {/* Main scrollable area */}
          <main className="dashboard-content" style={{ flex: 1, overflowY: 'auto', paddingBottom: 40 }}>
            <Outlet />
          </main>
        </div>
      </div>

      {/* Persistent right panel */}
      <div className="dashboard-persistent-zone" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
        <OracleFloatingPanel onSectionJump={handleSectionJump} />
      </div>
    </div>
  );
}
