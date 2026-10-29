"use client";

import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef, type CSSProperties } from "react";
import { person, whatsappUrl } from "../../data/site";
import Magnetic from "../ui/Magnetic";
import RevealText from "../ui/RevealText";
import useAbidjanTime from "../ui/useAbidjanTime";
import { useSite } from "./SiteProvider";

// Apparitions en CSS : elles démarrent dès le premier rendu, sans attendre le JavaScript.
function rise(delay: number) {
  return { "--rise-delay": `${delay}s` } as CSSProperties;
}

const COPIES = 4;

/** Globe au trait : trois méridiens qui tournent, pour dire « Abidjan » sans drapeau ni pastille. */
function Globe() {
  return (
    <svg className="globe" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="20" />
      <ellipse className="globe-meridian" cx="24" cy="24" rx="20" ry="20" />
      <ellipse className="globe-meridian is-2" cx="24" cy="24" rx="20" ry="20" />
      <ellipse className="globe-meridian is-3" cx="24" cy="24" rx="20" ry="20" />
      <line x1="4" y1="24" x2="44" y2="24" />
      <path d="M7.5 14h33M7.5 34h33" />
    </svg>
  );
}

/**
 * Le nom en très grand, qui défile en travers du portrait. Il s’inverse là où il passe sur la
 * silhouette (mode « difference ») : encre sur le papier, clair sur le gilet noir. Sa vitesse et
 * son sens suivent ceux du défilement.
 */
function NameMarquee({ calm }: { calm: boolean }) {
  const base = useMotionValue(0);
  const direction = useRef(-1);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(base, (value) => `${wrap(-100 / COPIES, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    if (calm) return;
    const boost = factor.get();
    if (boost < 0) direction.current = 1;
    else if (boost > 0) direction.current = -1;
    base.set(base.get() + direction.current * 1.1 * (delta / 1000) * (1 + Math.abs(boost)));
  });

  return (
    <div className="hero-name" aria-hidden="true">
      <motion.div className="hero-name-track" style={{ x }}>
        {Array.from({ length: COPIES }, (_, index) => (
          <span key={index} className="hero-name-item">
            {person.name}
            <span className="hero-name-sep">—</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const { t, calm } = useSite();
  const ref = useRef<HTMLElement>(null);
  const time = useAbidjanTime();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={ref} className="hero" id="top" aria-labelledby="hero-title">
      <motion.div className="hero-pitch" style={calm ? undefined : { y: copyY }}>
        <ArrowDownRight className="hero-arrow rise" style={rise(0.1)} size={30} strokeWidth={1.25} aria-hidden="true" />
        <RevealText as="h1" id="hero-title" className="hero-title" text={t.hero.title} mode="mount" delay={0.3} interval={0.06} />
        <div className="hero-actions rise" style={rise(0.9)}>
          <Magnetic>
            <a className="button button-primary" href={whatsappUrl(t.hero.message)} target="_blank" rel="noreferrer">
              <span className="roll" data-text={t.hero.primary}>
                <span>{t.hero.primary}</span>
              </span>
              <ArrowUpRight size={17} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </Magnetic>
          <a className="text-link hero-secondary" href="#offers">
            {t.hero.secondary}
            <ArrowDown size={16} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </motion.div>

      <div className="hero-stage">
        <motion.figure className="hero-portrait" style={calm ? undefined : { y: portraitY }}>
          <Image
            src="/portraits/daniogo-product-engineer-cutout.png"
            alt={t.hero.portrait}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
        </motion.figure>
        <motion.div className="hero-name-wrap" style={calm ? undefined : { y: nameY }}>
          <NameMarquee calm={calm} />
        </motion.div>
      </div>

      <motion.div className="hero-about rise" style={calm ? rise(0.6) : { ...rise(0.6), y: copyY }}>
        <Globe />
        <p>
          <strong>{t.hero.eyebrow}</strong>
          <span>{t.hero.place}</span>
          <span>
            UTC+0 · <time>{time || "--:--"}</time>
          </span>
          <span>{t.hero.availability}</span>
        </p>
      </motion.div>
    </section>
  );
}
