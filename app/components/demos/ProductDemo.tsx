"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useSite } from "../site/SiteProvider";
import DemoFrame from "./DemoFrame";

const STEP_MS = 3200;
const STATION_W = 128;
const STATION_H = 224;
const PITCH = 160;

// Lignes de l’extrait de code : retrait, largeur et ton de chaque ligne.
const CODE: [number, number, "ink" | "soft" | "faint"][] = [
  [0, 64, "ink"],
  [0, 8, "ink"],
  [12, 70, "faint"],
  [12, 54, "soft"],
  [0, 0, "soft"],
  [12, 66, "ink"],
  [24, 40, "soft"],
  [12, 14, "ink"],
  [0, 0, "soft"],
  [12, 58, "ink"],
  [24, 62, "soft"],
  [0, 0, "soft"],
  [12, 72, "ink"],
  [0, 8, "ink"],
];

function Wire() {
  return (
    <g className="st-wire">
      <rect x={14} y={18} width={56} height={10} />
      <rect x={14} y={34} width={84} height={4} className="is-faint" />
      <rect x={14} y={54} width={100} height={26} />
      <rect x={14} y={92} width={30} height={18} />
      <rect x={49} y={92} width={30} height={18} />
      <rect x={84} y={92} width={30} height={18} />
      <rect x={14} y={180} width={100} height={26} />
    </g>
  );
}

function Ui() {
  return (
    <g className="st-ui">
      <rect x={14} y={18} width={56} height={8} className="is-fill" />
      <rect x={14} y={32} width={84} height={4} className="is-fill-soft" />
      <rect x={14} y={54} width={100} height={26} />
      <rect x={22} y={65} width={46} height={4} className="is-fill-soft" />
      <rect x={14} y={92} width={100} height={20} />
      <rect x={47} y={92} width={34} height={20} className="is-fill-faint" />
      <line x1={47} y1={92} x2={47} y2={112} />
      <line x1={81} y1={92} x2={81} y2={112} />
      <rect x={14} y={180} width={100} height={26} className="is-fill" />
      <rect x={48} y={191} width={32} height={4} className="is-paper" />
    </g>
  );
}

function Code() {
  return (
    <g className="st-code">
      {CODE.map(([indent, width, tone], index) => {
        const y = 18 + index * 13;
        return (
          <g key={index}>
            <rect x={14} y={y} width={5} height={3} className="is-fill-faint" />
            {width > 0 && <rect x={26 + indent} y={y} width={width} height={3} className={`is-${tone}`} />}
          </g>
        );
      })}
    </g>
  );
}

function Live({ steps, active, calm }: { steps: number; active: boolean; calm: boolean }) {
  return (
    <g className="st-live">
      <rect x={14} y={18} width={100} height={14} />
      <rect x={34} y={23} width={54} height={4} className="is-fill-soft" />
      <circle cx={22} cy={25} r={2.2} className={active ? "is-accent" : "is-fill-faint"} />
      {Array.from({ length: steps }, (_, index) => {
        const y = 50 + index * 26;
        const delay = calm || !active ? "0ms" : `${200 + index * 360}ms`;
        return (
          <g key={index} className="st-live-row" data-shown={active ? "" : undefined} style={{ animationDelay: delay }}>
            <rect x={14} y={y} width={10} height={10} />
            <polyline points={`16.5,${y + 5} 18.5,${y + 7.5} 22,${y + 3}`} className="is-check" />
            <rect x={32} y={y + 3} width={44 + ((index * 17) % 24)} height={4} className="is-fill-soft" />
            <rect x={104} y={y + 3} width={10} height={4} className="is-fill-faint" />
          </g>
        );
      })}
      <line x1={14} y1={190} x2={114} y2={190} className="is-faint" />
      <rect x={14} y={196} width={28} height={10} className={active ? "is-accent" : "is-fill-faint"} />
    </g>
  );
}

/** Une fonctionnalité, quatre états : la même pièce suit la chaîne, de la maquette au serveur. */
export default function ProductDemo() {
  const { t, calm } = useSite();
  const copy = t.demos.product;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [tab, setTab] = useState(0);
  const [touched, setTouched] = useState(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const autoplay = inView && !calm && !touched;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => setTab((current) => (current + 1) % copy.tabs.length), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, tab, copy.tabs.length]);

  function select(index: number) {
    setTouched(true);
    setTab(index);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const count = copy.tabs.length;
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

  const stations = [<Wire key="wire" />, <Ui key="ui" />, <Code key="code" />, <Live key="live" steps={copy.steps.length} active={tab === 3} calm={calm} />];

  return (
    <DemoFrame number="2.1" label={copy.label} className="pipeline-demo">
      <div ref={ref} className="pipeline">
        <svg className="fig pipeline-svg" viewBox="0 0 640 296" aria-hidden="true">
          {stations.map((station, index) => {
            const x = 16 + index * PITCH;
            return (
              <g key={index} className="station" data-active={tab === index ? "" : undefined} transform={`translate(${x} 16)`}>
                <rect className="station-box" width={STATION_W} height={STATION_H} rx={2} />
                {station}
              </g>
            );
          })}
          {[0, 1, 2].map((index) => {
            const x = 16 + STATION_W + index * PITCH;
            return (
              <g key={index} className="pipeline-link" data-done={tab > index ? "" : undefined}>
                <line x1={x + 4} y1={128} x2={x + 28} y2={128} />
                <polyline points={`${x + 23},124 ${x + 28},128 ${x + 23},132`} />
              </g>
            );
          })}
          <line className="pipeline-rail" x1={16} y1={272} x2={624} y2={272} />
          {[0, 1, 2, 3].map((index) => (
            <line key={index} className="pipeline-tick" x1={16 + STATION_W / 2 + index * PITCH} y1={268} x2={16 + STATION_W / 2 + index * PITCH} y2={276} />
          ))}
          <g className="pipeline-cursor" style={{ transform: `translateX(${tab * PITCH}px)` }}>
            <circle cx={16 + STATION_W / 2} cy={272} r={4} />
          </g>
        </svg>

        <div className="pipeline-tabs" role="tablist" aria-label={copy.label}>
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
              {tab === index && autoplay && <span className="pipeline-progress" style={{ animationDuration: `${STEP_MS}ms` }} aria-hidden="true" />}
            </button>
          ))}
        </div>
        <p id="pd-panel" role="tabpanel" aria-labelledby={`pd-tab-${tab}`} className="pipeline-caption">
          {tab === 0 && copy.wire.join(", ")}
          {tab === 1 && `${copy.title}. ${copy.hint}`}
          {tab === 2 && copy.comment.replace(/^\/\/\s*/, "")}
          {tab === 3 && `${copy.url} : ${copy.steps.join(", ")}.`}
        </p>
      </div>
    </DemoFrame>
  );
}
