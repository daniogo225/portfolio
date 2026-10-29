"use client";

import { CornerDownRight, MessageSquareText, RotateCcw, ShieldCheck, Sparkles, UserCheck, Wrench, type LucideIcon } from "lucide-react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { AgentKind, AgentStep } from "../../data/content";
import { useSite } from "../site/SiteProvider";
import DemoFrame, { Window } from "./DemoFrame";

const STEP_MS = 750;

type Decision = "approved" | "rejected" | null;

const ICONS: Record<AgentKind, LucideIcon> = {
  intent: Sparkles,
  tool: Wrench,
  result: CornerDownRight,
  guard: ShieldCheck,
  answer: MessageSquareText,
};

/**
 * Trace d’un agent scriptée pas à pas : intention, appels d’outils, garde-fous, puis validation
 * humaine quand l’action est sensible. Toutes les étapes sont rendues d’emblée (invisibles) pour
 * réserver la place et éviter que la page ne saute pendant la lecture.
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
  // Avant la décision, on réserve la place du chemin le plus long (validation acceptée).
  const total = current.steps.length + (approval ? 1 + after.length : 0);
  const waiting = Boolean(approval) && decision === null;
  const limit = waiting ? current.steps.length + 1 : total;
  const visible = calm ? limit : shown;

  // La lecture démarre à l’entrée dans l’écran, ou dès qu’on choisit une demande.
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

  function decide(value: Exclude<Decision, null>) {
    setDecision(value);
  }

  const items: { key: string; step?: AgentStep; approval?: true }[] = [
    ...current.steps.map((step, index) => ({ key: `s${index}`, step })),
    ...(approval ? [{ key: "approval", approval: true as const }] : []),
    ...after.map((step, index) => ({ key: `a${index}-${decision ?? "pending"}`, step })),
  ];

  return (
    <DemoFrame label={copy.label} note={copy.note} className="agent-demo">
      <Window className="agent-window" icon={<Sparkles size={12} strokeWidth={2} />} title={copy.title}>
        <div ref={ref} className="agent">
          <div className="agent-thread">
            <p className="agent-request">{current.prompt}</p>
            <ol className="agent-trace" aria-live="polite">
              {items.map((item, index) => {
                const hidden = index >= visible;
                if (item.approval && approval) {
                  return (
                    <li key={item.key} className="agent-approval" data-hidden={hidden ? "" : undefined} aria-hidden={hidden || undefined}>
                      <span className="agent-icon" aria-hidden="true">
                        <UserCheck size={14} strokeWidth={2} />
                      </span>
                      <div className="agent-step">
                        <span className="agent-kind">{copy.approval}</span>
                        <p>{approval.question}</p>
                        {decision === null ? (
                          <div className="agent-actions">
                            <button type="button" className="agent-approve" onClick={() => decide("approved")} tabIndex={hidden ? -1 : 0}>
                              {copy.approve}
                            </button>
                            <button type="button" className="agent-reject" onClick={() => decide("rejected")} tabIndex={hidden ? -1 : 0}>
                              {copy.reject}
                            </button>
                          </div>
                        ) : (
                          <p className="agent-decision" data-decision={decision}>
                            {decision === "approved" ? copy.approved : copy.rejected}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                }
                const step = item.step!;
                const Icon = ICONS[step.kind];
                return (
                  <li key={item.key} data-kind={step.kind} data-hidden={hidden ? "" : undefined} aria-hidden={hidden || undefined}>
                    <span className="agent-icon" aria-hidden="true">
                      <Icon size={14} strokeWidth={2} />
                    </span>
                    <div className="agent-step">
                      <span className="agent-kind">{copy.kinds[step.kind]}</span>
                      {step.code ? <code>{step.text}</code> : <p>{step.text}</p>}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="agent-composer">
            <div className="agent-composer-head">
              <p className="agent-composer-label">{copy.pick}</p>
              <button type="button" className="agent-replay" onClick={() => play(scenario)}>
                <RotateCcw size={13} strokeWidth={2} aria-hidden="true" />
                {copy.replay}
              </button>
            </div>
            <div className="agent-prompts" role="group" aria-label={copy.pick}>
              {copy.scenarios.map((item, index) => (
                <button key={item.prompt} type="button" aria-pressed={scenario === index} onClick={() => play(index)}>
                  {item.prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Window>
    </DemoFrame>
  );
}
