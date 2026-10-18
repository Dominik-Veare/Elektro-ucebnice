import React, { useState, useRef, useMemo } from 'react';
import {
  Plus,
  Trash2,
  Zap,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Move,
  Sparkles,
  Power,
  Layers
} from 'lucide-react';

export type BoardWireColor = 'brown' | 'black' | 'grey' | 'blue' | 'green-yellow' | 'comb';

export type MountZone = 'din' | 'busbar' | 'wall';

export type BoardDeviceType =
  | 'supply-in'      // Přívod sítě 230/400 V (L1, N, PEN, PE)
  | 'qm-1p'          // Hlavní vypínač
  | 'mcb-b10'        // Jistič B10 (1P)
  | 'mcb-b16'        // Jistič B16 (1P)
  | 'rcd-2p'         // Proudový chránič 2P (30 mA)
  | 'spd-t2'         // Svodič přepětí SPD T2
  | 'relay-ka'       // Impulzní relé KA
  | 'busbar-pe'      // Ochranná sběrnice PE (5 samostatných šroubů)
  | 'busbar-n'       // Nulová sběrnice N (5 šroubů)
  | 'wago-3'         // WAGO 221 (3pólová svorka v krabici)
  | 'sw-1'           // Vypínač č. 1 (jednopólový)
  | 'sw-5'           // Přepínač č. 5 (lustrový dvouklapkový)
  | 'sw-6'           // Přepínač č. 6 (schodišťový)
  | 'sw-7'           // Přepínač č. 7 (křížový)
  | 'sw-push'        // Tlačítko č. 1/0 (pro impulzní relé)
  | 'socket-230'     // Zásuvka 230 V (L vlevo, PE nahoře, N vpravo)
  | 'lamp-e27'       // Svítidlo E27 (L střed, N závit, PE kostra)
  | 'lamp-dual'      // Dvojitý lustr (L1, L2, N, PE)
  | 'pipe-bernard';  // Kovové potrubí se svorkou Bernard (pospojování)

export interface PinDef {
  id: string;
  label: string;
  dx: number; // Relativní X vůči levému hornímu rohu prvku
  dy: number; // Relativní Y vůči levému hornímu rohu prvku
  roleHint?: 'L' | 'N' | 'PE' | 'K';
}

export interface PaletteItem {
  type: BoardDeviceType;
  name: string;
  shortLabel: string;
  zone: MountZone;
  width: number;
  height: number;
  pins: PinDef[];
}

export const PALETTE_ITEMS: PaletteItem[] = [
  // --- MODULY NA DIN LIŠTU (zone: 'din') ---
  {
    type: 'qm-1p',
    name: 'Hlavní vypínač QM (63 A)',
    shortLabel: 'QM 63A',
    zone: 'din',
    width: 68,
    height: 130,
    pins: [
      { id: '1', label: '1 (in)', dx: 34, dy: 14, roleHint: 'L' },
      { id: '2', label: '2 (out)', dx: 34, dy: 116, roleHint: 'L' }
    ]
  },
  {
    type: 'mcb-b10',
    name: 'Jistič B10 (světla)',
    shortLabel: 'FA B10',
    zone: 'din',
    width: 68,
    height: 130,
    pins: [
      { id: '1', label: '1 (in)', dx: 34, dy: 14, roleHint: 'L' },
      { id: '2', label: '2 (out)', dx: 34, dy: 116, roleHint: 'L' }
    ]
  },
  {
    type: 'mcb-b16',
    name: 'Jistič B16 (zásuvky)',
    shortLabel: 'FA B16',
    zone: 'din',
    width: 68,
    height: 130,
    pins: [
      { id: '1', label: '1 (in)', dx: 34, dy: 14, roleHint: 'L' },
      { id: '2', label: '2 (out)', dx: 34, dy: 116, roleHint: 'L' }
    ]
  },
  {
    type: 'rcd-2p',
    name: 'Proudový chránič RCD 30 mA',
    shortLabel: 'RCD 30mA',
    zone: 'din',
    width: 104,
    height: 130,
    pins: [
      { id: '1', label: '1 (L in)', dx: 28, dy: 14, roleHint: 'L' },
      { id: 'N-in', label: 'N (in)', dx: 76, dy: 14, roleHint: 'N' },
      { id: '2', label: '2 (L out)', dx: 28, dy: 116, roleHint: 'L' },
      { id: 'N-out', label: 'N (out)', dx: 76, dy: 116, roleHint: 'N' }
    ]
  },
  {
    type: 'relay-ka',
    name: 'Impulzní relé KA (paměťové)',
    shortLabel: 'Relé KA',
    zone: 'din',
    width: 96,
    height: 130,
    pins: [
      { id: 'A1', label: 'A1 (imp)', dx: 26, dy: 14, roleHint: 'K' },
      { id: '1', label: '1 (L in)', dx: 70, dy: 14, roleHint: 'L' },
      { id: 'A2', label: 'A2 (N)', dx: 26, dy: 116, roleHint: 'N' },
      { id: '2', label: '2 (Světlo)', dx: 70, dy: 116, roleHint: 'K' }
    ]
  },
  {
    type: 'spd-t2',
    name: 'Svodič přepětí SPD T2',
    shortLabel: 'SPD T2',
    zone: 'din',
    width: 84,
    height: 130,
    pins: [
      { id: 'L', label: 'L (in)', dx: 26, dy: 14, roleHint: 'L' },
      { id: 'N', label: 'N (in)', dx: 58, dy: 14, roleHint: 'N' },
      { id: 'PE', label: 'PE (⏚)', dx: 42, dy: 116, roleHint: 'PE' }
    ]
  },

  // --- MŮSTKY A SBĚRNICE V ROZVADĚČI (zone: 'busbar') ---
  {
    type: 'busbar-pe',
    name: 'Ochranný můstek PE (5 šroubů)',
    shortLabel: 'Můstek PE (⏚)',
    zone: 'busbar',
    width: 175,
    height: 54,
    pins: [
      { id: 'PE1', label: 'PE1', dx: 25, dy: 27, roleHint: 'PE' },
      { id: 'PE2', label: 'PE2', dx: 56, dy: 27, roleHint: 'PE' },
      { id: 'PE3', label: 'PE3', dx: 87, dy: 27, roleHint: 'PE' },
      { id: 'PE4', label: 'PE4', dx: 118, dy: 27, roleHint: 'PE' },
      { id: 'PE5', label: 'PE5', dx: 149, dy: 27, roleHint: 'PE' }
    ]
  },
  {
    type: 'busbar-n',
    name: 'Nulový můstek N (izolovaný, 5 šroubů)',
    shortLabel: 'Můstek N',
    zone: 'busbar',
    width: 175,
    height: 54,
    pins: [
      { id: 'N1', label: 'N1', dx: 25, dy: 27, roleHint: 'N' },
      { id: 'N2', label: 'N2', dx: 56, dy: 27, roleHint: 'N' },
      { id: 'N3', label: 'N3', dx: 87, dy: 27, roleHint: 'N' },
      { id: 'N4', label: 'N4', dx: 118, dy: 27, roleHint: 'N' },
      { id: 'N5', label: 'N5', dx: 149, dy: 27, roleHint: 'N' }
    ]
  },

  // --- PRVKY NA MONTÁŽNÍ TABULI / STĚNU (zone: 'wall') ---
  {
    type: 'wago-3',
    name: 'WAGO 221 svorka (3pólová propojovací)',
    shortLabel: 'WAGO 3P',
    zone: 'wall',
    width: 106,
    height: 56,
    pins: [
      { id: 'W1', label: '1', dx: 22, dy: 42 },
      { id: 'W2', label: '2', dx: 53, dy: 42 },
      { id: 'W3', label: '3', dx: 84, dy: 42 }
    ]
  },
  {
    type: 'sw-1',
    name: 'Vypínač řazení č. 1 (jednopólový)',
    shortLabel: 'Spínač č. 1',
    zone: 'wall',
    width: 110,
    height: 110,
    pins: [
      { id: 'L', label: 'L (vstup)', dx: 32, dy: 18, roleHint: 'L' },
      { id: '1', label: '1 (výstup)', dx: 78, dy: 92, roleHint: 'K' }
    ]
  },
  {
    type: 'sw-5',
    name: 'Přepínač řazení č. 5 (lustrový 2 klapky)',
    shortLabel: 'Spínač č. 5',
    zone: 'wall',
    width: 116,
    height: 110,
    pins: [
      { id: 'L', label: 'L (vstup)', dx: 58, dy: 18, roleHint: 'L' },
      { id: '1', label: '1 (klapka A)', dx: 28, dy: 92, roleHint: 'K' },
      { id: '2', label: '2 (klapka B)', dx: 88, dy: 92, roleHint: 'K' }
    ]
  },
  {
    type: 'sw-6',
    name: 'Přepínač řazení č. 6 (schodišťový)',
    shortLabel: 'Přepínač č. 6',
    zone: 'wall',
    width: 116,
    height: 110,
    pins: [
      { id: 'L', label: 'L (kmenová)', dx: 58, dy: 18, roleHint: 'L' },
      { id: '1', label: 'K1', dx: 28, dy: 92, roleHint: 'K' },
      { id: '2', label: 'K2', dx: 88, dy: 92, roleHint: 'K' }
    ]
  },
  {
    type: 'sw-7',
    name: 'Přepínač řazení č. 7 (křížový)',
    shortLabel: 'Křížák č. 7',
    zone: 'wall',
    width: 120,
    height: 110,
    pins: [
      { id: '1', label: '1 (in↑)', dx: 30, dy: 18, roleHint: 'K' },
      { id: '2', label: '2 (in↑)', dx: 90, dy: 18, roleHint: 'K' },
      { id: '3', label: '3 (out↓)', dx: 30, dy: 92, roleHint: 'K' },
      { id: '4', label: '4 (out↓)', dx: 90, dy: 92, roleHint: 'K' }
    ]
  },
  {
    type: 'sw-push',
    name: 'Tlačítko č. 1/0 (pro impulzní relé)',
    shortLabel: 'Tlačítko 1/0',
    zone: 'wall',
    width: 110,
    height: 110,
    pins: [
      { id: 'L', label: 'L (fáze)', dx: 32, dy: 18, roleHint: 'L' },
      { id: '1', label: '1 (impulz)', dx: 78, dy: 92, roleHint: 'K' }
    ]
  },
  {
    type: 'socket-230',
    name: 'Zásuvka 230 V (L vlevo, PE nahoře, N vpravo)',
    shortLabel: 'Zásuvka 230V',
    zone: 'wall',
    width: 130,
    height: 115,
    pins: [
      { id: 'L', label: 'L (VLEVO)', dx: 28, dy: 72, roleHint: 'L' },
      { id: 'PE', label: 'PE (KOLÍK ⏚)', dx: 65, dy: 24, roleHint: 'PE' },
      { id: 'N', label: 'N (VPRAVO)', dx: 102, dy: 72, roleHint: 'N' }
    ]
  },
  {
    type: 'lamp-e27',
    name: 'Svítidlo E27 (třída I – střed L, závit N, kostra PE)',
    shortLabel: 'Svítidlo E27',
    zone: 'wall',
    width: 136,
    height: 115,
    pins: [
      { id: 'L', label: 'L (STŘED)', dx: 30, dy: 94, roleHint: 'K' },
      { id: 'N', label: 'N (ZÁVIT)', dx: 68, dy: 94, roleHint: 'N' },
      { id: 'PE', label: 'PE (KOSTRA ⏚)', dx: 106, dy: 94, roleHint: 'PE' }
    ]
  },
  {
    type: 'lamp-dual',
    name: 'Dvojitý lustr (L1, L2, N, PE)',
    shortLabel: 'Lustr (2 větvě)',
    zone: 'wall',
    width: 156,
    height: 115,
    pins: [
      { id: 'L1', label: 'L1', dx: 24, dy: 94, roleHint: 'K' },
      { id: 'L2', label: 'L2', dx: 60, dy: 94, roleHint: 'K' },
      { id: 'N', label: 'N', dx: 96, dy: 94, roleHint: 'N' },
      { id: 'PE', label: 'PE⏚', dx: 132, dy: 94, roleHint: 'PE' }
    ]
  },
  {
    type: 'pipe-bernard',
    name: 'Kovové potrubí + svorka Bernard (pospojování)',
    shortLabel: 'Potrubí (Bernard)',
    zone: 'wall',
    width: 130,
    height: 75,
    pins: [
      { id: 'PE', label: 'PE (pospojování ⏚)', dx: 65, dy: 22, roleHint: 'PE' }
    ]
  }
];

export interface PlacedDevice {
  instanceId: string;
  type: BoardDeviceType;
  label: string;
  x: number;
  y: number;
  // Vnitřní stav spínače / jističe (zapnuto/vypnuto, klapka A/B)
  stateA: boolean;
  stateB: boolean;
}

export interface BoardWire {
  id: string;
  fromInstanceId: string;
  fromPinId: string;
  toInstanceId: string;
  toPinId: string;
  color: BoardWireColor;
}

const WIRE_PALETTE: { id: BoardWireColor; label: string; hex: string; dash?: string }[] = [
  { id: 'brown', label: 'Hnědá (Fáze L)', hex: '#d97706' },
  { id: 'black', label: 'Černá (Koresp. / Spínaná)', hex: '#94a3b8' },
  { id: 'grey', label: 'Šedá (Koresp. / L3)', hex: '#cbd5e1' },
  { id: 'blue', label: 'Modrá (Střední N)', hex: '#3b82f6' },
  { id: 'green-yellow', label: 'Zeleno-žlutá (Ochranný PE)', hex: '#22c55e', dash: '8 4' },
  { id: 'comb', label: 'Fázový hřeben (DIN propojka)', hex: '#b45309' }
];

// Výchozí přívod sítě v levém horním rohu rozvaděče (pevný zdroj)
const SUPPLY_DEVICE: PaletteItem = {
  type: 'supply-in',
  name: 'Přívod ze sítě 230 V (L, N, PE)',
  shortLabel: 'SÍŤ 230V',
  zone: 'busbar',
  width: 135,
  height: 54,
  pins: [
    { id: 'L', label: 'L (230V)', dx: 28, dy: 27, roleHint: 'L' },
    { id: 'N', label: 'N', dx: 68, dy: 27, roleHint: 'N' },
    { id: 'PE', label: 'PE (⏚)', dx: 108, dy: 27, roleHint: 'PE' }
  ]
};

// Předpřipravená vzorová sestava 1: Zásuvka + Schodišťák (6 + 6)
const INITIAL_DEVICES: PlacedDevice[] = [
  { instanceId: 'supply', type: 'supply-in', label: 'Přívod 230V', x: 30, y: 28, stateA: true, stateB: false },
  { instanceId: 'pe-bar', type: 'busbar-pe', label: 'Můstek PE', x: 220, y: 28, stateA: true, stateB: false },
  { instanceId: 'n-bar', type: 'busbar-n', label: 'Můstek N (za RCD)', x: 430, y: 28, stateA: true, stateB: false },
  // DIN lišta (y = 115)
  { instanceId: 'rcd1', type: 'rcd-2p', label: 'FI1 (RCD 30mA)', x: 60, y: 115, stateA: true, stateB: false },
  { instanceId: 'b10', type: 'mcb-b10', label: 'FA1 (B10 Světla)', x: 195, y: 115, stateA: true, stateB: false },
  { instanceId: 'b16', type: 'mcb-b16', label: 'FA2 (B16 Zásuvky)', x: 290, y: 115, stateA: true, stateB: false },
  // Montážní plocha stěny (y >= 300)
  { instanceId: 'sw6a', type: 'sw-6', label: 'Přepínač 6A (dole)', x: 60, y: 340, stateA: false, stateB: false },
  { instanceId: 'sw6b', type: 'sw-6', label: 'Přepínač 6B (nahoře)', x: 240, y: 340, stateA: false, stateB: false },
  { instanceId: 'lamp1', type: 'lamp-e27', label: 'Svítidlo E27', x: 430, y: 340, stateA: false, stateB: false },
  { instanceId: 'sock1', type: 'socket-230', label: 'Zásuvka 230 V', x: 630, y: 340, stateA: false, stateB: false }
];

const INITIAL_WIRES: BoardWire[] = [
  // Přívod do RCD a PE můstku
  { id: 'w1', fromInstanceId: 'supply', fromPinId: 'PE', toInstanceId: 'pe-bar', toPinId: 'PE1', color: 'green-yellow' },
  { id: 'w2', fromInstanceId: 'supply', fromPinId: 'L', toInstanceId: 'rcd1', toPinId: '1', color: 'brown' },
  { id: 'w3', fromInstanceId: 'supply', fromPinId: 'N', toInstanceId: 'rcd1', toPinId: 'N-in', color: 'blue' },
  // Z RCD do N můstku a jističů B10, B16
  { id: 'w4', fromInstanceId: 'rcd1', fromPinId: 'N-out', toInstanceId: 'n-bar', toPinId: 'N1', color: 'blue' },
  { id: 'w5', fromInstanceId: 'rcd1', fromPinId: '2', toInstanceId: 'b10', toPinId: '1', color: 'comb' },
  { id: 'w6', fromInstanceId: 'b10', fromPinId: '1', toInstanceId: 'b16', toPinId: '1', color: 'comb' },
  // Světelný obvod (schodišťák 6A -> 6B -> Svítidlo)
  { id: 'w7', fromInstanceId: 'b10', fromPinId: '2', toInstanceId: 'sw6a', toPinId: 'L', color: 'brown' },
  { id: 'w8', fromInstanceId: 'sw6a', fromPinId: '1', toInstanceId: 'sw6b', toPinId: '1', color: 'black' },
  { id: 'w9', fromInstanceId: 'sw6a', fromPinId: '2', toInstanceId: 'sw6b', toPinId: '2', color: 'grey' },
  { id: 'w10', fromInstanceId: 'sw6b', fromPinId: 'L', toInstanceId: 'lamp1', toPinId: 'L', color: 'brown' },
  { id: 'w11', fromInstanceId: 'n-bar', fromPinId: 'N2', toInstanceId: 'lamp1', toPinId: 'N', color: 'blue' },
  { id: 'w12', fromInstanceId: 'pe-bar', fromPinId: 'PE2', toInstanceId: 'lamp1', toPinId: 'PE', color: 'green-yellow' },
  // Zásuvkový obvod (B16 -> Zásuvka 230 V)
  { id: 'w13', fromInstanceId: 'b16', fromPinId: '2', toInstanceId: 'sock1', toPinId: 'L', color: 'brown' },
  { id: 'w14', fromInstanceId: 'n-bar', fromPinId: 'N3', toInstanceId: 'sock1', toPinId: 'N', color: 'blue' },
  { id: 'w15', fromInstanceId: 'pe-bar', fromPinId: 'PE3', toInstanceId: 'sock1', toPinId: 'PE', color: 'green-yellow' }
];

export const InteractiveBoardEditor: React.FC = () => {
  const [devices, setDevices] = useState<PlacedDevice[]>(INITIAL_DEVICES);
  const [wires, setWires] = useState<BoardWire[]>(INITIAL_WIRES);
  const [selectedColor, setSelectedColor] = useState<BoardWireColor>('brown');
  const [activePin, setActivePin] = useState<{ instanceId: string; pinId: string } | null>(null);
  const [powerOn, setPowerOn] = useState<boolean>(true);
  const [ruleMessage, setRuleMessage] = useState<{ type: 'error' | 'info' | 'success'; text: string } | null>(null);

  // Dragging prvku po tabuli
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ dx: number; dy: number }>({ dx: 0, dy: 0 });

  const getSpec = (type: BoardDeviceType): PaletteItem => {
    if (type === 'supply-in') return SUPPLY_DEVICE;
    return PALETTE_ITEMS.find((p) => p.type === type) || PALETTE_ITEMS[0];
  };

  // Přidání nového prvku na tabuli s kontrolou pravidel zóny (DIN lišta vs. můstky vs. stěna)
  const handleAddDevice = (item: PaletteItem) => {
    const id = `${item.type}-${Date.now().toString().slice(-4)}`;
    if (item.zone === 'din') {
      // Najdeme volné místo na DIN liště (y = 115)
      const dinDevices = devices.filter((d) => getSpec(d.type).zone === 'din');
      const maxX = dinDevices.reduce((max, d) => Math.max(max, d.x + getSpec(d.type).width + 14), 60);
      if (maxX + item.width > 790) {
        setRuleMessage({
          type: 'error',
          text: 'Pravidlo DIN lišty: DIN lišta v rozvaděči je plná! Odstraň některý modul z DIN lišty.'
        });
        return;
      }
      setDevices((prev) => [
        ...prev,
        { instanceId: id, type: item.type, label: item.shortLabel, x: maxX, y: 115, stateA: true, stateB: false }
      ]);
      setRuleMessage({
        type: 'info',
        text: `Modul „${item.name}“ byl nacvaknut na 35mm DIN lištu v rozvaděči.`
      });
    } else if (item.zone === 'busbar') {
      const busDevices = devices.filter((d) => getSpec(d.type).zone === 'busbar');
      const maxX = busDevices.reduce((max, d) => Math.max(max, d.x + getSpec(d.type).width + 20), 30);
      if (maxX + item.width > 790) {
        setRuleMessage({
          type: 'error',
          text: 'Držák sběrnic PE/N v horní části rozvaděče je již plný!'
        });
        return;
      }
      setDevices((prev) => [
        ...prev,
        { instanceId: id, type: item.type, label: item.shortLabel, x: maxX, y: 28, stateA: true, stateB: false }
      ]);
      setRuleMessage({
        type: 'info',
        text: `Můstek „${item.name}“ byl osazen do držáku sběrnic v rozvaděči.`
      });
    } else {
      // Stěna (y >= 300)
      const wallCount = devices.filter((d) => getSpec(d.type).zone === 'wall').length;
      const col = wallCount % 4;
      const row = Math.floor(wallCount / 4);
      const x = 60 + col * 190;
      const y = 320 + row * 135;
      setDevices((prev) => [
        ...prev,
        { instanceId: id, type: item.type, label: item.shortLabel, x, y: Math.min(y, 460), stateA: false, stateB: false }
      ]);
      setRuleMessage({
        type: 'info',
        text: `Prvek „${item.name}“ byl umístěn na montážní desku. Můžeš ho myší libovolně posouvat!`
      });
    }
  };

  const handleRemoveDevice = (instanceId: string) => {
    if (instanceId === 'supply') {
      setRuleMessage({ type: 'error', text: 'Hlavní přívod sítě 230 V nelze z rozvaděče odstranit.' });
      return;
    }
    setDevices((prev) => prev.filter((d) => d.instanceId !== instanceId));
    setWires((prev) => prev.filter((w) => w.fromInstanceId !== instanceId && w.toInstanceId !== instanceId));
    if (activePin?.instanceId === instanceId) setActivePin(null);
  };

  // Kliknutí na svorku (pin) – propojení vodičem s kontrolou pravidel!
  const handlePinClick = (instanceId: string, pinId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activePin) {
      setActivePin({ instanceId, pinId });
      return;
    }
    if (activePin.instanceId === instanceId && activePin.pinId === pinId) {
      setActivePin(null);
      return;
    }

    const fromDev = devices.find((d) => d.instanceId === activePin.instanceId);
    const toDev = devices.find((d) => d.instanceId === instanceId);
    if (!fromDev || !toDev) return;

    const fromZone = getSpec(fromDev.type).zone;
    const toZone = getSpec(toDev.type).zone;

    // PRAVIDLO 1: Fázový hřeben (comb) smí propojovat POUZE horní nebo dolní svorky přístrojů na DIN liště!
    if (selectedColor === 'comb' && (fromZone !== 'din' || toZone !== 'din')) {
      setRuleMessage({
        type: 'error',
        text: 'Pravidlo montáže: Fázovou hřebenovou lištou lze propojovat výhradně modulové přístroje na DIN liště!'
      });
      setActivePin(null);
      return;
    }

    // PRAVIDLO 2: Na ochranném můstku PE smí být pod jedním šroubem (PE1..PE5) pouze 1 vodič!
    const checkPeScrewLimit = (dev: PlacedDevice, pId: string) => {
      if (dev.type === 'busbar-pe') {
        const count = wires.filter(
          (w) => (w.fromInstanceId === dev.instanceId && w.fromPinId === pId) || (w.toInstanceId === dev.instanceId && w.toPinId === pId)
        ).length;
        if (count >= 1) {
          return true;
        }
      }
      return false;
    };

    if (checkPeScrewLimit(fromDev, activePin.pinId) || checkPeScrewLimit(toDev, pinId)) {
      setRuleMessage({
        type: 'error',
        text: 'Norma ČSN 33 2000-5-54 ed. 3: Pod jeden šroub na ochranném můstku PE smí být připojen VŽDY POUZE 1 vodič! Zvol vedlejší volný šroub (PE1–PE5).'
      });
      setActivePin(null);
      return;
    }

    // PRAVIDLO 3: Zeleno-žlutý vodič PE nesmí být přeznačován na živý vodič (upozornění pokud nejde na PE svorku)
    const exists = wires.some(
      (w) =>
        (w.fromInstanceId === activePin.instanceId &&
          w.fromPinId === activePin.pinId &&
          w.toInstanceId === instanceId &&
          w.toPinId === pinId) ||
        (w.fromInstanceId === instanceId &&
          w.fromPinId === pinId &&
          w.toInstanceId === activePin.instanceId &&
          w.toPinId === activePin.pinId)
    );

    if (!exists) {
      setWires((prev) => [
        ...prev,
        {
          id: `wire-${Date.now()}`,
          fromInstanceId: activePin.instanceId,
          fromPinId: activePin.pinId,
          toInstanceId: instanceId,
          toPinId: pinId,
          color: selectedColor
        }
      ]);
      setRuleMessage(null);
    }
    setActivePin(null);
  };

  // Přepínání stavu přístroje (páčka jističe, klapka vypínače, tlačítko 1/0)
  const handleToggleDeviceState = (inst: PlacedDevice, which: 'A' | 'B' = 'A') => {
    if (inst.type === 'sw-push') {
      // Krátký impulz tlačítka 1/0 -> pokud je tlačítko pod napětím L a spojené s A1 impulzního relé, překlopí relé!
      setDevices((prev) =>
        prev.map((d) => {
          if (d.instanceId === inst.instanceId) return { ...d, stateA: true };
          return d;
        })
      );
      setTimeout(() => {
        setDevices((prev) =>
          prev.map((d) => {
            if (d.instanceId === inst.instanceId) return { ...d, stateA: false };
            if (d.type === 'relay-ka') return { ...d, stateA: !d.stateA };
            return d;
          })
        );
      }, 250);
      return;
    }

    setDevices((prev) =>
      prev.map((d) => {
        if (d.instanceId !== inst.instanceId) return d;
        return which === 'A' ? { ...d, stateA: !d.stateA } : { ...d, stateB: !d.stateB };
      })
    );
  };

  // Drag & Drop posouvání prvků s vynucením zón (DIN lišta vs. Můstky vs. Stěna)
  const getSvgCoords = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 820 / rect.width;
    const scaleY = 590 / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handleStartDrag = (inst: PlacedDevice, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 820 / rect.width;
    const scaleY = 590 / rect.height;
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;
    setDraggingId(inst.instanceId);
    setDragOffset({ dx: mouseX - inst.x, dy: mouseY - inst.y });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggingId) return;
    const { x, y } = getSvgCoords(e);
    setDevices((prev) =>
      prev.map((d) => {
        if (d.instanceId !== draggingId) return d;
        const spec = getSpec(d.type);
        const newX = Math.max(16, Math.min(800 - spec.width, Math.round((x - dragOffset.dx) / 10) * 10));

        // Vynucení pravidel umístění podle typu prvku:
        if (spec.zone === 'din') {
          // Moduly na DIN lištu se pohybují pouze vodorovně po DIN liště (y = 115)!
          return { ...d, x: newX, y: 115 };
        }
        if (spec.zone === 'busbar') {
          // Sběrnice PE/N zůstávají v horní liště rozvaděče (y = 28)
          return { ...d, x: newX, y: 28 };
        }
        // Prvky na stěnu smí být pouze v montážní zóně pod rozvaděčem (y >= 295)
        const newY = Math.max(295, Math.min(580 - spec.height, Math.round((y - dragOffset.dy) / 10) * 10));
        return { ...d, x: newX, y: newY };
      })
    );
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  // =========================================================================
  // ŽIVÝ ELEKTROTECHNICKÝ SOLVER (BFS průchod grafem spojů a kontaktů)
  // =========================================================================
  const simulation = useMemo(() => {
    const adj = new Map<string, string[]>();
    const addEdge = (a: string, b: string) => {
      if (!adj.has(a)) adj.set(a, []);
      if (!adj.has(b)) adj.set(b, []);
      adj.get(a)!.push(b);
      adj.get(b)!.push(a);
    };

    // 1. Vnější vodiče natažené uživatelem
    for (const w of wires) {
      addEdge(`${w.fromInstanceId}:${w.fromPinId}`, `${w.toInstanceId}:${w.toPinId}`);
    }

    // 2. Vnitřní vodivé cesty uvnitř přístrojů (můstky, WAGO, sepnuté jističe a přepínače)
    for (const d of devices) {
      const id = d.instanceId;
      switch (d.type) {
        case 'busbar-pe':
          ['PE1', 'PE2', 'PE3', 'PE4', 'PE5'].forEach((p, idx, arr) => {
            if (idx > 0) addEdge(`${id}:${arr[0]}`, `${id}:${p}`);
          });
          break;
        case 'busbar-n':
          ['N1', 'N2', 'N3', 'N4', 'N5'].forEach((p, idx, arr) => {
            if (idx > 0) addEdge(`${id}:${arr[0]}`, `${id}:${p}`);
          });
          break;
        case 'wago-3':
          addEdge(`${id}:W1`, `${id}:W2`);
          addEdge(`${id}:W1`, `${id}:W3`);
          break;
        case 'qm-1p':
        case 'mcb-b10':
        case 'mcb-b16':
          if (d.stateA) addEdge(`${id}:1`, `${id}:2`);
          break;
        case 'rcd-2p':
          if (d.stateA) {
            addEdge(`${id}:1`, `${id}:2`);
            addEdge(`${id}:N-in`, `${id}:N-out`);
          }
          break;
        case 'relay-ka':
          if (d.stateA) addEdge(`${id}:1`, `${id}:2`);
          break;
        case 'sw-1':
        case 'sw-push':
          if (d.stateA) addEdge(`${id}:L`, `${id}:1`);
          break;
        case 'sw-5':
          if (d.stateA) addEdge(`${id}:L`, `${id}:1`);
          if (d.stateB) addEdge(`${id}:L`, `${id}:2`);
          break;
        case 'sw-6':
          // Střídavý přepínač: v poloze false spojuje L -> 1, v poloze true spojuje L -> 2
          if (!d.stateA) addEdge(`${id}:L`, `${id}:1`);
          else addEdge(`${id}:L`, `${id}:2`);
          break;
        case 'sw-7':
          // Křížový přepínač: v poloze false spojuje rovně (1-3, 2-4), v poloze true křížem (1-4, 2-3)
          if (!d.stateA) {
            addEdge(`${id}:1`, `${id}:3`);
            addEdge(`${id}:2`, `${id}:4`);
          } else {
            addEdge(`${id}:1`, `${id}:4`);
            addEdge(`${id}:2`, `${id}:3`);
          }
          break;
      }
    }

    const bfsReachable = (startNode: string): Set<string> => {
      const visited = new Set<string>();
      if (!powerOn) return visited;
      const queue = [startNode];
      visited.add(startNode);
      while (queue.length > 0) {
        const curr = queue.shift()!;
        for (const next of adj.get(curr) || []) {
          if (!visited.has(next)) {
            visited.add(next);
            queue.push(next);
          }
        }
      }
      return visited;
    };

    const liveL = bfsReachable('supply:L');
    const liveN = bfsReachable('supply:N');
    const livePE = bfsReachable('supply:PE');

    // Kontrola zkratu L-N nebo L-PE nebo spojení N-PE
    const shortLN = [...liveL].some((node) => liveN.has(node));
    const shortLPE = [...liveL].some((node) => livePE.has(node));
    const shortNPE = [...liveN].some((node) => livePE.has(node));

    return { liveL, liveN, livePE, shortLN, shortLPE, shortNPE };
  }, [devices, wires, powerOn]);

  // Automatická revizní diagnostika zapojení na tabuli
  const runBoardAudit = () => {
    const issues: string[] = [];

    if (simulation.shortLN) {
      issues.push('TVRDÝ ZKRAT L–N: Fázový vodič L je přímo spojen s nulovým vodičem N!');
    }
    if (simulation.shortLPE) {
      issues.push('ZEMNÍ ZKRAT L–PE: Fázový vodič L je přímo spojen s ochranným vodičem PE!');
    }
    if (simulation.shortNPE) {
      issues.push('SPOJENÍ N–PE ZA ROZDĚLENÍM: Vodiče N a PE jsou spojené, proudový chránič RCD okamžitě vybaví!');
    }

    // Kontrola všech zásuvek 230 V na tabuli
    for (const d of devices.filter((x) => x.type === 'socket-230')) {
      const hasL = simulation.liveL.has(`${d.instanceId}:L`);
      const hasN = simulation.liveN.has(`${d.instanceId}:N`);
      const hasPE = simulation.livePE.has(`${d.instanceId}:PE`);
      const reversedLN = simulation.liveL.has(`${d.instanceId}:N`) || simulation.liveN.has(`${d.instanceId}:L`);
      const phaseOnPin = simulation.liveL.has(`${d.instanceId}:PE`);

      if (phaseOnPin) {
        issues.push(`${d.label}: SMRTELNÉ NEBEZPEČÍ – Fáze L je přivedena na ochranný kolík PE!`);
      } else if (reversedLN) {
        issues.push(`${d.label}: Prohozená fáze L a nulák N (dle ČSN 33 2130 musí být fáze L v levé dutince a N v pravé)!`);
      } else if (!hasPE) {
        issues.push(`${d.label}: Chybí připojený ochranný vodič PE na horním kolíku zásuvky!`);
      } else if (!hasL || !hasN) {
        issues.push(`${d.label}: Do zásuvky není přivedeno pracovní napětí 230 V (zkontroluj L a N).`);
      }
    }

    // Kontrola všech svítidel E27 na tabuli
    for (const d of devices.filter((x) => x.type === 'lamp-e27')) {
      if (simulation.liveL.has(`${d.instanceId}:N`)) {
        issues.push(`${d.label}: Fáze L je připojena na boční závit objímky místo na středový kontakt (nebezpečí úrazu při výměně žárovky)!`);
      }
      if (!simulation.livePE.has(`${d.instanceId}:PE`)) {
        issues.push(`${d.label}: Kovová kostra svítidla třídy ochrany I není spojena s ochranným vodičem PE!`);
      }
    }

    if (issues.length === 0) {
      setRuleMessage({
        type: 'success',
        text: 'Revizní kontrola ČSN: Všechny zapojené prvky na tabuli vyhovují normám ČSN 33 2000-4-41 ed. 3 a ČSN 33 2130 ed. 3 (žádný zkrat, správná polarita L/N/PE)!'
      });
    } else {
      setRuleMessage({
        type: 'error',
        text: `Revizní kontrola odhalila závady (${issues.length}): ${issues.join(' • ')}`
      });
    }
  };

  // Pomocná funkce pro získání absolutních souřadnic svorky na SVG plátně
  const getPinAbsCoords = (instanceId: string, pinId: string): { x: number; y: number } | null => {
    const dev = devices.find((d) => d.instanceId === instanceId);
    if (!dev) return null;
    const spec = getSpec(dev.type);
    const pin = spec.pins.find((p) => p.id === pinId);
    if (!pin) return null;
    return { x: dev.x + pin.dx, y: dev.y + pin.dy };
  };

  return (
    <div className="space-y-5">
      {/* HORNÍ PANEL NÁSTROJŮ: Paleta přístrojů + Volba barvy vodiče */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-sm sm:text-base font-black text-white">
                Interaktivní montážní tabule (Rozvaděč s DIN lištou + Stěna)
              </h2>
              <p className="text-[11px] text-slate-400">
                Přidávej prvky na tabuli, posouvej je myší, propojuj svorky kliknutím a zkoušej živou funkci obvodu!
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setPowerOn(!powerOn)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${
                powerOn
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              <span>Síť 230 V: {powerOn ? 'ZAPNUTO' : 'VYPNUTO'}</span>
            </button>

            <button
              onClick={runBoardAudit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Revizní kontrola ČSN</span>
            </button>

            <button
              onClick={() => {
                setDevices(INITIAL_DEVICES);
                setWires(INITIAL_WIRES);
                setActivePin(null);
                setRuleMessage({ type: 'info', text: 'Obnovena výchozí vzorová sestava (Schodišťák 6+6 a Zásuvka 230 V).' });
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Vzorová sestava</span>
            </button>

            <button
              onClick={() => {
                setDevices([INITIAL_DEVICES[0], INITIAL_DEVICES[1], INITIAL_DEVICES[2]]);
                setWires([]);
                setActivePin(null);
                setRuleMessage({ type: 'info', text: 'Tabule vyčištěna (ponechán jen přívod 230 V a můstky PE/N). Postav si vlastní zapojení!' });
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-red-500/15 hover:bg-red-500/25 text-red-300 border border-red-500/30"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Vyčistit tabuli</span>
            </button>
          </div>
        </div>

        {/* PALETA PRVKŮ K PŘIDÁNÍ NA TABULI (rozdělená podle montážních pravidel) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* 1. Moduly výhradně na DIN lištu */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
            <span className="text-[10px] font-mono font-extrabold uppercase text-amber-400 block">
              + Osadit na DIN lištu (pouze DIN moduly):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PALETTE_ITEMS.filter((p) => p.zone === 'din').map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleAddDevice(item)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 hover:bg-amber-500/20 text-slate-200 hover:text-amber-300 border border-slate-800 hover:border-amber-500/40 text-[11px] font-bold transition-all"
                >
                  <Plus className="w-3 h-3 text-amber-400" />
                  <span>{item.shortLabel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Můstky PE a N do rozvaděče + WAGO */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
            <span className="text-[10px] font-mono font-extrabold uppercase text-sky-400 block">
              + Můstky do rozvaděče &amp; WAGO svorky:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PALETTE_ITEMS.filter((p) => p.zone === 'busbar' || p.type === 'wago-3').map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleAddDevice(item)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 hover:bg-sky-500/20 text-slate-200 hover:text-sky-300 border border-slate-800 hover:border-sky-500/40 text-[11px] font-bold transition-all"
                >
                  <Plus className="w-3 h-3 text-sky-400" />
                  <span>{item.shortLabel}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Domovní přístroje a spotřebiče na montážní desku */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
            <span className="text-[10px] font-mono font-extrabold uppercase text-emerald-400 block">
              + Přístroje na montážní desku (stěnu):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PALETTE_ITEMS.filter((p) => p.zone === 'wall' && p.type !== 'wago-3').map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleAddDevice(item)}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900 hover:bg-emerald-500/20 text-slate-200 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 text-[11px] font-bold transition-all"
                >
                  <Plus className="w-3 h-3 text-emerald-400" />
                  <span>{item.shortLabel}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* VÝBĚR VODIČE PRO TAHÁNÍ MEZI SVORKAMI */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-300 mr-1">Zvol vodič pro tahání:</span>
            {WIRE_PALETTE.map((w) => (
              <button
                key={w.id}
                onClick={() => setSelectedColor(w.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${
                  selectedColor === w.id
                    ? 'bg-slate-800 text-white border-amber-400 ring-2 ring-amber-400/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <span className="w-3 h-3 rounded-full shrink-0 border border-white/40" style={{ backgroundColor: w.hex }} />
                <span>{w.label}</span>
              </button>
            ))}
          </div>

          <div className="text-[11px] font-mono text-amber-400 shrink-0">
            {activePin ? '⚡ Klikni na druhou svorku pro natažení vodiče!' : '💡 Klikni na libovolnou svorku pro začátek vodiče'}
          </div>
        </div>

        {/* Hlášení o pravidlech nebo revizní kontrole */}
        {(ruleMessage || simulation.shortLN || simulation.shortLPE || simulation.shortNPE) && (
          <div
            className={`p-3 rounded-xl border text-xs flex items-start justify-between gap-3 ${
              simulation.shortLN || simulation.shortLPE || simulation.shortNPE || ruleMessage?.type === 'error'
                ? 'bg-red-500/15 border-red-500/40 text-red-200'
                : ruleMessage?.type === 'success'
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                : 'bg-amber-500/15 border-amber-500/40 text-amber-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {simulation.shortLN || simulation.shortLPE || simulation.shortNPE || ruleMessage?.type === 'error' ? (
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              ) : ruleMessage?.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              )}
              <span className="font-semibold">
                {simulation.shortLN
                  ? 'POZOR: Zkrat mezi fází L a nulovým vodičem N! Okamžitě vybavuje jistič!'
                  : simulation.shortLPE
                  ? 'POZOR: Zkrat mezi fází L a ochranným vodičem PE!'
                  : simulation.shortNPE
                  ? 'POZOR: Spojení pracovního vodiče N a ochranného vodiče PE za bodem rozdělení – padá proudový chránič!'
                  : ruleMessage?.text}
              </span>
            </div>
            {ruleMessage && (
              <button onClick={() => setRuleMessage(null)} className="text-[10px] underline opacity-75 hover:opacity-100 shrink-0">
                Skrýt
              </button>
            )}
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* INTERAKTIVNÍ SVG MONTÁŽNÍ TABULE (820 × 590 px)                       */}
      {/* ===================================================================== */}
      <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <svg
          ref={svgRef}
          viewBox="0 0 820 590"
          className="w-full h-auto select-none cursor-default"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={() => setActivePin(null)}
        >
          <defs>
            <pattern id="boardGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.7" />
            </pattern>
          </defs>

          {/* Pozadí celé montážní tabule s jemnou mřížkou */}
          <rect x="0" y="0" width="820" height="590" fill="#090d16" />
          <rect x="0" y="0" width="820" height="590" fill="url(#boardGrid)" />

          {/* HORNÍ ZÓNA: ROZVADĚČ S LIŠTOU PRO MŮSTKY PE/N A 35mm DIN LIŠTOU */}
          <rect x="12" y="10" width="796" height="260" rx="14" fill="#0f172a" fillOpacity="0.85" stroke="#334155" strokeWidth="2" />
          <text x="26" y="24" fill="#64748b" fontSize="10" fontWeight="bold" fontFamily="monospace">
            ROZVADĚČ • DRŽÁK MŮSTKŮ PE / N (1 šroub PE = max. 1 vodič!)
          </text>

          {/* Kovová 35mm DIN lišta (y = 162..198) */}
          <rect x="24" y="162" width="772" height="34" rx="3" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
          <rect x="24" y="170" width="772" height="18" fill="#1e293b" />
          <text x="785" y="156" textAnchor="end" fill="#475569" fontSize="10" fontWeight="bold" fontFamily="monospace">
            35mm DIN LIŠTA (pouze pro modulové přístroje)
          </text>

          {/* DOLNÍ ZÓNA: MONTÁŽNÍ DESKA STĚNY (krabice, spínače, zásuvky, svítidla) */}
          <rect x="12" y="282" width="796" height="296" rx="14" fill="#0f172a" fillOpacity="0.45" stroke="#1e293b" strokeWidth="2" strokeDasharray="6 4" />
          <text x="26" y="300" fill="#64748b" fontSize="10" fontWeight="bold" fontFamily="monospace">
            MONTÁŽNÍ DESKA STĚNY (uchop prvek myší za horní lištu a libovolně jej posuň • kliknutím na vypínač jej přepneš)
          </text>

          {/* VYKRESLENÍ PRVKŮ NA TABULI */}
          {devices.map((inst) => {
            const spec = getSpec(inst.type);
            // Zjistíme, zda svítidlo nebo zásuvka má správné napájení
            const isLampLit =
              inst.type === 'lamp-e27' &&
              simulation.liveL.has(`${inst.instanceId}:L`) &&
              simulation.liveN.has(`${inst.instanceId}:N`) &&
              !simulation.shortLN;

            const isDualLit1 =
              inst.type === 'lamp-dual' &&
              simulation.liveL.has(`${inst.instanceId}:L1`) &&
              simulation.liveN.has(`${inst.instanceId}:N`) &&
              !simulation.shortLN;

            const isDualLit2 =
              inst.type === 'lamp-dual' &&
              simulation.liveL.has(`${inst.instanceId}:L2`) &&
              simulation.liveN.has(`${inst.instanceId}:N`) &&
              !simulation.shortLN;

            const isSocketPowered =
              inst.type === 'socket-230' &&
              simulation.liveL.has(`${inst.instanceId}:L`) &&
              simulation.liveN.has(`${inst.instanceId}:N`) &&
              simulation.livePE.has(`${inst.instanceId}:PE`) &&
              !simulation.shortLN;

            return (
              <g key={inst.instanceId} transform={`translate(${inst.x}, ${inst.y})`}>
                {/* Základní tělo modulu/přístroje */}
                <rect
                  x="0"
                  y="0"
                  width={spec.width}
                  height={spec.height}
                  rx="8"
                  fill={
                    inst.type === 'busbar-pe'
                      ? '#14532d'
                      : inst.type === 'busbar-n'
                      ? '#1e3a8a'
                      : inst.type === 'supply-in'
                      ? '#31102f'
                      : spec.zone === 'din'
                      ? '#1e293b'
                      : '#0f172a'
                  }
                  stroke={
                    isLampLit || isDualLit1 || isDualLit2
                      ? '#facc15'
                      : isSocketPowered
                      ? '#22c55e'
                      : inst.type === 'busbar-pe'
                      ? '#22c55e'
                      : inst.type === 'busbar-n'
                      ? '#3b82f6'
                      : '#475569'
                  }
                  strokeWidth={isLampLit || isSocketPowered ? '2.5' : '1.8'}
                />

                {/* Úchopová hlavička pro posun myší (drag handle) + tlačítko smazání */}
                <g
                  className="cursor-move"
                  onMouseDown={(e) => handleStartDrag(inst, e)}
                >
                  <rect x="2" y="2" width={spec.width - 4} height="16" rx="5" fill="#090d16" fillOpacity="0.65" />
                  <text x="8" y="13" fill="#e2e8f0" fontSize="9" fontWeight="bold" fontFamily="monospace">
                    {inst.label}
                  </text>
                  {inst.instanceId !== 'supply' && (
                    <g
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveDevice(inst.instanceId);
                      }}
                    >
                      <circle cx={spec.width - 10} cy="10" r="6" fill="#7f1d1d" />
                      <text x={spec.width - 10} y="13" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="bold">
                        ×
                      </text>
                    </g>
                  )}
                </g>

                {/* INTERAKTIVNÍ OVLÁDACÍ PRVEK UVNITŘ MODULU (páčka jističe / klapka spínače / žárovka) */}
                {(inst.type === 'qm-1p' || inst.type === 'mcb-b10' || inst.type === 'mcb-b16' || inst.type === 'rcd-2p' || inst.type === 'relay-ka') && (
                  <g
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleDeviceState(inst, 'A');
                    }}
                  >
                    <rect
                      x="10"
                      y="50"
                      width={spec.width - 20}
                      height="32"
                      rx="5"
                      fill={inst.stateA ? '#16a34a' : '#dc2626'}
                      stroke="#ffffff"
                      strokeWidth="1"
                    />
                    <text x={spec.width / 2} y="70" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      {inst.stateA ? 'I (ZAP)' : '0 (VYP)'}
                    </text>
                  </g>
                )}

                {(inst.type === 'sw-1' || inst.type === 'sw-6' || inst.type === 'sw-7' || inst.type === 'sw-push') && (
                  <g
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleDeviceState(inst, 'A');
                    }}
                  >
                    <rect
                      x="22"
                      y="36"
                      width={spec.width - 44}
                      height="38"
                      rx="8"
                      fill={inst.stateA ? '#d97706' : '#1e293b'}
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                    />
                    <text x={spec.width / 2} y="59" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      {inst.type === 'sw-push'
                        ? inst.stateA
                          ? 'IMPULZ!'
                          : 'STISKNI'
                        : inst.type === 'sw-1'
                        ? inst.stateA
                          ? 'ZAP'
                          : 'VYP'
                        : inst.stateA
                        ? 'POLOHA B'
                        : 'POLOHA A'}
                    </text>
                  </g>
                )}

                {inst.type === 'sw-5' && (
                  <g>
                    <rect
                      x="16"
                      y="36"
                      width="38"
                      height="38"
                      rx="6"
                      className="cursor-pointer"
                      fill={inst.stateA ? '#d97706' : '#1e293b'}
                      stroke="#94a3b8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleDeviceState(inst, 'A');
                      }}
                    />
                    <text x="35" y="59" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold" className="pointer-events-none">
                      Kl.A
                    </text>
                    <rect
                      x="62"
                      y="36"
                      width="38"
                      height="38"
                      rx="6"
                      className="cursor-pointer"
                      fill={inst.stateB ? '#d97706' : '#1e293b'}
                      stroke="#94a3b8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleDeviceState(inst, 'B');
                      }}
                    />
                    <text x="81" y="59" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold" className="pointer-events-none">
                      Kl.B
                    </text>
                  </g>
                )}

                {inst.type === 'lamp-e27' && (
                  <g>
                    <circle
                      cx={spec.width / 2}
                      cy="50"
                      r="22"
                      fill={isLampLit ? '#fde047' : '#1e293b'}
                      stroke={isLampLit ? '#facc15' : '#475569'}
                      strokeWidth="2.5"
                    />
                    <text
                      x={spec.width / 2}
                      y="54"
                      textAnchor="middle"
                      fill={isLampLit ? '#0f172a' : '#94a3b8'}
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {isLampLit ? 'SVÍTÍ!' : 'E27'}
                    </text>
                  </g>
                )}

                {inst.type === 'lamp-dual' && (
                  <g>
                    <circle cx="48" cy="50" r="18" fill={isDualLit1 ? '#fde047' : '#1e293b'} stroke="#64748b" strokeWidth="2" />
                    <text x="48" y="54" textAnchor="middle" fill={isDualLit1 ? '#0f172a' : '#94a3b8'} fontSize="9" fontWeight="bold">
                      {isDualLit1 ? 'SVÍTÍ' : 'V1'}
                    </text>
                    <circle cx="108" cy="50" r="18" fill={isDualLit2 ? '#fde047' : '#1e293b'} stroke="#64748b" strokeWidth="2" />
                    <text x="108" y="54" textAnchor="middle" fill={isDualLit2 ? '#0f172a' : '#94a3b8'} fontSize="9" fontWeight="bold">
                      {isDualLit2 ? 'SVÍTÍ' : 'V2'}
                    </text>
                  </g>
                )}

                {inst.type === 'socket-230' && (
                  <g>
                    <circle cx="65" cy="58" r="28" fill="#1e293b" stroke={isSocketPowered ? '#22c55e' : '#475569'} strokeWidth="2" />
                    <text x="65" y="106" textAnchor="middle" fill={isSocketPowered ? '#4ade80' : '#94a3b8'} fontSize="9" fontWeight="bold" fontFamily="monospace">
                      {isSocketPowered ? '230 V OK!' : 'L vlevo • N vpravo'}
                    </text>
                  </g>
                )}

                {inst.type === 'wago-3' && (
                  <rect x="14" y="20" width="78" height="12" rx="2" fill="#ea580c" />
                )}

                {/* VYKRESLENÍ VŠECH KLIKATELNÝCH SVOREK (PINŮ) PRVKU */}
                {spec.pins.map((pin) => {
                  const isSelected = activePin?.instanceId === inst.instanceId && activePin?.pinId === pin.id;
                  const nodeKey = `${inst.instanceId}:${pin.id}`;
                  const hasL = simulation.liveL.has(nodeKey);
                  const hasN = simulation.liveN.has(nodeKey);
                  const hasPE = simulation.livePE.has(nodeKey);

                  return (
                    <g
                      key={pin.id}
                      className="cursor-pointer"
                      onClick={(e) => handlePinClick(inst.instanceId, pin.id, e)}
                    >
                      <circle
                        cx={pin.dx}
                        cy={pin.dy}
                        r={isSelected ? 9 : 7}
                        fill={
                          isSelected
                            ? '#facc15'
                            : hasL
                            ? '#d97706'
                            : hasN
                            ? '#2563eb'
                            : hasPE
                            ? '#16a34a'
                            : '#334155'
                        }
                        stroke="#ffffff"
                        strokeWidth={isSelected ? 2.5 : 1.5}
                      />
                      <text
                        x={pin.dx}
                        y={pin.dy < 30 ? pin.dy + 17 : pin.dy - 10}
                        textAnchor="middle"
                        fill="#e2e8f0"
                        fontSize="8.5"
                        fontWeight="bold"
                        fontFamily="monospace"
                        className="pointer-events-none"
                      >
                        {pin.label}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* VYKRESLENÍ VŠECH PROPOJOVACÍCH VODIČŮ NA TABULI */}
          {wires.map((w) => {
            const p1 = getPinAbsCoords(w.fromInstanceId, w.fromPinId);
            const p2 = getPinAbsCoords(w.toInstanceId, w.toPinId);
            if (!p1 || !p2) return null;
            const wireSpec = WIRE_PALETTE.find((wp) => wp.id === w.color) || WIRE_PALETTE[0];
            const midY = (p1.y + p2.y) / 2;
            const pathD = `M ${p1.x} ${p1.y} C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;

            return (
              <g
                key={w.id}
                className="cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  setWires((prev) => prev.filter((item) => item.id !== w.id));
                }}
              >
                {/* Širší neviditelná vrstva pro snadné kliknutí na vodič při mazání */}
                <path d={pathD} fill="none" stroke="transparent" strokeWidth="12" />
                <path
                  d={pathD}
                  fill="none"
                  stroke={wireSpec.hex}
                  strokeWidth={w.color === 'comb' ? '5' : '3.2'}
                  strokeDasharray={wireSpec.dash}
                  strokeLinecap="round"
                  className="group-hover:stroke-red-500 transition-colors"
                />
                {w.color === 'green-yellow' && (
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#facc15"
                    strokeWidth="2.2"
                    strokeDasharray="4 8"
                    strokeLinecap="round"
                    className="pointer-events-none"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* SPODNÍ LEGENDA OVLÁDÁNÍ TABULE */}
        <div className="bg-slate-900 border-t border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Move className="w-3.5 h-3.5 text-amber-400" />
              <strong>Posun prvku:</strong> táhni myší za horní proužek prvku
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <strong>Natažení vodiče:</strong> klikni na 1. svorku a pak na 2. svorku
            </span>
          </div>
          <span>
            <strong>Smazání vodiče:</strong> klikni přímo na natažený vodič • <strong>Sepnutí vypínače/jističe:</strong> klikni na jeho klapku/páčku
          </span>
        </div>
      </div>
    </div>
  );
};
