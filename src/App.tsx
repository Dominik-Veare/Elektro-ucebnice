import React, { useState, useEffect } from 'react';
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

import { CHAPTERS } from './data/chapters';
import { QUESTIONS } from './data/questions';
import { loadProgress, saveProgress, syncWithCloud } from './services/storage';
import { UserProgress } from './types';

export const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(loadProgress());
  const [currentTab, setCurrentTab] = useState<string>('ucebnice');
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);

  // Kvízové okno
  const [activeQuizChapterId, setActiveQuizChapterId] = useState<number | null>(null);

  // Počítadlo celkového počtu témat
  const totalSubchapters = CHAPTERS.reduce((acc, c) => acc + c.subchapters.length, 0);

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
      />

      {/* Hlavní obsahová část */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentTab === 'ucebnice' && (
          <ChapterView
            chapters={CHAPTERS}
            progress={progress}
            onToggleSubchapter={handleToggleSubchapter}
            onStartQuiz={(chId) => setActiveQuizChapterId(chId)}
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
