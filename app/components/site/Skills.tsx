"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import AgentDemo from "../demos/AgentDemo";
import OfflineDemo from "../demos/OfflineDemo";
import ProductDemo from "../demos/ProductDemo";
import ScaleDemo from "../demos/ScaleDemo";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import { useSite } from "./SiteProvider";

/**
 * Méthode : les projets clients restent confidentiels, alors chaque façon de travailler est
 * montrée par une démonstration. Les quatre chapitres partagent une seule scène, choisie par
 * onglets : une démonstration à la fois, la page reste courte.
 */
export default function Skills() {
  const { t, locale } = useSite();
  const order = ["product", "mobile", "ai", "scale"];
  const items = order.map((id) => t.skills.items.find((item) => item.id === id)!).filter(Boolean);
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const item = items[active];

  const demos: Record<string, ReactNode> = {
    product: <ProductDemo />,
    mobile: <OfflineDemo key={locale} />,
    ai: <AgentDemo key={locale} />,
    scale: <ScaleDemo />,
  };

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const count = items.length;
    let next = -1;
    if (event.key === "ArrowRight") next = (active + 1) % count;
    else if (event.key === "ArrowLeft") next = (active - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    if (next < 0) return;
    event.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  }

  return (
    <section id="method" className="skills section" aria-labelledby="skills-title">
      <div className="shell">
        <header className="section-head">
          <p className="section-label mono">
            <span>02</span>
            <span>{t.skills.label}</span>
          </p>
          <RevealText as="h2" id="skills-title" className="section-title" text={t.skills.title} />
          <p className="section-intro">{t.skills.intro}</p>
        </header>

        <div className="showcase">
          <div className="showcase-tabs" role="tablist" aria-label={t.skills.label}>
            {items.map((entry, index) => (
              <button
                key={entry.id}
                ref={(node) => {
                  tabsRef.current[index] = node;
                }}
                id={`showcase-tab-${entry.id}`}
                type="button"
                role="tab"
                aria-selected={active === index}
                aria-controls="showcase-panel"
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={onKeyDown}
              >
                <span className="mono">0{index + 1}</span>
                <span>{entry.tab}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={item.id}
              id="showcase-panel"
              role="tabpanel"
              aria-labelledby={`showcase-tab-${item.id}`}
              className="showcase-panel"
              data-id={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              <div className="showcase-copy">
                <h3 className="showcase-title">{item.title}</h3>
                <p className="showcase-body">{item.body}</p>
                <p className="skill-tools">
                  <span className="mono">{t.skills.toolsLabel}</span>
                  <span>{item.tools}</span>
                </p>
              </div>
              <div className="showcase-demo">{demos[item.id]}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
