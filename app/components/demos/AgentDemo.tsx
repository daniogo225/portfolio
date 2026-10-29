"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { AgentStep } from "../../data/content";
import { useSite } from "../site/SiteProvider";
import DemoFrame from "./DemoFrame";

const STEP_MS = 750;

type Decision = "approved" | "rejected" | null;

// Lignes de vie du diagramme : 1 utilisateur, 2 agent, 3 outils, 4 vous.
type Row =
  | { key: string; type: "arrow"; from: number; to: number; kind: string; text: string; code?: boolean; dashed?: boolean; strong?: boolean }
  | { key: string; type: "note"; kind: string; text: string; guard?: boolean }
  | { key: string; type: "approval" };

function rowFromStep(step: AgentStep, key: string, kinds: Record<AgentStep["kind"], string>): Row {
  switch (step.kind) {
    case "intent":
      return { key, type: "note", kind: kinds.intent, text: step.text };
    case "tool":
      return { key, type: "arrow", from: 2, to: 3, kind: kinds.tool, text: step.text, code: step.code };
    case "result":
      return { key, type: "arrow", from: 3, to: 2, kind: kinds.result, text: step.text, dashed: true };
    case "guard":
      return { key, type: "note", kind: kinds.guard, text: step.text, guard: true };
    default:
      return { key, type: "arrow", from: 2, to: 1, kind: kinds.answer, text: step.text, strong: true };
  }
}

/**
 * Diagramme de séquence d’un agent : la demande, les appels d’outils, les garde-fous, puis la
 * validation humaine quand l’action est sensible. Toutes les lignes sont rendues d’emblée
 * (invisibles) pour réserver la place et éviter que la page ne saute pendant la lecture.
 */
export default function AgentDemo() {
  const { t, calm } = useSite();
  const copy = t.demos.agent;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const [scenario, setScenario] = useState(0);
  const [shown, setShown] = useState(0);
  const [started, setStarted] = useState(false);
  const [decision, setDecision] = useState<Decision>(null);
  const [run, setRun] = useState(0);

  const current = copy.scenarios[scenario];
  const approval = current.approval;
  const after: AgentStep[] = approval ? (decision === "rejected" ? approval.rejected : approval.approved) : [];

  const rows: Row[] = [
    { key: "prompt", type: "arrow", from: 1, to: 2, kind: copy.request, text: current.prompt, strong: true },
    ...current.steps.map((step, index) => rowFromStep(step, `s${index}`, copy.kinds)),
    ...(approval
      ? [
          { key: "approval", type: "approval" } as Row,
          ...(decision
            ? [
                {
                  key: `decision-${decision}`,
                  type: "arrow",
                  from: 4,
                  to: 2,
                  kind: copy.decision,
                  text: decision === "approved" ? copy.approved : copy.rejected,
                  dashed: true,
                } as Row,
              ]
            : []),
          ...after.map((step, index) => rowFromStep(step, `a${index}-${decision ?? "pending"}`, copy.kinds)),
        ]
      : []),
  ];

  // Avant la décision, la lecture s’arrête sur la demande de validation.
  const waiting = Boolean(approval) && decision === null;
  const approvalIndex = rows.findIndex((row) => row.type === "approval");
  const limit = waiting ? approvalIndex + 1 : rows.length;
  const visible = calm ? limit : shown;
  const playing = started || inView;

  useEffect(() => {
    if (!playing || calm || shown >= limit) return;
    const timer = window.setTimeout(() => setShown((value) => value + 1), shown === 0 ? 350 : STEP_MS);
    return () => window.clearTimeout(timer);
  }, [playing, calm, shown, limit, run]);

  function play(index: number) {
    setScenario(index);
    setDecision(null);
    setShown(0);
    setStarted(true);
    setRun((value) => value + 1);
  }

  return (
    <DemoFrame number="2.2" label={copy.label} note={copy.note} className="agent-demo">
      <div ref={ref} className="seq">
        <div className="seq-head" aria-hidden="true">
          {copy.lanes.map((lane) => (
            <span key={lane}>{lane}</span>
          ))}
        </div>
        <div className="seq-body">
          <span className="seq-lines" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <ol className="seq-rows" aria-live="polite">
            {rows.map((row, index) => {
              const hidden = index >= visible;
              const state = { "data-hidden": hidden ? "" : undefined, "aria-hidden": hidden || undefined };
              if (row.type === "approval" && approval) {
                return (
                  <li key={row.key} className="seq-row" {...state}>
                    <div className="seq-arrow" data-dir="right" style={{ gridColumn: "4 / 8" }}>
                      <span className="seq-kind">{copy.approval}</span>
                      <span className="seq-text">{approval.question}</span>
                      <i className="seq-tip" />
                    </div>
                    <div className="seq-actions">
                      {decision === null ? (
                        <>
                          <button type="button" className="seq-approve" onClick={() => setDecision("approved")} tabIndex={hidden ? -1 : 0}>
                            {copy.approve}
                          </button>
                          <button type="button" className="seq-reject" onClick={() => setDecision("rejected")} tabIndex={hidden ? -1 : 0}>
                            {copy.reject}
                          </button>
                        </>
                      ) : null}
                    </div>
                  </li>
                );
              }
              if (row.type === "note") {
                return (
                  <li key={row.key} className="seq-row" {...state}>
                    <div className="seq-note" data-guard={row.guard ? "" : undefined}>
                      <span className="seq-kind">{row.kind}</span>
                      <span className="seq-text">{row.text}</span>
                    </div>
                  </li>
                );
              }
              if (row.type === "arrow") {
                const [a, b] = row.from < row.to ? [row.from, row.to] : [row.to, row.from];
                return (
                  <li key={row.key} className="seq-row" {...state}>
                    <div
                      className="seq-arrow"
                      data-dir={row.from < row.to ? "right" : "left"}
                      data-dashed={row.dashed ? "" : undefined}
                      style={{ gridColumn: `${2 * a} / ${2 * b}` }}
                    >
                      <span className="seq-kind">{row.kind}</span>
                      {row.code ? <code className="seq-text">{row.text}</code> : <span className={row.strong ? "seq-text is-strong" : "seq-text"}>{row.text}</span>}
                      <i className="seq-tip" />
                    </div>
                  </li>
                );
              }
              return null;
            })}
          </ol>
        </div>

        <div className="seq-foot">
          <div className="seq-prompts" role="group" aria-label={copy.pick}>
            <span className="seq-prompts-label">{copy.pick}</span>
            {copy.scenarios.map((item, index) => (
              <button key={item.prompt} type="button" aria-pressed={scenario === index} onClick={() => play(index)}>
                <span className="mono">0{index + 1}</span>
                <span>{item.prompt}</span>
              </button>
            ))}
          </div>
          <button type="button" className="text-button" onClick={() => play(scenario)}>
            {copy.replay}
          </button>
        </div>
      </div>
    </DemoFrame>
  );
}
