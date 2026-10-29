"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import MacBook from "../devices/MacBook";
import WebApp, { type WebView } from "../screens/WebApp";
import { useSite } from "../site/SiteProvider";
import DemoFrame from "./DemoFrame";

const STEP_MS = 3400;
const VIEWS: WebView[] = ["wire", "ui", "code", "live"];

/** Une fonctionnalité, quatre états : la même page de l’application, dans le MacBook. */
export default function ProductDemo() {
  const { t, calm } = useSite();
  const copy = t.demos.product;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [tab, setTab] = useState(1);
  const [touched, setTouched] = useState(false);
  const [role, setRole] = useState(1);
  const [sent, setSent] = useState(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const autoplay = inView && !calm && !touched;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => setTab((current) => (current + 1) % VIEWS.length), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, tab]);

  useEffect(() => {
    if (!sent) return;
    const timer = window.setTimeout(() => setSent(false), 2600);
    return () => window.clearTimeout(timer);
  }, [sent]);

  function select(index: number) {
    setTouched(true);
    setTab(index);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const count = VIEWS.length;
    let next = -1;
    if (event.key === "ArrowRight") next = (tab + 1) % count;
    else if (event.key === "ArrowLeft") next = (tab - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    if (next < 0) return;
    event.preventDefault();
    select(next);
    tabsRef.current[next]?.focus();
  }

  return (
    <DemoFrame number="2.1" label={copy.label} className="product-demo">
      <div ref={ref} className="product">
        <MacBook className="product-mac">
          <div className="product-screen" key={VIEWS[tab]}>
            <WebApp
              view={VIEWS[tab]}
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
              aria-selected={tab === index}
              aria-controls="pd-panel"
              tabIndex={tab === index ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={onKeyDown}
            >
              <span className="mono">0{index + 1}</span>
              <span>{label}</span>
              {tab === index && autoplay && <span className="product-progress" style={{ animationDuration: `${STEP_MS}ms` }} aria-hidden="true" />}
            </button>
          ))}
        </div>
        <p id="pd-panel" role="tabpanel" aria-labelledby={`pd-tab-${tab}`} className="product-caption">
          {tab === 0 && copy.wire.join(", ")}
          {tab === 1 && `${copy.title}. ${copy.hint}`}
          {tab === 2 && copy.comment.replace(/^\/\/\s*/, "")}
          {tab === 3 && `${copy.url} : ${copy.steps.join(", ")}.`}
        </p>
      </div>
    </DemoFrame>
  );
}
