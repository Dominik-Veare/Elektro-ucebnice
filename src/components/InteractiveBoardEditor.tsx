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
  exitDir: 'up' | 'down' | 'left' | 'right'; // Směr kolmého vývodu ze svorky mimo tělo modulu
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
    width: 70,
    height: 120,
    pins: [
      { id: '1', label: '1', dx: 35, dy: 12, exitDir: 'up', roleHint: 'L' },
      { id: '2', label: '2', dx: 35, dy: 108, exitDir: 'down', roleHint: 'L' }
    ]
  },
  {
    type: 'mcb-b10',
    name: 'Jistič B10 (světla)',
    shortLabel: 'FA B10',
    zone: 'din',
    width: 70,
    height: 120,
    pins: [
      { id: '1', label: '1', dx: 35, dy: 12, exitDir: 'up', roleHint: 'L' },
      { id: '2', label: '2', dx: 35, dy: 108, exitDir: 'down', roleHint: 'L' }
    ]
  },
  {
    type: 'mcb-b16',
    name: 'Jistič B16 (zásuvky)',
    shortLabel: 'FA B16',
    zone: 'din',
    width: 70,
    height: 120,
    pins: [
      { id: '1', label: '1', dx: 35, dy: 12, exitDir: 'up', roleHint: 'L' },
      { id: '2', label: '2', dx: 35, dy: 108, exitDir: 'down', roleHint: 'L' }
    ]
  },
  {
    type: 'rcd-2p',
    name: 'Proudový chránič RCD 30 mA',
    shortLabel: 'RCD 30mA',
    zone: 'din',
    width: 100,
    height: 120,
    pins: [
      { id: '1', label: '1(L)', dx: 30, dy: 12, exitDir: 'up', roleHint: 'L' },
      { id: 'N-in', label: 'N(in)', dx: 70, dy: 12, exitDir: 'up', roleHint: 'N' },
      { id: '2', label: '2(L)', dx: 30, dy: 108, exitDir: 'down', roleHint: 'L' },
      { id: 'N-out', label: 'N(out)', dx: 70, dy: 108, exitDir: 'down', roleHint: 'N' }
    ]
  },
  {
    type: 'relay-ka',
    name: 'Impulzní relé KA (paměťové)',
    shortLabel: 'Relé KA',
    zone: 'din',
    width: 100,
    height: 120,
    pins: [
      { id: 'A1', label: 'A1', dx: 30, dy: 12, exitDir: 'up', roleHint: 'K' },
      { id: '1', label: '1(L)', dx: 70, dy: 12, exitDir: 'up', roleHint: 'L' },
      { id: 'A2', label: 'A2(N)', dx: 30, dy: 108, exitDir: 'down', roleHint: 'N' },
      { id: '2', label: '2(Sv)', dx: 70, dy: 108, exitDir: 'down', roleHint: 'K' }
    ]
  },
  {
    type: 'spd-t2',
    name: 'Svodič přepětí SPD T2',
    shortLabel: 'SPD T2',
    zone: 'din',
    width: 90,
    height: 120,
    pins: [
      { id: 'L', label: 'L', dx: 25, dy: 12, exitDir: 'up', roleHint: 'L' },
      { id: 'N', label: 'N', dx: 65, dy: 12, exitDir: 'up', roleHint: 'N' },
      { id: 'PE', label: 'PE⏚', dx: 45, dy: 108, exitDir: 'down', roleHint: 'PE' }
    ]
  },

  // --- MŮSTKY A SBĚRNICE V ROZVADĚČI (zone: 'busbar') ---
  {
    type: 'busbar-pe',
    name: 'Ochranný můstek PE (5 šroubů)',
    shortLabel: 'Můstek PE (⏚)',
    zone: 'busbar',
    width: 170,
    height: 50,
    pins: [
      { id: 'PE1', label: 'PE1', dx: 25, dy: 38, exitDir: 'down', roleHint: 'PE' },
      { id: 'PE2', label: 'PE2', dx: 55, dy: 38, exitDir: 'down', roleHint: 'PE' },
      { id: 'PE3', label: 'PE3', dx: 85, dy: 38, exitDir: 'down', roleHint: 'PE' },
      { id: 'PE4', label: 'PE4', dx: 115, dy: 38, exitDir: 'down', roleHint: 'PE' },
      { id: 'PE5', label: 'PE5', dx: 145, dy: 38, exitDir: 'down', roleHint: 'PE' }
    ]
  },
  {
    type: 'busbar-n',
    name: 'Nulový můstek N (izolovaný, 5 šroubů)',
    shortLabel: 'Můstek N',
    zone: 'busbar',
    width: 170,
    height: 50,
    pins: [
      { id: 'N1', label: 'N1', dx: 25, dy: 38, exitDir: 'down', roleHint: 'N' },
      { id: 'N2', label: 'N2', dx: 55, dy: 38, exitDir: 'down', roleHint: 'N' },
      { id: 'N3', label: 'N3', dx: 85, dy: 38, exitDir: 'down', roleHint: 'N' },
      { id: 'N4', label: 'N4', dx: 115, dy: 38, exitDir: 'down', roleHint: 'N' },
      { id: 'N5', label: 'N5', dx: 145, dy: 38, exitDir: 'down', roleHint: 'N' }
    ]
  },

  // --- PRVKY NA MONTÁŽNÍ TABULI / STĚNU (zone: 'wall') ---
  {
    type: 'wago-3',
    name: 'WAGO 221 svorka (3pólová propojovací)',
    shortLabel: 'WAGO 3P',
    zone: 'wall',
    width: 100,
    height: 50,
    pins: [
      { id: 'W1', label: '1', dx: 20, dy: 38, exitDir: 'down' },
      { id: 'W2', label: '2', dx: 50, dy: 38, exitDir: 'down' },
      { id: 'W3', label: '3', dx: 80, dy: 38, exitDir: 'down' }
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
      { id: 'L', label: 'L(in)', dx: 55, dy: 14, exitDir: 'up', roleHint: 'L' },
      { id: '1', label: '1(out)', dx: 55, dy: 96, exitDir: 'down', roleHint: 'K' }
    ]
  },
  {
    type: 'sw-5',
    name: 'Přepínač řazení č. 5 (lustrový 2 klapky)',
    shortLabel: 'Spínač č. 5',
    zone: 'wall',
    width: 110,
    height: 110,
    pins: [
      { id: 'L', label: 'L(in)', dx: 55, dy: 14, exitDir: 'up', roleHint: 'L' },
      { id: '1', label: '1(A)', dx: 30, dy: 96, exitDir: 'down', roleHint: 'K' },
      { id: '2', label: '2(B)', dx: 80, dy: 96, exitDir: 'down', roleHint: 'K' }
    ]
  },
  {
    type: 'sw-6',
    name: 'Přepínač řazení č. 6 (schodišťový)',
    shortLabel: 'Přepínač č. 6',
    zone: 'wall',
    width: 110,
    height: 110,
    pins: [
      { id: 'L', label: 'L(km)', dx: 55, dy: 14, exitDir: 'up', roleHint: 'L' },
      { id: '1', label: 'K1', dx: 30, dy: 96, exitDir: 'down', roleHint: 'K' },
      { id: '2', label: 'K2', dx: 80, dy: 96, exitDir: 'down', roleHint: 'K' }
    ]
  },
  {
    type: 'sw-7',
    name: 'Přepínač řazení č. 7 (křížový)',
    shortLabel: 'Křížák č. 7',
    zone: 'wall',
    width: 110,
    height: 110,
    pins: [
      { id: '1', label: '1(in↑)', dx: 30, dy: 14, exitDir: 'up', roleHint: 'K' },
      { id: '2', label: '2(in↑)', dx: 80, dy: 14, exitDir: 'up', roleHint: 'K' },
      { id: '3', label: '3(out↓)', dx: 30, dy: 96, exitDir: 'down', roleHint: 'K' },
      { id: '4', label: '4(out↓)', dx: 80, dy: 96, exitDir: 'down', roleHint: 'K' }
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
      { id: 'L', label: 'L(in)', dx: 55, dy: 14, exitDir: 'up', roleHint: 'L' },
      { id: '1', label: '1(imp)', dx: 55, dy: 96, exitDir: 'down', roleHint: 'K' }
    ]
  },
  {
    type: 'socket-230',
    name: 'Zásuvka 230 V (L vlevo, PE nahoře, N vpravo)',
    shortLabel: 'Zásuvka 230V',
    zone: 'wall',
    width: 130,
    height: 110,
    pins: [
      { id: 'L', label: 'L(vlevo)', dx: 30, dy: 14, exitDir: 'up', roleHint: 'L' },
      { id: 'PE', label: 'PE(kolík)', dx: 65, dy: 14, exitDir: 'up', roleHint: 'PE' },
      { id: 'N', label: 'N(vpravo)', dx: 100, dy: 14, exitDir: 'up', roleHint: 'N' }
    ]
  },
  {
    type: 'lamp-e27',
    name: 'Svítidlo E27 (třída I – střed L, závit N, kostra PE)',
    shortLabel: 'Svítidlo E27',
    zone: 'wall',
    width: 130,
    height: 110,
    pins: [
      { id: 'L', label: 'L(střed)', dx: 30, dy: 14, exitDir: 'up', roleHint: 'K' },
      { id: 'N', label: 'N(závit)', dx: 65, dy: 14, exitDir: 'up', roleHint: 'N' },
      { id: 'PE', label: 'PE(kostra)', dx: 100, dy: 14, exitDir: 'up', roleHint: 'PE' }
    ]
  },
  {
    type: 'lamp-dual',
    name: 'Dvojitý lustr (L1, L2, N, PE)',
    shortLabel: 'Lustr (2 větvě)',
    zone: 'wall',
    width: 150,
    height: 110,
    pins: [
      { id: 'L1', label: 'L1', dx: 25, dy: 14, exitDir: 'up', roleHint: 'K' },
      { id: 'L2', label: 'L2', dx: 60, dy: 14, exitDir: 'up', roleHint: 'K' },
      { id: 'N', label: 'N', dx: 95, dy: 14, exitDir: 'up', roleHint: 'N' },
      { id: 'PE', label: 'PE⏚', dx: 125, dy: 14, exitDir: 'up', roleHint: 'PE' }
    ]
  },
  {
    type: 'pipe-bernard',
    name: 'Kovové potrubí + svorka Bernard (pospojování)',
    shortLabel: 'Potrubí (Bernard)',
    zone: 'wall',
    width: 130,
    height: 70,
    pins: [
      { id: 'PE', label: 'PE(⏚)', dx: 65, dy: 14, exitDir: 'up', roleHint: 'PE' }
    ]
  }
];

export interface PlacedDevice {
  instanceId: string;
  type: BoardDeviceType;
  label: string;
  x: number;
  y: number;
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

const SUPPLY_DEVICE: PaletteItem = {
  type: 'supply-in',
  name: 'Přívod ze sítě 230 V (L, N, PE)',
  shortLabel: 'SÍŤ 230V',
  zone: 'busbar',
  width: 130,
  height: 50,
  pins: [
    { id: 'L', label: 'L(230V)', dx: 25, dy: 38, exitDir: 'down', roleHint: 'L' },
    { id: 'N', label: 'N', dx: 65, dy: 38, exitDir: 'down', roleHint: 'N' },
    { id: 'PE', label: 'PE(⏚)', dx: 105, dy: 38, exitDir: 'down', roleHint: 'PE' }
  ]
};

// Výchozí nepřekrývající se sestava s dostatečnými instalačními kanály pro ortogonální vodiče
const INITIAL_DEVICES: PlacedDevice[] = [
  // Horní lišta můstků (y = 20)
  { instanceId: 'supply', type: 'supply-in', label: 'Přívod 230V', x: 30, y: 20, stateA: true, stateB: false },
  { instanceId: 'pe-bar', type: 'busbar-pe', label: 'Můstek PE', x: 240, y: 20, stateA: true, stateB: false },
  { instanceId: 'n-bar', type: 'busbar-n', label: 'Můstek N (za RCD)', x: 470, y: 20, stateA: true, stateB: false },
  // DIN lišta (y = 120)
  { instanceId: 'rcd1', type: 'rcd-2p', label: 'FI1 (RCD 30mA)', x: 60, y: 120, stateA: true, stateB: false },
  { instanceId: 'b10', type: 'mcb-b10', label: 'FA1 (B10 Světla)', x: 200, y: 120, stateA: true, stateB: false },
  { instanceId: 'b16', type: 'mcb-b16', label: 'FA2 (B16 Zásuvky)', x: 310, y: 120, stateA: true, stateB: false },
  // Montážní deska stěny (y = 350)
  { instanceId: 'sw6a', type: 'sw-6', label: 'Přepínač 6A (dole)', x: 50, y: 350, stateA: false, stateB: false },
  { instanceId: 'sw6b', type: 'sw-6', label: 'Přepínač 6B (nahoře)', x: 220, y: 350, stateA: false, stateB: false },
  { instanceId: 'lamp1', type: 'lamp-e27', label: 'Svítidlo E27', x: 400, y: 350, stateA: false, stateB: false },
  { instanceId: 'sock1', type: 'socket-230', label: 'Zásuvka 230 V', x: 600, y: 350, stateA: false, stateB: false }
];

const INITIAL_WIRES: BoardWire[] = [
  { id: 'w1', fromInstanceId: 'supply', fromPinId: 'PE', toInstanceId: 'pe-bar', toPinId: 'PE1', color: 'green-yellow' },
  { id: 'w2', fromInstanceId: 'supply', fromPinId: 'L', toInstanceId: 'rcd1', toPinId: '1', color: 'brown' },
  { id: 'w3', fromInstanceId: 'supply', fromPinId: 'N', toInstanceId: 'rcd1', toPinId: 'N-in', color: 'blue' },
  { id: 'w4', fromInstanceId: 'rcd1', fromPinId: 'N-out', toInstanceId: 'n-bar', toPinId: 'N1', color: 'blue' },
  { id: 'w5', fromInstanceId: 'rcd1', fromPinId: '2', toInstanceId: 'b10', toPinId: '1', color: 'comb' },
  { id: 'w6', fromInstanceId: 'b10', fromPinId: '1', toInstanceId: 'b16', toPinId: '1', color: 'comb' },
  { id: 'w7', fromInstanceId: 'b10', fromPinId: '2', toInstanceId: 'sw6a', toPinId: 'L', color: 'brown' },
  { id: 'w8', fromInstanceId: 'sw6a', fromPinId: '1', toInstanceId: 'sw6b', toPinId: '1', color: 'black' },
  { id: 'w9', fromInstanceId: 'sw6a', fromPinId: '2', toInstanceId: 'sw6b', toPinId: '2', color: 'grey' },
  { id: 'w10', fromInstanceId: 'sw6b', fromPinId: 'L', toInstanceId: 'lamp1', toPinId: 'L', color: 'brown' },
  { id: 'w11', fromInstanceId: 'n-bar', fromPinId: 'N2', toInstanceId: 'lamp1', toPinId: 'N', color: 'blue' },
  { id: 'w12', fromInstanceId: 'pe-bar', fromPinId: 'PE2', toInstanceId: 'lamp1', toPinId: 'PE', color: 'green-yellow' },
  { id: 'w13', fromInstanceId: 'b16', fromPinId: '2', toInstanceId: 'sock1', toPinId: 'L', color: 'brown' },
  { id: 'w14', fromInstanceId: 'n-bar', fromPinId: 'N3', toInstanceId: 'sock1', toPinId: 'N', color: 'blue' },
  { id: 'w15', fromInstanceId: 'pe-bar', fromPinId: 'PE3', toInstanceId: 'sock1', toPinId: 'PE', color: 'green-yellow' }
];

// ============================================================================
// ORTOGONÁLNÍ ROUTER VODIČŮ (A* na mřížce 10×10 px s vyhýbáním se modulům!)
// ============================================================================
const GRID_STEP = 10;
const BOARD_W = 820;
const BOARD_H = 590;
const COLS = Math.floor(BOARD_W / GRID_STEP); // 82
const ROWS = Math.floor(BOARD_H / GRID_STEP); // 59

function getSpecStatic(type: BoardDeviceType): PaletteItem {
  if (type === 'supply-in') return SUPPLY_DEVICE;
  return PALETTE_ITEMS.find((p) => p.type === type) || PALETTE_ITEMS[0];
}

/**
 * Kontrola překryvu (kolize) dvou obdélníků s povinným odstupem (gap) pro instalační kanál vodičů.
 */
function boxesOverlap(
  x1: number,
  y1: number,
  w1: number,
  h1: number,
  x2: number,
  y2: number,
  w2: number,
  h2: number,
  gap: number = 20
): boolean {
  return !(
    x1 + w1 + gap <= x2 ||
    x2 + w2 + gap <= x1 ||
    y1 + h1 + gap <= y2 ||
    y2 + h2 + gap <= y1
  );
}

/**
 * Vypočítá ortogonální (vodorovnou a svislou) trasu vodiče mezi dvěma svorkami,
 * která NIKDY neprochází skrz žádný umístěný modul a vyhýbá se obsazeným trasám.
 */
function computeOrthogonalWirePaths(
  devices: PlacedDevice[],
  wires: BoardWire[]
): Record<string, string> {
  // 1. Vytvoříme mapu překážek (všechny moduly na tabuli jsou neprůchodné)
  const blocked = new Uint8Array(COLS * ROWS);
  for (const dev of devices) {
    const spec = getSpecStatic(dev.type);
    const cMin = Math.max(0, Math.floor(dev.x / GRID_STEP));
    const cMax = Math.min(COLS - 1, Math.ceil((dev.x + spec.width) / GRID_STEP));
    const rMin = Math.max(0, Math.floor(dev.y / GRID_STEP));
    const rMax = Math.min(ROWS - 1, Math.ceil((dev.y + spec.height) / GRID_STEP));
    for (let r = rMin; r <= rMax; r++) {
      for (let c = cMin; c <= cMax; c++) {
        blocked[r * COLS + c] = 1;
      }
    }
  }

  // Mapa obsazenosti kanálů předchozími vodiči, aby šly souběžné vodiče úhledně vedle sebe
  const usedCells = new Uint16Array(COLS * ROWS);
  const resultPaths: Record<string, string> = {};

  const getPinInfo = (instId: string, pinId: string) => {
    const dev = devices.find((d) => d.instanceId === instId);
    if (!dev) return null;
    const spec = getSpecStatic(dev.type);
    const pin = spec.pins.find((p) => p.id === pinId);
    if (!pin) return null;

    const px = dev.x + pin.dx;
    const py = dev.y + pin.dy;

    // Kolmý vývod ze svorky ven z těla modulu na první volný bod mřížky
    let ex = px;
    let ey = py;
    if (pin.exitDir === 'up') {
      ey = dev.y - 10;
    } else if (pin.exitDir === 'down') {
      ey = dev.y + spec.height + 10;
    } else if (pin.exitDir === 'left') {
      ex = dev.x - 10;
    } else {
      ex = dev.x + spec.width + 10;
    }

    const gc = Math.max(1, Math.min(COLS - 2, Math.round(ex / GRID_STEP)));
    const gr = Math.max(1, Math.min(ROWS - 2, Math.round(ey / GRID_STEP)));

    return { px, py, ex: gc * GRID_STEP, ey: gr * GRID_STEP, gc, gr };
  };

  // Směry: 0 = nahoru, 1 = doprava, 2 = dolů, 3 = doleva
  const dCol = [0, 1, 0, -1];
  const dRow = [-1, 0, 1, 0];

  for (const w of wires) {
    const start = getPinInfo(w.fromInstanceId, w.fromPinId);
    const end = getPinInfo(w.toInstanceId, w.toPinId);
    if (!start || !end) continue;

    // Dočasně odblokujeme samotný výstupní a vstupní bod mřížky
    const startCell = start.gr * COLS + start.gc;
    const endCell = end.gr * COLS + end.gc;

    // Stav v A*: (row, col, dir) -> index = (row * COLS + col) * 4 + dir
    const totalStates = COLS * ROWS * 4;
    const gScore = new Int32Array(totalStates).fill(1e9);
    const parent = new Int32Array(totalStates).fill(-1);
    const closed = new Uint8Array(totalStates);

    // Jednoduchá prioritní fronta
    const openStates: number[] = [];
    const openF: number[] = [];

    const pushOpen = (stateIdx: number, fVal: number) => {
      openStates.push(stateIdx);
      openF.push(fVal);
    };

    const popBest = (): number => {
      let bestIdx = 0;
      for (let i = 1; i < openF.length; i++) {
        if (openF[i] < openF[bestIdx]) bestIdx = i;
      }
      const st = openStates[bestIdx];
      openStates[bestIdx] = openStates[openStates.length - 1];
      openF[bestIdx] = openF[openF.length - 1];
      openStates.pop();
      openF.pop();
      return st;
    };

    const hDist = (c: number, r: number) => (Math.abs(c - end.gc) + Math.abs(r - end.gr)) * 10;

    for (let dir = 0; dir < 4; dir++) {
      const st = startCell * 4 + dir;
      gScore[st] = 0;
      pushOpen(st, hDist(start.gc, start.gr));
    }

    let reachedState = -1;

    while (openStates.length > 0) {
      const curr = popBest();
      if (closed[curr]) continue;
      closed[curr] = 1;

      const cell = curr >> 2;
      const dir = curr & 3;
      if (cell === endCell) {
        reachedState = curr;
        break;
      }

      const r = Math.floor(cell / COLS);
      const c = cell % COLS;

      for (let ndir = 0; ndir < 4; ndir++) {
        // Zákaz okamžitého obratu o 180°
        if ((ndir ^ 2) === dir) continue;
        const nr = r + dRow[ndir];
        const nc = c + dCol[ndir];
        if (nr < 1 || nr >= ROWS - 1 || nc < 1 || nc >= COLS - 1) continue;

        const nCell = nr * COLS + nc;
        if (blocked[nCell] && nCell !== endCell && nCell !== startCell) continue;

        const turnPenalty = ndir === dir ? 0 : 28; // Penalizace za ohyb 90°, aby trasa měla minimum rohů
        const crowdingPenalty = usedCells[nCell] * 18; // Aby šly kabely vedle sebe
        const stepCost = 10 + turnPenalty + crowdingPenalty;

        const nState = nCell * 4 + ndir;
        const tentativeG = gScore[curr] + stepCost;
        if (tentativeG < gScore[nState]) {
          gScore[nState] = tentativeG;
          parent[nState] = curr;
          pushOpen(nState, tentativeG + hDist(nc, nr));
        }
      }
    }

    const pts: { x: number; y: number }[] = [];
    pts.push({ x: start.px, y: start.py });
    pts.push({ x: start.ex, y: start.ey });

    if (reachedState !== -1) {
      const gridPath: { x: number; y: number }[] = [];
      let cur = reachedState;
      while (cur !== -1) {
        const cell = cur >> 2;
        usedCells[cell] += 1;
        const r = Math.floor(cell / COLS);
        const c = cell % COLS;
        gridPath.push({ x: c * GRID_STEP, y: r * GRID_STEP });
        cur = parent[cur];
      }
      gridPath.reverse();
      for (const gp of gridPath) {
        pts.push(gp);
      }
    } else {
      // Záložní ortogonální propojení přes volný středový kanál (y = 280), pokud by byla přímá cesta uzavřena
      pts.push({ x: start.ex, y: 280 });
      pts.push({ x: end.ex, y: 280 });
    }

    pts.push({ x: end.ex, y: end.ey });
    pts.push({ x: end.px, y: end.py });

    // Zjednodušení kolineárních bodů na čisté vodorovné a svislé úseky
    const simplified: { x: number; y: number }[] = [];
    for (const p of pts) {
      if (simplified.length > 0) {
        const last = simplified[simplified.length - 1];
        if (last.x === p.x && last.y === p.y) continue;
      }
      if (simplified.length >= 2) {
        const pPrev = simplified[simplified.length - 2];
        const pMid = simplified[simplified.length - 1];
        if ((pPrev.x === pMid.x && pMid.x === p.x) || (pPrev.y === pMid.y && pMid.y === p.y)) {
          simplified[simplified.length - 1] = p;
          continue;
        }
      }
      simplified.push(p);
    }

    const dStr = simplified.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`).join(' ');
    resultPaths[w.id] = dStr;
  }

  return resultPaths;
}

export const InteractiveBoardEditor: React.FC = () => {
  const [devices, setDevices] = useState<PlacedDevice[]>(INITIAL_DEVICES);
  const [wires, setWires] = useState<BoardWire[]>(INITIAL_WIRES);
  const [selectedColor, setSelectedColor] = useState<BoardWireColor>('brown');
  const [activePin, setActivePin] = useState<{ instanceId: string; pinId: string } | null>(null);
  const [powerOn, setPowerOn] = useState<boolean>(true);
  const [ruleMessage, setRuleMessage] = useState<{ type: 'error' | 'info' | 'success'; text: string } | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ dx: number; dy: number }>({ dx: 0, dy: 0 });

  const getSpec = (type: BoardDeviceType): PaletteItem => getSpecStatic(type);

  /**
   * Zkontroluje, zda pozice (candX, candY) pro prvek `ignoreId` o rozměrech (w, h)
   * nekoliduje s žádným jiným umístěným prvkem na tabuli (včetně instalační mezery 20 px).
   */
  const hasCollision = (
    candX: number,
    candY: number,
    w: number,
    h: number,
    ignoreId: string,
    list: PlacedDevice[] = devices
  ): boolean => {
    for (const other of list) {
      if (other.instanceId === ignoreId) continue;
      const oSpec = getSpec(other.type);
      if (boxesOverlap(candX, candY, w, h, other.x, other.y, oSpec.width, oSpec.height, 20)) {
        return true;
      }
    }
    return false;
  };

  // Přidání nového prvku na tabuli na první volné nepřekrývající se místo v dané zóně
  const handleAddDevice = (item: PaletteItem) => {
    const id = `${item.type}-${Date.now().toString().slice(-4)}`;

    if (item.zone === 'din') {
      const y = 120;
      for (let x = 40; x <= BOARD_W - item.width - 20; x += 10) {
        if (!hasCollision(x, y, item.width, item.height, id)) {
          setDevices((prev) => [
            ...prev,
            { instanceId: id, type: item.type, label: item.shortLabel, x, y, stateA: true, stateB: false }
          ]);
          setRuleMessage({
            type: 'info',
            text: `Modul „${item.name}“ byl nacvaknut na volné místo na 35mm DIN liště.`
          });
          return;
        }
      }
      setRuleMessage({
        type: 'error',
        text: 'DIN lišta v rozvaděči je plná (moduly se nesmí překrývat)! Posuň nebo odstraň některý modul.'
      });
      return;
    }

    if (item.zone === 'busbar') {
      const y = 20;
      for (let x = 30; x <= BOARD_W - item.width - 20; x += 10) {
        if (!hasCollision(x, y, item.width, item.height, id)) {
          setDevices((prev) => [
            ...prev,
            { instanceId: id, type: item.type, label: item.shortLabel, x, y, stateA: true, stateB: false }
          ]);
          setRuleMessage({
            type: 'info',
            text: `Můstek „${item.name}“ byl osazen na volné místo v držáku sběrnic.`
          });
          return;
        }
      }
      setRuleMessage({
        type: 'error',
        text: 'Držák sběrnic PE/N v horní části rozvaděče je již plný!'
      });
      return;
    }

    // Zóna stěny (y >= 310) – hledáme první volné místo v mřížce bez překryvu
    for (let y = 320; y <= BOARD_H - item.height - 20; y += 20) {
      for (let x = 40; x <= BOARD_W - item.width - 20; x += 20) {
        if (!hasCollision(x, y, item.width, item.height, id)) {
          setDevices((prev) => [
            ...prev,
            { instanceId: id, type: item.type, label: item.shortLabel, x, y, stateA: false, stateB: false }
          ]);
          setRuleMessage({
            type: 'info',
            text: `Prvek „${item.name}“ byl umístěn na volné místo montážní desky.`
          });
          return;
        }
      }
    }

    setRuleMessage({
      type: 'error',
      text: 'Montážní deska stěny je plná! Uvolni místo odstraněním nebo posunutím některého prvku.'
    });
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

  // Kliknutí na svorku (pin) – propojení vodičem s kontrolou pravidel
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

    if (selectedColor === 'comb' && (fromZone !== 'din' || toZone !== 'din')) {
      setRuleMessage({
        type: 'error',
        text: 'Pravidlo montáže: Fázovou hřebenovou lištou lze propojovat výhradně modulové přístroje na DIN liště!'
      });
      setActivePin(null);
      return;
    }

    const checkPeScrewLimit = (dev: PlacedDevice, pId: string) => {
      if (dev.type === 'busbar-pe') {
        const count = wires.filter(
          (w) =>
            (w.fromInstanceId === dev.instanceId && w.fromPinId === pId) ||
            (w.toInstanceId === dev.instanceId && w.toPinId === pId)
        ).length;
        if (count >= 1) return true;
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

  const handleToggleDeviceState = (inst: PlacedDevice, which: 'A' | 'B' = 'A') => {
    if (inst.type === 'sw-push') {
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

  // Drag & Drop posouvání prvků s přísným zákazem překrývání modulů!
  const getSvgCoords = (e: React.MouseEvent) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = BOARD_W / rect.width;
    const scaleY = BOARD_H / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handleStartDrag = (inst: PlacedDevice, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!svgRef.current) return;
    const { x, y } = getSvgCoords(e);
    setDraggingId(inst.instanceId);
    setDragOffset({ dx: x - inst.x, dy: y - inst.y });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggingId) return;
    const { x, y } = getSvgCoords(e);
    setDevices((prev) =>
      prev.map((d) => {
        if (d.instanceId !== draggingId) return d;
        const spec = getSpec(d.type);
        const candX = Math.max(20, Math.min(BOARD_W - spec.width - 20, Math.round((x - dragOffset.dx) / 10) * 10));

        if (spec.zone === 'din') {
          const fixedY = 120;
          if (!hasCollision(candX, fixedY, spec.width, spec.height, d.instanceId, prev)) {
            return { ...d, x: candX, y: fixedY };
          }
          return d;
        }

        if (spec.zone === 'busbar') {
          const fixedY = 20;
          if (!hasCollision(candX, fixedY, spec.width, spec.height, d.instanceId, prev)) {
            return { ...d, x: candX, y: fixedY };
          }
          return d;
        }

        const candY = Math.max(310, Math.min(BOARD_H - spec.height - 20, Math.round((y - dragOffset.dy) / 10) * 10));

        // 1. Zkusíme plný posun (candX, candY)
        if (!hasCollision(candX, candY, spec.width, spec.height, d.instanceId, prev)) {
          return { ...d, x: candX, y: candY };
        }
        // 2. Zkusíme klouzání pouze vodorovně (candX, d.y)
        if (!hasCollision(candX, d.y, spec.width, spec.height, d.instanceId, prev)) {
          return { ...d, x: candX, y: d.y };
        }
        // 3. Zkusíme klouzání pouze svisle (d.x, candY)
        if (!hasCollision(d.x, candY, spec.width, spec.height, d.instanceId, prev)) {
          return { ...d, x: d.x, y: candY };
        }
        // Jinak modul zůstane na poslední platné pozici bez překryvu
        return d;
      })
    );
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  // Výpočet ortogonálních tras všech vodičů (vodorovné a svislé linie mimo moduly)
  const wirePaths = useMemo(() => computeOrthogonalWirePaths(devices, wires), [devices, wires]);

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

    for (const w of wires) {
      addEdge(`${w.fromInstanceId}:${w.fromPinId}`, `${w.toInstanceId}:${w.toPinId}`);
    }

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
          if (!d.stateA) addEdge(`${id}:L`, `${id}:1`);
          else addEdge(`${id}:L`, `${id}:2`);
          break;
        case 'sw-7':
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

    const shortLN = [...liveL].some((node) => liveN.has(node));
    const shortLPE = [...liveL].some((node) => livePE.has(node));
    const shortNPE = [...liveN].some((node) => livePE.has(node));

    return { liveL, liveN, livePE, shortLN, shortLPE, shortNPE };
  }, [devices, wires, powerOn]);

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

    for (const d of devices.filter((x) => x.type === 'lamp-e27')) {
      if (simulation.liveL.has(`${d.instanceId}:N`)) {
        issues.push(`${d.label}: Fáze L je připojena na boční závit objímky místo na středový kontakt!`);
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

  return (
    <div className="space-y-5">
      {/* HORNÍ PANEL NÁSTROJŮ */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-sm sm:text-base font-black text-white">
                Interaktivní montážní tabule (Ortogonální vedení kabelů mimo moduly + Zákaz překrývání)
              </h2>
              <p className="text-[11px] text-slate-400">
                Moduly mají pevnou kolizní zónu (nepřekrývají se) a vodiče se automaticky vedou pravoúhle v instalačních trasách kolem přístrojů.
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

        {/* PALETA PRVKŮ K PŘIDÁNÍ NA TABULI */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
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
            {activePin ? '⚡ Klikni na druhou svorku pro pravoúhlé natažení vodiče!' : '💡 Klikni na libovolnou svorku pro začátek vodiče'}
          </div>
        </div>

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
            <pattern id="boardGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e293b" strokeWidth="0.6" />
            </pattern>
          </defs>

          <rect x="0" y="0" width="820" height="590" fill="#090d16" />
          <rect x="0" y="0" width="820" height="590" fill="url(#boardGrid)" />

          {/* HORNÍ ZÓNA: ROZVADĚČ S LIŠTOU PRO MŮSTKY PE/N A 35mm DIN LIŠTOU */}
          <rect x="10" y="8" width="800" height="265" rx="12" fill="#0f172a" fillOpacity="0.82" stroke="#334155" strokeWidth="2" />
          <text x="24" y="18" fill="#64748b" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
            ROZVADĚČ • DRŽÁK MŮSTKŮ PE / N (1 šroub PE = max. 1 vodič!)
          </text>

          {/* Kovová 35mm DIN lišta (y = 163..197) */}
          <rect x="24" y="163" width="772" height="34" rx="3" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
          <rect x="24" y="171" width="772" height="18" fill="#1e293b" />
          <text x="790" y="157" textAnchor="end" fill="#475569" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
            35mm DIN LIŠTA (nepřekrývající se moduly)
          </text>

          {/* DOLNÍ ZÓNA: MONTÁŽNÍ DESKA STĚNY */}
          <rect x="10" y="295" width="800" height="285" rx="12" fill="#0f172a" fillOpacity="0.45" stroke="#1e293b" strokeWidth="2" strokeDasharray="6 4" />
          <text x="24" y="311" fill="#64748b" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
            MONTÁŽNÍ DESKA STĚNY (moduly se nepřekrývají • vodiče se vedou pravoúhle v kanálech mimo moduly)
          </text>

          {/* 1. VYKRESLENÍ PRÁVOÚHLÝCH (ORTOGONÁLNÍCH) VODIČŮ V INSTALAČNÍCH TRASÁCH */}
          {wires.map((w) => {
            const pathD = wirePaths[w.id];
            if (!pathD) return null;
            const wireSpec = WIRE_PALETTE.find((wp) => wp.id === w.color) || WIRE_PALETTE[0];

            return (
              <g
                key={w.id}
                className="cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  setWires((prev) => prev.filter((item) => item.id !== w.id));
                }}
              >
                <path d={pathD} fill="none" stroke="transparent" strokeWidth="11" strokeLinejoin="round" />
                <path
                  d={pathD}
                  fill="none"
                  stroke={wireSpec.hex}
                  strokeWidth={w.color === 'comb' ? '4.5' : '2.8'}
                  strokeDasharray={wireSpec.dash}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:stroke-red-500 transition-colors"
                />
                {w.color === 'green-yellow' && (
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#facc15"
                    strokeWidth="2"
                    strokeDasharray="4 8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="pointer-events-none"
                  />
                )}
              </g>
            );
          })}

          {/* 2. VYKRESLENÍ PRVKŮ NA TABULI */}
          {devices.map((inst) => {
            const spec = getSpec(inst.type);
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
                {/* Tělo modulu */}
                <rect
                  x="0"
                  y="0"
                  width={spec.width}
                  height={spec.height}
                  rx="7"
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

                {/* Úchopová hlavička pro posun myší */}
                <g className="cursor-move" onMouseDown={(e) => handleStartDrag(inst, e)}>
                  <rect x="2" y="2" width={spec.width - 4} height="15" rx="4" fill="#090d16" fillOpacity="0.7" />
                  <text x="6" y="12.5" fill="#e2e8f0" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
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
                      <circle cx={spec.width - 9} cy="9.5" r="5.5" fill="#7f1d1d" />
                      <text x={spec.width - 9} y="12.5" textAnchor="middle" fill="#fca5a5" fontSize="8.5" fontWeight="bold">
                        ×
                      </text>
                    </g>
                  )}
                </g>

                {/* Ovládací páčka DIN modulů */}
                {(inst.type === 'qm-1p' ||
                  inst.type === 'mcb-b10' ||
                  inst.type === 'mcb-b16' ||
                  inst.type === 'rcd-2p' ||
                  inst.type === 'relay-ka') && (
                  <g
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleDeviceState(inst, 'A');
                    }}
                  >
                    <rect
                      x="10"
                      y="46"
                      width={spec.width - 20}
                      height="28"
                      rx="4"
                      fill={inst.stateA ? '#16a34a' : '#dc2626'}
                      stroke="#ffffff"
                      strokeWidth="1"
                    />
                    <text x={spec.width / 2} y="64" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                      {inst.stateA ? 'I (ZAP)' : '0 (VYP)'}
                    </text>
                  </g>
                )}

                {/* Ovládací klapka spínačů 1, 6, 7, 1/0 */}
                {(inst.type === 'sw-1' || inst.type === 'sw-6' || inst.type === 'sw-7' || inst.type === 'sw-push') && (
                  <g
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleDeviceState(inst, 'A');
                    }}
                  >
                    <rect
                      x="18"
                      y="38"
                      width={spec.width - 36}
                      height="34"
                      rx="6"
                      fill={inst.stateA ? '#d97706' : '#1e293b'}
                      stroke="#94a3b8"
                      strokeWidth="1.5"
                    />
                    <text x={spec.width / 2} y="59" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
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

                {/* Dvouklapkový spínač č. 5 */}
                {inst.type === 'sw-5' && (
                  <g>
                    <rect
                      x="14"
                      y="38"
                      width="36"
                      height="34"
                      rx="5"
                      className="cursor-pointer"
                      fill={inst.stateA ? '#d97706' : '#1e293b'}
                      stroke="#94a3b8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleDeviceState(inst, 'A');
                      }}
                    />
                    <text x="32" y="59" textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="bold" className="pointer-events-none">
                      Kl.A
                    </text>
                    <rect
                      x="60"
                      y="38"
                      width="36"
                      height="34"
                      rx="5"
                      className="cursor-pointer"
                      fill={inst.stateB ? '#d97706' : '#1e293b'}
                      stroke="#94a3b8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleDeviceState(inst, 'B');
                      }}
                    />
                    <text x="78" y="59" textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="bold" className="pointer-events-none">
                      Kl.B
                    </text>
                  </g>
                )}

                {/* Svítidlo E27 */}
                {inst.type === 'lamp-e27' && (
                  <g>
                    <circle
                      cx={spec.width / 2}
                      cy="66"
                      r="22"
                      fill={isLampLit ? '#fde047' : '#1e293b'}
                      stroke={isLampLit ? '#facc15' : '#475569'}
                      strokeWidth="2.5"
                    />
                    <text
                      x={spec.width / 2}
                      y="70"
                      textAnchor="middle"
                      fill={isLampLit ? '#0f172a' : '#94a3b8'}
                      fontSize="10"
                      fontWeight="bold"
                    >
                      {isLampLit ? 'SVÍTÍ!' : 'E27'}
                    </text>
                  </g>
                )}

                {/* Dvojitý lustr */}
                {inst.type === 'lamp-dual' && (
                  <g>
                    <circle cx="46" cy="66" r="18" fill={isDualLit1 ? '#fde047' : '#1e293b'} stroke="#64748b" strokeWidth="2" />
                    <text x="46" y="70" textAnchor="middle" fill={isDualLit1 ? '#0f172a' : '#94a3b8'} fontSize="8.5" fontWeight="bold">
                      {isDualLit1 ? 'SVÍTÍ' : 'V1'}
                    </text>
                    <circle cx="104" cy="66" r="18" fill={isDualLit2 ? '#fde047' : '#1e293b'} stroke="#64748b" strokeWidth="2" />
                    <text x="104" y="70" textAnchor="middle" fill={isDualLit2 ? '#0f172a' : '#94a3b8'} fontSize="8.5" fontWeight="bold">
                      {isDualLit2 ? 'SVÍTÍ' : 'V2'}
                    </text>
                  </g>
                )}

                {/* Zásuvka 230 V */}
                {inst.type === 'socket-230' && (
                  <g>
                    <circle cx="65" cy="64" r="24" fill="#1e293b" stroke={isSocketPowered ? '#22c55e' : '#475569'} strokeWidth="2" />
                    <text x="65" y="101" textAnchor="middle" fill={isSocketPowered ? '#4ade80' : '#94a3b8'} fontSize="8.5" fontWeight="bold" fontFamily="monospace">
                      {isSocketPowered ? '230 V OK!' : 'L vlevo • N vpravo'}
                    </text>
                  </g>
                )}

                {inst.type === 'wago-3' && <rect x="12" y="19" width="76" height="10" rx="2" fill="#ea580c" />}

                {/* Vykreslení klikatelných svorek (pinů) */}
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
                        r={isSelected ? 8.5 : 6.5}
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
                        y={pin.dy < 25 ? pin.dy + 15 : pin.dy - 9}
                        textAnchor="middle"
                        fill="#e2e8f0"
                        fontSize="8"
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
        </svg>

        {/* SPODNÍ LEGENDA OVLÁDÁNÍ TABULE */}
        <div className="bg-slate-900 border-t border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Move className="w-3.5 h-3.5 text-amber-400" />
              <strong>Posun prvku (s detekcí kolize):</strong> táhni myší za horní proužek prvku
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <strong>Pravoúhlé vedení vodiče:</strong> klikni na 1. svorku a pak na 2. svorku
            </span>
          </div>
          <span>
            <strong>Smazání vodiče:</strong> klikni přímo na vodič • <strong>Sepnutí vypínače/jističe:</strong> klikni na klapku/páčku
          </span>
        </div>
      </div>
    </div>
  );
};
