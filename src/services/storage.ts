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

// Cloudová synchronizace dat (PC ↔ Mobil) přes spolehlivý veřejný cloud relay
export async function syncWithCloud(
  progress: UserProgress,
  customCode?: string
): Promise<{ success: boolean; progress: UserProgress; message: string }> {
  const code = (customCode || progress.syncId || '').trim().toUpperCase();
  if (!code) {
    return { success: false, progress, message: 'Chybí synchronizační kód.' };
  }

  // Sanitizace kódu pro URL topic (odstraní pomlčky a mezery pro bezpečný topic)
  const cleanTopicId = code.replace(/[^A-Z0-9]/gi, '');
  const topicUrl = `https://ntfy.sh/elektro_sync_${cleanTopicId}`;

  const isPairingWithOtherDevice = Boolean(customCode && customCode.trim().toUpperCase() !== progress.syncId);

  try {
    // 1. Zkusíme načíst uložená data z cloudu
    let remoteData: UserProgress | null = null;
    try {
      const getRes = await fetch(`${topicUrl}/json?poll=1`, {
        method: 'GET',
        cache: 'no-cache',
      });

      if (getRes.ok) {
        const text = await getRes.text();
        const lines = text.trim().split('\n').filter(Boolean);
        // Projdeme zprávy a najdeme nejnovější platný UserProgress
        for (const line of lines) {
          try {
            const entry = JSON.parse(line);
            if (entry && entry.message) {
              const parsed = JSON.parse(entry.message);
              if (parsed && Array.isArray(parsed.completedSubchapters)) {
                remoteData = remoteData ? mergeProgress(remoteData, parsed) : parsed;
              }
            }
          } catch {
            // neplatný řádek přeskočíme
          }
        }
      }
    } catch (e) {
      console.warn('Nepodařilo se stáhnout data z cloudu:', e);
    }

    // Pokud uživatel na mobilu zadal kód z PC, ale v cloudu pod tímto kódem nic není
    if (isPairingWithOtherDevice && !remoteData) {
      return {
        success: false,
        progress,
        message: `Pod kódem ${code} nebyla v cloudu nalezena žádná data. Nejprve na prvním zařízení (PC) klikněte na „Synchronizovat s cloudem nyní“, aby se data nahrála.`,
      };
    }

    // Sloučení stavů
    const merged = remoteData
      ? mergeProgress(progress, remoteData)
      : { ...progress, syncId: code, lastSyncedAt: new Date().toISOString() };
    merged.syncId = code;
    merged.lastSyncedAt = new Date().toISOString();

    // 2. Nahrajeme sloučený stav zpět do cloudu pro další synchronizace
    const postRes = await fetch(topicUrl, {
      method: 'POST',
      headers: {
        'Title': 'sync',
        'Tags': 'books',
      },
      body: JSON.stringify(merged),
    });

    if (postRes.ok) {
      saveProgress(merged);
      const subCount = merged.completedSubchapters.length;
      const quizCount = Object.keys(merged.quizScores).length;

      if (remoteData && isPairingWithOtherDevice) {
        return {
          success: true,
          progress: merged,
          message: `Úspěšně spárováno! Z druhého zařízení bylo staženo ${subCount} kapitol a ${quizCount} kvízů.`,
        };
      }

      return {
        success: true,
        progress: merged,
        message: `Postup byl úspěšně nahrán do cloudu (Kód: ${code}). Nyní můžete tento kód zadat na mobilu.`,
      };
    } else {
      // Pokud POST vrátil chybu, ale máme sloučený lokální stav
      saveProgress(merged);
      return {
        success: true,
        progress: merged,
        message: `Lokální stav byl aktualizován s kódem ${code}.`,
      };
    }
  } catch (err) {
    console.warn('Online synchronizace selhala (chyba sítě):', err);
    return {
      success: false,
      progress,
      message: 'Synchronizace selhala – zkontrolujte připojení k internetu a zkuste to znovu.',
    };
  }
}
