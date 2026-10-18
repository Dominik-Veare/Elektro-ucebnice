import React from 'react';

export interface DeviceSpec {
  id: string;
  code: string;
  name: string;
  category: 'din' | 'busbar' | 'switch' | 'socket' | 'appliance' | 'meter';
  categoryLabel: string;
  standard: string;
  terminals: { id: string; label: string; role: 'L' | 'N' | 'PE' | 'K' | 'CTRL'; description: string }[];
  examRule: string;
  commonMistake: string;
}

export const ELECTRICAL_DEVICES_CATALOG: DeviceSpec[] = [
  // 1. PŘÍSTROJE NA DIN LIŠTU
  {
    id: 'qm-3p',
    code: 'QM (3P)',
    name: 'Hlavní vypínač rozvaděče 3pólový (63 A)',
    category: 'din',
    categoryLabel: '1. Přístroje na DIN lištu',
    standard: 'ČSN EN 60947-3, ČSN EN 61439-3',
    terminals: [
      { id: '1', label: '1 (L1 in)', role: 'L', description: 'Přívod fáze L1 (hnědá)' },
      { id: '3', label: '3 (L2 in)', role: 'L', description: 'Přívod fáze L2 (černá)' },
      { id: '5', label: '5 (L3 in)', role: 'L', description: 'Přívod fáze L3 (šedá)' },
      { id: '2', label: '2 (L1 out)', role: 'L', description: 'Výstup fáze L1 do rozvaděče' },
      { id: '4', label: '4 (L2 out)', role: 'L', description: 'Výstup fáze L2 do rozvaděče' },
      { id: '6', label: '6 (L3 out)', role: 'L', description: 'Výstup fáze L3 do rozvaděče' }
    ],
    examRule: 'Slouží k úplnému vypnutí celé bytové rozvodnice jedním úkonem. Spíná pouze fázové vodiče L1, L2, L3 (nikdy ne PEN/PE!).',
    commonMistake: 'Záměna s jističem – hlavní vypínač (odpínač) nemá nadproudovou spoušť, slouží k provoznímu a bezpečnostnímu odpojení.'
  },
  {
    id: 'mcb-1p',
    code: 'FA (B10 / B16 1P)',
    name: 'Jistič 1pólový (B10 světla / B16 zásuvky)',
    category: 'din',
    categoryLabel: '1. Přístroje na DIN lištu',
    standard: 'ČSN EN 60898-1',
    terminals: [
      { id: '1', label: '1', role: 'L', description: 'Fázový přívod (z hřebenové lišty nebo z výstupu chrániče)' },
      { id: '2', label: '2', role: 'L', description: 'Jištěný fázový výstup L do koncového obvodu' }
    ],
    examRule: 'Jistí fázový vodič L proti přetížení (bimetal) a zkratu (elektromagnetická spoušť: B = 3–5× In, C = 5–10× In). Utahovací moment svorek cca 2,0–2,5 Nm.',
    commonMistake: 'Skřípnutí plastové izolace pod třmen svorky nebo vyčnívající holá měď více než 1 mm mimo tělo jističe.'
  },
  {
    id: 'mcb-3p',
    code: 'FA (B16 3P)',
    name: 'Jistič 3pólový (B16 / C16 pro 400 V a sporák)',
    category: 'din',
    categoryLabel: '1. Přístroje na DIN lištu',
    standard: 'ČSN EN 60898-1',
    terminals: [
      { id: '1', label: '1 (L1)', role: 'L', description: 'Přívod L1 (hnědá)' },
      { id: '3', label: '3 (L2)', role: 'L', description: 'Přívod L2 (černá)' },
      { id: '5', label: '5 (L3)', role: 'L', description: 'Přívod L3 (šedá)' },
      { id: '2', label: '2 (L1)', role: 'L', description: 'Výstup L1 do 3f spotřebiče/zásuvky' },
      { id: '4', label: '4 (L2)', role: 'L', description: 'Výstup L2 do 3f spotřebiče/zásuvky' },
      { id: '6', label: '6 (L3)', role: 'L', description: 'Výstup L3 do 3f spotřebiče/zásuvky' }
    ],
    examRule: 'Při poruše v kterékoliv fázi odpojí mechanicky spřažená páčka současně všechny 3 fáze (L1, L2, L3). Zachovej pravotočivý sled fází!',
    commonMistake: 'Použití tří samostatných 1P jističů místo jednoho 3P jističe pro třífázový motor nebo zásuvku.'
  },
  {
    id: 'rcd-2p',
    code: 'FI / FB (RCD 2P 30mA)',
    name: 'Proudový chránič 2pólový (25 A / IΔn 30 mA, typ A)',
    category: 'din',
    categoryLabel: '1. Přístroje na DIN lištu',
    standard: 'ČSN EN 61008-1',
    terminals: [
      { id: '1', label: '1 (L in)', role: 'L', description: 'Přívod fáze L' },
      { id: 'N-in', label: 'N (in)', role: 'N', description: 'Přívod středního vodiče N z hlavní N sběrnice' },
      { id: '2', label: '2 (L out)', role: 'L', description: 'Výstup fáze L na jističe za chráničem' },
      { id: 'N-out', label: 'N (out)', role: 'N', description: 'Výstup N na samostatnou sběrnici N tohoto chrániče!' }
    ],
    examRule: 'Měří součet proudů tekoucích fází L a vracejících se vodičem N. Vybaví při rozdílu 15–30 mA do 300 ms (při 5× IΔn do 40 ms). Musí být předjištěn jističem!',
    commonMistake: 'Připojení nulového vodiče obvodu za chráničem na společnou N sběrnici před chráničem nebo na PE – chránič pak okamžitě padá!'
  },
  {
    id: 'rcd-4p',
    code: 'FI / FB (RCD 4P 30mA)',
    name: 'Proudový chránič 4pólový (40 A / IΔn 30 mA, typ A)',
    category: 'din',
    categoryLabel: '1. Přístroje na DIN lištu',
    standard: 'ČSN EN 61008-1',
    terminals: [
      { id: '1', label: '1 (L1)', role: 'L', description: 'Přívod L1' },
      { id: '3', label: '3 (L2)', role: 'L', description: 'Přívod L2' },
      { id: '5', label: '5 (L3)', role: 'L', description: 'Přívod L3' },
      { id: 'N-in', label: 'N (in)', role: 'N', description: 'Přívod N' },
      { id: '2', label: '2 (L1)', role: 'L', description: 'Výstup L1' },
      { id: '4', label: '4 (L2)', role: 'L', description: 'Výstup L2' },
      { id: '6', label: '6 (L3)', role: 'L', description: 'Výstup L3' },
      { id: 'N-out', label: 'N (out)', role: 'N', description: 'Výstup N na oddělenou sběrnici N chrániče' }
    ],
    examRule: 'Používá se pro třífázové zásuvky a skupinové jištění. Aby fungovalo zkušební tlačítko TEST (T), musí být pod napětím i ty póly, mezi kterými je zapojen vnitřní testovací odpor!',
    commonMistake: 'Opomenutí zapojit vodič N přes 4pólový chránič v soustavě TN-S.'
  },
  {
    id: 'rcbo-1p',
    code: 'FA/FB (RCBO B16/30mA)',
    name: 'Jističochránič (RCBO – B16 / IΔn 30 mA)',
    category: 'din',
    categoryLabel: '1. Přístroje na DIN lištu',
    standard: 'ČSN EN 61009-1',
    terminals: [
      { id: '1', label: '1 (L in)', role: 'L', description: 'Přívod fáze L' },
      { id: 'N-in', label: 'N (in)', role: 'N', description: 'Přívod středního vodiče N' },
      { id: '2', label: '2 (L out)', role: 'L', description: 'Jištěný a chráněný výstup L přímo do kabelu obvodu' },
      { id: 'N-out', label: 'N (out)', role: 'N', description: 'Chráněný výstup N přímo pro daný obvod (nepotřebuje N můstek!)' }
    ],
    examRule: 'Spojuje v jednom přístroji jistič (ochrana proti přetížení a zkratu) i proudový chránič (ochrana před unikajícím proudem 30 mA). Porucha jednoho okruhu neshodí ostatní okruhy v bytě!',
    commonMistake: 'Spojení modrého výstupu N z jističochrániče s nulovými vodiči jiných obvodů.'
  },
  {
    id: 'spd-t2',
    code: 'FS (SPD T1+T2)',
    name: 'Svodič přepětí SPD Typ 1+2 (3P+N)',
    category: 'din',
    categoryLabel: '1. Přístroje na DIN lištu',
    standard: 'ČSN EN 61643-11, ČSN 33 2000-5-534',
    terminals: [
      { id: 'L1', label: 'L1', role: 'L', description: 'Připojení fáze L1 za hlavním vypínačem' },
      { id: 'L2', label: 'L2', role: 'L', description: 'Připojení fáze L2' },
      { id: 'L3', label: 'L3', role: 'L', description: 'Připojení fáze L3' },
      { id: 'N', label: 'N', role: 'N', description: 'Připojení středního vodiče N' },
      { id: 'PE', label: 'PE / ⏚', role: 'PE', description: 'Nejkratší spojení na hlavní přípojnici PE / MET (min. 6 mm² Cu u T2, 16 mm² Cu u T1)' }
    ],
    examRule: 'Celková délka připojovacích vodičů (od fázové přípojnice přes SPD na sběrnici PE) NESMÍ překročit 0,5 m! Před měřením izolačního odporu Riso (500 V DC) se musí výměnné moduly SPD vytáhnout!',
    commonMistake: 'Dlouhý zeleno-žlutý vodič PE stočený do smyčky v rozvaděči (velká indukčnost znehodnotí ochranu) nebo ponechání SPD při měření Riso.'
  },
  {
    id: 'impulse-relay',
    code: 'KA (Impulzní relé)',
    name: 'Impulzní (paměťové / bistabilní) relé na DIN lištu',
    category: 'din',
    categoryLabel: '1. Přístroje na DIN lištu',
    standard: 'ČSN 33 2130 ed. 3 (Kritérium NSK 4b)',
    terminals: [
      { id: 'A1', label: 'A1 (cívka)', role: 'CTRL', description: 'Vstup ovládacího impulzu ze všech paralelně zapojených tlačítek' },
      { id: 'A2', label: 'A2 (cívka)', role: 'N', description: 'Trvalé připojení cívky na střední vodič N (modrá)' },
      { id: '1', label: '1 (kontakt in)', role: 'L', description: 'Přívod stálé fáze L z jističe B10 na silový kontakt' },
      { id: '2', label: '2 (kontakt out)', role: 'K', description: 'Spínaný fázový výstup ke svítidlům' }
    ],
    examRule: 'Každý krátký proudový impulz do cívky A1–A2 mechanicky překlopí silový kontakt 1–2 do opačné polohy (1. stisk zapne, 2. stisk vypne). Všechna tlačítka se řadí PARALELNĚ!',
    commonMistake: 'Použití klasického vypínače č. 1 místo tlačítka č. 1/0 (cívka A1–A2 zůstane trvale pod napětím, bzučí a shoří).'
  },

  // 2. SBĚRNICE A SVORKOVNICE
  {
    id: 'busbar-pe',
    code: 'PE sběrnice',
    name: 'Hlavní ochranná přípojnice PE (zeleno-žlutá)',
    category: 'busbar',
    categoryLabel: '2. Sběrnice a svorkovnice',
    standard: 'ČSN 33 2000-5-54 ed. 3',
    terminals: [
      { id: 'PEN-in', label: 'PEN / PE přívod', role: 'PE', description: 'Přívod ochranného vodiče PE nebo vodiče PEN (v bodě rozdělení jde PEN vždy nejprve na PE!)' },
      { id: 'PE-N-link', label: 'Propoj do N', role: 'N', description: 'Modrý propojovací vodič na hlavní sběrnici N (pouze v bodě rozdělení TN-C na TN-S)' },
      { id: 'PE-1', label: 'Šroub 1 (PE)', role: 'PE', description: 'Samostatná svorka pro 1 ochranný vodič PE obvodu č. 1' },
      { id: 'PE-2', label: 'Šroub 2 (PE)', role: 'PE', description: 'Samostatná svorka pro 1 ochranný vodič PE obvodu č. 2' }
    ],
    examRule: 'Pod jeden připojovací šroub na sběrnici PE smí být připojen VŽDY POUZE JEDEN ochranný vodič PE! Při rozdělení PEN na PE a N musí přívodní PEN skončit na sběrnici PE.',
    commonMistake: 'Strčení dvou nebo tří zeleno-žlutých vodičů PE pod jeden společný šroubek na PE liště.'
  },
  {
    id: 'busbar-n',
    code: 'N sběrnice (N1, N2)',
    name: 'Izolovaná nulová přípojnice N (modrá)',
    category: 'busbar',
    categoryLabel: '2. Sběrnice a svorkovnice',
    standard: 'ČSN 33 2000-5-53',
    terminals: [
      { id: 'N-in', label: 'Přívod N z RCD', role: 'N', description: 'Přívod nulového vodiče z výstupu příslušného proudového chrániče' },
      { id: 'N-1', label: 'Vývod N1', role: 'N', description: 'Modrý nulový vodič N pro 1. obvod daného chrániče' },
      { id: 'N-2', label: 'Vývod N2', role: 'N', description: 'Modrý nulový vodič N pro 2. obvod daného chrániče' }
    ],
    examRule: 'Nulová sběrnice musí být elektricky izolována od kostry rozvaděče. Každý proudový chránič v rozvaděči musí mít svou VLASTNÍ samostatnou sběrnici N (N1, N2)!',
    commonMistake: 'Propojení nulových sběrnic N1 a N2 různých proudových chráničů.'
  },
  {
    id: 'met-hop',
    code: 'MET / HOP',
    name: 'Hlavní uzemňovací svorkovnice (MET / HOP)',
    category: 'busbar',
    categoryLabel: '2. Sběrnice a svorkovnice',
    standard: 'ČSN 33 2000-5-54 ed. 3',
    terminals: [
      { id: 'ZEM', label: 'Zemnič (FeZn)', role: 'PE', description: 'Uzemňovací přívod od základového nebo tyčového zemniče' },
      { id: 'PE-ROZV', label: 'PE rozvaděče', role: 'PE', description: 'Spojení s přípojnicí PE hlavního rozvaděče' },
      { id: 'POSP', label: 'Potrubí (6 mm² Cu)', role: 'PE', description: 'Vodiče hlavního ochranného pospojování (voda, plyn, topení – min. 6 mm² Cu)' },
      { id: 'LPS', label: 'Hromosvod (LPS)', role: 'PE', description: 'Připojení uzemnění hromosvodu do společné uzemňovací soustavy' }
    ],
    examRule: 'Slouží ke spojení uzemňovací soustavy, ochranných vodičů, hromosvodu (LPS) a cizích vodivých částí (potrubí). Vodič hlavního pospojování musí mít průřez min. 6 mm² Cu!',
    commonMistake: 'Použití příliš tenkého vodiče (např. 1,5 mm² Cu) pro hlavní ochranné pospojování.'
  },

  // 3. DOMOVNÍ SPÍNAČE A OVLADAČE
  {
    id: 'sw-1',
    code: 'Spínač č. 1',
    name: 'Jednopólový spínač – řazení 1 (1 okruh z 1 místa)',
    category: 'switch',
    categoryLabel: '3. Domovní spínače a ovladače',
    standard: 'ČSN 33 2130 ed. 3',
    terminals: [
      { id: 'L', label: 'L (vstup)', role: 'L', description: 'Přívod stálé fáze L z jističe B10 (červená páčka/označení šipkou dovnitř)' },
      { id: '1', label: '1 (výstup)', role: 'K', description: 'Spínaný fázový vodič do svítidla (na středový kontakt objímky)' }
    ],
    examRule: 'Spínačem se VŽDY spíná výhradně fázový vodič L! Modrý vodič N a zeleno-žlutý PE nesmí být nikdy připojeny na spínací kontakty vypínače.',
    commonMistake: 'Spínání nulového vodiče N místo fáze L (ve vypnutém svítidle pak zůstává nebezpečné fázové napětí 230 V proti zemi!).'
  },
  {
    id: 'sw-5',
    code: 'Spínač č. 5',
    name: 'Sériový (lustrový) přepínač – řazení 5 (2 okruhy z 1 místa)',
    category: 'switch',
    categoryLabel: '3. Domovní spínače a ovladače',
    standard: 'ČSN 33 2130 ed. 3',
    terminals: [
      { id: 'L', label: 'L (společný)', role: 'L', description: 'Společný přívod stálé fáze L (hnědá)' },
      { id: '1', label: 'Výstup 1 (levá klapka)', role: 'K', description: 'Spínaná fáze pro 1. skupinu žárovek lustru (černá)' },
      { id: '2', label: 'Výstup 2 (pravá klapka)', role: 'K', description: 'Spínaná fáze pro 2. skupinu žárovek lustru (hnědá/šedá)' }
    ],
    examRule: 'Má dvě samostatné klapky, jeden společný přívod fáze L a dva nezávislé výstupy. Ke svítidlu musí vést 4 nebo 5žilový kabel (např. CYKY-J 5×1,5).',
    commonMistake: 'Prohození společné svorky L s jedním z výstupů (druhá klapka pak funguje jen tehdy, když je zapnutá první klapka).'
  },
  {
    id: 'sw-6',
    code: 'Přepínač č. 6',
    name: 'Střídavý (schodišťový) přepínač – řazení 6 (ze 2 míst)',
    category: 'switch',
    categoryLabel: '3. Domovní spínače a ovladače',
    standard: 'ČSN 33 2130 ed. 3',
    terminals: [
      { id: 'L', label: 'L (kmenová svorka)', role: 'L', description: 'U 1. spínače přívod stálé fáze L; u 2. spínače odchod spínané fáze do světla!' },
      { id: '1', label: '1 (korespondenční A)', role: 'K', description: '1. korespondenční vodič spojující spínač 6A a 6B' },
      { id: '2', label: '2 (korespondenční B)', role: 'K', description: '2. korespondenční vodič spojující spínač 6A a 6B' }
    ],
    examRule: 'Dva přepínače č. 6 (6A a 6B) jsou mezi sebou propojeny 2 korespondenčními vodiči. Na kmenovou svorku L prvního jde přívod fáze, z kmenové svorky L druhého jde výstup ke světlu!',
    commonMistake: 'Připojení přívodní fáze na korespondenční svorku místo na kmenovou svorku L (světlo pak zhasíná jen v jedné poloze druhého vypínače).'
  },
  {
    id: 'sw-7',
    code: 'Přepínač č. 7',
    name: 'Křížový přepínač – řazení 7 (ze 3 a více míst: 6–7–6)',
    category: 'switch',
    categoryLabel: '3. Domovní spínače a ovladače',
    standard: 'ČSN 33 2130 ed. 3',
    terminals: [
      { id: '1', label: '1 (vstup A ↑)', role: 'K', description: '1. korespondenční vodič přicházející od prvního přepínače č. 6A' },
      { id: '2', label: '2 (vstup B ↑)', role: 'K', description: '2. korespondenční vodič přicházející od prvního přepínače č. 6A' },
      { id: '3', label: '3 (výstup A ↓)', role: 'K', description: '1. korespondenční vodič pokračující do koncového přepínače č. 6B' },
      { id: '4', label: '4 (výstup B ↓)', role: 'K', description: '2. korespondenční vodič pokračující do koncového přepínače č. 6B' }
    ],
    examRule: 'Vkládá se VŽDY mezi dva střídavé přepínače č. 6 (zapojení 6 – 7 – 6). Má 4 svorky: musíte dodržet vstupní pár (šipky dovnitř) od spínače 6A a výstupní pár (šipky ven) do spínače 6B!',
    commonMistake: 'Záměna vstupního a výstupního páru svorek na křížovém spínači (smíchání vodičů od levého a pravého schodišťáku).'
  },
  {
    id: 'sw-push',
    code: 'Ovladač č. 1/0',
    name: 'Tlačítkový ovladač č. 1/0 (s vratnou pružinou pro relé)',
    category: 'switch',
    categoryLabel: '3. Domovní spínače a ovladače',
    standard: 'ČSN 33 2130 ed. 3 (Kritérium NSK 4b)',
    terminals: [
      { id: 'L', label: 'L (přívod)', role: 'L', description: 'Přívod stálé fáze L (propojený paralelně na všechna tlačítka)' },
      { id: '1', label: '1 (impulz do A1)', role: 'CTRL', description: 'Ovládací vodič vedoucí na svorku cívky A1 impulzního relé' }
    ],
    examRule: 'Po stisku sepne a po uvolnění se pružinou vrátí do rozepnutého stavu. Všechna tlačítka ovládající jedno impulzní relé nebo schodišťový automat se zapojují PARALELNĚ!',
    commonMistake: 'Zapojení tlačítek do série za sebou (pro rozsvícení by pak muselo více lidí držet všechna tlačítka najednou).'
  },

  // 4. ZÁSUVKY
  {
    id: 'sock-230',
    code: 'Zásuvka 230 V',
    name: 'Jednofázová zásuvka 230 V / 16 A s ochranným kolíkem',
    category: 'socket',
    categoryLabel: '4. Zásuvky 230 V a 400 V',
    standard: 'ČSN 33 2130 ed. 3, ČSN IEC 60884-1',
    terminals: [
      { id: 'L', label: 'L (LEVÁ dutinka)', role: 'L', description: 'Fázový vodič L (hnědá/černá/šedá) – při pohledu zepředu s kolíkem nahoře VLEVO!' },
      { id: 'PE', label: 'PE (HORNÍ kolík ⏚)', role: 'PE', description: 'Ochranný vodič PE (zeleno-žlutá) – na ochranný kolík nahoře!' },
      { id: 'N', label: 'N (PRAVÁ dutinka)', role: 'N', description: 'Střední vodič N (světle modrá) – při pohledu zepředu s kolíkem nahoře VPRAVO!' }
    ],
    examRule: 'Pohled zepředu (kolík nahoře): VLEVO = fáze L, NAHOŘE (kolík) = PE, VPRAVO = nulák N. Na jeden obvod 16 A (Cu 2,5 mm²) max. 10 zásuvkových vývodů (3 680 W), chránič RCD ≤ 30 mA.',
    commonMistake: 'Prohození L a N (fáze vpravo) nebo smrtelně nebezpečné prohození PE a N či PE a L!'
  },
  {
    id: 'sock-ip44',
    code: 'Zásuvka IP44',
    name: 'Zásuvka 230 V / 16 A s víčkem a krytím IP44 (koupelna / venkovní)',
    category: 'socket',
    categoryLabel: '4. Zásuvky 230 V a 400 V',
    standard: 'ČSN 33 2000-7-701 ed. 2',
    terminals: [
      { id: 'L', label: 'L (vlevo)', role: 'L', description: 'Fázový vodič L' },
      { id: 'PE', label: 'PE (kolík ⏚)', role: 'PE', description: 'Ochranný vodič PE' },
      { id: 'N', label: 'N (vpravo)', role: 'N', description: 'Střední vodič N' }
    ],
    examRule: 'Chrání proti stříkající vodě ze všech směrů (druhá číslice 4). V koupelně smí být umístěna až MIMO zóny 0, 1 a 2 (tj. dále než 60 cm od hrany vany/sprchové vaničky) a vždy přes RCD ≤ 30 mA!',
    commonMistake: 'Umístění zásuvky 230 V do zóny 2 v koupelně s argumentem, že má krytí IP44 (v zóně 2 je běžná zásuvka 230 V zakázána bez ohledu na krytí IP!).'
  },
  {
    id: 'sock-400',
    code: 'Zásuvka 400 V (5P)',
    name: 'Třífázová průmyslová zásuvka 400 V / 16 A (5pólová CEE)',
    category: 'socket',
    categoryLabel: '4. Zásuvky 230 V a 400 V',
    standard: 'ČSN EN 60309-2, ČSN 33 2000-4-41 ed. 3',
    terminals: [
      { id: 'L1', label: 'L1', role: 'L', description: 'Fáze L1 (hnědá)' },
      { id: 'L2', label: 'L2', role: 'L', description: 'Fáze L2 (černá)' },
      { id: 'L3', label: 'L3', role: 'L', description: 'Fáze L3 (šedá)' },
      { id: 'N', label: 'N', role: 'N', description: 'Střední vodič N (modrá)' },
      { id: 'PE', label: 'PE (6h ⏚)', role: 'PE', description: 'Ochranný vodič PE (zeleno-žlutá) – nejsilnější dutinka dole na pozici 6 hodin' }
    ],
    examRule: 'Při pohledu zepředu do dutinek musí mít fáze L1 → L2 → L3 pravotočivý sled (po směru hodinových ručiček). Zásuvka do 32 A musí být chráněna proudovým chráničem RCD ≤ 30 mA.',
    commonMistake: 'Opačný (levotočivý) sled fází L1–L3–L2 (třífázový motor se pak točí opačně – opraví se prohozením dvou fází).'
  },

  // 5. KRABICE, SVÍTIDLA A POSPOJOVÁNÍ
  {
    id: 'wago-box',
    code: 'Krabice + WAGO',
    name: 'Odbočná krabice (KU 68) s páčkovými svorkami WAGO 221',
    category: 'appliance',
    categoryLabel: '5. Krabice, svítidla a pospojování',
    standard: 'ČSN 33 2130 ed. 3',
    terminals: [
      { id: 'W-PE', label: 'WAGO PE (zeleno-žlutá)', role: 'PE', description: 'Spojení všech ochranných vodičů PE v krabici' },
      { id: 'W-N', label: 'WAGO N (modrá)', role: 'N', description: 'Spojení všech nulových vodičů N v krabici' },
      { id: 'W-L', label: 'WAGO L (hnědá)', role: 'L', description: 'Rozbočení stálé přívodní fáze L' },
      { id: 'W-K', label: 'WAGO Spínaná / Koresp.', role: 'K', description: 'Propojení spínaného nebo korespondenčního vodiče' }
    ],
    examRule: 'Černý plášť kabelu CYKY musí přesahovat dovnitř krabice alespoň 5–10 mm! Vodič do WAGO svorky odizoluj přesně na měrku (11 mm) – nesmí koukat holá měď ven ze svorky.',
    commonMistake: 'Odpláštění kabelu mimo krabici nebo spojení hliníkového a měděného vodiče v běžné svorce bez kontaktní pasty.'
  },
  {
    id: 'lamp-e27',
    code: 'Svítidlo E27 (tř. I)',
    name: 'Svítidlo / žárovková objímka E27 (třída ochrany I)',
    category: 'appliance',
    categoryLabel: '5. Krabice, svítidla a pospojování',
    standard: 'ČSN 33 2130 ed. 3, ČSN EN 60598-1',
    terminals: [
      { id: 'L', label: 'L (STŘEDOVÝ kontakt)', role: 'K', description: 'Spínaný fázový vodič ze spínače – VŽDY na středový (spodní) kontakt objímky!' },
      { id: 'N', label: 'N (BOČNÍ závit)', role: 'N', description: 'Střední vodič N (modrá) – na boční šroubovací závit objímky!' },
      { id: 'PE', label: 'PE (kostra ⏚)', role: 'PE', description: 'Ochranný vodič PE (zeleno-žlutá) – na kovovou kostru svítidla třídy I' }
    ],
    examRule: 'Spínaná fáze L musí být připojena vždy na středový (spodní) jazýček objímky a modrý nulák N na závit, aby se člověk při šroubování žárovky nedotkl živé fáze na závitu!',
    commonMistake: 'Připojení fáze L na boční závit objímky nebo připojení vodiče PE na svítidlo třídy ochrany II (dvojitý čtvereček).'
  },
  {
    id: 'lamp-dual',
    code: 'Lustr (2 skupiny)',
    name: 'Dvojité (lustrové) svítidlo pro spínač řazení 5',
    category: 'appliance',
    categoryLabel: '5. Krabice, svítidla a pospojování',
    standard: 'ČSN 33 2130 ed. 3',
    terminals: [
      { id: 'L1', label: 'L1 (1. okruh žárovek)', role: 'K', description: 'Spínaná fáze z 1. klapky spínače č. 5' },
      { id: 'L2', label: 'L2 (2. okruh žárovek)', role: 'K', description: 'Spínaná fáze z 2. klapky spínače č. 5' },
      { id: 'N', label: 'N (společný nulák)', role: 'N', description: 'Společný střední vodič N (modrá) pro obě skupiny žárovek' },
      { id: 'PE', label: 'PE (kostra lustru ⏚)', role: 'PE', description: 'Ochranný vodič PE (zeleno-žlutá)' }
    ],
    examRule: 'Obě skupiny žárovek mají samostatný spínaný přívod fáze (L1 a L2 ze spínače č. 5) a společný modrý nulový vodič N a ochranný vodič PE.',
    commonMistake: 'Použití pouze 3žilového kabelu CYKY 3×1,5 a zneužití zeleno-žlutého vodiče PE jako druhé spínané fáze (hrubé porušení ČSN – okamžité vyhození od zkoušky!).'
  },
  {
    id: 'pipe-clamp',
    code: 'Svorka Bernard',
    name: 'Zemnicí páska (svorka Bernard) na kovovém potrubí',
    category: 'appliance',
    categoryLabel: '5. Krabice, svítidla a spotřebiče',
    standard: 'ČSN 33 2000-5-54 ed. 3',
    terminals: [
      { id: 'PE', label: 'Svorka pospojování (⏚)', role: 'PE', description: 'Připojení zeleno-žlutého vodiče ochranného pospojování (s očkem nebo dutinkou)' }
    ],
    examRule: 'Kovové potrubí musí být v místě montáže svorky očištěno od barvy a koroze na čistý kov. Průřez vodiče: hlavní pospojování min. 6 mm² Cu, doplňkové pospojování min. 2,5 mm² Cu (chráněné) nebo 4 mm² Cu (nechráněné).',
    commonMistake: 'Utažení svorky Bernard přes vrstvu laku/barvy na trubce (při měření spojitosti proudem ≥ 200 mA pak spoj nevyhoví).'
  },
  {
    id: 'contactor-km',
    code: 'KM (Stykač 3P)',
    name: 'Instalační stykač 3pólový na DIN lištu (25 A, cívka 230 V)',
    category: 'din',
    categoryLabel: '1. Přístroje na DIN lištu',
    standard: 'ČSN EN 61095, ČSN 33 2130 ed. 3',
    terminals: [
      { id: 'A1', label: 'A1 (cívka L)', role: 'CTRL', description: 'Ovládací přívod cívky stykače (z HDO nebo spínače/termostatu jištěného B6/B10)' },
      { id: 'A2', label: 'A2 (cívka N)', role: 'N', description: 'Připojení cívky stykače na střední vodič N (modrá)' },
      { id: '1', label: '1 / 3 / 5 (vstupy L1, L2, L3)', role: 'L', description: 'Silové přívody fází L1, L2, L3 ze silového jističe B16' },
      { id: '2', label: '2 / 4 / 6 (výstupy T1, T2, T3)', role: 'K', description: 'Spínané silové výstupy do bojleru nebo elektrických akumulačních kamen' }
    ],
    examRule: 'Když je na cívku A1–A2 přivedeno ovládací napětí 230 V, elektromagnet přitáhne kotvu a sepne silové kontakty 1–2, 3–4, 5–6. Ovládací obvod cívky se jistí samostatným jističem (např. B6/B10).',
    commonMistake: 'Absence samostatného jištění ovládacího obvodu cívky A1 nebo zapojení silového spotřebiče přes spínací kontakt HDO místo přes silové kontakty stykače.'
  },
  {
    id: 'boiler-1f',
    code: 'Bojler (230 V)',
    name: 'Elektrický zásobníkový ohřívač vody – bojler (230 V / 2,2 kW, tř. I)',
    category: 'appliance',
    categoryLabel: '5. Krabice, svítidla a spotřebiče',
    standard: 'ČSN 33 2130 ed. 3, ČSN 33 2000-7-701 ed. 2',
    terminals: [
      { id: 'L', label: 'L (fáze ze stykače)', role: 'L', description: 'Spínaný fázový přívod L z výstupu instalačního stykače KM (jištěno B16 + RCD 30 mA)' },
      { id: 'N', label: 'N (modrá)', role: 'N', description: 'Střední vodič N ze sběrnice N příslušného proudového chrániče' },
      { id: 'PE', label: 'PE (kostra ⏚)', role: 'PE', description: 'Ochranný vodič PE na kovovou kostru bojleru' }
    ],
    examRule: 'Bojler (≥ 2 kW) musí mít samostatný obvod (kabel Cu 2,5 mm², jistič B16, v koupelně vždy RCD ≤ 30 mA) a při ohřevu v nízkém tarifu (HDO) je spínán instalačním stykačem KM v rozvaděči.',
    commonMistake: 'Chybějící proudový chránič 30 mA u bojleru instalovaného v koupelně.'
  },
  {
    id: 'stove-3f',
    code: 'Kamna / Sporák 400 V',
    name: 'Třífázová elektrická akumulační kamna / sporák (400 V / 3N~, pevný přívod)',
    category: 'appliance',
    categoryLabel: '5. Krabice, svítidla a spotřebiče',
    standard: 'ČSN 33 2130 ed. 3',
    terminals: [
      { id: 'L1', label: 'L1 (hnědá)', role: 'L', description: '1. fáze z 3pólového jističe B16 / stykače KM (výstup 2)' },
      { id: 'L2', label: 'L2 (černá)', role: 'L', description: '2. fáze z 3pólového jističe B16 / stykače KM (výstup 4)' },
      { id: 'L3', label: 'L3 (šedá)', role: 'L', description: '3. fáze z 3pólového jističe B16 / stykače KM (výstup 6)' },
      { id: 'N', label: 'N (modrá)', role: 'N', description: 'Střední vodič N' },
      { id: 'PE', label: 'PE (kostra ⏚)', role: 'PE', description: 'Ochranný vodič PE (zeleno-žlutá) na kostru spotřebiče' }
    ],
    examRule: 'Elektrická akumulační kamna a 3f sporáky musí být připojeny PEVNÝM PŘÍVODEM (přes přístrojovou svorkovnici a spínač/stykač, nikdy běžnou vidlicí!). Jistí se 3pólovým jističem (např. B16 3P).',
    commonMistake: 'Použití tří samostatných jednopólových jističů místo 3pólového jističe se společnou páčkou.'
  },

  // 6. MĚŘICÍ PŘÍSTROJE
  {
    id: 'meter-tester',
    code: 'Zkoušečka + Eurotest',
    name: 'Dvoupólová zkoušečka napětí a multifunkční revizní přístroj',
    category: 'meter',
    categoryLabel: '6. Měřicí a diagnostické přístroje',
    standard: 'ČSN EN 61243-3, ČSN 33 2000-6 ed. 2',
    terminals: [
      { id: 'PROBE-L', label: 'Červený hrot (L)', role: 'L', description: 'Měřicí hrot přikládaný na fázovou zdířku/svorku L' },
      { id: 'PROBE-NPE', label: 'Černý hrot (N / PE)', role: 'PE', description: 'Referenční měřicí hrot přikládaný na N nebo PE' }
    ],
    examRule: 'Při ověřování beznapěťového stavu platí jen DVOUPÓLOVÁ zkoušečka (ověřená před i po měření na známém napětí). Pořadí revizních měření: 1. Spojitost PE (≥ 200 mA), 2. Riso (500 V DC ≥ 1 MΩ), 3. Pod napětím: Zs a RCD.',
    commonMistake: 'Spoléhání na jednopólovou doutnavkovou fázovku při ověřování beznapěťového stavu nebo zapnutí jističe před změřením Riso a spojitosti PE.'
  }
];

/**
 * Vykreslí detailní interaktivní SVG grafiku vybraného přístroje/modulu
 * včetně čelního pohledu, svorek a schematické značky ČSN EN 60617.
 */
export const DeviceSvgPreview: React.FC<{ deviceId: string; activeState?: boolean }> = ({
  deviceId,
  activeState = true
}) => {
  switch (deviceId) {
    case 'qm-3p':
    case 'mcb-3p':
      return (
        <svg viewBox="0 0 260 220" className="w-full max-w-[260px] h-auto mx-auto">
          {/* DIN lišta na pozadí */}
          <rect x="10" y="92" width="240" height="36" fill="#334155" stroke="#475569" strokeWidth="1.5" rx="2" />
          {/* Tělo 3P přístroje */}
          <rect x="40" y="20" width="180" height="180" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" />
          <line x1="100" y1="20" x2="100" y2="200" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="160" y1="20" x2="160" y2="200" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 2" />
          {/* Horní svorky 1, 3, 5 */}
          {[70, 130, 190].map((cx, i) => (
            <g key={`top-${i}`}>
              <circle cx={cx} cy="38" r="10" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
              <line x1={cx - 6} y1="38" x2={cx + 6} y2="38" stroke="#334155" strokeWidth="2" />
              <text x={cx} y="15" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace">
                {i * 2 + 1} (L{i + 1})
              </text>
            </g>
          ))}
          {/* Dolní svorky 2, 4, 6 */}
          {[70, 130, 190].map((cx, i) => (
            <g key={`bot-${i}`}>
              <circle cx={cx} cy="182" r="10" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
              <line x1={cx - 6} y1="182" x2={cx + 6} y2="182" stroke="#334155" strokeWidth="2" />
              <text x={cx} y="214" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">
                {i * 2 + 2} (T{i + 1})
              </text>
            </g>
          ))}
          {/* Štítek a označení */}
          <rect x="52" y="60" width="156" height="24" rx="4" fill="#1e293b" />
          <text x="130" y="76" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold" fontFamily="monospace">
            {deviceId === 'qm-3p' ? 'QM • HLAVNÍ VYPÍNAČ 63A' : 'FA • JISTIČ B16 (3P)'}
          </text>
          {/* Společná páčka 3P */}
          <rect
            x="55"
            y={activeState ? '100' : '125'}
            width="150"
            height="26"
            rx="5"
            fill={deviceId === 'qm-3p' ? '#dc2626' : '#0f172a'}
            stroke="#ffffff"
            strokeWidth="1.5"
          />
          <text x="130" y={activeState ? '117' : '142'} textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
            {activeState ? 'I (ZAPNUTO)' : '0 (VYPNUTO)'}
          </text>
        </svg>
      );

    case 'mcb-1p':
      return (
        <svg viewBox="0 0 220 220" className="w-full max-w-[220px] h-auto mx-auto">
          <rect x="20" y="92" width="180" height="36" fill="#334155" stroke="#475569" strokeWidth="1.5" rx="2" />
          {/* Tělo 1P jističe */}
          <rect x="70" y="20" width="80" height="180" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" />
          {/* Svorka 1 */}
          <circle cx="110" cy="38" r="11" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
          <line x1="103" y1="38" x2="117" y2="38" stroke="#334155" strokeWidth="2.5" />
          <text x="110" y="14" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold" fontFamily="monospace">1 (L in)</text>
          {/* Štítek B16 */}
          <rect x="80" y="60" width="60" height="24" rx="4" fill="#0f172a" />
          <text x="110" y="76" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold" fontFamily="monospace">B16</text>
          {/* Páčka */}
          <rect x="85" y={activeState ? '100' : '124'} width="50" height="24" rx="4" fill="#1e293b" stroke="#cbd5e1" />
          <rect x="95" y="132" width="30" height="12" rx="2" fill={activeState ? '#dc2626' : '#16a34a'} />
          <text x="110" y="141" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">{activeState ? 'I-ON' : '0-OFF'}</text>
          {/* Svorka 2 */}
          <circle cx="110" cy="182" r="11" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
          <line x1="103" y1="182" x2="117" y2="182" stroke="#334155" strokeWidth="2.5" />
          <text x="110" y="214" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold" fontFamily="monospace">2 (L out)</text>
        </svg>
      );

    case 'rcd-2p':
    case 'rcd-4p':
    case 'rcbo-1p':
      return (
        <svg viewBox="0 0 260 220" className="w-full max-w-[260px] h-auto mx-auto">
          <rect x="15" y="92" width="230" height="36" fill="#334155" stroke="#475569" strokeWidth="1.5" rx="2" />
          <rect x="50" y="20" width="160" height="180" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" />
          <line x1="130" y1="20" x2="130" y2="200" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 2" />
          {/* Horní svorky 1 (L) a N */}
          <circle cx="90" cy="38" r="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="90" y="14" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace">1 (L in)</text>
          <circle cx="170" cy="38" r="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x="170" y="14" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">N (in)</text>
          {/* Označení RCD */}
          <rect x="62" y="56" width="136" height="24" rx="4" fill="#0f172a" />
          <text x="130" y="72" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">
            {deviceId === 'rcbo-1p' ? 'RCBO B16 / 30mA' : 'RCD IΔn = 30 mA'}
          </text>
          {/* Test tlačítko T */}
          <rect x="148" y="92" width="42" height="24" rx="6" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" />
          <text x="169" y="108" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">T (TEST)</text>
          {/* Páčka */}
          <rect x="68" y="105" width="52" height="26" rx="4" fill="#1e293b" />
          <text x="94" y="122" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">I - ON</text>
          {/* Dolní svorky 2 (L) a N */}
          <circle cx="90" cy="182" r="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="90" y="214" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace">2 (L out)</text>
          <circle cx="170" cy="182" r="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x="170" y="214" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">N (out)</text>
        </svg>
      );

    case 'spd-t2':
      return (
        <svg viewBox="0 0 260 220" className="w-full max-w-[260px] h-auto mx-auto">
          <rect x="10" y="92" width="240" height="36" fill="#334155" stroke="#475569" strokeWidth="1.5" rx="2" />
          <rect x="30" y="20" width="200" height="180" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="2.5" />
          {/* Horní svorky L1, L2, L3, N */}
          {['L1', 'L2', 'L3', 'N'].map((lbl, i) => {
            const cx = 55 + i * 50;
            return (
              <g key={lbl}>
                <circle cx={cx} cy="38" r="9" fill={lbl === 'N' ? '#dbeafe' : '#fee2e2'} stroke={lbl === 'N' ? '#2563eb' : '#dc2626'} strokeWidth="2" />
                <text x={cx} y="14" textAnchor="middle" fill={lbl === 'N' ? '#38bdf8' : '#f87171'} fontSize="11" fontWeight="bold" fontFamily="monospace">{lbl}</text>
                {/* Stavové okénko varistoru (zelené = OK) */}
                <rect x={cx - 14} y="75" width="28" height="45" rx="4" fill="#ffffff" stroke="#cbd5e1" />
                <rect x={cx - 9} y="82" width="18" height="14" rx="2" fill="#22c55e" />
                <text x={cx} y="112" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">T1+T2</text>
              </g>
            );
          })}
          {/* Dolní svorka PE (≤ 0,5 m!) */}
          <circle cx="130" cy="180" r="12" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" />
          <text x="130" y="184" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">⏚</text>
          <text x="130" y="214" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold" fontFamily="monospace">PE / MET (max. 0,5 m!)</text>
        </svg>
      );

    case 'impulse-relay':
      return (
        <svg viewBox="0 0 220 220" className="w-full max-w-[220px] h-auto mx-auto">
          <rect x="20" y="92" width="180" height="36" fill="#334155" stroke="#475569" strokeWidth="1.5" rx="2" />
          <rect x="65" y="20" width="90" height="180" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" />
          {/* Horní svorky A1 a 1 */}
          <circle cx="90" cy="38" r="9" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="85" y="14" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="monospace">A1</text>
          <circle cx="130" cy="38" r="9" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
          <text x="135" y="14" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold" fontFamily="monospace">1 (L)</text>
          {/* Středový štítek KA */}
          <rect x="75" y="65" width="70" height="55" rx="4" fill="#0f172a" />
          <text x="110" y="83" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="monospace">RELÉ KA</text>
          <text x="110" y="100" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">A1-A2: Cívka</text>
          <text x="110" y="113" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace">1-2: Kontakt</text>
          {/* Dolní svorky A2 a 2 */}
          <circle cx="90" cy="182" r="9" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x="85" y="214" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">A2 (N)</text>
          <circle cx="130" cy="182" r="9" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="135" y="214" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="monospace">2 (Světlo)</text>
        </svg>
      );

    case 'busbar-pe':
    case 'busbar-n':
    case 'met-hop':
      return (
        <svg viewBox="0 0 260 180" className="w-full max-w-[260px] h-auto mx-auto">
          <rect
            x="20"
            y="50"
            width="220"
            height="70"
            rx="10"
            fill={deviceId === 'busbar-n' ? '#1e3a8a' : '#14532d'}
            stroke={deviceId === 'busbar-n' ? '#3b82f6' : '#eab308'}
            strokeWidth="3"
          />
          {/* Mosazná lišta uvnitř */}
          <rect x="35" y="72" width="190" height="26" rx="4" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
          {/* Šroubové svorky */}
          {[55, 92, 130, 168, 205].map((cx, i) => (
            <g key={i}>
              <circle cx={cx} cy="85" r="9" fill="#fef08a" stroke="#713f12" strokeWidth="2" />
              <line x1={cx - 5} y1="85" x2={cx + 5} y2="85" stroke="#713f12" strokeWidth="2" />
              <text x={cx} y="142" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold" fontFamily="monospace">
                {deviceId === 'busbar-n' ? `N${i + 1}` : deviceId === 'met-hop' ? (i === 0 ? 'ZEM' : i === 1 ? 'PE' : `POSP${i - 1}`) : `PE${i + 1}`}
              </text>
            </g>
          ))}
          <text x="130" y="34" textAnchor="middle" fill={deviceId === 'busbar-n' ? '#60a5fa' : '#4ade80'} fontSize="13" fontWeight="bold" fontFamily="monospace">
            {deviceId === 'busbar-n' ? 'IZOLOVANÁ SBĚRNICE N' : deviceId === 'met-hop' ? 'HLAVNÍ SVORKOVNICE MET / HOP (⏚)' : 'OCHRANNÁ SBĚRNICE PE (1 šroub = 1 vodič!)'}
          </text>
        </svg>
      );

    case 'sw-1':
    case 'sw-5':
    case 'sw-6':
    case 'sw-7':
    case 'sw-push':
      return (
        <svg viewBox="0 0 260 220" className="w-full max-w-[260px] h-auto mx-auto">
          {/* Zadní montážní rámeček spínače */}
          <rect x="45" y="25" width="170" height="170" rx="18" fill="#1e293b" stroke="#64748b" strokeWidth="2.5" />
          <circle cx="130" cy="110" r="62" fill="#0f172a" stroke="#475569" strokeWidth="2" />
          {/* Označení typu uprostřed */}
          <text x="130" y="106" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold" fontFamily="monospace">
            {deviceId === 'sw-1' ? 'ŘAZENÍ 1' : deviceId === 'sw-5' ? 'ŘAZENÍ 5' : deviceId === 'sw-6' ? 'ŘAZENÍ 6' : deviceId === 'sw-7' ? 'ŘAZENÍ 7 (✕)' : 'TLAČÍTKO 1/0'}
          </text>
          <text x="130" y="124" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
            {deviceId === 'sw-7' ? '4 svorky (2 in / 2 out)' : deviceId === 'sw-5' ? '3 svorky (L + 1 + 2)' : deviceId === 'sw-6' ? '3 svorky (L + K1 + K2)' : '2 svorky (L + 1)'}
          </text>
          {/* Horní svorky */}
          <circle cx="95" cy="58" r="10" fill="#ef4444" stroke="#fca5a5" strokeWidth="2" />
          <text x="95" y="62" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">
            {deviceId === 'sw-7' ? '1↑' : 'L'}
          </text>
          {(deviceId === 'sw-5' || deviceId === 'sw-7') && (
            <>
              <circle cx="165" cy="58" r="10" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
              <text x="165" y="62" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">
                {deviceId === 'sw-7' ? '2↑' : '1'}
              </text>
            </>
          )}
          {/* Dolní svorky */}
          <circle cx="95" cy="162" r="10" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
          <text x="95" y="166" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">
            {deviceId === 'sw-7' ? '3↓' : '1'}
          </text>
          {(deviceId === 'sw-5' || deviceId === 'sw-6' || deviceId === 'sw-7') && (
            <>
              <circle cx="165" cy="162" r="10" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
              <text x="165" y="166" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">
                {deviceId === 'sw-7' ? '4↓' : '2'}
              </text>
            </>
          )}
        </svg>
      );

    case 'sock-230':
    case 'sock-ip44':
      return (
        <svg viewBox="0 0 260 220" className="w-full max-w-[260px] h-auto mx-auto">
          {/* Rámeček zásuvky */}
          <rect x="45" y="20" width="170" height="170" rx="20" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
          <circle cx="130" cy="105" r="58" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
          {/* Ochranný kolík PE nahoře */}
          <circle cx="130" cy="68" r="11" fill="#eab308" stroke="#15803d" strokeWidth="3" />
          <text x="130" y="45" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold" fontFamily="monospace">PE (KOLÍK ⏚)</text>
          {/* Levá dutinka L */}
          <circle cx="98" cy="115" r="10" fill="#7c2d12" stroke="#b45309" strokeWidth="2.5" />
          <text x="90" y="142" textAnchor="middle" fill="#b45309" fontSize="12" fontWeight="bold" fontFamily="monospace">L (VLEVO)</text>
          {/* Pravá dutinka N */}
          <circle cx="162" cy="115" r="10" fill="#1e3a8a" stroke="#2563eb" strokeWidth="2.5" />
          <text x="170" y="142" textAnchor="middle" fill="#1d4ed8" fontSize="12" fontWeight="bold" fontFamily="monospace">N (VPRAVO)</text>
          {deviceId === 'sock-ip44' && (
            <rect x="65" y="24" width="130" height="18" rx="4" fill="#0284c7" />
          )}
          <text x="130" y="208" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
            {deviceId === 'sock-ip44' ? 'ZÁSUVKA IP44 (mimo zóny 0, 1, 2!)' : 'ČSN 33 2130: L VLEVO • PE NAHOŘE • N VPRAVO'}
          </text>
        </svg>
      );

    case 'sock-400':
      return (
        <svg viewBox="0 0 260 220" className="w-full max-w-[260px] h-auto mx-auto">
          <circle cx="130" cy="105" r="78" fill="#dc2626" stroke="#991b1b" strokeWidth="4" />
          <circle cx="130" cy="105" r="58" fill="#1e293b" stroke="#f87171" strokeWidth="2" />
          {/* 5 dutinek: L1, L2, L3, N a dole na 6h silný kolík PE */}
          <circle cx="92" cy="82" r="9" fill="#b45309" stroke="#fbbf24" strokeWidth="2" />
          <text x="92" y="67" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">L1</text>
          <circle cx="130" cy="65" r="9" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
          <text x="130" y="52" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">L2</text>
          <circle cx="168" cy="82" r="9" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
          <text x="168" y="67" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="bold">L3</text>
          <circle cx="165" cy="126" r="9" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="2" />
          <text x="184" y="130" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">N</text>
          {/* PE na pozici 6 hodin */}
          <circle cx="130" cy="146" r="12" fill="#16a34a" stroke="#facc15" strokeWidth="3" />
          <text x="130" y="150" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">PE</text>
          <text x="130" y="206" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold" fontFamily="monospace">
            3F ZÁSUVKA 400 V (pravotočivý sled L1→L2→L3)
          </text>
        </svg>
      );

    case 'wago-box':
      return (
        <svg viewBox="0 0 260 220" className="w-full max-w-[260px] h-auto mx-auto">
          {/* Kruhová odbočná krabice KU 68 */}
          <circle cx="130" cy="105" r="82" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
          {/* 3 páčkové WAGO 221 svorky uvnitř */}
          {[
            { y: 55, label: 'WAGO PE (zeleno-žlutá)', color: '#22c55e' },
            { y: 95, label: 'WAGO N (modrá)', color: '#3b82f6' },
            { y: 135, label: 'WAGO L (hnědá)', color: '#f59e0b' }
          ].map((w, idx) => (
            <g key={idx}>
              <rect x="75" y={w.y} width="110" height="26" rx="4" fill="#e2e8f0" fillOpacity="0.9" stroke={w.color} strokeWidth="2" />
              {/* 3 oranžové páčky WAGO 221 */}
              <rect x="82" y={w.y + 4} width="26" height="18" rx="2" fill="#ea580c" />
              <rect x="117" y={w.y + 4} width="26" height="18" rx="2" fill="#ea580c" />
              <rect x="152" y={w.y + 4} width="26" height="18" rx="2" fill="#ea580c" />
            </g>
          ))}
          <text x="130" y="206" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="monospace">
            KRABICE KU 68 + SVORKY WAGO 221 (11 mm)
          </text>
        </svg>
      );

    case 'lamp-dual':
      return (
        <svg viewBox="0 0 260 220" className="w-full max-w-[260px] h-auto mx-auto">
          <rect x="35" y="25" width="190" height="150" rx="16" fill="#0f172a" stroke="#475569" strokeWidth="2.5" />
          {/* Levá větev žárovek L1 */}
          <circle cx="85" cy="85" r="28" fill="#fef08a" fillOpacity="0.25" stroke="#eab308" strokeWidth="2.5" />
          <text x="85" y="90" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">Větev 1</text>
          {/* Pravá větev žárovek L2 */}
          <circle cx="175" cy="85" r="28" fill="#fef08a" fillOpacity="0.25" stroke="#eab308" strokeWidth="2.5" />
          <text x="175" y="90" textAnchor="middle" fill="#fde047" fontSize="12" fontWeight="bold">Větev 2</text>
          {/* Svorkovnice lustru */}
          <rect x="55" y="135" width="150" height="28" rx="4" fill="#1e293b" stroke="#94a3b8" />
          <text x="75" y="153" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">L1</text>
          <text x="110" y="153" textAnchor="middle" fill="#fb923c" fontSize="10" fontWeight="bold" fontFamily="monospace">L2</text>
          <text x="145" y="153" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">N</text>
          <text x="182" y="153" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold" fontFamily="monospace">PE⏚</text>
          <text x="130" y="204" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
            LUSTR (2 okruhy pro spínač č. 5)
          </text>
        </svg>
      );

    case 'pipe-clamp':
      return (
        <svg viewBox="0 0 260 220" className="w-full max-w-[260px] h-auto mx-auto">
          {/* Kovová vodovodní/plynová trubka */}
          <rect x="25" y="75" width="210" height="44" rx="8" fill="#64748b" stroke="#94a3b8" strokeWidth="2.5" />
          <text x="130" y="101" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
            KOVOVÉ POTRUBÍ (očištěný kov!)
          </text>
          {/* Zemnicí pásek Bernard */}
          <rect x="112" y="62" width="36" height="90" rx="4" fill="#cbd5e1" stroke="#475569" strokeWidth="2.5" />
          <circle cx="130" cy="136" r="10" fill="#22c55e" stroke="#facc15" strokeWidth="3" />
          <text x="130" y="140" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">⏚</text>
          <text x="130" y="198" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold" fontFamily="monospace">
            SVORKA BERNARD (pospojování PE)
          </text>
        </svg>
      );

    case 'meter-tester':
      return (
        <svg viewBox="0 0 260 220" className="w-full max-w-[260px] h-auto mx-auto">
          {/* Tělo revizního přístroje / dvoupólové zkoušečky */}
          <rect x="55" y="20" width="150" height="165" rx="16" fill="#eab308" stroke="#ca8a04" strokeWidth="3" />
          <rect x="70" y="36" width="120" height="65" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="2" />
          <text x="130" y="60" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="bold" fontFamily="monospace">230 V AC</text>
          <text x="130" y="78" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">Riso &gt; 500 MΩ</text>
          <text x="130" y="93" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">Zs = 0,42 Ω OK</text>
          {/* 2 měřicí zdířky / hroty */}
          <circle cx="98" cy="150" r="12" fill="#dc2626" stroke="#fff" strokeWidth="2" />
          <text x="98" y="154" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">+L</text>
          <circle cx="162" cy="150" r="12" fill="#1e293b" stroke="#fff" strokeWidth="2" />
          <text x="162" y="154" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">N/PE</text>
          <text x="130" y="206" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold" fontFamily="monospace">
            DVOUPÓLOVÁ ZKOUŠEČKA &amp; EUROTEST
          </text>
        </svg>
      );

    case 'contactor-km':
      return (
        <svg viewBox="0 0 260 220" className="w-full max-w-[260px] h-auto mx-auto">
          <rect x="15" y="92" width="230" height="36" fill="#334155" stroke="#475569" strokeWidth="1.5" rx="2" />
          <rect x="45" y="20" width="170" height="180" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" />
          {/* Horní svorky A1, 1(L1), 3(L2), 5(L3) */}
          {[
            { cx: 68, lbl: 'A1', col: '#d97706' },
            { cx: 110, lbl: '1(L1)', col: '#b45309' },
            { cx: 150, lbl: '3(L2)', col: '#334155' },
            { cx: 190, lbl: '5(L3)', col: '#64748b' }
          ].map((p) => (
            <g key={p.lbl}>
              <circle cx={p.cx} cy="38" r="9" fill="#e2e8f0" stroke={p.col} strokeWidth="2" />
              <text x={p.cx} y="14" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">{p.lbl}</text>
            </g>
          ))}
          <rect x="58" y="62" width="144" height="58" rx="5" fill="#0f172a" />
          <text x="130" y="82" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">STYKAČ KM (25 A)</text>
          <text x="130" y="99" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">Cívka A1–A2: 230 V~</text>
          <text x="130" y="113" textAnchor="middle" fill={activeState ? '#4ade80' : '#f87171'} fontSize="10" fontWeight="bold" fontFamily="monospace">
            {activeState ? 'KONTAKTY 1-2, 3-4, 5-6: SEPNUTO' : 'KONTAKTY: ROZEPNUTO'}
          </text>
          {/* Dolní svorky A2, 2(T1), 4(T2), 6(T3) */}
          {[
            { cx: 68, lbl: 'A2(N)', col: '#2563eb' },
            { cx: 110, lbl: '2(T1)', col: '#b45309' },
            { cx: 150, lbl: '4(T2)', col: '#334155' },
            { cx: 190, lbl: '6(T3)', col: '#64748b' }
          ].map((p) => (
            <g key={p.lbl}>
              <circle cx={p.cx} cy="182" r="9" fill="#e2e8f0" stroke={p.col} strokeWidth="2" />
              <text x={p.cx} y="214" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">{p.lbl}</text>
            </g>
          ))}
        </svg>
      );

    case 'boiler-1f':
      return (
        <svg viewBox="0 0 260 220" className="w-full max-w-[260px] h-auto mx-auto">
          <rect x="65" y="16" width="130" height="175" rx="36" fill="#f8fafc" stroke="#64748b" strokeWidth="3" />
          <circle cx="130" cy="65" r="22" fill="#0f172a" stroke="#ef4444" strokeWidth="2.5" />
          <text x="130" y="69" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold" fontFamily="monospace">65 °C</text>
          <text x="130" y="112" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold" fontFamily="monospace">BOJLER 2,2 kW</text>
          <rect x="82" y="135" width="96" height="32" rx="5" fill="#1e293b" />
          <text x="98" y="155" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">L</text>
          <text x="130" y="155" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">N</text>
          <text x="162" y="155" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold" fontFamily="monospace">PE⏚</text>
          <text x="130" y="210" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
            OHŘÍVAČ VODY (230 V • Třída I)
          </text>
        </svg>
      );

    case 'stove-3f':
      return (
        <svg viewBox="0 0 260 220" className="w-full max-w-[260px] h-auto mx-auto">
          <rect x="35" y="20" width="190" height="165" rx="12" fill="#1e293b" stroke="#94a3b8" strokeWidth="3" />
          {/* Topné články / plotýnky */}
          <rect x="52" y="36" width="156" height="72" rx="6" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
          <text x="130" y="68" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold" fontFamily="monospace">
            EL. AKUMULAČNÍ KAMNA
          </text>
          <text x="130" y="88" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">
            3N~ 400 V / 6 kW (pevný přívod)
          </text>
          {/* 5pólová přístrojová svorkovnice L1, L2, L3, N, PE */}
          <rect x="48" y="126" width="164" height="38" rx="5" fill="#090d16" stroke="#475569" />
          {['L1', 'L2', 'L3', 'N', 'PE⏚'].map((lbl, idx) => (
            <text
              key={lbl}
              x={66 + idx * 32}
              y="149"
              textAnchor="middle"
              fill={lbl === 'N' ? '#38bdf8' : lbl === 'PE⏚' ? '#4ade80' : '#f59e0b'}
              fontSize="10"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {lbl}
            </text>
          ))}
          <text x="130" y="206" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
            3F SPOTŘEBIČ 400 V (L1, L2, L3, N, PE)
          </text>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 260 200" className="w-full max-w-[260px] h-auto mx-auto">
          <circle cx="130" cy="95" r="65" fill="#1e293b" stroke="#f59e0b" strokeWidth="3" />
          <circle cx="130" cy="95" r="24" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
          <text x="130" y="100" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">E27</text>
          <text x="130" y="48" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">STŘED = FÁZE L</text>
          <text x="130" y="142" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">ZÁVIT = NULÁK N</text>
          <text x="130" y="185" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold" fontFamily="monospace">KOSTRA = PE (⏚)</text>
        </svg>
      );
  }
};
