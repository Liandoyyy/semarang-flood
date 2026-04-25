import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { FloodPoint } from '../types';
import { Info, ChevronUp, ChevronDown } from 'lucide-react';

const SEMARANG_COORDS: [number, number] = [-7.0051, 110.4381];
const MAP_ZOOM = 13;

interface MapSectionProps {
  points: FloodPoint[];
}

const MapSection: React.FC<MapSectionProps> = ({ points }) => {
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  // Shadcn-style custom marker (pill shape or clean dot)
  const createIcon = (status: string) => {
    let color = '#10b981'; // emerald-500
    if (status.includes('1')) color = '#ef4444'; // red-500
    else if (status.includes('2')) color = '#f97316'; // orange-500

    return new L.DivIcon({
      className: 'bg-transparent border-0',
      html: `
        <div class="relative flex items-center justify-center w-6 h-6">
          <div class="absolute inset-0 rounded-full opacity-30 animate-ping" style="background-color: ${color}"></div>
          <div class="relative w-3 h-3 rounded-full border-2 border-white shadow-sm" style="background-color: ${color}"></div>
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12]
    });
  };

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={SEMARANG_COORDS} 
        zoom={MAP_ZOOM} 
        style={{ height: '100%', width: '100%', zIndex: 1 }} 
        zoomControl={false} 
        attributionControl={false}
      >
        {/* Custom Controls Position */}
        <div className="leaflet-top leaflet-right mt-20 mr-4">
          <div className="leaflet-control leaflet-bar shadow-sm rounded-md overflow-hidden border-border bg-card">
            {/* Zoom controls usually added by leaflet but we can style them in index.css */}
          </div>
        </div>

        <TileLayer 
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        />

        {points.map((pt, i) => (
          <Marker key={i} position={[pt.lat, pt.lng]} icon={createIcon(pt.status)}>
            <Popup className="shadcn-popup">
              <div className="p-1 min-w-[200px]">
                <div className="font-semibold text-sm mb-1">{pt.name}</div>
                <div className="text-xs text-muted-foreground mb-3">{pt.desc}</div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-muted p-2 rounded-md">
                    <div className="text-muted-foreground mb-1">Status</div>
                    <div className="font-medium">{pt.status}</div>
                  </div>
                  <div className="bg-muted p-2 rounded-md">
                    <div className="text-muted-foreground mb-1">Level Air</div>
                    <div className="font-medium text-primary">{pt.water_level_cm}cm</div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Area for Real GeoJSON Data Integration later */}
      </MapContainer>

      {/* Floating Legend */}
      <div className="absolute bottom-6 left-4 z-[400] bg-card/90 backdrop-blur border border-border rounded-xl shadow-sm text-xs w-48 overflow-hidden transition-all duration-300">
        <button 
          onClick={() => setIsLegendOpen(!isLegendOpen)}
          className="w-full flex items-center justify-between p-3 font-semibold hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-muted-foreground" />
            Keterangan Peta
          </div>
          {isLegendOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronUp className="w-4 h-4 text-muted-foreground" />}
        </button>
        
        {isLegendOpen && (
          <div className="p-3 pt-0 space-y-2 border-t border-border mt-1">
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> Siaga 1 (Awas)</div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div> Siaga 2 (Waspada)</div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> Normal</div>
            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border">
              <div className="w-3 h-3 border border-red-500 bg-red-500/20 rounded-sm"></div> Area Tergenang
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapSection;
