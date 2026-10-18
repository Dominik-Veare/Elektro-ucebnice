import { Flashcard } from '../types';

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    chapterId: 2,
    category: 'bezpečnost',
    front: 'Jak zní 5 bezpečnostních pravidel pro zajištění beznapěťového stavu?',
    back: `1. Úplně odpojit (všechny póly/fáze, zkontrolovat zpětné napájení)
2. Zajistit proti opětovnému zapnutí (zámek LOTO + tabulka „Nezapínej! Na zařízení se pracuje!“)
3. Ověřit beznapěťový stav (dvoupólovou zkoušečkou ověřenou před i po měření!)
4. Uzemnit a zkratovat (u VN povinné, u NN při riziku indukce; nejprve zemnit, pak k fázím!)
5. Ohradit nebo zakrýt živé části v okolí`,
    examNote: 'Zkoušející vyžaduje přesné pořadí a zdůraznění testu zkoušečky před i po měření!'
  },
  {
    id: 'fc-2',
    chapterId: 2,
    category: 'normy',
    front: 'Jaké jsou maximální dovolené vypínací časy v sítích TN a TT při 230 V (ČSN 33 2000-4-41 ed. 3)?',
    back: `• Síť TN: max. 0,4 sekundy (pro koncové obvody do 32 A při 230 V)
• Síť TT: max. 0,2 sekundy (pro koncové obvody do 32 A při 230 V)
• Pro distribuční obvody: max. 5 sekund v TN, max. 1 sekunda v TT.`,
    examNote: 'Často se ptají na rozdíl mezi TN (0,4 s) a TT (0,2 s).'
  },
  {
    id: 'fc-3',
    chapterId: 2,
    category: 'normy',
    front: 'Jaké jsou bezpečné meze trvalého dotykového napětí UL pro střídavý proud (AC)?',
    back: `• Normální prostory (suché místnosti, byty): 50 V AC (120 V DC)
• Nebezpečné prostory (vlhko, staveniště, venku): 25 V AC (60 V DC)
• Zvlášť nebezpečné prostory (bazény, mokro): 12 V AC (25 V DC)`,
    examNote: 'Pozor na jednotky – střídavé (AC) je poloviční oproti stejnosměrnému (DC).'
  },
  {
    id: 'fc-4',
    chapterId: 5,
    category: 'měření',
    front: 'Jaké je zkušební napětí a minimální izolační odpor pro instalaci 230/400 V (ČSN 33 2000-6 ed. 2)?',
    back: `• Zkušební napětí: 500 V DC (stejnosměrné)
• Minimální izolační odpor Riso: ≥ 1,0 MΩ (jeden megaohm)
• Pro SELV/PELV: 250 V DC a ≥ 0,5 MΩ
• POZOR: Měří se bez napětí s odpojenou citlivou elektronikou a přepěťovkami!`,
    examNote: 'Nezapomeň uvést, že se měří mezi všemi pracovními vodiči a PE (L-PE, N-PE) i navzájem (L-N).'
  },
  {
    id: 'fc-5',
    chapterId: 5,
    category: 'měření',
    front: 'Jak zní podmínka samočinného odpojení pro impedanci smyčky Zs a jaký proud Ia platí pro jističe B, C, D?',
    back: `Vzorec: Zs · Ia ≤ U0  =>  Zs ≤ U0 / Ia  (kde U0 = 230 V)

Vypínací proudy zkratové spouště Ia:
• Jistič char. B: Ia = 5 · In  (např. B16: Ia = 80 A => Zs,max = 2,875 Ω)
• Jistič char. C: Ia = 10 · In  (např. C16: Ia = 160 A => Zs,max = 1,437 Ω)
• Jistič char. D: Ia = 20 · In  (např. D16: Ia = 320 A => Zs,max = 0,718 Ω)

Při měření za studena se hodnota násobí 2/3 (resp. dělí 1,5 z důvodu oteplení).`,
    examNote: 'U praktické zkoušky dostaneš naměřenou hodnotu a musíš okamžitě říci, zda vyhovuje.'
  },
  {
    id: 'fc-6',
    chapterId: 5,
    category: 'měření',
    front: 'Jaké parametry se ověřují při revizním měření proudového chrániče (RCD 30 mA)?',
    back: `1. Vypínací reziduální proud (IΔ):
   • Musí být v rozmezí 0,5 až 1,0 × IΔn (tj. 15 mA až 30 mA).
2. Vypínací čas (ta):
   • Při 1× IΔn: ta < 300 ms (běžně cca 20-30 ms).
   • Při 5× IΔn: ta < 40 ms.
3. Dotykové napětí UB na ochranném vodiči při testu: nesmí překročit 50 V.
4. Mechanická funkce tlačítka TEST (T).`,
    examNote: 'Pokud chránič vypne pod 15 mA, je vadný (příliš citlivý).'
  },
  {
    id: 'fc-7',
    chapterId: 6,
    category: 'zapojení',
    front: 'Jaké je správné zapojení světelného obvodu ovládaného ze 3 a více míst?',
    back: `• Na obou koncích trasy: spínač řazení 6 (střídavý).
• Mezi nimi: spínače řazení 7 (křížové) – libovolný počet.
• Řazení: 6 -> 7 -> 7 -> ... -> 6
• Fáze L vstupuje do prvního spínače 6 na svorku L.
• Dva korespondenční vodiče prochází přes křížové spínače 7.
• Ze svorky L posledního spínače 6 odchází spínaná fáze do svítidla.
• Nulák N a PE jdou přímo do svítidla (fáze se nikdy nespíná v nuláku!).`,
    examNote: 'Častý praktický úkol na zkušebním montážním panelu.'
  },
  {
    id: 'fc-8',
    chapterId: 6,
    category: 'normy',
    front: 'Jaké jsou zóny v koupelně a kde smí být umístěna zásuvka 230 V (ČSN 33 2000-7-701)?',
    back: `• Zóna 0: vnitřek vany / sprchy (pouze SELV do 12 V AC, krytí IPX7).
• Zóna 1: prostor nad vanou do výšky 2,25 m (pouze bojler, ventilátor, SELV 25 V, krytí IPX4).
• Zóna 2: 0,6 m vodorovně kolem vany/sprchy do výšky 2,25 m (svítidla třídy II, krytí IPX4).
• Běžná zásuvka 230 V: smí být VÝHRADNĚ MIMO ZÓNY (více než 60 cm od hrany zóny 1) a MUSÍ být chráněna proudovým chráničem 30 mA!`,
    examNote: 'Zkoušející se ptá na přesnou vzdálenost od vany (60 cm).'
  },
  {
    id: 'fc-9',
    chapterId: 8,
    category: 'první-pomoc',
    front: 'Jaký je postup první pomoci a KPR při zástavě oběhu po zásahu el. proudem?',
    back: `1. Bezpečné vyproštění: vypnout jistič / odsunout vodič suchým dřevem (nesahat holýma rukama!).
2. Zjistit vědomí: hlasitě oslovit, zatřást rameny.
3. Zprůchodnit dýchací cesty: záklon hlavy + zvednutí brady.
4. Zkontrolovat dech (10 s pohledem a poslechem).
5. Nedýchá: volat linku 155 (hlasitý odposlech) + zahájit KPR.
6. KPR: 30 stlačení hrudníku (hloubka 5-6 cm, tempo 100-120/min) : 2 vdechy.
7. Pokud je k dispozici AED, okamžitě nalepit elektrody a řídit se pokyny!`,
    examNote: 'U zkoušky nesmíš zapomenout zmínit vlastní bezpečnost zachránce!'
  },
  {
    id: 'fc-10',
    chapterId: 3,
    category: 'výpočty',
    front: 'Jak se počítá jmenovitý proud zátěže pro 1f a 3f spotřebič?',
    back: `• Jednofázový spotřebič (230 V):
  I = P / (U · cos φ)  =>  pro čistě odporový přímotop: I = P / 230

• Třífázový symetrický spotřebič (400 V):
  I = P / (√3 · U · cos φ) = P / (1,732 · 400 · cos φ)

Příklad: 3 kW bojler 230 V: I = 3000 / 230 = 13,04 A => jistič B16, kabel CYKY 3x2,5.`,
    examNote: 'Zkoušející ti dá kalkulačku a papír a zadá přímotop nebo varnou desku.'
  }
];
