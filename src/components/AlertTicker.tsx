import React from 'react';

const AlertTicker: React.FC = () => {
  return (
    <div className="alert-ticker">
      <div className="ticker-label">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L1 21h22L12 2zm0 3.99L20.53 19H3.47L12 5.99zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
        </svg>
        ALERT
      </div>
      <div className="ticker-track">
        <div className="ticker-content" id="tickerContent">
          ⚠️ Banjir tinggi di Semarang Barat · 🌧️ Curah hujan 85mm/jam di Gunungpati · ⚡ Siaga 1 Banjir Kanal Barat · 🌊 Ketinggian air Kali Beringin naik 40cm · ⚠️ Jl. Kaligawe terendam 50cm · 🔴 Evakuasi warga RW 03 Genuk sedang berlangsung ·
          &nbsp;&nbsp;
          ⚠️ Banjir tinggi di Semarang Barat · 🌧️ Curah hujan 85mm/jam di Gunungpati · ⚡ Siaga 1 Banjir Kanal Barat · 🌊 Ketinggian air Kali Beringin naik 40cm · ⚠️ Jl. Kaligawe terendam 50cm · 🔴 Evakuasi warga RW 03 Genuk sedang berlangsung ·
        </div>
      </div>
    </div>
  );
};

export default AlertTicker;
