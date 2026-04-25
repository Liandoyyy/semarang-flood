import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="nav-brand">
            <div className="brand-icon small">
              <svg viewBox="0 0 32 32" fill="none"><path d="M16 3C9.925 3 5 7.925 5 14c0 8.25 11 19 11 19s11-10.75 11-19c0-6.075-4.925-11-11-11z" fill="url(#brandGrad2)"/><circle cx="16" cy="14" r="4" fill="white"/><defs><linearGradient id="brandGrad2" x1="5" y1="3" x2="27" y2="33" gradientUnits="userSpaceOnUse"><stop stopColor="#3B82F6"/><stop offset="1" stopColor="#0EA5E9"/></linearGradient></defs></svg>
            </div>
            <span className="brand-name">Semarang<span className="brand-accent">Flood</span></span>
          </div>
          <p className="footer-desc">Platform monitoring dan prediksi banjir real-time Kota Semarang berbasis WebGIS dan kecerdasan buatan.</p>
        </div>
        <div className="footer-links">
          <div className="fl-col">
            <div className="fl-title">Navigasi</div>
            <a href="#map-section">Peta Live</a>
            <a href="#stats-section">Statistik</a>
            <a href="#forecast-section">Prediksi</a>
            <a href="#api-section">API</a>
          </div>
          <div className="fl-col">
            <div className="fl-title">Data</div>
            <a href="#">Histori Banjir</a>
            <a href="#">Zona Rawan</a>
            <a href="#">Curah Hujan</a>
            <a href="#">Laporan</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 SemarangFlood · React/Vite Migration</span>
        <span className="footer-live"><span className="live-dot small"></span>Live Monitoring Aktif</span>
      </div>
    </footer>
  );
};

export default Footer;
