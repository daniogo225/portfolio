"use client";

import { useCallback, useEffect, useState } from "react";
import type { SiteContent } from "../data/content";
import type { Locale } from "../data/site";
import Chain from "./site/Chain";
import CommandPalette from "./site/CommandPalette";
import Contact from "./site/Contact";
import FloatingCta from "./site/FloatingCta";
import Footer from "./site/Footer";
import Header from "./site/Header";
import Hero from "./site/Hero";
import Method from "./site/Method";
import Profile from "./site/Profile";
import SiteProvider, { useSite } from "./site/SiteProvider";

function Site() {
  const { t } = useSite();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="skip-link"
        onClick={() => document.getElementById("main")?.focus({ preventScroll: true })}
      >
        {t.meta.skip}
      </a>
      <Header onOpenPalette={() => setPaletteOpen(true)} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Chain />
        <Method />
        <Profile />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
      <CommandPalette open={paletteOpen} onClose={closePalette} />
    </>
  );
}

export default function Portfolio({ locale, t }: { locale: Locale; t: SiteContent }) {
  return (
    <SiteProvider locale={locale} t={t}>
      <Site />
    </SiteProvider>
  );
}
