import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bot, CheckCircle, RefreshCw, AlertTriangle } from 'lucide-react';

export function InferencePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pipelineState, setPipelineState] = useState<'loading' | 'preprocessing' | 'scaling' | 'inference' | 'done' | 'error'>('loading');
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const payload = location.state?.requestPayload;
    if (!payload) {
      setErrorMsg('Payload tidak ditemukan. Harap isi form di Input Prediksi terlebih dahulu.');
      setPipelineState('error');
      return;
    }

    runInference(payload);
  }, [location]);

  const runInference = async (payload: any) => {
    try {
      // Simulate pipeline UI stages
      setPipelineState('loading');
      await new Promise(r => setTimeout(r, 600));
      setPipelineState('preprocessing');
      await new Promise(r => setTimeout(r, 600));
      setPipelineState('scaling');
      await new Promise(r => setTimeout(r, 600));
      setPipelineState('inference');

      const response = await fetch('http://127.0.0.1:8000/api/v1/predict-rop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setPipelineState('done');
    } catch (err: any) {
      console.error(err);
      let message = err.message || 'Gagal terhubung ke ML Backend.';
      if (message.includes('Failed to fetch') || message.includes('NetworkError') || message.includes('fetch')) {
        message = 'Gagal terhubung ke Server AI Oracle. Pastikan backend FastAPI Anda aktif di port 8000.';
      }
      setErrorMsg(message);
      setPipelineState('error');
    }
  };

  const renderPipelineStep = (step: string, label: string) => {
    const isPast = ['loading', 'preprocessing', 'scaling', 'inference', 'done'].indexOf(pipelineState) >= ['loading', 'preprocessing', 'scaling', 'inference', 'done'].indexOf(step);
    const isActive = pipelineState === step;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: isPast ? 1 : 0.4 }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isActive ? 'rgba(99,102,241,0.2)' : isPast ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)',
          border: `1px solid ${isActive ? '#6366f1' : isPast ? '#10b981' : '#333'}`,
          color: isActive ? '#6366f1' : isPast ? '#10b981' : '#666',
        }}>
          {isActive ? <RefreshCw size={16} className="animate-spin" /> : <CheckCircle size={16} />}
        </div>
        <div style={{ fontSize: '0.75rem', marginTop: 8, fontWeight: isActive ? 'bold' : 'normal', color: isActive ? '#fff' : 'var(--text-muted)' }}>
          {label}
        </div>
      </div>
    );
  };

  if (pipelineState === 'error') {
    return (
      <div className="glass-panel" style={{ padding: '24px', margin: '24px', textAlign: 'center' }}>
        <AlertTriangle size={48} className="text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Inference Error</h2>
        <p className="text-slate-400 mb-6">{errorMsg}</p>
        <button className="btn btn-primary" onClick={() => navigate('/app/input')}>Kembali ke Input</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Bot size={20} className="text-indigo-400" /> Prediksi AI (Inference)
      </h2>

      {/* Pipeline Status Bar */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
        {/* Track Line */}
        <div style={{ position: 'absolute', top: 42, left: 50, right: 50, height: 2, background: 'rgba(255,255,255,0.1)', zIndex: 0 }} />
        
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {renderPipelineStep('loading', 'Loading Model')}
          {renderPipelineStep('preprocessing', 'Preprocessing')}
          {renderPipelineStep('scaling', 'Feature Scaling')}
          {renderPipelineStep('inference', 'Inference (XGBoost)')}
          {renderPipelineStep('done', 'Selesai')}
        </div>
      </div>

      {pipelineState === 'done' && result && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 className="text-lg font-bold mb-4 text-emerald-400 flex items-center gap-2">
            <CheckCircle size={18} /> Hasil Prediksi Lead Time
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-lg" style={{ background: 'rgba(99, 102, 241, 0.06)', border: '1px solid rgba(99, 102, 241, 0.15)' }}>
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Predicted Lead Time</div>
              <div className="text-3xl font-extrabold text-indigo-400">
                {result.predicted_lead_time_days} <span className="text-sm">Hari</span>
              </div>
            </div>
            
            <div className="p-4 rounded-lg" style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Calculated ROP</div>
              <div className="text-3xl font-extrabold text-emerald-400">
                {result.calculated_rop_units} <span className="text-sm">Unit</span>
              </div>
            </div>

            <div className="p-4 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Model Version</div>
              <div className="text-lg font-bold text-slate-200 mt-2">v2.0.0 (XGBoost)</div>
            </div>

            <div className="p-4 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Prediction Time</div>
              <div className="text-lg font-bold text-slate-200 mt-2">{new Date().toLocaleTimeString()}</div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-indigo-900/20 border border-indigo-500/30 mb-6">
            <h4 className="font-bold text-indigo-300 mb-2">Rekomendasi AI</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{result.ai_agent_recommendation}</p>
          </div>

          <div className="flex gap-4">
            <button className="btn btn-primary" onClick={() => navigate('/app/decision-engine', { state: { result } })}>
              Lanjut ke Decision Engine
            </button>
            <button className="btn btn-secondary" onClick={() => navigate('/app/input')}>
              Prediksi Ulang
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
