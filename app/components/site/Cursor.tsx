"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useSite } from "./SiteProvider";

const INTERACTIVE = "a, button, [role='button'], input, textarea, label, summary";

/**
 * Curseur sur mesure, seulement avec une souris : un point d’encre qui s’élargit en anneau
 * sur les éléments cliquables. Le curseur natif reste visible dans les champs de saisie.
 */
export default function Cursor() {
  const { calm } = useSite();
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 60, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 900, damping: 60, mass: 0.3 });

  useEffect(() => {
    const fine = matchMedia("(pointer: fine)");
    const sync = () => setEnabled(fine.matches);
    sync();
    fine.addEventListener("change", sync);
    return () => fine.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.dataset.cursor = "";
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as Element | null;
      setHover(Boolean(target?.closest(INTERACTIVE)));
    };
    const press = () => setDown(true);
    const release = () => setDown(false);
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      delete document.documentElement.dataset.cursor;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="cursor"
      aria-hidden="true"
      data-hover={hover ? "" : undefined}
      data-down={down ? "" : undefined}
      style={calm ? { x, y } : { x: sx, y: sy }}
    />
  );
}
