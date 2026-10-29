"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import MacBook from "../devices/MacBook";
import WebApp, { type WebView } from "../screens/WebApp";
import { useSite } from "../site/SiteProvider";
import DemoFrame from "./DemoFrame";

const VIEWS: WebView[] = ["wire", "ui", "code", "live"];
// Chaque étape dure le temps de son animation, plus une pause pour la lire.
const DURATIONS = [3600, 5200, 4600, 4600];
// Dans l’interface finie, l’invitation part toute seule une fois l’écran habillé.
const SEND_AT = 2900;

function subscribe() {
  return () => {};
}

/**
 * Une fonctionnalité racontée pas à pas, dans le MacBook : la maquette se dessine, puis s’habille
 * bloc par bloc jusqu’à l’interface finie, l’invitation part, le code s’écrit, la mise en ligne
 * se déroule dans le Terminal. La maquette et l’interface sont la même page : seul son habillage
 * change, d’où la transition continue entre les deux.
 */
export default function ProductDemo() {
  const { t, calm } = useSite();
  const copy = t.demos.product;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const [tab, setTab] = useState(0);
  const [touched, setTouched] = useState(false);
  const [role, setRole] = useState(1);
  const [sent, setSent] = useState(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const autoplay = inView && !calm && !touched;
  // Sans animation, on montre directement l’interface finie.
  const current = calm && !touched ? 1 : tab;
  const view = VIEWS[current];

  // Vrai une fois la page hydratée : la maquette peut alors attendre l’entrée dans l’écran pour se dessiner.
  const armed = useSyncExternalStore(subscribe, () => true, () => false);

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => setTab((value) => (value + 1) % VIEWS.length), DURATIONS[tab]);
    return () => window.clearTimeout(timer);
  }, [autoplay, tab]);

  useEffect(() => {
    if (!autoplay || VIEWS[tab] !== "ui") return;
    const timer = window.setTimeout(() => setSent(true), SEND_AT);
    return () => window.clearTimeout(timer);
  }, [autoplay, tab]);

  useEffect(() => {
    if (!sent) return;
    const timer = window.setTimeout(() => setSent(false), 2200);
    return () => window.clearTimeout(timer);
  }, [sent]);

  function select(index: number) {
    setTouched(true);
    setTab(index);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const count = VIEWS.length;
    let next = -1;
    if (event.key === "ArrowRight") next = (current + 1) % count;
    else if (event.key === "ArrowLeft") next = (current - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    if (next < 0) return;
    event.preventDefault();
    select(next);
    tabsRef.current[next]?.focus();
  }

  // La maquette et l’interface partagent le même écran pour que l’une se transforme en l’autre.
  const screen = view === "wire" || view === "ui" ? "browser" : view;

  return (
    <DemoFrame number="2.1" label={copy.label} className="product-demo">
      <div ref={ref} className="product" data-armed={armed && !calm ? "" : undefined} data-play={inView && !calm ? "" : undefined}>
        <MacBook className="product-mac">
          <div className="product-screen" key={screen}>
            <WebApp
              view={view}
              role={role}
              onRole={(index) => {
                setTouched(true);
                setRole(index);
              }}
              sent={sent}
              onSend={() => {
                setTouched(true);
                setSent(true);
              }}
              calm={calm}
            />
          </div>
        </MacBook>

        <div className="product-tabs" role="tablist" aria-label={copy.label}>
          {copy.tabs.map((label, index) => (
            <button
              key={label}
              ref={(node) => {
                tabsRef.current[index] = node;
              }}
              id={`pd-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={current === index}
              aria-controls="pd-panel"
              tabIndex={current === index ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={onKeyDown}
            >
              <span className="mono">0{index + 1}</span>
              <span>{label}</span>
              {current === index && autoplay && <span key={tab} className="product-progress" style={{ animationDuration: `${DURATIONS[index]}ms` }} aria-hidden="true" />}
            </button>
          ))}
        </div>
        <p id="pd-panel" role="tabpanel" aria-labelledby={`pd-tab-${current}`} className="product-caption" aria-live="polite">
          {copy.captions[current]}
        </p>
      </div>
    </DemoFrame>
  );
}
