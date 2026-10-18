import { UserProgress } from '../types';

const STORAGE_KEY = 'elektroucebnice_progress_v1';

// Generování náhodného 6-místného kódu pro synchronizaci (např. EL-4982)
export function generateSyncCode(): string {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const nums = '23456789';
  const l = letters[Math.floor(Math.random() * letters.length)] + letters[Math.floor(Math.random() * letters.length)];
  const n = nums[Math.floor(Math.random() * nums.length)] + nums[Math.floor(Math.random() * nums.length)] + nums[Math.floor(Math.random() * nums.length)] + nums[Math.floor(Math.random() * nums.length)];
  return `EL-${l}${n}`;
}

const DEFAULT_PROGRESS: UserProgress = {
  completedSubchapters: [],
  quizScores: {},
  examHistory: [],
  mistakes: {},
  syncId: generateSyncCode(),
  lastSyncedAt: undefined,
};

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = { ...DEFAULT_PROGRESS, syncId: generateSyncCode() };
      saveProgress(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      mistakes: parsed.mistakes || {},
      quizScores: parsed.quizScores || {},
      examHistory: parsed.examHistory || [],
      completedSubchapters: parsed.completedSubchapters || [],
      syncId: parsed.syncId || generateSyncCode(),
    };
  } catch (err) {
    console.error('Chyba při čtení postupu z localStorage:', err);
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Chyba při ukládání do localStorage:', err);
  }
}

// Sloučení dvou stavů (lokálního a cloudového) tak, aby se nic neztratilo
export function mergeProgress(local: UserProgress, remote: UserProgress): UserProgress {
  const mergedSubchapters = Array.from(new Set([...local.completedSubchapters, ...remote.completedSubchapters]));
  
  const mergedScores = { ...local.quizScores };
  for (const [key, val] of Object.entries(remote.quizScores)) {
    const numKey = Number(key);
    if (!mergedScores[numKey] || val.score > mergedScores[numKey].score) {
      mergedScores[numKey] = val;
    }
  }

  // Sloučení historie zkoušek dle id
  const examMap = new Map<string, typeof local.examHistory[0]>();
  [...local.examHistory, ...remote.examHistory].forEach(e => examMap.set(e.id, e));
  const mergedExams = Array.from(examMap.values()).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Sloučení chyb
  const mergedMistakes = { ...local.mistakes };
  for (const [qId, val] of Object.entries(remote.mistakes)) {
    if (!mergedMistakes[qId]) {
      mergedMistakes[qId] = val;
    } else {
      mergedMistakes[qId] = {
        questionId: qId,
        mistakeCount: Math.max(mergedMistakes[qId].mistakeCount, val.mistakeCount),
        correctInRow: Math.min(mergedMistakes[qId].correctInRow, val.correctInRow),
        lastAttemptDate: new Date(mergedMistakes[qId].lastAttemptDate) > new Date(val.lastAttemptDate) ? mergedMistakes[qId].lastAttemptDate : val.lastAttemptDate
      };
    }
  }

  return {
    completedSubchapters: mergedSubchapters,
    quizScores: mergedScores,
    examHistory: mergedExams,
    mistakes: mergedMistakes,
    syncId: local.syncId || remote.syncId,
    lastSyncedAt: new Date().toISOString(),
  };
}

// Cloudová synchronizace přes anonymní bezplatné KV rozhraní (kvdb / relay)
// Využívá unikátní hash sync kódu
export async function syncWithCloud(progress: UserProgress, customCode?: string): Promise<{ success: boolean; progress: UserProgress; message: string }> {
  const code = (customCode || progress.syncId || '').trim().toUpperCase();
  if (!code) {
    return { success: false, progress, message: 'Chybí synchronizační kód.' };
  }

  try {
    // 1. Zkusíme načíst vzdálený stav z cloudu
    // Používáme rychlou veřejnou cache proxy pro sdílení stavu
    const relayUrl = `https://kvdb.io/A8vK4YvJqj9a5xY3YwHq8N/sync_${code}`;
    
    let remoteData: UserProgress | null = null;
    try {
      const getRes = await fetch(relayUrl, { method: 'GET', cache: 'no-cache' });
      if (getRes.ok) {
        remoteData = await getRes.json();
      }
    } catch {
      // remote nemusel existovat
    }

    const merged = remoteData ? mergeProgress(progress, remoteData) : { ...progress, syncId: code, lastSyncedAt: new Date().toISOString() };
    merged.syncId = code;

    // 2. Nahrajeme sloučený stav zpět do cloudu
    const putRes = await fetch(relayUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(merged),
    });

    if (putRes.ok || putRes.status === 201) {
      saveProgress(merged);
      return { success: true, progress: merged, message: `Synchronizováno úspěšně (Kód: ${code}).` };
    } else {
      // Pokud je kvdb dočasně nedostupná, uložíme alespoň lokálně
      saveProgress(merged);
      return { success: true, progress: merged, message: `Lokální stav uložen s kódem ${code}.` };
    }
  } catch (err) {
    console.warn('Online synchronizace selhala (offline režim):', err);
    const updated = { ...progress, syncId: code };
    saveProgress(updated);
    return { success: false, progress: updated, message: 'Jste offline. Změny jsou bezpečně uloženy v zařízení a synchronizují se po připojení.' };
  }
}
