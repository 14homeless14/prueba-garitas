import type { GateType, Mode, TrafficLevel } from "./types";

export const GATE_LABELS: Record<GateType, string> = {
  ready: "Ready Lane",
  standard: "General",
  sentri: "SENTRI",
  "ped-east": "PedEast",
  "ped-west": "PedWest",
  "ped-general": "Peatonal General",
  "ped-ready": "Peatonal Ready",
  commercial: "Comercial",
};

export const MODE_LABELS: Record<Mode, string> = {
  vehicle: "Vehicular",
  pedestrian: "Peatonal",
  commercial: "Comercial",
};

export const LEVEL_LABELS: Record<TrafficLevel, string> = {
  green: "Fluido",
  yellow: "Moderado",
  red: "Congestionado",
  unknown: "Sin datos",
};
