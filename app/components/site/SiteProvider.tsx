"use client";

import Lenis from "lenis";
import { MotionConfig, MotionGlobalConfig } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";
import type { SiteContent } from "../../data/content";
import { localePath, type Locale } from "../../data/site";

export type Theme = "light" | "dark";

type SiteContextValue = {
  locale: Locale;
  t: SiteContent;
  setLocale: (locale: Locale) => void;
  theme: Theme;
  toggleTheme: (origin?: { x: number; y: number }) => void;
  /**
   * Vrai quand rien ne doit bouger. Le choix du visiteur l’emporte ; sans choix, on suit la
   * préférence du système (prefers-reduced-motion). Les deux mènent au même site immobile.
   */
  calm: boolean;
  /** Coupe ou relance les animations, et retient le choix pour les prochaines visites. */
  setCalm: (calm: boolean) => void;
  scrollTo: (target: string | number) => void;
  lockScroll: (locked: boolean) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

const THEME_KEY = "portfolio-theme";

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Le choix reste actif pour la visite, même sans stockage local. */
  }
}

const MOTION_KEY = "portfolio-motion";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

type MotionChoice = "on" | "off" | null;

// Le choix du visiteur vit dans le stockage local : il tient au rechargement, au changement de
// langue et d’un onglet à l’autre. Sans stockage, il tient le temps de la visite.
let motionChoice: MotionChoice | undefined;
const motionListeners = new Set<() => void>();

function readMotionChoice(): MotionChoice {
  if (motionChoice === undefined) {
    try {
      const stored = localStorage.getItem(MOTION_KEY);
      motionChoice = stored === "on" || stored === "off" ? stored : null;
    } catch {
      motionChoice = null;
    }
  }
  return motionChoice;
}

function subscribeMotionChoice(onChange: () => void) {
  const sync = (event: StorageEvent) => {
    if (event.key !== MOTION_KEY) return;
    motionChoice = undefined;
    onChange();
  };
  motionListeners.add(onChange);
  window.addEventListener("storage", sync);
  return () => {
    motionListeners.delete(onChange);
    window.removeEventListener("storage", sync);
  };
}

function writeMotionChoice(choice: Exclude<MotionChoice, null>) {
  motionChoice = choice;
  writeStorage(MOTION_KEY, choice);
  motionListeners.forEach((listener) => listener());
}

/** Le repère visible au moment du réglage : le contrôle utilisé, sinon la section au milieu de l’écran. */
function viewportAnchor() {
  const active = document.activeElement;
  if (active instanceof HTMLElement && active !== document.body && !active.closest("dialog")) {
    const rect = active.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) return active;
  }
  return document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2)?.closest<HTMLElement>("section, footer") ?? null;
}

function subscribeReducedMotion(onChange: () => void) {
  const media = matchMedia(REDUCED_MOTION);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

// Le serveur ignore la préférence : on part de « faux » pour que l’hydratation corresponde au HTML rendu.
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

export function useSite() {
  const value = useContext(SiteContext);
  if (!value) throw new Error("useSite doit être utilisé dans SiteProvider");
  return value;
}

export default function SiteProvider({
  locale,
  t,
  children,
}: {
  locale: Locale;
  t: SiteContent;
  children: ReactNode;
}) {
  const router = useRouter();
  const [theme, setTheme] = useState<Theme>("dark");
  const prefersReduced = usePrefersReducedMotion();
  const choice = useSyncExternalStore(subscribeMotionChoice, readMotionChoice, () => null);
  const calm = choice ? choice === "off" : prefersReduced;
  const lenisRef = useRef<Lenis | null>(null);
  const anchor = useRef<{ element: HTMLElement; top: number } | null>(null);

  const setCalm = useCallback((next: boolean) => {
    const element = viewportAnchor();
    anchor.current = element ? { element, top: element.getBoundingClientRect().top } : null;
    writeMotionChoice(next ? "off" : "on");
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const explicit = document.documentElement.dataset.theme;
      if (explicit === "light" || explicit === "dark") setTheme(explicit);
      else setTheme(matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    });
    const media = matchMedia("(prefers-color-scheme: dark)");
    const follow = () => {
      if (!document.documentElement.dataset.theme) setTheme(media.matches ? "dark" : "light");
    };
    media.addEventListener("change", follow);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", follow);
    };
  }, []);

  // Couper ou relancer change la hauteur de « Ce que je fais » (travelling ou scènes empilées) :
  // on recale le défilement pour que ce que le visiteur regardait ne bouge pas sous son doigt.
  useLayoutEffect(() => {
    document.documentElement.dataset.motion = calm ? "off" : "on";
    // Tout ce que la bibliothèque d’animation lancerait arrive directement à son état final.
    MotionGlobalConfig.skipAnimations = calm;
    const kept = anchor.current;
    anchor.current = null;
    if (!kept || !kept.element.isConnected) return;
    const shift = kept.element.getBoundingClientRect().top - kept.top;
    if (Math.abs(shift) > 1) window.scrollBy({ top: shift, behavior: "instant" });
  }, [calm]);

  useEffect(() => {
    if (calm) return;
    const lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.11 });
    lenisRef.current = lenis;
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [calm]);

  // Chaque langue a sa propre adresse : on change de page en gardant la section et la position.
  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      router.push(`${localePath(next)}${window.location.hash}`, { scroll: false });
    },
    [locale, router],
  );

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === "dark" ? "light" : "dark";
      const apply = () => {
        document.documentElement.dataset.theme = next;
        writeStorage(THEME_KEY, next);
        setTheme(next);
      };
      if (calm || typeof document.startViewTransition !== "function") {
        apply();
        return;
      }
      const x = origin?.x ?? window.innerWidth - 48;
      const y = origin?.y ?? 32;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const transition = document.startViewTransition(() => flushSync(apply));
      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 720, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
          );
        })
        .catch(() => {
          /* Transition interrompue : le thème est déjà appliqué. */
        });
    },
    [calm, theme],
  );

  const scrollTo = useCallback(
    (target: string | number) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target);
        return;
      }
      const behavior: ScrollBehavior = calm ? "auto" : "smooth";
      if (typeof target === "number") window.scrollTo({ top: target, behavior });
      else document.querySelector(target)?.scrollIntoView({ behavior });
    },
    [calm],
  );

  const lockScroll = useCallback((locked: boolean) => {
    if (locked) lenisRef.current?.stop();
    else lenisRef.current?.start();
    document.documentElement.classList.toggle("is-locked", locked);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      t,
      setLocale,
      theme,
      toggleTheme,
      calm,
      setCalm,
      scrollTo,
      lockScroll,
    }),
    [calm, locale, lockScroll, scrollTo, setCalm, setLocale, t, theme, toggleTheme],
  );

  return (
    <SiteContext.Provider value={value}>
      <MotionConfig reducedMotion={calm ? "always" : "never"}>{children}</MotionConfig>
    </SiteContext.Provider>
  );
}
