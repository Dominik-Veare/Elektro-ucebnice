import React, { useState } from 'react';
import {
  Zap,
  Cpu,
  Layers,
} from 'lucide-react';
import {
  ELECTRICAL_DEVICES_CATALOG,
  DeviceSpec,
  DeviceSvgPreview,
} from './svg/ElectricalDevices';
import { InteractiveBoardEditor } from './InteractiveBoardEditor';

type MainTab = 'board' | 'catalog';
type CatalogCategory = DeviceSpec['category'] | 'all';

const CATEGORY_LABELS: Record<CatalogCategory, string> = {
  all: 'Všechny prvky',
  din: '1. Přístroje na DIN lištu',
  busbar: '2. Sběrnice a svorky',
  switch: '3. Domovní spínače',
  socket: '4. Zásuvky 230/400 V',
  appliance: '5. Spotřebiče a svítidla',
  meter: '6. Měřicí přístroje',
};

export const WiringSimulator: React.FC = () => {
  const [mainTab, setMainTab] = useState<MainTab>('board');
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState<CatalogCategory>('all');

  const filteredDevices =
    selectedCatalogCategory === 'all'
      ? ELECTRICAL_DEVICES_CATALOG
      : ELECTRICAL_DEVICES_CATALOG.filter((d) => d.category === selectedCatalogCategory);

  return (
    <div className="space-y-6">
      {/* Hlavička s přepínačem Montážní tabule / Katalog přístrojů */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-500/30 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" />
              Praktický trenažér zapojování (230 / 400 V)
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              Montážní tabule a 12 zkouškových úloh (3 úrovně obtížnosti)
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 self-start">
            <button
              onClick={() => setMainTab('board')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                mainTab === 'board'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span className="sm:hidden">Montážní tabule (12 úloh)</span>
              <span className="hidden sm:inline">Montážní tabule (12 úloh + volné zapojení)</span>
            </button>
            <button
              onClick={() => setMainTab('catalog')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                mainTab === 'catalog'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              Katalog přístrojů ({ELECTRICAL_DEVICES_CATALOG.length})
            </button>
          </div>
        </div>
      </div>

      {/* ZÁLOŽKA 1: VOLNÁ MONTÁŽNÍ TABULE + 12 ÚLOH */}
      {mainTab === 'board' && <InteractiveBoardEditor />}

      {/* ZÁLOŽKA 2: INTERAKTIVNÍ SVG KATALOG VŠECH PŘÍSTROJŮ A MODULŮ */}
      {mainTab === 'catalog' && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 bg-slate-900/70 p-2 rounded-2xl border border-slate-800">
            {(Object.keys(CATEGORY_LABELS) as CatalogCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCatalogCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCatalogCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDevices.map((dev) => (
              <div
                key={dev.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-800 text-amber-400 border border-slate-700 mb-1">
                        {dev.code} • {dev.standard}
                      </span>
                      <h3 className="text-base font-bold text-white">{dev.name}</h3>
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 flex items-center justify-center h-48 mb-4">
                    <DeviceSvgPreview deviceId={dev.id} activeState={true} />
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-2">{dev.examRule}</p>
                  <p className="text-[11px] text-rose-300/90 leading-relaxed mb-3">
                    <strong>Častá chyba:</strong> {dev.commonMistake}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Svorky přístroje:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {dev.terminals.map((t) => (
                      <span
                        key={t.id}
                        title={t.description}
                        className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-[11px] border border-slate-700"
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
