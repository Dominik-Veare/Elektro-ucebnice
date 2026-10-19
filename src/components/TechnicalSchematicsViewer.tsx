import React, { useState } from 'react';
import {
  FileText,
  AlertTriangle,
  Search,
  X,
} from 'lucide-react';
import {
  STANDARD_SYMBOLS,
  SYMBOL_CATEGORIES,
} from '../data/standardSymbols';

interface TechnicalSchematicsViewerProps {
  initialTab?: 'symbols' | 'single-line' | 'wiring';
}

type MainTab = 'symbols' | 'single-line' | 'wiring';
type WiringCircuit = 'sw1' | 'sw5' | 'sw6' | 'sw7' | 'socket' | 'rcd';

export const TechnicalSchematicsViewer: React.FC<TechnicalSchematicsViewerProps> = ({
  initialTab = 'symbols',
}) => {
  const [activeTab, setActiveTab] = useState<MainTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [standardCategory, setStandardCategory] = useState<string>('all');
  const [activeCircuit, setActiveCircuit] = useState<WiringCircuit>('sw1');
  const [inspectedElement, setInspectedElement] = useState<{
    title: string;
    code?: string;
    category?: string;
    image?: string;
    description: string;
    norm: string;
    wiringDiagram?: string;
    examTip?: string;
  } | null>(null);

  // Filtrování normovaných značek
  const filteredStandardSymbols = STANDARD_SYMBOLS.filter((sym) => {
    const matchesCategory =
      standardCategory === 'all' || sym.category === standardCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      sym.name.toLowerCase().includes(query) ||
      sym.category.toLowerCase().includes(query) ||
      sym.description.toLowerCase().includes(query) ||
      sym.norm.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl my-6">
      {/* Horní hlavička s přepínačem záložek */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
              Technická dokumentace ke státní zkoušce
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              Oficiální technické značky a schémata rozvaděčů
            </h3>
          </div>
        </div>

        {/* Přepínač hlavních záložek */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('symbols')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'symbols'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Atlas značek ČSN EN 60617
          </button>
          <button
            onClick={() => setActiveTab('single-line')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'single-line'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Jednopólové schéma rozvaděče
          </button>
          <button
            onClick={() => setActiveTab('wiring')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'wiring'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Schémata zapojení vypínačů 1, 5, 6, 7
          </button>
        </div>
      </div>

      {/* ZÁLOŽKA 1: ATLAS ZNAČEK (dle ČSN EN 60617) */}
      {activeTab === 'symbols' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-mono font-bold mr-2">
                ČSN EN 60617 • Zkouška 26-017-H
              </span>
              <span className="text-xs text-slate-400">
                Zobrazeno {filteredStandardSymbols.length} z {STANDARD_SYMBOLS.length} značek vyžadovaných u zkoušky
              </span>
            </div>
          </div>

          {/* Vyhledávací pole a filtry kategorií */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Hledat značku (např. spínač č. 6, jistič, chránič, zásuvka, stykač, uzemnění)..."
                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Filtry kategorií */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {SYMBOL_CATEGORIES.map((cat) => {
              const count =
                cat === 'all'
                  ? STANDARD_SYMBOLS.length
                  : STANDARD_SYMBOLS.filter((s) => s.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setStandardCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                    standardCategory === cat
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'Všechny značky' : cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Mřížka normovaných značek */}
          {filteredStandardSymbols.length === 0 ? (
            <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 text-slate-400 text-xs">
              Pro zadané hledání nebyla nalezena žádná značka. Zkuste vymazat filtr nebo hledat jiné slovo.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredStandardSymbols.map((sym) => (
                <div
                  key={sym.id}
                  onClick={() =>
                    setInspectedElement({
                      title: sym.name,
                      category: sym.category,
                      image: sym.image,
                      description: sym.description,
                      norm: sym.norm,
                      wiringDiagram: sym.wiringDiagram,
                      examTip: sym.examTip,
                    })
                  }
                  className="bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/80 rounded-xl p-3 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.02] shadow-sm group"
                >
                  <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-center h-20 shadow-sm overflow-hidden mb-2 group-hover:shadow-md transition-shadow">
                    <img
                      src={sym.image}
                      alt={sym.alt}
                      className="max-h-14 max-w-full object-contain group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 block truncate">
                      {sym.category}
                    </span>
                    <h5 className="text-xs font-bold text-slate-200 group-hover:text-amber-400 line-clamp-2 leading-tight">
                      {sym.name}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ZÁLOŽKA 2: JEDNOPÓLOVÉ SCHÉMA BYTOVÉHO ROZVADĚČE (ČSN EN 61439-3) */}
      {activeTab === 'single-line' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              💡 <strong>Jednopólové schéma rozvaděče (ČSN EN 61439-3):</strong> Vedení je kresleno jednou čarou, šikmé čárky <code>/3</code> a <code>/5</code> udávají počet žil kabelu. Kliknutím na libovolný přístroj zobrazíte jeho parametry.
            </span>
            <span className="font-mono text-amber-400 font-bold hidden sm:inline">Rozvaděč RB-1 (3×400/230 V, TN-C-S)</span>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 sm:p-6 overflow-x-auto shadow-inner">
            <svg
              viewBox="0 0 920 460"
              className="w-full min-w-[760px] h-auto select-none font-sans text-xs"
            >
              {/* Přívodní vedení z elektroměrového rozvaděče */}
              <text x="30" y="30" className="fill-amber-400 font-mono font-bold text-sm">
                PŘÍVOD: CYKY-J 5×6 mm² (/5) • Jištění před elektroměrem B25/3 • Síť TN-C-S (3×400/230 V, 50 Hz)
              </text>

              {/* Přívodní vertikální linie */}
              <line x1="80" y1="45" x2="80" y2="100" className="stroke-amber-400 stroke-[3]" />
              <line x1="72" y1="65" x2="88" y2="55" className="stroke-amber-400 stroke-[2]" />
              <text x="92" y="63" className="fill-amber-400 font-mono font-bold text-[11px]">/5</text>

              {/* Hlavní vypínač QM1 */}
              <rect
                x="60"
                y="100"
                width="40"
                height="45"
                rx="4"
                className="fill-slate-900 stroke-amber-400 stroke-[2] cursor-pointer hover:stroke-yellow-300"
                onClick={() =>
                  setInspectedElement({
                    title: 'QM1 - Hlavní vypínač rozvaděče (3P 32 A)',
                    code: 'QM1 dle ČSN EN 81346-2',
                    image: '/symbols/126.png',
                    description: 'Slouží k bezpečnému odpojení celé bytové rozvodnice jedním hmatem v případě havárie nebo údržby.',
                    norm: 'ČSN EN 61439-3, ČSN 33 2130 ed. 4',
                    wiringDiagram: 'Přívod z elektroměru na svorky 1, 3, 5; odvod do rozvaděče ze svorek 2, 4, 6',
                    examTip: 'Každý domovní rozvaděč musí mít hlavní vypínač! U zkoušky nezapomeňte, že vypínač nesmí nahrazovat proudový chránič.',
                  })
                }
              />
              <text x="80" y="126" textAnchor="middle" className="fill-white font-mono font-bold text-xs pointer-events-none">
                QM1
              </text>
              <text x="110" y="120" className="fill-slate-300 font-mono text-[11px]">32 A / 3P</text>
              <text x="110" y="134" className="fill-slate-500 text-[10px]">Hlavní vypínač</text>

              {/* Linie za hlavním vypínačem */}
              <line x1="80" y1="145" x2="80" y2="180" className="stroke-amber-400 stroke-[3]" />

              {/* Přepěťová ochrana SPD (FS1) */}
              <line x1="80" y1="180" x2="160" y2="180" className="stroke-amber-400 stroke-[2]" />
              <line x1="160" y1="180" x2="160" y2="200" className="stroke-amber-400 stroke-[2]" />
              <rect
                x="140"
                y="200"
                width="40"
                height="45"
                rx="4"
                className="fill-slate-900 stroke-amber-400 stroke-[2] cursor-pointer hover:stroke-yellow-300"
                onClick={() =>
                  setInspectedElement({
                    title: 'FS1 - Svodič přepětí SPD Typ 1+2 (T1+T2 / B+C)',
                    code: 'FS1 dle ČSN EN 81346-2',
                    image: '/symbols/113.png',
                    description: 'Chrání elektroinstalaci a spotřebiče před atmosférickým i spínacím přepětím v síti.',
                    norm: 'ČSN 33 2000-5-534 ed. 2, ČSN EN 61643-11',
                    wiringDiagram: 'Paralelně mezi L1, L2, L3 a zemnící svorkovnici PE',
                    examTip: 'Délka přívodních vodičů k SPD nesmí přesáhnout 0,5 m! Připojuje se na zemnící svorkovnici PE / MET.',
                  })
                }
              />
              <text x="160" y="226" textAnchor="middle" className="fill-white font-mono font-bold text-xs pointer-events-none">
                SPD
              </text>
              <line x1="160" y1="245" x2="160" y2="270" className="stroke-emerald-400 stroke-[2]" />
              <text x="160" y="285" textAnchor="middle" className="fill-emerald-400 font-mono text-[10px] font-bold">PE</text>

              {/* Hlavní napájecí hřebenová sběrnice L1, L2, L3 */}
              <line x1="80" y1="180" x2="80" y2="220" className="stroke-amber-400 stroke-[3]" />
              <line x1="80" y1="220" x2="840" y2="220" className="stroke-amber-400 stroke-[3]" />

              {/* QF1: Proudový chránič 4P 40A / 30mA */}
              <line x1="330" y1="220" x2="330" y2="250" className="stroke-amber-400 stroke-[2]" />
              <rect
                x="305"
                y="250"
                width="50"
                height="50"
                rx="4"
                className="fill-slate-900 stroke-amber-400 stroke-[2] cursor-pointer hover:stroke-yellow-300"
                onClick={() =>
                  setInspectedElement({
                    title: 'QF1 - Proudový chránič RCD (4P 40 A / 30 mA, Typ A)',
                    code: 'QF1 dle ČSN EN 81346-2',
                    image: '/symbols/112.png',
                    description: 'Doplňková ochrana automatickým odpojením od zdroje při reziduálním proudu nad 30 mA.',
                    norm: 'ČSN 33 2000-4-41 ed. 3, ČSN EN 61008-1',
                    wiringDiagram: 'Přívod L1, L2, L3 a N na vstupní svorky, výstup do chráněné části rozvaděče',
                    examTip: 'Testovací tlačítko T se má zkoušet pravidelně! Pro laické zásuvky do 32 A je chránič 30 mA povinný.',
                  })
                }
              />
              <text x="330" y="275" textAnchor="middle" className="fill-amber-400 font-mono font-bold text-xs pointer-events-none">
                RCD 4P
              </text>
              <text x="330" y="290" textAnchor="middle" className="fill-slate-400 font-mono text-[9px] pointer-events-none">
                40A / 30mA
              </text>

              {/* Podružná sběrnice za chráničem QF1 */}
              <line x1="330" y1="300" x2="330" y2="330" className="stroke-amber-400 stroke-[2]" />
              <line x1="200" y1="330" x2="590" y2="330" className="stroke-amber-400 stroke-[2]" />

              {/* FA1: Světla obývák */}
              <g className="cursor-pointer group" onClick={() => setInspectedElement({
                title: 'FA1 - Jistič B10/1 (Světelné obvody)',
                code: 'FA1',
                image: '/symbols/105.png',
                description: 'Jednopólový jistič vedení pro světelné obvody. Vypínací charakteristika B, jmenovitý proud 10 A.',
                norm: 'ČSN EN 60898-1, ČSN 33 2130 ed. 4',
                wiringDiagram: 'Kabel CYKY-J 3×1,5 jištěný jističem B10/1',
                examTip: 'Dle ČSN 33 2130 ed. 4 musí mít světelné obvody samostatný chránič 30 mA a nesmí být použit typ AC!',
              })}>
                <line x1="200" y1="330" x2="200" y2="350" className="stroke-amber-400 stroke-[2]" />
                <rect x="185" y="350" width="30" height="35" rx="3" className="fill-slate-900 stroke-amber-400 stroke-[1.5] group-hover:stroke-yellow-300" />
                <text x="200" y="372" textAnchor="middle" className="fill-white font-mono text-xs font-bold">FA1</text>
                <line x1="200" y1="385" x2="200" y2="410" className="stroke-amber-400 stroke-[2]" />
                <line x1="194" y1="398" x2="206" y2="392" className="stroke-amber-400 stroke-[1.5]" />
                <text x="210" y="398" className="fill-amber-400 font-mono text-[10px]">/3</text>
                <text x="200" y="430" textAnchor="middle" className="fill-slate-300 font-mono text-[11px] font-bold">B10/1</text>
                <text x="200" y="445" textAnchor="middle" className="fill-slate-400 text-[10px]">Světla pokoje</text>
              </g>

              {/* FA2: Zásuvky pokoje */}
              <g className="cursor-pointer group" onClick={() => setInspectedElement({
                title: 'FA2 - Jistič B16/1 (Zásuvkové obvody)',
                code: 'FA2',
                image: '/symbols/105.png',
                description: 'Jednopólový jistič vedení pro běžné zásuvkové obvody 230 V. Jmenovitý proud 16 A, char. B.',
                norm: 'ČSN EN 60898-1, ČSN 33 2130 ed. 4',
                wiringDiagram: 'Kabel CYKY-J 3×2,5 jištěný jističem B16/1',
                examTip: 'Na jeden zásuvkový obvod lze zapojit nejvýše 10 zásuvek! Vícenásobné rámečky se počítají po kusech.',
              })}>
                <line x1="330" y1="330" x2="330" y2="350" className="stroke-amber-400 stroke-[2]" />
                <rect x="315" y="350" width="30" height="35" rx="3" className="fill-slate-900 stroke-amber-400 stroke-[1.5] group-hover:stroke-yellow-300" />
                <text x="330" y="372" textAnchor="middle" className="fill-white font-mono text-xs font-bold">FA2</text>
                <line x1="330" y1="385" x2="330" y2="410" className="stroke-amber-400 stroke-[2]" />
                <line x1="324" y1="398" x2="336" y2="392" className="stroke-amber-400 stroke-[1.5]" />
                <text x="340" y="398" className="fill-amber-400 font-mono text-[10px]">/3</text>
                <text x="330" y="430" textAnchor="middle" className="fill-slate-300 font-mono text-[11px] font-bold">B16/1</text>
                <text x="330" y="445" textAnchor="middle" className="fill-slate-400 text-[10px]">Zásuvky pokoje</text>
              </g>

              {/* FA3: Kuchyň linka */}
              <g className="cursor-pointer group" onClick={() => setInspectedElement({
                title: 'FA3 - Jistič B16/1 (Kuchyňská linka)',
                code: 'FA3',
                image: '/symbols/105.png',
                description: 'Samostatný zásuvkový obvod pro spotřebiče na kuchyňské pracovní ploše.',
                norm: 'ČSN 33 2130 ed. 4',
                wiringDiagram: 'Kabel CYKY-J 3×2,5 jištěný jističem B16/1',
                examTip: 'Kuchyňské zásuvky na lince se doporučuje rozdělit na minimálně dva samostatné obvody (např. varná konvice + kávovar).',
              })}>
                <line x1="460" y1="330" x2="460" y2="350" className="stroke-amber-400 stroke-[2]" />
                <rect x="445" y="350" width="30" height="35" rx="3" className="fill-slate-900 stroke-amber-400 stroke-[1.5] group-hover:stroke-yellow-300" />
                <text x="460" y="372" textAnchor="middle" className="fill-white font-mono text-xs font-bold">FA3</text>
                <line x1="460" y1="385" x2="460" y2="410" className="stroke-amber-400 stroke-[2]" />
                <line x1="454" y1="398" x2="466" y2="392" className="stroke-amber-400 stroke-[1.5]" />
                <text x="470" y="398" className="fill-amber-400 font-mono text-[10px]">/3</text>
                <text x="460" y="430" textAnchor="middle" className="fill-slate-300 font-mono text-[11px] font-bold">B16/1</text>
                <text x="460" y="445" textAnchor="middle" className="fill-slate-400 text-[10px]">Kuchyň linka</text>
              </g>

              {/* FA4: Pračka */}
              <g className="cursor-pointer group" onClick={() => setInspectedElement({
                title: 'FA4 - Jistič B16/1 (Samostatný vývod pračka)',
                code: 'FA4',
                image: '/symbols/105.png',
                description: 'Samostatný obvod pro automatickou pračku / sušičku s příkonem nad 2 kW.',
                norm: 'ČSN 33 2130 ed. 4',
                wiringDiagram: 'Kabel CYKY-J 3×2,5 jištěný jističem B16/1',
                examTip: 'Pro spotřebiče s příkonem 2 kW a více se v bytech zřizují samostatně jištěné obvody!',
              })}>
                <line x1="590" y1="330" x2="590" y2="350" className="stroke-amber-400 stroke-[2]" />
                <rect x="575" y="350" width="30" height="35" rx="3" className="fill-slate-900 stroke-amber-400 stroke-[1.5] group-hover:stroke-yellow-300" />
                <text x="590" y="372" textAnchor="middle" className="fill-white font-mono text-xs font-bold">FA4</text>
                <line x1="590" y1="385" x2="590" y2="410" className="stroke-amber-400 stroke-[2]" />
                <line x1="584" y1="398" x2="596" y2="392" className="stroke-amber-400 stroke-[1.5]" />
                <text x="600" y="398" className="fill-amber-400 font-mono text-[10px]">/3</text>
                <text x="590" y="430" textAnchor="middle" className="fill-slate-300 font-mono text-[11px] font-bold">B16/1</text>
                <text x="590" y="445" textAnchor="middle" className="fill-slate-400 text-[10px]">Pračka (2 kW)</text>
              </g>

              {/* FA5: Varná deska 400V */}
              <g className="cursor-pointer group" onClick={() => setInspectedElement({
                title: 'FA5 - Jistič 3P B16/3 (Varná deska / Sporák 400 V)',
                code: 'FA5',
                image: '/symbols/107.png',
                description: 'Třípólový jistič pro indukční varnou desku nebo elektrický sporák.',
                norm: 'ČSN EN 60898-1, ČSN 33 2130 ed. 4',
                wiringDiagram: 'Kabel CYKY-J 5×2,5 jištěný třípólovým jističem B16/3',
                examTip: 'Při poruše v jedné fázi musí třípólový jistič odpojit všechny 3 fáze současně mechanickým spřažením.',
              })}>
                <line x1="720" y1="220" x2="720" y2="350" className="stroke-amber-400 stroke-[2]" />
                <rect x="702" y="350" width="36" height="35" rx="3" className="fill-slate-900 stroke-rose-400 stroke-[2] group-hover:stroke-yellow-300" />
                <text x="720" y="372" textAnchor="middle" className="fill-white font-mono text-xs font-bold">FA5</text>
                <line x1="720" y1="385" x2="720" y2="410" className="stroke-rose-400 stroke-[2]" />
                <line x1="712" y1="398" x2="728" y2="390" className="stroke-rose-400 stroke-[2]" />
                <text x="732" y="398" className="fill-rose-400 font-mono text-[10px] font-bold">/5</text>
                <text x="720" y="430" textAnchor="middle" className="fill-slate-300 font-mono text-[11px] font-bold">B16/3</text>
                <text x="720" y="445" textAnchor="middle" className="fill-slate-400 text-[10px]">Varná deska 400V</text>
              </g>

              {/* QF2: RCBO Koupelna */}
              <g className="cursor-pointer group" onClick={() => setInspectedElement({
                title: 'QF2 - Jističochránič RCBO B16/1N/0,03 A (Koupelna)',
                code: 'QF2',
                image: '/symbols/rcbo.png',
                description: 'Kombinovaný přístroj (proudový chránič + jistič v jednom modulu).',
                norm: 'ČSN EN 61009-1, ČSN 33 2000-7-701 ed. 2',
                wiringDiagram: 'Fáze a N z přívodu, výstup přímo ke spotřebičům v koupelně',
                examTip: 'Porucha v koupelně neshodí zbytek domu – RCBO odpojí pouze svůj vlastní obvod!',
              })}>
                <line x1="840" y1="220" x2="840" y2="350" className="stroke-amber-400 stroke-[2]" />
                <rect x="822" y="350" width="36" height="35" rx="3" className="fill-slate-900 stroke-cyan-400 stroke-[2] group-hover:stroke-yellow-300" />
                <text x="840" y="372" textAnchor="middle" className="fill-white font-mono text-xs font-bold">QF2</text>
                <line x1="840" y1="385" x2="840" y2="410" className="stroke-cyan-400 stroke-[2]" />
                <line x1="834" y1="398" x2="846" y2="392" className="stroke-cyan-400 stroke-[1.5]" />
                <text x="850" y="398" className="fill-cyan-400 font-mono text-[10px]">/3</text>
                <text x="840" y="430" textAnchor="middle" className="fill-slate-300 font-mono text-[10px] font-bold">RCBO 16A</text>
                <text x="840" y="445" textAnchor="middle" className="fill-slate-400 text-[10px]">Koupelna 30mA</text>
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* ZÁLOŽKA 3: SCHÉMATA ZAPOJENÍ VYPÍNAČŮ 1, 5, 6, 7 A ZÁSUVKY */}
      {activeTab === 'wiring' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="text-xs text-slate-400">
            💡 <strong>Kanonická zapojení domovních obvodů:</strong> Přehled zapojení fázového (L), nulového (N) a ochranného vodiče (PE) pro nejdůležitější spínací prvky ke státní zkoušce.
          </div>

          {/* Přepínač konkrétního schématu */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
            <button
              onClick={() => setActiveCircuit('sw1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCircuit === 'sw1'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Spínač č. 1 (Jednopólový)
            </button>
            <button
              onClick={() => setActiveCircuit('sw5')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCircuit === 'sw5'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Spínač č. 5 (Sériový / Lustrový)
            </button>
            <button
              onClick={() => setActiveCircuit('sw6')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCircuit === 'sw6'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Spínač č. 6 (Střídavý / Schodišťový)
            </button>
            <button
              onClick={() => setActiveCircuit('sw7')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCircuit === 'sw7'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Spínač č. 7 (Křížový)
            </button>
            <button
              onClick={() => setActiveCircuit('socket')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCircuit === 'socket'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Zásuvka 230 V (16 A)
            </button>
            <button
              onClick={() => setActiveCircuit('rcd')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCircuit === 'rcd'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Proudový chránič (RCD)
            </button>
          </div>

          {/* Vizuální plátno zapojení */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-inner">
            {activeCircuit === 'sw1' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400">Schéma: Jednopólové spínání jednoho světla (Spínač č. 1)</span>
                  <span className="text-slate-400 font-mono">Kabel: CYKY-J 3×1,5</span>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-amber-600 inline-block"></span>
                    <strong>Fáze L (Hnědá):</strong> Z jističe B10 na svorku L spínače č. 1.
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-slate-400 inline-block"></span>
                    <strong>Spínaná fáze (Černá/Hnědá):</strong> Z výstupní svorky spínače na patici svítidla.
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-sky-400 inline-block"></span>
                    <strong>Nulový vodič N (Světle modrá):</strong> Z přípojnice N přímo na závit objímky svítidla.
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
                    <strong>Ochranný vodič PE (Zeleno-žlutá):</strong> Z přípojnice PE na kovovou kostru svítidla.
                  </div>
                </div>
              </div>
            )}

            {activeCircuit === 'sw5' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400">Schéma: Sériové spínání dvou skupin svítidel (Lustrový spínač č. 5)</span>
                  <span className="text-slate-400 font-mono">Kabel: CYKY-J 3×1,5 nebo CYKY-O</span>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed">
                  <p className="mb-2 text-slate-300">Spínač č. 5 má společnou vstupní fázovou svorku L a dva nezávislé spínané výstupy (1 a 2):</p>
                  <div className="space-y-1.5 pl-2 border-l-2 border-amber-500">
                    <div>• <strong>Přívod L:</strong> Vstupuje na společnou svorku L vypínače č. 5.</div>
                    <div>• <strong>Klapka 1 (Výstup 1):</strong> Spíná 1. svítidlo (nebo 1. skupinu žárovek lustru).</div>
                    <div>• <strong>Klapka 2 (Výstup 2):</strong> Spíná 2. svítidlo (nebo 2. skupinu žárovek lustru).</div>
                    <div>• <strong>Vodič N a PE:</strong> Jsou vedeny přímo do svítidel bez přerušení vypínačem.</div>
                  </div>
                </div>
              </div>
            )}

            {activeCircuit === 'sw6' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400">Schéma: Schodišťové střídavé zapojení ze 2 míst (Dva přepínače č. 6)</span>
                  <span className="text-slate-400 font-mono">Mezi spínači: CYKY-O 3×1,5</span>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed">
                  <p className="mb-2 text-slate-300">Přepínače č. 6 se zapojují vždy ve dvojici a propojují se 2 korespondenčními vodiči:</p>
                  <div className="space-y-1.5 pl-2 border-l-2 border-amber-500">
                    <div>• <strong>1. přepínač č. 6:</strong> Fáze L z rozvaděče přichází na společný kontakt L.</div>
                    <div>• <strong>Korespondenční vodiče:</strong> Dva vodiče spojují výstupní svorky 1 a 2 prvního přepínače se svorkami 1 a 2 druhého přepínače.</div>
                    <div>• <strong>2. přepínač č. 6:</strong> Ze společného kontaktu L vede spínaná fáze přímo na svítidlo.</div>
                  </div>
                </div>
              </div>
            )}

            {activeCircuit === 'sw7' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400">Schéma: Křížové zapojení ze 3 a více míst (Přepínače č. 6 + křížový přepínač č. 7)</span>
                  <span className="text-slate-400 font-mono">Kabel: CYKY-O</span>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed">
                  <p className="mb-2 text-slate-300">Křížový přepínač č. 7 se vkládá MEZI dva střídavé přepínače č. 6:</p>
                  <div className="space-y-1.5 pl-2 border-l-2 border-amber-500">
                    <div>• <strong>Začátek trasy:</strong> 1. přepínač č. 6 (přívod fáze L na společný kontakt).</div>
                    <div>• <strong>Uprostřed:</strong> Přepínač č. 7 (křížový) má 4 svorky – dva vstupy a dva výstupy. Při přepnutí kříží korespondenční cesty. Pro ovládání ze 4 a více míst se přidávají další přepínače č. 7!</div>
                    <div>• <strong>Konec trasy:</strong> 2. přepínač č. 6 (ze společného kontaktu odvod na svítidlo).</div>
                  </div>
                </div>
              </div>
            )}

            {activeCircuit === 'socket' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400">Schéma: Zapojení jednofázové zásuvky 230 V (16 A, 2P+PE)</span>
                  <span className="text-slate-400 font-mono">Kabel: CYKY-J 3×2,5</span>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed">
                  <div className="space-y-1.5 pl-2 border-l-2 border-sky-400">
                    <div>• <strong>Ochranný kolík (PE):</strong> Vždy nahoře – připojen zeleno-žlutý ochranný vodič PE.</div>
                    <div>• <strong>Levá dutinka (Fáze L):</strong> Tradičně a doporučeně vlevo – hnědý nebo černý fázový vodič L.</div>
                    <div>• <strong>Pravá dutinka (Nula N):</strong> Vpravo – světle modrý nulový vodič N.</div>
                    <div>• <strong>Doplňková ochrana:</strong> Všechny zásuvky pro laiky do 32 A musí mít proudový chránič 30 mA!</div>
                  </div>
                </div>
              </div>
            )}

            {activeCircuit === 'rcd' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400">Schéma: Zapojení proudového chrániče (RCD / RCBO)</span>
                  <span className="text-slate-400 font-mono">ČSN EN 61008-1 / ČSN EN 61009-1</span>
                </div>
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed">
                  <div className="space-y-1.5 pl-2 border-l-2 border-emerald-400">
                    <div>• <strong>Průchod fází a N:</strong> Všechny fázové vodiče (L1, L2, L3) a nulový vodič N musí procházet společně součtovým transformátorem chrániče!</div>
                    <div>• <strong>Ochranný vodič PE:</strong> NIKDY nesmí procházet proudovým chráničem! Vede mimo chránič přímo na ochrannou přípojnici PE.</div>
                    <div>• <strong>Nulový vodič N za chráničem:</strong> Nulový vodič za chráničem se již NESMÍ spojit s PE ani s jiným vodičem N před chráničem (jinak chránič okamžitě vybaví).</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DETAILNÍ INSPEKČNÍ PANEL VYBRANÉ ZNAČKY / PŘÍSTROJE */}
      {inspectedElement && (
        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-t-2 border-amber-500 shadow-2xl animate-fadeIn">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-5">
            {inspectedElement.image && (
              <div className="flex flex-col items-center bg-white p-3 sm:p-4 rounded-xl border border-slate-300 shadow-xl shrink-0 self-center lg:self-start">
                <span className="text-[10px] font-mono text-slate-500 mb-1.5 uppercase font-bold">
                  ČSN EN 60617
                </span>
                <img
                  src={inspectedElement.image}
                  alt={inspectedElement.title}
                  className="h-20 max-w-[160px] object-contain"
                />
              </div>
            )}

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest mr-2">
                    {inspectedElement.category || inspectedElement.code || 'Technický prvek'}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {inspectedElement.norm}
                  </span>
                </div>
                <button
                  onClick={() => setInspectedElement(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h4 className="text-base sm:text-lg font-black text-white">
                {inspectedElement.title}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                {inspectedElement.description}
              </p>

              {inspectedElement.wiringDiagram && (
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                  <span className="font-mono text-amber-400 font-bold block mb-0.5">
                    Zapojení / Schéma:
                  </span>
                  <span className="text-slate-300 font-mono text-[11px]">
                    {inspectedElement.wiringDiagram}
                  </span>
                </div>
              )}

              {inspectedElement.examTip && (
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300 block">
                      Otázka zkušebního komisaře u státní zkoušky:
                    </span>
                    <span className="text-slate-200">
                      {inspectedElement.examTip}
                    </span>
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
