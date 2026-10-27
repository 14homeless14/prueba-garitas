import { PORTS } from "../config";
import type { LaneWait, GateType, Mode } from "../types";

const modeOf = (g: GateType): Mode =>
  g.startsWith("ped") ? "pedestrian" : g === "commercial" ? "commercial" : "vehicle";

const rand = (min: number, max: number) =>
  Math.round(min + Math.random() * (max - min));

export function getMockWaits(): LaneWait[] {
  const now = new Date().toISOString();
  return PORTS.filter((p) => p.enabled).flatMap((p) =>
    p.lanes.map((gate) => {
      const official = rand(5, 130);
      return {
        portId: p.id,
        gate,
        mode: modeOf(gate),
        status: "open" as const,
        officialMinutes: official,
        communityMinutes: Math.max(0, official + rand(-20, 25)),
        communityReports: rand(0, 12),
        lanesOpen: rand(2, 10),
        updatedAt: now,
      };
    })
  );
}
