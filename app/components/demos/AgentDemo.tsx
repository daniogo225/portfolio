"use client";

import { Check, MessageSquareText, Mic, ShieldCheck, Target, UserCheck, Wrench, X, type LucideIcon } from "lucide-react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { AgentStep } from "../../data/content";
import { useSite } from "../site/SiteProvider";
import DemoFrame from "./DemoFrame";

const WORD_MS = 120;
const STEP_MS = 680;

// Hauteurs fixes des barres de la forme d’onde : pseudo-aléatoires mais identiques au serveur et au client.
const BARS = Array.from({ length: 84 }, (_, index) => {
  const value = Math.abs(Math.sin(index * 1.73) * Math.cos(index * 0.41)) * 0.8 + Math.abs(Math.sin(index * 0.27)) * 0.2;
  return Number((0.18 + value * 0.82).toFixed(3));
});

type Decision = "approved" | "rejected" | null;

type Node =
  | { key: string; kind: "intent" | "guard" | "answer" | "result"; label: string; text: string }
  | { key: string; kind: "tool"; label: string; code: string; result?: string; resultLabel: string }
  | { key: string; kind: "approval"; label: string; text: string }
  | { key: string; kind: "decision"; label: string; text: string; approved: boolean };

const ICONS: Record<Node["kind"], LucideIcon> = {
  intent: Target,
  tool: Wrench,
  result: MessageSquareText,
  guard: ShieldCheck,
  answer: MessageSquareText,
  approval: UserCheck,
  decision: Check,
};

// Un appel d’outil et son résultat forment une seule étape du déroulé.
function buildNodes(steps: AgentStep[], prefix: string, kinds: Record<AgentStep["kind"], string>): Node[] {
  const nodes: Node[] = [];
  for (let index = 0; index < steps.length; index += 1) {
    const step = steps[index];
    const key = `${prefix}${index}`;
    if (step.kind === "tool") {
      const next = steps[index + 1];
      const result = next?.kind === "result" ? next.text : undefined;
      if (result) index += 1;
      nodes.push({ key, kind: "tool", label: kinds.tool, code: step.text, result, resultLabel: kinds.result });
    } else {
      nodes.push({ key, kind: step.kind, label: kinds[step.kind], text: step.text });
    }
  }
  return nodes;
}

// Coloration minimale d’un appel : la fonction, les clés, les chaînes et les nombres.
const CODE = /("[^"]*"|'[^']*')|(\b\d+\b)|(\b[a-zA-Z_]\w*(?=\s*:))|(^[\w.]+(?=\())/g;

function Code({ text }: { text: string }) {
  const parts: { text: string; kind?: string }[] = [];
  let last = 0;
  for (const match of text.matchAll(CODE)) {
    const index = match.index ?? 0;
    if (index > last) parts.push({ text: text.slice(last, index) });
    const kind = match[1] ? "str" : match[2] ? "num" : match[3] ? "key" : "fn";
    parts.push({ text: match[0], kind });
    last = index + match[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return (
    <code className="trace-code">
      {parts.map((part, index) => (
        <span key={index} className={part.kind ? `tc-${part.kind}` : undefined}>
          {part.text}
        </span>
      ))}
    </code>
  );
}

/**
 * Un agent à la voix : la demande dictée apparaît mot à mot sous la forme d’onde, puis le déroulé
 * de l’agent descend le long d’un rail : intention, appels d’outils et résultats, garde-fous, et
 * la validation humaine quand l’action est sensible. Toutes les étapes sont rendues d’emblée
 * (invisibles) pour réserver la place pendant la lecture.
 */
export default function AgentDemo() {
  const { t, calm } = useSite();
  const copy = t.demos.agent;
  const ref = useRef<HTMLDivElement>(null);
  // Le déroulé est haut sur téléphone : il démarre dès que son début est à l’écran.
  const inView = useInView(ref, { amount: 0.15 });
  const [scenario, setScenario] = useState(0);
  const [words, setWords] = useState(0);
  const [beats, setBeats] = useState(0);
  const [started, setStarted] = useState(false);
  const [decision, setDecision] = useState<Decision>(null);

  const current = copy.scenarios[scenario];
  const approval = current.approval;
  const spoken = current.prompt.split(" ");

  const nodes: Node[] = [
    ...buildNodes(current.steps, "s", copy.kinds),
    ...(approval
      ? [
          { key: "approval", kind: "approval", label: copy.approval, text: approval.question } as Node,
          ...(decision
            ? [
                {
                  key: `decision-${decision}`,
                  kind: "decision",
                  label: copy.decision,
                  text: decision === "approved" ? copy.approved : copy.rejected,
                  approved: decision === "approved",
                } as Node,
                ...buildNodes(decision === "rejected" ? approval.rejected : approval.approved, `a-${decision}-`, copy.kinds),
              ]
            : []),
        ]
      : []),
  ];

  // Chaque étape compte un temps, plus un second pour le résultat d’un appel d’outil.
  const timeline = nodes.flatMap((node, index) =>
    node.kind === "tool" && node.result ? [{ node: index, part: "main" }, { node: index, part: "result" }] : [{ node: index, part: "main" }],
  );
  const approvalBeat = timeline.findIndex((beat) => nodes[beat.node].kind === "approval");
  const waiting = Boolean(approval) && decision === null;
  const limit = waiting ? approvalBeat + 1 : timeline.length;
  const playing = started || inView;
  const shownWords = calm ? spoken.length : words;
  const shownBeats = calm ? limit : beats;
  const listening = playing && !calm && shownWords < spoken.length;
  const finished = shownBeats >= limit;

  useEffect(() => {
    if (!playing || calm) return;
    let timer = 0;
    if (words < spoken.length) timer = window.setTimeout(() => setWords((value) => value + 1), words === 0 ? 450 : WORD_MS);
    else if (beats < limit) timer = window.setTimeout(() => setBeats((value) => value + 1), beats === 0 ? 520 : STEP_MS);
    return () => window.clearTimeout(timer);
  }, [playing, calm, words, beats, limit, spoken.length]);

  function play(index: number) {
    setScenario(index);
    setDecision(null);
    setWords(0);
    setBeats(0);
    setStarted(true);
  }

  function isShown(node: number, part: "main" | "result") {
    const beat = timeline.findIndex((item) => item.node === node && item.part === part);
    return beat >= 0 && beat < shownBeats;
  }

  const lastShown = timeline[shownBeats - 1]?.node ?? -1;
  const voiceState = listening ? "listening" : shownWords >= spoken.length ? "done" : "idle";

  return (
    <DemoFrame number="2.3" label={copy.label} note={copy.note} className="agent-demo">
      <div ref={ref} className="agent">
        <div className="voice" data-state={voiceState}>
          <div className="voice-meta">
            <span className="voice-mic" aria-hidden="true">
              <Mic size={15} strokeWidth={1.8} />
            </span>
            <span className="voice-label">{copy.voice}</span>
            <span className="voice-state">{voiceState === "listening" ? copy.listening : voiceState === "done" ? copy.transcribed : ""}</span>
          </div>
          <div className="voice-wave" aria-hidden="true">
            {BARS.map((height, index) => (
              <i key={index} style={{ ["--h" as string]: height, ["--d" as string]: `${-((index * 0.137) % 0.9).toFixed(3)}s` }} />
            ))}
          </div>
          <p className="voice-text" aria-live="polite">
            {spoken.map((word, index) => (
              <span key={`${scenario}-${index}`} data-shown={index < shownWords ? "" : undefined}>
                {word}{" "}
              </span>
            ))}
          </p>
        </div>

        <ol className="trace" aria-live="polite">
          {nodes.map((node, index) => {
            const shown = isShown(index, "main");
            const Icon = node.kind === "decision" && !node.approved ? X : ICONS[node.kind];
            const linked = index < nodes.length - 1 && isShown(index + 1, "main");
            return (
              <li
                key={`${scenario}-${node.key}`}
                className="trace-step"
                data-kind={node.kind}
                data-hidden={shown ? undefined : ""}
                data-active={shown && index === lastShown && (!finished || node.kind === "approval") ? "" : undefined}
                data-link={linked ? "" : undefined}
                aria-hidden={shown ? undefined : true}
              >
                <span className="trace-node" aria-hidden="true">
                  <Icon size={15} strokeWidth={1.8} />
                </span>
                <div className="trace-body">
                  <span className="trace-kind">{node.label}</span>
                  {node.kind === "tool" ? (
                    <>
                      <Code text={node.code} />
                      {node.result && (
                        <p className="trace-result" data-hidden={isShown(index, "result") ? undefined : ""}>
                          {node.result}
                        </p>
                      )}
                    </>
                  ) : node.kind === "approval" ? (
                    <>
                      <p className="trace-question">{node.text}</p>
                      {decision === null && (
                        <div className="trace-actions">
                          <button type="button" className="trace-approve" onClick={() => setDecision("approved")} tabIndex={shown ? 0 : -1}>
                            <Check size={15} strokeWidth={2} aria-hidden="true" />
                            {copy.approve}
                          </button>
                          <button type="button" className="trace-reject" onClick={() => setDecision("rejected")} tabIndex={shown ? 0 : -1}>
                            {copy.reject}
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="trace-text">{node.text}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="agent-foot">
          <div className="agent-prompts" role="group" aria-label={copy.pick}>
            <span className="agent-prompts-label">{copy.pick}</span>
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
