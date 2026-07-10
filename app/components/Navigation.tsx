"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n";
import { useTheme } from "./ThemeProvider";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pendingNavigation = useRef<string | null>(null);
  const { locale, setLocale, t } = useI18n();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { href: "#work", label: t.nav.work },
    { href: "#capabilities", label: t.nav.capabilities },
    { href: "#process", label: t.nav.process },
    { href: "#about", label: t.nav.about },
  ];

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const scrollPosition = window.scrollY;
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousHtmlOverscroll = html.style.overscrollBehavior;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;

    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollPosition}px`;
    body.style.width = "100%";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      html.style.overscrollBehavior = previousHtmlOverscroll;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollPosition);

      const targetHref = pendingNavigation.current;
      pendingNavigation.current = null;
      if (targetHref) {
        window.requestAnimationFrame(() => {
          window.history.pushState(null, "", targetHref);
          document.querySelector(targetHref)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 isolate transition-all duration-700 ${menuOpen ? "border-b border-border bg-background" : scrolled ? "border-b border-border bg-background/80 backdrop-blur-2xl" : "bg-transparent"}`}>
      <nav className={`content-shell relative z-20 flex items-center justify-between transition-[height] duration-700 ${menuOpen ? "h-20" : scrolled ? "h-16" : "h-20 lg:h-24"}`}>
        <a href="#top" className="group flex min-h-11 items-center gap-3" aria-label="Daniogo, accueil">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-[12px] font-semibold tracking-[-0.03em] text-background transition-transform duration-500 group-hover:rotate-[-8deg]">DA</span>
          <span className="hidden font-mono text-[10px] uppercase leading-[1.35] tracking-[0.14em] text-muted sm:block">
            Product systems<br />Abidjan, CI
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="interactive-line font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors duration-300 hover:text-foreground">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button onClick={() => setLocale(locale === "fr" ? "en" : "fr")} className="hidden h-10 min-w-10 items-center justify-center border border-border px-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted transition-colors hover:border-foreground hover:text-foreground sm:flex" aria-label="Changer de langue">
            {locale === "fr" ? "EN" : "FR"}
          </button>
          <button onClick={toggleTheme} className="hidden h-10 min-w-10 items-center justify-center border border-border px-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted transition-colors hover:border-foreground hover:text-foreground sm:flex" aria-label="Changer de thème">
            {theme === "dark" ? "Clair" : "Sombre"}
          </button>
          <a href="#contact" className="hidden h-10 items-center gap-3 bg-foreground px-4 font-mono text-[10px] uppercase tracking-[0.12em] text-background transition-colors hover:bg-accent sm:flex">
            {t.nav.contact}<span aria-hidden>↗</span>
          </a>
          <button onClick={() => setMenuOpen((value) => !value)} className="flex h-11 w-11 items-center justify-center border border-border bg-background lg:hidden" aria-controls="mobile-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}>
            <span className="relative h-3.5 w-5">
              <span className={`absolute left-0 top-1 h-px w-5 bg-foreground transition-transform duration-500 ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`absolute bottom-1 left-0 h-px w-5 bg-foreground transition-transform duration-500 ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      <div id="mobile-navigation" role="dialog" aria-modal={menuOpen} aria-hidden={!menuOpen} className={`fixed inset-0 z-10 h-[100dvh] overflow-y-auto overscroll-contain bg-background px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[calc(7rem+env(safe-area-inset-top))] transition-[opacity,visibility] duration-500 lg:hidden ${menuOpen ? "visible pointer-events-auto opacity-100" : "invisible pointer-events-none opacity-0"}`}>
        <div className="flex min-h-full flex-col justify-between gap-10">
          <div className="border-t border-border">
            {links.concat({ href: "#contact", label: t.nav.contact }).map((link, index) => (
              <a key={link.href} href={link.href} onClick={(event) => { event.preventDefault(); pendingNavigation.current = link.href; setMenuOpen(false); }} className="flex items-baseline justify-between border-b border-border py-[clamp(1rem,2.4dvh,1.25rem)] font-display text-[clamp(2.1rem,9vw,3.75rem)] leading-none">
                {link.label}<span className="font-mono text-[10px] text-accent">0{index + 1}</span>
              </a>
            ))}
          </div>
          <div className="flex shrink-0 gap-2">
            <button onClick={() => setLocale(locale === "fr" ? "en" : "fr")} className="h-12 flex-1 border border-border font-mono text-[10px] uppercase tracking-[0.12em]">{locale === "fr" ? "English" : "Français"}</button>
            <button onClick={toggleTheme} className="h-12 flex-1 border border-border font-mono text-[10px] uppercase tracking-[0.12em]">{theme === "dark" ? "Mode clair" : "Mode sombre"}</button>
          </div>
        </div>
      </div>
    </header>
  );
}
