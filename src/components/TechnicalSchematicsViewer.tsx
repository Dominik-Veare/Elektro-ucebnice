import React, { useState } from 'react';
import {
  FileText,
  AlertTriangle,
  ZoomIn,
} from 'lucide-react';

interface TechnicalSchematicsViewerProps {
  initialTab?: 'single-line' | 'ladder' | 'floorplan' | 'symbols';
}

export const TechnicalSchematicsViewer: React.FC<TechnicalSchematicsViewerProps> = ({
  initialTab = 'single-line',
}) => {
  const [activeTab, setActiveTab] = useState<'single-line' | 'ladder' | 'floorplan' | 'symbols'>(
    initialTab
  );
  const [selectedSymbolCategory, setSelectedSymbolCategory] = useState<string>('all');
  const [inspectedElement, setInspectedElement] = useState<{
    title: string;
    code: string;
    description: string;
    norm: string;
    examTip: string;
  } | null>(null);

  // Seznam normovaných značek ČSN EN 60617 pro interaktivní atlas
  const SYMBOLS = [
    {
      id: 'sw-1',
      category: 'switch',
      name: 'Spínač č. 1 (Jednopólový vypínač)',
      refCode: 'SA',
      norm: 'ČSN EN 60617-11 / ČSN 33 2130',
      description: 'Základní spínač s jedním spínacím kontaktem. Používá se pro ovládání jednoho světelného okruhu z jednoho místa.',
      examTip: 'Kruh s jednou čárkou a jedním praporkem (háčkem) na konci. Spíná výhradně fázový vodič (L)!',
      svg: (
        <svg viewBox="0 0 80 80" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[3]">
          <circle cx="40" cy="40" r="14" />
          <line x1="40" y1="26" x2="40" y2="10" />
          <line x1="40" y1="10" x2="52" y2="10" />
        </svg>
      ),
      wiringDiagram: 'L přívod → svorka L → [kontakt] → svorka 1 → svítidlo → N',
    },
    {
      id: 'sw-2',
      category: 'switch',
      name: 'Spínač č. 2 (Dvoupólový spínač)',
      refCode: 'SA',
      norm: 'ČSN EN 60617-11',
      description: 'Současně spíná nebo rozpíná dva nezávislé póly (obvykle fázi L i nulový vodič N). Použití ve vlhku, koupelnách nebo u bojlerů.',
      examTip: 'Značka má u praporku dvě souběžné příčné čárky, což značí 2 póly. Rozpíná L i N současně.',
      svg: (
        <svg viewBox="0 0 80 80" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[3]">
          <circle cx="40" cy="40" r="14" />
          <line x1="40" y1="26" x2="40" y2="10" />
          <line x1="40" y1="10" x2="52" y2="10" />
          <line x1="45" y1="6" x2="45" y2="14" />
          <line x1="49" y1="6" x2="49" y2="14" />
        </svg>
      ),
      wiringDiagram: 'L přívod → svorka 1L; N přívod → svorka 1N (obojí spínáno)',
    },
    {
      id: 'sw-5',
      category: 'switch',
      name: 'Spínač č. 5 (Sériový / lustrový přepínač)',
      refCode: 'SA',
      norm: 'ČSN EN 60617-11',
      description: 'Dvě nezávislé klapky v jednom strojku se společným fázovým přívodem. Umožňuje spínat dvě sekce lustru (např. 2+3 žárovky) nebo dvě různá svítidla z jednoho místa.',
      examTip: 'Kruh se dvěma čárkami a dvěma praporky mířícími na stejnou stranu. Zkoušející se ptá na počet vodičů: kabel k vypínači 5 je CYKY-J 3×1.5 (L přívod, 2× odvod ke svítidlům).',
      svg: (
        <svg viewBox="0 0 80 80" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[3]">
          <circle cx="40" cy="40" r="14" />
          <line x1="34" y1="28" x2="34" y2="10" />
          <line x1="34" y1="10" x2="44" y2="10" />
          <line x1="44" y1="28" x2="44" y2="10" />
          <line x1="44" y1="10" x2="54" y2="10" />
        </svg>
      ),
      wiringDiagram: 'L přívod na společnou svorku L; výstup 1 na Svítidlo A; výstup 2 na Svítidlo B',
    },
    {
      id: 'sw-6',
      category: 'switch',
      name: 'Spínač č. 6 (Střídavý / schodišťový přepínač)',
      refCode: 'SA',
      norm: 'ČSN EN 60617-11',
      description: 'Přepíná přívodní proud střídavě do jednoho ze dvou vývodů (korespondenčních vodičů). V páru (dvě šestky) slouží k ovládání světla ze dvou různých míst (chodba, schodiště).',
      examTip: 'Jedna čára prochází středem a má háčky na OBOU koncích v opačném směru! Mezi dvěma přepínači 6 vedou vždy 2 korespondenční vodiče.',
      svg: (
        <svg viewBox="0 0 80 80" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[3]">
          <circle cx="40" cy="40" r="14" />
          <line x1="40" y1="54" x2="40" y2="10" />
          <line x1="40" y1="10" x2="52" y2="10" />
          <line x1="40" y1="54" x2="28" y2="54" />
        </svg>
      ),
      wiringDiagram: 'Přívod L na přepínač 6A (svorka L) → 2 koresponďáky (1, 2) → přepínač 6B (svorky 1, 2) → výstup L ke svítidlu',
    },
    {
      id: 'sw-7',
      category: 'switch',
      name: 'Spínač č. 7 (Křížový přepínač)',
      refCode: 'SA',
      norm: 'ČSN EN 60617-11',
      description: 'Zařazuje se mezi dva střídavé přepínače č. 6. Má 4 svorky a kříží dva korespondenční vodiče. Umožňuje ovládání světla ze třetího a každého dalšího místa.',
      examTip: 'Značka má tvar kříže (dvě zkřížené čáry) s háčky na všech čtyřech koncích. Má vždy 4 svorky!',
      svg: (
        <svg viewBox="0 0 80 80" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[3]">
          <circle cx="40" cy="40" r="14" />
          <line x1="28" y1="52" x2="52" y2="28" />
          <line x1="28" y1="28" x2="52" y2="52" />
          <line x1="52" y1="28" x2="60" y2="28" />
          <line x1="52" y1="52" x2="60" y2="52" />
          <line x1="28" y1="28" x2="20" y2="28" />
          <line x1="28" y1="52" x2="20" y2="52" />
        </svg>
      ),
      wiringDiagram: 'Vstup: 2 koresponďáky z prvního spínače 6 → Výstup: 2 koresponďáky k dalšímu spínači 6 (nebo 7)',
    },
    {
      id: 'pb-1',
      category: 'switch',
      name: 'Tlačítkový ovladač č. 1/0 (s vratnou pružinou)',
      refCode: 'SB',
      norm: 'ČSN EN 60617-11',
      description: 'Zapínací tlačítko, které sepne kontakt pouze po dobu stisku. Vhodné pro zvonky, schodišťové automaty a impulzní (paměťová) relé.',
      examTip: 'Kruh s plným bodem nebo soustředným menším kruhem uvnitř. Ve schématech zapojení se kreslí jako spínací kontakt s trojúhelníkem (vratná pružina).',
      svg: (
        <svg viewBox="0 0 80 80" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[3]">
          <circle cx="40" cy="40" r="14" />
          <circle cx="40" cy="40" r="5" className="fill-amber-400" />
          <line x1="40" y1="26" x2="40" y2="10" />
        </svg>
      ),
      wiringDiagram: 'Paralelní zapojení libovolného počtu tlačítek na 2 vodiče k cívce impulzního relé',
    },
    {
      id: 'soc-1',
      category: 'socket',
      name: 'Jednoduchá zásuvka 230 V (16 A)',
      refCode: 'XD',
      norm: 'ČSN EN 60617-11 / ČSN 33 2000-4-41',
      description: 'Zásuvka s ochranným kolíkem (typ E – český standard). Fáze L vlevo, pracovní nula N vpravo, ochranný kolík PE nahoře.',
      examTip: 'Půlkruh přitisknutý k čáře stěny s kolmou čárkou uprostřed (ochranný kontakt PE). V ČR se montuje ve výšce 20–30 cm nad podlahou.',
      svg: (
        <svg viewBox="0 0 80 80" className="w-16 h-16 text-sky-400 stroke-current fill-none stroke-[3]">
          <path d="M 22 50 A 18 18 0 0 1 58 50" />
          <line x1="40" y1="50" x2="40" y2="32" />
          <line x1="16" y1="50" x2="64" y2="50" className="stroke-slate-600 stroke-[2]" />
        </svg>
      ),
      wiringDiagram: 'L (hnědá/černá) → levá zdířka; N (světle modrá) → pravá zdířka; PE (zelenožlutá) → kolík nahoře',
    },
    {
      id: 'soc-2',
      category: 'socket',
      name: 'Dvojzásuvka 230 V (16 A)',
      refCode: 'XD',
      norm: 'ČSN EN 60617-11',
      description: 'Dvojitá zásuvka montovaná do jedné instalační krabice (KU 68). Pozor: u pootočené horní zásuvky jsou zdířky zrcadlově, ale polarita musí zůstat zachována!',
      examTip: 'Značka zásuvky doplněná číslem 2 nebo dvěma čárkami. Z hlediska normy ČSN 33 2130 ed. 3 se dvojzásuvka počítá jako JEDEN vývod.',
      svg: (
        <svg viewBox="0 0 80 80" className="w-16 h-16 text-sky-400 stroke-current fill-none stroke-[3]">
          <path d="M 22 50 A 18 18 0 0 1 58 50" />
          <line x1="40" y1="50" x2="40" y2="32" />
          <text x="35" y="24" className="fill-sky-400 stroke-none text-xs font-mono font-bold">2</text>
          <line x1="16" y1="50" x2="64" y2="50" className="stroke-slate-600 stroke-[2]" />
        </svg>
      ),
      wiringDiagram: 'Přívod 3×2.5 mm²; propojení mezi spodní a horní zásuvkou je provedeno z výroby vnitřními můstky',
    },
    {
      id: 'soc-ip44',
      category: 'socket',
      name: 'Zásuvka s krytím IP 44 (vlhkotěsná s víčkem)',
      refCode: 'XD',
      norm: 'ČSN 33 2000-7-701 / ČSN EN 60529',
      description: 'Zásuvka s ochranným odklopným víčkem a těsněním. Povinná v koupelnách (zóna 3), venku, v dílnách a vlhkých prostorech.',
      examTip: 'Značka zásuvky uzavřená v rámečku nebo s nápisem IP 44. V koupelně musí být vždy chráněna proudovým chráničem 30 mA!',
      svg: (
        <svg viewBox="0 0 80 80" className="w-16 h-16 text-sky-400 stroke-current fill-none stroke-[3]">
          <rect x="18" y="18" width="44" height="44" rx="6" className="stroke-sky-400/60 stroke-[2]" />
          <path d="M 28 50 A 12 12 0 0 1 52 50" />
          <line x1="40" y1="50" x2="40" y2="38" />
          <line x1="22" y1="50" x2="58" y2="50" className="stroke-slate-500 stroke-[1.5]" />
        </svg>
      ),
      wiringDiagram: 'CYKY-J 3×2.5 mm² s připojením přes proudový chránič RCD 30 mA',
    },
    {
      id: 'soc-3p',
      category: 'socket',
      name: 'Třífázová zásuvka 400 V (5pólová: 3P+N+PE)',
      refCode: 'XD',
      norm: 'ČSN EN 60309-1 / ČSN 33 2000-4-41',
      description: 'Průmyslová červená zásuvka (16 A nebo 32 A) pro třífázové spotřebiče (cirkulárka, svářečka, míchačka).',
      examTip: 'Značka má 3 nebo 5 vývodních čárek (3 fáze + N + PE). Od roku 2009 musí být i třífázové zásuvky do 32 A chráněny chráničem RCD 30 mA!',
      svg: (
        <svg viewBox="0 0 80 80" className="w-16 h-16 text-rose-400 stroke-current fill-none stroke-[3]">
          <path d="M 22 50 A 18 18 0 0 1 58 50" />
          <line x1="32" y1="50" x2="32" y2="34" />
          <line x1="40" y1="50" x2="40" y2="30" />
          <line x1="48" y1="50" x2="48" y2="34" />
          <line x1="16" y1="50" x2="64" y2="50" className="stroke-slate-600 stroke-[2]" />
        </svg>
      ),
      wiringDiagram: 'Přívod CYKY-J 5×2.5 (16A) nebo CYKY-J 5×4/6 (32A); L1, L2, L3, N, PE',
    },
    {
      id: 'cb-1',
      category: 'device',
      name: 'Jistič vedení (MCB)',
      refCode: 'FA',
      norm: 'ČSN EN 60898-1 / ČSN EN 60947-2',
      description: 'Chrání vedení před přetížením (bimetalová tepelná spoušť) a zkratem (elektromagnetická rychlá spoušť). Běžné charakteristiky: B (zásuvky, světla), C (motory, chladničky).',
      examTip: 'Na značce je obdélník s křížkem (kontakt) doplněný obloučkem (tepelná spoušť) a půlkruhem/háčkem (zkratová spoušť).',
      svg: (
        <svg viewBox="0 0 80 80" className="w-16 h-16 text-emerald-400 stroke-current fill-none stroke-[2.5]">
          <line x1="40" y1="10" x2="40" y2="28" />
          <line x1="40" y1="28" x2="32" y2="52" />
          <line x1="40" y1="52" x2="40" y2="70" />
          <line x1="28" y1="36" x2="36" y2="44" />
          <line x1="36" y1="36" x2="28" y2="44" />
          <path d="M 44 32 C 48 32, 48 48, 44 48" />
        </svg>
      ),
      wiringDiagram: 'Vstup: horní svorka 1 (přívod z hřebenu); Výstup: dolní svorka 2 (odvod ke spotřebiči)',
    },
    {
      id: 'rcd-1',
      category: 'device',
      name: 'Proudový chránič (RCD)',
      refCode: 'QF',
      norm: 'ČSN EN 61008-1 / ČSN 33 2000-4-41 ed. 3',
      description: 'Základní prvek ochrany před úrazem el. proudem (při dotyku živé části nebo průrazu na kostru). Porovnává proud tekoucí fázemi a nulákem přes součtový transformátor. Vybaví při rozdílu IΔn = 30 mA.',
      examTip: 'Značka má součtový proudový transformátor (ovál/kružnici obepínající vodiče) a testovací tlačítko T.',
      svg: (
        <svg viewBox="0 0 80 80" className="w-16 h-16 text-emerald-400 stroke-current fill-none stroke-[2.5]">
          <line x1="30" y1="10" x2="30" y2="26" />
          <line x1="30" y1="26" x2="24" y2="48" />
          <line x1="30" y1="48" x2="30" y2="70" />
          <line x1="50" y1="10" x2="50" y2="26" />
          <line x1="50" y1="26" x2="44" y2="48" />
          <line x1="50" y1="48" x2="50" y2="70" />
          <ellipse cx="40" cy="56" rx="20" ry="7" />
          <rect x="52" y="30" width="8" height="8" className="fill-emerald-400" />
        </svg>
      ),
      wiringDiagram: 'Prochází jím VŠECHNY pracovní vodiče (L1, L2, L3 i N). Vodič PE chráničem NIKDY neprochází!',
    },
    {
      id: 'rcbo-1',
      category: 'device',
      name: 'Jističochránič (RCBO - jistič + chránič v 1 těle)',
      refCode: 'QF',
      norm: 'ČSN EN 61009-1',
      description: 'Kombinovaný přístroj, který v jednom modulu (1TE nebo 2TE) integruje jistič i proudový chránič. Závada na obvodu vypne pouze daný obvod a neovlivní zbytek domu.',
      examTip: 'Typické značení: B16/1N/0,03A-A. Spojuje v sobě zkratovou a tepelnou spoušť jističe i reziduální spoušť chrániče.',
      svg: (
        <svg viewBox="0 0 80 80" className="w-16 h-16 text-emerald-400 stroke-current fill-none stroke-[2.5]">
          <rect x="18" y="16" width="44" height="48" rx="4" className="stroke-emerald-400/70" />
          <line x1="28" y1="24" x2="28" y2="56" />
          <line x1="34" y1="36" x2="42" y2="44" />
          <line x1="42" y1="36" x2="34" y2="44" />
          <ellipse cx="40" cy="52" rx="14" ry="5" />
        </svg>
      ),
      wiringDiagram: 'Přívod L a N nahoře; výstup chráněného obvodu L a N dole',
    },
    {
      id: 'spd-1',
      category: 'device',
      name: 'Svodič přepětí (SPD Typ 1+2 / B+C)',
      refCode: 'FS',
      norm: 'ČSN EN 61643-11 / ČSN 33 2000-5-534',
      description: 'Chrání elektroinstalaci a citlivé spotřebiče před bleskovými proudy a spínacím přepětím v síti. Přepětí bezpečně svede do zemnící soustavy PE.',
      examTip: 'Značka má obdélníkový blok varistoru se zalomenou šipkou nebo symbolem blesku a připojením na hlavní ochrannou přípojnici MET/HOP.',
      svg: (
        <svg viewBox="0 0 80 80" className="w-16 h-16 text-amber-400 stroke-current fill-none stroke-[2.5]">
          <line x1="40" y1="10" x2="40" y2="28" />
          <rect x="28" y="28" width="24" height="24" rx="2" />
          <path d="M 32 40 L 48 40 M 36 46 L 32 40 L 48 40 L 44 34" />
          <line x1="40" y1="52" x2="40" y2="70" />
        </svg>
      ),
      wiringDiagram: 'Připojuje se paralelně mezi L a PE (případně N a PE). Vodiče k SPD musí být co nejkratší (max. 0,5 m)!',
    },
    {
      id: 'cont-1',
      category: 'device',
      name: 'Instalační stykač (spínací cívka + kontakty)',
      refCode: 'KM',
      norm: 'ČSN EN 61095 / ČSN EN 60947-4-1',
      description: 'Elektromagneticky ovládaný spínač pro spínání větších výkonů (bojler na noční proud HDO, přímotopy, motory, osvětlení hal).',
      examTip: 'Cívka má svorky A1 a A2. Hlavní silové spínací kontakty mají liché číslo nahoře (1, 3, 5) a sudé dole (2, 4, 6).',
      svg: (
        <svg viewBox="0 0 80 80" className="w-16 h-16 text-cyan-400 stroke-current fill-none stroke-[2.5]">
          <rect x="24" y="26" width="32" height="28" rx="3" />
          <line x1="40" y1="12" x2="40" y2="26" />
          <line x1="40" y1="54" x2="40" y2="68" />
          <line x1="24" y1="26" x2="56" y2="54" className="stroke-cyan-400/40" />
          <text x="32" y="44" className="fill-cyan-300 stroke-none text-xs font-mono font-bold">KM</text>
        </svg>
      ),
      wiringDiagram: 'Ovládání: HDO signál nebo termostat na A1/A2; Silový obvod: L1/L2/L3 přes kontakty 1-2, 3-4, 5-6 k topným tělesům',
    },
    {
      id: 'lamp-1',
      category: 'load',
      name: 'Svítidlo (obecné / žárovkové / LED)',
      refCode: 'EL',
      norm: 'ČSN EN 60617-11',
      description: 'Základní značka světelného vývodu a svítidla v instalačních půdorysech a obvodových schématech.',
      examTip: 'Křížek (úhlopříčky ×) uvnitř kruhu nebo samostatný křížek. V půdorysech se umisťuje doprostřed místnosti.',
      svg: (
        <svg viewBox="0 0 80 80" className="w-16 h-16 text-yellow-300 stroke-current fill-none stroke-[3]">
          <circle cx="40" cy="40" r="16" />
          <line x1="28" y1="28" x2="52" y2="52" />
          <line x1="52" y1="28" x2="28" y2="52" />
        </svg>
      ),
      wiringDiagram: 'Spínaná fáze (černá/hnědá) na patici svítidla; N (světle modrá) na závit; PE (zelenožlutá) na kostru svítidla',
    },
    {
      id: 'boiler-1',
      category: 'load',
      name: 'Elektrický akumulační ohřívač vody (Bojler)',
      refCode: 'E / EK',
      norm: 'ČSN EN 60617 / ČSN 33 2000-7-701',
      description: 'Odporová zátěž (obvykle 2 kW, 230 V nebo 3×400 V), v koupelně v zóně 1 s krytím min. IPX4. Spínán přes stykač signálem HDO.',
      examTip: 'Značka ohřívače je obdélník s topným hadem uvnitř. cos φ = 1,0 (čistě odporový spotřebič bez jalového proudu).',
      svg: (
        <svg viewBox="0 0 80 80" className="w-16 h-16 text-rose-400 stroke-current fill-none stroke-[2.5]">
          <rect x="22" y="16" width="36" height="48" rx="8" />
          <path d="M 30 46 L 36 34 L 44 46 L 50 34" className="stroke-[3]" />
          <line x1="32" y1="64" x2="32" y2="72" />
          <line x1="48" y1="64" x2="48" y2="72" />
        </svg>
      ),
      wiringDiagram: 'Přívod CYKY-J 3×2.5 mm²; spínán stykačem HDO v rozvaděči; v koupelně pospojován na doplňkovou přípojnici EPS',
    },
  ];

  const filteredSymbols =
    selectedSymbolCategory === 'all'
      ? SYMBOLS
      : SYMBOLS.filter((s) => s.category === selectedSymbolCategory);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl my-6">
      {/* Horní hlavička s přepínači pohledů */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-amber-400 tracking-wider">
              Vizuální technická dokumentace ČSN EN 60617 & ČSN EN 61439
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              Schémata zapojení rozvaděčů a atlas normovaných značek
            </h3>
          </div>
        </div>

        {/* Přepínač záložek schémat */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('single-line')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'single-line'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Jednopólové schéma rozvaděče
          </button>
          <button
            onClick={() => setActiveTab('ladder')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'ladder'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Liniové obvodové schéma
          </button>
          <button
            onClick={() => setActiveTab('floorplan')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'floorplan'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Instalační půdorys
          </button>
          <button
            onClick={() => setActiveTab('symbols')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'symbols'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Atlas značek ČSN EN 60617
          </button>
        </div>
      </div>

      {/* OBSAH ZÁLOŽKY 1: JEDNOPÓLOVÉ SCHÉMA BYTOVÉHO ROZVADĚČE */}
      {activeTab === 'single-line' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              💡 <strong>Jednopólové schéma rozvaděče (ČSN EN 61439-3):</strong> Vedení je kresleno jednou čarou, šikmé čárky <code>/3</code> a <code>/5</code> udávají počet žil kabelu.
            </span>
            <span className="font-mono text-amber-400 font-bold hidden sm:inline">Rozvaděč RB-1 (3×400/230 V, TN-C-S)</span>
          </div>

          {/* Vektorový nákres jednopólového schématu */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 sm:p-6 overflow-x-auto shadow-inner">
            <svg
              viewBox="0 0 920 460"
              className="w-full min-w-[760px] h-auto select-none font-sans text-xs"
            >
              <defs>
                <linearGradient id="busGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>

              {/* Přívodní vedení z elektroměrového rozvaděče */}
              <text x="30" y="30" className="fill-amber-400 font-mono font-bold text-sm">
                PŘÍVOD: CYKY-J 5×6 mm² (/5) • Jištění před elektroměrem B25/3 • Síť TN-C-S (3×400/230 V, 50 Hz)
              </text>

              {/* Přívodní vertikální linie */}
              <line x1="80" y1="45" x2="80" y2="100" className="stroke-amber-400 stroke-[3]" />
              {/* Šikmé čárky počtu žil: 5 žil */}
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
                    code: 'QM dle ČSN EN 81346-2',
                    description: 'Slouží k bezpečnému odpojení celé bytové rozvodnice jedním hmatem v případě havárie nebo údržby.',
                    norm: 'ČSN EN 61439-3, ČSN 33 2130 ed. 3',
                    examTip: 'Každý domovní rozvaděč musí mít hlavní vypínač! U zkoušky nezapomeň, že vypínač nesmí nahrazovat proudový chránič.',
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

              {/* Přepěťová ochrana SPD (FS1) paralelně zapojená */}
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
                    code: 'FS dle ČSN EN 81346-2',
                    description: 'Chrání elektroinstalaci a spotřebiče před atmosférickým i spínacím přepětím v síti.',
                    norm: 'ČSN 33 2000-5-534, ČSN EN 61643-11',
                    examTip: 'Délka přívodních vodičů k SPD nesmí přesáhnout 0,5 m! Připojuje se na zemnící svorkovnici PE / MET.',
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
                    code: 'QF dle ČSN EN 81346-2',
                    description: 'Centrální proudový chránič pro skupinu zásuvkových a světelných obvodů. Vybavovací proud IΔn = 30 mA.',
                    norm: 'ČSN 33 2000-4-41 ed. 3',
                    examTip: 'Od roku 2019 musí být VŠECHNY běžné zásuvky do 32 A a světelné obvody v bytech chráněny chráničem 30 mA!',
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

              {/* Hlavní rozvodná fázová lišta (Hřeben) za chráničem */}
              <line x1="80" y1="260" x2="80" y2="300" className="stroke-emerald-400 stroke-[3]" />
              <line x1="80" y1="300" x2="860" y2="300" className="stroke-amber-400 stroke-[4]" />
              <text x="870" y="304" className="fill-amber-400 font-mono text-[10px] font-bold">L1, L2, L3</text>

              {/* ===================== JEDNOTLIVÉ VÝVODY ===================== */}

              {/* Vývod 1: Světla 1 (FA1) */}
              <g className="cursor-pointer group" onClick={() => setInspectedElement({
                title: 'FA1: Jistič B10/1 - Osvětlení obývací pokoj + ložnice',
                code: 'Kabel: CYKY-J 3×1.5 mm²',
                description: 'Světelný obvod jištěný jističem 10 A charakteristiky B. Max. dovolený příkon svítidel na jeden obvod je 2185 W.',
                norm: 'ČSN 33 2130 ed. 3',
                examTip: 'Průřez světelného obvodu Cu je min. 1,5 mm². Od roku 2018 musí být i světelné obvody v bytech vybaveny doplňkovou ochranou RCD 30 mA!',
              })}>
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

              {/* Vývod 2: Zásuvky obývák (FA2) */}
              <g className="cursor-pointer group" onClick={() => setInspectedElement({
                title: 'FA2: Jistič B16/1 - Zásuvky obývací pokoj a ložnice',
                code: 'Kabel: CYKY-J 3×2.5 mm²',
                description: 'Zásuvkový obvod jištěný jističem 16 A. Na jeden zásuvkový obvod lze připojit nejvýše 10 zásuvkových vývodů (vícenásobná zásuvka se počítá jako 1 vývod).',
                norm: 'ČSN 33 2130 ed. 3',
                examTip: 'Minimální průřez vodičů zásuvkových obvodů Cu je 2,5 mm². Jistí se jističem max. 16 A s char. B.',
              })}>
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

              {/* Vývod 3: Zásuvky kuchyňská linka (FA3) */}
              <g className="cursor-pointer group" onClick={() => setInspectedElement({
                title: 'FA3: Jistič B16/1 - Kuchyňská pracovní linka',
                code: 'Kabel: CYKY-J 3×2.5 mm²',
                description: 'Pracovní plocha kuchyně musí mít samostatný zásuvkový obvod kvůli souběžnému provozu rychlovarné konvice, kávovaru a toustovače.',
                norm: 'ČSN 33 2130 ed. 3',
                examTip: 'Kuchyňské zásuvky nad linkou NESMÍ být sloučeny se zásuvkami v pokojích!',
              })}>
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

              {/* Vývod 4: Automatická pračka (FA4) */}
              <g className="cursor-pointer group" onClick={() => setInspectedElement({
                title: 'FA4: Jistič B16/1 - Automatická pračka (samostatný vývod)',
                code: 'Kabel: CYKY-J 3×2.5 mm²',
                description: 'Spotřebiče o příkonu 2 kW a více (pračka, myčka, sušička, bojler) musí mít samostatný přívod a jištění.',
                norm: 'ČSN 33 2130 ed. 3',
                examTip: 'Zkoušející se ptá: Může být pračka zapojena do společného zásuvkového okruhu? Ne, spotřebič nad 2 kW vyžaduje samostatný obvod!',
              })}>
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

              {/* Vývod 5: Třífázový sporák / varná deska (FA5) */}
              <g className="cursor-pointer group" onClick={() => setInspectedElement({
                title: 'FA5: Jistič B16/3 (Třífázový) - Varná deska / sporák',
                code: 'Kabel: CYKY-J 5×2.5 mm² (/5)',
                description: 'Třífázový sporák 400 V se spřaženým třípólovým jističem B16/3. Při zkratu na jakékoliv fázi dojde k bezpečnému odpojení všech 3 fází najednou.',
                norm: 'ČSN 33 2130 ed. 3',
                examTip: 'Pro třífázový spotřebič se MUSÍ použít třípólový spřažený jistič, NIKDY tři samostatné jednofázové!',
              })}>
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

              {/* Samostatný chráničojistič pro koupelnu QF2 */}
              <g className="cursor-pointer group" onClick={() => setInspectedElement({
                title: 'QF2: Kombinovaný jističochránič (RCBO B16/1N/0,03 A) - Koupelna',
                code: 'Kabel: CYKY-J 3×2.5 mm²',
                description: 'Koupelna má vlastní dedikovaný jističochránič. Porucha v koupelně nevypne centrální chránič zbytku bytu a nezpůsobí tmu.',
                norm: 'ČSN 33 2000-7-701 ed. 2',
                examTip: 'Moderní praxe doporučuje pro koupelnu samostatný RCBO kvůli zvýšené bezpečnosti a selektivitě.',
              })}>
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

          <div className="text-center text-xs text-slate-400">
            👆 <em>Kliknutím na kterýkoliv přístroj (QM1, FS1, QF1, FA1-FA5) zobrazíte jeho normový popis a zkouškový chyták.</em>
          </div>
        </div>
      )}

      {/* OBSAH ZÁLOŽKY 2: LINIOVÉ OBVODOVÉ SCHÉMA (Impulzní relé & Stykač) */}
      {activeTab === 'ladder' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="text-xs text-slate-400">
            💡 <strong>Obvodové (liniové) schéma:</strong> Rozkládá elektrický obvod na logické proudové cesty mezi fází (L) a nulou (N). Umožňuje snadno pochopit funkci ovládacích tlačítek, relé a stykačů.
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-6 overflow-x-auto shadow-inner">
            <svg viewBox="0 0 880 340" className="w-full min-w-[720px] h-auto select-none font-sans text-xs">
              {/* Horní napájecí linie L (230 V) */}
              <line x1="40" y1="40" x2="840" y2="40" className="stroke-amber-400 stroke-[3]" />
              <text x="40" y="28" className="fill-amber-400 font-mono font-bold text-sm">L (Fáze 230 V AC přes jistič FA1 10A)</text>

              {/* Spodní nulová linie N */}
              <line x1="40" y1="300" x2="840" y2="300" className="stroke-sky-400 stroke-[3]" />
              <text x="40" y="325" className="fill-sky-400 font-mono font-bold text-sm">N (Střední nulový vodič)</text>

              {/* ===== CESTA 1: OVLÁDÁNÍ CÍVKY IMPULZNÍHO RELÉ PARALELNÍMI TLAČÍTKY ===== */}
              <text x="100" y="65" className="fill-slate-400 font-mono text-[11px] font-bold">1. Ovládací obvod (Tlačítka)</text>

              {/* Tlačítko SB1 (Chodba vchod) */}
              <line x1="120" y1="40" x2="120" y2="80" className="stroke-amber-400 stroke-[2]" />
              <circle cx="120" cy="80" r="3" className="fill-amber-400" />
              <line x1="120" y1="90" x2="108" y2="108" className="stroke-amber-400 stroke-[2.5]" />
              <circle cx="120" cy="115" r="3" className="fill-amber-400" />
              <line x1="120" y1="115" x2="120" y2="180" className="stroke-amber-400 stroke-[2]" />
              <text x="135" y="105" className="fill-white font-mono text-xs font-bold">SB1 (1/0)</text>
              <text x="135" y="118" className="fill-slate-500 text-[10px]">Tlačítko vchod</text>

              {/* Tlačítko SB2 (Chodba schody - paralelně) */}
              <line x1="120" y1="80" x2="220" y2="80" className="stroke-amber-400 stroke-[2]" />
              <line x1="220" y1="80" x2="220" y2="90" className="stroke-amber-400 stroke-[2]" />
              <circle cx="220" cy="90" r="3" className="fill-amber-400" />
              <line x1="220" y1="90" x2="208" y2="108" className="stroke-amber-400 stroke-[2.5]" />
              <circle cx="220" cy="115" r="3" className="fill-amber-400" />
              <line x1="220" y1="115" x2="220" y2="140" className="stroke-amber-400 stroke-[2]" />
              <line x1="220" y1="140" x2="120" y2="140" className="stroke-amber-400 stroke-[2]" />
              <circle cx="120" cy="140" r="3" className="fill-amber-400" />
              <text x="235" y="105" className="fill-white font-mono text-xs font-bold">SB2 (1/0)</text>
              <text x="235" y="118" className="fill-slate-500 text-[10px]">Tlačítko schody</text>

              {/* Tlačítko SB3 (Chodba patro - paralelně) */}
              <line x1="220" y1="80" x2="320" y2="80" className="stroke-amber-400 stroke-[2]" />
              <line x1="320" y1="80" x2="320" y2="90" className="stroke-amber-400 stroke-[2]" />
              <circle cx="320" cy="90" r="3" className="fill-amber-400" />
              <line x1="320" y1="90" x2="308" y2="108" className="stroke-amber-400 stroke-[2.5]" />
              <circle cx="320" cy="115" r="3" className="fill-amber-400" />
              <line x1="320" y1="115" x2="320" y2="140" className="stroke-amber-400 stroke-[2]" />
              <line x1="320" y1="140" x2="220" y2="140" className="stroke-amber-400 stroke-[2]" />
              <text x="335" y="105" className="fill-white font-mono text-xs font-bold">SB3 (1/0)</text>
              <text x="335" y="118" className="fill-slate-500 text-[10px]">Tlačítko patro</text>

              {/* Cívka impulzního relé KA1 */}
              <rect x="100" y="180" width="40" height="50" rx="3" className="fill-slate-900 stroke-cyan-400 stroke-[2]" />
              <text x="120" y="205" textAnchor="middle" className="fill-cyan-300 font-mono text-xs font-bold">KA1</text>
              <text x="120" y="220" textAnchor="middle" className="fill-slate-400 font-mono text-[10px]">A1-A2</text>
              <line x1="120" y1="230" x2="120" y2="300" className="stroke-sky-400 stroke-[2]" />
              <circle cx="120" cy="300" r="3" className="fill-sky-400" />

              {/* Oddělovací čára obvodů */}
              <line x1="450" y1="50" x2="450" y2="290" className="stroke-slate-800 stroke-[2] stroke-dasharray-[4,4]" />

              {/* ===== CESTA 2: SILOVÝ OBVOD SVÍTIDEL SPÍNANÝCH KONTAKTEM KA1 ===== */}
              <text x="500" y="65" className="fill-slate-400 font-mono text-[11px] font-bold">2. Silový obvod svítidel</text>

              {/* Spínací kontakt KA1 (1-2) */}
              <line x1="560" y1="40" x2="560" y2="90" className="stroke-amber-400 stroke-[2]" />
              <circle cx="560" cy="90" r="3" className="fill-amber-400" />
              <line x1="560" y1="90" x2="548" y2="125" className="stroke-amber-400 stroke-[2.5]" />
              <circle cx="560" cy="130" r="3" className="fill-amber-400" />
              <text x="575" y="105" className="fill-cyan-300 font-mono text-xs font-bold">KA1 (1-2)</text>
              <text x="575" y="118" className="fill-slate-400 text-[10px]">Spínací kontakt relé</text>

              {/* Svítidla EL1 a EL2 zapojená paralelně */}
              <line x1="560" y1="130" x2="560" y2="180" className="stroke-amber-400 stroke-[2]" />
              <circle cx="560" cy="180" r="3" className="fill-amber-400" />

              {/* Svítidlo EL1 */}
              <circle cx="560" cy="220" r="16" className="fill-slate-900 stroke-yellow-400 stroke-[2.5]" />
              <line x1="548" y1="208" x2="572" y2="232" className="stroke-yellow-400 stroke-[2]" />
              <line x1="572" y1="208" x2="548" y2="232" className="stroke-yellow-400 stroke-[2]" />
              <text x="585" y="224" className="fill-white font-mono text-xs font-bold">EL1</text>
              <line x1="560" y1="236" x2="560" y2="300" className="stroke-sky-400 stroke-[2]" />
              <circle cx="560" cy="300" r="3" className="fill-sky-400" />

              {/* Svítidlo EL2 (paralelní větev) */}
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

          <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-300 space-y-1">
            <span className="font-bold text-amber-400">Princip funkce impulzního (paměťového) relé:</span>
            <p>
              Stiskem kteréhokoliv z paralelních tlačítek (SB1, SB2, SB3) přivedeme proudový impuls do cívky KA1 (svorky A1–A2). Relé mechanicky překlopí svůj silový kontakt KA1 (1–2) do sepnutého stavu a zůstane v něm i po uvolnění tlačítka. Další stisk tlačítka kontakt rozepne. Výhoda: místo drahých křížových přepínačů č. 7 stačí levná tlačítka spojená pouze dvěma žílami!
            </p>
          </div>
        </div>
      )}

      {/* OBSAH ZÁLOŽKY 3: INSTALAČNÍ PŮDORYS (SITUACE) */}
      {activeTab === 'floorplan' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="text-xs text-slate-400">
            💡 <strong>Instalační situace (půdorys):</strong> Zobrazuje rozmístění spínačů u dveří, zásuvek na stěnách a svítidel na stropě v souladu s instalačními zónami (ČSN 33 2130 ed. 3).
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 sm:p-6 overflow-x-auto shadow-inner">
            <svg viewBox="0 0 760 380" className="w-full min-w-[620px] h-auto select-none font-sans text-xs">
              {/* Obvodové zdi místnosti */}
              <rect x="80" y="40" width="600" height="300" className="fill-slate-900/50 stroke-slate-500 stroke-[8]" />
              <text x="100" y="70" className="fill-slate-400 font-mono font-bold text-xs uppercase tracking-wider">
                Místnost 1.02 - Obývací pokoj (24,5 m²)
              </text>

              {/* Vstupní dveře vlevo dole */}
              <rect x="140" y="336" width="60" height="8" className="fill-slate-950 stroke-none" />
              <path d="M 140 340 A 60 60 0 0 1 200 280" className="stroke-slate-600 stroke-[1.5] stroke-dasharray-[3,3] fill-none" />
              <line x1="140" y1="340" x2="200" y2="280" className="stroke-amber-400 stroke-[2]" />
              <text x="210" y="325" className="fill-slate-500 text-[10px]">Dveře 80/197</text>

              {/* Spínač č. 6 u dveří (výška 105 cm nad podlahou) */}
              <circle cx="215" cy="328" r="8" className="fill-slate-900 stroke-amber-400 stroke-[2]" />
              <line x1="215" y1="336" x2="215" y2="310" className="stroke-amber-400 stroke-[2]" />
              <line x1="215" y1="310" x2="223" y2="310" className="stroke-amber-400 stroke-[2]" />
              <line x1="215" y1="336" x2="207" y2="336" className="stroke-amber-400 stroke-[2]" />
              <text x="230" y="328" className="fill-amber-400 font-mono font-bold text-xs">SA1 (č. 6)</text>
              <text x="230" y="340" className="fill-slate-400 text-[10px]">v = 105 cm</text>

              {/* Druhý spínač č. 6 u terasy / druhých dveří nahoře */}
              <circle cx="580" cy="52" r="8" className="fill-slate-900 stroke-amber-400 stroke-[2]" />
              <line x1="580" y1="60" x2="580" y2="34" className="stroke-amber-400 stroke-[2]" />
              <line x1="580" y1="34" x2="588" y2="34" className="stroke-amber-400 stroke-[2]" />
              <line x1="580" y1="60" x2="572" y2="60" className="stroke-amber-400 stroke-[2]" />
              <text x="595" y="55" className="fill-amber-400 font-mono font-bold text-xs">SA2 (č. 6)</text>

              {/* Centrální svítidlo uprostřed stropu */}
              <circle cx="380" cy="190" r="16" className="fill-slate-900 stroke-yellow-400 stroke-[3]" />
              <line x1="368" y1="178" x2="392" y2="202" className="stroke-yellow-400 stroke-[2.5]" />
              <line x1="392" y1="178" x2="368" y2="202" className="stroke-yellow-400 stroke-[2.5]" />
              <text x="380" y="222" textAnchor="middle" className="fill-white font-mono font-bold text-xs">EL1 (LED 45W)</text>

              {/* Kreslení tras kabelů (Čárkovaně ve zdi / v podlaze) */}
              <path
                d="M 215 328 L 215 190 L 364 190"
                className="stroke-amber-400/80 stroke-[2] stroke-dasharray-[4,4] fill-none"
              />
              <path
                d="M 396 190 L 580 190 L 580 60"
                className="stroke-amber-400/80 stroke-[2] stroke-dasharray-[4,4] fill-none"
              />

              {/* Dvojzásuvky na obvodových stěnách */}
              {/* Zásuvka vlevo */}
              <path d="M 88 140 A 10 10 0 0 1 88 160" className="stroke-sky-400 stroke-[2.5] fill-none" />
              <line x1="88" y1="150" x2="98" y2="150" className="stroke-sky-400 stroke-[2]" />
              <text x="104" y="154" className="fill-sky-400 font-mono text-[11px] font-bold">2× XD1 (v = 30 cm)</text>

              {/* Zásuvka TV stěna vpravo */}
              <path d="M 672 170 A 10 10 0 0 0 672 190" className="stroke-sky-400 stroke-[2.5] fill-none" />
              <line x1="672" y1="180" x2="662" y2="180" className="stroke-sky-400 stroke-[2]" />
              <text x="590" y="184" className="fill-sky-400 font-mono text-[11px] font-bold">2× XD2 (TV sestava)</text>

              {/* Kótovací značka instalační zóny */}
              <rect x="90" y="250" width="8" height="80" className="fill-amber-500/20 stroke-amber-500/40" />
              <text x="105" y="295" className="fill-amber-300 text-[10px]">
                Svislá instalační zóna: 10–30 cm od rohu/dveří
              </text>
            </svg>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
              <span className="font-bold text-amber-400">Instalační výšky dle ČSN 33 2130 ed. 3:</span>
              <ul className="space-y-0.5 text-slate-400">
                <li>• <strong>Spínače:</strong> 90–120 cm nad hotovou podlahou (standardně 105 cm u kliky dveří).</li>
                <li>• <strong>Zásuvky v obytných pokojích:</strong> 20–30 cm nad podlahou.</li>
                <li>• <strong>Zásuvky nad kuchyňskou linkou:</strong> 115–125 cm nad podlahou.</li>
              </ul>
            </div>
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
              <span className="font-bold text-amber-400">Instalační zóny ve stěnách:</span>
              <ul className="space-y-0.5 text-slate-400">
                <li>• <strong>Vodorovná horní zóna:</strong> 15–45 cm pod hotovým stropem.</li>
                <li>• <strong>Svislé zóny:</strong> 10–30 cm od rohů stěn a zárubní dveří.</li>
                <li>• Vedení kabelů šikmo (např. po úhlopříčce) je <strong>přísně zakázáno!</strong></li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* OBSAH ZÁLOŽKY 4: ATLAS SCHEMATICKÝCH ZNAČEK ČSN EN 60617 */}
      {activeTab === 'symbols' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
            <div className="text-xs text-slate-400">
              Klepnutím na libovolnou značku zobrazíte detailní normový rozbor, značení svorek a časté zkušební otázky.
            </div>

            {/* Filtr kategorií značek */}
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedSymbolCategory('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                  selectedSymbolCategory === 'all'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Vše ({SYMBOLS.length})
              </button>
              <button
                onClick={() => setSelectedSymbolCategory('switch')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                  selectedSymbolCategory === 'switch'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Spínače (1, 2, 5, 6, 7, 1/0)
              </button>
              <button
                onClick={() => setSelectedSymbolCategory('socket')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                  selectedSymbolCategory === 'socket'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Zásuvky (230/400V)
              </button>
              <button
                onClick={() => setSelectedSymbolCategory('device')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                  selectedSymbolCategory === 'device'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Rozvaděč (Jistič, RCD, SPD, Stykač)
              </button>
              <button
                onClick={() => setSelectedSymbolCategory('load')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                  selectedSymbolCategory === 'load'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Svítidla a spotřebiče
              </button>
            </div>
          </div>

          {/* Mřížka schematických značek */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredSymbols.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  setInspectedElement({
                    title: item.name,
                    code: `${item.refCode} (${item.norm})`,
                    description: `${item.description} Zapojení: ${item.wiringDiagram}`,
                    norm: item.norm,
                    examTip: item.examTip,
                  })
                }
                className="bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/60 rounded-xl p-3 flex flex-col items-center justify-between text-center cursor-pointer transition-all hover:scale-[1.02] shadow-sm group"
              >
                <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-500 pb-1">
                  <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400 font-bold">
                    {item.refCode}
                  </span>
                  <ZoomIn className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-amber-400 transition-opacity" />
                </div>

                <div className="py-2">{item.svg}</div>

                <div className="w-full pt-1 border-t border-slate-800/80">
                  <span className="text-xs font-bold text-slate-200 block truncate group-hover:text-amber-300">
                    {item.name.split('(')[0].trim()}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {item.name.includes('(') ? `(${item.name.split('(')[1]}` : item.refCode}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DETAILNÍ INSPEKČNÍ MODAL / BOX VYBRANÉHO PRVKU */}
      {inspectedElement && (
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 border-t border-amber-500/30 animate-fadeIn">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                  {inspectedElement.code}
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-white">
                  {inspectedElement.title}
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {inspectedElement.description}
              </p>

              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs flex items-start gap-2 mt-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300">Co vyžaduje zkušební komisař u státní zkoušky:</strong>
                  <p className="mt-0.5 leading-relaxed">{inspectedElement.examTip}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setInspectedElement(null)}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors shrink-0"
            >
              Zavřít detail
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
