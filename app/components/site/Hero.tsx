"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
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

export default function Hero() {
  const { t, calm } = useSite();
  const ref = useRef<HTMLElement>(null);
  const time = useAbidjanTime();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);

  return (
    <section ref={ref} className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid shell">
        <motion.div className="hero-copy" style={calm ? undefined : { y: copyY }}>
          <p className="eyebrow mono rise" style={rise(0.05)}>
            {t.hero.eyebrow}
          </p>
          <RevealText as="h1" id="hero-title" className="hero-title" text={t.hero.title} mode="mount" delay={0.15} interval={0.06} />
          <p className="hero-intro rise" style={rise(0.35)}>
            {t.hero.intro}
          </p>
          <div className="hero-actions rise" style={rise(0.5)}>
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
          <dl className="hero-facts rise" style={rise(0.65)}>
            {t.hero.facts.map((fact) => (
              <div key={fact.value}>
                <dt>{fact.value}</dt>
                <dd>{fact.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <figure className="hero-portrait rise" style={rise(0.2)}>
          <div className="hero-portrait-frame">
            <motion.div className="hero-portrait-image" style={calm ? undefined : { y: imageY }}>
              <Image
                src="/portraits/daniogo-product-engineer-cutout.png"
                alt={t.hero.portrait}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </motion.div>
          </div>
          <figcaption className="hero-caption mono">
            <span>{person.name}</span>
            <span>{t.hero.availability}</span>
            <span>
              {t.controls.localTime} <time>{time || "--:--"}</time>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
