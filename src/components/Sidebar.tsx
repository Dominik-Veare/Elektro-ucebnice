import React from 'react';
import { 
  X, 
  BookOpen, 
  Clock, 
  AlertCircle, 
  CreditCard, 
  Calculator, 
  ToggleLeft, 
  Search, 
  Cloud, 
  CheckCircle2, 
  ChevronRight
} from 'lucide-react';
import { UserProgress } from '../types';
import { CHAPTERS } from '../data/chapters';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onSelectChapter: (chapterId: number) => void;
  progress: UserProgress;
  onOpenSync: () => void;
  totalSubchapters: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  currentTab,
  setCurrentTab,
  onSelectChapter,
  progress,
  onOpenSync,
  totalSubchapters,
}) => {
  if (!isOpen) return null;

  const completedCount = progress.completedSubchapters.length;
  const progressPercent = totalSubchapters > 0 
    ? Math.round((completedCount / totalSubchapters) * 100) 
    : 0;

  const mistakeCount = Object.values(progress.mistakes).filter(m => m.correctInRow < 2).length;

  const navItems = [
    { id: 'ucebnice', label: 'Učebnice', sublabel: '8 odborných kapitol', icon: BookOpen },
    { id: 'zkouska', label: 'Ostrý test (45 min)', sublabel: 'Simulátor státní zkoušky', icon: Clock, badge: '45 min' },
    { id: 'chyby', label: 'Kniha chyb', sublabel: 'Otázky k procvičení', icon: AlertCircle, badgeCount: mistakeCount },
    { id: 'karticky', label: 'Kartičky (ústní část)', sublabel: 'Otázky zkoušejícího', icon: CreditCard },
    { id: 'kalkulacky', label: 'Kalkulačky', sublabel: 'Dimenzování, Zs a Ohm', icon: Calculator },
    { id: 'schemata', label: 'Schémata zapojení', sublabel: 'Vypínače 1, 5, 6, 7 a RCD', icon: ToggleLeft },
    { id: 'diagnostika', label: 'Diagnostika poruch', sublabel: 'Simulované závady', icon: Search },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    onClose();
  };

  const handleChapterClick = (chapterId: number) => {
    setCurrentTab('ucebnice');
    onSelectChapter(chapterId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex animate-fadeIn">
      {/* Tmavý podklad / Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Samotný postranní vysouvací panel */}
      <aside className="relative w-80 max-w-[85vw] bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col justify-between z-10 animate-slideRight text-slate-100">
        
        {/* Horní hlavička menu */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
              <svg className="w-5 h-5 text-slate-950 font-black" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white">
                  ElektroUčebnice
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  26-017-H
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Montér elektrických instalací
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Zavřít menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Posuvný obsah menu */}
        <div className="flex-1 overflow-y-auto p-3 space-y-6">
          
          {/* 1. Hlavní sekce aplikace */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2 block font-mono">
              Hlavní nabídka
            </span>
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = currentTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between group ${
                      active
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-slate-950' : 'text-slate-400 group-hover:text-amber-400'}`} />
                      <div>
                        <div className="text-sm font-semibold leading-tight">{item.label}</div>
                        <div className={`text-[11px] leading-tight mt-0.5 ${active ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                          {item.sublabel}
                        </div>
                      </div>
                    </div>

                    {item.badgeCount && item.badgeCount > 0 ? (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        active ? 'bg-slate-900 text-amber-400' : 'bg-red-500 text-white'
                      }`}>
                        {item.badgeCount}
                      </span>
                    ) : item.badge ? (
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        active ? 'bg-slate-900 text-amber-400' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {item.badge}
                      </span>
                    ) : (
                      <ChevronRight className={`w-4 h-4 opacity-50 group-hover:translate-x-0.5 transition-transform ${active ? 'text-slate-950' : 'text-slate-400'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Rychlý skok do 8 kapitol */}
          <div className="pt-2 border-t border-slate-800/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2 block font-mono">
              Kapitoly učebnice (1–8)
            </span>
            <div className="space-y-1">
              {CHAPTERS.map((ch) => {
                const chapterSubIds = ch.subchapters.map(s => s.id);
                const isFullyRead = chapterSubIds.every(id => progress.completedSubchapters.includes(id));
                const score = progress.quizScores[ch.id];

                return (
                  <button
                    key={ch.id}
                    onClick={() => handleChapterClick(ch.id)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-800 transition-colors flex items-center justify-between text-slate-300 hover:text-white group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center font-mono font-bold text-[10px] text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shrink-0">
                        {ch.id}
                      </span>
                      <span className="truncate">{ch.title}</span>
                    </div>

                    <div className="shrink-0 pl-2">
                      {isFullyRead ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : score ? (
                        <span className="text-[10px] font-mono text-emerald-400">{score.score}/{score.total}</span>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Spodní panel sidebaru: Progres a Synchronizace */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 space-y-3">
          
          {/* Progres pruh */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span>Celkový postup studia</span>
              <span className="font-bold text-emerald-400">{progressPercent} %</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Tlačítko synchronizace */}
          <button
            onClick={() => {
              onClose();
              onOpenSync();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-amber-400" />
              <span>Sdílet s mobilem</span>
            </div>
            <span className="font-mono text-amber-400 font-bold">{progress.syncId}</span>
          </button>
        </div>

      </aside>
    </div>
  );
};
