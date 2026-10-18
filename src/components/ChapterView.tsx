import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Sliders, 
  FileText, 
  Wrench, 
  Cpu, 
  Activity, 
  HeartPulse, 
  CheckCircle, 
  Circle, 
  HelpCircle, 
  ChevronRight, 
  ArrowLeft, 
  Award,
  BookOpen
} from 'lucide-react';
import { Chapter, UserProgress } from '../types';

interface ChapterViewProps {
  chapters: Chapter[];
  progress: UserProgress;
  onToggleSubchapter: (subchapterId: string) => void;
  onStartQuiz: (chapterId: number) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  ShieldCheck,
  Sliders,
  FileText,
  Wrench,
  Cpu,
  Activity,
  HeartPulse,
};

export const ChapterView: React.FC<ChapterViewProps> = ({
  chapters,
  progress,
  onToggleSubchapter,
  onStartQuiz,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);

  const selectedChapter = chapters.find(c => c.id === selectedChapterId);

  // Zobrazení detailu jedné vybrané kapitoly
  if (selectedChapter) {
    const Icon = ICON_MAP[selectedChapter.iconName] || BookOpen;
    const scoreInfo = progress.quizScores[selectedChapter.id];

    return (
      <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-16">
        {/* Zpět na seznam kapitol */}
        <button
          onClick={() => setSelectedChapterId(null)}
          className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 font-semibold px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zpět na přehled kapitol</span>
        </button>

        {/* Hlavička kapitoly */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-850 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Icon className="w-36 h-36 text-amber-400" />
          </div>
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-3.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
              <Icon className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  {selectedChapter.code}
                </span>
                <span className="text-xs text-slate-400">• Kapitola {selectedChapter.id} z 8</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {selectedChapter.title}
              </h1>
              <p className="text-sm text-slate-300 pt-1">
                {selectedChapter.shortDescription}
              </p>
            </div>
          </div>

          {/* Kvízové skóre kapitoly */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">Výsledek testu kapitoly:</span>
              {scoreInfo ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{scoreInfo.score} / {scoreInfo.total} správně ({Math.round((scoreInfo.score / scoreInfo.total) * 100)}%)</span>
                </div>
              ) : (
                <span className="text-xs text-slate-500 italic">Zatím neabsolvováno</span>
              )}
            </div>

            <button
              onClick={() => onStartQuiz(selectedChapter.id)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <HelpCircle className="w-4 h-4 text-slate-950 font-black" />
              <span>Spustit test této kapitoly</span>
            </button>
          </div>
        </div>

        {/* Podkapitoly */}
        <div className="space-y-6">
          {selectedChapter.subchapters.map((sub, idx) => {
            const isCompleted = progress.completedSubchapters.includes(sub.id);

            return (
              <article
                key={sub.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md transition-all hover:border-slate-700"
              >
                {/* Nadpis podkapitoly a checkbox splnění */}
                <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {selectedChapter.id}.{idx + 1}
                    </span>
                    <h2 className="text-xl font-bold text-slate-100 mt-0.5">
                      {sub.title}
                    </h2>
                    {sub.standardRefs && sub.standardRefs.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {sub.standardRefs.map((norm, nIdx) => (
                          <span
                            key={nIdx}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700"
                          >
                            {norm}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onToggleSubchapter(sub.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Přečteno</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4" />
                        <span>Označit přečtené</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Text výkladu */}
                <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-3 whitespace-pre-line font-sans">
                  {sub.content}
                </div>

                {/* Klíčové body k zapamatování */}
                {sub.keyTakeaways && sub.keyTakeaways.length > 0 && (
                  <div className="mt-5 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Klíčové body do praxe:</span>
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      {sub.keyTakeaways.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tip na zkouškový chyták */}
                {sub.examTips && sub.examTips.length > 0 && (
                  <div className="mt-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
                    <h4 className="font-extrabold flex items-center gap-1.5 mb-1 text-amber-300">
                      <span>⚠️ POZOR U STÁTNÍ ZKOUŠKY:</span>
                    </h4>
                    <div className="space-y-1">
                      {sub.examTips.map((tip, tIdx) => (
                        <p key={tIdx} className="leading-relaxed">{tip}</p>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Tlačítko testu na konci kapitoly */}
        <div className="text-center pt-6">
          <button
            onClick={() => onStartQuiz(selectedChapter.id)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-extrabold bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
          >
            <HelpCircle className="w-5 h-5 text-slate-950" />
            <span>Otestovat znalosti z kapitoly {selectedChapter.id}</span>
          </button>
        </div>
      </div>
    );
  }

  // Zobrazení seznamu 8 kapitol
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* Hero sekce */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Oficiální kvalifikační standard NSK
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Montér / montérka elektrických instalací (26-017-H)
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed pt-1">
            Interaktivní učebnice a trenažér koncipovaný přímo podle 8 hodnoticích způsobilostí MPO a elektrotechnických norem ČSN. Vyber si kapitolu pro studium nebo si rovnou otestuj své znalosti v testu.
          </p>
        </div>
      </div>

      {/* Grid 8 kapitol */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {chapters.map((chapter) => {
          const Icon = ICON_MAP[chapter.iconName] || BookOpen;
          const score = progress.quizScores[chapter.id];

          // Spočítáme počet splněných podkapitol
          const chapterSubIds = chapter.subchapters.map(s => s.id);
          const completedSubs = chapterSubIds.filter(id => progress.completedSubchapters.includes(id)).length;
          const totalSubs = chapterSubIds.length;
          const pct = Math.round((completedSubs / totalSubs) * 100);

          return (
            <div
              key={chapter.id}
              onClick={() => setSelectedChapterId(chapter.id)}
              className="group bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 cursor-pointer transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono font-bold text-slate-500 block">
                      {chapter.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Kapitola {chapter.id}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                  {chapter.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {chapter.shortDescription}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                {/* Progres čtení */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-400 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span>{completedSubs}/{totalSubs} témat</span>
                </div>

                {/* Stav testu nebo šipka */}
                <div className="flex items-center gap-2">
                  {score ? (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Kvíz: {score.score}/{score.total}
                    </span>
                  ) : (
                    <span className="text-xs text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                      <span>Otevřít</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
