import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardOverview } from './pages/DashboardOverview';
import { LandingPage } from './pages/LandingPage';
import { InputDataPage } from './pages/InputDataPage';
import { InferencePage } from './pages/InferencePage';
import { DecisionEnginePage } from './pages/DecisionEnginePage';
import { MonitoringPage } from './pages/MonitoringPage';

// Placeholder Pages for ML Pipeline
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="glass-panel" style={{ padding: '2rem', margin: '2rem' }}>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{title}</h2>
    <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Halaman sedang dalam pengembangan...</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          
          <Route path="input" element={<InputDataPage />} />
          <Route path="feature-engineering" element={<PlaceholderPage title="Feature Engineering" />} />
          <Route path="context-layer" element={<PlaceholderPage title="Context Layer (KMeans)" />} />
          <Route path="inference" element={<InferencePage />} />
          <Route path="decision-engine" element={<DecisionEnginePage />} />
          <Route path="simulasi" element={<PlaceholderPage title="Simulasi Model" />} />
          <Route path="riwayat" element={<PlaceholderPage title="Riwayat Prediksi" />} />
          <Route path="monitoring" element={<MonitoringPage />} />
          <Route path="pengaturan" element={<PlaceholderPage title="Pengaturan Sistem" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
