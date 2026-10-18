import { Flashcard } from '../types';

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    chapterId: 2,
    category: 'bezpečnost',
    front: 'Jak zní 5 bezpečnostních pravidel pro zajištění beznapěťového stavu (v přesném pořadí)?',
    back: `1. Úplně odpojit (všechny póly/fáze ze všech stran, pozor na zpětné napájení z FVE či UPS)
2. Zajistit proti opětovnému zapnutí (zámek LOTO + výstražná tabulka „Nezapínej! Na zařízení se pracuje!“)
3. Ověřit beznapěťový stav (dvoupólovou zkoušečkou ověřenou PŘED i PO měření na známém napětí!)
4. Uzemnit a zkratovat (u VN vždy, u NN při riziku indukce či zavlečení napětí; NEJPRVE připojit k zemi, teprve pak k fázím!)
5. Ohradit nebo zakrýt živé části v okolí`,
    examNote: 'Zkoušející vyžaduje naprosto přesné pořadí a zdůraznění kontroly zkoušečky před i po měření!'
  },
  {
    id: 'fc-2',
    chapterId: 2,
    category: 'bezpečnost',
    front: 'Jaký je rozdíl mezi obsluhou a prací na el. zařízení a mezi prací pod dohledem a pod dozorem (Kritérium NSK 2a)?',
    back: `• Obsluha: úkony běžného provozu bez zásahu do živých částí (spínání vypínačů/jističů, výměna žárovek a závitových pojistek, odečet měřidel).
• Práce na el. zařízení: montáž, demontáž, opravy, údržba, revize a měření s odstraňováním krytů.
• Práce podle pokynů: pracovník obdrží pokyny a pracuje sám na vlastní odpovědnost.
• Práce pod dohledem: osoba odpovědná za dohled pracovníka poučí a OBČAS (průběžně) jej kontroluje; za dodržení předpisů odpovídá pracující.
• Práce pod dozorem: osoba pověřená dozorem je TRVALE FYZICKY PŘÍTOMNA na pracovišti, sleduje pracovníka, nesmí dělat jinou práci a odpovídá za bezpečnost!`,
    examNote: 'Na rozdíl mezi dohledem (občasná kontrola) a dozorem (trvalá přítomnost) se ptají u každé ústní zkoušky!'
  },
  {
    id: 'fc-3',
    chapterId: 2,
    category: 'bezpečnost',
    front: 'Jaké stupně odborné způsobilosti stanovuje Nařízení vlády č. 194/2022 Sb. (k zákonu č. 250/2021 Sb.)?',
    back: `NV č. 194/2022 Sb. (nahradilo vyhlášku 50/1978 Sb. od 1. 7. 2022) stanovuje tyto stupně:
• § 4 – Osoba poučená (proškolena, smí obsluhovat NN, pracovat bez napětí pod dohledem a v blízkosti pod dozorem).
• § 6 – Elektrotechnik (má elektro vzdělání nebo profesní kvalifikaci NSK 26-017-H + zkoušku; smí pracovat samostatně).
• § 7 – Vedoucí elektrotechnik (praxe min. 2 roky pro SŠ/NSK nebo 1 rok pro VŠ; smí řídit práce, provoz a projektovat).
• § 8 – Revizní technik (osvědčení od TIČR).
• Přezkoušení (§ 6, § 7) se provádí nejméně jednou za 3 roky!`,
    examNote: 'Nikdy neříkej staré paragrafy z vyhlášky 50 (§ 5 nebo § 9)! Dnes platí § 4, § 6, § 7 a § 8.'
  },
  {
    id: 'fc-4',
    chapterId: 2,
    category: 'bezpečnost',
    front: 'Co je práce bez napětí, v blízkosti živých částí a práce pod napětím (PPN) dle ČSN EN 50110-1 ed. 3?',
    back: `• Práce bez napětí: zařízení je odpojeno a zajištěno dle 5 bezpečnostních pravidel.
• Práce v blízkosti živých částí: pracovník vstupuje tělem nebo nářadím do ZÓNY PŘIBLÍŽENÍ DV (u nízkého napětí do 1000 V je DV = 300 mm od živé části!), aniž by se jí dotkl.
• Práce pod napětím (PPN): pracovník se dotýká živých částí nebo zasahuje do zóny práce pod napětím DL (vyžaduje izolované nářadí 1000 V dle ČSN EN 60900 a OOPP).`,
    examNote: 'Zapamatuj si vzdálenost zóny přiblížení u nízkého napětí: 300 mm (30 cm) od nekryté živé části.'
  },
  {
    id: 'fc-5',
    chapterId: 2,
    category: 'normy',
    front: 'Vyjmenuj prostředky ochrany PŘI PORUŠE a vysvětli jejich funkci (Kritérium NSK 2c, ČSN 33 2000-4-41 ed. 3).',
    back: `Prostředky ochrany při poruše chrání před úrazem při selhání základní izolace:
1. Automatické odpojení od zdroje (spojení koster s PE + vypnutí jističem/chráničem v předepsaném čase).
2. Přídavná nebo zesílená izolace (zařízení třídy ochrany II – dva soustředné čtverečky, nesmí se spojit s PE).
3. Ochranné pospojování (vyrovnání potenciálů neživých a cizích vodivých částí).
4. Ochranné stínění (vodivý kryt/stínění spojené s PE, které zachytí poruchový proud).
5. Jednoduché elektrické oddělení (oddělovací transformátor 1:1 s neuzemněným sekundárem pro 1 spotřebič).
6. Nevodivé okolí (izolační stěny a podlahy > 50 kΩ, bez vodiče PE, pouze pro znalé osoby).`,
    examNote: 'Zkoušející vyžaduje kombinaci: Základní ochrana (izolace, kryt IP2X/IP4X) + Ochrana při poruše + Doplňková ochrana (RCD 30 mA).'
  },
  {
    id: 'fc-6',
    chapterId: 2,
    category: 'normy',
    front: 'Jaké jsou maximální dovolené vypínací časy v sítích TN a TT při 230 V (ČSN 33 2000-4-41 ed. 3)?',
    back: `• Síť TN: max. 0,4 sekundy (pro koncové obvody do 63 A / zásuvky do 32 A při U0 = 230 V AC)
• Síť TT: max. 0,2 sekundy (pro koncové obvody do 63 A při U0 = 230 V AC)
• Pro distribuční obvody a obvody nad 63 A: max. 5 sekund v síti TN, max. 1 sekunda v síti TT.`,
    examNote: 'Často se ptají na důvod, proč je v TT kratší čas (0,2 s) a používá se chránič: kvůli vyššímu odporu místního zemniče.'
  },
  {
    id: 'fc-7',
    chapterId: 2,
    category: 'normy',
    front: 'Jaké jsou bezpečné meze trvalého dotykového napětí UL pro střídavý (AC) a stejnosměrný (DC) proud?',
    back: `• Normální prostory (suché místnosti, byty): 50 V AC / 120 V DC
• Nebezpečné prostory (vlhko, venkovní prostory, staveniště): 25 V AC / 60 V DC
• Zvlášť nebezpečné prostory (mokro, bazény, vana zóna 0): 12 V AC / 25–30 V DC`,
    examNote: 'Pozor na rozdíl mezi střídavým (AC) a stejnosměrným (DC) napětím.'
  },
  {
    id: 'fc-8',
    chapterId: 1,
    category: 'normy',
    front: 'Vysvětli rozdělení sítí TN-C, TN-S, TN-C-S, TT, IT a malého napětí SELV, PELV, FELV (Kritérium NSK 1c).',
    back: `• 1. písmeno (uzel zdroje): T = uzemněný, I = izolovaný.
• 2. písmeno (kostra spotřebiče): T = vlastní zemnič, N = spojena s uzlem zdroje přes PE/PEN.
• TN-C: sloučený vodič PEN (min. 10 mm² Cu nebo 16 mm² Al; nesmí se nikdy jistit ani spínat!).
• TN-S: oddělený PE a N po celé délce (po rozdělení v TN-C-S se PE a N již nesmí nikde spojit!).
• SELV: bezpečné malé napětí, bezpečně oddělené od sítě a ZCELA NEUZEMNĚNÉ.
• PELV: bezpečně oddělené malé napětí, ale obvod nebo kostra JE UZEMNĚNA.
• FELV: funkční malé napětí BEZ bezpečného oddělení (vyžaduje ochranu jako 230 V).`,
    examNote: 'Při rozdělení PEN na PE a N v rozvaděči musí jít přívodní PEN vždy nejprve na svorkovnici PE!'
  },
  {
    id: 'fc-9',
    chapterId: 1,
    category: 'normy',
    front: 'Jaké je barevné a písmenné značení vodičů v soustavách AC a DC dle platné ČSN EN IEC 60445 (Kritérium NSK 1d)?',
    back: `• Ochranný vodič (PE): výhradně dvoubarevná ZELENO-ŽLUTÁ (zákaz přeznačování!).
• Střední / nulový vodič (N): MODRÁ (světle modrá) po celé délce.
• Vodič PEN: zeleno-žlutá po celé délce + modré označení na koncích.
• Fázové vodiče AC (L1, L2, L3): HNĚDÁ (L1), ČERNÁ (L2), ŠEDÁ (L3).
• Stejnosměrná soustava DC (L+, L−, M): kladný pól (+) ČERVENÁ, záporný pól (−) BÍLÁ (dříve modrá/šedá), střední vodič (M) MODRÁ.`,
    examNote: 'Kabel CYKY-J má zeleno-žlutou žílu; kabel CYKY-O nemá zeleno-žlutou žílu (obsahuje černou, hnědou a šedou).'
  },
  {
    id: 'fc-10',
    chapterId: 1,
    category: 'normy',
    front: 'Vysvětli strukturu IP kódu včetně významu 1. a 2. číslice a přídavných písmen A, B, C, D (Kritérium NSK 1e).',
    back: `• 1. číslice (0–6): ochrana před cizími tělesy a dotykem (0 nic, 1 >50 mm/dlaň, 2 >12,5 mm/prst, 3 >2,5 mm/nástroj, 4 >1 mm/drát, 5 prach částečně, 6 prachotěsné).
• 2. číslice (0–9): ochrana proti vodě (0 nic, 1 svislé kapky, 2 kapky 15°, 3 déšť 60°, 4 stříkající voda ze všech směrů, 5 tryskající voda, 7 dočasné ponoření, 8 trvalé ponoření, 9 parní tlakové čištění).
• Přídavná písmena (dotyk živých částí): A = hřbet ruky, B = prst (např. IP XXB v rozvaděči), C = nástroj, D = drát (IP XXD).
• Doplňková písmena: H (VN), M (pohyb při zkoušce vodou), S (klid), W (povětrnostní vlivy).`,
    examNote: 'Vnitřek rozvaděče přístupného laikům musí mít po otevření dvířek krytí minimálně IP2X nebo IPXXB!'
  },
  {
    id: 'fc-11',
    chapterId: 5,
    category: 'měření',
    front: 'V jakém přesném pořadí se provádějí revizní měření na nové elektroinstalaci dle ČSN 33 2000-6 ed. 2?',
    back: `I. Měření BEZ NAPĚTÍ (před připojením instalace k síti):
1. Vizuální prohlídka (barvy, průřezy, dotažení svorek, popisky).
2. Měření spojitosti ochranných vodičů PE a pospojování (napětí 4–24 V, proud ≥ 200 mA).
3. Měření izolačního odporu Riso (500 V DC, min. 1,0 MΩ).

II. Měření POD NAPĚTÍM (až když měření bez napětí vyhoví!):
4. Kontrola sledu fází (u 3f zásuvek).
5. Měření impedance poruchové smyčky Zs (L–PE).
6. Test vybavení proudových chráničů RCD (IΔ a čas ta) a funkční zkouška.`,
    examNote: 'U praktické zkoušky nikdy nezapínej jistič předtím, než změříš spojitost PE a izolační odpor Riso!'
  },
  {
    id: 'fc-12',
    chapterId: 5,
    category: 'měření',
    front: 'Jaké je zkušební napětí a minimální izolační odpor Riso dle ČSN 33 2000-6 ed. 2?',
    back: `• Běžné instalace 230/400 V (do 500 V) a FELV: zkušební napětí 500 V DC, izolační odpor Riso ≥ 1,0 MΩ.
• Obvody SELV a PELV (do 50 V): zkušební napětí 250 V DC, izolační odpor Riso ≥ 0,5 MΩ.
• Instalace nad 500 V do 1000 V: zkušební napětí 1000 V DC, Riso ≥ 1,0 MΩ.
• Měří se BEZ NAPĚTÍ mezi L–N, L–PE a N–PE při odpojených spotřebičích a svodičích přepětí SPD!`,
    examNote: 'Pokud nelze odpojit SPD nebo elektroniku, smí se použít napětí 250 V DC, ale odpor musí být stále ≥ 1,0 MΩ.'
  },
  {
    id: 'fc-13',
    chapterId: 5,
    category: 'měření',
    front: 'Jak zní podmínka samočinného odpojení pro impedanci smyčky Zs a jaké jsou limity pro jistič B16?',
    back: `Vzorec: Zs · Ia ≤ U0   ⇒   Zs,max = U0 / Ia   (kde U0 = 230 V)

Vypínací proudy zkratové spouště Ia:
• Jistič char. B: Ia = 5 · In   (pro B16: Ia = 80 A ⇒ teoretická Zs,max = 2,875 Ω)
• Jistič char. C: Ia = 10 · In  (pro C16: Ia = 160 A ⇒ teoretická Zs,max = 1,437 Ω)
• Jistič char. D: Ia = 20 · In  (pro D16: Ia = 320 A ⇒ teoretická Zs,max = 0,718 Ω)

Při měření za studena se dělí koeficientem oteplení 1,5 (násobí 2/3):
• Pro B16 je maximální naměřená hodnota za studena: 2,875 / 1,5 = 1,91 Ω!`,
    examNote: 'U praktické zkoušky dostaneš naměřenou hodnotu a musíš okamžitě říci teoretickou mez (2,87 Ω) i mez za studena (1,91 Ω).'
  },
  {
    id: 'fc-14',
    chapterId: 5,
    category: 'měření',
    front: 'Jaké parametry se ověřují při revizním měření proudového chrániče (RCD 30 mA)?',
    back: `1. Skutečný vybavovací reziduální proud (IΔ):
   • Musí vybavit v rozmezí 0,5 až 1,0 × IΔn (pro 30 mA chránič mezi 15 mA až 30 mA).
2. Vypínací čas (ta):
   • Při 1× IΔn (30 mA): ta < 300 ms (v praxi vybavuje za 15–30 ms).
   • Při 5× IΔn (150 mA): ta < 40 ms.
3. Dotykové napětí UB na ochranném vodiči PE při testu: nesmí překročit 50 V AC (resp. 25 V).
4. Mechanické ověření zkušebním tlačítkem TEST (T).`,
    examNote: 'Pokud chránič 30 mA vybaví už při 12 mA, je vadný (nadměrně citlivý) a musí se vyměnit!'
  },
  {
    id: 'fc-15',
    chapterId: 6,
    category: 'zapojení',
    front: 'Jaké je správné zapojení světelného obvodu ovládaného ze 2, 3 a více míst pomocí přepínačů (6 a 7) a pomocí impulzního relé?',
    back: `A) Klasické přepínače:
• Ze 2 míst: dva střídavé přepínače č. 6 (6 – 6) propojené 2 korespondenčními vodiči.
• Ze 3 a více míst: na koncích vždy č. 6, mezi nimi křížové přepínače č. 7 (6 – 7 – 6, příp. 6 – 7 – 7 – 6).

B) Impulzní (paměťové) relé v rozvaděči:
• Na stěnách jsou tlačítka (ovladače č. 1/0) zapojená PARALELNĚ (vedle sebe)!
• Stisk tlačítka pošle fázový impulz na cívku relé A1 (A2 je na N) a relé překlopí silový kontakt 1–2 spínající svítidlo.`,
    examNote: 'Fáze se vždy spíná v přívodu L a u žárovkové objímky jde na středový kontakt (N jde na závit)!'
  },
  {
    id: 'fc-16',
    chapterId: 6,
    category: 'zapojení',
    front: 'Jak se zapojuje přepěťová ochrana SPD v rozvaděči a jaké jsou typy T1, T2, T3 (Kritérium NSK 6b)?',
    back: `• SPD Typ 1 (T1): svodič bleskových proudů (jiskřiště, vlna 10/350 µs), instaluje se na vstupu do budovy v hlavním rozvaděči, vodič PE min. 16 mm² Cu.
• SPD Typ 2 (T2): svodič spínacího a indukovaného přepětí (varistor, vlna 8/20 µs), v podružných/bytových rozvaděčích, vodič PE min. 6 mm² Cu.
• SPD Typ 3 (T3): jemná ochrana citlivé elektroniky (do 5 m od spotřebiče).
• ZÁSADA MONTÁŽE: Celková délka připojovacích vodičů od fáze přes SPD na přípojnici PE (MET) nesmí překročit 0,5 m!`,
    examNote: 'Při montáži v rozvaděči nikdy nedělej na vodiči PE od přepěťovky smyčky – indukčnost dlouhého vodiče znehodnotí ochranu!'
  },
  {
    id: 'fc-17',
    chapterId: 6,
    category: 'normy',
    front: 'Jaké jsou zóny v koupelně a kde smí být umístěna zásuvka 230 V (ČSN 33 2000-7-701 ed. 2)?',
    back: `• Zóna 0: vnitřek vany / sprchové vaničky (pouze SELV do 12 V AC / 30 V DC, krytí min. IPX7).
• Zóna 1: prostor přímo nad vanou do výšky 2,25 m (pouze pevný bojler/ventilátor nebo SELV do 25 V AC, krytí min. IPX4).
• Zóna 2: 0,6 m (60 cm) vodorovně kolem vany do výšky 2,25 m (svítidla, žebřík, holicí jednotka s oddělovacím trafem; krytí min. IPX4; ZÁKAZ běžných zásuvek a spínačů 230 V!).
• Mimo zóny (> 60 cm od vany): zde smí být běžné zásuvky a spínače 230 V. VŠECHNY obvody v koupelně musí být chráněny proudovým chráničem IΔn ≤ 30 mA!`,
    examNote: 'U sprchy bez vaničky (walk-in) sahá zóna 1 do vzdálenosti 120 cm od sprchové hlavice a zóna 2 se neurčuje.'
  },
  {
    id: 'fc-18',
    chapterId: 8,
    category: 'první-pomoc',
    front: 'Vyjmenuj přímé a nepřímé účinky el. proudu a popiš postup první pomoci a KPR (Kritérium NSK 8a, 8b).',
    back: `• Přímé účinky (průchodem proudu tělem): tetanické křeče svalů (práh uvolnění 10–15 mA AC), komorová fibrilace srdce (> 50 mA AC), vnitřní a vnější elektrické popáleniny, elektrolýza krve (zejména u DC).
• Nepřímé účinky: pád z výšky/žebříku po leknutí, poškození zraku UV zářením oblouku (oftalmie).

Postup záchrany:
1. Vlastní bezpečnost a vyproštění: vypnout jistič/vypínač nebo odsunout vodič suchým nevodivým předmětem (u VN se nepřibližovat < 20 m, ustupovat snožmo!).
2. Zkontrolovat vědomí -> zaklonit hlavu a zvednout bradu -> 10 s kontrolovat dech.
3. Nedýchá normálně: volat 155 (hlasitý odposlech) a zahájit KPR 30 : 2 (střed hrudníku, hloubka 5–6 cm, frekvence 100–120/min) + použít AED.
4. Každý zasažený proudem musí k lékaři na EKG (riziko pozdní arytmie z elektrolýzy krve)!`,
    examNote: 'U zkoušky vždy jako první větu řekni: „Zajistím vlastní bezpečnost a vypnu přívod elektrického proudu!“'
  },
  {
    id: 'fc-19',
    chapterId: 3,
    category: 'výpočty',
    front: 'Jaký je kompletní postup návrhu dimenzování vedení a výpočtu úbytku napětí u zkoušky (Kritérium NSK 3a, 3b)?',
    back: `1. Výpočet návrhového proudu IB:
   • 1f obvod (230 V): IB = P / (230 · cos φ)
   • 3f obvod (400 V): IB = P / (√3 · 400 · cos φ) = P / (692,8 · cos φ)
2. Volba jističe In a průřezu S (podmínka IB ≤ In ≤ Iz):
   • Zvolíme nejbližší vyšší jistič In z řady (6, 10, 13, 16, 20, 25, 32 A) a průřez kabelu S podle uložení tak, aby zatížitelnost Iz ≥ In.
3. Kontrola úbytku napětí ΔU (pro Cu je γ = 56, pro Al je γ = 35):
   • 1f: ΔU = (2 · l · IB · cos φ) / (γ · S)   [V]  ⇒  ΔU% = (ΔU / 230) · 100
   • 3f: ΔU = (√3 · l · IB · cos φ) / (γ · S)  [V]  ⇒  ΔU% = (ΔU / 400) · 100
   • Limit: max. 2 % pro světla, max. 3 % pro zásuvky a ostatní obvody!`,
    examNote: 'Tento postup po tobě bude zkoušející chtít spočítat na papíře pro konkrétní zadaný spotřebič!'
  },
  {
    id: 'fc-20',
    chapterId: 7,
    category: 'měření',
    front: 'Jak podle měření dvoupólovou zkoušečkou (L–N, L–PE, N–PE) poznáš, který vodič v zásuvce je přerušený?',
    back: `• Bezvadná zásuvka: L–N = 230 V, L–PE = 230 V, N–PE = 0 V.
• Přerušený nulový vodič N: L–N = 0 V, ale L–PE = 230 V (fáze i PE jsou v pořádku, chybí nulák N).
• Přerušený ochranný vodič PE: L–N = 230 V, ale L–PE = 0 V (spotřebič v zásuvce funguje, ale ochranný kolík PE je odpojený a nechrání!).
• Přerušený fázový vodič L: L–N = 0 V a L–PE = 0 V (do zásuvky nejde fáze).`,
    examNote: 'Praktická diagnostická úloha č. 1 na zkušebním panelu!'
  },
  {
    id: 'fc-21',
    chapterId: 1,
    category: 'normy',
    front: 'Jaké jsou barvy signálek a tlačítek na strojích (ČSN EN 60204-1 ed. 3) a jaký je max. odpor uzemnění PEN u trafa?',
    back: `Barvy ovladačů a signálek (ČSN EN 60204-1 ed. 3):
• ČERVENÁ = Nebezpečí / Porucha / STOP / Nouzové zastavení (žlutý podklad pod hřibovým tlačítkem).
• ŽLUTÁ (JANTAROVÁ) = Varování / Abnormální stav (blížící se mezní hodnota) / Potlačení abnormálního stavu.
• ZELENÁ = Normální stav / Bezpečí / START (zapnutí).
• MODRÁ = Povinné zásahy obsluhy / funkce RESET.
• BÍLÁ / ŠEDÁ / ČERNÁ = Tlačítko se střídavou funkcí START/STOP (nikdy ne červená ani zelená!).

Uzemnění PEN u zdroje (ČSN 33 2000-4-41 ed. 3):
• Celkový výsledný odpor uzemnění vodiče PEN u transformátoru (vč. zemničů do 200 m) smí být max. 2 Ω!`,
    examNote: 'Častý chyták v testech: tlačítko pro střídavé zapínání a vypínání (START/STOP) nesmí být červené ani zelené – je bílé, šedé nebo černé!'
  },
  {
    id: 'fc-22',
    chapterId: 2,
    category: 'bezpečnost',
    front: 'Co je zóna dosahu ruky, kdy jsou části současně přístupné dotyku a za jakého počasí se nesmí pracovat venku?',
    back: `• Zóna dosahu ruky (ČSN 33 2000-4-41 ed. 3): sahá od podlahy 2,5 m směrem nahoru a 1,25 m vodorovně i směrem dolů (zde nesmí být živé části bez izolace/krytu).
• Současně přístupné části: vodivé části vzdálené od sebe nejvýše 2,5 m.
• Zákaz práce na venkovním el. zařízení (ČSN EN 50110-1 ed. 3): při bouřce, husté mlze, prudkém dešti, silném větru, sněžení a za tmy bez osvětlení.
• Zákaz zapínání na čas: odpojené el. zařízení je PŘÍSNĚ ZAKÁZÁNO zapínat jen po uplynutí předem dohodnuté doby!`,
    examNote: 'Zóna dosahu ruky (2,5 m nahoru / 1,25 m do stran) a současně přístupné části (do 2,5 m) patří mezi nejoblíbenější otázky z ČSN 33 2000-4-41!'
  },
  {
    id: 'fc-23',
    chapterId: 3,
    category: 'normy',
    front: 'Jak se určuje průřez ochranného vodiče PE (tab. 54.2), jaká je min. výška HDS a jak se zapojuje pojistka Diazed?',
    back: `• Průřez ochranného vodiče PE (ze stejného kovu jako fáze SL dle ČSN 33 2000-5-54 ed. 3):
  - pro SL ≤ 16 mm²  ⇒  SPE = SL (stejný jako fáze)
  - pro 16 < SL ≤ 35 mm²  ⇒  SPE = 16 mm²
  - pro SL > 35 mm²  ⇒  SPE ≥ SL / 2 (polovina průřezu fáze)
• Hlavní domovní pojistková skříň (HDS): spodní okraj min. 0,6 m (60 cm) nad definitivním terénem/podlahou.
• Šroubová pojistka (Diazed): přívod od zdroje vždy na STŘEDOVÝ (spodní) kontakt, odchod ke spotřebiči na boční závit!
• Výstražná fólie nad kabely v zemi: ČERVENÁ (žlutá je plyn).`,
    examNote: 'Stejně jako u žárovkové objímky jde i u závitové pojistky přívod vždy na středový (spodní) kontakt!'
  },
  {
    id: 'fc-24',
    chapterId: 6,
    category: 'normy',
    front: 'Jaké jsou požadavky na zemniče v zemi, hromosvod (LPS), dveře el. provozoven a odpor PE u ručního nářadí třídy I?',
    back: `• Zemniče v zemi (ČSN 33 2000-5-54 ed. 3): vodorovné zemniče do hloubky 0,8 až 1,5 m; tyčové zemniče od sebe min. na délku tyče. Zákaz používat jako zemnič ploty, zábradlí či plynovod!
• Hromosvod (ČSN EN 62305): metoda valící se koule platí pro všechny stavby; uzemnění LPS se spojuje do společné uzemňovací soustavy na MET/HOP!
• Pod jeden šroub na PE sběrnici smí být připojen VŽDY JEN 1 ochranný vodič PE!
• Dveře el. provozoven: otevírají se VEN, zvenku koule/zámek, zevnitř klika pro okamžitý únik i při uzamčení!
• Odpor PE u ručního nářadí a spotřebičů třídy I do 5 m (ČSN EN 50699 / ČSN 33 1600 ed. 2 Z2): max. 0,3 Ω (dříve 0,2 Ω do 3 m).`,
    examNote: 'Pamatuj na aktualizaci normy ČSN 33 1600 ed. 2 Z2 (ČSN EN 50699): odpor PE u spotřebiče třídy I s přívodem do 5 m je max. 0,3 Ω!'
  }
];

