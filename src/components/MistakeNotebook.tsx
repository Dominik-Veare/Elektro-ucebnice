import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  Award, 
  ArrowRight, 
  Trash2
} from 'lucide-react';
import { Question, UserProgress } from '../types';

interface MistakeNotebookProps {
  allQuestions: Question[];
  progress: UserProgress;
  onAnswerMistakeQuestion: (questionId: string, isCorrect: boolean) => void;
  onClearMistakes: () => void;
}

export const MistakeNotebook: React.FC<MistakeNotebookProps> = ({
  allQuestions,
  progress,
  onAnswerMistakeQuestion,
  onClearMistakes,
}) => {
  const [activeDrillIndex, setActiveDrillIndex] = useState<number | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Získáme všechny otázky, u kterých je zaznamenána chyba
  const mistakeEntries = Object.entries(progress.mistakes).filter(([_, data]) => data.correctInRow < 2);
  const masteredEntries = Object.entries(progress.mistakes).filter(([_, data]) => data.correctInRow >= 2);

  const activeQuestions = mistakeEntries
    .map(([qId]) => allQuestions.find(q => q.id === qId))
    .filter((q): q is Question => q !== undefined);

  // Spuštění procvičování chyb
  const startDrill = () => {
    if (activeQuestions.length > 0) {
      setActiveDrillIndex(0);
      setSelectedOptionId(null);
      setIsAnswered(false);
    }
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswered || activeDrillIndex === null) return;

    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const currentQ = activeQuestions[activeDrillIndex];
    const isCorrect = optionId === currentQ.correctOptionId;

    onAnswerMistakeQuestion(currentQ.id, isCorrect);
  };

  const handleNextDrillQuestion = () => {
    if (activeDrillIndex === null) return;

    if (activeDrillIndex < activeQuestions.length - 1) {
      setActiveDrillIndex(prev => (prev !== null ? prev + 1 : null));
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setActiveDrillIndex(null);
    }
  };

  // Režim aktivního procvičování chyb
  if (activeDrillIndex !== null && activeQuestions[activeDrillIndex]) {
    const currentQ = activeQuestions[activeDrillIndex];
    const isLast = activeDrillIndex === activeQuestions.length - 1;

    return (
      <div className="max-w-2xl mx-auto space-y-5 animate-fadeIn pb-16">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              Opakování chyby {activeDrillIndex + 1} z {activeQuestions.length}
            </span>
            <button
              onClick={() => setActiveDrillIndex(null)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Ukončit procvičování
            </button>
          </div>

          <p className="text-lg font-bold text-slate-100 mb-6">
            {currentQ.question}
          </p>

          <div className="space-y-3">
            {currentQ.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isCorrect = option.id === currentQ.correctOptionId;

              let btnStyle = "bg-slate-950/70 border-slate-800 text-slate-200 hover:bg-slate-800";

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500";
                } else if (isSelected && !isCorrect) {
                  btnStyle = "bg-red-950/60 border-red-500 text-red-200 ring-1 ring-red-500";
                } else {
                  btnStyle = "opacity-40 border-slate-800 text-slate-500";
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <span className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 uppercase ${
                    isAnswered && isCorrect ? 'bg-emerald-500 text-slate-950' :
                    isAnswered && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {option.id}
                  </span>
                  <span className="text-sm pt-0.5 flex-1">{option.text}</span>
                </button>
              );
            })}
          </div>

          {/* Vysvětlení */}
          {isAnswered && (
            <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 animate-fadeIn text-xs leading-relaxed">
              <span className="font-bold text-amber-400 block mb-1">
                {selectedOptionId === currentQ.correctOptionId ? '✓ Skvěle! Správně.' : '✗ Stále chybně:'}
              </span>
              <p className="text-slate-300">{currentQ.explanation}</p>
            </div>
          )}

          {isAnswered && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNextDrillQuestion}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
              >
                <span>{isLast ? 'Dokončit procvičování' : 'Další otázka'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Přehled Knihy chyb
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-16">
      
      {/* Hlavička */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <AlertCircle className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-white leading-snug whitespace-nowrap">Kniha chyb</h1>
          </div>
          <p className="text-xs text-slate-400 max-w-xl text-pretty leading-relaxed">
            Inteligentní zásobník otázek, ve kterých jsi při testech udělal chybu. Otázka zmizí ze seznamu, jakmile ji <strong>dvakrát za sebou</strong> zodpovíš správně.
          </p>
        </div>

        {activeQuestions.length > 0 && (
          <button
            onClick={startDrill}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 shrink-0"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Procvičit aktivní chyby ({activeQuestions.length})</span>
          </button>
        )}
      </div>

      {/* Stavové boxy */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center font-bold">
            {activeQuestions.length}
          </div>
          <div>
            <span className="text-xs text-slate-400 block">K doučení</span>
            <span className="text-sm font-bold text-slate-200">Aktivní chyby</span>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
            {masteredEntries.length}
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Úspěšně zvládnuto</span>
            <span className="text-sm font-bold text-slate-200">Vyřešené chyby</span>
          </div>
        </div>
      </div>

      {/* Seznam aktivních chyb */}
      {activeQuestions.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Otázky vyžadující pozornost:</span>
            <button
              onClick={onClearMistakes}
              className="text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Smazat historii chyb</span>
            </button>
          </div>

          {activeQuestions.map((q) => {
            const mistakeInfo = progress.mistakes[q.id];
            const correctOpt = q.options.find(o => o.id === q.correctOptionId);

            return (
              <div
                key={q.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-amber-400 font-bold">
                      {q.competencyCode} • Kapitola {q.chapterId}
                    </span>
                    <h3 className="text-sm font-bold text-slate-100 mt-1">
                      {q.question}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-300 border border-red-500/20 shrink-0">
                    Chybováno: {mistakeInfo?.mistakeCount || 1}×
                  </span>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 text-xs space-y-1">
                  <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Správná odpověď ({correctOpt?.id.toUpperCase()}): {correctOpt?.text}</span>
                  </div>
                  <p className="text-slate-400 pt-1 leading-relaxed">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Prázdný stav: Žádné chyby! */
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">
            Kniha chyb je prázdná!
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Zatím nemáš žádné nezvládnuté otázky. Zkus si spustit test v některé kapitole nebo ostrou cvičnou zkoušku.
          </p>
        </div>
      )}

    </div>
  );
};
