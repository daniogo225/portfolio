"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { label: "Projets", href: "#projets" },
  { label: "A propos", href: "#apropos" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const { theme, toggle } = useTheme();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--surface)]/90 backdrop-blur-xl border-b border-[var(--border)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="max-w-[1200px] mx-auto px-8 md:px-16 lg:px-24 h-16 flex items-center justify-between">
          <a
            href="#"
            className={`font-bold text-lg tracking-tight hover:opacity-70 transition-all duration-500 ${
              scrolled ? "text-[var(--foreground)]" : "text-white"
            }`}
          >
            daniogo.
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors duration-500 tracking-wide uppercase font-medium line-accent ${
                  scrolled
                    ? "text-[var(--muted)] hover:text-[var(--foreground)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}

            <button
              onClick={(e) => toggle(e)}
              className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors duration-500 ${
                scrolled
                  ? "border-[var(--border)] hover:border-[var(--foreground)] text-[var(--foreground)]"
                  : "border-white/30 hover:border-white text-white"
              }`}
              aria-label="Toggle theme"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "light" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                )}
              </motion.div>
            </button>
          </div>

          {/* Mobile: theme + burger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={(e) => toggle(e)}
              className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors duration-500 ${
                scrolled
                  ? "border-[var(--border)] text-[var(--foreground)]"
                  : "border-white/30 text-white"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-[7px]"
              aria-label="Menu"
            >
              <motion.span
                className={`block w-5 h-[2px] transition-colors duration-500 ${scrolled ? "bg-[var(--foreground)]" : "bg-white"}`}
                animate={menuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className={`block w-5 h-[2px] transition-colors duration-500 ${scrolled ? "bg-[var(--foreground)]" : "bg-white"}`}
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className={`block w-5 h-[2px] transition-colors duration-500 ${scrolled ? "bg-[var(--foreground)]" : "bg-white"}`}
                animate={menuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <motion.div
        className="fixed inset-0 z-40 bg-[var(--background)] flex flex-col items-center justify-center gap-8 md:hidden"
        initial={false}
        animate={menuOpen ? { opacity: 1, pointerEvents: "auto" as const } : { opacity: 0, pointerEvents: "none" as const }}
        transition={{ duration: 0.4 }}
      >
        {navItems.map((item, i) => (
          <motion.a
            key={item.href}
            href={item.href}
            className="text-3xl font-bold text-[var(--foreground)] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: menuOpen ? i * 0.1 : 0, duration: 0.4 }}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </motion.a>
        ))}
      </motion.div>
    </>
  );
}
