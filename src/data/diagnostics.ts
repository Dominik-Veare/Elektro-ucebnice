import { DiagnosticScenario } from '../types';

export const DIAGNOSTIC_SCENARIOS: DiagnosticScenario[] = [
  {
    id: 'diag-1',
    title: 'Proudový chránič padá, i když jsou všechny jističe shozené',
    difficulty: 'zkoušková',
    description: 'V bytové rozvodnici po příchodu bouřky nebo zapnutí nového obvodu vypadl 3fázový proudový chránič RCD (30 mA). Majitel bytu shodil všechny jednotlivé jističe do polohy VYPNUTO, ale chránič přesto nelze nahodit – při pokusu o zvednutí páčky okamžitě spadne.',
    symptoms: [
      'Proudový chránič 30 mA nejde nahodit ani při všech shozených jističích okruhů.',
      'Po mechanickém stisknutí tlačítka TEST se nic nového neděje (páčka je dole).'
    ],
    initialState: {
      boardDescription: 'Bytová rozvodnice TN-S, hlavní vypínač 40 A, proudový chránič 30 mA 4pólový, 12× jistič B10 a B16.',
      affectedCircuit: 'Jeden z koncových zásuvkových nebo světelných okruhů.'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Analýza chování rozvodnice a pochopení funkce jističů',
        description: 'Uvědom si, že běžné jednopólové jističe (1P) odpojují pouze fázový vodič L. Nulové vodiče N zůstávají trvale spojeny na společném modrém můstku za chráničem.',
        measurementTool: 'zrakova-kontrola',
        expectedResult: 'Všechny jističe jsou dole, ale chránič stále padá.',
        interpretation: 'Závada nemůže být ve fázi L (ta je jističi odpojena). Jedná se o svod mezi nulovým vodičem N a ochranným vodičem PE nebo zemí v některém z vývodů!'
      },
      {
        stepNumber: 2,
        title: 'Vylučovací metoda na nulové svorkovnici',
        description: 'Při vypnutém hlavním vypínači začneme postupně odpojovat jednotlivé modré vodiče N z nulové sběrnice chrániče a po každém vodiči zkusíme chránič nahodit (nebo měříme megmetem izolační stav odpojeného N proti PE).',
        measurementTool: 'megmet',
        expectedResult: 'Při odpojení nulového vodiče č. 7 (zásuvky zahrada / terasa) chránič okamžitě drží nahoře! Měření izolačního odporu odpojeného vodiče N proti PE ukazuje 0,02 MΩ (svod).',
        interpretation: 'Vadný okruh je identifikován: jedná se o obvod venkovních zahradních zásuvek.'
      },
      {
        stepNumber: 3,
        title: 'Lokalizace fyzické závady na koncovém zařízení',
        description: 'Prohlídka venkovních zásuvek a rozbočných krabic na zahradě.',
        measurementTool: 'zrakova-kontrola',
        expectedResult: 'Ve venkovní zásuvce na terase byla nalezena zateklá dešťová voda přes zpuchřelé gumové těsnění víčka.',
        interpretation: 'Voda vytvořila vodivý můstek mezi svorkou N a kovovou konstrukcí / PE svorkou, čímž vznikl reziduální proud překračující 15–30 mA.'
      }
    ],
    solution: 'Vyčištění a vysušení zásuvky, výměna poškozeného těsnění IP 44, dotažení kabelové vývodky, změření izolačního odporu (Riso > 100 MΩ), zpětné zapojení N vodiče do svorkovnice rozvaděče a úspěšné nahození chrániče.',
    examExplanation: 'Zkoušející u této úlohy hodnotí, zda uchazeč chápe, že 1P jistič neodpojuje N vodič a že svod N-PE spolehlivě vybaví chránič i při vypnutých jističích.'
  },
  {
    id: 'diag-2',
    title: 'Zásuvka nefunguje, ale zkoušečka na fázi svítí',
    difficulty: 'střední',
    description: 'V kuchyni přestala fungovat rychlovarná konvice. Uživatel zkusil zásuvku vyzkoušet fázovkou a kontrolka svítí. Přesto žádný spotřebič v zásuvce neběží. Jistič v rozvaděči je nahoře.',
    symptoms: [
      'Spotřebič v zásuvce nefunguje.',
      'Fázovka svítí na levé zdířce.',
      'Jistič okruhu v rozvaděči drží nahoře.'
    ],
    initialState: {
      boardDescription: 'Bytová rozvodnice, obvod jištěn B16.',
      affectedCircuit: 'Kuchyňský zásuvkový okruh (CYKY 3x2,5).'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Měření skutečných napětí dvoupólovou zkoušečkou',
        description: 'Změřit napětí mezi všemi třemi kontakty zásuvky: L-N, L-PE a N-PE.',
        measurementTool: 'zkousecka',
        expectedResult: 'Mezi L a PE naměřeno 230 V. Mezi L a N naměřeno 0 V. Mezi N a PE naměřeno 0 V.',
        interpretation: 'Fáze L i ochranný vodič PE jsou v pořádku. Naměřené nulové napětí mezi L a N jednoznačně dokazuje, že je přerušen nulový vodič N!'
      },
      {
        stepNumber: 2,
        title: 'Kontrola trasy vedení a předchozích zásuvek',
        description: 'Vypnout jistič, ověřit beznapěťový stav, otevřít krabici předchozí zásuvky ve smyčce a zkontrolovat stav svorek N.',
        measurementTool: 'zkousecka',
        expectedResult: 'V předchozí zásuvce byl modrý vodič N vysunutý ze šroubové svorky z důvodu nedostatečného dotažení při původní montáži.',
        interpretation: 'Uvolněný spoj způsobil přerušení nulového vodiče pro zbytek smyčky.'
      }
    ],
    solution: 'Správné odizolování vodiče, vložení do svorky zásuvky (nebo spojení pomocí bezšroubové WAGO svorky) a pevné dotažení. Kontrola spojitosti obvodu a ověření napětí 230 V mezi L a N pod zátěží.',
    examExplanation: 'Ukazuje zásadní chybu používání jednopólových fázovek (které indikují napětí, i když chybí nulák) a prověřuje správný postup měření dvoupólovou zkoušečkou.'
  },
  {
    id: 'diag-3',
    title: 'Chránič vypadne až po zapnutí spotřebiče do zásuvky',
    difficulty: 'zkoušková',
    description: 'Po výměně staré dvojzásuvky za novou je vše zdánlivě v pořádku: jističe drží, chránič drží. Jakmile se však do nově osazené zásuvky zapojí stolní lampa nebo vrtačka a zapne se vypínač na spotřebiči, okamžitě vypadne proudový chránič pro celý dům.',
    symptoms: [
      'Bez spotřebiče je vše bez napětí stabilní.',
      'Po zasunutí spotřebiče a jeho zapnutí chránič okamžitě vybaví.'
    ],
    initialState: {
      boardDescription: 'Rozvodnice TN-S s proudovým chráničem 30 mA.',
      affectedCircuit: 'Obvod zásuvek v obývacím pokoji.'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Analýza příznaku',
        description: 'Proč chránič vypadne až při zatížení okruhu?',
        measurementTool: 'zrakova-kontrola',
        expectedResult: 'Chránič reaguje na rozdílový proud tekoucí mimo nulový vodič N.',
        interpretation: 'Znamená to, že pracovní proud z fáze neprochází zpět přes N pól chrániče, ale teče vodičem PE! To ukazuje na záměnu N a PE vodiče v zapojení zásuvky.'
      },
      {
        stepNumber: 2,
        title: 'Demontáž krytu zásuvky a revize zapojení svorek',
        description: 'Vypnout jistič, ověřit beznapětí dvoupólovou zkoušečkou, demontovat kryt zásuvky a zkontrolovat barvy zapojené na kolík a dutinky.',
        measurementTool: 'zrakova-kontrola',
        expectedResult: 'Na zemnicí kolík byl omylem připojen světle modrý vodič (N) a na pravou dutinku byl připojen zeleno-žlutý vodič (PE).',
        interpretation: 'Při zapnutí spotřebiče třídy I tekl pracovní proud přes PE do země, což chránič okamžitě vyhodnotil jako nebezpečný únikový proud a vybavil.'
      }
    ],
    solution: 'Přepojení vodičů do správné normové konfigurace: fáze (hnědá/černá) vlevo, nulák (modrá) vpravo, ochranný vodič (zeleno-žlutá) na zemnicí kolík. Ověření proudovým chráničem a zátěžovým testem.',
    examExplanation: 'Typický zkouškový chyták. Zkoušející ověřuje, zda montér chápe, proč záměna N a PE neprojeví zkrat okamžitě, ale až s průchodem proudu spotřebičem.'
  }
];
