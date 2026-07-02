"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { useI18n } from "../i18n";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t, locale, setLocale } = useI18n();

  const links = [
    { label: t.nav.manifesto, href: "#manifesto" },
    { label: t.nav.approach, href: "#approach" },
    { label: t.nav.work, href: "#work" },
    { label: t.nav.process, href: "#process" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] ease-out ${
        menuOpen
          ? "bg-background duration-0"
          : scrolled
            ? "bg-background/75 backdrop-blur-xl backdrop-saturate-150 border-b border-border duration-700"
            : "bg-transparent duration-700"
      }`}
    >
      <nav
        className={`max-w-[1400px] mx-auto flex items-center justify-between px-6 sm:px-10 lg:px-20 transition-[height] duration-500 ease-out ${
          scrolled ? "h-14 sm:h-16" : "h-16 sm:h-20"
        }`}
      >
        <a
          href="#"
          className="group font-display text-lg sm:text-xl tracking-[-0.02em] relative z-50 inline-flex items-center font-medium min-h-[44px] -ml-2 px-2"
          aria-label="Home"
        >
          <span className="transition-colors duration-500 group-hover:text-accent">
            daniogo
          </span>
          <span className="text-accent">.</span>
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[12px] font-mono tracking-[0.1em] uppercase text-foreground/60 hover:text-foreground transition-colors duration-500 ease-out group min-h-[44px] flex items-center"
            >
              <span className="text-muted/40 mr-1.5 group-hover:text-accent transition-colors duration-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              {link.label}
            </a>
          ))}

          <div className="h-3.5 w-px bg-border" />

          <button
            onClick={() => setLocale(locale === "en" ? "fr" : "en")}
            className="font-mono text-[11px] tracking-[0.12em] uppercase text-foreground/60 hover:text-foreground transition-colors duration-500 min-h-[44px] min-w-[44px] flex items-center justify-center"
            data-hover
            aria-label="Toggle language"
          >
            {locale === "en" ? "FR" : "EN"}
          </button>
          <button
            onClick={toggleTheme}
            className="font-mono text-[11px] tracking-[0.12em] uppercase text-foreground/60 hover:text-foreground transition-colors duration-500 min-h-[44px] min-w-[44px] flex items-center justify-center"
            data-hover
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden relative z-50 w-11 h-11 flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          data-hover
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className={`block w-6 h-px bg-foreground transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[3px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-foreground transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 flex flex-col px-6 sm:px-10 pt-24 pb-12 transition-[visibility] duration-0 ${
          menuOpen
            ? "visible bg-background pointer-events-auto"
            : "invisible pointer-events-none"
        }`}
      >
        <div className="flex-1 flex flex-col justify-center">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-[clamp(2rem,8vw,3.5rem)] leading-[1.05] tracking-[-0.03em] text-foreground py-2 sm:py-3 flex items-baseline gap-3 sm:gap-4 font-medium"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transitionProperty: "opacity, transform",
                transitionDuration: "500ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: menuOpen ? `${120 + i * 60}ms` : "0ms",
              }}
            >
              <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              {link.label}
            </a>
          ))}
        </div>

        <div
          className="flex items-center gap-3 pt-6 border-t border-border"
          style={{
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            transitionProperty: "opacity, transform",
            transitionDuration: "500ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: menuOpen ? "500ms" : "0ms",
          }}
        >
          <button
            onClick={() => {
              setLocale(locale === "en" ? "fr" : "en");
              setMenuOpen(false);
            }}
            className="font-mono text-xs tracking-[0.2em] uppercase text-muted border border-border min-h-[44px] px-4"
          >
            {locale === "en" ? "FR" : "EN"}
          </button>
          <button
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            className="font-mono text-xs tracking-[0.2em] uppercase text-muted border border-border min-h-[44px] px-4"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </header>
  );
}
