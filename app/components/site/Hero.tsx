"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type CSSProperties, type PointerEvent } from "react";
import { person, whatsappUrl } from "../../data/site";
import Magnetic from "../ui/Magnetic";
import RevealText from "../ui/RevealText";
import useAbidjanTime from "../ui/useAbidjanTime";
import { useSite } from "./SiteProvider";

// Apparitions en CSS : elles démarrent dès le premier rendu, sans attendre le JavaScript,
// ce qui garde le texte du hero visible très tôt (indicateur LCP).
function rise(delay: number) {
  return { "--rise-delay": `${delay}s` } as CSSProperties;
}

const SPRING = { stiffness: 60, damping: 20, mass: 0.8 };

/**
 * Plein écran : le titre géant est posé derrière le portrait, le portrait devant, debout sur un
 * filet. Le pointeur décale les deux plans en sens inverse, le défilement les sépare encore.
 */
export default function Hero() {
  const { t, calm } = useSite();
  const ref = useRef<HTMLElement>(null);
  const time = useAbidjanTime();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const typeX = useSpring(useTransform(pointerX, (value) => value * -14), SPRING);
  const typeY = useSpring(useTransform(pointerY, (value) => value * -8), SPRING);
  const portraitX = useSpring(useTransform(pointerX, (value) => value * 22), SPRING);
  const portraitY = useSpring(useTransform(pointerY, (value) => value * 12), SPRING);

  const scrollType = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const scrollPortrait = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const scrollCopy = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  function track(event: PointerEvent<HTMLElement>) {
    if (calm || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function settle() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section ref={ref} className="hero" id="top" aria-labelledby="hero-title" onPointerMove={track} onPointerLeave={settle}>
      <div className="hero-stage shell">
        <p className="eyebrow mono rise" style={rise(0.1)}>
          <span>{t.hero.eyebrow}</span>
          <span>{t.hero.availability}</span>
        </p>

        <motion.div className="hero-type" style={calm ? undefined : { y: scrollType }}>
          <motion.div style={calm ? undefined : { x: typeX, y: typeY }}>
            <RevealText as="h1" id="hero-title" className="hero-title" text={t.hero.title} mode="mount" delay={0.2} interval={0.09} />
          </motion.div>
        </motion.div>

        <motion.figure className="hero-portrait" style={calm ? undefined : { y: scrollPortrait }}>
          <motion.div className="hero-portrait-image" style={calm ? undefined : { x: portraitX, y: portraitY }}>
            <Image
              src="/portraits/daniogo-product-engineer-cutout.png"
              alt={t.hero.portrait}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </motion.div>
          <figcaption className="sr-only">{person.name}</figcaption>
        </motion.figure>

        <motion.div className="hero-copy rise" style={calm ? rise(0.9) : { ...rise(0.9), opacity: scrollCopy }}>
          <p className="hero-intro">{t.hero.intro}</p>
          <div className="hero-actions">
            <Magnetic>
              <a className="button button-primary" href={whatsappUrl(t.hero.message)} target="_blank" rel="noreferrer">
                <span className="roll" data-text={t.hero.primary}>
                  <span>{t.hero.primary}</span>
                </span>
                <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </Magnetic>
            <a className="button button-ghost" href="#offers">
              <span className="roll" data-text={t.hero.secondary}>
                <span>{t.hero.secondary}</span>
              </span>
              <ArrowDown size={18} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <dl className="hero-rail mono rise" style={rise(1.1)}>
          <div>
            <dt className="sr-only">{t.contact.place}</dt>
            <dd>
              {t.controls.localTime} <time>{time || "--:--"}</time> UTC+0
            </dd>
          </div>
          {t.hero.facts.map((fact) => (
            <div key={fact.value} className="hero-rail-fact">
              <dt>{fact.value}</dt>
              <dd>{fact.label}</dd>
            </div>
          ))}
          <div className="hero-rail-scroll">
            <dt className="sr-only">{t.hero.scroll}</dt>
            <dd>
              <a href="#offers">
                {t.hero.scroll}
                <ArrowDown size={12} strokeWidth={2} aria-hidden="true" />
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
