import React, { useState, useEffect } from 'react';
import { Gauge, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

export function MonitoringPage() {
  const [healthData, setHealthData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHealth = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/model-health');
      if (!res.ok) throw new Error('API Health check failed');
      const data = await res.json();
      setHealthData(data);
    } catch (err: any) {
      setError(err.message || 'Gagal terhubung ke backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div style={{ padding: '24px' }}>
      <div className="flex justify-between items-center mb-6">
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Gauge size={20} className="text-indigo-400" /> Monitoring Model
        </h2>
        <button className="btn btn-secondary btn-sm flex items-center gap-2" onClick={fetchHealth} disabled={loading}>
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {loading && !healthData && (
        <div className="text-center p-8 text-slate-400">Loading metrics...</div>
      )}

      {error && (
        <div className="glass-panel p-6 border-red-500/30 text-red-400 flex items-center gap-3">
          <AlertTriangle size={24} /> {error}
        </div>
      )}

      {healthData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Status Sistem</h3>
            
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
              <span className="text-slate-300">Overall Status</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${healthData.status === 'online' ? 'bg-emerald-900/30 text-emerald-400' : 'bg-amber-900/30 text-amber-400'}`}>
                {healthData.status.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
              <span className="text-slate-300">Model Artifact (XGBoost)</span>
              <span className="text-emerald-400 flex items-center gap-1"><CheckCircle size={14} /> {healthData.model_status}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-300">Scaler Artifact</span>
              <span className="text-emerald-400 flex items-center gap-1"><CheckCircle size={14} /> {healthData.scaler_status}</span>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Performance Metrics</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <div className="text-xs text-slate-400 mb-1">Base MAE (Days)</div>
                <div className="text-2xl font-bold text-indigo-400">{healthData.metrics.mae_base}</div>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <div className="text-xs text-slate-400 mb-1">Data Drift Detected</div>
                <div className="text-2xl font-bold text-slate-200">{healthData.metrics.drift_detected ? 'Yes' : 'No'}</div>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg col-span-2">
                <div className="text-xs text-slate-400 mb-1">Last Retrain Date</div>
                <div className="text-lg font-bold text-slate-200">{new Date(healthData.metrics.last_retrain).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
