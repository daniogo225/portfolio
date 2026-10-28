"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { whatsappUrl } from "../../data/site";
import Magnetic from "../ui/Magnetic";
import RevealText from "../ui/RevealText";
import HalftonePortrait from "./HalftonePortrait";
import { useSite } from "./SiteProvider";

// Apparitions en CSS : elles démarrent dès le premier rendu, sans attendre le JavaScript,
// ce qui garde le texte du hero visible très tôt (indicateur LCP).
function rise(delay: number) {
  return { className: "rise", style: { "--rise-delay": `${delay}s` } as CSSProperties };
}

export default function Hero() {
  const { t, theme, calm } = useSite();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section ref={ref} className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid shell">
        <motion.div className="hero-copy" style={calm ? { y: 0, opacity: 1 } : { y: copyY, opacity: copyOpacity }}>
          <p {...rise(0.05)}>
            <span className="eyebrow mono">{t.hero.eyebrow}</span>
          </p>
          <RevealText as="h1" id="hero-title" className="hero-title" text={t.hero.title} mode="mount" delay={0.2} interval={0.06} />
          <p className="hero-intro rise" style={rise(0.35).style}>
            {t.hero.intro}
          </p>
          <div className="hero-actions rise" style={rise(0.5).style}>
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

        <motion.div
          className="hero-visual"
          style={calm ? { y: 0, scale: 1 } : { y: visualY, scale: visualScale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <HalftonePortrait theme={theme} calm={calm} label={t.hero.portrait} />
        </motion.div>
      </div>

      <div className="hero-foot shell rise" style={rise(0.8).style}>
        <p>{t.hero.availability}</p>
        <p className="mono hero-since">{t.hero.languages}</p>
        <a href="#offers" className="scroll-cue mono">
          {t.hero.scroll}
          <span className="scroll-line" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
