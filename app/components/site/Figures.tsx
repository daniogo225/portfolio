"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { EASE_OUT } from "../ui/RevealText";
import { useSite } from "./SiteProvider";

type Figure = { value: number; suffix: string; caption: string };

/**
 * Le nombre monte sur son dernier tiers, sans changer de largeur. Il attend sous l’écran à sa
 * valeur de départ, pour ne pas sauter à l’entrée ; animations coupées, il est posé tel quel.
 */
function Count({ value, suffix }: Pick<Figure, "value" | "suffix">) {
  const { locale, calm } = useSite();
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  const inView = useInView(ref, { once: true, amount: 1 });
  const final = value.toLocaleString(locale === "fr" ? "fr-FR" : "en-US");

  useEffect(() => {
    const node = ref.current;
    if (!node || calm || done.current) return;
    const format = (n: number) => Math.round(n).toLocaleString(locale === "fr" ? "fr-FR" : "en-US");
    const start = Math.floor(value * 0.67);
    node.textContent = format(start);
    if (!inView) return () => void (node.textContent = final);
    const controls = animate(start, value, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (n) => void (node.textContent = format(n)),
      onComplete: () => void (done.current = true),
    });
    return () => {
      controls.stop();
      node.textContent = final;
    };
  }, [inView, calm, value, locale, final]);

  return (
    <strong>
      <span ref={ref}>{final}</span>
      {suffix}
    </strong>
  );
}

/** Trois chiffres, chacun avec sa légende : une rangée sur ordinateur, une pile sur téléphone. */
export default function Figures() {
  const { t } = useSite();

  return (
    <ul className="figures">
      {t.figures.map((figure) => (
        <li key={figure.caption}>
          <Count value={figure.value} suffix={figure.suffix} />
          <span>{figure.caption}</span>
        </li>
      ))}
    </ul>
  );
}
