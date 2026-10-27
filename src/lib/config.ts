import type { Port } from "./types";

export const THRESHOLDS = { greenMax: 30, yellowMax: 90 } as const;

export const PORTS: Port[] = [
  {
    id: "san-ysidro",
    name: "San Ysidro",
    cbpPortNumber: "250401",
    coords: { lat: 32.543, lng: -117.03 },
    geofenceRadiusM: 3000,
    enabled: true,
    lanes: ["ready", "standard", "sentri", "ped-general", "ped-ready"],
  },
  {
    id: "otay-mesa",
    name: "Otay Mesa",
    cbpPortNumber: "250601",
    coords: { lat: 32.552, lng: -116.938 },
    geofenceRadiusM: 3000,
    enabled: true,
    lanes: ["ready", "standard", "sentri", "ped-general", "ped-ready"],
  },
  {
    id: "otay-ii",
    name: "Otay II (comercial)",
    cbpPortNumber: "250601",
    coords: { lat: 32.548, lng: -116.91 },
    geofenceRadiusM: 3000,
    enabled: process.env.NEXT_PUBLIC_ENABLE_OTAY_II === "true",
    lanes: ["commercial"],
  },
];

export const REFRESH_MINUTES = 20;
