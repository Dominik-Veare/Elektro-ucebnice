import React, { useState } from 'react';
import { 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Wrench
} from 'lucide-react';
import { DIAGNOSTIC_SCENARIOS } from '../data/diagnostics';
import { DiagnosticScenario } from '../types';

export const DiagnosticsView: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(DIAGNOSTIC_SCENARIOS[0].id);
  const [revealedSteps, setRevealedSteps] = useState<Record<string, number>>({});

  const scenario: DiagnosticScenario = DIAGNOSTIC_SCENARIOS.find(s => s.id === selectedScenarioId) || DIAGNOSTIC_SCENARIOS[0];
  const currentStep = revealedSteps[scenario.id] || 0;

  const handleRevealNextStep = () => {
    setRevealedSteps(prev => ({
      ...prev,
      [scenario.id]: Math.min(scenario.steps.length, (prev[scenario.id] || 0) + 1)
    }));
  };

  const handleResetScenario = () => {
    setRevealedSteps(prev => ({
      ...prev,
      [scenario.id]: 0
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-16">
      
      {/* Hlavička */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Search className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-black text-white leading-snug whitespace-nowrap">Simulátor diagnostiky poruch</h1>
        </div>
        <p className="text-xs text-slate-400 text-pretty leading-relaxed">
          Oficiální kritérium zkoušky 26-017-H: Vyhledávání simulovaných závad v instalaci a metodika jejich odstranění.
        </p>

        {/* Výběr scénáře */}
        <div className="flex flex-wrap gap-2 mt-5">
          {DIAGNOSTIC_SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedScenarioId(s.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                selectedScenarioId === s.id
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Popis problému */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
              Zadání autorizované osoby u zkoušky • Obtížnost: {scenario.difficulty}
            </span>
            <h2 className="text-xl font-black text-white mt-1">
              {scenario.title}
            </h2>
          </div>
          <button
            onClick={handleResetScenario}
            className="text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 shrink-0"
          >
            Začít znovu
          </button>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed">
          {scenario.description}
        </p>

        {/* Symptomy */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
            Pozorované symptomy a stav rozvaděče:
          </span>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {scenario.symptoms.map((symptom, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Postupné kroky diagnostiky */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Wrench className="w-4 h-4 text-amber-400" />
            <span>Kroky vyhledávání závady:</span>
          </h3>

          {scenario.steps.map((step, idx) => {
            const isRevealed = currentStep >= idx + 1;

            if (!isRevealed) return null;

            return (
              <div
                key={step.stepNumber}
                className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 animate-fadeIn"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300">
                    Krok {step.stepNumber}: {step.title}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono uppercase">
                    Měřidlo: {step.measurementTool}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>

                {/* Naměřená hodnota a interpretace */}
                <div className="bg-slate-900 border border-slate-800/80 rounded-lg p-3 text-xs space-y-1">
                  <div className="font-semibold text-slate-200">
                    Naměřený výsledek: <span className="font-mono text-amber-400">{step.expectedResult}</span>
                  </div>
                  <div className="text-slate-400 pt-1">
                    <strong className="text-emerald-400">Interpretace:</strong> {step.interpretation}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tlačítko pro odhalení dalšího kroku */}
        {currentStep < scenario.steps.length ? (
          <div className="text-center pt-4">
            <button
              onClick={handleRevealNextStep}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
            >
              <span>{currentStep === 0 ? 'Zahájit diagnostiku (Krok 1)' : `Provést další krok (${currentStep + 1}/${scenario.steps.length})`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Závěrečné vyřešení a zdůvodnění pro zkoušejícího */
          <div className="mt-6 p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-3 animate-fadeIn">
            <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Závada úspěšně lokalizována a odstraněna!</span>
            </div>
            <div className="text-xs text-slate-200 leading-relaxed">
              <strong className="text-white block mb-0.5">Postup opravy:</strong>
              {scenario.solution}
            </div>
            <div className="pt-2 border-t border-emerald-500/30 text-xs text-emerald-200/90 leading-relaxed">
              <strong className="block text-emerald-300 mb-0.5">⚠️ Co zkoušející hodnotí u zkoušky:</strong>
              {scenario.examExplanation}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
