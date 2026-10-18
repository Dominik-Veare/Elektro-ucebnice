import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  AlertCircle, 
  CreditCard, 
  Calculator, 
  ToggleLeft, 
  Search, 
  Cloud, 
  CheckCircle2,
  Menu,
  ChevronDown,
  Check
} from 'lucide-react';
import { UserProgress, QualificationId, QUALIFICATIONS } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  progress: UserProgress;
  onOpenSync: () => void;
  totalSubchapters: number;
  onToggleSidebar: () => void;
  activeQualification: QualificationId;
  onSelectQualification: (id: QualificationId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  progress,
  onOpenSync,
  totalSubchapters,
  onToggleSidebar,
  activeQualification,
  onSelectQualification,
}) => {
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement | null>(null);

  const currentQual =
    QUALIFICATIONS.find((q) => q.id === activeQualification) || QUALIFICATIONS[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setIsSwitcherOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSwitcherOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const completedCount = progress.completedSubchapters.length;
  const progressPercent = totalSubchapters > 0 
    ? Math.round((completedCount / totalSubchapters) * 100) 
    : 0;

  const mistakeCount = Object.values(progress.mistakes).filter(m => m.correctInRow < 2).length;

  const navItems = [
    { id: 'ucebnice', label: 'Učebnice', shortLabel: 'Učebnice', icon: BookOpen },
    { id: 'zkouska', label: 'Cvičný test', shortLabel: 'Test', icon: Clock },
    { id: 'chyby', label: 'Kniha chyb', shortLabel: 'Chyby', icon: AlertCircle, badgeCount: mistakeCount },
    { id: 'karticky', label: 'Kartičky', shortLabel: 'Kartičky', icon: CreditCard },
    { id: 'kalkulacky', label: 'Kalkulačky', shortLabel: 'Kalkulačky', icon: Calculator },
    { id: 'schemata', label: 'Schémata', shortLabel: 'Schémata', icon: ToggleLeft },
    { id: 'diagnostika', label: 'Diagnostika', shortLabel: 'Diagnostika', icon: Search },
  ];

  return (
    <>
      {/* Hlavní horní navigační panel */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 gap-3">
            
            {/* Tlačítko pro vysunutí postranního menu + Logo, název a přepínač učebnice */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <button
                onClick={onToggleSidebar}
                className="p-2 -ml-1 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                title="Otevřít postranní menu"
                aria-label="Otevřít postranní menu"
              >
                <Menu className="w-5 h-5 text-amber-400" />
              </button>

              <div className="flex items-center gap-2.5 shrink-0">
                <div 
                  className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform shrink-0 cursor-pointer"
                  onClick={() => setCurrentTab('ucebnice')}
                >
                  <svg className="w-5 h-5 text-slate-950 font-black" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <span 
                      onClick={() => setCurrentTab('ucebnice')}
                      className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent cursor-pointer"
                    >
                      ElektroUčebnice
                    </span>

                    {/* Intuitivní tlačítkový přepínač učebnic v záhlaví */}
                    <div className="relative" ref={switcherRef}>
                      <button
                        type="button"
                        onClick={() => setIsSwitcherOpen((prev) => !prev)}
                        title="Přepnout učebnici profesní kvalifikace"
                        aria-expanded={isSwitcherOpen}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all shadow-sm cursor-pointer select-none border ${
                          isSwitcherOpen
                            ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-amber-500/25'
                            : 'bg-amber-500/20 hover:bg-amber-500/30 active:scale-95 text-amber-300 hover:text-amber-200 border-amber-500/40 hover:border-amber-400/70 shadow-amber-500/10'
                        }`}
                      >
                        <span>{currentQual.id}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isSwitcherOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Rozbalovací seznam 5 učebnic */}
                      {isSwitcherOpen && (
                        <div className="absolute left-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-700/90 shadow-2xl shadow-black/70 py-2 z-50 animate-fadeIn">
                          <div className="px-3.5 py-1.5 border-b border-slate-800 flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                              Výběr učebnice (NSK)
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">
                              5 kvalifikací
                            </span>
                          </div>

                          <div className="p-1.5 space-y-1">
                            {QUALIFICATIONS.map((qual) => {
                              const isSelected = qual.id === activeQualification;
                              return (
                                <button
                                  key={qual.id}
                                  type="button"
                                  onClick={() => {
                                    onSelectQualification(qual.id);
                                    setIsSwitcherOpen(false);
                                  }}
                                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between gap-3 ${
                                    isSelected
                                      ? 'bg-amber-500/15 border border-amber-500/40 text-white'
                                      : 'hover:bg-slate-800/80 border border-transparent text-slate-300 hover:text-white'
                                  }`}
                                >
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span
                                        className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                                          isSelected
                                            ? 'bg-amber-500 text-slate-950'
                                            : 'bg-slate-800 text-amber-400 border border-slate-700'
                                        }`}
                                      >
                                        {qual.id}
                                      </span>
                                      {!qual.hasContent && (
                                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-800/90 text-slate-400">
                                          Prázdná
                                        </span>
                                      )}
                                    </div>
                                    <div className="text-xs font-semibold mt-1 truncate">
                                      {qual.title} {qual.id}
                                    </div>
                                  </div>

                                  {isSelected && (
                                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 hidden xl:block whitespace-nowrap leading-none mt-0.5">
                    {currentQual.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Pravá část: Progres a tlačítko Synchronizace */}
            <div className="flex items-center gap-2.5 shrink-0 whitespace-nowrap">
              {/* Progres indikátor */}
              <div className="hidden sm:flex flex-col items-end text-xs shrink-0">
                <div className="flex items-center gap-1.5 text-slate-300 font-medium whitespace-nowrap">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{progressPercent} % hotovo</span>
                </div>
                <div className="w-20 xl:w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Tlačítko synchronizace k mobilu */}
              <button
                onClick={onOpenSync}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 hover:text-amber-300 transition-colors shadow-sm shrink-0 whitespace-nowrap"
                title="Sdílet postup mezi PC a mobilem"
              >
                <Cloud className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline text-slate-400">Kód:</span>
                <span className="font-mono text-slate-100 font-bold">{progress.syncId || 'Sdílet'}</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Spodní mobilní navigace pro snadné ovládání palcem */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-1 py-1.5 flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`flex flex-col items-center justify-center p-1 rounded-lg text-[10px] font-medium transition-all relative shrink-0 ${
                active ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 shrink-0 ${active ? 'text-amber-400 scale-110' : 'text-slate-400'}`} />
              <span className="whitespace-nowrap tracking-tight">{item.shortLabel}</span>
              {item.badgeCount && item.badgeCount > 0 ? (
                <span className="absolute top-0.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-slate-900" />
              ) : null}
            </button>
          );
        })}
      </nav>
    </>
  );
};
