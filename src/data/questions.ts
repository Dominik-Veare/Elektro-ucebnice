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
      { id: 'a', text: '10 A (při uvažování sdruženého napětí 400 V mezi fázemi)' },
      { id: 'b', text: '2,5 A (podle zjednodušeného vzorce pro poloviční výkon)' },
      { id: 'c', text: '10,5 A (při zanedbání činného odporu topné spirály)' },
      { id: 'd', text: '5 A (podle Ohmova zákona I = U / R = 230 / 46)' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'VA (voltampér – jednotka pro zdánlivý elektrický výkon S)' },
      { id: 'b', text: 'W (watt – jednotka pro činný elektrický výkon P)' },
      { id: 'c', text: 'Wh (watthodina – jednotka pro odebranou elektrickou práci)' },
      { id: 'd', text: 'var (voltampér reaktanční pro střídavé jalové obvody)' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'V celé trase rozvodu je použit pouze vodič PEN a k oddělení nulového vodiče N v domovních objektech vůbec nedochází.' },
      { id: 'b', text: 'V celé síti od transformátoru je veden výhradně samostatný vodič PE a N, které se nesmí nikde v instalaci spojit.' },
      { id: 'c', text: 'V první části sítě je sloučený vodič PEN, v místě rozdělení se rozdělí na PE a N a dále se již nesmí znovu spojit.' },
      { id: 'd', text: 'Síť nemá uzemněný nulový bod zdroje a neživé části jsou chráněny pouze izolačním transformátorem s hlídačem izolace.' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: '10 mm² mědi (Cu) nebo 16 mm² hliníku (Al)' },
      { id: 'b', text: '16 mm² mědi (Cu) nebo 25 mm² hliníku (Al)' },
      { id: 'c', text: '6 mm² mědi (Cu) nebo 10 mm² hliníku (Al)' },
      { id: 'd', text: '4 mm² mědi (Cu) nebo 6 mm² hliníku (Al)' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'PE je zeleno-žlutý a smí se přeznačit modrou páskou na N; v DC soustavě jsou oba póly černé s popiskem na svorce.' },
      { id: 'b', text: 'PE smí být celistvě žlutý nebo zelený; v DC soustavě je kladný pól (+) modrý a záporný pól (−) zeleno-žlutý.' },
      { id: 'c', text: 'PE je výhradně zeleno-žlutý; v DC soustavě je kladný pól (+) červený, záporný pól (−) bílý a střední vodič (M) modrý.' },
      { id: 'd', text: 'PE je světle modrý; v DC soustavě je kladný pól (+) černý, záporný pól (−) šedý a střední vodič (M) hnědý.' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Druhá číslice udává třídu dielektrické pevnosti izolace; přídavné písmeno B specifikuje nehořlavý samozhášivý plast.' },
      { id: 'b', text: 'Druhá číslice udává prachotěsnost krytu; přídavné písmeno B označuje venkovní instalaci odolnou proti bouřkám a větru.' },
      { id: 'c', text: 'Druhá číslice udává mechanickou rázovou odolnost IK; přídavné písmeno B značí zařízení určené pro bateriový provoz.' },
      { id: 'd', text: 'Druhá číslice udává ochranu před vniknutím vody; přídavné písmeno B udává ochranu před nebezpečným dotykem prstem.' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: '20 Ω (výsledný odpor dvou paralelních odporů 60 Ω a 30 Ω)' },
      { id: 'b', text: '15 Ω (odpovídá paralelnímu spojení tří stejných odporů)' },
      { id: 'c', text: '45 Ω (odpovídá prostému aritmetickému průměru odporů)' },
      { id: 'd', text: '90 Ω (odpovídá sériovému zapojení součtem obou odporů)' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'SELV je napájen přímo z běžné sítě přes autotransformátor; PELV má dvojitou izolaci; FELV je bateriový obvod.' },
      { id: 'b', text: 'SELV je bezpečně oddělen od sítě a zcela NEUZEMNĚN; PELV je bezpečně oddělen a UZEMNĚN; FELV není bezpečně oddělen.' },
      { id: 'c', text: 'SELV je určen pouze pro stejnosměrný proud; PELV pro třífázový střídavý proud; FELV pro vysoké napětí nad 1000 V.' },
      { id: 'd', text: 'SELV vyžaduje přímé uzemnění sekundáru; PELV nesmí být nikdy spojen se zemí; FELV má galvanické oddělení transformátorem.' }
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
      { id: 'a', text: '2,00 Ω (při zanedbání měrné vodivosti měděného jádra)' },
      { id: 'b', text: '0,20 Ω (dle vzorce R = l / (γ · S) = 28 / (56 · 2,5))' },
      { id: 'c', text: '1,25 Ω (při chybném násobení průřezu délkou vodiče)' },
      { id: 'd', text: '0,50 Ω (při uvažování měrné vodivosti hliníku γ = 35)' }
    ],
    correctOptionId: 'b',
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
      { id: 'a', text: '4,00 kW (jmenovitý zdánlivý příkon motoru bez účiníku)' },
      { id: 'b', text: '5,89 kW (dle vzorce P = √3 · U · I · cos φ)' },
      { id: 'c', text: '6,93 kW (činný výkon při ideálním účiníku cos φ = 1,0)' },
      { id: 'd', text: '3,40 kW (při jednofázovém výpočtu bez odmocniny ze 3)' }
    ],
    correctOptionId: 'b',
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
      { id: 'a', text: 'Nařízení vlády č. 194/2022 Sb. (o požadavcích na odbornou způsobilost v elektrotechnice)' },
      { id: 'b', text: 'Vyhláška Ministerstva průmyslu a obchodu č. 100/2020 Sb. o vyhrazených technických zařízeních' },
      { id: 'c', text: 'Zákoník práce č. 262/2006 Sb. o bezpečnosti provozu a ochraně zdraví při práci na stavbách' },
      { id: 'd', text: 'Zákon o ochraně veřejného zdraví č. 258/2000 Sb. ve znění pozdějších prováděcích vyhlášek' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: '§ 3 Osoba poučená, § 4 Znalý montér, § 5 Zkušební komisař a § 6 Revizní elektrotechnik sítí' },
      { id: 'b', text: '§ 5 Pracovník seznámený, § 6 Samostatný montér, § 7 Mistr provozu a § 8 Hlavní revizní inženýr' },
      { id: 'c', text: '§ 4 Osoba zaškolená, § 5 Elektromontér sítí, § 6 Projektant rozvodů a § 7 Revizní technik TIČR' },
      { id: 'd', text: '§ 4 Osoba poučená, § 6 Elektrotechnik, § 7 Vedoucí elektrotechnik a § 8 Revizní technik' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: '1. Uzemnit a zkratovat, 2. Odpojit od napětí, 3. Ověřit beznapěťový stav, 4. Zabezpečit proti zapnutí, 5. Opatření vůči okolí' },
      { id: 'b', text: '1. Ověřit beznapěťový stav, 2. Odpojit vypínačem, 3. Nasadit izolační rukavice, 4. Uzemnit fázové vodiče, 5. Zahájit práci' },
      { id: 'c', text: '1. Zabezpečit proti zapnutí, 2. Odpojit jističe, 3. Zkratovat bez uzemnění, 4. Vyvěsit výstražnou tabulku, 5. Zahájit měření' },
      { id: 'd', text: '1. Úplně odpojit, 2. Zabezpečit proti zapnutí, 3. Ověřit beznapěťový stav, 4. Uzemnit a zkratovat, 5. Opatření vůči okolí' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'Ověřenou dvoupólovou zkoušečkou, jejíž funkčnost se zkontroluje těsně před i po měření!' },
      { id: 'b', text: 'Dotykem hřbetu ruky přes dielektrickou rukavici s následným kontrolním měřením proudu kleštěmi' },
      { id: 'c', text: 'Jednopólovou fázovkou (doutnavkou) dotykem na izolaci kabelu před zahájením práce na vedení' },
      { id: 'd', text: 'Klasickým multimetrem přepnutým na rozsah měření odporu nebo propípávání zkratu na svorkách' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'Nejprve se vždy spolehlivě připojí k uzemnění (PE/zemniči) a teprve potom na fázové vodiče!' },
      { id: 'b', text: 'Zkratují se výhradně fázové vodiče mezi sebou a k uzemnění se nepřipojují, aby netekl proud do země.' },
      { id: 'c', text: 'Pořadí připojení je libovolné, zásadní je pouze to, aby byl před montáží vypnut hlavní jistič rozvodu.' },
      { id: 'd', text: 'Nejprve se připojí na fázové vodiče a teprve potom se druhý konec připojí k uzemňovací svorce PE.' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'V síti TN 1,0 s a v síti TT 0,5 s (pro koncové obvody do 32 A při 230 V)' },
      { id: 'b', text: 'V síti TN 0,4 s a v síti TT 0,2 s (pro koncové obvody do 32 A při 230 V)' },
      { id: 'c', text: 'V síti TN 0,2 s a v síti TT 0,4 s (pro koncové obvody do 32 A při 230 V)' },
      { id: 'd', text: 'V síti TN 0,8 s a v síti TT 0,4 s (pro koncové obvody do 32 A při 230 V)' }
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
      { id: 'a', text: '12 V AC a 25 V DC (pro běžné prostory bez zvláštního rizika)' },
      { id: 'b', text: '50 V AC a 120 V DC (pro běžné prostory bez zvláštního rizika)' },
      { id: 'c', text: '100 V AC a 200 V DC (pro běžné prostory bez zvláštního rizika)' },
      { id: 'd', text: '25 V AC a 60 V DC (pro běžné prostory bez zvláštního rizika)' }
    ],
    correctOptionId: 'b',
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
      { id: 'a', text: 'Při práci pod dohledem je vedoucí trvale přítomen u pracovníka; při práci pod dozorem postačí občasná kontrola.' },
      { id: 'b', text: 'Mezi oběma pojmy není právní rozdíl, v obou případech smí pracovník pracovat zcela samostatně bez přítomnosti jiné osoby.' },
      { id: 'c', text: 'Při práci pod dohledem provádí odpovědná osoba občasnou kontrolu; při práci pod dozorem je TRVALE PŘÍTOMNA na pracovišti.' },
      { id: 'd', text: 'Práce pod dohledem vyžaduje přítomnost revizního technika; při práci pod dozorem postačí osoba poučená dle § 4.' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Použití výstražných tabulek, dielektrických rukavic, izolačních koberců a bezpečnostních přileb' },
      { id: 'b', text: 'Hlavní vypínač rozvodnice, tlačítko nouzového zastavení CENTRAL STOP a optoelektronické závory' },
      { id: 'c', text: 'Automatické odpojení od zdroje, přídavná/zesílená izolace, ochranné pospojování a elektrické oddělení' },
      { id: 'd', text: 'Základní izolace živých částí, kryty a přepážky IP 2X, zábrany a ochrana polohou mimo dosah ruky' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Pro všechny laické zásuvky do 32 A, venkovní mobilní zařízení do 32 A, všechny světelné obvody a celou koupelnu.' },
      { id: 'b', text: 'Výhradně pro zásuvku pračky v koupelně a venkovní zásuvku, ostatní obvody chránič mít nesmějí.' },
      { id: 'c', text: 'Pro veškeré obvody v bytě kromě chladničky a mrazáku, u kterých norma předepisuje zapojení bez chrániče.' },
      { id: 'd', text: 'Pouze pro třífázové zásuvky 400 V v garáži a dílně, u jednofázových 230V zásuvek v bytech je zakázán.' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'IB ≤ Iz ≤ In (a současně platí podmínka pro jmenovité vypínací přetížení I2 = 2 · In)' },
      { id: 'b', text: 'In ≤ IB ≤ Iz (a současně platí podmínka pro velký zkušební proud I2 ≥ 1,13 · In)' },
      { id: 'c', text: 'Iz ≤ In ≤ IB (a současně platí podmínka pro velký zkušební proud I2 ≤ 1,45 · IB)' },
      { id: 'd', text: 'IB ≤ In ≤ Iz (a současně platí podmínka pro velký zkušební proud I2 ≤ 1,45 · Iz)' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'B: 5 až 10× In, C: 10 až 20× In, D: 20 až 50× In' },
      { id: 'b', text: 'B: 2 až 4× In, C: 4 až 8× In, D: 8 až 15× In' },
      { id: 'c', text: 'B: 3 až 5× In, C: 5 až 10× In, D: 10 až 20× In' },
      { id: 'd', text: 'B: 1 až 2× In, C: 2 až 4× In, D: 4 až 8× In' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: '5 % pro světelné obvody a 10 % pro zásuvkové a ostatní koncové obvody' },
      { id: 'b', text: '2 % pro světelné obvody a 3 % pro zásuvkové a ostatní koncové obvody' },
      { id: 'c', text: '3 % pro světelné obvody a 5 % pro zásuvkové a ostatní koncové obvody' },
      { id: 'd', text: '1 % pro světelné obvody a 2 % pro zásuvkové a ostatní koncové obvody' }
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
      { id: 'a', text: 'SPD T1 i T2 se montují výhradně do elektroměrového rozvaděče před měření; celková délka připojovacích vodičů k PE musí být min. 1,0 m.' },
      { id: 'b', text: 'SPD T1 (vlna 10/350 µs) na vstupu do objektu, SPD T2 (vlna 8/20 µs) v podružných rozvaděčích; délka přívodů k PE max. 0,5 m.' },
      { id: 'c', text: 'SPD T1 (vlna 8/20 µs) do podružných rozvaděčů, SPD T2 (vlna 10/350 µs) k zásuvkám; délka přívodů k PE smí být libovolná do 2,5 m.' },
      { id: 'd', text: 'SPD T1 slouží pouze k ochraně před podpětím a montuje se ke spotřebičům, SPD T2 chrání před bleskem; vodiče k PE nesmí být kratší než 0,8 m.' }
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
      { id: 'a', text: 'Vodorovné zóny: 200 až 600 mm od stropu a podlahy; svislé zóny: 50 až 100 mm od hran stavebních otvorů a rohů místností.' },
      { id: 'b', text: 'Vodorovné zóny: 0 až 150 mm pod stropem a nad podlahou; svislé zóny: 300 až 500 mm od hran stavebních otvorů a rohů místností.' },
      { id: 'c', text: 'Vodorovné zóny: 150 až 450 mm od stropu a podlahy; svislé zóny: 100 až 200 mm od hran stavebních otvorů a rohů místností.' },
      { id: 'd', text: 'Vodorovné zóny: libovolně ve výšce oken a zásuvek; svislé zóny: kabely se ukládají šikmo nejkratší možnou trasou mezi krabicemi.' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Měď a hliník vytvářejí při styku elektrický zkrat tavící izolaci; cín reaguje s mědí za vzniku toxických plynů ohrožujících okolí rozvaděče.' },
      { id: 'b', text: 'Norma přímý spoj Cu a Al nezakazuje, vyžaduje pouze dotykovou vazelínu; pocínování licny je naopak doporučeným způsobem zakončení žíly.' },
      { id: 'c', text: 'Hliník je mechanicky tvrdší než měď a došlo by k přetržení žíly; cín má vysoký magnetický odpor a vyvolává nežádoucí indukční ztráty ve svorce.' },
      { id: 'd', text: 'Mezi Cu a Al vzniká elektrochemická koroze vedoucí k oxidaci; cín pod tlakem šroubu teče za studena, spoj se uvolní a hrozí požár.' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'Všechny žíly kabelu musí být zaříznuty na zcela shodnou délku, aby se mechanický tah ve svorkovnici rozložil rovnoměrně na všechny kontakty.' },
      { id: 'b', text: 'Fázový vodič L musí být ponechán delší než ostatní žíly, aby při vytržení kabelu ze spony došlo k okamžitému přerušení napětí v obvodu.' },
      { id: 'c', text: 'Ochranný vodič PE musí být ponechán delší než fázový a nulový vodič, aby se při případném vytržení kabelu odpojil až jako poslední.' },
      { id: 'd', text: 'Nulový vodič N musí být nejdelší a ochranný vodič PE nejkratší, aby se při namáhání tahem jako první aktivovala ochrana vypnutím.' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Třídy schopnosti osob: BA1 = laici (běžné osoby), BA4 = osoby poučené (§ 4 NV 194), BA5 = osoby znalé v elektrotechnice (§ 6 a § 7).' },
      { id: 'b', text: 'Třídy vlhkosti prostředí: BA1 = suché vnitřní prostory, BA4 = vlhké prostory se stékající vodou, BA5 = trvale mokré prostory pod vodou.' },
      { id: 'c', text: 'Třídy nebezpečí požáru: BA1 = nehořlavé konstrukce, BA4 = hořlavé prachy a textilní vlákna, BA5 = prostory s výbuchem hořlavých plynů.' },
      { id: 'd', text: 'Třídy mechanického namáhání: BA1 = lehký provoz v kancelářích, BA4 = těžký průmysl s vibracemi, BA5 = venkovní korozní prostředí a otřesy.' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'Prostup musí být vyplněn standardní stavební montážní PUR pěnou a z obou stran překryt běžnou omítkou o tloušťce minimálně 15 milimetrů.' },
      { id: 'b', text: 'Kolem kabelů postačí vložit izolační vatu z minerálních vláken bez protipožárního nátěru a otvor z obou stran zaklopit plastovými lištami.' },
      { id: 'c', text: 'Prostup musí být spolehlivě utěsněn certifikovanou protipožární ucpávkou se stejnou požární odolností (např. EI 60), jakou má samotná stěna.' },
      { id: 'd', text: 'Otvor kolem kabelové trasy se ponechává volný bez utěsnění, aby bylo zajištěno přirozené odvětrávání kabelů a nedocházelo k přehřívání.' }
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
      { id: 'a', text: 'V tepelně izolované příčce snese kabel podstatně vyšší proudové zatížení než pod omítkou, protože suchá izolace působí jako dielektrikum.' },
      { id: 'b', text: 'Výrazně nižší zatížitelnost má v tepelně izolované stěně (uložení A2), protože tepelná izolace výrazně brání odvodu tepla z povrchu kabelu.' },
      { id: 'c', text: 'Výrazně nižší zatížitelnost má pod omítkou ve zdivu (uložení C), protože omítka zadržuje vlhkost a zvyšuje provozní oteplení měděného jádra.' },
      { id: 'd', text: 'Zatížitelnost kabelu je v obou typech uložení naprosto totožná, neboť závisí výhradně na jmenovitém průřezu jádra a materiálu vodiče (měď).' }
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
      { id: 'a', text: 'Kolečko se dvěma rovnoběžnými čárkami vycházejícími ze středu se dvěma praporky orientovanými na stejnou stranu.' },
      { id: 'b', text: 'Kolečko s čárkou procházející středem, která má praporky (háčky) na obou koncích orientované v opačném směru.' },
      { id: 'c', text: 'Kolečko s jednou čárkou vycházející ze středu zakončenou jedním jednoduchým praporkem orientovaným vpravo.' },
      { id: 'd', text: 'Kolečko se dvěma překříženými čárkami do tvaru písmene X zakončenými čtyřmi praporky na všech vnějších koncích.' }
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
      { id: 'a', text: 'F (např. FA, FU, FS) pro jistící a ochranné prvky a Q (např. QM, QF) pro výkonové spínací přístroje.' },
      { id: 'b', text: 'W (např. WA, WF, WD) pro jistící a ochranné prvky a X (např. XT, XP) pro výkonové spínací přístroje.' },
      { id: 'c', text: 'K (např. KM, KA, KT) pro jistící a ochranné prvky a S (např. SA, SB) pro výkonové spínací přístroje.' },
      { id: 'd', text: 'R (např. RA, RF, RS) pro jistící a ochranné prvky a M (např. MM, MQ) pro výkonové spínací přístroje.' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'Jednopólové schéma zobrazuje výhradně stejnosměrné obvody s jedním pólem; obvodové schéma slouží pouze pro třífázové střídavé sítě nízkého napětí.' },
      { id: 'b', text: 'Jednopólové schéma zachycuje prostorové rozmístění přístrojů ve stavebním půdorysu; obvodové schéma znázorňuje pouze vnější mechanické rozměry rozvaděče.' },
      { id: 'c', text: 'Jednopólové schéma obsahuje kompletní vnitřní zapojení elektronických desek přístrojů; obvodové schéma uvádí pouze soupisku použitého materiálu v projektu.' },
      { id: 'd', text: 'Jednopólové schéma znázorňuje vícežilové vedení jednou čarou se značkou počtu žil; obvodové schéma detailně vykresluje každý vodič a kontakt zvlášť.' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'Jističochránič (kombinovaný přístroj) s jmenovitým proudem 16 A, charakteristikou B, 1P+N, reziduálním proudem 30 mA a citlivostí na pulzující DC proudy.' },
      { id: 'b', text: 'Samostatný proudový chránič bez nadproudové spouště na 16 A se jmenovitým reziduálním proudem 300 mA a mrazuvzdorným provedením typu A.' },
      { id: 'c', text: 'Samostatný jistič vedení 16 A s vypínací schopností 30 kA, 1P+N, zpožděným vypnutím typu A a integrovaným tepelným relé pro jištění motorů.' },
      { id: 'd', text: 'Svodič bleskových proudů a přepětí typu 1 na 16 kV se svodovým proudem 30 kA, 1P+N, optickou signalizací poruchy a dálkovým hlášením typu A.' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'Svorky ovládací cívky jsou označeny písmeny A1 a A2; silové spínací kontakty jsou označeny číslicemi 1–2, 3–4 (nebo L–1).' },
      { id: 'b', text: 'Svorky ovládací cívky jsou označeny písmeny L1 a L2; silové spínací kontakty jsou označeny písmeny PE a N na svorkovnici přístroje.' },
      { id: 'c', text: 'Svorky ovládací cívky jsou označeny číslicemi 13 a 14; silové spínací kontakty jsou označeny písmeny NO a NC na těle relé nebo stykače.' },
      { id: 'd', text: 'Svorky ovládací cívky jsou označeny písmeny U a V; silové spínací kontakty jsou označeny symboly plus (+) a minus (−) pro stejnosměrný proud.' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'Zařízení třídy ochrany III napájené výhradně z bezpečného zdroje malého napětí SELV nebo PELV do 50 V AC.' },
      { id: 'b', text: 'Zařízení v provedení do prostorů s nebezpečím výbuchu hořlavých plynů a par s certifikací ATEX a stupněm krytí IP 68.' },
      { id: 'c', text: 'Zařízení třídy ochrany II s dvojitou nebo zesílenou izolací, které se nesmí připojovat k ochrannému vodiči PE.' },
      { id: 'd', text: 'Zařízení třídy ochrany I s kovovým krytem vyžadující spolehlivé připojení ochranného vodiče PE na kostru přístroje.' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Kabel CYKY-J je určen pro pevné uložení v omítce a zdivu; kabel CYKY-O je flexibilní slaněná šňůra s jemnými licnami pro pohyblivé přívody.' },
      { id: 'b', text: 'Kabel CYKY-J obsahuje zeleno-žlutou žílu PE (hnědá, modrá, zeleno-žlutá); kabel CYKY-O ochrannou žílu PE nemá (černá, hnědá, šedá).' },
      { id: 'c', text: 'Kabel CYKY-J má jmenovité napětí 750 V pro průmyslové instalace; kabel CYKY-O má jmenovité napětí pouze 230 V pro drobné bytové rozvody.' },
      { id: 'd', text: 'Kabel CYKY-J má měděná plná jádra a PVC izolaci; kabel CYKY-O má hliníková jádra a bezhalogenový ohniodolný plášť pro únikové cesty.' }
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
      { id: 'a', text: 'Spínač č. 5 má dvě protilehlé čárky bez praporků; spínač č. 7 má tři soustředné kružnice s vyznačeným směrem sepnutí kontaktů.' },
      { id: 'b', text: 'Spínač č. 5 má jednu čárku s oboustranným praporkem; spínač č. 7 má kruh rozdělený na čtyři kvadranty s tečkou uprostřed.' },
      { id: 'c', text: 'Spínač č. 5 má dvě čárky s praporky stejným směrem; spínač č. 7 má dvě překřížené čárky (X) se čtyřmi praporky na koncích.' },
      { id: 'd', text: 'Spínač č. 5 má trojúhelníkovou značku s jedním kontaktem; spínač č. 7 má čtvercovou značku s křížkem bez vývodových čárek.' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Písmeno K (např. KM pro výkonové stykače, KA pro pomocná relé, KT pro časová relé)' },
      { id: 'b', text: 'Písmeno S (např. SA pro otočné přepínače, SB pro ovládací tlačítka a klávesnice)' },
      { id: 'c', text: 'Písmeno F (např. FA pro jističe vedení, FU pro tavné pojistky, FS pro svodiče přepětí)' },
      { id: 'd', text: 'Písmeno Q (např. QM pro výkonové odpínače, QF pro ochranné vypínače se spouštěmi)' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'Vodič N se značí jednoduchou šikmou čárkou bez zakončení; vodič PE se na jednopólových výkresech vůbec nezakresluje.' },
      { id: 'b', text: 'Vodič N má na konci šikmé čárky dvě rovnoběžné úsečky; vodič PE má na konci trojúhelník symbolizující zemní spojení.' },
      { id: 'c', text: 'Vodič N má na konci šikmé čárky plnou tečku (kuličku); vodič PE má na konci kolmou příčnou čárku (tvar písmene T).' },
      { id: 'd', text: 'Vodič N má na konci šikmé čárky otevřenou šipku; vodič PE má na konci vlnovku představující střídavý průběh napětí.' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Zkušební napětí 100 V DC a minimální izolační odpor Riso ≥ 0,1 MΩ.' },
      { id: 'b', text: 'Zkušební napětí 1000 V AC a minimální izolační odpor Riso ≥ 2,0 MΩ.' },
      { id: 'c', text: 'Zkušební napětí 500 V DC a minimální izolační odpor Riso ≥ 1,0 MΩ.' },
      { id: 'd', text: 'Zkušební napětí 250 V DC a minimální izolační odpor Riso ≥ 0,5 MΩ.' }
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
      { id: 'a', text: 'Teoretická Zs = 5,750 Ω a naměřená hodnota za studena max. 3,83 Ω.' },
      { id: 'b', text: 'Teoretická Zs = 2,875 Ω a naměřená hodnota za studena max. 1,91 Ω.' },
      { id: 'c', text: 'Teoretická Zs = 1,437 Ω a naměřená hodnota za studena max. 0,95 Ω.' },
      { id: 'd', text: 'Teoretická Zs = 4,600 Ω a naměřená hodnota za studena max. 3,06 Ω.' }
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
      { id: 'a', text: 'Přesně při hodnotě 30 mA s tolerancí ±1 % a ve vypínacím čase max. 1000 ms (při 5× IΔn max. 200 ms).' },
      { id: 'b', text: 'V rozmezí 15 mA až 30 mA (0,5 až 1,0× IΔn) a ve vypínacím čase max. 300 ms (při 5× IΔn max. 40 ms).' },
      { id: 'c', text: 'V rozmezí 30 mA až 60 mA (1,0 až 2,0× IΔn) a ve vypínacím čase max. 200 ms (při 5× IΔn max. 20 ms).' },
      { id: 'd', text: 'V rozmezí 5 mA až 15 mA (0,15 až 0,5× IΔn) a ve vypínacím čase max. 500 ms (při 5× IΔn max. 100 ms).' }
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
      { id: 'a', text: 'Symbol dvou překrývajících se trojúhelníků, údaj 1000 V (nebo 1000 V AC / 1500 V DC) a odkaz na normu ČSN EN IEC 60900.' },
      { id: 'b', text: 'Symbol blesku v kruhu, údaj 500 V AC pro střídavé sítě a certifikační značku státní zkušebny se zeleným terčíkem bezpečnosti.' },
      { id: 'c', text: 'Běžnou dvoubarevnou červeno-žlutou ergonomickou rukojeť s vyraženým logem výrobce a označením mechanické tvrdosti oceli Cr-V.' },
      { id: 'd', text: 'Symbol uzemnění v trojúhelníku, označení stupně krytí minimálně IP 65 a datum povinné roční periodické tlakové zkoušky izolace.' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'BEZ NAPĚTÍ: 1. Impedance smyčky Zs, 2. Polarita zásuvek; POD NAPĚTÍM: 3. Izolační odpor Riso, 4. Zkouška chráničů RCD, 5. Spojitost PE vodičů.' },
      { id: 'b', text: 'BEZ NAPĚTÍ: 1. Spojitost PE vodičů, 2. Izolační odpor Riso; POD NAPĚTÍM: 3. Polarita a sled fází, 4. Impedance smyčky Zs, 5. Zkouška chráničů RCD.' },
      { id: 'c', text: 'Pořadí měření norma nestanovuje, revizní technik volí postup libovolně podle dostupnosti rozvaděče a časového harmonogramu stavby.' },
      { id: 'd', text: 'POD NAPĚTÍM: 1. Zkouška chráničů RCD, 2. Impedance smyčky Zs; BEZ NAPĚTÍ: 3. Izolační odpor Riso, 4. Spojitost PE vodičů, 5. Vizuální kontrola.' }
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
      { id: 'a', text: 'Běžným digitálním multimetrem s baterií 9 V a měřicím proudem nepřesahujícím 5 mA v rozsahu pro propípávání zkratu.' },
      { id: 'b', text: 'Zdrojem stejnosměrného napětí 500 V DC a měřicím proudem omezeným na maximálně 1 mA z důvodu bezpečnosti.' },
      { id: 'c', text: 'Zdrojem malého napětí 4 V až 24 V (AC nebo DC) naprázdno a zkušebním proudem minimálně 200 mA (0,2 A).' },
      { id: 'd', text: 'Zdrojem síťového napětí 230 V AC s předřadným rezistorem a zkušebním proudem minimálně 10 A (10 000 mA).' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Měření izolačního odporu se svodiči přepětí je zakázáno pouze v sítích IT, v sítích TN-C a TN-S se SPD nikdy neodpojují.' },
      { id: 'b', text: 'Norma odpojování SPD nevyžaduje, odpojují se pouze světelné zdroje LED s příkonem vyšším než 50 W z důvodu kapacity.' },
      { id: 'c', text: 'Připojené svodiče přepětí SPD by vybily záložní akumulátor měřicího revizního přístroje a způsobily chybu kalibrace měření.' },
      { id: 'd', text: 'Zkušební napětí 500 V DC by sepnulo varistory v SPD (falešně nízký izolační odpor) a mohlo by poškodit citlivou elektroniku.' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'Mezi pracovními vodiči a ochranným vodičem (L–PE a N–PE) a rovněž mezi pracovními vodiči navzájem (L–N).' },
      { id: 'b', text: 'Pouze mezi kolíkem PE v zásuvce a náhodným uzemněním budovy (např. kovovým potrubím ústředního topení).' },
      { id: 'c', text: 'Výhradně mezi fázovým vodičem L a ochranným vodičem PE, měření mezi N a PE je u sítě TN-S zakázáno normou.' },
      { id: 'd', text: 'Mezi fázovým vodičem L první zásuvky a fázovým vodičem L poslední zásuvky na témže světelném nebo zásuvkovém obvodu.' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'Teoretická Zs = 2,875 Ω (a při měření za studena s koeficientem 1,5 max. 1,91 Ω)' },
      { id: 'b', text: 'Teoretická Zs = 0,718 Ω (a při měření za studena s koeficientem 1,5 max. 0,47 Ω)' },
      { id: 'c', text: 'Teoretická Zs = 1,437 Ω (a při měření za studena s koeficientem 1,5 max. 0,95 Ω)' },
      { id: 'd', text: 'Teoretická Zs = 4,600 Ω (a při měření za studena s koeficientem 1,5 max. 3,06 Ω)' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Pouze pro urychlení montáže rozvaděče a snížení fyzické únavy montéra při zapojování velkého počtu modulárních přístrojů.' },
      { id: 'b', text: 'Momentový šroubovák se používá pouze při revizních kontrolách rozvaděčů, při běžné montáži stačí běžný plochý šroubovák.' },
      { id: 'c', text: 'Aby se zabránilo elektrickému probití izolačního materiálu svorky způsobenému elektrostatickým nábojem při ručním utahování.' },
      { id: 'd', text: 'Pro zajištění momentu předepsaného výrobcem (např. 2,5 Nm) – nedotažení vede k přehřívání a požáru, přetažení ke stržení závitu.' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'Počet zásuvkových vývodů není omezen, pokud součet jmenovitých proudů připojených spotřebičů nepřesáhne 25 A.' },
      { id: 'b', text: 'Maximálně 10 zásuvkových vývodů, přičemž celkový instalovaný příkon obvodu nesmí překročit 3 680 W (16 A × 230 V).' },
      { id: 'c', text: 'Maximálně 16 zásuvkových vývodů, přičemž celkový instalovaný příkon obvodu nesmí překročit 4 600 W (20 A × 230 V).' },
      { id: 'd', text: 'Maximálně 6 zásuvkových vývodů, přičemž celkový instalovaný příkon obvodu nesmí překročit 2 300 W (10 A × 230 V).' }
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
      { id: 'a', text: 'Dva jednopólové spínače řazení 1 na koncích a dva sériové spínače řazení 5 uprostřed trasy (1 – 5 – 5 – 1).' },
      { id: 'b', text: 'Čtyři křížové přepínače řazení 7 zapojené paralelně na jeden společný fázový vodič ke svítidlu (7 – 7 – 7 – 7).' },
      { id: 'c', text: 'Dva střídavé přepínače řazení 6 na obou koncích a dva křížové přepínače řazení 7 mezi nimi (6 – 7 – 7 – 6).' },
      { id: 'd', text: 'Čtyři střídavé přepínače řazení 6 zapojené za sebou v sériovém uspořádání korespondenčních vodičů (6 – 6 – 6 – 6).' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Tlačítka se zapojují střídavě do série a paralelně přes korespondenční vodiče podobně jako u křížového přepínače.' },
      { id: 'b', text: 'Všechna tlačítka se zapojují PARALELNĚ vedle sebe a při stisku přivádějí fázový nebo nulový impulz na svorku cívky A1 relé.' },
      { id: 'c', text: 'Všechna tlačítka se zapojují SÉRIOVĚ za sebou, takže k aktivaci relé je nutné stisknout všechna tlačítka současně.' },
      { id: 'd', text: 'Každé tlačítko musí mít svůj vlastní samostatný napájecí obvod jištěný vlastním jističem B2 s nezávislou cívkou relé.' }
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
      { id: 'a', text: 'Ne, v zónách 0, 1 i 2 jsou běžné zásuvky zakázány; zásuvka 230 V smí být až mimo zónu 2 chráněná RCD ≤ 30 mA.' },
      { id: 'b', text: 'Ano, v zóně 2 smí být běžná zásuvka 230 V umístěna ve výšce alespoň 1,2 m nad podlahou, má-li krytí alespoň IP 44.' },
      { id: 'c', text: 'V koupelně nesmí být žádná zásuvka 230 V v celé místnosti bez ohledu na vzdálenost od vany nebo sprchového koutu.' },
      { id: 'd', text: 'Ano, v zóně 1 i 2 jsou povoleny všechny zásuvky 230 V za podmínky, že jsou jištěny proudovým chráničem s IΔn = 10 mA.' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'Všechny nulové vodiče N se spojují na jednu společnou neizolovanou sběrnici N na spodní liště rozvodnice.' },
      { id: 'b', text: 'Nulové vodiče se nesmí do rozvodnice vůbec zavádět, spotřebiče se nulují přímo na kovové konstrukce budovy.' },
      { id: 'c', text: 'Nulové vodiče N se připojují přímo na hlavní ochrannou přípojnici PE společně se zeleno-žlutými vodiči obvodů.' },
      { id: 'd', text: 'Každý proudový chránič musí mít svou vlastní oddělenou svorkovnici N, kam se připojují nulové vodiče jeho obvodů.' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'Ochranný vodič PE nahoře na kolíku, fázový vodič L v pravé dutince a nulový vodič N v levé dutince zásuvky.' },
      { id: 'b', text: 'Fázový vodič L nahoře na kolíku, ochranný vodič PE v levé dutince a nulový vodič N v pravé dutince zásuvky.' },
      { id: 'c', text: 'Ochranný vodič PE nahoře na kolíku, fázový vodič L v levé dutince a nulový vodič N v pravé dutince zásuvky.' },
      { id: 'd', text: 'Nulový vodič N nahoře na kolíku, fázový vodič L v levé dutince a ochranný vodič PE v pravé dutince zásuvky.' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Minimálně 16 mm² Cu (případně dvojnásobek průřezu fázového vodiče přípojky, nejvýše však 50 mm² Cu)' },
      { id: 'b', text: 'Minimálně 6 mm² Cu (případně polovina průřezu největšího PE vodiče v instalaci, nejvýše však 25 mm² Cu)' },
      { id: 'c', text: 'Minimálně 1,5 mm² Cu (případně polovina průřezu vodiče světelného obvodu, nejvýše však 4 mm² Cu)' },
      { id: 'd', text: 'Minimálně 2,5 mm² Cu (případně shodný průřez jako přívod k zásuvkám, nejvýše však 6 mm² Cu)' }
    ],
    correctOptionId: 'b',
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
      { id: 'a', text: 'Od příkonu 2 000 W (2 kW) a více (např. automatická pračka, myčka nádobí, sušička, bojler, elektrická trouba)' },
      { id: 'b', text: 'Od příkonu 1 000 W (1 kW) a více (např. mikrovlnná trouba, vysavač, žehlička, kávovar nebo ponorný mixér)' },
      { id: 'c', text: 'Od příkonu 3 680 W (3,68 kW) a více (pouze pro spotřebiče překračující maximální zatížení 16A zásuvky)' },
      { id: 'd', text: 'Samostatné obvody se v bytech nezřizují, veškeré kuchyňské i koupelnové spotřebiče se připojují na jeden obvod.' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'Na středový kontakt se připojuje ochranný vodič PE; fázový vodič L i nulový vodič N se připojují společně na závit.' },
      { id: 'b', text: 'Spínaný fázový vodič L i nulový vodič N se mohou připojit libovolně, na polaritě střídavého napětí v objímce nezáleží.' },
      { id: 'c', text: 'Spínaný fázový vodič L se připojuje vždy na spodní středový kontakt; nulový vodič N se připojuje na vnější závit objímky.' },
      { id: 'd', text: 'Spínaný fázový vodič L se připojuje vždy na vnější závit objímky; nulový vodič N se připojuje na spodní středový kontakt.' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Odstranit veškeré dočasné popisky fixem z přístrojů a ponechat rozvaděč bez dokumentace pro potřeby budoucí revize.' },
      { id: 'b', text: 'Pouze předat zákazníkovi nákupní účtenky za materiál ze stavebnin a podepsat předávací protokol o provedení díla.' },
      { id: 'c', text: 'Zakreslit pouze vnější rozměry stavby na fasádě a odevzdat původní nezměněnou projektovou dokumentaci bez záznamu měření.' },
      { id: 'd', text: 'Trvale označit všechny přístroje a obvody v rozvaděči, vložit schéma zapojení, zakreslit skutečné provedení a zapsat naměřené hodnoty.' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'Prasklá wolframová žárovka v lustru obývacího pokoje způsobující podpěťový impuls v napájecí síti objektu.' },
      { id: 'b', text: 'Přetížení některé zásuvky spotřebičem s vysokým odběrem proudu připojeným přes shozený jednopólový jistič.' },
      { id: 'c', text: 'Svod nebo zkrat mezi nulovým vodičem N a ochranným vodičem PE v některém z koncových obvodů za chráničem.' },
      { id: 'd', text: 'Zkrat mezi fázovými vodiči L1 a L2 na přívodních svorkách hlavního jističe před elektroměrem v přípojkové skříni.' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Je přerušen fázový vodič L na výstupu z jističe příslušného zásuvkového obvodu v podružném rozvaděči.' },
      { id: 'b', text: 'Zásuvka je zcela v pořádku a závada spočívá výhradně v mechanickém poškození hrotu měřicí zkoušečky.' },
      { id: 'c', text: 'Je přerušen nulový pracovní vodič N (uvolněná svorka N v zásuvce nebo v krabici před zásuvkou).' },
      { id: 'd', text: 'Je přerušen ochranný vodič PE (uvolněná svorka PE na ochranném kolíku zásuvky nebo v rozvodnici).' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'V obvodu je instalován vadný svodič přepětí SPD, který svádí měřicí proud zkoušečky do nulovacího můstku.' },
      { id: 'b', text: 'Přerušený ochranný vodič PE (nebezpečná závada – kolík není spojen s ochrannou soustavou a nechrání před dotykem).' },
      { id: 'c', text: 'Prohozený fázový vodič L s nulovým vodičem N na svorkách zásuvky při zachování funkčního uzemnění kolíku.' },
      { id: 'd', text: 'Přerušený nulový pracovní vodič N (závada způsobující návrat proudu do sítě přes paralelní spotřebiče).' }
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
      { id: 'a', text: 'V zásuvce jsou vzájemně prohozeny vodiče N a PE (pracovní proud spotřebiče se vrací vodičem PE mimo součtový transformátor RCD).' },
      { id: 'b', text: 'Spotřebič má dvojitou izolaci třídy II a proudový chránič reaguje na absenci ochranného vodiče v přívodní šňůře.' },
      { id: 'c', text: 'Jistič zásuvkového obvodu má příliš nízkou vypínací zkratovou schopnost a elektromagnetická spoušť shodí i sousední chránič.' },
      { id: 'd', text: 'V zásuvce je přerušen fázový vodič L a chránič reaguje na nesymetrii napětí mezi fázemi třífázového rozvodu objektu.' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'Montér zapojil do obvodu svítidlo s příliš nízkým příkonem LED světelného zdroje způsobujícím kapacitní záškuby na kontaktech.' },
      { id: 'b', text: 'Na jednom z přepínačů č. 6 prohodil přívodní/odvodní fázový vodič (L) s jedním z korespondenčních vodičů na svorkách spínače.' },
      { id: 'c', text: 'Montér zapomněl propojit ochranný vodič PE na kovový rámeček obou vypínačů a obvod postrádá referenční zemní potenciál.' },
      { id: 'd', text: 'V rozvaděči byl použit jistič s charakteristikou C místo správné charakteristiky B předepsané pro schodišťové osvětlení.' }
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
      { id: 'a', text: 'Přidržíme ovládací páčku jističe B16 násilím v zapnuté poloze, dokud se místo zkratu v instalaci neprojeví kouřem a zápachem.' },
      { id: 'b', text: 'Bez napětí měříme odpor L–N a L–PE ohmmetrem a metodou postupného půlení trasy v krabicích lokalizujeme zkratovaný úsek kabelu.' },
      { id: 'c', text: 'Vyměníme stávající jistič B16 za jistič s vyšším jmenovitým proudem C32, který snese vyšší zapínací ráz bez okamžitého vybavení.' },
      { id: 'd', text: 'Přepneme multimetr na měření proudu do 10 A a hroty přiložíme přímo do dutinek zásuvky pod plným napětím pro zjištění zkratu.' }
    ],
    correctOptionId: 'b',
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
      { id: 'a', text: 'Místo tlačítka (ovladače 1/0) byl omylem osazen spínač č. 1, nebo zůstalo tlačítko trvale mechanicky zaseknuté v sepnutém stavu.' },
      { id: 'b', text: 'V rozvaděči došlo k přepálení tavné pojistky na primární straně ovládacího transformátoru pro napájení zvonkového tlačítka.' },
      { id: 'c', text: 'Svítidlo připojené na výstupní kontakt relé má příliš malý činný odběr a nedokáže vybavit přídržný elektromagnetický mechanismus.' },
      { id: 'd', text: 'Přívodní kabel k ovládacím tlačítkům má příliš velký průřez vodičů Cu 2,5 mm² a vyvolává nadměrný kapacitní proud do cívky relé.' }
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
      { id: 'a', text: 'Do zásuvky je přivedeno sdružené mezifázové napětí 400 V v důsledku přepólování fázových vodičů v elektroměrovém rozvaděči.' },
      { id: 'b', text: 'V zásuvkovém obvodu došlo k průrazu izolace mezi fází L a ochranným kolíkem PE s následným nárůstem napětí na nulovacím můstku.' },
      { id: 'c', text: 'Zkoušečka vyhodnocuje běžné statické napětí v suchém prostředí a zásuvka je ve skutečnosti plně funkční a bez elektrické závady.' },
      { id: 'd', text: 'V obvodu je přerušen nulový vodič N a přes připojený zapnutý spotřebič se fázové napětí vrací na odpojenou větev vodiče N.' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'Porucha izolačního odporu v topném tělese myčky nádobí způsobující pomalý nárůst unikajícího reziduálního proudu do země.' },
      { id: 'b', text: 'Přechodový odpor na přívodních svorkách elektroměru vyvolávající pokles napětí pod minimální přídržnou hodnotu cívky stykače.' },
      { id: 'c', text: 'Tvrdý zkrat mezi fázovým vodičem L a ochranným vodičem PE aktivující okamžitou elektromagnetickou rychlospoušť jističe B16.' },
      { id: 'd', text: 'Nadproudové přetížení obvodu – součet proudů spotřebičů překročil In jističe a po zahřátí zareagovala jeho bimetalová tepelná spoušť.' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'Ověřit spojitost PE vodiče, správnou polaritu L/N/PE, impedanci poruchové smyčky Zs a ověřit vybavení proudového chrániče RCD testem.' },
      { id: 'b', text: 'Zkontrolovat odběr proudu klešťovým ampérmetrem na hlavním domovním kabelu a zapsat stav číselníku fakturačního elektroměru.' },
      { id: 'c', text: 'Změřit pouze izolační odpor celého objektu napětím 1000 V DC při zapnutých všech jističích a spotřebičích v domácnosti.' },
      { id: 'd', text: 'Postačí vizuálně zkontrolovat usazení krytu zásuvky ve zdi a zapnout jistič bez provádění jakýchkoliv přístrojových měření.' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'Urychleně vyhledat v lékárničce popáleninový sprej a aplikovat ho na popálenou ruku dříve, než dojde k rozsáhlému poškození tkáně.' },
      { id: 'b', text: 'Ihned kleknout k postiženému a zahájit nepřímou srdeční masáž stlačováním hrudníku bez ohledu na probíhající dotyk s vodičem.' },
      { id: 'c', text: 'Okamžitě holýma rukama uchopit postiženého za oděv nebo končetiny a vší silou ho odtrhnout od vodiče pod napětím.' },
      { id: 'd', text: 'Zajistit vlastní bezpečnost a okamžitě přerušit přívod proudu (vypnout jistič/vypínač, vytáhnout vidlici) nebo odsunout vodič suchým nevodivým předmětem.' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: '30 stlačení hrudníku ku 2 vdechům, stlačovat do hloubky 5 až 6 cm s frekvencí 100 až 120 stlačení za minutu.' },
      { id: 'b', text: '50 stlačení hrudníku ku 5 vdechům, stlačovat do hloubky 7 až 8 cm s frekvencí 140 až 160 stlačení za minutu.' },
      { id: 'c', text: '15 stlačení hrudníku ku 2 vdechům, stlačovat do hloubky 2 až 3 cm s frekvencí 60 až 80 stlačení za minutu.' },
      { id: 'd', text: 'Výhradně umělé dýchání s frekvencí 20 vdechů za minutu bez provádění nepřímé masáže stlačováním hrudníku.' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'Přímé účinky způsobuje výhradně stejnosměrný proud z akumulátorů; nepřímé účinky vznikají pouze při působení střídavého proudu ze sítě.' },
      { id: 'b', text: 'Přímé účinky vznikají průchodem proudu tělem (křeče, fibrilace, popáleniny); nepřímé jsou druhotné úrazy (pády, popálení obloukem, leknutí).' },
      { id: 'c', text: 'Přímé účinky vznikají při zasažení bleskem ve venkovním prostoru; nepřímé účinky nastávají pouze při dotyku vnitřní elektroinstalace budov.' },
      { id: 'd', text: 'Mezi přímými a nepřímými účinky není odborný rozdíl, oba pojmy označují popáleniny kůže způsobené vysokým teplem elektrického oblouku.' }
    ],
    correctOptionId: 'b',
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
      { id: 'a', text: 'Při střídavém proudu přibližně 0,1 mA až 0,5 mA (při frekvenci 50/60 Hz)' },
      { id: 'b', text: 'Při střídavém proudu přibližně 50 mA až 100 mA (při frekvenci 50/60 Hz)' },
      { id: 'c', text: 'Při střídavém proudu přibližně 10 mA až 15 mA (při frekvenci 50/60 Hz)' },
      { id: 'd', text: 'Při střídavém proudu přibližně 500 mA až 1000 mA (při frekvenci 50/60 Hz)' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Nasadit si běžné elektrikářské rukavice na 1000 V a pokusit se vodič vysokého napětí odtáhnout mimo dosah ležícího postiženého.' },
      { id: 'b', text: 'Rychle k postiženému přiběhnout dlouhými skoky a odsunout vodič vysokého napětí suchou dřevěnou latí nebo koštětem.' },
      { id: 'c', text: 'Udržovat odstup min. 18–20 m kvůli krokovému napětí, ustupovat šoupáním nohou těsně u sebe a volat tísňovou linku 112/150 a dispečink sítě.' },
      { id: 'd', text: 'Vstoupit do zóny vodiče po jedné noze se zvednutou druhou nohou a postiženého odtáhnout za suchý oděv na bezpečné místo.' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Okamžitým otočením postiženého na břicho s hlavou stočenou na stranu a údery dlaní mezi lopatky pro uvolnění dýchacích cest.' },
      { id: 'b', text: 'Šetrným záklonem hlavy a současným zvednutím brady nahoru dvěma prsty položenými na kostěnou část brady.' },
      { id: 'c', text: 'Vložením tvrdého polštáře nebo stočeného pracovního oděvu pod hlavu postiženého tak, aby došlo k předklonu hlavy k hrudníku.' },
      { id: 'd', text: 'Násilným rozevřením úst a vytažením zapadlého jazyka pomocí peánu nebo kapesního nože s fixací jazyka zavíracím špendlíkem.' }
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
      { id: 'a', text: 'Pokud je postižený při vědomí a nemá popáleniny, lékařské vyšetření ani záznam EKG norma ani zdravotnické předpisy nevyžadují.' },
      { id: 'b', text: 'Vyšetření je vyžadováno výhradně z administrativních a pojistných důvodů pro vyplacení odškodnění za pracovní úraz zaměstnavatelem.' },
      { id: 'c', text: 'Lékařské vyšetření je povinné pouze tehdy, pokud byl zasažený člověk v bezvědomí déle než 15 minut nebo utrpěl zlomeninu končetin.' },
      { id: 'd', text: 'Průchod proudu srdcem může způsobit poškození myokardu a závažné poruchy srdečního rytmu (arytmie) s prodlevou až několika hodin po úrazu.' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'Zasypat popálenou ránu zásypem z lékárničky, pevně stáhnout elastickým obinadlem a přiložit horký suchý obklad pro prokrvení tkáně.' },
      { id: 'b', text: 'Okamžitě strhnout přiškvařený oděv z popálené kůže, propíchnout sterilní jehlou všechny vzniklé puchýře a ránu potřít mastí na popáleniny.' },
      { id: 'c', text: 'Popáleniny od elektrického proudu se nesmějí vůbec chladit vodou z důvodu rizika infekce; rány se ponechávají odkryté na vzduchu.' },
      { id: 'd', text: 'Chladit čistou studenou vodou, přiškvařený oděv nikdy nestrhávat, na rány nic nemazat a sterilně překrýt suchým obvazem.' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'Zahájíme výhradně umělé dýchání z plic do plic v tempu 30 vdechů za minutu, stlačování hrudníku při lapavých deších provádět nesmíme.' },
      { id: 'b', text: 'Gasping je příznakem zástavy srdečního oběhu – okamžitě voláme linku 155 a ihned zahajujeme nepřímou srdeční masáž (KPR 30:2).' },
      { id: 'c', text: 'Podložíme postiženému nohy do zvýšené polohy pro obnovení krevního tlaku a podáme mu po lžičkách napít studené vody pro probuzení.' },
      { id: 'd', text: 'Lapavé dýchání je známkou spontánní úpravy dechu – postiženého pouze uložíme do zotavovací polohy a vyčkáme na příjezd záchranné služby.' }
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
      { id: 'a', text: 'Zdravotnická záchranná služba: 150, Hasiči: 155, Policie ČR: 156, Jednotné evropské číslo tísňového volání: 911' },
      { id: 'b', text: 'Zdravotnická záchranná služba: 155, Hasiči: 150, Policie ČR: 158, Jednotné evropské číslo tísňového volání: 112' },
      { id: 'c', text: 'Zdravotnická záchranná služba: 155, Hasiči: 158, Policie ČR: 150, Jednotné evropské číslo tísňového volání: 156' },
      { id: 'd', text: 'Zdravotnická záchranná služba: 158, Hasiči: 150, Policie ČR: 155, Jednotné evropské číslo tísňového volání: 112' }
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
      { id: 'a', text: 'Maximálně 2 Ω pro uzel sítě TN a maximálně 10 Ω pro zemnič objektu' },
      { id: 'b', text: 'Maximálně 5 Ω pro uzel sítě TN a maximálně 25 Ω pro zemnič objektu' },
      { id: 'c', text: 'Maximálně 15 Ω pro uzel sítě TN a maximálně 50 Ω pro zemnič objektu' },
      { id: 'd', text: 'Maximálně 0,5 Ω pro uzel sítě TN a maximálně 2 Ω pro zemnič objektu' }
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
      { id: 'a', text: 'Tlačítko STOP musí být ČERNÉ na BÍLÉM podkladu; tlačítko START musí být MODRÉ nebo ŽLUTÉ.' },
      { id: 'b', text: 'Tlačítko STOP smí mít libovolnou barvu; tlačítko START musí být vždy označeno blikající kontrolkou.' },
      { id: 'c', text: 'Tlačítko STOP musí být ČERVENÉ na ŽLUTÉM podkladu; tlačítko START musí být ZELENÉ nebo BÍLÉ.' },
      { id: 'd', text: 'Tlačítko STOP musí být ŽLUTÉ na ČERVENÉM podkladu; tlačítko START musí být VÝHRADNĚ ČERVENÉ.' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Výhradně v noci po 22:00 hodině bez ohledu na venkovní počasí a stav oblohy' },
      { id: 'b', text: 'Při relativní vlhkosti vzduchu vyšší než 60 % nebo při barometrickém tlaku pod 1000 hPa' },
      { id: 'c', text: 'Při bouřce, vichřici, silném dešti, hustém sněžení, námraze nebo dohlednosti pod 30 m' },
      { id: 'd', text: 'Při teplotách pod +10 °C, při mlze s dohledností pod 1 km a při větru nad 5 m/s' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: '2,00 m nahoru, 1,00 m do stran a 1,00 m dolů od stanoviště osoby' },
      { id: 'b', text: '1,80 m nahoru, 0,80 m do stran a 0,50 m dolů od stanoviště osoby' },
      { id: 'c', text: '2,50 m nahoru, 1,25 m do stran a 1,25 m dolů od stanoviště osoby' },
      { id: 'd', text: '3,00 m nahoru, 2,00 m do stran a 1,50 m dolů od stanoviště osoby' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Pro fázový vodič SL ≤ 16 mm² je SPE = 2,5 mm²; pro 16 mm² < SL ≤ 50 mm² je SPE = 10 mm²; pro SL > 50 mm² je SPE ≥ SL / 3.' },
      { id: 'b', text: 'Pro fázový vodič SL ≤ 10 mm² je SPE = 1,5 mm²; pro 10 mm² < SL ≤ 25 mm² je SPE = 6 mm²; pro SL > 25 mm² je SPE ≥ SL / 4.' },
      { id: 'c', text: 'Pro jakýkoliv průřez fázového vodiče SL musí mít ochranný vodič SPE vždy shodný průřez jako fázový vodič bez jakékoliv úlevy.' },
      { id: 'd', text: 'Pro fázový vodič SL ≤ 16 mm² je SPE = SL; pro 16 mm² < SL ≤ 35 mm² je SPE = 16 mm²; pro SL > 35 mm² je SPE ≥ SL / 2.' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'Přívod na středový kontakt pojistkového spodku, vývod na boční závit; silové kabely v zemi kryje ČERVENÁ fólie; spodní okraj HDS min. 0,6 m.' },
      { id: 'b', text: 'Přívod na boční závit pojistkového spodku, vývod na středový kontakt; silové kabely v zemi kryje ŽLUTÁ fólie; spodní okraj HDS min. 0,3 m.' },
      { id: 'c', text: 'Přívod i vývod jsou zaměnitelné bez vlivu na bezpečnost; silové kabely v zemi kryje MODRÁ fólie; spodní okraj HDS min. 1,5 m nad terénem.' },
      { id: 'd', text: 'Přívod na boční závit pojistky, vývod na spodní kontakt; silové kabely v zemi kryje ZELENÁ fólie; spodní okraj HDS min. 1,8 m nad terénem.' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'Metoda valící se koule (fiktivní bleskové koule o poloměru r podle stanovené třídy LPL I až IV)' },
      { id: 'b', text: 'Metoda aktivních jímačů s včasnou emisí výboje ESE (generování předstihového vstřícného výboje)' },
      { id: 'c', text: 'Metoda ochranného úhlu (vymezení kuželového prostoru pod jímací tyčí v závislosti na výšce stavby)' },
      { id: 'd', text: 'Metoda mřížové soustavy (vytvoření obvodové mříže s definovaným okem bez použití svislých jímačů)' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'Ne, hromosvod a silnoproudá instalace musí mít striktně oddělená uzemnění vzdálená od sebe minimálně 20 metrů.' },
      { id: 'b', text: 'Propojení je dovoleno pouze u rodinných domů s plechovou střechou, u zděných budov je jakékoliv propojení zakázáno.' },
      { id: 'c', text: 'Ano, normy vyžadují vytvoření společné uzemňovací soustavy a pospojování na hlavní uzemňovací svorkovnici (MET / HOP).' },
      { id: 'd', text: 'Uzemnění se smějí propojit pouze přes omezovací tavnou pojistku 10 A, aby bleskový proud nevnikl do domovního rozvodu.' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Maximálně 0,1 Ω do délky přívodu 5 m (+ 0,05 Ω na každých dalších 5 m délky kabelu, nejvýše však 0,5 Ω).' },
      { id: 'b', text: 'Maximálně 0,3 Ω do délky přívodu 5 m (+ 0,1 Ω na každých dalších 7,5 m délky kabelu, nejvýše však 1,0 Ω).' },
      { id: 'c', text: 'Maximálně 1,5 Ω bez ohledu na délku přívodu, pokud spotřebič nevykazuje unikající proud vyšší než 3,5 mA.' },
      { id: 'd', text: 'Maximálně 0,5 Ω do délky přívodu 5 m (+ 0,2 Ω na každých dalších 10 m délky kabelu, nejvýše však 2,0 Ω).' }
    ],
    correctOptionId: 'b',
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
      { id: 'a', text: 'V termínu dohodnutém se správcem distribuční soustavy; vypracovat ji smí vedoucí elektrotechnik s praxí min. 1 rok (§ 7).' },
      { id: 'b', text: 'Do 6 měsíců po zahájení zkušebního provozu stavby; vypracovat ji smí samostatný elektrotechnik pro montáže (§ 6).' },
      { id: 'c', text: 'Až před kolaudací stavby stavebním úřadem; vypracovat ji smí autorizovaný projektant elektro se souhlasem investora.' },
      { id: 'd', text: 'Vždy PŘED uvedením zařízení do provozu; vypracovat ji smí výhradně Revizní technik vyhrazených elektrických zařízení (§ 8).' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'Vodorovné zemniče do hloubky 0,2 až 0,4 m; odstup tyčí min. 0,5 m; jako náhodný zemnič se nesmí použít základový železobeton.' },
      { id: 'b', text: 'Hloubka uložení pásku není omezena a stačí 10 cm pod trávník; tyčové zemniče se dávají těsně k sobě; plynovod je ideální zemnič.' },
      { id: 'c', text: 'Vodorovné zemniče do hloubky 2,0 až 3,0 m; odstup tyčí min. trojnásobek délky; nesmí se použít armování v betonových patkách.' },
      { id: 'd', text: 'Vodorovné zemniče do nezámrzné hloubky 0,8 až 1,5 m; odstup tyčí min. roven délce tyče; nesmí se použít potrubí plynů a kapalin.' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'Pod jeden šroub (do jedné svorky) VŽDY POUZE 1 vodič PE; dveře rozvodny se musí otevírat VEN s panikovým kováním umožňujícím únik.' },
      { id: 'b', text: 'Počet vodičů PE ve svorce závisí pouze na velikosti šroubu; dveře rozvodny musí mít zevnitř pouze kouli vyžadující klíč k otevření.' },
      { id: 'c', text: 'Pod jeden šroub lze připojit až 3 vodiče PE stejného průřezu; dveře rozvodny se musí otevírat DOVNITŘ a být trvale zamčeny na klíč.' },
      { id: 'd', text: 'Pod jeden šroub lze připojit libovolný počet vodičů PE v dutince; dveře rozvodny mohou být posuvné bez požadavku na směr úniku osob.' }
    ],
    correctOptionId: 'a',
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
      { id: 'a', text: 'Tlačítko nouzového zastavení má spínací kontakt NO, takže při přerušení ovládacího vodiče zůstává stroj trvale běžet bez možnosti vypnutí.' },
      { id: 'b', text: 'Musí odpojit výhradně fázový vodič L1 a při ztrátě napětí na cívce musí automaticky přepnout na záložní bateriový zdroj pohonu.' },
      { id: 'c', text: 'Musí odpojit pouze ochranný vodič PE a při výpadku ovládacího napětí musí zařízení zůstat v chodu až do ručního zásahu obsluhy.' },
      { id: 'd', text: 'Musí odpojit všechny pracovní živé vodiče kromě PE/PEN a při výpadku ovládacího napětí musí zařízení bezpečně vypnout (klidový proud).' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'Umožňuje automaticky změřit izolační odpor kabeláže napětím 500 V DC bez nutnosti odpojovat citlivé elektronické spotřebiče ze zásuvek.' },
      { id: 'b', text: 'Slouží ke kalibraci vnitřního odporu měřicích vodičů přístroje před zahájením revizních měření v rozvaděčích nízkého napětí.' },
      { id: 'c', text: 'Umožňuje změřit impedanci Zs za proudovým chráničem měřicím proudem pod prahem jeho vybavení (< 15 mA), aniž by chránič během měření vypadl.' },
      { id: 'd', text: 'Slouží k vyřazení funkce proudového chrániče ze zásuvkového obvodu na dobu měření zkratového proudu plným proudem 25 A.' }
    ],
    correctOptionId: 'c',
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
      { id: 'a', text: 'Dotyk dvou prstů téže ruky; suchá zrohovatělá kůže má nejnižší odpor a představuje pro člověka nejvyšší riziko fibrilace komor.' },
      { id: 'b', text: 'Pravá ruka – pravá noha (proud obchází srdce); vlhkost kůže nemá na elektrický odpor těla ani na velikost proudu žádný měřitelný vliv.' },
      { id: 'c', text: 'Pravá noha – levá noha (krokové napětí); vlhkost kůže zvyšuje elektrický odpor těla a snižuje proud procházející organismem.' },
      { id: 'd', text: 'Levá ruka – nohy (proud prochází přímo srdcem); vlhkost a pot výrazně snižují přechodový odpor kůže a dramaticky zvyšují proud tělem.' }
    ],
    correctOptionId: 'd',
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
      { id: 'a', text: 'Jedna elektroda na střed hrudní kosti, druhá na záda mezi lopatky; během analýzy i podání výboje nepřerušujeme stlačování hrudníku.' },
      { id: 'b', text: 'Obě elektrody se lepí vedle sebe na břicho pod pupík; během výboje musí zachránce pevně držet hlavu postiženého v záklonu.' },
      { id: 'c', text: 'Jedna pod pravou klíční kost, druhá na levý bok pod podpaží; během analýzy rytmu a podání výboje se postiženého nikdo nesmí dotýkat.' },
      { id: 'd', text: 'Elektrody se lepí přes oděv na ramena postiženého; defibrilátor smí podat výboj pouze tehdy, když postižený projevuje známky vědomí.' }
    ],
    correctOptionId: 'c',
    explanation: 'AED slouží k elektrické defibrilaci (zrušení smrtelné komorové fibrilace srdce po úrazu proudem). Elektrody se lepí na holý hrudník dle nákresu (pravá horní část hrudníku pod klíční kostí + levý bok pod prsním svalem). Při analýze EKG a při výboji musí zachránce odstoupit a nikdo se nesmí pacienta dotýkat.',
    normReference: 'Doporučení ERC pro resuscitaci',
    difficulty: 'normal',
    practicalExamRelevant: true
  }
,
  // =========================================================================
  // KAPITOLA 4: VIZUÁLNÍ IDENTIFIKACE SCHÉMATICKÝCH ZNAČEK (ČSN EN 60617)
  // =========================================================================
  {
    id: 'q4-13',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Který elektrotechnický spínací prvek znázorňuje tento schematický symbol?',
    image: '/symbols/019.png',
    options: [
      { id: 'a', text: 'Spínač střídavý (řazení 6)' },
      { id: 'b', text: 'Spínač jednopólový (řazení 1)' },
      { id: 'c', text: 'Spínač křížový (řazení 7)' },
      { id: 'd', text: 'Spínač sériový (řazení 5)' }
    ],
    correctOptionId: 'b',
    explanation: 'Značka představuje jednopólový spínač (řazení 1) dle ČSN EN 60617. Má jeden kontakt a ovládá se jednou klapkou pro zapnutí/vypnutí jednoho světelného okruhu.',
    normReference: 'ČSN EN 60617',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-14',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Jaký spínací přístroj je vyobrazen na této normované půdorysné značce?',
    image: '/symbols/023.png',
    options: [
      { id: 'a', text: 'Spínač křížový (řazení 7)' },
      { id: 'b', text: 'Spínač dvoupólový (řazení 2)' },
      { id: 'c', text: 'Spínač střídavý (řazení 6)' },
      { id: 'd', text: 'Spínač sériový (řazení 5)' }
    ],
    correctOptionId: 'd',
    explanation: 'Dvě rovnoběžné čárky směřující na stejnou stranu označují sériový (lustrový) spínač řazení 5 s dělenou klapkou pro nezávislé ovládání dvou okruhů z jednoho místa.',
    normReference: 'ČSN EN 60617',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-15',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Identifikujte spínací přístroj podle zobrazené instalační značky:',
    image: '/symbols/022.png',
    options: [
      { id: 'a', text: 'Spínač sériový (řazení 5)' },
      { id: 'b', text: 'Spínač střídavý (řazení 6)' },
      { id: 'c', text: 'Spínač křížový (řazení 7)' },
      { id: 'd', text: 'Spínač jednopólový (řazení 1)' }
    ],
    correctOptionId: 'b',
    explanation: 'Jedna čára procházející středem kroužku s praporky na obou koncích v opačném směru je střídavý přepínač řazení 6. Používá se ve dvojici pro ovládání téhož osvětlení ze dvou různých míst.',
    normReference: 'ČSN EN 60617',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-16',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Který instalační spínací prvek představuje tento symbol s křížem a čtyřmi praporky?',
    image: '/symbols/024.png',
    options: [
      { id: 'a', text: 'Spínač křížový (řazení 7)' },
      { id: 'b', text: 'Spínač střídavý (řazení 6)' },
      { id: 'c', text: 'Spínač dvoupólový (řazení 2)' },
      { id: 'd', text: 'Spínač sériový (řazení 5)' }
    ],
    correctOptionId: 'a',
    explanation: 'Kříž se čtyřmi praporky znázorňuje křížový přepínač řazení 7. Zapojuje se mezi přepínače č. 6 a umožňuje ovládat svítidlo z libovolného počtu dalších míst.',
    normReference: 'ČSN EN 60617',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-17',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Jaký ovládací prvek vyjadřuje tato schematická značka s plným terčíkem (bodem)?',
    image: '/symbols/038.png',
    options: [
      { id: 'a', text: 'Tahový vypínač (řazení 1/0t)' },
      { id: 'b', text: 'Tlačítkový ovladač (řazení 1/0)' },
      { id: 'c', text: 'Spínač jednopólový (řazení 1)' },
      { id: 'd', text: 'Spínač se signalizací (řazení 1S)' }
    ],
    correctOptionId: 'b',
    explanation: 'Plný bod (terčík) na konci značky spínače značí tlačítkový ovladač 1/0 (zapínací tlačítko). Po uvolnění tlaku prstu se kontakt vrátí do klidové rozepnuté polohy.',
    normReference: 'ČSN EN 60617',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-18',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Co znázorňuje tento základní půdorysný elektrotechnický symbol?',
    image: '/symbols/001.png',
    options: [
      { id: 'a', text: 'Zásuvka třífázová 400 V (3P+N+PE)' },
      { id: 'b', text: 'Vývod pro sporák 400 V se svorkovnicí' },
      { id: 'c', text: 'Zásuvka dvojitá 230 V (2× 2P+PE)' },
      { id: 'd', text: 'Zásuvka jednofázová 230 V (2P+PE)' }
    ],
    correctOptionId: 'd',
    explanation: 'Půlkruh s jednou čárkou představuje běžnou jednofázovou zásuvku 230 V (16 A) s ochranným kolíkem dle ČSN EN 60617.',
    normReference: 'ČSN EN 60617',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-19',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Jaký typ zásuvky představuje tento symbol se dvěma čárkami vyvedenými z půlkruhu?',
    image: '/symbols/005.png',
    options: [
      { id: 'a', text: 'Holicí zásuvka s oddělovacím trafem' },
      { id: 'b', text: 'Jednofázová zásuvka 230 V (2P+PE)' },
      { id: 'c', text: 'Trojitá zásuvka ve společném rámečku' },
      { id: 'd', text: 'Dvojitá zásuvka 230 V (2× 2P+PE)' }
    ],
    correctOptionId: 'd',
    explanation: 'Dvě rovnoběžné čárky z půlkruhu znázorňují dvojitou zásuvku 230 V. Dle ČSN 33 2130 ed. 4 se dvojzásuvka do maximálního počtu 10 zásuvek na obvod započítává jako 1 kus.',
    normReference: 'ČSN EN 60617, ČSN 33 2130 ed. 4',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-20',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Identifikujte zobrazenou zásuvku podle značky se třemi čárkami:',
    image: '/symbols/006.png',
    options: [
      { id: 'a', text: 'Zásuvka jednofázová 230 V (2P+PE)' },
      { id: 'b', text: 'Zásuvka dvojitá 230 V (2× 2P+PE)' },
      { id: 'c', text: 'Přepěťová zásuvka s filtrem SPD T3' },
      { id: 'd', text: 'Třífázová zásuvka 400 V (3P+N+PE)' }
    ],
    correctOptionId: 'd',
    explanation: 'Tři čárky u půdorysné značky zásuvky značí třífázovou zásuvku 400 V (3P+N+PE, tzv. pětikolík CEE).',
    normReference: 'ČSN EN 60617',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-21',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Který světelný vývod představuje tento křížek v kruhu?',
    image: '/symbols/009.png',
    options: [
      { id: 'a', text: 'Stmívatelné podhledové bodové světlo' },
      { id: 'b', text: 'Stropní svítidlo (všeobecná značka)' },
      { id: 'c', text: 'Nástěnné svítidlo s ramenem' },
      { id: 'd', text: 'Nouzové únikové svítidlo s baterií' }
    ],
    correctOptionId: 'b',
    explanation: 'Kruh s křížkem uvnitř je základní schematická a půdorysná značka pro stropní svítidlo / světelný bod dle ČSN EN 60617.',
    normReference: 'ČSN EN 60617',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-22',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Jaký modulární přístroj do rozvaděče představuje tato značka s tepelnou a elektromagnetickou spouští?',
    image: '/symbols/105.png',
    options: [
      { id: 'a', text: 'Tavná pojistka válcová (FU)' },
      { id: 'b', text: 'Proudový chránič bez nadproudu (RCCB)' },
      { id: 'c', text: 'Jistič vedení jednopólový (MCB 1P)' },
      { id: 'd', text: 'Vypínač / odpínač zátěže (QM)' }
    ],
    correctOptionId: 'c',
    explanation: 'Značka znázorňuje jednopólový jistič vedení (např. B10/1, B16/1). Obsahuje kontaktní spínač doplněný tepelnou spouští (obdélníček pro ochranu proti přetížení) a elektromagnetickou rychlou zkratovou spouští.',
    normReference: 'ČSN EN 60617, ČSN EN 60898-1',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-23',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Který rozvaděčový přístroj je znázorněn tímto schématem tří mechanicky spřažených pólů se spouštěmi?',
    image: '/symbols/107.png',
    options: [
      { id: 'a', text: 'Jistič vedení třípólový (MCB 3P)' },
      { id: 'b', text: 'Třífázový výkonový stykač (KM)' },
      { id: 'c', text: 'Třífázový proudový chránič (RCCB 4P)' },
      { id: 'd', text: 'Odpínač pojistek třífázový (QFD)' }
    ],
    correctOptionId: 'a',
    explanation: 'Jedná se o třípólový jistič (např. B16/3 nebo C25/3) se společným mechanickým spřažením páček – při poruše v libovolné fázi bezpečně odpojí všechny 3 fáze současně.',
    normReference: 'ČSN EN 60617, ČSN EN 60898-1',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-24',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Který klíčový ochranný přístroj rozvaděče je vyobrazen se součtovým proudovým transformátorem (ovál) a testovacím tlačítkem T?',
    image: '/symbols/112.png',
    options: [
      { id: 'a', text: 'Impulzní paměťové relé do rozvaděče' },
      { id: 'b', text: 'Proudový chránič bez nadproudu (RCCB)' },
      { id: 'c', text: 'Svodič přepětí varistorový (SPD T2)' },
      { id: 'd', text: 'Jistič vedení s tepelnou spouští (MCB)' }
    ],
    correctOptionId: 'b',
    explanation: 'Ovál představuje feritové jádro součtového proudového transformátoru (měřicí diferenciální cívka) a tlačítko T slouží pro pravidelné mechanické a elektrické testování vybavení chrániče. Jedná se o proudový chránič (RCCB).',
    normReference: 'ČSN EN 60617, ČSN EN 61008-1',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-25',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Jaký přístroj představuje toto kombinované schéma obsahující jističové spouště (tepelnou i zkratovou) i součtový transformátor chrániče?',
    image: '/symbols/rcbo.png',
    options: [
      { id: 'a', text: 'Napěťové vybavovací relé (vypínací spoušť)' },
      { id: 'b', text: 'Proudový chránič bez spouští (RCCB)' },
      { id: 'c', text: 'Motorový spouštěč s ochranou fáze (MS)' },
      { id: 'd', text: 'Proudový chránič s nadproudem (RCBO)' }
    ],
    correctOptionId: 'd',
    explanation: 'Jističochránič (RCBO) sdružuje v jednom přístroji ochranu proti nadproudu a zkratu (funkce jističe) a ochranu před nebezpečným dotykem a reziduálním unikajícím proudem (funkce chrániče). Šetří místo v rozvaděči (často šířka 1 nebo 2 moduly).',
    normReference: 'ČSN EN 60617, ČSN EN 61009-1',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-26',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Identifikujte ochranný přístroj vyznačený schématickou značkou varistoru / bleskojistky v rozvaděči:',
    image: '/symbols/113.png',
    options: [
      { id: 'a', text: 'Tavná nožová pojistka se signalizací' },
      { id: 'b', text: 'Měřicí transformátor proudu (MTP)' },
      { id: 'c', text: 'Svodič přepětí / bleskojistka (SPD)' },
      { id: 'd', text: 'Kompenzační kondenzátor účiníku' }
    ],
    correctOptionId: 'c',
    explanation: 'Značka představuje svodič přepětí (SPD – Surge Protective Device dle ČSN EN 61643-11), který svede bleskové proudy a přepěťové špičky bezpečně do ochranného pospojování a země.',
    normReference: 'ČSN EN 60617, ČSN EN 61643-11',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-27',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Který výkonový spínací přístroj je znázorněn se silovými spínacími kontakty a ovládací cívkou svorek A1–A2?',
    image: '/symbols/118.png',
    options: [
      { id: 'a', text: 'Ruční vačkový přepínač sítí (QM)' },
      { id: 'b', text: 'Přednostní proudové odlehčovací relé' },
      { id: 'c', text: 'Hladinový spínač s časovým zpožděním' },
      { id: 'd', text: 'Výkonový stykač se spínacími kontakty (KM)' }
    ],
    correctOptionId: 'd',
    explanation: 'Značka představuje stykač (KM). Obsahuje elektromagnetickou ovládací cívku (svorky A1–A2) a hlavní silové spínací kontakty (1-2, 3-4, 5-6) určené pro dálkové spínání vysokých proudů.',
    normReference: 'ČSN EN 60617, ČSN EN 60947-4-1',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-28',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Který jistící prvek rozvaděče představuje tento obdélníček s čarou procházející středem?',
    image: '/symbols/108.png',
    options: [
      { id: 'a', text: 'Tavná pojistka / pojistková vložka (FU)' },
      { id: 'b', text: 'Bimetalové nadproudové relé (FR)' },
      { id: 'c', text: 'Pevný výkonový rezistor / odporník (R)' },
      { id: 'd', text: 'Tlumivka pro zářivkové svítidlo (L)' }
    ],
    correctOptionId: 'a',
    explanation: 'Obdélník s průchozí plnou čárou je mezinárodní značka pojistky (FU dle ČSN EN 60617 a ČSN EN 81346-2). Při nadproudu nebo zkratu se tavný drátek přetaví a obvod bezpečně přeruší.',
    normReference: 'ČSN EN 60617, ČSN EN 81346-2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-29',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Co znamená tato základní elektrotechnická značka složená z vodorovných čárek klesající délky?',
    image: '/symbols/083.png',
    options: [
      { id: 'a', text: 'Kostra přístroje / pospojování na kryt' },
      { id: 'b', text: 'Ekvipotenciální bezšumová svorkovna' },
      { id: 'c', text: 'Střední nulový pracovní bod zdroje' },
      { id: 'd', text: 'Uzemnění / ochranný zemnič (spojení se zemí)' }
    ],
    correctOptionId: 'd',
    explanation: 'Tři vodorovné čárky zmenšující se směrem dolů jsou univerzální mezinárodní značkou pro zemnič / uzemnění dle ČSN EN 60617.',
    normReference: 'ČSN EN 60617, ČSN 33 2000-5-54 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q4-30',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Co znamenají tři šikmé čárky na schematické čáře elektrického vedení v instalačním výkrese?',
    image: '/symbols/087.png',
    options: [
      { id: 'a', text: 'Kabelové vedení délky 3 metry v liště' },
      { id: 'b', text: 'Třífázové vedení bez nulového vodiče' },
      { id: 'c', text: 'Třížilové vedení (např. kabel L + N + PE)' },
      { id: 'd', text: 'Souběh tří samostatných trubek ve zdi' }
    ],
    correctOptionId: 'c',
    explanation: 'Šikmé čárky protínající trasu vedení udávají počet žil v daném úseku kabelu nebo trubky (3 čárky = 3 žíly L, N, PE).',
    normReference: 'ČSN EN 60617',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  // =========================================================================
  // KAPITOLA 2: OTÁZKY ZE ZKOUŠEK NV č. 194/2022 Sb. & ČSN EN 50110-1 (PŠIS 2025)
  // =========================================================================
  {
    id: 'q2-13',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Jaké složení musí mít zkušební komise pro přezkoušení elektrotechniků (§ 6) a vedoucích elektrotechniků (§ 7) podle NV č. 194/2022 Sb. a jaký minimální výsledek z písemného testu je nutný pro hodnocení „vyhověl“?',
    options: [
      { id: 'a', text: 'Dvoučlenná komise tvořená zástupci zaměstnavatele; v písemném testu postačí dosáhnout 50 % bodů.' },
      { id: 'b', text: 'Tříčlenná komise s předsedou revizním technikem; v testu je nutné dosáhnout minimálně 80 % bodů.' },
      { id: 'c', text: 'Jednočlenná komise tvořená revizním technikem; v testu je nutné dosáhnout alespoň 65 % bodů.' },
      { id: 'd', text: 'Čtyřčlenná komise jmenovaná ministerstvem; pro úspěch u zkoušky je vyžadováno minimálně 90 % bodů.' }
    ],
    correctOptionId: 'b',
    explanation: 'Podle NV č. 194/2022 Sb. zkušební komise musí být tříčlenná a jejím předsedou musí být revizní technik. Aby mohl být výsledek písemné části vyhodnocen stupněm „vyhověl“ a uchazeč mohl pokračovat k ústní části, musí dosáhnout minimálně 80 % správných odpovědí.',
    normReference: 'NV č. 194/2022 Sb., Metodické pokyny PŠIS 2025',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q2-14',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Které úkony na elektrických zařízeních nízkého napětí smějí podle ČSN EN 50110-1 ed. 3 provádět osoby seznámené (školené) u svítidel s ochranou před dotykem minimálně IP 2X nebo IP XXB?',
    options: [
      { id: 'a', text: 'Smějí opravovat elektronické předřadníky a vyměňovat vadné jističe světel v rozvaděči.' },
      { id: 'b', text: 'Pouze ve vypnutém stavu vyměňovat světelné zdroje (žárovky, zářivky) a startéry svítidel.' },
      { id: 'c', text: 'Smějí vyměňovat kompletní stropní svítidla a zapojovat nové kabely v rozvodných krabicích.' },
      { id: 'd', text: 'Osoby seznámené nesmějí provádět žádnou manipulaci se svítidlem ani při vypnutém vypínači.' }
    ],
    correctOptionId: 'b',
    explanation: 'Podle ČSN EN 50110-1 ed. 3 smějí osoby seznámené (školené dle zákona č. 250/2021 Sb.) u svítidel s krytím alespoň IP 2X (IP XXB) ve vypnutém stavu vyměňovat světelné zdroje a startéry. Výměnu svítidla či zásah do pevné elektroinstalace smějí provádět výhradně osoby znalé (§ 6 elektrotechnik).',
    normReference: 'ČSN EN 50110-1 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q2-15',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Kdo podle zákona č. 250/2021 Sb. a NV č. 190/2022 Sb. může provádět montáž, opravy a revize vyhrazených elektrických zařízení (VEZ)?',
    options: [
      { id: 'a', text: 'Montáže smí provádět libovolný živnostník s volnou živností bez odborného elektrotechnického vzdělání.' },
      { id: 'b', text: 'Výhradně státní organizace a distribuční energetické společnosti s licencí Energetického regulačního úřadu.' },
      { id: 'c', text: 'Všechny stavební firmy zapsané v obchodním rejstříku bez ohledu na technické oprávnění inspekce práce.' },
      { id: 'd', text: 'Právnické nebo podnikající fyzické osoby s oprávněním TIČR; revize provádí revizní technik s osvědčením.' }
    ],
    correctOptionId: 'd',
    explanation: 'Podle zákona č. 250/2021 Sb. a NV č. 190/2022 Sb. vyžaduje montáž a oprava vyhrazených elektrických zařízení oprávnění organizace vydané TIČR a výkon revizí osvědčení revizního technika vydané TIČR po úspěšné státní zkoušce.',
    normReference: 'Zákon č. 250/2021 Sb., NV č. 190/2022 Sb.',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  // =========================================================================
  // KAPITOLA 3: OTÁZKY ZE ZKOUŠEK ČSN 33 2000-4-41 ed. 3 (PŠIS 2025)
  // =========================================================================
  {
    id: 'q3-13',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'Jaký minimální stupeň krytí musí podle ČSN 33 2000-4-41 ed. 3 zajišťovat kryty živých částí uvnitř a jaké krytí musí mít vodorovný horní povrch snadno přístupných krytů?',
    options: [
      { id: 'a', text: 'Živé části uvnitř krytů alespoň IP 44 (ochrana před stříkající vodou); horní vodorovný povrch snadno přístupných krytů alespoň IP 65 (prachotěsné).' },
      { id: 'b', text: 'Živé části uvnitř krytů alespoň IP XXC nebo IP 3X (ochrana nástrojem); horní vodorovný povrch snadno přístupných krytů alespoň IP XXC nebo IP 3X.' },
      { id: 'c', text: 'Živé části uvnitř krytů alespoň IP XXA nebo IP 1X (ochrana hřbetem ruky); horní vodorovný povrch snadno přístupných krytů alespoň IP XXB nebo IP 2X.' },
      { id: 'd', text: 'Živé části uvnitř krytů alespoň IP XXB nebo IP 2X (ochrana prstem); horní vodorovný povrch snadno přístupných krytů alespoň IP XXD nebo IP 4X.' }
    ],
    correctOptionId: 'd',
    explanation: 'Dle ČSN 33 2000-4-41 ed. 3 čl. 412.2 musí kryty a přepážky chránící živé části zajistit krytí alespoň IP 2X / IP XXB. Vodorovný horní povrch krytů, na který mohou spadnout předměty nebo nářadí, musí mít přísnější krytí alespoň IP 4X / IP XXD.',
    normReference: 'ČSN 33 2000-4-41 ed. 3',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q3-14',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'Jaký je zásadní rozdíl v klasifikaci prostorů z hlediska nebezpečí úrazu elektrickým proudem mezi starší ČSN 33 2000-4-41 ed. 2 a platnou ČSN 33 2000-4-41 ed. 3?',
    options: [
      { id: 'a', text: 'Edice 3 ponechala staré dělení prostorů beze změny, ale snížila mezní bezpečné dotykové napětí v normálních prostorech z 50 V AC na 24 V AC.' },
      { id: 'b', text: 'Edice 3 již neuvádí dřívější dělení na normální, nebezpečné a zvlášť nebezpečné prostory; řešení vychází z protokolu vnějších vlivů dle ČSN 33 2000-5-51.' },
      { id: 'c', text: 'Edice 3 zrušila ochranu automatickým odpojením od zdroje a nahradila ji výhradním používáním malého bezpečného napětí SELV v celé instalaci.' },
      { id: 'd', text: 'Edice 3 nově zavedla povinné rozdělení všech vnitřních prostorů na čtyři rizikové kategorie podle nadmořské výšky a vlhkosti zdiva budovy.' }
    ],
    correctOptionId: 'b',
    explanation: 'ČSN 33 2000-4-41 ed. 3 opustila staré rozdělení na 3 kategorie prostorů (normální, nebezpečné, zvlášť nebezpečné). Bezpečnostní požadavky a dimenzování se dnes řídí přesnými kódy vnějších vlivů (ČSN 33 2000-5-51 ed. 3) a předmětovými normami.',
    normReference: 'ČSN 33 2000-4-41 ed. 3, ČSN 33 2000-5-51 ed. 3',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q3-15',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'Pro které zásuvky je podle platné ČSN 33 2000-4-41 ed. 3 povinná doplňková ochrana proudovým chráničem (RCD) s vybavovacím proudem IΔn ≤ 30 mA?',
    options: [
      { id: 'a', text: 'Pro všechny střídavé zásuvky pro všeobecné použití obsluhované laiky do jmenovitého proudu In ≤ 32 A a pro venkovní mobilní zařízení do 32 A.' },
      { id: 'b', text: 'Pouze pro střídavé zásuvky do 16 A umístěné v koupelnách a kuchyních, v ostatních obytných místnostech je použití chrániče dobrovolné.' },
      { id: 'c', text: 'Pro všechny střídavé i stejnosměrné zásuvky bez rozdílu proudu, přičemž vybavovací proud chrániče musí být nastaven na maximálně 10 mA.' },
      { id: 'd', text: 'Výhradně pro třífázové průmyslové zásuvky 400 V od 32 A výše, u běžných jednofázových zásuvek 230 V do 16 A norma chránič nepředepisuje.' }
    ],
    correctOptionId: 'a',
    explanation: 'ČSN 33 2000-4-41 ed. 3 rozšířila povinnost instalace 30mA proudového chrániče pro zásuvky používané laiky z dřívějších 20 A nově až do jmenovitého proudu 32 A včetně (týká se tedy i 32A třífázových zásuvek).',
    normReference: 'ČSN 33 2000-4-41 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  // =========================================================================
  // KAPITOLA 5: ČSN 33 2130 ed. 4 (PLATNÁ OD 1. 1. 2025) & ULIČKY ROZVADĚČŮ
  // =========================================================================
  {
    id: 'q5-13',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'Jaké zásadní požadavky na ochranu světelných obvodů v bytové výstavbě stanovuje nová norma ČSN 33 2130 ed. 4 (platná od 1. ledna 2025)?',
    options: [
      { id: 'a', text: 'Světelné obvody musí mít doplňkovou ochranu RCD ≤ 30 mA nesdílenou se zásuvkami a nesmí být použit chránič typu AC.' },
      { id: 'b', text: 'Všechny světelné obvody v celém bytě musí být připojeny na jeden společný čtyřpólový centrální proudový chránič typu AC.' },
      { id: 'c', text: 'Světelné obvody musí být napájeny výhradně ze střídače se záložní baterií a jištěny jističi s charakteristikou D do 6 A.' },
      { id: 'd', text: 'Světelné obvody v obytných místnostech proudový chránič mít nesmějí, chránič 30 mA se vyžaduje pouze u venkovního osvětlení.' }
    ],
    correctOptionId: 'a',
    explanation: 'Dle ČSN 33 2130 ed. 4 (od 1. 1. 2025) musí mít světelné obvody samostatný proudový chránič max. 30 mA (ideálně samostatné RCBO), který nesmí být sloučen se zásuvkovými obvody, a je zakázáno instalovat chrániče zastaralého typu AC (které nereagují na stejnosměrné složky LED předřadníků).',
    normReference: 'ČSN 33 2130 ed. 4 (od 1. 1. 2025)',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q5-14',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'Jak se podle normy ČSN 33 2130 ed. 4 (od 1. 1. 2025) počítá počet zásuvek ve vícenásobných rámečcích a kolik zásuvek smí být maximálně na jednom obvodu?',
    options: [
      { id: 'a', text: 'Na obvod max. 10 zásuvek; ve vícenásobném rámečku se každá zásuvka počítá samostatně, dvojzásuvka v jedné krabici jako 1 kus.' },
      { id: 'b', text: 'Na obvod max. 16 zásuvek; ve vícenásobném rámečku se celý rámeček počítá vždy jako 1 kus bez ohledu na počet přístrojů.' },
      { id: 'c', text: 'Na obvod max. 6 zásuvek; každá dvojzásuvka se započítává jako 2 samostatné vývody a trojrámeček jako 4 samostatné vývody.' },
      { id: 'd', text: 'Počet zásuvek na obvod není normou omezen, rozhodující je pouze nepřekročení celkového instalovaného příkonu 5 000 W.' }
    ],
    correctOptionId: 'a',
    explanation: 'Podle ČSN 33 2130 ed. 4 platí limit max. 10 zásuvkových vývodů na obvod. Zásuvky ve vícenásobném rámečku (např. 3 zásuvky vedle sebe) se započítávají každá jako samostatná zásuvka. Tradiční dvojitá zásuvka montovaná do jedné přístrojové krabice KU 68 se počítá jako 1 kus.',
    normReference: 'ČSN 33 2130 ed. 4',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q5-15',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'Jaké požadavky platí pro uličky pro obsluhu a údržbu rozvaděčů a elektrických zařízení dle bezpečnostních norem (ČSN 33 2130 ed. 4, ČSN EN 61936-1)?',
    options: [
      { id: 'a', text: 'Výška nechráněných živých částí v uličce min. 1,8 m; úhel otevření dveří rozvaděče min. 45°; prostor delší než 10 m přístupný z obou konců.' },
      { id: 'b', text: 'Výška nechráněných živých částí v uličce min. 3,0 m; úhel otevření dveří rozvaděče min. 180°; uličky nemusí mít nouzové východy.' },
      { id: 'c', text: 'Výška nechráněných živých částí v uličce min. 2,5 m; úhel otevření dveří rozvaděče min. 90°; prostor delší než 20 m přístupný z obou konců.' },
      { id: 'd', text: 'Průchozí šířka uličky stačí min. 40 cm; dveře rozvaděče se musí otevírat dovnitř uličky s automatickým samozavíračem.' }
    ],
    correctOptionId: 'c',
    explanation: 'Pro zajištění bezpečného pohybu a úniku v rozvodnách a uličkách rozvaděčů se vyžaduje výška živých částí min. 2,5 m nad podlahou, úhel otevření dveří alespoň 90° a u dlouhých prostorů nad 20 m oboustranný únik (dveře na obou koncích).',
    normReference: 'ČSN 33 2130 ed. 4, ČSN EN 61936-1',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  // =========================================================================
  // KAPITOLA 8: PRVNÍ POMOC & HROMOSVODY (PŠIS 2025, ČSN EN 62305 ed. 2)
  // =========================================================================
  {
    id: 'q8-13',
    chapterId: 8,
    competencyCode: '26-017-H/08',
    question: 'Jaká je správná frekvence stlačování hrudníku a jaká je rychlost umělého dýchání při resuscitaci postiženého po zásahu elektrickým proudem?',
    options: [
      { id: 'a', text: 'Frekvence stlačování hrudníku 100 až 120 za minutu v poměru 30:2; samostatné umělé dýchání 10 až 12 vdechů za minutu.' },
      { id: 'b', text: 'Frekvence stlačování hrudníku 40 až 50 za minutu v poměru 10:1; umělé dýchání se při úrazu elektrickým proudem neprovádí.' },
      { id: 'c', text: 'Frekvence stlačování hrudníku 140 až 160 za minutu v poměru 50:5; samostatné umělé dýchání 5 až 6 vdechů za minutu.' },
      { id: 'd', text: 'Frekvence stlačování hrudníku 60 až 80 za minutu v poměru 15:2; samostatné umělé dýchání 20 až 25 vdechů za minutu.' }
    ],
    correctOptionId: 'a',
    explanation: 'Podle mezinárodních doporučení ERC a zkušebních testů pro elektrotechniky je frekvence nepřímé srdeční masáže 100 až 120 stlačení/min v hloubce 5–6 cm v poměru 30 stlačení ku 2 záchranným vdechům. Provádí-li se samostatné umělé dýchání, frekvence je 10 až 12 vdechů/min.',
    normReference: 'ERC Guidelines, Zkušební testy PŠIS 2025',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q8-14',
    chapterId: 8,
    competencyCode: '26-017-H/08',
    question: 'Kdy a za jakých podmínek lze ukončit nepřímou srdeční masáž a umělé dýchání u postiženého po úrazu elektrickým proudem?',
    options: [
      { id: 'a', text: 'Když postižený začne sám pravidelně dýchat, při předání posádce ZZS / lékaři, nebo při úplném fyzickém vyčerpání zachránce.' },
      { id: 'b', text: 'Po provedení deseti cyklů 30:2 bez ohledu na to, zda se postižený probudil nebo zda byl na místo přinesen přístroj AED.' },
      { id: 'c', text: 'Jakmile je z dálky slyšet přijíždějící houkající vozidlo záchranné služby nebo dorazí na místo hlídka městské policie.' },
      { id: 'd', text: 'Po uplynutí 10 minut od zahájení resuscitace, pokud postižený nejeví žádné známky obnovení spontánního krevního oběhu.' }
    ],
    correctOptionId: 'a',
    explanation: 'KPR nesmí zachránce svévolně přerušit po několika minutách. Resuscitace se provádí nepřetržitě až do obnovení spontánních životních funkcí, do převzetí péče posádkou zdravotnické záchranné služby (na pokyn lékaře), nebo do absolutního fyzického vyčerpání zachránce.',
    normReference: 'Zkušební testy PŠIS 2025, ERC Guidelines',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q8-15',
    chapterId: 8,
    competencyCode: '26-017-H/08',
    question: 'Kolik tříd ochrany před bleskem (LPS) rozlišuje norma ČSN EN 62305-3 ed. 2 a jaké jsou přípustné metody pro stanovení umístění jímací soustavy?',
    options: [
      { id: 'a', text: 'Dvě třídy LPS (lehká a těžká); přípustná je výhradně metoda radioaktivního jímače a metoda bleskosvodu s předstihem zážehu.' },
      { id: 'b', text: 'Tři třídy LPS (A, B, C); přípustná je pouze metoda výpočtu zemního odporu a metoda měření impedance bleskového svodu.' },
      { id: 'c', text: 'Čtyři třídy LPS (I až IV); přípustné jsou 3 metody: metoda ochranného úhlu, metoda valící se koule a metoda mřížové soustavy.' },
      { id: 'd', text: 'Pět tříd LPS (1 až 5); přípustná je pouze metoda ochranného kužele o stálém vrcholovém úhlu 45 stupňů pro všechny objekty.' }
    ],
    correctOptionId: 'c',
    explanation: 'Podle ČSN EN 62305-3 ed. 2 se systémy ochrany před bleskem dělí do 4 tříd LPS (I, II, III, IV) podle úrovně LPL. Pro stanovení ochranného prostoru jímací soustavy norma připouští přesně tři metody: metodu ochranného úhlu, metodu valící se koule a metodu mřížové soustavy.',
    normReference: 'ČSN EN 62305-3 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  }

];
