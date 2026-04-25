import React from 'react';
import type { SummaryData } from '../types';

interface HeroProps {
  summary: SummaryData;
}

const Hero: React.FC<HeroProps> = ({ summary }) => {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="hero-orb orb-1"></div>
        <div className="hero-orb orb-2"></div>
        <div className="hero-orb orb-3"></div>
        <div className="grid-overlay"></div>
      </div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Real-time Flood Intelligence
        </div>
        <h1 className="hero-title">
          Pantau Banjir<br/>
          <span className="gradient-text">Kota Semarang</span><br/>
          Secara Real-Time
        </h1>
        <p className="hero-sub">
          Platform monitoring banjir berbasis WebGIS dengan prediksi AI — 
          pantau titik rawan, ketinggian air, dan forecasting 72 jam ke depan.
        </p>
        <div className="hero-cta">
          <a href="#map-section" className="btn-primary">Lihat Peta Sekarang</a>
          <a href="#forecast-section" className="btn-outline">Prediksi Cuaca</a>
        </div>
        <div className="hero-stats">
          <div className="hstat">
            <span className="hstat-num" id="totalPoints">{summary.total_points || 24}</span>
            <span className="hstat-label">Titik Pantau</span>
          </div>
          <div className="hstat-divider"></div>
          <div className="hstat">
            <span className="hstat-num" id="floodZones">{summary.flood_zones_active || 7}</span>
            <span className="hstat-label">Zona Banjir</span>
          </div>
          <div className="hstat-divider"></div>
          <div className="hstat">
            <span className="hstat-num">72H</span>
            <span className="hstat-label">Forecasting</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
