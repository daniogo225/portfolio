"use client";

import { useCallback, useEffect, useState } from "react";
import CommandPalette from "./site/CommandPalette";
import Contact from "./site/Contact";
import Expertise from "./site/Expertise";
import Footer from "./site/Footer";
import Header from "./site/Header";
import Hero from "./site/Hero";
import Marquee from "./site/Marquee";
import Profile from "./site/Profile";
import SiteProvider, { useSite } from "./site/SiteProvider";
import Statement from "./site/Statement";
import Work from "./site/Work";

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
        <Marquee />
        <Statement />
        <Work />
        <Expertise />
        <Profile />
        <Contact />
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={closePalette} />
    </>
  );
}

export default function Portfolio() {
  return (
    <SiteProvider>
      <Site />
    </SiteProvider>
  );
}
