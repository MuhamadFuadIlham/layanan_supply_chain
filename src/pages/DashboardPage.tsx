import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Layout
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { OracleFloatingPanel } from '../components/dashboard/OracleFloatingPanel';

// Alert & Oracle
import { CriticalAlertBar } from '../components/dashboard/CriticalAlertBar';
import { OracleSummaryPanel } from '../components/dashboard/OracleSummaryPanel';

// KPI & Recs
import { ExecutiveKPIRow } from '../components/dashboard/ExecutiveKPIRow';
import { AIRecommendationCarousel } from '../components/dashboard/AIRecommendationCarousel';

// Chart Sections
import { DemandForecastSection } from '../components/dashboard/DemandForecastSection';
import { InventoryHealthSection } from '../components/dashboard/InventoryHealthSection';
import { FinancialImpactSection } from '../components/dashboard/FinancialImpactSection';
import { LeadTimeSection } from '../components/dashboard/LeadTimeSection';
import { SupplierPerformanceSection } from '../components/dashboard/SupplierPerformanceSection';
import { WarehousePerformanceSection } from '../components/dashboard/WarehousePerformanceSection';
import { TrendAnalyticsSection } from '../components/dashboard/TrendAnalyticsSection';

// Shared UI
import { DetailDrawer } from '../components/dashboard/DetailDrawer';

// Data
import {
  criticalAlerts, oracleInsights, kpiData, aiRecommendations
} from '../data/dashboardData';
import type { TreemapItem } from '../data/dashboardData';

interface DashboardPageProps {
  onBack: () => void;
}

const SECTION_REFS: Record<string, string> = {
  inventory: 'section-inventory',
  forecast: 'section-forecast',
  supplier: 'section-supplier',
  financial: 'section-financial',
  leadtime: 'section-leadtime',
  warehouse: 'section-warehouse',
  trend: 'section-trend',
};

export function DashboardPage({ onBack }: DashboardPageProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [dateRange, setDateRange] = useState('30 Hari');
  const [drawerItem, setDrawerItem] = useState<TreemapItem | null>(null);

  const handleSectionJump = (section: string) => {
    const elId = SECTION_REFS[section] || `section-${section}`;
    const el = document.getElementById(elId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Brief highlight
      el.style.outline = '2px solid rgba(99,102,241,0.5)';
      el.style.outlineOffset = '4px';
      setTimeout(() => { el.style.outline = 'none'; }, 1500);
    }
    setActiveSection(section);
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
        onBack={onBack}
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
        <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column' }}>
          {/* Critical Alert Bar (directly below header, not in scrollable) */}
          <CriticalAlertBar alerts={criticalAlerts} onSectionJump={handleSectionJump} />

          {/* Scrollable content */}
          <main className="dashboard-content">
            {/* Oracle AI Summary */}
            <OracleSummaryPanel
              insights={oracleInsights}
              onSectionJump={handleSectionJump}
              updatedMinutes={3}
            />

            {/* Executive KPIs */}
            <ExecutiveKPIRow kpis={kpiData} />

            {/* AI Recommendations */}
            <AIRecommendationCarousel recommendations={aiRecommendations} />

            {/* Demand Forecast */}
            <DemandForecastSection />

            {/* Lead Time & Inventory — 2 col on large */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 0 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <LeadTimeSection />
              </div>
            </div>

            {/* Inventory Health */}
            <InventoryHealthSection onItemClick={(item) => setDrawerItem(item)} />

            {/* Financial Impact */}
            <FinancialImpactSection />

            {/* Supplier Performance */}
            <SupplierPerformanceSection />

            {/* Warehouse Performance */}
            <WarehousePerformanceSection />

            {/* Trend Analytics (collapsed by default) */}
            <TrendAnalyticsSection />

            {/* Bottom padding */}
            <div style={{ height: 40 }} />
          </main>
        </div>
      </div>

      {/* Persistent right panel */}
      <div className="dashboard-persistent-zone">
        <OracleFloatingPanel onSectionJump={handleSectionJump} />
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {drawerItem && (
          <DetailDrawer item={drawerItem} onClose={() => setDrawerItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
