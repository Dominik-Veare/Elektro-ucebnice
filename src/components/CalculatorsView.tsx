import React, { useState } from 'react';
import { Calculator, CheckCircle2, AlertTriangle, Zap, Activity } from 'lucide-react';

// Tabulka proudové zatížitelnosti Iz [A] dle ČSN 33 2000-5-52 (při 30 °C)
const AMPACITY_TABLE: Record<
  'cu' | 'al',
  Record<'C' | 'B2' | 'A2', Record<string, { '1f': number; '3f': number }>>
> = {
  cu: {
    // C = přímo pod omítkou ve zdivu
    C: {
      '1.5': { '1f': 19.5, '3f': 17.5 },
      '2.5': { '1f': 27, '3f': 24 },
      '4': { '1f': 36, '3f': 32 },
      '6': { '1f': 46, '3f': 41 },
      '10': { '1f': 63, '3f': 57 },
      '16': { '1f': 85, '3f': 76 },
      '25': { '1f': 112, '3f': 96 },
    },
    // B2 = v trubce nebo liště na stěně / ve zdivu
    B2: {
      '1.5': { '1f': 16.5, '3f': 15 },
      '2.5': { '1f': 23, '3f': 20 },
      '4': { '1f': 30, '3f': 27 },
      '6': { '1f': 38, '3f': 34 },
      '10': { '1f': 52, '3f': 46 },
      '16': { '1f': 69, '3f': 62 },
      '25': { '1f': 90, '3f': 80 },
    },
    // A2 = kabel v tepelně izolované stěně (dřevostavba / SDK s vatou)
    A2: {
      '1.5': { '1f': 14, '3f': 13 },
      '2.5': { '1f': 18.5, '3f': 17.5 },
      '4': { '1f': 25, '3f': 23 },
      '6': { '1f': 32, '3f': 29 },
      '10': { '1f': 43, '3f': 39 },
      '16': { '1f': 57, '3f': 52 },
      '25': { '1f': 75, '3f': 68 },
    },
  },
  al: {
    C: {
      '1.5': { '1f': 0, '3f': 0 }, // Al pod 2,5 / 4 mm² se v pevných rozvodech nepoužívá
      '2.5': { '1f': 21, '3f': 18.5 },
      '4': { '1f': 28, '3f': 25 },
      '6': { '1f': 36, '3f': 32 },
      '10': { '1f': 49, '3f': 44 },
      '16': { '1f': 66, '3f': 59 },
      '25': { '1f': 83, '3f': 73 },
    },
    B2: {
      '1.5': { '1f': 0, '3f': 0 },
      '2.5': { '1f': 17.5, '3f': 15.5 },
      '4': { '1f': 24, '3f': 21 },
      '6': { '1f': 30, '3f': 27 },
      '10': { '1f': 41, '3f': 36 },
      '16': { '1f': 54, '3f': 48 },
      '25': { '1f': 71, '3f': 62 },
    },
    A2: {
      '1.5': { '1f': 0, '3f': 0 },
      '2.5': { '1f': 14.5, '3f': 13.5 },
      '4': { '1f': 19.5, '3f': 17.5 },
      '6': { '1f': 25, '3f': 23 },
      '10': { '1f': 34, '3f': 30 },
      '16': { '1f': 45, '3f': 40 },
      '25': { '1f': 59, '3f': 53 },
    },
  },
};

export const CalculatorsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dimenzovani' | 'impedance' | 'ohm'>('dimenzovani');

  // --- 1. Stavy pro kalkulačku dimenzování ---
  const [systemType, setSystemType] = useState<'1f' | '3f'>('1f');
  const [material, setMaterial] = useState<'cu' | 'al'>('cu');
  const [installMethod, setInstallMethod] = useState<'C' | 'B2' | 'A2'>('C');
  const [powerKw, setPowerKw] = useState<string>('3.5');
  const [lengthM, setLengthM] = useState<string>('25');
  const [cosPhi, setCosPhi] = useState<string>('1.0');
  const [crossSection, setCrossSection] = useState<string>('2.5');
  const [circuitType, setCircuitType] = useState<'zasuvky' | 'svetla'>('zasuvky');

  // --- 2. Stavy pro impedanci smyčky ---
  const [charType, setCharType] = useState<'B' | 'C' | 'D'>('B');
  const [breakerRating, setBreakerRating] = useState<number>(16);
  const [measuredZs, setMeasuredZs] = useState<string>('1.45');

  // --- 3. Stavy pro Ohmův zákon ---
  const [ohmU, setOhmU] = useState<string>('230');
  const [ohmR, setOhmR] = useState<string>('23');

  // Výpočty dimenzování
  const P = parseFloat(powerKw) * 1000 || 0;
  const L = parseFloat(lengthM) || 0;
  const cos = parseFloat(cosPhi) || 1.0;
  const S = parseFloat(crossSection) || 1.5;
  const gamma = material === 'cu' ? 56 : 35; // měrná vodivost

  let currentA = 0;
  let deltaU = 0;
  let deltaUPct = 0;

  if (systemType === '1f') {
    currentA = P > 0 ? P / (230 * cos) : 0;
    deltaU = S > 0 ? (2 * L * currentA * cos) / (gamma * S) : 0;
    deltaUPct = (deltaU / 230) * 100;
  } else {
    currentA = P > 0 ? P / (Math.sqrt(3) * 400 * cos) : 0;
    deltaU = S > 0 ? (Math.sqrt(3) * L * currentA * cos) / (gamma * S) : 0;
    deltaUPct = (deltaU / 400) * 100;
  }

  // Doporučený jistič In >= IB
  const standardBreakers = [6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100];
  const recommendedBreaker = standardBreakers.find(b => b >= currentA) || 100;

  // Proudová zatížitelnost Iz pro zvolený průřez a uložení
  const cableIz = AMPACITY_TABLE[material]?.[installMethod]?.[crossSection]?.[systemType] ?? 0;

  const maxAllowedPct = circuitType === 'svetla' ? 2.0 : 3.0;
  const isDropOk = deltaUPct <= maxAllowedPct;
  const isAmpacityOk = cableIz > 0 && currentA <= recommendedBreaker && recommendedBreaker <= cableIz;
  const isAllOk = isDropOk && isAmpacityOk;

  // Výpočty impedance smyčky
  const multiplier = charType === 'B' ? 5 : charType === 'C' ? 10 : 20;
  const Ia = breakerRating * multiplier;
  const theoreticalZsMax = 230 / Ia;
  const allowedColdZsMax = theoreticalZsMax / 1.5; // koeficient oteplení 1,5
  const userZs = parseFloat(measuredZs) || 0;
  const isZsOk = userZs <= allowedColdZsMax;

  // Výpočty Ohmova zákona
  const uVal = parseFloat(ohmU) || 0;
  const rVal = parseFloat(ohmR) || 0;
  const ohmI = rVal > 0 ? uVal / rVal : 0;
  const ohmP = uVal * ohmI;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-16">
      
      {/* Hlavička */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Calculator className="w-5 h-5" />
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white leading-snug">Elektrotechnické kalkulačky</h1>
        </div>
        <p className="text-xs text-slate-400 text-pretty leading-relaxed">
          Oficiální výpočty zkoušejícího: Dimenzování (IB ≤ In ≤ Iz) a úbytek napětí dle ČSN 33 2000-5-52 a kontrola impedance smyčky Zs.
        </p>

        {/* Přepínač záložek */}
        <div className="flex flex-wrap gap-2 mt-5">
          <button
            onClick={() => setActiveTab('dimenzovani')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'dimenzovani'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <span className="sm:hidden">Dimenzování & ΔU</span>
            <span className="hidden sm:inline">Dimenzování (IB ≤ In ≤ Iz) & úbytek ΔU</span>
          </button>
          <button
            onClick={() => setActiveTab('impedance')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'impedance'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <span className="sm:hidden">Impedance Zs</span>
            <span className="hidden sm:inline">Impedance smyčky Zs (ČSN 33 2000-4-41)</span>
          </button>
          <button
            onClick={() => setActiveTab('ohm')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'ohm'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            Ohmův zákon & výkon
          </button>
        </div>
      </div>

      {/* 1. KALKULAČKA DIMENZOVÁNÍ A ÚBYTKU */}
      {activeTab === 'dimenzovani' && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Vstupní formulář */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Parametry instalovaného obvodu</span>
            </h3>

            {/* Soustava 1f vs 3f */}
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">Elektrická soustava:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSystemType('1f')}
                  className={`py-2 rounded-lg text-xs font-bold border transition-colors ${
                    systemType === '1f' ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  1 fáze (230 V)
                </button>
                <button
                  type="button"
                  onClick={() => setSystemType('3f')}
                  className={`py-2 rounded-lg text-xs font-bold border transition-colors ${
                    systemType === '3f' ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  3 fáze (400 V)
                </button>
              </div>
            </div>

            {/* Příkon v kW */}
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                Příkon spotřebiče P (kW):
              </label>
              <input
                type="number"
                step="0.1"
                value={powerKw}
                onChange={(e) => setPowerKw(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Délka vedení v metrech a účiník */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  Délka trasy L (m):
                </label>
                <input
                  type="number"
                  value={lengthM}
                  onChange={(e) => setLengthM(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  Účiník cos φ:
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="0.5"
                  max="1.0"
                  value={cosPhi}
                  onChange={(e) => setCosPhi(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Materiál vodiče a typ obvodu */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Materiál vodiče:</label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value as 'cu' | 'al')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="cu">Měď (Cu, γ=56)</option>
                  <option value="al">Hliník (Al, γ=35)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Typ obvodu (limit ΔU):</label>
                <select
                  value={circuitType}
                  onChange={(e) => setCircuitType(e.target.value as 'zasuvky' | 'svetla')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="zasuvky">Zásuvky / jiný (max 3 %)</option>
                  <option value="svetla">Světla (max 2 %)</option>
                </select>
              </div>
            </div>

            {/* Způsob uložení a Průřez kabelu */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  Způsob uložení (ČSN 5-52):
                </label>
                <select
                  value={installMethod}
                  onChange={(e) => setInstallMethod(e.target.value as 'C' | 'B2' | 'A2')}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="C">C – Přímo pod omítkou ve zdivu</option>
                  <option value="B2">B2 – V trubce / liště na zdi</option>
                  <option value="A2">A2 – V tepelně izol. stěně (vata)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  Zvolený průřez S (mm²):
                </label>
                <select
                  value={crossSection}
                  onChange={(e) => setCrossSection(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-500"
                >
                  <option value="1.5">1,5 mm²</option>
                  <option value="2.5">2,5 mm²</option>
                  <option value="4">4,0 mm²</option>
                  <option value="6">6,0 mm²</option>
                  <option value="10">10,0 mm²</option>
                  <option value="16">16,0 mm²</option>
                  <option value="25">25,0 mm²</option>
                </select>
              </div>
            </div>
          </div>

          {/* Výsledky a posouzení */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl space-y-5">
            <div>
              <h3 className="text-base font-bold text-white mb-4">
                Výsledné posouzení dle ČSN 33 2000-5-52 a ČSN 33 2130
              </h3>

              <div className="space-y-2.5">
                <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-slate-400">1. Návrhový proud zátěže (IB):</span>
                  <span className="font-mono text-sm font-bold text-slate-100">{currentA.toFixed(2)} A</span>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-slate-400">2. Nejbližší jistič (In ≥ IB):</span>
                  <span className="font-mono text-sm font-bold text-amber-400">{recommendedBreaker} A</span>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-slate-400">3. Zatížitelnost kabelu Iz ({installMethod}, 30 °C):</span>
                  <span className={`font-mono text-sm font-bold ${isAmpacityOk ? 'text-emerald-400' : 'text-red-400'}`}>
                    {cableIz > 0 ? `${cableIz} A` : 'Nepovolený Al průřez'}
                  </span>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-slate-400">Podmínka jištění (IB ≤ In ≤ Iz):</span>
                  <span className={`font-mono text-xs font-bold ${isAmpacityOk ? 'text-emerald-400' : 'text-red-400'}`}>
                    {currentA.toFixed(1)} A ≤ {recommendedBreaker} A {isAmpacityOk ? '≤' : '>'} {cableIz} A
                  </span>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-slate-400">4. Úbytek napětí ΔU (limit {maxAllowedPct} %):</span>
                  <span className={`font-mono text-sm font-bold ${isDropOk ? 'text-emerald-400' : 'text-red-400'}`}>
                    {deltaU.toFixed(2)} V ({deltaUPct.toFixed(2)} %)
                  </span>
                </div>
              </div>
            </div>

            {/* Verdikt vyhovuje / nevyhovuje */}
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              isAllOk
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/10 border-red-500/30 text-red-300'
            }`}>
              {isAllOk ? (
                <>
                  <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-400 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <strong className="block text-sm">NÁVRH PLNĚ VYHOVUJE NORMĚ</strong>
                    <span>
                      Je splněna podmínka proudové zatížitelnosti ({recommendedBreaker} A ≤ {cableIz} A) i dovoleného úbytku napětí ({deltaUPct.toFixed(2)} % ≤ {maxAllowedPct} %).
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-6 h-6 shrink-0 text-red-400 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <strong className="block text-sm">NÁVRH NEVYHOVUJE! ZVOLTE VĚTŠÍ PRŮŘEZ!</strong>
                    {!isAmpacityOk && (
                      <p>
                        • <strong>Přetížení vodiče:</strong> Jistič {recommendedBreaker} A překračuje dovolenou proudovou zatížitelnost zvoleného kabelu (Iz = {cableIz} A). Porušena podmínka In ≤ Iz!
                      </p>
                    )}
                    {!isDropOk && (
                      <p>
                        • <strong>Velký úbytek napětí:</strong> Úbytek {deltaUPct.toFixed(2)} % překračuje normový limit {maxAllowedPct} %.
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 2. KALKULAČKA IMPEDANCE SMYČKY */}
      {activeTab === 'impedance' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Parametry jističe a měření</span>
            </h3>

            {/* Charakteristika jističe */}
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                Vypínací charakteristika jističe:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['B', 'C', 'D'] as const).map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCharType(c)}
                    className={`py-2 rounded-lg text-xs font-bold border transition-colors ${
                      charType === c ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    Char. {c} ({c === 'B' ? '5×' : c === 'C' ? '10×' : '20×'} In)
                  </button>
                ))}
              </div>
            </div>

            {/* Jmenovitý proud jističe */}
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                Jmenovitý proud jističe In (A):
              </label>
              <select
                value={breakerRating}
                onChange={(e) => setBreakerRating(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              >
                {[6, 10, 13, 16, 20, 25, 32, 40, 50, 63].map(v => (
                  <option key={v} value={v}>{v} A</option>
                ))}
              </select>
            </div>

            {/* Naměřená impedance Zs */}
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                Naměřená hodnota impedance smyčky Zs (Ω):
              </label>
              <input
                type="number"
                step="0.01"
                value={measuredZs}
                onChange={(e) => setMeasuredZs(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-amber-400 font-bold focus:outline-none focus:border-amber-500"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Zadej hodnotu naměřenou revizním přístrojem (např. Eurotestem).
              </span>
            </div>
          </div>

          {/* Posouzení impedance */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl space-y-6">
            <div>
              <h3 className="text-base font-bold text-white mb-4">
                Ověření samočinného odpojení od zdroje (ČSN 33 2000-4-41)
              </h3>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400">Vypínací zkratový proud Ia:</span>
                  <span className="font-mono text-sm font-bold text-slate-100">{Ia} A</span>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400">Teoretické maximum Zs,max (230 / Ia):</span>
                  <span className="font-mono text-sm font-bold text-slate-100">{theoreticalZsMax.toFixed(3)} Ω</span>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400">Dovolená hodnota za studena (s koef. 1,5):</span>
                  <span className="font-mono text-sm font-bold text-amber-400">{allowedColdZsMax.toFixed(3)} Ω</span>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-slate-400">Tvá naměřená hodnota:</span>
                  <span className="font-mono text-sm font-bold text-slate-100">{userZs.toFixed(3)} Ω</span>
                </div>
              </div>
            </div>

            {/* Verdikt */}
            <div className={`p-4 rounded-xl border flex items-center gap-3 ${
              isZsOk
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/10 border-red-500/30 text-red-300'
            }`}>
              {isZsOk ? (
                <>
                  <CheckCircle2 className="w-6 h-6 shrink-0 text-emerald-400" />
                  <div className="text-xs">
                    <strong className="block text-sm">PODMÍNKA SPLNĚNA (VYHOVUJE)</strong>
                    Při zkratu dojde k okamžitému elektromagnetickému vypnutí jističe v čase do 0,4 s.
                  </div>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-6 h-6 shrink-0 text-red-400" />
                  <div className="text-xs">
                    <strong className="block text-sm">NEVYHOVUJE!</strong>
                    Impedance smyčky je příliš velká ({userZs.toFixed(3)} Ω &gt; {allowedColdZsMax.toFixed(3)} Ω). Jistič by při zkratu nemusel spolehlivě vypnout v čase 0,4 s!
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 3. OHMŮV ZÁKON & VÝKON */}
      {activeTab === 'ohm' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-xl mx-auto space-y-5">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Ohmův zákon: Napětí, odpor, proud a výkon</span>
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Napětí U (V):</label>
              <input
                type="number"
                value={ohmU}
                onChange={(e) => setOhmU(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Odpor R (Ω):</label>
              <input
                type="number"
                value={ohmR}
                onChange={(e) => setOhmR(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Elektrický proud I = U / R:</span>
              <span className="font-mono text-base font-extrabold text-amber-400">{ohmI.toFixed(2)} A</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Elektrický výkon P = U · I:</span>
              <span className="font-mono text-base font-extrabold text-emerald-400">{ohmP.toFixed(1)} W ({(ohmP / 1000).toFixed(2)} kW)</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
