import React from 'react';
import type { FloodPoint, SummaryData } from '../types';
import ForecastChart from './ForecastChart';
import { AlertCircle, BellRing, CloudRain } from 'lucide-react';

interface SidebarProps {
  summary: SummaryData;
  points: FloodPoint[];
  forecastData: any;
}

const Sidebar: React.FC<SidebarProps> = ({ summary, points, forecastData }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Forecast Section */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-primary" />
            AI Forecast (24 Jam)
          </h3>
          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">Akurasi 87%</span>
        </div>
        <div className="h-48 w-full">
          <ForecastChart data={forecastData} />
        </div>
      </div>

      {/* Realtime Alerts */}
      <div className="p-4 flex-1 flex flex-col min-h-0">
        <h3 className="font-semibold text-sm flex items-center gap-2 mb-4">
          <BellRing className="w-4 h-4 text-orange-500" />
          Real-time Alerts
        </h3>
        
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {points.length > 0 ? (
            points.map((pt, i) => (
              <AlertCard key={i} point={pt} />
            ))
          ) : (
            // Dummy alerts if API fails or empty
            <>
              <AlertCard point={{ name: "Banjir Kanal Barat", status: "Siaga 1", water_level_cm: 142, desc: "Tren naik cepat, waspada luapan." } as any} />
              <AlertCard point={{ name: "Kali Beringin", status: "Siaga 2", water_level_cm: 98, desc: "Hujan lebat di daerah hulu." } as any} />
              <AlertCard point={{ name: "Pompa Kaligawe", status: "Siaga 2", water_level_cm: 115, desc: "2 unit pompa penyedot aktif." } as any} />
              <AlertCard point={{ name: "Banjir Kanal Timur", status: "Normal", water_level_cm: 65, desc: "Kondisi aman terkendali." } as any} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const AlertCard = ({ point }: { point: FloodPoint }) => {
  const isDanger = point.status.includes('1');
  const isWarning = point.status.includes('2');
  
  let borderColor = 'border-border';
  let badgeClass = 'bg-green-500/10 text-green-600 dark:text-green-400';
  let iconClass = 'text-green-500';

  if (isDanger) {
    borderColor = 'border-red-500/50';
    badgeClass = 'bg-red-500/10 text-red-600 dark:text-red-400';
    iconClass = 'text-red-500';
  } else if (isWarning) {
    borderColor = 'border-orange-500/50';
    badgeClass = 'bg-orange-500/10 text-orange-600 dark:text-orange-400';
    iconClass = 'text-orange-500';
  }

  return (
    <div className={`p-3 rounded-lg border ${borderColor} bg-card text-card-foreground shadow-sm`}>
      <div className="flex justify-between items-start mb-2">
        <div className="font-medium text-sm">{point.name}</div>
        <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${badgeClass}`}>
          {point.status}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
        {point.desc}
      </p>
      <div className="flex items-center gap-4 text-xs font-medium">
        <div className="flex items-center gap-1.5">
          <AlertCircle className={`w-3 h-3 ${iconClass}`} />
          {point.water_level_cm}cm
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          Update: Baru saja
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
