"use client";

import { Command, Menu, Moon, Sun, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  stagger,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { links, type Locale } from "../../data/content";
import { EASE_OUT } from "../ui/RevealText";
import useAbidjanTime from "../ui/useAbidjanTime";
import { useSite } from "./SiteProvider";

export const SECTIONS = ["work", "expertise", "profile", "contact"] as const;
type SectionId = (typeof SECTIONS)[number];

function RollLabel({ children }: { children: string }) {
  return (
    <span className="roll" data-text={children}>
      <span>{children}</span>
    </span>
  );
}

export function LocaleSwitch({ id }: { id: string }) {
  const { locale, setLocale, t } = useSite();
  return (
    <div className="segmented" role="group" aria-label={t.controls.language}>
      {(["fr", "en"] as Locale[]).map((lang) => (
        <button
          key={lang}
          type="button"
          lang={lang}
          aria-pressed={locale === lang}
          aria-label={lang === "fr" ? "Français" : "English"}
          onClick={() => setLocale(lang)}
        >
          {locale === lang && (
            <motion.span layoutId={`locale-pill-${id}`} className="segmented-pill" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
          )}
          <span className="segmented-label">{lang.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme, t } = useSite();
  const label = theme === "dark" ? t.controls.toLight : t.controls.toDark;
  return (
    <button
      type="button"
      className="icon-button"
      aria-label={label}
      title={label}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="icon-swap"
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
        >
          {theme === "dark" ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

const menuList: Variants = {
  closed: {},
  open: { transition: { delayChildren: stagger(0.06, { startDelay: 0.18 }) } },
};

const menuItem: Variants = {
  closed: { y: "110%" },
  open: { y: "0%", transition: { duration: 0.8, ease: EASE_OUT } },
};

export default function Header({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { t, lockScroll, calm } = useSite();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);
  const [shortcut, setShortcut] = useState("Ctrl K");
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const time = useAbidjanTime();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 32, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(current > 12);
    if (menuOpen) return;
    if (current > 320 && current > previous + 4) setHidden(true);
    else if (current < previous - 4 || current < 320) setHidden(false);
  });

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) setShortcut("⌘ K");
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTIONS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    const top = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive(null);
    };
    window.addEventListener("scroll", top, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", top);
    };
  }, []);

  useEffect(() => {
    lockScroll(menuOpen);
    const main = document.getElementById("main");
    const footer = document.querySelector<HTMLElement>(".site-footer");
    main?.toggleAttribute("inert", menuOpen);
    footer?.toggleAttribute("inert", menuOpen);
    if (!menuOpen) return;
    firstLink.current?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = matchMedia("(min-width: 1024px)");
    const resize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    desktop.addEventListener("change", resize);
    return () => {
      window.removeEventListener("keydown", close);
      desktop.removeEventListener("change", resize);
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [menuOpen, lockScroll]);

  const items = SECTIONS.map((id) => ({ id, label: t.nav[id] }));

  return (
    <header
      className="site-header"
      data-hidden={hidden && !menuOpen ? "" : undefined}
      data-scrolled={scrolled || menuOpen ? "" : undefined}
      data-menu={menuOpen ? "" : undefined}
    >
      <div className="header-inner shell">
        <a href="#top" className="wordmark" aria-label={`Daniogo Aboubakar, ${t.footer.top}`}>
          <span className="wordmark-name">Daniogo</span>
          <span className="wordmark-role">{t.hero.role}</span>
        </a>

        <nav className="desktop-nav" aria-label={t.meta.navLabel}>
          {items.map((item) => (
            <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined}>
              {active === item.id && (
                <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              <RollLabel>{item.label}</RollLabel>
            </a>
          ))}
        </nav>

        <div className="header-tools">
          <span className="header-clock mono" aria-live="off">
            {t.controls.localTime} <time>{time || "--:--"}</time>
          </span>
          <button type="button" className="palette-trigger" onClick={onOpenPalette} aria-label={t.controls.palette}>
            <Command size={14} strokeWidth={1.75} aria-hidden="true" />
            <kbd>{shortcut}</kbd>
          </button>
          <div className="desktop-only">
            <LocaleSwitch id="header" />
          </div>
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            className="menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span>{menuOpen ? t.nav.close : t.nav.menu}</span>
            {menuOpen ? <X size={18} strokeWidth={1.75} aria-hidden="true" /> : <Menu size={18} strokeWidth={1.75} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <motion.div className="scroll-progress" style={{ scaleX: calm ? scrollYProgress : progress }} aria-hidden="true" />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.nav aria-label={t.meta.mobileNavLabel} variants={menuList} initial="closed" animate="open" exit="closed">
              {items.map((item, index) => (
                <span className="menu-mask" key={item.id}>
                  <motion.a
                    ref={index === 0 ? firstLink : undefined}
                    href={`#${item.id}`}
                    variants={menuItem}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="mono">0{index + 1}</span>
                    {item.label}
                  </motion.a>
                </span>
              ))}
            </motion.nav>
            <motion.div
              className="mobile-menu-foot"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 0.6, ease: EASE_OUT } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <a className="mobile-menu-mail" href={`mailto:${links.email}`}>
                {links.email}
              </a>
              <div className="mobile-menu-controls">
                <LocaleSwitch id="menu" />
                <span className="mono">
                  {t.controls.localTime} {time}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
