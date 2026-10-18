import React, { useState, useRef, useMemo } from 'react';
import {
  Plus,
  Trash2,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Eye,
  Unplug,
} from 'lucide-react';

// ============================================================================
// TYPY PRO MONTÁŽNÍ TABULI
// ============================================================================

export type PlacementZone = 'din' | 'busbar' | 'wall' | 'fixed';

export type WireColor = 'L' | 'N' | 'PE' | 'SW1' | 'SW2';

export interface TerminalDef {
  id: string;
  label: string;
  relX: number;
  relY: number;
  hintColor?: WireColor;
}

export interface PaletteItemDef {
  type: string;
  name: string;
  shortName: string;
  zone: PlacementZone;
  width: number;
  height: number;
  description: string;
  terminals: TerminalDef[];
}

export interface PlacedItem {
  instanceId: string;
  type: string;
  label: string;
  x: number;
  y: number;
  state: number; // 0 = OFF/pos0, 1 = ON/pos1, 2 = Left ON, 3 = Both ON
}

export interface BoardWire {
  id: string;
  fromInstanceId: string;
  fromTerminalId: string;
  toInstanceId: string;
  toTerminalId: string;
  color: WireColor;
}

export type DifficultyLevel = 1 | 2 | 3;

export interface BoardTask {
  id: string;
  level: DifficultyLevel;
  number: number;
  title: string;
  subtitle: string;
  assignment: string;
  items: PlacedItem[];
  solutionWires: BoardWire[];
  check: (
    items: PlacedItem[],
    wires: BoardWire[],
    sim: SimulationResult
  ) => { ok: boolean; messages: string[] };
}

interface SimulationResult {
  liveNodes: Set<string>;
  neutralNodes: Set<string>;
  peNodes: Set<string>;
  nodePhases: Map<string, Set<'L1' | 'L2' | 'L3'>>;
  shortCircuit: boolean;
  rcdTripped: boolean;
  energizedContactors: Set<string>;
  diagnostics: string[];
}

// ============================================================================
// BARVY VODIČŮ DLE ČSN EN 60445
// ============================================================================

const WIRE_COLORS: Record<
  WireColor,
  { name: string; stroke: string; badgeBg: string; desc: string }
> = {
  L: {
    name: 'Hnědá / Černá (L1/L2/L3)',
    stroke: '#b45309',
    badgeBg: 'bg-amber-700',
    desc: 'Fázový vodič L1, L2, L3',
  },
  N: {
    name: 'Modrá (N)',
    stroke: '#2563eb',
    badgeBg: 'bg-blue-600',
    desc: 'Střední (nulový) vodič N',
  },
  PE: {
    name: 'Zeleno-žlutá (PE)',
    stroke: '#16a34a',
    badgeBg: 'bg-emerald-600',
    desc: 'Ochranný vodič PE / pospojování',
  },
  SW1: {
    name: 'Černá (spínaná / koresp.)',
    stroke: '#475569',
    badgeBg: 'bg-slate-600',
    desc: 'Spínaná fáze nebo korespondenční vodič',
  },
  SW2: {
    name: 'Šedá / Oranžová (ovládací)',
    stroke: '#ea580c',
    badgeBg: 'bg-orange-600',
    desc: 'Druhý korespondenční nebo ovládací vodič A1',
  },
};

// ============================================================================
// KATALOG PRVKŮ PRO UMÍSTĚNÍ NA TABULI
// ============================================================================

const PALETTE_ITEMS: PaletteItemDef[] = [
  // Pevný 3fázový přívod sítě
  {
    type: 'supply',
    name: 'Přívod sítě 3× 230/400 V (TN-S)',
    shortName: 'SÍŤ 3F TN-S',
    zone: 'fixed',
    width: 112,
    height: 76,
    description: 'Třífázový přívod L1, L2, L3, N, PE (230/400 V AC)',
    terminals: [
      { id: 'L1', label: 'L1', relX: 16, relY: 66, hintColor: 'L' },
      { id: 'L2', label: 'L2', relX: 36, relY: 66, hintColor: 'L' },
      { id: 'L3', label: 'L3', relX: 56, relY: 66, hintColor: 'L' },
      { id: 'N', label: 'N', relX: 76, relY: 66, hintColor: 'N' },
      { id: 'PE', label: 'PE', relX: 96, relY: 66, hintColor: 'PE' },
    ],
  },

  // Můstky N / PE / MET
  {
    type: 'busbar-n',
    name: 'Sběrnice N (modrá)',
    shortName: 'Můstek N',
    zone: 'busbar',
    width: 140,
    height: 36,
    description: 'Propojený nulový můstek N (5 svorek)',
    terminals: [
      { id: 'N1', label: '1', relX: 20, relY: 24, hintColor: 'N' },
      { id: 'N2', label: '2', relX: 45, relY: 24, hintColor: 'N' },
      { id: 'N3', label: '3', relX: 70, relY: 24, hintColor: 'N' },
      { id: 'N4', label: '4', relX: 95, relY: 24, hintColor: 'N' },
      { id: 'N5', label: '5', relX: 120, relY: 24, hintColor: 'N' },
    ],
  },
  {
    type: 'busbar-pe',
    name: 'Sběrnice PE (zeleno-žlutá)',
    shortName: 'Můstek PE',
    zone: 'busbar',
    width: 140,
    height: 36,
    description: 'Propojený ochranný můstek PE (5 svorek)',
    terminals: [
      { id: 'PE1', label: '1', relX: 20, relY: 24, hintColor: 'PE' },
      { id: 'PE2', label: '2', relX: 45, relY: 24, hintColor: 'PE' },
      { id: 'PE3', label: '3', relX: 70, relY: 24, hintColor: 'PE' },
      { id: 'PE4', label: '4', relX: 95, relY: 24, hintColor: 'PE' },
      { id: 'PE5', label: '5', relX: 120, relY: 24, hintColor: 'PE' },
    ],
  },
  {
    type: 'met-hop',
    name: 'Svorkovnice MET / HOP',
    shortName: 'MET / HOP',
    zone: 'busbar',
    width: 130,
    height: 36,
    description: 'Hlavní ochranná přípojnice zemnění a pospojování',
    terminals: [
      { id: 'E1', label: 'Zem', relX: 20, relY: 24, hintColor: 'PE' },
      { id: 'E2', label: 'PE', relX: 55, relY: 24, hintColor: 'PE' },
      { id: 'E3', label: 'Voda', relX: 85, relY: 24, hintColor: 'PE' },
      { id: 'E4', label: 'SPD', relX: 112, relY: 24, hintColor: 'PE' },
    ],
  },

  // DIN LIŠTA – 1F a 3F moduly
  {
    type: 'qm-3p',
    name: 'Hlavní vypínač 3P (40 A)',
    shortName: 'Vypínač 3P',
    zone: 'din',
    width: 82,
    height: 112,
    description: 'Třípólový hlavní vypínač rozvaděče (1-2, 3-4, 5-6)',
    terminals: [
      { id: '1', label: '1', relX: 18, relY: 12, hintColor: 'L' },
      { id: '3', label: '3', relX: 41, relY: 12, hintColor: 'L' },
      { id: '5', label: '5', relX: 64, relY: 12, hintColor: 'L' },
      { id: '2', label: '2', relX: 18, relY: 100, hintColor: 'L' },
      { id: '4', label: '4', relX: 41, relY: 100, hintColor: 'L' },
      { id: '6', label: '6', relX: 64, relY: 100, hintColor: 'L' },
    ],
  },
  {
    type: 'mcb-b10',
    name: 'Jistič 1P B10 (světla)',
    shortName: 'FA B10',
    zone: 'din',
    width: 50,
    height: 112,
    description: 'Jednopólový jistič B10 A (1 = vstup, 2 = výstup)',
    terminals: [
      { id: '1', label: '1', relX: 25, relY: 12, hintColor: 'L' },
      { id: '2', label: '2', relX: 25, relY: 100, hintColor: 'L' },
    ],
  },
  {
    type: 'mcb-b16',
    name: 'Jistič 1P B16 (zásuvky)',
    shortName: 'FA B16',
    zone: 'din',
    width: 50,
    height: 112,
    description: 'Jednopólový jistič B16 A (1 = vstup, 2 = výstup)',
    terminals: [
      { id: '1', label: '1', relX: 25, relY: 12, hintColor: 'L' },
      { id: '2', label: '2', relX: 25, relY: 100, hintColor: 'L' },
    ],
  },
  {
    type: 'mcb-3p',
    name: 'Jistič 3P B16 (3f spotřebiče)',
    shortName: 'FA 3P B16',
    zone: 'din',
    width: 82,
    height: 112,
    description: 'Třípólový jistič B16 A pro 400 V (1-2, 3-4, 5-6)',
    terminals: [
      { id: '1', label: '1', relX: 18, relY: 12, hintColor: 'L' },
      { id: '3', label: '3', relX: 41, relY: 12, hintColor: 'L' },
      { id: '5', label: '5', relX: 64, relY: 12, hintColor: 'L' },
      { id: '2', label: '2', relX: 18, relY: 100, hintColor: 'L' },
      { id: '4', label: '4', relX: 41, relY: 100, hintColor: 'L' },
      { id: '6', label: '6', relX: 64, relY: 100, hintColor: 'L' },
    ],
  },
  {
    type: 'rcd-2p',
    name: 'Proudový chránič 2P 30mA',
    shortName: 'RCD 2P',
    zone: 'din',
    width: 78,
    height: 112,
    description: 'Dvoupólový proudový chránič FI (1-2 fáze, N_in - N_out)',
    terminals: [
      { id: '1', label: '1(L)', relX: 24, relY: 12, hintColor: 'L' },
      { id: 'N_in', label: 'N', relX: 54, relY: 12, hintColor: 'N' },
      { id: '2', label: '2(L)', relX: 24, relY: 100, hintColor: 'L' },
      { id: 'N_out', label: 'N', relX: 54, relY: 100, hintColor: 'N' },
    ],
  },
  {
    type: 'rcd-4p',
    name: 'Proudový chránič 4P 30mA (3f)',
    shortName: 'RCD 4P',
    zone: 'din',
    width: 108,
    height: 112,
    description: 'Čtyřpólový proudový chránič pro 3f rozvody (1,3,5,N -> 2,4,6,N)',
    terminals: [
      { id: '1', label: '1', relX: 18, relY: 12, hintColor: 'L' },
      { id: '3', label: '3', relX: 42, relY: 12, hintColor: 'L' },
      { id: '5', label: '5', relX: 66, relY: 12, hintColor: 'L' },
      { id: 'N_in', label: 'N', relX: 90, relY: 12, hintColor: 'N' },
      { id: '2', label: '2', relX: 18, relY: 100, hintColor: 'L' },
      { id: '4', label: '4', relX: 42, relY: 100, hintColor: 'L' },
      { id: '6', label: '6', relX: 66, relY: 100, hintColor: 'L' },
      { id: 'N_out', label: 'N', relX: 90, relY: 100, hintColor: 'N' },
    ],
  },
  {
    type: 'rcbo-1p',
    name: 'Jističochránič RCBO B16/30mA',
    shortName: 'RCBO B16',
    zone: 'din',
    width: 78,
    height: 112,
    description: 'Kombinovaný proudový chránič s jističem 1P+N (B16 / 30 mA)',
    terminals: [
      { id: '1', label: '1(L)', relX: 24, relY: 12, hintColor: 'L' },
      { id: 'N_in', label: 'N', relX: 54, relY: 12, hintColor: 'N' },
      { id: '2', label: '2(L)', relX: 24, relY: 100, hintColor: 'L' },
      { id: 'N_out', label: 'N', relX: 54, relY: 100, hintColor: 'N' },
    ],
  },
  {
    type: 'contactor-km',
    name: 'Instalační stykač KM (3P + cívka A1/A2)',
    shortName: 'Stykač KM',
    zone: 'din',
    width: 110,
    height: 112,
    description: '3pólový stykač: cívka A1-A2 spíná silové kontakty 1-2, 3-4, 5-6',
    terminals: [
      { id: 'A1', label: 'A1', relX: 16, relY: 12, hintColor: 'SW2' },
      { id: '1', label: '1', relX: 42, relY: 12, hintColor: 'L' },
      { id: '3', label: '3', relX: 68, relY: 12, hintColor: 'L' },
      { id: '5', label: '5', relX: 94, relY: 12, hintColor: 'L' },
      { id: 'A2', label: 'A2', relX: 16, relY: 100, hintColor: 'N' },
      { id: '2', label: '2', relX: 42, relY: 100, hintColor: 'L' },
      { id: '4', label: '4', relX: 68, relY: 100, hintColor: 'L' },
      { id: '6', label: '6', relX: 94, relY: 100, hintColor: 'L' },
    ],
  },
  {
    type: 'relay-ka',
    name: 'Impulzní relé KA (krokové)',
    shortName: 'Relé KA',
    zone: 'din',
    width: 78,
    height: 112,
    description: 'Krokové relé: cívka A1-A2, spínací kontakt 1-2',
    terminals: [
      { id: 'A1', label: 'A1', relX: 24, relY: 12, hintColor: 'SW1' },
      { id: '1', label: '1(L)', relX: 54, relY: 12, hintColor: 'L' },
      { id: 'A2', label: 'A2', relX: 24, relY: 100, hintColor: 'N' },
      { id: '2', label: '2(L′)', relX: 54, relY: 100, hintColor: 'SW1' },
    ],
  },
  {
    type: 'spd-t2',
    name: 'Svodič přepětí SPD T1+T2 (3P+N)',
    shortName: 'SPD 3P+N',
    zone: 'din',
    width: 108,
    height: 112,
    description: 'Chránič přepětí 3P+N: nahoře L1, L2, L3, N, dole svorka PE do MET',
    terminals: [
      { id: 'L1', label: 'L1', relX: 18, relY: 12, hintColor: 'L' },
      { id: 'L2', label: 'L2', relX: 42, relY: 12, hintColor: 'L' },
      { id: 'L3', label: 'L3', relX: 66, relY: 12, hintColor: 'L' },
      { id: 'N', label: 'N', relX: 90, relY: 12, hintColor: 'N' },
      { id: 'PE', label: 'PE', relX: 54, relY: 100, hintColor: 'PE' },
    ],
  },

  // MONTÁŽNÍ PANEL (spínače, krabice, spotřebiče)
  {
    type: 'wago-box',
    name: 'Odbočná krabice (3× WAGO)',
    shortName: 'Krabice WAGO',
    zone: 'wall',
    width: 136,
    height: 82,
    description: '3 nezávislé WAGO svorky (A, B, C) – každá má 3 propojené vstupy',
    terminals: [
      { id: 'A1', label: 'A', relX: 22, relY: 16 },
      { id: 'A2', label: 'A', relX: 22, relY: 41 },
      { id: 'A3', label: 'A', relX: 22, relY: 66 },
      { id: 'B1', label: 'B', relX: 68, relY: 16 },
      { id: 'B2', label: 'B', relX: 68, relY: 41 },
      { id: 'B3', label: 'B', relX: 68, relY: 66 },
      { id: 'C1', label: 'C', relX: 114, relY: 16 },
      { id: 'C2', label: 'C', relX: 114, relY: 41 },
      { id: 'C3', label: 'C', relX: 114, relY: 66 },
    ],
  },
  {
    type: 'switch-1',
    name: 'Spínač jednopólový (řazení 1)',
    shortName: 'Spínač č. 1',
    zone: 'wall',
    width: 86,
    height: 86,
    description: 'Klasický vypínač: L = přívod fáze, 1 = spínaný vývod ke světlu',
    terminals: [
      { id: 'L', label: 'L', relX: 43, relY: 14, hintColor: 'L' },
      { id: '1', label: '1', relX: 43, relY: 72, hintColor: 'SW1' },
    ],
  },
  {
    type: 'switch-5',
    name: 'Sériový (lustrový) přepínač č. 5',
    shortName: 'Lustrový č. 5',
    zone: 'wall',
    width: 92,
    height: 86,
    description: 'Dvě klapky: L = společný přívod, 1 = větev 1, 2 = větev 2',
    terminals: [
      { id: 'L', label: 'L', relX: 46, relY: 14, hintColor: 'L' },
      { id: '1', label: '1', relX: 26, relY: 72, hintColor: 'SW1' },
      { id: '2', label: '2', relX: 66, relY: 72, hintColor: 'SW2' },
    ],
  },
  {
    type: 'switch-6',
    name: 'Schodišťový přepínač (řazení 6)',
    shortName: 'Schodišťák č. 6',
    zone: 'wall',
    width: 92,
    height: 86,
    description: 'Přepíná společnou svorku L mezi korespondenčními svorkami 1 a 2',
    terminals: [
      { id: 'L', label: 'L/P', relX: 46, relY: 14, hintColor: 'L' },
      { id: '1', label: '1', relX: 26, relY: 72, hintColor: 'SW1' },
      { id: '2', label: '2', relX: 66, relY: 72, hintColor: 'SW2' },
    ],
  },
  {
    type: 'switch-7',
    name: 'Křížový přepínač (řazení 7)',
    shortName: 'Křížový č. 7',
    zone: 'wall',
    width: 96,
    height: 86,
    description: 'Mezi dva schodišťáky: přímé (1-3, 2-4) nebo křížové (1-4, 2-3)',
    terminals: [
      { id: '1', label: '1', relX: 28, relY: 14, hintColor: 'SW1' },
      { id: '2', label: '2', relX: 68, relY: 14, hintColor: 'SW2' },
      { id: '3', label: '3', relX: 28, relY: 72, hintColor: 'SW1' },
      { id: '4', label: '4', relX: 68, relY: 72, hintColor: 'SW2' },
    ],
  },
  {
    type: 'pushbutton',
    name: 'Tlačítko zapínací č. 1/0 (NO)',
    shortName: 'Tlačítko 1/0',
    zone: 'wall',
    width: 86,
    height: 86,
    description: 'Spíná obvod cívky stykače nebo relé (L -> 1)',
    terminals: [
      { id: 'L', label: 'L', relX: 43, relY: 14, hintColor: 'L' },
      { id: '1', label: '1', relX: 43, relY: 72, hintColor: 'SW1' },
    ],
  },
  {
    type: 'lamp-1',
    name: 'Svítidlo E27 (230 V)',
    shortName: 'Světlo E27',
    zone: 'wall',
    width: 96,
    height: 86,
    description: 'Svítidlo se svorkami L, N, PE. Rozsvítí se při L + N.',
    terminals: [
      { id: 'L', label: 'L', relX: 22, relY: 72, hintColor: 'SW1' },
      { id: 'PE', label: 'PE', relX: 48, relY: 72, hintColor: 'PE' },
      { id: 'N', label: 'N', relX: 74, relY: 72, hintColor: 'N' },
    ],
  },
  {
    type: 'lamp-2',
    name: 'Lustr dvouvětvový (L1, L2, N, PE)',
    shortName: 'Lustr 2-větv.',
    zone: 'wall',
    width: 112,
    height: 86,
    description: 'Dva světelné okruhy L1 a L2 se společným N a PE',
    terminals: [
      { id: 'L1', label: 'L1', relX: 18, relY: 72, hintColor: 'SW1' },
      { id: 'L2', label: 'L2', relX: 42, relY: 72, hintColor: 'SW2' },
      { id: 'PE', label: 'PE', relX: 68, relY: 72, hintColor: 'PE' },
      { id: 'N', label: 'N', relX: 94, relY: 72, hintColor: 'N' },
    ],
  },
  {
    type: 'socket-230',
    name: 'Zásuvka 230 V / 16 A',
    shortName: 'Zásuvka 230V',
    zone: 'wall',
    width: 96,
    height: 86,
    description: 'ČSN: Fáze L vlevo, ochranný kolík PE uprostřed, N vpravo',
    terminals: [
      { id: 'L', label: 'L', relX: 22, relY: 72, hintColor: 'L' },
      { id: 'PE', label: 'PE', relX: 48, relY: 72, hintColor: 'PE' },
      { id: 'N', label: 'N', relX: 74, relY: 72, hintColor: 'N' },
    ],
  },
  {
    type: 'socket-400',
    name: 'Třífázová zásuvka 400 V (5P 16 A)',
    shortName: 'Zásuvka 400V',
    zone: 'wall',
    width: 120,
    height: 90,
    description: 'Pětipólová zásuvka 400 V: L1, L2, L3, N, PE',
    terminals: [
      { id: 'L1', label: 'L1', relX: 18, relY: 76, hintColor: 'L' },
      { id: 'L2', label: 'L2', relX: 40, relY: 76, hintColor: 'L' },
      { id: 'L3', label: 'L3', relX: 62, relY: 76, hintColor: 'L' },
      { id: 'N', label: 'N', relX: 84, relY: 76, hintColor: 'N' },
      { id: 'PE', label: 'PE', relX: 104, relY: 76, hintColor: 'PE' },
    ],
  },
  {
    type: 'boiler-1f',
    name: 'Elektrický bojler 230 V (2,2 kW)',
    shortName: 'Bojler 230V',
    zone: 'wall',
    width: 102,
    height: 92,
    description: 'Zásobníkový ohřívač vody 230 V se svorkami L, N, PE',
    terminals: [
      { id: 'L', label: 'L', relX: 24, relY: 78, hintColor: 'L' },
      { id: 'N', label: 'N', relX: 51, relY: 78, hintColor: 'N' },
      { id: 'PE', label: 'PE', relX: 78, relY: 78, hintColor: 'PE' },
    ],
  },
  {
    type: 'stove-3f',
    name: 'Elektrická kamna / sporák 400 V (3F)',
    shortName: 'Kamna 400V 3F',
    zone: 'wall',
    width: 126,
    height: 92,
    description: 'Třífázový spotřebič 400 V (L1, L2, L3, N, PE)',
    terminals: [
      { id: 'L1', label: 'L1', relX: 18, relY: 78, hintColor: 'L' },
      { id: 'L2', label: 'L2', relX: 41, relY: 78, hintColor: 'L' },
      { id: 'L3', label: 'L3', relX: 64, relY: 78, hintColor: 'L' },
      { id: 'N', label: 'N', relX: 87, relY: 78, hintColor: 'N' },
      { id: 'PE', label: 'PE', relX: 108, relY: 78, hintColor: 'PE' },
    ],
  },
  {
    type: 'water-pipe',
    name: 'Kovové potrubí vody (pospojování)',
    shortName: 'Potrubí vody',
    zone: 'wall',
    width: 106,
    height: 60,
    description: 'Zemnicí pásek Bernard na vodovodním potrubí pro pospojování k MET',
    terminals: [{ id: 'PE', label: 'PE', relX: 53, relY: 16, hintColor: 'PE' }],
  },
];

const PALETTE_MAP: Record<string, PaletteItemDef> = Object.fromEntries(
  PALETTE_ITEMS.map((p) => [p.type, p])
);

// ============================================================================
// KONSTANTY ZÓN NA TABULI A DETEKCE KOLIZÍ
// ============================================================================

const BOARD_WIDTH = 820;
const BOARD_HEIGHT = 590;

const BUSBAR_ROW_Y = 30;
const DIN_RAIL_ITEM_Y = 98;
const WALL_ZONE_MIN_Y = 250;
const WALL_ZONE_MAX_Y = 485;
const MODULE_GAP = 8;

function boxesOverlap(
  ax: number,
  ay: number,
  aw: number,
  ah: number,
  bx: number,
  by: number,
  bw: number,
  bh: number,
  gap = MODULE_GAP
): boolean {
  return (
    ax < bx + bw + gap &&
    ax + aw + gap > bx &&
    ay < by + bh + gap &&
    ay + ah + gap > by
  );
}

function hasCollision(
  candidateId: string,
  x: number,
  y: number,
  w: number,
  h: number,
  items: PlacedItem[]
): boolean {
  for (const other of items) {
    if (other.instanceId === candidateId) continue;
    const def = PALETTE_MAP[other.type];
    if (!def) continue;
    if (boxesOverlap(x, y, w, h, other.x, other.y, def.width, def.height)) {
      return true;
    }
  }
  return false;
}

function findFreePosition(
  type: string,
  items: PlacedItem[]
): { x: number; y: number } | null {
  const def = PALETTE_MAP[type];
  if (!def) return null;

  if (def.zone === 'busbar') {
    for (let x = 180; x <= BOARD_WIDTH - def.width - 20; x += 10) {
      if (!hasCollision('__new__', x, BUSBAR_ROW_Y, def.width, def.height, items)) {
        return { x, y: BUSBAR_ROW_Y };
      }
    }
    return null;
  }

  if (def.zone === 'din') {
    for (let x = 180; x <= BOARD_WIDTH - def.width - 20; x += 10) {
      if (!hasCollision('__new__', x, DIN_RAIL_ITEM_Y, def.width, def.height, items)) {
        return { x, y: DIN_RAIL_ITEM_Y };
      }
    }
    return null;
  }

  for (let y = 260; y <= WALL_ZONE_MAX_Y; y += 20) {
    for (let x = 30; x <= BOARD_WIDTH - def.width - 20; x += 20) {
      if (!hasCollision('__new__', x, y, def.width, def.height, items)) {
        return { x, y };
      }
    }
  }
  return null;
}

// ============================================================================
// ORTOGONÁLNÍ (PRAVOÚHLÉ) ROUTOVÁNÍ VODIČŮ S OBCHÁZENÍM MODULŮ (A*)
// ============================================================================

const GRID_STEP = 10;
const GRID_COLS = Math.ceil(BOARD_WIDTH / GRID_STEP);
const GRID_ROWS = Math.ceil(BOARD_HEIGHT / GRID_STEP);

interface TerminalExit {
  gx: number;
  gy: number;
  stubX: number;
  stubY: number;
}

function getTerminalExit(item: PlacedItem, termId: string): TerminalExit | null {
  const def = PALETTE_MAP[item.type];
  if (!def) return null;
  const term = def.terminals.find((t) => t.id === termId);
  if (!term) return null;

  const absX = item.x + term.relX;
  const absY = item.y + term.relY;

  const distTop = term.relY;
  const distBottom = def.height - term.relY;
  const distLeft = term.relX;
  const distRight = def.width - term.relX;
  const minDist = Math.min(distTop, distBottom, distLeft, distRight);

  let exitX = absX;
  let exitY = absY;

  if (minDist === distTop) {
    exitY = item.y - 10;
  } else if (minDist === distBottom) {
    exitY = item.y + def.height + 10;
  } else if (minDist === distLeft) {
    exitX = item.x - 10;
  } else {
    exitX = item.x + def.width + 10;
  }

  const gx = Math.max(1, Math.min(GRID_COLS - 2, Math.round(exitX / GRID_STEP)));
  const gy = Math.max(1, Math.min(GRID_ROWS - 2, Math.round(exitY / GRID_STEP)));

  return {
    gx,
    gy,
    stubX: gx * GRID_STEP,
    stubY: gy * GRID_STEP,
  };
}

function computeOrthogonalWirePaths(
  items: PlacedItem[],
  wires: BoardWire[]
): Record<string, string> {
  const blocked = new Uint8Array(GRID_COLS * GRID_ROWS);
  const itemMap = new Map<string, PlacedItem>();

  for (const it of items) {
    itemMap.set(it.instanceId, it);
    const def = PALETTE_MAP[it.type];
    if (!def) continue;

    const c0 = Math.max(0, Math.floor((it.x - 4) / GRID_STEP));
    const c1 = Math.min(GRID_COLS - 1, Math.ceil((it.x + def.width + 4) / GRID_STEP));
    const r0 = Math.max(0, Math.floor((it.y - 4) / GRID_STEP));
    const r1 = Math.min(GRID_ROWS - 1, Math.ceil((it.y + def.height + 4) / GRID_STEP));

    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        blocked[r * GRID_COLS + c] = 1;
      }
    }
  }

  const usedCells = new Uint16Array(GRID_COLS * GRID_ROWS);
  const paths: Record<string, string> = {};

  const dirs = [
    { dc: 1, dr: 0 },
    { dc: -1, dr: 0 },
    { dc: 0, dr: 1 },
    { dc: 0, dr: -1 },
  ];

  wires.forEach((w) => {
    const fromItem = itemMap.get(w.fromInstanceId);
    const toItem = itemMap.get(w.toInstanceId);
    if (!fromItem || !toItem) return;

    const fromDef = PALETTE_MAP[fromItem.type];
    const toDef = PALETTE_MAP[toItem.type];
    const fromTerm = fromDef?.terminals.find((t) => t.id === w.fromTerminalId);
    const toTerm = toDef?.terminals.find((t) => t.id === w.toTerminalId);
    if (!fromTerm || !toTerm) return;

    const startAbsX = fromItem.x + fromTerm.relX;
    const startAbsY = fromItem.y + fromTerm.relY;
    const endAbsX = toItem.x + toTerm.relX;
    const endAbsY = toItem.y + toTerm.relY;

    const startExit = getTerminalExit(fromItem, w.fromTerminalId);
    const endExit = getTerminalExit(toItem, w.toTerminalId);
    if (!startExit || !endExit) return;

    const startIdx = startExit.gy * GRID_COLS + startExit.gx;
    const endIdx = endExit.gy * GRID_COLS + endExit.gx;

    const prevBlockedStart = blocked[startIdx];
    const prevBlockedEnd = blocked[endIdx];
    blocked[startIdx] = 0;
    blocked[endIdx] = 0;

    const totalStates = GRID_COLS * GRID_ROWS * 5;
    const gScore = new Float32Array(totalStates);
    gScore.fill(1e9);
    const parentState = new Int32Array(totalStates);
    parentState.fill(-1);

    const openSet: number[] = [];
    const startState = startIdx * 5 + 4;
    gScore[startState] = 0;
    openSet.push(startState);

    let goalState = -1;

    while (openSet.length > 0) {
      let bestPos = 0;
      let bestF = 1e9;
      for (let i = 0; i < openSet.length; i++) {
        const st = openSet[i];
        const cellIdx = Math.floor(st / 5);
        const c = cellIdx % GRID_COLS;
        const r = Math.floor(cellIdx / GRID_COLS);
        const h = (Math.abs(c - endExit.gx) + Math.abs(r - endExit.gy)) * 10;
        const f = gScore[st] + h;
        if (f < bestF) {
          bestF = f;
          bestPos = i;
        }
      }

      const currentState = openSet[bestPos];
      openSet.splice(bestPos, 1);

      const cellIdx = Math.floor(currentState / 5);
      const dirIdx = currentState % 5;

      if (cellIdx === endIdx) {
        goalState = currentState;
        break;
      }

      const c = cellIdx % GRID_COLS;
      const r = Math.floor(cellIdx / GRID_COLS);

      for (let d = 0; d < 4; d++) {
        const nc = c + dirs[d].dc;
        const nr = r + dirs[d].dr;
        if (nc < 1 || nc >= GRID_COLS - 1 || nr < 1 || nr >= GRID_ROWS - 1) continue;

        const nCell = nr * GRID_COLS + nc;
        if (blocked[nCell] && nCell !== endIdx) continue;

        const turnPenalty = dirIdx !== 4 && dirIdx !== d ? 16 : 0;
        const overlapPenalty = usedCells[nCell] * 14;
        const tentativeG = gScore[currentState] + 10 + turnPenalty + overlapPenalty;

        const nextState = nCell * 5 + d;
        if (tentativeG < gScore[nextState]) {
          gScore[nextState] = tentativeG;
          parentState[nextState] = currentState;
          if (!openSet.includes(nextState)) {
            openSet.push(nextState);
          }
        }
      }
    }

    blocked[startIdx] = prevBlockedStart;
    blocked[endIdx] = prevBlockedEnd;

    const pts: Array<{ x: number; y: number }> = [{ x: startAbsX, y: startAbsY }];

    if (goalState !== -1) {
      const gridPath: Array<{ x: number; y: number; cell: number }> = [];
      let cur = goalState;
      while (cur !== -1) {
        const cell = Math.floor(cur / 5);
        const c = cell % GRID_COLS;
        const r = Math.floor(cell / GRID_COLS);
        gridPath.push({ x: c * GRID_STEP, y: r * GRID_STEP, cell });
        cur = parentState[cur];
      }
      gridPath.reverse();

      if (gridPath.length > 0) {
        pts.push({ x: gridPath[0].x, y: startAbsY });
        for (const gp of gridPath) {
          usedCells[gp.cell] += 1;
          pts.push({ x: gp.x, y: gp.y });
        }
        const last = gridPath[gridPath.length - 1];
        pts.push({ x: last.x, y: endAbsY });
      }
    } else {
      const midY = Math.round((startExit.stubY + endExit.stubY) / 2);
      pts.push({ x: startExit.stubX, y: startAbsY });
      pts.push({ x: startExit.stubX, y: midY });
      pts.push({ x: endExit.stubX, y: midY });
      pts.push({ x: endExit.stubX, y: endAbsY });
    }

    pts.push({ x: endAbsX, y: endAbsY });

    const simplified: Array<{ x: number; y: number }> = [];
    for (const p of pts) {
      const prev = simplified[simplified.length - 1];
      if (prev && prev.x === p.x && prev.y === p.y) continue;
      if (simplified.length >= 2) {
        const p1 = simplified[simplified.length - 2];
        const p2 = simplified[simplified.length - 1];
        if ((p1.x === p2.x && p2.x === p.x) || (p1.y === p2.y && p2.y === p.y)) {
          simplified[simplified.length - 1] = p;
          continue;
        }
      }
      simplified.push(p);
    }

    paths[w.id] = simplified
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
      .join(' ');
  });

  return paths;
}

// ============================================================================
// 12 VÝUKOVÝCH ÚLOH (3 ÚROVNĚ OBTÍŽNOSTI × 4 ÚLOHY)
// ============================================================================

const BOARD_TASKS: BoardTask[] = [
  // --------------------------------------------------------------------------
  // ÚROVEŇ 1 – ZÁKLADNÍ (4 ÚLOHY)
  // --------------------------------------------------------------------------
  {
    id: 'u1-1',
    level: 1,
    number: 1,
    title: 'Spínač č. 1 a svítidlo E27',
    subtitle: 'Základní světelný obvod jištěný jističem B10',
    assignment:
      'Zapojte světelný obvod: L1 z přívodu sítě přes jistič FA B10 na spínač č. 1 (svorka L) a spínaný vývod (1) na svítidlo E27 (L). Nulový vodič N a ochranný vodič PE veďte přes můstky N a PE.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'bus-n', type: 'busbar-n', label: 'Můstek N', x: 230, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'bus-pe', type: 'busbar-pe', label: 'Můstek PE', x: 430, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'mcb-1', type: 'mcb-b10', label: 'FA1 B10', x: 250, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'sw-1', type: 'switch-1', label: 'Spínač č. 1', x: 220, y: 340, state: 1 },
      { instanceId: 'lamp-1', type: 'lamp-1', label: 'Svítidlo E27', x: 470, y: 340, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'mcb-1', toTerminalId: '1', color: 'L' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'bus-n', toTerminalId: 'N1', color: 'N' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'bus-pe', toTerminalId: 'PE1', color: 'PE' },
      { id: 'w4', fromInstanceId: 'mcb-1', fromTerminalId: '2', toInstanceId: 'sw-1', toTerminalId: 'L', color: 'L' },
      { id: 'w5', fromInstanceId: 'sw-1', fromTerminalId: '1', toInstanceId: 'lamp-1', toTerminalId: 'L', color: 'SW1' },
      { id: 'w6', fromInstanceId: 'bus-n', fromTerminalId: 'N2', toInstanceId: 'lamp-1', toTerminalId: 'N', color: 'N' },
      { id: 'w7', fromInstanceId: 'bus-pe', fromTerminalId: 'PE2', toInstanceId: 'lamp-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (_items, _wires, sim) => {
      const msgs: string[] = [];
      const lampL = sim.liveNodes.has('lamp-1:L');
      const lampN = sim.neutralNodes.has('lamp-1:N');
      const lampPE = sim.peNodes.has('lamp-1:PE');
      if (!lampN) msgs.push('Chybí připojený nulový vodič N na svítidle E27.');
      if (!lampPE) msgs.push('Chybí ochranný vodič PE na kostře svítidla E27.');
      if (!lampL) msgs.push('Svítidlo nesvítí – zkontrolujte jistič FA1 B10 a sepnutí spínače č. 1.');
      return { ok: msgs.length === 0 && !sim.shortCircuit, messages: msgs };
    },
  },
  {
    id: 'u1-2',
    level: 1,
    number: 2,
    title: 'Zásuvka 230 V přes chránič RCD a jistič B16',
    subtitle: 'Ochrana zásuvkového obvodu proudovým chráničem 30 mA',
    assignment:
      'Zapojte zásuvku 230 V: L1 a N ze sítě přiveďte do proudového chrániče RCD 2P (1 a N). Výstup fáze z RCD (2) veďte přes jistič FA B16 na levou zdířku zásuvky (L). Výstup N z chrániče připojte na N zásuvky, PE z můstku PE na ochranný kolík.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'bus-pe', type: 'busbar-pe', label: 'Můstek PE', x: 350, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'rcd-1', type: 'rcd-2p', label: 'FI1 30mA', x: 220, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'mcb-16', type: 'mcb-b16', label: 'FA1 B16', x: 340, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'sock-1', type: 'socket-230', label: 'Zásuvka 230 V', x: 320, y: 350, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'rcd-1', toTerminalId: '1', color: 'L' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'rcd-1', toTerminalId: 'N_in', color: 'N' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'bus-pe', toTerminalId: 'PE1', color: 'PE' },
      { id: 'w4', fromInstanceId: 'rcd-1', fromTerminalId: '2', toInstanceId: 'mcb-16', toTerminalId: '1', color: 'L' },
      { id: 'w5', fromInstanceId: 'mcb-16', fromTerminalId: '2', toInstanceId: 'sock-1', toTerminalId: 'L', color: 'L' },
      { id: 'w6', fromInstanceId: 'rcd-1', fromTerminalId: 'N_out', toInstanceId: 'sock-1', toTerminalId: 'N', color: 'N' },
      { id: 'w7', fromInstanceId: 'bus-pe', fromTerminalId: 'PE2', toInstanceId: 'sock-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (_items, _wires, sim) => {
      const msgs: string[] = [];
      if (!sim.liveNodes.has('sock-1:L')) msgs.push('Na levé zdířce L zásuvky není fáze.');
      if (!sim.neutralNodes.has('sock-1:N')) msgs.push('Na pravé zdířce N zásuvky chybí pracovní nula.');
      if (!sim.peNodes.has('sock-1:PE')) msgs.push('Na ochranném kolíku PE zásuvky chybí vodič PE!');
      if (!sim.liveNodes.has('rcd-1:2')) msgs.push('Proud musí procházet přes proudový chránič FI1.');
      return { ok: msgs.length === 0 && !sim.shortCircuit, messages: msgs };
    },
  },
  {
    id: 'u1-3',
    level: 1,
    number: 3,
    title: 'Sériový přepínač č. 5 a dvouvětvový lustr',
    subtitle: 'Nezávislé ovládání dvou okruhů lustru z jednoho místa',
    assignment:
      'Zapojte lustrový spínač č. 5: fázi z jističe B10 přiveďte na svorku L spínače. Vývody 1 a 2 připojte na svorky L1 a L2 dvouvětvového lustru. Doplňte N a PE.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'bus-n', type: 'busbar-n', label: 'Můstek N', x: 230, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'bus-pe', type: 'busbar-pe', label: 'Můstek PE', x: 430, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'mcb-1', type: 'mcb-b10', label: 'FA1 B10', x: 250, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'sw-5', type: 'switch-5', label: 'Lustrový č. 5', x: 220, y: 340, state: 3 },
      { instanceId: 'lustr-1', type: 'lamp-2', label: 'Lustr 2-větv.', x: 470, y: 340, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'mcb-1', toTerminalId: '1', color: 'L' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'bus-n', toTerminalId: 'N1', color: 'N' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'bus-pe', toTerminalId: 'PE1', color: 'PE' },
      { id: 'w4', fromInstanceId: 'mcb-1', fromTerminalId: '2', toInstanceId: 'sw-5', toTerminalId: 'L', color: 'L' },
      { id: 'w5', fromInstanceId: 'sw-5', fromTerminalId: '1', toInstanceId: 'lustr-1', toTerminalId: 'L1', color: 'SW1' },
      { id: 'w6', fromInstanceId: 'sw-5', fromTerminalId: '2', toInstanceId: 'lustr-1', toTerminalId: 'L2', color: 'SW2' },
      { id: 'w7', fromInstanceId: 'bus-n', fromTerminalId: 'N2', toInstanceId: 'lustr-1', toTerminalId: 'N', color: 'N' },
      { id: 'w8', fromInstanceId: 'bus-pe', fromTerminalId: 'PE2', toInstanceId: 'lustr-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (_items, _wires, sim) => {
      const msgs: string[] = [];
      if (!sim.liveNodes.has('lustr-1:L1') || !sim.liveNodes.has('lustr-1:L2')) {
        msgs.push('Zapněte obě klapky spínače č. 5 a ověřte přívod fáze na L1 i L2 lustru.');
      }
      if (!sim.neutralNodes.has('lustr-1:N')) msgs.push('Chybí vodič N na lustru.');
      if (!sim.peNodes.has('lustr-1:PE')) msgs.push('Chybí ochranný vodič PE na lustru.');
      return { ok: msgs.length === 0 && !sim.shortCircuit, messages: msgs };
    },
  },
  {
    id: 'u1-4',
    level: 1,
    number: 4,
    title: 'Jističochránič RCBO a pospojování potrubí',
    subtitle: 'Samostatný obvod s kombinovaným přístrojem RCBO B16/30mA a MET',
    assignment:
      'Zapojte zásuvku 230 V přes jističochránič RCBO (vstupy 1 a N, výstupy 2 a N). Ochranný vodič PE přiveďte do svorkovnice MET/HOP a z ní pospojujte jak kolík zásuvky, tak kovové vodovodní potrubí.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'met-1', type: 'met-hop', label: 'MET / HOP', x: 350, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'rcbo-1', type: 'rcbo-1p', label: 'RCBO B16', x: 230, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'sock-1', type: 'socket-230', label: 'Zásuvka 230V', x: 240, y: 350, state: 0 },
      { instanceId: 'pipe-1', type: 'water-pipe', label: 'Vodovodní potrubí', x: 480, y: 360, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'rcbo-1', toTerminalId: '1', color: 'L' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'rcbo-1', toTerminalId: 'N_in', color: 'N' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'met-1', toTerminalId: 'E1', color: 'PE' },
      { id: 'w4', fromInstanceId: 'rcbo-1', fromTerminalId: '2', toInstanceId: 'sock-1', toTerminalId: 'L', color: 'L' },
      { id: 'w5', fromInstanceId: 'rcbo-1', fromTerminalId: 'N_out', toInstanceId: 'sock-1', toTerminalId: 'N', color: 'N' },
      { id: 'w6', fromInstanceId: 'met-1', fromTerminalId: 'E2', toInstanceId: 'sock-1', toTerminalId: 'PE', color: 'PE' },
      { id: 'w7', fromInstanceId: 'met-1', fromTerminalId: 'E3', toInstanceId: 'pipe-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (_items, _wires, sim) => {
      const msgs: string[] = [];
      if (!sim.liveNodes.has('sock-1:L') || !sim.neutralNodes.has('sock-1:N')) {
        msgs.push('Zásuvka nemá napájení L + N z jističochrániče RCBO.');
      }
      if (!sim.peNodes.has('sock-1:PE')) msgs.push('Chybí PE na kolíku zásuvky.');
      if (!sim.peNodes.has('pipe-1:PE')) msgs.push('Kovové potrubí vody není pospojováno se svorkovnicí MET!');
      return { ok: msgs.length === 0 && !sim.shortCircuit, messages: msgs };
    },
  },

  // --------------------------------------------------------------------------
  // ÚROVEŇ 2 – POKROČILÁ (4 ÚLOHY)
  // --------------------------------------------------------------------------
  {
    id: 'u2-1',
    level: 2,
    number: 5,
    title: 'Schodišťové zapojení ze 2 míst (č. 6 + č. 6)',
    subtitle: 'Ovládání svítidla ze dvou konců chodby pomocí korespondenčních vodičů',
    assignment:
      'Zapojte dva schodišťové přepínače č. 6: fázi z jističe B10 přiveďte na svorku L prvního přepínače. Svorky 1–1 a 2–2 obou přepínačů propojte korespondenčními vodiči. Ze svorky L druhého přepínače veďte spínanou fázi na svítidlo E27.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'bus-n', type: 'busbar-n', label: 'Můstek N', x: 230, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'bus-pe', type: 'busbar-pe', label: 'Můstek PE', x: 430, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'mcb-1', type: 'mcb-b10', label: 'FA1 B10', x: 250, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'sw6-a', type: 'switch-6', label: 'Schodišťák A (č. 6)', x: 140, y: 340, state: 0 },
      { instanceId: 'sw6-b', type: 'switch-6', label: 'Schodišťák B (č. 6)', x: 340, y: 340, state: 0 },
      { instanceId: 'lamp-1', type: 'lamp-1', label: 'Svítidlo E27', x: 560, y: 340, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'mcb-1', toTerminalId: '1', color: 'L' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'bus-n', toTerminalId: 'N1', color: 'N' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'bus-pe', toTerminalId: 'PE1', color: 'PE' },
      { id: 'w4', fromInstanceId: 'mcb-1', fromTerminalId: '2', toInstanceId: 'sw6-a', toTerminalId: 'L', color: 'L' },
      { id: 'w5', fromInstanceId: 'sw6-a', fromTerminalId: '1', toInstanceId: 'sw6-b', toTerminalId: '1', color: 'SW1' },
      { id: 'w6', fromInstanceId: 'sw6-a', fromTerminalId: '2', toInstanceId: 'sw6-b', toTerminalId: '2', color: 'SW2' },
      { id: 'w7', fromInstanceId: 'sw6-b', fromTerminalId: 'L', toInstanceId: 'lamp-1', toTerminalId: 'L', color: 'SW1' },
      { id: 'w8', fromInstanceId: 'bus-n', fromTerminalId: 'N2', toInstanceId: 'lamp-1', toTerminalId: 'N', color: 'N' },
      { id: 'w9', fromInstanceId: 'bus-pe', fromTerminalId: 'PE2', toInstanceId: 'lamp-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (_items, _wires, sim) => {
      const msgs: string[] = [];
      if (!sim.liveNodes.has('lamp-1:L')) msgs.push('Svítidlo nesvítí – zkontrolujte korespondenční vodiče 1-1, 2-2 a polohu přepínačů.');
      if (!sim.neutralNodes.has('lamp-1:N')) msgs.push('Chybí vodič N na svítidle.');
      if (!sim.peNodes.has('lamp-1:PE')) msgs.push('Chybí ochranný vodič PE na svítidle.');
      return { ok: msgs.length === 0 && !sim.shortCircuit, messages: msgs };
    },
  },
  {
    id: 'u2-2',
    level: 2,
    number: 6,
    title: 'Impulzní relé KA ovládané 2 paralelními tlačítky',
    subtitle: 'Ovládání osvětlení z více míst s krokovým relé na DIN liště',
    assignment:
      'Zapojte impulzní relé KA: fázi z jističe B10 přiveďte na silový vstup relé (1) a na vstupy L obou tlačítek. Výstupy tlačítek (1) spojte na cívku relé A1, svorku A2 připojte na N. Výstup relé (2) napájí svítidlo E27.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'bus-n', type: 'busbar-n', label: 'Můstek N', x: 230, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'bus-pe', type: 'busbar-pe', label: 'Můstek PE', x: 430, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'mcb-1', type: 'mcb-b10', label: 'FA1 B10', x: 230, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'ka-1', type: 'relay-ka', label: 'Relé KA', x: 350, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'btn-1', type: 'pushbutton', label: 'Tlačítko 1', x: 140, y: 340, state: 0 },
      { instanceId: 'btn-2', type: 'pushbutton', label: 'Tlačítko 2', x: 300, y: 340, state: 0 },
      { instanceId: 'lamp-1', type: 'lamp-1', label: 'Svítidlo E27', x: 520, y: 340, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'mcb-1', toTerminalId: '1', color: 'L' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'bus-n', toTerminalId: 'N1', color: 'N' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'bus-pe', toTerminalId: 'PE1', color: 'PE' },
      { id: 'w4', fromInstanceId: 'mcb-1', fromTerminalId: '2', toInstanceId: 'ka-1', toTerminalId: '1', color: 'L' },
      { id: 'w5', fromInstanceId: 'mcb-1', fromTerminalId: '2', toInstanceId: 'btn-1', toTerminalId: 'L', color: 'L' },
      { id: 'w6', fromInstanceId: 'btn-1', fromTerminalId: 'L', toInstanceId: 'btn-2', toTerminalId: 'L', color: 'L' },
      { id: 'w7', fromInstanceId: 'btn-1', fromTerminalId: '1', toInstanceId: 'ka-1', toTerminalId: 'A1', color: 'SW1' },
      { id: 'w8', fromInstanceId: 'btn-2', fromTerminalId: '1', toInstanceId: 'ka-1', toTerminalId: 'A1', color: 'SW1' },
      { id: 'w9', fromInstanceId: 'bus-n', fromTerminalId: 'N2', toInstanceId: 'ka-1', toTerminalId: 'A2', color: 'N' },
      { id: 'w10', fromInstanceId: 'ka-1', fromTerminalId: '2', toInstanceId: 'lamp-1', toTerminalId: 'L', color: 'SW2' },
      { id: 'w11', fromInstanceId: 'bus-n', fromTerminalId: 'N3', toInstanceId: 'lamp-1', toTerminalId: 'N', color: 'N' },
      { id: 'w12', fromInstanceId: 'bus-pe', fromTerminalId: 'PE2', toInstanceId: 'lamp-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (_items, _wires, sim) => {
      const msgs: string[] = [];
      if (!sim.neutralNodes.has('ka-1:A2')) msgs.push('Cívka relé KA (svorka A2) nemá připojený vodič N.');
      if (!sim.liveNodes.has('lamp-1:L')) msgs.push('Svítidlo nesvítí – sepněte kontakt relé KA a ověřte přívod fáze na svorku 1.');
      if (!sim.neutralNodes.has('lamp-1:N') || !sim.peNodes.has('lamp-1:PE')) {
        msgs.push('Doplňte N a PE na svítidlo E27.');
      }
      return { ok: msgs.length === 0 && !sim.shortCircuit, messages: msgs };
    },
  },
  {
    id: 'u2-3',
    level: 2,
    number: 7,
    title: 'Elektrický bojler 230 V spínaný stykačem KM',
    subtitle: 'Silové spínání bojleru instalačním stykačem ovládaným spínačem HDO / termostatem',
    assignment:
      'Zapojte elektrický bojler 230 V přes stykač KM: silovou fázi z jističe B16 přiveďte na kontakt 1 stykače a z výstupu 2 na bojler (L). Ovládací fázi z jističe B10 veďte přes spínač č. 1 (simulace HDO) na cívku stykače A1. Svorku A2 cívky i N bojleru připojte na můstek N, kostru bojleru na PE.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'bus-n', type: 'busbar-n', label: 'Můstek N', x: 230, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'bus-pe', type: 'busbar-pe', label: 'Můstek PE', x: 430, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'mcb-16', type: 'mcb-b16', label: 'FA1 B16 (bojler)', x: 210, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'mcb-10', type: 'mcb-b10', label: 'FA2 B10 (ovl.)', x: 290, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'km-1', type: 'contactor-km', label: 'Stykač KM', x: 380, y: DIN_RAIL_ITEM_Y, state: 0 },
      { instanceId: 'sw-hdo', type: 'switch-1', label: 'Spínač HDO', x: 180, y: 340, state: 1 },
      { instanceId: 'boiler-1', type: 'boiler-1f', label: 'Bojler 230 V', x: 450, y: 340, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'mcb-16', toTerminalId: '1', color: 'L' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'mcb-10', toTerminalId: '1', color: 'L' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'bus-n', toTerminalId: 'N1', color: 'N' },
      { id: 'w4', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'bus-pe', toTerminalId: 'PE1', color: 'PE' },
      { id: 'w5', fromInstanceId: 'mcb-16', fromTerminalId: '2', toInstanceId: 'km-1', toTerminalId: '1', color: 'L' },
      { id: 'w6', fromInstanceId: 'km-1', fromTerminalId: '2', toInstanceId: 'boiler-1', toTerminalId: 'L', color: 'L' },
      { id: 'w7', fromInstanceId: 'mcb-10', fromTerminalId: '2', toInstanceId: 'sw-hdo', toTerminalId: 'L', color: 'L' },
      { id: 'w8', fromInstanceId: 'sw-hdo', fromTerminalId: '1', toInstanceId: 'km-1', toTerminalId: 'A1', color: 'SW2' },
      { id: 'w9', fromInstanceId: 'bus-n', fromTerminalId: 'N2', toInstanceId: 'km-1', toTerminalId: 'A2', color: 'N' },
      { id: 'w10', fromInstanceId: 'bus-n', fromTerminalId: 'N3', toInstanceId: 'boiler-1', toTerminalId: 'N', color: 'N' },
      { id: 'w11', fromInstanceId: 'bus-pe', fromTerminalId: 'PE2', toInstanceId: 'boiler-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (_items, _wires, sim) => {
      const msgs: string[] = [];
      if (!sim.energizedContactors.has('km-1')) {
        msgs.push('Cívka stykače KM (A1–A2) není pod napětím – zkontrolujte ovládací obvod přes spínač HDO a vodič N na A2.');
      }
      if (!sim.liveNodes.has('boiler-1:L')) msgs.push('Bojler nemá fázi L ze silového kontaktu 2 stykače KM.');
      if (!sim.neutralNodes.has('boiler-1:N')) msgs.push('Chybí vodič N na bojleru.');
      if (!sim.peNodes.has('boiler-1:PE')) msgs.push('Chybí ochranný vodič PE na bojleru.');
      return { ok: msgs.length === 0 && !sim.shortCircuit, messages: msgs };
    },
  },
  {
    id: 'u2-4',
    level: 2,
    number: 8,
    title: 'Chránič přepětí SPD 3P+N a hlavní pospojování',
    subtitle: 'Ochrana třífázového rozvaděče proti přepětí a pospojování MET',
    assignment:
      'Připojte třífázový svodič přepětí SPD T1+T2: ze sítě přiveďte L1, L2, L3 na svorky L1, L2, L3 svodiče a vodič N přes můstek N na svorku N svodiče. Spodní zemnicí svorku PE svodiče i vodovodní potrubí připojte do hlavní ochranné přípojnice MET/HOP.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'bus-n', type: 'busbar-n', label: 'Můstek N', x: 230, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'met-1', type: 'met-hop', label: 'MET / HOP', x: 430, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'spd-1', type: 'spd-t2', label: 'SPD T1+T2 3P+N', x: 260, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'pipe-1', type: 'water-pipe', label: 'Vodovodní potrubí', x: 380, y: 350, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'spd-1', toTerminalId: 'L1', color: 'L' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'L2', toInstanceId: 'spd-1', toTerminalId: 'L2', color: 'L' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'L3', toInstanceId: 'spd-1', toTerminalId: 'L3', color: 'L' },
      { id: 'w4', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'bus-n', toTerminalId: 'N1', color: 'N' },
      { id: 'w5', fromInstanceId: 'bus-n', fromTerminalId: 'N2', toInstanceId: 'spd-1', toTerminalId: 'N', color: 'N' },
      { id: 'w6', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'met-1', toTerminalId: 'E1', color: 'PE' },
      { id: 'w7', fromInstanceId: 'spd-1', fromTerminalId: 'PE', toInstanceId: 'met-1', toTerminalId: 'E4', color: 'PE' },
      { id: 'w8', fromInstanceId: 'met-1', fromTerminalId: 'E3', toInstanceId: 'pipe-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (_items, _wires, sim) => {
      const msgs: string[] = [];
      if (
        !sim.liveNodes.has('spd-1:L1') ||
        !sim.liveNodes.has('spd-1:L2') ||
        !sim.liveNodes.has('spd-1:L3')
      ) {
        msgs.push('Svodič přepětí SPD musí mít připojené všechny 3 fáze (L1, L2, L3).');
      }
      if (!sim.neutralNodes.has('spd-1:N')) msgs.push('Chybí připojený vodič N na svodiči přepětí SPD.');
      if (!sim.peNodes.has('spd-1:PE')) msgs.push('Svodič přepětí SPD není uzemněn na svorkovnici MET/HOP!');
      if (!sim.peNodes.has('pipe-1:PE')) msgs.push('Chybí pospojování vodovodního potrubí s MET/HOP.');
      return { ok: msgs.length === 0 && !sim.shortCircuit, messages: msgs };
    },
  },

  // --------------------------------------------------------------------------
  // ÚROVEŇ 3 – MISTROVSKÁ / 3FÁZOVÁ (4 ÚLOHY)
  // --------------------------------------------------------------------------
  {
    id: 'u3-1',
    level: 3,
    number: 9,
    title: 'Křížové zapojení ze 3 míst (6 – 7 – 6)',
    subtitle: 'Kompletní ovládání osvětlení ze tří míst pomocí křížového přepínače č. 7',
    assignment:
      'Zapojte ovládání svítidla ze 3 míst: fázi z jističe B10 přiveďte na L prvního schodišťáku č. 6. Jeho vývody 1 a 2 veďte na vstupy 1 a 2 křížového přepínače č. 7. Výstupy 3 a 4 křížového přepínače veďte na 1 a 2 druhého schodišťáku č. 6 a jeho svorku L připojte na svítidlo E27.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'bus-n', type: 'busbar-n', label: 'Můstek N', x: 230, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'bus-pe', type: 'busbar-pe', label: 'Můstek PE', x: 430, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'mcb-1', type: 'mcb-b10', label: 'FA1 B10', x: 250, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'sw6-a', type: 'switch-6', label: 'Schodišťák A (6)', x: 80, y: 340, state: 0 },
      { instanceId: 'sw7-m', type: 'switch-7', label: 'Křížový (7)', x: 260, y: 340, state: 0 },
      { instanceId: 'sw6-b', type: 'switch-6', label: 'Schodišťák B (6)', x: 440, y: 340, state: 0 },
      { instanceId: 'lamp-1', type: 'lamp-1', label: 'Svítidlo E27', x: 630, y: 340, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'mcb-1', toTerminalId: '1', color: 'L' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'bus-n', toTerminalId: 'N1', color: 'N' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'bus-pe', toTerminalId: 'PE1', color: 'PE' },
      { id: 'w4', fromInstanceId: 'mcb-1', fromTerminalId: '2', toInstanceId: 'sw6-a', toTerminalId: 'L', color: 'L' },
      { id: 'w5', fromInstanceId: 'sw6-a', fromTerminalId: '1', toInstanceId: 'sw7-m', toTerminalId: '1', color: 'SW1' },
      { id: 'w6', fromInstanceId: 'sw6-a', fromTerminalId: '2', toInstanceId: 'sw7-m', toTerminalId: '2', color: 'SW2' },
      { id: 'w7', fromInstanceId: 'sw7-m', fromTerminalId: '3', toInstanceId: 'sw6-b', toTerminalId: '1', color: 'SW1' },
      { id: 'w8', fromInstanceId: 'sw7-m', fromTerminalId: '4', toInstanceId: 'sw6-b', toTerminalId: '2', color: 'SW2' },
      { id: 'w9', fromInstanceId: 'sw6-b', fromTerminalId: 'L', toInstanceId: 'lamp-1', toTerminalId: 'L', color: 'SW1' },
      { id: 'w10', fromInstanceId: 'bus-n', fromTerminalId: 'N2', toInstanceId: 'lamp-1', toTerminalId: 'N', color: 'N' },
      { id: 'w11', fromInstanceId: 'bus-pe', fromTerminalId: 'PE2', toInstanceId: 'lamp-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (_items, _wires, sim) => {
      const msgs: string[] = [];
      if (!sim.liveNodes.has('lamp-1:L')) {
        msgs.push('Svítidlo nesvítí – zkontrolujte propojení 6 -> 7 -> 6 a sepněte přepínače do průchozí polohy.');
      }
      if (!sim.neutralNodes.has('lamp-1:N')) msgs.push('Chybí vodič N na svítidle.');
      if (!sim.peNodes.has('lamp-1:PE')) msgs.push('Chybí vodič PE na svítidle.');
      return { ok: msgs.length === 0 && !sim.shortCircuit, messages: msgs };
    },
  },
  {
    id: 'u3-2',
    level: 3,
    number: 10,
    title: 'Třífázová zásuvka 400 V (5P) přes 4P chránič a 3P jistič',
    subtitle: 'Jištění a ochrana třífázové pětipólové zásuvky 400 V / 16 A',
    assignment:
      'Zapojte 3fázovou zásuvku 400 V: L1, L2, L3 a N ze sítě přiveďte do 4pólového chrániče RCD 4P (1, 3, 5, N). Fázové výstupy (2, 4, 6) veďte přes 3pólový jistič FA 3P B16 na svorky L1, L2, L3 zásuvky 400 V. Nulový výstup N z RCD přiveďte na N zásuvky, PE z můstku PE.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'bus-pe', type: 'busbar-pe', label: 'Můstek PE', x: 350, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'rcd-4p', type: 'rcd-4p', label: 'RCD 4P 30mA', x: 210, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'mcb-3p', type: 'mcb-3p', label: 'FA 3P B16', x: 360, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'sock-400', type: 'socket-400', label: 'Zásuvka 400V 5P', x: 300, y: 350, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'rcd-4p', toTerminalId: '1', color: 'L' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'L2', toInstanceId: 'rcd-4p', toTerminalId: '3', color: 'L' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'L3', toInstanceId: 'rcd-4p', toTerminalId: '5', color: 'L' },
      { id: 'w4', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'rcd-4p', toTerminalId: 'N_in', color: 'N' },
      { id: 'w5', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'bus-pe', toTerminalId: 'PE1', color: 'PE' },
      { id: 'w6', fromInstanceId: 'rcd-4p', fromTerminalId: '2', toInstanceId: 'mcb-3p', toTerminalId: '1', color: 'L' },
      { id: 'w7', fromInstanceId: 'rcd-4p', fromTerminalId: '4', toInstanceId: 'mcb-3p', toTerminalId: '3', color: 'L' },
      { id: 'w8', fromInstanceId: 'rcd-4p', fromTerminalId: '6', toInstanceId: 'mcb-3p', toTerminalId: '5', color: 'L' },
      { id: 'w9', fromInstanceId: 'mcb-3p', fromTerminalId: '2', toInstanceId: 'sock-400', toTerminalId: 'L1', color: 'L' },
      { id: 'w10', fromInstanceId: 'mcb-3p', fromTerminalId: '4', toInstanceId: 'sock-400', toTerminalId: 'L2', color: 'L' },
      { id: 'w11', fromInstanceId: 'mcb-3p', fromTerminalId: '6', toInstanceId: 'sock-400', toTerminalId: 'L3', color: 'L' },
      { id: 'w12', fromInstanceId: 'rcd-4p', fromTerminalId: 'N_out', toInstanceId: 'sock-400', toTerminalId: 'N', color: 'N' },
      { id: 'w13', fromInstanceId: 'bus-pe', fromTerminalId: 'PE2', toInstanceId: 'sock-400', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (_items, _wires, sim) => {
      const msgs: string[] = [];
      const p1 = sim.nodePhases.get('sock-400:L1')?.has('L1');
      const p2 = sim.nodePhases.get('sock-400:L2')?.has('L2');
      const p3 = sim.nodePhases.get('sock-400:L3')?.has('L3');
      if (!p1 || !p2 || !p3) {
        msgs.push('Zásuvka 400 V musí mít na svorkách L1, L2, L3 všechny tři fáze L1, L2, L3.');
      }
      if (!sim.neutralNodes.has('sock-400:N')) msgs.push('Chybí vodič N na 3f zásuvce.');
      if (!sim.peNodes.has('sock-400:PE')) msgs.push('Chybí ochranný vodič PE na 3f zásuvce.');
      return { ok: msgs.length === 0 && !sim.shortCircuit, messages: msgs };
    },
  },
  {
    id: 'u3-3',
    level: 3,
    number: 11,
    title: 'Třífázová elektrická kamna (400 V) spínaná stykačem KM',
    subtitle: 'Třífázový tepelný spotřebič spínaný 3pólovým stykačem na DIN liště',
    assignment:
      'Zapojte 3fázová elektrická kamna 400 V: fáze L1, L2, L3 veďte přes 3P jistič B16 na vstupy 1, 3, 5 stykače KM a z výstupů 2, 4, 6 na svorky L1, L2, L3 kamen. Ovládací obvod cívky A1 veďte z jističe B10 přes spínač č. 1 (termostat). Doplňte N (na A2 i kamna) a PE.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'bus-n', type: 'busbar-n', label: 'Můstek N', x: 230, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'bus-pe', type: 'busbar-pe', label: 'Můstek PE', x: 430, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'mcb-3p', type: 'mcb-3p', label: 'FA1 3P B16', x: 200, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'mcb-10', type: 'mcb-b10', label: 'FA2 B10', x: 310, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'km-1', type: 'contactor-km', label: 'Stykač KM 3P', x: 400, y: DIN_RAIL_ITEM_Y, state: 0 },
      { instanceId: 'sw-term', type: 'switch-1', label: 'Termostat', x: 180, y: 350, state: 1 },
      { instanceId: 'stove-1', type: 'stove-3f', label: 'Kamna 400V 3F', x: 430, y: 350, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'mcb-3p', toTerminalId: '1', color: 'L' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'L2', toInstanceId: 'mcb-3p', toTerminalId: '3', color: 'L' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'L3', toInstanceId: 'mcb-3p', toTerminalId: '5', color: 'L' },
      { id: 'w4', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'mcb-10', toTerminalId: '1', color: 'L' },
      { id: 'w5', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'bus-n', toTerminalId: 'N1', color: 'N' },
      { id: 'w6', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'bus-pe', toTerminalId: 'PE1', color: 'PE' },
      { id: 'w7', fromInstanceId: 'mcb-3p', fromTerminalId: '2', toInstanceId: 'km-1', toTerminalId: '1', color: 'L' },
      { id: 'w8', fromInstanceId: 'mcb-3p', fromTerminalId: '4', toInstanceId: 'km-1', toTerminalId: '3', color: 'L' },
      { id: 'w9', fromInstanceId: 'mcb-3p', fromTerminalId: '6', toInstanceId: 'km-1', toTerminalId: '5', color: 'L' },
      { id: 'w10', fromInstanceId: 'km-1', fromTerminalId: '2', toInstanceId: 'stove-1', toTerminalId: 'L1', color: 'L' },
      { id: 'w11', fromInstanceId: 'km-1', fromTerminalId: '4', toInstanceId: 'stove-1', toTerminalId: 'L2', color: 'L' },
      { id: 'w12', fromInstanceId: 'km-1', fromTerminalId: '6', toInstanceId: 'stove-1', toTerminalId: 'L3', color: 'L' },
      { id: 'w13', fromInstanceId: 'mcb-10', fromTerminalId: '2', toInstanceId: 'sw-term', toTerminalId: 'L', color: 'L' },
      { id: 'w14', fromInstanceId: 'sw-term', fromTerminalId: '1', toInstanceId: 'km-1', toTerminalId: 'A1', color: 'SW2' },
      { id: 'w15', fromInstanceId: 'bus-n', fromTerminalId: 'N2', toInstanceId: 'km-1', toTerminalId: 'A2', color: 'N' },
      { id: 'w16', fromInstanceId: 'bus-n', fromTerminalId: 'N3', toInstanceId: 'stove-1', toTerminalId: 'N', color: 'N' },
      { id: 'w17', fromInstanceId: 'bus-pe', fromTerminalId: 'PE2', toInstanceId: 'stove-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (_items, _wires, sim) => {
      const msgs: string[] = [];
      if (!sim.energizedContactors.has('km-1')) {
        msgs.push('Cívka stykače KM není sepnutá (zkontrolujte A1 a A2).');
      }
      const p1 = sim.nodePhases.get('stove-1:L1')?.has('L1');
      const p2 = sim.nodePhases.get('stove-1:L2')?.has('L2');
      const p3 = sim.nodePhases.get('stove-1:L3')?.has('L3');
      if (!p1 || !p2 || !p3) {
        msgs.push('Elektrická kamna nemají přivedeny všechny 3 fáze L1, L2, L3 přes stykač KM.');
      }
      if (!sim.neutralNodes.has('stove-1:N')) msgs.push('Chybí vodič N na elektrických kamnech.');
      if (!sim.peNodes.has('stove-1:PE')) msgs.push('Chybí ochranný vodič PE na elektrických kamnech.');
      return { ok: msgs.length === 0 && !sim.shortCircuit, messages: msgs };
    },
  },
  {
    id: 'u3-4',
    level: 3,
    number: 12,
    title: 'Kompletní 3f rozvaděč: Hlavní vypínač, SPD, RCBO a bojler',
    subtitle: 'Souhrnná zkoušková úloha rozvaděče s přepěťovou ochranou a jističochráničem',
    assignment:
      'Zapojte rozvaděč: L1, L2, L3 ze sítě přiveďte přes hlavní vypínač 3P (1,3,5 -> 2,4,6) na svodič přepětí SPD (L1, L2, L3). Fázi z výstupu hlavního vypínače (2) a N z můstku N přiveďte do jističochrániče RCBO (1, N), který napájí bojler 230 V. Nezapomeňte uzemnit SPD i bojler přes MET.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'bus-n', type: 'busbar-n', label: 'Můstek N', x: 230, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'met-1', type: 'met-hop', label: 'MET / HOP', x: 430, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'qm-1', type: 'qm-3p', label: 'QM Hlavní vyp.', x: 190, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'spd-1', type: 'spd-t2', label: 'SPD 3P+N', x: 300, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'rcbo-1', type: 'rcbo-1p', label: 'RCBO B16', x: 440, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'boiler-1', type: 'boiler-1f', label: 'Bojler 230 V', x: 360, y: 350, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'qm-1', toTerminalId: '1', color: 'L' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'L2', toInstanceId: 'qm-1', toTerminalId: '3', color: 'L' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'L3', toInstanceId: 'qm-1', toTerminalId: '5', color: 'L' },
      { id: 'w4', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'bus-n', toTerminalId: 'N1', color: 'N' },
      { id: 'w5', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'met-1', toTerminalId: 'E1', color: 'PE' },
      { id: 'w6', fromInstanceId: 'qm-1', fromTerminalId: '2', toInstanceId: 'spd-1', toTerminalId: 'L1', color: 'L' },
      { id: 'w7', fromInstanceId: 'qm-1', fromTerminalId: '4', toInstanceId: 'spd-1', toTerminalId: 'L2', color: 'L' },
      { id: 'w8', fromInstanceId: 'qm-1', fromTerminalId: '6', toInstanceId: 'spd-1', toTerminalId: 'L3', color: 'L' },
      { id: 'w9', fromInstanceId: 'bus-n', fromTerminalId: 'N2', toInstanceId: 'spd-1', toTerminalId: 'N', color: 'N' },
      { id: 'w10', fromInstanceId: 'spd-1', fromTerminalId: 'PE', toInstanceId: 'met-1', toTerminalId: 'E4', color: 'PE' },
      { id: 'w11', fromInstanceId: 'qm-1', fromTerminalId: '2', toInstanceId: 'rcbo-1', toTerminalId: '1', color: 'L' },
      { id: 'w12', fromInstanceId: 'bus-n', fromTerminalId: 'N3', toInstanceId: 'rcbo-1', toTerminalId: 'N_in', color: 'N' },
      { id: 'w13', fromInstanceId: 'rcbo-1', fromTerminalId: '2', toInstanceId: 'boiler-1', toTerminalId: 'L', color: 'L' },
      { id: 'w14', fromInstanceId: 'rcbo-1', fromTerminalId: 'N_out', toInstanceId: 'boiler-1', toTerminalId: 'N', color: 'N' },
      { id: 'w15', fromInstanceId: 'met-1', fromTerminalId: 'E2', toInstanceId: 'boiler-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (_items, _wires, sim) => {
      const msgs: string[] = [];
      if (
        !sim.liveNodes.has('spd-1:L1') ||
        !sim.liveNodes.has('spd-1:L2') ||
        !sim.liveNodes.has('spd-1:L3') ||
        !sim.neutralNodes.has('spd-1:N') ||
        !sim.peNodes.has('spd-1:PE')
      ) {
        msgs.push('Svodič přepětí SPD nemá kompletně zapojené L1, L2, L3, N nebo PE.');
      }
      if (!sim.liveNodes.has('boiler-1:L') || !sim.neutralNodes.has('boiler-1:N')) {
        msgs.push('Bojler není pod napětím z jističochrániče RCBO.');
      }
      if (!sim.peNodes.has('boiler-1:PE')) msgs.push('Chybí ochranný vodič PE na bojleru.');
      return { ok: msgs.length === 0 && !sim.shortCircuit, messages: msgs };
    },
  },
];

// ============================================================================
// ŽIVÝ ELEKTRO-SOLVER (3F L1/L2/L3, N, PE + AUTOMATICKÉ SPÍNÁNÍ CÍVKY STYKAČE)
// ============================================================================

function simulateCircuit(items: PlacedItem[], wires: BoardWire[]): SimulationResult {
  const buildGraph = (energizedContactors: Set<string>) => {
    const adj = new Map<string, Set<string>>();
    const addEdge = (a: string, b: string) => {
      if (!adj.has(a)) adj.set(a, new Set());
      if (!adj.has(b)) adj.set(b, new Set());
      adj.get(a)!.add(b);
      adj.get(b)!.add(a);
    };

    for (const w of wires) {
      addEdge(`${w.fromInstanceId}:${w.fromTerminalId}`, `${w.toInstanceId}:${w.toTerminalId}`);
    }

    for (const item of items) {
      const id = item.instanceId;
      switch (item.type) {
        case 'busbar-n':
          ['N1', 'N2', 'N3', 'N4', 'N5'].forEach((t) => addEdge(`${id}:N1`, `${id}:${t}`));
          break;
        case 'busbar-pe':
          ['PE1', 'PE2', 'PE3', 'PE4', 'PE5'].forEach((t) => addEdge(`${id}:PE1`, `${id}:${t}`));
          break;
        case 'met-hop':
          ['E1', 'E2', 'E3', 'E4'].forEach((t) => addEdge(`${id}:E1`, `${id}:${t}`));
          break;
        case 'wago-box':
          addEdge(`${id}:A1`, `${id}:A2`);
          addEdge(`${id}:A1`, `${id}:A3`);
          addEdge(`${id}:B1`, `${id}:B2`);
          addEdge(`${id}:B1`, `${id}:B3`);
          addEdge(`${id}:C1`, `${id}:C2`);
          addEdge(`${id}:C1`, `${id}:C3`);
          break;
        case 'mcb-b10':
        case 'mcb-b16':
          if (item.state === 1) addEdge(`${id}:1`, `${id}:2`);
          break;
        case 'qm-3p':
        case 'mcb-3p':
          if (item.state === 1) {
            addEdge(`${id}:1`, `${id}:2`);
            addEdge(`${id}:3`, `${id}:4`);
            addEdge(`${id}:5`, `${id}:6`);
          }
          break;
        case 'rcd-2p':
        case 'rcbo-1p':
          if (item.state === 1) {
            addEdge(`${id}:1`, `${id}:2`);
            addEdge(`${id}:N_in`, `${id}:N_out`);
          }
          break;
        case 'rcd-4p':
          if (item.state === 1) {
            addEdge(`${id}:1`, `${id}:2`);
            addEdge(`${id}:3`, `${id}:4`);
            addEdge(`${id}:5`, `${id}:6`);
            addEdge(`${id}:N_in`, `${id}:N_out`);
          }
          break;
        case 'contactor-km':
          if (item.state === 1 || energizedContactors.has(id)) {
            addEdge(`${id}:1`, `${id}:2`);
            addEdge(`${id}:3`, `${id}:4`);
            addEdge(`${id}:5`, `${id}:6`);
          }
          break;
        case 'relay-ka':
          if (item.state === 1) addEdge(`${id}:1`, `${id}:2`);
          break;
        case 'switch-1':
        case 'pushbutton':
          if (item.state === 1) addEdge(`${id}:L`, `${id}:1`);
          break;
        case 'switch-5':
          if (item.state === 1 || item.state === 3) addEdge(`${id}:L`, `${id}:1`);
          if (item.state === 2 || item.state === 3) addEdge(`${id}:L`, `${id}:2`);
          break;
        case 'switch-6':
          if (item.state === 0) addEdge(`${id}:L`, `${id}:1`);
          else addEdge(`${id}:L`, `${id}:2`);
          break;
        case 'switch-7':
          if (item.state === 0) {
            addEdge(`${id}:1`, `${id}:3`);
            addEdge(`${id}:2`, `${id}:4`);
          } else {
            addEdge(`${id}:1`, `${id}:4`);
            addEdge(`${id}:2`, `${id}:3`);
          }
          break;
      }
    }

    const bfs = (startNodes: string[]): Set<string> => {
      const visited = new Set<string>();
      const queue: string[] = [];
      for (const s of startNodes) {
        visited.add(s);
        queue.push(s);
      }
      while (queue.length > 0) {
        const cur = queue.shift()!;
        const neighbors = adj.get(cur);
        if (!neighbors) continue;
        for (const nxt of neighbors) {
          if (!visited.has(nxt)) {
            visited.add(nxt);
            queue.push(nxt);
          }
        }
      }
      return visited;
    };

    return { bfs };
  };

  const supplies = items.filter((i) => i.type === 'supply' && i.state === 1);
  const l1Starts = supplies.map((s) => `${s.instanceId}:L1`);
  const l2Starts = supplies.map((s) => `${s.instanceId}:L2`);
  const l3Starts = supplies.map((s) => `${s.instanceId}:L3`);
  const nStarts = supplies.map((s) => `${s.instanceId}:N`);
  const peStarts = supplies.map((s) => `${s.instanceId}:PE`);

  // První průchod – vyhodnocení cívek stykačů A1–A2
  const energizedContactors = new Set<string>();
  const pass1 = buildGraph(energizedContactors);
  const pass1Live = pass1.bfs([...l1Starts, ...l2Starts, ...l3Starts]);
  const pass1Neutral = pass1.bfs(nStarts);

  for (const item of items) {
    if (item.type === 'contactor-km') {
      const a1 = `${item.instanceId}:A1`;
      const a2 = `${item.instanceId}:A2`;
      if (
        (pass1Live.has(a1) && pass1Neutral.has(a2)) ||
        (pass1Live.has(a2) && pass1Neutral.has(a1))
      ) {
        energizedContactors.add(item.instanceId);
      }
    }
  }

  // Druhý průchod se sepnutými stykači
  const pass2 = buildGraph(energizedContactors);
  const l1Nodes = pass2.bfs(l1Starts);
  const l2Nodes = pass2.bfs(l2Starts);
  const l3Nodes = pass2.bfs(l3Starts);
  const neutralNodes = pass2.bfs(nStarts);
  const peNodes = pass2.bfs(peStarts);

  const liveNodes = new Set<string>([...l1Nodes, ...l2Nodes, ...l3Nodes]);
  const nodePhases = new Map<string, Set<'L1' | 'L2' | 'L3'>>();

  for (const n of l1Nodes) {
    if (!nodePhases.has(n)) nodePhases.set(n, new Set());
    nodePhases.get(n)!.add('L1');
  }
  for (const n of l2Nodes) {
    if (!nodePhases.has(n)) nodePhases.set(n, new Set());
    nodePhases.get(n)!.add('L2');
  }
  for (const n of l3Nodes) {
    if (!nodePhases.has(n)) nodePhases.set(n, new Set());
    nodePhases.get(n)!.add('L3');
  }

  let shortCircuit = false;
  let rcdTripped = false;
  const diagnostics: string[] = [];

  for (const node of liveNodes) {
    if (neutralNodes.has(node)) {
      shortCircuit = true;
      diagnostics.push('ZKRAT L + N! Fázový vodič je přímo spojen se středním vodičem N.');
      break;
    }
    if (peNodes.has(node)) {
      shortCircuit = true;
      rcdTripped = true;
      diagnostics.push('ZEMNÍ PORUCHA L + PE! Fáze je spojena s ochranným vodičem PE.');
      break;
    }
    const phases = nodePhases.get(node);
    if (phases && phases.size > 1) {
      shortCircuit = true;
      diagnostics.push(
        `MEZIFÁZOVÝ ZKRAT (${Array.from(phases).join(' + ')})! Dvě různé fáze jsou spojeny dohromady.`
      );
      break;
    }
  }

  for (const node of neutralNodes) {
    if (peNodes.has(node)) {
      rcdTripped = true;
      diagnostics.push(
        'PROPOJENÍ N a PE! V síti TN-S nesmí být N a PE spojeny (okamžitě vybaví proudový chránič RCD).'
      );
      break;
    }
  }

  return {
    liveNodes,
    neutralNodes,
    peNodes,
    nodePhases,
    shortCircuit,
    rcdTripped,
    energizedContactors,
    diagnostics,
  };
}

// ============================================================================
// HLAVNÍ KOMPONENTA: INTERAKTIVNÍ MONTÁŽNÍ TABULE
// ============================================================================

export const InteractiveBoardEditor: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>(1);
  const [activeTaskId, setActiveTaskId] = useState<string>('u1-1');

  const initialTask = BOARD_TASKS[0];
  const [items, setItems] = useState<PlacedItem[]>(initialTask.items);
  const [wires, setWires] = useState<BoardWire[]>(initialTask.solutionWires);
  const [selectedWireColor, setSelectedWireColor] = useState<WireColor>('L');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [collisionWarning, setCollisionWarning] = useState<string | null>(null);
  const [taskFeedback, setTaskFeedback] = useState<{
    checked: boolean;
    ok: boolean;
    messages: string[];
  } | null>(null);

  const [pendingTerminal, setPendingTerminal] = useState<{
    instanceId: string;
    terminalId: string;
  } | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const [dragging, setDragging] = useState<{
    instanceId: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const activeTask = useMemo(
    () => BOARD_TASKS.find((t) => t.id === activeTaskId) || BOARD_TASKS[0],
    [activeTaskId]
  );

  const levelTasks = useMemo(
    () => BOARD_TASKS.filter((t) => t.level === selectedLevel),
    [selectedLevel]
  );

  const sim = useMemo(() => simulateCircuit(items, wires), [items, wires]);

  const wirePaths = useMemo(
    () => computeOrthogonalWirePaths(items, wires),
    [items, wires]
  );

  const getTerminalCoords = (instanceId: string, terminalId: string) => {
    const item = items.find((i) => i.instanceId === instanceId);
    if (!item) return null;
    const def = PALETTE_MAP[item.type];
    if (!def) return null;
    const term = def.terminals.find((t) => t.id === terminalId);
    if (!term) return null;
    return { x: item.x + term.relX, y: item.y + term.relY, term };
  };

  const getSvgCoords = (e: React.MouseEvent) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = BOARD_WIDTH / rect.width;
    const scaleY = BOARD_HEIGHT / rect.height;
    return {
      x: Math.round((e.clientX - rect.left) * scaleX),
      y: Math.round((e.clientY - rect.top) * scaleY),
    };
  };

  // Načtení úlohy (buď se zapojeným vzorem, nebo bez vodičů k samostatnému zapojení)
  const loadTask = (task: BoardTask, withSolutionWires: boolean) => {
    setActiveTaskId(task.id);
    setSelectedLevel(task.level);
    setItems(task.items.map((it) => ({ ...it })));
    setWires(withSolutionWires ? task.solutionWires.map((w) => ({ ...w })) : []);
    setPendingTerminal(null);
    setSelectedItemId(null);
    setTaskFeedback(null);
  };

  const handleCheckTask = () => {
    const res = activeTask.check(items, wires, sim);
    if (sim.shortCircuit || sim.rcdTripped) {
      setTaskFeedback({
        checked: true,
        ok: false,
        messages: [...sim.diagnostics, ...res.messages],
      });
    } else {
      setTaskFeedback({
        checked: true,
        ok: res.ok,
        messages: res.ok
          ? ['Výborně! Zapojení úlohy splňuje všechny požadavky a obvod funguje bez závad.']
          : res.messages,
      });
    }
  };

  // Přidání prvku z palety
  const addItemToBoard = (type: string) => {
    const def = PALETTE_MAP[type];
    if (!def || def.zone === 'fixed') return;

    const freePos = findFreePosition(type, items);
    if (!freePos) {
      setCollisionWarning('V této zóně již není volné místo bez překryvu.');
      setTimeout(() => setCollisionWarning(null), 3000);
      return;
    }

    const sameTypeCount = items.filter((i) => i.type === type).length + 1;
    const newItem: PlacedItem = {
      instanceId: `${type}-${Date.now().toString().slice(-4)}`,
      type,
      label: `${def.shortName} #${sameTypeCount}`,
      x: freePos.x,
      y: freePos.y,
      state:
        type.startsWith('mcb') ||
        type.startsWith('rcd') ||
        type === 'rcbo-1p' ||
        type === 'qm-3p'
          ? 1
          : 0,
    };
    setItems((prev) => [...prev, newItem]);
    setSelectedItemId(newItem.instanceId);
  };

  const removeSelectedItem = () => {
    if (!selectedItemId || selectedItemId === 'supply') return;
    setItems((prev) => prev.filter((i) => i.instanceId !== selectedItemId));
    setWires((prev) =>
      prev.filter(
        (w) => w.fromInstanceId !== selectedItemId && w.toInstanceId !== selectedItemId
      )
    );
    setSelectedItemId(null);
  };

  const toggleItemState = (instanceId: string) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.instanceId !== instanceId) return it;
        if (it.type === 'switch-5') {
          return { ...it, state: (it.state + 1) % 4 };
        }
        return { ...it, state: it.state === 0 ? 1 : 0 };
      })
    );
  };

  const startDragItem = (e: React.MouseEvent, item: PlacedItem) => {
    e.stopPropagation();
    setSelectedItemId(item.instanceId);
    const def = PALETTE_MAP[item.type];
    if (!def || def.zone === 'fixed') return;
    const coords = getSvgCoords(e);
    setDragging({
      instanceId: item.instanceId,
      offsetX: coords.x - item.x,
      offsetY: coords.y - item.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const coords = getSvgCoords(e);
    if (pendingTerminal) {
      setMousePos(coords);
    }
    if (!dragging) return;

    setItems((prev) =>
      prev.map((it) => {
        if (it.instanceId !== dragging.instanceId) return it;
        const def = PALETTE_MAP[it.type];
        if (!def) return it;

        const rawX = coords.x - dragging.offsetX;
        const rawY = coords.y - dragging.offsetY;

        let targetX = it.x;
        let targetY = it.y;

        if (def.zone === 'din') {
          targetX = Math.max(
            175,
            Math.min(BOARD_WIDTH - def.width - 20, Math.round(rawX / 10) * 10)
          );
          targetY = DIN_RAIL_ITEM_Y;
        } else if (def.zone === 'busbar') {
          targetX = Math.max(
            175,
            Math.min(BOARD_WIDTH - def.width - 20, Math.round(rawX / 10) * 10)
          );
          targetY = BUSBAR_ROW_Y;
        } else {
          targetX = Math.max(
            20,
            Math.min(BOARD_WIDTH - def.width - 20, Math.round(rawX / 10) * 10)
          );
          targetY = Math.max(
            WALL_ZONE_MIN_Y,
            Math.min(WALL_ZONE_MAX_Y, Math.round(rawY / 10) * 10)
          );
        }

        if (!hasCollision(it.instanceId, targetX, targetY, def.width, def.height, prev)) {
          return { ...it, x: targetX, y: targetY };
        }
        if (!hasCollision(it.instanceId, targetX, it.y, def.width, def.height, prev)) {
          return { ...it, x: targetX, y: it.y };
        }
        if (!hasCollision(it.instanceId, it.x, targetY, def.width, def.height, prev)) {
          return { ...it, x: it.x, y: targetY };
        }
        return it;
      })
    );
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleTerminalClick = (
    e: React.MouseEvent,
    instanceId: string,
    terminalId: string,
    hintColor?: WireColor
  ) => {
    e.stopPropagation();

    if (!pendingTerminal) {
      if (hintColor) setSelectedWireColor(hintColor);
      setPendingTerminal({ instanceId, terminalId });
      const c = getTerminalCoords(instanceId, terminalId);
      if (c) setMousePos({ x: c.x, y: c.y });
      return;
    }

    if (
      pendingTerminal.instanceId === instanceId &&
      pendingTerminal.terminalId === terminalId
    ) {
      setPendingTerminal(null);
      setMousePos(null);
      return;
    }

    const exists = wires.some(
      (w) =>
        (w.fromInstanceId === pendingTerminal.instanceId &&
          w.fromTerminalId === pendingTerminal.terminalId &&
          w.toInstanceId === instanceId &&
          w.toTerminalId === terminalId) ||
        (w.fromInstanceId === instanceId &&
          w.fromTerminalId === terminalId &&
          w.toInstanceId === pendingTerminal.instanceId &&
          w.toTerminalId === pendingTerminal.terminalId)
    );

    if (!exists) {
      const newWire: BoardWire = {
        id: `wire-${Date.now().toString().slice(-5)}`,
        fromInstanceId: pendingTerminal.instanceId,
        fromTerminalId: pendingTerminal.terminalId,
        toInstanceId: instanceId,
        toTerminalId: terminalId,
        color: selectedWireColor,
      };
      setWires((prev) => [...prev, newWire]);
    }

    setPendingTerminal(null);
    setMousePos(null);
    setTaskFeedback(null);
  };

  const removeWire = (wireId: string) => {
    setWires((prev) => prev.filter((w) => w.id !== wireId));
    setTaskFeedback(null);
  };

  return (
    <div className="space-y-4">
      {/* ====================================================================
          PANEL 3 ÚROVNÍ OBTÍŽNOSTI × 4 ÚLOHY (CELKEM 12 ÚLOH)
         ==================================================================== */}
      <div className="bg-slate-900/85 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
              Obtížnost:
            </span>
            {(
              [
                { level: 1 as DifficultyLevel, label: 'Úroveň 1: Základní (1–4)' },
                { level: 2 as DifficultyLevel, label: 'Úroveň 2: Pokročilá (5–8)' },
                { level: 3 as DifficultyLevel, label: 'Úroveň 3: Mistrovská / 3F (9–12)' },
              ]
            ).map((lvl) => (
              <button
                key={lvl.level}
                onClick={() => {
                  setSelectedLevel(lvl.level);
                  const first = BOARD_TASKS.find((t) => t.level === lvl.level);
                  if (first) loadTask(first, true);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  selectedLevel === lvl.level
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => loadTask(activeTask, false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition-all"
              title="Odpojí vodiče úlohy, abyste ji mohli zapojit sami"
            >
              <Unplug className="w-3.5 h-3.5" />
              Zapojit sám (odpojit vodiče)
            </button>
            <button
              onClick={() => loadTask(activeTask, true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/30 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              Vzorové řešení
            </button>
            <button
              onClick={handleCheckTask}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Ověřit zapojení
            </button>
          </div>
        </div>

        {/* Čtyři karty úloh v dané úrovni */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {levelTasks.map((task) => {
            const isSelected = task.id === activeTaskId;
            return (
              <button
                key={task.id}
                onClick={() => loadTask(task, true)}
                className={`text-left p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/50 text-white'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-amber-400">
                    Úloha {task.number}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-emerald-400">Aktivní</span>
                  )}
                </div>
                <div className="text-xs font-bold text-white leading-snug">{task.title}</div>
                <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                  {task.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Zadání aktivní úlohy + vyhodnocení */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-amber-400">
              Úloha {activeTask.number}: {activeTask.title}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{activeTask.assignment}</p>
          </div>

          {taskFeedback && (
            <div
              className={`shrink-0 px-3.5 py-2 rounded-xl border text-xs font-medium max-w-md ${
                taskFeedback.ok
                  ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/70 border-rose-500/40 text-rose-200'
              }`}
            >
              {taskFeedback.messages.map((m, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  {taskFeedback.ok ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <span>{m}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ====================================================================
          HORNÍ LIŠTA: VÝBĚR BARVY VODIČE + AKCE S TABULÍ
         ==================================================================== */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
            Vodič:
          </span>
          {(Object.keys(WIRE_COLORS) as WireColor[]).map((col) => {
            const c = WIRE_COLORS[col];
            const active = selectedWireColor === col;
            return (
              <button
                key={col}
                onClick={() => setSelectedWireColor(col)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  active
                    ? 'bg-slate-800 text-white border-amber-400 shadow-sm scale-[1.02]'
                    : 'bg-slate-950/70 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
                title={c.desc}
              >
                <span className={`w-3 h-3 rounded-full ${c.badgeBg}`} />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {selectedItemId && selectedItemId !== 'supply' && (
            <button
              onClick={removeSelectedItem}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Smazat vybraný modul
            </button>
          )}
          <button
            onClick={() => {
              setWires([]);
              setPendingTerminal(null);
              setTaskFeedback(null);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Odpojit všechny vodiče
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ==================================================================
            LEVÝ PANEL: PALETA PRVKŮ K PŘIDÁNÍ NA TABULI
           ================================================================== */}
        <div className="lg:col-span-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-4 max-h-[650px] overflow-y-auto">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              1. Sběrnice a můstky
            </h3>
            <div className="grid grid-cols-1 gap-1.5">
              {PALETTE_ITEMS.filter((p) => p.zone === 'busbar').map((item) => (
                <button
                  key={item.type}
                  onClick={() => addItemToBoard(item.type)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800/80 text-left transition-all group"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-slate-500">{item.description}</div>
                  </div>
                  <Plus className="w-4 h-4 text-slate-400 group-hover:text-amber-400 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
              2. Moduly na DIN lištu (1F / 3F)
            </h3>
            <div className="grid grid-cols-1 gap-1.5">
              {PALETTE_ITEMS.filter((p) => p.zone === 'din').map((item) => (
                <button
                  key={item.type}
                  onClick={() => addItemToBoard(item.type)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800/80 text-left transition-all group"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-200 group-hover:text-sky-300">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-slate-500">{item.description}</div>
                  </div>
                  <Plus className="w-4 h-4 text-slate-400 group-hover:text-sky-400 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              3. Spínače a spotřebiče (230/400 V)
            </h3>
            <div className="grid grid-cols-1 gap-1.5">
              {PALETTE_ITEMS.filter((p) => p.zone === 'wall').map((item) => (
                <button
                  key={item.type}
                  onClick={() => addItemToBoard(item.type)}
                  className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800/80 text-left transition-all group"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-300">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-slate-500">{item.description}</div>
                  </div>
                  <Plus className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ==================================================================
            PRAVÝ PANEL: INTERAKTIVNÍ SVG PLÁTNO MONTÁŽNÍ TABULE
           ================================================================== */}
        <div className="lg:col-span-9 space-y-3">
          {/* Diagnostická lišta */}
          <div
            className={`rounded-xl px-4 py-2.5 border flex flex-wrap items-center justify-between gap-2 ${
              sim.shortCircuit || sim.rcdTripped
                ? 'bg-rose-950/60 border-rose-500/40 text-rose-200'
                : 'bg-slate-900/90 border-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2 text-xs">
              {sim.shortCircuit || sim.rcdTripped ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="font-bold">{sim.diagnostics[0]}</span>
                </>
              ) : pendingTerminal ? (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                  <span>
                    Tažení vodiče z{' '}
                    <strong className="text-amber-300">
                      {pendingTerminal.instanceId}:{pendingTerminal.terminalId}
                    </strong>{' '}
                    — klikněte na cílovou svorku.
                  </span>
                </>
              ) : collisionWarning ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-amber-300 font-semibold">{collisionWarning}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Obvod bez zkratu • Prvků: <strong>{items.length}</strong> • Vodičů:{' '}
                    <strong>{wires.length}</strong>
                  </span>
                </>
              )}
            </div>
            <div className="text-[11px] text-slate-400">
              Kliknutím na <strong className="text-slate-200">ON/OFF</strong> přepínáte přístroj •
              Kliknutím na vodič jej odstraníte
            </div>
          </div>

          {/* SVG Montážní tabule */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${BOARD_WIDTH} ${BOARD_HEIGHT}`}
              className="w-full h-auto select-none"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onClick={() => {
                setPendingTerminal(null);
                setMousePos(null);
              }}
            >
              <defs>
                <pattern id="board-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="0.7"
                  />
                </pattern>
              </defs>

              <rect width={BOARD_WIDTH} height={BOARD_HEIGHT} fill="#090d16" />
              <rect width={BOARD_WIDTH} height={BOARD_HEIGHT} fill="url(#board-grid)" />

              {/* ============================================================
                  ZÓNA 1: ROZVADĚČ + DIN LIŠTA 35 mm
                 ============================================================ */}
              <rect
                x="12"
                y="12"
                width={BOARD_WIDTH - 24}
                height="220"
                rx="12"
                fill="#0f172a"
                fillOpacity="0.65"
                stroke="#334155"
                strokeDasharray="6 4"
              />
              <text
                x="24"
                y="26"
                fill="#64748b"
                fontSize="10"
                fontWeight="bold"
                letterSpacing="1"
              >
                ROZVADĚČ (MŮSTKY N / PE / MET + DIN LIŠTA 35 MM)
              </text>

              {/* Kovová DIN lišta TS 35 */}
              <g>
                <rect
                  x="165"
                  y="136"
                  width={BOARD_WIDTH - 190}
                  height="36"
                  rx="3"
                  fill="#334155"
                  stroke="#64748b"
                  strokeWidth="1.5"
                />
                <rect
                  x="165"
                  y="144"
                  width={BOARD_WIDTH - 190}
                  height="20"
                  fill="#1e293b"
                />
                {Array.from({ length: 14 }).map((_, idx) => (
                  <rect
                    key={idx}
                    x={185 + idx * 44}
                    y="149"
                    width="22"
                    height="10"
                    rx="5"
                    fill="#0f172a"
                    stroke="#475569"
                    strokeWidth="1"
                  />
                ))}
                <text
                  x={BOARD_WIDTH - 34}
                  y="130"
                  textAnchor="end"
                  fill="#64748b"
                  fontSize="9"
                  fontWeight="bold"
                >
                  DIN LIŠTA 35 mm
                </text>
              </g>

              {/* ============================================================
                  ZÓNA 2: MONTÁŽNÍ PANEL (KRABICE, SPÍNAČE, SPOTŘEBIČE)
                 ============================================================ */}
              <rect
                x="12"
                y="244"
                width={BOARD_WIDTH - 24}
                height={BOARD_HEIGHT - 256}
                rx="12"
                fill="#0f172a"
                fillOpacity="0.35"
                stroke="#1e293b"
              />
              <text
                x="24"
                y="264"
                fill="#64748b"
                fontSize="10"
                fontWeight="bold"
                letterSpacing="1"
              >
                MONTÁŽNÍ PANEL (ODBOČNÉ KRABICE, SPÍNAČE, ZÁSUVKY, SPOTŘEBIČE 230/400 V)
              </text>

              {/* ============================================================
                  VRSTVA VODIČŮ (POD MODULY, PRAVOÚHLÉ TRASY MIMO MODULY)
                 ============================================================ */}
              {wires.map((w) => {
                const d = wirePaths[w.id];
                if (!d) return null;

                const n1 = `${w.fromInstanceId}:${w.fromTerminalId}`;
                const n2 = `${w.toInstanceId}:${w.toTerminalId}`;
                const isLive = sim.liveNodes.has(n1) || sim.liveNodes.has(n2);
                const strokeColor = WIRE_COLORS[w.color].stroke;

                return (
                  <g
                    key={w.id}
                    className="cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeWire(w.id);
                    }}
                  >
                    <path
                      d={d}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {isLive && (
                      <path
                        d={d}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="6"
                        strokeOpacity="0.28"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                    <path
                      d={d}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:stroke-rose-400 transition-colors"
                    />
                  </g>
                );
              })}

              {/* Dočasný правоúhlý vodič při tažení */}
              {pendingTerminal &&
                mousePos &&
                (() => {
                  const start = getTerminalCoords(
                    pendingTerminal.instanceId,
                    pendingTerminal.terminalId
                  );
                  if (!start) return null;
                  const midY = Math.round((start.y + mousePos.y) / 2);
                  const previewD = `M ${start.x} ${start.y} L ${start.x} ${midY} L ${mousePos.x} ${midY} L ${mousePos.x} ${mousePos.y}`;
                  return (
                    <path
                      d={previewD}
                      fill="none"
                      stroke={WIRE_COLORS[selectedWireColor].stroke}
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                    />
                  );
                })()}

              {/* ============================================================
                  VYKRESLENÍ VŠECH PRVKŮ NA TABULI
                 ============================================================ */}
              {items.map((item) => {
                const def = PALETTE_MAP[item.type];
                if (!def) return null;
                const isSelected = selectedItemId === item.instanceId;

                const isLamp1Lit =
                  item.type === 'lamp-1' &&
                  sim.liveNodes.has(`${item.instanceId}:L`) &&
                  sim.neutralNodes.has(`${item.instanceId}:N`) &&
                  !sim.shortCircuit;

                const isLamp2Branch1Lit =
                  item.type === 'lamp-2' &&
                  sim.liveNodes.has(`${item.instanceId}:L1`) &&
                  sim.neutralNodes.has(`${item.instanceId}:N`) &&
                  !sim.shortCircuit;

                const isLamp2Branch2Lit =
                  item.type === 'lamp-2' &&
                  sim.liveNodes.has(`${item.instanceId}:L2`) &&
                  sim.neutralNodes.has(`${item.instanceId}:N`) &&
                  !sim.shortCircuit;

                const isSocketPowered =
                  item.type === 'socket-230' &&
                  sim.liveNodes.has(`${item.instanceId}:L`) &&
                  sim.neutralNodes.has(`${item.instanceId}:N`) &&
                  sim.peNodes.has(`${item.instanceId}:PE`) &&
                  !sim.shortCircuit;

                const isSocket400Powered =
                  item.type === 'socket-400' &&
                  sim.nodePhases.get(`${item.instanceId}:L1`)?.has('L1') &&
                  sim.nodePhases.get(`${item.instanceId}:L2`)?.has('L2') &&
                  sim.nodePhases.get(`${item.instanceId}:L3`)?.has('L3') &&
                  sim.neutralNodes.has(`${item.instanceId}:N`) &&
                  sim.peNodes.has(`${item.instanceId}:PE`) &&
                  !sim.shortCircuit;

                const isBoilerPowered =
                  item.type === 'boiler-1f' &&
                  sim.liveNodes.has(`${item.instanceId}:L`) &&
                  sim.neutralNodes.has(`${item.instanceId}:N`) &&
                  sim.peNodes.has(`${item.instanceId}:PE`) &&
                  !sim.shortCircuit;

                const isStovePowered =
                  item.type === 'stove-3f' &&
                  sim.nodePhases.get(`${item.instanceId}:L1`)?.has('L1') &&
                  sim.nodePhases.get(`${item.instanceId}:L2`)?.has('L2') &&
                  sim.nodePhases.get(`${item.instanceId}:L3`)?.has('L3') &&
                  sim.neutralNodes.has(`${item.instanceId}:N`) &&
                  sim.peNodes.has(`${item.instanceId}:PE`) &&
                  !sim.shortCircuit;

                const isContactorEnergized =
                  item.type === 'contactor-km' &&
                  (item.state === 1 || sim.energizedContactors.has(item.instanceId));

                return (
                  <g
                    key={item.instanceId}
                    transform={`translate(${item.x}, ${item.y})`}
                    onMouseDown={(e) => startDragItem(e, item)}
                    className={def.zone === 'fixed' ? 'cursor-default' : 'cursor-grab'}
                  >
                    {/* Tělo modulu */}
                    <rect
                      width={def.width}
                      height={def.height}
                      rx="8"
                      fill={
                        item.type === 'busbar-n'
                          ? '#1e3a8a'
                          : item.type === 'busbar-pe' || item.type === 'met-hop'
                          ? '#064e3b'
                          : item.type === 'supply'
                          ? '#1e293b'
                          : '#0f172a'
                      }
                      stroke={
                        isSelected
                          ? '#fbbf24'
                          : isLamp1Lit ||
                            isLamp2Branch1Lit ||
                            isLamp2Branch2Lit ||
                            isSocketPowered ||
                            isSocket400Powered ||
                            isBoilerPowered ||
                            isStovePowered ||
                            isContactorEnergized
                          ? '#10b981'
                          : '#475569'
                      }
                      strokeWidth={isSelected ? 2.5 : 1.5}
                    />

                    {/* Název prvku */}
                    <text
                      x={def.width / 2}
                      y={def.zone === 'busbar' ? 11 : 27}
                      textAnchor="middle"
                      fill="#e2e8f0"
                      fontSize="9.5"
                      fontWeight="bold"
                    >
                      {item.label}
                    </text>

                    {/* Speciální indikace pro žárovku 1-větvovou */}
                    {item.type === 'lamp-1' && (
                      <circle
                        cx={def.width / 2}
                        cy={46}
                        r="14"
                        fill={isLamp1Lit ? '#fde047' : '#1e293b'}
                        stroke={isLamp1Lit ? '#f59e0b' : '#475569'}
                        strokeWidth="2"
                      />
                    )}

                    {/* Speciální indikace pro lustr 2-větvový */}
                    {item.type === 'lamp-2' && (
                      <g>
                        <circle
                          cx={def.width / 2 - 16}
                          cy={46}
                          r="11"
                          fill={isLamp2Branch1Lit ? '#fde047' : '#1e293b'}
                          stroke={isLamp2Branch1Lit ? '#f59e0b' : '#475569'}
                          strokeWidth="2"
                        />
                        <circle
                          cx={def.width / 2 + 16}
                          cy={46}
                          r="11"
                          fill={isLamp2Branch2Lit ? '#fde047' : '#1e293b'}
                          stroke={isLamp2Branch2Lit ? '#f59e0b' : '#475569'}
                          strokeWidth="2"
                        />
                      </g>
                    )}

                    {/* Indikace zásuvky 230 V */}
                    {item.type === 'socket-230' && (
                      <text
                        x={def.width / 2}
                        y={48}
                        textAnchor="middle"
                        fill={isSocketPowered ? '#34d399' : '#64748b'}
                        fontSize="9"
                        fontWeight="bold"
                      >
                        {isSocketPowered ? '230 V OK' : 'BEZ NAPĚTÍ'}
                      </text>
                    )}

                    {/* Indikace 3f zásuvky 400 V */}
                    {item.type === 'socket-400' && (
                      <text
                        x={def.width / 2}
                        y={50}
                        textAnchor="middle"
                        fill={isSocket400Powered ? '#34d399' : '#64748b'}
                        fontSize="9"
                        fontWeight="bold"
                      >
                        {isSocket400Powered ? '3× 400 V OK' : 'CHYBÍ 3F+N+PE'}
                      </text>
                    )}

                    {/* Indikace bojleru 230 V */}
                    {item.type === 'boiler-1f' && (
                      <text
                        x={def.width / 2}
                        y={50}
                        textAnchor="middle"
                        fill={isBoilerPowered ? '#f97316' : '#64748b'}
                        fontSize="9"
                        fontWeight="bold"
                      >
                        {isBoilerPowered ? 'OHŘÍVÁ (2,2 kW)' : 'VYPNUTO'}
                      </text>
                    )}

                    {/* Indikace 3f elektrických kamen 400 V */}
                    {item.type === 'stove-3f' && (
                      <text
                        x={def.width / 2}
                        y={50}
                        textAnchor="middle"
                        fill={isStovePowered ? '#f97316' : '#64748b'}
                        fontSize="9"
                        fontWeight="bold"
                      >
                        {isStovePowered ? 'TOPÍ 3× 400 V' : 'VYPNUTO'}
                      </text>
                    )}

                    {/* Indikace stykače KM */}
                    {item.type === 'contactor-km' && (
                      <text
                        x={def.width / 2}
                        y={44}
                        textAnchor="middle"
                        fill={isContactorEnergized ? '#34d399' : '#94a3b8'}
                        fontSize="8.5"
                        fontWeight="bold"
                      >
                        {isContactorEnergized ? 'CÍVKA SEPNUTA' : 'CÍVKA VYPNUTA'}
                      </text>
                    )}

                    {/* Přepínací tlačítko ON/OFF pro spínače, jističe, chrániče, relé, stykač */}
                    {(item.type.startsWith('mcb') ||
                      item.type.startsWith('rcd') ||
                      item.type === 'rcbo-1p' ||
                      item.type === 'qm-3p' ||
                      item.type === 'contactor-km' ||
                      item.type.startsWith('switch') ||
                      item.type === 'pushbutton' ||
                      item.type === 'relay-ka' ||
                      item.type === 'supply') && (
                      <g
                        className="cursor-pointer"
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItemState(item.instanceId);
                        }}
                      >
                        <rect
                          x={def.width / 2 - 20}
                          y={def.height / 2 - 6}
                          width="40"
                          height="18"
                          rx="4"
                          fill={
                            item.state > 0 || isContactorEnergized ? '#10b981' : '#334155'
                          }
                          stroke="#0f172a"
                        />
                        <text
                          x={def.width / 2}
                          y={def.height / 2 + 6}
                          textAnchor="middle"
                          fill="#020617"
                          fontSize="8.5"
                          fontWeight="bold"
                        >
                          {item.type === 'switch-6' || item.type === 'switch-7'
                            ? item.state === 0
                              ? 'POL 1'
                              : 'POL 2'
                            : item.type === 'switch-5'
                            ? item.state === 0
                              ? '0 / 0'
                              : item.state === 1
                              ? '1 / 0'
                              : item.state === 2
                              ? '0 / 2'
                              : '1 + 2'
                            : item.state === 1 || isContactorEnergized
                            ? 'ZAP'
                            : 'VYP'}
                        </text>
                      </g>
                    )}

                    {/* Vykreslení svorek (terminálů) */}
                    {def.terminals.map((t) => {
                      const nodeKey = `${item.instanceId}:${t.id}`;
                      const isTermLive = sim.liveNodes.has(nodeKey);
                      const isTermN = sim.neutralNodes.has(nodeKey);
                      const isTermPE = sim.peNodes.has(nodeKey);
                      const isPending =
                        pendingTerminal?.instanceId === item.instanceId &&
                        pendingTerminal?.terminalId === t.id;

                      return (
                        <g
                          key={t.id}
                          transform={`translate(${t.relX}, ${t.relY})`}
                          className="cursor-pointer"
                          onMouseDown={(e) => e.stopPropagation()}
                          onClick={(e) =>
                            handleTerminalClick(e, item.instanceId, t.id, t.hintColor)
                          }
                        >
                          <circle
                            r={isPending ? 8 : 6}
                            fill={
                              isPending
                                ? '#fbbf24'
                                : isTermLive
                                ? '#f59e0b'
                                : isTermN
                                ? '#3b82f6'
                                : isTermPE
                                ? '#10b981'
                                : '#1e293b'
                            }
                            stroke="#f8fafc"
                            strokeWidth="1.5"
                          />
                          <text
                            y={t.relY < def.height / 2 ? 15 : -9}
                            textAnchor="middle"
                            fill="#cbd5e1"
                            fontSize="8"
                            fontWeight="bold"
                          >
                            {t.label}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
