import { PORTS } from "../config";
import { getMockWaits } from "./mock";
import type { GateType, LaneStatus, LaneWait, Mode, PortId } from "../types";

const CBP_URL =
  process.env.NEXT_PUBLIC_CBP_URL ?? "https://bwt.cbp.gov/api/waittimes";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Raw = Record<string, any>;

function toLane(
  portId: PortId,
  gate: GateType,
  mode: Mode,
  lane: Raw | undefined,
  now: string
): LaneWait | null {
  if (!lane) return null;
  const opStatus = String(lane.operational_status ?? "").toLowerCase();
  const rawDelay = String(lane.delay_minutes ?? "").trim();
  const parsed = rawDelay === "" ? NaN : Number(rawDelay);

  let status: LaneStatus = "unknown";
  let minutes: number | null = Number.isFinite(parsed) ? parsed : null;

  if (opStatus.includes("closed")) {
    status = "closed";
    minutes = null;
  } else if (opStatus.includes("no delay")) {
    status = "open";
    minutes = minutes ?? 0;
  } else if (opStatus.includes("delay")) {
    status = "delayed";
  } else if (minutes === null) {
    return null; // N/A o sin datos: no se muestra la tarjeta
  }

  const open = Number(lane.lanes_open);
  const sourceTime = String(lane.update_time ?? "").trim();
  return {
    portId,
    gate,
    mode,
    status,
    officialMinutes: minutes,
    communityMinutes: null,
    communityReports: 0,
    lanesOpen: Number.isFinite(open) ? open : null,
    updatedAt: now,
    sourceTime: sourceTime || undefined,
  };
}

export function parseCbp(data: unknown): LaneWait[] {
  if (!Array.isArray(data)) throw new Error("Formato inesperado de CBP");
  const now = new Date().toISOString();
  const out = new Map<string, LaneWait>();

  const put = (l: LaneWait | null) => {
    if (l && !out.has(`${l.portId}:${l.gate}`)) out.set(`${l.portId}:${l.gate}`, l);
  };

  for (const port of PORTS.filter((p) => p.enabled && p.id !== "otay-ii")) {
    const entries = (data as Raw[]).filter(
      (e) => String(e.port_number) === port.cbpPortNumber
    );

    for (const e of entries) {
      const car = e.passenger_vehicle_lanes as Raw | undefined;
      put(toLane(port.id, "standard", "vehicle", car?.standard_lanes, now));
      put(toLane(port.id, "sentri", "vehicle", car?.NEXUS_SENTRI_lanes, now));
      put(toLane(port.id, "ready", "vehicle", car?.ready_lanes, now));

      const ped = e.pedestrian_lanes as Raw | undefined;
      put(toLane(port.id, "ped-general", "pedestrian", ped?.standard_lanes, now));
      put(toLane(port.id, "ped-ready", "pedestrian", ped?.ready_lanes, now));
    }
  }

  const order: Record<string, number> = {};
  PORTS.forEach((p) =>
    p.lanes.forEach((g, i) => (order[`${p.id}:${g}`] = i))
  );
  return [...out.values()].sort(
    (a, b) =>
      (order[`${a.portId}:${a.gate}`] ?? 99) - (order[`${b.portId}:${b.gate}`] ?? 99)
  );
}

export async function fetchWaits(): Promise<LaneWait[]> {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return getMockWaits();

  const res = await fetch(CBP_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`CBP respondió ${res.status}`);
  const lanes = parseCbp(await res.json());
  if (lanes.length === 0) throw new Error("CBP no devolvió carriles");
  return lanes;
}
