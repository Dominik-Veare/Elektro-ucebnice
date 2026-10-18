import React, { useState } from 'react';
import { ToggleLeft, Lightbulb, ShieldAlert, CheckCircle2, RotateCcw, Zap } from 'lucide-react';

export const WiringSimulator: React.FC = () => {
  const [activeSchema, setActiveSchema] = useState<'razeni1' | 'razeni5' | 'razeni6' | 'razeni7' | 'impulzni' | 'rcd'>('razeni6');

  // Stavy pro vypínače
  const [switch1, setSwitch1] = useState(false);
  const [switch5A, setSwitch5A] = useState(false);
  const [switch5B, setSwitch5B] = useState(false);
  const [switch6A, setSwitch6A] = useState(false);
  const [switch6B, setSwitch6B] = useState(false);
  const [switch7A, setSwitch7A] = useState(false);
  const [switch7B, setSwitch7B] = useState(false); // křížový
  const [switch7C, setSwitch7C] = useState(false);

  // Stavy pro impulzní (paměťové) relé
  const [impulseRelayOn, setImpulseRelayOn] = useState(false);
  const [activePushButton, setActivePushButton] = useState<number | null>(null);
  const [pulseCount, setPulseCount] = useState(0);

  // Stavy pro proudový chránič
  const [leakageMa, setLeakageMa] = useState<number>(0);
  const [rcdTripped, setRcdTripped] = useState<boolean>(false);

  // Logika sepnutí žárovek
  // Řazení 1:
  const bulb1On = switch1;
  // Řazení 5:
  const bulb5AOn = switch5A;
  const bulb5BOn = switch5B;
  // Řazení 6 (schodišťák): svítí, pokud jsou oba přepínače ve stejné poloze (oba nahoře nebo oba dole)
  const bulb6On = switch6A === switch6B;
  // Řazení 7 (křížák): každé přepnutí kteréhokoliv ze 3 spínačů změní stav
  // Parita: switch7A XOR switch7B XOR switch7C
  const bulb7On = (Number(switch7A) + Number(switch7B) + Number(switch7C)) % 2 === 0;

  // Stisk tlačítka pro impulzní relé
  const handleTriggerImpulse = (btnIndex: number) => {
    setActivePushButton(btnIndex);
    setImpulseRelayOn(prev => !prev);
    setPulseCount(prev => prev + 1);
    setTimeout(() => {
      setActivePushButton(null);
    }, 350);
  };

  // Logika RCD:
  const handleLeakageChange = (val: number) => {
    setLeakageMa(val);
    if (val >= 22) { // typický vybavovací proud 30 mA chrániče
      setRcdTripped(true);
    }
  };

  const resetRcd = () => {
    setLeakageMa(0);
    setRcdTripped(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-16">
      
      {/* Hlavička */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ToggleLeft className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-black text-white leading-snug whitespace-nowrap">Interaktivní schémata zapojení</h1>
        </div>
        <p className="text-xs text-slate-400 text-pretty leading-relaxed">
          Vyzkoušej si interaktivně funkci domovních spínačů (řazení 1, 5, 6, 7), impulzního relé s tlačítky a princip proudového chrániče (RCD).
        </p>

        {/* Přepínače obvodů */}
        <div className="flex flex-wrap gap-2 mt-5">
          <button
            onClick={() => setActiveSchema('razeni1')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSchema === 'razeni1' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Řazení 1 (jednopólový)
          </button>
          <button
            onClick={() => setActiveSchema('razeni5')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSchema === 'razeni5' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Řazení 5 (lustrový)
          </button>
          <button
            onClick={() => setActiveSchema('razeni6')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSchema === 'razeni6' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Řazení 6 (schodišťový 6+6)
          </button>
          <button
            onClick={() => setActiveSchema('razeni7')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSchema === 'razeni7' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Řazení 7 (křížový 6-7-6)
          </button>
          <button
            onClick={() => setActiveSchema('impulzni')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSchema === 'impulzni' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Impulzní relé (tlačítka)
          </button>
          <button
            onClick={() => setActiveSchema('rcd')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeSchema === 'rcd' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Proudový chránič (RCD)
          </button>
        </div>
      </div>

      {/* 1. ŘAZENÍ 1 */}
      {activeSchema === 'razeni1' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">Spínač č. 1</span>
            <h2 className="text-lg font-bold text-white">Jednopólový spínač (1 svítidlo z 1 místa)</h2>
            <p className="text-xs text-slate-400 mt-1">
              Fáze L vstupuje do svorky L spínače. Spínačem přerušujeme výhradně fázový vodič L. Nulák N (na závit objímky) a PE jdou přímo do svítidla.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-8">
            <div className="flex items-center justify-around w-full max-w-md gap-4">
              {/* Spínač */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setSwitch1(!switch1)}
                  className={`w-16 h-24 rounded-2xl border-2 flex flex-col items-center justify-between p-2 shadow-lg transition-all ${
                    switch1
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                      : 'bg-slate-900 border-slate-700 text-slate-500'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase">{switch1 ? 'ZAP' : 'VYP'}</span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs ${
                    switch1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    1
                  </div>
                  <span className="text-[9px] text-slate-400">Klikni</span>
                </button>
                <span className="text-xs text-slate-400 font-mono">Spínač č. 1</span>
              </div>

              {/* Vodič znázornění */}
              <div className="flex-1 h-1 relative">
                <div className={`h-full transition-all duration-300 ${bulb1On ? 'bg-amber-400 shadow-md shadow-amber-400/50' : 'bg-slate-800'}`} />
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-500">
                  {bulb1On ? '230 V proud teče' : 'Přerušeno'}
                </span>
              </div>

              {/* Žárovka */}
              <div className="flex flex-col items-center gap-2">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  bulb1On 
                    ? 'bg-amber-400/20 text-yellow-300 ring-8 ring-amber-400/20 shadow-2xl shadow-yellow-400/50 scale-110' 
                    : 'bg-slate-900 text-slate-700 border border-slate-800'
                }`}>
                  <Lightbulb className={`w-10 h-10 ${bulb1On ? 'fill-yellow-400 text-yellow-300' : ''}`} />
                </div>
                <span className="text-xs text-slate-300 font-bold">
                  {bulb1On ? 'SVÍTÍ' : 'NESVÍTÍ'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ŘAZENÍ 5 */}
      {activeSchema === 'razeni5' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">Spínač č. 5</span>
            <h2 className="text-lg font-bold text-white">Sériový / lustrový spínač (dvě nezávislé klapky)</h2>
            <p className="text-xs text-slate-400 mt-1">
              Jedna společná fázová svorka L, dva spínané výstupy (pro dvě skupiny žárovek v lustru nebo světlo + ventilátor).
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-8">
            <div className="flex items-center justify-around w-full max-w-lg gap-4">
              
              {/* Dvojklapkový vypínač */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-slate-900 border-2 border-slate-700 p-2 rounded-2xl flex gap-1 shadow-xl">
                  <button
                    onClick={() => setSwitch5A(!switch5A)}
                    className={`w-10 h-24 rounded-xl border flex flex-col items-center justify-between p-1.5 transition-colors ${
                      switch5A ? 'bg-amber-500/20 border-amber-500 text-amber-400 font-bold' : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    <span className="text-[9px]">{switch5A ? 'ZAP' : 'VYP'}</span>
                    <span className="text-xs font-bold">A</span>
                    <span className="text-[8px] text-slate-500">Klapka</span>
                  </button>
                  <button
                    onClick={() => setSwitch5B(!switch5B)}
                    className={`w-10 h-24 rounded-xl border flex flex-col items-center justify-between p-1.5 transition-colors ${
                      switch5B ? 'bg-amber-500/20 border-amber-500 text-amber-400 font-bold' : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    <span className="text-[9px]">{switch5B ? 'ZAP' : 'VYP'}</span>
                    <span className="text-xs font-bold">B</span>
                    <span className="text-[8px] text-slate-500">Klapka</span>
                  </button>
                </div>
                <span className="text-xs text-slate-400 font-mono">Dvojspínač č. 5</span>
              </div>

              {/* Dvě žárovky */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    bulb5AOn ? 'bg-amber-400/20 text-yellow-300 ring-4 ring-amber-400/20 shadow-lg shadow-yellow-400/30' : 'bg-slate-900 text-slate-700'
                  }`}>
                    <Lightbulb className={`w-6 h-6 ${bulb5AOn ? 'fill-yellow-400 text-yellow-300' : ''}`} />
                  </div>
                  <span className="text-xs font-semibold text-slate-300">Skupina A: {bulb5AOn ? 'Svítí' : 'Nesvítí'}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    bulb5BOn ? 'bg-amber-400/20 text-yellow-300 ring-4 ring-amber-400/20 shadow-lg shadow-yellow-400/30' : 'bg-slate-900 text-slate-700'
                  }`}>
                    <Lightbulb className={`w-6 h-6 ${bulb5BOn ? 'fill-yellow-400 text-yellow-300' : ''}`} />
                  </div>
                  <span className="text-xs font-semibold text-slate-300">Skupina B: {bulb5BOn ? 'Svítí' : 'Nesvítí'}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 3. ŘAZENÍ 6 (SCHODIŠŤÁK) */}
      {activeSchema === 'razeni6' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">Spínače 6 + 6</span>
            <h2 className="text-lg font-bold text-white">Střídavé (schodišťové) zapojení ze 2 míst</h2>
            <p className="text-xs text-slate-400 mt-1">
              Ovládání jednoho světla ze dvou míst (např. dole a nahoře na schodišti). Zkus kliknout na kterýkoliv z přepínačů!
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-8">
            <div className="flex items-center justify-between w-full max-w-xl gap-4">
              
              {/* Spínač 6A */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setSwitch6A(!switch6A)}
                  className={`w-14 h-24 rounded-2xl border-2 flex flex-col items-center justify-between p-2 shadow-lg transition-all ${
                    switch6A ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  <span className="text-[10px] font-bold">{switch6A ? 'POLOHA 1' : 'POLOHA 2'}</span>
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-amber-400">
                    6A
                  </div>
                  <span className="text-[9px] text-slate-500">Klikni</span>
                </button>
                <span className="text-xs text-slate-400">Dole na schodech</span>
              </div>

              {/* Korespondenční linky */}
              <div className="flex-1 flex flex-col justify-between h-14 relative px-2">
                <div className={`h-1 rounded transition-all ${bulb6On && switch6A ? 'bg-amber-400 shadow-sm shadow-amber-400' : 'bg-slate-800'}`} />
                <span className="text-[9px] text-center text-slate-500 font-mono">2 korespondenční vodiče</span>
                <div className={`h-1 rounded transition-all ${bulb6On && !switch6A ? 'bg-amber-400 shadow-sm shadow-amber-400' : 'bg-slate-800'}`} />
              </div>

              {/* Spínač 6B */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setSwitch6B(!switch6B)}
                  className={`w-14 h-24 rounded-2xl border-2 flex flex-col items-center justify-between p-2 shadow-lg transition-all ${
                    switch6B ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  <span className="text-[10px] font-bold">{switch6B ? 'POLOHA 1' : 'POLOHA 2'}</span>
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-amber-400">
                    6B
                  </div>
                  <span className="text-[9px] text-slate-500">Klikni</span>
                </button>
                <span className="text-xs text-slate-400">Nahoře na schodech</span>
              </div>

              {/* Žárovka */}
              <div className="flex flex-col items-center gap-2 pl-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                  bulb6On 
                    ? 'bg-amber-400/20 text-yellow-300 ring-8 ring-amber-400/20 shadow-xl shadow-yellow-400/40 scale-105' 
                    : 'bg-slate-900 text-slate-700 border border-slate-800'
                }`}>
                  <Lightbulb className={`w-8 h-8 ${bulb6On ? 'fill-yellow-400 text-yellow-300' : ''}`} />
                </div>
                <span className="text-xs text-slate-300 font-bold">
                  {bulb6On ? 'SVÍTÍ' : 'NESVÍTÍ'}
                </span>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 4. ŘAZENÍ 7 (KŘÍŽÁK: 6 - 7 - 6) */}
      {activeSchema === 'razeni7' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">Spínače 6 - 7 - 6</span>
            <h2 className="text-lg font-bold text-white">Křížové zapojení ze 3 a více míst</h2>
            <p className="text-xs text-slate-400 mt-1">
              Na začátku a na konci je spínač č. 6. Mezi nimi je křížový spínač č. 7 (má 4 svorky a kříží vodiče). Zkus kliknout na jakýkoliv ze 3 spínačů!
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-6">
            <div className="flex items-center justify-between w-full max-w-2xl gap-3">
              
              {/* Spínač 6A */}
              <div className="flex flex-col items-center gap-1.5">
                <button
                  onClick={() => setSwitch7A(!switch7A)}
                  className="w-12 h-20 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500 p-1.5 flex flex-col items-center justify-between transition-colors"
                >
                  <span className="text-[9px] text-amber-400 font-bold">6A</span>
                  <div className={`w-6 h-6 rounded-full ${switch7A ? 'bg-amber-500' : 'bg-slate-800'}`} />
                  <span className="text-[8px] text-slate-500">Místo 1</span>
                </button>
              </div>

              <div className="w-8 h-0.5 bg-slate-800" />

              {/* Křížový spínač 7B */}
              <div className="flex flex-col items-center gap-1.5">
                <button
                  onClick={() => setSwitch7B(!switch7B)}
                  className="w-14 h-20 rounded-xl bg-slate-900 border-2 border-amber-500/50 hover:border-amber-400 p-1.5 flex flex-col items-center justify-between transition-colors shadow-md shadow-amber-500/10"
                >
                  <span className="text-[9px] text-amber-400 font-extrabold">KŘÍŽÁK 7</span>
                  <div className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${switch7B ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                    ✕
                  </div>
                  <span className="text-[8px] text-slate-500">Místo 2</span>
                </button>
              </div>

              <div className="w-8 h-0.5 bg-slate-800" />

              {/* Spínač 6C */}
              <div className="flex flex-col items-center gap-1.5">
                <button
                  onClick={() => setSwitch7C(!switch7C)}
                  className="w-12 h-20 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500 p-1.5 flex flex-col items-center justify-between transition-colors"
                >
                  <span className="text-[9px] text-amber-400 font-bold">6C</span>
                  <div className={`w-6 h-6 rounded-full ${switch7C ? 'bg-amber-500' : 'bg-slate-800'}`} />
                  <span className="text-[8px] text-slate-500">Místo 3</span>
                </button>
              </div>

              {/* Svítidlo */}
              <div className="flex flex-col items-center gap-2 pl-3">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  bulb7On 
                    ? 'bg-amber-400/20 text-yellow-300 ring-6 ring-amber-400/20 shadow-xl shadow-yellow-400/40 scale-105' 
                    : 'bg-slate-900 text-slate-700 border border-slate-800'
                }`}>
                  <Lightbulb className={`w-7 h-7 ${bulb7On ? 'fill-yellow-400 text-yellow-300' : ''}`} />
                </div>
                <span className="text-xs text-slate-300 font-bold">
                  {bulb7On ? 'SVÍTÍ' : 'NESVÍTÍ'}
                </span>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 5. IMPULZNÍ (PAMĚŤOVÉ) RELÉ S PARALELNÍMI TLAČÍTKY */}
      {activeSchema === 'impulzni' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">Kritérium NSK 4b • Impulzní relé (KA) + tlačítka (SB)</span>
            <h2 className="text-lg font-bold text-white">Světelný obvod ovládaný z více míst impulzním relé</h2>
            <p className="text-xs text-slate-400 mt-1">
              Všechna tlačítka (zapuštěné ovladače č. 1/0 s pružinou) jsou zapojena <strong>PARALELNĚ</strong>. Každý stisk pošle krátký impulz na cívku relé <strong>A1–A2</strong>, které překlopí svůj silový kontakt <strong>1–2</strong>.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* 3 paralelní tlačítka */}
              <div className="space-y-2 text-center">
                <span className="text-xs font-bold text-slate-300 block">Paralelně zapojená tlačítka (1/0):</span>
                <div className="flex items-center gap-3">
                  {[1, 2, 3].map((btnNum) => {
                    const isPressed = activePushButton === btnNum;
                    return (
                      <button
                        key={btnNum}
                        onClick={() => handleTriggerImpulse(btnNum)}
                        className={`w-16 h-20 rounded-2xl border-2 flex flex-col items-center justify-between p-2 transition-all ${
                          isPressed
                            ? 'bg-amber-500 text-slate-950 border-amber-300 scale-95 shadow-lg shadow-amber-500/40'
                            : 'bg-slate-900 border-slate-700 hover:border-amber-500 text-slate-300'
                        }`}
                      >
                        <span className="text-[10px] font-mono font-bold">SB{btnNum}</span>
                        <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold ${
                          isPressed ? 'bg-slate-950 text-amber-400 border-slate-950' : 'bg-slate-800 text-amber-400 border-slate-600'
                        }`}>
                          ●
                        </div>
                        <span className="text-[9px]">Stiskni</span>
                      </button>
                    );
                  })}
                </div>
                <span className="text-[11px] text-slate-500 block font-mono">
                  Společný vodič z tlačítek → svorka A1
                </span>
              </div>

              {/* Modul impulzního relé v rozvaděči */}
              <div className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 min-w-[180px] ${
                activePushButton !== null
                  ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 border-slate-700'
              }`}>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">Rozvaděč • Relé KA1</span>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Impulzní relé</span>
                </div>
                <div className="w-full bg-slate-950 rounded-lg p-2 text-[11px] font-mono text-slate-300 space-y-1 border border-slate-800">
                  <div className="flex justify-between">
                    <span>Cívka A1–A2:</span>
                    <span className={activePushButton !== null ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                      {activePushButton !== null ? 'IMPULZ 230V!' : '0 V (klid)'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kontakt 1–2:</span>
                    <span className={impulseRelayOn ? 'text-emerald-400 font-bold' : 'text-red-400'}>
                      {impulseRelayOn ? 'SEPNUTO' : 'ROZEPNUTO'}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Počet stisků:</span>
                    <span>{pulseCount}×</span>
                  </div>
                </div>
              </div>

              {/* Svítidlo */}
              <div className="flex flex-col items-center gap-2">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  impulseRelayOn
                    ? 'bg-amber-400/20 text-yellow-300 ring-8 ring-amber-400/20 shadow-2xl shadow-yellow-400/50 scale-105'
                    : 'bg-slate-900 text-slate-700 border border-slate-800'
                }`}>
                  <Lightbulb className={`w-10 h-10 ${impulseRelayOn ? 'fill-yellow-400 text-yellow-300' : ''}`} />
                </div>
                <span className="text-xs text-slate-300 font-bold">
                  {impulseRelayOn ? 'SVÍTÍ' : 'NESVÍTÍ'}
                </span>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 6. PROUDOVÝ CHRÁNIČ (RCD) */}
      {activeSchema === 'rcd' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">Proudový chránič 30 mA</span>
            <h2 className="text-lg font-bold text-white">Princip součtového transformátoru a simulace úniku do PE</h2>
            <p className="text-xs text-slate-400 mt-1">
              Chránič porovnává proud tekoucí fází L a vracející se nulákem N. Zvyšuj posuvníkem únikový proud do ochranného vodiče PE a sleduj, kdy chránič vybaví!
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* Stav chrániče */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                  rcdTripped 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {rcdTripped ? '0' : 'I'}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 block">Stav proudového chrániče:</span>
                  <span className={`text-sm font-black ${rcdTripped ? 'text-red-400' : 'text-emerald-400'}`}>
                    {rcdTripped ? 'VYBAVENO (ROZPOJENO)' : 'ZAPNUTO (PŘIPRAVENO)'}
                  </span>
                </div>
              </div>

              {rcdTripped && (
                <button
                  onClick={resetRcd}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Nahodit páčku chrániče</span>
                </button>
              )}
            </div>

            {/* Simulátor reziduálního únikového proudu */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-semibold">Simulovaný únikový proud do země / PE:</span>
                <span className="font-mono text-base font-extrabold text-amber-400">{leakageMa} mA</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={leakageMa}
                onChange={(e) => handleLeakageChange(Number(e.target.value))}
                disabled={rcdTripped}
                className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0 mA (Normál)</span>
                <span>15 mA (Prahová mez 0,5 IΔn)</span>
                <span>30 mA (Jmenovitý IΔn)</span>
                <span>50 mA</span>
              </div>
            </div>

            {/* Posouzení chování */}
            <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
              rcdTripped
                ? 'bg-red-500/10 border-red-500/30 text-red-300'
                : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}>
              {rcdTripped ? (
                <div className="flex items-start gap-2.5">
                  <ShieldAlert className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
                  <div>
                    <strong className="block text-sm text-red-200">CHRÁNIČ SPOLEHLIVĚ VYBAVIL!</strong>
                    Unikající proud překročil vybavovací mez ({leakageMa} mA). V součtovém transformátoru vzniklo rozdílové magnetické pole, relé vyrazilo západku a odpojilo fázi i nulák v čase do 30 ms.
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                  <div>
                    <strong className="block text-sm text-emerald-200">Rovnováha proudů zachována</strong>
                    Proud tekoucí do spotřebiče fází L se vrací vodičem N. Unikající proud ({leakageMa} mA) je pod vypínací mezí chrániče.
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
