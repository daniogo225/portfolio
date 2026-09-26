"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Africa/Abidjan",
});

/** Heure locale d’Abidjan (UTC+0), mise à jour chaque minute. Vide avant l’hydratation. */
export default function useAbidjanTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    let timeout = 0;
    const tick = () => {
      setTime(formatter.format(new Date()));
      timeout = window.setTimeout(tick, 60_000 - (Date.now() % 60_000));
    };
    const frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, []);

  return time;
}
