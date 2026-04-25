import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MapSection from './components/MapSection';
import StatsOverview from './components/StatsOverview';
import type { FloodPoint, SummaryData } from './types';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [floodPoints, setFloodPoints] = useState<FloodPoint[]>([]);
  const [summary, setSummary] = useState<SummaryData>({
    total_points: 24,
    flood_zones_active: 7,
    total_affected_areas: 7,
    evacuated_people: 1240,
    forecast_confidence: 0.874
  });
  const [forecastData, setForecastData] = useState<any>(null);

  // Toggle Theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Fetch Data (simulated for now, replace with actual API call)
  useEffect(() => {
    const fetchAndRenderData = async () => {
      try {
        const resFlood = await fetch(`http://localhost:3000/api/flood/realtime`);
        const floodResponse = await resFlood.json();
        
        if (floodResponse.status === 'success') {
          setSummary(floodResponse.data.summary);
          setFloodPoints(floodResponse.data.flood_points);
        }

        const resForecast = await fetch(`http://localhost:3000/api/weather/forecast`);
        const forecastResponse = await resForecast.json();
        
        if (forecastResponse.status === 'success') {
           setForecastData(forecastResponse.data);
        }
      } catch(e) {
        console.error("API Fetch Error:", e);
      }
    };
    fetchAndRenderData();
    const timer = setInterval(fetchAndRenderData, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen w-full flex-col bg-background overflow-hidden">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-muted/20 relative">
          {/* Floating Stats */}
          <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none">
            <StatsOverview summary={summary} />
          </div>
          
          {/* Map Area */}
          <div className="flex-1 w-full h-full">
            <MapSection points={floodPoints} theme={theme} />
          </div>
        </main>

        {/* Right Sidebar for Alerts & Forecast */}
        <aside className="w-96 border-l bg-background flex flex-col shrink-0 overflow-y-auto">
          <Sidebar summary={summary} points={floodPoints} forecastData={forecastData} />
        </aside>
      </div>
    </div>
  );
}

export default App;
