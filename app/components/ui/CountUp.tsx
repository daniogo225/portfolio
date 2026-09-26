"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { useSite } from "../site/SiteProvider";

const NUMBER = /\d{1,3}(?:[\s  ,]\d{3})+|\d+/;

function format(value: number, separator: string) {
  const digits = Math.round(value).toString();
  return separator ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, separator) : digits;
}

/** Fait défiler la partie numérique d’une valeur (« 2 500+ ») quand elle entre dans l’écran. */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const { calm } = useSite();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const match = value.match(NUMBER);

  useEffect(() => {
    const element = ref.current;
    if (!element || !match || !inView || calm) return;
    const raw = match[0];
    const separator = raw.match(/\D/)?.[0] ?? "";
    const target = Number(raw.replace(/\D/g, ""));
    const before = value.slice(0, match.index);
    const after = value.slice((match.index ?? 0) + raw.length);
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        element.textContent = `${before}${format(latest, separator)}${after}`;
      },
    });
    return () => controls.stop();
    // La valeur affichée ne dépend que du texte source et de la visibilité.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, calm, value]);

  return (
    <span className={className}>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
    </span>
  );
}
