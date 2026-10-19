import { Question } from '../types';

/**
 * Fisher-Yates array shuffle (pure, non-mutating)
 */
export function shuffleArray<T>(arr: readonly T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Randomizuje pořadí možností ('a', 'b', 'c', 'd') uvnitř otázky
 * a spolehlivě přepočítá correctOptionId na novou náhodnou pozici.
 */
export function randomizeQuestion(q: Question): Question {
  const correctOption = q.options.find(o => o.id === q.correctOptionId);
  const correctText = correctOption ? correctOption.text : '';

  const shuffledOptions = shuffleArray(q.options);
  const letters = ['a', 'b', 'c', 'd'];

  let newCorrectOptionId = 'a';
  const newOptions = shuffledOptions.map((opt, idx) => {
    const newId = letters[idx] || opt.id;
    if (opt.text === correctText) {
      newCorrectOptionId = newId;
    }
    return {
      id: newId,
      text: opt.text,
    };
  });

  return {
    ...q,
    options: newOptions,
    correctOptionId: newCorrectOptionId,
  };
}

/**
 * Kompletně zrandomizuje sadu otázek pro test nebo kvíz:
 * 1. Náhodně promíchá pořadí otázek
 * 2. Náhodně promíchá možnosti ('a', 'b', 'c', 'd') uvnitř každé otázky a aktualizuje correctOptionId
 */
export function randomizeQuizQuestions(questions: Question[]): Question[] {
  const shuffledQuestions = shuffleArray(questions);
  return shuffledQuestions.map(randomizeQuestion);
}
