// Minutos transcurridos desde la lectura de CBP (hora del Pacífico).
export function sourceAgeMinutes(
  sourceTime?: string,
  now: Date = new Date()
): number | null {
  if (!sourceTime || !/\bP[DS]T\b/i.test(sourceTime)) return null;

  let minutes: number;
  const m = sourceTime.match(/(\d{1,2}):(\d{2})\s*(am|pm)/i);
  if (m) {
    let h = Number(m[1]) % 12;
    if (m[3].toLowerCase() === "pm") h += 12;
    minutes = h * 60 + Number(m[2]);
  } else if (/noon/i.test(sourceTime)) {
    minutes = 720;
  } else if (/midnight/i.test(sourceTime)) {
    minutes = 0;
  } else {
    return null;
  }

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);
  const h = Number(parts.find((p) => p.type === "hour")?.value) % 24;
  const mi = Number(parts.find((p) => p.type === "minute")?.value);
  return (h * 60 + mi - minutes + 1440) % 1440;
}

export function formatAge(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const r = min % 60;
  return r === 0 ? `${h} h` : `${h} h ${r} min`;
}
