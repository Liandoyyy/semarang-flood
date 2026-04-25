import React from 'react';
import { Activity, AlertTriangle, Flame, ShieldCheck } from 'lucide-react';

interface StatsOverviewProps {
  stats: {
    aktif: number;
    bahaya: number;
    siaga: number;
    aman: number;
  };
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
      {/* Stasiun Aktif */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-start gap-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
          <Activity className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 mb-1">STASIUN AKTIF</div>
          <div className="text-2xl font-bold text-slate-800">{stats.aktif}</div>
          <div className="text-xs text-slate-500 mt-1">Tersebar di seluruh kota</div>
        </div>
      </div>

      {/* Bahaya */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-start gap-4">
        <div className="p-3 bg-red-50 text-red-600 rounded-lg">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 mb-1">BAHAYA</div>
          <div className="text-2xl font-bold text-slate-800">{stats.bahaya}</div>
          <div className="text-xs text-slate-500 mt-1">Melebihi ambang batas</div>
        </div>
      </div>

      {/* Siaga */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-start gap-4">
        <div className="p-3 bg-orange-50 text-orange-500 rounded-lg">
          <Flame className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 mb-1">SIAGA</div>
          <div className="text-2xl font-bold text-slate-800">{stats.siaga}</div>
          <div className="text-xs text-slate-500 mt-1">Mendekati batas</div>
        </div>
      </div>

      {/* Aman */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-start gap-4">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs font-semibold text-slate-500 mb-1">AMAN</div>
          <div className="text-2xl font-bold text-slate-800">{stats.aman}</div>
          <div className="text-xs text-slate-500 mt-1">Kondisi normal</div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
