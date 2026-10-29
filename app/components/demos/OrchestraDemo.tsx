"use client";

import { CalendarRange, Code2, Megaphone, Server, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { useInView } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useSite } from "../site/SiteProvider";
import DemoFrame, { Window } from "./DemoFrame";

type Mode = "solo" | "team";
type TaskKey = "frame" | "design" | "ops" | "build" | "tests" | "docs" | "report" | "review";

// Planning illustratif sur une échelle de 0 à 100, sans unité de temps.
// lane : 0 pour Zié, 1 développement, 2 communication, 3 exploitation.
const PLAN: { key: TaskKey; lane: number; solo: [number, number]; team: [number, number] }[] = [
  { key: "frame", lane: 0, solo: [0, 7], team: [0, 7] },
  { key: "design", lane: 0, solo: [7, 19], team: [7, 19] },
  { key: "ops", lane: 3, solo: [19, 33], team: [9, 27] },
  { key: "build", lane: 1, solo: [33, 63], team: [19, 45] },
  { key: "tests", lane: 1, solo: [63, 74], team: [23, 48] },
  { key: "docs", lane: 2, solo: [74, 82], team: [26, 47] },
  { key: "report", lane: 2, solo: [82, 88], team: [19, 52] },
  { key: "review", lane: 0, solo: [88, 96], team: [45, 56] },
];

// Icônes des agents, dans l’ordre des pistes 1 à 3 ; la piste 0 porte la photo de Zié.
const AGENT_ICONS: LucideIcon[] = [Code2, Megaphone, Server];

function Owner({ lane, name }: { lane: number; name: string }) {
  const Icon = AGENT_ICONS[lane - 1];
  return (
    <span className="gantt-owner" data-lane={lane}>
      <span className="gantt-avatar" aria-hidden="true">
        {Icon ? <Icon size={11} strokeWidth={2.25} /> : <Image src="/portraits/cv-portrait.jpg" alt="" width={36} height={36} />}
      </span>
      {name}
    </span>
  );
}

/** Diagramme de Gantt qui passe d’une file unique à des files parallèles, avec revue humaine. */
export default function OrchestraDemo() {
  const { t, calm } = useSite();
  const copy = t.demos.orchestra;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.55, once: true });
  const [mode, setMode] = useState<Mode | null>(null);
  // Sans choix explicite : on montre d’abord la file unique, puis la version orchestrée à l’entrée dans l’écran.
  const [revealed, setRevealed] = useState(false);
  const current: Mode = mode ?? (calm || revealed ? "team" : "solo");
  const end = Math.max(...PLAN.map((task) => task[current][1]));

  useEffect(() => {
    if (!inView || calm || mode) return;
    const timer = window.setTimeout(() => setRevealed(true), 900);
    return () => window.clearTimeout(timer);
  }, [inView, calm, mode]);

  return (
    <DemoFrame label={copy.label} className="orchestra-demo">
      <Window className="orchestra-window" icon={<CalendarRange size={12} strokeWidth={2} />} title={copy.title}>
        <div ref={ref} className="orchestra" data-mode={current} style={{ "--end": end / 100 } as CSSProperties}>
          <div className="orchestra-head">
            <div className="segmented orchestra-switch" role="radiogroup" aria-label={copy.label}>
              {(["solo", "team"] as Mode[]).map((value) => (
                <button key={value} type="button" role="radio" aria-checked={current === value} onClick={() => setMode(value)}>
                  {current === value && <span className="segmented-pill" />}
                  <span className="segmented-label">{value === "solo" ? copy.solo : copy.team}</span>
                </button>
              ))}
            </div>
            <p className="orchestra-caption" aria-live="polite">
              {copy.caption[current]}
            </p>
          </div>

          <ol className="gantt">
            {PLAN.map((task) => {
              const [start, stop] = task[current];
              const lane = current === "solo" ? 0 : task.lane;
              return (
                <li key={task.key} className="gantt-row" data-lane={lane}>
                  <span className="gantt-label">
                    <span className="gantt-task">{copy.tasks[task.key]}</span>
                    <Owner lane={lane} name={copy.lanes[lane]} />
                  </span>
                  <span className="gantt-track" aria-hidden="true">
                    <span
                      className={task.key === "review" ? "gantt-bar is-review" : "gantt-bar"}
                      style={{ left: `${start}%`, width: `${stop - start}%` }}
                    />
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="gantt-axis" aria-hidden="true">
            <span />
            <span className="gantt-axis-track">
              <span>{copy.start}</span>
              <span className="gantt-end">{copy.end}</span>
            </span>
          </div>
        </div>
      </Window>
    </DemoFrame>
  );
}
