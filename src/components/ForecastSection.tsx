import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

interface ForecastSectionProps {
  forecastData: any;
}

const ForecastSection: React.FC<ForecastSectionProps> = ({ forecastData }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      const gradientYellow = ctx.createLinearGradient(0, 0, 0, 200);
      gradientYellow.addColorStop(0, 'rgba(250, 204, 21, 0.5)');
      gradientYellow.addColorStop(1, 'rgba(250, 204, 21, 0.0)');

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['+4h', '+8h', '+12h', '+16h', '+20h', '+24h'],
          datasets: [
            {
              type: 'line',
              label: 'Prediksi Air (cm)',
              data: [145, 155, 160, 150, 130, 110],
              borderColor: '#FACC15',
              backgroundColor: gradientYellow,
              borderWidth: 3,
              fill: true,
              tension: 0.4,
              yAxisID: 'y'
            },
            {
              type: 'bar',
              label: 'Prediksi Hujan (mm)',
              data: [20, 45, 15, 5, 0, 0],
              backgroundColor: 'rgba(14, 165, 233, 0.5)',
              borderRadius: 4,
              yAxisID: 'y1'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { position: 'top', labels: { color: '#94A3B8', boxWidth: 12 } }
          },
          scales: {
            y: {
              type: 'linear', display: true, position: 'left',
              grid: { color: 'rgba(255,255,255,0.05)' },
              title: { display: true, text: 'Air (cm)', color: '#FACC15' }
            },
            y1: {
              type: 'linear', display: true, position: 'right',
              grid: { drawOnChartArea: false },
              title: { display: true, text: 'Hujan (mm)', color: '#0EA5E9' }
            },
            x: { grid: { display: false } }
          }
        }
      });
    }

    // Update data when tab or props change
    if (chartInstance.current) {
      let labels, airData, hujanData;

      if (forecastData) {
        const timeKey = activeTab === 0 ? "24h" : (activeTab === 1 ? "48h" : "72h");
        const fData = forecastData[timeKey];
        if (fData) {
          labels = fData.labels;
          airData = fData.water_level;
          hujanData = fData.rainfall;
        }
      }

      if (!labels) { // Fallback dummy
        if(activeTab === 0) {
          labels = ['+4h', '+8h', '+12h', '+16h', '+20h', '+24h'];
          airData = [145, 155, 160, 150, 130, 110];
          hujanData = [20, 45, 15, 5, 0, 0];
        } else if(activeTab === 1) {
          labels = ['+8h', '+16h', '+24h', '+32h', '+40h', '+48h'];
          airData = [155, 150, 110, 90, 85, 80];
          hujanData = [45, 5, 0, 0, 10, 5];
        } else {
          labels = ['+12h', '+24h', '+36h', '+48h', '+60h', '+72h'];
          airData = [160, 110, 85, 80, 75, 70];
          hujanData = [15, 0, 5, 5, 0, 0];
        }
      }

      chartInstance.current.data.labels = labels;
      chartInstance.current.data.datasets[0].data = airData;
      chartInstance.current.data.datasets[1].data = hujanData;
      chartInstance.current.update();
    }

  }, [activeTab, forecastData]);

  const renderTimelineItems = () => {
    if (activeTab === 0) {
      return (
        <>
          <div className="ts-item"><div className="ts-dot warning"></div><div className="ts-time">14:00</div><div className="ts-desc">Hujan Lebat</div></div>
          <div className="ts-item"><div className="ts-dot danger"></div><div className="ts-time">18:00</div><div className="ts-desc">Puncak Banjir</div></div>
          <div className="ts-item"><div className="ts-dot warning"></div><div className="ts-time">22:00</div><div className="ts-desc">Mulai Surut</div></div>
          <div className="ts-item"><div className="ts-dot normal"></div><div className="ts-time">06:00</div><div className="ts-desc">Aman</div></div>
        </>
      );
    } else {
      return (
        <>
          <div className="ts-item"><div className="ts-dot danger"></div><div className="ts-time">Hari 1</div><div className="ts-desc">Siaga Banjir</div></div>
          <div className="ts-item"><div className="ts-dot warning"></div><div className="ts-time">Hari 2</div><div className="ts-desc">Pemulihan</div></div>
          <div className="ts-item"><div className="ts-dot normal"></div><div className="ts-time">Hari 3</div><div className="ts-desc">Normal</div></div>
        </>
      );
    }
  };

  return (
    <section className="forecast-section" id="forecast-section">
      <div className="forecast-bg">
        <div className="forecast-orb f-orb-1"></div>
        <div className="forecast-orb f-orb-2"></div>
      </div>
      <div className="section-header light">
        <div className="section-tag light">Prediksi AI</div>
        <h2 className="section-title light">Forecasting Banjir <span className="gradient-text-yellow">72 Jam</span></h2>
        <p className="section-sub light">Prediksi ketinggian banjir berbasis model cuaca dan data historis</p>
      </div>

      <div className="forecast-tabs">
        <button className={`ftab ${activeTab === 0 ? 'active' : ''}`} onClick={() => setActiveTab(0)}>24 Jam</button>
        <button className={`ftab ${activeTab === 1 ? 'active' : ''}`} onClick={() => setActiveTab(1)}>48 Jam</button>
        <button className={`ftab ${activeTab === 2 ? 'active' : ''}`} onClick={() => setActiveTab(2)}>72 Jam</button>
      </div>

      <div className="forecast-grid">
        <div className="forecast-main">
          <div style={{ position: 'relative', height: '300px', width: '100%' }}>
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
        <div className="forecast-cards">
          <div className="fcard danger">
            <div className="fcard-icon">🔴</div>
            <div className="fcard-body">
              <div className="fcard-title">Puncak Banjir</div>
              <div className="fcard-val">160cm</div>
              <div className="fcard-time">Hari ini, 18:00 WIB</div>
            </div>
          </div>
          <div className="fcard warning">
            <div className="fcard-icon">🌧️</div>
            <div className="fcard-body">
              <div className="fcard-title">Hujan Lebat</div>
              <div className="fcard-val">95mm/j</div>
              <div className="fcard-time">Besok, 14:00–17:00</div>
            </div>
          </div>
          <div className="fcard info">
            <div className="fcard-icon">📉</div>
            <div className="fcard-body">
              <div className="fcard-title">Prediksi Surut</div>
              <div className="fcard-val">48 Jam</div>
              <div className="fcard-time">Kondisi normal kembali</div>
            </div>
          </div>
          <div className="fcard success">
            <div className="fcard-icon">✅</div>
            <div className="fcard-body">
              <div className="fcard-title">Akurasi Model</div>
              <div className="fcard-val">87.4%</div>
              <div className="fcard-time">Berdasarkan data historis</div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="timeline-strip">
        <div className="ts-label">Timeline 72 Jam ke Depan</div>
        <div className="ts-items">
          {renderTimelineItems()}
        </div>
      </div>
    </section>
  );
};

export default ForecastSection;
