import React from 'react';
import { Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      className="pt-16 pb-8 relative z-10 mt-16"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        background: '#0a0d1c', /* surface-container-lowest per DESIGN.md */
      }}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center text-white"
                style={{ background: 'linear-gradient(135deg, #648aff, #1de0b2)' }}
              >
                <Zap size={15} />
              </div>
              <span
                className="font-bold text-lg"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', color: '#dfe1f6' }}
              >
                Supply Chain Oracle
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#434654', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              Mengubah data stok mentah menjadi keputusan bisnis yang jelas dan terukur. Prediktif, bukan reaktif.
            </p>
            {/* Status chip — DESIGN.md */}
            <span className="status-chip optimized">SYSTEM OPERATIONAL</span>
          </div>

          {/* Links Cols */}
          <div>
            <h4
              className="font-bold mb-4"
              style={{ fontFamily: 'var(--font-display)', color: '#dfe1f6', fontSize: '0.9rem' }}
            >
              Produk
            </h4>
            <ul className="space-y-3">
              {['Forecast Engine', 'Inventory Control', 'Smart Alerts', 'Integrasi ERP'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{ fontSize: '0.8rem', color: '#8d90a0', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#b5c4ff')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8d90a0')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4
              className="font-bold mb-4"
              style={{ fontFamily: 'var(--font-display)', color: '#dfe1f6', fontSize: '0.9rem' }}
            >
              Perusahaan
            </h4>
            <ul className="space-y-3">
              {['Tentang Kami', 'Karir', 'Blog', 'Kontak'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{ fontSize: '0.8rem', color: '#8d90a0', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#b5c4ff')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8d90a0')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-bold mb-4"
              style={{ fontFamily: 'var(--font-display)', color: '#dfe1f6', fontSize: '0.9rem' }}
            >
              Legal
            </h4>
            <ul className="space-y-3">
              {['Syarat & Ketentuan', 'Kebijakan Privasi', 'Keamanan Data'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{ fontSize: '0.8rem', color: '#8d90a0', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#b5c4ff')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8d90a0')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#434654', letterSpacing: '0.03em' }}>
            © {new Date().getFullYear()} The Supply Chain Oracle. Hak cipta dilindungi.
          </p>
          <div className="flex gap-4">
            {['Twitter', 'LinkedIn'].map((social) => (
              <a
                key={social}
                href="#"
                style={{ fontSize: '0.8rem', color: '#434654', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#dfe1f6')}
                onMouseLeave={e => (e.currentTarget.style.color = '#434654')}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
