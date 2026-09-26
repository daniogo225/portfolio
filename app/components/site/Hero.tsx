"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { links } from "../../data/content";
import Magnetic from "../ui/Magnetic";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import HalftonePortrait from "./HalftonePortrait";
import { useSite } from "./SiteProvider";

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE_OUT },
  };
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
          <motion.p className="eyebrow mono" {...fadeUp(0.1)}>
            {t.hero.eyebrow}
          </motion.p>
          <RevealText as="h1" id="hero-title" className="hero-title" text={t.hero.title} mode="mount" delay={0.2} interval={0.06} />
          <motion.p className="hero-intro" {...fadeUp(0.75)}>
            {t.hero.intro}
          </motion.p>
          <motion.div className="hero-actions" {...fadeUp(0.9)}>
            <Magnetic>
              <a className="button button-primary" href="#work">
                <span className="roll" data-text={t.hero.primary}>
                  <span>{t.hero.primary}</span>
                </span>
                <ArrowDown size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </Magnetic>
            <a className="button button-ghost" href={links.calendar} target="_blank" rel="noreferrer">
              <span className="roll" data-text={t.hero.secondary}>
                <span>{t.hero.secondary}</span>
              </span>
              <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </motion.div>
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

      <motion.div className="hero-foot shell" {...fadeUp(1.1)}>
        <p>{t.hero.status}</p>
        <p className="mono hero-since">{t.hero.since}</p>
        <a href="#work" className="scroll-cue mono">
          {t.hero.scroll}
          <span className="scroll-line" aria-hidden="true" />
        </a>
      </motion.div>
    </section>
  );
}
