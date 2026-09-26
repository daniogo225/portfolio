"use client";

import { motion, useInView, type MotionValue } from "motion/react";
import { useRef } from "react";
import type { SiteContent } from "../../data/content";
import CountUp from "../ui/CountUp";
import { EASE_OUT } from "../ui/RevealText";

type Work = SiteContent["work"];

// Largeurs des lignes du document, en pourcentage. 0 marque un saut de paragraphe.
const LINES = [94, 81, 88, 42, 0, 96, 86, 73, 90, 0, 84, 92, 67, 0, 89, 78, 94, 55, 0, 91, 70];
// Index des lignes signalées, dans l’ordre d’apparition des clauses.
const FLAGGED = [7, 12, 16];
const SCORE = 72;

export function ContractMock({
  copy,
  tilt,
  lift,
}: {
  copy: Work["contractMock"];
  tilt?: MotionValue<number>;
  lift?: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, amount: 0.45 });
  const state = active ? "on" : "off";

  return (
    <div className="mock-stage">
      <motion.div ref={ref} className="mock-window" style={{ rotateX: tilt ?? 0, y: lift ?? 0 }} aria-hidden="true">
        <div className="mock-bar">
          <span className="mock-lights">
            <span />
            <span />
            <span />
          </span>
          <span className="mock-file mono">{copy.file}</span>
          <motion.span
            className="mock-status mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ delay: 1.9, duration: 0.5 }}
          >
            {copy.status}
          </motion.span>
        </div>
        <div className="mock-body">
          <div className="mock-doc">
            {LINES.map((width, index) =>
              width === 0 ? (
                <span key={index} className="doc-gap" />
              ) : (
                <span key={index} className="doc-line" style={{ width: `${width}%` }}>
                  {FLAGGED.includes(index) && (
                    <motion.span
                      className="doc-flag"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: active ? 1 : 0 }}
                      transition={{ delay: 0.5 + FLAGGED.indexOf(index) * 0.45, duration: 0.6, ease: EASE_OUT }}
                    />
                  )}
                </span>
              ),
            )}
            <span className="doc-scan" data-state={state} />
          </div>
          <div className="mock-panel">
            <div className="mock-score">
              <svg viewBox="0 0 88 88" className="gauge">
                <circle cx="44" cy="44" r="36" className="gauge-track" />
                <motion.circle
                  cx="44"
                  cy="44"
                  r="36"
                  className="gauge-value"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: active ? SCORE / 100 : 0 }}
                  transition={{ delay: 0.3, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
              <div>
                <span className="mock-label mono">{copy.score}</span>
                <span className="score-value">
                  <CountUp value={String(SCORE)} />
                  <small>/100</small>
                </span>
                <span className="score-level">{copy.level}</span>
              </div>
            </div>
            <div className="mock-clauses">
              <span className="mock-label mono">
                {copy.clausesTitle} ({copy.clauses.length})
              </span>
              <ul>
                {copy.clauses.map((clause, index) => (
                  <motion.li
                    key={clause.ref}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: active ? 1 : 0, x: active ? 0 : 16 }}
                    transition={{ delay: 0.7 + index * 0.45, duration: 0.6, ease: EASE_OUT }}
                  >
                    <span className="mono">{clause.ref}</span>
                    <span>{clause.name}</span>
                    <span className={index === 0 ? "severity is-high" : "severity"}>{clause.severity}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div
              className="mock-reco"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
              transition={{ delay: 2.1, duration: 0.6, ease: EASE_OUT }}
            >
              <span className="mock-label mono">{copy.recommendationLabel}</span>
              <p>{copy.recommendation}</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

type NodeKey = "field" | "web" | "rules" | "ai" | "audit";

type Layout = {
  id: string;
  width: number;
  height: number;
  labelWidth: number;
  nodeWidth: number;
  core: { x: number; y: number; width: number; height: number };
  nodes: { key: NodeKey; x: number; y: number }[];
  edges: { d: string; duration: number; begin: number }[];
};

// Deux dispositions du même schéma : horizontale sur grand écran, verticale sur téléphone.
const LAYOUTS: Layout[] = [
  {
    id: "wide",
    width: 800,
    height: 500,
    labelWidth: 216,
    nodeWidth: 180,
    core: { x: 310, y: 210, width: 180, height: 100 },
    nodes: [
      { key: "field", x: 40, y: 84 },
      { key: "web", x: 40, y: 384 },
      { key: "rules", x: 580, y: 84 },
      { key: "ai", x: 580, y: 234 },
      { key: "audit", x: 580, y: 384 },
    ],
    edges: [
      { d: "M220 110 C265 110 265 240 310 240", duration: 2.6, begin: 0 },
      { d: "M220 410 C265 410 265 280 310 280", duration: 2.9, begin: 0.8 },
      { d: "M490 240 C535 240 535 110 580 110", duration: 2.4, begin: 1.3 },
      { d: "M490 260 L580 260", duration: 1.8, begin: 0.4 },
      { d: "M490 280 C535 280 535 410 580 410", duration: 2.7, begin: 1.9 },
    ],
  },
  {
    id: "tall",
    width: 360,
    height: 620,
    labelWidth: 196,
    nodeWidth: 150,
    core: { x: 90, y: 252, width: 180, height: 92 },
    nodes: [
      { key: "field", x: 20, y: 60 },
      { key: "web", x: 190, y: 60 },
      { key: "rules", x: 20, y: 436 },
      { key: "ai", x: 190, y: 436 },
      { key: "audit", x: 105, y: 530 },
    ],
    edges: [
      { d: "M95 112 C95 190 150 180 150 252", duration: 2.4, begin: 0 },
      { d: "M265 112 C265 190 210 180 210 252", duration: 2.7, begin: 0.8 },
      { d: "M150 344 C150 400 95 390 95 436", duration: 2.2, begin: 1.3 },
      { d: "M210 344 C210 400 265 390 265 436", duration: 2.3, begin: 0.4 },
      { d: "M180 344 L180 530", duration: 2, begin: 1.9 },
    ],
  },
];

function SystemsDiagram({
  layout,
  copy,
  calm,
  active,
}: {
  layout: Layout;
  copy: Work["systemsMock"];
  calm: boolean;
  active: boolean;
}) {
  const { core } = layout;
  const center = layout.width / 2;
  return (
    <svg viewBox={`0 0 ${layout.width} ${layout.height}`} className={`systems systems-${layout.id}`}>
      <rect x="12" y="24" width={layout.width - 24} height={layout.height - 36} rx="18" className="systems-boundary" />
      <rect x={center - layout.labelWidth / 2} y="12" width={layout.labelWidth} height="24" className="systems-boundary-mask" />
      <text x={center} y="29" className="systems-boundary-label" textAnchor="middle">
        {copy.ops}
      </text>

      {layout.edges.map((edge, index) => (
        <g key={edge.d}>
          <motion.path
            id={`edge-${layout.id}-${index}`}
            d={edge.d}
            className="systems-edge"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: active ? 1 : 0 }}
            transition={{ delay: 0.4 + index * 0.12, duration: 0.9, ease: EASE_OUT }}
          />
          {!calm && active && (
            <circle r="4.5" className="systems-packet">
              <animateMotion dur={`${edge.duration}s`} begin={`${1.2 + edge.begin}s`} repeatCount="indefinite">
                <mpath href={`#edge-${layout.id}-${index}`} />
              </animateMotion>
            </circle>
          )}
        </g>
      ))}

      <motion.g
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.9 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        style={{ transformOrigin: `${core.x + core.width / 2}px ${core.y + core.height / 2}px` }}
      >
        <rect x={core.x} y={core.y} width={core.width} height={core.height} rx="14" className="systems-node is-core" />
        <text x={core.x + core.width / 2} y={core.y + core.height / 2 - 4} textAnchor="middle" className="systems-title">
          {copy.api[0]}
        </text>
        <text x={core.x + core.width / 2} y={core.y + core.height / 2 + 18} textAnchor="middle" className="systems-sub">
          {copy.api[1]}
        </text>
      </motion.g>

      {layout.nodes.map((node, index) => (
        <motion.g
          key={node.key}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : 14 }}
          transition={{ delay: 0.2 + index * 0.1, duration: 0.7, ease: EASE_OUT }}
        >
          <rect x={node.x} y={node.y} width={layout.nodeWidth} height="52" rx="10" className="systems-node" />
          <text x={node.x + 14} y={node.y + 22} className="systems-title">
            {copy[node.key][0]}
          </text>
          <text x={node.x + 14} y={node.y + 40} className="systems-sub">
            {copy[node.key][1]}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}

export function SystemsMock({ copy, calm, scale }: { copy: Work["systemsMock"]; calm: boolean; scale?: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div className="mock-stage">
      <motion.div ref={ref} className="systems-stage" style={{ scale: scale ?? 1 }} aria-hidden="true">
        {LAYOUTS.map((layout) => (
          <SystemsDiagram key={layout.id} layout={layout} copy={copy} calm={calm} active={active} />
        ))}
      </motion.div>
    </div>
  );
}
