import { useEffect, useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Live WIB clock — Asia/Jakarta, always                              */
/* ------------------------------------------------------------------ */

export interface WibTime {
  h: string;
  m: string;
  s: string;
  weekday: string;
  date: string;
  full: string;
}

const timeFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});
const dateFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Jakarta",
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function useWibClock(): WibTime {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return useMemo(() => {
    const parts = timeFmt.formatToParts(now);
    const get = (type: string) =>
      parts.find((p) => p.type === type)?.value ?? "00";
    const rawDate = dateFmt.format(now).toUpperCase(); // "WED, 28 OCT 2026"
    const [weekday, ...rest] = rawDate.split(", ");
    return {
      h: get("hour"),
      m: get("minute"),
      s: get("second"),
      weekday: weekday ?? "",
      date: rest.join(", "),
      full: `${weekday}, ${rest.join(", ")}`,
    };
  }, [now]);
}

/* ------------------------------------------------------------------ */
/*  Ticking counter — animate to target once told to start             */
/* ------------------------------------------------------------------ */

export function useTweenedNumber(target: number, duration = 1.6) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / (duration * 1000), 1);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -9 * p); // expo.out
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return { value, setInView: () => setStarted(true) };
}
