import React, { useState } from 'react';
import { X, Cloud, Copy, Check, RefreshCw, Smartphone, Download, Upload } from 'lucide-react';
import { UserProgress } from '../types';
import { syncWithCloud, saveProgress, loadProgress } from '../services/storage';

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onProgressUpdated: (newProgress: UserProgress) => void;
}

export const SyncModal: React.FC<SyncModalProps> = ({
  isOpen,
  onClose,
  progress,
  onProgressUpdated,
}) => {
  const [copied, setCopied] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(progress.syncId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleManualSync = async (codeToUse?: string) => {
    setLoading(true);
    setStatusMsg({ type: 'info', text: 'Probíhá synchronizace...' });

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
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100">
        
        {/* Tlačítko zavřít */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hlavička */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Sdílení postupu (PC ↔ Mobil)</h2>
            <p className="text-xs text-slate-400">
              Uč se v práci na mobilu a doma pokračuj na PC se stejným postupem a chybami.
            </p>
          </div>
        </div>

        {/* 1. Můj aktuální kód zařízení */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 mb-5">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Tvůj osobní studijní kód:
          </label>
          <div className="flex items-center justify-between gap-3 bg-slate-900 border border-slate-700/80 rounded-lg p-3">
            <span className="font-mono text-xl sm:text-2xl font-extrabold tracking-wider text-amber-400">
              {progress.syncId}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Zkopírováno' : 'Kopírovat'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            💡 <strong>Jak to funguje:</strong> Na mobilu v práci otevři tuto aplikaci, klikni nahoře na kód a zadej přesně tento kód do pole níže. Všechny dokončené kapitoly a výsledky se ihned propojí.
          </p>
        </div>

        {/* 2. Zadat kód z jiného zařízení */}
        <div className="mb-5">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Připojit kód z druhého zařízení:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              placeholder="např. EL-AB1234"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 font-mono text-sm uppercase text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={() => handleManualSync(inputCode)}
              disabled={loading || !inputCode.trim()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Smartphone className="w-4 h-4" />
              <span>Spárovat</span>
            </button>
          </div>
        </div>

        {/* Tlačítko okamžité synchronizace */}
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => handleManualSync()}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 text-amber-400 ${loading ? 'animate-spin' : ''}`} />
            <span>Synchronizovat s cloudem nyní</span>
          </button>
        </div>

        {/* Hláška stavu */}
        {statusMsg && (
          <div className={`p-3 rounded-lg text-xs mb-4 ${
            statusMsg.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' :
            statusMsg.type === 'error' ? 'bg-red-500/10 border border-red-500/30 text-red-300' :
            'bg-sky-500/10 border border-sky-500/30 text-sky-300'
          }`}>
            {statusMsg.text}
          </div>
        )}

        {/* Záloha do souboru */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Ruční záloha dat:</span>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export souboru</span>
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
