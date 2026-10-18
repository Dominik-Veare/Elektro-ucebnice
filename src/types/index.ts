// Typy pro aplikaci ElektroUčebnice 26-017-H

export interface Subchapter {
  id: string;
  title: string;
  content: string; // Markdown or formatted text
  keyTakeaways?: string[];
  examTips?: string[]; // Časté otázky zkoušejícího u této látky
  standardRefs?: string[]; // např. "ČSN 33 2000-4-41 ed. 3", "NV 194/2022 Sb."
}

export interface Chapter {
  id: number;
  slug: string;
  code: string; // např. "KOMP-01"
  title: string;
  shortDescription: string;
  iconName: string;
  subchapters: Subchapter[];
  totalQuestions: number;
}

export interface QuestionOption {
  id: string; // 'a' | 'b' | 'c' | 'd'
  text: string;
}

export interface Question {
  id: string;
  chapterId: number;
  competencyCode: string; // např. "26-017-H/01"
  question: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
  normReference?: string;
  difficulty: 'normal' | 'hard';
  practicalExamRelevant?: boolean;
}

export interface Flashcard {
  id: string;
  chapterId: number;
  category: 'bezpečnost' | 'normy' | 'měření' | 'zapojení' | 'první-pomoc' | 'výpočty';
  front: string; // Otázka zkoušejícího
  back: string; // Správná ucelená odpověď v bodech
  examNote?: string; // Důraz u ústní/praktické zkoušky
}

export interface DiagnosticStep {
  stepNumber: number;
  title: string;
  description: string;
  measurementTool: 'zkousecka' | 'multimetr' | 'megmet' | 'revizni-pristroj' | 'zrakova-kontrola';
  expectedResult: string;
  interpretation: string;
}

export interface DiagnosticScenario {
  id: string;
  title: string;
  difficulty: 'lehká' | 'střední' | 'zkoušková';
  description: string;
  symptoms: string[];
  initialState: {
    boardDescription: string;
    affectedCircuit: string;
  };
  steps: DiagnosticStep[];
  solution: string;
  examExplanation: string;
}

export interface UserProgress {
  completedSubchapters: string[]; // subchapter IDs
  quizScores: Record<number, { score: number; total: number; date: string }>; // chapterId -> score
  examHistory: {
    id: string;
    date: string;
    score: number;
    total: number;
    percentage: number;
    passed: boolean; // >= 75%
    durationSeconds: number;
    incorrectQuestionIds: string[];
  }[];
  mistakes: Record<string, {
    questionId: string;
    mistakeCount: number;
    correctInRow: number; // if >= 2, marked as mastered
    lastAttemptDate: string;
  }>;
  syncId: string; // e.g. "ELEKTRO-7842"
  lastSyncedAt?: string;
}
