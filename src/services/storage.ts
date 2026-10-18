import { UserProgress, LiveSyncStatus } from '../types';

const STORAGE_KEY = 'elektroucebnice_progress_v1';

// Generování náhodného 6-místného kódu pro synchronizaci (např. EL-AB4982)
export function generateSyncCode(): string {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const nums = '23456789';
  const l =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)];
  const n =
    nums[Math.floor(Math.random() * nums.length)] +
    nums[Math.floor(Math.random() * nums.length)] +
    nums[Math.floor(Math.random() * nums.length)] +
    nums[Math.floor(Math.random() * nums.length)];
  return `EL-${l}${n}`;
}

// Unikátní ID této instance prohlížeče/zařízení pro eliminaci vlastního echa při live streamu
export function getDeviceId(): string {
  if (typeof window === 'undefined') return 'server';
  let devId = window.localStorage.getItem('elektro_device_instance_id');
  if (!devId) {
    devId = 'dev_' + Math.random().toString(36).substring(2, 10);
    window.localStorage.setItem('elektro_device_instance_id', devId);
  }
  return devId;
}

export interface SyncEnvelope {
  senderId: string;
  timestamp: number;
  progress: UserProgress;
}

const DEFAULT_PROGRESS: UserProgress = {
  completedSubchapters: [],
  quizScores: {},
  examHistory: [],
  mistakes: {},
  mistakesClearedAt: undefined,
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
      mistakesClearedAt: parsed.mistakesClearedAt,
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

// Sloučení dvou profilů postupu bez ztráty dat z kteréhokoliv zařízení (Union / Merge)
export function mergeProgress(local: UserProgress, remote: UserProgress): UserProgress {
  const mergedSubchapters = Array.from(
    new Set([...(local.completedSubchapters || []), ...(remote.completedSubchapters || [])])
  );

  const mergedScores: Record<number, { score: number; total: number; date: string }> = {
    ...(local.quizScores || {}),
  };
  if (remote.quizScores) {
    for (const [chIdStr, rScore] of Object.entries(remote.quizScores)) {
      const chId = Number(chIdStr);
      const lScore = mergedScores[chId];
      if (!lScore) {
        mergedScores[chId] = rScore;
      } else {
        const lRatio = lScore.total > 0 ? lScore.score / lScore.total : 0;
        const rRatio = rScore.total > 0 ? rScore.score / rScore.total : 0;
        mergedScores[chId] = rRatio >= lRatio ? rScore : lScore;
      }
    }
  }

  const existingExamIds = new Set((local.examHistory || []).map((e) => e.id));
  const mergedExams = [...(local.examHistory || [])];
  if (remote.examHistory) {
    for (const exam of remote.examHistory) {
      if (!existingExamIds.has(exam.id)) {
        mergedExams.push(exam);
        existingExamIds.add(exam.id);
      }
    }
  }
  mergedExams.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Porovnání času smazání chyb – pokud bylo smazání provedeno na kterémkoliv zařízení, zohlední se
  const localClearedAt = local.mistakesClearedAt ? new Date(local.mistakesClearedAt).getTime() : 0;
  const remoteClearedAt = remote.mistakesClearedAt ? new Date(remote.mistakesClearedAt).getTime() : 0;
  const effectiveClearedAt = Math.max(localClearedAt, remoteClearedAt);
  const effectiveClearedAtStr =
    effectiveClearedAt > 0
      ? localClearedAt >= remoteClearedAt
        ? local.mistakesClearedAt
        : remote.mistakesClearedAt
      : undefined;

  const mergedMistakes: Record<string, UserProgress['mistakes'][string]> = {};

  const allMistakeEntries = [
    ...Object.entries(local.mistakes || {}),
    ...Object.entries(remote.mistakes || {}),
  ];

  for (const [qId, val] of allMistakeEntries) {
    const mistakeTime = val.lastAttemptDate ? new Date(val.lastAttemptDate).getTime() : 0;
    // Pokud chyba vznikla před nebo při posledním smazání historie chyb, nepřidáváme ji zpět
    if (effectiveClearedAt > 0 && mistakeTime <= effectiveClearedAt) {
      continue;
    }

    if (!mergedMistakes[qId]) {
      mergedMistakes[qId] = val;
    } else {
      mergedMistakes[qId] = {
        questionId: qId,
        mistakeCount: Math.max(mergedMistakes[qId].mistakeCount, val.mistakeCount),
        correctInRow: Math.min(mergedMistakes[qId].correctInRow, val.correctInRow),
        lastAttemptDate:
          new Date(mergedMistakes[qId].lastAttemptDate) > new Date(val.lastAttemptDate)
            ? mergedMistakes[qId].lastAttemptDate
            : val.lastAttemptDate,
      };
    }
  }

  return {
    completedSubchapters: mergedSubchapters,
    quizScores: mergedScores,
    examHistory: mergedExams,
    mistakes: mergedMistakes,
    mistakesClearedAt: effectiveClearedAtStr,
    syncId: local.syncId || remote.syncId,
    lastSyncedAt: new Date().toISOString(),
  };
}

// Okamžitý broadcast změny do cloudu přes live relay
export async function broadcastProgress(progress: UserProgress): Promise<boolean> {
  const code = (progress.syncId || '').trim().toUpperCase();
  if (!code) return false;

  const cleanTopicId = code.replace(/[^A-Z0-9]/gi, '');
  const topicUrl = `https://ntfy.sh/elektro_sync_${cleanTopicId}`;

  const envelope: SyncEnvelope = {
    senderId: getDeviceId(),
    timestamp: Date.now(),
    progress,
  };

  try {
    const res = await fetch(topicUrl, {
      method: 'POST',
      headers: {
        Title: 'live_sync',
        Tags: 'electric,books',
      },
      body: JSON.stringify(envelope),
    });
    return res.ok;
  } catch (err) {
    console.warn('Live sync broadcast selhal:', err);
    return false;
  }
}

// Odběr živého SSE proudu pro okamžitou synchronizaci změn na spárovaném zařízení
export function subscribeToLiveSync(
  syncCode: string,
  onRemoteUpdate: (remote: UserProgress) => void,
  onStatusChange: (status: LiveSyncStatus) => void
): () => void {
  const code = (syncCode || '').trim().toUpperCase();
  const cleanTopicId = code.replace(/[^A-Z0-9]/gi, '');
  if (!cleanTopicId) {
    onStatusChange('idle');
    return () => {};
  }

  if (typeof window === 'undefined') {
    return () => {};
  }

  if (!navigator.onLine) {
    onStatusChange('offline');
  } else {
    onStatusChange('connected');
  }

  const handleOnline = () => onStatusChange('connected');
  const handleOffline = () => onStatusChange('offline');
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  const sseUrl = `https://ntfy.sh/elektro_sync_${cleanTopicId}/sse`;
  let eventSource: EventSource | null = null;
  let isClosed = false;

  try {
    eventSource = new EventSource(sseUrl);

    eventSource.onopen = () => {
      if (!isClosed) onStatusChange('connected');
    };

    eventSource.onerror = () => {
      if (!isClosed && !navigator.onLine) {
        onStatusChange('offline');
      }
    };

    eventSource.onmessage = (event) => {
      if (isClosed) return;
      try {
        const raw = JSON.parse(event.data);
        if (raw && raw.event === 'message' && raw.message) {
          const payload = JSON.parse(raw.message);
          // Ignorujeme vlastní echo ze stejného zařízení
          if (payload && payload.senderId && payload.senderId === getDeviceId()) {
            return;
          }
          const remote = payload.progress || payload;
          if (remote && Array.isArray(remote.completedSubchapters)) {
            onStatusChange('syncing');
            onRemoteUpdate(remote);
            setTimeout(() => {
              if (!isClosed) onStatusChange('connected');
            }, 600);
          }
        }
      } catch {
        // ignorujeme nevalidní zprávy
      }
    };
  } catch (e) {
    console.warn('Inicializace EventSource selhala:', e);
  }

  return () => {
    isClosed = true;
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
    if (eventSource) {
      eventSource.close();
    }
  };
}

// Manuální nebo jednorázová synchronizace dat s cloudem (načtení + zápis)
export async function syncWithCloud(
  progress: UserProgress,
  customCode?: string
): Promise<{ success: boolean; progress: UserProgress; message: string }> {
  const code = (customCode || progress.syncId || '').trim().toUpperCase();
  if (!code) {
    return { success: false, progress, message: 'Chybí synchronizační kód.' };
  }

  const cleanTopicId = code.replace(/[^A-Z0-9]/gi, '');
  const topicUrl = `https://ntfy.sh/elektro_sync_${cleanTopicId}`;
  const isPairingWithOtherDevice = Boolean(
    customCode && customCode.trim().toUpperCase() !== progress.syncId
  );

  try {
    let remoteData: UserProgress | null = null;
    try {
      // Timeout 3.5s pro stažení historie, aby se zabránilo zasekávání
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const getRes = await fetch(`${topicUrl}/json?poll=1&since=24h`, {
        method: 'GET',
        cache: 'no-cache',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (getRes.ok) {
        const text = await getRes.text();
        const lines = text.trim().split('\n').filter(Boolean);
        // Vybereme pouze nejnovější zprávu pro každé zařízení (senderId)
        const latestPerSender = new Map<string, { timestamp: number; progress: UserProgress }>();

        for (const line of lines) {
          try {
            const entry = JSON.parse(line);
            if (entry && entry.message) {
              const parsed = JSON.parse(entry.message);
              const sender = parsed.senderId || 'unknown';
              const time = parsed.timestamp || (entry.time ? entry.time * 1000 : 0);
              const remote = parsed.progress || parsed;
              if (remote && Array.isArray(remote.completedSubchapters)) {
                const existing = latestPerSender.get(sender);
                if (!existing || time >= existing.timestamp) {
                  latestPerSender.set(sender, { timestamp: time, progress: remote });
                }
              }
            }
          } catch {
            // neplatný řádek přeskočíme
          }
        }

        // Sloučíme pouze aktuální stav z jednotlivých zařízení
        for (const item of latestPerSender.values()) {
          remoteData = remoteData ? mergeProgress(remoteData, item.progress) : item.progress;
        }
      }
    } catch (e) {
      console.warn('Nepodařilo se stáhnout data z cloudu:', e);
    }

    if (isPairingWithOtherDevice && !remoteData) {
      return {
        success: false,
        progress,
        message: `Pod kódem ${code} nebyla v cloudu nalezena žádná data. Nejprve na prvním zařízení (PC) klikněte na „Nahrát / Aktualizovat postup v cloudu“.`,
      };
    }

    const merged = remoteData
      ? mergeProgress(progress, remoteData)
      : { ...progress, syncId: code, lastSyncedAt: new Date().toISOString() };
    merged.syncId = code;
    merged.lastSyncedAt = new Date().toISOString();

    const envelope: SyncEnvelope = {
      senderId: getDeviceId(),
      timestamp: Date.now(),
      progress: merged,
    };

    const postRes = await fetch(topicUrl, {
      method: 'POST',
      headers: {
        Title: 'sync',
        Tags: 'books',
      },
      body: JSON.stringify(envelope),
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
        message: `Postup byl úspěšně nahrán do cloudu (Kód: ${code}). Nyní je aktivní živé propojení.`,
      };
    } else {
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
