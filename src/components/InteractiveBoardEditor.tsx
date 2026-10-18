import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  Plus,
  Trash2,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Eye,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';

// ============================================================================
// TYPY PRO MONTÁŽNÍ TABULI
// ============================================================================

export type PlacementZone = 'rail' | 'din' | 'busbar' | 'wall' | 'fixed';

export type WireColor = 'L1' | 'L2' | 'L3' | 'N' | 'PE' | 'SW';

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
  phaseGroup?: '1f' | '3f';
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
// BARVY VODIČŮ DLE ČSN EN 60445 (AUTOMATICKY DLE TOHO, CO TEČE VE STARTOVNÍ SVORCE)
// ============================================================================

const WIRE_COLORS: Record<WireColor, { name: string; stroke: string }> = {
  L1: { name: 'Hnědá (L1)', stroke: '#b45309' },
  L2: { name: 'Černá (L2)', stroke: '#475569' },
  L3: { name: 'Šedá (L3)', stroke: '#94a3b8' },
  N: { name: 'Modrá (N)', stroke: '#2563eb' },
  PE: { name: 'Zeleno-žlutá (PE)', stroke: '#16a34a' },
  SW: { name: 'Oranžová (ovládací / spínaná)', stroke: '#ea580c' },
};

// ============================================================================
// KATALOG PRVKŮ PRO UMÍSTĚNÍ NA TABULI
// ============================================================================

const PALETTE_ITEMS: PaletteItemDef[] = [
  {
    type: 'supply',
    name: 'Přívod sítě 3× 230/400 V (TN-S)',
    shortName: 'SÍŤ 3F TN-S',
    zone: 'fixed',
    width: 112,
    height: 76,
    description: 'Třífázový přívod L1, L2, L3, N, PE (230/400 V AC)',
    terminals: [
      { id: 'L1', label: 'L1', relX: 16, relY: 66, hintColor: 'L1' },
      { id: 'L2', label: 'L2', relX: 36, relY: 66, hintColor: 'L2' },
      { id: 'L3', label: 'L3', relX: 56, relY: 66, hintColor: 'L3' },
      { id: 'N', label: 'N', relX: 76, relY: 66, hintColor: 'N' },
      { id: 'PE', label: 'PE', relX: 96, relY: 66, hintColor: 'PE' },
    ],
  },
  {
    type: 'din-rail',
    name: 'DIN lišta TS 35 mm (nosná)',
    shortName: 'DIN lišta 35 mm',
    zone: 'rail',
    width: 480,
    height: 36,
    description: 'Posuvná a odstranitelná lišta – nasazené moduly se posouvají s ní',
    terminals: [],
  },
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

  // JEDNOFÁZOVÉ MODULY NA DIN LIŠTU (230 V)
  {
    type: 'qm-1p',
    name: 'Hlavní vypínač 1P (40 A)',
    shortName: 'Vypínač 1P',
    zone: 'din',
    phaseGroup: '1f',
    width: 52,
    height: 112,
    description: 'Jednopólový hlavní vypínač obvodu (1 = vstup, 2 = výstup)',
    terminals: [
      { id: '1', label: '1', relX: 26, relY: 12, hintColor: 'L1' },
      { id: '2', label: '2', relX: 26, relY: 100, hintColor: 'L1' },
    ],
  },
  {
    type: 'mcb-b10',
    name: 'Jistič 1P B10 (světla)',
    shortName: 'FA B10',
    zone: 'din',
    phaseGroup: '1f',
    width: 50,
    height: 112,
    description: 'Jednopólový jistič B10 A (1 = vstup, 2 = výstup)',
    terminals: [
      { id: '1', label: '1', relX: 25, relY: 12, hintColor: 'L1' },
      { id: '2', label: '2', relX: 25, relY: 100, hintColor: 'L1' },
    ],
  },
  {
    type: 'mcb-b16',
    name: 'Jistič 1P B16 (zásuvky)',
    shortName: 'FA B16',
    zone: 'din',
    phaseGroup: '1f',
    width: 50,
    height: 112,
    description: 'Jednopólový jistič B16 A (1 = vstup, 2 = výstup)',
    terminals: [
      { id: '1', label: '1', relX: 25, relY: 12, hintColor: 'L1' },
      { id: '2', label: '2', relX: 25, relY: 100, hintColor: 'L1' },
    ],
  },
  {
    type: 'rcd-2p',
    name: 'Proudový chránič 2P 30mA (1F+N)',
    shortName: 'RCD 2P',
    zone: 'din',
    phaseGroup: '1f',
    width: 78,
    height: 112,
    description: 'Dvoupólový proudový chránič FI (1-2 fáze, N_in - N_out)',
    terminals: [
      { id: '1', label: '1(L)', relX: 24, relY: 12, hintColor: 'L1' },
      { id: 'N_in', label: 'N', relX: 54, relY: 12, hintColor: 'N' },
      { id: '2', label: '2(L)', relX: 24, relY: 100, hintColor: 'L1' },
      { id: 'N_out', label: 'N', relX: 54, relY: 100, hintColor: 'N' },
    ],
  },
  {
    type: 'rcbo-1p',
    name: 'Jističochránič RCBO B16/30mA (1P+N)',
    shortName: 'RCBO B16',
    zone: 'din',
    phaseGroup: '1f',
    width: 78,
    height: 112,
    description: 'Kombinovaný proudový chránič s jističem 1P+N (B16 / 30 mA)',
    terminals: [
      { id: '1', label: '1(L)', relX: 24, relY: 12, hintColor: 'L1' },
      { id: 'N_in', label: 'N', relX: 54, relY: 12, hintColor: 'N' },
      { id: '2', label: '2(L)', relX: 24, relY: 100, hintColor: 'L1' },
      { id: 'N_out', label: 'N', relX: 54, relY: 100, hintColor: 'N' },
    ],
  },
  {
    type: 'contactor-1p',
    name: 'Instalační stykač 1P (230 V + cívka A1/A2)',
    shortName: 'Stykač 1P',
    zone: 'din',
    phaseGroup: '1f',
    width: 78,
    height: 112,
    description: 'Jednofázový stykač 20 A: cívka A1-A2 spíná silový kontakt 1-2',
    terminals: [
      { id: 'A1', label: 'A1', relX: 24, relY: 12, hintColor: 'SW' },
      { id: '1', label: '1(L)', relX: 54, relY: 12, hintColor: 'L1' },
      { id: 'A2', label: 'A2', relX: 24, relY: 100, hintColor: 'N' },
      { id: '2', label: '2(T)', relX: 54, relY: 100, hintColor: 'L1' },
    ],
  },
  {
    type: 'relay-ka',
    name: 'Impulzní relé KA (krokové)',
    shortName: 'Relé KA',
    zone: 'din',
    phaseGroup: '1f',
    width: 78,
    height: 112,
    description: 'Krokové relé: cívka A1-A2, spínací kontakt 1-2',
    terminals: [
      { id: 'A1', label: 'A1', relX: 24, relY: 12, hintColor: 'SW' },
      { id: '1', label: '1(L)', relX: 54, relY: 12, hintColor: 'L1' },
      { id: 'A2', label: 'A2', relX: 24, relY: 100, hintColor: 'N' },
      { id: '2', label: '2(L′)', relX: 54, relY: 100, hintColor: 'SW' },
    ],
  },
  {
    type: 'spd-1p',
    name: 'Svodič přepětí SPD 1P+N (230 V)',
    shortName: 'SPD 1P+N',
    zone: 'din',
    phaseGroup: '1f',
    width: 78,
    height: 112,
    description: 'Jednofázový chránič přepětí: nahoře L a N, dole PE do MET',
    terminals: [
      { id: 'L', label: 'L', relX: 24, relY: 12, hintColor: 'L1' },
      { id: 'N', label: 'N', relX: 54, relY: 12, hintColor: 'N' },
      { id: 'PE', label: 'PE', relX: 39, relY: 100, hintColor: 'PE' },
    ],
  },

  // TŘÍFÁZOVÉ MODULY NA DIN LIŠTU (400 V)
  {
    type: 'qm-3p',
    name: 'Hlavní vypínač 3P (40 A)',
    shortName: 'Vypínač 3P',
    zone: 'din',
    phaseGroup: '3f',
    width: 82,
    height: 112,
    description: 'Třípólový hlavní vypínač rozvaděče (1-2, 3-4, 5-6)',
    terminals: [
      { id: '1', label: '1', relX: 18, relY: 12, hintColor: 'L1' },
      { id: '3', label: '3', relX: 41, relY: 12, hintColor: 'L2' },
      { id: '5', label: '5', relX: 64, relY: 12, hintColor: 'L3' },
      { id: '2', label: '2', relX: 18, relY: 100, hintColor: 'L1' },
      { id: '4', label: '4', relX: 41, relY: 100, hintColor: 'L2' },
      { id: '6', label: '6', relX: 64, relY: 100, hintColor: 'L3' },
    ],
  },
  {
    type: 'mcb-3p',
    name: 'Jistič 3P B16 (3f spotřebiče)',
    shortName: 'FA 3P B16',
    zone: 'din',
    phaseGroup: '3f',
    width: 82,
    height: 112,
    description: 'Třípólový jistič B16 A pro 400 V (1-2, 3-4, 5-6)',
    terminals: [
      { id: '1', label: '1', relX: 18, relY: 12, hintColor: 'L1' },
      { id: '3', label: '3', relX: 41, relY: 12, hintColor: 'L2' },
      { id: '5', label: '5', relX: 64, relY: 12, hintColor: 'L3' },
      { id: '2', label: '2', relX: 18, relY: 100, hintColor: 'L1' },
      { id: '4', label: '4', relX: 41, relY: 100, hintColor: 'L2' },
      { id: '6', label: '6', relX: 64, relY: 100, hintColor: 'L3' },
    ],
  },
  {
    type: 'rcd-4p',
    name: 'Proudový chránič 4P 30mA (3f)',
    shortName: 'RCD 4P',
    zone: 'din',
    phaseGroup: '3f',
    width: 108,
    height: 112,
    description: 'Čtyřpólový proudový chránič pro 3f rozvody (1,3,5,N -> 2,4,6,N)',
    terminals: [
      { id: '1', label: '1', relX: 18, relY: 12, hintColor: 'L1' },
      { id: '3', label: '3', relX: 42, relY: 12, hintColor: 'L2' },
      { id: '5', label: '5', relX: 66, relY: 12, hintColor: 'L3' },
      { id: 'N_in', label: 'N', relX: 90, relY: 12, hintColor: 'N' },
      { id: '2', label: '2', relX: 18, relY: 100, hintColor: 'L1' },
      { id: '4', label: '4', relX: 42, relY: 100, hintColor: 'L2' },
      { id: '6', label: '6', relX: 66, relY: 100, hintColor: 'L3' },
      { id: 'N_out', label: 'N', relX: 90, relY: 100, hintColor: 'N' },
    ],
  },
  {
    type: 'contactor-km',
    name: 'Instalační stykač 3P (400 V + cívka A1/A2)',
    shortName: 'Stykač 3P',
    zone: 'din',
    phaseGroup: '3f',
    width: 110,
    height: 112,
    description: '3pólový stykač: cívka A1-A2 spíná silové kontakty 1-2, 3-4, 5-6',
    terminals: [
      { id: 'A1', label: 'A1', relX: 16, relY: 12, hintColor: 'SW' },
      { id: '1', label: '1', relX: 42, relY: 12, hintColor: 'L1' },
      { id: '3', label: '3', relX: 68, relY: 12, hintColor: 'L2' },
      { id: '5', label: '5', relX: 94, relY: 12, hintColor: 'L3' },
      { id: 'A2', label: 'A2', relX: 16, relY: 100, hintColor: 'N' },
      { id: '2', label: '2', relX: 42, relY: 100, hintColor: 'L1' },
      { id: '4', label: '4', relX: 68, relY: 100, hintColor: 'L2' },
      { id: '6', label: '6', relX: 94, relY: 100, hintColor: 'L3' },
    ],
  },
  {
    type: 'spd-t2',
    name: 'Svodič přepětí SPD T1+T2 (3P+N)',
    shortName: 'SPD 3P+N',
    zone: 'din',
    phaseGroup: '3f',
    width: 108,
    height: 112,
    description: 'Chránič přepětí 3P+N: nahoře L1, L2, L3, N, dole svorka PE do MET',
    terminals: [
      { id: 'L1', label: 'L1', relX: 18, relY: 12, hintColor: 'L1' },
      { id: 'L2', label: 'L2', relX: 42, relY: 12, hintColor: 'L2' },
      { id: 'L3', label: 'L3', relX: 66, relY: 12, hintColor: 'L3' },
      { id: 'N', label: 'N', relX: 90, relY: 12, hintColor: 'N' },
      { id: 'PE', label: 'PE', relX: 54, relY: 100, hintColor: 'PE' },
    ],
  },
  {
    type: 'wago-box',
    name: 'Odbočná krabice (3× WAGO)',
    shortName: 'Krabice WAGO',
    zone: 'wall',
    width: 136,
    height: 82,
    description: '3 nezávislé WAGO svorky (A, B, C) – každá má 3 propojené vstupy',
    terminals: [
      { id: 'A1', label: 'A', relX: 22, relY: 16, hintColor: 'L1' },
      { id: 'A2', label: 'A', relX: 22, relY: 41, hintColor: 'L1' },
      { id: 'A3', label: 'A', relX: 22, relY: 66, hintColor: 'L1' },
      { id: 'B1', label: 'B', relX: 68, relY: 16, hintColor: 'N' },
      { id: 'B2', label: 'B', relX: 68, relY: 41, hintColor: 'N' },
      { id: 'B3', label: 'B', relX: 68, relY: 66, hintColor: 'N' },
      { id: 'C1', label: 'C', relX: 114, relY: 16, hintColor: 'PE' },
      { id: 'C2', label: 'C', relX: 114, relY: 41, hintColor: 'PE' },
      { id: 'C3', label: 'C', relX: 114, relY: 66, hintColor: 'PE' },
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
      { id: 'L', label: 'L', relX: 43, relY: 14, hintColor: 'L1' },
      { id: '1', label: '1', relX: 43, relY: 72, hintColor: 'SW' },
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
      { id: 'L', label: 'L', relX: 46, relY: 14, hintColor: 'L1' },
      { id: '1', label: '1', relX: 26, relY: 72, hintColor: 'SW' },
      { id: '2', label: '2', relX: 66, relY: 72, hintColor: 'SW' },
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
      { id: 'L', label: 'L/P', relX: 46, relY: 14, hintColor: 'L1' },
      { id: '1', label: '1', relX: 26, relY: 72, hintColor: 'SW' },
      { id: '2', label: '2', relX: 66, relY: 72, hintColor: 'SW' },
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
      { id: '1', label: '1', relX: 28, relY: 14, hintColor: 'SW' },
      { id: '2', label: '2', relX: 68, relY: 14, hintColor: 'SW' },
      { id: '3', label: '3', relX: 28, relY: 72, hintColor: 'SW' },
      { id: '4', label: '4', relX: 68, relY: 72, hintColor: 'SW' },
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
      { id: 'L', label: 'L', relX: 43, relY: 14, hintColor: 'L1' },
      { id: '1', label: '1', relX: 43, relY: 72, hintColor: 'SW' },
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
      { id: 'L', label: 'L', relX: 22, relY: 72, hintColor: 'SW' },
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
      { id: 'L1', label: 'L1', relX: 18, relY: 72, hintColor: 'SW' },
      { id: 'L2', label: 'L2', relX: 42, relY: 72, hintColor: 'SW' },
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
      { id: 'L', label: 'L', relX: 22, relY: 72, hintColor: 'L1' },
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
      { id: 'L1', label: 'L1', relX: 18, relY: 76, hintColor: 'L1' },
      { id: 'L2', label: 'L2', relX: 40, relY: 76, hintColor: 'L2' },
      { id: 'L3', label: 'L3', relX: 62, relY: 76, hintColor: 'L3' },
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
      { id: 'L', label: 'L', relX: 24, relY: 78, hintColor: 'L1' },
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
      { id: 'L1', label: 'L1', relX: 18, relY: 78, hintColor: 'L1' },
      { id: 'L2', label: 'L2', relX: 41, relY: 78, hintColor: 'L2' },
      { id: 'L3', label: 'L3', relX: 64, relY: 78, hintColor: 'L3' },
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

// Výchozí tabule obsahuje pevný přívod sítě 3F TN-S a jednu posuvnou/odstranitelnou DIN lištu
const DEFAULT_DIN_RAIL: PlacedItem = {
  instanceId: 'din-rail-1',
  type: 'din-rail',
  label: 'DIN lišta 35 mm',
  x: 170,
  y: 152,
  state: 1,
};

const EMPTY_BOARD_ITEMS: PlacedItem[] = [
  { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
  DEFAULT_DIN_RAIL,
];

// ============================================================================
// KONSTANTY ZÓN NA TABULI A DETEKCE KOLIZÍ
// ============================================================================

const BOARD_WIDTH = 820;
const BOARD_HEIGHT = 600;

const BUSBAR_ROW_Y = 22;
const DIN_RAIL_ITEM_Y = 114;
const WALL_ZONE_MIN_Y = 280;
const WALL_ZONE_MAX_Y = 495;
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

// Zjistí, zda je DIN modul nasazen ("přilepen") na dané DIN liště
function isModuleOnRail(mod: PlacedItem, rail: PlacedItem): boolean {
  if (rail.type !== 'din-rail') return false;
  const modDef = PALETTE_MAP[mod.type];
  const railDef = PALETTE_MAP['din-rail'];
  if (!modDef || modDef.zone !== 'din' || !railDef) return false;

  const expectedY = rail.y + Math.round((railDef.height - modDef.height) / 2);
  const yAligned = Math.abs(mod.y - expectedY) <= 18;
  const xInside =
    mod.x >= rail.x - 6 && mod.x + modDef.width <= rail.x + railDef.width + 6;
  return yAligned && xInside;
}

function hasCollision(
  candidateId: string,
  x: number,
  y: number,
  w: number,
  h: number,
  items: PlacedItem[],
  ignoreIds?: Set<string>,
  candidateType?: string
): boolean {
  const candZone = candidateType ? PALETTE_MAP[candidateType]?.zone : undefined;

  for (const other of items) {
    if (other.instanceId === candidateId) continue;
    if (ignoreIds && ignoreIds.has(other.instanceId)) continue;
    const def = PALETTE_MAP[other.type];
    if (!def) continue;

    // DIN lišta a DIN moduly se vzájemně neblokují (moduly sedí přímo na liště)
    if (
      (candZone === 'din' && def.zone === 'rail') ||
      (candZone === 'rail' && def.zone === 'din')
    ) {
      continue;
    }

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

  if (def.zone === 'rail') {
    if (
      !hasCollision(
        '__new__',
        DEFAULT_DIN_RAIL.x,
        DEFAULT_DIN_RAIL.y,
        def.width,
        def.height,
        items,
        undefined,
        type
      )
    ) {
      return { x: DEFAULT_DIN_RAIL.x, y: DEFAULT_DIN_RAIL.y };
    }
    for (let y = 104; y <= BOARD_HEIGHT - def.height - 40; y += 16) {
      for (let x = 40; x <= BOARD_WIDTH - def.width - 20; x += 16) {
        if (!hasCollision('__new__', x, y, def.width, def.height, items, undefined, type)) {
          return { x, y };
        }
      }
    }
    return null;
  }

  if (def.zone === 'busbar') {
    for (let x = 184; x <= BOARD_WIDTH - def.width - 20; x += 8) {
      if (
        !hasCollision(
          '__new__',
          x,
          BUSBAR_ROW_Y,
          def.width,
          def.height,
          items,
          undefined,
          type
        )
      ) {
        return { x, y: BUSBAR_ROW_Y };
      }
    }
    return null;
  }

  if (def.zone === 'din') {
    const rails = items.filter((i) => i.type === 'din-rail');
    const railDef = PALETTE_MAP['din-rail'];
    if (!railDef || rails.length === 0) return null;

    for (const rail of rails) {
      const modY = rail.y + Math.round((railDef.height - def.height) / 2);
      for (
        let x = rail.x + 12;
        x <= rail.x + railDef.width - def.width - 12;
        x += 8
      ) {
        if (
          !hasCollision('__new__', x, modY, def.width, def.height, items, undefined, type)
        ) {
          return { x, y: modY };
        }
      }
    }
    return null;
  }

  for (let y = WALL_ZONE_MIN_Y; y <= WALL_ZONE_MAX_Y; y += 16) {
    for (let x = 32; x <= BOARD_WIDTH - def.width - 20; x += 16) {
      if (!hasCollision('__new__', x, y, def.width, def.height, items, undefined, type)) {
        return { x, y };
      }
    }
  }
  return null;
}

// ============================================================================
// ORTOGONÁLNÍ ROUTOVÁNÍ VODIČŮ BEZ PŘEKRYVU SOUBĚŽNÝCH TRAS (A* + PARALLEL LANES)
// ============================================================================

const GRID_STEP = 8;
const GRID_COLS = Math.ceil(BOARD_WIDTH / GRID_STEP);
const GRID_ROWS = Math.ceil(BOARD_HEIGHT / GRID_STEP);

interface TerminalExit {
  gx: number;
  gy: number;
  side: 'top' | 'bottom' | 'left' | 'right';
}

function getTerminalExit(
  item: PlacedItem,
  termId: string,
  extraOffsetSteps = 0
): TerminalExit | null {
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
  let side: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  const margin = 8 + extraOffsetSteps * GRID_STEP;

  if (minDist === distTop) {
    exitY = item.y - margin;
    side = 'top';
  } else if (minDist === distBottom) {
    exitY = item.y + def.height + margin;
    side = 'bottom';
  } else if (minDist === distLeft) {
    exitX = item.x - margin;
    side = 'left';
  } else {
    exitX = item.x + def.width + margin;
    side = 'right';
  }

  const gx = Math.max(1, Math.min(GRID_COLS - 2, Math.round(exitX / GRID_STEP)));
  const gy = Math.max(1, Math.min(GRID_ROWS - 2, Math.round(exitY / GRID_STEP)));

  return { gx, gy, side };
}

function simplifyPolyline(pts: Array<{ x: number; y: number }>): Array<{ x: number; y: number }> {
  const simplified: Array<{ x: number; y: number }> = [];
  for (const p of pts) {
    const prev = simplified[simplified.length - 1];
    if (prev && Math.abs(prev.x - p.x) < 0.5 && Math.abs(prev.y - p.y) < 0.5) continue;
    if (simplified.length >= 2) {
      const p1 = simplified[simplified.length - 2];
      const p2 = simplified[simplified.length - 1];
      if (
        (Math.abs(p1.x - p2.x) < 0.5 && Math.abs(p2.x - p.x) < 0.5) ||
        (Math.abs(p1.y - p2.y) < 0.5 && Math.abs(p2.y - p.y) < 0.5)
      ) {
        simplified[simplified.length - 1] = p;
        continue;
      }
    }
    simplified.push({ x: p.x, y: p.y });
  }
  return simplified;
}

function separateParallelSegments(
  polylines: Map<string, Array<{ x: number; y: number }>>
): Map<string, Array<{ x: number; y: number }>> {
  const MIN_SEP = 6;

  for (let pass = 0; pass < 3; pass++) {
    const horizSegs: Array<{
      wireId: string;
      pts: Array<{ x: number; y: number }>;
      idx: number;
      y: number;
      minX: number;
      maxX: number;
    }> = [];

    for (const [wireId, pts] of polylines.entries()) {
      for (let i = 1; i < pts.length - 2; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        if (Math.abs(a.y - b.y) < 0.5 && Math.abs(a.x - b.x) > 4) {
          horizSegs.push({
            wireId,
            pts,
            idx: i,
            y: a.y,
            minX: Math.min(a.x, b.x),
            maxX: Math.max(a.x, b.x),
          });
        }
      }
    }

    for (let i = 0; i < horizSegs.length; i++) {
      for (let j = i + 1; j < horizSegs.length; j++) {
        const s1 = horizSegs[i];
        const s2 = horizSegs[j];
        if (s1.wireId === s2.wireId) continue;
        const overlapX = Math.min(s1.maxX, s2.maxX) - Math.max(s1.minX, s2.minX);
        if (overlapX > 4 && Math.abs(s1.y - s2.y) < MIN_SEP) {
          const shift = s2.y >= s1.y ? MIN_SEP - (s2.y - s1.y) : -(MIN_SEP - (s1.y - s2.y));
          s2.y += shift;
          s2.pts[s2.idx].y = s2.y;
          s2.pts[s2.idx + 1].y = s2.y;
        }
      }
    }

    const vertSegs: Array<{
      wireId: string;
      pts: Array<{ x: number; y: number }>;
      idx: number;
      x: number;
      minY: number;
      maxY: number;
    }> = [];

    for (const [wireId, pts] of polylines.entries()) {
      for (let i = 1; i < pts.length - 2; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        if (Math.abs(a.x - b.x) < 0.5 && Math.abs(a.y - b.y) > 4) {
          vertSegs.push({
            wireId,
            pts,
            idx: i,
            x: a.x,
            minY: Math.min(a.y, b.y),
            maxY: Math.max(a.y, b.y),
          });
        }
      }
    }

    for (let i = 0; i < vertSegs.length; i++) {
      for (let j = i + 1; j < vertSegs.length; j++) {
        const s1 = vertSegs[i];
        const s2 = vertSegs[j];
        if (s1.wireId === s2.wireId) continue;
        const overlapY = Math.min(s1.maxY, s2.maxY) - Math.max(s1.minY, s2.minY);
        if (overlapY > 4 && Math.abs(s1.x - s2.x) < MIN_SEP) {
          const shift = s2.x >= s1.x ? MIN_SEP - (s2.x - s1.x) : -(MIN_SEP - (s1.x - s2.x));
          s2.x += shift;
          s2.pts[s2.idx].x = s2.x;
          s2.pts[s2.idx + 1].x = s2.x;
        }
      }
    }
  }

  return polylines;
}

function computeOrthogonalWirePaths(
  items: PlacedItem[],
  wires: BoardWire[]
): Record<string, string> {
  const blocked = new Uint8Array(GRID_COLS * GRID_ROWS);
  const itemMap = new Map<string, PlacedItem>();

  for (const it of items) {
    itemMap.set(it.instanceId, it);
    // Samotná kovová DIN lišta neblokuje vodiče (vodiče mohou procházet za lištou mezi moduly)
    if (it.type === 'din-rail') continue;
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

  const usedHoriz = new Uint8Array(GRID_COLS * GRID_ROWS);
  const usedVert = new Uint8Array(GRID_COLS * GRID_ROWS);
  const usedTurn = new Uint8Array(GRID_COLS * GRID_ROWS);
  const terminalUsageCount = new Map<string, number>();

  const dirs = [
    { dc: 1, dr: 0 },
    { dc: -1, dr: 0 },
    { dc: 0, dr: 1 },
    { dc: 0, dr: -1 },
  ];

  const rawPolylines = new Map<string, Array<{ x: number; y: number }>>();

  wires.forEach((w) => {
    const fromItem = itemMap.get(w.fromInstanceId);
    const toItem = itemMap.get(w.toInstanceId);
    if (!fromItem || !toItem) return;

    const fromDef = PALETTE_MAP[fromItem.type];
    const toDef = PALETTE_MAP[toItem.type];
    const fromTerm = fromDef?.terminals.find((t) => t.id === w.fromTerminalId);
    const toTerm = toDef?.terminals.find((t) => t.id === w.toTerminalId);
    if (!fromTerm || !toTerm) return;

    const fromKey = `${w.fromInstanceId}:${w.fromTerminalId}`;
    const toKey = `${w.toInstanceId}:${w.toTerminalId}`;
    const fromCount = terminalUsageCount.get(fromKey) || 0;
    const toCount = terminalUsageCount.get(toKey) || 0;
    terminalUsageCount.set(fromKey, fromCount + 1);
    terminalUsageCount.set(toKey, toCount + 1);

    const startAbsX = fromItem.x + fromTerm.relX;
    const startAbsY = fromItem.y + fromTerm.relY;
    const endAbsX = toItem.x + toTerm.relX;
    const endAbsY = toItem.y + toTerm.relY;

    const startExit = getTerminalExit(fromItem, w.fromTerminalId, fromCount);
    const endExit = getTerminalExit(toItem, w.toTerminalId, toCount);
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

        const isHoriz = d === 0 || d === 1;
        const isTurn = dirIdx !== 4 && dirIdx !== d;

        let penalty = 10;
        if (isTurn) {
          penalty += 18;
          if (usedHoriz[cellIdx] || usedVert[cellIdx] || usedTurn[cellIdx]) {
            penalty += 2500;
          }
        }

        if (isHoriz) {
          if (usedHoriz[nCell] || usedTurn[nCell]) {
            penalty += 2500;
          } else if (usedVert[nCell]) {
            penalty += 24;
          }
          if (nr > 0 && usedHoriz[(nr - 1) * GRID_COLS + nc]) penalty += 3;
          if (nr < GRID_ROWS - 1 && usedHoriz[(nr + 1) * GRID_COLS + nc]) penalty += 3;
        } else {
          if (usedVert[nCell] || usedTurn[nCell]) {
            penalty += 2500;
          } else if (usedHoriz[nCell]) {
            penalty += 24;
          }
          if (nc > 0 && usedVert[nr * GRID_COLS + (nc - 1)]) penalty += 3;
          if (nc < GRID_COLS - 1 && usedVert[nr * GRID_COLS + (nc + 1)]) penalty += 3;
        }

        const tentativeG = gScore[currentState] + penalty;
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

    const startStubShift = fromCount === 0 ? 0 : fromCount % 2 === 1 ? 4 : -4;
    const endStubShift = toCount === 0 ? 0 : toCount % 2 === 1 ? 4 : -4;

    const pts: Array<{ x: number; y: number }> = [{ x: startAbsX, y: startAbsY }];

    if (goalState !== -1) {
      const gridPath: Array<{ x: number; y: number; cell: number; dir: number }> = [];
      let cur = goalState;
      while (cur !== -1) {
        const cell = Math.floor(cur / 5);
        const dir = cur % 5;
        const c = cell % GRID_COLS;
        const r = Math.floor(cell / GRID_COLS);
        gridPath.push({ x: c * GRID_STEP, y: r * GRID_STEP, cell, dir });
        cur = parentState[cur];
      }
      gridPath.reverse();

      for (let i = 0; i < gridPath.length; i++) {
        const gp = gridPath[i];
        const prevDir = i > 0 ? gridPath[i].dir : -1;
        const nextDir = i < gridPath.length - 1 ? gridPath[i + 1].dir : -1;

        if (prevDir === 0 || prevDir === 1 || nextDir === 0 || nextDir === 1) {
          usedHoriz[gp.cell] = 1;
        }
        if (prevDir === 2 || prevDir === 3 || nextDir === 2 || nextDir === 3) {
          usedVert[gp.cell] = 1;
        }
        if (prevDir !== -1 && nextDir !== -1 && prevDir !== nextDir) {
          usedTurn[gp.cell] = 1;
        }
      }

      if (gridPath.length > 0) {
        const first = gridPath[0];
        if (startExit.side === 'top' || startExit.side === 'bottom') {
          if (startStubShift !== 0) {
            pts.push({ x: startAbsX + startStubShift, y: startAbsY });
          }
          pts.push({ x: startAbsX + startStubShift, y: first.y });
        } else {
          pts.push({ x: first.x, y: startAbsY });
        }

        for (const gp of gridPath) {
          pts.push({ x: gp.x, y: gp.y });
        }

        const last = gridPath[gridPath.length - 1];
        if (endExit.side === 'top' || endExit.side === 'bottom') {
          pts.push({ x: endAbsX + endStubShift, y: last.y });
          if (endStubShift !== 0) {
            pts.push({ x: endAbsX + endStubShift, y: endAbsY });
          }
        } else {
          pts.push({ x: last.x, y: endAbsY });
        }
      }
    }

    pts.push({ x: endAbsX, y: endAbsY });
    rawPolylines.set(w.id, simplifyPolyline(pts));
  });

  const separated = separateParallelSegments(rawPolylines);

  const paths: Record<string, string> = {};
  for (const [wireId, pts] of separated.entries()) {
    const clean = simplifyPolyline(pts);
    paths[wireId] = clean
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${Math.round(p.x)} ${Math.round(p.y)}`)
      .join(' ');
  }

  return paths;
}

// ============================================================================
// AUTOMATICKÁ DETEKCE BARVY VODIČE PODLE STARTOVNÍ SVORKY (CO V NÍ TEČE)
// ============================================================================

function getWireColorFromStart(
  instanceId: string,
  terminalId: string,
  items: PlacedItem[],
  sim: SimulationResult
): WireColor {
  const nodeKey = `${instanceId}:${terminalId}`;

  // 1. Nejprve se řídíme tím, co skutečně teče ve startovní svorce
  if (sim.peNodes.has(nodeKey)) return 'PE';
  if (sim.neutralNodes.has(nodeKey)) return 'N';

  const item = items.find((i) => i.instanceId === instanceId);
  const def = item ? PALETTE_MAP[item.type] : undefined;
  const term = def?.terminals.find((t) => t.id === terminalId);

  // Pokud jde o spínaný / korespondenční výstup spínače nebo tlačítka, použijeme oranžovou/spínanou barvu
  if (
    item &&
    (item.type.startsWith('switch-') || item.type === 'pushbutton' || item.type === 'relay-ka') &&
    terminalId !== 'L' &&
    terminalId !== '1(L)' &&
    term?.hintColor === 'SW'
  ) {
    return 'SW';
  }

  const phases = sim.nodePhases.get(nodeKey);
  if (phases) {
    if (phases.has('L1')) return 'L1';
    if (phases.has('L2')) return 'L2';
    if (phases.has('L3')) return 'L3';
  }

  // 2. Pokud je svorka zatím bez napětí, použijeme typ svorky
  return term?.hintColor || 'L1';
}

// ============================================================================
// 12 VÝUKOVÝCH ÚLOH (3 ÚROVNĚ OBTÍŽNOSTI × 4 ÚLOHY)
// Kontrola probíhá podle typů přístrojů, takže funguje při stavbě z prázdné tabule!
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
      'Z levého panelu vložte na tabuli můstky N a PE, jistič FA B10, spínač č. 1 a svítidlo E27. Zapojte L1 z přívodu sítě přes jistič B10 na spínač č. 1 (L) a spínaný vývod (1) na svítidlo E27 (L). Doplňte N a PE.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'bus-n', type: 'busbar-n', label: 'Můstek N', x: 230, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'bus-pe', type: 'busbar-pe', label: 'Můstek PE', x: 430, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'mcb-1', type: 'mcb-b10', label: 'FA1 B10', x: 250, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'sw-1', type: 'switch-1', label: 'Spínač č. 1', x: 220, y: 340, state: 1 },
      { instanceId: 'lamp-1', type: 'lamp-1', label: 'Svítidlo E27', x: 470, y: 340, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'mcb-1', toTerminalId: '1', color: 'L1' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'bus-n', toTerminalId: 'N1', color: 'N' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'bus-pe', toTerminalId: 'PE1', color: 'PE' },
      { id: 'w4', fromInstanceId: 'mcb-1', fromTerminalId: '2', toInstanceId: 'sw-1', toTerminalId: 'L', color: 'L1' },
      { id: 'w5', fromInstanceId: 'sw-1', fromTerminalId: '1', toInstanceId: 'lamp-1', toTerminalId: 'L', color: 'SW' },
      { id: 'w6', fromInstanceId: 'bus-n', fromTerminalId: 'N2', toInstanceId: 'lamp-1', toTerminalId: 'N', color: 'N' },
      { id: 'w7', fromInstanceId: 'bus-pe', fromTerminalId: 'PE2', toInstanceId: 'lamp-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (items, _wires, sim) => {
      const msgs: string[] = [];
      const lamp = items.find((i) => i.type === 'lamp-1');
      const mcb = items.find((i) => i.type === 'mcb-b10');
      const sw = items.find((i) => i.type === 'switch-1');
      if (!mcb) msgs.push('Chybí jistič 1P B10 na DIN liště.');
      if (!sw) msgs.push('Chybí jednopólový spínač č. 1.');
      if (!lamp) {
        msgs.push('Chybí svítidlo E27 na montážním panelu.');
      } else {
        if (!sim.neutralNodes.has(`${lamp.instanceId}:N`)) msgs.push('Chybí připojený nulový vodič N na svítidle E27.');
        if (!sim.peNodes.has(`${lamp.instanceId}:PE`)) msgs.push('Chybí ochranný vodič PE na kostře svítidla E27.');
        if (!sim.liveNodes.has(`${lamp.instanceId}:L`)) msgs.push('Svítidlo nesvítí – zkontrolujte jistič B10 a sepnutí spínače č. 1.');
      }
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
      'Vložte na tabuli můstek PE, proudový chránič RCD 2P, jistič FA B16 a zásuvku 230 V. L1 a N ze sítě přiveďte do RCD (1 a N). Výstup fáze z RCD (2) veďte přes jistič B16 na levou zdířku zásuvky (L), výstup N z RCD na N zásuvky a PE z můstku PE.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'bus-pe', type: 'busbar-pe', label: 'Můstek PE', x: 350, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'rcd-1', type: 'rcd-2p', label: 'FI1 30mA', x: 220, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'mcb-16', type: 'mcb-b16', label: 'FA1 B16', x: 340, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'sock-1', type: 'socket-230', label: 'Zásuvka 230 V', x: 320, y: 350, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'rcd-1', toTerminalId: '1', color: 'L1' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'rcd-1', toTerminalId: 'N_in', color: 'N' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'bus-pe', toTerminalId: 'PE1', color: 'PE' },
      { id: 'w4', fromInstanceId: 'rcd-1', fromTerminalId: '2', toInstanceId: 'mcb-16', toTerminalId: '1', color: 'L1' },
      { id: 'w5', fromInstanceId: 'mcb-16', fromTerminalId: '2', toInstanceId: 'sock-1', toTerminalId: 'L', color: 'L1' },
      { id: 'w6', fromInstanceId: 'rcd-1', fromTerminalId: 'N_out', toInstanceId: 'sock-1', toTerminalId: 'N', color: 'N' },
      { id: 'w7', fromInstanceId: 'bus-pe', fromTerminalId: 'PE2', toInstanceId: 'sock-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (items, _wires, sim) => {
      const msgs: string[] = [];
      const rcd = items.find((i) => i.type === 'rcd-2p');
      const mcb = items.find((i) => i.type === 'mcb-b16');
      const sock = items.find((i) => i.type === 'socket-230');
      if (!rcd) msgs.push('Chybí proudový chránič RCD 2P.');
      if (!mcb) msgs.push('Chybí jistič B16.');
      if (!sock) {
        msgs.push('Chybí zásuvka 230 V.');
      } else {
        if (!sim.liveNodes.has(`${sock.instanceId}:L`)) msgs.push('Na levé zdířce L zásuvky není fáze.');
        if (!sim.neutralNodes.has(`${sock.instanceId}:N`)) msgs.push('Na pravé zdířce N zásuvky chybí pracovní nula.');
        if (!sim.peNodes.has(`${sock.instanceId}:PE`)) msgs.push('Na ochranném kolíku PE zásuvky chybí vodič PE!');
      }
      if (rcd && !sim.liveNodes.has(`${rcd.instanceId}:2`)) {
        msgs.push('Proud musí procházet přes proudový chránič RCD 2P.');
      }
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
      'Vložte můstky N a PE, jistič B10, lustrový přepínač č. 5 a dvouvětvový lustr. Fázi z jističe B10 přiveďte na svorku L přepínače č. 5. Vývody 1 a 2 připojte na svorky L1 a L2 lustru. Doplňte N a PE.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'bus-n', type: 'busbar-n', label: 'Můstek N', x: 230, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'bus-pe', type: 'busbar-pe', label: 'Můstek PE', x: 430, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'mcb-1', type: 'mcb-b10', label: 'FA1 B10', x: 250, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'sw-5', type: 'switch-5', label: 'Lustrový č. 5', x: 220, y: 340, state: 3 },
      { instanceId: 'lustr-1', type: 'lamp-2', label: 'Lustr 2-větv.', x: 470, y: 340, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'mcb-1', toTerminalId: '1', color: 'L1' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'bus-n', toTerminalId: 'N1', color: 'N' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'bus-pe', toTerminalId: 'PE1', color: 'PE' },
      { id: 'w4', fromInstanceId: 'mcb-1', fromTerminalId: '2', toInstanceId: 'sw-5', toTerminalId: 'L', color: 'L1' },
      { id: 'w5', fromInstanceId: 'sw-5', fromTerminalId: '1', toInstanceId: 'lustr-1', toTerminalId: 'L1', color: 'SW' },
      { id: 'w6', fromInstanceId: 'sw-5', fromTerminalId: '2', toInstanceId: 'lustr-1', toTerminalId: 'L2', color: 'SW' },
      { id: 'w7', fromInstanceId: 'bus-n', fromTerminalId: 'N2', toInstanceId: 'lustr-1', toTerminalId: 'N', color: 'N' },
      { id: 'w8', fromInstanceId: 'bus-pe', fromTerminalId: 'PE2', toInstanceId: 'lustr-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (items, _wires, sim) => {
      const msgs: string[] = [];
      const lustr = items.find((i) => i.type === 'lamp-2');
      const sw5 = items.find((i) => i.type === 'switch-5');
      if (!sw5) msgs.push('Chybí sériový (lustrový) přepínač č. 5.');
      if (!lustr) {
        msgs.push('Chybí dvouvětvový lustr.');
      } else {
        if (!sim.liveNodes.has(`${lustr.instanceId}:L1`) || !sim.liveNodes.has(`${lustr.instanceId}:L2`)) {
          msgs.push('Zapněte obě klapky spínače č. 5 (1 + 2) a ověřte přívod fáze na L1 i L2 lustru.');
        }
        if (!sim.neutralNodes.has(`${lustr.instanceId}:N`)) msgs.push('Chybí vodič N na lustru.');
        if (!sim.peNodes.has(`${lustr.instanceId}:PE`)) msgs.push('Chybí ochranný vodič PE na lustru.');
      }
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
      'Vložte svorkovnici MET/HOP, jističochránič RCBO B16, zásuvku 230 V a kovové potrubí vody. Zapojte zásuvku přes RCBO (1, N -> 2, N) a ze svorkovnice MET pospojujte kolík zásuvky i vodovodní potrubí.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'met-1', type: 'met-hop', label: 'MET / HOP', x: 350, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'rcbo-1', type: 'rcbo-1p', label: 'RCBO B16', x: 230, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'sock-1', type: 'socket-230', label: 'Zásuvka 230V', x: 240, y: 350, state: 0 },
      { instanceId: 'pipe-1', type: 'water-pipe', label: 'Vodovodní potrubí', x: 480, y: 360, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'rcbo-1', toTerminalId: '1', color: 'L1' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'rcbo-1', toTerminalId: 'N_in', color: 'N' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'met-1', toTerminalId: 'E1', color: 'PE' },
      { id: 'w4', fromInstanceId: 'rcbo-1', fromTerminalId: '2', toInstanceId: 'sock-1', toTerminalId: 'L', color: 'L1' },
      { id: 'w5', fromInstanceId: 'rcbo-1', fromTerminalId: 'N_out', toInstanceId: 'sock-1', toTerminalId: 'N', color: 'N' },
      { id: 'w6', fromInstanceId: 'met-1', fromTerminalId: 'E2', toInstanceId: 'sock-1', toTerminalId: 'PE', color: 'PE' },
      { id: 'w7', fromInstanceId: 'met-1', fromTerminalId: 'E3', toInstanceId: 'pipe-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (items, _wires, sim) => {
      const msgs: string[] = [];
      const rcbo = items.find((i) => i.type === 'rcbo-1p');
      const sock = items.find((i) => i.type === 'socket-230');
      const pipe = items.find((i) => i.type === 'water-pipe');
      if (!rcbo) msgs.push('Chybí jističochránič RCBO B16.');
      if (!sock) {
        msgs.push('Chybí zásuvka 230 V.');
      } else {
        if (!sim.liveNodes.has(`${sock.instanceId}:L`) || !sim.neutralNodes.has(`${sock.instanceId}:N`)) {
          msgs.push('Zásuvka nemá napájení L + N z jističochrániče RCBO.');
        }
        if (!sim.peNodes.has(`${sock.instanceId}:PE`)) msgs.push('Chybí PE na kolíku zásuvky.');
      }
      if (!pipe || !sim.peNodes.has(`${pipe.instanceId}:PE`)) {
        msgs.push('Kovové potrubí vody není pospojováno se svorkovnicí MET!');
      }
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
      'Vložte můstky N a PE, jistič B10, dva schodišťové přepínače č. 6 a svítidlo E27. Fázi z jističe B10 přiveďte na L prvního přepínače č. 6, propojte korespondenční svorky 1–1 a 2–2, a ze svorky L druhého přepínače napájejte svítidlo E27.',
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
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'mcb-1', toTerminalId: '1', color: 'L1' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'bus-n', toTerminalId: 'N1', color: 'N' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'bus-pe', toTerminalId: 'PE1', color: 'PE' },
      { id: 'w4', fromInstanceId: 'mcb-1', fromTerminalId: '2', toInstanceId: 'sw6-a', toTerminalId: 'L', color: 'L1' },
      { id: 'w5', fromInstanceId: 'sw6-a', fromTerminalId: '1', toInstanceId: 'sw6-b', toTerminalId: '1', color: 'SW' },
      { id: 'w6', fromInstanceId: 'sw6-a', fromTerminalId: '2', toInstanceId: 'sw6-b', toTerminalId: '2', color: 'SW' },
      { id: 'w7', fromInstanceId: 'sw6-b', fromTerminalId: 'L', toInstanceId: 'lamp-1', toTerminalId: 'L', color: 'SW' },
      { id: 'w8', fromInstanceId: 'bus-n', fromTerminalId: 'N2', toInstanceId: 'lamp-1', toTerminalId: 'N', color: 'N' },
      { id: 'w9', fromInstanceId: 'bus-pe', fromTerminalId: 'PE2', toInstanceId: 'lamp-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (items, _wires, sim) => {
      const msgs: string[] = [];
      const sw6List = items.filter((i) => i.type === 'switch-6');
      const lamp = items.find((i) => i.type === 'lamp-1');
      if (sw6List.length < 2) msgs.push('Na panelu musí být 2 schodišťové přepínače č. 6.');
      if (!lamp) {
        msgs.push('Chybí svítidlo E27.');
      } else {
        if (!sim.liveNodes.has(`${lamp.instanceId}:L`)) {
          msgs.push('Svítidlo nesvítí – zkontrolujte korespondenční vodiče 1-1, 2-2 a polohu přepínačů.');
        }
        if (!sim.neutralNodes.has(`${lamp.instanceId}:N`)) msgs.push('Chybí vodič N na svítidle.');
        if (!sim.peNodes.has(`${lamp.instanceId}:PE`)) msgs.push('Chybí ochranný vodič PE na svítidle.');
      }
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
      'Vložte můstky N a PE, jistič B10, impulzní relé KA, 2 tlačítka č. 1/0 a svítidlo E27. Fázi z B10 přiveďte na kontakt 1 relé KA a na vstupy L obou tlačítek. Výstupy tlačítek (1) spojte na cívku relé A1, A2 na N. Výstup relé (2) napájí svítidlo.',
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
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'mcb-1', toTerminalId: '1', color: 'L1' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'bus-n', toTerminalId: 'N1', color: 'N' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'bus-pe', toTerminalId: 'PE1', color: 'PE' },
      { id: 'w4', fromInstanceId: 'mcb-1', fromTerminalId: '2', toInstanceId: 'ka-1', toTerminalId: '1', color: 'L1' },
      { id: 'w5', fromInstanceId: 'mcb-1', fromTerminalId: '2', toInstanceId: 'btn-1', toTerminalId: 'L', color: 'L1' },
      { id: 'w6', fromInstanceId: 'btn-1', fromTerminalId: 'L', toInstanceId: 'btn-2', toTerminalId: 'L', color: 'L1' },
      { id: 'w7', fromInstanceId: 'btn-1', fromTerminalId: '1', toInstanceId: 'ka-1', toTerminalId: 'A1', color: 'SW' },
      { id: 'w8', fromInstanceId: 'btn-2', fromTerminalId: '1', toInstanceId: 'ka-1', toTerminalId: 'A1', color: 'SW' },
      { id: 'w9', fromInstanceId: 'bus-n', fromTerminalId: 'N2', toInstanceId: 'ka-1', toTerminalId: 'A2', color: 'N' },
      { id: 'w10', fromInstanceId: 'ka-1', fromTerminalId: '2', toInstanceId: 'lamp-1', toTerminalId: 'L', color: 'SW' },
      { id: 'w11', fromInstanceId: 'bus-n', fromTerminalId: 'N3', toInstanceId: 'lamp-1', toTerminalId: 'N', color: 'N' },
      { id: 'w12', fromInstanceId: 'bus-pe', fromTerminalId: 'PE2', toInstanceId: 'lamp-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (items, _wires, sim) => {
      const msgs: string[] = [];
      const ka = items.find((i) => i.type === 'relay-ka');
      const btns = items.filter((i) => i.type === 'pushbutton');
      const lamp = items.find((i) => i.type === 'lamp-1');
      if (!ka) msgs.push('Chybí impulzní relé KA na DIN liště.');
      if (btns.length < 2) msgs.push('Vložte 2 zapínací tlačítka č. 1/0.');
      if (ka && !sim.neutralNodes.has(`${ka.instanceId}:A2`)) {
        msgs.push('Cívka relé KA (svorka A2) nemá připojený vodič N.');
      }
      if (!lamp) {
        msgs.push('Chybí svítidlo E27.');
      } else {
        if (!sim.liveNodes.has(`${lamp.instanceId}:L`)) {
          msgs.push('Svítidlo nesvítí – sepněte relé KA do stavu ZAP a ověřte přívod fáze na svorku 1.');
        }
        if (!sim.neutralNodes.has(`${lamp.instanceId}:N`) || !sim.peNodes.has(`${lamp.instanceId}:PE`)) {
          msgs.push('Doplňte N a PE na svítidlo E27.');
        }
      }
      return { ok: msgs.length === 0 && !sim.shortCircuit, messages: msgs };
    },
  },
  {
    id: 'u2-3',
    level: 2,
    number: 7,
    title: 'Elektrický bojler 230 V spínaný 1f stykačem KM',
    subtitle: 'Silové spínání bojleru instalačním stykačem ovládaným spínačem HDO / termostatem',
    assignment:
      'Vložte můstky N a PE, jistič B16 (silový), jistič B10 (ovládací), 1f stykač KM (1P), spínač č. 1 (HDO) a bojler 230 V. Silovou fázi z B16 veďte přes kontakt 1–2 stykače KM na bojler (L). Ovládací fázi z B10 veďte přes spínač č. 1 na cívku A1 stykače. Doplňte N (na A2 i bojler) a PE.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'bus-n', type: 'busbar-n', label: 'Můstek N', x: 230, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'bus-pe', type: 'busbar-pe', label: 'Můstek PE', x: 430, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'mcb-16', type: 'mcb-b16', label: 'FA1 B16 (bojler)', x: 210, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'mcb-10', type: 'mcb-b10', label: 'FA2 B10 (ovl.)', x: 290, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'km-1', type: 'contactor-1p', label: 'Stykač KM 1P', x: 380, y: DIN_RAIL_ITEM_Y, state: 0 },
      { instanceId: 'sw-hdo', type: 'switch-1', label: 'Spínač HDO', x: 180, y: 340, state: 1 },
      { instanceId: 'boiler-1', type: 'boiler-1f', label: 'Bojler 230 V', x: 450, y: 340, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'mcb-16', toTerminalId: '1', color: 'L1' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'mcb-10', toTerminalId: '1', color: 'L1' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'bus-n', toTerminalId: 'N1', color: 'N' },
      { id: 'w4', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'bus-pe', toTerminalId: 'PE1', color: 'PE' },
      { id: 'w5', fromInstanceId: 'mcb-16', fromTerminalId: '2', toInstanceId: 'km-1', toTerminalId: '1', color: 'L1' },
      { id: 'w6', fromInstanceId: 'km-1', fromTerminalId: '2', toInstanceId: 'boiler-1', toTerminalId: 'L', color: 'L1' },
      { id: 'w7', fromInstanceId: 'mcb-10', fromTerminalId: '2', toInstanceId: 'sw-hdo', toTerminalId: 'L', color: 'L1' },
      { id: 'w8', fromInstanceId: 'sw-hdo', fromTerminalId: '1', toInstanceId: 'km-1', toTerminalId: 'A1', color: 'SW' },
      { id: 'w9', fromInstanceId: 'bus-n', fromTerminalId: 'N2', toInstanceId: 'km-1', toTerminalId: 'A2', color: 'N' },
      { id: 'w10', fromInstanceId: 'bus-n', fromTerminalId: 'N3', toInstanceId: 'boiler-1', toTerminalId: 'N', color: 'N' },
      { id: 'w11', fromInstanceId: 'bus-pe', fromTerminalId: 'PE2', toInstanceId: 'boiler-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (items, _wires, sim) => {
      const msgs: string[] = [];
      const km = items.find((i) => i.type === 'contactor-1p' || i.type === 'contactor-km');
      const boiler = items.find((i) => i.type === 'boiler-1f');
      if (!km) {
        msgs.push('Chybí instalační stykač KM (1P nebo 3P) na DIN liště.');
      } else if (!sim.energizedContactors.has(km.instanceId)) {
        msgs.push('Cívka stykače KM (A1–A2) není pod napětím – zkontrolujte ovládací obvod přes spínač a vodič N na A2.');
      }
      if (!boiler) {
        msgs.push('Chybí elektrický bojler 230 V.');
      } else {
        if (!sim.liveNodes.has(`${boiler.instanceId}:L`)) msgs.push('Bojler nemá fázi L ze silového kontaktu stykače KM.');
        if (!sim.neutralNodes.has(`${boiler.instanceId}:N`)) msgs.push('Chybí vodič N na bojleru.');
        if (!sim.peNodes.has(`${boiler.instanceId}:PE`)) msgs.push('Chybí ochranný vodič PE na bojleru.');
      }
      return { ok: msgs.length === 0 && !sim.shortCircuit, messages: msgs };
    },
  },
  {
    id: 'u2-4',
    level: 2,
    number: 8,
    title: 'Chránič přepětí SPD a hlavní pospojování MET',
    subtitle: 'Ochrana rozvaděče proti přepětí (1P+N nebo 3P+N) a pospojování MET',
    assignment:
      'Vložte můstek N, svorkovnici MET/HOP, svodič přepětí SPD (3P+N nebo 1P+N) a kovové potrubí vody. Přiveďte fázové vodiče a N na svodič přepětí SPD a jeho zemnicí svorku PE i vodovodní potrubí pospojujte do MET/HOP.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'bus-n', type: 'busbar-n', label: 'Můstek N', x: 230, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'met-1', type: 'met-hop', label: 'MET / HOP', x: 430, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'spd-1', type: 'spd-t2', label: 'SPD T1+T2 3P+N', x: 260, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'pipe-1', type: 'water-pipe', label: 'Vodovodní potrubí', x: 380, y: 350, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'spd-1', toTerminalId: 'L1', color: 'L1' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'L2', toInstanceId: 'spd-1', toTerminalId: 'L2', color: 'L2' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'L3', toInstanceId: 'spd-1', toTerminalId: 'L3', color: 'L3' },
      { id: 'w4', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'bus-n', toTerminalId: 'N1', color: 'N' },
      { id: 'w5', fromInstanceId: 'bus-n', fromTerminalId: 'N2', toInstanceId: 'spd-1', toTerminalId: 'N', color: 'N' },
      { id: 'w6', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'met-1', toTerminalId: 'E1', color: 'PE' },
      { id: 'w7', fromInstanceId: 'spd-1', fromTerminalId: 'PE', toInstanceId: 'met-1', toTerminalId: 'E4', color: 'PE' },
      { id: 'w8', fromInstanceId: 'met-1', fromTerminalId: 'E3', toInstanceId: 'pipe-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (items, _wires, sim) => {
      const msgs: string[] = [];
      const spd3 = items.find((i) => i.type === 'spd-t2');
      const spd1 = items.find((i) => i.type === 'spd-1p');
      const pipe = items.find((i) => i.type === 'water-pipe');
      if (!spd3 && !spd1) {
        msgs.push('Chybí svodič přepětí SPD (1P+N nebo 3P+N).');
      } else if (spd3) {
        if (
          !sim.liveNodes.has(`${spd3.instanceId}:L1`) ||
          !sim.liveNodes.has(`${spd3.instanceId}:L2`) ||
          !sim.liveNodes.has(`${spd3.instanceId}:L3`)
        ) {
          msgs.push('Třífázový svodič přepětí SPD 3P+N musí mít připojené všechny 3 fáze (L1, L2, L3).');
        }
        if (!sim.neutralNodes.has(`${spd3.instanceId}:N`)) msgs.push('Chybí připojený vodič N na svodiči přepětí SPD.');
        if (!sim.peNodes.has(`${spd3.instanceId}:PE`)) msgs.push('Svodič přepětí SPD není uzemněn na svorkovnici MET/HOP!');
      } else if (spd1) {
        if (!sim.liveNodes.has(`${spd1.instanceId}:L`)) {
          msgs.push('Jednofázový svodič přepětí SPD 1P+N nemá připojenou fázi L.');
        }
        if (!sim.neutralNodes.has(`${spd1.instanceId}:N`)) msgs.push('Chybí připojený vodič N na svodiči přepětí SPD.');
        if (!sim.peNodes.has(`${spd1.instanceId}:PE`)) msgs.push('Svodič přepětí SPD není uzemněn na svorkovnici MET/HOP!');
      }
      if (!pipe || !sim.peNodes.has(`${pipe.instanceId}:PE`)) {
        msgs.push('Chybí pospojování vodovodního potrubí s MET/HOP.');
      }
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
      'Vložte můstky N a PE, jistič B10, dva schodišťové přepínače č. 6, jeden křížový přepínač č. 7 a svítidlo E27. Propojte schodišťáky přes křížový přepínač (1,2 -> 1,2 a 3,4 -> 1,2) a ovládejte svítidlo.',
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
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'mcb-1', toTerminalId: '1', color: 'L1' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'bus-n', toTerminalId: 'N1', color: 'N' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'bus-pe', toTerminalId: 'PE1', color: 'PE' },
      { id: 'w4', fromInstanceId: 'mcb-1', fromTerminalId: '2', toInstanceId: 'sw6-a', toTerminalId: 'L', color: 'L1' },
      { id: 'w5', fromInstanceId: 'sw6-a', fromTerminalId: '1', toInstanceId: 'sw7-m', toTerminalId: '1', color: 'SW' },
      { id: 'w6', fromInstanceId: 'sw6-a', fromTerminalId: '2', toInstanceId: 'sw7-m', toTerminalId: '2', color: 'SW' },
      { id: 'w7', fromInstanceId: 'sw7-m', fromTerminalId: '3', toInstanceId: 'sw6-b', toTerminalId: '1', color: 'SW' },
      { id: 'w8', fromInstanceId: 'sw7-m', fromTerminalId: '4', toInstanceId: 'sw6-b', toTerminalId: '2', color: 'SW' },
      { id: 'w9', fromInstanceId: 'sw6-b', fromTerminalId: 'L', toInstanceId: 'lamp-1', toTerminalId: 'L', color: 'SW' },
      { id: 'w10', fromInstanceId: 'bus-n', fromTerminalId: 'N2', toInstanceId: 'lamp-1', toTerminalId: 'N', color: 'N' },
      { id: 'w11', fromInstanceId: 'bus-pe', fromTerminalId: 'PE2', toInstanceId: 'lamp-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (items, _wires, sim) => {
      const msgs: string[] = [];
      const sw6 = items.filter((i) => i.type === 'switch-6');
      const sw7 = items.find((i) => i.type === 'switch-7');
      const lamp = items.find((i) => i.type === 'lamp-1');
      if (sw6.length < 2) msgs.push('Chybí 2 schodišťové přepínače č. 6.');
      if (!sw7) msgs.push('Chybí křížový přepínač č. 7.');
      if (!lamp) {
        msgs.push('Chybí svítidlo E27.');
      } else {
        if (!sim.liveNodes.has(`${lamp.instanceId}:L`)) {
          msgs.push('Svítidlo nesvítí – zkontrolujte propojení 6 -> 7 -> 6 a sepněte přepínače do průchozí polohy.');
        }
        if (!sim.neutralNodes.has(`${lamp.instanceId}:N`)) msgs.push('Chybí vodič N na svítidle.');
        if (!sim.peNodes.has(`${lamp.instanceId}:PE`)) msgs.push('Chybí vodič PE na svítidle.');
      }
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
      'Vložte můstek PE, 4pólový chránič RCD 4P, 3pólový jistič FA 3P B16 a 3f zásuvku 400 V. Fáze L1, L2, L3 a N veďte ze sítě přes RCD 4P, fáze dále přes 3P jistič na zásuvku 400 V. Doplňte N z výstupu RCD a PE z můstku PE.',
    items: [
      { instanceId: 'supply', type: 'supply', label: 'Přívod 3F TN-S', x: 24, y: 24, state: 1 },
      { instanceId: 'bus-pe', type: 'busbar-pe', label: 'Můstek PE', x: 350, y: BUSBAR_ROW_Y, state: 1 },
      { instanceId: 'rcd-4p', type: 'rcd-4p', label: 'RCD 4P 30mA', x: 210, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'mcb-3p', type: 'mcb-3p', label: 'FA 3P B16', x: 360, y: DIN_RAIL_ITEM_Y, state: 1 },
      { instanceId: 'sock-400', type: 'socket-400', label: 'Zásuvka 400V 5P', x: 300, y: 350, state: 0 },
    ],
    solutionWires: [
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'rcd-4p', toTerminalId: '1', color: 'L1' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'L2', toInstanceId: 'rcd-4p', toTerminalId: '3', color: 'L2' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'L3', toInstanceId: 'rcd-4p', toTerminalId: '5', color: 'L3' },
      { id: 'w4', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'rcd-4p', toTerminalId: 'N_in', color: 'N' },
      { id: 'w5', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'bus-pe', toTerminalId: 'PE1', color: 'PE' },
      { id: 'w6', fromInstanceId: 'rcd-4p', fromTerminalId: '2', toInstanceId: 'mcb-3p', toTerminalId: '1', color: 'L1' },
      { id: 'w7', fromInstanceId: 'rcd-4p', fromTerminalId: '4', toInstanceId: 'mcb-3p', toTerminalId: '3', color: 'L2' },
      { id: 'w8', fromInstanceId: 'rcd-4p', fromTerminalId: '6', toInstanceId: 'mcb-3p', toTerminalId: '5', color: 'L3' },
      { id: 'w9', fromInstanceId: 'mcb-3p', fromTerminalId: '2', toInstanceId: 'sock-400', toTerminalId: 'L1', color: 'L1' },
      { id: 'w10', fromInstanceId: 'mcb-3p', fromTerminalId: '4', toInstanceId: 'sock-400', toTerminalId: 'L2', color: 'L2' },
      { id: 'w11', fromInstanceId: 'mcb-3p', fromTerminalId: '6', toInstanceId: 'sock-400', toTerminalId: 'L3', color: 'L3' },
      { id: 'w12', fromInstanceId: 'rcd-4p', fromTerminalId: 'N_out', toInstanceId: 'sock-400', toTerminalId: 'N', color: 'N' },
      { id: 'w13', fromInstanceId: 'bus-pe', fromTerminalId: 'PE2', toInstanceId: 'sock-400', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (items, _wires, sim) => {
      const msgs: string[] = [];
      const rcd4 = items.find((i) => i.type === 'rcd-4p');
      const mcb3 = items.find((i) => i.type === 'mcb-3p');
      const sock = items.find((i) => i.type === 'socket-400');
      if (!rcd4) msgs.push('Chybí 4pólový proudový chránič RCD 4P.');
      if (!mcb3) msgs.push('Chybí 3pólový jistič FA 3P B16.');
      if (!sock) {
        msgs.push('Chybí třífázová zásuvka 400 V.');
      } else {
        const p1 = sim.nodePhases.get(`${sock.instanceId}:L1`)?.has('L1');
        const p2 = sim.nodePhases.get(`${sock.instanceId}:L2`)?.has('L2');
        const p3 = sim.nodePhases.get(`${sock.instanceId}:L3`)?.has('L3');
        if (!p1 || !p2 || !p3) {
          msgs.push('Zásuvka 400 V musí mít na svorkách L1, L2, L3 přivedeny všechny tři fáze L1, L2, L3.');
        }
        if (!sim.neutralNodes.has(`${sock.instanceId}:N`)) msgs.push('Chybí vodič N na 3f zásuvce.');
        if (!sim.peNodes.has(`${sock.instanceId}:PE`)) msgs.push('Chybí ochranný vodič PE na 3f zásuvce.');
      }
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
      'Vložte můstky N a PE, 3P jistič B16, 1P jistič B10, 3P stykač KM, spínač č. 1 (termostat) a 3f elektrická kamna 400 V. Silové fáze L1, L2, L3 veďte přes 3P jistič a kontakty 1-2, 3-4, 5-6 stykače KM na kamna. Cívku A1 ovládejte přes B10 a spínač č. 1.',
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
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'mcb-3p', toTerminalId: '1', color: 'L1' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'L2', toInstanceId: 'mcb-3p', toTerminalId: '3', color: 'L2' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'L3', toInstanceId: 'mcb-3p', toTerminalId: '5', color: 'L3' },
      { id: 'w4', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'mcb-10', toTerminalId: '1', color: 'L1' },
      { id: 'w5', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'bus-n', toTerminalId: 'N1', color: 'N' },
      { id: 'w6', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'bus-pe', toTerminalId: 'PE1', color: 'PE' },
      { id: 'w7', fromInstanceId: 'mcb-3p', fromTerminalId: '2', toInstanceId: 'km-1', toTerminalId: '1', color: 'L1' },
      { id: 'w8', fromInstanceId: 'mcb-3p', fromTerminalId: '4', toInstanceId: 'km-1', toTerminalId: '3', color: 'L2' },
      { id: 'w9', fromInstanceId: 'mcb-3p', fromTerminalId: '6', toInstanceId: 'km-1', toTerminalId: '5', color: 'L3' },
      { id: 'w10', fromInstanceId: 'km-1', fromTerminalId: '2', toInstanceId: 'stove-1', toTerminalId: 'L1', color: 'L1' },
      { id: 'w11', fromInstanceId: 'km-1', fromTerminalId: '4', toInstanceId: 'stove-1', toTerminalId: 'L2', color: 'L2' },
      { id: 'w12', fromInstanceId: 'km-1', fromTerminalId: '6', toInstanceId: 'stove-1', toTerminalId: 'L3', color: 'L3' },
      { id: 'w13', fromInstanceId: 'mcb-10', fromTerminalId: '2', toInstanceId: 'sw-term', toTerminalId: 'L', color: 'L1' },
      { id: 'w14', fromInstanceId: 'sw-term', fromTerminalId: '1', toInstanceId: 'km-1', toTerminalId: 'A1', color: 'SW' },
      { id: 'w15', fromInstanceId: 'bus-n', fromTerminalId: 'N2', toInstanceId: 'km-1', toTerminalId: 'A2', color: 'N' },
      { id: 'w16', fromInstanceId: 'bus-n', fromTerminalId: 'N3', toInstanceId: 'stove-1', toTerminalId: 'N', color: 'N' },
      { id: 'w17', fromInstanceId: 'bus-pe', fromTerminalId: 'PE2', toInstanceId: 'stove-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (items, _wires, sim) => {
      const msgs: string[] = [];
      const km = items.find((i) => i.type === 'contactor-km');
      const stove = items.find((i) => i.type === 'stove-3f');
      if (!km) {
        msgs.push('Chybí 3pólový stykač KM.');
      } else if (!sim.energizedContactors.has(km.instanceId)) {
        msgs.push('Cívka stykače KM není sepnutá (zkontrolujte A1 a A2).');
      }
      if (!stove) {
        msgs.push('Chybí 3f elektrická kamna 400 V.');
      } else {
        const p1 = sim.nodePhases.get(`${stove.instanceId}:L1`)?.has('L1');
        const p2 = sim.nodePhases.get(`${stove.instanceId}:L2`)?.has('L2');
        const p3 = sim.nodePhases.get(`${stove.instanceId}:L3`)?.has('L3');
        if (!p1 || !p2 || !p3) {
          msgs.push('Elektrická kamna nemají přivedeny všechny 3 fáze L1, L2, L3 přes stykač KM.');
        }
        if (!sim.neutralNodes.has(`${stove.instanceId}:N`)) msgs.push('Chybí vodič N na elektrických kamnech.');
        if (!sim.peNodes.has(`${stove.instanceId}:PE`)) msgs.push('Chybí ochranný vodič PE na elektrických kamnech.');
      }
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
      'Vložte můstek N, svorkovnici MET/HOP, hlavní vypínač 3P, svodič přepětí SPD 3P+N, jističochránič RCBO B16 a bojler 230 V. L1, L2, L3 veďte přes hlavní vypínač 3P na SPD. Z výstupu hlavního vypínače a můstku N napájejte RCBO a z něj bojler. Uzemněte SPD i bojler přes MET.',
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
      { id: 'w1', fromInstanceId: 'supply', fromTerminalId: 'L1', toInstanceId: 'qm-1', toTerminalId: '1', color: 'L1' },
      { id: 'w2', fromInstanceId: 'supply', fromTerminalId: 'L2', toInstanceId: 'qm-1', toTerminalId: '3', color: 'L2' },
      { id: 'w3', fromInstanceId: 'supply', fromTerminalId: 'L3', toInstanceId: 'qm-1', toTerminalId: '5', color: 'L3' },
      { id: 'w4', fromInstanceId: 'supply', fromTerminalId: 'N', toInstanceId: 'bus-n', toTerminalId: 'N1', color: 'N' },
      { id: 'w5', fromInstanceId: 'supply', fromTerminalId: 'PE', toInstanceId: 'met-1', toTerminalId: 'E1', color: 'PE' },
      { id: 'w6', fromInstanceId: 'qm-1', fromTerminalId: '2', toInstanceId: 'spd-1', toTerminalId: 'L1', color: 'L1' },
      { id: 'w7', fromInstanceId: 'qm-1', fromTerminalId: '4', toInstanceId: 'spd-1', toTerminalId: 'L2', color: 'L2' },
      { id: 'w8', fromInstanceId: 'qm-1', fromTerminalId: '6', toInstanceId: 'spd-1', toTerminalId: 'L3', color: 'L3' },
      { id: 'w9', fromInstanceId: 'bus-n', fromTerminalId: 'N2', toInstanceId: 'spd-1', toTerminalId: 'N', color: 'N' },
      { id: 'w10', fromInstanceId: 'spd-1', fromTerminalId: 'PE', toInstanceId: 'met-1', toTerminalId: 'E4', color: 'PE' },
      { id: 'w11', fromInstanceId: 'qm-1', fromTerminalId: '2', toInstanceId: 'rcbo-1', toTerminalId: '1', color: 'L1' },
      { id: 'w12', fromInstanceId: 'bus-n', fromTerminalId: 'N3', toInstanceId: 'rcbo-1', toTerminalId: 'N_in', color: 'N' },
      { id: 'w13', fromInstanceId: 'rcbo-1', fromTerminalId: '2', toInstanceId: 'boiler-1', toTerminalId: 'L', color: 'L1' },
      { id: 'w14', fromInstanceId: 'rcbo-1', fromTerminalId: 'N_out', toInstanceId: 'boiler-1', toTerminalId: 'N', color: 'N' },
      { id: 'w15', fromInstanceId: 'met-1', fromTerminalId: 'E2', toInstanceId: 'boiler-1', toTerminalId: 'PE', color: 'PE' },
    ],
    check: (items, _wires, sim) => {
      const msgs: string[] = [];
      const qm = items.find((i) => i.type === 'qm-3p');
      const spd = items.find((i) => i.type === 'spd-t2');
      const rcbo = items.find((i) => i.type === 'rcbo-1p');
      const boiler = items.find((i) => i.type === 'boiler-1f');
      if (!qm) msgs.push('Chybí hlavní vypínač 3P.');
      if (!rcbo) msgs.push('Chybí jističochránič RCBO B16.');
      if (!spd) {
        msgs.push('Chybí svodič přepětí SPD 3P+N.');
      } else if (
        !sim.liveNodes.has(`${spd.instanceId}:L1`) ||
        !sim.liveNodes.has(`${spd.instanceId}:L2`) ||
        !sim.liveNodes.has(`${spd.instanceId}:L3`) ||
        !sim.neutralNodes.has(`${spd.instanceId}:N`) ||
        !sim.peNodes.has(`${spd.instanceId}:PE`)
      ) {
        msgs.push('Svodič přepětí SPD nemá kompletně zapojené L1, L2, L3, N nebo PE.');
      }
      if (!boiler) {
        msgs.push('Chybí elektrický bojler 230 V.');
      } else {
        if (!sim.liveNodes.has(`${boiler.instanceId}:L`) || !sim.neutralNodes.has(`${boiler.instanceId}:N`)) {
          msgs.push('Bojler není pod napětím z jističochrániče RCBO.');
        }
        if (!sim.peNodes.has(`${boiler.instanceId}:PE`)) msgs.push('Chybí ochranný vodič PE na bojleru.');
      }
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
        case 'qm-1p':
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
        case 'contactor-1p':
          if (item.state === 1 || energizedContactors.has(id)) {
            addEdge(`${id}:1`, `${id}:2`);
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

  const energizedContactors = new Set<string>();
  const pass1 = buildGraph(energizedContactors);
  const pass1Live = pass1.bfs([...l1Starts, ...l2Starts, ...l3Starts]);
  const pass1Neutral = pass1.bfs(nStarts);

  for (const item of items) {
    if (item.type === 'contactor-km' || item.type === 'contactor-1p') {
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

  // Při práci na úlohách začínáme s výchozí tabulí (přívod sítě + posuvná/odstranitelná DIN lišta)
  const [items, setItems] = useState<PlacedItem[]>(EMPTY_BOARD_ITEMS);
  const [wires, setWires] = useState<BoardWire[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [collisionWarning, setCollisionWarning] = useState<string | null>(null);
  const [taskFeedback, setTaskFeedback] = useState<{
    checked: boolean;
    ok: boolean;
    messages: string[];
  } | null>(null);

  // Zoom (kolečkem myši) a posun (levým klikem do prázdna)
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [panning, setPanning] = useState<{
    startClientX: number;
    startClientY: number;
    startPanX: number;
    startPanY: number;
  } | null>(null);

  // Drag & Drop vodiče ze startovní svorky na cílovou svorku
  const [wiringDrag, setWiringDrag] = useState<{
    fromInstanceId: string;
    fromTerminalId: string;
    color: WireColor;
  } | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [hoveredTerminal, setHoveredTerminal] = useState<{
    instanceId: string;
    terminalId: string;
  } | null>(null);

  // Drag & Drop modulů a DIN lišty (včetně přilepených modulů na DIN liště)
  const [dragging, setDragging] = useState<{
    instanceId: string;
    offsetX: number;
    offsetY: number;
    attachedOffsets: Array<{ instanceId: string; relX: number; relY: number }>;
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

  const selectedItem = useMemo(
    () => items.find((i) => i.instanceId === selectedItemId) || null,
    [items, selectedItemId]
  );

  // Přibližování a oddalování kolečkem myši v pracovním poli (se zamezením scrollu stránky)
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = svgEl.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;

      setZoom((prevZoom) => {
        const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
        const nextZoom = Math.max(0.45, Math.min(2.8, prevZoom * factor));
        setPan((prevPan) => {
          const boardX = prevPan.x + relX * (BOARD_WIDTH / prevZoom);
          const boardY = prevPan.y + relY * (BOARD_HEIGHT / prevZoom);
          return {
            x: boardX - relX * (BOARD_WIDTH / nextZoom),
            y: boardY - relY * (BOARD_HEIGHT / nextZoom),
          };
        });
        return nextZoom;
      });
    };

    svgEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => svgEl.removeEventListener('wheel', handleWheel);
  }, []);

  // Mazání vybraného modulu nebo DIN lišty klávesou Delete / Backspace
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
        if (selectedItemId && selectedItemId !== 'supply') {
          e.preventDefault();
          setItems((prev) => prev.filter((i) => i.instanceId !== selectedItemId));
          setWires((prev) =>
            prev.filter(
              (w) => w.fromInstanceId !== selectedItemId && w.toInstanceId !== selectedItemId
            )
          );
          setSelectedItemId(null);
          setTaskFeedback(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemId]);

  const getTerminalCoords = (instanceId: string, terminalId: string) => {
    const item = items.find((i) => i.instanceId === instanceId);
    if (!item) return null;
    const def = PALETTE_MAP[item.type];
    if (!def) return null;
    const term = def.terminals.find((t) => t.id === terminalId);
    if (!term) return null;
    return { x: item.x + term.relX, y: item.y + term.relY, term };
  };

  const getSvgCoords = (e: { clientX: number; clientY: number }) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return { x: 0, y: 0 };
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    return {
      x: Math.round(pan.x + relX * (BOARD_WIDTH / zoom)),
      y: Math.round(pan.y + relY * (BOARD_HEIGHT / zoom)),
    };
  };

  // Najde nejbližší svorku v okolí kurzoru pro magnetické přichycení při Drag & Drop
  const findNearestTerminal = (
    x: number,
    y: number,
    exclude?: { instanceId: string; terminalId: string }
  ): { instanceId: string; terminalId: string; x: number; y: number } | null => {
    let best: { instanceId: string; terminalId: string; x: number; y: number } | null = null;
    let bestDist = 18; // poloměr přichycení v px

    for (const item of items) {
      const def = PALETTE_MAP[item.type];
      if (!def) continue;
      for (const term of def.terminals) {
        if (
          exclude &&
          exclude.instanceId === item.instanceId &&
          exclude.terminalId === term.id
        ) {
          continue;
        }
        const tx = item.x + term.relX;
        const ty = item.y + term.relY;
        const d = Math.hypot(x - tx, y - ty);
        if (d < bestDist) {
          bestDist = d;
          best = { instanceId: item.instanceId, terminalId: term.id, x: tx, y: ty };
        }
      }
    }
    return best;
  };

  // Načtení úlohy: standardně začínáme s prázdnou tabulí, tlačítko "Vzorové řešení" ukáže zapojenou úlohu
  const loadTask = (task: BoardTask, showSolution = false) => {
    setActiveTaskId(task.id);
    setSelectedLevel(task.level);
    if (showSolution) {
      const hasRail = task.items.some((it) => it.type === 'din-rail');
      const nextItems = hasRail
        ? task.items.map((it) => ({ ...it }))
        : [{ ...DEFAULT_DIN_RAIL }, ...task.items.map((it) => ({ ...it }))];
      setItems(nextItems);
      setWires(task.solutionWires.map((w) => ({ ...w })));
    } else {
      setItems(EMPTY_BOARD_ITEMS.map((it) => ({ ...it })));
      setWires([]);
    }
    setWiringDrag(null);
    setHoveredTerminal(null);
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

  const addItemToBoard = (type: string) => {
    const def = PALETTE_MAP[type];
    if (!def || def.zone === 'fixed') return;

    if (def.zone === 'din' && !items.some((i) => i.type === 'din-rail')) {
      setCollisionWarning(
        'Na tabuli není DIN lišta! Nejprve vložte DIN lištu TS 35 mm ze sekce 1.'
      );
      setTimeout(() => setCollisionWarning(null), 3500);
      return;
    }

    const freePos = findFreePosition(type, items);
    if (!freePos) {
      setCollisionWarning(
        def.zone === 'din'
          ? 'Na DIN liště již není volné místo pro další modul.'
          : 'V této zóně již není volné místo bez překryvu.'
      );
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
        type === 'qm-1p' ||
        type === 'qm-3p' ||
        type === 'din-rail'
          ? 1
          : 0,
    };
    setItems((prev) => [...prev, newItem]);
    setSelectedItemId(newItem.instanceId);
    setTaskFeedback(null);
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
    setTaskFeedback(null);
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

  // Levý klik do prázdného prostoru tabule zahájí posouvání (panning)
  const handleSvgMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;
    setSelectedItemId(null);
    setPanning({
      startClientX: e.clientX,
      startClientY: e.clientY,
      startPanX: pan.x,
      startPanY: pan.y,
    });
  };

  const startDragItem = (e: React.MouseEvent, item: PlacedItem) => {
    e.stopPropagation();
    if (e.button !== 0) return;
    setSelectedItemId(item.instanceId);
    const def = PALETTE_MAP[item.type];
    if (!def || def.zone === 'fixed') return;
    const coords = getSvgCoords(e);

    // Pokud začínáme posouvat DIN lištu, přilepíme k ní všechny DIN moduly, které na ní sedí
    const attachedOffsets =
      item.type === 'din-rail'
        ? items
            .filter(
              (other) => other.instanceId !== item.instanceId && isModuleOnRail(other, item)
            )
            .map((other) => ({
              instanceId: other.instanceId,
              relX: other.x - item.x,
              relY: other.y - item.y,
            }))
        : [];

    setDragging({
      instanceId: item.instanceId,
      offsetX: coords.x - item.x,
      offsetY: coords.y - item.y,
      attachedOffsets,
    });
  };

  // Zahájení tažení vodiče (Drag & Drop ze startovní svorky)
  const startWireDrag = (
    e: React.MouseEvent,
    instanceId: string,
    terminalId: string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const autoColor = getWireColorFromStart(instanceId, terminalId, items, sim);
    const c = getTerminalCoords(instanceId, terminalId);
    setWiringDrag({
      fromInstanceId: instanceId,
      fromTerminalId: terminalId,
      color: autoColor,
    });
    if (c) setMousePos({ x: c.x, y: c.y });
    setHoveredTerminal(null);
  };

  // Dokončení tažení vodiče (puštění myši na cílovou svorku)
  const completeWireDrag = (toInstanceId: string, toTerminalId: string) => {
    if (!wiringDrag) return;
    if (
      wiringDrag.fromInstanceId === toInstanceId &&
      wiringDrag.fromTerminalId === toTerminalId
    ) {
      setWiringDrag(null);
      setMousePos(null);
      setHoveredTerminal(null);
      return;
    }

    const exists = wires.some(
      (w) =>
        (w.fromInstanceId === wiringDrag.fromInstanceId &&
          w.fromTerminalId === wiringDrag.fromTerminalId &&
          w.toInstanceId === toInstanceId &&
          w.toTerminalId === toTerminalId) ||
        (w.fromInstanceId === toInstanceId &&
          w.fromTerminalId === toTerminalId &&
          w.toInstanceId === wiringDrag.fromInstanceId &&
          w.toTerminalId === wiringDrag.fromTerminalId)
    );

    if (!exists) {
      const newWire: BoardWire = {
        id: `wire-${Date.now().toString().slice(-5)}`,
        fromInstanceId: wiringDrag.fromInstanceId,
        fromTerminalId: wiringDrag.fromTerminalId,
        toInstanceId,
        toTerminalId,
        color: wiringDrag.color,
      };
      setWires((prev) => [...prev, newWire]);
    }

    setWiringDrag(null);
    setMousePos(null);
    setHoveredTerminal(null);
    setTaskFeedback(null);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (panning && svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const dxBoard = ((e.clientX - panning.startClientX) / rect.width) * (BOARD_WIDTH / zoom);
        const dyBoard = ((e.clientY - panning.startClientY) / rect.height) * (BOARD_HEIGHT / zoom);
        setPan({
          x: panning.startPanX - dxBoard,
          y: panning.startPanY - dyBoard,
        });
      }
      return;
    }

    const coords = getSvgCoords(e);

    if (wiringDrag) {
      const snap = findNearestTerminal(coords.x, coords.y, {
        instanceId: wiringDrag.fromInstanceId,
        terminalId: wiringDrag.fromTerminalId,
      });
      if (snap) {
        setHoveredTerminal({ instanceId: snap.instanceId, terminalId: snap.terminalId });
        setMousePos({ x: snap.x, y: snap.y });
      } else {
        setHoveredTerminal(null);
        setMousePos(coords);
      }
      return;
    }

    if (!dragging) return;

    setItems((prev) => {
      const draggedItem = prev.find((i) => i.instanceId === dragging.instanceId);
      if (!draggedItem) return prev;
      const def = PALETTE_MAP[draggedItem.type];
      if (!def) return prev;

      const rawX = coords.x - dragging.offsetX;
      const rawY = coords.y - dragging.offsetY;

      // 1. Posouvání DIN lišty společně se všemi přilepenými moduly
      if (draggedItem.type === 'din-rail') {
        const groupIds = new Set<string>([
          draggedItem.instanceId,
          ...dragging.attachedOffsets.map((a) => a.instanceId),
        ]);

        const canPlaceRailGroup = (candX: number, candY: number): boolean => {
          if (
            candX < 16 ||
            candX + def.width > BOARD_WIDTH - 16 ||
            candY < 24 ||
            candY + def.height > BOARD_HEIGHT - 24
          ) {
            return false;
          }
          if (
            hasCollision(
              draggedItem.instanceId,
              candX,
              candY,
              def.width,
              def.height,
              prev,
              groupIds,
              'din-rail'
            )
          ) {
            return false;
          }
          for (const att of dragging.attachedOffsets) {
            const mod = prev.find((p) => p.instanceId === att.instanceId);
            if (!mod) continue;
            const modDef = PALETTE_MAP[mod.type];
            if (!modDef) continue;
            const mx = candX + att.relX;
            const my = candY + att.relY;
            if (
              mx < 16 ||
              mx + modDef.width > BOARD_WIDTH - 16 ||
              my < 16 ||
              my + modDef.height > BOARD_HEIGHT - 16
            ) {
              return false;
            }
            if (
              hasCollision(
                mod.instanceId,
                mx,
                my,
                modDef.width,
                modDef.height,
                prev,
                groupIds,
                mod.type
              )
            ) {
              return false;
            }
          }
          return true;
        };

        const candX = Math.max(
          16,
          Math.min(BOARD_WIDTH - def.width - 16, Math.round(rawX / 8) * 8)
        );
        const candY = Math.max(
          24,
          Math.min(BOARD_HEIGHT - def.height - 24, Math.round(rawY / 8) * 8)
        );

        let finalX = draggedItem.x;
        let finalY = draggedItem.y;

        if (canPlaceRailGroup(candX, candY)) {
          finalX = candX;
          finalY = candY;
        } else if (canPlaceRailGroup(candX, draggedItem.y)) {
          finalX = candX;
        } else if (canPlaceRailGroup(draggedItem.x, candY)) {
          finalY = candY;
        } else {
          return prev;
        }

        const offsetMap = new Map(
          dragging.attachedOffsets.map((a) => [a.instanceId, a])
        );

        return prev.map((it) => {
          if (it.instanceId === draggedItem.instanceId) {
            return { ...it, x: finalX, y: finalY };
          }
          const att = offsetMap.get(it.instanceId);
          if (att) {
            return { ...it, x: finalX + att.relX, y: finalY + att.relY };
          }
          return it;
        });
      }

      // 2. Posouvání DIN modulu po DIN liště
      if (def.zone === 'din') {
        const rails = prev.filter((r) => r.type === 'din-rail');
        const railDef = PALETTE_MAP['din-rail'];
        if (rails.length > 0 && railDef) {
          let bestRail = rails[0];
          let bestDist = Infinity;
          for (const r of rails) {
            const d = Math.abs(rawY + def.height / 2 - (r.y + railDef.height / 2));
            if (d < bestDist) {
              bestDist = d;
              bestRail = r;
            }
          }
          const targetX = Math.max(
            bestRail.x + 8,
            Math.min(
              bestRail.x + railDef.width - def.width - 8,
              Math.round(rawX / 8) * 8
            )
          );
          const targetY = bestRail.y + Math.round((railDef.height - def.height) / 2);

          if (
            !hasCollision(
              draggedItem.instanceId,
              targetX,
              targetY,
              def.width,
              def.height,
              prev,
              undefined,
              draggedItem.type
            )
          ) {
            return prev.map((it) =>
              it.instanceId === draggedItem.instanceId
                ? { ...it, x: targetX, y: targetY }
                : it
            );
          }
        }
        return prev;
      }

      // 3. Posouvání ostatních prvků (můstky, spínače, spotřebiče)
      const targetX = Math.max(
        16,
        Math.min(BOARD_WIDTH - def.width - 16, Math.round(rawX / 8) * 8)
      );
      const targetY = Math.max(
        16,
        Math.min(BOARD_HEIGHT - def.height - 16, Math.round(rawY / 8) * 8)
      );

      let nextX = draggedItem.x;
      let nextY = draggedItem.y;

      if (
        !hasCollision(
          draggedItem.instanceId,
          targetX,
          targetY,
          def.width,
          def.height,
          prev,
          undefined,
          draggedItem.type
        )
      ) {
        nextX = targetX;
        nextY = targetY;
      } else if (
        !hasCollision(
          draggedItem.instanceId,
          targetX,
          draggedItem.y,
          def.width,
          def.height,
          prev,
          undefined,
          draggedItem.type
        )
      ) {
        nextX = targetX;
      } else if (
        !hasCollision(
          draggedItem.instanceId,
          draggedItem.x,
          targetY,
          def.width,
          def.height,
          prev,
          undefined,
          draggedItem.type
        )
      ) {
        nextY = targetY;
      } else {
        return prev;
      }

      return prev.map((it) =>
        it.instanceId === draggedItem.instanceId ? { ...it, x: nextX, y: nextY } : it
      );
    });
  };

  const handleMouseUp = (e: React.MouseEvent<SVGSVGElement>) => {
    if (wiringDrag) {
      const coords = getSvgCoords(e);
      const snap = findNearestTerminal(coords.x, coords.y, {
        instanceId: wiringDrag.fromInstanceId,
        terminalId: wiringDrag.fromTerminalId,
      });
      if (snap) {
        completeWireDrag(snap.instanceId, snap.terminalId);
      } else {
        setWiringDrag(null);
        setMousePos(null);
        setHoveredTerminal(null);
      }
    }
    setDragging(null);
    setPanning(null);
  };

  const removeWire = (wireId: string) => {
    setWires((prev) => prev.filter((w) => w.id !== wireId));
    setTaskFeedback(null);
  };

  const adjustZoom = (factor: number) => {
    setZoom((prevZoom) => {
      const nextZoom = Math.max(0.45, Math.min(2.8, prevZoom * factor));
      setPan((prevPan) => {
        const centerX = prevPan.x + (BOARD_WIDTH / prevZoom) * 0.5;
        const centerY = prevPan.y + (BOARD_HEIGHT / prevZoom) * 0.5;
        return {
          x: centerX - (BOARD_WIDTH / nextZoom) * 0.5,
          y: centerY - (BOARD_HEIGHT / nextZoom) * 0.5,
        };
      });
      return nextZoom;
    });
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
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
                  if (first) loadTask(first, false);
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

          <div className="flex flex-wrap items-center gap-2">
            {selectedItem && selectedItem.instanceId !== 'supply' && (
              <button
                onClick={removeSelectedItem}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Smazat: {selectedItem.label} (Del)
              </button>
            )}
            <button
              onClick={() => loadTask(activeTask, false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Vyčistit tabuli
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

        {/* Čtyři karty úloh v dané úrovni (kliknutí otevře úlohu s prázdnou tabulí) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {levelTasks.map((task) => {
            const isSelected = task.id === activeTaskId;
            return (
              <button
                key={task.id}
                onClick={() => loadTask(task, false)}
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
              className={`shrink-0 px-3.5 py-2 rounded-xl border text-xs font-medium max-w-md space-y-1 ${
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ==================================================================
            LEVÝ PANEL: PALETA PRVKŮ K PŘIDÁNÍ NA TABULI
           ================================================================== */}
        <div className="lg:col-span-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-4 max-h-[650px] overflow-y-auto">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              1. DIN lišta, sběrnice a můstky
            </h3>
            <div className="grid grid-cols-1 gap-1.5">
              {PALETTE_ITEMS.filter((p) => p.zone === 'rail' || p.zone === 'busbar').map(
                (item) => (
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
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
              2. Jednofázové moduly DIN (230 V)
            </h3>
            <div className="grid grid-cols-1 gap-1.5">
              {PALETTE_ITEMS.filter((p) => p.zone === 'din' && p.phaseGroup === '1f').map(
                (item) => (
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
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
              3. Třífázové moduly DIN (400 V)
            </h3>
            <div className="grid grid-cols-1 gap-1.5">
              {PALETTE_ITEMS.filter((p) => p.zone === 'din' && p.phaseGroup === '3f').map(
                (item) => (
                  <button
                    key={item.type}
                    onClick={() => addItemToBoard(item.type)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800/80 text-left transition-all group"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-200 group-hover:text-indigo-300">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-slate-500">{item.description}</div>
                    </div>
                    <Plus className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 shrink-0 ml-2" />
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              4. Spínače a spotřebiče (230/400 V)
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
          {/* Diagnostická lišta s pevnou výškou (žádné posouvání tabule při tažení vodiče) */}
          <div
            className={`h-10 rounded-xl px-4 border flex items-center justify-between gap-2 whitespace-nowrap overflow-hidden ${
              sim.shortCircuit || sim.rcdTripped
                ? 'bg-rose-950/60 border-rose-500/40 text-rose-200'
                : 'bg-slate-900/90 border-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2 text-xs truncate">
              {sim.shortCircuit || sim.rcdTripped ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="font-bold truncate">{sim.diagnostics[0]}</span>
                </>
              ) : collisionWarning ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-amber-300 font-semibold truncate">{collisionWarning}</span>
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

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] text-slate-400 hidden xl:inline">
                Kolečko: Zoom • Tažení v prázdnu: Posun • Del: Smazat prvek
              </span>
              <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-lg px-1.5 py-0.5">
                <button
                  onClick={() => adjustZoom(1 / 1.15)}
                  title="Oddálit"
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono font-bold text-slate-300 w-10 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => adjustZoom(1.15)}
                  title="Přiblížit"
                  className="p-1 text-slate-400 hover:text-white transition-colors"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                {(zoom !== 1 || pan.x !== 0 || pan.y !== 0) && (
                  <button
                    onClick={resetView}
                    title="Vycentrovat pohled (100%)"
                    className="p-1 text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* SVG Montážní tabule */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <svg
              ref={svgRef}
              viewBox={`${pan.x} ${pan.y} ${BOARD_WIDTH / zoom} ${BOARD_HEIGHT / zoom}`}
              className={`w-full h-auto select-none ${
                panning ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              onMouseDown={handleSvgMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => {
                setPanning(null);
                setDragging(null);
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

              {/* Nekonečné mřížkované plátno při posouvání a oddalování */}
              <rect x={-3000} y={-3000} width={7000} height={7000} fill="#090d16" />
              <rect x={-3000} y={-3000} width={7000} height={7000} fill="url(#board-grid)" />

              {/* ============================================================
                  ZÓNA 1: ROZVADĚČ
                 ============================================================ */}
              <rect
                x="12"
                y="12"
                width={BOARD_WIDTH - 24}
                height="236"
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
                ROZVADĚČ (MŮSTKY N / PE / MET + POSUVNÁ DIN LIŠTA 35 MM)
              </text>

              {/* ============================================================
                  ZÓNA 2: MONTÁŽNÍ PANEL (KRABICE, SPÍNAČE, SPOTŘEBIČE)
                 ============================================================ */}
              <rect
                x="12"
                y="260"
                width={BOARD_WIDTH - 24}
                height={BOARD_HEIGHT - 272}
                rx="12"
                fill="#0f172a"
                fillOpacity="0.35"
                stroke="#1e293b"
              />
              <text
                x="24"
                y="278"
                fill="#64748b"
                fontSize="10"
                fontWeight="bold"
                letterSpacing="1"
              >
                MONTÁŽNÍ PANEL (ODBOČNÉ KRABICE, SPÍNAČE, ZÁSUVKY, SPOTŘEBIČE 230/400 V)
              </text>

              {/* ============================================================
                  VRSTVA POSUVNÝCH A ODSTRANITELNÝCH DIN LIŠT TS 35 MM
                  (kreslí se pod moduly, při tažení posouvá i přilepené moduly)
                 ============================================================ */}
              {items
                .filter((item) => item.type === 'din-rail')
                .map((rail) => {
                  const def = PALETTE_MAP['din-rail'];
                  if (!def) return null;
                  const isSelected = selectedItemId === rail.instanceId;
                  const slotCount = Math.floor((def.width - 36) / 42);

                  return (
                    <g
                      key={rail.instanceId}
                      transform={`translate(${rail.x}, ${rail.y})`}
                      onMouseDown={(e) => startDragItem(e, rail)}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <rect
                        width={def.width}
                        height={def.height}
                        rx="3"
                        fill="#334155"
                        stroke={isSelected ? '#fbbf24' : '#64748b'}
                        strokeWidth={isSelected ? 2.5 : 1.5}
                      />
                      <rect
                        x="2"
                        y="8"
                        width={def.width - 4}
                        height="20"
                        fill="#1e293b"
                      />
                      {Array.from({ length: slotCount }).map((_, idx) => (
                        <rect
                          key={idx}
                          x={18 + idx * 42}
                          y="13"
                          width="22"
                          height="10"
                          rx="5"
                          fill="#0f172a"
                          stroke="#475569"
                          strokeWidth="1"
                        />
                      ))}
                      <text
                        x={def.width - 8}
                        y="-5"
                        textAnchor="end"
                        fill={isSelected ? '#fbbf24' : '#64748b'}
                        fontSize="9"
                        fontWeight="bold"
                      >
                        {rail.label} (posuvná / Del = smazat)
                      </text>
                    </g>
                  );
                })}

              {/* ============================================================
                  VRSTVA VODIČŮ (POD MODULY, PRAVOÚHLÉ TRASY MIMO MODULY)
                 ============================================================ */}
              {wires.map((w) => {
                const d = wirePaths[w.id];
                if (!d) return null;

                const n1 = `${w.fromInstanceId}:${w.fromTerminalId}`;
                const n2 = `${w.toInstanceId}:${w.toTerminalId}`;
                const isLive = sim.liveNodes.has(n1) || sim.liveNodes.has(n2);
                const strokeColor = WIRE_COLORS[w.color]?.stroke || '#b45309';

                return (
                  <g
                    key={w.id}
                    className="cursor-pointer group"
                    onMouseDown={(e) => e.stopPropagation()}
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
                    <path
                      d={d}
                      fill="none"
                      stroke="#090d16"
                      strokeWidth="5.6"
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
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:stroke-rose-400 transition-colors"
                    />
                  </g>
                );
              })}

              {/* Dočasný pravoúhlý vodič při tažení myší (Drag & Drop) */}
              {wiringDrag &&
                mousePos &&
                (() => {
                  const start = getTerminalCoords(
                    wiringDrag.fromInstanceId,
                    wiringDrag.fromTerminalId
                  );
                  if (!start) return null;
                  const midY = Math.round((start.y + mousePos.y) / 2);
                  const previewD = `M ${start.x} ${start.y} L ${start.x} ${midY} L ${mousePos.x} ${midY} L ${mousePos.x} ${mousePos.y}`;
                  return (
                    <path
                      d={previewD}
                      fill="none"
                      stroke={WIRE_COLORS[wiringDrag.color].stroke}
                      strokeWidth="3"
                      strokeDasharray="6 4"
                      className="pointer-events-none"
                    />
                  );
                })()}

              {/* ============================================================
                  VYKRESLENÍ VŠECH PŘÍSTROJŮ A MODULŮ NA TABULI
                 ============================================================ */}
              {items
                .filter((item) => item.type !== 'din-rail')
                .map((item) => {
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
                    (item.type === 'contactor-km' || item.type === 'contactor-1p') &&
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

                      {/* Indikace pro žárovku 1-větvovou */}
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

                      {/* Indikace pro lustr 2-větvový */}
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

                      {/* Indikace stykače KM (1P i 3P) */}
                      {(item.type === 'contactor-km' || item.type === 'contactor-1p') && (
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

                      {/* Přepínací tlačítko ON/OFF */}
                      {(item.type.startsWith('mcb') ||
                        item.type.startsWith('rcd') ||
                        item.type === 'rcbo-1p' ||
                        item.type === 'qm-1p' ||
                        item.type === 'qm-3p' ||
                        item.type === 'contactor-1p' ||
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

                      {/* Vykreslení svorek (terminálů) s podporou Drag & Drop */}
                      {def.terminals.map((t) => {
                        const nodeKey = `${item.instanceId}:${t.id}`;
                        const isTermLive = sim.liveNodes.has(nodeKey);
                        const isTermN = sim.neutralNodes.has(nodeKey);
                        const isTermPE = sim.peNodes.has(nodeKey);
                        const isDragStart =
                          wiringDrag?.fromInstanceId === item.instanceId &&
                          wiringDrag?.fromTerminalId === t.id;
                        const isHoveredTarget =
                          hoveredTerminal?.instanceId === item.instanceId &&
                          hoveredTerminal?.terminalId === t.id;

                        return (
                          <g
                            key={t.id}
                            transform={`translate(${t.relX}, ${t.relY})`}
                            className="cursor-crosshair"
                            onMouseDown={(e) => startWireDrag(e, item.instanceId, t.id)}
                            onMouseUp={(e) => {
                              e.stopPropagation();
                              completeWireDrag(item.instanceId, t.id);
                            }}
                          >
                            {/* Větší neviditelná plocha pro pohodlné uchopení a puštění vodiče */}
                            <circle r={12} fill="transparent" />
                            <circle
                              r={isDragStart || isHoveredTarget ? 8.5 : 6}
                              fill={
                                isDragStart || isHoveredTarget
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
                              className="pointer-events-none"
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
