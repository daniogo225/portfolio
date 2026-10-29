"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { whatsappUrl } from "../../data/site";
import IPhone from "../devices/IPhone";
import MacBook from "../devices/MacBook";
import MobileApp, { type Task } from "../screens/MobileApp";
import WebApp from "../screens/WebApp";
import Magnetic from "../ui/Magnetic";
import RevealText from "../ui/RevealText";
import { useSite } from "./SiteProvider";

function rise(delay: number) {
  return { "--rise-delay": `${delay}s` } as CSSProperties;
}

/**
 * Keynote : un titre centré sur fond noir, puis la scène des appareils. Le MacBook fait tourner
 * l’application web, l’iPhone l’application mobile. Au défilement, le MacBook se redresse et
 * l’iPhone avance ; au chargement, les deux montent du bas de l’écran.
 */
export default function Hero() {
  const { t, calm } = useSite();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const tilt = useTransform(scrollYProgress, [0, 0.5], [14, 0]);
  const lift = useTransform(scrollYProgress, [0, 0.5], ["6%", "0%"]);
  const phoneY = useTransform(scrollYProgress, [0, 0.5], ["14%", "0%"]);
  const phoneX = useTransform(scrollYProgress, [0, 0.5], ["-6%", "0%"]);
  const fade = useTransform(scrollYProgress, [0.1, 0.5], [1, 0]);

  const tasks: Task[] = t.demos.offline.initial.map((label, index) => ({ id: index, label, done: index === 0, sync: "synced" }));
  const preset: Task = { id: 9, label: t.demos.offline.presets[0], done: false, sync: "pending" };

  return (
    <section ref={ref} className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-copy shell">
        <p className="hero-kicker rise" style={rise(0.05)}>
          {t.hero.kicker}
        </p>
        <RevealText as="h1" id="hero-title" className="hero-title" text={t.hero.title} mode="mount" delay={0.15} interval={0.07} />
        <p className="hero-intro rise" style={rise(0.6)}>
          {t.hero.intro}
        </p>
        <div className="hero-actions rise" style={rise(0.75)}>
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
      </div>

      <motion.div className="hero-stage shell" style={calm ? undefined : { opacity: fade }}>
        <motion.div className="hero-mac rise" style={calm ? rise(0.4) : { ...rise(0.4), rotateX: tilt, y: lift }}>
          <MacBook>
            <WebApp view="ui" modal={false} />
          </MacBook>
          <span className="hero-tag mono">{t.hero.web}</span>
        </motion.div>
        <motion.div className="hero-phone rise" style={calm ? rise(0.7) : { ...rise(0.7), y: phoneY, x: phoneX }}>
          <IPhone>
            <MobileApp tasks={[preset, ...tasks]} online pending={1} />
          </IPhone>
          <span className="hero-tag mono">{t.hero.mobile}</span>
        </motion.div>
      </motion.div>

      <dl className="hero-rail mono shell">
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
    </section>
  );
}
