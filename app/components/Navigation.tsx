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
    { label: t.nav.about, href: "#about" },
    { label: t.nav.work, href: "#work" },
    { label: t.nav.stack, href: "#stack" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl backdrop-saturate-150 border-b border-border/40 shadow-[0_1px_30px_-10px_rgba(0,0,0,0.25)]"
          : "bg-gradient-to-b from-background/30 to-transparent backdrop-blur-sm"
      }`}
    >
      <nav
        className={`max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-12 lg:px-20 transition-all duration-500 ease-out ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          className="group font-display text-2xl tracking-tight relative z-50 inline-flex items-baseline"
          aria-label="Home"
        >
          <span className="transition-colors duration-500 group-hover:text-accent-light">
            dani
          </span>
          <span className="text-accent transition-all duration-500 group-hover:text-accent-light group-hover:translate-x-0.5">
            .
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-9">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[12px] font-sans font-medium tracking-[0.18em] uppercase text-muted hover:text-foreground transition-colors duration-500 ease-out group"
            >
              <span className="font-mono text-[9px] text-muted/40 mr-2 group-hover:text-accent-light/70 transition-colors duration-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-light transition-all duration-500 ease-out group-hover:w-full" />
            </a>
          ))}

          {/* Subtle divider */}
          <div className="h-4 w-px bg-border/60" />

          <button
            onClick={() => setLocale(locale === "en" ? "fr" : "en")}
            className="relative font-mono text-[10px] tracking-[0.25em] uppercase text-muted hover:text-foreground transition-all duration-500 ease-out border border-border/80 hover:border-accent-light/50 hover:bg-accent-light/5 px-2.5 py-1.5"
            data-hover
            aria-label="Toggle language"
          >
            {locale === "en" ? "FR" : "EN"}
          </button>
          <button
            onClick={toggleTheme}
            className="relative font-mono text-[10px] tracking-[0.25em] uppercase text-muted hover:text-foreground transition-all duration-500 ease-out border border-border/80 hover:border-accent-light/50 hover:bg-accent-light/5 px-2.5 py-1.5 w-[62px]"
            data-hover
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden relative z-50 w-8 h-8 flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          data-hover
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className={`block w-6 h-[1.5px] bg-foreground transition-all duration-300 origin-center ${
                menuOpen ? "rotate-45 translate-y-[3.25px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-foreground transition-all duration-300 origin-center ${
                menuOpen ? "-rotate-45 -translate-y-[3.25px]" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 flex flex-col items-start justify-center px-12 transition-all duration-600 ease-out ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {links.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-display text-[clamp(2.5rem,8vw,4rem)] leading-tight tracking-tight text-foreground block py-3 transition-all duration-500"
            style={{
              transitionDelay: menuOpen ? `${150 + i * 80}ms` : "0ms",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {link.label}
          </a>
        ))}
        <div
          className="mt-10 flex items-center gap-4"
          style={{
            transitionDelay: menuOpen ? "470ms" : "0ms",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s",
          }}
        >
          <button
            onClick={() => {
              setLocale(locale === "en" ? "fr" : "en");
              setMenuOpen(false);
            }}
            className="font-mono text-xs tracking-[0.25em] uppercase text-muted border border-border px-4 py-2"
          >
            {locale === "en" ? "FR" : "EN"}
          </button>
          <button
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            className="font-mono text-xs tracking-[0.25em] uppercase text-muted border border-border px-4 py-2"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </header>
  );
}
