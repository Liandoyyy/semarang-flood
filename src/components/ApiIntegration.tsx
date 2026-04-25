import React, { useState } from 'react';

interface ApiIntegrationProps {
  onConnect: (url: string, interval: number) => void;
  apiStatus: { type: 'idle'|'loading'|'success'|'error', msg: string };
}

const ApiIntegration: React.FC<ApiIntegrationProps> = ({ onConnect, apiStatus }) => {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [interval, setIntervalVal] = useState('30');

  const handleConnect = () => {
    onConnect(url, parseInt(interval));
  };

  const copyCode = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      navigator.clipboard.writeText(el.innerText).then(() => {
        alert('Kode berhasil disalin!');
      });
    }
  };

  return (
    <section className="api-section" id="api-section">
      <div className="section-header">
        <div className="section-tag">Integrasi</div>
        <h2 className="section-title">Akses <span className="gradient-text">WebGIS API</span></h2>
        <p className="section-sub">Integrasikan data banjir real-time ke aplikasi Anda menggunakan REST API kami</p>
      </div>

      <div className="api-grid">
        <div className="api-card">
          <div className="api-card-header">
            <span className="api-method get">GET</span>
            <span className="api-endpoint">/api/flood/realtime</span>
            <span className="api-badge">Live</span>
          </div>
          <p className="api-desc">Ambil data banjir real-time seluruh titik monitoring di Kota Semarang</p>
          <div className="code-block">
            <div className="code-header">
              <span>🔑 Konfigurasi API Anda</span>
              <button className="copy-btn" onClick={() => copyCode('apiConfig')}>Salin</button>
            </div>
            <pre id="apiConfig">{`// Ganti dengan URL WebGIS API Anda
const API_BASE = "https://your-webgis-api.com";
const API_KEY  = "YOUR_API_KEY_HERE";

// Endpoint yang tersedia:
// GET /api/flood/realtime     — Data banjir live
// GET /api/flood/history      — Histori ketinggian
// GET /api/weather/forecast   — Prakiraan cuaca
// GET /api/sensor/list        — Daftar sensor aktif
// GET /api/evac/routes        — Jalur evakuasi`}</pre>
          </div>
        </div>

        <div className="api-card">
          <div className="api-card-header">
            <span className="api-method post">CONFIG</span>
            <span className="api-endpoint">Pengaturan API</span>
          </div>
          <p className="api-desc">Masukkan URL dan API Key WebGIS Anda untuk mengaktifkan data live</p>
          <div className="api-form">
            <div className="form-group">
              <label htmlFor="apiUrl">URL WebGIS API</label>
              <input 
                type="text" 
                id="apiUrl" 
                placeholder="http://localhost:3000" 
                className="api-input"
                value={url}
                onChange={e => setUrl(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="apiKey">API Key</label>
              <input 
                type="password" 
                id="apiKey" 
                placeholder="Masukkan API Key Anda" 
                className="api-input" 
                value={key}
                onChange={e => setKey(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="refreshInterval">Interval Refresh (detik)</label>
              <select 
                id="refreshInterval" 
                className="api-input"
                value={interval}
                onChange={e => setIntervalVal(e.target.value)}
              >
                <option value="10">10 detik</option>
                <option value="30">30 detik</option>
                <option value="60">1 menit</option>
                <option value="300">5 menit</option>
              </select>
            </div>
            <button className="btn-primary full" onClick={handleConnect}>🔗 Hubungkan API</button>
            
            {apiStatus.msg && (
              <div className={`api-status-msg ${apiStatus.type === 'success' ? 'success' : apiStatus.type === 'error' ? 'error' : ''}`}>
                {apiStatus.msg}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="response-preview">
        <div className="rp-header">
          <span>📄 Contoh Response JSON (Dummy Data)</span>
          <button className="copy-btn" onClick={() => copyCode('responseJson')}>Salin</button>
        </div>
        <pre id="responseJson">{`{
  "status": "success",
  "timestamp": "2026-04-25T12:00:00+07:00",
  ...
}`}</pre>
      </div>
    </section>
  );
};

export default ApiIntegration;
