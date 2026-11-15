"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { person, whatsappUrl } from "../../data/site";
import Magnetic from "../ui/Magnetic";
import RevealText from "../ui/RevealText";
import useAbidjanTime from "../ui/useAbidjanTime";
import useMediaQuery from "../ui/useMediaQuery";
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
      <div className="hero-name-rise">
      <motion.div className="hero-name-track" style={{ x }}>
        {Array.from({ length: COPIES }, (_, index) => (
          <span key={index} className="hero-name-item">
            {person.name}
            <span className="hero-name-sep">
              <svg viewBox="0 0 100 100">
                <path d="M50 8v84M13.6 29l72.8 42M13.6 71l72.8-42" />
              </svg>
            </span>
          </span>
        ))}
      </motion.div>
      </div>
    </div>
  );
}

const DRIFT = { stiffness: 70, damping: 18, mass: 0.6 };

export default function Hero() {
  const { t, calm } = useSite();
  // La profondeur ne joue que sur grand écran : sur téléphone, le portrait glisserait sur le texte.
  const wide = useMediaQuery("(min-width: 1024px)");
  const still = calm || !wide;
  const time = useAbidjanTime();

  // Au défilement : l’affiche reste en place pendant que la suite monte par-dessus. Le nom file
  // vers le haut, le portrait suit à peine, les textes s’effacent.
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (value) =>
    typeof window === "undefined" ? 0 : Math.min(1, value / window.innerHeight),
  );
  const portraitY = useTransform(progress, [0, 1], ["0%", "-5%"]);
  const nameY = useTransform(progress, [0, 1], ["0%", "-46%"]);
  const copyY = useTransform(progress, [0, 1], ["0%", "-34%"]);
  const copyOpacity = useTransform(progress, [0, 0.6], [1, 0]);
  const veil = useTransform(progress, [0, 1], [0, 0.55]);
  // Une fois l’affiche recouverte, le nom cesse de défiler : rien ne tourne hors champ.
  const [covered, setCovered] = useState(false);
  useMotionValueEvent(progress, "change", (value) => setCovered(value >= 1));

  // Au pointeur : trois plans qui glissent à des vitesses différentes, le nom au fond, le
  // portrait devant. Quelques pixels, amortis par un ressort.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const driftX = useSpring(pointerX, DRIFT);
  const driftY = useSpring(pointerY, DRIFT);
  const portraitX = useTransform(driftX, (value) => value * -14);
  const portraitLift = useTransform(driftY, (value) => value * -6);
  const nameX = useTransform(driftX, (value) => value * 34);
  const copyX = useTransform(driftX, (value) => value * 8);
  const portraitTransform = useMotionTemplate`translate3d(${portraitX}px, calc(${portraitY} + ${portraitLift}px), 0)`;

  function drift(event: PointerEvent<HTMLElement>) {
    if (still || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function settle() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const [before, after = ""] = t.hero.clock.split("{time}");

  return (
    <section className="hero" id="top" aria-labelledby="hero-title" onPointerMove={drift} onPointerLeave={settle}>
      <motion.div className="hero-pitch" style={still ? undefined : { x: copyX, y: copyY, opacity: copyOpacity }}>
        <RevealText as="h1" id="hero-title" className="hero-title" text={t.hero.title} mode="mount" delay={0.95} interval={0.07} />
        <div className="hero-actions rise" style={rise(1.6)}>
          <Magnetic>
            <a className="button button-primary" href={whatsappUrl(t.hero.message)} target="_blank" rel="noreferrer">
              <span className="roll" data-text={t.hero.primary}>
                <span>{t.hero.primary}</span>
              </span>
              <ArrowUpRight size={17} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </Magnetic>
        </div>
      </motion.div>

      <div className="hero-stage">
        <motion.figure className="hero-portrait" style={still ? undefined : { transform: portraitTransform }}>
          <Image
            src="/portraits/daniogo-product-engineer-cutout.png"
            alt={t.hero.portrait}
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
          />
        </motion.figure>
        <motion.div className="hero-name-wrap" style={still ? undefined : { x: nameX, y: nameY }}>
          <NameMarquee calm={calm || covered} />
        </motion.div>
      </div>

      <motion.div className="hero-about" style={still ? undefined : { x: copyX, y: copyY, opacity: copyOpacity }}>
        <span className="hero-about-globe rise" style={rise(0.7)}>
          <Globe />
        </span>
        <p>
          <span className="line-mask">
            <strong className="line" style={rise(0.74)}>
              {t.hero.eyebrow}
            </strong>
          </span>
          <span className="line-mask">
            <span className="line" style={rise(0.82)}>
              {before}
              <time>{time || "--:--"}</time>
              {after}
            </span>
          </span>
          <span className="line-mask">
            <span className="line" style={rise(0.9)}>
              {t.hero.availability}
            </span>
          </span>
        </p>
      </motion.div>

      <motion.div className="hero-veil" style={still ? undefined : { opacity: veil }} aria-hidden="true" />
    </section>
  );
}
