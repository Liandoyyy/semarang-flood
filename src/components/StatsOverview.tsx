import React from 'react';
import type { SummaryData } from '../types';
import { Droplets, AlertTriangle, Users, MapPin } from 'lucide-react';

interface StatsOverviewProps {
  summary: SummaryData;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pointer-events-auto">
      <StatCard 
        icon={<MapPin className="w-4 h-4 text-primary" />} 
        label="Titik Pantau Aktif" 
        value={summary.total_points} 
        sub="Semua sistem normal"
      />
      <StatCard 
        icon={<AlertTriangle className="w-4 h-4 text-orange-500" />} 
        label="Zona Siaga" 
        value={summary.flood_zones_active} 
        sub="Waspada di 3 kelurahan"
      />
      <StatCard 
        icon={<Droplets className="w-4 h-4 text-blue-500" />} 
        label="Ketinggian Maks" 
        value="142cm" 
        sub="Banjir Kanal Barat"
      />
      <StatCard 
        icon={<Users className="w-4 h-4 text-green-500" />} 
        label="Evakuasi Warga" 
        value={summary.evacuated_people} 
        sub="Terkoordinasi tim SAR"
      />
    </div>
  );
};

const StatCard = ({ icon, label, value, sub }: any) => (
  <div className="bg-card/90 backdrop-blur border border-border rounded-xl p-4 shadow-sm flex flex-col gap-1 transition-all hover:shadow-md">
    <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-wider">
      {icon}
      {label}
    </div>
    <div className="text-2xl font-bold text-foreground mt-1">{value}</div>
    <div className="text-xs text-muted-foreground">{sub}</div>
  </div>
);

export default StatsOverview;
