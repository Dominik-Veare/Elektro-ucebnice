import { Chapter } from '../types';

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    slug: 'zakladni-pojmy-a-vztahy',
    code: '26-017-H/01',
    title: 'Aplikování základních pojmů a vztahů v elektrotechnice',
    shortDescription: 'Ohmův zákon, Kirchhoffovy zákony, výkony AC/DC, soustavy TN-C/S, TT, IT, SELV/PELV, barvy vodičů a IP krytí.',
    iconName: 'Zap',
    totalQuestions: 20,
    subchapters: [
      {
        id: '1-1',
        title: 'Základní vztahy: Ohmův zákon, odpor, práce a výkon',
        standardRefs: ['Fyzikální základy', 'ČSN IEC 60050'],
        content: `### 1. Ohmův zákon pro stejnosměrný obvod
Základní vztah mezi napětím $U$ [V], proudem $I$ [A] a odporem $R$ [$\\Omega$]:
$$I = \\frac{U}{R} \\quad \\implies \\quad U = I \\cdot R \\quad \\implies \\quad R = \\frac{U}{I}$$

### 2. Odpor vodiče
Elektrický odpor vodiče závisí na měrném odporu materiálu $\\rho$ [$\\Omega \\cdot \\text{mm}^2/\\text{m}$], délce vodiče $l$ [m] a průřezu $S$ [$\\text{mm}^2$]:
$$R = \\frac{\\rho \\cdot l}{S} = \\frac{l}{\\gamma \\cdot S}$$
*kde $\\gamma$ je měrná elektrická vodivost (měď $\\gamma_{\\text{Cu}} \\approx 56\\text{ m}/(\\Omega \\cdot \\text{mm}^2)$, hliník $\\gamma_{\\text{Al}} \\approx 35\\text{ m}/(\\Omega \\cdot \\text{mm}^2)$).*

### 3. Práce a výkon stejnosměrného proudu (DC)
Elektrický příkon/výkon:
$$P = U \\cdot I = I^2 \\cdot R = \\frac{U^2}{R} \\quad [\\text{W - watt}]$$
Elektrická práce / energie:
$$W = P \\cdot t = U \\cdot I \\cdot t \\quad [\\text{J - joule}, \\text{resp. } \\text{Ws}, \\text{kWh}]$$

### 4. Výkony ve střídavém obvodu (AC jednofázový)
Ve střídavém obvodu dochází vlivem indukčnosti a kapacity k fázovému posunu $\\varphi$ mezi napětím a proudem:
* **Činný výkon ($P$):** reálně přeměněný na teplo nebo mechanickou práci.
  $$P = U \\cdot I \\cdot \\cos\\varphi \\quad [\\text{W - watt}]$$
* **Zdánlivý výkon ($S$):** celkový výkon dodávaný ze zdroje do sítě.
  $$S = U \\cdot I \\quad [\\text{VA - voltampér}]$$
* **Jalový výkon ($Q$):** výkon kmitající mezi zdrojem a induktorem/kondenzátorem.
  $$Q = U \\cdot I \\cdot \\sin\\varphi \\quad [\\text{var - voltampér reaktanční}]$$
* **Trojúhelník výkonů:**
  $$S = \\sqrt{P^2 + Q^2}, \\quad \\cos\\varphi = \\frac{P}{S} \\text{ (účiník)}$$

### 5. Třífázový střídavý obvod (symetrický)
Při sdruženém napětí $U = 400\\text{ V}$ a fázovém napětí $U_f = 230\\text{ V}$:
$$P = \\sqrt{3} \\cdot U \\cdot I \\cdot \\cos\\varphi$$
$$S = \\sqrt{3} \\cdot U \\cdot I$$`,
        keyTakeaways: [
          'Ohmův zákon: I = U / R',
          'Činný výkon AC: P = U * I * cos(φ) ve wattech [W]',
          'Zdánlivý výkon AC: S = U * I ve voltampérech [VA]',
          'Při 3f rozvodu násobíme odmocninou ze 3 (cca 1,732)'
        ],
        examTips: [
          'Zkoušející se často zeptá: Jaká je jednotka jalového výkonu? Správná odpověď je var (voltampér reaktanční).',
          'Jaký je rozdíl mezi činným a zdánlivým výkonem u motoru? Činný je skutečná mechanická práce + ztráty tepla, zdánlivý je to, co zatěžuje přívodní kabely a trafo.'
        ]
      },
      {
        id: '1-2',
        title: 'Kirchhoffovy zákony a řazení rezistorů',
        standardRefs: ['Elektrotechnické výpočty'],
        content: `### 1. Kirchhoffův zákon (o uzlech)
Algebraický součet proudů v uzlu se rovná nule (součet proudů vstupujících se rovná součtu vystupujících):
$$\\sum I_k = 0$$

### 2. Kirchhoffův zákon (o smyčkách)
Součet úbytků napětí na spotřebičích v uzavřené smyčce se rovná součtu elektromotorických napětí zdrojů:
$$\\sum U_k = \\sum E_k$$

### Řazení rezistorů / impedancí:
* **Sériové řazení (za sebou):** proud obvodem je stejný, napětí se sčítá.
  $$R_{\\text{celk}} = R_1 + R_2 + \\dots + R_n$$
* **Paralelní řazení (vedle sebe):** napětí je stejné, proudy se sčítají.
  $$\\frac{1}{R_{\\text{celk}}} = \\frac{1}{R_1} + \\frac{1}{R_2} \\quad \\implies \\quad R_{\\text{celk}} = \\frac{R_1 \\cdot R_2}{R_1 + R_2}$$
  *Celkový odpor paralelního zapojení je VŽDY menší než nejmenší z odporů!*`,
        keyTakeaways: [
          '1. KZ: Proud do uzlu = proud z uzlu.',
          '2. KZ: V uzavřené smyčce se součet napětí zdrojů rovná součtu úbytků napětí.',
          'Sériově se odpory sčítají; paralelně platí převrácené hodnoty.'
        ],
        examTips: [
          'Máme 2 stejné rezistory 100 Ω paralelně. Jaký je výsledný odpor? Přesně polovina: 50 Ω. Zkoušející testuje rychlost z hlavy.'
        ]
      },
      {
        id: '1-3',
        title: 'Rozdělení a značení elektrických sítí (TN, TT, IT, SELV, PELV)',
        standardRefs: ['ČSN 33 2000-1 ed. 2', 'ČSN 33 2000-4-41 ed. 3'],
        content: `### Význam písmen v označení distribučních sítí
* **1. písmeno (vztah zdroje/transformátoru k zemi):**
  * **T** (Terre) = uzel zdroje je přímo spojen se zemí (uzemněný uzel).
  * **I** (Isolé) = všechny živé části izolované od země, nebo spojené se zemí přes velkou impedanci.
* **2. písmeno (vztah neživých částí spotřebiče k zemi):**
  * **T** (Terre) = neživé části spojeny přímo se zemí samostatným zemničem (nezávisle na uzemnění zdroje).
  * **N** (Neutre) = neživé části jsou spojeny přímo s uzemněným bodem sítě (vodič PE / PEN).
* **Další písmena (uspořádání nulového a ochranného vodiče v síti TN):**
  * **C** (Combined) = ochranný (PE) a nulový (N) vodič jsou sloučeny v jeden (**PEN**).
  * **S** (Separated) = ochranný (**PE**) a nulový (**N**) vodič jsou vedeny po celé trase odděleně.
  * **C-S** = v první části sítě (např. v distribuční síti) sloučeny do PEN, v místě rozdělení (např. v domovní rozvodnici) rozděleny na PE a N a **dále se už nesmí nikde spojit!**

---

### Sítě malého napětí (ELV do 50 V AC / 120 V DC):
* **SELV (Safety Extra-Low Voltage):** Obvod je bezpečně oddělen od sítě (bezpečnostním transformátorem dle ČSN EN 61558-2-6) a **není uzemněn** (ani živé části, ani kostra). Typické pro hračky, svítidla do bazénů.
* **PELV (Protective Extra-Low Voltage):** Obvod je bezpečně oddělen, ale **jeho část nebo kostra je uzemněna**.
* **FELV (Functional Extra-Low Voltage):** Malé napětí pro funkční účely (např. řízení), které **není bezpečně odděleno** od nn sítě – musí mít ochranu jako síť 230 V!`,
        keyTakeaways: [
          'TN-C: vodič PEN (min. průřez 10 mm² Cu nebo 16 mm² Al).',
          'TN-S: oddělený PE a N po celé délce.',
          'Po rozdělení PEN na PE a N se tyto vodiče NESMÍ znovu spojit!',
          'SELV: bezpečné malé napětí, zcela neuzemněné.',
          'PELV: bezpečné malé napětí s uzemněním.'
        ],
        examTips: [
          'Kritická otázka zkoušejícího: Můžeme v síti TN-C použít proudový chránič pro celý dům? NE! Vodičem PEN prochází jak pracovní proud, tak poruchový proud, a chránič by okamžitě nesmyslně vybavoval nebo by v něm nesměl být PEN přerušen (PEN se nesmí jistit ani spínat!). Chránič vyžaduje síť TN-S.',
          'Jaký je minimální průřez vodiče PEN? 10 mm² měď (Cu) nebo 16 mm² hliník (Al) dle ČSN 33 2000-5-54!'
        ]
      },
      {
        id: '1-4',
        title: 'Značení vodičů a svorek (barvy vodičů)',
        standardRefs: ['ČSN EN 60446', 'ČSN 33 0165'],
        content: `### Barvy izolace vodičů dle platných norem:
* **Ochranný vodič (PE):** výhradně kombinace **ZELENO-ŽLUTÁ** po celé délce. Tato kombinace nesmí být použita pro žádný jiný účel!
* **Nulový vodič (N):** **SVĚTLE MODRÁ**.
* **Kombinovaný vodič (PEN):** buď **zeleno-žlutý s modrým označením** na koncích, nebo **světle modrý se zeleno-žlutým označením** na koncích.
* **Fázové vodiče (střídavá síť L1, L2, L3):** přednostně **ČERNÁ**, **HNĚDÁ**, **ŠEDÁ**.
* **Krajní vodiče (stejnosměrná soustava DC):**
  * Kladný pól (+): **Tmavě červená** (dříve červená).
  * Záporný pól (-): **Tmavě modrá** (dříve modrá).
  * Střední vodič (M): **Světle modrá**.

### Značení svorek:
* Fáze: L1, L2, L3 (dříve R, S, T, U, V, W)
* Nulový bod: N
* Ochranný bod: PE, resp. symbol uzemnění`,
        keyTakeaways: [
          'Zeleno-žlutá je vyhrazena pouze pro PE (ochranný vodič).',
          'Světle modrá je pro nulový vodič N.',
          'Fázové barvy: černá, hnědá, šedá.',
          'PEN musí být označen na koncích (zelenožlutá + modrá návlečka).'
        ],
        examTips: [
          'Může se zeleno-žlutý vodič v kabelu přeznačit na fázi pro schodišťový vypínač? KATEGORICKY NE! Ani modrou bužírkou ani izolepou. U zkoušky by to znamenalo okamžitý neúspěch.'
        ]
      },
      {
        id: '1-5',
        title: 'Stupně ochrany krytem – IP kód',
        standardRefs: ['ČSN EN 60529'],
        content: `IP kód (Ingress Protection) se skládá ze zkratky **IP** a dvou číslic (případně přídavných písmen):

### 1. číslice: Ochrana před dotykem nebezpečných částí a vniknutím cizích těles:
* **IP 0x:** Nechráněno.
* **IP 1x:** Tělesa $> 50\\text{ mm}$ (hřbet ruky).
* **IP 2x:** Tělesa $> 12,5\\text{ mm}$ (prst). *Základní krytí přístrojů uvnitř rozvaděče při otevření dveří.*
* **IP 3x:** Tělesa $> 2,5\\text{ mm}$ (nástroj, drát).
* **IP 4x:** Tělesa $> 1\\text{ mm}$ (tenký drát).
* **IP 5x:** Chráněno před prachem (prachotěsné částečně).
* **IP 6x:** Zcela prachotěsné.

### 2. číslice: Ochrana před vniknutím vody:
* **IP x0:** Nechráněno.
* **IP x1:** Svisle kapající voda.
* **IP x2:** Voda kapající pod úhlem do $15^\\circ$.
* **IP x3:** Kropení / déšť pod úhlem do $60^\\circ$.
* **IP x4:** **Stříkající voda ze všech směrů** (standardní venkovní zásuvky, koupelny zóna 1 a 2).
* **IP x5:** Tryskající voda (proud vody).
* **IP x7:** Dočasné ponoření do vody (max 1 m hloubka).
* **IP x8:** Trvalé ponoření pod tlakem vody.

### Typické příklady v praxi:
* Obyčejná pokojová zásuvka: **IP 20**
* Zásuvka s víčkem do vlhka / ven: **IP 44**
* Svítidlo do bazénu (zóna 0): **IP X7 nebo IP X8**`,
        keyTakeaways: [
          'IP20: běžný interiér (prst, žádná voda).',
          'IP44: vlhko, venkovní použití, koupelny (drát, stříkající voda).',
          'IP68: absolutní prachotěsnost + trvalé ponoření do vody.'
        ],
        examTips: [
          'Jaké minimální krytí musí mít vnitřek otevřeného rozvaděče nn, ke kterému má přístup laická obsluha? Minimálně IP 2X (ochrana prstem).'
        ]
      }
    ]
  },
  {
    id: 2,
    slug: 'bezpecnost-a-ochrana-pred-urazem',
    code: '26-017-H/02',
    title: 'Dodržování bezpečnosti při práci a ochrana před úrazem el. proudem',
    shortDescription: 'NV 194/2022 Sb., 5 pravidel beznapěťového stavu, ČSN 33 2000-4-41 ed. 3, proudové chrániče a vypínací časy.',
    iconName: 'ShieldCheck',
    totalQuestions: 22,
    subchapters: [
      {
        id: '2-1',
        title: 'Obsluha vs. práce na el. zařízení a nová legislativa NV 194/2022 Sb.',
        standardRefs: ['Zákon č. 250/2021 Sb.', 'NV č. 194/2022 Sb.'],
        content: `### Rozdíl mezi obsluhou a prací na el. zařízení:
* **Obsluha el. zařízení:** Úkony nutné pro provoz zařízení (zapínání/vypínání vypínači, regulace, výměna žárovky nebo závitové pojistky bez dotyku živých částí, odečítání měřicích přístrojů).
* **Práce na el. zařízení:** Montáž, údržba, revize, oprava, zapojování, měření na živých částech, při kterých se zasahuje do konstrukce zařízení.

### Tři pracovní stavy:
1. **Práce bez napětí:** Zařízení je vypnuto a zajištěno dle 5 bezpečnostních pravidel. Nejbezpečnější a preferovaný způsob!
2. **Práce v blízkosti živých částí:** Zařízení v pracovním prostoru je pod napětím, pracovník se ho přímo nedotýká, ale hrozí přiblížení do nebezpečné zóny (musí se použít izolační zábrany nebo dozor).
3. **Práce pod napětím (PPN):** Přímý dotyk živých částí nářadím nebo rukama v dielektrických rukavicích – vyžaduje speciální technologický postup a oprávnění.

### Druhy dozoru při práci:
* **Práce podle pokynů:** Pracovník dostane úkol, provádí jej sám a sám za něj odpovídá.
* **Práce pod dohledem:** Zodpovědná osoba se občas přesvědčí o dodržování bezpečnostních předpisů (nemusí být neustále přítomna).
* **Práce pod dozorem:** Zodpovědná osoba je **trvale přítomna** a sleduje pracovníka, nesmí se vzdálit!

### Stupně odborné způsobilosti dle NV 194/2022 Sb. (nahradilo vyhlášku 50/1978 Sb.):
* **§ 4:** Osoba poučená (proškolena v rozsahu vykonávané činnosti).
* **§ 6:** **Elektrotechnik** (má elektrotechnické vzdělání nebo tuto profesní kvalifikaci 26-017-H + složenou zkoušku). Může samostatně pracovat na el. zařízeních.
* **§ 7:** Vedoucí elektrotechnik (řízení prací, projektování, příprava).
* **§ 8:** Revizní technik (osvědčení od TIČR).`,
        keyTakeaways: [
          'Obsluha = manipulace spínači; Práce = zásah do vnitřku a montáž.',
          'Pod dohledem = občasná kontrola; Pod dozorem = trvalá fyzická přítomnost!',
          'NV 194/2022 Sb. platí od 1. 7. 2022 a nahradilo starou vyhlášku 50/1978 Sb.',
          'Úspěšné složení zkoušky 26-017-H dává předpoklad pro získání § 6 (Elektrotechnik).'
        ],
        examTips: [
          'Zkoušející se VŽDY zeptá na nové nařízení: Jaký právní předpis dnes upravuje způsobilost v elektro? Nařízení vlády č. 194/2022 Sb. podle zákona č. 250/2021 Sb. (Už ne stará vyhláška 50!).'
        ]
      },
      {
        id: '2-2',
        title: '5 bezpečnostních pravidel pro zajištění beznapěťového stavu',
        standardRefs: ['ČSN EN 50110-1 ed. 3', 'Zásady BOZP'],
        content: `Toto je **nejdůležitější postup celé zkoušky**. Musí být odrecitován v přesném pořadí:

### 1. ÚPLNĚ ODPOJIT (vypnout)
Vypnout všechny přívody elektrické energie (vypnout hlavní vypínač, jističe, vyjmout pojistky). Pozor na zpětné napájení (např. z fotovoltaiky, UPS, záložních generátorů!). Vytvořit viditelné nebo spolehlivé rozpojení.

### 2. ZAJISTIT PROTI OPĚTOVNÉMU ZAPNUTÍ
Zabránit tomu, aby někdo omylem obvod zapnul:
* Uzamknout spínač v poloze VYPNUTO (zámek LOTO - Lockout/Tagout).
* Vyvěsit výstražnou tabulku: **„NEZAPÍNEJ! NA ZAŘÍZENÍ SE PRACUJE!“**
* Pokud nelze uzamknout, vyjmout pojistkové vložky a uložit je u sebe, nebo použít mechanické záslepky jističů.

### 3. OVĚŘIT BEZNAPĚŤOVÝ STAV
Ověřit spolehlivým měřidlem, že v místě práce skutečně není napětí:
* Použít výhradně **dvoupólovou zkoušečku** (např. vadasku). Jednopólové fázovky se šroubovákem jsou zakázané pro ověřování beznapětí!
* **Postup testu zkoušečky:** 
  1. Otestovat zkoušečku na známém živém napětí (zda měří).
  2. Změřit pracovní místo (mezi všemi fázemi navzájem i proti N a PE!).
  3. Znovu otestovat zkoušečku na živém napětí (ověřit, že se během měření nepoškodila).

### 4. UZEMNIT A ZKRATOVAT
*(Povinné u vysokého napětí VN, u nízkého napětí NN povinné tam, kde hrozí riziko zavlečení napětí, indukce z paralelních vedení nebo náhodného zapnutí).*
* **DŮLEŽITÉ POŘADÍ:** Vždy se nejdříve připojí zemnicí svorka k zemi/PE, a teprve potom ke zkratovaným fázovým vodičům! Při demontáži se postupuje opačně (nejdříve odpojit fáze, nakonec zem).

### 5. OHRADIT / ZAKRÝT ŽIVÉ ČÁSTI V OKOLÍ
Pokud v blízkosti pracoviště zůstaly sousední části pod napětím, zakryjí se izolačními deskami, plachtami nebo se prostor ohradí bezpečnostní páskou se zákazem vstupu.`,
        keyTakeaways: [
          '1. Úplně odpojit',
          '2. Zajistit proti opětovnému zapnutí (zámek + tabulka)',
          '3. Ověřit beznapěťový stav (dvoupólová zkoušečka testovaná před a po!)',
          '4. Uzemnit a zkratovat (nejdříve zemnit, pak k fázím)',
          '5. Ohradit a zakrýt okolní živé části'
        ],
        examTips: [
          'Pokud u zkoušky začneš měřit beznapěťový stav a neověříš zkoušečku PŘED i PO měření, je to okamžitý bod dolů!',
          'Jaká tabulka se vyvěšuje? „Nezapínej! Na zařízení se pracuje!“'
        ]
      },
      {
        id: '2-3',
        title: 'Ochrana před úrazem el. proudem dle ČSN 33 2000-4-41 ed. 3',
        standardRefs: ['ČSN 33 2000-4-41 ed. 3'],
        content: `ČSN 33 2000-4-41 ed. 3 rozlišuje ochranu na:
1. **Základní ochranu (dříve ochrana před dotykem živých částí):** zabraňuje dotyku částí pod napětím za normálního provozu (izolace, kryty a přepážky min. IP 2X nebo IP XXB).
2. **Ochranu při poruše (dříve ochrana před dotykem neživých částí):** chrání před napětím na vodivých částech vzniklým při selhání základní izolace.
3. **Doplňkovou ochranu:** zvýšení bezpečnosti proudovým chráničem nebo pospojováním.

### Ochranná opatření:
* **Automatické odpojení od zdroje (nejběžnější opatření):**
  Při poruše (průraz fáze na kostru) vznikne zkratový poruchový proud přes vodič PE zpět do zdroje. Tento proud musí v předepsaném čase vybavit jistič, pojistku nebo proudový chránič.
* **Dvojitá nebo zesílená izolace (třída II):** spotřebiče se symbolem dvou soustředných čtverečků, nemají ochranný vodič PE (např. ruční vrtačka, nabíječka).
* **Elektrické oddělení obvodů:** oddělovací transformátor 1:1 (např. pro napájení holicího strojku v koupelně).
* **Bezpečné malé napětí SELV a PELV.**

### Mezní dovolená dotyková napětí $U_L$ dle ČSN 33 2000-4-41 ed. 3:
* **Normální prostory (suché místnosti, byty, kanceláře):** **$50\\text{ V}$ AC** (střídavé) / **$120\\text{ V}$ DC** (stejnosměrné).
* **Nebezpečné prostory (vlhko, prach, staveniště, venku):** **$25\\text{ V}$ AC** / **$60\\text{ V}$ DC**.
* **Zvlášť nebezpečné prostory (mokro, bazény, vnitřky kovových kotlů):** **$12\\text{ V}$ AC** / **$25\\text{ V}$ DC**.

### Maximální doby odpojení pro koncové obvody do 32 A při 230 V:
* **Síť TN:** **0,4 sekundy** (při $230\\text{ V}$).
* **Síť TT:** **0,2 sekundy** (v síti TT je vyšší odpor zemniče, proto musí odpojení proběhnout rychleji, standardně proudovým chráničem).`,
        keyTakeaways: [
          'Mezní bezpečné dotykové napětí: normální prostory 50 V AC / 120 V DC.',
          'Doba odpojení koncových obvodů v síti TN: max. 0,4 s při 230 V.',
          'Doba odpojení v síti TT: max. 0,2 s při 230 V.'
        ],
        examTips: [
          'Zkoušející se zeptá: Jaká je maximální doba odpojení v síti TN pro zásuvkový obvod 230 V do 32 A? Správná odpověď: 0,4 sekundy. A v síti TT? 0,2 sekundy!'
        ]
      },
      {
        id: '2-4',
        title: 'Proudové chrániče (RCD) a jejich praktické nasazení',
        standardRefs: ['ČSN 33 2000-4-41 ed. 3', 'ČSN 33 2130 ed. 3'],
        content: `### Princip fungování proudového chrániče:
Proudový chránič funguje na principu **součtového transformátoru proudu**.
* Za normálního stavu platí 1. Kirchhoffův zákon: proud tekoucí fázemi do spotřebiče se přesně rovná proudu vracejícímu se nulovým vodičem ($I_L - I_N = 0$). V jádře se magnetické toky vyruší.
* Pokud dojde k poruše (dotyk člověka živé části, svod izolace na kostru), část proudu uniká do země přes PE nebo přes tělo člověka.
* Vznikne **rozdílový (reziduální) proud $I_\\Delta$**. V měřicím vinutí se naindukuje napětí, které aktivuje vybavovací relé a chránič odpojí kontakty.

### Požadavky normy ČSN 33 2000-4-41 ed. 3 a ČSN 33 2130 ed. 3:
* **Doplňková ochrana chráničem s $I_{\\Delta n} \\le 30\\text{ mA}$ je POVINNÁ pro:**
  1. Všechny laické zásuvky střídavého proudu se jmenovitým proudem nepřekračujícím **32 A**.
  2. Mobilní zařízení určená pro venkovní použití do 32 A.
  3. **Světelné obvody v bytech** a prostorách pro ubytování (povinné dle ed. 3 normy!).
  4. Všechny obvody v koupelnách (zóna 1 a 2).

### Typy proudových chráničů podle tvaru reziduálního proudu:
* **Typ AC:** reaguje pouze na čistě střídavé sinusové proudy (dnes se již v moderních instalacích nedoporučuje / zakazuje se pro nové instalace, protože nevidí pulzní proudy z elektroniky).
* **Typ A:** reaguje na střídavé i pulzující stejnosměrné proudy (moderní standard pro běžné byty, pračky, indukce, PC).
* **Typ F a B:** pro frekvenční měniče, tepelná čerpadla, wallboxy pro elektromobily (reaguje i na hladké stejnosměrné proudy).

### Zkušební tlačítko TEST (T):
* Slouží k mechanickému rozhýbání mechanismu a ověření funkčnosti.
* Doporučuje se testovat pravidelně (1× za 6 měsíců).`,
        keyTakeaways: [
          'Princip: součtový měřicí transformátor proudu.',
          'Citlivost pro ochranu osob: max. 30 mA.',
          'Povinnost RCD 30 mA: všechny zásuvky do 32 A a světelné obvody v bytech.',
          'Dnes je standardem minimálně Typ A (nikoliv starý Typ AC).'
        ],
        examTips: [
          'Vybaví proudový chránič, pokud se člověk dotkne současně fáze i nuláku a stojí na dokonalé izolační podložce? NEVYBAVÍ! Pro chránič se člověk chová jako běžná žárovka (proud teče tam i zpět přes součtový transformátor). Chránič chrání jen před únikem proudu do země/PE!'
        ]
      }
    ]
  },
  {
    id: 3,
    slug: 'dimenzovani-jisteni-a-vedeni',
    code: '26-017-H/03',
    title: 'Dimenzování, jištění a kladení elektrických vedení',
    shortDescription: 'ČSN 33 2000-5-52, úbytky napětí, charakteristiky jističů B/C/D, přepěťové ochrany SPD, způsoby uložení kabelů a instalační zóny.',
    iconName: 'Sliders',
    totalQuestions: 22,
    subchapters: [
      {
        id: '3-1',
        title: 'Zásady dimenzování vedení a kontrola oteplení dle ČSN 33 2000-5-52',
        standardRefs: ['ČSN 33 2000-5-52', 'ČSN 33 2130 ed. 3'],
        content: `Při návrhu průřezu vodičů musí být splněny 4 základní podmínky:
1. **Dovolené oteplení (proudová zatížitelnost $I_z$)** – vodič nesmí shořet.
2. **Přípustný úbytek napětí ($\\Delta U$)** – na konci vedení musí být dostatečné napětí pro spotřebič.
3. **Mechanická pevnost** (minimální dovolené průřezy).
4. **Ochrana před zkratem a přetížením** (samočinné odpojení v daném čase).

### Základní vztah jištění a zatížitelnosti:
$$I_B \\le I_n \\le I_z$$
$$I_2 \\le 1,45 \\cdot I_z$$
* **$I_B$** = návrhový proud obvodu (odběr spotřebiče).
* **$I_n$** = jmenovitý proud jistícího prvku (jističe).
* **$I_z$** = trvalá dovolená proudová zatížitelnost kabelu za daných podmínek uložení.
* **$I_2$** = proud zajišťující spolehlivé zapůsobení jističe ve smluveném čase ($1,45 \\cdot I_n$).

### Vlivy snižující proudovou zatížitelnost ($I_z = I_{z0} \\cdot k_1 \\cdot k_2$):
* **Způsob uložení (A1, A2, B1, B2, C, D, E):**
  * A1: v tepelně izolované stěně v trubce (nejhorší odvod tepla $\\rightarrow$ nejnižší proud!).
  * C: přímo pod omítkou ve zdivu nebo na vzduchu (lepší chlazení $\\rightarrow$ vyšší zatížitelnost).
* **Teplota okolí ($k_1$):** Tabulkové hodnoty platí pro $30^\\circ\\text{C}$ ve vzduchu. Pro vyšší teploty se zatížitelnost snižuje.
* **Seskupení kabelů ve svazku / žlabu ($k_2$):** Čím více kabelů leží vedle sebe, tím více se vzájemně ohřívají a tím nižší proud snesou!

### Typické minimální průřezy v bytové elektroinstalaci (Cu měď):
* Světelné obvody: kabel **CYKY-J 3x1.5**, jištění **10 A** (charakteristika B).
* Zásuvkové obvody: kabel **CYKY-J 3x2.5**, jištění **16 A** (charakteristika B).
* Varná deska 400 V (třífázová): kabel **CYKY-J 5x2.5**, jištění **16 A** (charakteristika B).
* Přívod pro bytovou rozvodnici: obvykle kabel **CYKY-J 5x6** až **5x10**, jištění 25 A až 32 A.`,
        keyTakeaways: [
          'Základní pravidlo: IB ≤ In ≤ Iz (proud zátěže ≤ proud jističe ≤ dovolený proud kabelu).',
          'Vodič v tepelné izolaci snese podstatně menší proud než kabel ve zdivu.',
          'Více kabelů ve svazku snižuje dovolený proud přepočítacím koeficientem.'
        ],
        examTips: [
          'Zkoušející u praktické zkoušky zadá příklad: Máte přímotop 3 kW na 230 V. Jaký teče proud a jaký jistič a kabel navrhnete? Výpočet: I = P / U = 3000 / 230 = 13,04 A. Návrh: jistič 16 A char. B, kabel CYKY-J 3x2,5 mm².'
        ]
      },
      {
        id: '3-2',
        title: 'Výpočet úbytku napětí ve vedení',
        standardRefs: ['ČSN 33 2130 ed. 3'],
        content: `Dle ČSN 33 2130 ed. 3 nesmí úbytek napětí od přípojkové skříně (HDS) ke spotřebiči překročit:
* **Pro světelné obvody:** max. **$2\\%$** (při $230\\text{ V}$ je to max. $4,6\\text{ V}$).
* **Pro ostatní obvody (zásuvky, spotřebiče):** max. **$3\\%$** (při $230\\text{ V}$ je to max. $6,9\\text{ V}$).
* *Pokud je měření počítáno od elektroměru k rozvaděči a spotřebiči, celkový úbytek od HDS nesmí překročit $4\\%$.*

### Vzorce pro výpočet úbytku napětí pro měď ($\\gamma = 56\\text{ m}/(\\Omega \\cdot \\text{mm}^2)$):

#### 1. Jednofázový obvod (230 V):
$$\\Delta U = \\frac{2 \\cdot l \\cdot I \\cdot \\cos\\varphi}{\\gamma \\cdot S} = \\frac{2 \\cdot l \\cdot P}{U \\cdot \\gamma \\cdot S} \\quad [\\text{V}]$$
Procentuální úbytek:
$$\\Delta U_{\\%} = \\frac{\\Delta U}{U_n} \\cdot 100\\%$$

#### 2. Třífázový obvod (400 V symetrický):
$$\\Delta U = \\frac{\\sqrt{3} \\cdot l \\cdot I \\cdot \\cos\\varphi}{\\gamma \\cdot S} = \\frac{l \\cdot P}{U \\cdot \\gamma \\cdot S} \\quad [\\text{V}]$$
*(kde $l$ je jednoduchá délka trasy vedení v metrech, $S$ je průřez vodiče v $\\text{mm}^2$, $P$ je výkon ve wattech).*`,
        keyTakeaways: [
          'Maximální úbytek napětí: 2 % pro světla, 3 % pro zásuvky.',
          'Při dlouhém vedení (např. garáž 50 m daleko) může být nutné zvolit kabel 4 mm² i pro 16A jištění, aby vyhověl úbytek napětí!'
        ],
        examTips: [
          'Proč se u 1f obvodu násobí délkou 2x, ale u 3f odmocninou ze 3? U jednofázového obvodu teče proud tam fází a zpět nulákem, takže celková délka vodičů v obvodu je 2x délka trasy!'
        ]
      },
      {
        id: '3-3',
        title: 'Jistící prvky: jističe, pojistky a vypínací charakteristiky',
        standardRefs: ['ČSN EN 60898-1'],
        content: `### Konstrukce jističe:
Instalační jistič obsahuje dvě spouště:
1. **Tepelná spoušť (bimetal):** chrání před mírným, ale dlouhotrvajícím **přetížením**. Reaguje pomalu (vteřiny až minuty) v závislosti na oteplení bimetalového pásku.
2. **Elektromagnetická spoušť (cívka s jádrem):** chrání před velkým **zkratovým proudem**. Reaguje okamžitě (v řádu milisekund pod 0,1 s).

### Vypínací charakteristiky jističů dle ČSN EN 60898-1:
* **Charakteristika B ($3 \\times I_n$ až $5 \\times I_n$):**
  * Pro jištění vedení se zátěží bez velkých rázových proudů (světelné a zásuvkové okruhy v bytech, topení, bojlery).
* **Charakteristika C ($5 \\times I_n$ až $10 \\times I_n$):**
  * Pro zařízení s běžným rozběhovým proudem (elektromotory, čerpadla, kompresory, transformátory, zářivky).
* **Charakteristika D ($10 \\times I_n$ až $20 \\times I_n$):**
  * Pro těžké rozběhy s vysokými proudovými špičkami (velké motory, svářečky, rentgeny).

### Jmenovitá zkratová odolnost jističe ($I_{cn}$):
* Běžná domovní instalace: minimálně **6 kA** (6 000 A) nebo 10 kA v průmyslu. Označuje schopnost bezpečně vypnout zkratový proud bez exploze.`,
        keyTakeaways: [
          'Charakteristika B: 3 až 5× In (byty, zásuvky, světla).',
          'Charakteristika C: 5 až 10× In (motory, čerpadla, klimatizace).',
          'Charakteristika D: 10 až 20× In (těžké rozběhy, svářečky).'
        ],
        examTips: [
          'Jaký jistič navrhneš pro domácí dílenský kompresor nebo cirkulárku, když jistič B16 při startu padá? Zvolíme jistič C16 (charakteristika C), který snese rozběhovou proudovou špičku motoru.'
        ]
      },
      {
        id: '3-4',
        title: 'Přepěťové ochrany (SPD) – Typ 1, Typ 2, Typ 3',
        standardRefs: ['ČSN EN 62305', 'ČSN 33 2000-5-534'],
        content: `Kaskádovité zapojení svodičů přepětí (SPD - Surge Protective Device):

### Typ 1 (T1 / třída B) – Svodič bleskových proudů:
* **Princip:** Jiskřiště.
* **Schopnost:** Svede obrovskou energii přímého úderu blesku (zkušební vlna $10/350\\;\\mu\\text{s}$, proud $I_{imp} \\ge 12,5\\text{ kA}$ na pól).
* **Umístění:** Hlavní domovní rozvaděč (HR) na vstupu do budovy (povinné pro objekty se střešním hromosvodem LPS).

### Typ 2 (T2 / třída C) – Svodič přepětí:
* **Princip:** Varistor (při překročení napětí prudce klesne jeho odpor a svede špičku do PE).
* **Schopnost:** Ochrana před atmosférickým přepětím z dálky a spínacími rázy v síti (vlna $8/20\\;\\mu\\text{s}$, $I_n \\approx 20\\text{ kA}$).
* **Umístění:** Podružné patrové nebo bytové rozvodnice. Dnes se často montují kombinované svodiče **Typ 1 + Typ 2 (T1+T2)** v jednom modulu!

### Typ 3 (T3 / třída D) – Jemná ochrana:
* **Princip:** Rychlé polovodičové diody / varistory.
* **Umístění:** Co nejblíže chráněnému citlivému koncovému zařízení (max. 5 metrů, např. v zásuvce nebo přepěťové liště u PC či TV).

### Zásady správné montáže SPD:
* Přívody k přepěťovým ochranám musí být **co nejkratší** (celková délka připojovacích vodičů $V$ od fáze přes SPD na sběrnici PE má být $\\le 0,5\\text{ m}$). Dlouhé vodiče mají vlastní indukčnost, která při strmé špičce blesku vytvoří nebezpečné napětí!`,
        keyTakeaways: [
          'Typ 1: bleskový proud (vlna 10/350 µs) - vstup do objektu.',
          'Typ 2: přepětí a spínací rázy (vlna 8/20 µs) - rozvaděč.',
          'Typ 3: jemná ochrana citlivé elektroniky - u spotřebiče.',
          'Připojovací vodiče k SPD musí být co nejkratší (ideálně do 0,5 m).'
        ],
        examTips: [
          'Zkoušející se zeptá: Co znamená vlna 10/350 µs u bleskojistky T1? 10 mikrosekund je náběh vlny, 350 mikrosekund je pokles na polovinu – představuje to energeticky obrovský impuls blesku.'
        ]
      },
      {
        id: '3-5',
        title: 'Kladení vedení, instalační zóny a požární prostupy',
        standardRefs: ['ČSN 33 2130 ed. 3', 'ČSN 73 0810'],
        content: `### Instalační zóny ve stěnách dle ČSN 33 2130 ed. 3:
Kabely se ukládají vodorovně a svisle ve stanovených zónách, aby se minimalizovalo riziko provrtání:
* **Vodorovné zóny:**
  * Horní zóna: **150 až 450 mm** pod dokončeným stropem.
  * Dolní zóna: **150 až 450 mm** nad dokončenou podlahou.
* **Svislé zóny:**
  * Dveřní: **100 až 200 mm** od rámu dveří.
  * Rohová: **100 až 200 mm** od rohu místnosti.
  * Okenní: **100 až 200 mm** od rámu okna.
* Vypínače se standardně umisťují ve výšce **1050 mm** (nad podlahou) a zásuvky ve výšce **300 mm** (v kuchyni nad linkou 1150 mm).

### Procházení požárně dělicími konstrukcemi:
Při prostupu kabelu zdí nebo stropem, který tvoří požární úsek, musí být otvor utěsněn **certifikovanou protipožární ucpávkou** (protipožární tmely, manžety, desky) se stejnou požární odolností (např. EI 60, EI 90), aby se kouř a oheň nešířily do dalších prostor.`,
        keyTakeaways: [
          'Kabely se ukládají pouze vodorovně a svisle v předepsaných zónách.',
          'Vypínače typicky 105 cm nad podlahou, zásuvky 30 cm (v kuchyni 115 cm).',
          'Prostupy požárními stěnami musí mít certifikovanou ucpávku.'
        ],
        examTips: [
          'Může se táhnout kabel pod omítkou šikmo nejkratší cestou mezi vypínačem a krabicí u stropu? NE! Kabel musí jít přísně svisle do horní instalační zóny a tam vodorovně!'
        ]
      }
    ]
  },
  {
    id: 4,
    slug: 'technicka-dokumentace-a-normy',
    code: '26-017-H/04',
    title: 'Používání technické dokumentace a norem při instalacích',
    shortDescription: 'Čtení jednopólových a liniových schémat rozvaděčů, schematické značky ČSN EN 60617, elektrotechnické normy.',
    iconName: 'FileText',
    totalQuestions: 15,
    subchapters: [
      {
        id: '4-1',
        title: 'Druhy elektrotechnických výkresů a schémat',
        standardRefs: ['ČSN EN 61082-1', 'ČSN EN 60617'],
        content: `V praxi se elektrotechnik setkává se 3 hlavními typy dokumentace:
1. **Přehledové schéma (jednopólové):**
   * Zjednodušené schéma, kde jsou vícedrátová vedení znázorněna jednou čarou přeškrtnutou počtem vodičů (nebo lomítkem s číslem).
   * Používá se pro schémata rozvaděčů, distribuční sítě a celkové uspořádání okruhů.
2. **Obvodové (liniové / zapojovací) schéma:**
   * Zobrazuje každý jednotlivý vodič, svorku, cívku relé a kontakt.
   * Umožňuje detailně sledovat logiku funkce obvodu a hledat závady.
3. **Situační výkres (půdorys instalace):**
   * Architektonický půdorys budovy se zakresleným umístěním rozvaděčů, svítidel, zásuvek, vypínačů a tras kabelových tras.

### Značení přístrojů v dokumentaci (dle ČSN EN 81346-2):
* **F** = ochranné jistící prvky (FA jistič, FU pojistka)
* **Q** = silové spínače (QM hlavní vypínač, QF jistič / jističochránič)
* **K** = relé a stykače (KM stykač, KA pomocné relé, KT časové relé)
* **S** = spínače a tlačítka pro ovládání (SA přepínač, SB tlačítko)
* **X** = svorkovnice a zásuvky
* **M** = motor`,
        keyTakeaways: [
          'Jednopólové schéma = přehled obvodů rozvaděče.',
          'Situační půdorys = poloha prvků v místnostech.',
          'Liniové schéma = detailní elektrické propojení svorek a kontaktů.'
        ],
        examTips: [
          'Zkoušející ti dá do ruky schéma rozvaděče a řekne: „Ukažte mi hlavní vypínač, chránič a jistič kuchyňského okruhu, a přečtěte jeho jmenovitý proud a vypínací schopnost.“ Musíš umět plynule číst hodnoty jako např. B16/1/0,03A 10kA.'
        ]
      },
      {
        id: '4-2',
        title: 'Značky přístrojů a spínačů dle ČSN EN 60617',
        standardRefs: ['ČSN EN 60617'],
        content: `### Schématické značky spínačů pro domovní instalaci:
* **Vypínač č. 1 (jednopólový):** kolečko s jednou jednoduchou čárkou s háčkem. Rozpíná jeden fázový vodič.
* **Vypínač č. 5 (sériový / lustrový):** kolečko se dvěma čárkami s háčky na stejnou stranu. Dvě nezávislé klapky v jednom rámečku.
* **Vypínač č. 6 (střídavý / schodišťový):** kolečko s čárkou mající háčky na OBĚ strany (nahoru i dolů). Jeden vstup, dva přepínané výstupy.
* **Vypínač č. 7 (křížový):** kolečko se dvěma překříženými čárkami s háčky. Čtyři svorky – kříží dva vodiče mezi dvěma schodišťáky.
* **Tlačítko (ovladač impulsního relé):** spínací kontakt s tečkou nebo trojúhelníčkem (vrací se pružinou).
* **Proudový chránič:** značka spínače doplněná oválem (součtový transformátor) a vybavovacím členem.`,
        keyTakeaways: [
          'Vypínač 1: jeden háček.',
          'Vypínač 5: dva háčky na stejnou stranu.',
          'Vypínač 6: háčky na obě strany.',
          'Vypínač 7: křížové háčky.'
        ],
        examTips: [
          'Pozor na záměnu řazení 5 a 6 na výkrese: 5 má dvě páčky stejným směrem, 6 má jednu linku s háčky do protisměru!'
        ]
      }
    ]
  },
  {
    id: 5,
    slug: 'naradi-pomucky-a-meridla',
    code: '26-017-H/05',
    title: 'Volba postupu práce, nářadí, pomůcek a měřidel',
    shortDescription: 'Izolované nářadí 1000 V dle ČSN EN 60900, revizní přístroje: měření impedance smyčky Zs, izolační odpor Riso, test chráničů RCD.',
    iconName: 'Wrench',
    totalQuestions: 20,
    subchapters: [
      {
        id: '5-1',
        title: 'Nářadí pro elektrikáře a práce do 1000 V',
        standardRefs: ['ČSN EN 60900'],
        content: `### Izolované nářadí dle ČSN EN 60900:
* Pro práci na el. zařízeních do 1000 V AC / 1500 V DC musí být použito certifikované nářadí označené:
  * Symbolem **dvou překrývajících se trojúhelníků** a údajem **1000 V**.
  * Číslem normy **ČSN EN 60900**.
* Nářadí se před každým použitím vizuálně kontroluje (izolace nesmí být prasklá, proříznutá ani ohořelá).

### Základní sada montéra:
* Odizolovávací kleště (např. automatické kleště nebo kleště Jokari na pláště kabelů).
* Stranové štípací kleště (tzv. štípačky s fazetou i bez).
* Lisovací kleště na dutinky (kabelová oka a dutinky pro slaněné vodiče – licny).
* Izolované šroubováky (ploché, PH, PZ a speciální **PlusMinus / SL/PZ** ideální pro jističové svorky).
* Momentový šroubovák (pro dotažení svorek v rozvaděči předepsaným momentem v Nm – zamezuje vyhřátí a požáru!).`,
        keyTakeaways: [
          'Nářadí pro práci do 1000 V musí mít symbol 1000 V a dvojitý trojúhelník.',
          'Slaněné vodiče (licny) se do svorek VŽDY musí opatřit nalisovanou dutinkou!',
          'Dotažení rozvaděčových svorek se provádí předepsaným momentem.'
        ],
        examTips: [
          'Lze do svorky jističe zapojit slaněný vodič bez lisovací dutinky? NE! Lanko by se šroubem přestříhalo a uvolnilo, což vede k jiskření a požáru. Zkoušející toto při montáži bedlivě hlídá.'
        ]
      },
      {
        id: '5-2',
        title: 'Revizní měření impedance smyčky (Zs) a podmínka odpojení',
        standardRefs: ['ČSN 33 2000-4-41 ed. 3', 'ČSN 33 2000-6 ed. 2'],
        content: `### Co je impedance poruchové smyčky ($Z_s$):
Impedance smyčky je celkový odpor (impedance) dráhy, kterou poteče poruchový zkratový proud: od sekundárního vinutí transformátoru přes fázový vodič, místo poruchy do ochranného vodiče PE a přes zem zpět do uzlu trafa.

### Podmínka samočinného odpojení od zdroje:
$$Z_s \\cdot I_a \\le U_0 \\quad \\implies \\quad Z_s \\le \\frac{U_0}{I_a}$$
* **$U_0$** = jmenovité fázové střídavé napětí proti zemi ($230\\text{ V}$).
* **$I_a$** = proud zajišťující samočinné zapůsobení ochranného prvku v předepsaném čase ($0,4\\text{ s}$ pro TN):
  * Pro jistič charakteristiky B: $I_a = 5 \\times I_n$
  * Pro jistič charakteristiky C: $I_a = 10 \\times I_n$
  * Pro jistič charakteristiky D: $I_a = 20 \\times I_n$

### Výpočet maximální dovolené impedance smyčky:
* **Pro jistič B16:** $I_a = 5 \\times 16 = 80\\text{ A} \\implies Z_{s,\\text{max}} = \\frac{230}{80} = 2,875\\;\\Omega$.
* **Pro jistič C16:** $I_a = 10 \\times 16 = 160\\text{ A} \\implies Z_{s,\\text{max}} = \\frac{230}{160} = 1,437\\;\\Omega$.
* **Pro jistič B10:** $I_a = 5 \\times 10 = 50\\text{ A} \\implies Z_{s,\\text{max}} = \\frac{230}{50} = 4,60\\;\\Omega$.

### Bezpečnostní koeficient 1,5 (resp. 2/3):
Při revizním měření se vedení měří za studena. Vodiče se při zkratu ohřejí až na $160^\\circ\\text{C}$, čímž jejich odpor vzroste! Proto naměřená hodnota $Z_{s,\\text{namer}}$ musí vyhovovat přísnější podmínce:
$$Z_{s,\\text{namer}} \\le \\frac{2}{3} \\cdot Z_{s,\\text{max}} = \\frac{Z_{s,\\text{max}}}{1,5}$$
*Pro B16 je tedy maximální naměřená hodnota za studena cca $1,91\\;\\Omega$!*`,
        keyTakeaways: [
          'Vzorec: Zs * Ia ≤ U0',
          'Vypínací proud: B = 5× In, C = 10× In, D = 20× In.',
          'Při měření za studena se započítává bezpečnostní koeficient 1,5 (naměřená hodnota musí být ≤ 2/3 Zs,max).'
        ],
        examTips: [
          'Zkoušející ti dá změřit impedanci smyčky v zásuvce a zeptá se: „Naměřil jste 2,2 Ω, jistič je B16. Vyhovuje to?“ Teoretická mez je 2,87 Ω, ALE po zápočtu koeficientu 1,5 je mez 1,91 Ω. Správná odpověď je: NEVYHOVUJE z důvodu oteplení vodičů při zkratu!'
        ]
      },
      {
        id: '5-3',
        title: 'Měření izolačního odporu (Riso)',
        standardRefs: ['ČSN 33 2000-6 ed. 2'],
        content: `### Postup měření izolačního stavu:
Měření izolačního odporu ověřuje celistvost a kvalitu izolace vodičů (zda kabel není proseknutý hřebíkem, zavlhlý nebo degradovaný stářím).
* **Měří se VŽDY v beznapěťovém stavu!**
* **Všechny spotřebiče a citlivá elektronika musí být odpojeny** (vypnuté jističe, vytažené spotřebiče ze zásuvek, vypnuté přepěťovky), aby je zkušební napětí nepoškodilo!
* Světelné spínače musí být sepnuté, aby se změřila celá trasa k objímkám.

### Zkušební napětí a minimální hodnoty dle ČSN 33 2000-6 ed. 2:
* Pro obvody **SELV a PELV:** zkušební napětí **250 V DC**, izolační odpor **$\\ge 0,5\\text{ M}\\Omega$**.
* Pro běžné instalace **do 500 V (sítě 230/400 V):**
  * Zkušební napětí: **500 V DC** (stejnosměrné).
  * Minimální dovolený izolační odpor: **$\\ge 1,0\\text{ M}\\Omega$** (1 megaohm).
* Mezi kterými vodiči se měří:
  * Mezi pracovními vodiči navzájem (L1-L2, L2-L3, L1-L3, L-N).
  * Mezi všemi pracovními vodiči a ochranným vodičem (L1-PE, L2-PE, L3-PE, N-PE).`,
        keyTakeaways: [
          'Zkušební napětí pro instalace 230/400 V: 500 V DC.',
          'Minimální izolační odpor: 1,0 MΩ.',
          'Před měřením odpojit citlivou elektroniku a přepěťové ochrany!'
        ],
        examTips: [
          'Jakým napětím měříte izolační odpor běžné instalace 230 V? Stejnosměrným napětím 500 V DC! A jaký minimální odpor musí mít? Alespoň 1 MΩ (v praxi u nového kabelu ukazuje měřák > 999 MΩ).'
        ]
      },
      {
        id: '5-4',
        title: 'Měření a testování proudového chrániče (RCD)',
        standardRefs: ['ČSN 33 2000-6 ed. 2', 'ČSN EN 61008-1'],
        content: `Při revizním ověření proudového chrániče se měřicím přístrojem (např. Eurotest / Megger) ověřují dva klíčové parametry:

### 1. Vybavovací reziduální proud ($I_\\Delta$):
* Přístroj postupně zvyšuje unikající proud od $0,2 \\times I_{\\Delta n}$ do $1,0 \\times I_{\\Delta n}$.
* **Normový požadavek:** Chránič musí spolehlivě vybavit v rozmezí **$0,5 \\times I_{\\Delta n}$ až $1,0 \\times I_{\\Delta n}$**.
* Pro standardní chránič $30\\text{ mA}$ musí být skutečný vypínací proud v rozmezí **$15\\text{ mA}$ až $30\\text{ mA}$** (typicky vybavuje kolem 21–24 mA). Nesmí vybavit pod 15 mA (byl by příliš citlivý a způsoboval falešná vypnutí) a nesmí držet nad 30 mA!

### 2. Vybavovací čas ($t_a$):
* Měří se při jmenovitém proudu $1 \\times I_{\\Delta n}$ (30 mA):
  * Maximální dovolený čas odpojení: **$< 300\\text{ ms}$** (v praxi kvalitní chránič vybaví za 15 až 35 ms).
* Měří se při pětinásobku $5 \\times I_{\\Delta n}$ (150 mA):
  * Maximální čas odpojení: **$< 40\\text{ ms}$**.

### 3. Dotykové napětí na ochranném vodiči při testu ($U_B$):
* Měřák před spuštěním testu zkontroluje napětí na PE. Nesmí překročit mez $50\\text{ V}$ (v nebezpečných prostorách $25\\text{ V}$).`,
        keyTakeaways: [
          'Vypínací proud pro 30 mA chránič: musí být mezi 15 až 30 mA.',
          'Vypínací čas při 1× IΔn: max. 300 ms.',
          'Testuje se jak kladná, tak záporná půlvlna (fáze 0° a 180°).'
        ],
        examTips: [
          'Pokud při testu chrániče 30 mA naměříte vybavovací proud 12 mA, je to v pořádku? NENÍ! Chránič nesmí vybavovat pod polovinou jmenovité hodnoty (0,5 × 30 = 15 mA).'
        ]
      }
    ]
  },
  {
    id: 6,
    slug: 'provadeni-instalaci-a-montaz',
    code: '26-017-H/06',
    title: 'Provádění elektrických instalací, jejich montáže a zapojování',
    shortDescription: 'Schémata zapojení vypínačů 1, 5, 6, 7, zásuvkové okruhy, zapojení bytové rozvodnice, pospojování a koupelny.',
    iconName: 'Cpu',
    totalQuestions: 20,
    subchapters: [
      {
        id: '6-1',
        title: 'Světelné obvody: zapojení spínačů řazení 1, 5, 6 a 7',
        standardRefs: ['ČSN 33 2130 ed. 3'],
        content: `### 1. Spínač řazení 1 (jednopólový vypínač)
* **Použití:** Ovládání jednoho svítidla z jednoho místa (koupelna, WC, komora).
* **Vodiče:** Přívod fáze L na svorku L, odchozí spínaná fáze (černá/hnědá) na svorku se šipkou ke svítidlu.

### 2. Spínač řazení 5 (sériový / lustrový)
* **Použití:** Dvě klapky v jednom rámečku pro nezávislé ovládání dvou okruhů z jednoho místa (např. lustr se dvěma skupinami žárovek, nebo světlo a ventilátor na WC).
* **Vodiče:** Jedna společná přívodní svorka L, dva spínané výstupy 1 a 2 ke svítidlům.

### 3. Spínač řazení 6 (střídavý / schodišťový vypínač)
* **Použití:** Ovládání jednoho svítidla ze **dvou míst** (chodbové / schodišťové světlo).
* **Zapojení ve dvojici (6 + 6):**
  * Spínač A: Přívod stálé fáze L na svorku L. Ze dvou výstupních svorek (šipky) vedou dva korespondenční vodiče ke spínači B.
  * Spínač B: Na dvě vstupní svorky jsou připojeny korespondenční vodiče ze spínače A. Z výstupní svorky L odchází spínaná fáze přímo do svítidla.

### 4. Spínač řazení 7 (křížový vypínač)
* **Použití:** Ovládání svítidla ze **tří a více míst**.
* **Pravidlo zapojení:** Na začátku a na konci trasy je VŽDY spínač č. **6**. Mezi ně se vkládá libovolný počet křížových spínačů č. **7** ($6 \\rightarrow 7 \\rightarrow 7 \\dots \\rightarrow 6$).
* **Svorky spínače 7:** 4 svorky. Dva korespondenční vodiče vstupují, dva vystupují dál. Spínač v jedné poloze propojuje vodiče přímo, v druhé poloze je překříží.`,
        keyTakeaways: [
          'Řazení 1: 1 místo, 1 světlo.',
          'Řazení 5: 1 místo, 2 světla (dvouklapka).',
          'Řazení 6: 2 místa (dva schodišťáky).',
          'Řazení 7: 3 a více míst (vždy mezi dvěma spínači 6: 6 - 7 - 6).'
        ],
        examTips: [
          'U praktické zkoušky je montáž zapojení 6-7-6 standardním úkolem na cvičném panelu. Dbej na to, aby fázový vodič šel vždy přes kontakty vypínače a na závit objímky šel nulák N, nikoliv fáze!'
        ]
      },
      {
        id: '6-2',
        title: 'Zásuvkové a silové obvody dle ČSN 33 2130 ed. 3',
        standardRefs: ['ČSN 33 2130 ed. 3'],
        content: `### Pravidla pro zásuvkové obvody 230 V:
* Na jeden zásuvkový obvod jištěný **16 A** lze zapojit maximálně **10 zásuvkových vývodů** (dvojzásuvka na jedné krabici se počítá jako jeden vývod!).
* Celkový instalovaný příkon na jeden obvod nesmí překročit **3680 W** ($230\\text{ V} \\times 16\\text{ A}$).
* Minimální průřez vodičů měděného kabelu: **$2,5\\text{ mm}^2$ (CYKY-J 3x2.5)**.
* Všechny zásuvky musí být vybaveny proudovým chráničem **$30\\text{ mA}$**.

### Správné zapojení jednofázové zásuvky (pohled zepředu s kolíkem nahoře):
* **Levá dutinka:** Fázový vodič **L** (hnědá / černá).
* **Pravá dutinka:** Nulový pracovní vodič **N** (světle modrá).
* **Zemnicí kolík:** Ochranný vodič **PE** (zeleno-žlutá).

### Samostatné obvody pro spotřebiče:
Pro spotřebiče o příkonu **$2000\\text{ W}$ a více** se zřizují samostatné neblokované zásuvkové obvody:
* Pračka, sušička, myčka nádobí, elektrická pečicí trouba, bojler.`,
        keyTakeaways: [
          'Max. 10 zásuvek na 16A obvod (CYKY 3x2.5).',
          'Fáze vlevo, nulák vpravo, kolík nahoře zeleněžlutý.',
          'Spotřebiče nad 2 kW (pračka, myčka, trouba) mají mít vlastní přívod.'
        ],
        examTips: [
          'Co je to zásuvková smyčka a jak se provádí PE vodič? Zásuvky se smyčkují průběžně. Vodič PE se nesmí přerušit tak, aby při demontáži jedné zásuvky ztratily ostatní zásuvky ochranu! Doporučuje se použít WAGO svorky v krabici.'
        ]
      },
      {
        id: '6-3',
        title: 'Uspořádání bytové rozvodnice a pospojování',
        standardRefs: ['ČSN 33 2000-5-53', 'ČSN 33 2000-5-54'],
        content: `### Logická skladba domovního rozvaděče (zleva doprava / shora dolů):
1. **Hlavní vypínač rozvaděče:** musí umožnit vypnout celou rozvodnici jedním úkonem (např. 3pólový vypínač 32 A nebo 40 A).
2. **Přepěťová ochrana SPD (Typ 1+2):** zapojená hned za hlavním vypínačem s co nejkratším spojením na hlavní ochrannou přípojnici PE.
3. **Proudové chrániče (RCD / jističochrániče RCBO):**
   * Doporučuje se rozdělit obvody alespoň mezi 2 až 3 chrániče (nebo použít RCBO pro klíčové okruhy jako lednice a mrazák), aby porucha na jednom spotřebiči nezhasla celý dům.
4. **Jističe jednotlivých vývodů:**
   * Světla: 10 A char. B (kabel 1,5 mm²)
   * Zásuvky: 16 A char. B (kabel 2,5 mm²)
   * 3f spotřebiče (varná deska): 3x16 A char. B
5. **Sběrnice N a PE:**
   * Sběrnice PE je spojena s hlavní uzemňovací svorkovnicí (MET/HOP).
   * Každý proudový chránič musí mít svou **VLASTNÍ, izolovanou modrou sběrnici N**, která se nesmí spojit s jiným chráničem ani s PE!

### Ochranné pospojování (hlavní a doplňkové):
* **Hlavní pospojování:** spojuje hlavní uzemňovací svorkovnici (MET) s kovovým potrubím vody, plynu, topení a základovým zemničem vodičem min. **$6\\text{ mm}^2$ Cu** (resp. polovina největšího PE, max 25 mm²).
* **Doplňkové pospojování v koupelnách:** spojení kovových van, sprchových vaniček a trubek vodičem min. **$2,5\\text{ mm}^2$** (mechanicky chráněný) nebo **$4\\text{ mm}^2$** (nechráněný).`,
        keyTakeaways: [
          'Rozvaděč: hlavní vypínač -> SPD -> chrániče -> jističe vývodů.',
          'Každý chránič MUSÍ mít svou oddělenou N svorkovnici.',
          'Hlavní pospojování MET spojuje vodovod, plyn, topení se zemničem.'
        ],
        examTips: [
          'Co se stane, když zapojíš nulák ze zásuvky za chráničem 1 na nulovou sběrnici chrániče 2? Chránič 1 i 2 při zapnutí zátěže okamžitě vypadnou, protože pro oba vznikne rozdílový proud!'
        ]
      },
      {
        id: '6-4',
        title: 'Instalace v koupelnách a sprchách dle ČSN 33 2000-7-701',
        standardRefs: ['ČSN 33 2000-7-701 ed. 2'],
        content: `Koupelny jsou prostory se zvýšeným rizikem úrazu z důvodu mokrého těla a sníženého odporu kůže. Dělí se na 3 zóny:

### Zóna 0 (vnitřní prostor vany nebo sprchové vaničky):
* **Povoleno pouze:** Zařízení určená pro tuto zónu s ochranou **SELV do 12 V AC / 30 V DC**, zdroj bezpečně mimo zónu 0 a 1.
* Krytí: minimálně **IP X7** (ponoření do vody).
* Žádné zásuvky ani spínače!

### Zóna 1 (prostor nad vanou do výšky 2,25 m od podlahy):
* **Povoleno:** Pevně připojené ohřívače vody (bojler), sprchová čerpadla, ventilátory a zařízení SELV do 25 V AC.
* Krytí: minimálně **IP X4** (stříkající voda).
* Žádné běžné zásuvky ani vypínače!

### Zóna 2 (vodorovně 0,6 m od hranice zóny 1, výška do 2,25 m):
* **Povoleno:** Svítidla třídy II, ventilátory, otopné žebříky, jednotky pro holicí strojky s oddělovacím trafem.
* Krytí: minimálně **IP X4**.

### Mimo zóny (dříve zóna 3):
* Lze umístit běžné zásuvky a spínače, **ALE VŠECHNY obvody musí být chráněny proudovým chráničem $I_{\\Delta n} \\le 30\\text{ mA}$**!`,
        keyTakeaways: [
          'Zóna 0: vnitřek vany, pouze SELV do 12 V AC, krytí IPX7.',
          'Zóna 1: nad vanou do 2,25 m, pouze bojler/ventilátor, krytí IPX4.',
          'Zóna 2: 0,6 m kolem vany, krytí IPX4.',
          'Všechny zásuvky v koupelně musí být chráněny chráničem 30 mA!'
        ],
        examTips: [
          'Může být zásuvka na 230 V v zóně 2? NE! Zásuvky na 230 V jsou povoleny až mimo zónu 2 (více než 60 cm od hrany vany/sprchy).'
        ]
      }
    ]
  },
  {
    id: 7,
    slug: 'diagnostikovani-poruch',
    code: '26-017-H/07',
    title: 'Diagnostikování poruch elektrických instalací',
    shortDescription: 'Metodika vyhledávání přerušení obvodu, zkratu L-N, průrazu na kostru L-PE, falešného vybavování chráničů a postup odstranění.',
    iconName: 'Activity',
    totalQuestions: 18,
    subchapters: [
      {
        id: '7-1',
        title: 'Metodický postup vyhledávání závad v instalaci',
        standardRefs: ['Revizní a servisní postupy'],
        content: `Při diagnostice poruchy postupuje montér vždy systematicky od nejjednoduššího k nejsložitějšímu:

### 1. Získání informací a analýza symptomů:
* Co přesně se stalo? Kdy k závadě došlo? (Při bouřce? Po zapnutí konkrétního spotřebiče? Po navrtání poličky do zdi?)
* Co reagovalo? (Spadl jistič, vypadl proudový chránič, nebo se spálila pojistka?)

### 2. Vizuální a smyslová kontrola:
* Zápach spálené izolace, očouzení krabic, mechanické poškození přívodního kabelu, uvolněný šroub na svorce, známky vniknutí vody do svítidla či zásuvky.

### 3. Vylučovací metoda (rozpojování obvodů):
* Vypnout všechny jističe v rozvaděči.
* Pokud padá proudový chránič, odpojit postupně i nulové vodiče jednotlivých okruhů (svod mezi N a PE totiž chránič spolehlivě vybaví, i když je jistič fáze vypnutý!).
* Nahodit chránič a postupně po jednom zapínat jednotlivé jističe. Okruh, při jehož zapnutí chránič vypadne, je vadný.`,
        keyTakeaways: [
          'Systematický postup: dotaz -> zraková kontrola -> měření.',
          'Vypnutý jistič neodpojí nulák N! Svod N-PE shazuje chránič i při vypnutém jističi.',
          'Při hledání zkratu se postupuje půlením trasy (rozpojení ve středové krabici).'
        ],
        examTips: [
          'Zkoušející ti nasimuluje závadu: „Chránič padá, i když jsou všechny jističe shozené dolů. Kde je závada a jak ji najdete?“ Správná odpověď: Závada je mezi N a PE (nulák se dotýká kostry). Jističe odpojují jen fázi L, nulový vodič zůstává spojený přes N můstek. Musím postupně odpojovat nuláky z N můstku a měřit izolační stav proti PE.'
        ]
      },
      {
        id: '7-2',
        title: 'Časté poruchy a jejich diagnostika',
        standardRefs: ['Praktická diagnostika'],
        content: `### 1. Přerušený vodič (např. zásuvka nefunguje):
* **Příznaky:** Na zásuvce není napětí 230 V, ale jistič drží v poloze ZAPNUTO.
* **Měření dvoupólovou zkoušečkou:**
  * L proti N: naměřeno 0 V.
  * L proti PE: naměřeno 230 V $\\implies$ je přerušený nulový vodič N!
  * L proti PE: naměřeno 0 V, ale zkoušečka na fázi svítí $\\implies$ přerušený fázový vodič L.
  * Postup: Kontrola dotažení svorek v předchozí zásuvce nebo krabici.

### 2. Zkrat mezi fází a nulákem (L - N):
* **Příznaky:** Jistič okamžitě s ránou vypadne při pokusu o nahození.
* **Měření (BEZ NAPĚTÍ):** Ohmetrem nebo zkoušečkou spojitosti mezi L a N. Pokud měřák pípá i po vytažení všech spotřebičů, je zkrat v kabelu nebo v krabici (např. provrtaný kabel).

### 3. Falešné vybavování proudového chrániče (RCD):
* **Častá příčina:** Záměna vodiče N a PE v zásuvce (tzv. "nulování" starého typu v síti TN-S). Dokud do zásuvky nic nezapojíš, chránič drží. Jakmile zapojíš stolní lampu, proud se vrací vodičem PE místo N a chránič okamžitě spadne!
* **Další příčina:** Vlhkost ve venkovním svítidle nebo topném tělese bojleru (mikrosvod $R_{iso} < 7\\text{ k}\\Omega$ způsobí unikající proud $> 30\\text{ mA}$).`,
        keyTakeaways: [
          'Zkoušečka změří L-PE i L-N -> okamžitě víš, který vodič je přerušený.',
          'Měření zkratu se provádí VÝHRADNĚ bez napětí ohmetrem!',
          'Záměna N a PE vyhodí chránič až při zatížení okruhu.'
        ],
        examTips: [
          'Při zkoušce zkoušející rád zapojí do zásuvky N na kolík a PE na pravou dutinku. Po připojení zátěže chránič vybaví. Zkoušející se zeptá: „Proč to spadlo až po zapnutí vrtačky, a ne hned?“ Odpověď: Protože před zapnutím netekl žádný proud, takže součet proudů byl nulový. Až po zapnutí tekl proud do země vodičem PE!'
        ]
      }
    ]
  },
  {
    id: 8,
    slug: 'prvni-pomoc-pri-urazu-proudem',
    code: '26-017-H/08',
    title: 'Poskytování první pomoci při úrazu elektrickým proudem',
    shortDescription: 'Účinky el. proudu na lidský organismus, bezpečné vyproštění postiženého, KPR 30:2, volání 155 a popáleniny.',
    iconName: 'HeartPulse',
    totalQuestions: 15,
    subchapters: [
      {
        id: '8-1',
        title: 'Účinky elektrického proudu na člověka',
        standardRefs: ['ČSN IEC 60479-1'],
        content: `Rozhodujícím faktorem pro závažnost úrazu je **velikost proudu protékajícího tělem, cesta proudu a doba průchodu**:

### Prahové hodnoty střídavého proudu (50 Hz):
* **0,5 až 1,5 mA – Práh vnímání:** Lehký pocit brnění v prstech, bez nebezpečí.
* **10 až 15 mA – Práh uvolnění (tetanický proud):** Dochází k nedobrovolným křečím svalů. Člověk **nemůže sám pustit** sevřený vodič!
* **25 až 50 mA:** Ztížené dýchání, křeče dýchacích svalů, nástup bezvědomí při delším působení.
* **nad 50 až 100 mA – Práh komorové fibrilace srdce:** Srdce přestane pumpovat krev, jen se neúčinně chvěje. Dochází ke zástavě krevního oběhu a klinické smrti během několika sekund!
* **nad 1 A:** Těžké popáleniny tkání, zástava srdce.

### Vliv frekvence:
* Střídavý proud o frekvenci $50\\text{ Hz}$ je pro lidské srdce přibližně **4× až 5× nebezpečnější** než stejnosměrný proud, protože $50\\text{ Hz}$ přímo zasahuje do rytmu srdečních stahů.`,
        keyTakeaways: [
          'Rozhoduje proud, cesta tělem a čas působení.',
          'Od cca 10-15 mA člověk nedokáže pustit vodič kvůli křeči.',
          'Nad 50-100 mA hrozí komorová fibrilace a smrtelná zástava srdce.'
        ],
        examTips: [
          'Zabíjí napětí, nebo proud? Vždy proud, který proteče tělem! Napětí je pouze hnací silou (dle Ohmova zákona I = U / R, kde odpor lidského těla bývá 1000 až 3000 Ω).'
        ]
      },
      {
        id: '8-2',
        title: 'Vyproštění z dosahu proudu a kardiopulmonální resuscitace (KPR)',
        standardRefs: ['Doporučení ERC pro resuscitaci', 'Zásady první pomoci'],
        content: `Při záchraně postiženého platí železné pravidlo: **BEZPEČNOST ZACHRÁNCE JE NA PRVNÍM MÍSTĚ!**

### 1. Bezpečné vyproštění postiženého:
* **U zařízení nízkého napětí (do 1000 V):**
  * Okamžitě vypnout přívod (vypínač, jistič, vytáhnout vidlici ze zásuvky).
  * Pokud to nelze hned: odsunout postiženého nebo vodič pomocí **suchého nevodivého předmětu** (suché dřevěné násady, lana, plastové tyče, suchého oděvu).
  * **NIKDY se nedotýkat nechráněnýma rukama jeho těla**, dokud je ve styku s proudem!
* **U zařízení vysokého napětí (VN nad 1000 V):**
  * Nepřibližovat se! Hrozí přeskok elektrického oblouku a krokové napětí.
  * Zůstat v bezpečné vzdálenosti (min. 18–20 metrů), pohybovat se pouze přisouváním nohou těsně k sobě (tzv. "husím krokem" či snožmo), a okamžitě volat dispečink rozvodných závodů a hasiče (112 / 150).

### 2. Zjištění stavu a volání záchranné služby (155 / 112):
* Hlasitě oslovit, zatřást rameny.
* Pokud nereaguje: zprůchodnit dýchací cesty zakloněním hlavy a zvednutím brady.
* Zkontrolovat dýchání po dobu 10 sekund (zrakem sledovat zvedání hrudníku, sluchem a citem proud vzduchu).
* **Nedýchá nebo lapá po dechu (gasping):** Okamžitě volat **155** (zapnout hlasitý odposlech) a zahájit resuscitaci!

### 3. Kardiopulmonální resuscitace (KPR):
* **Poměr stlačení a vdechů:** **30 : 2**
* **Místo stlačování:** Střed hrudníku (dolní polovina hrudní kosti).
* **Hloubka stlačení:** **5 až 6 cm**.
* **Frekvence:** **100 až 120 stlačení za minutu** (do rytmu písně „Stayin' Alive“).
* Po 30 stlačeních 2 záchranné vdechy (pokud zachránce nemůže dýchat z úst do úst, provádí nepřetržitou masáž hrudníku).
* Pokud je k dispozici **defibrilátor (AED)**, okamžitě jej zapnout a řídit se jeho hlasovými pokyny (při komorové fibrilaci po zásahu proudem je AED klíčem k přežití!).`,
        keyTakeaways: [
          'Vlastní bezpečnost je první: vypnout jistič nebo použít suché nevodivé předměty.',
          'U VN nepřistupovat kvůli krokovému napětí (odskakovat snožmo).',
          'KPR poměr: 30 stlačení : 2 vdechy, hloubka 5-6 cm, tempo 100-120/min.',
          'Telefon na ZZS: 155 (mezinárodní tísňová linka 112).'
        ],
        examTips: [
          'U zkoušky je modelová situace první pomoci povinná. Zkoušející se zeptá: „Kolega leží na zemi s kabelem v ruce, co uděláte jako první?“ Správná odpověď: Vypnu jistič / odpojím přívod! Kdybys k němu bezmyšlenkovitě přiběhl a chytil ho za ruku, zkoušku jsi neudělal.'
        ]
      }
    ]
  }
];
