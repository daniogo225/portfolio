"use client";

import Image from "next/image";
import { useInView } from "motion/react";
import { useEffect, useRef } from "react";

// Les paliers grossiers, du plus gros au plus fin, et le temps que chacun reste à l’écran.
// L’image finale (48 pixels de large) est dessous : elle seule reste.
const STEPS = [
  { file: "06", hold: 340 },
  { file: "12", hold: 260 },
  { file: "24", hold: 220 },
] as const;

const src = (file: string) => `/portraits/pixel/zie-${file}.png`;

/**
 * Le portrait en pixel art. Quand il entre dans l’écran, il arrive en gros pixels puis se met au
 * point, palier par palier, jusqu’à sa finesse définitive. Sans animation (`still`), sans
 * JavaScript ou si l’effet a déjà joué, seule l’image finale est affichée.
 */
export default function PixelPortrait({ alt, still }: { alt: string; still: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const played = useRef(false);

  useEffect(() => {
    const frame = ref.current;
    if (!frame || played.current) return;
    if (still) {
      delete frame.dataset.step;
      return;
    }
    if (!inView) {
      frame.dataset.step = "wait";
      return;
    }

    const timers: number[] = [];
    let at = 0;
    STEPS.forEach((step, index) => {
      timers.push(window.setTimeout(() => (frame.dataset.step = String(index)), at));
      at += step.hold;
    });
    timers.push(
      window.setTimeout(() => {
        played.current = true;
        delete frame.dataset.step;
      }, at),
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [inView, still]);

  return (
    <div ref={ref} className="pixel-portrait">
      <Image src={src("48")} alt={alt} width={48} height={64} unoptimized />
      {STEPS.map((step, index) => (
        <Image key={step.file} data-step={index} src={src(step.file)} alt="" aria-hidden="true" width={48} height={64} loading="eager" unoptimized />
      ))}
    </div>
  );
}
