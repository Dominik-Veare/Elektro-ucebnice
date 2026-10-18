import { Question } from '../types';

export const QUESTIONS: Question[] = [
  // --- KAPITOLA 1: Základní pojmy a vztahy ---
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
      { id: 'b', text: 'V první části sítě je sloučený vodič PEN, v místě rozdělení se rozdělí na PE a N a dále se nesmí znovu spojit.' },
      { id: 'c', text: 'Síť nemá uzemněný uzel zdroje.' },
      { id: 'd', text: 'Síť je chráněna pouze oddělovacím transformátorem.' }
    ],
    correctOptionId: 'b',
    explanation: 'V síti TN-C-S je od zdroje k objektu veden společný vodič PEN (C = Combined). V domovní rozvodnici dojde k rozdělení na samostatný PE a N (S = Separated). Po rozdělení se tyto vodiče již nesmí nikde spojit.',
    normReference: 'ČSN 33 2000-1 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q1-4',
    chapterId: 1,
    competencyCode: '26-017-H/01',
    question: 'Jaký je minimální dovolený průřez vodiče PEN v pevné instalaci dle ČSN 33 2000-5-54?',
    options: [
      { id: 'a', text: '2,5 mm² Cu nebo 4 mm² Al' },
      { id: 'b', text: '6 mm² Cu nebo 10 mm² Al' },
      { id: 'c', text: '10 mm² Cu nebo 16 mm² Al' },
      { id: 'd', text: '16 mm² Cu nebo 25 mm² Al' }
    ],
    correctOptionId: 'c',
    explanation: 'Z důvodu mechanické a elektrické spolehlivosti nesmí být průřez vodiče PEN menší než 10 mm² mědi (Cu) nebo 16 mm² hliníku (Al). Při menších průřezech musí být PE a N vedeny odděleně!',
    normReference: 'ČSN 33 2000-5-54 ed. 3',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q1-5',
    chapterId: 1,
    competencyCode: '26-017-H/01',
    question: 'Jaké barvy izolace smí být použity výhradně a pouze pro ochranný vodič (PE)?',
    options: [
      { id: 'a', text: 'Světle modrá po celé délce' },
      { id: 'b', text: 'Výhradně kombinace zelená a žlutá' },
      { id: 'c', text: 'Hnědá se zeleným pruhem' },
      { id: 'd', text: 'Černá se žlutou páskou na koncích' }
    ],
    correctOptionId: 'b',
    explanation: 'Dle ČSN EN 60446 je kombinace barev zelená/žlutá vyhrazena výhradně pro ochranný vodič PE a nesmí být použita pro žádný jiný účel.',
    normReference: 'ČSN EN 60446',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q1-6',
    chapterId: 1,
    competencyCode: '26-017-H/01',
    question: 'Co udává druhá číslice v kódu krytí IP (např. v IP 44)?',
    options: [
      { id: 'a', text: 'Ochranu před dotykem nebezpečných částí prstem' },
      { id: 'b', text: 'Ochranu před vniknutím vody a vlhkosti' },
      { id: 'c', text: 'Mechanickou odolnost proti nárazu' },
      { id: 'd', text: 'Třídu izolace' }
    ],
    correctOptionId: 'b',
    explanation: 'První číslice kódu IP udává ochranu před vniknutím cizích pevných těles a nebezpečným dotykem. Druhá číslice udává stupeň ochrany před škodlivým vniknutím vody.',
    normReference: 'ČSN EN 60529',
    difficulty: 'normal'
  },
  {
    id: 'q1-7',
    chapterId: 1,
    competencyCode: '26-017-H/01',
    question: 'V obvodu máme dva paralelně zapojené rezistory: R1 = 60 Ω a R2 = 30 Ω. Jaký je jejich celkový odpor?',
    options: [
      { id: 'a', text: '90 Ω' },
      { id: 'b', text: '45 Ω' },
      { id: 'c', text: '20 Ω' },
      { id: 'd', text: '15 Ω' }
    ],
    correctOptionId: 'c',
    explanation: 'Pro paralelní spojení platí R_celk = (R1 * R2) / (R1 + R2) = (60 * 30) / (60 + 30) = 1800 / 90 = 20 Ω. Výsledný odpor je vždy menší než nejmenší odpor v obvodu.',
    normReference: 'Základy elektrotechniky',
    difficulty: 'normal'
  },
  {
    id: 'q1-8',
    chapterId: 1,
    competencyCode: '26-017-H/01',
    question: 'Jaký je zásadní rozdíl mezi obvody SELV a PELV?',
    options: [
      { id: 'a', text: 'SELV je střídavý, PELV je stejnosměrný.' },
      { id: 'b', text: 'V obvodu SELV nesmí být žádný bod ani kostra spojena se zemí (neuzemněná), zatímco PELV má obvod nebo kostru spojenou se zemí.' },
      { id: 'c', text: 'SELV má napětí do 230 V, PELV do 50 V.' },
      { id: 'd', text: 'V obvodu SELV se nesmí používat bezpečnostní transformátor.' }
    ],
    correctOptionId: 'b',
    explanation: 'SELV (Safety Extra-Low Voltage) je bezpečné malé napětí, které je galvanicky odděleno od sítě a NENÍ spojeno se zemí. PELV (Protective Extra-Low Voltage) je rovněž bezpečně odděleno od sítě, ale jeho část nebo kostra je uzemněna.',
    normReference: 'ČSN 33 2000-4-41 ed. 3',
    difficulty: 'hard'
  },

  // --- KAPITOLA 2: Bezpečnost a ochrana před úrazem ---
  {
    id: 'q2-1',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Který právní předpis od 1. 7. 2022 v ČR stanovuje požadavky na odbornou způsobilost k výkonu činností na el. zařízeních (nahradil vyhlášku 50/1978 Sb.)?',
    options: [
      { id: 'a', text: 'Zákoník práce č. 262/2006 Sb.' },
      { id: 'b', text: 'Nařízení vlády č. 194/2022 Sb. (dle zákona č. 250/2021 Sb.)' },
      { id: 'c', text: 'Vyhláška Ministerstva průmyslu č. 100/2020 Sb.' },
      { id: 'd', text: 'ČSN 33 2000-5-51' }
    ],
    correctOptionId: 'b',
    explanation: 'Dnem 1. 7. 2022 vstoupil v účinnost zákon č. 250/2021 Sb. o bezpečnosti práce v souvislosti s provozem vyhrazených technických zařízení a jeho prováděcí Nařízení vlády č. 194/2022 Sb., které zrušilo starou vyhlášku 50/1978 Sb.',
    normReference: 'NV č. 194/2022 Sb.',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q2-2',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Jaké je správné znění a pořadí prvních 3 bezpečnostních pravidel pro zajištění beznapěťového stavu?',
    options: [
      { id: 'a', text: '1. Ověřit beznapětí, 2. Odpojit, 3. Uzemnit a zkratovat' },
      { id: 'b', text: '1. Úplně odpojit, 2. Zajistit proti opětovnému zapnutí, 3. Ověřit beznapěťový stav' },
      { id: 'c', text: '1. Vyvěsit tabulku, 2. Vypnout jistič, 3. Začít pracovat' },
      { id: 'd', text: '1. Uzemnit a zkratovat, 2. Odpojit přívod, 3. Ohradit' }
    ],
    correctOptionId: 'b',
    explanation: 'Pět základních bezpečnostních pravidel: 1. Úplně odpojit, 2. Zajistit proti opětovnému zapnutí, 3. Ověřit beznapěťový stav, 4. Uzemnit a zkratovat, 5. Ohradit nebo zakrýt živé části v okolí.',
    normReference: 'ČSN EN 50110-1 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q2-3',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Jakým způsobem a přístrojem se MUSÍ ověřovat beznapěťový stav při práci na instalaci NN?',
    options: [
      { id: 'a', text: 'Doutnavkovou fázovkou (šroubovákem se světýlkem)' },
      { id: 'b', text: 'Dotykem hřbetu ruky' },
      { id: 'c', text: 'Spolehlivou dvoupólovou zkoušečkou, která byla bezprostředně před i po měření přezkoušena na známém zdroji napětí' },
      { id: 'd', text: 'Pouze pohledem na páčku jističe v rozvaděči' }
    ],
    correctOptionId: 'c',
    explanation: 'Beznapěťový stav se smí ověřovat pouze schválenou dvoupólovou zkoušečkou (např. zkoušečka typu vadaska). Zkoušečka se musí před měřením otestovat na živém napětí, následně změřit pracoviště a poté znovu přezkoušet funkčnost zkoušečky.',
    normReference: 'ČSN EN 50110-1 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q2-4',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Jaká je maximální dovolená doba automatického odpojení od zdroje v síti TN při jmenovitém napětí U0 = 230 V pro koncové zásuvkové obvody do 32 A dle ČSN 33 2000-4-41 ed. 3?',
    options: [
      { id: 'a', text: '0,1 s' },
      { id: 'b', text: '0,2 s' },
      { id: 'c', text: '0,4 s' },
      { id: 'd', text: '5 s' }
    ],
    correctOptionId: 'c',
    explanation: 'Dle tabulky 41.1 normy ČSN 33 2000-4-41 ed. 3 je pro střídavou síť TN při napětí 230 V maximální doba odpojení 0,4 sekundy. V síti TT je to 0,2 sekundy.',
    normReference: 'ČSN 33 2000-4-41 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q2-5',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Jaká je mezní hodnota trvalého dotykového napětí UL pro střídavý proud v běžných (normálních) prostorách dle ČSN 33 2000-4-41 ed. 3?',
    options: [
      { id: 'a', text: '12 V AC' },
      { id: 'b', text: '25 V AC' },
      { id: 'c', text: '50 V AC' },
      { id: 'd', text: '120 V AC' }
    ],
    correctOptionId: 'c',
    explanation: 'V normálních prostorech (suché místnosti, byty) je bezpečná mez dotykového napětí 50 V AC (120 V DC). V prostorech nebezpečných (vlhko, staveniště) je to 25 V AC a ve zvlášť nebezpečných (bazény) 12 V AC.',
    normReference: 'ČSN 33 2000-4-41 ed. 3',
    difficulty: 'normal'
  },
  {
    id: 'q2-6',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Na jakém fyzikálním principu pracuje proudový chránič (RCD)?',
    options: [
      { id: 'a', text: 'Na oteplení bimetalového pásku protékajícím proudem' },
      { id: 'b', text: 'Na vyhodnocení magnetického toku součtového transformátoru proudu (1. Kirchhoffův zákon)' },
      { id: 'c', text: 'Na měření úbytku napětí na ochranném vodiči' },
      { id: 'd', text: 'Na principu vysokofrekvenčního filtru' }
    ],
    correctOptionId: 'b',
    explanation: 'Proudový chránič obsahuje součtový transformátor proudu. V bezporuchovém stavu se proud vtékající fázemi rovná proudu vytékajícímu nulovým vodičem (součet proudů je nula). Při poruše uniká proud do země/PE, vznikne reziduální magnetický tok v jádře a chránič vybaví.',
    normReference: 'ČSN EN 61008-1',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q2-7',
    chapterId: 2,
    competencyCode: '26-017-H/02',
    question: 'Jaký je rozdíl mezi prací pod dozorem a prací pod dohledem dle legislativy BOZP?',
    options: [
      { id: 'a', text: 'Mezi těmito pojmy není žádný právní rozdíl.' },
      { id: 'b', text: 'Při práci pod dohledem se vedoucí občas přesvědčí o dodržování předpisů, zatímco při práci pod dozorem je dozorující osoba trvale přítomna na pracovišti.' },
      { id: 'c', text: 'Při práci pod dozorem pracovník pracuje sám po telefonu.' },
      { id: 'd', text: 'Práce pod dozorem se vztahuje pouze na studenty do 15 let.' }
    ],
    correctOptionId: 'b',
    explanation: 'Práce pod dozorem vyžaduje trvalou fyzickou přítomnost dozorující osoby, která nesmí pracoviště opustit a nesmí provádět jinou činnost. Práce pod dohledem vyžaduje občasnou kontrolu a seznámení s riziky.',
    normReference: 'ČSN EN 50110-1 ed. 3',
    difficulty: 'hard',
    practicalExamRelevant: true
  },

  // --- KAPITOLA 3: Dimenzování, jištění a kladení vedení ---
  {
    id: 'q3-1',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'Jaký je vztah mezi návrhovým proudem IB, jmenovitým proudem jističe In a dovoleným proudem kabelu Iz dle ČSN 33 2000-5-52?',
    options: [
      { id: 'a', text: 'Iz ≤ In ≤ IB' },
      { id: 'b', text: 'IB ≤ In ≤ Iz' },
      { id: 'c', text: 'In ≤ IB ≤ Iz' },
      { id: 'd', text: 'IB = In = Iz' }
    ],
    correctOptionId: 'b',
    explanation: 'Základní podmínka zní IB ≤ In ≤ Iz: Proud zátěže (IB) musí být menší nebo roven jmenovitému proudu jističe (In), a jistič musí být menší nebo roven maximálnímu dovolenému proudu kabelu (Iz).',
    normReference: 'ČSN 33 2000-5-52',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q3-2',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'Jaký je násobek jmenovitého proudu In pro okamžité elektromagnetické vypnutí jističe s charakteristikou B dle ČSN EN 60898-1?',
    options: [
      { id: 'a', text: '1,13 až 1,45 × In' },
      { id: 'b', text: '3 až 5 × In' },
      { id: 'c', text: '5 až 10 × In' },
      { id: 'd', text: '10 až 20 × In' }
    ],
    correctOptionId: 'b',
    explanation: 'Charakteristika B má zkratovou elektromagnetickou spoušť nastavenou na 3 až 5 × In. Charakteristika C má 5 až 10 × In a charakteristika D má 10 až 20 × In.',
    normReference: 'ČSN EN 60898-1',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q3-3',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'Jaký je maximální povolený úbytek napětí od přípojkové skříně ke svítidlům v bytové instalaci dle ČSN 33 2130 ed. 3?',
    options: [
      { id: 'a', text: '1 %' },
      { id: 'b', text: '2 %' },
      { id: 'c', text: '3 %' },
      { id: 'd', text: '5 %' }
    ],
    correctOptionId: 'b',
    explanation: 'Dle ČSN 33 2130 ed. 3 je maximální úbytek napětí pro světelné obvody 2 % (pro ostatní obvody, např. zásuvky, je to 3 %).',
    normReference: 'ČSN 33 2130 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q3-4',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'Kde v objektu se instaluje svodič bleskových proudů SPD Typ 1 (T1)?',
    options: [
      { id: 'a', text: 'Přímo do prodlužovacího přívodu u televize' },
      { id: 'b', text: 'V podružné rozvodnici v podkroví' },
      { id: 'c', text: 'Na vstupu napájecího vedení do budovy v hlavním rozvaděči' },
      { id: 'd', text: 'Pouze na střeše u hromosvodové jímací tyče' }
    ],
    correctOptionId: 'c',
    explanation: 'Svodič bleskového proudu Typ 1 (zkušební vlna 10/350 µs) se umisťuje na vstupu vedení do budovy (hlavní rozvaděč HR), aby zachytil energii blesku hned při vstupu.',
    normReference: 'ČSN EN 62305, ČSN 33 2000-5-534',
    difficulty: 'normal'
  },
  {
    id: 'q3-5',
    chapterId: 3,
    competencyCode: '26-017-H/03',
    question: 'V jaké výšce nad dokončenou podlahou se nachází horní vodorovná instalační zóna ve stěně místnosti dle ČSN 33 2130 ed. 3?',
    options: [
      { id: 'a', text: '0 až 100 mm pod stropem' },
      { id: 'b', text: '150 až 450 mm pod dokončeným stropem' },
      { id: 'c', text: 'Přesně 1 metr nad podlahou' },
      { id: 'd', text: 'Kdekoliv dle libosti montéra' }
    ],
    correctOptionId: 'b',
    explanation: 'Horní vodorovná instalační zóna je vymezena šířkou 300 mm ve vzdálenosti 150 až 450 mm pod dokončeným stropem.',
    normReference: 'ČSN 33 2130 ed. 3',
    difficulty: 'normal'
  },

  // --- KAPITOLA 4: Dokumentace a značky ---
  {
    id: 'q4-1',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Jakou schématickou značkou se na elektrotechnických výkresech označuje schodišťový přepínač (řazení 6)?',
    options: [
      { id: 'a', text: 'Kolečko s jednou čárkou a jedním háčkem' },
      { id: 'b', text: 'Kolečko s čárkou mající háčky na obou koncích v opačném směru' },
      { id: 'c', text: 'Kolečko se dvěma překříženými čárkami' },
      { id: 'd', text: 'Kolečko s písmenem T uvnitř' }
    ],
    correctOptionId: 'b',
    explanation: 'Spínač řazení 6 (střídavý) má na schématu značku kruhu s linkou s háčky na obou koncích. Spínač řazení 1 má jeden háček, řazení 5 dva háčky stejným směrem, řazení 7 dvě překřížené linky.',
    normReference: 'ČSN EN 60617',
    difficulty: 'normal'
  },
  {
    id: 'q4-2',
    chapterId: 4,
    competencyCode: '26-017-H/04',
    question: 'Které písmenné označení dle norem ČSN EN 81346-2 přísluší jističům a jistícím přístrojům?',
    options: [
      { id: 'a', text: 'R' },
      { id: 'b', text: 'F nebo Q (např. FA, QF)' },
      { id: 'c', text: 'M' },
      { id: 'd', text: 'T' }
    ],
    correctOptionId: 'b',
    explanation: 'Písmeno F označuje ochranná jistící zařízení (pojistka, jistič FA), písmeno Q označuje výkonové spínací přístroje (vypínač QM, jistič/jističochránič QF).',
    normReference: 'ČSN EN 81346-2',
    difficulty: 'normal'
  },

  // --- KAPITOLA 5: Nářadí a měřidla ---
  {
    id: 'q5-1',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'Jaké zkušební napětí a jaký minimální izolační odpor předepisuje norma ČSN 33 2000-6 ed. 2 pro běžnou domovní instalaci 230/400 V?',
    options: [
      { id: 'a', text: '100 V DC a min. 0,1 MΩ' },
      { id: 'b', text: '250 V DC a min. 0,5 MΩ' },
      { id: 'c', text: '500 V DC a min. 1,0 MΩ' },
      { id: 'd', text: '1000 V AC a min. 5,0 MΩ' }
    ],
    correctOptionId: 'c',
    explanation: 'Pro instalace se jmenovitým napětím do 500 V (včetně 230/400 V) se izolační odpor měří stejnosměrným napětím 500 V DC a naměřený odpor musí být alespoň 1,0 MΩ.',
    normReference: 'ČSN 33 2000-6 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q5-2',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'Jaká je maximální teoretická impedance poruchové smyčky Zs pro jistič B16 v síti 230 V (před započtením bezpečnostního koeficientu oteplení)?',
    options: [
      { id: 'a', text: '1,44 Ω' },
      { id: 'b', text: '2,875 Ω' },
      { id: 'c', text: '4,60 Ω' },
      { id: 'd', text: '7,25 Ω' }
    ],
    correctOptionId: 'b',
    explanation: 'Pro jistič B16 je proud Ia = 5 * In = 5 * 16 A = 80 A. Maximální impedance smyčky Zs = U0 / Ia = 230 V / 80 A = 2,875 Ω.',
    normReference: 'ČSN 33 2000-4-41 ed. 3',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q5-3',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'V jakém rozmezí reziduálního proudu musí vybavit běžný proudový chránič s jmenovitou hodnotou IΔn = 30 mA při revizní zkoušce?',
    options: [
      { id: 'a', text: 'Mezi 5 mA až 10 mA' },
      { id: 'b', text: 'Mezi 15 mA až 30 mA (0,5 až 1,0 × IΔn)' },
      { id: 'c', text: 'Přesně na 30 mA s tolerancí 0 %' },
      { id: 'd', text: 'Mezi 30 mA až 45 mA' }
    ],
    correctOptionId: 'b',
    explanation: 'Chránič nesmí vybavit při proudu do 0,5 × IΔn (tj. do 15 mA) a musí bezpečně vybavit nejpozději při dosažení 1,0 × IΔn (tj. do 30 mA). Typicky vypíná okolo 21-24 mA.',
    normReference: 'ČSN EN 61008-1, ČSN 33 2000-6 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q5-4',
    chapterId: 5,
    competencyCode: '26-017-H/05',
    question: 'Jaké označení a symbol musí mít ruční nářadí schválené pro práci pod napětím do 1000 V dle ČSN EN 60900?',
    options: [
      { id: 'a', text: 'Červené plastové rukojeti bez nápisů' },
      { id: 'b', text: 'Označení symbolem dvou překrývajících se trojúhelníků, nápisem 1000 V a normou ČSN EN 60900' },
      { id: 'c', text: 'Symbol blesku v kroužku' },
      { id: 'd', text: 'Jakékoliv nářadí s pogumovanou rukojetí' }
    ],
    correctOptionId: 'b',
    explanation: 'Certifikované elektrikářské nářadí do 1000 V musí nést mezinárodní značku dvou propojených trojúhelníků, hodnotu 1000 V a odkaz na normu ČSN EN 60900.',
    normReference: 'ČSN EN 60900',
    difficulty: 'normal',
    practicalExamRelevant: true
  },

  // --- KAPITOLA 6: Montáže a zapojování ---
  {
    id: 'q6-1',
    chapterId: 6,
    competencyCode: '26-017-H/06',
    question: 'Kolik zásuvkových vývodů lze maximálně zapojit na jeden zásuvkový obvod 230 V jištěný 16 A dle ČSN 33 2130 ed. 3?',
    options: [
      { id: 'a', text: 'Maximálně 5' },
      { id: 'b', text: 'Maximálně 10 (přičemž vícenásobná zásuvka se počítá jako jeden vývod)' },
      { id: 'c', text: 'Maximálně 16' },
      { id: 'd', text: 'Počet není nijak omezen' }
    ],
    correctOptionId: 'b',
    explanation: 'Dle ČSN 33 2130 ed. 3 smí být na jeden 16A zásuvkový obvod připojeno nejvýše 10 zásuvkových vývodů. Dvojzásuvka na jedné přístrojové krabici se počítá jako jeden vývod.',
    normReference: 'ČSN 33 2130 ed. 3',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q6-2',
    chapterId: 6,
    competencyCode: '26-017-H/06',
    question: 'Jaké spínače a v jakém uspořádání použijeme pro ovládání svítidla ze čtyř nezávislých míst na chodbě?',
    options: [
      { id: 'a', text: 'Čtyři spínače řazení 6' },
      { id: 'b', text: 'Dva spínače řazení 6 na koncích a dva spínače řazení 7 mezi nimi (6 - 7 - 7 - 6)' },
      { id: 'c', text: 'Čtyři spínače řazení 1 za sebou' },
      { id: 'd', text: 'Dva spínače řazení 5 a dva spínače řazení 1' }
    ],
    correctOptionId: 'b',
    explanation: 'Pro ovládání ze 3 a více míst se na koncích trasy použijí střídavé přepínače č. 6 a mezi ně se vloží potřebný počet křížových spínačů č. 7 (zde 2 kusy č. 7).',
    normReference: 'Montážní zásady',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q6-3',
    chapterId: 6,
    competencyCode: '26-017-H/06',
    question: 'Smí se v koupelně v zóně 1 (přímo nad vanou do výšky 2,25 m) instalovat běžná zásuvka na 230 V?',
    options: [
      { id: 'a', text: 'Ano, pokud má krytí IP 44' },
      { id: 'b', text: 'Ano, pokud je chráněna chráničem 30 mA' },
      { id: 'c', text: 'Ne, v zóně 1 jsou zásuvky na 230 V přísně zakázány (lze umístit pouze zařízení SELV do 25 V AC nebo pevně připojený bojler/ventilátor)' },
      { id: 'd', text: 'Ano, bez omezení' }
    ],
    correctOptionId: 'c',
    explanation: 'V zóně 1 koupelny nesmí být instalovány žádné spínače ani zásuvky na 230 V. Zásuvky jsou povoleny až mimo zónu 2 (více než 60 cm od hrany vany/sprchy) a musí být chráněny RCD 30 mA.',
    normReference: 'ČSN 33 2000-7-701 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q6-4',
    chapterId: 6,
    competencyCode: '26-017-H/06',
    question: 'Jak musí být v domovní rozvodnici uspořádány nulové vodiče N pro obvody chráněné různými proudovými chrániči?',
    options: [
      { id: 'a', text: 'Všechny se připojí na jednu velkou společnou modrou N svorkovnici.' },
      { id: 'b', text: 'Každý proudový chránič musí mít svou vlastní, samostatnou a izolovanou svorkovnici N, která nesmí být spojena s jiným chráničem ani s PE.' },
      { id: 'c', text: 'Nulové vodiče se propojí přímo se zeleněžlutou svorkovnicí PE.' },
      { id: 'd', text: 'U nových rozvaděčů se nulové vodiče nezapojují.' }
    ],
    correctOptionId: 'b',
    explanation: 'Každý proudový chránič sleduje rovnováhu proudů ve své fázové a nulové větvi. Pokud by se za dvěma chrániči spojily nulové vodiče, došlo by k rozdělení proudu a oba chrániče by okamžitě vybavovaly.',
    normReference: 'ČSN 33 2000-5-53 ed. 2',
    difficulty: 'normal',
    practicalExamRelevant: true
  },

  // --- KAPITOLA 7: Diagnostika poruch ---
  {
    id: 'q7-1',
    chapterId: 7,
    competencyCode: '26-017-H/07',
    question: 'Proudový chránič v rozvaděči padá, i když jsou všechny jističe jednotlivých okruhů shozené v poloze VYPNUTO. Kde je nejpravděpodobnější příčina poruchy?',
    options: [
      { id: 'a', text: 'Zkrat mezi fázemi L1 a L2 na vstupu jističů' },
      { id: 'b', text: 'Svod nebo náhodné spojení mezi nulovým vodičem N a ochranným vodičem PE v některém koncovém obvodu' },
      { id: 'c', text: 'Vadná žárovka v lustru' },
      { id: 'd', text: 'Spálená pojistka před elektroměrem' }
    ],
    correctOptionId: 'b',
    explanation: 'Jednopólové jističe odpojují pouze fázový vodič L, ale nulové vodiče N zůstávají trvale připojeny na N můstku chrániče. Pokud se kdekoliv v instalaci dotkne N vodič ochranného PE (nebo je vlhkost mezi N a PE), chránič okamžitě vybaví!',
    normReference: 'Metodika hledání závad',
    difficulty: 'hard',
    practicalExamRelevant: true
  },
  {
    id: 'q7-2',
    chapterId: 7,
    competencyCode: '26-017-H/07',
    question: 'Při měření zkoušečkou v zásuvce naměříte mezi L a PE napětí 230 V, ale mezi L a N naměříte 0 V. Jaká je závada?',
    options: [
      { id: 'a', text: 'Je přerušen ochranný vodič PE.' },
      { id: 'b', text: 'Je přerušen nulový pracovní vodič N.' },
      { id: 'c', text: 'Je spálený jistič fázového vodiče.' },
      { id: 'd', text: 'Zásuvka je v naprostém pořádku.' }
    ],
    correctOptionId: 'b',
    explanation: 'Pokud proti PE naměříme 230 V, fáze L je v pořádku a PE je uzemněn. Nulové napětí mezi L a N jednoznačně dokazuje, že do zásuvky nedorazil nulový vodič N (přerušený spoj nebo uvolněná svorka N).',
    normReference: 'Diagnostika elektroinstalací',
    difficulty: 'normal',
    practicalExamRelevant: true
  },

  // --- KAPITOLA 8: První pomoc ---
  {
    id: 'q8-1',
    chapterId: 8,
    competencyCode: '26-017-H/08',
    question: 'Kolega na pracovišti leží v bezvědomí a rukou křečovitě svírá živý kabel pod napětím 230 V. Co musíte udělat jako ÚPLNĚ PRVNÍ krok?',
    options: [
      { id: 'a', text: 'Holýma rukama ho chytit za oděv a odtáhnout' },
      { id: 'b', text: 'Okamžitě vypnout přívod elektrického proudu (vypínač, jistič, vytáhnout vidlici) nebo odsunout vodič suchým nevodivým předmětem' },
      { id: 'c', text: 'Ihned začít s masáží srdce přímo na kabelu' },
      { id: 'd', text: 'Polit postiženého vodou pro probrání z šoku' }
    ],
    correctOptionId: 'b',
    explanation: 'Základní pravidlo první pomoci zní: Vlastní bezpečnost zachránce! Dokud je postižený ve styku s proudem, nesmíme se ho dotknout. Nejprve přerušíme proud (vypnout jistič) nebo použijeme suchý nevodivý předmět.',
    normReference: 'Zásady první pomoci',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q8-2',
    chapterId: 8,
    competencyCode: '26-017-H/08',
    question: 'Jaký je správný poměr stlačení hrudníku a umělých vdechů při kardiopulmonální resuscitaci (KPR) dospělého člověka?',
    options: [
      { id: 'a', text: '15 stlačení : 2 vdechy' },
      { id: 'b', text: '30 stlačení : 2 vdechy s frekvencí 100 až 120 stlačení za minutu' },
      { id: 'c', text: '50 stlačení : 5 vdechů' },
      { id: 'd', text: 'Pouze dýchání bez mačkání hrudníku' }
    ],
    correctOptionId: 'b',
    explanation: 'Dle mezinárodních doporučení ERC je poměr KPR pro dospělé 30 stlačení ku 2 vdechům. Hloubka stlačení je 5 až 6 cm, tempo 100 až 120 za minutu.',
    normReference: 'Doporučení ERC pro resuscitaci',
    difficulty: 'normal',
    practicalExamRelevant: true
  },
  {
    id: 'q8-3',
    chapterId: 8,
    competencyCode: '26-017-H/08',
    question: 'Jaké telefonní číslo má Zdravotnická záchranná služba v ČR?',
    options: [
      { id: 'a', text: '150' },
      { id: 'b', text: '155' },
      { id: 'c', text: '158' },
      { id: 'd', text: '156' }
    ],
    correctOptionId: 'b',
    explanation: 'Zdravotnická záchranná služba je 155. Hasiči jsou 150, Policie ČR 158, Městská policie 156, Jednotné evropské číslo tísňového volání 112.',
    normReference: 'Integrovaný záchranný systém ČR',
    difficulty: 'normal'
  }
];
