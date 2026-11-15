"use client";

import { Code2, FlaskConical, PenLine, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { useInView } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useSite } from "../site/SiteProvider";

type Mode = "solo" | "team";
type TaskKey = "frame" | "design" | "build" | "tests" | "docs" | "report" | "review";

// Planning illustratif sur une échelle de 0 à 100, sans unité de temps.
// lane : 0 pour Zié, 1 l’agent code, 2 l’agent tests, 3 l’agent rédaction.
const PLAN: { key: TaskKey; lane: number; solo: [number, number]; team: [number, number] }[] = [
  { key: "frame", lane: 0, solo: [0, 8], team: [0, 8] },
  { key: "design", lane: 0, solo: [8, 22], team: [8, 22] },
  { key: "build", lane: 1, solo: [22, 58], team: [22, 48] },
  { key: "tests", lane: 2, solo: [58, 72], team: [27, 51] },
  { key: "docs", lane: 3, solo: [72, 82], team: [30, 50] },
  { key: "report", lane: 3, solo: [82, 89], team: [22, 54] },
  { key: "review", lane: 0, solo: [89, 97], team: [48, 58] },
];

const AGENT_ICONS: LucideIcon[] = [Code2, FlaskConical, PenLine];

function Owner({ lane, name }: { lane: number; name: string }) {
  const Icon = AGENT_ICONS[lane - 1];
  return (
    <span className="tl-owner">
      {lane === 0 ? (
        <Image className="tl-avatar" src="/portraits/cv-portrait.jpg" alt="" width={40} height={40} />
      ) : (
        <span className="tl-avatar is-agent" aria-hidden="true">
          <Icon size={11} strokeWidth={2} />
        </span>
      )}
      <span className="sr-only">{name}</span>
    </span>
  );
}

/**
 * Le même projet mené seul ou avec des agents : chaque tâche est une pilule sur sa piste, avec
 * son responsable (la photo de Zié, ou l’icône de l’agent). La ligne de livraison recule quand
 * le travail se parallélise ; la relecture reste à Zié.
 */
export default function OrchestraDemo() {
  const { t, calm } = useSite();
  const copy = t.demos.orchestra;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.45, once: true });
  const [mode, setMode] = useState<Mode | null>(null);
  // Sans choix explicite : la file unique d’abord, puis la version orchestrée à l’entrée dans l’écran.
  const [revealed, setRevealed] = useState(false);
  const current: Mode = mode ?? (calm || revealed ? "team" : "solo");
  const end = Math.max(...PLAN.map((task) => task[current][1]));
  const soloEnd = Math.max(...PLAN.map((task) => task.solo[1]));

  useEffect(() => {
    if (!inView || calm || mode) return;
    const timer = window.setTimeout(() => setRevealed(true), 1100);
    return () => window.clearTimeout(timer);
  }, [inView, calm, mode]);

  return (
    <figure className="orchestra" ref={ref} data-mode={current} data-shown={inView || calm ? "" : undefined} style={{ "--end": end / 100, "--solo-end": soloEnd / 100 } as CSSProperties}>
      <figcaption className="sr-only">{copy.label}</figcaption>
      <div className="segmented orchestra-switch" role="radiogroup" aria-label={copy.label}>
        {(["solo", "team"] as Mode[]).map((value) => (
          <button key={value} type="button" role="radio" aria-checked={current === value} onClick={() => setMode(value)}>
            {value === "solo" ? copy.solo : copy.team}
          </button>
        ))}
      </div>

      <div className="timeline">
        {/* Le repère de la livraison « seul » reste en place : l’écart avec la livraison se lit sur le planning. */}
        <span className="tl-mark" aria-hidden="true">
          <span>{copy.solo}</span>
        </span>
        <span className="tl-delivery" aria-hidden="true">
          <span>{copy.end}</span>
        </span>
        <ol className="tl-rows">
          {PLAN.map((task, index) => {
            const [start, stop] = task[current];
            const lane = current === "solo" ? 0 : task.lane;
            return (
              <li key={task.key} className="tl-row" data-lane={lane} data-review={task.key === "review" ? "" : undefined} style={{ "--row": index } as CSSProperties}>
                <span className="tl-label">
                  <Owner lane={lane} name={copy.lanes[lane]} />
                  <span className="tl-task">{copy.tasks[task.key]}</span>
                </span>
                <span className="tl-track" aria-hidden="true">
                  <span className="tl-bar" style={{ left: `${start}%`, width: `${stop - start}%` }} />
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </figure>
  );
}
