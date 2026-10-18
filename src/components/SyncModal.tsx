import React, { useState } from 'react';
import { X, Cloud, Copy, Check, RefreshCw, Smartphone, Download, Upload, QrCode, Link2 } from 'lucide-react';
import { UserProgress, LiveSyncStatus } from '../types';
import { syncWithCloud, saveProgress, loadProgress } from '../services/storage';

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onProgressUpdated: (newProgress: UserProgress) => void;
  syncStatus?: LiveSyncStatus;
}

export const SyncModal: React.FC<SyncModalProps> = ({
  isOpen,
  onClose,
  progress,
  onProgressUpdated,
  syncStatus = 'idle',
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  if (!isOpen) return null;

  const syncUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?syncCode=${progress.syncId}`
    : '';

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&format=svg&data=${encodeURIComponent(syncUrl)}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(progress.syncId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(syncUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleManualSync = async (codeToUse?: string) => {
    setLoading(true);
    setStatusMsg({ type: 'info', text: 'Probíhá synchronizace s cloudem...' });

    const code = (codeToUse || inputCode || progress.syncId).trim().toUpperCase();
    const result = await syncWithCloud(progress, code);

    setLoading(false);
    if (result.success) {
      onProgressUpdated(result.progress);
      setStatusMsg({ type: 'success', text: result.message });
      if (codeToUse || inputCode) {
        setInputCode('');
      }
    } else {
      setStatusMsg({ type: 'error', text: result.message });
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `elektroucebnice_zaloha_${progress.syncId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setStatusMsg({ type: 'success', text: 'Záloha byla úspěšně stažena.' });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && typeof parsed === 'object') {
            saveProgress(parsed);
            onProgressUpdated(loadProgress());
            setStatusMsg({ type: 'success', text: 'Záloha byla úspěšně načtena!' });
          }
        } catch {
          setStatusMsg({ type: 'error', text: 'Neplatný formát souboru zálohy.' });
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Tlačítko zavřít */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hlavička */}
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Sdílení postupu (PC ↔ Mobil)</h2>
            <p className="text-xs text-slate-400">
              Přeneste si svůj postup, výsledky testů a chyby mezi počítačem a mobilem.
            </p>
          </div>
        </div>

        {/* Živý stav propojení */}
        {syncStatus === 'connected' ? (
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs mb-4">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>
              <strong>Živé propojení je aktivní:</strong> Každé kliknutí se ihned přenáší na všechna spárovaná zařízení.
            </span>
          </div>
        ) : syncStatus === 'syncing' ? (
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs mb-4">
            <span className="animate-spin relative inline-flex rounded-full h-2 w-2 border-2 border-amber-400 border-t-transparent shrink-0"></span>
            <span>Probíhá odesílání / příjem změn v cloudu...</span>
          </div>
        ) : syncStatus === 'offline' ? (
          <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs mb-4">
            <span className="h-2 w-2 rounded-full bg-slate-500 shrink-0"></span>
            <span>Zařízení je momentálně offline. Změny jsou bezpečně uloženy v zařízení a odešlou se po připojení.</span>
          </div>
        ) : null}

        {/* 1. Můj aktuální kód zařízení */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 mb-4">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Tvůj osobní studijní kód:
          </label>
          <div className="flex items-center justify-between gap-3 bg-slate-900 border border-slate-700/80 rounded-lg p-3">
            <span className="font-mono text-xl sm:text-2xl font-extrabold tracking-wider text-amber-400">
              {progress.syncId}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                title="Kopírovat kód"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Zkopírováno' : 'Kód'}</span>
              </button>
              <button
                onClick={() => setShowQr((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  showQr
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
                title="Zobrazit QR kód pro fotoaparát mobilu"
              >
                <QrCode className="w-4 h-4" />
                <span>QR kód</span>
              </button>
            </div>
          </div>

          {/* QR kód pro okamžité načtení v mobilu */}
          {showQr && (
            <div className="mt-3 p-4 bg-white rounded-xl flex flex-col items-center justify-center text-slate-900 shadow-md animate-fadeIn">
              <img
                src={qrImageUrl}
                alt={`QR kód ${progress.syncId}`}
                className="w-44 h-44 rounded-lg"
              />
              <p className="text-xs font-semibold text-slate-700 text-center mt-2">
                Namiřte fotoaparát mobilu na tento QR kód pro okamžité spárování.
              </p>
              <button
                onClick={handleCopyLink}
                className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Link2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Odkaz zkopírován' : 'Kopírovat přímý odkaz'}</span>
              </button>
            </div>
          )}

          {/* Návod krok za krokem */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 space-y-1 leading-relaxed">
            <div>
              <strong>1. Na PC:</strong> Klikněte níže na tlačítko <em>„Nahrát postup do cloudu“</em>.
            </div>
            <div>
              <strong>2. Na mobilu:</strong> Otevřete aplikaci, klikněte nahoře na kód, vložte kód <strong>{progress.syncId}</strong> a klikněte na <em>„Spárovat“</em> (nebo načtěte QR kód).
            </div>
          </div>
        </div>

        {/* Tlačítko okamžitého nahrání do cloudu */}
        <div className="mb-4">
          <button
            onClick={() => handleManualSync()}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Nahrát / Aktualizovat postup v cloudu</span>
          </button>
        </div>

        {/* 2. Zadat kód z jiného zařízení (spárování na mobilu) */}
        <div className="mb-4 bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Zadej kód z druhého zařízení:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              placeholder="např. EL-AB1234"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 font-mono text-sm uppercase text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={() => handleManualSync(inputCode)}
              disabled={loading || !inputCode.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 hover:text-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Smartphone className="w-4 h-4" />
              <span>Spárovat</span>
            </button>
          </div>
        </div>

        {/* Hláška stavu */}
        {statusMsg && (
          <div className={`p-3 rounded-xl text-xs mb-4 leading-relaxed ${
            statusMsg.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' :
            statusMsg.type === 'error' ? 'bg-red-500/10 border border-red-500/30 text-red-300' :
            'bg-sky-500/10 border border-sky-500/30 text-sky-300'
          }`}>
            {statusMsg.text}
          </div>
        )}

        {/* Záloha do souboru */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Ruční záloha (soubor):</span>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
            <label className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>Import</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};
