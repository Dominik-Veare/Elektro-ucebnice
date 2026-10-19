import React from 'react';
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
import { TechnicalSchematicsViewer } from './TechnicalSchematicsViewer';

interface ChapterViewProps {
  chapters: Chapter[];
  progress: UserProgress;
  onToggleSubchapter: (subchapterId: string) => void;
  onStartQuiz: (chapterId: number) => void;
  selectedChapterId: number | null;
  setSelectedChapterId: (id: number | null) => void;
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

// Pomocná funkce pro převod inline LaTeX a Markdown syntaxe na čisté React elementy
const formatInlineText = (text: string): React.ReactNode => {
  // Nejprve převedeme případný zbytkový inline LaTeX ($...$) na čitelný zápis
  const cleaned = text
    .replace(/\$([^$]+)\$/g, (_, math) =>
      math
        .replace(/\\Omega/g, 'Ω')
        .replace(/\\varphi/g, 'φ')
        .replace(/\\rho/g, 'ρ')
        .replace(/\\gamma/g, 'γ')
        .replace(/\\Delta/g, 'Δ')
        .replace(/\\mu/g, 'µ')
        .replace(/\\cdot/g, '·')
        .replace(/\\times/g, '×')
        .replace(/\\le/g, '≤')
        .replace(/\\ge/g, '≥')
        .replace(/\\approx/g, '≈')
        .replace(/\\implies/g, '⇒')
        .replace(/\\rightarrow/g, '→')
        .replace(/\\text\{([^}]*)\}/g, '$1')
        .replace(/\^2/g, '²')
        .replace(/\^\\circ/g, '°')
        .replace(/_\{([^}]*)\}/g, '$1')
        .replace(/\\;/g, ' ')
    );

  // Zpracování tučného písma **text** a kurzívy *text*
  const parts = cleaned.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={idx} className="italic text-slate-300">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
};

// Vykreslení strukturovaného obsahu podkapitoly (nadpisy, vzorce, seznamy, odstavce)
const renderFormattedContent = (content: string) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();
    if (!line) return;

    // Vodorovný oddělovač
    if (line === '---') {
      elements.push(<hr key={idx} className="border-slate-800 my-4" />);
      return;
    }

    // Nadpis H3 (### )
    if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={idx}
          className="text-base font-extrabold text-amber-400 pt-3 pb-1 border-b border-slate-800/80 flex items-center gap-2"
        >
          {formatInlineText(line.slice(4))}
        </h3>
      );
      return;
    }

    // Nadpis H4 (#### )
    if (line.startsWith('#### ')) {
      elements.push(
        <h4 key={idx} className="text-sm font-bold text-slate-100 pt-2">
          {formatInlineText(line.slice(5))}
        </h4>
      );
      return;
    }

    // Zvýrazněný box se vzorcem (📐 nebo $$...$$)
    if (line.startsWith('$$') && line.endsWith('$$')) {
      const formula = line.slice(2, -2).trim();
      elements.push(
        <div
          key={idx}
          className="my-2.5 px-4 py-3 rounded-xl bg-slate-950 border border-amber-500/30 font-mono text-sm sm:text-base font-bold text-amber-300 shadow-inner overflow-x-auto"
        >
          {formatInlineText(`$${formula}$`)}
        </div>
      );
      return;
    }

    if (line.startsWith('📐')) {
      elements.push(
        <div
          key={idx}
          className="my-2.5 px-4 py-3 rounded-xl bg-slate-950 border border-amber-500/30 font-mono text-sm sm:text-base font-bold text-amber-300 shadow-inner overflow-x-auto flex items-center gap-2.5"
        >
          <span className="text-amber-400 select-none">📐</span>
          <span>{formatInlineText(line.slice(2).trim())}</span>
        </div>
      );
      return;
    }

    // Odrážkový seznam (* nebo •)
    if (line.startsWith('* ') || line.startsWith('• ')) {
      const indent = rawLine.search(/\S|$/);
      const isNested = indent >= 2;
      elements.push(
        <div
          key={idx}
          className={`flex items-start gap-2.5 py-0.5 ${isNested ? 'pl-5 text-slate-300' : 'text-slate-200'}`}
        >
          <span className="text-amber-400 font-bold mt-0.5 shrink-0">
            {isNested ? '◦' : '•'}
          </span>
          <span className="flex-1 leading-relaxed">{formatInlineText(line.slice(2))}</span>
        </div>
      );
      return;
    }

    // Číslovaný seznam (1. , 2. , ...)
    const numMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      elements.push(
        <div key={idx} className="flex items-start gap-2.5 py-0.5 text-slate-200">
          <span className="font-mono text-xs font-extrabold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0 mt-0.5">
            {numMatch[1]}.
          </span>
          <span className="flex-1 leading-relaxed">{formatInlineText(numMatch[2])}</span>
        </div>
      );
      return;
    }

    // Běžný odstavec
    elements.push(
      <p key={idx} className="text-slate-300 leading-relaxed">
        {formatInlineText(line)}
      </p>
    );
  });

  return elements;
};

export const ChapterView: React.FC<ChapterViewProps> = ({
  chapters,
  progress,
  onToggleSubchapter,
  onStartQuiz,
  selectedChapterId,
  setSelectedChapterId,
}) => {
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
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug text-balance">
                {selectedChapter.title}
              </h1>
              <p className="text-sm text-slate-300 pt-1 leading-relaxed text-pretty">
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
              className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
                    <h2 className="text-lg sm:text-xl font-bold text-slate-100 mt-0.5 leading-snug text-balance">
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
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
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

                {/* Strukturovaný text výkladu */}
                <div className="text-slate-300 text-sm space-y-2 font-sans">
                  {renderFormattedContent(sub.content)}
                </div>

                {/* Vizuální technická schémata a atlas značek pro Kapitolu 4 */}
                {selectedChapter.id === 4 && sub.id === '4-1' && (
                  <TechnicalSchematicsViewer initialTab="single-line" />
                )}
                {selectedChapter.id === 4 && sub.id === '4-2' && (
                  <TechnicalSchematicsViewer initialTab="symbols" />
                )}

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
            Oficiální kvalifikační standard NSK (platnost od 15. 10. 2022)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug text-balance">
            Montér / montérka elektrických instalací <span className="whitespace-nowrap font-mono text-amber-400 text-xl sm:text-2xl">(26-017-H)</span>
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed pt-1 text-pretty max-w-2xl">
            Interaktivní učebnice a trenažér koncipovaný přesně podle 8 hodnoticích způsobilostí MPO, zákona č. 250/2021 Sb., NV č. 194/2022 Sb. a platných norem ČSN. Vyber si kapitolu pro studium nebo si rovnou otestuj své znalosti v testu.
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

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug text-balance">
                  {chapter.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed text-pretty">
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
