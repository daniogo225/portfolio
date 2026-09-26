"use client";

import Lenis from "lenis";
import { MotionConfig } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { content, type Locale, type SiteContent } from "../../data/content";

export type Theme = "light" | "dark";

type SiteContextValue = {
  locale: Locale;
  t: SiteContent;
  setLocale: (locale: Locale) => void;
  theme: Theme;
  toggleTheme: (origin?: { x: number; y: number }) => void;
  paused: boolean;
  setPaused: (paused: boolean) => void;
  /** Vrai quand aucune animation ne doit tourner : préférence système ou pause demandée. */
  calm: boolean;
  scrollTo: (target: string | number) => void;
  lockScroll: (locked: boolean) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

const LOCALE_KEY = "portfolio-locale-v3";
const THEME_KEY = "portfolio-theme";

function readStorage(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Le choix reste actif pour la visite, même sans stockage local. */
  }
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

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

export default function SiteProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");
  const [theme, setTheme] = useState<Theme>("dark");
  const [paused, setPaused] = useState(false);
  const prefersReduced = usePrefersReducedMotion();
  const calm = paused || prefersReduced;
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const savedLocale = readStorage(LOCALE_KEY);
      if (savedLocale === "fr" || savedLocale === "en") setLocaleState(savedLocale);
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

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    document.documentElement.dataset.motion = calm ? "off" : "on";
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

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    writeStorage(LOCALE_KEY, next);
  }, []);

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
      t: content[locale],
      setLocale,
      theme,
      toggleTheme,
      paused,
      setPaused,
      calm,
      scrollTo,
      lockScroll,
    }),
    [calm, locale, lockScroll, paused, scrollTo, setLocale, theme, toggleTheme],
  );

  return (
    <SiteContext.Provider value={value}>
      <MotionConfig reducedMotion={paused ? "always" : "user"}>{children}</MotionConfig>
    </SiteContext.Provider>
  );
}
