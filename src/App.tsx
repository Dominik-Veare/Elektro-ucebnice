import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ChapterView } from './components/ChapterView';
import { QuizModal } from './components/QuizModal';
import { ExamSimulator } from './components/ExamSimulator';
import { MistakeNotebook } from './components/MistakeNotebook';
import { FlashcardsView } from './components/FlashcardsView';
import { CalculatorsView } from './components/CalculatorsView';
import { WiringSimulator } from './components/WiringSimulator';
import { DiagnosticsView } from './components/DiagnosticsView';
import { SyncModal } from './components/SyncModal';
import { Sidebar } from './components/Sidebar';

import { CHAPTERS } from './data/chapters';
import { QUESTIONS } from './data/questions';
import { loadProgress, saveProgress, syncWithCloud } from './services/storage';
import { UserProgress, QualificationId, QUALIFICATIONS } from './types';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(loadProgress());
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

  // Při prvním načtení zkusíme tichou synchronizaci s cloudem na pozadí
  useEffect(() => {
    if (navigator.onLine && progress.syncId) {
      syncWithCloud(progress).then(res => {
        if (res.success) {
          setProgress(res.progress);
        }
      });
    }
  }, []);

  // Aktualizace postupu a uložení do localStorage
  const updateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setProgress(prev => {
      const next = updater(prev);
      saveProgress(next);
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
      />

      {/* Postranní vysouvací menu */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onSelectChapter={(chId) => setSelectedChapterId(chId)}
        progress={progress}
        onOpenSync={() => setIsSyncModalOpen(true)}
        totalSubchapters={totalSubchapters}
        activeQualification={activeQualification}
        onSelectQualification={(id) => {
          setActiveQualification(id);
          setSelectedChapterId(null);
        }}
      />

      {/* Hlavní obsahová část */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
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
          <>
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
          </>
        )}
      </main>

      {/* Modální okno kvízu kapitoly */}
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

      {/* Modální okno synchronizace (PC ↔ Mobil) */}
      <SyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        progress={progress}
        onProgressUpdated={(newProg) => setProgress(newProg)}
      />

    </div>
  );
};

export default App;
