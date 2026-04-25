import React from 'react';
import type { FloodPoint } from '../types';
import { MapPin } from 'lucide-react';

interface SidebarProps {
  points: FloodPoint[];
}

const Sidebar: React.FC<SidebarProps> = ({ points }) => {
  // Sort points so Bahaya is on top
  const sortedPoints = [...points].sort((a, b) => {
    if (a.status.includes('1') && !b.status.includes('1')) return -1;
    if (!a.status.includes('1') && b.status.includes('1')) return 1;
    if (a.status.includes('2') && !b.status.includes('2')) return -1;
    if (!a.status.includes('2') && b.status.includes('2')) return 1;
    return 0;
  });

  // Use dummies if empty
  const displayPoints = sortedPoints.length > 0 ? sortedPoints : [
    { name: "Pos Pantau Kanal Banjir Timur", status: "Siaga 1", water_level_cm: 313, desc: "SEMARANG TIMUR" },
    { name: "Pos Tanjung Mas (Rob)", status: "Siaga 1", water_level_cm: 137, desc: "SEMARANG UTARA" },
    { name: "Pos Pantau Kanal Banjir Barat", status: "Siaga 2", water_level_cm: 242, desc: "SEMARANG BARAT" },
    { name: "Pos Pemantau Sungai Beringin", status: "Siaga 2", water_level_cm: 229, desc: "TUGU" },
    { name: "Pos Banyumanik", status: "Normal", water_level_cm: 52, desc: "BANYUMANIK" }
  ];

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header Sidebar */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
        <h3 className="font-semibold text-slate-800">Stasiun Pemantau</h3>
        <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 text-red-600 bg-red-50 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
          LIVE
        </span>
      </div>

      {/* List Stasiun */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {displayPoints.map((pt: any, i) => {
          const isDanger = pt.status.includes('1');
          const isWarning = pt.status.includes('2');
          
          let badgeText = 'AMAN';
          let badgeColor = 'bg-emerald-500';
          let barColor = 'bg-emerald-500';
          let progress = Math.min((pt.water_level_cm / 200) * 100, 100);
          
          if (isDanger) {
            badgeText = 'BAHAYA';
            badgeColor = 'bg-red-500';
            barColor = 'bg-red-500';
            progress = Math.min((pt.water_level_cm / 350) * 100, 100);
          } else if (isWarning) {
            badgeText = 'SIAGA';
            badgeColor = 'bg-orange-500';
            barColor = 'bg-orange-500';
            progress = Math.min((pt.water_level_cm / 300) * 100, 100);
          } else {
             // For Aman, make progress lower
             progress = Math.min((pt.water_level_cm / 150) * 30, 100);
          }

          const meter = (pt.water_level_cm / 100).toFixed(2);
          const limit = isDanger ? '2.90' : (isWarning ? '2.50' : '2.00');

          return (
            <div key={i} className="flex flex-col gap-2 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1 text-xs text-slate-500 uppercase font-medium">
                  <MapPin className="w-3 h-3" />
                  {pt.desc || "SEMARANG"}
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold text-white ${badgeColor}`}>
                  {badgeText}
                </span>
              </div>
              
              <div className="font-semibold text-sm text-slate-800 leading-tight">
                {pt.name}
              </div>
              
              <div className="flex justify-between items-end text-xs text-slate-500">
                <div>
                  <span className="text-slate-800 font-medium">{meter} m</span> / {limit} m
                </div>
                <div>kurang dari 1 menit yang lalu</div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                <div 
                  className={`h-full ${barColor} rounded-full`} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
