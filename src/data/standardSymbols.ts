// Základní normované elektrotechnické značky pro zkoušku Elektromontér (26-017-H) a NV 194/2022 Sb.
// Zahrnuje nejdůležitější prvky: světla, zásuvky, vypínače 1, 5, 6, 7 a DIN moduly rozvaděče.

export interface StandardSymbol {
  id: string;
  name: string;
  category: string;
  originalCategory: string;
  image: string;
  alt: string;
  norm: string;
  description: string;
  examTip: string;
  wiringDiagram: string;
}

export const STANDARD_SYMBOLS: StandardSymbol[] = [
  // --- VYPÍNAČE A TLAČÍTKA ---
  {
    id: 'sym-sw1',
    name: 'Spínač č. 1 (Jednopólový vypínač)',
    category: 'Vypínače a tlačítka',
    originalCategory: 'Spínače a vypínače',
    image: '/symbols/019.png',
    alt: 'Spínač jednopólový č. 1',
    norm: 'ČSN EN 60617-11 / ČSN EN 60617-7',
    description: 'Základní spínač pro ovládání jednoho světelného okruhu z jednoho místa.',
    examTip: 'Půdorysná značka: kroužek s kolmou čárou a jedním praporkem vpravo. Rozpíná VÝHRADNĚ fázový vodič L (nikdy nulák N ani ochranný PE)!',
    wiringDiagram: 'Přívod L → svorka L (nebo 1) → kontakt → svorka 2 → svítidlo (patice) → N'
  },
  {
    id: 'sym-sw5',
    name: 'Sériový přepínač č. 5 (Lustrový vypínač)',
    category: 'Vypínače a tlačítka',
    originalCategory: 'Spínače a vypínače',
    image: '/symbols/023.png',
    alt: 'Sériový přepínač č. 5',
    norm: 'ČSN EN 60617-11 / ČSN EN 60617-7',
    description: 'Dva nezávislé spínače se společným přívodem ve společném strojku se dvěma půlenými klapkami.',
    examTip: 'Půdorysná značka: kroužek se dvěma rovnoběžnými čárkami a praporky doprava. Běžné pro lustry (poloviční / plný svit) nebo koupelnu (světlo + ventilátor).',
    wiringDiagram: 'Přívod L na svorku L → klapka 1 spíná okruh 1, klapka 2 spíná okruh 2'
  },
  {
    id: 'sym-sw6',
    name: 'Střídavý přepínač č. 6 (Schodišťový vypínač)',
    category: 'Vypínače a tlačítka',
    originalCategory: 'Spínače a vypínače',
    image: '/symbols/022.png',
    alt: 'Střídavý přepínač č. 6',
    norm: 'ČSN EN 60617-11 / ČSN EN 60617-7',
    description: 'Přepínač pro ovládání světla ze 2 různých míst (chodby, schodiště).',
    examTip: 'Půdorysná značka: čára prochází celým kroužkem s protilehlými praporky. Používá se vždy v páru na obou koncích, propojeny 2 korespondenčními vodiči.',
    wiringDiagram: 'Fáze L → Spínač 6 (přívod P) → 2 koresponďáky (svorky 1, 2) → druhý Spínač 6 (1, 2) → výstup P → světlo → N'
  },
  {
    id: 'sym-sw7',
    name: 'Křížový přepínač č. 7',
    category: 'Vypínače a tlačítka',
    originalCategory: 'Spínače a vypínače',
    image: '/symbols/024.png',
    alt: 'Křížový přepínač č. 7',
    norm: 'ČSN EN 60617-11 / ČSN EN 60617-7',
    description: 'Přepínač pro ovládání světla ze 3 a více míst.',
    examTip: 'Půdorysná značka: dvě překřížené úsečky se 4 praporky. Zapojuje se VŽDY mezi dva spínače č. 6 do trasy dvou korespondenčních vodičů.',
    wiringDiagram: 'Spínač 6 → 2 koresponďáky → křížový spínač 7 (4 svorky: 2 vstupy, 2 výstupy) → 2 koresponďáky → Spínač 6 → světlo'
  },
  {
    id: 'sym-btn',
    name: 'Tlačítkový ovladač (Tlačítko 1/0)',
    category: 'Vypínače a tlačítka',
    originalCategory: 'Spínače a vypínače',
    image: '/symbols/038.png',
    alt: 'Tlačítkový ovladač 1/0',
    norm: 'ČSN EN 60617-11',
    description: 'Impulzní tlačítko se samočinným pružinovým návratem sepnuté jen po dobu stisku.',
    examTip: 'Půdorysná značka: kroužek s plným černým bodem uvnitř. Ovládá schodišťový automat nebo impulsní paměťové relé z libovolného počtu míst.',
    wiringDiagram: 'Paralelně zapojená tlačítka spínají fázový impulz na cívku impulsního relé'
  },

  // --- ZÁSUVKY ---
  {
    id: 'sym-soc230',
    name: 'Zásuvka 230 V (Jednonásobná)',
    category: 'Zásuvky',
    originalCategory: 'Zásuvky',
    image: '/symbols/001.png',
    alt: 'Zásuvka 230 V',
    norm: 'ČSN EN 60617-11 / ČSN 33 2130 ed. 4',
    description: 'Jednonásobná domovní zásuvka 16 A / 230 V. Půlkruh opřený o zeď s jedním vývodem.',
    examTip: 'Čelní pohled: Fáze L vlevo, pracovní nula N vpravo, ochranný kolík PE nahoře. Všechny laické zásuvky do 32 A musí mít doplňkovou ochranu proudovým chráničem 30 mA!',
    wiringDiagram: 'Kabel CYKY-J 3×2,5 jištěný jističem B16/1 + chránič 30 mA'
  },
  {
    id: 'sym-soc-double',
    name: 'Dvojitá zásuvka 230 V (Dvojzásuvka)',
    category: 'Zásuvky',
    originalCategory: 'Zásuvky',
    image: '/symbols/005.png',
    alt: 'Dvojitá zásuvka 230 V',
    norm: 'ČSN EN 60617-11 / ČSN 33 2130 ed. 4',
    description: 'Dvojnásobná zásuvka 230 V instalovaná do jedné krabice KU 68.',
    examTip: 'Půdorysná značka: dva spojené obloučky. Dle ČSN 33 2130 ed. 4 se dvojzásuvka počítá jako 1 vývod (na obvod max 10 vývodů). Vícenásobné zásuvky v rámečku se počítají jednotlivě!',
    wiringDiagram: 'Vnitřní propojení L, N a PE je z výroby uvnitř přístroje'
  },
  {
    id: 'sym-soc400',
    name: 'Třífázová zásuvka 400 V (Pětikolík 3P+N+PE)',
    category: 'Zásuvky',
    originalCategory: 'Zásuvky',
    image: '/symbols/006.png',
    alt: 'Třífázová zásuvka 400 V',
    norm: 'ČSN EN 60617-11 / ČSN EN 60309',
    description: 'Průmyslová nezáměnná zásuvka 400 V (červená, 16 A nebo 32 A).',
    examTip: 'Obsahuje 5 kontaktů: 3 fázové (L1, L2, L3), střední N a ochranný PE. Všechny zásuvky do 32 A musí být chráněny 30mA proudovým chráničem!',
    wiringDiagram: 'Kabel CYKY-J 5×2,5 nebo 5×4 jištěný jističem B16/3 nebo B32/3 + 4P chránič 30 mA'
  },

  // --- SVÍTIDLA ---
  {
    id: 'sym-light-ceil',
    name: 'Stropní svítidlo (Všeobecná značka)',
    category: 'Svítidla',
    originalCategory: 'Svítidla',
    image: '/symbols/009.png',
    alt: 'Stropní svítidlo',
    norm: 'ČSN EN 60617-11 / ČSN 33 2130 ed. 4',
    description: 'Základní stropní svítidlo pro žárovkové či LED zdroje (kroužek s křížkem).',
    examTip: 'Dle ČSN 33 2130 ed. 4 (od 1. 1. 2025) musí mít i světelné obvody v bytech proudový chránič 30 mA, který nesmí být sdružen se zásuvkami. Fáze na střed objímky, N na závit.',
    wiringDiagram: 'Kabel CYKY-J 3×1,5 jištěný jističem B10/1 + vlastní světelný chránič 30 mA'
  },
  {
    id: 'sym-light-wall',
    name: 'Nástěnné svítidlo',
    category: 'Svítidla',
    originalCategory: 'Svítidla',
    image: '/symbols/010.png',
    alt: 'Nástěnné svítidlo',
    norm: 'ČSN EN 60617-11',
    description: 'Svítidlo montované na svislou zeď (kroužek s křížkem a jednou nožičkou opřenou o stěnu).',
    examTip: 'Vývod ze zdi se obvykle umisťuje ve výšce 180 až 210 cm nad podlahou.',
    wiringDiagram: 'Přívod spínané fáze L ze spínače, N a PE ze svorkovnice'
  },
  {
    id: 'sym-light-fluo',
    name: 'Lineární svítidlo (Zářivka / LED modul)',
    category: 'Svítidla',
    originalCategory: 'Svítidla',
    image: '/symbols/014.png',
    alt: 'Zářivkové / lineární LED svítidlo',
    norm: 'ČSN EN 60617-11',
    description: 'Lineární svítidlo obdélníkového tvaru s trubicí nebo LED modulem.',
    examTip: 'Půdorysná značka: obdélník s naznačeným lineárním zdrojem.',
    wiringDiagram: 'Elektronický předřadník nebo LED driver s připojením L, N a PE'
  },

  // --- MODULY NA LIŠTU (ROZVADĚČ) ---
  {
    id: 'sym-mcb1',
    name: 'Jistič 1P (Jednopólový jistič vedení FA / MCB)',
    category: 'Moduly na lištu (rozvaděč)',
    originalCategory: 'Jističe a ochrany',
    image: '/symbols/105.png',
    alt: 'Jistič 1P',
    norm: 'ČSN EN 60617-7 / ČSN EN 60898-1',
    description: 'Modulární jistič na DIN lištu s tepelnou (nadproud) a elektromagnetickou (zkrat) spouští.',
    examTip: 'Charakteristika B pro světla (B10) a zásuvky (B16); charakteristika C pro motory a transformátory s náběhovým proudem. Vypínací schopnost min. 6 kA (domovní) nebo 10 kA (průmysl).',
    wiringDiagram: 'Přívod fází shora lištou na svorku 1 → vývod zdola svorkou 2 do kabelu'
  },
  {
    id: 'sym-mcb3',
    name: 'Jistič 3P (Třífázový jistič FA / MCB)',
    category: 'Moduly na lištu (rozvaděč)',
    originalCategory: 'Jističe a ochrany',
    image: '/symbols/107.png',
    alt: 'Třífázový jistič 3P',
    norm: 'ČSN EN 60617-7 / ČSN EN 60898-1',
    description: 'Třípólový jistič na DIN lištu se společnou mechanicky spřaženou páčkou pro 3fázové obvody.',
    examTip: 'Při poruše na jediné fázi okamžitě vypne všechny 3 fáze najednou. Zamezuje nebezpečnému dvoufázovému chodu motorů!',
    wiringDiagram: 'Vstupy 1, 3, 5 → výstupy 2, 4, 6 k varné desce, motoru či zásuvce 400 V'
  },
  {
    id: 'sym-rcd',
    name: 'Proudový chránič (RCD / QF)',
    category: 'Moduly na lištu (rozvaděč)',
    originalCategory: 'Jističe a ochrany',
    image: '/symbols/112.png',
    alt: 'Proudový chránič RCD',
    norm: 'ČSN EN 60617-7 / ČSN EN 61008 / ČSN 33 2000-4-41 ed. 3',
    description: 'Ochranný přístroj reagující na unikající reziduální proud (IΔn = 30 mA pro ochranu osob).',
    examTip: 'Vodiče L a N prochází součtovým transformátorem (toroidem). Ochranný vodič PE chráničem NIKDY nesmí procházet! Typ AC je v ČR pro nové světelné instalace zakázán, vyžaduje se min. typ A.',
    wiringDiagram: 'Přívod L i N skrz chránič → odchozí L na jističe okruhů, odchozí N na modrou sběrnici N chrániče'
  },
  {
    id: 'sym-rcbo',
    name: 'Jističochránič (RCBO - jistič s proudovým chráničem)',
    category: 'Moduly na lištu (rozvaděč)',
    originalCategory: 'Jističe a ochrany',
    image: '/symbols/rcbo.png',
    alt: 'Jističochránič RCBO',
    norm: 'ČSN EN 60617-7 / ČSN EN 61009-1',
    description: 'Kombinovaný modulární přístroj spojující v jediném modulu jistič (nadproud + zkrat) a proudový chránič (30 mA).',
    examTip: 'Ideální pro samostatné důležité okruhy (chladnička, čerpadlo, světla). Porucha na tomto okruhu neshodí zbytek bytu. Šetří místo v rozvaděči (dnes i v šířce 1 DIN modulu).',
    wiringDiagram: 'Přívod L a N ze společné části rozvaděče → výstup L a N přímo do daného koncového kabelu'
  },
  {
    id: 'sym-km',
    name: 'Stykač (KM - Cívka a silové kontakty)',
    category: 'Moduly na lištu (rozvaděč)',
    originalCategory: 'Jističe a ochrany',
    image: '/symbols/118.png',
    alt: 'Stykač cívka KM',
    norm: 'ČSN EN 60617-7 / ČSN EN 60947-4-1',
    description: 'Elektromagnetický spínač na DIN lištu pro dálkové spínání zátěží (motory, přímotopy, HDO).',
    examTip: 'Svorky A1 a A2 napájí cívku. Silové kontakty spínají 1-2, 3-4, 5-6. Pomocný kontakt 13-14 (NO) se zapojuje jako SAMODRŽ paralelně k tlačítku START!',
    wiringDiagram: 'Ovládací okruh: tlačítko STOP (NC) → tlačítko START (NO) + samodrž (13-14) → cívka A1-A2'
  },
  {
    id: 'sym-spd',
    name: 'Chránič přepětí (Svodič přepětí SPD Typ 1+2 / B+C)',
    category: 'Moduly na lištu (rozvaděč)',
    originalCategory: 'Jističe a ochrany',
    image: '/symbols/113.png',
    alt: 'Přepěťová ochrana SPD',
    norm: 'ČSN EN 60617-7 / ČSN 33 2000-5-534 / ČSN EN 61643-11',
    description: 'Ochrana instalace a spotřebičů před atmosférickým bleskovým proudem a spínacím přepětím v síti.',
    examTip: 'Pravidlo 0,5 metru: celková délka připojovacích vodičů k SPD (od fází přes SPD na svorkovnici PE) nesmí přesáhnout 50 cm!',
    wiringDiagram: 'Paralelně zapojeno mezi fázové vodiče L1, L2, L3, N a hlavní ochrannou sběrnici PE'
  },
  {
    id: 'sym-fuse',
    name: 'Tavná pojistka (FU)',
    category: 'Moduly na lištu (rozvaděč)',
    originalCategory: 'Jističe a ochrany',
    image: '/symbols/108.png',
    alt: 'Tavná pojistka FU',
    norm: 'ČSN EN 60617-7 / ČSN 33 2000-4-43',
    description: 'Trubičková, nožová (NH) nebo válcová pojistka. Obdélník s čarou procházející středem.',
    examTip: 'Jednorázový prvek s velmi vysokou zkratovou vypínací schopností (až 120 kA). Používá se v HDS a předřazených skříních.',
    wiringDiagram: 'Zapojena v sérii v fázovém vodiči před chráněným zařízením'
  },
  {
    id: 'sym-qm',
    name: 'Hlavní vypínač rozvaděče (Odpínač QM1)',
    category: 'Moduly na lištu (rozvaděč)',
    originalCategory: 'Jističe a ochrany',
    image: '/symbols/126.png',
    alt: 'Odpínač / Hlavní vypínač QM',
    norm: 'ČSN EN 60617-7 / ČSN EN 61439-3',
    description: 'Spínací přístroj schopný bezpečně vypnout jmenovitý proud celého rozvaděče jedním hmatem.',
    examTip: 'Každý domovní rozvaděč musí mít hlavní vypínač! Vypínač NESMÍ být nahrazen proudovým chráničem (pokud chránič není schválen výrobcem jako hlavní vypínač rozvodnice).',
    wiringDiagram: 'Přívod z elektroměru na svorky 1, 3, 5; výstup na fázové hřebeny a chrániče rozvaděče'
  },

  // --- NEJDŮLEŽITĚJŠÍ PRVKY OCHRANY A INSTALACE ---
  {
    id: 'sym-pe',
    name: 'Ochranné uzemnění (PE)',
    category: 'Ochrana a instalace',
    originalCategory: 'Způsoby uzemnění',
    image: '/symbols/083.png',
    alt: 'Ochranné uzemnění PE',
    norm: 'ČSN EN 60617-2 / ČSN 33 2000-4-41 ed. 3',
    description: 'Značka uzemnění v kroužku. Připojení k ochrannému vodiči PE (barva ZELENÁ/ŽLUTÁ).',
    examTip: 'Za bodem rozdělení sítě TN-C na TN-S (rozdělení PEN na PE + N) se ochranný vodič PE a střední vodič N již NIKDY nesmí spojit!',
    wiringDiagram: 'Propojuje ochranné kolíky zásuvek a kovové kostry se zemnicí sběrnicí rozvaděče'
  },
  {
    id: 'sym-hop',
    name: 'Ekvipotenciální pospojování (HOP / MET)',
    category: 'Ochrana a instalace',
    originalCategory: 'Způsoby uzemnění',
    image: '/symbols/086.png',
    alt: 'Ekvipotenciála pospojování',
    norm: 'ČSN EN 60617-2 / ČSN 33 2000-5-54 ed. 3',
    description: 'Hlavní pospojování budovy pro vyrovnání elektrických potenciálů.',
    examTip: 'Spojuje na jednu přípojnici MET (HOP): vodovodní potrubí, plynovod, topení, kovové konstrukce, svod bleskosvodu a PE sběrnici rozvaděče vodičem CY min. 6 mm² (obvykle 16 mm²).',
    wiringDiagram: 'Zelenožluté vodiče CY ze všech kovových instalací zaústěné do svorkovnice MET v suterénu'
  },
  {
    id: 'sym-ku',
    name: 'Instalační přístrojová krabice (KU 68)',
    category: 'Ochrana a instalace',
    originalCategory: 'Rozvodné krabice',
    image: '/symbols/034.png',
    alt: 'Instalační krabice KU 68',
    norm: 'ČSN EN 60617-11',
    description: 'Kulatá krabice pod omítku pro montáž vypínačů, zásuvek a propojení kabelů.',
    examTip: 'Standardní průměr 68 mm. Do zdiva se sádruje, v sádrokartonu se používá verze do dutých stěn s packami (např. KPR 68).',
    wiringDiagram: 'Vstup kabelů CYKY prolisy v krabici, strojek uchycen šroubky do krabice'
  },
  {
    id: 'sym-wago',
    name: 'Svorka / spoj (Bezšroubová svorka WAGO)',
    category: 'Ochrana a instalace',
    originalCategory: 'Rozvodné krabice',
    image: '/symbols/037.png',
    alt: 'Svorka WAGO',
    norm: 'ČSN EN 60617-7',
    description: 'Bezšroubové páčkové nebo násuvné spojení vodičů v instalačních krabicích.',
    examTip: 'Páčková svorka umožňuje bezpečné spojení plných drátů i jemně slaněných lanek bez nutnosti lisování dutinek.',
    wiringDiagram: 'Spojování vodičů stejného potenciálu (L k L, N k N, PE k PE)'
  },
  {
    id: 'sym-cables',
    name: 'Označení počtu žil kabelu (/3, /5)',
    category: 'Ochrana a instalace',
    originalCategory: 'Označení vodičů',
    image: '/symbols/087.png',
    alt: 'Počet žil kabelu',
    norm: 'ČSN EN 60617-3',
    description: 'Šikmé čárky na trase jednopólového schématu udávající počet žil kabelu.',
    examTip: 'Tři čárky (/3) = třížilový kabel (L, N, PE, např. CYKY-J 3×1,5). Pět čárek (/5) = pětistrunný kabel (L1, L2, L3, N, PE).',
    wiringDiagram: 'Trasa vedení z rozvaděče k zařízením'
  }
];

export const SYMBOL_CATEGORIES = Array.from(new Set(STANDARD_SYMBOLS.map(s => s.category)));
