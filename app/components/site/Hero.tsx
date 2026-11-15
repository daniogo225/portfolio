"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import {
  animate,
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
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type RefObject,
} from "react";
import { person, whatsappUrl } from "../../data/site";
import Magnetic from "../ui/Magnetic";
import RevealText from "../ui/RevealText";
import useMediaQuery from "../ui/useMediaQuery";
import { useSite } from "./SiteProvider";

// Apparitions en CSS : elles démarrent dès le premier rendu, sans attendre le JavaScript.
function rise(delay: number) {
  return { "--rise-delay": `${delay}s` } as CSSProperties;
}

type Rect = { left: number; top: number; right: number; bottom: number };
type Box = { width: number; height: number; blocks: Rect[] };
type Curve = { d: string; length: number; font: number; copies: number };
type Frame = { font: number; spacing: number };

// Espace laissé à l’étoile entre deux passages du nom, et taille de l’étoile, en cadratins.
const GAP = 1.14;
const STAR = 0.46;
// Hauteur des lettres au-dessus de la ligne de base (l’accent du « é »), en cadratins.
const ASCENT = 0.78;
// Distance minimale, en pixels, entre les lettres de la bannière et le texte de la hero.
const CLEARANCE = 44;
// Avant la bascule tablette, le nom ne tient plus de chaque côté du portrait : immobile, il s’écrit une
// seule fois, autour de lui.
const NARROW = "(max-width: 639px)";
// Bords de la silhouette à la hauteur de la bannière (la main à gauche, la jambe à droite),
// mesurés sur le détourage depuis l’axe du portrait, en fraction de sa hauteur.
const BODY = { left: -0.235, right: 0.105 };
// Marge, en pixels, entre le nom immobile et les bords de l’écran.
const MARGIN = 12;

/** Abscisse curviligne du point du tracé situé à l’abscisse x (le tracé va de gauche à droite). */
function lengthAt(line: SVGPathElement, total: number, x: number) {
  let low = 0;
  let high = total;
  for (let step = 0; step < 24; step += 1) {
    const middle = (low + high) / 2;
    if (line.getPointAtLength(middle).x < x) low = middle;
    else high = middle;
  }
  return (low + high) / 2;
}

/** Vrai si la bande occupée par les lettres passe à moins de CLEARANCE d’un bloc de texte. */
function crowds(blocks: Rect[], cx: number, bottom: number, dip: number, font: number, width: number) {
  for (let x = -width * 0.1; x <= width * 1.1; x += 8) {
    const u = (x - cx) / cx;
    const y = bottom - dip * u * u;
    const slope = (-2 * dip * u) / cx;
    const norm = Math.hypot(1, slope);
    for (let step = 0; step <= 3; step += 1) {
      const lift = (font * ASCENT * step) / 3;
      const px = x + (slope / norm) * lift;
      const py = y - lift / norm;
      for (const block of blocks) {
        const dx = Math.max(block.left - px, 0, px - block.right);
        const dy = Math.max(block.top - py, 0, py - block.bottom);
        if (Math.hypot(dx, dy) < CLEARANCE) return true;
      }
    }
  }
  return false;
}

/**
 * Le tracé de la bannière, calculé en pixels pour la scène : un U large (une parabole, dont la
 * courbure reste douce partout) dont le creux passe derrière le portrait et dont les deux bras
 * remontent vers les bords. Le creux se réduit tant que les lettres frôleraient le texte, et le
 * tracé déborde de chaque côté pour que les lettres entrent et sortent hors champ.
 */
function curve({ width, height, blocks }: Box): Curve {
  const font = Math.round(Math.min(200, Math.max(84, width * 0.118)));
  const cx = width / 2;
  const bottom = height * 0.925;
  // Sur un écran étroit, le creux se réduit : quelques lettres seulement sont visibles à la fois.
  const slack = 0.12 + 0.14 * Math.min(1, Math.max(0, (width - 390) / 510));
  let dip = Math.min(height * 0.4, width * slack);
  while (dip > height * 0.08 && crowds(blocks, cx, bottom, dip, font, width)) dip -= 6;

  const reach = cx + font * 1.6 + width * 0.12;
  const edge = bottom - dip * (reach / cx) ** 2;
  // Une parabole s’écrit exactement comme une courbe de Bézier quadratique.
  const pull = 2 * bottom - edge;
  let length = 0;
  let previous = { x: cx - reach, y: edge };
  for (let step = 1; step <= 96; step += 1) {
    const x = cx - reach + (2 * reach * step) / 96;
    const y = bottom - dip * ((x - cx) / cx) ** 2;
    length += Math.hypot(x - previous.x, y - previous.y);
    previous = { x, y };
  }
  const r = (value: number) => Math.round(value * 10) / 10;
  return {
    d: `M${r(cx - reach)} ${r(edge)}Q${r(cx)} ${r(pull)} ${r(cx + reach)} ${r(edge)}`,
    length,
    font,
    // Le nom fait au moins cinq cadratins : de quoi couvrir tout le tracé, plus une période.
    copies: Math.ceil(length / (font * (5 + GAP))) + 2,
  };
}

function sameBox(a: Box | null, b: Box) {
  return (
    a !== null &&
    a.width === b.width &&
    a.height === b.height &&
    a.blocks.length === b.blocks.length &&
    a.blocks.every((block, index) => {
      const other = b.blocks[index];
      return block.left === other.left && block.top === other.top && block.right === other.right && block.bottom === other.bottom;
    })
  );
}

/**
 * Le nom en bannière : il suit un U qui descend d’un côté, passe derrière la silhouette et
 * remonte de l’autre, et il défile le long de cette courbe. Sa vitesse et son sens suivent ceux
 * du défilement de la page. Immobile, l’étoile se cale derrière le portrait et le nom se lit
 * de chaque côté ; sur un écran étroit, où il n’y tiendrait pas, il s’écrit une seule fois, le
 * prénom d’un côté de la silhouette et le nom de l’autre.
 */
function NameBanner({ calm, rest, avoid }: { calm: boolean; rest: boolean; avoid: RefObject<HTMLElement | null> }) {
  const maskId = useId();
  const pathId = useId();
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const textPath = useRef<SVGTextPathElement>(null);
  const probe = useRef<SVGTextElement>(null);
  const stars = useRef<(SVGGElement | null)[]>([]);
  const [box, setBox] = useState<Box | null>(null);
  const geometry = useMemo(() => (box ? curve(box) : null), [box]);
  // Le cadrage du nom immobile sur écran étroit : taille des lettres et espace laissé au portrait.
  const [frame, setFrame] = useState<Frame | null>(null);

  // Mesures faites sur le rendu réel : la période (un passage du nom) et la pose de repos.
  const metrics = useRef({ period: 0, total: 0, stale: true, framed: false });
  const offset = useRef(0);
  const direction = useRef(-1);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });

  // L’entrée : la bannière se déroule depuis le dos du portrait vers les deux bords.
  const unfurl = useMotionValue(calm ? 1 : 0);
  const dash = useTransform(unfurl, (value) => `${value} 2`);
  const dashStart = useTransform(unfurl, (value) => value / 2 - 0.5);
  const [unfurled, setUnfurled] = useState(calm);
  const ready = geometry !== null;

  useEffect(() => {
    // La scène, pas le SVG : sa boîte est celle que la bannière doit remplir.
    const stage = svg.current?.parentElement;
    const copy = avoid.current;
    if (!stage || !copy) return;
    const measure = () => {
      // Positions de mise en page, pas rectangles à l’écran : l’entrée du texte, la profondeur
      // au pointeur et le défilement déplacent ces blocs sans que la bannière ait à les suivre.
      const shiftX = copy.offsetLeft - stage.offsetLeft;
      const shiftY = copy.offsetTop - stage.offsetTop;
      // Les masques des mots, pas les mots : eux gardent leur place pendant l’entrée du titre.
      const blocks = Array.from(copy.querySelectorAll<HTMLElement>(".hero-role, .word-mask, .button"), (node) => {
        let left = shiftX;
        let top = shiftY;
        for (let step: HTMLElement | null = node; step && step !== copy; step = step.offsetParent as HTMLElement | null) {
          left += step.offsetLeft;
          top += step.offsetTop;
        }
        return { left, top, right: left + node.offsetWidth, bottom: top + node.offsetHeight };
      });
      const next = { width: stage.offsetWidth, height: stage.offsetHeight, blocks };
      setBox((current) => (sameBox(current, next) ? current : next));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(copy);
    return () => observer.disconnect();
  }, [avoid]);

  // Animations coupées (rest) : la bannière revient à sa pose de repos au lieu de se figer en route.
  useEffect(() => {
    metrics.current.stale = true;
    const refresh = () => {
      metrics.current.stale = true;
    };
    // La période dépend de la police : on remesure quand elle arrive.
    document.fonts.addEventListener("loadingdone", refresh);
    return () => document.fonts.removeEventListener("loadingdone", refresh);
  }, [geometry, rest]);

  useEffect(() => {
    if (!ready) return;
    if (calm) {
      unfurl.set(1);
      return;
    }
    const controls = animate(unfurl, 1, { duration: 1.5, delay: 0.55, ease: [0.5, 0, 0.15, 1] });
    controls.then(() => setUnfurled(true));
    return () => controls.stop();
  }, [calm, ready, unfurl]);

  useAnimationFrame((_, delta) => {
    const line = path.current;
    const text = textPath.current;
    const ruler = probe.current;
    if (!geometry || !line || !text || !ruler) return;
    const state = metrics.current;
    const moving = !calm;
    if (!state.stale && !moving) return;

    if (state.stale) {
      const name = person.name;
      const period = ruler.getStartPositionOfChar(name.length).x - ruler.getStartPositionOfChar(0).x;
      if (!(period > 0)) return;
      // Pose de repos : l’étoile derrière le portrait, aucune lettre coupée par la silhouette.
      const total = line.getTotalLength();
      const space = name.indexOf(" ");
      let framed: Frame | null = null;
      let pose = wrap(-period, 0, total / 2 - geometry.font * (GAP / 2 + 0.18));
      if (rest && box && space > 0 && window.matchMedia(NARROW).matches) {
        // Le prénom s’arrête avant la silhouette, le nom reprend après : rien n’est caché, et
        // les lettres rapetissent jusqu’à ce que les deux tiennent entre le portrait et les bords.
        const start = ruler.getStartPositionOfChar(0).x;
        const first = ruler.getStartPositionOfChar(space).x - start;
        const second = ruler.getStartPositionOfChar(space + 1).x - start;
        const end = ruler.getEndPositionOfChar(name.length - 1).x - start;
        const axis = box.width / 2;
        const from = lengthAt(line, total, MARGIN);
        const to = lengthAt(line, total, box.width - MARGIN);
        const fit = (scale: number) => {
          const air = geometry.font * scale * 0.16;
          const before = lengthAt(line, total, axis + BODY.left * box.height - air);
          const after = lengthAt(line, total, axis + BODY.right * box.height + air);
          return { before, after, room: Math.min((before - from) / first, (to - after) / (end - second)) };
        };
        let scale = 1;
        for (let step = 0; step < 4; step += 1) scale = Math.min(1, fit(scale).room);
        const { before, after } = fit(scale);
        // Le côté qui a de la place en trop la partage : chaque mot se pose au milieu de la sienne.
        pose = (from + before - first * scale) / 2;
        const resume = (after + to - (end - second) * scale) / 2;
        framed = {
          font: Math.round(geometry.font * scale * 10) / 10,
          spacing: Math.round((resume - pose - second * scale) * 10) / 10,
        };
      }
      setFrame((current) =>
        current?.font === framed?.font && current?.spacing === framed?.spacing ? current : framed,
      );
      state.framed = framed !== null;
      if (!moving || state.period === 0) offset.current = pose;
      state.period = period;
      state.total = total;
      state.stale = false;
    }

    if (moving) {
      const boost = factor.get();
      if (boost < 0) direction.current = 1;
      else if (boost > 0) direction.current = -1;
      // Pendant le déroulé, la bannière file puis ralentit jusqu’à son allure de croisière.
      const launch = 1 + 7 * (1 - unfurl.get()) ** 2;
      const speed = geometry.font * 0.3 * launch * (1 + Math.abs(boost));
      offset.current = wrap(-state.period, 0, offset.current + direction.current * speed * (Math.min(delta, 64) / 1000));
    }

    text.setAttribute("startOffset", offset.current.toFixed(2));

    // Les étoiles suivent le même tracé, au milieu de l’espace entre deux passages du nom.
    const { total } = state;
    const lift = geometry.font * 0.3;
    for (let index = 0; index < stars.current.length; index += 1) {
      const star = stars.current[index];
      if (!star) continue;
      const at = offset.current + index * state.period + (geometry.font * (GAP - 0.05)) / 2;
      if (state.framed || at < 0 || at > total) {
        star.style.visibility = "hidden";
        continue;
      }
      const point = line.getPointAtLength(at);
      const ahead = line.getPointAtLength(Math.min(total, at + 2));
      const behind = line.getPointAtLength(Math.max(0, at - 2));
      const norm = Math.hypot(ahead.x - behind.x, ahead.y - behind.y) || 1;
      const x = point.x + ((ahead.y - behind.y) / norm) * lift;
      const y = point.y - ((ahead.x - behind.x) / norm) * lift;
      star.style.visibility = "visible";
      star.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
    }
  });

  const size = geometry ? geometry.font * STAR : 0;

  return (
    <svg ref={svg} className="hero-banner" aria-hidden="true">
      {geometry ? (
        <>
          <defs>
            <path ref={path} id={pathId} d={geometry.d} />
            <mask id={maskId} maskUnits="userSpaceOnUse" x="-50%" y="-100%" width="200%" height="300%">
              <motion.path
                d={geometry.d}
                pathLength={1}
                fill="none"
                stroke="#fff"
                strokeWidth={geometry.font * 2.6}
                strokeDasharray={dash}
                strokeDashoffset={dashStart}
              />
            </mask>
          </defs>
          <text ref={probe} className="hero-banner-text" fontSize={geometry.font} visibility="hidden" x="0" y="0">
            <tspan dx={`${GAP}em`}>{person.name}</tspan>
            <tspan dx={`${GAP}em`}>{person.name}</tspan>
          </text>
          <g mask={unfurled ? undefined : `url(#${maskId})`}>
            <text
              className="hero-banner-text"
              fontSize={frame ? frame.font : geometry.font}
              style={frame ? { wordSpacing: `${frame.spacing}px` } : undefined}
            >
              <textPath ref={textPath} href={`#${pathId}`} startOffset="0">
                {Array.from({ length: frame ? 1 : geometry.copies }, (_, index) => (
                  <tspan key={index} dx={frame ? 0 : `${GAP}em`}>
                    {person.name}
                  </tspan>
                ))}
              </textPath>
            </text>
            {Array.from({ length: geometry.copies }, (_, index) => (
              <g
                key={index}
                ref={(node) => {
                  stars.current[index] = node;
                }}
                className="hero-banner-star"
                style={{ visibility: "hidden" }}
              >
                <svg x={-size / 2} y={-size / 2} width={size} height={size} viewBox="0 0 100 100">
                  <path d="M50 8v84M13.6 29l72.8 42M13.6 71l72.8-42" />
                </svg>
              </g>
            ))}
          </g>
        </>
      ) : null}
    </svg>
  );
}

const DRIFT = { stiffness: 70, damping: 18, mass: 0.6 };

export default function Hero() {
  const { t, calm } = useSite();
  // La profondeur ne joue que sur grand écran : sur téléphone, le portrait glisserait sur le texte.
  const wide = useMediaQuery("(min-width: 1024px)");
  const still = calm || !wide;
  const pitch = useRef<HTMLDivElement>(null);

  // Au défilement : l’affiche reste en place pendant que la suite monte par-dessus. La bannière
  // file vers le haut, le portrait suit à peine, le texte s’efface.
  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (value) =>
    typeof window === "undefined" ? 0 : Math.min(1, value / window.innerHeight),
  );
  const portraitY = useTransform(progress, [0, 1], ["0%", "-5%"]);
  const bannerY = useTransform(progress, [0, 1], ["0%", "-12%"]);
  const copyY = useTransform(progress, [0, 1], ["0%", "-34%"]);
  const copyOpacity = useTransform(progress, [0, 0.6], [1, 0]);
  const veil = useTransform(progress, [0, 1], [0, 0.55]);
  // Une fois l’affiche recouverte, le nom cesse de défiler : rien ne tourne hors champ.
  const [covered, setCovered] = useState(false);
  useMotionValueEvent(progress, "change", (value) => setCovered(value >= 1));

  // Au pointeur : trois plans qui glissent à des vitesses différentes, la bannière au fond, le
  // portrait devant. Quelques pixels, amortis par un ressort.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const driftX = useSpring(pointerX, DRIFT);
  const driftY = useSpring(pointerY, DRIFT);
  const portraitX = useTransform(driftX, (value) => value * -14);
  const portraitLift = useTransform(driftY, (value) => value * -6);
  const bannerX = useTransform(driftX, (value) => value * 34);
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

  return (
    <section className="hero" id="top" aria-labelledby="hero-title" onPointerMove={drift} onPointerLeave={settle}>
      <motion.div ref={pitch} className="hero-pitch" style={still ? undefined : { x: copyX, y: copyY, opacity: copyOpacity }}>
        <p className="hero-role line-mask">
          <span className="line" style={rise(1.3)}>
            {t.hero.eyebrow}
          </span>
        </p>
        <RevealText as="h1" id="hero-title" className="hero-title" text={t.hero.title} mode="mount" delay={1.3} interval={0.04} />
        <div className="hero-actions rise" style={rise(1.8)}>
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
        <motion.div className="hero-banner-wrap" style={still ? undefined : { x: bannerX, y: bannerY }}>
          <NameBanner calm={calm || covered} rest={calm} avoid={pitch} />
        </motion.div>
      </div>

      <motion.div className="hero-veil" style={still ? undefined : { opacity: veil }} aria-hidden="true" />
    </section>
  );
}
