import React from 'react';
import { Moon, Sun, Menu, Activity, Map as MapIcon } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="h-14 border-b bg-background flex items-center justify-between px-4 shrink-0 z-50">
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-muted rounded-md lg:hidden">
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <span>Semarang<span className="text-primary">Flood</span></span>
        </div>
      </div>

      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
        <a href="#" className="flex items-center gap-2 text-primary">
          <MapIcon className="w-4 h-4" /> Peta Live
        </a>
        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Statistik</a>
        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Laporan</a>
      </nav>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 text-xs px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full border border-green-500/20">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Connected
        </div>
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
