import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';

interface NavbarProps {
  onShowWorkbench: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onShowWorkbench }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-brand">
        <div className="nav-brand-icon"><Zap size={20} color="#fff" /></div>
        <span className="nav-brand-text">Supply Chain Oracle</span>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex nav-links">
        <button className="nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Produk</button>
        <button className="nav-link" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>Cara Kerja</button>
        <button className="nav-link" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>Harga</button>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <button className="btn btn-ghost">Login</button>
        <button className="nav-cta" onClick={onShowWorkbench}>
          Buka Dashboard →
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden text-slate-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-4 mx-4 p-4 rounded-xl flex flex-col gap-4 md:hidden"
          style={{
            background: 'rgba(15,19,33,0.97)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          }}
        >
          <button className="text-left py-2 border-b border-[rgba(255,255,255,0.05)] text-sm font-semibold" onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Produk</button>
          <button className="text-left py-2 border-b border-[rgba(255,255,255,0.05)] text-sm font-semibold" onClick={() => { setMobileMenuOpen(false); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}>Cara Kerja</button>
          <button className="text-left py-2 text-sm font-semibold" onClick={() => { setMobileMenuOpen(false); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }}>Harga</button>
          <button className="btn btn-primary w-full mt-2" onClick={() => { setMobileMenuOpen(false); onShowWorkbench(); }}>
            Buka Dashboard →
          </button>
        </motion.div>
      )}
    </nav>
  );
};
