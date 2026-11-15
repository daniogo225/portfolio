"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import type { SiteContent } from "../../data/content";
import useMediaQuery from "../ui/useMediaQuery";
import { useSite } from "./SiteProvider";

type Scene = SiteContent["build"]["scenes"][number];

// Chaque scène tient l’écran un moment, puis la caméra glisse vers la suivante.
const HOLD = 0.14;

/** Position de la caméra, en scènes : 0 sur la première, 1 sur la deuxième, etc., avec des paliers. */
function cameraStops(count: number) {
  const input: number[] = [];
  const output: number[] = [];
  const span = 1 / (count - 1);
  for (let index = 0; index < count; index++) {
    const centre = index * span;
    input.push(Math.max(0, centre - HOLD * span), Math.min(1, centre + HOLD * span));
    output.push(index, index);
  }
  return { input: input.slice(1, -1), output: output.slice(1, -1) };
}

function SceneView({ scene, index, camera, moving }: { scene: Scene; index: number; camera: MotionValue<number>; moving: boolean }) {
  // Écart entre la caméra et cette scène : 0 quand elle est cadrée, 1 ou -1 quand elle est hors champ.
  const offset = useTransform(camera, (value) => Math.max(-1, Math.min(1, value - index)));
  // L’image arrive un peu en avance et le texte un peu en retard : deux plans, une profondeur.
  const artX = useTransform(offset, (value) => `${value * 9}%`);
  const artScale = useTransform(offset, (value) => 1 - Math.abs(value) * 0.08);
  const textX = useTransform(offset, (value) => `${value * -16}%`);
  const textOpacity = useTransform(offset, (value) => 1 - Math.min(1, Math.abs(value) * 1.6));

  return (
    <article className="build-scene">
      <motion.div className="build-copy" style={moving ? { x: textX, opacity: textOpacity } : undefined}>
        <p className="build-text">{scene.text}</p>
        <p className="build-tools mono">{scene.tools}</p>
      </motion.div>
      <motion.figure className="build-art" style={moving ? { x: artX, scale: artScale } : undefined}>
        <Image src={`/scenes/${scene.id}.webp`} alt={scene.alt} width={1100} height={1100} sizes="(min-width: 1024px) 46vw, 92vw" />
      </motion.figure>
    </article>
  );
}

/**
 * Ce que je fais : trois scènes, une image, une phrase et ses outils en petite ligne. La section est épinglée et
 * le défilement fait glisser la caméra d’une scène à l’autre, comme un travelling. Sans
 * animation, les trois scènes se lisent simplement l’une sous l’autre.
 */
export default function Build() {
  const { t, calm } = useSite();
  const b = t.build;
  const count = b.scenes.length;
  const ref = useRef<HTMLElement>(null);
  // Le travelling demande un écran assez haut pour tenir une scène entière.
  const cramped = useMediaQuery("(max-height: 559px)");
  const moving = !calm && !cramped;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const stops = cameraStops(count);
  const camera = useTransform(scrollYProgress, stops.input, stops.output);
  const x = useTransform(camera, (value) => `${(-value * 100) / count}%`);

  return (
    <section ref={ref} id="build" className="build" data-moving={moving ? "" : undefined} aria-labelledby="build-title">
      <div className="build-pin">
        <header className="build-head shell">
          <h2 id="build-title" className="section-label mono">
            {b.label}
          </h2>
        </header>

        {/* La clé remonte la piste quand le mouvement se coupe : aucun décalage ne reste figé sur les scènes. */}
        <motion.div key={moving ? "travelling" : "stack"} className="build-track" style={moving ? { x } : undefined}>
          {b.scenes.map((scene, index) => (
            <SceneView key={scene.id} scene={scene} index={index} camera={camera} moving={moving} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
