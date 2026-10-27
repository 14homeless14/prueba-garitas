import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { GATE_LABELS } from "@/lib/labels";
import { trafficLevel } from "@/lib/traffic-light";
import type { LaneWait } from "@/lib/types";

const fmt = (m: number | null) => (m === null ? "—" : `${m}`);

export function LaneCard({ lane }: { lane: LaneWait }) {
  const level =
    lane.status === "closed" ? "unknown" : trafficLevel(lane.officialMinutes);
  const hasCommunity = lane.communityReports > 0 && lane.communityMinutes !== null;
  const cbpTime = lane.sourceTime?.replace(/^At\s+/i, "");

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{GATE_LABELS[lane.gate]}</h3>
        <Badge level={level} />
      </div>

      <div className={hasCommunity ? "mt-3 grid grid-cols-2 gap-4" : "mt-3"}>
        <div>
          <p className="text-sm text-zinc-500">
            Aduanas y Protección Fronteriza de EE. UU.
          </p>
          <p className="text-4xl font-extrabold tabular-nums">
            {lane.status === "closed" ? "Cerrado" : fmt(lane.officialMinutes)}
            {lane.status !== "closed" && (
              <span className="ml-1 text-base font-medium">min</span>
            )}
          </p>
          <p className="text-xs text-zinc-500">
            {lane.lanesOpen !== null && lane.status !== "closed" && (
              <>
                {lane.lanesOpen} carril{lane.lanesOpen === 1 ? "" : "es"} abierto
                {lane.lanesOpen === 1 ? "" : "s"}
              </>
            )}
            {lane.lanesOpen !== null && lane.status !== "closed" && cbpTime && " · "}
            {cbpTime && <>dato de las {cbpTime}</>}
          </p>
        </div>

        {hasCommunity && (
          <div>
            <p className="text-sm text-zinc-500">Comunidad (30 min)</p>
            <p className="text-4xl font-extrabold tabular-nums">
              {fmt(lane.communityMinutes)}
              <span className="ml-1 text-base font-medium">min</span>
            </p>
            <p className="text-xs text-zinc-500">
              {lane.communityReports} reporte
              {lane.communityReports === 1 ? "" : "s"}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
