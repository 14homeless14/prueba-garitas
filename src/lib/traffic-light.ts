import { THRESHOLDS } from "./config";
import type { TrafficLevel } from "./types";

export function trafficLevel(minutes: number | null): TrafficLevel {
  if (minutes === null) return "unknown";
  if (minutes < THRESHOLDS.greenMax) return "green";
  if (minutes <= THRESHOLDS.yellowMax) return "yellow";
  return "red";
}
