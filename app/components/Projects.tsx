"use client";

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
  return (
    <div className="project-visual systems-visual">
      <div className="absolute inset-x-4 top-4 z-20 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.14em] text-white/45">
        <span>Enterprise systems / 02</span>
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" />Live topology</span>
      </div>

      <div className="systems-map">
        <svg viewBox="0 0 700 400" className="h-full w-full" role="img" aria-label={locale === "fr" ? "Cartographie d’un système métier" : "Business system topology"}>
          <defs>
            <radialGradient id="signal-core" cx="36%" cy="30%" r="72%">
              <stop offset="0%" stopColor="#ffc0ad" />
              <stop offset="55%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="#a92f18" />
            </radialGradient>
            <filter id="signal-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <g fill="none" stroke="rgba(232,227,216,0.18)" strokeWidth="1">
            <ellipse className="systems-orbit-line" cx="350" cy="200" rx="270" ry="92" />
            <ellipse className="systems-orbit-line" cx="350" cy="200" rx="250" ry="82" transform="rotate(58 350 200)" />
            <ellipse className="systems-orbit-line" cx="350" cy="200" rx="250" ry="82" transform="rotate(-58 350 200)" />
          </g>

          <g stroke="rgba(255,104,70,0.25)" strokeWidth="1" strokeDasharray="2 7">
            <path d="M350 200 L350 54" />
            <path d="M350 200 L574 142" />
            <path d="M350 200 L516 326" />
            <path d="M350 200 L184 326" />
            <path d="M350 200 L126 196" />
          </g>

          {([
            { x: 350, y: 54, label: "API", anchor: "middle" },
            { x: 574, y: 142, label: "OPS", anchor: "start" },
            { x: 516, y: 326, label: "DATA", anchor: "start" },
            { x: 184, y: 326, label: "MOBILE", anchor: "end" },
            { x: 126, y: 196, label: "WEB", anchor: "end" },
          ] as const).map((node, index) => (
            <g key={node.label}>
              <circle className="systems-node-pulse" cx={node.x} cy={node.y} r="10" fill="rgba(255,104,70,0.14)" style={{ animationDelay: `${index * 220}ms` }} />
              <circle cx={node.x} cy={node.y} r="4" fill={index === 1 ? "var(--accent)" : "#eee9df"} />
              <text x={node.x + (node.anchor === "start" ? 16 : node.anchor === "end" ? -16 : 0)} y={node.y + (node.anchor === "middle" ? -15 : 4)} textAnchor={node.anchor} fill="rgba(255,255,255,0.62)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.5">{node.label}</text>
            </g>
          ))}

          <g fill="none" stroke="rgba(17,17,15,0.32)" strokeWidth="1">
            <ellipse cx="350" cy="200" rx="43" ry="80" />
            <ellipse cx="350" cy="200" rx="76" ry="28" />
            <path d="M272 200 H428" />
            <path d="M350 122 V278" />
          </g>
          <circle cx="350" cy="200" r="79" fill="url(#signal-core)" filter="url(#signal-glow)" />
          <g fill="none" stroke="rgba(17,17,15,0.32)" strokeWidth="1">
            <ellipse cx="350" cy="200" rx="42" ry="78" />
            <ellipse cx="350" cy="200" rx="75" ry="27" />
            <path d="M273 200 H427" />
          </g>
        </svg>

        <div className="systems-core absolute left-1/2 top-1/2 z-20 flex h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-[#17130c] sm:h-[126px] sm:w-[126px]">
          <strong className="text-2xl tracking-[-0.06em] sm:text-3xl">CT</strong>
          <span className="mt-1 font-mono text-[6px] uppercase tracking-[0.16em] sm:text-[7px]">{locale === "fr" ? "Système métier" : "Business system"}</span>
        </div>
      </div>

      <div className="absolute inset-x-4 bottom-4 z-20 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[7px] uppercase tracking-[0.13em] text-white/35 sm:text-[8px]">
        <span>Web · Mobile · Data</span>
        <span>{locale === "fr" ? "Architecture opérationnelle" : "Operational architecture"}</span>
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
