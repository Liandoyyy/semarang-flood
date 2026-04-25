import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import type { SummaryData, FloodPoint } from '../types';

interface StatsSectionProps {
  summary: SummaryData;
  maxPoint?: FloodPoint;
}

const StatsSection: React.FC<StatsSectionProps> = ({ summary, maxPoint }) => {
  const waterChartRef = useRef<HTMLCanvasElement>(null);
  const zoneChartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const zoneInstance = useRef<Chart | null>(null);

  useEffect(() => {
    Chart.defaults.color = '#94A3B8';
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

    if (waterChartRef.current && !chartInstance.current) {
      const ctx = waterChartRef.current.getContext('2d');
      if (ctx) {
        const gradientBlue = ctx.createLinearGradient(0, 0, 0, 400);
        gradientBlue.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
        gradientBlue.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'],
            datasets: [{
              label: 'Ketinggian (cm)',
              data: [80, 85, 110, 135, 140, 142, 142],
              borderColor: '#3B82F6',
              backgroundColor: gradientBlue,
              borderWidth: 3,
              pointBackgroundColor: '#0A0F1C',
              pointBorderColor: '#3B82F6',
              pointBorderWidth: 2,
              pointRadius: 4,
              fill: true,
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { grid: { color: 'rgba(255,255,255,0.05)' }, suggestedMax: 200 },
              x: { grid: { display: false } }
            }
          }
        });
      }
    }

    if (zoneChartRef.current && !zoneInstance.current) {
      const ctx = zoneChartRef.current.getContext('2d');
      if (ctx) {
        zoneInstance.current = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Siaga 1', 'Siaga 2', 'Siaga 3', 'Normal'],
            datasets: [{
              data: [2, 3, 5, 14],
              backgroundColor: ['#EF4444', '#F59E0B', '#3B82F6', '#10B981'],
              borderWidth: 0,
              hoverOffset: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            plugins: { legend: { display: false } }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
      if (zoneInstance.current) {
        zoneInstance.current.destroy();
        zoneInstance.current = null;
      }
    };
  }, []);

  return (
    <section className="stats-section" id="stats-section">
      <div className="section-header">
        <div className="section-tag">Statistik Terkini</div>
        <h2 className="section-title">Data Kondisi <span className="gradient-text">Banjir</span></h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card red">
          <div className="stat-icon">🌊</div>
          <div className="stat-info">
            <div className="stat-val">{maxPoint?.water_level_cm || 142}<span>cm</span></div>
            <div className="stat-label">Ketinggian Maks</div>
            <div className="stat-loc">{maxPoint?.name || 'Banjir Kanal Barat'}</div>
          </div>
          <div className="stat-trend up">▲ Naik</div>
        </div>
        <div className="stat-card amber">
          <div className="stat-icon">🌧️</div>
          <div className="stat-info">
            <div className="stat-val">85<span>mm/j</span></div>
            <div className="stat-label">Curah Hujan</div>
            <div className="stat-loc">Gunungpati</div>
          </div>
          <div className="stat-trend up">▲ Lebat</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon">📍</div>
          <div className="stat-info">
            <div className="stat-val">{summary.total_affected_areas}<span>kel</span></div>
            <div className="stat-label">Kelurahan Terdampak</div>
            <div className="stat-loc">Dari 177 kelurahan</div>
          </div>
          <div className="stat-trend">— Stabil</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">🚨</div>
          <div className="stat-info">
            <div className="stat-val">{summary.evacuated_people}<span></span></div>
            <div className="stat-label">Warga Dievakuasi</div>
            <div className="stat-loc">Genuk & Semarang Barat</div>
          </div>
          <div className="stat-trend up">▲ Bertambah</div>
        </div>
      </div>

      <div className="chart-row">
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Ketinggian Air — 24 Jam Terakhir</h3>
              <p className="chart-sub">Data dummy · Sumber: sensor IoT WebGIS</p>
            </div>
          </div>
          <div style={{ position: 'relative', height: '300px', width: '100%' }}>
            <canvas ref={waterChartRef}></canvas>
          </div>
        </div>

        <div className="chart-card small">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Status Zona</h3>
              <p className="chart-sub">Distribusi siaga saat ini</p>
            </div>
          </div>
          <div style={{ position: 'relative', height: '250px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <canvas ref={zoneChartRef}></canvas>
          </div>
          <div className="zone-legend">
            <div className="zl-item"><span style={{background:'#EF4444'}}></span>Siaga 1 (2)</div>
            <div className="zl-item"><span style={{background:'#F59E0B'}}></span>Siaga 2 (3)</div>
            <div className="zl-item"><span style={{background:'#3B82F6'}}></span>Siaga 3 (5)</div>
            <div className="zl-item"><span style={{background:'#10B981'}}></span>Normal (14)</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
