import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { BookOpen } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

import { CHAPTERS } from './data/chapters';
import { QUESTIONS } from './data/questions';
import {
  loadProgress,
  saveProgress,
  syncWithCloud,
  broadcastProgress,
  subscribeToLiveSync,
  mergeProgress,
} from './services/storage';
import { UserProgress, QualificationId, QUALIFICATIONS, LiveSyncStatus } from './types';

const ChapterView = lazy(() => import('./components/ChapterView').then(m => ({ default: m.ChapterView })));
const QuizModal = lazy(() => import('./components/QuizModal').then(m => ({ default: m.QuizModal })));
const ExamSimulator = lazy(() => import('./components/ExamSimulator').then(m => ({ default: m.ExamSimulator })));
const MistakeNotebook = lazy(() => import('./components/MistakeNotebook').then(m => ({ default: m.MistakeNotebook })));
const FlashcardsView = lazy(() => import('./components/FlashcardsView').then(m => ({ default: m.FlashcardsView })));
const CalculatorsView = lazy(() => import('./components/CalculatorsView').then(m => ({ default: m.CalculatorsView })));
const WiringSimulator = lazy(() => import('./components/WiringSimulator').then(m => ({ default: m.WiringSimulator })));
const DiagnosticsView = lazy(() => import('./components/DiagnosticsView').then(m => ({ default: m.DiagnosticsView })));
const SyncModal = lazy(() => import('./components/SyncModal').then(m => ({ default: m.SyncModal })));

const TabLoadingFallback: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[40vh] p-8 space-y-3 animate-pulse">
    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <span className="text-xs font-mono text-slate-400">Načítání modulu...</span>
  </div>
);

export const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(loadProgress());
  const [syncStatus, setSyncStatus] = useState<LiveSyncStatus>('idle');
  const syncDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [activeQualification, setActiveQualification] =
    useState<QualificationId>('26-017-H');
  const [currentTab, setCurrentTab] = useState<string>('ucebnice');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);

  // Kvízové okno
  const [activeQuizChapterId, setActiveQuizChapterId] = useState<number | null>(null);

  const currentQualDef =
    QUALIFICATIONS.find((q) => q.id === activeQualification) || QUALIFICATIONS[0];

  // Počítadlo celkového počtu témat
  const totalSubchapters =
    activeQualification === '26-017-H'
      ? CHAPTERS.reduce((acc, c) => acc + c.subchapters.length, 0)
      : 0;

  // Při prvním načtení zkontrolujeme URL parametr (?syncCode=...) nebo provedeme tichou počáteční synchronizaci
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlSyncCode = urlParams.get('syncCode');

    if (urlSyncCode && urlSyncCode.trim()) {
      const code = urlSyncCode.trim().toUpperCase();
      syncWithCloud(progress, code).then(res => {
        if (res.success) {
          setProgress(res.progress);
        }
      });
      // Vyčistíme parametr z adresního řádku pro čistý vzhled
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, cleanUrl);
    } else if (navigator.onLine && progress.syncId) {
      syncWithCloud(progress).then(res => {
        if (res.success) {
          setProgress(res.progress);
        }
      });
    }
  }, []);

  // Živý odběr změn z druhého zařízení přes SSE stream (okamžitá aktualizace na obrazovce)
  useEffect(() => {
    if (!progress.syncId) return;

    const unsubscribe = subscribeToLiveSync(
      progress.syncId,
      (remoteProgress) => {
        setProgress((current) => {
          const merged = mergeProgress(current, remoteProgress);
          saveProgress(merged);
          return merged;
        });
      },
      (status) => {
        setSyncStatus(status);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [progress.syncId]);

  // Aktualizace postupu: okamžité uložení lokálně + bleskové živé odeslání do cloudu (debounce 300 ms)
  const updateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      saveProgress(next);

      // Bleskové živé odeslání do sítě na propojená zařízení
      if (next.syncId && navigator.onLine) {
        if (syncDebounceTimerRef.current) {
          clearTimeout(syncDebounceTimerRef.current);
        }
        syncDebounceTimerRef.current = setTimeout(async () => {
          setSyncStatus('syncing');
          await broadcastProgress(next);
          setSyncStatus('connected');
        }, 300);
      }

      return next;
    });
  };

  // Označit podkapitolu za přečtenou / nepřečtenou
  const handleToggleSubchapter = (subchapterId: string) => {
    updateProgress(prev => {
      const exists = prev.completedSubchapters.includes(subchapterId);
      const updated = exists
        ? prev.completedSubchapters.filter(id => id !== subchapterId)
        : [...prev.completedSubchapters, subchapterId];
      return { ...prev, completedSubchapters: updated };
    });
  };

  // Dokončení kvízu v kapitole
  const handleQuizCompleted = (chapterId: number, score: number, total: number, incorrectIds: string[]) => {
    updateProgress(prev => {
      const newScores = {
        ...prev.quizScores,
        [chapterId]: { score, total, date: new Date().toISOString() }
      };

      const newMistakes = { ...prev.mistakes };
      incorrectIds.forEach(qId => {
        const existing = newMistakes[qId];
        newMistakes[qId] = {
          questionId: qId,
          mistakeCount: (existing?.mistakeCount || 0) + 1,
          correctInRow: 0,
          lastAttemptDate: new Date().toISOString()
        };
      });

      return {
        ...prev,
        quizScores: newScores,
        mistakes: newMistakes
      };
    });
  };

  // Dokončení ostré zkoušky
  const handleFinishExam = (result: {
    score: number;
    total: number;
    percentage: number;
    passed: boolean;
    durationSeconds: number;
    incorrectQuestionIds: string[];
  }) => {
    updateProgress(prev => {
      const newExam = {
        id: `exam_${Date.now()}`,
        date: new Date().toISOString(),
        ...result
      };

      const newMistakes = { ...prev.mistakes };
      result.incorrectQuestionIds.forEach(qId => {
        const existing = newMistakes[qId];
        newMistakes[qId] = {
          questionId: qId,
          mistakeCount: (existing?.mistakeCount || 0) + 1,
          correctInRow: 0,
          lastAttemptDate: new Date().toISOString()
        };
      });

      return {
        ...prev,
        examHistory: [newExam, ...prev.examHistory],
        mistakes: newMistakes
      };
    });
  };

  // Odpověď na otázku v Knize chyb
  const handleAnswerMistakeQuestion = (questionId: string, isCorrect: boolean) => {
    updateProgress(prev => {
      const existing = prev.mistakes[questionId];
      if (!existing) return prev;

      const newCorrectInRow = isCorrect ? existing.correctInRow + 1 : 0;
      return {
        ...prev,
        mistakes: {
          ...prev.mistakes,
          [questionId]: {
            ...existing,
            correctInRow: newCorrectInRow,
            lastAttemptDate: new Date().toISOString()
          }
        }
      };
    });
  };

  // Smazání historie chyb
  const handleClearMistakes = () => {
    updateProgress(prev => ({
      ...prev,
      mistakes: {}
    }));
  };

  // Příprava otázek pro aktivní kvíz
  const activeQuizChapter = CHAPTERS.find(c => c.id === activeQuizChapterId);
  const activeQuizQuestions = activeQuizChapterId
    ? QUESTIONS.filter(q => q.chapterId === activeQuizChapterId)
    : [];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Horní navigace a mobilní menu */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        progress={progress}
        onOpenSync={() => setIsSyncModalOpen(true)}
        totalSubchapters={totalSubchapters}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        activeQualification={activeQualification}
        onSelectQualification={(id) => {
          setActiveQualification(id);
          setSelectedChapterId(null);
        }}
        syncStatus={syncStatus}
      />

      {/* Postranní vysouvací menu */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        progress={progress}
        onOpenSync={() => setIsSyncModalOpen(true)}
        totalSubchapters={totalSubchapters}
        activeQualification={activeQualification}
        syncStatus={syncStatus}
      />

      {/* Hlavní obsahová část */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 pb-24 sm:p-6 sm:pb-24 lg:p-8 lg:pb-8">
        {!currentQualDef.hasContent ? (
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto my-8 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <BookOpen className="w-7 h-7" />
            </div>
            <div className="inline-block px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold">
              {currentQualDef.id}
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              {currentQualDef.title} {currentQualDef.id}
            </h1>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Tato učebnice je momentálně prázdná a připravená k doplnění studijních kapitol, testových otázek a praktických úloh.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveQualification('26-017-H')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-sm"
              >
                Zpět na Montér/Montérka elektrických instalací 26-017-H
              </button>
            </div>
          </div>
        ) : (
          <Suspense fallback={<TabLoadingFallback />}>
            {currentTab === 'ucebnice' && (
              <ChapterView
                chapters={CHAPTERS}
                progress={progress}
                onToggleSubchapter={handleToggleSubchapter}
                onStartQuiz={(chId) => setActiveQuizChapterId(chId)}
                selectedChapterId={selectedChapterId}
                setSelectedChapterId={setSelectedChapterId}
              />
            )}

            {currentTab === 'zkouska' && (
              <ExamSimulator
                allQuestions={QUESTIONS}
                onFinishExam={handleFinishExam}
                onExit={() => setCurrentTab('ucebnice')}
              />
            )}

            {currentTab === 'chyby' && (
              <MistakeNotebook
                allQuestions={QUESTIONS}
                progress={progress}
                onAnswerMistakeQuestion={handleAnswerMistakeQuestion}
                onClearMistakes={handleClearMistakes}
              />
            )}

            {currentTab === 'karticky' && (
              <FlashcardsView />
            )}

            {currentTab === 'kalkulacky' && (
              <CalculatorsView />
            )}

            {currentTab === 'schemata' && (
              <WiringSimulator />
            )}

            {currentTab === 'diagnostika' && (
              <DiagnosticsView />
            )}
          </Suspense>
        )}
      </main>

      {/* Modální okna s dynamickým načtením */}
      <Suspense fallback={null}>
        {activeQuizChapterId && activeQuizChapter && (
          <QuizModal
            isOpen={true}
            onClose={() => setActiveQuizChapterId(null)}
            chapterId={activeQuizChapterId}
            chapterTitle={activeQuizChapter.title}
            questions={activeQuizQuestions}
            onQuizCompleted={handleQuizCompleted}
          />
        )}

        {isSyncModalOpen && (
          <SyncModal
            isOpen={isSyncModalOpen}
            onClose={() => setIsSyncModalOpen(false)}
            progress={progress}
            onProgressUpdated={(newProg) => setProgress(newProg)}
            syncStatus={syncStatus}
          />
        )}
      </Suspense>

    </div>
  );
};

export default App;
