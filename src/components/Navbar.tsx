import React from 'react';
import { 
  BookOpen, 
  Clock, 
  AlertCircle, 
  CreditCard, 
  Calculator, 
  ToggleLeft, 
  Search, 
  Cloud, 
  CheckCircle2
} from 'lucide-react';
import { UserProgress } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  progress: UserProgress;
  onOpenSync: () => void;
  totalSubchapters: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  progress,
  onOpenSync,
  totalSubchapters,
}) => {
  const completedCount = progress.completedSubchapters.length;
  const progressPercent = totalSubchapters > 0 
    ? Math.round((completedCount / totalSubchapters) * 100) 
    : 0;

  const mistakeCount = Object.values(progress.mistakes).filter(m => m.correctInRow < 2).length;

  const navItems = [
    { id: 'ucebnice', label: 'Učebnice', icon: BookOpen },
    { id: 'zkouska', label: 'Ostrý test (45 min)', icon: Clock, badge: 'Zkouška' },
    { id: 'chyby', label: 'Kniha chyb', icon: AlertCircle, badgeCount: mistakeCount },
    { id: 'karticky', label: 'Kartičky', icon: CreditCard },
    { id: 'kalkulacky', label: 'Kalkulačky', icon: Calculator },
    { id: 'schemata', label: 'Schémata', icon: ToggleLeft },
    { id: 'diagnostika', label: 'Diagnostika', icon: Search },
  ];

  return (
    <>
      {/* Hlavní horní navigační panel */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo a název */}
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setCurrentTab('ucebnice')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-slate-950 font-black" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                    ElektroUčebnice
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    26-017-H
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Příprava na státní zkoušku: Montér elektrických instalací
                </p>
              </div>
            </div>

            {/* Desktopové položky menu */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      active
                        ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-slate-950' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                    {item.badgeCount && item.badgeCount > 0 ? (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        active ? 'bg-slate-900 text-amber-400' : 'bg-red-500 text-white'
                      }`}>
                        {item.badgeCount}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>

            {/* Pravá část: Progres a tlačítko Synchronizace */}
            <div className="flex items-center gap-3">
              {/* Progres indikátor */}
              <div className="hidden sm:flex flex-col items-end text-xs">
                <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{progressPercent}% hotovo</span>
                </div>
                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Tlačítko synchronizace k mobilu */}
              <button
                onClick={onOpenSync}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 hover:text-amber-300 transition-colors shadow-sm"
                title="Sdílet postup mezi PC a mobilem"
              >
                <Cloud className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Kód:</span>
                <span className="font-mono text-slate-100">{progress.syncId || 'Sdílet'}</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Spodní mobilní navigace pro snadné ovládání palcem */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 rounded-lg text-[10px] font-medium transition-all relative ${
                active ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${active ? 'text-amber-400 scale-110' : 'text-slate-400'}`} />
              <span className="truncate max-w-[50px]">{item.label.split(' ')[0]}</span>
              {item.badgeCount && item.badgeCount > 0 ? (
                <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-slate-900" />
              ) : null}
            </button>
          );
        })}
      </nav>
    </>
  );
};
