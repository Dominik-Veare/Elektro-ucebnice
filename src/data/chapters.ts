import { Chapter } from '../types';

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    slug: 'zakladni-pojmy-a-vztahy',
    code: '26-017-H/01',
    title: 'Aplikování základních pojmů a vztahů v elektrotechnice',
    shortDescription: 'Ohmův zákon, Kirchhoffovy zákony, výkony AC/DC, soustavy TN-C/S, TT, IT, SELV/PELV/FELV, barvy vodičů (ČSN EN IEC 60445) a IP krytí včetně přídavných písmen.',
    iconName: 'Zap',
    totalQuestions: 14,
    subchapters: [
      {
        id: '1-1',
        title: 'Základní vztahy: Ohmův zákon, odpor, práce a výkon (DC i AC)',
        standardRefs: ['Fyzikální základy', 'ČSN IEC 60050'],
        content: `### 1. Ohmův zákon pro stejnosměrný obvod
Základní vztah mezi elektrickým napětím **U** [V – volt], proudem **I** [A – ampér] a elektrickým odporem **R** [Ω – ohm]:
📐 I = U / R   ⇒   U = R · I   ⇒   R = U / I

### 2. Odpor a vodivost vodiče
Elektrický odpor vodiče závisí na měrném odporu materiálu **ρ** [Ω·mm²/m], délce vodiče **l** [m] a průřezu **S** [mm²]:
📐 R = (ρ · l) / S = l / (γ · S)
* **γ (gama)** je měrná elektrická vodivost materiálu:
  * **Měď (Cu):** γ ≈ 56 m/(Ω·mm²), měrný odpor ρ ≈ 0,0178 Ω·mm²/m
  * **Hliník (Al):** γ ≈ 35 m/(Ω·mm²), měrný odpor ρ ≈ 0,0285 Ω·mm²/m
* Elektrická vodivost **G** [S – siemens] je převrácená hodnota odporu: **G = 1 / R**.

### 3. Práce a výkon stejnosměrného proudu (DC)
Elektrický příkon / výkon **P** [W – watt]:
📐 P = U · I = R · I² = U² / R   [W]
Elektrická práce / energie **W** [J – joule = Ws, v praxi kWh]:
📐 W = P · t = U · I · t   [Ws, kWh]

### 4. Střídavý proud (AC), impedance a výkony (jednofázový obvod)
V rozvodné síti ČR má střídavé napětí jmenovitou frekvenci **f = 50 Hz** (perioda T = 1/f = 0,02 s = 20 ms). Udávané hodnoty 230 V / 400 V jsou **efektivní hodnoty** (maximální amplituda Umax = Uef · √2 ≈ 325 V).
Vlivem indukčnosti **L** [H – henry] a kapacity **C** [F – farad] vzniká reaktance (**XL = 2π·f·L**, **XC = 1/(2π·f·C)**), celková **impedance Z** [Ω] a fázový posun **φ** mezi napětím a proudem:
📐 Z = √(R² + (XL − XC)²)   [Ω]
* **Činný výkon (P):** výkon reálně přeměněný na teplo, světlo nebo mechanickou práci.
📐 P = U · I · cos φ   [W – watt]
* **Zdánlivý výkon (S):** celkový výkon přenášený ze zdroje vedením (podle něj se dimenzují transformátory a kabely).
📐 S = U · I   [VA – voltampér]
* **Jalový výkon (Q):** výkon kmitající mezi zdrojem a magnetickým/elektrickým polem cívek a kondenzátorů.
📐 Q = U · I · sin φ   [var – voltampér reaktanční]
* **Účiník (cos φ):** poměr činného a zdánlivého výkonu (pro čistě odporovou zátěž jako bojler či přímotop je **cos φ = 1**):
📐 cos φ = P / S   a   S = √(P² + Q²)

### 5. Třífázový střídavý obvod (symetrický, 400 V / 230 V)
Mezi fázovými vodiči (L1, L2, L3) je **sdružené napětí U = 400 V**, mezi fází a nulovým vodičem (L–N) je **fázové napětí Uf = 230 V** (platí U = √3 · Uf, kde √3 ≈ 1,732):
📐 P = √3 · U · I · cos φ ≈ 1,732 · 400 · I · cos φ   [W]
📐 S = √3 · U · I   [VA]`,
        keyTakeaways: [
          'Ohmův zákon: I = U / R, výkon DC: P = U · I = R · I².',
          'Činný výkon AC: P = U · I · cos φ [W], zdánlivý: S = U · I [VA], jalový: Q = U · I · sin φ [var].',
          'Měrná vodivost mědi γ = 56 m/(Ω·mm²), hliníku γ = 35 m/(Ω·mm²).',
          'V třífázové síti je sdružené napětí 400 V a fázové 230 V (poměr √3 ≈ 1,732).'
        ],
        examTips: [
          'Zkoušející se často zeptá: Jaká je jednotka jalového výkonu? Správná odpověď je var (voltampér reaktanční) – píše se malými písmeny.',
          'Jaký je rozdíl mezi činným a zdánlivým výkonem u elektromotoru? Činný výkon (W) je na štítku motoru jako mechanický výkon na hřídeli (po dělení účinností η je to elektrický činný příkon), zatímco zdánlivý výkon (VA) zatěžuje přívodní vedení a jistič.'
        ]
      },
      {
        id: '1-2',
        title: 'Kirchhoffovy zákony a řazení rezistorů / impedancí',
        standardRefs: ['Elektrotechnické výpočty'],
        content: `### 1. Kirchhoffův zákon (zákon o uzlech)
Algebraický součet proudů v elektrickém uzlu se v každém okamžiku rovná nule (součet proudů do uzlu vstupujících se rovná součtu proudů z uzlu vystupujících):
📐 I1 + I2 = I3 + I4   (Σ Ik = 0)
*Praktické využití:* Vychází z něj princip proudového chrániče a děliče proudu.

### 2. Kirchhoffův zákon (zákon o smyčkách)
V uzavřené elektrické smyčce se součet úbytků napětí na spotřebičích (rezistorech) rovná součtu elektromotorických napětí zdrojů v této smyčce:
📐 U1 + U2 + U3 = Uzdroje   (Σ Uk = Σ Ek)
*Praktické využití:* Výpočet úbytku napětí na přívodním kabelu ke spotřebiči.

### Řazení rezistorů v obvodu:
* **Sériové řazení (za sebou):** Všemi rezistory protéká **stejný proud I**, ale napětí se dělí v poměru odporů (sčítá se).
📐 Rcelk = R1 + R2 + ... + Rn
* **Paralelní řazení (vedle sebe):** Na všech rezistorech je **stejné napětí U**, ale proud se větví (sčítají se vodivosti).
📐 1 / Rcelk = (1 / R1) + (1 / R2)   ⇒   pro 2 rezistory: Rcelk = (R1 · R2) / (R1 + R2)
* *Důležité pravidlo:* Celkový odpor paralelního spojení je **VŽDY menší** než nejmenší z paralelně řazených odporů!`,
        keyTakeaways: [
          '1. KZ (uzly): Součet proudů přitékajících = součet proudů odtékajících.',
          '2. KZ (smyčky): Součet napětí zdrojů = součet úbytků napětí na prvcích.',
          'Sériově se odpory sčítají; paralelně je výsledný odpor vždy menší než nejmenší z nich.'
        ],
        examTips: [
          'Rychlý výpočet z hlavy u zkoušky: Máme 2 stejné rezistory 100 Ω zapojené paralelně. Jaký je výsledný odpor? Přesně polovina: 50 Ω. A pokud jsou 3 stejné rezistory 30 Ω paralelně? Třetina: 10 Ω!'
        ]
      },
      {
        id: '1-3',
        title: 'Rozdělení a značení elektrických sítí (TN-C, TN-S, TT, IT, SELV, PELV, FELV)',
        standardRefs: ['ČSN 33 2000-1 ed. 2', 'ČSN 33 2000-4-41 ed. 3', 'ČSN 33 2000-5-54 ed. 3'],
        content: `### Význam písmen v označení distribučních sítí
* **1. písmeno – vztah uzlu zdroje (transformátoru) k zemi:**
  * **T** (*Terre* – země) = uzel zdroje je přímo spojen se zemí (uzemněný střed transformátoru). Celkový odpor uzemnění vodičů PEN odcházejících vedení z transformovny včetně uzlu zdroje nesmí být u sítě 230/400 V větší než **2 Ω** (odpor jednotlivého uzemnění v síti nemá přesáhnout **15 Ω**).
  * **I** (*Isolé* – izolovaný) = všechny živé části zdroje jsou izolované od země, nebo spojené se zemí přes velkou impedanci.
* **2. písmeno – vztah neživých částí (koster spotřebičů) k zemi:**
  * **T** (*Terre*) = neživé části jsou spojeny přímo se zemí samostatným místním zemničem (nezávisle na uzemnění zdroje).
  * **N** (*Neutre*) = neživé části jsou spojeny přímo s uzemněným bodem zdroje pomocí ochranného vodiče (**PE** nebo **PEN**).
* **3. a 4. písmeno – uspořádání nulového a ochranného vodiče v síti TN:**
  * **TN-C** (*Combined* – sloučený) = funkce ochranného (PE) a středního/nulového (N) vodiče jsou sloučeny do jediného vodiče **PEN**. Vodič PEN smí být použit pouze v pevných instalacích o průřezu minimálně **10 mm² Cu** nebo **16 mm² Al** a **nesmí se nikdy jistit ani spínat**!
  * **TN-S** (*Separated* – oddělený) = ochranný vodič (**PE**) a nulový vodič (**N**) jsou vedeny po celé délce odděleně (pětivodičově 3f: L1, L2, L3, N, PE; třívodičově 1f: L, N, PE).
  * **TN-C-S** = v první části sítě (přívod od distributora do hlavní domovní skříně nebo rozvaděče) je veden sloučený vodič **PEN**, v místě rozdělení (na přípojnici PE v rozvaděči, vždy **před proudovým chráničem na straně zdroje**) se rozdělí na samostatný **PE** a **N**. **Po rozdělení PEN na PE a N se tyto vodiče již NIKDE nesmí znovu spojit!**

---

### Charakteristika sítí TT a IT:
* **Síť TT:** Uzel zdroje je uzemněn, kostry spotřebičů mají vlastní zemnič. Protože odpor zemniče bývá v jednotkách až desítkách ohmů, zkratový proud při poruše nestačí na rychlé vybavení jističe – v síti TT se proto pro ochranu automatickým odpojením používají **proudové chrániče (RCD)**.
* **Síť IT (izolovaná soustava):** Živé části jsou odděleny od země, kostry jsou uzemněny. Při **prvním zemním spojení** nevzniká velký poruchový proud a provoz nemusí být odpojen – poruchu pouze signalizuje **hlídač izolačního stavu (IMD)**. Používá se na operačních sálech nemocnic, v dolech a v nepřetržitých provozech.

---

### Sítě malého napětí (ELV – do 50 V AC / 120 V DC) a požadavky na zásuvky:
* **SELV (*Safety Extra-Low Voltage* – bezpečné malé napětí):** Obvod je bezpečně elektricky oddělen od sítě (např. bezpečnostním ochranným transformátorem dle ČSN EN 61558-2-6) a **žádná živá část ani kostra NENÍ uzemněna**!
* **PELV (*Protective Extra-Low Voltage* – ochranné malé napětí):** Obvod je rovněž bezpečně oddělen od sítě jako SELV, ale **jeho živá část nebo kostra JE uzemněna** (spojena s PE).
* **Požadavky na vidlice a zásuvky SELV a PELV:** Vidlice SELV a PELV **nesmí být možno zasunout do zásuvek jiných napěťových soustav** (nezáměnnost) a zásuvky SELV a PELV **nesmějí mít kontakt pro ochranný vodič PE**!
* **FELV (*Functional Extra-Low Voltage* – funkční malé napětí):** Malé napětí do 50 V AC vytvořené z funkčních důvodů BEZ bezpečného oddělení. Vidlice FELV **nesmí jít zasunout do zásuvek jiných napěťových soustav** a do zásuvek FELV nesmí jít zasunout vidlice jiných obvodů.`,
        keyTakeaways: [
          'TN-C: vodič PEN (minimální průřez 10 mm² Cu nebo 16 mm² Al, nesmí se nikdy jistit ani spínat!).',
          'TN-S: oddělený PE a N po celé délce; rozdělení PEN v síti TN-C-S musí být provedeno PŘED proudovým chráničem.',
          'SELV = bezpečně oddělené a NEUZEMNĚNÉ; PELV = bezpečně oddělené a UZEMNĚNÉ; zásuvky SELV/PELV nesmí mít ochranný kontakt.',
          'Celkový odpor uzemnění PEN u transformovny je max. 2 Ω.'
        ],
        examTips: [
          'Zkoušející se zeptá: Do které svorkovnice v rozvaděči musí být přiveden přívodní vodič PEN při rozdělení na PE a N? VŽDY nejprve do ochranné svorkovnice PE (vodič PEN je primárně ochranný vodič!) a z ní se teprve provede propojka na svorkovnici N!',
          'Smí mít zásuvka v obvodu SELV nebo PELV ochranný kolík PE? NESMÍ! Tím se brání zavlečení poruchového napětí z ochranného vodiče silové sítě do obvodu bezpečného malého napětí.'
        ]
      },
      {
        id: '1-4',
        title: 'Značení vodičů, svorek a ovládačů podle ČSN EN IEC 60445 a ČSN EN 60204-1',
        standardRefs: ['ČSN EN IEC 60445 ed. 6', 'ČSN EN 60204-1 ed. 3'],
        content: `### Barvy izolace a alfanumerické značení vodičů (ČSN EN IEC 60445):
* **Ochranný vodič (PE):**
  * Barva: výhradně dvoubarevná kombinace **ZELENO-ŽLUTÁ** po celé délce (každá barva musí pokrývat min. 30 % a max. 70 % povrchu). Zeleno-žlutý vodič se **NIKDY nesmí přeznačit** na fázový nebo nulový vodič!
  * Alfanumerické značení: **PE**.
* **Střední / nulový vodič (N):**
  * Barva: **MODRÁ** (světle modrá) po celé délce.
  * Alfanumerické značení: **N**.
* **Vodič PEN (sloučený ochranný a nulový):**
  * Přednostní barva: **ZELENO-ŽLUTÁ po celé délce a doplněná SVĚTLE MODRÝM označením na zakončeních** (návlečkou/páskou).
  * Alfanumerické značení: **PEN**.
* **Fázové (krajní) vodiče střídavé soustavy AC:**
  * Barvy: **HNĚDÁ** (přednostní pro 1f obvod L nebo L1), **ČERNÁ** (L2), **ŠEDÁ** (L3).
  * Alfanumerické značení: **L1, L2, L3** (dříve R, S, T).
* **Stejnosměrná soustava (DC) dle aktuální ČSN EN IEC 60445:**
  * Kladný pól (**L+** / **+**): **ČERVENÁ**.
  * Záporný pól (**L−** / **−**): **BÍLÁ** (dříve šedá / tmavě modrá).
  * Střední vodič DC (**M**): **MODRÁ**.

---

### Barevné značení tlačítkových ovládačů (ČSN EN 60204-1 / ČSN EN IEC 60073):
* **Tlačítko START / ZAPNUTO:** přednostní barva **BÍLÁ** (přípustná šedá, černá nebo **ZELENÁ**; červená je zakázána!).
* **Tlačítko STOP / VYPNUTO:** přednostní barva **ČERNÁ** (přípustná šedá, bílá nebo **ČERVENÁ**; zelená je zakázána!).
* **Tlačítko NOUZOVÉ VYPNUTÍ / NOUZOVÉ ZASTAVENÍ (TOTAL STOP):** výhradně **ČERVENÁ (hříbkový ovládač) na ŽLUTÉM podkladu**!
* **Kombinované tlačítko START / STOP (ZAP / VYP střídavým stiskem jednoho tlačítka):** doporučená barva je **BÍLÁ, ŠEDÁ nebo ČERNÁ** (nikdy se nesmí použít červená, žlutá ani zelená!).`,
        keyTakeaways: [
          'PE = výhradně zeleno-žlutá (zákaz přeznačování!).',
          'N = světle modrá po celé délce; AC fáze = hnědá (L1), černá (L2), šedá (L3).',
          'PEN = zeleno-žlutá po celé délce + světle modré označení na koncích.',
          'DC soustava dle ČSN EN IEC 60445: kladný pól (+) červená, záporný pól (−) bílá, střední (M) modrá.',
          'Kombinovaný ovládač START/STOP (ZAP/VYP jedním tlačítkem) = bílá, šedá nebo černá.'
        ],
        examTips: [
          'Častý chyták z testů: Jakou barvu má mít kombinovaný ovládač START/VYP, který střídavým stiskem zapíná a vypíná? BÍLOU, ŠEDOU nebo ČERNOU (zelená i červená jsou pro střídavé spínání/vypínání jedním tlačítkem zakázány!).'
        ]
      },
      {
        id: '1-5',
        title: 'Stupně ochrany krytem – IP kód a přídavná písmena',
        standardRefs: ['ČSN EN 60529'],
        content: `Stupeň ochrany krytem (**IP kód** – *Ingress Protection* dle ČSN EN 60529) udává odolnost elektrického předmětu proti vniknutí cizích pevných těles, nebezpečnému dotyku živých částí a vniknutí vody.
Struktura kódu: **IP [1. číslice] [2. číslice] [Přídavné písmeno] [Doplňkové písmeno]** (např. **IP 44**, **IP 20**, **IP XXB**, **IP X6**). Pokud některá číslice není specifikována, nahrazuje se písmenem **X**.

### 1. číslice (0 až 6) – Vniknutí cizích pevných těles a dotyk:
* **0:** Nechráněno.
* **1:** Tělesa ≥ 50 mm (ochrana před dotykem **hřbetem ruky**).
* **2:** Tělesa ≥ 12,5 mm (ochrana před dotykem **prstem** – zkušební prst Ø 12 mm, délka 80 mm). *Minimální krytí pro živé části uvnitř krytů a rozvaděčů!*
* **3:** Tělesa ≥ 2,5 mm (ochrana před dotykem **nástrojem / šroubovákem**).
* **4:** Tělesa ≥ 1,0 mm (ochrana před dotykem **drátem**).
* **5:** Částečně chráněno před prachem (prach nesmí narušit správnou činnost).
* **6 (IP6X):** **Úplně prachotěsné** (žádný prach nevnikne).

### 2. číslice (0 až 9) – Ochrana proti vniknutí vody:
* **0 (IPX0):** Nechráněno proti vodě.
* **1 (IPX1):** Svisle kapající voda.
* **2 (IPX2):** Šikmo kapající voda (při náklonu krytu do 15°).
* **3 (IPX3):** Kropení vodou / déšť (do úhlu 60° od svislice).
* **4 (IPX4):** **Stříkající voda ze všech směrů** (základ pro koupelny zóna 1 a 2, venkovní zásuvky pod přístřeškem).
* **5 (IPX5):** **Tryskající voda** z trysky ze všech směrů (umývárny, zemědělské provozy).
* **6 (IPX6):** **Intenzivně tryskající voda** / vlnobití.
* **7 (IPX7):** **Dočasné ponoření do vody** (hloubka 1 m po dobu 30 minut – např. koupelny zóna 0).
* **8 (IPX8):** **Trvalé ponoření do vody** za podmínek určených výrobcem (ponorná čerpadla, svítidla v bazénech zóna 0).
* **9 (IPX9):** Vysokotlaká a parní čisticí zařízení (wapka s horkou vodou).

---

### Přídavná písmena (A, B, C, D) – Vyšší ochrana osob před dotykem:
Používají se, když ochrana před dotykem živých částí je vyšší než ochrana před vniknutím těles, nebo když se udává pouze ochrana před dotykem (např. **IP XXB**):
* **A:** Chráněno před dotykem **hřbetem ruky** (koule Ø 50 mm).
* **B:** Chráněno před dotykem **prstem** (článkový zkušební prst Ø 12 mm, délka 80 mm). *Dle ČSN 33 2000-4-41 ed. 3 musí mít vodorovné horní plochy krytů min. IP4X nebo IPXXD a ostatní plochy min. IP2X nebo IPXXB!*
* **C:** Chráněno před dotykem **nástrojem** (Ø 2,5 mm, délka 100 mm).
* **D:** Chráněno před dotykem **drátem** (Ø 1,0 mm, délka 100 mm).

### Doplňková písmena (H, M, S, W):
* **H:** Zařízení vysokého napětí (High voltage).
* **M:** Zkoušeno na účinky vody, když jsou pohyblivé části **v pohybu** (Motion – např. rotující motor).
* **S:** Zkoušeno na účinky vody, když jsou pohyblivé části **v klidu** (Stationary).
* **W:** Určeno pro stanovené povětrnostní podmínky (Weather).`,
        keyTakeaways: [
          '1. číslice (0–6) = pevná tělesa a dotyk (IP6X = prachotěsné); 2. číslice (0–9) = voda (IPX6 = intenzivně tryskající voda).',
          'Přídavná písmena ochrany před dotykem: A (hřbet ruky), B (prst), C (nástroj), D (drát).',
          'Základní ochrana krytem dle ČSN 33 2000-4-41: boční plochy min. IP2X (IPXXB), horní vodorovné plochy min. IP4X (IPXXD).'
        ],
        examTips: [
          'Pozor na staré testy, kde bývá překlep „IP6“: Pokud jsou v možnostech odpovědi o vodě (intenzivně tryskající voda), jde o druhou číslici IPX6! První číslice IP6X značí úplnou prachotěsnost.'
        ]
      }
    ]
  },
  {
    id: 2,
    slug: 'bezpecnost-a-ochrana-pred-urazem',
    code: '26-017-H/02',
    title: 'Dodržování bezpečnosti při práci a ochrana před úrazem el. proudem',
    shortDescription: 'Zákon 250/2021 Sb. a NV 194/2022 Sb., obsluha vs. práce, 5 pravidel beznapěťového stavu, zóny PPN, ČSN 33 2000-4-41 ed. 3 a proudové chrániče.',
    iconName: 'ShieldCheck',
    totalQuestions: 17,
    subchapters: [
      {
        id: '2-1',
        title: 'Obsluha vs. práce na el. zařízení, Zákon č. 250/2021 Sb. a NV č. 194/2022 Sb.',
        standardRefs: ['Zákon č. 250/2021 Sb. (§ 19)', 'NV č. 194/2022 Sb.', 'NV č. 190/2022 Sb.', 'ČSN EN 50110-1 ed. 3'],
        content: `### 1. Rozdíl mezi obsluhou a prací na elektrickém zařízení
* **Obsluha elektrického zařízení:** Úkony spojené s běžným provozem zařízení bez zásahu do jeho konstrukce – spínání a vypínání vypínači/jističi, regulace, odečítání měřidel, výměna žárovek a závitových či válcových pojistkových vložek v bezpečném provedení (bez nebezpečí dotyku živých částí). Obsluhu jednoduchých spotřebičů smí provádět osoba bez kvalifikace (laik – BA1), obsluhu složitějších zařízení osoba poučená (§ 4).
* **Práce na elektrickém zařízení:** Montáž, demontáž, zapojování, oprava, údržba, rekonstrukce, revize a zkoušení elektrického zařízení, při kterých se odstraňují kryty nebo zasahuje do elektrických obvodů.
* **Vedoucí práce (ČSN EN 50110-1 ed. 3):** Osoba pověřená **konečnou odpovědností za pracovní činnost** na pracovišti.
* **Výchozí revize nových zařízení:** Nová (nebo rekonstruovaná) elektrická zařízení **musí být vždy revidována PŘED jejich uvedením do provozu**!

### 2. Druhy řízení a dozoru při práci:
* **Práce podle pokynů:** Pracovník obdrží ústní nebo písemné pokyny k práci, práci pak vykonává **sám bez přítomnosti jiné osoby** a sám odpovídá za dodržování bezpečnostních předpisů.
* **Práce pod dohledem:** Osoba odpovědná za dohled před zahájením práce pracovníka poučí, **průběžně (občasně) kontroluje** dodržování bezpečnostních předpisů v průběhu práce (nemusí být trvale na místě). Za dodržování předpisů odpovídají pracující!
* **Práce pod dozorem:** Osoba pověřená dozorem je **TRVALE FYZICKY PŘÍTOMNA na pracovišti po celou dobu práce**, sleduje činnost pracovníka a nesmí vykonávat žádnou jinou práci kromě dozoru! Za dodržení bezpečnosti odpovídá osoba vykonávající dozor.

---

### 3. Legislativa VTZ od 1. 7. 2022 (Zákon č. 250/2021 Sb. a NV č. 194/2022 Sb.):
Dnem **1. 7. 2022** byla zrušena stará vyhláška č. 50/1978 Sb. a vstoupil v účinnost **Zákon č. 250/2021 Sb.** (o bezpečnosti práce v souvislosti s provozem vyhrazených technických zařízení – VTZ) a prováděcí předpisy:
* **NV č. 190/2022 Sb.:** Vymezuje vyhrazená elektrická zařízení (zařízení silnoproudá nad 50 V AC / 120 V DC, hromosvody apod.) a dělí je do **I. třídy** (nejrizikovější – např. elektrárny, rozvodny VN/VVN, nemocnice, prostory s nebezpečím výbuchu, shromažďovací prostory nad 250 osob) a **II. třídy** (ostatní vyhrazená el. zařízení, běžné bytové a administrativní budovy).
* **NV č. 194/2022 Sb. – Stupně odborné způsobilosti v elektrotechnice:**
  * **§ 4 – Osoba poučená:** Proškolená osoba bez elektro vzdělání (seznámená s riziky a první pomocí). Může samostatně obsluhovat el. zařízení NN, pracovat na el. zařízení bez napětí pod dohledem a v blízkosti živých částí pod dozorem. *(§ 5 upravuje obsah poučení a zápis)*.
  * **§ 6 – Elektrotechnik:** Osoba s odborným elektrotechnickým vzděláním **nebo s touto profesní kvalifikací NSK (Montér elektrických instalací 26-017-H)** a úspěšně složenou zkouškou u tříčlenné komise (u malých firem do 2 osob před pověřeným vedoucím elektrotechnikem). Může vykonávat **veškeré práce na el. zařízení samostatně** (s výjimkou prací pod napětím na VN/VVN).
  * **§ 7 – Vedoucí elektrotechnik:** Vyžaduje odbornou kvalifikaci + minimální praxi (**2 roky** na zařízeních NN pro SŠ/vyučené/NSK, resp. **1 rok** pro VŠ elektro; při započtení VN je praxe 3 roky / 2 roky). Může **řídit práce, řídit provoz a projektovat** el. zařízení.
  * **§ 8 – Revizní technik:** Osoba s platným osvědčením od **TIČR** (Technická inspekce ČR) dle § 11 zákona č. 250/2021 Sb. (kategorie E1, E2, E3, E4).
  * **§ 9:** Upravuje přezkoušení při zkoušce profesní kvalifikace NSK.
* **Perioda přezkoušení (§ 6 a § 7):** Pravidelné školení a přezkoušení se provádí **nejméně jednou za 3 roky**!`,
        keyTakeaways: [
          'Obsluha = provozní manipulace; Práce = montáž, oprava, údržba a měření s odkrytím živých částí.',
          'Pod dohledem = občasná kontrola; Pod dozorem = trvalá fyzická přítomnost dozorujícího; Vedoucí práce = osoba s konečnou odpovědností za pracovní činnosti.',
          'NV č. 194/2022 Sb. má 3 stupně způsobilosti: § 4 (Osoba poučená), § 6 (Elektrotechnik), § 7 (Vedoucí elektrotechnik) + § 8 (Revizní technik s osvědčením TIČR).',
          'Nová elektrická zařízení musí být revidována PŘED uvedením do provozu; platnost zkoušky NV 194/2022 Sb. je 3 roky.'
        ],
        examTips: [
          'Pozor na rozdíl oproti staré vyhlášce 50: V novém NV č. 194/2022 Sb. již neexistují staré § 5, § 8, § 10 ani § 11! Dnes existuje pouze § 4 (poučený), § 6 (elektrotechnik), § 7 (vedoucí elektrotechnik) a § 8 (revizní technik).',
          'Jakou praxi potřebuje uchazeč s profesní kvalifikací 26-017-H pro získání § 6 (Elektrotechnik)? Pro samotný § 6 není stanovena povinná délka předchozí praxe (praxi určuje zaměstnavatel místním provozním předpisem dle rizik), ale pro § 7 (Vedoucí elektrotechnik) jsou nutné minimálně 2 roky praxe na NN!'
        ]
      },
      {
        id: '2-2',
        title: '5 bezpečnostních pravidel, zóny PPN a práce za nepříznivých podmínek',
        standardRefs: ['ČSN EN 50110-1 ed. 3', 'NV č. 194/2022 Sb.'],
        content: `### Tři základní pracovní postupy dle ČSN EN 50110-1 ed. 3:
1. **Práce bez napětí:** Pracoviště je úplně odpojeno a zajištěno podle 5 bezpečnostních pravidel.
2. **Práce v blízkosti živých částí:** Pracovník vstupuje částí těla nebo nářadím do **zóny přiblížení (DV)** kolem nekrytých živých částí (pro nízké napětí do 1000 V je vnější hranice zóny přiblížení **DV = 300 mm** od živé části!), aniž by zasáhl do zóny práce pod napětím. Vyžaduje izolační přepážky, kryty nebo práci pod dozorem.
3. **Práce pod napětím (PPN):** Pracovník se dotýká nekrytých živých částí nebo zasahuje do **zóny práce pod napětím (DL)** (u nízkého napětí do 1000 V začíná přímo na povrchu živé části – kontakt). Vyžaduje certifikované izolované nářadí do 1000 V (ČSN EN 60900), dielektrické rukavice, obličejový štít a bezvadný zdravotní a psychický stav.

---

### PĚT BEZPEČNOSTNÍCH PRAVIDEL PRO ZAJIŠTĚNÍ BEZNAPĚŤOVÉHO STAVU:
Tento postup musíš u zkoušky odříkat i prakticky předvést v **naprosto přesném pořadí**:

1. **ÚPLNĚ ODPOJIT (vypnout ze všech stran):**
   * Odpojit pracoviště od všech zdrojů napětí (vypnout hlavní vypínač, jističe, vyjmout pojistkové vložky).
   * Pozor na zpětné napájení (záložní generátory, UPS, střídače fotovoltaiky, nabité kondenzátory)!
2. **ZAJISTIT PROTI OPĚTOVNÉMU ZAPNUTÍ:**
   * Mechanicky zablokovat vypínací prvek v poloze VYPNUTO (uzamknout zámkem systému **LOTO – Lockout/Tagout**, nasadit uzamykací blokádu na páčku jističe, uschovat pojistkové vložky u sebe).
   * Vyvěsit bezpečnostní výstražnou tabulku: **„NEZAPÍNEJ! NA ZAŘÍZENÍ SE PRACUJE!“**
3. **OVĚŘIT BEZNAPĚŤOVÝ STAV:**
   * Provádí se výhradně **schválenou dvoupólovou zkoušečkou napětí** (dle ČSN EN 61243-3, např. typu „vadaska“). **Jednopólová doutnavková fázovka (šroubovák) je pro ověření beznapěťového stavu PŘÍSNĚ ZAKÁZÁNA!**
   * **Povinný tříkrokový test zkoušečky:**
     * *Krok A:* Přezkoušet zkoušečku na známém zdroji pod napětím (ověření, že měřidlo funguje).
     * *Krok B:* Změřit beznapěťový stav v místě práce mezi všemi fázemi navzájem (L1-L2, L2-L3, L1-L3) a mezi každou fází, N a PE (L1-N, L2-N, L3-N, L1-PE, L2-PE, L3-PE, N-PE).
     * *Krok C:* Bezprostředně po měření zkoušečku **znovu přezkoušet na známém zdroji napětí**!
4. **UZEMNIT A ZKRATOVAT:**
   * Povinné vždy na zařízeních VN a VVN; na zařízeních NN povinné tam, kde hrozí zavlečení napětí (venkovní vedení, riziko indukce, elektrocentrály).
   * **ZÁKLADNÍ PRAVIDLO POŘADÍ:** Nejprve se zkratovací souprava vždy připojí **k uzemnění (PE/zemniči)** a teprve potom se nasazuje na fázové vodiče! Při demontáži se postupuje opačně (nejprve odpojit z fází, nakonec od země).
5. **OHRADIT NEBO ZAKRÝT ŽIVÉ ČÁSTI V OKOLÍ:**
   * Pokud v blízkosti pracoviště zůstaly živé části pod napětím, zakryjí se izolačními přepážkami/plachtami nebo se vymezí bezpečný prostor zábranou.

---

### Zákaz spínání na čas a pravidla pro nepříznivé povětrnostní podmínky (ČSN EN 50110-1 ed. 3):
* **Zákaz časového dorozumívání:** Zahájení práce nebo opětné uvedení elektrického zařízení pod napětí po ukončení práce **NESMÍ být nikdy povoleno pouze na základě signálů nebo předem dohodnutého časového intervalu** (např. *„v 14:00 to zapnu“*)!
* **Práce při nepříznivém počasí (bouřka, hustá mlha, prudký vítr, déšť):**
  * **Hustá mlha:** Mlha se považuje za hustou zejména tehdy, pokud **vedoucí práce nevidí osoby a živé části**, na kterých nebo v jejichž blízkosti se má pracovat.
  * **Prudký vítr:** Vítr se považuje za prudký, když **zabraňuje pracujícím použít nářadí s dostatečnou přesností**. Při bouřce, husté mlze a prudkém větru se práce na venkovních zařízeních musí přerušit!`,
        keyTakeaways: [
          '1. Úplně odpojit -> 2. Zajistit proti zapnutí (LOTO + tabulka) -> 3. Ověřit beznapětí (dvoupólová zkoušečka testovaná před i po) -> 4. Uzemnit a zkratovat (nejprve zem, pak fáze) -> 5. Ohradit a zakrýt okolí.',
          'Zóna přiblížení DV u nízkého napětí do 1000 V je 300 mm (30 cm) od živé části.',
          'Hustá mlha = vedoucí práce nevidí osoby a živé části; Prudký vítr = zabraňuje použít nářadí s dostatečnou přesností.',
          'Zapnutí zařízení po práci nesmí být nikdy provedeno jen po uplynutí dohodnutého časového intervalu nebo na signál!'
        ],
        examTips: [
          'U praktické zkoušky tě zkoušející nechá jít k cvičnému panelu. Pokud sáhneš šroubovákem na svorku, aniž bys předtím vypnul jistič, dal tabulku a změřil dvoupólovou zkoušečkou (včetně testu zkoušečky před a po!), zkoušející zkoušku okamžitě ukončí pro porušení BOZP!'
        ]
      },
      {
        id: '2-3',
        title: 'Ochrana před úrazem el. proudem, zóna dosahu ruky a ochrana při poruše (ČSN 33 2000-4-41 ed. 3)',
        standardRefs: ['ČSN 33 2000-4-41 ed. 3', 'ČSN 33 2000-5-54 ed. 3'],
        content: `Každé ochranné opatření se podle **ČSN 33 2000-4-41 ed. 3** skládá z vhodné kombinace:
1. **Základní ochrany** (ochrana před přímým dotykem živých částí za bezporuchového stavu):
   * **Základní izolace živých částí:** Živé části musí být úplně pokryty izolací, **kterou je možno odstranit pouze jejím zničením**. **Barvy, laky a smalty se nepovažují za dostatečnou izolaci** pro základní ochranu před úrazem!
   * **Přepážky nebo kryty:** Boční a spodní povrchy krytů musí zajišťovat krytí alespoň **IP2X nebo IPXXB**; horní vodorovné povrchy krytů snadno přístupné dotyku alespoň **IP4X nebo IPXXD**. Odstranění krytu smí být možné pouze **s použitím nástroje nebo klíče** (nebo po odpojení živých částí).
   * **Zábrany a umístění mimo dosah (ochrana polohou):** Tyto dvě ochrany jsou povoleny **pouze v instalacích přístupných jen osobám znalým nebo poučeným (BA4/BA5, např. uvnitř uzavřených elektrických provozoven)**!
   * **Zóna dosahu ruky (u vnitřních zařízení nn):** Od stanoviště, kde se osoby běžně pohybují, sahá zóna dosahu ruky **směrem nahoru do výšky 2,5 m** a **vodorovně do stran i směrem dolů do vzdálenosti 1,25 m**.
   * **Současně přístupné části:** Dvě části se považují za současně přístupné dotyku, pokud jsou od sebe vzdáleny **nejvýše 2,5 m**! Všechny neživé části současně přístupné dotyku **musí být spojeny se stejnou uzemňovací soustavou** (jednotlivě, po skupinách nebo společně).
2. **Ochrany při poruše** (ochrana před nebezpečným dotykovým napětím na neživých částech při selhání základní izolace).
3. **Doplňkové ochrany** (proudový chránič s IΔn ≤ 30 mA, doplňkové ochranné pospojování).

---

### Přehled všech prostředků ochrany při poruše (dle Hodnoticího standardu NSK 2c):
1. **Automatické odpojení od zdroje (nejrozšířenější opatření):**
   * Základní ochranu tvoří základní izolace + kryt; ochranu při poruše tvoří **ochranné pospojování (PE) a samočinné odpojení jistícím prvkem** (jističem, pojistkou nebo proudovým chráničem) v předepsaném čase při průrazu fáze na kostru. V instalaci s automatickým odpojením od zdroje mohou být použita i zařízení třídy ochrany II.
2. **Přídavná nebo zesílená izolace (zařízení třídy ochrany II):**
   * Přídavná izolace je nezávislá druhá vrstva izolace přidaná k základní izolaci; zesílená izolace je jedna vrstva s mechanickými a elektrickými vlastnostmi rovnocennými dvojité izolaci.
   * Značka: **dva soustředné čtverečky**. Neživé části spotřebiče třídy II se **NESMÍ spojit s ochranným vodičem PE**!
3. **Ochranné pospojování:**
   * Vodivé spojení všech současně přístupných neživých částí a cizích vodivých částí (potrubí vody, topení, plynu, ocelové konstrukce), které zajistí stejný potenciál a zabrání vzniku nebezpečného dotykového napětí.
4. **Ochranné stínění:**
   * Spočívá v oddělení živých částí od obvodu pomocí kovového vodivého stínění (krytu nebo mezivinutí transformátoru), které je **spojeno s ochranným pospojováním / vodičem PE**. Při průrazu základní izolace zachytí poruchový proud stínění a dojde k odpojení zdroje.
5. **Jednoduché elektrické oddělení obvodů:**
   * Napájení jednoho spotřebiče z **oddělovacího transformátoru** (převod 1:1, bezpečně oddělené vinutí). Sekundární obvod **nesmí být uzemněn** – při jednom průrazu na kostru tak neteče obvodem přes zem žádný poruchový proud (příklad: zásuvka pro holicí strojek v koupelně).
6. **Nevodivé okolí (ochrana polohou):**
   * Zvláštní opatření v prostorech pod dozorem znalých osob (BA5), kde mají podlahy a stěny vysoký elektrický odpor (min. **50 kΩ** do 500 V, resp. 100 kΩ nad 500 V) a jsou uspořádány tak, aby se člověk nemohl současně dotknout dvou částí s různým potenciálem. V takovém prostoru **nesmí být ochranný vodič PE**.

---

### Třídy ochrany spotřebičů (0, I, II, III):
* **Třída 0:** Pouze základní izolace bez PE (v ČR zakázáno!).
* **Třída I:** Základní izolace + ochranná svorka **PE** na kostře (pračka, bojler, sporák).
* **Třída II:** Dvojitá nebo zesílená izolace (dva čtverečky – vrtačka, fén, nabíječka; bez PE).
* **Třída III:** Napájení bezpečným malým napětím **SELV / PELV** (symbol kosočtverce s římskou III).

### Mezní trvalá dotyková napětí UL a maximální doby odpojení (pro koncové obvody do 63 A / 32 A):
* **Normální prostory:** **50 V AC** / **120 V DC**
* **Nebezpečné / vlhké prostory:** **25 V AC** / **60 V DC**
* **Zvlášť nebezpečné prostory (mokro, bazény):** **12 V AC** / **25 V DC** (v Zóně 0 koupelny 30 V DC)
* **Maximální doba odpojení při U0 = 230 V AC:**
  * Síť **TN**: **0,4 s** (pro distribuční vedení a koncové obvody nad 63 A / 32 A: **max. 5 s**)
  * Síť **TT**: **0,2 s** (pro distribuční vedení: **max. 1 s**)`,
        keyTakeaways: [
          'Základní izolaci živých částí lze odstranit jen jejím zničením; barvy a laky NEJSOU dostatečnou izolací!',
          'Zóna dosahu ruky: nahoru 2,5 m, vodorovně a dolů 1,25 m; současně přístupné části jsou do vzdálenosti 2,5 m.',
          'Maximální doba odpojení koncových obvodů 230 V: v síti TN max. 0,4 s (distribuční max. 5 s), v síti TT max. 0,2 s.',
          'Zábrany a umístění mimo dosah smí být použity pouze v prostorách přístupných osobám znalým nebo poučeným (uzavřené el. provozovny).'
        ],
        examTips: [
          'Zkoušející se často ptá na rozměry zóny dosahu ruky: 2,5 m směrem nahoru a 1,25 m vodorovně do stran a dolů. A jaká je max. vzdálenost dvou současně přístupných částí? 2,5 m!',
          'Smí se kovový kryt spotřebiče třídy II (dva čtverečky) připojit na zeleno-žlutý vodič PE? NESMÍ! Tím by se na kryt v případě poruchy v síti mohlo zavléct dotykové napětí.'
        ]
      },
      {
        id: '2-4',
        title: 'Proudové chrániče (RCD) – princip, typy a povinné použití',
        standardRefs: ['ČSN 33 2000-4-41 ed. 3', 'ČSN 33 2130 ed. 3', 'ČSN EN 61008-1'],
        content: `### 1. Fyzikální princip proudového chrániče (RCD):
Proudový chránič pracuje na principu **součtového měřicího transformátoru proudu** (1. Kirchhoffův zákon):
* Skrz toroidní magnetické jádro procházejí **všechny pracovní vodiče obvodu** (fázové vodiče L1, L2, L3 i nulový vodič N). **Ochranný vodič PE magnetickým obvodem chrániče NEPROCHÁZÍ!**
* V bezporuchovém stavu je vektorový součet proudů tekoucích tam a zpět roven nule (**IL − IN = 0**), magnetické toky se vyruší a v sekundárním vinutí se neindukuje žádné napětí.
* Při poruše izolace nebo při dotyku člověka živé části část proudu uniká mimo chránič do země nebo vodičem PE. Vznikne **rozdílový (reziduální) proud IΔ**. Magnetická rovnováha se poruší, v sekundární cívce se naindukuje napětí a vybavovací relé odpojí všechny póly chrániče (L i N).

### 2. Kde je proudový chránič s IΔn ≤ 30 mA POVINNÝ (ČSN 33 2000-4-41 ed. 3):
1. **Všechny zásuvkové obvody** se jmenovitým proudem **do 32 A včetně**, které jsou určeny pro používání laiky (BA1) a pro všeobecné použití.
2. **Mobilní zařízení pro venkovní použití** se jmenovitým proudem **do 32 A včetně**.
3. **Světelné obvody v bytech**, rodinných domech a ubytovacích zařízeních (nový požadavek 3. edice normy!).
4. **Všechny obvody v koupelnách a sprchách** (ČSN 33 2000-7-701 ed. 2), saunách, bazénech a **zásuvky do 32 A na staveništích** (ČSN 33 2000-7-704).

### 3. Typy proudových chráničů podle druhu reziduálního proudu:
* **Typ AC** (symbol vlnovky): reaguje pouze na čistě sinusový střídavý proud. V moderních instalacích s elektronikou může být „oslepen“ stejnosměrnou složkou.
* **Typ A** (symbol vlnovky a pulzů): reaguje na střídavý sinusový proud **i na pulzující stejnosměrný proud** (povinný pro moderní spotřebiče s usměrňovači – pračky, sušičky, indukční desky, LED zdroje, PC).
* **Typ F:** pro jednofázové frekvenční měniče (tepelná čerpadla, pračky s invertorem).
* **Typ B:** reaguje i na **hladký stejnosměrný reziduální proud** (třífázové frekvenční měniče, nabíjecí stanice elektromobilů – wallboxy, fotovoltaika).
* **Typ S (selektivní)** a **Typ G (krátkodobě zpožděný):** instalují se jako předřazené (hlavní) chrániče (např. IΔn = 100 mA nebo 300 mA typ S pro protipožární ochranu), aby při poruše v zásuvce vypadl pouze koncový 30mA chránič a nikoliv celý dům.

### 4. Proudový chránič (RCCB) vs. Jističochránič (RCBO):
* **RCCB (samotný proudový chránič):** Chrání pouze před unikajícím proudem, ale **NECHRÁNÍ před přetížením a zkratem**! Musí být vždy předjištěn jističem nebo pojistkou.
* **RCBO (proudový chránič s nadproudovou ochranou – jističochránič):** Kombinuje proudový chránič a jistič v jednom přístroji.`,
        keyTakeaways: [
          'Princip: součtový transformátor proudu (porovnává proudy v L a N; vodič PE nesmí procházet magnetickým obvodem chrániče).',
          'Chránič ≤ 30 mA je povinný pro zásuvky do 32 A (včetně stavenišť), venkovní mobilní zařízení do 32 A, světla v bytech a koupelny.',
          'Samotný chránič (RCCB) nechrání proti zkratu L–N ani proti přetížení – musí mít předřazený nebo vestavěný jistič!',
          'Pro ochranu před požárem se používají chrániče s IΔn ≤ 300 mA.'
        ],
        examTips: [
          'Zkoušející se zeptá: Chrání samotný proudový chránič (RCCB) před zkratem mezi fází L a nulákem N? NECHRÁNÍ! Při zkratu L–N teče obrovský proud fází tam a nulákem zpět (rozdíl proudů je nula), takže chránič nevybaví a bez předřazeného jističe by shořel!'
        ]
      }
    ]
  },
  {
    id: 3,
    slug: 'dimenzovani-jisteni-a-vedeni',
    code: '26-017-H/03',
    title: 'Dimenzování, jištění a kladení elektrických vedení',
    shortDescription: 'ČSN 33 2000-5-52, průřezy PE vodičů, úbytky napětí, jističe a závitové pojistky, SPD a LPS, spojování vodičů (Cu/Al), kabely v zemi a instalační zóny.',
    iconName: 'Sliders',
    totalQuestions: 17,
    subchapters: [
      {
        id: '3-1',
        title: 'Zásady dimenzování vedení, průřez vodiče PE a kontrola oteplení (ČSN 33 2000-5-52)',
        standardRefs: ['ČSN 33 2000-5-52 ed. 2', 'ČSN 33 2000-4-43 ed. 2', 'ČSN 33 2000-5-54 ed. 3'],
        content: `Při návrhu průřezu vodičů a kabelů musí montér / projektant ověřit **4 základní hlediska**:
1. **Dovolené oteplení (trvalá proudová zatížitelnost Iz)** – ochrana proti přetížení.
2. **Úbytek napětí (ΔU)** – aby na konci vedení bylo dostatečné napětí pro chod spotřebiče.
3. **Ochrana při zkratu a automatické odpojení od zdroje (impedance smyčky Zs)**.
4. **Mechanická pevnost** (minimální povolený průřez: v pevné instalaci **1,5 mm² Cu** pro silové/světelné obvody).

### Základní podmínky koordinace mezi vodičem a jističem (ČSN 33 2000-4-43):
📐 IB ≤ In ≤ Iz
📐 I2 ≤ 1,45 · Iz
* **IB** = výpočtový (návrhový) pracovní proud obvodu [A] (daný příkonem spotřebiče).
* **In** = jmenovitý proud jistícího prvku (jističe) [A].
* **Iz** = trvalá dovolená proudová zatížitelnost vodiče při daném uložení [A].
* **I2** = proud zajišťující spolehlivé zapůsobení jistícího prvku ve smluvené době (u instalačních jističů dle ČSN EN 60898-1 je **I2 = 1,45 · In**, takže pokud platí In ≤ Iz, je druhá podmínka splněna automaticky!).

---

### Minimální průřez ochranného vodiče PE vůči fázovému vodiči L (ze stejného kovu, Tabulka 54.2 ČSN 33 2000-5-54 ed. 3):
* **Pokud je průřez fázového vodiče SL ≤ 16 mm²:** průřez ochranného vodiče musí být **SPE = SL** *(např. pro fázi 2,5 mm² je PE 2,5 mm²; pro fázi 10 mm² je PE 10 mm²)*.
* **Pokud je 16 mm² < SL ≤ 35 mm²:** průřez ochranného vodiče musí být minimálně **SPE = 16 mm²** *(např. má-li fázový vodič 25 mm² nebo 35 mm², stačí ochranný vodič PE o průřezu **16 mm²**!)*.
* **Pokud je SL > 35 mm²:** průřez ochranného vodiče musí být minimálně **SPE = SL / 2** *(polovina průřezu fázového vodiče, např. pro fázi 50 mm² je PE 25 mm²)*.

---

### Faktory ovlivňující proudovou zatížitelnost kabelu (Iz):
Skutečná zatížitelnost se určí ze základní tabulkové hodnoty **Iz0** vynásobením opravnými součiniteli:
📐 Iz = Iz0 · k1 · k2
* **Referenční způsob uložení kabelu:**
  * **A1 / A2:** Vodiče nebo vícežilový kabel v elektroinstalační trubce **v tepelně izolované stěně** (dřevostavba, sádrokarton s minerální vatou) → **nejhorší chlazení, nejnižší Iz**! *(Např. Cu 2,5 mm² v uložení A2 snese pouze cca 18,5 A, zatímco ve zdivu C snese 27 A!)*
  * **B1 / B2:** Vodiče nebo kabel v trubce či liště na stěně nebo ve zdivu.
  * **C:** Kabel uložený **přímo pod omítkou ve zdivu** nebo na stěně → velmi dobrý odvod tepla.
  * **D:** Kabel v trubce/chráničce v zemi (základní teplota půdy 20 °C).
  * **E / F:** Kabel volně na vzduchu (na kabelovém roštu/lávce).
* **Teplota okolí (k1):** Tabulky pro vzduch platí pro **30 °C**. Při vyšší teplotě okolí se zatížitelnost snižuje (koeficient k1 < 1).
* **Seskupení více kabelů ve svazku / žlabu (k2):** Více zatížených kabelů vedle sebe se vzájemně ohřívá → zatížitelnost klesá (např. při 3 kabelech ve svazku je k2 ≈ 0,70).`,
        keyTakeaways: [
          'Zlaté pravidlo jištění proti přetížení: IB ≤ In ≤ Iz (proud spotřebiče ≤ jistič ≤ proudová zatížitelnost kabelu).',
          'Průřez PE vůči fázi SL: do 16 mm² stejný (SL), od 16 do 35 mm² vždy 16 mm², nad 35 mm² polovina (SL / 2).',
          'Způsob uložení dramaticky mění zatížitelnost: v tepelné izolaci (A1/A2) snese kabel mnohem menší proud než přímo ve zdivu pod omítkou (C).'
        ],
        examTips: [
          'Častá testová otázka: Jaký nejmenší průřez musí mít ochranný vodič PE, má-li fázový vodič průřez 35 mm² a oba jsou ze stejného materiálu? Odpověď: 16 mm² (dle tabulky 54.2 ČSN 33 2000-5-54 ed. 3)!'
        ]
      },
      {
        id: '3-2',
        title: 'Výpočet úbytku napětí ve vedení (1f a 3f)',
        standardRefs: ['ČSN 33 2130 ed. 3', 'ČSN 33 2000-5-52 ed. 2'],
        content: `Podle **ČSN 33 2130 ed. 3** nesmí úbytek napětí na vnitřním vedení (mezi přípojkovou skříní HDS a koncovým spotřebičem) překročit tyto limity:
* **Světelné obvody:** maximálně **2 %** (v síti 230 V je to max. **4,6 V**).
* **Ostatní obvody (zásuvky, sporáky, bojlery):** maximálně **3 %** (v síti 230 V je to max. **6,9 V**).
* *Poznámka:* Na hlavním domovním vedení (od HDS k elektroměru) je dovolen úbytek max. 1 %, celkově od HDS k nejvzdálenějšímu silovému spotřebiči max. 4 %.

### Vzorce pro výpočet úbytku napětí (pro měď γ = 56, pro hliník γ = 35):

#### 1. Jednofázový obvod (230 V AC – proud teče tam fází L a zpět nulákem N, proto 2 · l):
📐 ΔU = (2 · l · I · cos φ) / (γ · S) = (2 · l · P) / (U · γ · S)   [V]
📐 ΔU% = (ΔU / 230) · 100   [%]

#### 2. Třífázový souměrný obvod (400 V AC – proud v nulovém vodiči je nulový, proto √3 · l):
📐 ΔU = (√3 · l · I · cos φ) / (γ · S) = (l · P) / (U · γ · S)   [V]
📐 ΔU% = (ΔU / 400) · 100   [%]
*(kde **l** je délka trasy kabelu v metrech, **I** je proud v ampérech, **P** je činný příkon ve wattech, **S** je průřez vodiče v mm²).*`,
        keyTakeaways: [
          'Limity úbytku napětí: 2 % pro světelné okruhy, 3 % pro zásuvkové a ostatní okruhy.',
          'U 1f obvodu je v čitateli koeficient 2 · l (cesta tam a zpět), u 3f obvodu je √3 · l.',
          'Pokud při dlouhé trase úbytek napětí nevyhoví, musíme zvolit o stupeň větší průřez vodiče (např. 4 mm² místo 2,5 mm²).'
        ],
        examTips: [
          'Vzorový příklad u zkoušky: Jednofázový bojler P = 2,3 kW (I = 10 A, cos φ = 1) je vzdálen l = 35 m, kabel Cu 2,5 mm². Jaký je úbytek napětí? ΔU = (2 · 35 · 10) / (56 · 2,5) = 700 / 140 = 5,0 V. V procentech: (5 / 230) · 100 = 2,17 %. Protože jde o bojler (limit 3 %), návrh VYHOVUJE!'
        ]
      },
      {
        id: '3-3',
        title: 'Ochrany proti nadproudům: jističe, tavné pojistky a vypínací charakteristiky',
        standardRefs: ['ČSN EN 60898-1', 'ČSN 33 2000-4-43 ed. 2', 'ČSN 33 2000-5-53'],
        content: `**Nadproud** je každý proud překračující jmenovitou hodnotu. Dělí se na:
1. **Přetížení:** Nadproud v elektricky nepoškozeném obvodu (zapojení příliš mnoha spotřebičů na jeden okruh).
2. **Zkrat:** Nadproud způsobený poruchou se zanedbatelnou impedancí mezi živými vodiči (L–N, L1–L2) nebo fází a zemí (L–PE).

---

### Konstrukce instalačního jističe (dvě nezávislé spouště):
1. **Tepelná spoušť (bimetalový pásek) – ochrana proti PŘETÍŽENÍ:**
   * Průchodem nadproudu se dvojkovový pásek zahřívá a ohýbá, až po určité době (sekundy až desítky minut) uvolní západku.
   * Dle ČSN EN 60898-1: smluvený nevypínací proud **I1 = 1,13 · In** (jistič nesmí vypnout do 1 hodiny), smluvený vypínací proud **I2 = 1,45 · In** (jistič musí vypnout do 1 hodiny).
2. **Elektromagnetická (zkratová) spoušť (cívka s kotvou) – ochrana proti ZKRATU:**
   * Při prudkém nárůstu zkratového proudu magnetické pole cívky okamžitě (do **0,1 s**, typicky pod 10 ms) přitáhne jádro a vyrazí kontakty, dříve než se vodiče roztaví.

### Vypínací charakteristiky jističů (okamžitá zkratová spoušť):
* **Charakteristika B (3 až 5 × In):** Standard pro jištění kabelů a vedení bez rázových proudů – zásuvky, světla, topení, bojlery v bytech. *(Příklad: B16 okamžitě vypne při proudu 80 A).*
* **Charakteristika C (5 až 10 × In):** Pro spotřebiče s běžným rozběhovým proudem – asynchronní elektromotory, kompresory, čerpadla, klimatizace, skupiny zářivek. *(Příklad: C16 okamžitě vypne při 160 A).*
* **Charakteristika D (10 až 20 × In):** Pro spotřebiče s velkým rázovým proudem při zapnutí – těžké rozběhy motorů, svařovací transformátory, rentgeny.

---

### Tavné pojistky (označení charakteristik a zapojení závitových pojistek):
* **1. písmeno (malé):** **g** = schopná vypínat přetížení i zkrat (celorozsahová); **a** = vypíná pouze zkrat (jistí jen částečně).
* **2. písmeno (velké):** **G** = jištění kabelů a vedení (pomalá); **M** = jištění motorů; **R** = rychlá pro polovodiče.
* Nejčastější pojistka v rozvaděčích a HDS je **gG** (dříve gl) – celorozsahová pro jištění vedení.
* **Pravidlo zapojení pojistkových spodků závitových pojistek (E27/E33 Diazed):** Pojistkové spodky musí být vždy zapojeny tak, aby **střední (spodní) kontakt byl připojen na stranu zdroje (přívod)** a závit na stranu spotřebiče! Tím je zajištěno, že při šroubování pojistkové hlavice s vložkou není kovový závit pod napětím.`,
        keyTakeaways: [
          'Tepelná spoušť (bimetal) chrání proti přetížení; elektromagnetická spoušť (cívka) chrání proti zkratu.',
          'Zkratové spouště jističů: B = 3 až 5× In, C = 5 až 10× In, D = 10 až 20× In.',
          'Tavná pojistka gG: "g" = přetížení i zkrat, "G" = jištění vedení.',
          'U závitových pojistek musí být střední (spodní) kontakt vždy připojen na stranu zdroje!'
        ],
        examTips: [
          'Zkoušející se v testu i ústně ptá: Jak musí být zapojen pojistkový spodek závitové pojistky? Přívod od zdroje musí jít vždy na střední (spodní) kontakt (stejně jako u žárovkové objímky), aby závit nebyl při výměně pojistky pod napětím!'
        ]
      },
      {
        id: '3-4',
        title: 'Přepěťové ochrany (SPD), hromosvody (LPS) a členění objektů',
        standardRefs: ['ČSN EN 62305', 'ČSN 33 2000-5-534 ed. 2', 'NV č. 190/2022 Sb.'],
        content: `**Svodiče bleskových proudů a přepětí (SPD – *Surge Protective Device*)** chrání elektrickou instalaci a elektroniku před atmosférickým přepětím (úder blesku) a spínacím přepětím v síti. Fungují jako třístupňová kaskáda:

### 1. SPD Typ 1 (T1, dříve třída B) – Svodič bleskových proudů (hrubá ochrana):
* **Konstrukce:** Jiskřiště.
* **Funkce:** Svede obrovskou energii přímého či blízkého úderu blesku (**zkušební vlna 10/350 µs**, impulzní proud Iimp ≥ 12,5 kA/pól) na ochranné uzemnění. Nastavuje napěťovou hladinu Up ≤ 4 kV (resp. 2,5 kV).
* **Umístění:** **Na vstupu vedení do objektu** v hlavním rozvaděči (povinné u budov s hromosvodem LPS nebo venkovním přívodem).

### 2. SPD Typ 2 (T2, dříve třída C) – Svodič přepětí (střední ochrana):
* **Konstrukce:** **Varistor** (polovodičový odpor závislý na napětí – při normálním napětí 230 V má nekonečný odpor, při přepěťové špičce se v nanosekundách otevře a svede proud do PE).
* **Funkce:** Svede zbytkové přepětí za T1 a spínací přepětí v síti (**zkušební vlna 8/20 µs**, Up ≤ 1,5 kV).
* **Umístění:** V podružných a bytových rozvaděčích. V praxi se nejčastěji osazuje kombinovaný přístroj **SPD Typ 1+2 (T1+T2)** přímo do domovního rozvaděče.

### 3. SPD Typ 3 (T3, dříve třída D) – Jemná ochrana:
* **Konstrukce:** Varistor + rychlé supresorové diody / plynové bleskojistky.
* **Funkce:** Snižuje přepětí pod 1,5 kV přímo pro citlivou elektroniku (PC, TV, kotel, řídicí systém).
* **Umístění:** Co nejblíže ke spotřebiči (do **5 m délky vedení** – přímo v přístrojové krabici zásuvky nebo v přepěťovém adaptéru).

---

### Pravidla montáže SPD (Kritérium NSK 6b) a návrh jímací soustavy hromosvodu (LPS):
* **Pravidlo 0,5 metru:** Součet délek připojovacích vodičů od fázové přípojnice přes SPD na hlavní uzemňovací přípojnici PE (MET) **nesmí překročit 0,5 m**!
* **Minimální průřezy připojovacích vodičů Cu:** Pro **SPD Typ 1** min. **16 mm² Cu** na svorku PE / MET; pro **SPD Typ 2** min. **6 mm² Cu** na svorku PE.
* **Metody návrhu jímací soustavy hromosvodu (LPS dle ČSN EN 62305-3):**
  1. **Metoda valící se koule (bleskové koule):** Univerzální geometrická metoda, která je vhodná **PRO VŠECHNY PŘÍPADY** (včetně tvarově složitých a členitých staveb). Poloměr koule závisí na třídě LPS (I = 20 m, II = 30 m, III = 45 m, IV = 60 m).
  2. **Metoda ochranného úhlu:** Pro jednoduché stavby a malé nástavby.
  3. **Metoda mřížové soustavy:** Pro rovinné střechy.
* **Členění vyhrazených el. zařízení a objektů (NV č. 190/2022 Sb.):**
  * Dle platného **NV č. 190/2022 Sb.** se vyhrazená elektrická zařízení člení na **I. třídu** (nejrizikovější – prostory s nebezpečím výbuchu, shromaždiště nad 250 osob, zdravotnictví, zařízení nad 1 kV a hromosvody těchto objektů) a **II. třídu** (všechna ostatní vyhrazená zařízení, běžné bytové a občanské objekty apod.).
  * *Poznámka ke starším testům:* Dřívější předpisy (zrušená vyhláška č. 73/2010 Sb.) členily objekty na **skupinu A** (bez nebezpečí výbuchu) a **skupinu B** (s nebezpečím výbuchu).`,
        keyTakeaways: [
          'T1 = bleskové proudy (jiskřiště, vlna 10/350 µs, vstup do budovy, vodič PE min. 16 mm² Cu).',
          'T2 = spínací a indukované přepětí (varistor, vlna 8/20 µs, podružný rozvaděč, vodič PE min. 6 mm² Cu).',
          'Celková délka připojovacích vodičů k SPD musí být ≤ 0,5 m!',
          'Metoda valící se koule pro jímací soustavu hromosvodu je vhodná pro všechny případy staveb.'
        ],
        examTips: [
          'Zkoušející u praktické části (kritérium 6b: Zapojit přepěťové ochrany do obvodu) kontroluje dvě věci: 1. Zda jsi použil dostatečný průřez vodiče k PE (min. 6 mm² u T2, 16 mm² u T1), 2. Zda jsi přívod k PE udělal nejkratší možnou cestou bez zbytečných smyček (do 0,5 m)!'
        ]
      },
      {
        id: '3-5',
        title: 'Kladení vedení, instalační zóny, kabely v zemi, spojování vodičů a vnější vlivy',
        standardRefs: ['ČSN 33 2130 ed. 3', 'ČSN 33 2000-5-51 ed. 3', 'ČSN 33 2000-5-52 ed. 2', 'ČSN 73 6005', 'ČSN 33 3320'],
        content: `### 1. Instalační zóny pro skryté vedení ve stěnách (ČSN 33 2130 ed. 3):
Kabely pod omítkou se vedou **výhradně vodorovně a svisle** (nikdy šikmo!) ve vymezených zónách:
* **Vodorovné zóny (šířka 300 mm):**
  * **Horní vodorovná zóna (ZV-H):** od **150 mm do 450 mm** pod dokončeným stropem.
  * **Dolní vodorovná zóna (ZV-D):** od **150 mm do 450 mm** nad dokončenou podlahou.
  * **Střední vodorovná zóna (ZV-S):** od **900 mm do 1200 mm** nad podlahou (nad pracovní deskou v kuchyni).
* **Svislé zóny (šířka 100 mm):**
  * **Rohové, dveřní a okenní zóny:** od **100 mm do 200 mm** od neomítnutého rohu místnosti, hrany dveřního nebo okenního otvoru.
* **Doporučené výšky přístrojů nad podlahou:** vypínače **1050 mm** (900 až 1200 mm), běžné zásuvky **300 mm** (min. 200 mm), zásuvky nad kuchyňskou linkou **1150 až 1250 mm**.

---

### 2. Ukládání kabelů v zemi, přípojková skříň (HDS) a staveniště:
* **Výstražná fólie v kabelové rýze (ČSN 73 6005):** Nad silnoproudé kabely uložené v zemi se klade výstražná plastová fólie **ČERVENÉ barvy** *(modrá je pro vodovod, žlutá pro plynovod, oranžová/zelená pro sdělovací vedení)*.
* **Umístění přípojkové skříně (HDS) u kabelové přípojky (ČSN 33 3320):** Spodní okraj přípojkové skříně musí být umístěn **alespoň 0,6 m (60 cm) nad definitivně upraveným terénem**.
* **Vedení na staveništi (ČSN 33 2000-7-704):** Aby se zabránilo mechanickému poškození, **nemají být kabely na staveništi pokládány přes cesty nebo ochozy** (kde je to nevyhnutelné, musí být chráněny pevnými přejezdy/chráničkami proti poškození stavebními stroji).

---

### 3. Zásady spojování vodičů (Kritérium NSK 3d) a pohyblivé přívody:
* Všechny spoje vodičů musí být umístěny **v přístupných krabicích, rozvaděčích nebo přístrojích** (zákaz zazdění volného spoje do omítky!).
* **Spojování mědi (Cu) a hliníku (Al):** Měď a hliník se **NESMÍ spojit přímo na sebe** v obyčejné svorce! V přítomnosti vzdušné vlhkosti vzniká elektrochemický článek (elektrolytická koroze), hliník zoxiduje, teče pod tlakem šroubu, přechodový odpor vzroste a spoj vyhoří. Pro spojení Cu a Al se musí použít **speciální oddělené svorky (CUPAL podložky, bimetalové svorky nebo bezšroubové svorky WAGO s kontaktní pastou Alu-Plus)**.
* **Slaněné vodiče (licny):** Při zapojení do běžné šroubové svorky se musí konec slaněného vodiče zalisovat **kabelovou dutinkou**. **Pocínování konců pájkou do šroubových svorek je ZAKÁZÁNO** (cín pod tlakem šroubu teče, spoj se uvolní a hrozí požár!).
* **Pohyblivé a prodlužovací přívody:**
  * Při volbě průřezu žil pohyblivých prodlužovacích přívodů je nutno přihlédnout především **ke jmenovitému proudu použité vidlice** (a délce přívodu).
  * Na vstupech do přístrojů a vidlic musí být zajištěny **proti vytržení a zkroucení žil** vývodkou se sponou odlehčující tah, a ochranný vodič **PE musí být ponechán o něco delší** než pracovní vodiče L a N (aby se při násilném vytržení kabelu přetrhla nejprve fáze a PE zůstal zapojen jako poslední!).

---

### 4. Vnější vlivy (ČSN 33 2000-5-51 ed. 3) a požární prostupy:
* **Značení vnějších vlivů (2 písmena + číslo):**
  * **A** = prostředí: **AA** teplota okolí (AA4 = −5 až +40 °C), **AD** přítomnost vody (AD1 = zanedbatelná, AD2 = kapající, AD4 = stříkající → krytí min. IPX4).
  * **B** = využití a schopnost osob: **BA1** = laici (běžné osoby), **BA2** = děti, **BA3** = osoby se zdravotním postižením, **BA4** = osoby poučené (§ 4), **BA5** = osoby znalé (elektrotechnici § 6/§ 7).
  * **C** = konstrukce budov: **CA1** = nehořlavé podklady, **CA2** = hořlavé stavební hmoty (dřevostavby).
* **Prostupy požárně dělicími stěnami:** Každý prostup kabelové trasy přes požární stěnu nebo strop musí být utěsněn **certifikovanou protipožární ucpávkou** (zpěňující tmel, protipožární manžeta, minerální desky s ablativním nátěrem) se stejnou požární odolností (např. **EI 60**), aby oheň a jedovatý kouř neprošly do sousedního požárního úseku.`,
        keyTakeaways: [
          'Instalační zóny: vodorovné 150–450 mm od stropu/podlahy; svislé 100–200 mm od rohů, oken a dveří.',
          'Výstražná fólie nad silnoproudým kabelem v zemi je ČERVENÁ; přípojková skříň HDS musí být min. 0,6 m nad terénem.',
          'Zákaz přímého spojování Cu + Al a zákaz cínování licen pod šroubové svorky!',
          'U pohyblivého přívodu musí být vodič PE delší než L a N; průřez prodlužovacího přívodu se volí podle jmenovitého proudu vidlice.'
        ],
        examTips: [
          'Zkoušející se často ptá na praktický detail u pohyblivého přívodu (prodlužovačky nebo přívodu ke stroji): Který vodič ve vidlici musí být nejdelší a proč? Zeleno-žlutý ochranný vodič PE, aby se při vyškubnutí šňůry vytrhl ze svorky až jako poslední po odpojení fáze!'
        ]
      }
    ]
  },
  {
    id: 4,
    slug: 'technicka-dokumentace-a-normy',
    code: '26-017-H/04',
    title: 'Používání technické dokumentace a norem při instalacích',
    shortDescription: 'Čtení jednopólových a liniových schémat rozvaděčů, schematické značky ČSN EN 60617, impulzní relé a značení prvků ČSN EN 81346-2.',
    iconName: 'FileText',
    totalQuestions: 32,
    subchapters: [
      {
        id: '4-1',
        title: 'Druhy elektrotechnických výkresů a čtení schémat rozvaděčů',
        standardRefs: ['ČSN EN 61082-1', 'ČSN EN 81346-2'],
        content: `### 1. Základní druhy dokumentace v elektroinstalacích:
1. **Přehledové (jednopólové) schéma:**
   * Vícežilová vedení jsou zakreslena **jedinou čarou** opatřenou šikmými čárkami nebo číslem udávajícím počet žil (např. \`/3\` nebo \`/5\`).
   * Slouží jako hlavní výkres bytového a průmyslového rozvaděče – přehledně ukazuje hlavní vypínač, SPD, chrániče, jističe jednotlivých vývodů, průřezy kabelů a názvy obvodů.
2. **Obvodové (vícepólové / liniové) schéma:**
   * Zobrazuje **všechny vodiče a svorky jednotlivě** v rozloženém stavu podle proudových cest (bez ohledu na skutečnou fyzickou polohu součástek).
   * Ideální pro pochopení funkce složitějších ovládacích obvodů (stykačové kombinace, impulzní relé, křížové přepínače) a vyhledávání poruch.
3. **Zapojovací schéma (schéma připojení):**
   * Zobrazuje skutečné rozmístění svorkovnic a přístrojů a přesné zapojení jednotlivých žil kabelů na konkrétní čísla svorek.
4. **Situační výkres (instalační půdorys):**
   * Stavební půdorys podlaží se zakreslenými značkami zásuvek, spínačů, svítidel, rozvaděčů a trasami kabelů.

---

### 2. Referenční označování prvků ve schématech (ČSN EN 81346-2):
* **F** – Ochranné a jistící přístroje (**FA** nadproudový jistič, **FU** tavná pojistka, **FR** tepelné nadproudové relé, **FS** přepěťová ochrana SPD).
* **Q** – Spínací přístroje v silových obvodech (**QM** hlavní vypínač, **QF** výkonový jistič / proudový chránič / jističochránič, **QA** výkonový stykač).
* **K** – Relé a stykače v řídicích obvodech (**KM** stykač, **KA** pomocné nebo impulzní relé, **KT** časové relé / schodišťový automat).
* **S** – Ovládací spínače a tlačítka (**SA** spínač/přepínač, **SB** tlačítko/ovladač).
* **E / H** – Světelné zdroje a signalizace (**EL** svítidlo, **HL** signální kontrolka, **HA** zvonek/houkačka).
* **X** – Svorkovnice, konektory a zásuvky (**XD** silová zásuvka, **XT** řadová svorkovnice).
* **M** – Elektromotor.
* **T** – Transformátor.`,
        keyTakeaways: [
          'Jednopólové schéma = přehled rozvaděče jednou čarou; Obvodové schéma = každý vodič a kontakt zvlášť.',
          'Značení dle ČSN EN 81346-2: F = jištění, Q = silové spínání, K = relé/stykače, S = ovladače, X = svorky/zásuvky, E = svítidla.'
        ],
        examTips: [
          'Zkoušející ti ukáže výkres rozvaděče s nápisem u přístroje: „QF1: RCBO B16/1N/0,03A-A, 10kA“ a zeptá se, co to znamená. Odpověď: Jde o kombinovaný jističochránič (RCBO), jmenovitý proud 16 A s vypínací charakteristikou B, 1 fázový pól + spínaný N pól (1+N), jmenovitý reziduální proud 30 mA (0,03 A), typ A (pro střídavé i pulzní proudy), zkratová odolnost 10 kA.'
        ]
      },
      {
        id: '4-2',
        title: 'Schematické značky spínačů, zásuvek a přístrojů (ČSN EN 60617)',
        standardRefs: ['ČSN EN 60617'],
        content: `### 1. Schematické značky domovních spínačů v půdorysech:
* **Spínač č. 1 (jednopólový vypínač):** Kruh s jednou šikmou čárkou a **jedním praporkem (háčkem)**.
* **Spínač č. 2 (dvoupólový vypínač):** Kruh s jednou čárkou a **dvěma souběžnými příčnými čárkami u praporku** (současně rozpíná L i N).
* **Spínač č. 5 (sériový / lustrový přepínač):** Kruh se **dvěma samostatnými čárkami s praporky mířícími na stejnou stranu** (dvě klapky v jednom přístroji).
* **Spínač č. 6 (střídavý / schodišťový přepínač):** Kruh s jednou čárkou procházející středem, která má **praporky na OBOU koncích v opačném směru**.
* **Spínač č. 7 (křížový přepínač):** Kruh se **dvěma překříženými čárkami do tvaru X** s praporky na všech čtyřech koncích.
* **Zapuštěný ovladač č. 1/0 (tlačítko pro impulzní relé či zvonek):** Kruh se soustředným menším kroužkem uvnitř (nebo značka spínacího kontaktu s vratnou pružinou – trojúhelníčkem).

### 2. Značky zásuvek a ostatních prvků:
* **Jednofázová zásuvka s ochranným kolíkem (230 V):** Půlkruh na čáře stěny s kolmou čárkou ochranného kontaktu uprostřed a čárkou nahoře.
* **Dvojzásuvka:** Půlkruh s číslicí **2** (nebo dvěma čárkami).
* **Zásuvka s krytím proti vodě (např. IP 44):** Značka zásuvky uzavřená v rámečku nebo doplněná označením **IP 44** / symbolem kapky.
* **Třífázová zásuvka (400 V):** Značka zásuvky se třemi čárkami (nebo číslicí 3).
* **Svítidlo:** Křížek **×** (obecné svítidlo) nebo kruh s křížkem uvnitř **⊗**; zářivkové svítidlo se značí úsečkou s kolmými patkami na koncích **|—|**.
* **Impulzní (paměťové / krokové) relé:** Obdélníček cívky rozdělený na dvě části se symbolem klopného schodu (pulsního přepínání).`,
        keyTakeaways: [
          'Značky spínačů: č. 1 (1 čárka, 1 háček), č. 5 (2 čárky stejným směrem), č. 6 (1 čárka, háčky na obou koncích opačně), č. 7 (kříž X se 4 háčky).',
          'Zářivka = úsečka s kolmými čárkami na koncích; žárovkové/LED svítidlo = křížek ×.',
          'Zásuvka s ochranným kolíkem má kolmou čárku uprostřed půlkruhu.'
        ],
        examTips: [
          'Kritérium 4a v Hodnoticím standardu NSK zní: „Rozlišit na výkresech schematické elektrotechnické značky obvodových prvků a součástek“. Zkoušející si nejčastěji ověřuje rozdíl mezi spínačem č. 5, č. 6 a č. 7 a značkou proudového chrániče vs. jističe!'
        ]
      }
    ]
  },
  {
    id: 5,
    slug: 'naradi-pomucky-a-meridla',
    code: '26-017-H/05',
    title: 'Volba postupu práce, nářadí, pomůcek a měřidel',
    shortDescription: 'Plánování postupu práce, izolované nářadí 1000 V (ČSN EN 60900), přesný postup měření při revizi (spojitost PE ≥ 200 mA, Riso 500 V DC, Zs a RCD).',
    iconName: 'Wrench',
    totalQuestions: 17,
    subchapters: [
      {
        id: '5-1',
        title: 'Plánování pracovního postupu, volba nářadí a práce do 1000 V',
        standardRefs: ['ČSN EN 60900 ed. 3', 'ČSN EN 50110-1 ed. 3'],
        content: `### 1. Naplánování pracovního postupu elektrické instalace (Kritérium NSK 5a):
Před zahájením jakékoliv montáže musí montér dodržet tento metodický postup:
1. **Prostudování technické dokumentace a schémat:** Kontrola jednopólového a obvodového schématu, umístění prvků a požadovaných průřezů.
2. **Příprava materiálu, nářadí, měřidel a OOPP:** Vizuální kontrola nepoškozenosti izolovaného nářadí a platnosti kalibrace měřidel.
3. **Zajištění pracoviště (5 bezpečnostních pravidel):** Vypnutí přívodu, uzamčení (LOTO), vyvěšení tabulky, ověření beznapěťového stavu dvoupólovou zkoušečkou (test před a po).
4. **Mechanická montáž a uložení vedení:** Osazení krabic, rozvaděče, vložení kabelů v instalačních zónách.
5. **Zapojení vodičů do svorek:** Odizolování správné délky (nesmí koukat holá měď mimo svorku ani nesmí být skřípnutá izolace pod šroubem!), nalisování dutinek na licny, dotažení předepsaným momentem.
6. **Kontrola a měření před připojením k síti (bez napětí):** Vizuální prohlídka, měření spojitosti PE a izolačního odporu Riso.
7. **Připojení k síti a měření pod napětím:** Ověření sledu fází, impedance smyčky Zs, vybavení proudového chrániče RCD a funkční zkouška.
8. **Zápis do dokumentace a předání pracoviště.**

---

### 2. Izolované ruční nářadí pro práci do 1000 V AC / 1500 V DC (ČSN EN 60900):
* Každý kus izolovaného nářadí (šroubováky, kleště, odizolovávací nože) musí být označen:
  * **Symbolem dvou překrývajících se trojúhelníků**,
  * Údajem **1000 V** (pro AC; platí pro 1500 V DC),
  * Číslem normy **IEC / EN 60900**.
* Často se používá **dvouvrstvá dvoubarevná izolace** (např. žlutá pod červenou): pokud se vrchní červená vrstva prodře a prosvítá spodní žlutá, je nářadí vyřazeno z používání pod napětím!`,
        keyTakeaways: [
          'Izolované nářadí do 1000 V AC / 1500 V DC má symbol dvojitého trojúhelníku a normu EN 60900.',
          'Při zapojení svorky nesmí být skřípnutá izolace pod šroubem a nesmí vyčnívat holý vodič ven ze svorky.',
          'Slaněné vodiče (licny) se do šroubových svorek lisují dutinkami.'
        ],
        examTips: [
          'Zkoušející sleduje přípravu vodiče: Pokud odizoluješ příliš dlouhý kus mědi a ze svorky jističe nebo zásuvky ti kouká 5 mm holého drátu, zkoušející ti strhne body za nebezpečí dotyku živé části! Naopak pokud zašroubuješ svorku přes plastovou izolaci, spoj nebude vodit.'
        ]
      },
      {
        id: '5-2',
        title: 'Pořadí revizních měření a měření spojitosti ochranných vodičů (ČSN 33 2000-6 ed. 2)',
        standardRefs: ['ČSN 33 2000-6 ed. 2', 'ČSN EN 50699', 'ČSN 33 1600 ed. 2 Z2'],
        content: `Podle normy **ČSN 33 2000-6 ed. 2** se při ověřování elektrické instalace (před uvedením do provozu) musí dodržet **přesné pořadí úkonů**, aby nedošlo k ohrožení osob při zapnutí napětí:

### FÁZE A: Prohlídka a měření BEZ NAPĚTÍ (před zapnutím sítě):
1. **Vizuální prohlídka instalace** (kontrola barev vodičů, průřezů, jištění, dotažení svorek, popisků).
2. **Měření spojitosti ochranných vodičů (PE) a ochranného pospojování:**
   * Měří se přístrojem se zdrojem napětí naprázdno **4 V až 24 V** (DC nebo AC) a **zkušebním proudem minimálně 200 mA (0,2 A)**!
   * Ověřuje se, že ochranný kolík každé zásuvky, kostra každého spotřebiče třídy I a kovové trubky v koupelně jsou spojitě vodivě propojeny s hlavní ochrannou přípojnicí PE v rozvaděči (odpor bývá typicky **do 0,1 až 1 Ω** podle délky vodiče).
   * **Odpor ochranného vodiče PE u ručního nářadí a spotřebičů třídy ochrany I (dle ČSN EN 50699 a ČSN 33 1600 ed. 2 Z2):**
     * Mezi ochrannou dutinkou vidlice a přístupnou kovovou částí spotřebiče/nářadí s přívodním kabelem délky **do 5 m** nesmí odpor ochranného vodiče překročit **0,3 Ω** (na každých dalších 7,5 m délky se přičítá 0,1 Ω, celkem max. **1,0 Ω**). *(Pozn.: Ve starších testech před změnou Z2 se uváděla dřívější hodnota **0,2 Ω** pro přívod do 3 m).*
3. **Měření izolačního odporu elektrické instalace (Riso):**
   * Měří se stejnosměrným napětím **500 V DC**, požadavek **Riso ≥ 1,0 MΩ**.
4. **Ověření ochrany SELV / PELV / elektrického oddělení.**

### FÁZE B: Měření POD NAPĚTÍM (po zapnutí sítě):
5. **Ověření sledu fází** (v třífázových zásuvkách – pravotočivé pole L1 → L2 → L3).
6. **Měření impedance poruchové smyčky (Zs)** – ověření samočinného odpojení jističem.
7. **Ověření funkce proudových chráničů (RCD)** – vybavovací proud IΔ a čas ta.
8. **Měření úbytku napětí a funkční zkouška instalace.**`,
        keyTakeaways: [
          'Zásadní pravidlo: Nejprve se měří BEZ NAPĚTÍ (1. spojitost PE proudem ≥ 200 mA, 2. izolační odpor Riso 500 V DC) a teprve když vyhoví, smí se zapnout napětí a měřit Zs a RCD!',
          'Spojitost ochranného vodiče PE se měří malým napětím 4–24 V při proudu alespoň 200 mA.',
          'U spotřebičů a nářadí třídy I do 5 m délky přívodu smí být odpor PE max. 0,3 Ω (dle ČSN EN 50699 / ČSN 33 1600 ed. 2 Z2; dříve 0,2 Ω do 3 m).'
        ],
        examTips: [
          'Velmi častá otázka zkoušejícího: „V jakém pořadí budete měřit nově zapojený panel a proč?“ Pokud řekneš, že nejdřív zapneš jistič a změříš impedanci smyčky, je to hrubá chyba! Nejdříve musíš bez napětí změřit spojitost PE a izolační odpor Riso, abys měl jistotu, že v obvodu není zkrat a že na kostře nebude po zapnutí fáze!'
        ]
      },
      {
        id: '5-3',
        title: 'Měření izolačního odporu (Riso)',
        standardRefs: ['ČSN 33 2000-6 ed. 2'],
        content: `### Účel a podmínky měření izolačního stavu:
Měření izolačního odporu (přístrojem „megmet“ / testerem instalací) odhalí poškozenou izolaci, provrtaný kabel, zavlhlé krabice nebo svod mezi vodiči.
* **Měří se VÝHRADNĚ V BEZNAPĚŤOVÉM STAVU!**
* **Před měřením se musí odpojit spotřebiče a přepěťové ochrany (SPD)** – zkušební napětí 500 V DC by přes varistory SPD nebo elektroniku spotřebičů vykazovalo falešný svod (nebo by elektroniku zničilo).
* Vypínače světelných okruhů se sepnou (bez žárovek), aby se proměřil celý kabel až ke svítidlu.
* Měří se mezi **všemi pracovními vodiči navzájem** (L1–L2, L2–L3, L1–L3, L–N) a mezi **každým pracovním vodičem a ochranným vodičem PE** (L1–PE, L2–PE, L3–PE, N–PE).

### Normové hodnoty dle tabulky 6.1 ČSN 33 2000-6 ed. 2:
* **Obvody SELV a PELV (do 50 V):**
  * Zkušební napětí: **250 V DC** → minimální izolační odpor **Riso ≥ 0,5 MΩ**.
* **Běžné instalace do 500 V včetně (sítě 230 V / 400 V) a FELV:**
  * Zkušební napětí: **500 V DC** → minimální izolační odpor **Riso ≥ 1,0 MΩ**.
* **Instalace nad 500 V do 1000 V:**
  * Zkušební napětí: **1000 V DC** → minimální izolační odpor **Riso ≥ 1,0 MΩ**.`,
        keyTakeaways: [
          'Pro sítě 230/400 V: zkušební napětí 500 V DC, minimální hodnota Riso ≥ 1,0 MΩ.',
          'Pro SELV a PELV: zkušební napětí 250 V DC, minimální hodnota Riso ≥ 0,5 MΩ.',
          'Měří se vždy bez napětí mezi L–N, L–PE a N–PE (při odpojených spotřebičích a SPD).'
        ],
        examTips: [
          'Co když v rozvaděči nelze odpojit přepěťovou ochranu SPD nebo elektronické přístroje a napětí 500 V DC nelze použít? Norma ČSN 33 2000-6 ed. 2 připouští v takovém výjimečném případě snížit zkušební napětí na 250 V DC, ale izolační odpor musí být i pak minimálně 1,0 MΩ!'
        ]
      },
      {
        id: '5-4',
        title: 'Měření impedance poruchové smyčky (Zs) a test proudového chrániče (RCD)',
        standardRefs: ['ČSN 33 2000-4-41 ed. 3', 'ČSN 33 2000-6 ed. 2'],
        content: `### 1. Měření impedance poruchové smyčky (Zs – L proti PE):
Impedance smyčky **Zs** je celková impedance cesty poruchového proudu (vinutí transformátoru → fázový vodič L → místo poruchy → ochranný vodič PE → zpět do uzlu trafa). Měří se **pod napětím 230 V** na nejvzdálenějším místě obvodu (poslední zásuvka).

#### Podmínka samočinného odpojení od zdroje:
📐 Zs · Ia ≤ U0   ⇒   Zs,max = U0 / Ia
* **U0 = 230 V** (jmenovité fázové napětí proti zemi).
* **Ia** = proud zajišťující okamžité vypnutí jističe do 0,4 s:
  * Charakteristika **B**: **Ia = 5 · In** *(pro B10 je Ia = 50 A → Zs,max = 4,60 Ω; pro B16 je Ia = 80 A → Zs,max = 2,875 Ω)*
  * Charakteristika **C**: **Ia = 10 · In** *(pro C16 je Ia = 160 A → Zs,max = 1,437 Ω)*
  * Charakteristika **D**: **Ia = 20 · In** *(pro D16 je Ia = 320 A → Zs,max = 0,718 Ω)*

#### Přepočet na měření za studena (bezpečnostní součinitel 2/3, resp. 1,5):
Protože měříme malým proudem u studených vodičů a při skutečném zkratu se vodiče zahřejí a jejich odpor vzroste, musí naměřená hodnota **Zs,měř** splnit přísnější podmínku:
📐 Zs,měř ≤ (2 / 3) · (U0 / Ia) = Zs,max / 1,5
* **Maximální naměřená hodnota Zs,měř za studena:**
  * Pro jistič **B10**: max. **3,06 Ω** (teoretická 4,60 Ω)
  * Pro jistič **B16**: max. **1,91 Ω** (teoretická 2,875 Ω)
  * Pro jistič **C16**: max. **0,95 Ω** (teoretická 1,437 Ω)

---

### 2. Revizní měření proudového chrániče (RCD s IΔn = 30 mA):
1. **Skutečný vybavovací reziduální proud (IΔ) – test náběžným proudem (rampou):**
   * Chránič **NESMÍ vybavit** při proudu menším než **0,5 × IΔn** (**< 15 mA**) a **MUSÍ vybavit** nejpozději při **1,0 × IΔn** (**≤ 30 mA**).
   * Správné rozmezí vybavení pro 30mA chránič je tedy **15 mA až 30 mA** (typicky 20–25 mA).
2. **Doba odpojení (ta):**
   * Při jmenovitém proudu **1 × IΔn (30 mA):** musí vybavit do **300 ms** (u přenosných PRCD do 200 ms; v praxi vybavuje za 15–30 ms).
   * Při pětinásobku **5 × IΔn (150 mA):** musí vybavit do **40 ms**.
3. **Dotykové napětí UB na ochranném vodiči PE:** nesmí překročit **50 V AC** (resp. 25 V AC).`,
        keyTakeaways: [
          'Teoretická mez Zs = 230 / Ia; mez při měření za studena = (2/3) · (230 / Ia) = Zs / 1,5.',
          'Pro jistič B16: Ia = 80 A, teoretická Zs,max = 2,875 Ω, dovolená naměřená za studena = 1,91 Ω.',
          'Chránič 30 mA musí vybavit při proudu mezi 15 mA a 30 mA a v čase < 300 ms (při 1× IΔn), resp. < 40 ms (při 5× IΔn).'
        ],
        examTips: [
          'Zkoušející se zeptá: Proč existuje na revizním přístroji funkce měření impedance smyčky „RCD / No-trip“? Protože běžné měření impedance smyčky Zs mezi L a PE posílá do PE zkušební proud několik ampérů, což okamžitě vyhodí proudový chránič 30 mA! Režim „No-trip“ měří malým proudem pod 15 mA (nebo s předmagnetizací), aby chránič při měření Zs nespadl.'
        ]
      }
    ]
  },
  {
    id: 6,
    slug: 'provadeni-instalaci-a-montaz',
    code: '26-017-H/06',
    title: 'Provádění elektrických instalací, jejich montáže a zapojování',
    shortDescription: 'Spínače 1, 5, 6, 7, impulzní (paměťové) relé, zásuvkové okruhy, bytová rozvodnice, pospojování, koupelny (ČSN 33 2000-7-701) a zápis do dokumentace.',
    iconName: 'Cpu',
    totalQuestions: 14,
    subchapters: [
      {
        id: '6-1',
        title: 'Světelné obvody: spínače řazení 1, 5, 6, 7 a impulzní relé',
        standardRefs: ['ČSN 33 2130 ed. 3'],
        content: `### Základní zásada všech světelných obvodů:
* Spínačem se **VŽDY spíná (přerušuje) výhradně fázový vodič L**! Nulový vodič **N** a ochranný vodič **PE** se nikdy nespínají a vedou přímo ke svítidlu.
* U žárovkové objímky (E27/E14) musí být spínaná fáze **L** připojena vždy na **středový (spodní) kontakt** a nulový vodič **N** na **závit objímky** (ochrana před dotykem při šroubování žárovky).
* **Maximální jištění světelného obvodu (ČSN 33 2130 ed. 3):** V běžných bytech se koncové světelné obvody jistí jističem **10 A** (kabel 1,5 mm² Cu). V průmyslových a halových instalacích nesmí jmenovitý proud jistícího přístroje světelného obvodu překročit maximálně **25 A** (vždy však úměrně jmenovitému proudu spínačů a objímek!).
* **Domovní zvonky v budovách s rozvodem plynu:** V objektech s rozvodem topných plynů musí být instalovány pouze **nejiskřící zvonky** (v bezpečném provedení bez jiskřících kontaktů v prostoru s možným únikem plynu).

---

### 1. Přehled klasických spínačů (1, 5, 6, 7):
* **Řazení 1 (jednopólový spínač):** Ovládání 1 svítidla z **1 místa** (2 svorky: přívod L a odchod ke světlu).
* **Řazení 5 (sériový / lustrový spínač):** Dvě nezávislé klapky v jednom přístroji pro ovládání **2 okruhů z 1 místa** (3 svorky: společný přívod L a dva spínané výstupy ke svítidlům).
* **Řazení 6 (střídavý / schodišťový přepínač):** Ve dvojici (**6 + 6**) slouží k ovládání svítidla ze **2 míst**. Má **3 svorky**: do hlavního spínače (6A) jde na kmenovou svorku **L** stálá fáze; dvě výstupní svorky se propojí **dvěma korespondenčními vodiči** se dvěma svorkami druhého spínače (6B); z kmenové svorky **L** druhého spínače (6B) odchází spínaná fáze do svítidla.
* **Řazení 7 (křížový přepínač):** Slouží k ovládání svítidla ze **3 a více míst**. Zapojení má vždy tvar **6 – 7 – 6** (nebo **6 – 7 – 7 – 6**). Křížový spínač má **4 svorky** (2 vstupní korespondenční vodiče a 2 výstupní korespondenční vodiče, které v jedné poloze vede rovně a v druhé poloze překříží).

---

### 2. Světelné obvody ovládané z více míst pomocí IMPULZNÍHO (PAMĚŤOVÉHO) RELÉ (Kritérium NSK 4b):
Při ovládání světla ze 3, 4 a více míst (dlouhé chodby, haly, schodiště) je tahání křížových přepínačů neekonomické. Místo toho se v rozvaděči osadí **impulzní (krokové / bistabilní) relé** (nebo časový **schodišťový automat**) a na stěnách se použijí obyčejná **tlačítka (zapuštěné ovladače č. 1/0)**:
* **Princip funkce impulzního relé:** Každý krátký stisk kteréhokoliv tlačítka pošle proudový impulz do ovládací cívky relé (**svorky A1 – A2**). Relé mechanicky nebo elektronicky překlopí svůj silový spínací kontakt (**svorky 1 – 2**, resp. 11 – 14) do opačného stavu: *1. stisk = rozsvítí, 2. stisk = zhasne*.
* **Jak se zapojují tlačítka:** Všechna tlačítka se zapojují **PARALELNĚ (vedle sebe)**! Do všech tlačítek přichází fáze L a ze všech tlačítek vede společný ovládací vodič na svorku cívky **A1** impulzního relé (svorka cívky **A2** je trvale připojena na nulový vodič **N**). Stačí tak pouze dvoužilové propojení mezi tlačítky!`,
        keyTakeaways: [
          'Spínačem se přerušuje vždy fáze L; u objímky jde fáze na středový kontakt a N na závit.',
          'Maximální jištění světelného obvodu v bytě je 10 A, celkový normový strop pro světelné obvody je max. 25 A.',
          'Ovládání ze 2 míst = 6 + 6; ze 3 míst = 6 – 7 – 6; ze 4 míst = 6 – 7 – 7 – 6.',
          'Impulzní (paměťové) relé: tlačítka (ovladače 1/0) se řadí PARALELNĚ a spínají impulz do cívky A1–A2; silový kontakt 1–2 spíná svítidlo.'
        ],
        examTips: [
          'V Hodnoticím standardu NSK (kritérium 4b) je přímo uvedeno: „Světelné obvody ovládané z několika míst (přepínače, impulzní relé)“. Zkoušející se zeptá: Jak se zapojují tlačítka k impulznímu relé – sériově, nebo paralelně? VŽDY PARALELNĚ! Kdyby byla zapojena sériově, museli byste pro rozsvícení zmáčknout všechna tlačítka na chodbě současně!'
        ]
      },
      {
        id: '6-2',
        title: 'Zásuvkové a silové obvody dle ČSN 33 2130 ed. 3',
        standardRefs: ['ČSN 33 2130 ed. 3'],
        content: `### 1. Požadavky na koncové zásuvkové obvody 230 V:
* **Maximální počet zásuvkových vývodů:** Na jeden obvod jištěný **16 A** lze připojit nejvýše **10 zásuvkových vývodů** (vícenásobná zásuvka v jednom společném rámečku/krabici, např. dvojzásuvka, se počítá jako **1 zásuvkový vývod**!).
* **Maximální soudobý příkon obvodu:** při jištění 16 A max. **3 680 W (3,68 kW)**.
* **Dimenzování:** měděný kabel **CYKY-J 3×2,5 mm²**, jistič **B16**, proudový chránič **≤ 30 mA (typ A)**.
* **Světelné obvody:** měděný kabel **CYKY-J 3×1,5 mm²**, jistič **B10** (max. příkon 2 300 W; na jeden světelný obvod se připojuje max. tolik svítidel, kolik odpovídá jmenovitému proudu nejvýše **10 A** v bytech), rovněž chráněny proudovým chráničem **≤ 30 mA**.

### 2. Normové zapojení zásuvky 230 V (ČSN 33 2130 ed. 3, pohled zepředu, kolík nahoře):
* **Ochranný kolík (nahoře):** ochranný vodič **PE** (zeleno-žlutá).
* **Levá dutinka:** fázový vodič **L** (hnědá, černá nebo šedá).
* **Pravá dutinka:** střední / nulový vodič **N** (světle modrá).
* *Smyčkování (průběžné zapojení):* Při odpojení kterékoliv zásuvky ve smyčce **nesmí dojít k přerušení ochranného vodiče PE** pro následující zásuvky!

### 3. Samostatné obvody pro spotřebiče a akumulační kamna:
* Samostatný zásuvkový nebo pevný obvod musí být zřízen pro spotřebiče o příkonu **2 000 W (2 kW) a vyšším** (pračka, myčka, sušička, elektrická trouba, mikrovlnná trouba, bojler, přímotop) a také pro kotel vytápění či chladničku s mrazákem.
* Pro elektrický sporák / varnou desku v bytě se připravuje třífázový přívod **CYKY-J 5×2,5 mm²** (nebo 5×4 mm²) jištěný třípólovým jističem **B16**.
* **Elektrická akumulační kamna (ČSN 33 2130 ed. 3):** Musí být připojena k elektrickému rozvodu **výhradně pevným přívodem** (ze svorkovnice přes spínač/stykač, nikoliv běžnou vidlicí do zásuvky!).`,
        keyTakeaways: [
          'Zásuvkový obvod 16 A: kabel Cu 2,5 mm², max. 10 zásuvkových vývodů, max. 3680 W, RCD 30 mA.',
          'Zapojení zásuvky zepředu (kolík nahoře): kolík = PE (zeleno-žlutá), VLEVO = fáze L, VPRAVO = nulák N (modrá).',
          'Samostatný obvod pro každý spotřebič s příkonem ≥ 2 kW; elektrická akumulační kamna musí být připojena pevným přívodem.'
        ],
        examTips: [
          'Pomůcka pro zapojení zásuvky u zkoušky: Když se díváš na zásuvku zepředu a kolík je nahoře, fáze je VLEVO (jako srdce člověka).'
        ]
      },
      {
        id: '6-3',
        title: 'Uspořádání bytové rozvodnice, uzemnění, pospojování a dokumentace',
        standardRefs: ['ČSN 33 2000-5-53', 'ČSN 33 2000-5-54 ed. 3', 'ČSN EN 61439-3', 'ČSN EN 60204-1 ed. 3'],
        content: `### 1. Skladba a zapojení domovní rozvodnice (DBO dle ČSN EN 61439-3):
* **Hlavní vypínač rozvaděče (QM):** Umožňuje vypnout celou rozvodnici jedním úkonem.
* **Svodič přepětí SPD (FS):** Umisťuje se ihned za hlavní vypínač, spojení s ochrannou přípojnicí PE musí být co nejkratší (≤ 0,5 m).
* **Rozdělení na více proudových chráničů (RCD / RCBO):** Instalace se rozděluje do více skupin (min. 2 chrániče nebo samostatné jističochrániče RCBO), aby porucha jednoho spotřebiče neodpojila celý byt včetně osvětlení a lednice.
* **Rezerva v rozvaděči:** Rozvaděč se navrhuje s prostorovou rezervou alespoň **20 až 30 %** volných modulů (a dodržením max. oteplení přístrojů).
* **Nulové (N) a ochranné (PE) sběrnice:**
  * V rozvaděči je jedna hlavní ochranná sběrnice **PE**. **Pod jeden připojovací šroub (do jedné svorky) na sběrnici PE smí být připojen VŽDY POUZE JEDEN ochranný vodič PE!**
  * **Každý proudový chránič MUSÍ mít svou vlastní, elektricky oddělenou sběrnici N!** Nulový vodič obvodu, jehož fáze jde přes Chránič 1, musí být připojen výhradně na N sběrnici Chrániče 1!

---

### 2. Uzemnění, zemniče a ochranné pospojování (ČSN 33 2000-5-54 ed. 3):
* **Ukládání zemničů v zemi:**
  * Vodorovné páskové nebo drátové zemniče se ukládají do nezámrzné hloubky **0,8 m až 1,5 m** pod povrchem země.
  * Svislé (tyčové) zemniče zapojené paralelně vedle sebe musí mít vzájemnou vzdálenost **minimálně rovnou délce jednotlivých tyčí** (aby se jejich zemní odporová pole vzájemně neovlivňovala).
  * **Co se NESMÍ použít jako náhodný zemnič:** Kovové ploty, zábradlí, potrubí hořlavých kapalin a plynů nebo potrubí ústředního vytápění! (Jako náhodný zemnič lze využít např. železobetonové základy budovy – základový zemnič – nebo kovové konstrukce pevně spojené se zemí).
* **Hlavní ochranné pospojování (v místě vstupu sítí do budovy):**
  * Spojuje **hlavní uzemňovací svorkovnici (MET / HOP)**, ochranný vodič PEN/PE, uzemňovací přívod od základového zemniče, svod hromosvodu (LPS) a cizí vodivé části vstupující do budovy (kovové potrubí vody, plynu, ústředního topení, ocelové konstrukce).
  * Minimální průřez vodiče hlavního pospojování: **6 mm² Cu** (nebo 16 mm² Al, příp. 50 mm² Fe).
* **Doplňkové ochranné pospojování (např. koupelny, kotelny):**
  * Minimální průřez měděného vodiče: **2,5 mm² Cu** (pokud je chráněn proti mechanickému poškození, např. v trubce/pod omítkou) nebo **4 mm² Cu** (pokud není mechanicky chráněn).

---

### 3. Dveře elektrických provozoven a obvody nouzového zastavení (ČSN 33 2000-5-53, ČSN EN 60204-1 ed. 3):
* **Dveře rozvoden a elektrických provozoven:** Musí se otevírat **směrem VEN z elektrické provozovny**! Z vnější strany mají pevnou kouli a zámek na klíč (proti vstupu nepovolaných osob), ale **z vnitřní strany musí mít kliku nebo panikové kování**, které umožní okamžité otevření a únik zevnitř ven **i v případě, že jsou dveře zvenku uzamčeny na klíč**!
* **Obvody nouzového zastavení / vypnutí (Emergency Stop / CENTRAL STOP):**
  * Musí odpojit od přívodu **všechny živé (pracovní) vodiče kromě vodiče PEN / PE**.
  * Ovládací obvod musí pracovat na principu **klidového proudu (podpěťového vybavení)** – tj. musí bezpečně vypnout stroj i při **ztrátě (poklesu) napětí na cívce stykače** nebo při přerušení ovládacího vodiče k tlačítku STOP!

---

### 4. Záznam o výsledcích práce do technické dokumentace (Kritérium NSK 6f):
Po dokončení montáže a proměření je montér povinen:
1. **Trvale a čitelně označit všechny jistící a spínací prvky v rozvaděči** (štítky s přesným popisem obvodu, např. *„FA1 – Zásuvky kuchyně“*) a vložit do dveří rozvaděče **aktuální jednopólové schéma**.
2. **Zaznamenat změny do dokumentace skutečného provedení stavby** (zakreslení skutečných tras kabelů, umístění krabic, změn oproti projektu ČSN 33 2000-6 ed. 2).
3. **Zapsat naměřené hodnoty (spojitost PE, Riso, Zs, RCD)** do protokolu o kontrole a zkoušce, který slouží jako podklad pro revizního technika (§ 8) k vypracování Zprávy o výchozí revizi.`,
        keyTakeaways: [
          'Každý proudový chránič musí mít vlastní izolovanou nulovou sběrnici N; pod jeden šroub na PE sběrnici smí přijít vždy jen 1 ochranný vodič PE.',
          'Zemniče v zemi: hloubka 0,8–1,5 m; vzdálenost tyčových zemničů ≥ délka tyče; jako náhodný zemnič nelze použít zábradlí, ploty ani plynovod.',
          'Hlavní ochranné pospojování na MET/HOP: min. 6 mm² Cu; doplňkové pospojování: min. 2,5 mm² Cu (chráněné) nebo 4 mm² Cu (nechráněné).',
          'Dveře el. provozovny se otevírají VEN (zvenku koule/klíč, zevnitř klika pro únik i při uzamčení); nouzové zastavení odpojuje všechny živé vodiče kromě PEN/PE a funguje i při ztrátě napětí.'
        ],
        examTips: [
          'Kritérium 6f v Hodnoticím standardu NSK výslovně vyžaduje: „Provést záznam o výsledcích práce do technické dokumentace“. U zkoušky nikdy nezapomeň po zapojení panelu zapsat naměřené hodnoty (Riso, Zs, IΔ, ta) do zkušebního protokolu a označit prvky v rozvaděči!'
        ]
      },
      {
        id: '6-4',
        title: 'Instalace v koupelnách a sprchách dle ČSN 33 2000-7-701 ed. 2',
        standardRefs: ['ČSN 33 2000-7-701 ed. 2'],
        content: `Prostory s vanou nebo sprchou mají snížený elektrický odpor lidského těla a dělí se na **Zónu 0, Zónu 1, Zónu 2** a prostor mimo zóny:

### Zóna 0 (vnitřní prostor koupací vany nebo sprchové vaničky):
* **Krytí:** minimálně **IPX7** (dočasné ponoření do vody). *(Pozor: u plaveckých bazénů dle ČSN 33 2000-7-702 je v zóně 0 povinné IPX8!).*
* **Dovolené přístroje:** Žádné spínače ani zásuvky! Pouze upevněné spotřebiče výslovně určené pro zónu 0 napájené z **SELV o napětí max. 12 V AC nebo 30 V DC** (zdroj SELV musí být umístěn mimo zóny 0 a 1).

### Zóna 1 (prostor přímo nad vanou/vaničkou do výšky 2,25 m nad podlahou):
* **Krytí:** minimálně **IPX4** (stříkající voda; pokud se čistí tryskající vodou, pak IPX5).
* **Dovolené přístroje:** Žádné zásuvky ani spínače na 230 V! Pouze pevně připojený ohřívač vody (bojler), sprchové čerpadlo, vířivka a ventilátory určené výrobcem do zóny 1, nebo obvody SELV/PELV do **25 V AC / 60 V DC**.

### Zóna 2 (prostor šířky 0,6 m = 60 cm vodorovně od hranice zóny 1, do výšky 2,25 m):
* **Krytí:** minimálně **IPX4**.
* **Dovolené přístroje:** Svítidla, ventilátory, otopná tělesa. **Běžné zásuvky a spínače 230 V jsou v zóně 2 ZAKÁZÁNY!** Výjimkou jsou pouze spínače obvodů SELV a speciální holicí jednotky s oddělovacím transformátorem (ČSN EN 61558-2-5).

### Prostor mimo zóny 0, 1 a 2 (více než 60 cm od vany/sprchy):
* Zde **SMÍ být instalovány běžné zásuvky a vypínače 230 V**.
* **VŠECHNY obvody v koupelně** (zásuvky, světla, bojler, podlahové topení, žebřík) **MUSÍ být chráněny proudovým chráničem s IΔn ≤ 30 mA**!`,
        keyTakeaways: [
          'Zóna 0 (ve vaně): IPX7, pouze SELV do 12 V AC / 30 V DC.',
          'Zóna 1 (nad vanou do 2,25 m): IPX4, pouze pevný bojler/ventilátor nebo SELV do 25 V AC.',
          'Zóna 2 (60 cm od vany do 2,25 m): IPX4, svítidla; zákaz běžných zásuvek 230 V!',
          'Zásuvky 230 V smí být až mimo zónu 2 (> 60 cm od vany) a všechny obvody v koupelně musí mít RCD ≤ 30 mA.'
        ],
        examTips: [
          'Chyták zkoušejícího: Jak se měří zóna 1 u sprchy bez vaničky (walk-in sprchový kout s podlahovým žlábkem)? Pokud sprcha nemá vaničku, zóna 1 je vymezena vodorovnou vzdáleností 120 cm (1,2 m) od středu sprchové hlavice na stěně/stropě a zóna 2 se u sprch bez vaničky vůbec neurčuje!'
        ]
      }
    ]
  },
  {
    id: 7,
    slug: 'diagnostikovani-poruch',
    code: '26-017-H/07',
    title: 'Diagnostikování poruch elektrických instalací',
    shortDescription: 'Systematická metodika hledání závad: přerušený vodič L / N / PE, zkrat L-N (půlení trasy), svod N-PE a prohození vodičů N a PE.',
    iconName: 'Activity',
    totalQuestions: 14,
    subchapters: [
      {
        id: '7-1',
        title: 'Metodický postup vyhledávání závad v instalaci',
        standardRefs: ['Praktická diagnostika', 'ČSN EN 50110-1 ed. 3'],
        content: `V Hodnoticím standardu NSK (kritérium 7b) má uchazeč za úkol: **„Diagnostikovat simulovanou poruchu, rozhodnout o postupu odstranění závady a odstranit ji“**.

### Systematický 4krokový postup při hledání poruchy:
1. **Analýza projevu závady (co a kdy vypadlo):**
   * **Okamžitě padá jistič (s ránou):** Zkrat mezi fází a nulákem (**L–N**) nebo mezi fází a ochranným vodičem (**L–PE**).
   * **Jistič vypadne až po několika minutách provozu:** Tepelné přetížení obvodu (součet příkonů spotřebičů > In jističe).
   * **Padá proudový chránič (RCD), i když jsou všechny 1P jističe vypnuté:** Svod nebo spojení mezi nulovým a ochranným vodičem (**N–PE**).
   * **Padá proudový chránič až v okamžiku zapnutí spotřebiče do zásuvky:** V zásuvce nebo krabici jsou **prohozeny vodiče N a PE** (případně má průraz samotný spotřebič).
   * **Jistič i chránič drží nahoře, ale spotřebič nefunguje:** Přerušený vodič (**L** nebo **N**) v trase.
2. **Odpojení spotřebičů a vylučovací metoda v rozvaděči:**
   * Vytáhnout všechny spotřebiče ze zásuvek (vyloučíme závadu v připojeném spotřebiči).
   * Pokud padá chránič při vypnutých jističích, postupně odpojujeme jednotlivé modré vodiče **N** ze sběrnice N a měříme izolační odpor mezi odpojeným N a PE.
3. **Metoda půlení trasy (u smyčkovaných zásuvek nebo krabic):**
   * Při zkratu nebo přerušení v dlouhém obvodu s 8 zásuvkami nerozebíráme všechny zásuvky popořadě, ale rozpojíme obvod **uprostřed trasy (ve 4. zásuvce/krabici)** a změříme ohmetrem/zkoušečkou spojitosti obě poloviny. Tím ihned víme, zda je porucha v první, nebo druhé polovině vedení!
4. **Oprava závady a kontrolní přeměření:**
   * Po opravě vždy změříme **spojitost PE**, **izolační odpor Riso** a po zapnutí napětí **impedanci smyčky Zs** a **funkci chrániče RCD**.`,
        keyTakeaways: [
          'Jistič padá hned = zkrat (L-N nebo L-PE); jistič padá po čase = přetížení.',
          'Chránič padá při vypnutých 1P jističích = spojení nebo svod mezi N a PE.',
          'Chránič padá až při zapnutí spotřebiče = záměna vodičů N a PE v zásuvce nebo svod ve spotřebiči.',
          'Metoda půlení trasy zrychluje nalezení vadného úseku ve smyčkovaném okruhu.'
        ],
        examTips: [
          'Zkoušející ti na cvičném panelu připraví skrytou závadu. Nikdy nezačínej bezhlavě šroubovat všechny krabice! Nejprve vezmi měřicí přístroj, logicky zdůvodni zkoušejícímu, co měříš, a teprve když měřením určíš přesné místo chyby, vypni obvod dle 5 pravidel a závadu oprav.'
        ]
      },
      {
        id: '7-2',
        title: 'Diagnostika přerušeného vodiče L, N a PE pomocí dvoupólové zkoušečky',
        standardRefs: ['Diagnostika elektroinstalací'],
        content: `Při měření na nefunkční nebo podezřelé zásuvce změříme **dvoupólovou zkoušečkou** napětí ve všech **3 kombinacích zdířek** (**L–N**, **L–PE**, **N–PE**). Z naměřené trojice hodnot okamžitě poznáme přesnou závadu:

### Tabulka diagnostiky zásuvky 230 V:
* **1. Bezvadný stav zásuvky:**
  * **L – N = 230 V** | **L – PE = 230 V** | **N – PE = 0 V** *(fázovka svítí pouze vlevo na L)*.
* **2. Přerušený nulový vodič (N):**
  * **L – N = 0 V** | **L – PE = 230 V** | **N – PE = 0 V** *(fáze i PE jsou v pořádku, do zásuvky nejde modrý nulák N! Pokud je v další zásuvce za přerušením zapnutý spotřebič, projde přes něj fáze i na zdířku N a fázovka svítí na obou dutinkách!).*
* **3. Přerušený ochranný vodič (PE) – SMRTELNĚ NEBEZPEČNÝ STAV:**
  * **L – N = 230 V** | **L – PE = 0 V** | **N – PE = 0 V** *(spotřebič v zásuvce sice normálně funguje, protože L a N jsou pod napětím 230 V, ale mezi L a kolíkem PE naměříme 0 V – kolík není uzemněn!).*
* **4. Přerušený fázový vodič (L):**
  * **L – N = 0 V** | **L – PE = 0 V** | **N – PE = 0 V** *(na levé zdířce L nesvítí ani fázovka; přestože je jistič nahoře, vodič L je ve svorce přerušen).*
* **5. Nebezpečná záměna fáze L a ochranného vodiče PE (fáze na kolíku!):**
  * **L – N = 0 V** | **PE(kolík) – N = 230 V** *(na ochranném kolíku je plné fázové napětí 230 V – při dotyku kovové kostry spotřebiče hrozí smrtelný úraz!).*`,
        keyTakeaways: [
          'L–PE = 230 V, ale L–N = 0 V ⇒ přerušený nulový vodič N.',
          'L–N = 230 V, ale L–PE = 0 V ⇒ přerušený ochranný vodič PE (spotřebič běží, ale kolík nechrání!).',
          'L–N = 0 V a L–PE = 0 V ⇒ přerušený fázový vodič L.',
          'Měření zkratu ohmetrem (pípákem) se provádí VŽDY v beznapěťovém stavu!'
        ],
        examTips: [
          'Pozor na oblíbenou otázku zkoušejícího: „V zásuvce normálně funguje vrtačka, ale revizní přístroj hlásí chybu a nezměří impedanci smyčky Zs. Co je špatně?“ Odpověď: Mezi L a N je 230 V, ale je přerušený ochranný vodič PE na kolíku!'
        ]
      }
    ]
  },
  {
    id: 8,
    slug: 'prvni-pomoc-pri-urazu-proudem',
    code: '26-017-H/08',
    title: 'Poskytování první pomoci při úrazu elektrickým proudem',
    shortDescription: 'Přímé a nepřímé účinky el. proudu na člověka (ČSN IEC 60479-1), bezpečné vyproštění z NN a VN, krokové napětí, KPR 30:2, AED a ošetření popálenin.',
    iconName: 'HeartPulse',
    totalQuestions: 17,
    subchapters: [
      {
        id: '8-1',
        title: 'Přímé a nepřímé účinky elektrického proudu na lidský organismus',
        standardRefs: ['ČSN IEC 60479-1', 'Kritérium NSK 8a'],
        content: `Podle **Hodnoticího standardu NSK (kritérium 8a)** musí uchazeč umět vysvětlit a uvést příklady **přímých a nepřímých účinků** elektrického proudu na člověka.

### 1. Přímé účinky elektrického proudu (způsobené průchodem proudu tělem):
* **Fyziologické (biologické a nervové) účinky:**
  * Dráždění nervové soustavy, bolestivé **tetanické křeče kosterního svalstva** (postižený nemůže otevřít dlaň a pustit sevřený vodič).
  * Křeče dýchacích svalů a bránice → zástava dechu a dušení.
  * **Komorová fibrilace srdce (míhání srdečních komor):** Střídavý proud 50 Hz rozvrátí elektrické řízení srdce, srdeční sval se jen nekoordinovaně chvěje, nečerpá krev do mozku a nastává zástava oběhu.
* **Tepelné účinky (Jouleovo teplo Q = R · I² · t):**
  * Vnitřní prohřátí a destrukce hlubokých tkání, svalů a cév.
  * **Elektrické popáleniny** a tzv. **proudové známky** (šedobílé či příškvarové otisky v místě vstupu a výstupu proudu z těla).
* **Elektrolytické (chemické) účinky:**
  * Rozklad krve, krevní plazmy a buněčných tekutin průchodem proudu (zejména u **stejnosměrného proudu DC**), který může vést k těžké otravě organismu zplodinami rozkladu a selhání ledvin i několik hodin či dní po úrazu!

---

### 2. Nepřímé (druhotné) účinky elektrického proudu:
Vznikají bez přímého průchodu smrtelného proudu srdcem nebo jako sekundární následek leknutí, křeče či elektrického oblouku:
* **Mechanické úrazy po pádu z výšky:** Pád ze žebříku, lešení nebo střechy po leknutí či drobném zásahu proudem (zlomeniny končetin, poranění páteře a lebky).
* **Účinky elektrického oblouku při zkratu:**
  * **Oslnění a zánět spojivek / rohovky (elektrooftalmie):** Poškození zraku intenzivním UV zářením elektrického oblouku.
  * **Popáleniny sálavým teplem a rozstřikem roztaveného kovu** (teplota oblouku přesahuje 4 000 °C).
  * **Akustické trauma (poškození sluchu)** tlakovou vlnou při zkratové explozi a **nadýchání toxických zplodin** hořící izolace kabelů.

---

### 3. Prahové hodnoty střídavého proudu (50 Hz) a faktory závažnosti:
* **0,5 až 1,5 mA:** Práh vnímání (jemné brnění).
* **10 až 15 mA:** **Práh uvolnění (let-go current)** – křeč svalů ruky, postižený se sám nepustí!
* **25 až 50 mA:** Křeč hrudníku a dýchacích svalů, ztráta vědomí.
* **nad 50 až 100 mA:** **Komorová fibrilace srdce** – bez okamžité KPR a defibrilace (AED) nastává smrt!
* **Rozhodující faktory:** Velikost proudu **I** (odpor lidského těla je cca 1000 až 3000 Ω, za mokra klesá pod 500 Ω), **doba průchodu t**, **cesta proudu tělem** (nejnebezpečnější je *levá ruka – nohy* nebo *ruka – ruka* přes srdce) a **frekvence** (50 Hz AC je 4× nebezpečnější než DC).`,
        keyTakeaways: [
          'Přímé účinky: tetanické křeče svalů, komorová fibrilace srdce, tepelné popáleniny, elektrolýza krve (u DC).',
          'Nepřímé účinky: pád z žebříku/výšky po leknutí, poškození zraku UV zářením oblouku (oftalmie), popálení roztaveným kovem.',
          'Práh uvolnění AC: 10–15 mA; práh fibrilace srdce: nad 50 mA.'
        ],
        examTips: [
          'Zkoušející se dle kritéria 8a zeptá: „Vyjmenujte mi přímé a nepřímé účinky elektrického proudu.“ Nezapomeň jasně oddělit přímé (křeče, fibrilace, elektrolýza krve, popáleniny průchodem proudu) a nepřímé (pád ze žebříku po úleku, oslnění obloukem)!'
        ]
      },
      {
        id: '8-2',
        title: 'Vyproštění postiženého, KPR 30:2, AED a ošetření poranění',
        standardRefs: ['Doporučení ERC 2021/2025', 'Zásady první pomoci (Kritérium NSK 8b)'],
        content: `### KROK 1: Bezpečné vyproštění z dosahu proudu (VLASTNÍ BEZPEČNOST!)
* **Nízké napětí (NN do 1000 V):**
  * **NIKDY se nedotýkej postiženého holýma rukama**, dokud je pod napětím!
  * Okamžitě **přeruš přívod proudu**: vypni jistič, hlavní vypínač, stiskni tlačítko TOTAL STOP nebo vytáhni vidlici ze zásuvky.
  * Pokud nelze vypnout ihned: odsuň vodič nebo odtáhni postiženého pomocí **suchého nevodivého předmětu** (suchá dřevěná násada koštěte, plastová trubka, prkno, případně za suchý volný kus jeho oděvu).
* **Vysoké napětí (VN nad 1000 V – např. spadlé vedení):**
  * **NEPŘIBLIŽUJ SE!** Hrozí přeskok oblouku na vzdálenost a smrtelné **krokové napětí** (rozdíl potenciálů na zemi mezi rozkročenýma nohama).
  * Udržuj bezpečnou vzdálenost **minimálně 18 až 20 metrů**. Z nebezpečné zóny ustupuj **snožmo (drobným šoupáním chodidel těsně u sebe – „husím krokem“)**, nikdy nedělej dlouhé kroky! Ihned volej **150 / 112** a dispečink distributora.

---

### KROK 2: Kontrola vědomí a dýchání + volání ZZS (155)
1. **Kontrola vědomí:** Hlasitě oslov postiženého a zatřes mu rameny.
2. **Zprůchodnění dýchacích cest:** Pokud nereaguje, otoč ho na záda, **zakloň mu hlavu a zvedni bradu** (tím se oddálí kořen jazyka od zadní stěny hltanu).
3. **Kontrola dýchání (max. 10 sekund):** Pohledem sleduj hrudník, uchem poslouchej dech u úst. *(Pozor: lapavé dýchání „gasping“ jako kapr na suchu se považuje za ZÁSTAVU DECHU!).*
4. **Volání 155 (nebo 112):** Pokud nedýchá normálně, okamžitě volej **155**, zapni telefon na **hlasitý odposlech (handsfree)** a ihned zahaj resuscitaci!

---

### KROK 3: Kardiopulmonální resuscitace (KPR) a použití AED
* **Poměr stlačení a vdechů u dospělého:** **30 stlačení : 2 vdechy** (pokud nemůžeš dýchat z úst do úst, prováděj nepřetržité stlačování hrudníku).
* **Místo stlačování:** **Střed hrudníku** (dolní polovina hrudní kosti), propnuté lokty kolmo nad hrudníkem.
* **Hloubka stlačení:** **5 až 6 cm**.
* **Frekvence stlačování:** **100 až 120 stlačení za minutu** (cca 2 stlačení za sekundu).
* **Automatizovaný externí defibrilátor (AED):** Jakmile je k dispozici AED, zapni ho, nalep samolepicí elektrody na holý hrudník (jednu pod pravou klíční kost, druhou na levou stranu hrudníku pod podpaží) a přesně plň hlasové pokyny přístroje (při výboji se nikdo nesmí postiženého dotýkat!).

---

### KROK 4: Ošetření popálenin a následná péče
* **Popáleniny od el. proudu:** Chladit čistou studenou vodou (pouze menší plochy), překrýt **sterilním krytím** (nikdy nestrhávat přiškvařený oděv, nepropichovat puchýře a nedávat žádné masti!).
* **DŮLEŽITÉ PRAVIDLO:** Každý člověk zasažený elektrickým proudem (i když je při vědomí a cítí se dobře!) **MUSÍ být vyšetřen lékařem a monitorován na EKG**, protože v důsledku elektrolýzy krve a poškození srdečního svalu může dojít k opožděné fibrilaci a zástavě srdce i několik hodin po úrazu!`,
        keyTakeaways: [
          '1. Vlastní bezpečnost a vypnutí proudu -> 2. Vědomí a záklon hlavy -> 3. Kontrola dechu 10 s -> 4. Volat 155 (hlasitý odposlech) -> 5. KPR 30:2 (hloubka 5–6 cm, 100–120/min) + AED.',
          'U vysokého napětí se nepřibližovat (min. 18–20 m), z místa ustupovat snožmo („husím krokem“) kvůli krokovému napětí.',
          'Každý člověk zasažený el. proudem musí k lékaři na EKG kvůli riziku pozdní arytmie a elektrolýzy krve!'
        ],
        examTips: [
          'U zkoušky (kritérium 8b) musíš postup předvést: Nezapomeň zmínit záklon hlavy pro uvolnění dýchacích cest, kontrolu dechu po dobu 10 sekund, volání 155 na hlasitý reproduktor a to, že i při zdánlivě lehkém zásahu proudem musí postižený k lékaři na pozorování!'
        ]
      }
    ]
  }
];
