export type PortId = "san-ysidro" | "otay-mesa" | "otay-ii";

export type GateType =
  | "ready"
  | "standard"
  | "sentri"
  | "ped-east"
  | "ped-west"
  | "ped-general"
  | "ped-ready"
  | "commercial";

export type Mode = "vehicle" | "pedestrian" | "commercial";
export type LaneStatus = "open" | "closed" | "delayed" | "unknown";
export type TrafficLevel = "green" | "yellow" | "red" | "unknown";

export interface Port {
  id: PortId;
  name: string;
  cbpPortNumber: string;
  coords: { lat: number; lng: number };
  geofenceRadiusM: number;
  enabled: boolean;
  lanes: GateType[];
}

export interface LaneWait {
  portId: PortId;
  gate: GateType;
  mode: Mode;
  status: LaneStatus;
  officialMinutes: number | null;
  communityMinutes: number | null;
  communityReports: number;
  lanesOpen: number | null;
  updatedAt: string;
  sourceTime?: string;
}

export interface WaitTimeReport {
  id: string;
  portId: PortId;
  gate: GateType;
  minutesWaited: number;
  queuePosition: "inicio" | "mitad" | "final" | "no-se";
  createdAt: string;
  deviceHash: string;
  geoValidated: boolean;
}

export interface HistoryPoint {
  ts: string;
  minutes: number | null;
}
