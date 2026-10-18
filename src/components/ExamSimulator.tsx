import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  AlertTriangle, 
  Flag, 
  Award, 
  RefreshCw, 
  ArrowLeft, 
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question } from '../types';

interface ExamSimulatorProps {
  allQuestions: Question[];
  onFinishExam: (result: {
    score: number;
    total: number;
    percentage: number;
    passed: boolean;
    durationSeconds: number;
    incorrectQuestionIds: string[];
  }) => void;
  onExit: () => void;
}

export const ExamSimulator: React.FC<ExamSimulatorProps> = ({
  allQuestions,
  onFinishExam,
  onExit,
}) => {
  const EXAM_DURATION = 45 * 60; // 45 minut v sekundách
  const EXAM_QUESTIONS_COUNT = 20;

  const [hasStarted, setHasStarted] = useState(false);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({}); // questionId -> optionId
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  // Inicializace náhodného výběru otázek
  const startExam = () => {
    // Náhodně zamícháme otázky a vybereme 20 z nich
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, EXAM_QUESTIONS_COUNT);
    setExamQuestions(shuffled);
    setUserAnswers({});
    setFlaggedQuestions({});
    setCurrentIndex(0);
    setTimeLeft(EXAM_DURATION);
    setIsSubmitted(false);
    setReviewMode(false);
    setHasStarted(true);
  };

  // Časomíra 45 minut
  useEffect(() => {
    if (!hasStarted || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, isSubmitted]);

  const handleSubmitExam = () => {
    setIsSubmitted(true);

    let calculatedScore = 0;
    const incorrectIds: string[] = [];

    examQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctOptionId) {
        calculatedScore++;
      } else {
        incorrectIds.push(q.id);
      }
    });

    const percentage = Math.round((calculatedScore / examQuestions.length) * 100);
    const passed = percentage >= 75; // 75% kritérium pro složení

    if (passed) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    }

    onFinishExam({
      score: calculatedScore,
      total: examQuestions.length,
      percentage,
      passed,
      durationSeconds: EXAM_DURATION - timeLeft,
      incorrectQuestionIds: incorrectIds,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 1. Obrazovka před spuštěním zkoušky
  if (!hasStarted) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-16">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-850 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
            <Clock className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              Simulátor písemné části zkoušky NSK
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Ostrá zkouška (45 minut)
            </h1>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Tento trenažér věrně simuluje oficiální 45minutový písemný test pro kvalifikaci <strong>Montér elektrických instalací (26-017-H)</strong>. Otázky jsou náhodně generovány ze všech 8 zkušebních okruhů.
            </p>
          </div>

          {/* Zkušební parametry */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Časový limit</span>
              <span className="text-lg font-extrabold text-amber-400">45 minut</span>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Počet otázek</span>
              <span className="text-lg font-extrabold text-slate-100">{EXAM_QUESTIONS_COUNT}</span>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Limit pro úspěch</span>
              <span className="text-lg font-extrabold text-emerald-400">75 % (15/20)</span>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
              <span className="text-[11px] text-slate-400 block">Okamžitá zpětná vazba</span>
              <span className="text-lg font-extrabold text-slate-100">Až po odevzdání</span>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={startExam}
              className="px-8 py-4 rounded-2xl text-base font-extrabold bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-xl shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
            >
              Zahájit ostrou cvičnou zkoušku
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Vyhodnocení po odevzdání testu
  if (isSubmitted && !reviewMode) {
    let finalScore = 0;
    examQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctOptionId) finalScore++;
    });
    const percentage = Math.round((finalScore / examQuestions.length) * 100);
    const passed = percentage >= 75;

    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn pb-16 text-center">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mx-auto border ${
            passed 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-xl shadow-emerald-500/10' 
              : 'bg-red-500/10 border-red-500/30 text-red-400 shadow-xl shadow-red-500/10'
          }`}>
            {passed ? <Award className="w-12 h-12" /> : <AlertTriangle className="w-12 h-12" />}
          </div>

          <div>
            <span className={`text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
              passed ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-red-500/20 text-red-300 border-red-500/30'
            }`}>
              Výsledné hodnocení zkoušky
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
              {passed ? 'VYHOVĚL(A)' : 'NEVYHOVĚL(A)'}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {passed ? 'Gratulujeme! Tento výsledek by u státní zkoušky s přehledem stačil.' : 'K úspěšnému složení je potřeba alespoň 75 % správných odpovědí.'}
            </p>
          </div>

          {/* Skóre box */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 grid grid-cols-3 gap-4">
            <div>
              <span className="text-xs text-slate-400 block">Úspěšnost</span>
              <span className={`text-3xl font-black ${passed ? 'text-emerald-400' : 'text-amber-400'}`}>
                {percentage} %
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Správně</span>
              <span className="text-3xl font-black text-slate-100">
                {finalScore} <span className="text-sm text-slate-500 font-normal">/ {examQuestions.length}</span>
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Čas testu</span>
              <span className="text-2xl font-black text-slate-300">
                {formatTime(EXAM_DURATION - timeLeft)}
              </span>
            </div>
          </div>

          {/* Tlačítka akcí */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setReviewMode(true)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-colors"
            >
              Podrobný rozbor otázek a chyb
            </button>
            <button
              onClick={startExam}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Nová cvičná zkouška</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Aktivní test nebo Režim podrobného rozboru (Review Mode)
  const currentQ = examQuestions[currentIndex];
  const isTimeCritical = timeLeft < 5 * 60; // Méně než 5 minut

  return (
    <div className="max-w-4xl mx-auto space-y-5 animate-fadeIn pb-20">
      
      {/* Horní ovládací a časová lišta */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700"
          >
            {reviewMode ? 'Zpět do menu' : 'Ukončit test'}
          </button>
          <span className="text-xs font-semibold text-slate-300 hidden sm:inline">
            {reviewMode ? 'Režim rozboru zkoušky' : 'Písemný test Montér 26-017-H'}
          </span>
        </div>

        {/* Odpočet 45 minut */}
        {!reviewMode ? (
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-sm font-mono font-extrabold border ${
            isTimeCritical 
              ? 'bg-red-500/20 border-red-500/50 text-red-400 animate-pulse' 
              : 'bg-slate-950 border-slate-800 text-amber-400'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        ) : (
          <span className="text-xs font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            Výsledek zkoušky
          </span>
        )}

        {!reviewMode && (
          <button
            onClick={handleSubmitExam}
            className="px-4 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-colors"
          >
            Odevzdat test
          </button>
        )}
      </div>

      {/* Mřížka otázek 1 až 20 pro rychlý skok */}
      <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-2xl">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {examQuestions.map((q, idx) => {
            const isAnswered = !!userAnswers[q.id];
            const isCurrent = idx === currentIndex;
            const isFlagged = flaggedQuestions[q.id];
            const isCorrect = userAnswers[q.id] === q.correctOptionId;

            let btnClass = "bg-slate-950 text-slate-400 border-slate-800";

            if (reviewMode) {
              btnClass = isCorrect ? "bg-emerald-600 text-white border-emerald-500" : "bg-red-600 text-white border-red-500";
            } else if (isCurrent) {
              btnClass = "ring-2 ring-amber-400 text-amber-300 bg-slate-800 border-amber-500";
            } else if (isAnswered) {
              btnClass = "bg-slate-800 text-slate-200 border-slate-700";
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all relative border flex items-center justify-center ${btnClass}`}
              >
                {idx + 1}
                {isFlagged && !reviewMode && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Box s aktuální otázkou */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Otázka {currentIndex + 1} z {examQuestions.length}
            </span>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              {currentQ.competencyCode}
            </span>
          </div>

          {!reviewMode && (
            <button
              onClick={() => setFlaggedQuestions(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                flaggedQuestions[currentQ.id]
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-800 border border-slate-700'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              <span>{flaggedQuestions[currentQ.id] ? 'Označeno k revizi' : 'Označit k revizi'}</span>
            </button>
          )}
        </div>

        <p className="text-lg font-bold text-slate-100 leading-snug mb-6">
          {currentQ.question}
        </p>

        {/* Možnosti odpovědí */}
        <div className="space-y-3">
          {currentQ.options.map((option) => {
            const isSelected = userAnswers[currentQ.id] === option.id;
            const isCorrect = option.id === currentQ.correctOptionId;

            let optStyle = "bg-slate-950/70 border-slate-800 text-slate-200 hover:bg-slate-850 hover:border-slate-700";

            if (reviewMode) {
              if (isCorrect) {
                optStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold ring-1 ring-emerald-500";
              } else if (isSelected && !isCorrect) {
                optStyle = "bg-red-950/60 border-red-500 text-red-200 ring-1 ring-red-500";
              } else {
                optStyle = "opacity-40 border-slate-800 text-slate-500";
              }
            } else if (isSelected) {
              optStyle = "bg-amber-500/10 border-amber-500 text-amber-200 font-semibold ring-1 ring-amber-500";
            }

            return (
              <button
                key={option.id}
                onClick={() => {
                  if (!reviewMode) {
                    setUserAnswers(prev => ({ ...prev, [currentQ.id]: option.id }));
                  }
                }}
                disabled={reviewMode}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 ${optStyle}`}
              >
                <span className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 uppercase ${
                  reviewMode && isCorrect ? 'bg-emerald-500 text-slate-950' :
                  reviewMode && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                  isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}>
                  {option.id}
                </span>
                <span className="text-sm pt-0.5 flex-1">{option.text}</span>
              </button>
            );
          })}
        </div>

        {/* Vysvětlení v Review Mode */}
        {reviewMode && (
          <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 animate-fadeIn">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              Odborné zdůvodnění a norma:
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentQ.explanation}
            </p>
            {currentQ.normReference && (
              <span className="inline-block mt-2 text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                Zdroj: {currentQ.normReference}
              </span>
            )}
          </div>
        )}

        {/* Spodní navigace Předchozí / Další */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-800">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Předchozí</span>
          </button>

          <span className="text-xs text-slate-400">
            Otázka {currentIndex + 1} / {examQuestions.length}
          </span>

          <button
            onClick={() => setCurrentIndex(prev => Math.min(examQuestions.length - 1, prev + 1))}
            disabled={currentIndex === examQuestions.length - 1}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <span>Další</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
