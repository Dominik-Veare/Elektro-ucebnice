import React, { useState } from 'react';
import {
  FileText,
  AlertTriangle,
  ZoomIn,
  Search,
  X,
  Layers,
  BookOpen,
} from 'lucide-react';
import {
  STANDARD_SYMBOLS,
  SYMBOL_CATEGORIES,
} from '../data/standardSymbols';

interface TechnicalSchematicsViewerProps {
  initialTab?: 'single-line' | 'ladder' | 'floorplan' | 'symbols';
}

type SymbolViewMode = 'both' | 'installation' | 'schematic';
type CatalogMode = 'standard' | 'dual';

export const TechnicalSchematicsViewer: React.FC<TechnicalSchematicsViewerProps> = ({
  initialTab = 'symbols',
}) => {
  const [activeTab, setActiveTab] = useState<'single-line' | 'ladder' | 'floorplan' | 'symbols'>(
    initialTab
  );
  const [catalogMode, setCatalogMode] = useState<CatalogMode>('standard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [standardCategory, setStandardCategory] = useState<string>('all');
  const [symbolViewMode, setSymbolViewMode] = useState<SymbolViewMode>('both');
  const [selectedSymbolCategory, setSelectedSymbolCategory] = useState<string>('all');
  const [inspectedElement, setInspectedElement] = useState<{
    title: string;
    code?: string;
    category?: string;
    image?: string;
    description: string;
    norm: string;
    wiringDiagram?: string;
    examTip?: string;
    installationSvg?: React.ReactNode;
    schematicSvg?: React.ReactNode;
  } | null>(null);

  // Kompletní přehled normovaných elektrotechnických značek dle ČSN EN 60617 a portálu Elektromateriál.cz
  const SYMBOLS = [
    {
      id: 'sw-1',
      category: 'switch',
      name: 'Spínač č. 1 (Jednopólový spínač)',
      refCode: 'SA1',
      norm: 'ČSN EN 60617-11 / ČSN EN 60617-7',
      description: 'Základní jednopólový spínač. Spíná jeden světelný okruh z jednoho místa (rozpojuje fázový vodič L).',
      examTip: 'Půdorysná značka: Kolečko, ze kterého vede kolmá čára nahoru s JEDNÍM praporkem vpravo. Ve schématu zapojení: jednoduchý spínací kontakt (NO). Spíná vždy fázi, NIKDY nulák!',
      wiringDiagram: 'Přívod L → svorka L (nebo 1) → spínací kontakt → svorka 2 → svítidlo (patice) → N',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[3] overflow-visible">
          {/* Zeď / základna */}
          <line x1="20" y1="75" x2="80" y2="75" className="stroke-slate-700 stroke-[2]" />
          {/* Kolečko spínače přiléhající ke zdi */}
          <circle cx="50" cy="63" r="12" />
          {/* Dřík svisle nahoru */}
          <line x1="50" y1="51" x2="50" y2="18" />
          {/* Pravoúhlý praporek doprava */}
          <line x1="50" y1="18" x2="72" y2="18" strokeLinecap="round" />
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[2.5]">
          {/* Svorky */}
          <circle cx="20" cy="50" r="4" className="fill-slate-900" />
          <circle cx="80" cy="50" r="4" className="fill-slate-900" />
          <line x1="5" y1="50" x2="16" y2="50" />
          <line x1="84" y1="50" x2="95" y2="50" />
          {/* Pohyblivý spínací kontakt rozpojený */}
          <line x1="24" y1="50" x2="68" y2="28" strokeLinecap="round" />
          <text x="18" y="70" className="fill-slate-400 stroke-none font-mono text-[10px]">1</text>
          <text x="78" y="70" className="fill-slate-400 stroke-none font-mono text-[10px]">2</text>
        </svg>
      ),
    },
    {
      id: 'sw-2',
      category: 'switch',
      name: 'Spínač č. 2 (Dvoupólový spínač)',
      refCode: 'SA2',
      norm: 'ČSN EN 60617-11 / ČSN EN 60617-7',
      description: 'Dvoupólový vypínač. Současně spíná i rozpíná dva nezávislé pracovní vodiče (L i N). Použití ve vlhku, koupelnách a u bojlerů.',
      examTip: 'Půdorysná značka: Svislice s praporkem má na dříku 2 rovnoběžné šikmé čárky (2 póly). Ve schématu: 2 spínací kontakty spřažené čárkovanou čárou.',
      wiringDiagram: 'Svorka 1L (fáze) + 1N (pracovní nula) → spínány najednou → výstup 2L + 2N ke spotřebiči',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[3] overflow-visible">
          <line x1="20" y1="75" x2="80" y2="75" className="stroke-slate-700 stroke-[2]" />
          <circle cx="50" cy="63" r="12" />
          <line x1="50" y1="51" x2="50" y2="18" />
          <line x1="50" y1="18" x2="72" y2="18" strokeLinecap="round" />
          {/* Dvě příčné čárky označující 2 póly */}
          <line x1="43" y1="32" x2="57" y2="26" strokeLinecap="round" />
          <line x1="43" y1="40" x2="57" y2="34" strokeLinecap="round" />
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[2.5]">
          {/* Pól 1 (L) */}
          <circle cx="20" cy="35" r="4" className="fill-slate-900" />
          <circle cx="80" cy="35" r="4" className="fill-slate-900" />
          <line x1="24" y1="35" x2="68" y2="18" strokeLinecap="round" />
          {/* Pól 2 (N) */}
          <circle cx="20" cy="65" r="4" className="fill-slate-900" />
          <circle cx="80" cy="65" r="4" className="fill-slate-900" />
          <line x1="24" y1="65" x2="68" y2="48" strokeLinecap="round" />
          {/* Mechanické spřažení */}
          <line x1="48" y1="28" x2="48" y2="58" strokeDasharray="3,3" className="stroke-slate-500 stroke-[1.5]" />
        </svg>
      ),
    },
    {
      id: 'sw-5',
      category: 'switch',
      name: 'Spínač č. 5 (Sériový / lustrový spínač)',
      refCode: 'SA5',
      norm: 'ČSN EN 60617-11 / ČSN EN 60617-7',
      description: 'Dvě nezávislé klapky v jednom strojku se společným fázovým přívodem. Umožňuje spínat dvě sekce lustru (např. 2+3 žárovky) nebo dvě různá svítidla.',
      examTip: 'Půdorysná značka: Kolečko se DVĚMA svislicemi nahoru, každá má praporek doprava. Ve schématu: 1 společná svorka L a 2 nezávislé spínací kontakty 1 a 2.',
      wiringDiagram: 'Přívod L na společnou svorku L; klapka 1 spíná vývod 1; klapka 2 spíná vývod 2',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[3] overflow-visible">
          <line x1="20" y1="75" x2="80" y2="75" className="stroke-slate-700 stroke-[2]" />
          <circle cx="50" cy="63" r="12" />
          {/* Dvě svislice s praporky doprava */}
          <line x1="43" y1="52" x2="43" y2="18" />
          <line x1="43" y1="18" x2="58" y2="18" strokeLinecap="round" />
          <line x1="57" y1="52" x2="57" y2="18" />
          <line x1="57" y1="18" x2="72" y2="18" strokeLinecap="round" />
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[2.5]">
          {/* Přívodní svorka L */}
          <circle cx="20" cy="50" r="4" className="fill-slate-900" />
          <line x1="5" y1="50" x2="16" y2="50" />
          <text x="14" y="42" className="fill-amber-400 stroke-none font-mono text-[10px] font-bold">L</text>
          {/* Dva kontakty */}
          <line x1="24" y1="50" x2="40" y2="35" />
          <line x1="24" y1="50" x2="40" y2="65" />
          <line x1="40" y1="35" x2="72" y2="20" strokeLinecap="round" />
          <line x1="40" y1="65" x2="72" y2="50" strokeLinecap="round" />
          {/* Výstupní svorky */}
          <circle cx="80" cy="35" r="4" className="fill-slate-900" />
          <circle cx="80" cy="65" r="4" className="fill-slate-900" />
          <line x1="84" y1="35" x2="95" y2="35" />
          <line x1="84" y1="65" x2="95" y2="65" />
          <text x="82" y="27" className="fill-slate-400 stroke-none font-mono text-[10px]">1</text>
          <text x="82" y="80" className="fill-slate-400 stroke-none font-mono text-[10px]">2</text>
        </svg>
      ),
    },
    {
      id: 'sw-6',
      category: 'switch',
      name: 'Spínač č. 6 (Střídavý / schodišťový přepínač)',
      refCode: 'SA6',
      norm: 'ČSN EN 60617-11 / ČSN EN 60617-7',
      description: 'Přepíná přívod střídavě do jednoho ze dvou korespondenčních vodičů. V páru (dvě šestky) ovládá světlo ze 2 míst (chodby, schodiště, ložnice).',
      examTip: 'Půdorysná značka: Svislice prochází křížem skrz kolečko – nahoře má praporek DOPRAVA, dole praporek DOLEVA! Ve schématu: přepínací kontakt CO (svorka L přepíná mezi 1 a 2).',
      wiringDiagram: 'Přívod L na přepínač 6A (svorka L) → 2 korespondenční vodiče (1, 2) → přepínač 6B (svorky 1, 2) → vývod L ke svítidlu',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[3] overflow-visible">
          <line x1="20" y1="50" x2="80" y2="50" className="stroke-slate-700 stroke-[2]" />
          <circle cx="50" cy="50" r="12" />
          {/* Osa procházející skrz kruh s opačnými praporky */}
          <line x1="50" y1="75" x2="50" y2="25" />
          <line x1="50" y1="25" x2="72" y2="25" strokeLinecap="round" />
          <line x1="50" y1="75" x2="28" y2="75" strokeLinecap="round" />
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[2.5]">
          {/* Přívodní svorka L */}
          <circle cx="20" cy="50" r="4" className="fill-slate-900" />
          <line x1="5" y1="50" x2="16" y2="50" />
          <text x="14" y="42" className="fill-amber-400 stroke-none font-mono text-[10px] font-bold">L</text>
          {/* Přepínací jazýček */}
          <line x1="24" y1="50" x2="70" y2="30" strokeLinecap="round" />
          {/* Dva pevné kontakty */}
          <circle cx="80" cy="30" r="4" className="fill-slate-900" />
          <circle cx="80" cy="70" r="4" className="fill-slate-900" />
          <line x1="84" y1="30" x2="95" y2="30" />
          <line x1="84" y1="70" x2="95" y2="70" />
          <text x="82" y="22" className="fill-slate-400 stroke-none font-mono text-[10px]">1</text>
          <text x="82" y="84" className="fill-slate-400 stroke-none font-mono text-[10px]">2</text>
        </svg>
      ),
    },
    {
      id: 'sw-7',
      category: 'switch',
      name: 'Spínač č. 7 (Křížový přepínač)',
      refCode: 'SA7',
      norm: 'ČSN EN 60617-11 / ČSN EN 60617-7',
      description: 'Zařazuje se mezi dva střídavé přepínače č. 6. Má 4 svorky a kříží dva korespondenční vodiče. Umožňuje ovládání světla ze třetího a každého dalšího místa.',
      examTip: 'Půdorysná značka: Kolečko se dvěma zkříženými čarami (tvar X) a praporky na VŠECH čtyřech koncích. Má 4 svorky. Zkoušející se ptá na kabel: k sedmičce vede vždy kabel se 4 žílami!',
      wiringDiagram: 'Vstup: 2 korespondenční vodiče z předchozího spínače 6 → Výstup: 2 korespondenční vodiče k dalšímu spínači 6 (nebo 7)',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[3] overflow-visible">
          <line x1="20" y1="50" x2="80" y2="50" className="stroke-slate-700 stroke-[2]" />
          <circle cx="50" cy="50" r="12" />
          {/* Dvě zkřížené čáry tvaru X s praporky na všech 4 koncích */}
          <line x1="32" y1="68" x2="68" y2="32" />
          <line x1="32" y1="32" x2="68" y2="68" />
          <line x1="68" y1="32" x2="80" y2="32" strokeLinecap="round" />
          <line x1="68" y1="68" x2="80" y2="68" strokeLinecap="round" />
          <line x1="32" y1="32" x2="20" y2="32" strokeLinecap="round" />
          <line x1="32" y1="68" x2="20" y2="68" strokeLinecap="round" />
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[2.5]">
          {/* 4 svorky */}
          <circle cx="20" cy="30" r="4" className="fill-slate-900" />
          <circle cx="20" cy="70" r="4" className="fill-slate-900" />
          <circle cx="80" cy="30" r="4" className="fill-slate-900" />
          <circle cx="80" cy="70" r="4" className="fill-slate-900" />
          {/* Vnitřní křížové kontakty */}
          <line x1="24" y1="30" x2="76" y2="70" strokeDasharray="3,3" className="stroke-slate-500 stroke-[1.8]" />
          <line x1="24" y1="70" x2="76" y2="30" strokeDasharray="3,3" className="stroke-slate-500 stroke-[1.8]" />
          <line x1="24" y1="30" x2="76" y2="30" strokeLinecap="round" />
          <line x1="24" y1="70" x2="76" y2="70" strokeLinecap="round" />
          <text x="14" y="22" className="fill-slate-400 stroke-none font-mono text-[9px]">1</text>
          <text x="14" y="85" className="fill-slate-400 stroke-none font-mono text-[9px]">2</text>
          <text x="82" y="22" className="fill-slate-400 stroke-none font-mono text-[9px]">3</text>
          <text x="82" y="85" className="fill-slate-400 stroke-none font-mono text-[9px]">4</text>
        </svg>
      ),
    },
    {
      id: 'sw-pb',
      category: 'switch',
      name: 'Tlačítkový ovladač č. 1/0 (s vratnou pružinou)',
      refCode: 'SB1',
      norm: 'ČSN EN 60617-11 / ČSN EN 60617-7',
      description: 'Zapínací tlačítko, které sepne kontakt pouze po dobu stisku. Používá se pro zvonky, schodišťové automaty a impulzní (paměťová) relé.',
      examTip: 'Půdorysná značka: Kolečko s plným černým bodem uvnitř a rovnou svislicí nahoru BEZ praporku. Ve schématu: spínací kontakt s ovládacím hříbkem a trojúhelníčkem pružiny.',
      wiringDiagram: 'Paralelní zapojení libovolného počtu tlačítek na 2 vodiče k cívce impulzního relé (A1–A2)',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[3] overflow-visible">
          <line x1="20" y1="75" x2="80" y2="75" className="stroke-slate-700 stroke-[2]" />
          <circle cx="50" cy="63" r="12" />
          <circle cx="50" cy="63" r="5" className="fill-amber-400" />
          {/* Svislá čára bez praporku */}
          <line x1="50" y1="51" x2="50" y2="20" strokeLinecap="round" />
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[2.5]">
          <circle cx="20" cy="50" r="4" className="fill-slate-900" />
          <circle cx="80" cy="50" r="4" className="fill-slate-900" />
          <line x1="5" y1="50" x2="16" y2="50" />
          <line x1="84" y1="50" x2="95" y2="50" />
          {/* Kontakt s hříbkem tlačítka a pružinou */}
          <line x1="24" y1="50" x2="68" y2="30" strokeLinecap="round" />
          <line x1="48" y1="38" x2="48" y2="15" strokeLinecap="round" />
          <line x1="38" y1="15" x2="58" y2="15" strokeLinecap="round" strokeWidth="3" />
          <polygon points="44,22 52,22 48,27" className="fill-amber-400 stroke-none" />
        </svg>
      ),
    },
    {
      id: 'soc-1',
      category: 'socket',
      name: 'Jednoduchá zásuvka 230 V (s kolíkem)',
      refCode: 'XD1',
      norm: 'ČSN EN 60617-11 / ČSN 33 2130 ed. 3',
      description: 'Zásuvka 230 V / 16 A s ochranným kolíkem (typ E, český standard). Fáze L vlevo, pracovní nula N vpravo, ochranný kolík PE nahoře.',
      examTip: 'Půdorysná značka: Půlkruh přitisknutý k čáře stěny s kolmou čárkou uprostřed (ochranný kolík PE). Ve schématu: zdířkový kontakt se svorkou PE.',
      wiringDiagram: 'L (hnědá/černá) → levá zdířka; N (světle modrá) → pravá zdířka; PE (zelenožlutá) → kolík nahoře',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-sky-400 stroke-current fill-none stroke-[3] overflow-visible">
          {/* Zeď */}
          <line x1="15" y1="65" x2="85" y2="65" className="stroke-slate-700 stroke-[2.5]" />
          {/* Půlkruh zásuvky přilehlý ke zdi */}
          <path d="M 26 65 A 24 24 0 0 1 74 65" />
          {/* Kolmá čárka ochranného kontaktu uprostřed */}
          <line x1="50" y1="65" x2="50" y2="41" strokeLinecap="round" />
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-sky-400 stroke-current fill-none stroke-[2.5]">
          {/* Fáze L a N zdířky */}
          <path d="M 30 30 C 40 30, 40 45, 30 45" />
          <path d="M 30 55 C 40 55, 40 70, 30 70" />
          <line x1="10" y1="37" x2="30" y2="37" />
          <line x1="10" y1="63" x2="30" y2="63" />
          {/* Kolík PE */}
          <line x1="75" y1="50" x2="48" y2="50" strokeWidth="3" />
          <circle cx="75" cy="50" r="3.5" className="fill-sky-400" />
          <text x="12" y="32" className="fill-amber-400 stroke-none font-mono text-[9px] font-bold">L</text>
          <text x="12" y="78" className="fill-sky-400 stroke-none font-mono text-[9px] font-bold">N</text>
          <text x="80" y="54" className="fill-emerald-400 stroke-none font-mono text-[9px] font-bold">PE</text>
        </svg>
      ),
    },
    {
      id: 'soc-2',
      category: 'socket',
      name: 'Dvojitá zásuvka 230 V (16 A)',
      refCode: 'XD2',
      norm: 'ČSN EN 60617-11',
      description: 'Dvojitá zásuvka montovaná do jedné instalační krabice (KU 68). Z hlediska normy ČSN 33 2130 ed. 3 se počítá jako JEDEN vývod.',
      examTip: 'Půdorysná značka: Dva vzájemně spojené půlkruhy vedle sebe (nebo půlkruh doplněný číslicí 2). Na jeden zásuvkový obvod lze zapojit max. 10 vývodů.',
      wiringDiagram: 'Přívod CYKY-J 3×2.5 mm²; propojení obou zásuvek je provedeno vnitřními můstky v těle strojku',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-sky-400 stroke-current fill-none stroke-[3] overflow-visible">
          <line x1="10" y1="65" x2="90" y2="65" className="stroke-slate-700 stroke-[2.5]" />
          {/* Dva spojené půlkruhy */}
          <path d="M 18 65 A 18 18 0 0 1 54 65" />
          <path d="M 46 65 A 18 18 0 0 1 82 65" />
          <line x1="36" y1="65" x2="36" y2="47" strokeLinecap="round" />
          <line x1="64" y1="65" x2="64" y2="47" strokeLinecap="round" />
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-sky-400 stroke-current fill-none stroke-[2.5]">
          <path d="M 30 25 C 38 25, 38 37, 30 37" />
          <path d="M 30 45 C 38 45, 38 57, 30 57" />
          <path d="M 60 25 C 68 25, 68 37, 60 37" />
          <path d="M 60 45 C 68 45, 68 57, 60 57" />
          <line x1="15" y1="41" x2="30" y2="41" />
          <line x1="45" y1="41" x2="60" y2="41" />
          <line x1="38" y1="75" x2="52" y2="75" strokeWidth="3" />
        </svg>
      ),
    },
    {
      id: 'soc-ip44',
      category: 'socket',
      name: 'Zásuvka s krytím IP 44 (vlhkotěsná s víčkem)',
      refCode: 'XD',
      norm: 'ČSN 33 2000-7-701 / ČSN EN 60529',
      description: 'Zásuvka s ochranným odklopným víčkem a těsněním. Povinná v koupelnách (zóna 3), venku, v dílnách a vlhkých prostorech.',
      examTip: 'Půdorysná značka: Půlkruh zásuvky je VYPLNĚNÝ (plná černá plocha), což značí zvýšené krytí proti vodě. V koupelně musí být VŽDY chráněna chráničem RCD 30 mA!',
      wiringDiagram: 'Přívod CYKY-J 3×2.5 mm² jištěný B16/1 a chráněný RCD 30 mA',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-sky-400 stroke-current fill-none stroke-[3] overflow-visible">
          <line x1="15" y1="65" x2="85" y2="65" className="stroke-slate-700 stroke-[2.5]" />
          {/* Vyplněný půlkruh označující vyšší krytí IP 44 */}
          <path d="M 26 65 A 24 24 0 0 1 74 65 Z" className="fill-sky-400/50 stroke-sky-400" />
          <line x1="50" y1="65" x2="50" y2="41" strokeLinecap="round" />
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-sky-400 stroke-current fill-none stroke-[2.5]">
          <rect x="15" y="15" width="70" height="70" rx="8" className="stroke-sky-400/60 stroke-dasharray-[4,2]" />
          <path d="M 35 38 C 45 38, 45 50, 35 50" />
          <path d="M 35 60 C 45 60, 45 72, 35 72" />
          <text x="55" y="45" className="fill-sky-300 stroke-none font-mono text-xs font-bold">IP44</text>
        </svg>
      ),
    },
    {
      id: 'soc-3p',
      category: 'socket',
      name: 'Třífázová zásuvka 400 V (5pólová: 3P+N+PE)',
      refCode: 'XD3',
      norm: 'ČSN EN 60309-1 / ČSN 33 2000-4-41 ed. 3',
      description: 'Průmyslová pětikolíková červená zásuvka (16 A nebo 32 A) pro třífázové spotřebiče (cirkulárka, míchačka, svářečka).',
      examTip: 'Půdorysná značka: Půlkruh má 3 čárky z oblouku (3 fáze L1, L2, L3) + kolmou čárku PE. Od roku 2009 musí mít i třífázové zásuvky do 32 A doplňkovou ochranu RCD 30 mA!',
      wiringDiagram: 'Přívod CYKY-J 5×2.5 (16A) nebo CYKY-J 5×4/6 (32A); zapojení L1, L2, L3, N, PE',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-rose-400 stroke-current fill-none stroke-[3] overflow-visible">
          <line x1="15" y1="65" x2="85" y2="65" className="stroke-slate-700 stroke-[2.5]" />
          <path d="M 26 65 A 24 24 0 0 1 74 65" />
          {/* Tři fázové čárky z oblouku + středový kolík */}
          <line x1="38" y1="65" x2="38" y2="44" strokeLinecap="round" />
          <line x1="50" y1="65" x2="50" y2="41" strokeLinecap="round" />
          <line x1="62" y1="65" x2="62" y2="44" strokeLinecap="round" />
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-rose-400 stroke-current fill-none stroke-[2.5]">
          <line x1="20" y1="20" x2="40" y2="20" />
          <line x1="20" y1="35" x2="40" y2="35" />
          <line x1="20" y1="50" x2="40" y2="50" />
          <line x1="20" y1="65" x2="40" y2="65" />
          <line x1="20" y1="80" x2="50" y2="80" strokeWidth="3" />
          <text x="55" y="24" className="fill-rose-300 stroke-none font-mono text-[9px] font-bold">L1</text>
          <text x="55" y="39" className="fill-rose-300 stroke-none font-mono text-[9px] font-bold">L2</text>
          <text x="55" y="54" className="fill-rose-300 stroke-none font-mono text-[9px] font-bold">L3</text>
          <text x="55" y="69" className="fill-sky-400 stroke-none font-mono text-[9px] font-bold">N</text>
          <text x="60" y="84" className="fill-emerald-400 stroke-none font-mono text-[9px] font-bold">PE</text>
        </svg>
      ),
    },
    {
      id: 'cb-1',
      category: 'device',
      name: 'Jistič vedení (MCB)',
      refCode: 'FA1',
      norm: 'ČSN EN 60898-1 / ČSN EN 60617-7',
      description: 'Chrání vedení před přetížením (tepelná bimetalová spoušť) a zkratem (elektromagnetická rychlá spoušť). Běžné charakteristiky: B (zásuvky, světla), C (motory, kompresory).',
      examTip: 'Obvodová značka ČSN EN 60617: Spínací kontakt s křížkem × na spínacím rameni, obdélníčkem bimetalové spouště a obloučkem elektromagnetické spouště.',
      wiringDiagram: 'Vstup: horní svorka 1 (přívod z propojovací lišty); Výstup: dolní svorka 2 (odvod ke spotřebiči)',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-400 stroke-current fill-none stroke-[2.5]">
          <rect x="25" y="15" width="50" height="70" rx="4" className="stroke-emerald-400/80" />
          <line x1="50" y1="15" x2="50" y2="30" />
          <line x1="50" y1="30" x2="40" y2="55" strokeLinecap="round" strokeWidth="3" />
          <line x1="50" y1="55" x2="50" y2="85" />
          <text x="56" y="50" className="fill-emerald-300 stroke-none font-mono text-xs font-bold">FA</text>
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-400 stroke-current fill-none stroke-[2.5]">
          <line x1="50" y1="10" x2="50" y2="30" />
          <line x1="50" y1="30" x2="38" y2="55" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="55" x2="50" y2="90" />
          {/* Křížek vypínače */}
          <line x1="32" y1="38" x2="40" y2="46" strokeWidth="2" />
          <line x1="40" y1="38" x2="32" y2="46" strokeWidth="2" />
          {/* Bimetalová tepelná spoušť */}
          <rect x="52" y="34" width="8" height="12" className="stroke-[1.8]" />
          {/* Elektromagnetická zkratová spoušť */}
          <path d="M 52 60 C 58 60, 58 52, 52 52" className="stroke-[1.8]" />
        </svg>
      ),
    },
    {
      id: 'rcd-1',
      category: 'device',
      name: 'Proudový chránič (RCD)',
      refCode: 'QF1',
      norm: 'ČSN EN 61008-1 / ČSN 33 2000-4-41 ed. 3',
      description: 'Základní ochrana před úrazem el. proudem. Porovnává součet proudů fázemi a nulákem. Vybaví při reziduálním proudu IΔn = 30 mA do 0,2–0,4 s.',
      examTip: 'Obvodová značka: Kontakty protínají ovál Ferrantiho součtového transformátoru proudu. Zkušební tlačítko T simuluje poruchový proud přes testovací odpor.',
      wiringDiagram: 'Prochází jím VŠECHNY pracovní vodiče (L1, L2, L3 i N). Vodič PE chráničem NIKDY nesmí procházet!',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-400 stroke-current fill-none stroke-[2.5]">
          <rect x="20" y="15" width="60" height="70" rx="4" className="stroke-emerald-400/80" />
          <text x="50" y="45" textAnchor="middle" className="fill-emerald-300 stroke-none font-mono text-xs font-bold">RCD</text>
          <text x="50" y="60" textAnchor="middle" className="fill-slate-400 stroke-none font-mono text-[9px]">30 mA</text>
          <circle cx="68" cy="28" r="4" className="fill-emerald-400 stroke-none" />
          <text x="68" y="31" textAnchor="middle" className="fill-slate-950 stroke-none font-mono text-[8px] font-bold">T</text>
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-400 stroke-current fill-none stroke-[2.5]">
          {/* Kontakty L a N */}
          <line x1="35" y1="10" x2="35" y2="30" />
          <line x1="35" y1="30" x2="26" y2="55" strokeWidth="2.5" />
          <line x1="35" y1="55" x2="35" y2="90" />
          <line x1="65" y1="10" x2="65" y2="30" />
          <line x1="65" y1="30" x2="56" y2="55" strokeWidth="2.5" />
          <line x1="65" y1="55" x2="65" y2="90" />
          {/* Součtový transformátor Ferrantiho */}
          <ellipse cx="50" cy="65" rx="28" ry="8" className="stroke-emerald-400 stroke-[2]" />
          {/* Testovací tlačítko T */}
          <rect x="70" y="32" width="7" height="7" className="fill-emerald-400" />
          <text x="73" y="28" textAnchor="middle" className="fill-emerald-300 stroke-none font-mono text-[8px] font-bold">T</text>
        </svg>
      ),
    },
    {
      id: 'fuse-1',
      category: 'device',
      name: 'Tavná pojistka',
      refCode: 'FU1',
      norm: 'ČSN EN 60269 / ČSN EN 60617-7',
      description: 'Jednorázový nadproudový jistící prvek. Při nadproudu nebo zkratu se tavný drátek přetaví a přeruší obvod. Vyznačuje se vysokou vypínací schopností (až 120 kA).',
      examTip: 'Obvodová značka: Obdélník protnutý podélnou rovnou osou procházející celým tělem pojistky.',
      wiringDiagram: 'Přívod do spodního kontaktu pojistkového spodku; odvod z dotekového šroubu / hlavice',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[2.5]">
          <line x1="15" y1="50" x2="85" y2="50" strokeWidth="3" />
          <rect x="28" y="35" width="44" height="30" rx="2" className="fill-slate-900" />
          <text x="50" y="54" textAnchor="middle" className="fill-amber-300 stroke-none font-mono text-xs font-bold">FU</text>
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[2.5]">
          {/* Průchozí čára středem obdélníku */}
          <line x1="10" y1="50" x2="90" y2="50" strokeWidth="2.5" />
          <rect x="25" y="36" width="50" height="28" rx="2" className="fill-slate-900 stroke-amber-400 stroke-[2.5]" />
        </svg>
      ),
    },
    {
      id: 'spd-1',
      category: 'device',
      name: 'Svodič přepětí (SPD Typ 1+2)',
      refCode: 'FS1',
      norm: 'ČSN EN 61643-11 / ČSN 33 2000-5-534',
      description: 'Chrání elektroinstalaci před bleskovými proudy a přepětím v síti. Přepěťovou špičku svede do ochranného uzemnění PE.',
      examTip: 'Obvodová značka: Obdélník varistoru se zalomenou čarou znázorňující nelineární napěťovou závislost odporu.',
      wiringDiagram: 'Paralelní připojení mezi L (nebo N) a ochrannou přípojnici PE/MET. Délka vodičů max. 0,5 m!',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[2.5]">
          <rect x="25" y="15" width="50" height="70" rx="4" className="stroke-amber-400/80" />
          <path d="M 45 25 L 55 45 L 45 45 L 55 75" className="stroke-amber-400 stroke-[2.5] stroke-linecap-round" />
          <text x="50" y="80" textAnchor="middle" className="fill-amber-300 stroke-none font-mono text-[9px] font-bold">SPD</text>
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[2.5]">
          <line x1="50" y1="10" x2="50" y2="30" />
          <rect x="34" y="30" width="32" height="38" rx="2" className="stroke-[2.5]" />
          {/* Varistorová lomená čára */}
          <path d="M 38 60 L 62 38 L 66 38" className="stroke-[2] strokeLinecap-round" />
          <line x1="50" y1="68" x2="50" y2="90" />
        </svg>
      ),
    },
    {
      id: 'earth-1',
      category: 'device',
      name: 'Ochranné uzemnění (Země / PE)',
      refCode: 'PE / MET',
      norm: 'ČSN EN 60617-2 / ČSN 33 2000-5-54 ed. 3',
      description: 'Základní prvek ochrany před úrazem el. proudem. Spojuje neživé části s uzemňovací soustavou budovy (základový zemnič FeZn).',
      examTip: 'Obvodová značka: Svislice končící vodorovnou čarou, pod ní dvě kratší rovnoběžné čáry (stromeček). Uzemnění transformovny nesmí přesáhnout 2 Ω, jednotlivé uzemnění sítě 15 Ω.',
      wiringDiagram: 'Připojení vodiče PE na hlavní ochrannou přípojnici MET (HOP) a základový zemnič',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-400 stroke-current fill-none stroke-[3] overflow-visible">
          <line x1="50" y1="15" x2="50" y2="50" />
          <line x1="22" y1="50" x2="78" y2="50" strokeWidth="4" />
          <line x1="32" y1="60" x2="68" y2="60" strokeWidth="3" />
          <line x1="42" y1="70" x2="58" y2="70" strokeWidth="2.5" />
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-400 stroke-current fill-none stroke-[2.5]">
          <line x1="50" y1="15" x2="50" y2="50" strokeWidth="3" />
          <line x1="20" y1="50" x2="80" y2="50" strokeWidth="3.5" />
          <line x1="30" y1="60" x2="70" y2="60" strokeWidth="2.8" />
          <line x1="40" y1="70" x2="60" y2="70" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 'box-1',
      category: 'device',
      name: 'Rozvodná krabice (Odbočná krabice)',
      refCode: 'XT',
      norm: 'ČSN EN 60617-11',
      description: 'Elektroinstalační krabice pod omítku (např. Acidurka nebo KU 68 s víčkem) sloužící pro odbočování a propojování kabelů pomocí svorek WAGO.',
      examTip: 'Půdorysná značka: Kolečko se 4 odbočnými čárkami do kříže (nebo plné černé kolečko). V moderních instalacích se krabice pod stropem nahrazují hlubokými krabicemi pod vypínači.',
      wiringDiagram: 'Propojení fází, nuláků a PE vodičů pomocí bezšroubových pružinových svorek WAGO',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-slate-300 stroke-current fill-none stroke-[3] overflow-visible">
          <circle cx="50" cy="50" r="16" />
          <circle cx="50" cy="50" r="6" className="fill-slate-300" />
          {/* 4 vývodní čárky na strany */}
          <line x1="50" y1="18" x2="50" y2="34" />
          <line x1="50" y1="66" x2="50" y2="82" />
          <line x1="18" y1="50" x2="34" y2="50" />
          <line x1="66" y1="50" x2="82" y2="50" />
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-slate-300 stroke-current fill-none stroke-[2.5]">
          <circle cx="50" cy="50" r="22" strokeDasharray="4,2" />
          <circle cx="38" cy="40" r="3" className="fill-amber-400 stroke-none" />
          <circle cx="62" cy="40" r="3" className="fill-sky-400 stroke-none" />
          <circle cx="50" cy="62" r="3" className="fill-emerald-400 stroke-none" />
          <text x="50" y="86" textAnchor="middle" className="fill-slate-400 stroke-none font-mono text-[10px]">WAGO</text>
        </svg>
      ),
    },
    {
      id: 'lamp-1',
      category: 'load',
      name: 'Svítidlo (všeobecná značka / žárovkové / LED)',
      refCode: 'EL1',
      norm: 'ČSN EN 60617-11',
      description: 'Základní normová značka světelného vývodu a svítidla v instalačních půdorysech a liniových schématech.',
      examTip: 'Kružnice s vepsaným křížem (úhlopříčky × protínající se pod úhlem 90° uvnitř kruhu). V půdorysech se umisťuje doprostřed místnosti.',
      wiringDiagram: 'Spínaná fáze (černá/hnědá) na patici svítidla; N (světle modrá) na závit; PE (zelenožlutá) na kovovou kostru',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-yellow-300 stroke-current fill-none stroke-[3]">
          <circle cx="50" cy="50" r="20" />
          <line x1="36" y1="36" x2="64" y2="64" />
          <line x1="64" y1="36" x2="36" y2="64" />
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-yellow-300 stroke-current fill-none stroke-[2.5]">
          <line x1="50" y1="10" x2="50" y2="30" />
          <circle cx="50" cy="50" r="20" />
          <line x1="36" y1="36" x2="64" y2="64" />
          <line x1="64" y1="36" x2="36" y2="64" />
          <line x1="50" y1="70" x2="50" y2="90" />
        </svg>
      ),
    },
    {
      id: 'fluor-1',
      category: 'load',
      name: 'Zářivkové svítidlo',
      refCode: 'EL2',
      norm: 'ČSN EN 60617-11',
      description: 'Lineární zářivkové nebo LED trubicové svítidlo. V půdorysech má tvar protáhlého tělesa s koncovými patkami.',
      examTip: 'Půdorysná značka: Úzká úsečka s kolmými koncovými čárkami na obou koncích (|———|).',
      wiringDiagram: 'Přívod 3×1.5 mm²; elektronický předřadník nebo LED driver',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-yellow-300 stroke-current fill-none stroke-[3]">
          <line x1="20" y1="50" x2="80" y2="50" strokeWidth="4" />
          <line x1="20" y1="36" x2="20" y2="64" strokeWidth="3" />
          <line x1="80" y1="36" x2="80" y2="64" strokeWidth="3" />
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-yellow-300 stroke-current fill-none stroke-[2.5]">
          <rect x="25" y="38" width="50" height="24" rx="2" />
          <line x1="10" y1="50" x2="25" y2="50" />
          <line x1="75" y1="50" x2="90" y2="50" />
          <text x="50" y="54" textAnchor="middle" className="fill-yellow-200 stroke-none font-mono text-[10px]">LED/T8</text>
        </svg>
      ),
    },
    {
      id: 'cont-1',
      category: 'device',
      name: 'Instalační stykač (cívka a kontakty)',
      refCode: 'KM1',
      norm: 'ČSN EN 61095 / ČSN EN 60617-7',
      description: 'Elektromagnetický spínač pro spínání větších výkonů (bojler na signál HDO, akumulační kamna, motory).',
      examTip: 'Cívka má svorky A1 a A2. Hlavní silové kontakty mají liché číslo nahoře (1, 3, 5) a sudé dole (2, 4, 6).',
      wiringDiagram: 'Ovládání: HDO signál nebo termostat na A1/A2; Silový obvod: L1/L2/L3 přes kontakty 1-2, 3-4, 5-6 k topným tělesům',
      installationSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-cyan-400 stroke-current fill-none stroke-[2.5]">
          <rect x="25" y="20" width="50" height="60" rx="4" />
          <text x="50" y="48" textAnchor="middle" className="fill-cyan-300 stroke-none font-mono text-xs font-bold">KM</text>
          <text x="50" y="64" textAnchor="middle" className="fill-slate-400 stroke-none font-mono text-[9px]">A1-A2</text>
        </svg>
      ),
      schematicSvg: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 text-cyan-400 stroke-current fill-none stroke-[2.5]">
          {/* Obdélník cívky stykače */}
          <rect x="30" y="30" width="40" height="40" rx="2" className="stroke-[2.5]" />
          <line x1="50" y1="10" x2="50" y2="30" />
          <line x1="50" y1="70" x2="50" y2="90" />
          <text x="50" y="24" textAnchor="middle" className="fill-cyan-300 stroke-none font-mono text-[9px] font-bold">A1</text>
          <text x="50" y="85" textAnchor="middle" className="fill-cyan-300 stroke-none font-mono text-[9px] font-bold">A2</text>
          <line x1="30" y1="30" x2="70" y2="70" className="stroke-slate-600 stroke-[1.5]" />
          <text x="42" y="54" className="fill-white stroke-none font-mono text-xs font-bold">KM</text>
        </svg>
      ),
    },
  ];

  const filteredSymbols =
    selectedSymbolCategory === 'all'
      ? SYMBOLS
      : SYMBOLS.filter((s) => s.category === selectedSymbolCategory);

  const filteredStandardSymbols = STANDARD_SYMBOLS.filter((sym) => {
    const matchesCat = standardCategory === 'all' || sym.category === standardCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      sym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sym.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sym.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sym.norm.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl my-6">
      {/* Horní hlavička s přepínači */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-amber-400 tracking-wider">
              Elektrotechnické značky používané ve schématech dle ČSN EN 60617 (Elektromateriál)
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              Oficiální technické značky a schémata rozvaděčů 1:1
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
            onClick={() => setActiveTab('ladder')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'ladder'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Liniové schéma zapojení
          </button>
          <button
            onClick={() => setActiveTab('floorplan')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'floorplan'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Instalační půdorys (Situace)
          </button>
        </div>
      </div>

      {/* ZÁLOŽKA 1: ATLAS ZNAČEK (Standard 1:1 dle ČSN EN 60617 a Elektromateriál.cz) */}
      {activeTab === 'symbols' && (
        <div className="p-4 sm:p-6 space-y-4">
          {/* Horní ovládací lišta: Informace + Přepínač režimu */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-mono font-bold">
                  ČSN EN 60617 • Elektromateriál.cz (1:1)
                </span>
                <span className="text-xs text-slate-400">
                  {catalogMode === 'standard'
                    ? `Zobrazeno ${filteredStandardSymbols.length} z ${STANDARD_SYMBOLS.length} oficiálních elektrotechnických značek`
                    : `Srovnání: Půdorysná instalační značka vs. Obvodová schématická značka`}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-extrabold text-slate-100 mt-1">
                Elektrotechnické značky používané ve schématech a půdorysech
              </h4>
            </div>

            {/* Přepínač režimu katalogu */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs self-start shrink-0">
              <button
                onClick={() => setCatalogMode('standard')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  catalogMode === 'standard'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Oficiální katalog ({STANDARD_SYMBOLS.length})
              </button>
              <button
                onClick={() => setCatalogMode('dual')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  catalogMode === 'dual'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Půdorys vs. Schéma (1:1)
              </button>
            </div>
          </div>

          {/* REŽIM 1: OFICIÁLNÍ KATALOG ELEKTROMATERIÁL.CZ (1:1 NORMU) */}
          {catalogMode === 'standard' && (
            <div className="space-y-4">
              {/* Vyhledávací pole a filtry */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Hledat značku (např. spínač č. 6, jistič, chránič, zásuvka, stykač, uzemnění)..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                      title="Vymazat hledání"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {standardCategory !== 'all' && (
                  <button
                    onClick={() => setStandardCategory('all')}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold self-start sm:self-auto transition-colors"
                  >
                    Zobrazit vše ({STANDARD_SYMBOLS.length})
                  </button>
                )}
              </div>

              {/* Kategorie z katalogu Elektromateriál.cz */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                <button
                  onClick={() => setStandardCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                    standardCategory === 'all'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Vše ({STANDARD_SYMBOLS.length})
                </button>
                {SYMBOL_CATEGORIES.map((cat) => {
                  const count = STANDARD_SYMBOLS.filter((s) => s.category === cat).length;
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
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Mřížka 1:1 normovaných značek */}
              {filteredStandardSymbols.length === 0 ? (
                <div className="p-8 text-center bg-slate-950 rounded-xl border border-slate-800 text-slate-400 text-xs">
                  Pro zadané hledání nebyla nalezena žádná značka. Zkuste vymazat filtr nebo hledat jiné slovo (např. &bdquo;vypínač&ldquo;, &bdquo;svítidlo&ldquo;, &bdquo;jistič&ldquo;).
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
                      {/* Bílý rámeček pro CAD černobílé schéma 1:1 */}
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

          {/* REŽIM 2: SROVNÁNÍ PŮDORYS VS. SCHÉMA (1:1) */}
          {catalogMode === 'dual' && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-slate-800">
                <div className="text-xs text-slate-400">
                  Srovnání obou podob prvku: <strong>Půdorysná instalační značka</strong> (zeď ve stavebním výkresu) vs. <strong>Obvodová značka</strong> (liniové schéma a rozvaděč).
                </div>

                {/* Přepínač zobrazení: Obě | Jen půdorys | Jen schéma */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs self-start shrink-0">
                  <span className="text-[10px] text-slate-500 uppercase font-mono px-1">Zobrazit:</span>
                  <button
                    onClick={() => setSymbolViewMode('both')}
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      symbolViewMode === 'both' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Obě (1:1 srovnání)
                  </button>
                  <button
                    onClick={() => setSymbolViewMode('installation')}
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      symbolViewMode === 'installation' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Do půdorysu (zeď)
                  </button>
                  <button
                    onClick={() => setSymbolViewMode('schematic')}
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      symbolViewMode === 'schematic' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Do schématu (kontakt)
                  </button>
                </div>
              </div>

              {/* Filtrování kategorií duálního zobrazení */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedSymbolCategory('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedSymbolCategory === 'all'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  Všechny ({SYMBOLS.length})
                </button>
                <button
                  onClick={() => setSelectedSymbolCategory('switch')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedSymbolCategory === 'switch'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  Spínače a ovladače (1, 2, 5, 6, 7, 1/0)
                </button>
                <button
                  onClick={() => setSelectedSymbolCategory('socket')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedSymbolCategory === 'socket'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  Zásuvky (230 V, dvojitá, IP44, 400 V)
                </button>
                <button
                  onClick={() => setSelectedSymbolCategory('device')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedSymbolCategory === 'device'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  Rozvaděč (Jistič, RCD, SPD, Pojistka, Zem)
                </button>
                <button
                  onClick={() => setSelectedSymbolCategory('load')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedSymbolCategory === 'load'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  Svítidla a zátěže
                </button>
              </div>

              {/* Mřížka značek duálního zobrazení */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredSymbols.map((item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      setInspectedElement({
                        title: item.name,
                        code: item.refCode,
                        description: item.description,
                        norm: item.norm,
                        wiringDiagram: item.wiringDiagram,
                        examTip: item.examTip,
                        installationSvg: item.installationSvg,
                        schematicSvg: item.schematicSvg,
                      })
                    }
                    className="bg-slate-950/80 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/70 rounded-xl p-3.5 flex flex-col justify-between cursor-pointer transition-all hover:scale-[1.01] shadow-sm group"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                      <div>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-400 mr-1.5">
                          {item.refCode}
                        </span>
                        <span className="text-xs font-bold text-slate-200 group-hover:text-amber-300">
                          {item.name}
                        </span>
                      </div>
                      <ZoomIn className="w-4 h-4 text-slate-500 group-hover:text-amber-400 shrink-0 transition-colors" />
                    </div>

                    <div className="py-3 px-2 flex items-center justify-around gap-2 bg-slate-900/40 rounded-lg my-2 border border-slate-850">
                      {(symbolViewMode === 'both' || symbolViewMode === 'installation') && (
                        <div className="flex flex-col items-center">
                          <div className="p-1">{item.installationSvg}</div>
                          <span className="text-[10px] font-mono text-slate-400 mt-1">Půdorys (Zeď)</span>
                        </div>
                      )}

                      {symbolViewMode === 'both' && (
                        <div className="h-12 w-px bg-slate-800" />
                      )}

                      {(symbolViewMode === 'both' || symbolViewMode === 'schematic') && (
                        <div className="flex flex-col items-center">
                          <div className="p-1">{item.schematicSvg}</div>
                          <span className="text-[10px] font-mono text-slate-400 mt-1">Obvod (Kontakt)</span>
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ZÁLOŽKA 2: JEDNOPÓLOVÉ SCHÉMA BYTOVÉHO ROZVADĚČE (Technický výkres dle ČSN EN 61439-3) */}
      {activeTab === 'single-line' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              💡 <strong>Jednopólové schéma rozvaděče (ČSN EN 61439-3):</strong> Vedení je kresleno jednou čarou, šikmé čárky <code>/3</code> a <code>/5</code> udávají počet žil kabelu.
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
                    description: 'Slouží k bezpečnému odpojení celé bytové rozvodnice jedním hmatem v případě havárie nebo údržby.',
                    norm: 'ČSN EN 61439-3, ČSN 33 2130 ed. 3',
                    wiringDiagram: 'Přívod z elektroměru na svorky 1, 3, 5; odvod do rozvaděče ze svorek 2, 4, 6',
                    examTip: 'Každý domovní rozvaděč musí mít hlavní vypínač! U zkoušky nezapomeň, že vypínač nesmí nahrazovat proudový chránič.',
                    installationSvg: (
                      <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[2.5]">
                        <rect x="25" y="20" width="50" height="60" rx="4" />
                        <text x="50" y="55" textAnchor="middle" className="fill-white stroke-none font-mono text-sm font-bold">QM1</text>
                      </svg>
                    ),
                    schematicSvg: (
                      <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[2.5]">
                        <line x1="30" y1="20" x2="30" y2="40" />
                        <line x1="30" y1="40" x2="20" y2="60" strokeWidth="3" />
                        <line x1="30" y1="60" x2="30" y2="80" />
                        <line x1="50" y1="20" x2="50" y2="40" />
                        <line x1="50" y1="40" x2="40" y2="60" strokeWidth="3" />
                        <line x1="50" y1="60" x2="50" y2="80" />
                        <line x1="70" y1="20" x2="70" y2="40" />
                        <line x1="70" y1="40" x2="60" y2="60" strokeWidth="3" />
                        <line x1="70" y1="60" x2="70" y2="80" />
                        <line x1="20" y1="50" x2="60" y2="50" strokeDasharray="3,3" className="stroke-slate-500" />
                      </svg>
                    ),
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
                    description: 'Chrání elektroinstalaci a spotřebiče před atmosférickým i spínacím přepětím v síti.',
                    norm: 'ČSN 33 2000-5-534, ČSN EN 61643-11',
                    wiringDiagram: 'Paralelně mezi L1, L2, L3 a zemnící svorkovnici PE',
                    examTip: 'Délka přívodních vodičů k SPD nesmí přesáhnout 0,5 m! Připojuje se na zemnící svorkovnici PE / MET.',
                    installationSvg: (
                      <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[2.5]">
                        <rect x="25" y="20" width="50" height="60" rx="4" />
                        <text x="50" y="55" textAnchor="middle" className="fill-amber-300 stroke-none font-mono text-xs font-bold">SPD</text>
                      </svg>
                    ),
                    schematicSvg: (
                      <svg viewBox="0 0 100 100" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[2.5]">
                        <line x1="50" y1="15" x2="50" y2="35" />
                        <rect x="35" y="35" width="30" height="35" rx="2" />
                        <path d="M 38 62 L 62 42 L 65 42" strokeWidth="2" />
                        <line x1="50" y1="70" x2="50" y2="90" />
                      </svg>
                    ),
                  })
                }
              />
              <text x="160" y="226" textAnchor="middle" className="fill-amber-300 font-mono font-bold text-xs pointer-events-none">
                FS1
              </text>
              <text x="160" y="238" textAnchor="middle" className="fill-slate-400 font-mono text-[9px] pointer-events-none">
                T1+T2
              </text>
              <line x1="160" y1="245" x2="160" y2="275" className="stroke-emerald-400 stroke-[2] stroke-dasharray-[3,3]" />
              <text x="165" y="270" className="fill-emerald-400 font-mono text-[10px]">na PE</text>

              {/* Proudový chránič RCD QF1 (Centrální) */}
              <line x1="80" y1="180" x2="80" y2="210" className="stroke-amber-400 stroke-[3]" />
              <rect
                x="60"
                y="210"
                width="40"
                height="50"
                rx="4"
                className="fill-slate-900 stroke-emerald-400 stroke-[2] cursor-pointer hover:stroke-emerald-300"
                onClick={() =>
                  setInspectedElement({
                    title: 'QF1 - Proudový chránič (4P 40 A / 30 mA, typ A)',
                    code: 'QF1 dle ČSN EN 81346-2',
                    description: 'Centrální proudový chránič pro skupinu zásuvkových a světelných obvodů. Vybavovací proud IΔn = 30 mA.',
                    norm: 'ČSN 33 2000-4-41 ed. 3',
                    wiringDiagram: 'Prochází jím L1, L2, L3 i N. Vodič PE chráničem nesmí procházet!',
                    examTip: 'Od roku 2019 musí být VŠECHNY běžné zásuvky do 32 A a světelné obvody v bytech chráněny chráničem 30 mA!',
                    installationSvg: (
                      <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-400 stroke-current fill-none stroke-[2.5]">
                        <rect x="20" y="20" width="60" height="60" rx="4" />
                        <text x="50" y="52" textAnchor="middle" className="fill-emerald-300 stroke-none font-mono text-xs font-bold">RCD 4P</text>
                      </svg>
                    ),
                    schematicSvg: (
                      <svg viewBox="0 0 100 100" className="w-16 h-16 text-emerald-400 stroke-current fill-none stroke-[2.5]">
                        <line x1="35" y1="15" x2="35" y2="85" />
                        <line x1="65" y1="15" x2="65" y2="85" />
                        <ellipse cx="50" cy="50" rx="25" ry="8" />
                      </svg>
                    ),
                  })
                }
              />
              <text x="80" y="236" textAnchor="middle" className="fill-emerald-300 font-mono font-bold text-xs pointer-events-none">
                QF1
              </text>
              <text x="80" y="250" textAnchor="middle" className="fill-slate-300 text-[10px] pointer-events-none">
                30 mA
              </text>
              <text x="110" y="230" className="fill-slate-300 font-mono text-[11px]">40 A / 4P</text>
              <text x="110" y="244" className="fill-emerald-400 font-mono text-[10px]">IΔn = 0,03 A (Typ A)</text>

              {/* Hlavní rozvodná fázová lišta za chráničem */}
              <line x1="80" y1="260" x2="80" y2="300" className="stroke-emerald-400 stroke-[3]" />
              <line x1="80" y1="300" x2="860" y2="300" className="stroke-amber-400 stroke-[4]" />
              <text x="870" y="304" className="fill-amber-400 font-mono text-[10px] font-bold">L1, L2, L3</text>

              {/* Vývody FA1 až FA6 */}
              {/* FA1: Světla */}
              <g className="cursor-pointer group">
                <line x1="200" y1="300" x2="200" y2="330" className="stroke-amber-400 stroke-[2]" />
                <rect x="185" y="330" width="30" height="35" rx="3" className="fill-slate-900 stroke-emerald-400 stroke-[1.5] group-hover:stroke-yellow-300" />
                <text x="200" y="352" textAnchor="middle" className="fill-white font-mono text-xs font-bold">FA1</text>
                <line x1="200" y1="365" x2="200" y2="400" className="stroke-amber-400 stroke-[2]" />
                <line x1="194" y1="382" x2="206" y2="376" className="stroke-amber-400 stroke-[1.5]" />
                <text x="210" y="382" className="fill-amber-400 font-mono text-[10px]">/3</text>
                <text x="200" y="420" textAnchor="middle" className="fill-slate-300 font-mono text-[11px] font-bold">B10/1</text>
                <text x="200" y="435" textAnchor="middle" className="fill-slate-400 text-[10px]">Světla pokoje</text>
                <text x="200" y="448" textAnchor="middle" className="fill-slate-500 font-mono text-[9px]">CYKY-J 3×1.5</text>
              </g>

              {/* FA2: Zásuvky obývák */}
              <g className="cursor-pointer group">
                <line x1="330" y1="300" x2="330" y2="330" className="stroke-amber-400 stroke-[2]" />
                <rect x="315" y="330" width="30" height="35" rx="3" className="fill-slate-900 stroke-emerald-400 stroke-[1.5] group-hover:stroke-yellow-300" />
                <text x="330" y="352" textAnchor="middle" className="fill-white font-mono text-xs font-bold">FA2</text>
                <line x1="330" y1="365" x2="330" y2="400" className="stroke-amber-400 stroke-[2]" />
                <line x1="324" y1="382" x2="336" y2="376" className="stroke-amber-400 stroke-[1.5]" />
                <text x="340" y="382" className="fill-amber-400 font-mono text-[10px]">/3</text>
                <text x="330" y="420" textAnchor="middle" className="fill-slate-300 font-mono text-[11px] font-bold">B16/1</text>
                <text x="330" y="435" textAnchor="middle" className="fill-slate-400 text-[10px]">Zásuvky pokoje</text>
                <text x="330" y="448" textAnchor="middle" className="fill-slate-500 font-mono text-[9px]">CYKY-J 3×2.5</text>
              </g>

              {/* FA3: Kuchyň linka */}
              <g className="cursor-pointer group">
                <line x1="460" y1="300" x2="460" y2="330" className="stroke-amber-400 stroke-[2]" />
                <rect x="445" y="330" width="30" height="35" rx="3" className="fill-slate-900 stroke-emerald-400 stroke-[1.5] group-hover:stroke-yellow-300" />
                <text x="460" y="352" textAnchor="middle" className="fill-white font-mono text-xs font-bold">FA3</text>
                <line x1="460" y1="365" x2="460" y2="400" className="stroke-amber-400 stroke-[2]" />
                <line x1="454" y1="382" x2="466" y2="376" className="stroke-amber-400 stroke-[1.5]" />
                <text x="470" y="382" className="fill-amber-400 font-mono text-[10px]">/3</text>
                <text x="460" y="420" textAnchor="middle" className="fill-slate-300 font-mono text-[11px] font-bold">B16/1</text>
                <text x="460" y="435" textAnchor="middle" className="fill-slate-400 text-[10px]">Kuchyň linka</text>
                <text x="460" y="448" textAnchor="middle" className="fill-slate-500 font-mono text-[9px]">CYKY-J 3×2.5</text>
              </g>

              {/* FA4: Pračka */}
              <g className="cursor-pointer group">
                <line x1="590" y1="300" x2="590" y2="330" className="stroke-amber-400 stroke-[2]" />
                <rect x="575" y="330" width="30" height="35" rx="3" className="fill-slate-900 stroke-emerald-400 stroke-[1.5] group-hover:stroke-yellow-300" />
                <text x="590" y="352" textAnchor="middle" className="fill-white font-mono text-xs font-bold">FA4</text>
                <line x1="590" y1="365" x2="590" y2="400" className="stroke-amber-400 stroke-[2]" />
                <line x1="584" y1="382" x2="596" y2="376" className="stroke-amber-400 stroke-[1.5]" />
                <text x="600" y="382" className="fill-amber-400 font-mono text-[10px]">/3</text>
                <text x="590" y="420" textAnchor="middle" className="fill-slate-300 font-mono text-[11px] font-bold">B16/1</text>
                <text x="590" y="435" textAnchor="middle" className="fill-slate-400 text-[10px]">Pračka (2 kW)</text>
                <text x="590" y="448" textAnchor="middle" className="fill-slate-500 font-mono text-[9px]">CYKY-J 3×2.5</text>
              </g>

              {/* FA5: Varná deska 400V */}
              <g className="cursor-pointer group">
                <line x1="720" y1="300" x2="720" y2="330" className="stroke-amber-400 stroke-[2]" />
                <rect x="702" y="330" width="36" height="35" rx="3" className="fill-slate-900 stroke-rose-400 stroke-[2] group-hover:stroke-yellow-300" />
                <text x="720" y="352" textAnchor="middle" className="fill-white font-mono text-xs font-bold">FA5</text>
                <line x1="720" y1="365" x2="720" y2="400" className="stroke-rose-400 stroke-[2]" />
                <line x1="712" y1="382" x2="728" y2="374" className="stroke-rose-400 stroke-[2]" />
                <text x="732" y="382" className="fill-rose-400 font-mono text-[10px] font-bold">/5</text>
                <text x="720" y="420" textAnchor="middle" className="fill-slate-300 font-mono text-[11px] font-bold">B16/3</text>
                <text x="720" y="435" textAnchor="middle" className="fill-slate-400 text-[10px]">Varná deska 400V</text>
                <text x="720" y="448" textAnchor="middle" className="fill-slate-500 font-mono text-[9px]">CYKY-J 5×2.5</text>
              </g>

              {/* QF2: RCBO Koupelna */}
              <g className="cursor-pointer group">
                <line x1="840" y1="300" x2="840" y2="330" className="stroke-amber-400 stroke-[2]" />
                <rect x="822" y="330" width="36" height="35" rx="3" className="fill-slate-900 stroke-cyan-400 stroke-[2] group-hover:stroke-yellow-300" />
                <text x="840" y="352" textAnchor="middle" className="fill-white font-mono text-xs font-bold">QF2</text>
                <line x1="840" y1="365" x2="840" y2="400" className="stroke-cyan-400 stroke-[2]" />
                <line x1="834" y1="382" x2="846" y2="376" className="stroke-cyan-400 stroke-[1.5]" />
                <text x="850" y="382" className="fill-cyan-400 font-mono text-[10px]">/3</text>
                <text x="840" y="420" textAnchor="middle" className="fill-slate-300 font-mono text-[10px] font-bold">RCBO 16A</text>
                <text x="840" y="435" textAnchor="middle" className="fill-slate-400 text-[10px]">Koupelna 30mA</text>
                <text x="840" y="448" textAnchor="middle" className="fill-slate-500 font-mono text-[9px]">CYKY-J 3×2.5</text>
              </g>
            </svg>
          </div>
        </div>
      )}

      {/* ZÁLOŽKA 3: LINIOVÉ SCHÉMA ZAPOJENÍ */}
      {activeTab === 'ladder' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="text-xs text-slate-400">
            💡 <strong>Liniové schéma ovládání osvětlení impulzním relé:</strong> Ovládací obvod s libovolným počtem paralelních tlačítek SB1–SB3 spíná cívku relé KA1, silový kontakt spíná svítidla.
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-6 overflow-x-auto shadow-inner">
            <svg viewBox="0 0 880 340" className="w-full min-w-[720px] h-auto select-none font-sans text-xs">
              <line x1="40" y1="40" x2="840" y2="40" className="stroke-amber-400 stroke-[3]" />
              <text x="40" y="28" className="fill-amber-400 font-mono font-bold text-sm">L (Fáze 230 V AC přes jistič FA1 10A)</text>

              <line x1="40" y1="300" x2="840" y2="300" className="stroke-sky-400 stroke-[3]" />
              <text x="40" y="325" className="fill-sky-400 font-mono font-bold text-sm">N (Střední nulový vodič)</text>

              {/* Tlačítka SB1, SB2, SB3 */}
              <line x1="120" y1="40" x2="120" y2="80" className="stroke-amber-400 stroke-[2]" />
              <circle cx="120" cy="80" r="3" className="fill-amber-400" />
              <line x1="120" y1="90" x2="108" y2="108" className="stroke-amber-400 stroke-[2.5]" />
              <circle cx="120" cy="115" r="3" className="fill-amber-400" />
              <line x1="120" y1="115" x2="120" y2="180" className="stroke-amber-400 stroke-[2]" />
              <text x="135" y="105" className="fill-white font-mono text-xs font-bold">SB1 (1/0)</text>

              <line x1="120" y1="80" x2="220" y2="80" className="stroke-amber-400 stroke-[2]" />
              <line x1="220" y1="80" x2="220" y2="90" className="stroke-amber-400 stroke-[2]" />
              <circle cx="220" cy="90" r="3" className="fill-amber-400" />
              <line x1="220" y1="90" x2="208" y2="108" className="stroke-amber-400 stroke-[2.5]" />
              <circle cx="220" cy="115" r="3" className="fill-amber-400" />
              <line x1="220" y1="115" x2="220" y2="140" className="stroke-amber-400 stroke-[2]" />
              <line x1="220" y1="140" x2="120" y2="140" className="stroke-amber-400 stroke-[2]" />
              <circle cx="120" cy="140" r="3" className="fill-amber-400" />
              <text x="235" y="105" className="fill-white font-mono text-xs font-bold">SB2 (1/0)</text>

              <line x1="220" y1="80" x2="320" y2="80" className="stroke-amber-400 stroke-[2]" />
              <line x1="320" y1="80" x2="320" y2="90" className="stroke-amber-400 stroke-[2]" />
              <circle cx="320" cy="90" r="3" className="fill-amber-400" />
              <line x1="320" y1="90" x2="308" y2="108" className="stroke-amber-400 stroke-[2.5]" />
              <circle cx="320" cy="115" r="3" className="fill-amber-400" />
              <line x1="320" y1="115" x2="320" y2="140" className="stroke-amber-400 stroke-[2]" />
              <line x1="320" y1="140" x2="220" y2="140" className="stroke-amber-400 stroke-[2]" />
              <text x="335" y="105" className="fill-white font-mono text-xs font-bold">SB3 (1/0)</text>

              {/* Cívka relé KA1 */}
              <rect x="100" y="180" width="40" height="50" rx="3" className="fill-slate-900 stroke-cyan-400 stroke-[2]" />
              <text x="120" y="205" textAnchor="middle" className="fill-cyan-300 font-mono text-xs font-bold">KA1</text>
              <text x="120" y="220" textAnchor="middle" className="fill-slate-400 font-mono text-[10px]">A1-A2</text>
              <line x1="120" y1="230" x2="120" y2="300" className="stroke-sky-400 stroke-[2]" />
              <circle cx="120" cy="300" r="3" className="fill-sky-400" />

              <line x1="450" y1="50" x2="450" y2="290" className="stroke-slate-800 stroke-[2] stroke-dasharray-[4,4]" />

              {/* Silový kontakt KA1 */}
              <line x1="560" y1="40" x2="560" y2="90" className="stroke-amber-400 stroke-[2]" />
              <circle cx="560" cy="90" r="3" className="fill-amber-400" />
              <line x1="560" y1="90" x2="548" y2="125" className="stroke-amber-400 stroke-[2.5]" />
              <circle cx="560" cy="130" r="3" className="fill-amber-400" />
              <text x="575" y="105" className="fill-cyan-300 font-mono text-xs font-bold">KA1 (1-2)</text>

              {/* Svítidla EL1 a EL2 */}
              <line x1="560" y1="130" x2="560" y2="180" className="stroke-amber-400 stroke-[2]" />
              <circle cx="560" cy="180" r="3" className="fill-amber-400" />
              <circle cx="560" cy="220" r="16" className="fill-slate-900 stroke-yellow-400 stroke-[2.5]" />
              <line x1="548" y1="208" x2="572" y2="232" className="stroke-yellow-400 stroke-[2]" />
              <line x1="572" y1="208" x2="548" y2="232" className="stroke-yellow-400 stroke-[2]" />
              <text x="585" y="224" className="fill-white font-mono text-xs font-bold">EL1</text>
              <line x1="560" y1="236" x2="560" y2="300" className="stroke-sky-400 stroke-[2]" />
              <circle cx="560" cy="300" r="3" className="fill-sky-400" />

              <line x1="560" y1="180" x2="700" y2="180" className="stroke-amber-400 stroke-[2]" />
              <line x1="700" y1="180" x2="700" y2="204" className="stroke-amber-400 stroke-[2]" />
              <circle cx="700" cy="220" r="16" className="fill-slate-900 stroke-yellow-400 stroke-[2.5]" />
              <line x1="688" y1="208" x2="712" y2="232" className="stroke-yellow-400 stroke-[2]" />
              <line x1="712" y1="208" x2="688" y2="232" className="stroke-yellow-400 stroke-[2]" />
              <text x="725" y="224" className="fill-white font-mono text-xs font-bold">EL2</text>
              <line x1="700" y1="236" x2="700" y2="260" className="stroke-sky-400 stroke-[2]" />
              <line x1="700" y1="260" x2="560" y2="260" className="stroke-sky-400 stroke-[2]" />
              <circle cx="560" cy="260" r="3" className="fill-sky-400" />
            </svg>
          </div>
        </div>
      )}

      {/* ZÁLOŽKA 4: INSTALAČNÍ PŮDORYS (SITUACE) */}
      {activeTab === 'floorplan' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="text-xs text-slate-400">
            💡 <strong>Instalační situace (půdorys):</strong> Rozmístění spínačů u dveří, zásuvek na stěnách a svítidel na stropě dle ČSN 33 2130 ed. 3.
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-6 overflow-x-auto shadow-inner">
            <svg viewBox="0 0 760 380" className="w-full min-w-[620px] h-auto select-none font-sans text-xs">
              <rect x="80" y="40" width="600" height="300" className="fill-slate-900/50 stroke-slate-500 stroke-[8]" />
              <text x="100" y="70" className="fill-slate-400 font-mono font-bold text-xs uppercase tracking-wider">
                Místnost 1.02 - Obývací pokoj (24,5 m²)
              </text>

              {/* Dveře */}
              <rect x="140" y="336" width="60" height="8" className="fill-slate-950 stroke-none" />
              <path d="M 140 340 A 60 60 0 0 1 200 280" className="stroke-slate-600 stroke-[1.5] stroke-dasharray-[3,3] fill-none" />
              <line x1="140" y1="340" x2="200" y2="280" className="stroke-amber-400 stroke-[2]" />
              <text x="210" y="325" className="fill-slate-500 text-[10px]">Dveře 80/197</text>

              {/* Spínač 6 u dveří */}
              <circle cx="215" cy="328" r="8" className="fill-slate-900 stroke-amber-400 stroke-[2]" />
              <line x1="215" y1="336" x2="215" y2="310" className="stroke-amber-400 stroke-[2]" />
              <line x1="215" y1="310" x2="223" y2="310" className="stroke-amber-400 stroke-[2]" />
              <line x1="215" y1="336" x2="207" y2="336" className="stroke-amber-400 stroke-[2]" />
              <text x="230" y="328" className="fill-amber-400 font-mono font-bold text-xs">SA1 (č. 6)</text>
              <text x="230" y="340" className="fill-slate-400 text-[10px]">v = 105 cm</text>

              {/* Spínač 6 u terasy */}
              <circle cx="580" cy="52" r="8" className="fill-slate-900 stroke-amber-400 stroke-[2]" />
              <line x1="580" y1="60" x2="580" y2="34" className="stroke-amber-400 stroke-[2]" />
              <line x1="580" y1="34" x2="588" y2="34" className="stroke-amber-400 stroke-[2]" />
              <line x1="580" y1="60" x2="572" y2="60" className="stroke-amber-400 stroke-[2]" />
              <text x="595" y="55" className="fill-amber-400 font-mono font-bold text-xs">SA2 (č. 6)</text>

              {/* Svítidlo */}
              <circle cx="380" cy="190" r="16" className="fill-slate-900 stroke-yellow-400 stroke-[3]" />
              <line x1="368" y1="178" x2="392" y2="202" className="stroke-yellow-400 stroke-[2.5]" />
              <line x1="392" y1="178" x2="368" y2="202" className="stroke-yellow-400 stroke-[2.5]" />
              <text x="380" y="222" textAnchor="middle" className="fill-white font-mono font-bold text-xs">EL1 (LED 45W)</text>

              {/* Trasy kabelů */}
              <path d="M 215 328 L 215 190 L 364 190" className="stroke-amber-400/80 stroke-[2] stroke-dasharray-[4,4] fill-none" />
              <path d="M 396 190 L 580 190 L 580 60" className="stroke-amber-400/80 stroke-[2] stroke-dasharray-[4,4] fill-none" />

              {/* Zásuvky */}
              <path d="M 88 140 A 10 10 0 0 1 88 160" className="stroke-sky-400 stroke-[2.5] fill-none" />
              <line x1="88" y1="150" x2="98" y2="150" className="stroke-sky-400 stroke-[2]" />
              <text x="104" y="154" className="fill-sky-400 font-mono text-[11px] font-bold">2× XD1 (v = 30 cm)</text>

              <path d="M 672 170 A 10 10 0 0 0 672 190" className="stroke-sky-400 stroke-[2.5] fill-none" />
              <line x1="672" y1="180" x2="662" y2="180" className="stroke-sky-400 stroke-[2]" />
              <text x="590" y="184" className="fill-sky-400 font-mono text-[11px] font-bold">2× XD2 (TV sestava)</text>
            </svg>
          </div>
        </div>
      )}

      {/* DETAILNÍ INSPEKČNÍ PANEL VYBRANÉ ZNAČKY */}
      {inspectedElement && (
        <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-t-2 border-amber-500 shadow-2xl animate-fadeIn">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-5">
            {/* Vizuální náhled značky 1:1 */}
            {inspectedElement.image ? (
              <div className="flex flex-col items-center bg-white p-3 sm:p-4 rounded-xl border border-slate-300 shadow-xl shrink-0 self-center lg:self-start">
                <span className="text-[10px] font-mono text-slate-500 mb-1.5 uppercase font-bold">
                  ČSN EN 60617 (1:1 standard)
                </span>
                <img
                  src={inspectedElement.image}
                  alt={inspectedElement.title}
                  className="h-20 max-w-[160px] object-contain"
                />
              </div>
            ) : (
              <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 shrink-0 self-center lg:self-start">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">
                    Do půdorysu (zeď)
                  </span>
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    {inspectedElement.installationSvg}
                  </div>
                </div>

                <div className="h-16 w-px bg-slate-800" />

                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono text-slate-400 mb-1.5 uppercase font-bold">
                    Do schématu (kontakt)
                  </span>
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    {inspectedElement.schematicSvg}
                  </div>
                </div>
              </div>
            )}

            {/* Informace a popis */}
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {inspectedElement.code && (
                  <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                    {inspectedElement.code}
                  </span>
                )}
                {inspectedElement.category && (
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 text-xs font-mono font-semibold">
                    {inspectedElement.category}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono">
                  {inspectedElement.norm}
                </span>
                <h4 className="text-base sm:text-lg font-extrabold text-white">
                  {inspectedElement.title}
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {inspectedElement.description}
              </p>

              {inspectedElement.wiringDiagram && (
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300">
                  <strong className="text-amber-400">Zapojení svorek / funkce:</strong> {inspectedElement.wiringDiagram}
                </div>
              )}

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5 mt-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 uppercase tracking-wide font-extrabold">Co vyžaduje zkušební komisař u státní zkoušky:</strong>
                  <p className="mt-0.5 leading-relaxed text-amber-100">{inspectedElement.examTip}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setInspectedElement(null)}
              className="text-xs px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shrink-0 font-bold self-end lg:self-start"
            >
              Zavřít detail
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
