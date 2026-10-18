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
import { UserProgress, QualificationId, QUALIFICATIONS, LiveSyncStatus } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  progress: UserProgress;
  onOpenSync: () => void;
  totalSubchapters: number;
  onToggleSidebar: () => void;
  activeQualification: QualificationId;
  onSelectQualification: (id: QualificationId) => void;
  syncStatus?: LiveSyncStatus;
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
  syncStatus = 'idle',
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
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 w-full">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-6 w-full">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-3">
            
            {/* Tlačítko pro vysunutí postranního menu + Logo, název a přepínač učebnice */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
              <button
                onClick={onToggleSidebar}
                className="p-1.5 sm:p-2 -ml-1 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center shrink-0 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                title="Otevřít postranní menu"
                aria-label="Otevřít postranní menu"
              >
                <Menu className="w-5 h-5 text-amber-400" />
              </button>

              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <div 
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform shrink-0 cursor-pointer"
                  onClick={() => setCurrentTab('ucebnice')}
                  title="Přejít na učebnici"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 font-black" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>

                <div className="flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <span 
                      onClick={() => setCurrentTab('ucebnice')}
                      className="font-extrabold text-sm sm:text-base lg:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent cursor-pointer truncate"
                    >
                      ElektroUčebnice
                    </span>

                    {/* Intuitivní tlačítkový přepínač učebnic v záhlaví */}
                    <div className="relative shrink-0" ref={switcherRef}>
                      <button
                        type="button"
                        onClick={() => setIsSwitcherOpen((prev) => !prev)}
                        title="Přepnout učebnici profesní kvalifikace"
                        aria-expanded={isSwitcherOpen}
                        className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-mono font-bold transition-all shadow-sm cursor-pointer select-none border shrink-0 ${
                          isSwitcherOpen
                            ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-amber-500/25'
                            : 'bg-amber-500/20 hover:bg-amber-500/30 active:scale-95 text-amber-300 hover:text-amber-200 border-amber-500/40 hover:border-amber-400/70 shadow-amber-500/10'
                        }`}
                      >
                        <span>{currentQual.id}</span>
                        <ChevronDown
                          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 ${
                            isSwitcherOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Rozbalovací seznam 5 učebnic */}
                      {isSwitcherOpen && (
                        <div className="fixed inset-x-3 top-16 sm:absolute sm:inset-x-auto sm:left-0 sm:top-full mt-2 w-auto sm:w-96 rounded-2xl bg-slate-900 border border-slate-700/90 shadow-2xl shadow-black/70 py-2 z-50 animate-fadeIn">
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
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Progres indikátor (viditelný od tabletů md:) */}
              <div className="hidden md:flex flex-col items-end text-xs shrink-0">
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

              {/* Tlačítko synchronizace k mobilu - kompaktní ikona s tečkou stavu na mobilu, plný text od sm: */}
              <button
                onClick={onOpenSync}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors shadow-sm shrink-0 group"
                title={
                  syncStatus === 'connected'
                    ? 'Živé propojení aktivní – každá změna se ihned projeví na mobilu i PC'
                    : syncStatus === 'syncing'
                    ? 'Probíhá synchronizace...'
                    : syncStatus === 'offline'
                    ? 'Offline – změny jsou bezpečně uloženy v zařízení'
                    : 'Sdílet postup mezi PC a mobilem'
                }
                aria-label="Sdílet postup mezi PC a mobilem"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  {syncStatus === 'connected' && (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </>
                  )}
                  {syncStatus === 'syncing' && (
                    <span className="animate-spin relative inline-flex rounded-full h-2 w-2 border-2 border-amber-400 border-t-transparent"></span>
                  )}
                  {syncStatus === 'offline' && (
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
                  )}
                  {(!syncStatus || syncStatus === 'idle') && (
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                  )}
                </span>
                <Cloud className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="hidden sm:inline text-slate-400">Kód:</span>
                <span className="hidden sm:inline font-mono text-amber-400 font-bold group-hover:text-amber-300">
                  {progress.syncId || 'Sdílet'}
                </span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Spodní mobilní navigace pro snadné ovládání palcem - přesná 7sloupcová symetrická mřížka */}
      <nav
        aria-label="Mobilní navigace"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800/90 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]"
        style={{ paddingBottom: 'max(0.35rem, env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="grid grid-cols-7 w-full items-stretch py-1 px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentTab(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all relative w-full min-w-0 select-none group ${
                  active
                    ? 'text-amber-400 font-bold bg-amber-500/10'
                    : 'text-slate-400 hover:text-slate-200 active:bg-slate-800/60'
                }`}
              >
                {/* Ikona s notifikačním odznakem vázaným přímo na ikonu */}
                <div className="relative flex items-center justify-center">
                  <Icon
                    className={`w-5 h-5 mb-0.5 shrink-0 transition-transform duration-200 ${
                      active ? 'text-amber-400 scale-110' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  {item.badgeCount && item.badgeCount > 0 ? (
                    <span className="absolute -top-1 -right-1.5 min-w-[14px] h-3.5 px-1 rounded-full bg-red-500 text-white font-mono text-[9px] font-black flex items-center justify-center ring-2 ring-slate-900 shadow-sm pointer-events-none">
                      {item.badgeCount > 9 ? '9+' : item.badgeCount}
                    </span>
                  ) : null}
                </div>

                {/* Popisek - dokonale vycentrovaný v 1/7 šířky s ochranou proti přetečení */}
                <span className="w-full text-center text-[9px] min-[380px]:text-[10px] leading-tight tracking-tight truncate px-0.5 block font-medium">
                  {item.shortLabel}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
