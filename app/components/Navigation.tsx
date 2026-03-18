"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-12 lg:px-20 h-20">
        {/* Logo */}
        <a
          href="#"
          className="font-display text-2xl tracking-tight relative z-50"
        >
          dani<span className="text-accent">.</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[13px] font-sans font-medium tracking-[0.18em] uppercase text-muted hover:text-foreground transition-colors duration-300 group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="ml-6 font-mono text-[11px] tracking-[0.25em] uppercase text-muted hover:text-foreground transition-colors duration-300 border border-border hover:border-accent/50 px-4 py-2"
            data-hover
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
        className={`md:hidden fixed inset-0 bg-background z-40 flex flex-col items-start justify-center px-12 transition-all duration-500 ${
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
        <button
          onClick={() => {
            toggleTheme();
            setMenuOpen(false);
          }}
          className="mt-10 font-mono text-xs tracking-[0.25em] uppercase text-muted border border-border px-4 py-2 transition-all duration-500"
          style={{
            transitionDelay: menuOpen ? "470ms" : "0ms",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
        </button>
      </div>
    </header>
  );
}
