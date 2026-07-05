import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Alert & Oracle
import { OracleSummaryPanel } from '../components/dashboard/OracleSummaryPanel';
import { oracleInsights, kpiData, aiRecommendations } from '../data/dashboardData';

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
import type { TreemapItem } from '../data/dashboardData';

export function DashboardOverview() {
  const [drawerItem, setDrawerItem] = useState<TreemapItem | null>(null);

  const handleSectionJump = (section: string) => {
    const el = document.getElementById(`section-${section}`) || document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.style.outline = '2px solid rgba(99,102,241,0.5)';
      el.style.outlineOffset = '4px';
      setTimeout(() => { el.style.outline = 'none'; }, 1500);
    }
  };

  return (
    <div>
      <OracleSummaryPanel
        insights={oracleInsights}
        onSectionJump={handleSectionJump}
        updatedMinutes={3}
      />

      <ExecutiveKPIRow kpis={kpiData} />
      <AIRecommendationCarousel recommendations={aiRecommendations} />
      <DemandForecastSection />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 0 }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <LeadTimeSection />
        </div>
      </div>

      <InventoryHealthSection onItemClick={(item) => setDrawerItem(item)} />
      <FinancialImpactSection />
      <SupplierPerformanceSection />
      <WarehousePerformanceSection />
      <TrendAnalyticsSection />

      <AnimatePresence>
        {drawerItem && (
          <DetailDrawer item={drawerItem} onClose={() => setDrawerItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
