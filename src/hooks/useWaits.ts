"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { REFRESH_MINUTES } from "@/lib/config";
import { fetchWaits } from "@/lib/sources/cbp";
import type { LaneWait } from "@/lib/types";


export function useWaits() {
  const [waits, setWaits] = useState<LaneWait[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const lastFetch = useRef(0);

  const load = useCallback(async () => {
    try {
      const fresh = await fetchWaits();
      setWaits(fresh);
      setError(false);
      lastFetch.current = Date.now();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const intervalMs = REFRESH_MINUTES * 60_000;
    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (timer === null) timer = setInterval(load, intervalMs);
    };
    const stop = () => {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        if (Date.now() - lastFetch.current >= intervalMs) load();
        start();
      } else {
        stop();
      }
    };

    // Primera carga diferida (evita setState síncrono dentro del efecto)
    const first = setTimeout(() => {
      if (document.visibilityState === "visible") {
        load();
        start();
      }
    }, 0);

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearTimeout(first);
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [load]);

  return { waits, loading, error };
}
