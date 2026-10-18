import React, { useState } from 'react';
import { X, CheckCircle, XCircle, ArrowRight, Award, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question } from '../types';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapterTitle: string;
  chapterId: number;
  questions: Question[];
  onQuizCompleted: (chapterId: number, score: number, total: number, incorrectIds: string[]) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  chapterTitle,
  chapterId,
  questions,
  onQuizCompleted,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [incorrectIds, setIncorrectIds] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen || questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;

    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const isCorrect = optionId === currentQ.correctOptionId;
    if (isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setIncorrectIds(prev => [...prev, currentQ.id]);
    }
  };

  const handleNext = () => {
    if (!isLast) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const pct = (score / questions.length) * 100;
      if (pct >= 75) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      onQuizCompleted(chapterId, score, questions.length, incorrectIds);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setIncorrectIds([]);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Tlačítko zavření */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isFinished ? (
          <div>
            {/* Horní info lišta */}
            <div className="mb-4">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                Kvíz kapitoly {chapterId}
              </span>
              <h2 className="text-lg font-bold text-white line-clamp-1">
                {chapterTitle}
              </h2>
              <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                <span>Otázka {currentIndex + 1} z {questions.length}</span>
                <span>Průběžné skóre: <strong className="text-emerald-400">{score}</strong> správně</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1.5">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Samotná otázka */}
            <div className="my-6">
              <p className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
                {currentQ.question}
              </p>
              {currentQ.normReference && (
                <span className="inline-block mt-2 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {currentQ.normReference}
                </span>
              )}
            </div>

            {/* Možnosti odpovědí A, B, C, D */}
            <div className="space-y-2.5">
              {currentQ.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                const isCorrect = option.id === currentQ.correctOptionId;

                let btnStyle = "bg-slate-950/70 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 text-slate-200";
                
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500";
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

            {/* Vysvětlení po odpovědi */}
            {isAnswered && (
              <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 animate-fadeIn">
                <div className="flex items-center gap-2 mb-1">
                  {selectedOptionId === currentQ.correctOptionId ? (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                      <CheckCircle className="w-4 h-4" />
                      Správná odpověď!
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-red-400">
                      <XCircle className="w-4 h-4" />
                      Chybná odpověď (otázka byla uložena do Knihy chyb)
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Spodní tlačítko Další otázka */}
            {isAnswered && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
                >
                  <span>{isLast ? 'Dokončit kvíz' : 'Další otázka'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Závěrečná obrazovka s výsledky */
          <div className="text-center py-6 space-y-4 animate-fadeIn">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white">
                Kvíz dokončen!
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Kapitola {chapterId}: {chapterTitle}
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 max-w-sm mx-auto">
              <div className="text-4xl font-black text-amber-400">
                {Math.round((score / questions.length) * 100)} %
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Správně <strong>{score}</strong> z <strong>{questions.length}</strong> otázek
              </p>
              <div className="mt-3 text-xs font-semibold">
                {(score / questions.length) >= 0.75 ? (
                  <span className="text-emerald-400">✓ Splněno (hranice 75 % pro zkoušku)</span>
                ) : (
                  <span className="text-amber-400">⚠️ Doporučujeme kapitolu ještě zopakovat</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-amber-400" />
                <span>Zkusit znovu</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
              >
                Zpět do učebnice
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
