"use client";

import { useState } from "react";
import { PORTS, REFRESH_MINUTES } from "@/lib/config";
import { MODE_LABELS } from "@/lib/labels";
import { useWaits } from "@/hooks/useWaits";
import { LaneCard } from "./LaneCard";
import { Tabs } from "./ui/Tabs";
import type { Mode, PortId } from "@/lib/types";

export function Dashboard() {
  const { waits, loading, error } = useWaits();
  const ports = PORTS.filter((p) => p.enabled);
  const [portId, setPortId] = useState<PortId>(ports[0].id);
  const [mode, setMode] = useState<Mode>("vehicle");

  const all = waits.filter((l) => l.portId === portId);
  const modes = [...new Set(all.map((l) => l.mode))];
  const activeMode: Mode = modes.includes(mode) ? mode : (modes[0] ?? mode);
  const lanes = all.filter((l) => l.mode === activeMode);

  const updated = all[0]
    ? new Date(all[0].updatedAt).toLocaleTimeString("es-MX", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Tijuana",
      })
    : "—";

  return (
    <>
      <Tabs
        items={ports.map((p) => ({
          label: p.name,
          active: p.id === portId,
          onSelect: () => setPortId(p.id),
        }))}
      />
      <Tabs
        items={modes.map((m) => ({
          label: MODE_LABELS[m],
          active: m === activeMode,
          onSelect: () => setMode(m),
        }))}
      />

      {error && (
        <p className="rounded-lg bg-red-100 p-2 text-center text-sm text-red-900">
          No se pudieron actualizar los datos. Reintentando…
        </p>
      )}

      <section className="space-y-3">
        {loading ? (
          <p className="text-zinc-500">Cargando…</p>
        ) : lanes.length ? (
          lanes.map((l) => <LaneCard key={l.gate} lane={l} />)
        ) : (
          <p className="text-zinc-500">No hay carriles para esta selección.</p>
        )}
      </section>

      <p className="text-center text-xs text-zinc-500">
        Fuente: CBP · consultado {updated} · se renueva cada{" "}
        {REFRESH_MINUTES} min
      </p>
    </>
  );
}
