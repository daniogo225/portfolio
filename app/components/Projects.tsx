"use client";

import { useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { projectsMeta } from "../data/projects";
import { useI18n } from "../i18n";
import ScrollReveal from "./ScrollReveal";

function ContractVisual({ locale }: { locale: "en" | "fr" }) {
  return (
    <div className="project-visual signal-grid">
      <span className="absolute left-4 top-4 z-10 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">AI / Legal / 01</span>
      <div className="contract-sheet">
        <div className="flex items-center justify-between border-b border-black/20 pb-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.14em]">ContractTchecker</span>
          <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-[#11110f]">{locale === "fr" ? "Risque moyen" : "Medium risk"}</span>
        </div>
        <div className="mt-7 grid grid-cols-[1fr_auto] items-end gap-5">
          <div>
            <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-black/45">{locale === "fr" ? "Score de risque" : "Risk score"}</span>
            <p className="mt-2 text-[clamp(2.8rem,7vw,6.2rem)] font-semibold leading-none tracking-[-0.08em]">68<span className="text-[0.28em] tracking-normal text-black/35">/100</span></p>
          </div>
          <div className="h-20 w-20 rounded-full border-[8px] border-black/10 border-r-accent border-t-accent sm:h-28 sm:w-28" />
        </div>
        <div className="mt-8 space-y-3">
          {["Clause de résiliation", "Responsabilité", "Juridiction"].map((label, index) => (
            <div key={label} className="flex items-center justify-between border-t border-black/15 pt-3 font-mono text-[8px] uppercase tracking-[0.1em]">
              <span>{label}</span><span className={index === 2 ? "text-black/40" : "text-accent"}>{index === 2 ? "OK" : locale === "fr" ? "À vérifier" : "Review"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SystemsVisual({ locale }: { locale: "en" | "fr" }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState("ops");
  const nodes = [
    { key: "web", label: "WEB", x: 13, y: 48, detail: locale === "fr" ? "Interfaces métier" : "Business interfaces" },
    { key: "api", label: "API", x: 47, y: 14, detail: locale === "fr" ? "Services et intégrations" : "Services and integrations" },
    { key: "ops", label: "OPS", x: 86, y: 32, detail: locale === "fr" ? "Opérations en temps réel" : "Real-time operations" },
    { key: "data", label: "DATA", x: 79, y: 79, detail: locale === "fr" ? "Données décisionnelles" : "Decision data" },
    { key: "mobile", label: "MOBILE", x: 20, y: 81, detail: locale === "fr" ? "Expériences terrain" : "Field experiences" },
  ];
  const selectedNode = nodes.find((node) => node.key === activeNode) ?? nodes[2];

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const stage = stageRef.current;
    if (!stage) return;

    const bounds = stage.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width;
    const relativeY = (event.clientY - bounds.top) / bounds.height;
    stage.style.setProperty("--systems-tilt-x", `${(0.5 - relativeY) * 10}deg`);
    stage.style.setProperty("--systems-tilt-y", `${(relativeX - 0.5) * 14}deg`);
    stage.style.setProperty("--systems-light-x", `${relativeX * 100}%`);
    stage.style.setProperty("--systems-light-y", `${relativeY * 100}%`);
  };

  const resetTilt = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--systems-tilt-x", "0deg");
    stage.style.setProperty("--systems-tilt-y", "0deg");
    stage.style.setProperty("--systems-light-x", "34%");
    stage.style.setProperty("--systems-light-y", "26%");
  };

  return (
    <div
      ref={stageRef}
      className="systems-stage"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      role="group"
      aria-label={locale === "fr" ? "Topologie interactive des systèmes Comafrique" : "Interactive Comafrique systems topology"}
    >
      <div className="systems-stage-meta" aria-hidden="true">
        <span>Enterprise systems / 02</span>
        <span className="flex items-center gap-2"><span className="signal-dot !h-1.5 !w-1.5" />{locale === "fr" ? "Topologie active" : "Live topology"}</span>
      </div>

      <div className="systems-scene">
        <svg className="systems-connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {nodes.map((node) => (
            <line key={node.key} className={activeNode === node.key ? "is-active" : ""} x1="50" y1="50" x2={node.x} y2={node.y} />
          ))}
        </svg>

        <div className="systems-orbit-3d systems-orbit-3d--one"><span /></div>
        <div className="systems-orbit-3d systems-orbit-3d--two"><span /></div>
        <div className="systems-orbit-3d systems-orbit-3d--three"><span /></div>

        <div className="systems-globe-3d" aria-hidden="true">
          <div className="systems-globe-grid systems-globe-grid--vertical" />
          <div className="systems-globe-grid systems-globe-grid--vertical systems-globe-grid--turned" />
          <div className="systems-globe-grid systems-globe-grid--horizontal" />
          <div className="systems-globe-grid systems-globe-grid--horizontal systems-globe-grid--lower" />
          <div className="systems-globe-label">
            <strong>CT</strong>
            <span>{locale === "fr" ? "Système métier" : "Business system"}</span>
          </div>
        </div>

        {nodes.map((node, index) => (
          <button
            key={node.key}
            type="button"
            className={`systems-network-node ${activeNode === node.key ? "is-active" : ""}`}
            data-node={node.key}
            style={{ "--node-x": `${node.x}%`, "--node-y": `${node.y}%`, "--node-delay": `${index * -1.1}s` } as CSSProperties}
            onPointerEnter={() => setActiveNode(node.key)}
            onFocus={() => setActiveNode(node.key)}
            onClick={() => setActiveNode(node.key)}
            aria-pressed={activeNode === node.key}
          >
            <span className="systems-network-dot" />
            <span>{node.label}</span>
          </button>
        ))}
      </div>

      <div className="systems-stage-readout" aria-live="polite">
        <span className="systems-stage-readout-index">0{nodes.findIndex((node) => node.key === activeNode) + 1}</span>
        <div>
          <strong>{selectedNode.label}</strong>
          <span>{selectedNode.detail}</span>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { locale, t } = useI18n();

  return (
    <section id="work" className="section-space border-t border-border">
      <div className="content-shell">
        <ScrollReveal>
          <div className="grid grid-cols-12 gap-x-4 gap-y-8 lg:gap-x-8">
            <div className="col-span-12 lg:col-span-3"><span className="section-kicker">{t.work.sectionLabel}</span></div>
            <div className="col-span-12 lg:col-span-8">
              <h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-[0.88]">{t.work.title}</h2>
              <p className="mt-7 max-w-[58ch] text-base leading-[1.7] text-muted sm:text-lg">{t.work.subtitle}</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-20 space-y-28 lg:mt-28 lg:space-y-44">
          {t.work.items.map((project, index) => {
            const meta = projectsMeta[index];
            return (
              <article key={project.title} className="group grid grid-cols-12 gap-x-4 gap-y-8 lg:gap-x-8">
                <ScrollReveal className={`col-span-12 min-w-0 lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  {index === 0 ? <ContractVisual locale={locale} /> : <SystemsVisual locale={locale} />}
                </ScrollReveal>

                <ScrollReveal className={`col-span-12 min-w-0 flex flex-col justify-between lg:col-span-5 ${index % 2 === 1 ? "lg:order-1" : ""}`} delay={120}>
                  <div>
                    <div className="flex items-start justify-between border-t border-border pt-4">
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">Case / 0{index + 1}</span>
                      <span className="project-index font-display">0{index + 1}</span>
                    </div>
                    <h3 className="mt-4 font-display text-[clamp(2.5rem,4.8vw,5.4rem)] leading-[0.88]">{project.title}</h3>
                    <p className="mt-5 max-w-[36ch] font-serif text-xl italic leading-[1.35] text-accent sm:text-2xl">{project.tagline}</p>
                    <p className="mt-7 text-sm leading-[1.75] text-muted sm:text-base">{project.description}</p>

                    <div className="mt-8 grid grid-cols-3 border-y border-border py-5">
                      {project.metrics.map((metric) => (
                        <div key={metric.label} className="border-r border-border px-3 first:pl-0 last:border-r-0 last:pr-0">
                          <strong className="block text-xl font-medium tracking-[-0.04em] sm:text-2xl">{metric.value}</strong>
                          <span className="mt-1.5 block font-mono text-[8px] uppercase leading-[1.4] tracking-[0.1em] text-muted">{metric.label}</span>
                        </div>
                      ))}
                    </div>

                    <p className="mt-7 border-b border-border pb-7 text-sm leading-[1.7] text-foreground/80">{project.decision}</p>
                    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                      {project.stack.map((item) => <span key={item} className="font-mono text-[9px] uppercase tracking-[0.11em] text-muted">{item}</span>)}
                    </div>
                  </div>

                  {meta?.url && (
                    <a href={meta.url} target="_blank" rel="noreferrer" data-hover className="group/link mt-9 flex min-h-14 items-center justify-between border border-border px-5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-500 hover:border-foreground hover:bg-foreground hover:text-background">
                      {t.work.visitLabel}<span className="transition-transform duration-500 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">↗</span>
                    </a>
                  )}
                </ScrollReveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
