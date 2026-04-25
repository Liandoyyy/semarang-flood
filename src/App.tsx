import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MapSection from './components/MapSection';
import StatsOverview from './components/StatsOverview';
import type { FloodPoint } from './types';

function App() {
  const [floodPoints, setFloodPoints] = useState<FloodPoint[]>([]);
  const [stats, setStats] = useState({ aktif: 6, bahaya: 2, siaga: 2, aman: 1 });
  const [lastUpdate, setLastUpdate] = useState("13.24.14");

  const fetchAndRenderData = async () => {
    try {
      const resFlood = await fetch(`http://localhost:3000/api/flood/realtime`);
      const floodResponse = await resFlood.json();
      
      if (floodResponse.status === 'success') {
        const points = floodResponse.data.flood_points;
        setFloodPoints(points);
        
        // Calculate stats
        let bahaya = 0, siaga = 0, aman = 0;
        points.forEach((p: any) => {
          if (p.status.includes('1')) bahaya++;
          else if (p.status.includes('2')) siaga++;
          else aman++;
        });
        
        setStats({
          aktif: points.length || 6,
          bahaya: bahaya || 2,
          siaga: siaga || 2,
          aman: aman || 1
        });
        
        const now = new Date();
        setLastUpdate(`${now.getHours().toString().padStart(2, '0')}.${now.getMinutes().toString().padStart(2, '0')}.${now.getSeconds().toString().padStart(2, '0')}`);
      }
    } catch(e) {
      console.error("API Fetch Error:", e);
      // Fallback dummy data if backend is offline or blocked by Vercel HTTPS
      const dummyPoints = [
        { name: "Pos Pantau Kanal Banjir Timur", lat: -6.955, lng: 110.420, water_level_cm: 313, status: "Siaga 1", desc: "Arus deras, level kritis." },
        { name: "Pos Tanjung Mas (Rob)", lat: -6.950, lng: 110.410, water_level_cm: 137, status: "Siaga 1", desc: "Air laut pasang (Rob)." },
        { name: "Pos Pantau Kanal Banjir Barat", lat: -6.960, lng: 110.390, water_level_cm: 242, status: "Siaga 2", desc: "Debit air meningkat cepat." },
        { name: "Pos Pemantau Sungai Beringin", lat: -6.975, lng: 110.350, water_level_cm: 229, status: "Siaga 2", desc: "Hulu hujan lebat." },
        { name: "Pos Banyumanik", lat: -7.050, lng: 110.415, water_level_cm: 52, status: "Normal", desc: "Aman terkendali." },
        { name: "Stasiun Pompa Kaligawe", lat: -6.958, lng: 110.435, water_level_cm: 80, status: "Normal", desc: "Pompa aktif maksimal." }
      ];
      setFloodPoints(dummyPoints);

      const now = new Date();
      setLastUpdate(`${now.getHours().toString().padStart(2, '0')}.${now.getMinutes().toString().padStart(2, '0')}.${now.getSeconds().toString().padStart(2, '0')}`);
    }
  };

  useEffect(() => {
    fetchAndRenderData();
    const timer = setInterval(fetchAndRenderData, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col font-sans">
      <div className="max-w-[1400px] mx-auto w-full space-y-6">
        <Navbar onRefresh={fetchAndRenderData} lastUpdate={lastUpdate} />
        <StatsOverview stats={stats} />
        
        <div className="flex flex-col lg:flex-row gap-6 h-[700px]">
          {/* Map Area */}
          <div className="lg:w-2/3 h-full rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
            <MapSection points={floodPoints} />
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 h-full">
            <Sidebar points={floodPoints} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
