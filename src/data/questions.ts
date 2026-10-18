import { Question } from '../types';

export const QUESTIONS: Question[] = [
  // =========================================================================
  // KAPITOLA 1: Aplikování základních pojmů a vztahů v elektrotechnice (10 otázek)
  // =========================================================================
  {
    id: 'q1-1',
    chapterId: 1,
    competencyCode: '26-017-H/01',
    question: 'Jaký proud poteče topným tělesem s odporem R = 46 Ω připojeným na síťové napětí U = 230 V?',
    options: [
      { id: 'a', text: '2,5 A' },
      { id: 'b', text: '5 A' },
      { id: 'c', text: '10 A' },
      { id: 'd', text: '10,5 A' }
    ],
    correctOptionId: 'b',
    explanation: 'Dle Ohmova zákona platí I = U / R = 230 V / 46 Ω = 5 A.',
    normReference: 'Fyzikální zákony elektrotechniky',
    difficulty: 'normal'
  },
  {
    id: 'q1-2',
    chapterId: 1,
    competencyCode: '26-017-H/01',
    question: 'V jakých jednotkách se vyjadřuje jalový výkon (Q) ve střídavém obvodu?',
    options: [
      { id: 'a', text: 'W (watt)' },
      { id: 'b', text: 'VA (voltampér)' },
      { id: 'c', text: 'var (voltampér reaktanční)' },
      { id: 'd', text: 'J (joule)' }
    ],
    correctOptionId: 'c',
    explanation: 'Činný výkon P je ve wattech [W], zdánlivý výkon S ve voltampérech [VA] a jalový výkon Q ve voltampérech reaktančních [var].',
    normReference: 'ČSN IEC 60050',
    difficulty: 'normal'
  },
  {
    id: 'q1-3',
    chapterId: 1,
    competencyCode: '26-017-H/01',
    question: 'Co znamená označení sítě TN-C-S?',
    options: [
      { id: 'a', text: 'V celé síti jsou nulový a ochranný vodič přísně odděleny.' },
      { id: 'b', text: 'V první části sítě je sloučený vodič PEN, v místě rozdělení se rozdělí na PE a N a dále se již nesmí znovu spojit.' },
      { id: 'c', text: 'Síť nemá uzemněný uzel zdroje.' },
      { id: 'd', text: 'Síť je chráněna pouze oddělovacím transformátorem.' }
    ],
    correctOptionId: 'b',
    explanation: 'V síti TN-C-S je od zdroje k objektu veden společný vodič PEN (C = Combined). V domovní rozvodnici dojde na přípojnici PE k rozdělení na samostatný PE a N (S = Separated). Po rozdělení se tyto vodiče již nesmí nikde spojit.',
    normReference: 'ČSN 33 2000-1 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q1-4',
    chapterId: 1,
    competencyCode: '26-017-H/01',
    question: 'Jaký je minimální dovolený průřez vodiče PEN v pevné instalaci dle ČSN 33 2000-5-54 ed. 3?',
    options: [
      { id: 'a', text: '2,5 mm² Cu nebo 4 mm² Al' },
      { id: 'b', text: '6 mm² Cu nebo 10 mm² Al' },
      { id: 'c', text: '10 mm² Cu nebo 16 mm² Al' },
      { id: 'd', text: '16 mm² Cu nebo 25 mm² Al' }
    ],
    correctOptionId: 'c',
    explanation: 'Z důvodu mechanické a elektrické spolehlivosti nesmí být průřez vodiče PEN menší než 10 mm² mědi (Cu) nebo 16 mm² hliníku (Al). Při menších průřezech musí být PE a N vedeny odděleně (soustava TN-S)!',
    normReference: 'ČSN 33 2000-5-54 ed. 3',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q1-5',
    chapterId: 1,
    competencyCode: '26-017-H/01',
    question: 'Jaké barvy izolace smí být použity výhradně pro ochranný vodič (PE) a jak jsou značeny póly stejnosměrné soustavy (DC) dle platné ČSN EN IEC 60445?',
    options: [
      { id: 'a', text: 'PE je světle modrý; v DC soustavě je + černá a − hnědá' },
      { id: 'b', text: 'PE je výhradně zeleno-žlutý; v DC soustavě je kladný pól (+) červený, záporný pól (−) bílý a střední vodič (M) modrý' },
      { id: 'c', text: 'PE je zeleno-žlutý a smí se přeznačit modrou páskou na N' },
      { id: 'd', text: 'PE je černý se žlutou páskou' }
    ],
    correctOptionId: 'b',
    explanation: 'Dle ČSN EN IEC 60445 ed. 6 je dvoubarevná kombinace zelená/žlutá vyhrazena výhradně pro PE a nikdy se nesmí přeznačovat. Pro DC soustavy platí: kladný pól (L+) červená, záporný pól (L−) bílá (ve starších rozvodech tmavě modrá/šedá), střední vodič (M) modrá.',
    normReference: 'ČSN EN IEC 60445 ed. 6',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q1-6',
    chapterId: 1,
    competencyCode: '26-017-H/01',
    question: 'Co udává druhá číslice v kódu krytí IP (např. v IP 44) a co znamená přídavné písmeno B v označení IP XXB?',
    options: [
      { id: 'a', text: 'Druhá číslice udává mechanickou odolnost; písmeno B znamená bateriový provoz' },
      { id: 'b', text: 'Druhá číslice udává ochranu před vniknutím vody; přídavné písmeno B udává ochranu před nebezpečným dotykem živých částí prstem' },
      { id: 'c', text: 'Druhá číslice udává prachotěsnost; písmeno B znamená venkovní použití' },
      { id: 'd', text: 'Druhá číslice udává třídu izolace; písmeno B znamená nehořlavý kryt' }
    ],
    correctOptionId: 'b',
    explanation: 'První číslice IP udává ochranu před cizími tělesy a dotykem, druhá číslice (0–9) ochranu proti vodě. Přídavná písmena A, B, C, D specifikují ochranu před dotykem živých částí (A = hřbet ruky, B = prst, C = nástroj, D = drát).',
    normReference: 'ČSN EN 60529',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q1-7',
    chapterId: 1,
    competencyCode: '26-017-H/01',
    question: 'V obvodu máme dva paralelně zapojené rezistory: R1 = 60 Ω a R2 = 30 Ω. Jaký je jejich celkový výsledný odpor?',
    options: [
      { id: 'a', text: '90 Ω' },
      { id: 'b', text: '45 Ω' },
      { id: 'c', text: '20 Ω' },
      { id: 'd', text: '15 Ω' }
    ],
    correctOptionId: 'c',
    explanation: 'Pro paralelní spojení dvou rezistorů platí R_celk = (R1 · R2) / (R1 + R2) = (60 · 30) / (60 + 30) = 1800 / 90 = 20 Ω. Výsledný odpor je vždy menší než nejmenší z paralelně řazených odporů.',
    normReference: 'Základy elektrotechniky',
    difficulty: 'normal'
  },
  {
    id: 'q1-8',
    chapterId: 1,
    competencyCode: '26-017-H/01',
    question: 'Jaký je zásadní rozdíl mezi obvody malého napětí SELV, PELV a FELV?',
    options: [
      { id: 'a', text: 'SELV je střídavý, PELV je stejnosměrný a FELV je třífázový.' },
      { id: 'b', text: 'SELV je bezpečně oddělen od sítě a zcela NEUZEMNĚN; PELV je bezpečně oddělen a UZEMNĚN; FELV není bezpečně oddělen od sítě.' },
      { id: 'c', text: 'SELV má napětí do 230 V, PELV do 50 V.' },
      { id: 'd', text: 'V obvodu SELV se musí všechny neživé části spojit s ochranným vodičem PE.' }
    ],
    correctOptionId: 'b',
    explanation: 'SELV i PELV mají bezpečné galvanické oddělení (bezpečnostní transformátor), přičemž SELV nesmí být nikde uzemněn a PELV může mít uzemněný obvod nebo kostru. FELV je malé napětí pouze z funkčních důvodů bez bezpečného oddělení.',
    normReference: 'ČSN 33 2000-4-41 ed. 3',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q1-9',
    chapterId: 1,
    competencyCode: '26-017-H/01',
    question: 'Jaký je elektrický odpor měděného vodiče (γ = 56 m/(Ω·mm²)) o délce l = 28 m a průřezu S = 2,5 mm²?',
    options: [
      { id: 'a', text: '0,20 Ω' },
      { id: 'b', text: '0,50 Ω' },
      { id: 'c', text: '1,25 Ω' },
      { id: 'd', text: '2,00 Ω' }
    ],
    correctOptionId: 'a',
    explanation: 'Odpor vodiče vypočítáme podle vzorce R = l / (γ · S) = 28 / (56 · 2,5) = 28 / 140 = 0,20 Ω.',
    normReference: 'Elektrotechnické výpočty',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q1-10',
    chapterId: 1,
    competencyCode: '26-017-H/01',
    question: 'Jaký činný výkon P odebírá třífázový elektromotor připojený na sdružené napětí U = 400 V, protéká-li jím proud I = 10 A a účiník je cos φ = 0,85?',
    options: [
      { id: 'a', text: '3,40 kW' },
      { id: 'b', text: '4,00 kW' },
      { id: 'c', text: '5,89 kW' },
      { id: 'd', text: '6,93 kW' }
    ],
    correctOptionId: 'c',
    explanation: 'Činný výkon v souměrném 3f obvodu je P = √3 · U · I · cos φ = 1,732 · 400 · 10 · 0,85 ≈ 5 889 W = 5,89 kW (zdánlivý výkon S je 1,732 · 400 · 10 = 6,93 kVA).',
    normReference: 'ČSN IEC 60050',
    difficulty: 'hard',
    practicalExamRelevant: true
  },

  // =========================================================================
  // KAPITOLA 2: Bezpečnost a ochrana před úrazem el. proudem (10 otázek)
  // =========================================================================
  {
    id: 'q2-1',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Který právní předpis od 1. 7. 2022 v ČR stanovuje požadavky na odbornou způsobilost k výkonu činností na el. zařízeních (nahradil vyhlášku č. 50/1978 Sb.)?',
    options: [
      { id: 'a', text: 'Zákoník práce č. 262/2006 Sb.' },
      { id: 'b', text: 'Nařízení vlády č. 194/2022 Sb. (vydané k zákonu č. 250/2021 Sb.)' },
      { id: 'c', text: 'Vyhláška Ministerstva průmyslu č. 100/2020 Sb.' },
      { id: 'd', text: 'ČSN 33 2000-5-51' }
    ],
    correctOptionId: 'b',
    explanation: 'Dnem 1. 7. 2022 vstoupil v účinnost zákon č. 250/2021 Sb. o bezpečnosti práce v souvislosti s provozem vyhrazených technických zařízení a prováděcí Nařízení vlády č. 194/2022 Sb., které nahradilo vyhlášku č. 50/1978 Sb.',
    normReference: 'Zákon č. 250/2021 Sb., NV č. 194/2022 Sb.',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q2-2',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Jaké stupně odborné způsobilosti pracovníků v elektrotechnice definuje Nařízení vlády č. 194/2022 Sb.?',
    options: [
      { id: 'a', text: '§ 5 pracovník znalý, § 6 pro samostatnou činnost, § 8 pro řízení provozu, § 9 revizní technik' },
      { id: 'b', text: '§ 4 Osoba poučená, § 6 Elektrotechnik, § 7 Vedoucí elektrotechnik (a § 8 Revizní technik s osvědčením TIČR)' },
      { id: 'c', text: 'Pouze § 1 Laik a § 2 Inženýr' },
      { id: 'd', text: '§ 10 Projektant a § 11 Montér' }
    ],
    correctOptionId: 'b',
    explanation: 'NV č. 194/2022 Sb. zredukovalo stupně způsobilosti na: § 4 Osoba poučená, § 6 Elektrotechnik a § 7 Vedoucí elektrotechnik (§ 8 upravuje činnost revizního technika na základě osvědčení TIČR). Staré § 5 a § 10 již neexistují.',
    normReference: 'NV č. 194/2022 Sb.',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q2-3',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Jaké je přesné pořadí všech 5 bezpečnostních pravidel pro práci na elektrickém zařízení bez napětí dle ČSN EN 50110-1 ed. 3?',
    options: [
      { id: 'a', text: '1. Ověřit beznapětí, 2. Odpojit, 3. Uzemnit a zkratovat, 4. Zajistit, 5. Ohradit' },
      { id: 'b', text: '1. Úplně odpojit, 2. Zajistit proti opětovnému zapnutí, 3. Ověřit beznapěťový stav, 4. Uzemnit a zkratovat, 5. Ohradit nebo zakrýt živé části v okolí' },
      { id: 'c', text: '1. Vyvěsit tabulku, 2. Vypnout jistič, 3. Uzemnit, 4. Změřit fázovkou, 5. Pracovat' },
      { id: 'd', text: '1. Uzemnit a zkratovat, 2. Odpojit přívod, 3. Ověřit beznapětí, 4. Zajistit, 5. Zakrýt' }
    ],
    correctOptionId: 'b',
    explanation: 'Pět bezpečnostních pravidel musí být dodrženo v tomto přesném pořadí: 1. Úplně odpojit, 2. Zajistit proti opětovnému zapnutí, 3. Ověřit beznapěťový stav, 4. Uzemnit a zkratovat, 5. Ohradit nebo zakrýt živé části v okolí.',
    normReference: 'ČSN EN 50110-1 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q2-4',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Jakým způsobem a přístrojem se MUSÍ ověřovat beznapěťový stav při práci na instalaci NN?',
    options: [
      { id: 'a', text: 'Doutnavkovou jednopólovou fázovkou (šroubovákem se světýlkem)' },
      { id: 'b', text: 'Rychlým dotykem hřbetu ruky' },
      { id: 'c', text: 'Spolehlivou dvoupólovou zkoušečkou, která je bezprostředně PŘED i PO měření přezkoušena na známém zdroji napětí' },
      { id: 'd', text: 'Pouze pohledem na polohu páčky jističe v rozvaděči' }
    ],
    correctOptionId: 'c',
    explanation: 'Beznapěťový stav se smí ověřovat výhradně dvoupólovou zkoušečkou (dle ČSN EN 61243-3). Zkoušečka se musí otestovat před měřením na živé části, poté změřit všechny kombinace vodičů na pracovišti a ihned poté znovu otestovat na živé části.',
    normReference: 'ČSN EN 50110-1 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q2-5',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'V jakém pořadí se připojuje zkratovací souprava při uzemňování a zkratování elektrického zařízení?',
    options: [
      { id: 'a', text: 'Nejprve se připojí na fázové vodiče a nakonec k uzemnění.' },
      { id: 'b', text: 'Nejprve se vždy spolehlivě připojí k uzemnění (PE/zemniči) a teprve potom se připojuje na fázové vodiče!' },
      { id: 'c', text: 'Na pořadí připojení vůbec nezáleží.' },
      { id: 'd', text: 'Zkratují se pouze fázové vodiče mezi sebou bez připojení k zemi.' }
    ],
    correctOptionId: 'b',
    explanation: 'Z důvodu ochrany života montéra se zkratovací souprava VŽDY nejprve spojí se zemí (uzemňovací svorkou) a až poté se nasazuje na fázové vodiče. Při demontáži se postupuje opačně (nejprve odpojit z fází, nakonec od země).',
    normReference: 'ČSN EN 50110-1 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q2-6',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Jaká je maximální dovolená doba automatického odpojení od zdroje pro koncové zásuvkové obvody do 32 A (při U0 = 230 V AC) v síti TN a v síti TT dle ČSN 33 2000-4-41 ed. 3?',
    options: [
      { id: 'a', text: 'V síti TN 5,0 s, v síti TT 1,0 s' },
      { id: 'b', text: 'V síti TN 0,4 s, v síti TT 0,2 s' },
      { id: 'c', text: 'V obou sítích 1,5 s' },
      { id: 'd', text: 'V síti TN 0,1 s, v síti TT 0,8 s' }
    ],
    correctOptionId: 'b',
    explanation: 'Dle tabulky 41.1 normy ČSN 33 2000-4-41 ed. 3 je maximální doba odpojení při 230 V AC pro koncové obvody do 63 A (zásuvky do 32 A) v síti TN 0,4 sekundy a v síti TT 0,2 sekundy.',
    normReference: 'ČSN 33 2000-4-41 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q2-7',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Jaká je mezní hodnota trvalého bezpečného dotykového napětí UL pro střídavý (AC) a stejnosměrný (DC) proud v normálních prostorách?',
    options: [
      { id: 'a', text: '12 V AC / 25 V DC' },
      { id: 'b', text: '25 V AC / 60 V DC' },
      { id: 'c', text: '50 V AC / 120 V DC' },
      { id: 'd', text: '230 V AC / 400 V DC' }
    ],
    correctOptionId: 'c',
    explanation: 'V normálních prostorách je bezpečná mez dotykového napětí 50 V AC a 120 V DC. V nebezpečných (vlhkých) prostorách 25 V AC / 60 V DC a ve zvlášť nebezpečných (mokro, bazény) 12 V AC / 25–30 V DC.',
    normReference: 'ČSN 33 2000-4-41 ed. 3',
    difficulty: 'normal'
  },
  {
    id: 'q2-8',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Jaký je rozdíl mezi prací pod dozorem a prací pod dohledem dle NV č. 194/2022 Sb. a ČSN EN 50110-1 ed. 3?',
    options: [
      { id: 'a', text: 'Mezi těmito pojmy není žádný právní rozdíl.' },
      { id: 'b', text: 'Při práci pod dohledem provádí odpovědná osoba občasnou průběžnou kontrolu; při práci pod dozorem je dozorující osoba TRVALE FYZICKY PŘÍTOMNA na pracovišti a odpovídá za bezpečnost.' },
      { id: 'c', text: 'Při práci pod dozorem pracovník pracuje sám a volá vedoucímu telefonem.' },
      { id: 'd', text: 'Práce pod dozorem znamená práci bez napětí.' }
    ],
    correctOptionId: 'b',
    explanation: 'Práce pod dozorem vyžaduje trvalou přítomnost osoby pověřené dozorem, která sleduje pracovníka a nesmí vykonávat jinou práci. Práce pod dohledem vyžaduje poučení před prací a občasnou kontrolu během práce.',
    normReference: 'ČSN EN 50110-1 ed. 3',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q2-9',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Které prostředky patří mezi prostředky ochrany PŘI PORUŠE (dříve ochrana před dotykem neživých částí) dle ČSN 33 2000-4-41 ed. 3?',
    options: [
      { id: 'a', text: 'Pouze základní izolace vodičů a výstražná cedulka' },
      { id: 'b', text: 'Automatické odpojení od zdroje, přídavná/zesílená izolace, ochranné pospojování, ochranné stínění, jednoduché elektrické oddělení a nevodivé okolí' },
      { id: 'c', text: 'Pouze vypínač světla a tavná pojistka bez uzemnění' },
      { id: 'd', text: 'Umístění živých částí mimo dosah v běžném bytě' }
    ],
    correctOptionId: 'b',
    explanation: 'Kritérium 2c Hodnoticího standardu NSK vyjmenovává prostředky ochrany při poruše: přídavná izolace, ochranné pospojování, ochranné stínění, automatické odpojení od zdroje, jednoduché oddělení a nevodivé okolí.',
    normReference: 'ČSN 33 2000-4-41 ed. 3',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q2-10',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Pro které obvody v bytové výstavbě je dle ČSN 33 2000-4-41 ed. 3 povinná doplňková ochrana proudovým chráničem s IΔn ≤ 30 mA?',
    options: [
      { id: 'a', text: 'Pouze pro jednu zásuvku u umyvadla v koupelně' },
      { id: 'b', text: 'Pro všechny laické zásuvky do 32 A, venkovní mobilní zařízení do 32 A, všechny světelné obvody v bytech a všechny obvody v koupelnách' },
      { id: 'c', text: 'Pouze pro třífázový sporák a bojler' },
      { id: 'd', text: 'Proudové chrániče jsou v bytech pouze dobrovolné' }
    ],
    correctOptionId: 'b',
    explanation: 'Dle ČSN 33 2000-4-41 ed. 3 musí být proudovým chráničem do 30 mA vybaveny všechny zásuvky do 32 A pro laiky, mobilní venkovní zařízení do 32 A, světelné obvody v bytech a obvody v koupelnách.',
    normReference: 'ČSN 33 2000-4-41 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },

  // =========================================================================
  // KAPITOLA 3: Dimenzování, jištění a kladení elektrických vedení (10 otázek)
  // =========================================================================
  {
    id: 'q3-1',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'Jaká základní podmínka musí platit mezi výpočtovým proudem obvodu IB, jmenovitým proudem jističe In a dovolenou proudovou zatížitelností kabelu Iz?',
    options: [
      { id: 'a', text: 'Iz ≤ In ≤ IB' },
      { id: 'b', text: 'IB ≤ In ≤ Iz (a současně I2 ≤ 1,45 · Iz)' },
      { id: 'c', text: 'In ≤ IB ≤ Iz' },
      { id: 'd', text: 'IB = 2 · Iz' }
    ],
    correctOptionId: 'b',
    explanation: 'Podle ČSN 33 2000-4-43 musí být jmenovitý proud jističe In roven nebo větší než provozní proud zátěže IB, ale zároveň menší nebo roven maximální trvalé zatížitelnosti kabelu Iz (IB ≤ In ≤ Iz).',
    normReference: 'ČSN 33 2000-4-43 ed. 2, ČSN 33 2000-5-52 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q3-2',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'Jaké jsou rozsahy okamžitého elektromagnetického (zkratového) vybavení jističů s charakteristikou B, C a D dle ČSN EN 60898-1?',
    options: [
      { id: 'a', text: 'B: 1 až 2× In, C: 2 až 3× In, D: 3 až 5× In' },
      { id: 'b', text: 'B: 3 až 5× In, C: 5 až 10× In, D: 10 až 20× In' },
      { id: 'c', text: 'B: 5 až 10× In, C: 10 až 20× In, D: 20 až 50× In' },
      { id: 'd', text: 'Všechny jističe vypínají zkrat při 1,45× In' }
    ],
    correctOptionId: 'b',
    explanation: 'Zkratová spoušť jističe char. B vybavuje při 3 až 5× In (byty, odporová zátěž), char. C při 5 až 10× In (motory, čerpadla) a char. D při 10 až 20× In (těžké rozběhy, svářečky). Hodnota 1,45× In je smluvený vypínací proud tepelné spouště proti přetížení.',
    normReference: 'ČSN EN 60898-1',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q3-3',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'Jaký je maximální povolený úbytek napětí od přípojkové skříně ke svítidlům a k zásuvkám v bytové instalaci dle ČSN 33 2130 ed. 3?',
    options: [
      { id: 'a', text: '1 % pro světla, 1 % pro zásuvky' },
      { id: 'b', text: '2 % pro světelné obvody, 3 % pro zásuvkové a ostatní obvody' },
      { id: 'c', text: '5 % pro světla, 10 % pro zásuvky' },
      { id: 'd', text: 'Úbytek napětí se v bytech nekontroluje' }
    ],
    correctOptionId: 'b',
    explanation: 'Dle ČSN 33 2130 ed. 3 nesmí úbytek napětí na rozvodech za přípojkovou skříní překročit 2 % u světelných obvodů (4,6 V při 230 V) a 3 % u zásuvkových a silových obvodů (6,9 V při 230 V).',
    normReference: 'ČSN 33 2130 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q3-4',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'Jaký je princip, místo instalace a maximální délka připojovacích vodičů u svodiče přepětí SPD Typ 1 a Typ 2?',
    options: [
      { id: 'a', text: 'SPD T1 se dává k televizi a připojovací vodiče mají mít aspoň 3 metry.' },
      { id: 'b', text: 'SPD T1 (bleskové proudy 10/350 µs) se instaluje na vstupu do budovy, SPD T2 (vlna 8/20 µs) v podružných rozvaděčích; celková délka připojovacích vodičů k PE nesmí překročit 0,5 m!' },
      { id: 'c', text: 'SPD se připojuje pouze na nulový vodič N bez spojení s PE.' },
      { id: 'd', text: 'SPD nahrazuje proudový chránič.' }
    ],
    correctOptionId: 'b',
    explanation: 'SPD T1 (jiskřiště) svádí bleskové proudy na vstupu do objektu (vodič PE min. 16 mm² Cu), SPD T2 (varistor) chrání před přepětím v rozvaděči (vodič PE min. 6 mm² Cu). Součet délek přívodů od fáze přes SPD na PE nesmí překročit 0,5 m.',
    normReference: 'ČSN 33 2000-5-534 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q3-5',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'Jak jsou vymezeny vodorovné a svislé instalační zóny pro ukládání kabelů pod omítkou ve stěnách místností dle ČSN 33 2130 ed. 3?',
    options: [
      { id: 'a', text: 'Kabely se tahají šikmo nejkratší cestou mezi krabicemi.' },
      { id: 'b', text: 'Vodorovné zóny jsou 150 až 450 mm od stropu a podlahy (a 900–1200 mm nad podlahou); svislé zóny jsou 100 až 200 mm od rohů, oken a dveří.' },
      { id: 'c', text: 'Vodorovné zóny jsou těsně u stropu (0 až 50 mm).' },
      { id: 'd', text: 'Zóny platí pouze pro vodovodní potrubí.' }
    ],
    correctOptionId: 'b',
    explanation: 'Horní a dolní vodorovná instalační zóna má šířku 300 mm (150 až 450 mm od dokončeného stropu/podlahy). Svislé zóny mají šířku 100 mm (100 až 200 mm od oken, dveří a rohů).',
    normReference: 'ČSN 33 2130 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q3-6',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'Proč je zakázáno spojovat měděné (Cu) a hliníkové (Al) vodiče přímým kontaktem pod jedním šroubem a pocínovávat konce slaněných vodičů (licen) do šroubových svorek?',
    options: [
      { id: 'a', text: 'Je to pouze estetický požadavek.' },
      { id: 'b', text: 'Mezi Cu a Al vzniká elektrochemická koroze; cín na licně pod tlakem šroubu teče (studený tok), spoj se uvolní, vzroste přechodový odpor a hrozí požár!' },
      { id: 'c', text: 'Měď a hliník spolu vůbec nevedou elektrický proud.' },
      { id: 'd', text: 'Cín je příliš tvrdý a zlomil by šroub svorky.' }
    ],
    correctOptionId: 'b',
    explanation: 'Spoj Cu+Al podléhá elektrolytické korozi – musí se použít oddělené bimetalové svorky, CUPAL nebo WAGO svorky s kontaktní pastou. Pocínovaná licna se pod šroubem vymačká a uvolní – na licny se musí lisovat dutinky!',
    normReference: 'ČSN 33 2000-5-52 ed. 2',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q3-7',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'Jak musí být upraveny žíly pohyblivého přívodu (šňůry) uvnitř vidlice nebo svorkovnice přenosného spotřebiče třídy I?',
    options: [
      { id: 'a', text: 'Ochranný vodič PE musí být nejdelší, aby se při vytržení kabelu ze spony odpojil až jako poslední po přerušení fázového a nulového vodiče.' },
      { id: 'b', text: 'Fázový vodič L musí být nejdelší.' },
      { id: 'c', text: 'Všechny vodiče se zaříznou na úplně stejnou délku a nezajišťují se proti tahu.' },
      { id: 'd', text: 'Ochranný vodič PE se u pohyblivých přívodů nezapojuje.' }
    ],
    correctOptionId: 'a',
    explanation: 'Pohyblivý přívod musí být zajištěn vývodkou/sponou proti vytržení a kroucení. Žíla PE (zeleno-žlutá) musí mít rezervu délky, aby v případě násilného vyškubnutí přívodu zůstala zapojena nejdéle.',
    normReference: 'ČSN 33 2000-5-52 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q3-8',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'Co znamenají kódy vnějších vlivů BA1, BA4 a BA5 podle ČSN 33 2000-5-51 ed. 3?',
    options: [
      { id: 'a', text: 'Teplotu okolí v zimě a v létě' },
      { id: 'b', text: 'Schopnost osob: BA1 = laici (běžné osoby), BA4 = osoby poučené (§ 4), BA5 = osoby znalé v elektrotechnice (§ 6 a § 7)' },
      { id: 'c', text: 'Stupeň hořlavosti podkladu budovy' },
      { id: 'd', text: 'Výskyt vody na pracovišti' }
    ],
    correctOptionId: 'b',
    explanation: 'Skupina B označuje využití prostoru a schopnost osob: BA1 jsou laici, BA2 děti, BA3 osoby se zdravotním postižením, BA4 osoby poučené a BA5 osoby znalé (elektrotechnici). Vliv vody je AD, teplota je AA, hořlavost konstrukcí je CA.',
    normReference: 'ČSN 33 2000-5-51 ed. 3',
    difficulty: 'normal'
  },
  {
    id: 'q3-9',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'Jakým způsobem se musí provést prostup kabelové trasy přes požárně dělicí stěnu nebo strop (hraniční konstrukci požárního úseku)?',
    options: [
      { id: 'a', text: 'Otvor se nechá volný kvůli větrání kabelů.' },
      { id: 'b', text: 'Otvor se zapění běžnou montážní PUR pěnou ze stavebnin.' },
      { id: 'c', text: 'Prostup musí být utěsněn certifikovanou protipožární ucpávkou se stejnou požární odolností (např. EI 60), jakou má prostupovaná stěna.' },
      { id: 'd', text: 'Prostup se pouze přelepí sádrokartonovou páskou.' }
    ],
    correctOptionId: 'c',
    explanation: 'Při průchodu požárně dělicí konstrukcí musí být prostup utěsněn certifikovaným systémem protipožární ucpávky (protipožární tmel, manžeta, minerální přepážka), aby se zabránilo šíření plamene, tepla a kouře.',
    normReference: 'ČSN 73 0810, ČSN 33 2000-5-52 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q3-10',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'V jakém uložení má měděný kabel CYKY 3×2,5 mm² NIŽŠÍ dovolenou proudovou zatížitelnost Iz – přímo pod omítkou ve zdivu (uložení C), nebo v trubce v tepelně izolované příčce (uložení A2)?',
    options: [
      { id: 'a', text: 'V obou uloženích má naprosto stejnou zatížitelnost.' },
      { id: 'b', text: 'Výrazně nižší zatížitelnost má v tepelně izolované stěně (uložení A1/A2), protože tepelná izolace brání odvodu tepla z kabelu.' },
      { id: 'c', text: 'Nižší zatížitelnost má ve zdivu pod omítkou.' },
      { id: 'd', text: 'V tepelné izolaci snese kabel dvojnásobný proud.' }
    ],
    correctOptionId: 'b',
    explanation: 'V tepelně izolované stěně (minerální vata v SDK příčce – uložení A2) se kabel špatně chladí a snese jen cca 18,5 A, zatímco přímo ve zdivu pod omítkou (uložení C) snese až 27 A.',
    normReference: 'ČSN 33 2000-5-52 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },

  // =========================================================================
  // KAPITOLA 4: Používání technické dokumentace a norem (10 otázek)
  // =========================================================================
  {
    id: 'q4-1',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Jakou schématickou značkou se v instalačních půdorysech označuje střídavý (schodišťový) přepínač řazení 6?',
    options: [
      { id: 'a', text: 'Kolečko s jednou čárkou a jedním praporkem' },
      { id: 'b', text: 'Kolečko s čárkou procházející středem, která má praporky (háčky) na obou koncích v opačném směru' },
      { id: 'c', text: 'Kolečko se dvěma překříženými čárkami do tvaru X' },
      { id: 'd', text: 'Kolečko se dvěma čárkami mířícími na stejnou stranu' }
    ],
    correctOptionId: 'b',
    explanation: 'Spínač č. 6 (střídavý) má kruh s jednou čárkou s praporky na obou koncích opačným směrem. Spínač č. 1 má 1 praporek, spínač č. 5 má 2 čárky stejným směrem a spínač č. 7 má kříž X se 4 praporky.',
    normReference: 'ČSN EN 60617',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-2',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Které písmenné referenční označení dle ČSN EN 81346-2 přísluší jistícím a ochranným prvkům (jističe, pojistky, SPD) a které výkonovým spínacím přístrojům?',
    options: [
      { id: 'a', text: 'R a C' },
      { id: 'b', text: 'F (např. FA, FU, FS) pro ochranné/jistící prvky a Q (např. QM, QF) pro silové spínací přístroje' },
      { id: 'c', text: 'M a G' },
      { id: 'd', text: 'W a V' }
    ],
    correctOptionId: 'b',
    explanation: 'Písmeno F označuje ochranná zařízení (FA jistič, FU pojistka, FS svodič přepětí), písmeno Q označuje výkonové spínací přístroje (QM hlavní vypínač, QF proudový chránič / jističochránič).',
    normReference: 'ČSN EN 81346-2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-3',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Jaký je rozdíl mezi jednopólovým (přehledovým) schématem a obvodovým (vícepólovým / liniovým) schématem?',
    options: [
      { id: 'a', text: 'Jednopólové schéma platí jen pro stejnosměrný proud.' },
      { id: 'b', text: 'Jednopólové schéma znázorňuje vícežilový obvod jednou čarou se značkou počtu žil; obvodové schéma vykresluje každý jednotlivý vodič, svorku a kontakt zvlášť.' },
      { id: 'c', text: 'Obvodové schéma ukazuje pouze stavební zdi bez vodičů.' },
      { id: 'd', text: 'Mezi schématy není žádný rozdíl.' }
    ],
    correctOptionId: 'b',
    explanation: 'Jednopólové schéma poskytuje rychlý přehled o skladbě rozvaděče (jedna čára pro 3f nebo 1f vývod s údajem např. /3 nebo /5). Obvodové schéma detailně rozkresluje každou proudovou cestu a všechny vodiče.',
    normReference: 'ČSN EN 61082-1',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-4',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Co znamená na výkrese rozvaděče popis u přístroje: „RCBO B16/1N/0,03A Typ A“?',
    options: [
      { id: 'a', text: 'Třífázový stykač na 16 kW' },
      { id: 'b', text: 'Proudový chránič s nadproudovou ochranou (jističochránič), jmenovitý proud 16 A, char. B, 1 fázový pól + spínaný N, reziduální proud 30 mA, typ A' },
      { id: 'c', text: 'Tavná pojistka 30 A' },
      { id: 'd', text: 'Svodič bleskových proudů Typ 1' }
    ],
    correctOptionId: 'b',
    explanation: 'RCBO je kombinovaný přístroj (jistič + proudový chránič v jednom). B16 značí jistič 16 A s charakteristikou B, 1N značí 1P+N, 0,03 A = 30 mA citlivost chrániče a Typ A reaguje na střídavé i pulzující stejnosměrné proudy.',
    normReference: 'ČSN EN 61009-1',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-5',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Jak jsou označeny svorky ovládací cívky a svorky silového kontaktu u impulzního (paměťového) relé nebo stykače?',
    options: [
      { id: 'a', text: 'Cívka je označena PE–N, kontakty L1–L2' },
      { id: 'b', text: 'Svorky ovládací cívky jsou označeny A1 a A2; silové kontakty jsou označeny číslicemi (např. 1–2, 3–4, 5–6)' },
      { id: 'c', text: 'Všechny svorky jsou bez označení' },
      { id: 'd', text: 'Cívka je označena U–V–W' }
    ],
    correctOptionId: 'b',
    explanation: 'Dle ČSN EN 60445 se svorky ovládací cívky relé a stykačů vždy označují A1 a A2. Hlavní silové kontakty se označují jednomístnými čísly (1–2, 3–4, 5–6) a pomocné kontakty dvoumístnými čísly (např. 13–14 spínací NO, 21–22 rozpínací NC).',
    normReference: 'ČSN EN IEC 60445 ed. 6',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-6',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Co vyjadřuje značka v podobě dvou soustředných čtverečků na štítku elektrického spotřebiče nebo ve schématu?',
    options: [
      { id: 'a', text: 'Zařízení třídy ochrany I s ochrannou svorkou PE' },
      { id: 'b', text: 'Zařízení třídy ochrany II s dvojitou nebo zesílenou izolací (nesmí se připojovat k vodiči PE)' },
      { id: 'c', text: 'Zařízení napájené malým napětím SELV (třída III)' },
      { id: 'd', text: 'Zařízení určené do výbušného prostředí' }
    ],
    correctOptionId: 'b',
    explanation: 'Dva soustředné čtverečky označují spotřebič třídy ochrany II (dvojitá nebo zesílená izolace). Tyto spotřebiče nemají ochranný vodič PE.',
    normReference: 'ČSN EN 60617, ČSN 33 2000-4-41 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-7',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Jaký je rozdíl mezi kabelem CYKY-J 3×1,5 a kabelem CYKY-O 3×1,5?',
    options: [
      { id: 'a', text: 'CYKY-J je hliníkový, CYKY-O je měděný.' },
      { id: 'b', text: 'Kabel CYKY-J obsahuje zeleno-žlutou žílu PE (hnědá, modrá, zeleno-žlutá), zatímco kabel CYKY-O zeleno-žlutou žílu NEOBSAHUJE (černá, hnědá, šedá).' },
      { id: 'c', text: 'CYKY-O je ohebná šňůra.' },
      { id: 'd', text: 'Kabel CYKY-J je určen pouze do země.' }
    ],
    correctOptionId: 'b',
    explanation: 'Písmeno "-J" (z něm. mit Schutzleiter) značí kabel se zeleno-žlutým ochranným vodičem. Písmeno "-O" (ohne Schutzleiter) značí kabel bez zeleno-žlutého vodiče (používá se např. mezi schodišťovými vypínači jako korespondenční kabel).',
    normReference: 'Značení silových kabelů',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-8',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Jak se na výkresech značí spínač č. 5 (sériový / lustrový) oproti spínači č. 7 (křížový)?',
    options: [
      { id: 'a', text: 'Spínač č. 5 má dvě čárky s praporky stejným směrem; spínač č. 7 má dvě překřížené čárky (X) se čtyřmi praporky.' },
      { id: 'b', text: 'Oba se značí obyčejným čtvercem.' },
      { id: 'c', text: 'Spínač č. 5 má křížek a spínač č. 7 má jednu čárku.' },
      { id: 'd', text: 'Spínač č. 7 nemá žádné praporky.' }
    ],
    correctOptionId: 'a',
    explanation: 'Sériový spínač č. 5 (dvouklapkový) má z kroužku vyvedeny 2 rovnoběžné čárky s praporky na stejnou stranu. Křížový spínač č. 7 má v kroužku nebo nad ním kříž X se 4 praporky.',
    normReference: 'ČSN EN 60617',
    difficulty: 'normal'
  },
  {
    id: 'q4-9',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Které písmeno podle ČSN EN 81346-2 označuje ve schématu stykače a relé (např. impulzní nebo časové relé)?',
    options: [
      { id: 'a', text: 'X' },
      { id: 'b', text: 'K (např. KM, KA, KT)' },
      { id: 'c', text: 'S' },
      { id: 'd', text: 'E' }
    ],
    correctOptionId: 'b',
    explanation: 'Třída K označuje relé a stykače (KM = výkonový stykač, KA = pomocné/impulzní relé, KT = časové relé). S jsou ovladače/tlačítka, X jsou svorkovnice a zásuvky, E jsou svítidla.',
    normReference: 'ČSN EN 81346-2',
    difficulty: 'normal'
  },
  {
    id: 'q4-10',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Jaká grafická značka představuje na jednopólovém schématu vodič PE a vodič N?',
    options: [
      { id: 'a', text: 'Vodič N má na konci šikmé čárky plnou tečku (kuličku); vodič PE má na konci příčnou kolmou čárku (tvar písmene T).' },
      { id: 'b', text: 'Oba vodiče se značí šipkou.' },
      { id: 'c', text: 'Vodič PE se na výkresech vůbec nekreslí.' },
      { id: 'd', text: 'Vodič N se značí vlnovkou.' }
    ],
    correctOptionId: 'a',
    explanation: 'Dle ČSN EN 60617 se střední vodič N označuje šikmou čárkou s plným kroužkem (tečkou) na konci, ochranný vodič PE čárkou s kolmou příčkou (T) a vodič PEN kombinací obou značek.',
    normReference: 'ČSN EN 60617',
    difficulty: 'hard'
  },

  // =========================================================================
  // KAPITOLA 5: Volba postupu práce, nářadí, pomůcek a měřidel (10 otázek)
  // =========================================================================
  {
    id: 'q5-1',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'Jaké zkušební napětí a jaký minimální izolační odpor Riso předepisuje norma ČSN 33 2000-6 ed. 2 pro běžnou instalaci 230/400 V?',
    options: [
      { id: 'a', text: '100 V DC a min. 0,1 MΩ' },
      { id: 'b', text: '250 V DC a min. 0,5 MΩ' },
      { id: 'c', text: '500 V DC a min. 1,0 MΩ' },
      { id: 'd', text: '1000 V AC a min. 5,0 MΩ' }
    ],
    correctOptionId: 'c',
    explanation: 'Pro instalace se jmenovitým napětím nad 50 V do 500 V včetně (sítě 230/400 V) se izolační odpor měří stejnosměrným napětím 500 V DC a výsledná hodnota Riso musí být ≥ 1,0 MΩ (pro SELV/PELV je to 250 V DC a ≥ 0,5 MΩ).',
    normReference: 'ČSN 33 2000-6 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q5-2',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'Jaká je maximální teoretická impedance poruchové smyčky Zs pro jistič B16 v síti 230 V a jaká je maximální dovolená naměřená hodnota za studena (s koeficientem 1,5)?',
    options: [
      { id: 'a', text: 'Teoretická 4,60 Ω, naměřená za studena 3,06 Ω' },
      { id: 'b', text: 'Teoretická 2,875 Ω, naměřená za studena max. 1,91 Ω' },
      { id: 'c', text: 'Teoretická 1,44 Ω, naměřená za studena max. 0,95 Ω' },
      { id: 'd', text: 'Teoretická 10,0 Ω, naměřená za studena max. 6,6 Ω' }
    ],
    correctOptionId: 'b',
    explanation: 'Pro jistič B16 je Ia = 5 · 16 = 80 A. Teoretické maximum Zs = 230 / 80 = 2,875 Ω. Po započtení koeficientu oteplení vodičů při zkratu (2/3, tj. děleno 1,5) smí být naměřená hodnota za studena nejvýše 2,875 / 1,5 = 1,91 Ω!',
    normReference: 'ČSN 33 2000-4-41 ed. 3, ČSN 33 2000-6 ed. 2',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q5-3',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'V jakém rozmezí reziduálního proudu a v jakém maximálním čase (při 1× IΔn) musí vybavit běžný proudový chránič s IΔn = 30 mA?',
    options: [
      { id: 'a', text: 'Mezi 5 mA až 10 mA, čas do 2 sekund' },
      { id: 'b', text: 'Mezi 15 mA až 30 mA (0,5 až 1,0 × IΔn), čas při 1× IΔn max. 300 ms (při 5× IΔn max. 40 ms)' },
      { id: 'c', text: 'Mezi 30 mA až 60 mA, čas do 500 ms' },
      { id: 'd', text: 'Přesně při 1 mA' }
    ],
    correctOptionId: 'b',
    explanation: 'Chránič 30 mA nesmí vybavit pod 15 mA (0,5× IΔn) a musí spolehlivě vybavit do 30 mA (1,0× IΔn). Vybavovací čas u typu bez zpoždění nesmí překročit 300 ms při 1× IΔn a 40 ms při 5× IΔn.',
    normReference: 'ČSN EN 61008-1, ČSN 33 2000-6 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q5-4',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'Jaké označení musí nést izolované ruční nářadí určené pro práce pod napětím nebo v blízkosti živých částí do 1000 V AC?',
    options: [
      { id: 'a', text: 'Pouze jakoukoliv gumovou rukojeť z hobby marketu' },
      { id: 'b', text: 'Symbol dvou překrývajících se trojúhelníků, údaj 1000 V (nebo 1000 V AC / 1500 V DC) a odkaz na normu IEC/EN 60900' },
      { id: 'c', text: 'Zelenou nálepku BOZP' },
      { id: 'd', text: 'Označení IP 68' }
    ],
    correctOptionId: 'b',
    explanation: 'Certifikované elektrikářské nářadí pro práci do 1000 V AC / 1500 V DC je zkoušeno napětím 10 kV a je označeno dvojitým trojúhelníkem, údajem 1000 V a normou ČSN EN 60900.',
    normReference: 'ČSN EN 60900 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q5-5',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'V jakém přesném pořadí se provádějí měření na nové elektroinstalaci podle ČSN 33 2000-6 ed. 2?',
    options: [
      { id: 'a', text: 'Nejprve zapneme jističe, změříme zkratovou smyčku a až nakonec měříme izolační odpor pod napětím.' },
      { id: 'b', text: 'Nejprve BEZ NAPĚTÍ: 1. Vizuální prohlídka, 2. Spojitost ochranných vodičů PE, 3. Izolační odpor Riso; a teprve PO ZAPNUTÍ NAPĚTÍ: 4. Sled fází, 5. Impedance smyčky Zs, 6. Proudové chrániče RCD a funkční zkouška.' },
      { id: 'c', text: 'Na pořadí měření vůbec nezáleží.' },
      { id: 'd', text: 'Měří se pouze napětí zkoušečkou.' }
    ],
    correctOptionId: 'b',
    explanation: 'ČSN 33 2000-6 ed. 2 striktně vyžaduje provést nejprve prohlídku a měření bez napětí (spojitost PE a izolační odpor Riso). Teprve když instalace vyhoví, je bezpečné pustit do ní napětí a měřit Zs a chrániče!',
    normReference: 'ČSN 33 2000-6 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q5-6',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'Jakým napětím a jakým minimálním proudem se měří spojitost ochranných vodičů (PE) a pospojování dle ČSN 33 2000-6 ed. 2?',
    options: [
      { id: 'a', text: 'Síťovým napětím 230 V AC bez omezení proudu' },
      { id: 'b', text: 'Zdrojem malého napětí 4 V až 24 V (AC nebo DC) naprázdno a zkušebním proudem minimálně 200 mA (0,2 A)' },
      { id: 'c', text: 'Napětím 500 V DC a proudem 1 mA' },
      { id: 'd', text: 'Pouze doutnavkovou fázovkou' }
    ],
    correctOptionId: 'b',
    explanation: 'Pro měření spojitosti ochranných vodičů PE a pospojování předepisuje ČSN 33 2000-6 ed. 2 zdroj napětí 4 až 24 V naprázdno se schopností dodat zkušební proud minimálně 0,2 A (200 mA).',
    normReference: 'ČSN 33 2000-6 ed. 2',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q5-7',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'Proč se musí před měřením izolačního odporu Riso napětím 500 V DC odpojit svodiče přepětí (SPD) a elektronické spotřebiče?',
    options: [
      { id: 'a', text: 'Aby spotřebiče nespotřebovávaly baterii v měřicím přístroji.' },
      { id: 'b', text: 'Protože zkušební napětí 500 V DC by otevřelo varistory v SPD (falešně nízký odpor Riso) a mohlo by zničit citlivou elektroniku spotřebičů!' },
      { id: 'c', text: 'Nemusí se odpojovat, 500 V DC ničemu nevadí.' },
      { id: 'd', text: 'Aby nevypadl hlavní jistič.' }
    ],
    correctOptionId: 'b',
    explanation: 'Varistory v přepěťových ochranách a odrušovací členy ve spotřebičích začnou při 500 V DC vést proud, což zkreslí měření (ukáže svod) nebo poškodí elektroniku. Pokud je nelze odpojit, připouští norma snížit zkušební napětí na 250 V DC (limit zůstává ≥ 1,0 MΩ).',
    normReference: 'ČSN 33 2000-6 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q5-8',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'Mezi kterými vodiči se měří izolační odpor Riso v jednofázovém zásuvkovém obvodu TN-S?',
    options: [
      { id: 'a', text: 'Pouze mezi fází L a nulákem N' },
      { id: 'b', text: 'Mezi L a PE, mezi N a PE a mezi L a N' },
      { id: 'c', text: 'Pouze mezi kolíkem PE a vodovodní trubkou' },
      { id: 'd', text: 'Mezi dvěma zásuvkami na stejném vodiči' }
    ],
    correctOptionId: 'b',
    explanation: 'Izolační odpor se měří mezi všemi pracovními vodiči navzájem (L–N) a mezi každým pracovním vodičem a ochranným vodičem PE (L–PE a N–PE).',
    normReference: 'ČSN 33 2000-6 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q5-9',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'Jaká je maximální teoretická impedance smyčky Zs pro jistič C16 v síti 230 V?',
    options: [
      { id: 'a', text: '2,875 Ω' },
      { id: 'b', text: '1,437 Ω (a za studena max. 0,95 Ω)' },
      { id: 'c', text: '4,60 Ω' },
      { id: 'd', text: '0,20 Ω' }
    ],
    correctOptionId: 'b',
    explanation: 'Pro jistič C16 je vypínací proud Ia = 10 · In = 10 · 16 = 160 A. Maximální teoretická impedance smyčky Zs = 230 V / 160 A = 1,4375 Ω (za studena s koeficientem 1,5 je limit 0,95 Ω).',
    normReference: 'ČSN 33 2000-4-41 ed. 3',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q5-10',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'Proč se při utahování šroubových svorek jističů a chráničů v rozvaděči používá momentový šroubovák?',
    options: [
      { id: 'a', text: 'Aby montáž trvala déle.' },
      { id: 'b', text: 'Pro dodržení utahovacího momentu předepsaného výrobcem (např. 2,5 Nm) – slabé dotažení vede k jiskření a vyhoření svorky, přetažení ke stržení závitu nebo přestřižení vodiče.' },
      { id: 'c', text: 'Momentový šroubovák zároveň měří napětí.' },
      { id: 'd', text: 'Používá se jen na plastové kryty.' }
    ],
    correctOptionId: 'b',
    explanation: 'Nedotažená svorka má velký přechodový odpor a je nejčastější příčinou požárů v rozvaděčích. Naopak přetažení poškodí třmen svorky. Výrobci proto předepisují přesný utahovací moment v Nm.',
    normReference: 'ČSN EN 61439-3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },

  // =========================================================================
  // KAPITOLA 6: Provádění elektrických instalací, montáže a zapojování (10 otázek)
  // =========================================================================
  {
    id: 'q6-1',
    chapterId: 6,
    competencyCode: '26-017-H/06',
    question: 'Kolik zásuvkových vývodů lze maximálně připojit na jeden zásuvkový obvod 230 V jištěný 16 A dle ČSN 33 2130 ed. 3?',
    options: [
      { id: 'a', text: 'Maximálně 5' },
      { id: 'b', text: 'Maximálně 10 (přičemž dvojzásuvka/vícenásobná zásuvka v jednom rámečku se počítá jako 1 vývod) a celkový instalovaný příkon nesmí překročit 3 680 W' },
      { id: 'c', text: 'Maximálně 16' },
      { id: 'd', text: 'Počet není nijak omezen' }
    ],
    correctOptionId: 'b',
    explanation: 'Dle ČSN 33 2130 ed. 3 smí být na jeden 16A zásuvkový obvod připojeno nejvýše 10 zásuvkových vývodů (max. 3 680 W). Dvojzásuvka se započítává jako jeden zásuvkový vývod.',
    normReference: 'ČSN 33 2130 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q6-2',
    chapterId: 6,
    competencyCode: '26-017-H/06',
    question: 'Jaké spínače a v jakém pořadí použijeme v klasické instalaci pro ovládání svítidla ze čtyř míst?',
    options: [
      { id: 'a', text: 'Čtyři spínače řazení 6' },
      { id: 'b', text: 'Dva střídavé přepínače řazení 6 na koncích a dva křížové přepínače řazení 7 mezi nimi (6 – 7 – 7 – 6)' },
      { id: 'c', text: 'Čtyři spínače řazení 1 za sebou' },
      { id: 'd', text: 'Dva spínače řazení 5 a dva spínače řazení 1' }
    ],
    correctOptionId: 'b',
    explanation: 'Pro ovládání ze 3 a více míst pomocí přepínačů musí být na začátku a na konci vždy spínač č. 6 (střídavý) a mezi nimi potřebný počet křížových spínačů č. 7 (pro 3 místa jeden č. 7, pro 4 místa dva č. 7).',
    normReference: 'ČSN 33 2130 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q6-3',
    chapterId: 6,
    competencyCode: '26-017-H/06',
    question: 'Jak se zapojují ovládací tlačítka (ovladače č. 1/0) při ovládání svítidla z více míst pomocí impulzního (paměťového) relé v rozvaděči?',
    options: [
      { id: 'a', text: 'Všechna tlačítka se zapojují do série za sebou.' },
      { id: 'b', text: 'Všechna tlačítka se zapojují PARALELNĚ (vedle sebe) a při stisku přivádějí fázový impulz na svorku cívky A1 impulzního relé.' },
      { id: 'c', text: 'Tlačítka odpojují ochranný vodič PE.' },
      { id: 'd', text: 'Impulzní relé funguje bez tlačítek.' }
    ],
    correctOptionId: 'b',
    explanation: 'Kritérium NSK 4b: Tlačítka pro impulzní relé (i schodišťový automat) se vždy řadí paralelně! Stisk kteréhokoliv tlačítka pošle fázový impulz na cívku relé A1 (A2 je na N), což překlopí silový kontakt 1–2 spínající svítidlo.',
    normReference: 'ČSN 33 2130 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q6-4',
    chapterId: 6,
    competencyCode: '26-017-H/06',
    question: 'Smí se v koupelně v zóně 1 nebo v zóně 2 instalovat běžná zásuvka na 230 V?',
    options: [
      { id: 'a', text: 'Ano, v zóně 2 může být běžná zásuvka s víčkem IP 44.' },
      { id: 'b', text: 'Ano, pokud je připojena přes proudový chránič 30 mA.' },
      { id: 'c', text: 'Ne! V zónách 0, 1 i 2 jsou běžné zásuvky 230 V zakázány – zásuvka 230 V smí být umístěna až MIMO zónu 2 (více než 60 cm od hrany vany/sprchy) a musí být chráněna RCD ≤ 30 mA.' },
      { id: 'd', text: 'Ano, přímo nad vanou ve výšce 1,5 m.' }
    ],
    correctOptionId: 'c',
    explanation: 'Dle ČSN 33 2000-7-701 ed. 2 nesmí být v zónách 0, 1 a 2 žádná běžná zásuvka na 230 V (v zóně 2 je dovolena pouze holicí jednotka s oddělovacím transformátorem). Běžné zásuvky s RCD ≤ 30 mA smí být až mimo zónu 2 (> 0,6 m od vany).',
    normReference: 'ČSN 33 2000-7-701 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q6-5',
    chapterId: 6,
    competencyCode: '26-017-H/06',
    question: 'Jak musí být v domovní rozvodnici zapojeny nulové vodiče (N), pokud je v rozvodnici instalováno více proudových chráničů?',
    options: [
      { id: 'a', text: 'Všechny modré vodiče N se spojí na jednu společnou sběrnici N.' },
      { id: 'b', text: 'Každý proudový chránič musí mít svou vlastní, elektricky oddělenou sběrnici N, na kterou jsou připojeny výhradně nulové vodiče obvodů jištěných tímto chráničem!' },
      { id: 'c', text: 'Nulové vodiče N se připojí na sběrnici PE.' },
      { id: 'd', text: 'Nulové vodiče neprocházejí skrz proudový chránič.' }
    ],
    correctOptionId: 'b',
    explanation: 'Každý proudový chránič vyhodnocuje součet proudů mezi svými fázemi a svým nulovým výstupem N. Kdyby se spojily nulové vodiče za různými chrániči nebo s PE, chrániče by okamžitě vypadávaly.',
    normReference: 'ČSN 33 2000-5-53',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q6-6',
    chapterId: 6,
    competencyCode: '26-017-H/06',
    question: 'Jaké je správné zapojení jednofázové zásuvky 230 V při pohledu zepředu, když je ochranný kolík nahoře?',
    options: [
      { id: 'a', text: 'Fáze L vpravo, nulový vodič N vlevo, kolík PE nahoře' },
      { id: 'b', text: 'Ochranný vodič PE (zeleno-žlutý) na kolíku nahoře, fázový vodič L (hnědý/černý) v LEVÉ dutince, nulový vodič N (modrý) v PRAVÉ dutince' },
      { id: 'c', text: 'Fázový vodič L na kolíku, PE vlevo, N vpravo' },
      { id: 'd', text: 'Na poloze fáze a nuláku v ČR nezáleží' }
    ],
    correctOptionId: 'b',
    explanation: 'Dle ČSN 33 2130 ed. 3 je při pohledu zepředu (s kolíkem nahoře) na ochranném kolíku vodič PE, v levé dutince fáze L a v pravé dutince střední vodič N.',
    normReference: 'ČSN 33 2130 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q6-7',
    chapterId: 6,
    competencyCode: '26-017-H/06',
    question: 'Jaký je minimální průřez měděného vodiče pro hlavní ochranné pospojování (spojující hlavní uzemňovací svorkovnici MET s kovovým potrubím vody, plynu a topení)?',
    options: [
      { id: 'a', text: '1,5 mm² Cu' },
      { id: 'b', text: '2,5 mm² Cu' },
      { id: 'c', text: '6 mm² Cu' },
      { id: 'd', text: '50 mm² Cu' }
    ],
    correctOptionId: 'c',
    explanation: 'Dle ČSN 33 2000-5-54 ed. 3 nesmí mít vodič hlavního ochranného pospojování připojený k hlavní uzemňovací svorkovnici MET menší průřez než 6 mm² Cu (u doplňkového pospojování je minimum 2,5 mm² Cu chráněný nebo 4 mm² Cu nechráněný).',
    normReference: 'ČSN 33 2000-5-54 ed. 3',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q6-8',
    chapterId: 6,
    competencyCode: '26-017-H/06',
    question: 'Od jakého příkonu spotřebiče se v bytových instalacích zřizuje samostatný zásuvkový obvod dle ČSN 33 2130 ed. 3?',
    options: [
      { id: 'a', text: 'Od 500 W' },
      { id: 'b', text: 'Od 2 000 W (2 kW) a více (např. pračka, myčka, sušička, pečicí trouba, bojler)' },
      { id: 'c', text: 'Až od 10 000 W' },
      { id: 'd', text: 'Samostatné obvody se nezřizují, vše v bytě je na jednom jističi' }
    ],
    correctOptionId: 'b',
    explanation: 'Spotřebiče s příkonem 2 kW a vyšším (pračka, myčka, sušička, trouba, bojler) musí být připojeny na samostatně jištěné obvody, aby nedocházelo k přetěžování běžných zásuvkových okruhů.',
    normReference: 'ČSN 33 2130 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q6-9',
    chapterId: 6,
    competencyCode: '26-017-H/06',
    question: 'Kam se v žárovkové objímce (E27) připojuje spínaný fázový vodič L a kam nulový vodič N?',
    options: [
      { id: 'a', text: 'Fáze L na závit objímky, nulák N na středový kontakt' },
      { id: 'b', text: 'Fáze L vždy na středový (spodní) kontakt objímky, nulový vodič N na boční závit objímky!' },
      { id: 'c', text: 'Je to úplně jedno' },
      { id: 'd', text: 'Na závit se připojuje zeleno-žlutý vodič PE' }
    ],
    correctOptionId: 'b',
    explanation: 'Z důvodu ochrany před úrazem při výměně žárovky musí být spínaná fáze L připojena na hluboko uložený středový kontakt a nulový vodič N na kovový závit objímky.',
    normReference: 'ČSN 33 2130 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q6-10',
    chapterId: 6,
    competencyCode: '26-017-H/06',
    question: 'Jaké úkony v technické dokumentaci a označení musí montér provést po dokončení instalace a měření (Kritérium NSK 6f)?',
    options: [
      { id: 'a', text: 'Žádné, montér dokumentaci nevyplňuje.' },
      { id: 'b', text: 'Trvale označit všechny jistící prvky a obvody v rozvaděči, vybavit rozvaděč schématem, zakreslit skutečné provedení instalace a zapsat naměřené hodnoty do protokolu.' },
      { id: 'c', text: 'Pouze napsat křídou číslo na zeď.' },
      { id: 'd', text: 'Skartovat projektovou dokumentaci.' }
    ],
    correctOptionId: 'b',
    explanation: 'Podle kritéria 6f Hodnoticího standardu NSK a ČSN 33 2000-5-51 musí být každý obvod v rozvaděči čitelně označen a montér musí provést záznam o výsledcích práce a měření do technické dokumentace (podklad pro výchozí revizi).',
    normReference: 'ČSN 33 2000-6 ed. 2, Hodnoticí standard NSK',
    difficulty: 'normal',
    practicalExamRelevant: true
  },

  // =========================================================================
  // KAPITOLA 7: Diagnostikování poruch elektrických instalací (10 otázek)
  // =========================================================================
  {
    id: 'q7-1',
    chapterId: 7,
    competencyCode: '26-017-H/07',
    question: 'Proudový chránič v rozvaděči padá okamžitě při nahození, i když jsou všechny jednopólové jističe za ním shozené v poloze VYPNUTO. Kde je příčina poruchy?',
    options: [
      { id: 'a', text: 'Zkrat mezi fázemi L1 a L2 na vstupu jističů' },
      { id: 'b', text: 'Svod nebo spojení mezi nulovým vodičem N a ochranným vodičem PE v některém z koncových obvodů' },
      { id: 'c', text: 'Prasklá žárovka v lustru' },
      { id: 'd', text: 'Přetížení obvodu rychlovarnou konvicí' }
    ],
    correctOptionId: 'b',
    explanation: 'Jednopólové jističe odpojují pouze fázi L, zatímco nulové vodiče N všech obvodů zůstávají trvale spojeny se sběrnicí N chrániče. Při dotyku nebo svodu mezi N a PE teče část vyrovnávacího proudu ze sítě do PE a chránič vybaví.',
    normReference: 'Metodika hledání závad',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q7-2',
    chapterId: 7,
    competencyCode: '26-017-H/07',
    question: 'Při měření dvoupólovou zkoušečkou v nefunkční zásuvce naměříte mezi L a PE 230 V, ale mezi L a N naměříte 0 V. Jaká je závada?',
    options: [
      { id: 'a', text: 'Je přerušen ochranný vodič PE.' },
      { id: 'b', text: 'Je přerušen nulový pracovní vodič N.' },
      { id: 'c', text: 'Je vypnutý jistič fázového vodiče.' },
      { id: 'd', text: 'Zásuvka je zcela bez závady.' }
    ],
    correctOptionId: 'b',
    explanation: 'Protože mezi L a PE je 230 V, je fázový vodič L pod napětím a vodič PE je spojen se zemí. Nulové napětí mezi L a N prokazuje přerušený nulový vodič N.',
    normReference: 'Diagnostika elektroinstalací',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q7-3',
    chapterId: 7,
    competencyCode: '26-017-H/07',
    question: 'Spotřebič v zásuvce normálně funguje, mezi L a N naměříte 230 V, ale mezi L a kolíkem PE naměříte 0 V. O jakou závadu se jedná?',
    options: [
      { id: 'a', text: 'Přerušený nulový vodič N' },
      { id: 'b', text: 'Přerušený ochranný vodič PE (smrtelně nebezpečná závada – kolík není uzemněn!)' },
      { id: 'c', text: 'Přerušený fázový vodič L' },
      { id: 'd', text: 'Zkrat mezi L a N' }
    ],
    correctOptionId: 'b',
    explanation: 'Pokud je mezi L a N 230 V, pracovní obvod funguje, ale 0 V mezi L a PE znamená, že ochranný kolík PE je odpojený (přerušený vodič PE). Při poruše spotřebiče by nebyla zajištěna ochrana před úrazem!',
    normReference: 'Diagnostika elektroinstalací',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q7-4',
    chapterId: 7,
    competencyCode: '26-017-H/07',
    question: 'Po výměně zásuvky drží jistič i proudový chránič nahoře. Jakmile však do zásuvky zapojíte spotřebič a zapnete ho, proudový chránič okamžitě vypadne. Co je příčinou?',
    options: [
      { id: 'a', text: 'Jistič má příliš malý jmenovitý proud.' },
      { id: 'b', text: 'V zásuvce jsou prohozeny vodiče N a PE (modrý vodič je na kolíku a zeleno-žlutý v pravé dutince).' },
      { id: 'c', text: 'V zásuvce je přerušen fázový vodič L.' },
      { id: 'd', text: 'V rozvaděči chybí přepěťová ochrana.' }
    ],
    correctOptionId: 'b',
    explanation: 'Při prohození N a PE neteče naprázdno žádný proud, takže chránič drží. Po zapnutí spotřebiče se ale pracovní proud vrací z dutinky přes vodič PE mimo součtový transformátor chrániče a chránič do 30 ms vybaví.',
    normReference: 'Diagnostika elektroinstalací',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q7-5',
    chapterId: 7,
    competencyCode: '26-017-H/07',
    question: 'U schodišťového zapojení (dva přepínače č. 6) lze světlo rozsvítit a zhasnout druhým vypínačem jen tehdy, když je první vypínač zapnutý v jedné konkrétní poloze. Kde udělal montér chybu?',
    options: [
      { id: 'a', text: 'Použil slabou žárovku.' },
      { id: 'b', text: 'Na jednom ze schodišťových přepínačů č. 6 prohodil kmenovou (vstupní/výstupní) svorku L s jedním z korespondenčních vodičů.' },
      { id: 'c', text: 'Nepřipojil ochranný vodič PE na svorku vypínače.' },
      { id: 'd', text: 'Použil jistič B10 místo B16.' }
    ],
    correctOptionId: 'b',
    explanation: 'Toto je nejčastější praktická chyba u zkoušky při zapojování spínačů č. 6: přívodní fáze v prvním spínači a odchod ke světlu v druhém spínači musí být na kmenové svorce L (označené šipkou dovnitř nebo barvou), zatímco zbylé 2 svorky jsou korespondenční.',
    normReference: 'Praktická diagnostika',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q7-6',
    chapterId: 7,
    competencyCode: '26-017-H/07',
    question: 'Jistič zásuvkového obvodu B16 po nahození s hlasitou ránou okamžitě vypadne, i když jsou ze všech zásuvek vytaženy všechny spotřebiče. Jak postupujete při hledání místa poruchy?',
    options: [
      { id: 'a', text: 'Podržíme páčku jističe násilím nahoře.' },
      { id: 'b', text: 'Vyměníme jistič B16 za C32.' },
      { id: 'c', text: 'V beznapěťovém stavu měříme ohmetrem / megmetem odpor mezi L–N a L–PE a metodou půlení trasy (rozpojením v prostřední zásuvce) určíme vadný úsek kabelu.' },
      { id: 'd', text: 'Měříme zkrat ohmetrem pod plným napětím 230 V.' }
    ],
    correctOptionId: 'c',
    explanation: 'Okamžité vybavení zkratové spouště bez připojených spotřebičů značí tvrdý zkrat v pevném rozvodu (např. provrtaný kabel nebo seškvařená svorka). V beznapěťovém stavu se obvod rozpojí v polovině trasy a proměří ohmetrem.',
    normReference: 'Metodika hledání závad',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q7-7',
    chapterId: 7,
    competencyCode: '26-017-H/07',
    question: 'V obvodu s impulzním relé (ovládaným 3 tlačítky) relé po stisku tlačítka hlasitě bzučí, hřeje se a světlo nejde přepnout z ostatních míst. Jaká je příčina?',
    options: [
      { id: 'a', text: 'V jednom z míst byl místo tlačítka (ovladače č. 1/0 s pružinou) omylem namontován běžný vypínač č. 1, nebo zůstalo tlačítko mechanicky zaseknuté v sepnuté poloze.' },
      { id: 'b', text: 'Kabel má příliš velký průřez.' },
      { id: 'c', text: 'Svítidlo má malý příkon.' },
      { id: 'd', text: 'Je vypnutý hlavní vypínač.' }
    ],
    correctOptionId: 'a',
    explanation: 'Cívka klasického impulzního relé je dimenzována na krátkodobý proudový impulz (stisk tlačítka). Pokud je použito aretované tlačítko (vypínač č. 1), jde do cívky A1 trvalé napětí, relé je zablokované a cívka může shořet.',
    normReference: 'Praktická diagnostika',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q7-8',
    chapterId: 7,
    competencyCode: '26-017-H/07',
    question: 'Při přiložení jednopólové doutnavkové fázovky na obě dutinky zásuvky (vlevo i vpravo) fázovka svítí, ale připojená lampička nesvítí. Co tento stav znamená?',
    options: [
      { id: 'a', text: 'Do zásuvky je přivedeno sdružené napětí 400 V.' },
      { id: 'b', text: 'V obvodu je přerušen nulový vodič N a přes zapnutý spotřebič se fázové napětí vrací na odpojenou větev vodiče N!' },
      { id: 'c', text: 'Je přerušen fázový vodič L.' },
      { id: 'd', text: 'Fázovka je rozbitá.' }
    ],
    correctOptionId: 'b',
    explanation: 'Když je přerušen vodič N mezi rozvaděčem a zásuvkou a v zásuvce je připojen spotřebič, projde fáze L skrz spotřebič na zdířku N. Protože nemá kam odtéct, objeví se na zdířce N plný potenciál fáze 230 V proti zemi (rozdíl L–N je ale 0 V).',
    normReference: 'Diagnostika elektroinstalací',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q7-9',
    chapterId: 7,
    competencyCode: '26-017-H/07',
    question: 'Jistič B16 v kuchyni nevypadne ihned, ale vypne vždy přibližně po 10 minutách, když současně běží myčka, rychlovarná konvice a elektrická trouba. O jaký jev jde?',
    options: [
      { id: 'a', text: 'Tvrdý zkrat mezi L a PE' },
      { id: 'b', text: 'Nadproudové přetížení obvodu – součet proudů spotřebičů překročil jmenovitý proud 16 A a zapůsobila bimetalová (tepelná) spoušť jističe' },
      { id: 'c', text: 'Vadný proudový chránič' },
      { id: 'd', text: 'Přerušený vodič PE' }
    ],
    correctOptionId: 'b',
    explanation: 'Vypnutí s časovým zpožděním (minuty) při souběhu velkých spotřebičů je typickým projevem tepelné bimetalové spouště jističe při přetížení. Řešením je rozdělení spotřebičů nad 2 kW na samostatné obvody.',
    normReference: 'ČSN 33 2130 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q7-10',
    chapterId: 7,
    competencyCode: '26-017-H/07',
    question: 'Jaké měření musíte bezpodmínečně provést po výměně vadné zásuvky a odstranění poruchy před předáním instalace uživateli?',
    options: [
      { id: 'a', text: 'Žádné, stačí zapnout jistič.' },
      { id: 'b', text: 'Ověřit spojitost ochranného vodiče PE, izolační odpor (je-li zasahováno do kabelu), změřit napětí L–N / L–PE, impedanci poruchové smyčky Zs a otestovat vybavení chrániče RCD.' },
      { id: 'c', text: 'Pouze zkontrolovat barvu krytu zásuvky.' },
      { id: 'd', text: 'Změřit odběr elektroměru.' }
    ],
    correctOptionId: 'b',
    explanation: 'Po každé opravě či zásahu do obvodu je nutné ověřit, že ochrana před úrazem (spojitost PE, impedance smyčky Zs, chránič RCD) i pracovní funkce (napětí 230 V se správnou polohou L vlevo) jsou plně funkční.',
    normReference: 'ČSN 33 2000-6 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },

  // =========================================================================
  // KAPITOLA 8: Poskytování první pomoci při úrazu el. proudem (10 otázek)
  // =========================================================================
  {
    id: 'q8-1',
    chapterId: 8,
    competencyCode: '26-017-H/08',
    question: 'Kolega na pracovišti leží v bezvědomí a rukou křečovitě svírá živý vodič pod napětím 230 V. Co musíte udělat jako ÚPLNĚ PRVNÍ krok?',
    options: [
      { id: 'a', text: 'Holýma rukama ho chytit za ruku a odtrhnout od vodiče' },
      { id: 'b', text: 'Zajistit vlastní bezpečnost a okamžitě přerušit přívod elektrického proudu (vypnout jistič/vypínač, vytáhnout vidlici) nebo odsunout vodič suchým nevodivým předmětem' },
      { id: 'c', text: 'Ihned začít s masáží srdce, i když stále drží živý vodič' },
      { id: 'd', text: 'Polít postiženého kbelíkem vody' }
    ],
    correctOptionId: 'b',
    explanation: 'Železné pravidlo první pomoci: Bezpečnost zachránce je na prvním místě! Dokud je postižený pod napětím, nesmíme se ho holýma rukama dotknout. Nejprve vypneme jistič/vypínač nebo vodič odsuneme suchým nevodivým předmětem (dřevěnou násadou).',
    normReference: 'Zásady první pomoci při úrazu el. proudem',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q8-2',
    chapterId: 8,
    competencyCode: '26-017-H/08',
    question: 'Jaký je správný poměr stlačení hrudníku a záchranných vdechů, hloubka a frekvence při kardiopulmonální resuscitaci (KPR) dospělého člověka?',
    options: [
      { id: 'a', text: '15 stlačení : 2 vdechy, hloubka 2 cm, tempo 60/min' },
      { id: 'b', text: '30 stlačení : 2 vdechy, do hloubky 5 až 6 cm s frekvencí 100 až 120 stlačení za minutu' },
      { id: 'c', text: '50 stlačení : 5 vdechů' },
      { id: 'd', text: 'Pouze umělé dýchání bez stlačování hrudníku' }
    ],
    correctOptionId: 'b',
    explanation: 'Dle platných doporučení ERC je poměr KPR u dospělých 30 stlačení středu hrudníku ku 2 vdechům. Hloubka stlačení je 5 až 6 cm a frekvence 100 až 120 stlačení za minutu.',
    normReference: 'Doporučení ERC pro resuscitaci',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q8-3',
    chapterId: 8,
    competencyCode: '26-017-H/08',
    question: 'Jaký je rozdíl mezi PŘÍMÝMI a NEPŘÍMÝMI účinky elektrického proudu na lidský organismus (Kritérium NSK 8a)?',
    options: [
      { id: 'a', text: 'Přímé účinky způsobuje průchod proudu tělem (tetanické křeče svalů, komorová fibrilace srdce, elektrické popáleniny, elektrolýza krve); nepřímé jsou druhotné úrazy (pád ze žebříku po leknutí, poškození zraku UV zářením oblouku).' },
      { id: 'b', text: 'Přímé účinky způsobuje stejnosměrný proud a nepřímé střídavý proud.' },
      { id: 'c', text: 'Nepřímé účinky vznikají pouze při bouřce.' },
      { id: 'd', text: 'Mezi přímými a nepřímými účinky není rozdíl.' }
    ],
    correctOptionId: 'a',
    explanation: 'Kritérium 8a v Hodnoticím standardu NSK vyžaduje rozlišit přímé účinky (křeče, fibrilace komor, tepelné popáleniny průchodem proudu, chemický rozklad/elektrolýza krve) a nepřímé účinky (pád z výšky po úleku, oslnění obloukem – elektrooftalmie).',
    normReference: 'ČSN IEC 60479-1, Hodnoticí standard NSK',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q8-4',
    chapterId: 8,
    competencyCode: '26-017-H/08',
    question: 'Od jaké hodnoty střídavého proudu (50 Hz) procházejícího rukou dochází k tzv. prahu uvolnění (tetanické křeči, kdy postižený nemůže sám pustit sevřený vodič)?',
    options: [
      { id: 'a', text: '0,1 mA' },
      { id: 'b', text: 'Přibližně 10 až 15 mA' },
      { id: 'c', text: '5 A' },
      { id: 'd', text: '16 A' }
    ],
    correctOptionId: 'b',
    explanation: 'Při střídavém proudu 0,5–1,5 mA je práh vnímání, okolo 10 až 15 mA nastává práh uvolnění (bolestivá křeč svalů předloktí, člověk nemůže otevřít ruku) a nad 50 mA hrozí smrtelná komorová fibrilace srdce.',
    normReference: 'ČSN IEC 60479-1',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q8-5',
    chapterId: 8,
    competencyCode: '26-017-H/08',
    question: 'Jak postupujete, pokud postižený leží v blízkosti spadlého vodiče vysokého napětí (VN nad 1000 V)?',
    options: [
      { id: 'a', text: 'Rychle k němu přiběhneme dlouhými skoky a odsuneme vodič dřevěnou větví.' },
      { id: 'b', text: 'Nepřibližujeme se (udržujeme odstup min. 18–20 m), z nebezpečné zóny ustupujeme snožmo (šoupáním chodidel těsně u sebe kvůli krokovému napětí) a voláme 150/112 a rozvodné závody!' },
      { id: 'c', text: 'Vezmeme si gumové rukavice na nádobí a vodič odpojíme.' },
      { id: 'd', text: 'Polejeme zem vodou.' }
    ],
    correctOptionId: 'b',
    explanation: 'U vysokého napětí hrozí přeskok elektrického oblouku vzduchem a smrtelné krokové napětí na zemi v okruhu až 20 m. Z místa se ustupuje výhradně snožmo (šoupáním nohou u sebe) a vyproštění lze zahájit až po vypnutí a zajištění VN distributorem/hasiči.',
    normReference: 'Zásady první pomoci při úrazu el. proudem',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q8-6',
    chapterId: 8,
    competencyCode: '26-017-H/08',
    question: 'Jakým manévrem zprůchodníte dýchací cesty u bezvědomého postiženého před kontrolou dechu?',
    options: [
      { id: 'a', text: 'Podložením hlavy vysokým polštářem (předklonem hlavy)' },
      { id: 'b', text: 'Záklonem hlavy a zvednutím brady (u pacienta ležícího na zádech)' },
      { id: 'c', text: 'Vytahováním jazyka kleštěmi' },
      { id: 'd', text: 'Posazením bezvědomého na židli' }
    ],
    correctOptionId: 'b',
    explanation: 'U člověka v bezvědomí zapadne kořen jazyka a uzavře dýchací cesty. Jediným správným a okamžitým úkonem pro zprůchodnění dýchacích cest je tlak na čelo (záklon hlavy) a současné přizvednutí brady.',
    normReference: 'Doporučení ERC pro resuscitaci',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q8-7',
    chapterId: 8,
    competencyCode: '26-017-H/08',
    question: 'Proč musí být každý člověk zasažený elektrickým proudem vyšetřen lékařem (EKG), i když je při plném vědomí a cítí se po úrazu dobře?',
    options: [
      { id: 'a', text: 'Pouze kvůli sepsání pojistné události.' },
      { id: 'b', text: 'Protože průchod proudu způsobuje elektrolýzu krve a poškození převodního systému srdce, což může vyvolat život ohrožující srdeční arytmii nebo selhání oběhu i několik hodin po úrazu!' },
      { id: 'c', text: 'Pokud je při vědomí, k lékaři chodit nemusí.' },
      { id: 'd', text: 'Aby dostal tetanovou injekci.' }
    ],
    correctOptionId: 'b',
    explanation: 'Po průchodu elektrického proudu tělem vznikají toxické produkty elektrolýzy krve a mikroskopické změny v srdečním svalu. Proto je nutné lékařské vyšetření a monitorace EKG i u zdánlivě lehkých úrazů.',
    normReference: 'Zásady první pomoci při úrazu el. proudem',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q8-8',
    chapterId: 8,
    competencyCode: '26-017-H/08',
    question: 'Jak správně ošetříte elektrické popáleniny (proudové známky) na kůži postiženého?',
    options: [
      { id: 'a', text: 'Strhneme přiškvařený oděv, propícháme puchýře a namažeme ránu sádlem.' },
      { id: 'b', text: 'Menší plochy chladíme čistou studenou vodou, přiškvařený oděv nikdy nestrháváme, do rány nic nemažeme a překryjeme ji sterilním obvazem.' },
      { id: 'c', text: 'Zasypeme ránu moukou nebo cementem.' },
      { id: 'd', text: 'Popáleniny od proudu se neošetřují.' }
    ],
    correctOptionId: 'b',
    explanation: 'Přiškvařený oděv se nikdy nestrhává (pouze se obstřihne kolem rány), puchýře se nepropichují a nepoužívají se žádné masti ani zásypy. Rána se chladí vodou a sterilně kryje.',
    normReference: 'Zásady první pomoci',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q8-9',
    chapterId: 8,
    competencyCode: '26-017-H/08',
    question: 'Jak postupujete, pokud postižený po vyproštění z elektrického proudu nereaguje a pouze občas zalapá po dechu (tzv. gasping – lapavé dechy)?',
    options: [
      { id: 'a', text: 'Lapavé dýchání považujeme za normální dech a jen čekáme na sanitku.' },
      { id: 'b', text: 'Lapavé dýchání (gasping) je známkou zástavy oběhu – okamžitě voláme 155 a ihned zahajujeme kardiopulmonální resuscitaci (KPR 30:2)!' },
      { id: 'c', text: 'Dáme postiženému napít teplého čaje.' },
      { id: 'd', text: 'Posadíme postiženého do křesla.' }
    ],
    correctOptionId: 'b',
    explanation: 'Terminální lapavé dýchání (gasping) se objevuje v prvních minutách po zástavě srdce (při komorové fibrilaci). Nejde o normální dýchání – je nutné okamžitě zahájit KPR a použít AED!',
    normReference: 'Doporučení ERC pro resuscitaci',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q8-10',
    chapterId: 8,
    competencyCode: '26-017-H/08',
    question: 'Jaká jsou telefonní čísla tísňových linek v ČR (Zdravotnická záchranná služba, Hasiči, Policie ČR, Jednotné evropské číslo)?',
    options: [
      { id: 'a', text: 'ZZS: 158, Hasiči: 155, Policie: 150' },
      { id: 'b', text: 'ZZS: 155, Hasiči: 150, Policie ČR: 158, Jednotné evropské číslo tísňového volání: 112' },
      { id: 'c', text: 'ZZS: 911, Hasiči: 118' },
      { id: 'd', text: 'ZZS: 156' }
    ],
    correctOptionId: 'b',
    explanation: 'Při zdravotním ohrožení života voláme přednostně Zdravotnickou záchrannou službu 155 (operátor vede zachránce k instrukcím KPR po telefonu) nebo linku 112. Hasiči jsou 150, Policie ČR 158, Městská policie 156.',
    normReference: 'Integrovaný záchranný systém ČR',
    difficulty: 'normal'
  },

  // =========================================================================
  // DOPLŇUJÍCÍ OTÁZKY ZE SOUBORU TESTŮ (aktualizované dle NV 194/2022 Sb. a ČSN)
  // =========================================================================
  {
    id: 'q1-11',
    chapterId: 1,
    competencyCode: '26-017-H/01',
    question: 'Jaký je povolený maximální výsledný odpor uzemnění vodiče PEN v síti TN-C u zdroje (transformátoru) vč. zemničů v okruhu do 200 m od zdroje dle ČSN 33 2000-4-41 ed. 3?',
    options: [
      { id: 'a', text: 'Maximálně 2 Ω' },
      { id: 'b', text: 'Maximálně 15 Ω' },
      { id: 'c', text: 'Maximálně 50 Ω' },
      { id: 'd', text: 'Hodnota není normou vůbec stanovena' }
    ],
    correctOptionId: 'a',
    explanation: 'Podle ČSN 33 2000-4-41 ed. 3 (Národní příloha NA) nesmí celkový výsledný odpor uzemnění vodiče PEN u transformátoru (včetně všech uzemnění v délce do 200 m od zdroje) přesáhnout hodnotu 2 Ω (jednotlivé doplňující uzemnění na konci odbočky má mít max. 15 Ω, resp. v sítích TT u chrániče max. 50 V / IΔn).',
    normReference: 'ČSN 33 2000-4-41 ed. 3',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q1-12',
    chapterId: 1,
    competencyCode: '26-017-H/01',
    question: 'Jakou barvu má mít podle ČSN EN 60204-1 ed. 3 tlačítkový ovladač se střídavou funkcí START / STOP (jeden stisk zapne, druhý stisk vypne) a co platí pro zásuvky obvodů SELV a PELV?',
    options: [
      { id: 'a', text: 'Tlačítko START/STOP musí být červené; zásuvky SELV mají ochranný kolík.' },
      { id: 'b', text: 'Tlačítko se střídavou funkcí START/STOP má mít barvu BÍLOU, ŠEDOU nebo ČERNOU (nikdy ne červenou ani zelenou!); zásuvky SELV i PELV musí být nezaměnitelné s běžnými zásuvkami 230 V a zásuvky SELV NESMÍ mít kontakt pro ochranný vodič PE!' },
      { id: 'c', text: 'Tlačítko START/STOP musí být žluté; zásuvky SELV jsou běžné zásuvky 230 V.' },
      { id: 'd', text: 'Tlačítko START/STOP musí být zelené.' }
    ],
    correctOptionId: 'b',
    explanation: 'Dle ČSN EN 60204-1 ed. 3 je červená vyhrazena pro STOP/nouzové zastavení, zelená pro START (zapnutí) a žlutá pro potlačení abnormálního stavu. Pro střídavou funkci START/STOP se používá bílá, šedá nebo černá. Dle ČSN 33 2000-4-41 ed. 3 nesmí mít zásuvky SELV ochranný kontakt PE (živé části SELV nesmí být spojeny se zemí ani s PE).',
    normReference: 'ČSN EN 60204-1 ed. 3, ČSN 33 2000-4-41 ed. 3',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q2-11',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Za jakých povětrnostních podmínek se NESMÍ pracovat na venkovním elektrickém zařízení a je dovoleno zapínat odpojené elektrické zařízení jen podle předem dohodnutého časového intervalu?',
    options: [
      { id: 'a', text: 'Pracovat venku lze za každého počasí a zapnutí v dohodnutou hodinu je běžný postup.' },
      { id: 'b', text: 'Na venkovním zařízení se nesmí pracovat za tmy (bez dostatečného osvětlení), bouřky, prudkého deště, silného větru, husté mlhy nebo sněžení. Zapínat elektrické zařízení pouze po uplynutí předem dohodnuté doby (na čas) je PŘÍSNĚ ZAKÁZÁNO!' },
      { id: 'c', text: 'Pracovat venku se nesmí jen v zimě pod 0 °C.' },
      { id: 'd', text: 'Zapnutí na čas je povoleno, pokud si montéři seřídí hodinky.' }
    ],
    correctOptionId: 'b',
    explanation: 'Dle ČSN EN 50110-1 ed. 3 je práce venku při bouřce, husté mlze, prudkém větru či silném dešti zakázána (pokud nejde o nezbytné zajištění při havárii). Znovu zapnout odpojené zařízení lze výhradně na základě výslovného hlášení vedoucího práce o ukončení práce a odvolání všech osob – zapínání v předem dohodnutém čase je přísně zakázáno!',
    normReference: 'ČSN EN 50110-1 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q2-12',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Jaké jsou rozměry „zóny dosahu ruky“ (kam nesmí být umístěny živé části bez izolace/krytu) a kdy se dvě vodivé části považují za „současně přístupné dotyku“?',
    options: [
      { id: 'a', text: 'Zóna dosahu ruky je 5 m do všech stran; současně přístupné jsou části vzdálené do 10 m.' },
      { id: 'b', text: 'Zóna dosahu ruky sahá od podlahy 2,5 m směrem nahoru a 1,25 m vodorovně i směrem dolů. Za současně přístupné dotyku se považují vodivé části vzdálené od sebe nejvýše 2,5 m!' },
      { id: 'c', text: 'Zóna dosahu ruky je 1,8 m nahoru a 0,5 m do stran.' },
      { id: 'd', text: 'Současně přístupné jsou pouze části vzdálené do 0,5 m.' }
    ],
    correctOptionId: 'b',
    explanation: 'Podle ČSN 33 2000-4-41 ed. 3 sahá zóna dosahu ruky od plochy, na níž osoba stojí, do výšky 2,5 m nahoru a 1,25 m vodorovně a dolů. Dvě vodivé části (např. neživá část spotřebiče a kovové potrubí) jsou současně přístupné dotyku rozpaženýma rukama, jsou-li od sebe vzdáleny nejvýše 2,5 m.',
    normReference: 'ČSN 33 2000-4-41 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q3-11',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'Jaký je minimální dovolený průřez ochranného vodiče PE (ze stejného kovu jako fázový vodič L) ve vztahu k průřezu fázového vodiče SL dle tabulky 54.2 ČSN 33 2000-5-54 ed. 3?',
    options: [
      { id: 'a', text: 'Pro fázový vodič SL ≤ 16 mm² musí být SPE = SL; pro 16 mm² < SL ≤ 35 mm² je SPE = 16 mm²; pro SL > 35 mm² je SPE ≥ SL / 2 (polovina průřezu fáze).' },
      { id: 'b', text: 'Ochranný vodič PE může mít vždy poloviční průřez i u kabelů 1,5 mm² a 2,5 mm².' },
      { id: 'c', text: 'Ochranný vodič PE má mít vždy 1,5 mm² bez ohledu na průřez fáze.' },
      { id: 'd', text: 'Ochranný vodič PE musí být vždy dvojnásobný oproti fázi.' }
    ],
    correctOptionId: 'a',
    explanation: 'Dle tabulky 54.2 ČSN 33 2000-5-54 ed. 3 musí mít ochranný vodič PE až do průřezu fáze 16 mm² včetně shodný průřez jako fáze (SPE = SL). Pro fáze 25 a 35 mm² postačuje PE 16 mm², a nad 35 mm² postačuje poloviční průřez fáze (SL / 2).',
    normReference: 'ČSN 33 2000-5-54 ed. 3',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q3-12',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'Jak se správně zapojuje šroubová pojistka (Diazed), jakou výstražnou fólií se kryjí silové kabely v zemi a v jaké minimální výšce musí být spodní okraj hlavní domovní pojistkové skříně (HDS)?',
    options: [
      { id: 'a', text: 'Přívod do závitu pojistky, modrá fólie, HDS 0,2 m nad zemí.' },
      { id: 'b', text: 'Přívod od zdroje vždy na STŘEDOVÝ (spodní) kontakt pojistkového spodku a odchod ke spotřebiči na boční závit; nad silové kabely v zemi se klade ČERVENÁ výstražná fólie; spodní okraj HDS musí být min. 0,6 m (60 cm) nad zemí/podlahou!' },
      { id: 'c', text: 'Na zapojení pojistky nezáleží, fólie je zelená, HDS 2,5 m nad zemí.' },
      { id: 'd', text: 'Přívod na závit, žlutá fólie (jako u plynu), HDS těsně u země.' }
    ],
    correctOptionId: 'b',
    explanation: 'U šroubové pojistky musí jít přívod na hluboko uložený středový kontakt, aby při vyšroubování hlavice nebyl závit pod napětím. Silové kabely v zemi se kryjí červenou výstražnou fólií (žlutá je pro plyn!) a spodní hrana skříně HDS musí být dle ČSN 33 2130 ed. 3 minimálně 0,6 m nad definitivním terénem.',
    normReference: 'ČSN 33 2130 ed. 3, ČSN 73 6005',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-11',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Která metoda návrhu ochranného prostoru jímací soustavy hromosvodu (LPS) je podle platných norem řady ČSN EN 62305 univerzálně použitelná pro VŠECHNY druhy a tvary staveb?',
    options: [
      { id: 'a', text: 'Pouze metoda ochranného úhlu' },
      { id: 'b', text: 'Metoda valící se koule (bleskové koule o poloměru r dle třídy LPL I až IV)' },
      { id: 'c', text: 'Metoda mřížové soustavy bez svodů' },
      { id: 'd', text: 'Metoda náhodného jímače' }
    ],
    correctOptionId: 'b',
    explanation: 'Metoda ochranného úhlu je omezena výškou a složitostí tvaru budovy. Naproti tomu metoda valící se koule (s poloměrem koule 20 m pro LPL I, 30 m pro LPL II, 45 m pro LPL III a 60 m pro LPL IV) je podle ČSN EN 62305-3 vhodná pro návrh jímací soustavy u všech typů a geometrických tvarů staveb.',
    normReference: 'ČSN EN 62305-3 ed. 2',
    difficulty: 'normal'
  },
  {
    id: 'q4-12',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Musí být uzemnění hromosvodu (LPS) propojeno s uzemněním silnoproudé elektroinstalace v budově podle současných norem ČSN 33 2000-5-54 ed. 3 a ČSN EN 62305?',
    options: [
      { id: 'a', text: 'Ne, hromosvod a silnoproudé uzemnění se nesmí nikdy spojovat.' },
      { id: 'b', text: 'Ano! Současné normy vyžadují vytvořit společnou uzemňovací soustavu a ekvipotenciální pospojování všech uzemnění na hlavní uzemňovací svorkovnici (MET / HOP), aby mezi rozvodem v domě a hromosvodem nevznikl nebezpečný rozdíl potenciálů.' },
      { id: 'c', text: 'Spojují se pouze přes pojistku 10 A.' },
      { id: 'd', text: 'Hromosvod se uzemňuje do vodovodního potrubí v koupelně.' }
    ],
    correctOptionId: 'b',
    explanation: 'Zatímco historická ČSN 34 1390 připouštěla oddělené uzemnění při vzdálenosti nad 5 m, platné normy ČSN 33 2000-5-54 ed. 3 a ČSN EN 62305-3 vyžadují integraci všech uzemňovacích systémů budovy do jedné společné uzemňovací soustavy propojené přes hlavní uzemňovací svorkovnici MET/HOP (příp. přes jiskřiště SPD).',
    normReference: 'ČSN 33 2000-5-54 ed. 3, ČSN EN 62305-3 ed. 2',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q5-11',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'Jaký smí být maximální odpor ochranného vodiče PE (mezi kolíkem vidlice a přístupnou kovovou částí) u ručního elektrického nářadí a spotřebičů třídy ochrany I s přívodním kabelem délky do 5 m dle ČSN EN 50699 (ČSN 33 1600 ed. 2 Z2)?',
    options: [
      { id: 'a', text: 'Maximálně 0,3 Ω do délky přívodu 5 m (+ 0,1 Ω na každých dalších 7,5 m, nejvýše však 1,0 Ω); ve starších testech před změnou Z2 se uvádělo 0,2 Ω do 3 m.' },
      { id: 'b', text: 'Maximálně 15 Ω' },
      { id: 'c', text: 'Maximálně 50 Ω' },
      { id: 'd', text: 'U spotřebičů třídy I se odpor PE neměří' }
    ],
    correctOptionId: 'a',
    explanation: 'Podle platné ČSN EN 50699 (zavedené změnou Z2 v ČSN 33 1600 ed. 2) nesmí odpor ochranného vodiče PE u spotřebičů a nářadí třídy I s kabelem do 5 m překročit 0,3 Ω (dříve před změnou Z2 platil limit 0,2 Ω pro přívod do 3 m). Měří se proudem min. 200 mA.',
    normReference: 'ČSN EN 50699, ČSN 33 1600 ed. 2 Z2',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q5-12',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'Kdy musí být na novém nebo rekonstruovaném vyhrazeném elektrickém zařízení provedena VÝCHOZÍ REVIZE a kdo ji smí vypracovat dle zákona č. 250/2021 Sb. a NV č. 194/2022 Sb.?',
    options: [
      { id: 'a', text: 'Do 1 roku po nastěhování uživatele; vypracuje ji běžný elektromontér (§ 6).' },
      { id: 'b', text: 'Vždy PŘED uvedením elektrického zařízení do provozu! Vypracovat ji smí výhradně Revizní technik vyhrazených elektrických zařízení (§ 8 NV č. 194/2022 Sb.).' },
      { id: 'c', text: 'Výchozí revize už dnes není povinná.' },
      { id: 'd', text: 'Stačí ústní souhlas stavbyvedoucího.' }
    ],
    correctOptionId: 'b',
    explanation: 'Podle zákona č. 250/2021 Sb. nesmí být vyhrazené elektrické zařízení uvedeno do provozu bez kladné Zprávy o výchozí revizi (s výjimkou drobných úprav bez změny jištění, kde postačí písemný záznam o kontrole). Revizi smí provádět výhradně revizní technik s kvalifikací dle § 8 NV č. 194/2022 Sb.',
    normReference: 'Zákon č. 250/2021 Sb., NV č. 194/2022 Sb.',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q6-11',
    chapterId: 6,
    competencyCode: '26-017-H/06',
    question: 'Do jaké hloubky v zemi se ukládají vodorovné páskové zemniče, jaká je minimální vzdálenost paralelních tyčových zemničů a co se NESMÍ použít jako náhodný zemnič?',
    options: [
      { id: 'a', text: 'Hloubka 10 cm pod trávník; tyče 10 cm od sebe; jako zemnič lze použít plynovod.' },
      { id: 'b', text: 'Vodorovné zemniče se ukládají do nezámrzné hloubky 0,8 m až 1,5 m; vzdálenost svislých tyčových zemničů musí být alespoň rovna délce tyče; jako náhodný zemnič se NESMÍ použít kovové ploty, zábradlí ani potrubí hořlavých plynů/kapalin a topení!' },
      { id: 'c', text: 'Zemniče se ukládají do hloubky 5 m.' },
      { id: 'd', text: 'Jako zemnič stačí kovové zábradlí schodiště.' }
    ],
    correctOptionId: 'b',
    explanation: 'Dle ČSN 33 2000-5-54 ed. 3 se vodorovné zemniče ukládají v hloubce 0,8 až 1,5 m (kde půda v zimě nepromrzá a v létě nevysychá). Tyčové zemniče musí být od sebe vzdáleny minimálně o svou délku. Kovová zábradlí, ploty či plynovody je přísně zakázáno používat jako zemniče.',
    normReference: 'ČSN 33 2000-5-54 ed. 3',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q6-12',
    chapterId: 6,
    competencyCode: '26-017-H/06',
    question: 'Kolik ochranných vodičů PE smí být v rozvaděči připojeno pod jeden šroub na ochranné přípojnici PE a jak musí být řešeny dveře elektrické provozovny (rozvodny)?',
    options: [
      { id: 'a', text: 'Pod jeden šroub lze dát až 4 vodiče PE; dveře se otevírají dovnitř rozvodny.' },
      { id: 'b', text: 'Pod jeden připojovací šroub (do jedné svorky) smí být připojen VŽDY POUZE 1 ochranný vodič PE! Dveře elektrické provozovny se musí otevírat směrem VEN a z vnitřní strany musí mít kliku/kování umožňující okamžité otevření a únik i tehdy, jsou-li zvenku uzamčeny na klíč!' },
      { id: 'c', text: 'Vodiče PE se k sobě pouze zakroutí bez svorkovnice.' },
      { id: 'd', text: 'Dveře rozvodny mají zevnitř pouze otvor na klíč bez kliky.' }
    ],
    correctOptionId: 'b',
    explanation: 'Na ochranné přípojnici PE musí mít každý ochranný vodič svou samostatnou svorku (šroub), aby při uvolnění jednoho spoje nedošlo k odpojení dalších obvodů. Dveře rozvoden se z bezpečnostních důvodů vždy otevírají směrem ven do únikové cesty a zevnitř musí jít otevřít klikou nebo panikovou hrazdou bez klíče.',
    normReference: 'ČSN 33 2000-5-54 ed. 3, ČSN 33 2000-5-53',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q7-11',
    chapterId: 7,
    competencyCode: '26-017-H/07',
    question: 'Jaké vodiče musí odpojit obvod nouzového zastavení (CENTRAL STOP / Emergency Stop) a jak se musí zachovat při ztrátě (výpadku) ovládacího napětí na cívce stykače?',
    options: [
      { id: 'a', text: 'Odpojuje pouze ochranný vodič PE; při ztrátě napětí zůstává sepnutý.' },
      { id: 'b', text: 'Musí odpojit od přívodu všechny živé (pracovní) vodiče kromě vodiče PEN / PE a musí bezpečně fungovat (vypnout stroj) i při ztrátě nebo poklesu napětí na cívce stykače (princip klidového proudu / podpěťového vybavení)!' },
      { id: 'c', text: 'Odpojuje pouze jednu fázi L1.' },
      { id: 'd', text: 'Tlačítko nouzového zastavení má spínací kontakt, takže při přerušení drátu nefunguje.' }
    ],
    correctOptionId: 'b',
    explanation: 'Obvod nouzového zastavení a vypnutí musí odpojit všechny živé vodiče (L1, L2, L3, příp. N), ale NIKDY nesmí přerušit ochranný vodič PE ani PEN! Tlačítka STOP se zapojují s rozpínacím kontaktem (NC) do obvodu cívky stykače, takže i při přetržení vodiče nebo ztrátě napětí stykač okamžitě odpadne a stroj bezpečně zastaví.',
    normReference: 'ČSN EN 60204-1 ed. 3, ČSN 33 2000-5-53',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q7-12',
    chapterId: 7,
    competencyCode: '26-017-H/07',
    question: 'K čemu slouží na revizním měřicím přístroji režim měření impedance poruchové smyčky Zs s označením „RCD / No-trip“?',
    options: [
      { id: 'a', text: 'Slouží k vybití baterie v přístroji.' },
      { id: 'b', text: 'Umožňuje změřit impedanci smyčky Zs (mezi L a PE) v obvodech za proudovým chráničem 30 mA malým zkušebním proudem (< 15 mA), aniž by měřicí přístroj proudový chránič během měření shodil!' },
      { id: 'c', text: 'Slouží k měření izolačního odporu napětím 1000 V.' },
      { id: 'd', text: 'Zvyšuje zkratový proud v síti.' }
    ],
    correctOptionId: 'b',
    explanation: 'Klasické měření impedance smyčky Zs mezi L a PE zatěžuje obvod zkušebním proudem několika ampérů, což proudový chránič s IΔn = 30 mA vyhodnotí jako zemní poruchu a okamžitě vybaví. Režim „No-trip“ (bez vybavení RCD) měří proudem pod 0,5× IΔn (< 15 mA), takže chránič zůstane sepnutý.',
    normReference: 'ČSN 33 2000-6 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q8-11',
    chapterId: 8,
    competencyCode: '26-017-H/08',
    question: 'Která cesta průchodu elektrického proudu lidským tělem je z hlediska rizika komorové fibrilace srdce nejnebezpečnější a jaký vliv má vlhkost kůže na elektrický odpor těla?',
    options: [
      { id: 'a', text: 'Pravá noha – levá noha; za mokra odpor těla roste.' },
      { id: 'b', text: 'Levá ruka – nohy (nebo ruka – ruka přes hrudník), protože proud prochází přímo srdečním svalem! Vlhká, zpocená nebo mokrá kůže snižuje odpor lidského těla z běžných 1 000–3 000 Ω až pod 500 Ω, čímž dramaticky roste protékající proud!' },
      { id: 'c', text: 'Prsty jedné ruky; vlhkost nemá na odpor žádný vliv.' },
      { id: 'd', text: 'Nejnebezpečnější je dotyk přes gumovou podrážku.' }
    ],
    correctOptionId: 'b',
    explanation: 'Podle ČSN IEC 60479-1 má největší činitel srdečního proudu dráha procházející hrudníkem (levá ruka – obě nohy nebo ruka – ruka). Odpor lidského těla tvoří z největší části odpor pokožky – při namočení kůže odpor prudce klesá a podle Ohmova zákona (I = U / R) úměrně roste proud procházející srdcem.',
    normReference: 'ČSN IEC 60479-1',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q8-12',
    chapterId: 8,
    competencyCode: '26-017-H/08',
    question: 'Kam na hrudník dospělého postiženého se lepí samolepicí elektrody automatizovaného externího defibrilátoru (AED) a co je nutné dodržet v okamžiku analýzy rytmu a podání výboje?',
    options: [
      { id: 'a', text: 'Obě elektrody se nalepí na záda přes košili a během výboje držíme postiženého za ruku.' },
      { id: 'b', text: 'Elektrody se lepí na obnažený a osušený hrudník: jedna pod pravou klíční kost, druhá na levou stranu hrudníku pod podpaží (tak, aby elektrický výboj prošel osou srdce). Během analýzy rytmu a při podání výboje se NIKDO NESMÍ postiženého dotýkat!' },
      { id: 'c', text: 'Jedna elektroda na čelo a druhá na koleno.' },
      { id: 'd', text: 'AED se používá pouze u lidí, kteří jsou při vědomí a mluví.' }
    ],
    correctOptionId: 'b',
    explanation: 'AED slouží k elektrické defibrilaci (zrušení smrtelné komorové fibrilace srdce po úrazu proudem). Elektrody se lepí na holý hrudník dle nákresu (pravá horní část hrudníku pod klíční kostí + levý bok pod prsním svalem). Při analýze EKG a při výboji musí zachránce odstoupit a nikdo se nesmí pacienta dotýkat.',
    normReference: 'Doporučení ERC pro resuscitaci',
    difficulty: 'normal',
    practicalExamRelevant: true
  }
];

