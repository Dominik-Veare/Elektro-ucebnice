import { DiagnosticScenario } from '../types';

export const DIAGNOSTIC_SCENARIOS: DiagnosticScenario[] = [
  {
    id: 'diag-1',
    title: 'Proudový chránič padá, i když jsou všechny jističe shozené',
    difficulty: 'zkoušková',
    description: 'V bytové rozvodnici po příchodu bouřky nebo zapnutí nového obvodu vypadl 3fázový proudový chránič RCD (30 mA). Majitel bytu shodil všechny jednotlivé jističe do polohy VYPNUTO, ale chránič přesto nelze nahodit – při pokusu o zvednutí páčky okamžitě spadne.',
    symptoms: [
      'Proudový chránič 30 mA nejde nahodit ani při všech shozených jednopólových jističích okruhů.',
      'V rozvaděči není slyšet žádný zkratový výboj, ale spoušť chrániče ihned vybaví.'
    ],
    initialState: {
      boardDescription: 'Bytová rozvodnice TN-S, hlavní vypínač 40 A, proudový chránič 30 mA 4pólový, 12× jistič 1P B10 a B16.',
      affectedCircuit: 'Jeden z koncových zásuvkových nebo světelných okruhů.'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Analýza chování rozvodnice a pochopení funkce 1P jističů',
        description: 'Uvědom si, že běžné jednopólové jističe (1P) odpojují pouze fázový vodič L. Nulové vodiče N všech obvodů zůstávají trvale spojeny na společném modrém N můstku za chráničem.',
        measurementTool: 'zrakova-kontrola',
        expectedResult: 'Všechny jističe jsou dole, ale chránič stále padá.',
        interpretation: 'Závada nemůže být pouze ve fázi L (ta je jističi odpojena). Jedná se o spojení nebo izolační svod mezi nulovým vodičem N a ochranným vodičem PE (zemí) v některém z vývodů!'
      },
      {
        stepNumber: 2,
        title: 'Vylučovací metoda na nulové svorkovnici N a měření Riso',
        description: 'Vypneme hlavní vypínač, ověříme beznapěťový stav a postupně odpojujeme jednotlivé modré vodiče N z nulové sběrnice chrániče. U každého odpojeného vodiče N změříme izolační odpor (500 V DC) proti přípojnici PE.',
        measurementTool: 'megmet',
        expectedResult: 'U odpojeného nulového vodiče č. 7 (zásuvky zahrada / terasa) naměřeno Riso(N-PE) = 0,02 MΩ (hluboko pod limitem 1,0 MΩ). Po jeho odpojení jde chránič okamžitě nahodit!',
        interpretation: 'Vadný okruh je přesně identifikován: jedná se o obvod venkovních zahradních zásuvek.'
      },
      {
        stepNumber: 3,
        title: 'Lokalizace fyzické závady na koncovém zařízení',
        description: 'Prohlídka venkovních zásuvek a rozbočných krabic na zahradě (v beznapěťovém stavu).',
        measurementTool: 'zrakova-kontrola',
        expectedResult: 'Ve venkovní zásuvce na terase byla nalezena zateklá dešťová voda přes prasklou kabelovou průchodku.',
        interpretation: 'Voda vytvořila vodivý můstek mezi svorkou N a ochrannou svorkou PE, čímž vznikl trvalý svodový proud do země.'
      }
    ],
    solution: 'Vysušení a vyčištění případně výměna venkovní zásuvky IP 44, utěsnění průchodky (kabel přivést spodem), kontrolní měření izolačního odporu Riso > 100 MΩ, zpětné zapojení vodiče N v rozvaděči a ověření funkce RCD.',
    examExplanation: 'Zkoušející u této úlohy hodnotí, zda uchazeč chápe, že 1P jistič neodpojuje vodič N a že svod N–PE vybaví proudový chránič i při vypnutých jističích.'
  },
  {
    id: 'diag-2',
    title: 'Zásuvka nefunguje, ale fázovka na levé dutince svítí',
    difficulty: 'střední',
    description: 'V kuchyni přestala fungovat rychlovarná konvice. Uživatel zkusil zásuvku vyzkoušet jednopólovou doutnavkovou fázovkou a kontrolka na levé zdířce svítí. Přesto žádný spotřebič v zásuvce neběží. Jistič i chránič v rozvaděči drží nahoře.',
    symptoms: [
      'Spotřebič v zásuvce nefunguje.',
      'Jednopólová fázovka svítí na levé zdířce (a při zapnutém spotřebiči svítí dokonce na obou zdířkách!).',
      'Jistič okruhu v rozvaděči je v poloze ZAPNUTO.'
    ],
    initialState: {
      boardDescription: 'Bytová rozvodnice TN-S, obvod jištěn B16.',
      affectedCircuit: 'Zásuvkový okruh (CYKY-J 3×2,5 mm²).'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Měření skutečného napětí dvoupólovou zkoušečkou',
        description: 'Jednopólová fázovka nestačí! Změříme napětí dvoupólovou zkoušečkou mezi všemi třemi kontakty zásuvky: L–N, L–PE a N–PE.',
        measurementTool: 'zkousecka',
        expectedResult: 'Mezi L a PE naměřeno 230 V. Mezi L a N naměřeno 0 V. Mezi N a PE naměřeno 0 V.',
        interpretation: 'Fáze L i ochranný vodič PE jsou v pořádku (proto je mezi L a PE 230 V). Nulové napětí mezi L a N jednoznačně dokazuje, že je přerušen nulový pracovní vodič N!'
      },
      {
        stepNumber: 2,
        title: 'Kontrola předchozí zásuvky ve smyčce (v beznapěťovém stavu)',
        description: 'Vypneme jistič, zajistíme pracoviště dle 5 pravidel, ověříme beznapěťový stav, demontujeme kryt nefunkční a předchozí zásuvky a zkontrolujeme modrý vodič N.',
        measurementTool: 'zrakova-kontrola',
        expectedResult: 'V předchozí zásuvce byl odchozí modrý vodič N uvolněný ze svorky (šroub svorky byl dotažen přes plastovou izolaci žíly).',
        interpretation: 'Zašroubování svorky přes izolaci způsobilo přerušení nulového vodiče N pro následující zásuvku.'
      }
    ],
    solution: 'Správné odizolování modrého vodiče N (cca 10–12 mm podle typu svorky, aby izolace nebyla pod kontaktem a měď nevyčnívala ven), pevné dotažení svorky a následné přeměření napětí L–N (230 V) i impedance smyčky Zs.',
    examExplanation: 'Prokazuje zásadní rozdíl mezi jednopólovou fázovkou a dvoupólovou zkoušečkou a schopnost okamžitě rozlišit přerušený vodič N od přerušeného vodiče L nebo PE.'
  },
  {
    id: 'diag-3',
    title: 'Chránič vypadne až po zapnutí spotřebiče do zásuvky',
    difficulty: 'zkoušková',
    description: 'Po montáži nové zásuvky na zkušebním panelu je vše zdánlivě v pořádku: jistič i proudový chránič drží nahoře, mezi levou dutinkou a kolíkem je 230 V. Jakmile se však do zásuvky zapojí stolní lampa (spotřebič třídy II bez kolíku!) a zapne se vypínačem, okamžitě vypadne proudový chránič.',
    symptoms: [
      'Naprázdno (bez zapnutého spotřebiče) jistič i proudový chránič drží.',
      'Po zapnutí jakéhokoliv spotřebiče do zásuvky proudový chránič okamžitě vybaví.'
    ],
    initialState: {
      boardDescription: 'Rozvodnice TN-S s proudovým chráničem 30 mA.',
      affectedCircuit: 'Koncový zásuvkový obvod.'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Logická analýza příznaku a test zkoušečkou s testem RCD',
        description: 'Proč chránič vypadne až při průchodu pracovního proudu zátěží (i u dvoupólové lampičky bez PE)?',
        measurementTool: 'zkousecka',
        expectedResult: 'Chránič vyhodnocuje proud vracející se z pravé dutinky jako únikový proud mimo součtový transformátor.',
        interpretation: 'Pracovní proud z pravé dutinky se nevrací modrým vodičem N přes chránič, ale odtéká zeleno-žlutým vodičem PE přímo na uzemňovací sběrnici! Došlo k záměně vodičů N a PE.'
      },
      {
        stepNumber: 2,
        title: 'Kontrola zapojení vodičů uvnitř zásuvky (bez napětí)',
        description: 'Vypneme obvod dle 5 pravidel, ověříme beznapěťový stav, sejmeme kryt zásuvky a zkontrolujeme zapojení svorek.',
        measurementTool: 'zrakova-kontrola',
        expectedResult: 'Na ochranný kolík byl omylem připojen světle modrý vodič (N) a na pravou dutinku zeleno-žlutý vodič (PE).',
        interpretation: 'Potvrzena záměna středního vodiče N a ochranného vodiče PE.'
      }
    ],
    solution: 'Přepojení vodičů podle ČSN 33 2130 ed. 3: zeleno-žlutý vodič PE na ochranný kolík nahoře, hnědý fázový vodič L do levé dutinky, modrý nulový vodič N do pravé dutinky. Následné měření spojitosti PE, impedance Zs a zatěžovací zkouška.',
    examExplanation: 'Jeden z nejčastějších chytáků u praktické zkoušky. Zkoušející ověřuje, zda uchazeč ví, proč prohození N a PE nevybaví chránič ihned po nahození jističe, ale až při odběru proudu.'
  },
  {
    id: 'diag-4',
    title: 'Spotřebič v zásuvce funguje, ale na kolíku chybí ochrana (přerušené PE)',
    difficulty: 'zkoušková',
    description: 'Zkoušející ti zadá kontrolu zásuvkového obvodu. Po zapojení stolní lampy do zásuvky lampa normálně svítí. Při pokusu o změření impedance poruchové smyčky Zs však revizní přístroj hlásí chybu „Chyba PE / 0 V L-PE“.',
    symptoms: [
      'Spotřebič v zásuvce normálně funguje (mezi L a N je 230 V).',
      'Revizní přístroj odmítá změřit impedanci smyčky Zs a test chrániče RCD.'
    ],
    initialState: {
      boardDescription: 'Cvičný panel s rozvodnicí TN-S a dvěma zásuvkami ve smyčce.',
      affectedCircuit: 'Druhá koncová zásuvka v pořadí.'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Měření napětí dvoupólovou zkoušečkou mezi L–N, L–PE a N–PE',
        description: 'Změříme napětí mezi dutinkami navzájem a mezi levou dutinkou L a ochranným kolíkem PE.',
        measurementTool: 'zkousecka',
        expectedResult: 'Mezi L a N naměřeno 230 V. Mezi L a kolíkem PE naměřeno 0 V!',
        interpretation: 'Pracovní vodiče L a N jsou pod napětím (proto spotřebič běží), ale ochranný kolík PE je zcela odpojen od země – je přerušen ochranný vodič PE!'
      },
      {
        stepNumber: 2,
        title: 'Měření spojitosti ochranného vodiče PE (v beznapěťovém stavu)',
        description: 'Vypneme obvod dle 5 pravidel, ověříme beznapěťový stav a měříme spojitost PE (proudem ≥ 200 mA) od přípojnice PE v rozvaděči k 1. a 2. zásuvce.',
        measurementTool: 'revizni-pristroj',
        expectedResult: 'Na 1. zásuvce je odpor PE 0,08 Ω (v pořádku), na 2. zásuvce je odpor nekonečný (> 1999 Ω – rozpojeno).',
        interpretation: 'Zeleno-žlutý vodič PE je přerušen v úseku mezi 1. a 2. zásuvkou (vypadlý z bezšroubové svorky v krabici 1. zásuvky).'
      }
    ],
    solution: 'Řádné zapojení zeleno-žlutého vodiče PE v krabici 1. zásuvky, kontrolní měření spojitosti PE (odpor 0,12 Ω), zapnutí obvodu a úspěšné změření impedance smyčky Zs i vybavení chrániče RCD.',
    examExplanation: 'Kritická bezpečnostní závada: funkční spotřebič neznamená bezpečnou zásuvku! Bez připojeného PE kolíku nefunguje ochrana automatickým odpojením od zdroje.'
  },
  {
    id: 'diag-5',
    title: 'Schodišťové spínače (6 + 6) fungují jen v jedné poloze prvního vypínače',
    difficulty: 'střední',
    description: 'Na chodbě bylo zapojeno ovládání světla ze dvou míst pomocí dvou střídavých přepínačů č. 6. Světlo se však chová divně: pokud se první vypínač č. 6A přepne dolů, druhým vypínačem č. 6B vůbec nejde světlo rozsvítit!',
    symptoms: [
      'Ovládání ze dvou míst nefunguje nezávisle.',
      'Druhý přepínač 6B spíná a vypíná světlo pouze tehdy, když je první přepínač 6A sepnutý v jedné konkrétní poloze.'
    ],
    initialState: {
      boardDescription: 'Světelný obvod jištěný B10, spínače 6A a 6B propojené 3žilovým kabelem.',
      affectedCircuit: 'Světelný okruh chodby (řazení 6 + 6).'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Analýza schématu zapojení střídavého přepínače č. 6',
        description: 'Každý přepínač č. 6 má jednu hlavní (kmenovou) svorku L (vstupní/výstupní) a dvě přepínací (korespondenční) svorky se šipkami ven.',
        measurementTool: 'zrakova-kontrola',
        expectedResult: 'Pokud se prohodí kmenová svorka L s jednou korespondenční svorkou, v jedné poloze přepínače zůstane obvod trvale rozpojený.',
        interpretation: 'V jednom z přepínačů č. 6 je špatně zapojen přívodní fázový vodič (nebo odchozí vodič ke svítidlu) do korespondenční svorky místo do kmenové svorky L!'
      },
      {
        stepNumber: 2,
        title: 'Kontrola svorek přepínačů 6A a 6B (v beznapěťovém stavu)',
        description: 'Vypneme jistič B10, zajistíme a ověříme beznapěťový stav, vyjmeme strojky přepínačů 6A a 6B a zkontrolujeme zapojení na svorku L.',
        measurementTool: 'zrakova-kontrola',
        expectedResult: 'Ve spínači 6A byla přívodní stálá fáze L zapojena na výstupní korespondenční svorku a jeden korespondenční vodič byl na svorce L.',
        interpretation: 'Nalezena záměna kmenového přívodu L a korespondenčního vodiče.'
      }
    ],
    solution: 'Přepojení přívodní fáze na kmenovou svorku L v přepínači 6A (a odchodu ke svítidlu na kmenovou svorku L v přepínači 6B), zatímco dva korespondenční vodiče propojují výstupní svorky obou přepínačů. Ověření nezávislého rozsvěcení a zhasínání z obou míst.',
    examExplanation: 'Velmi častá chyba uchazečů přímo při praktickém zapojování panelu u zkoušky. Vždy si na zadní straně strojku spínače č. 6 a č. 7 najdi vyražené schéma svorek!'
  }
];
