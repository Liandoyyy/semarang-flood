import React from 'react';
import { Waves, RefreshCw } from 'lucide-react';

interface NavbarProps {
  onRefresh: () => void;
  lastUpdate: string;
}

const Navbar: React.FC<NavbarProps> = ({ onRefresh, lastUpdate }) => {
  return (
    <header className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
          <Waves className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-xl text-slate-800 leading-tight">Semarang Flood Monitor</h1>
          <p className="text-sm text-slate-500">Pemantauan banjir kota Semarang secara real-time</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          Pembaruan: {lastUpdate}
        </div>
        <button 
          onClick={onRefresh}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-md hover:bg-slate-50 shadow-sm transition-colors text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Segarkan
        </button>
      </div>
    </header>
  );
};

export default Navbar;
