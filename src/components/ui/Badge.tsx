import clsx from "clsx";
import type { TrafficLevel } from "@/lib/types";
import { LEVEL_LABELS } from "@/lib/labels";

const styles: Record<TrafficLevel, string> = {
  green: "bg-green-600 text-white",
  yellow: "bg-yellow-400 text-black",
  red: "bg-red-600 text-white",
  unknown: "bg-zinc-500 text-white",
};

export function Badge({ level }: { level: TrafficLevel }) {
  return (
    <span className={clsx("rounded-full px-3 py-1 text-sm font-bold", styles[level])}>
      {LEVEL_LABELS[level]}
    </span>
  );
}
