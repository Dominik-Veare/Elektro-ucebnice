import React, { useState } from 'react';
import {
  ToggleLeft,
  Lightbulb,
  ShieldAlert,
  CheckCircle2,
  RotateCcw,
  Zap,
  Cpu,
  Wrench,
  AlertTriangle,
  Sparkles,
  Trash2,
  Eye,
  Layers
} from 'lucide-react';
import { ELECTRICAL_DEVICES_CATALOG, DeviceSvgPreview, DeviceSpec } from './svg/ElectricalDevices';
import { InteractiveBoardEditor } from './InteractiveBoardEditor';

type WireColor = 'brown' | 'blue' | 'green-yellow' | 'black';

interface WorkbenchTask {
  id: string;
  title: string;
  subtitle: string;
  normRef: string;
  devices: {
    id: string;
    title: string;
    svgId: string;
    terminals: { id: string; label: string }[];
  }[];
  requiredConnections: {
    from: string;
    to: string;
    color: WireColor;
    description: string;
  }[];
}

const WORKBENCH_TASKS: WorkbenchTask[] = [
  {
    id: 'task-socket',
    title: '1. Zásuvka 230 V přes proudový chránič a jistič B16',
    subtitle: 'Propoj svorky rozvaděče se svorkami zásuvky 230 V (pohled zepředu, kolík nahoře).',
    normRef: 'ČSN 33 2130 ed. 3',
    devices: [
      {
        id: 'rozv',
        title: 'Rozvaděč (Jistič B16 + RCD 30 mA)',
        svgId: 'rcbo-1p',
        terminals: [
          { id: 'R-L', label: 'Jistič B16 (výstup 2 / L)' },
          { id: 'R-N', label: 'Sběrnice N chrániče' },
          { id: 'R-PE', label: 'Hlavní sběrnice PE (⏚)' }
        ]
      },
      {
        id: 'zas',
        title: 'Zásuvka 230 V (pohled zepředu)',
        svgId: 'sock-230',
        terminals: [
          { id: 'Z-LEFT', label: 'LEVÁ dutinka' },
          { id: 'Z-PIN', label: 'HORNÍ ochranný kolík (⏚)' },
          { id: 'Z-RIGHT', label: 'PRAVÁ dutinka' }
        ]
      }
    ],
    requiredConnections: [
      { from: 'R-L', to: 'Z-LEFT', color: 'brown', description: 'Hnědý fázový vodič L z jističe B16 do LEVÉ dutinky zásuvky' },
      { from: 'R-PE', to: 'Z-PIN', color: 'green-yellow', description: 'Zeleno-žlutý ochranný vodič PE na HORNÍ ochranný kolík' },
      { from: 'R-N', to: 'Z-RIGHT', color: 'blue', description: 'Modrý nulový vodič N ze sběrnice chrániče do PRAVÉ dutinky zásuvky' }
    ]
  },
  {
    id: 'task-sw1',
    title: '2. Jednopólový spínač č. 1 a svítidlo E27 (třída I)',
    subtitle: 'Zapoj spínač č. 1 a žárovkovou objímku E27 tak, aby byla spínána fáze na středový kontakt.',
    normRef: 'ČSN 33 2130 ed. 3',
    devices: [
      {
        id: 'rozv',
        title: 'Rozvaděč (Jistič B10)',
        svgId: 'mcb-1p',
        terminals: [
          { id: 'R-L', label: 'Jistič B10 (výstup L)' },
          { id: 'R-N', label: 'Sběrnice N' },
          { id: 'R-PE', label: 'Sběrnice PE (⏚)' }
        ]
      },
      {
        id: 'sw1',
        title: 'Spínač řazení č. 1',
        svgId: 'sw-1',
        terminals: [
          { id: 'S-L', label: 'Svorka L (vstupní)' },
          { id: 'S-1', label: 'Svorka 1 (výstupní)' }
        ]
      },
      {
        id: 'lamp',
        title: 'Svítidlo E27 (třída ochrany I)',
        svgId: 'lamp-e27',
        terminals: [
          { id: 'L-CENTER', label: 'Středový (spodní) kontakt objímky' },
          { id: 'L-THREAD', label: 'Boční závit objímky (N)' },
          { id: 'L-CHASSIS', label: 'Kovová kostra svítidla (PE ⏚)' }
        ]
      }
    ],
    requiredConnections: [
      { from: 'R-L', to: 'S-L', color: 'brown', description: 'Stálá fáze L z jističe B10 na vstupní svorku L spínače č. 1' },
      { from: 'S-1', to: 'L-CENTER', color: 'black', description: 'Spínaná fáze z výstupu spínače (1) na STŘEDOVÝ kontakt objímky E27' },
      { from: 'R-N', to: 'L-THREAD', color: 'blue', description: 'Modrý nulový vodič N přímo na BOČNÍ ZÁVIT objímky' },
      { from: 'R-PE', to: 'L-CHASSIS', color: 'green-yellow', description: 'Zeleno-žlutý vodič PE přímo na kovovou kostru svítidla' }
    ]
  },
  {
    id: 'task-sw6',
    title: '3. Schodišťové přepínače č. 6 + č. 6 (ovládání ze 2 míst)',
    subtitle: 'Propoj dva střídavé přepínače č. 6 korespondenčními vodiči a zapoj svítidlo.',
    normRef: 'ČSN 33 2130 ed. 3',
    devices: [
      {
        id: 'sw6a',
        title: 'Přepínač č. 6A (1. místo – přívod L)',
        svgId: 'sw-6',
        terminals: [
          { id: '6A-L', label: 'Kmenová svorka L (přívod fáze z B10)' },
          { id: '6A-1', label: 'Korespondenční svorka 1' },
          { id: '6A-2', label: 'Korespondenční svorka 2' }
        ]
      },
      {
        id: 'sw6b',
        title: 'Přepínač č. 6B (2. místo – odchod ke světlu)',
        svgId: 'sw-6',
        terminals: [
          { id: '6B-1', label: 'Korespondenční svorka 1' },
          { id: '6B-2', label: 'Korespondenční svorka 2' },
          { id: '6B-L', label: 'Kmenová svorka L (výstup do světla)' }
        ]
      },
      {
        id: 'lamp',
        title: 'Svítidlo E27 (N a PE již zapojeny)',
        svgId: 'lamp-e27',
        terminals: [
          { id: 'LAMP-L', label: 'Středový kontakt svítidla (fáze)' }
        ]
      }
    ],
    requiredConnections: [
      { from: '6A-1', to: '6B-1', color: 'black', description: '1. korespondenční vodič mezi svorkami 1 přepínačů 6A a 6B' },
      { from: '6A-2', to: '6B-2', color: 'black', description: '2. korespondenční vodič mezi svorkami 2 přepínačů 6A a 6B' },
      { from: '6B-L', to: 'LAMP-L', color: 'brown', description: 'Spínaná fáze z kmenové svorky L druhého přepínače 6B do svítidla' }
    ]
  },
  {
    id: 'task-sw7',
    title: '4. Křížové zapojení 6 – 7 – 6 (ovládání ze 3 míst)',
    subtitle: 'Vlož křížový přepínač č. 7 mezi dva schodišťové přepínače č. 6A a č. 6B.',
    normRef: 'ČSN 33 2130 ed. 3',
    devices: [
      {
        id: 'sw6a',
        title: 'Přepínač č. 6A (začátek)',
        svgId: 'sw-6',
        terminals: [
          { id: '6A-1', label: 'Korespondenční výstup 1' },
          { id: '6A-2', label: 'Korespondenční výstup 2' }
        ]
      },
      {
        id: 'sw7',
        title: 'Křížový přepínač č. 7 (uprostřed)',
        svgId: 'sw-7',
        terminals: [
          { id: '7-IN1', label: 'Vstupní svorka 1 (↑)' },
          { id: '7-IN2', label: 'Vstupní svorka 2 (↑)' },
          { id: '7-OUT3', label: 'Výstupní svorka 3 (↓)' },
          { id: '7-OUT4', label: 'Výstupní svorka 4 (↓)' }
        ]
      },
      {
        id: 'sw6b',
        title: 'Přepínač č. 6B (konec)',
        svgId: 'sw-6',
        terminals: [
          { id: '6B-1', label: 'Korespondenční vstup 1' },
          { id: '6B-2', label: 'Korespondenční vstup 2' }
        ]
      }
    ],
    requiredConnections: [
      { from: '6A-1', to: '7-IN1', color: 'black', description: '1. korespondenční vodič ze 6A na vstup 1 (↑) křížového spínače č. 7' },
      { from: '6A-2', to: '7-IN2', color: 'black', description: '2. korespondenční vodič ze 6A na vstup 2 (↑) křížového spínače č. 7' },
      { from: '7-OUT3', to: '6B-1', color: 'black', description: '1. korespondenční vodič z výstupu 3 (↓) křížového spínače do 6B' },
      { from: '7-OUT4', to: '6B-2', color: 'black', description: '2. korespondenční vodič z výstupu 4 (↓) křížového spínače do 6B' }
    ]
  },
  {
    id: 'task-impulse',
    title: '5. Impulzní (paměťové) relé v rozvaděči a paralelní tlačítka',
    subtitle: 'Zapoj dvě tlačítka č. 1/0 paralelně na cívku A1–A2 impulzního relé a silový kontakt 1–2 ke světlu.',
    normRef: 'Kritérium NSK 4b • ČSN 33 2130 ed. 3',
    devices: [
      {
        id: 'buttons',
        title: 'Tlačítka SB1 a SB2 (fáze L již přivedena)',
        svgId: 'sw-push',
        terminals: [
          { id: 'SB1-OUT', label: 'Výstup tlačítka SB1 (svorka 1)' },
          { id: 'SB2-OUT', label: 'Výstup tlačítka SB2 (svorka 1)' }
        ]
      },
      {
        id: 'relay',
        title: 'Impulzní relé KA v rozvaděči (kontakt 1 napájen z B10)',
        svgId: 'impulse-relay',
        terminals: [
          { id: 'KA-A1', label: 'Svorka cívky A1 (impulz)' },
          { id: 'KA-A2', label: 'Svorka cívky A2 (nula)' },
          { id: 'KA-2', label: 'Silový kontakt 2 (výstup)' }
        ]
      },
      {
        id: 'target',
        title: 'Sběrnice N a Svítidlo',
        svgId: 'lamp-e27',
        terminals: [
          { id: 'BUS-N', label: 'Nulová sběrnice N v rozvaděči' },
          { id: 'LAMP-IN', label: 'Středový kontakt svítidla E27' }
        ]
      }
    ],
    requiredConnections: [
      { from: 'SB1-OUT', to: 'KA-A1', color: 'black', description: 'Impulzní vodič z 1. tlačítka SB1 na svorku cívky A1' },
      { from: 'SB2-OUT', to: 'KA-A1', color: 'black', description: 'Paralelní impulzní vodič z 2. tlačítka SB2 rovněž na svorku cívky A1' },
      { from: 'KA-A2', to: 'BUS-N', color: 'blue', description: 'Modrý nulový vodič N ze svorky cívky A2 na sběrnici N' },
      { from: 'KA-2', to: 'LAMP-IN', color: 'brown', description: 'Spínaná fáze ze silového kontaktu 2 relé do svítidla' }
    ]
  },
  {
    id: 'task-sw5',
    title: '6. Sériový (lustrový) přepínač č. 5 a dvojité svítidlo',
    subtitle: 'Zapoj dvouklapkový spínač č. 5 pro nezávislé ovládání dvou větví žárovek lustru.',
    normRef: 'ČSN 33 2130 ed. 3',
    devices: [
      {
        id: 'sw5',
        title: 'Lustrový spínač č. 5 (přívod L zapojen)',
        svgId: 'sw-5',
        terminals: [
          { id: 'SW5-1', label: 'Výstup 1 (levá klapka)' },
          { id: 'SW5-2', label: 'Výstup 2 (pravá klapka)' },
          { id: 'BOX-N', label: 'WAGO N v krabici' },
          { id: 'BOX-PE', label: 'WAGO PE v krabici (⏚)' }
        ]
      },
      {
        id: 'chandelier',
        title: 'Lustr se 2 skupinami žárovek',
        svgId: 'lamp-dual',
        terminals: [
          { id: 'CH-L1', label: 'Svorka L1 (1. větev žárovek)' },
          { id: 'CH-L2', label: 'Svorka L2 (2. větev žárovek)' },
          { id: 'CH-N', label: 'Společná svorka N' },
          { id: 'CH-PE', label: 'Kostra lustru PE (⏚)' }
        ]
      }
    ],
    requiredConnections: [
      { from: 'SW5-1', to: 'CH-L1', color: 'brown', description: '1. spínaná fáze z klapky 1 do 1. větve lustru (L1)' },
      { from: 'SW5-2', to: 'CH-L2', color: 'black', description: '2. spínaná fáze z klapky 2 do 2. větve lustru (L2)' },
      { from: 'BOX-N', to: 'CH-N', color: 'blue', description: 'Společný modrý vodič N do svorky N lustru' },
      { from: 'BOX-PE', to: 'CH-PE', color: 'green-yellow', description: 'Zeleno-žlutý ochranný vodič PE na kostru lustru' }
    ]
  },
  {
    id: 'task-pen-split',
    title: '7. Bod rozdělení PEN na PE a N v rozvaděči (TN-C-S)',
    subtitle: 'Proveď normové rozdělení přívodního vodiče PEN na sběrnici PE a zapoj proudový chránič RCD.',
    normRef: 'ČSN 33 2000-5-54 ed. 3',
    devices: [
      {
        id: 'supply',
        title: 'Přívod TN-C a sběrnice PE',
        svgId: 'busbar-pe',
        terminals: [
          { id: 'SUP-PEN', label: 'Přívodní vodič PEN (min. 10 mm² Cu)' },
          { id: 'PE-BAR-IN', label: 'Hlavní sběrnice PE – vstupní svorka' },
          { id: 'PE-BAR-BRIDGE', label: 'Hlavní sběrnice PE – odbočka pro N' }
        ]
      },
      {
        id: 'rcd',
        title: 'Proudový chránič RCD a oddělená sběrnice N1',
        svgId: 'rcd-2p',
        terminals: [
          { id: 'RCD-N-IN', label: 'Vstup N proudového chrániče (nahoře)' },
          { id: 'RCD-N-OUT', label: 'Výstup N proudového chrániče (dole)' },
          { id: 'N1-BAR', label: 'Samostatná sběrnice N1 (pro obvody za RCD)' }
        ]
      }
    ],
    requiredConnections: [
      { from: 'SUP-PEN', to: 'PE-BAR-IN', color: 'green-yellow', description: 'Přívodní vodič PEN musí být VŽDY nejprve připojen na ochrannou sběrnici PE!' },
      { from: 'PE-BAR-BRIDGE', to: 'RCD-N-IN', color: 'blue', description: 'Ze sběrnice PE se modrým vodičem N odbočí do vstupu N proudového chrániče' },
      { from: 'RCD-N-OUT', to: 'N1-BAR', color: 'blue', description: 'Z výstupu N proudového chrániče vede modrý vodič na samostatnou izolovanou sběrnici N1' }
    ]
  },
  {
    id: 'task-spd-met',
    title: '8. Svodič přepětí SPD Typ 1+2 a hlavní pospojování MET',
    subtitle: 'Zapoj přepěťovou ochranu SPD co nejkratší cestou (≤ 0,5 m) a propoj MET s potrubím.',
    normRef: 'ČSN 33 2000-5-534, ČSN 33 2000-5-54 ed. 3',
    devices: [
      {
        id: 'spd',
        title: 'Rozvaděč a svodič přepětí SPD',
        svgId: 'spd-t2',
        terminals: [
          { id: 'QM-L1', label: 'Fáze L1 za hlavním vypínačem' },
          { id: 'SPD-L1', label: 'Vstup L1 svodiče přepětí SPD' },
          { id: 'SPD-PE', label: 'Zemnicí svorka PE svodiče SPD (⏚)' }
        ]
      },
      {
        id: 'met',
        title: 'Hlavní uzemňovací svorkovnice MET a potrubí',
        svgId: 'met-hop',
        terminals: [
          { id: 'MET-SPD', label: 'Přípojnice PE / MET (svorka pro SPD, délka ≤ 0,5 m)' },
          { id: 'MET-PIPE', label: 'Svorkovnice MET (vývod pospojování)' },
          { id: 'PIPE-BERNARD', label: 'Svorka Bernard na kovovém potrubí vody/plynu' }
        ]
      }
    ],
    requiredConnections: [
      { from: 'QM-L1', to: 'SPD-L1', color: 'brown', description: 'Připojení fáze L1 na svodič přepětí SPD za hlavním vypínačem' },
      { from: 'SPD-PE', to: 'MET-SPD', color: 'green-yellow', description: 'Spojení svorky PE svodiče přepětí s přípojnicí PE/MET (celková délka vodičů ≤ 0,5 m!)' },
      { from: 'MET-PIPE', to: 'PIPE-BERNARD', color: 'green-yellow', description: 'Hlavní ochranné pospojování z MET na očištěné kovové potrubí (min. 6 mm² Cu)' }
    ]
  }
];

const WIRE_COLORS: { id: WireColor; name: string; badgeClass: string; hex: string }[] = [
  { id: 'brown', name: 'Hnědá (Fáze L)', badgeClass: 'bg-amber-700 text-white border-amber-500', hex: '#b45309' },
  { id: 'blue', name: 'Modrá (Nulák N)', badgeClass: 'bg-blue-600 text-white border-blue-400', hex: '#2563eb' },
  { id: 'green-yellow', name: 'Zeleno-žlutá (PE ⏚)', badgeClass: 'bg-emerald-600 text-yellow-200 border-yellow-400', hex: '#16a34a' },
  { id: 'black', name: 'Černá / Šedá (Spínaná / Koresp.)', badgeClass: 'bg-slate-700 text-slate-100 border-slate-400', hex: '#475569' }
];

export const WiringSimulator: React.FC = () => {
  const [mainTab, setMainTab] = useState<'board' | 'workbench' | 'catalog' | 'live'>('board');

  // --- STAVY PRO KATALOG SVG PŘÍSTROJŮ ---
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDevice, setSelectedDevice] = useState<DeviceSpec>(ELECTRICAL_DEVICES_CATALOG[0]);
  const [previewActiveState, setPreviewActiveState] = useState<boolean>(true);

  // --- STAVY PRO PRAKTICKÝ TRENAŽÉR ZAPOJOVÁNÍ (WORKBENCH) ---
  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(0);
  const [selectedWireColor, setSelectedWireColor] = useState<WireColor>('brown');
  const [selectedTerminal, setSelectedTerminal] = useState<string | null>(null);
  const [userConnections, setUserConnections] = useState<{ from: string; to: string; color: WireColor }[]>([]);
  const [workbenchChecked, setWorkbenchChecked] = useState<boolean>(false);

  // --- STAVY PRO ŽIVOU SIMULACI OBVODŮ ---
  const [activeSchema, setActiveSchema] = useState<'razeni1' | 'razeni5' | 'razeni6' | 'razeni7' | 'impulzni' | 'rcd'>('razeni6');
  const [switch1, setSwitch1] = useState(false);
  const [switch5A, setSwitch5A] = useState(false);
  const [switch5B, setSwitch5B] = useState(false);
  const [switch6A, setSwitch6A] = useState(false);
  const [switch6B, setSwitch6B] = useState(false);
  const [switch7A, setSwitch7A] = useState(false);
  const [switch7B, setSwitch7B] = useState(false);
  const [switch7C, setSwitch7C] = useState(false);
  const [impulseRelayOn, setImpulseRelayOn] = useState(false);
  const [activePushButton, setActivePushButton] = useState<number | null>(null);
  const [pulseCount, setPulseCount] = useState(0);
  const [leakageMa, setLeakageMa] = useState<number>(0);
  const [rcdTripped, setRcdTripped] = useState<boolean>(false);

  const currentTask = WORKBENCH_TASKS[activeTaskIndex];

  const handleSelectTask = (idx: number) => {
    setActiveTaskIndex(idx);
    setSelectedTerminal(null);
    setUserConnections([]);
    setWorkbenchChecked(false);
  };

  const handleTerminalClick = (termId: string) => {
    setWorkbenchChecked(false);
    if (!selectedTerminal) {
      setSelectedTerminal(termId);
      return;
    }
    if (selectedTerminal === termId) {
      setSelectedTerminal(null);
      return;
    }
    // Check if connection between these two already exists
    const exists = userConnections.some(
      (c) => (c.from === selectedTerminal && c.to === termId) || (c.from === termId && c.to === selectedTerminal)
    );
    if (!exists) {
      setUserConnections((prev) => [...prev, { from: selectedTerminal, to: termId, color: selectedWireColor }]);
    }
    setSelectedTerminal(null);
  };

  const removeConnection = (idx: number) => {
    setWorkbenchChecked(false);
    setUserConnections((prev) => prev.filter((_, i) => i !== idx));
  };

  const isConnectionCorrect = (conn: { from: string; to: string; color: WireColor }) => {
    return currentTask.requiredConnections.some(
      (req) =>
        ((req.from === conn.from && req.to === conn.to) || (req.from === conn.to && req.to === conn.from)) &&
        req.color === conn.color
    );
  };

  const isAllTaskCorrect =
    userConnections.length === currentTask.requiredConnections.length &&
    userConnections.every((c) => isConnectionCorrect(c));

  const getTerminalLabel = (termId: string) => {
    for (const dev of currentTask.devices) {
      const found = dev.terminals.find((t) => t.id === termId);
      if (found) return `${dev.title.split(' ')[0]} → ${found.label}`;
    }
    return termId;
  };

  const filteredCatalog =
    selectedCategory === 'all'
      ? ELECTRICAL_DEVICES_CATALOG
      : ELECTRICAL_DEVICES_CATALOG.filter((d) => d.category === selectedCategory);

  const bulb1On = switch1;
  const bulb5AOn = switch5A;
  const bulb5BOn = switch5B;
  const bulb6On = switch6A === switch6B;
  const bulb7On = (Number(switch7A) + Number(switch7B) + Number(switch7C)) % 2 === 0;

  const handleTriggerImpulse = (btnIndex: number) => {
    setActivePushButton(btnIndex);
    setImpulseRelayOn((prev) => !prev);
    setPulseCount((prev) => prev + 1);
    setTimeout(() => {
      setActivePushButton(null);
    }, 350);
  };

  const handleLeakageChange = (val: number) => {
    setLeakageMa(val);
    if (val >= 22) {
      setRcdTripped(true);
    }
  };

  const resetRcd = () => {
    setLeakageMa(0);
    setRcdTripped(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* HLAVIČKA A PŘEPÍNAČ 4 HLAVNÍCH REŽIMŮ */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Wrench className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white leading-snug">
                Interaktivní montážní tabule &amp; Trenažér zapojení
              </h1>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Praktická příprava na zkoušku NSK (26-017-H): skládej přístroje na DIN lištu a montážní tabuli, propojuj svorky vodiči a testuj živou funkci obvodu.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-5">
          <button
            onClick={() => setMainTab('board')}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-extrabold transition-all border ${
              mainTab === 'board'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>1. Montážní tabule (DIN + Stěna)</span>
          </button>

          <button
            onClick={() => setMainTab('workbench')}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-extrabold transition-all border ${
              mainTab === 'workbench'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <Wrench className="w-4 h-4 shrink-0" />
            <span>2. Krok za krokem (8 úloh)</span>
          </button>

          <button
            onClick={() => setMainTab('catalog')}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-extrabold transition-all border ${
              mainTab === 'catalog'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4 shrink-0" />
            <span>3. Katalog SVG přístrojů</span>
          </button>

          <button
            onClick={() => setMainTab('live')}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs font-extrabold transition-all border ${
              mainTab === 'live'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <ToggleLeft className="w-4 h-4 shrink-0" />
            <span>4. Princip spínačů a RCD</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* REŽIM 0: VOLNÁ INTERAKTIVNÍ MONTÁŽNÍ TABULE (DIN LIŠTA + STĚNA)        */}
      {/* ===================================================================== */}
      {mainTab === 'board' && <InteractiveBoardEditor />}

      {/* ===================================================================== */}
      {/* REŽIM 1: PRAKTICKÝ TRENAŽÉR ZAPOJOVÁNÍ SVOREK (8 ÚLOH NSK)             */}
      {/* ===================================================================== */}
      {mainTab === 'workbench' && (
        <div className="space-y-6">
          {/* Výběr z 8 praktických úloh */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-2.5">
              Zvol praktickou úlohu u zkoušky (1 až 8):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {WORKBENCH_TASKS.map((task, idx) => (
                <button
                  key={task.id}
                  onClick={() => handleSelectTask(idx)}
                  className={`text-left p-2.5 rounded-xl border text-xs font-bold transition-all ${
                    activeTaskIndex === idx
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="line-clamp-2 leading-snug">{task.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Pracovní deska úlohy */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">{currentTask.normRef}</span>
                <h2 className="text-lg font-black text-white mt-0.5">{currentTask.title}</h2>
                <p className="text-xs text-slate-400 mt-1">{currentTask.subtitle}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setUserConnections(
                      currentTask.requiredConnections.map((r) => ({ from: r.from, to: r.to, color: r.color }))
                    );
                    setWorkbenchChecked(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ukázat vzorové zapojení</span>
                </button>
                <button
                  onClick={() => {
                    setUserConnections([]);
                    setSelectedTerminal(null);
                    setWorkbenchChecked(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Odpojit vše</span>
                </button>
              </div>
            </div>

            {/* Krok 1: Volba barvy vodiče */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">
                  Krok 1: Zvol barvu vodiče, kterým chceš propojovat svorky (dle ČSN EN IEC 60445):
                </span>
                {selectedTerminal && (
                  <span className="text-xs font-mono font-bold text-amber-400 animate-pulse">
                    Vybrána 1. svorka – nyní klikni na cílovou svorku!
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {WIRE_COLORS.map((wire) => (
                  <button
                    key={wire.id}
                    onClick={() => setSelectedWireColor(wire.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all flex items-center gap-2 ${
                      selectedWireColor === wire.id
                        ? `${wire.badgeClass} ring-2 ring-amber-400 scale-[1.02]`
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/40" style={{ backgroundColor: wire.hex }} />
                    <span className="truncate">{wire.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Krok 2: Přístroje na montážním panelu se svorkami */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentTask.devices.map((dev) => (
                <div
                  key={dev.id}
                  className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wide mb-2 text-center">
                      {dev.title}
                    </h3>
                    <div className="bg-slate-900/70 rounded-xl p-2 border border-slate-800/80 mb-3">
                      <DeviceSvgPreview deviceId={dev.svgId} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Klikni na svorku pro připojení vodiče:
                    </span>
                    {dev.terminals.map((term) => {
                      const isSelected = selectedTerminal === term.id;
                      const connectedWires = userConnections.filter((c) => c.from === term.id || c.to === term.id);
                      return (
                        <button
                          key={term.id}
                          onClick={() => handleTerminalClick(term.id)}
                          className={`w-full text-left px-3 py-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-md'
                              : connectedWires.length > 0
                              ? 'bg-slate-900 border-emerald-500/50 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/60'
                          }`}
                        >
                          <span className="truncate">{term.label}</span>
                          <div className="flex items-center gap-1 shrink-0">
                            {connectedWires.map((cw, i) => {
                              const wObj = WIRE_COLORS.find((w) => w.id === cw.color);
                              return (
                                <span
                                  key={i}
                                  className="w-3 h-3 rounded-full border border-white/60"
                                  style={{ backgroundColor: wObj?.hex }}
                                  title={wObj?.name}
                                />
                              );
                            })}
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                              {isSelected ? 'VYBRÁNO' : 'Svorka'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Seznam zapojených vodičů a kontrola */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                    Zapojené vodiče ({userConnections.length} / {currentTask.requiredConnections.length} požadovaných):
                  </h4>
                </div>
                <button
                  onClick={() => setWorkbenchChecked(true)}
                  disabled={userConnections.length === 0}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 transition-all shadow-md"
                >
                  Zkontrolovat zapojení dle ČSN
                </button>
              </div>

              {userConnections.length === 0 ? (
                <p className="text-xs text-slate-500 italic">
                  Zatím jsi nezapojil žádný vodič. Vyber barvu vodiče a klikni postupně na dvě svorky, které chceš propojit.
                </p>
              ) : (
                <div className="space-y-2">
                  {userConnections.map((conn, idx) => {
                    const wireInfo = WIRE_COLORS.find((w) => w.id === conn.color);
                    const correct = isConnectionCorrect(conn);
                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between gap-3 p-2.5 rounded-xl border text-xs ${
                          workbenchChecked
                            ? correct
                              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                              : 'bg-red-500/10 border-red-500/40 text-red-200'
                            : 'bg-slate-900 border-slate-800 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className="w-3.5 h-3.5 rounded-full shrink-0 border border-white/50"
                            style={{ backgroundColor: wireInfo?.hex }}
                          />
                          <span className="font-bold truncate">
                            {getTerminalLabel(conn.from)} ↔ {getTerminalLabel(conn.to)}
                          </span>
                          <span className="text-[10px] font-mono opacity-75">({wireInfo?.name})</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {workbenchChecked && (
                            <span className="text-[11px] font-extrabold">
                              {correct ? '✓ SPRÁVNĚ' : '✕ CHYBA ZAPOJENÍ / BARVY'}
                            </span>
                          )}
                          <button
                            onClick={() => removeConnection(idx)}
                            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-red-400"
                            title="Odpojit vodič"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {workbenchChecked && (
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
                    isAllTaskCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                      : 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                  }`}
                >
                  <div className="flex items-center gap-2 font-extrabold text-sm">
                    {isAllTaskCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>Výborně! Zapojení přesně odpovídá normě {currentTask.normRef}.</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                        <span>Zapojení ještě není kompletní nebo obsahuje chybu. Zkontroluj předepsané spoje:</span>
                      </>
                    )}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 pt-1">
                    {currentTask.requiredConnections.map((req, i) => (
                      <li key={i}>{req.description}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* REŽIM 2: INTERAKTIVNÍ KATALOG VŠECH SVG PŘÍSTROJŮ A MODULŮ            */}
      {/* ===================================================================== */}
      {mainTab === 'catalog' && (
        <div className="space-y-6">
          {/* Filtr kategorií */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap gap-2">
            {[
              { id: 'all', label: `Všechny prvky (${ELECTRICAL_DEVICES_CATALOG.length})` },
              { id: 'din', label: '1. Přístroje na DIN lištu' },
              { id: 'busbar', label: '2. Sběrnice PE / N / MET' },
              { id: 'switch', label: '3. Spínače (1, 5, 6, 7, 1/0)' },
              { id: 'socket', label: '4. Zásuvky 230 V / 400 V' },
              { id: 'appliance', label: '5. Krabice WAGO, svítidla a pospojování' },
              { id: 'meter', label: '6. Měřicí přístroje' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const first =
                    cat.id === 'all'
                      ? ELECTRICAL_DEVICES_CATALOG[0]
                      : ELECTRICAL_DEVICES_CATALOG.find((d) => d.category === cat.id);
                  if (first) setSelectedDevice(first);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Levý sloupec: Přehled prvků */}
            <div className="lg:col-span-5 space-y-2 max-h-[640px] overflow-y-auto pr-1">
              {filteredCatalog.map((dev) => {
                const active = selectedDevice.id === dev.id;
                return (
                  <button
                    key={dev.id}
                    onClick={() => setSelectedDevice(dev)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      active
                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase block">
                        {dev.code} • {dev.standard}
                      </span>
                      <span className="text-xs font-extrabold block truncate mt-0.5">{dev.name}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-1 rounded-lg bg-slate-950 text-slate-400 shrink-0">
                      {dev.terminals.length} svorek
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Pravý sloupec: Detailní SVG inspektor vybraného přístroje */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                    {selectedDevice.categoryLabel} • {selectedDevice.standard}
                  </span>
                  <h2 className="text-lg font-black text-white mt-0.5">{selectedDevice.name}</h2>
                </div>
                <button
                  onClick={() => setPreviewActiveState(!previewActiveState)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700"
                >
                  Přepnout stav SVG ({previewActiveState ? 'ZAPNUTO' : 'VYPNUTO'})
                </button>
              </div>

              {/* SVG Náhled přístroje */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center">
                <DeviceSvgPreview deviceId={selectedDevice.id} activeState={previewActiveState} />
              </div>

              {/* Přehled svorek přístroje */}
              <div className="space-y-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                  Připojovací svorky přístroje ({selectedDevice.terminals.length}):
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDevice.terminals.map((t) => (
                    <div
                      key={t.id}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5 text-xs"
                    >
                      <span
                        className={`px-2 py-0.5 rounded font-mono font-extrabold text-[11px] shrink-0 ${
                          t.role === 'L'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : t.role === 'N'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            : t.role === 'PE'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-slate-800 text-slate-200 border border-slate-700'
                        }`}
                      >
                        {t.label}
                      </span>
                      <span className="text-slate-300 leading-snug">{t.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pravidlo u zkoušky & Na čem vyhazují */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-extrabold text-emerald-300">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>Pravidlo pro praktickou zkoušku NSK:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{selectedDevice.examRule}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-extrabold text-red-300">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Častá chyba u zkoušky (pozor!):</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{selectedDevice.commonMistake}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* REŽIM 3: ŽIVÁ SIMULACE SPÍNAČŮ A PROUDOVÉHO CHRÁNIČE                  */}
      {/* ===================================================================== */}
      {mainTab === 'live' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSchema('razeni1')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSchema === 'razeni1' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Řazení 1 (jednopólový)
            </button>
            <button
              onClick={() => setActiveSchema('razeni5')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSchema === 'razeni5' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Řazení 5 (lustrový)
            </button>
            <button
              onClick={() => setActiveSchema('razeni6')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSchema === 'razeni6' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Řazení 6 (schodišťový 6+6)
            </button>
            <button
              onClick={() => setActiveSchema('razeni7')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSchema === 'razeni7' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Řazení 7 (křížový 6-7-6)
            </button>
            <button
              onClick={() => setActiveSchema('impulzni')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSchema === 'impulzni' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Impulzní relé (tlačítka)
            </button>
            <button
              onClick={() => setActiveSchema('rcd')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSchema === 'rcd' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Proudový chránič (RCD)
            </button>
          </div>

          {activeSchema === 'razeni1' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">Spínač č. 1</span>
                <h2 className="text-lg font-bold text-white">Jednopólový spínač (1 svítidlo z 1 místa)</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Fáze L vstupuje do svorky L spínače. Spínačem přerušujeme výhradně fázový vodič L. Nulák N (na závit objímky) a PE jdou přímo do svítidla.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-8">
                <div className="flex items-center justify-around w-full max-w-md gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => setSwitch1(!switch1)}
                      className={`w-16 h-24 rounded-2xl border-2 flex flex-col items-center justify-between p-2 shadow-lg transition-all ${
                        switch1 ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-slate-900 border-slate-700 text-slate-500'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase">{switch1 ? 'ZAP' : 'VYP'}</span>
                      <div
                        className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs ${
                          switch1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        1
                      </div>
                      <span className="text-[9px] text-slate-400">Klikni</span>
                    </button>
                    <span className="text-xs text-slate-400 font-mono">Spínač č. 1</span>
                  </div>

                  <div className="flex-1 h-1 relative">
                    <div className={`h-full transition-all duration-300 ${bulb1On ? 'bg-amber-400 shadow-md shadow-amber-400/50' : 'bg-slate-800'}`} />
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-500">
                      {bulb1On ? '230 V proud teče' : 'Přerušeno'}
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                        bulb1On
                          ? 'bg-amber-400/20 text-yellow-300 ring-8 ring-amber-400/20 shadow-2xl shadow-yellow-400/50 scale-110'
                          : 'bg-slate-900 text-slate-700 border border-slate-800'
                      }`}
                    >
                      <Lightbulb className={`w-10 h-10 ${bulb1On ? 'fill-yellow-400 text-yellow-300' : ''}`} />
                    </div>
                    <span className="text-xs text-slate-300 font-bold">{bulb1On ? 'SVÍTÍ' : 'NESVÍTÍ'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSchema === 'razeni5' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">Spínač č. 5</span>
                <h2 className="text-lg font-bold text-white">Sériový / lustrový spínač (dvě nezávislé klapky)</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Jedna společná fázová svorka L, dva spínané výstupy (pro dvě skupiny žárovek v lustru nebo světlo + ventilátor).
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-8">
                <div className="flex items-center justify-around w-full max-w-lg gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-slate-900 border-2 border-slate-700 p-2 rounded-2xl flex gap-1 shadow-xl">
                      <button
                        onClick={() => setSwitch5A(!switch5A)}
                        className={`w-10 h-24 rounded-xl border flex flex-col items-center justify-between p-1.5 transition-colors ${
                          switch5A ? 'bg-amber-500/20 border-amber-500 text-amber-400 font-bold' : 'bg-slate-950 border-slate-800 text-slate-500'
                        }`}
                      >
                        <span className="text-[9px]">{switch5A ? 'ZAP' : 'VYP'}</span>
                        <span className="text-xs font-bold">A</span>
                        <span className="text-[8px] text-slate-500">Klapka</span>
                      </button>
                      <button
                        onClick={() => setSwitch5B(!switch5B)}
                        className={`w-10 h-24 rounded-xl border flex flex-col items-center justify-between p-1.5 transition-colors ${
                          switch5B ? 'bg-amber-500/20 border-amber-500 text-amber-400 font-bold' : 'bg-slate-950 border-slate-800 text-slate-500'
                        }`}
                      >
                        <span className="text-[9px]">{switch5B ? 'ZAP' : 'VYP'}</span>
                        <span className="text-xs font-bold">B</span>
                        <span className="text-[8px] text-slate-500">Klapka</span>
                      </button>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">Dvojspínač č. 5</span>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          bulb5AOn ? 'bg-amber-400/20 text-yellow-300 ring-4 ring-amber-400/20 shadow-lg shadow-yellow-400/30' : 'bg-slate-900 text-slate-700'
                        }`}
                      >
                        <Lightbulb className={`w-6 h-6 ${bulb5AOn ? 'fill-yellow-400 text-yellow-300' : ''}`} />
                      </div>
                      <span className="text-xs font-semibold text-slate-300">Skupina A: {bulb5AOn ? 'Svítí' : 'Nesvítí'}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          bulb5BOn ? 'bg-amber-400/20 text-yellow-300 ring-4 ring-amber-400/20 shadow-lg shadow-yellow-400/30' : 'bg-slate-900 text-slate-700'
                        }`}
                      >
                        <Lightbulb className={`w-6 h-6 ${bulb5BOn ? 'fill-yellow-400 text-yellow-300' : ''}`} />
                      </div>
                      <span className="text-xs font-semibold text-slate-300">Skupina B: {bulb5BOn ? 'Svítí' : 'Nesvítí'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSchema === 'razeni6' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">Spínače 6 + 6</span>
                <h2 className="text-lg font-bold text-white">Střídavé (schodišťové) zapojení ze 2 míst</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Ovládání jednoho světla ze dvou míst (např. dole a nahoře na schodišti). Zkus kliknout na kterýkoliv z přepínačů!
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center gap-8">
                <div className="flex items-center justify-between w-full max-w-xl gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => setSwitch6A(!switch6A)}
                      className={`w-14 h-24 rounded-2xl border-2 flex flex-col items-center justify-between p-2 shadow-lg transition-all ${
                        switch6A ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-[10px] font-bold">{switch6A ? 'POLOHA 1' : 'POLOHA 2'}</span>
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-amber-400">6A</div>
                      <span className="text-[9px] text-slate-500">Klikni</span>
                    </button>
                    <span className="text-xs text-slate-400">Dole na schodech</span>
                  </div>

                  <div className="flex-1 flex flex-col justify-between h-14 relative px-2">
                    <div className={`h-1 rounded transition-all ${bulb6On && switch6A ? 'bg-amber-400 shadow-sm shadow-amber-400' : 'bg-slate-800'}`} />
                    <span className="text-[9px] text-center text-slate-500 font-mono">2 korespondenční vodiče</span>
                    <div className={`h-1 rounded transition-all ${bulb6On && !switch6A ? 'bg-amber-400 shadow-sm shadow-amber-400' : 'bg-slate-800'}`} />
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => setSwitch6B(!switch6B)}
                      className={`w-14 h-24 rounded-2xl border-2 flex flex-col items-center justify-between p-2 shadow-lg transition-all ${
                        switch6B ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-[10px] font-bold">{switch6B ? 'POLOHA 1' : 'POLOHA 2'}</span>
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-amber-400">6B</div>
                      <span className="text-[9px] text-slate-500">Klikni</span>
                    </button>
                    <span className="text-xs text-slate-400">Nahoře na schodech</span>
                  </div>

                  <div className="flex flex-col items-center gap-2 pl-4">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                        bulb6On
                          ? 'bg-amber-400/20 text-yellow-300 ring-8 ring-amber-400/20 shadow-xl shadow-yellow-400/40 scale-105'
                          : 'bg-slate-900 text-slate-700 border border-slate-800'
                      }`}
                    >
                      <Lightbulb className={`w-8 h-8 ${bulb6On ? 'fill-yellow-400 text-yellow-300' : ''}`} />
                    </div>
                    <span className="text-xs text-slate-300 font-bold">{bulb6On ? 'SVÍTÍ' : 'NESVÍTÍ'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSchema === 'razeni7' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">Spínače 6 - 7 - 6</span>
                <h2 className="text-lg font-bold text-white">Křížové zapojení ze 3 a více míst</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Na začátku a na konci je spínač č. 6. Mezi nimi je křížový spínač č. 7 (má 4 svorky a kříží vodiče). Zkus kliknout na jakýkoliv ze 3 spínačů!
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-6">
                <div className="flex items-center justify-between w-full max-w-2xl gap-3">
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      onClick={() => setSwitch7A(!switch7A)}
                      className="w-12 h-20 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500 p-1.5 flex flex-col items-center justify-between transition-colors"
                    >
                      <span className="text-[9px] text-amber-400 font-bold">6A</span>
                      <div className={`w-6 h-6 rounded-full ${switch7A ? 'bg-amber-500' : 'bg-slate-800'}`} />
                      <span className="text-[8px] text-slate-500">Místo 1</span>
                    </button>
                  </div>

                  <div className="w-8 h-0.5 bg-slate-800" />

                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      onClick={() => setSwitch7B(!switch7B)}
                      className="w-14 h-20 rounded-xl bg-slate-900 border-2 border-amber-500/50 hover:border-amber-400 p-1.5 flex flex-col items-center justify-between transition-colors shadow-md shadow-amber-500/10"
                    >
                      <span className="text-[9px] text-amber-400 font-extrabold">KŘÍŽÁK 7</span>
                      <div
                        className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${
                          switch7B ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        ✕
                      </div>
                      <span className="text-[8px] text-slate-500">Místo 2</span>
                    </button>
                  </div>

                  <div className="w-8 h-0.5 bg-slate-800" />

                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      onClick={() => setSwitch7C(!switch7C)}
                      className="w-12 h-20 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-500 p-1.5 flex flex-col items-center justify-between transition-colors"
                    >
                      <span className="text-[9px] text-amber-400 font-bold">6C</span>
                      <div className={`w-6 h-6 rounded-full ${switch7C ? 'bg-amber-500' : 'bg-slate-800'}`} />
                      <span className="text-[8px] text-slate-500">Místo 3</span>
                    </button>
                  </div>

                  <div className="flex flex-col items-center gap-2 pl-3">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                        bulb7On
                          ? 'bg-amber-400/20 text-yellow-300 ring-6 ring-amber-400/20 shadow-xl shadow-yellow-400/40 scale-105'
                          : 'bg-slate-900 text-slate-700 border border-slate-800'
                      }`}
                    >
                      <Lightbulb className={`w-7 h-7 ${bulb7On ? 'fill-yellow-400 text-yellow-300' : ''}`} />
                    </div>
                    <span className="text-xs text-slate-300 font-bold">{bulb7On ? 'SVÍTÍ' : 'NESVÍTÍ'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSchema === 'impulzni' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">Kritérium NSK 4b • Impulzní relé (KA) + tlačítka (SB)</span>
                <h2 className="text-lg font-bold text-white">Světelný obvod ovládaný z více míst impulzním relé</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Všechna tlačítka (zapuštěné ovladače č. 1/0 s pružinou) jsou zapojena <strong>PARALELNĚ</strong>. Každý stisk pošle krátký impulz na cívku relé <strong>A1–A2</strong>, které překlopí svůj silový kontakt <strong>1–2</strong>.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center">
                    <span className="text-xs font-bold text-slate-300 block">Paralelně zapojená tlačítka (1/0):</span>
                    <div className="flex items-center gap-3">
                      {[1, 2, 3].map((btnNum) => {
                        const isPressed = activePushButton === btnNum;
                        return (
                          <button
                            key={btnNum}
                            onClick={() => handleTriggerImpulse(btnNum)}
                            className={`w-16 h-20 rounded-2xl border-2 flex flex-col items-center justify-between p-2 transition-all ${
                              isPressed
                                ? 'bg-amber-500 text-slate-950 border-amber-300 scale-95 shadow-lg shadow-amber-500/40'
                                : 'bg-slate-900 border-slate-700 hover:border-amber-500 text-slate-300'
                            }`}
                          >
                            <span className="text-[10px] font-mono font-bold">SB{btnNum}</span>
                            <div
                              className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold ${
                                isPressed ? 'bg-slate-950 text-amber-400 border-slate-950' : 'bg-slate-800 text-amber-400 border-slate-600'
                              }`}
                            >
                              ●
                            </div>
                            <span className="text-[9px]">Stiskni</span>
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-[11px] text-slate-500 block font-mono">Společný vodič z tlačítek → svorka A1</span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 min-w-[180px] ${
                      activePushButton !== null
                        ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20'
                        : 'bg-slate-900 border-slate-700'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">Rozvaděč • Relé KA1</span>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>Impulzní relé</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-lg p-2 text-[11px] font-mono text-slate-300 space-y-1 border border-slate-800">
                      <div className="flex justify-between">
                        <span>Cívka A1–A2:</span>
                        <span className={activePushButton !== null ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                          {activePushButton !== null ? 'IMPULZ 230V!' : '0 V (klid)'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Kontakt 1–2:</span>
                        <span className={impulseRelayOn ? 'text-emerald-400 font-bold' : 'text-red-400'}>
                          {impulseRelayOn ? 'SEPNUTO' : 'ROZEPNUTO'}
                        </span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Počet stisků:</span>
                        <span>{pulseCount}×</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                        impulseRelayOn
                          ? 'bg-amber-400/20 text-yellow-300 ring-8 ring-amber-400/20 shadow-2xl shadow-yellow-400/50 scale-105'
                          : 'bg-slate-900 text-slate-700 border border-slate-800'
                      }`}
                    >
                      <Lightbulb className={`w-10 h-10 ${impulseRelayOn ? 'fill-yellow-400 text-yellow-300' : ''}`} />
                    </div>
                    <span className="text-xs text-slate-300 font-bold">{impulseRelayOn ? 'SVÍTÍ' : 'NESVÍTÍ'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSchema === 'rcd' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">Proudový chránič 30 mA</span>
                <h2 className="text-lg font-bold text-white">Princip součtového transformátoru a simulace úniku do PE</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Chránič porovnává proud tekoucí fází L a vracející se nulákem N. Zvyšuj posuvníkem únikový proud do ochranného vodiče PE a sleduj, kdy chránič vybaví!
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        rcdTripped
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {rcdTripped ? '0' : 'I'}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 block">Stav proudového chrániče:</span>
                      <span className={`text-sm font-black ${rcdTripped ? 'text-red-400' : 'text-emerald-400'}`}>
                        {rcdTripped ? 'VYBAVENO (ROZPOJENO)' : 'ZAPNUTO (PŘIPRAVENO)'}
                      </span>
                    </div>
                  </div>

                  {rcdTripped && (
                    <button
                      onClick={resetRcd}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Nahodit páčku chrániče</span>
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-semibold">Simulovaný únikový proud do země / PE:</span>
                    <span className="font-mono text-base font-extrabold text-amber-400">{leakageMa} mA</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={leakageMa}
                    onChange={(e) => handleLeakageChange(Number(e.target.value))}
                    disabled={rcdTripped}
                    className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0 mA (Normál)</span>
                    <span>15 mA (Prahová mez 0,5 IΔn)</span>
                    <span>30 mA (Jmenovitý IΔn)</span>
                    <span>50 mA</span>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    rcdTripped ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  {rcdTripped ? (
                    <div className="flex items-start gap-2.5">
                      <ShieldAlert className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
                      <div>
                        <strong className="block text-sm text-red-200">CHRÁNIČ SPOLEHLIVĚ VYBAVIL!</strong>
                        Unikající proud překročil vybavovací mez ({leakageMa} mA). V součtovém transformátoru vzniklo rozdílové magnetické pole, relé vyrazilo západku a odpojilo fázi i nulák v čase do 30 ms.
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                      <div>
                        <strong className="block text-sm text-emerald-200">Rovnováha proudů zachována</strong>
                        Proud tekoucí do spotřebiče fází L se vrací vodičem N. Unikající proud ({leakageMa} mA) je pod vypínací mezí chrániče.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
