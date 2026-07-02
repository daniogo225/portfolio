"use client";

import ScrollReveal from "./ScrollReveal";
import { useI18n } from "../i18n";
import { projectsMeta } from "../data/projects";

export default function Projects() {
  const { t } = useI18n();

  return (
    <section
      id="work"
      className="relative py-24 sm:py-32 lg:py-44 px-6 sm:px-10 lg:px-20 border-t border-border"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="flex items-center gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
            <span className="font-mono text-accent text-[10px] sm:text-[11px] tracking-[0.18em] uppercase">
              {t.work.section}
            </span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-muted text-[10px] sm:text-[11px] tracking-[0.18em] uppercase">
              {t.work.sectionLabel}
            </span>
          </div>
        </ScrollReveal>

        {/* Title block */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
          <ScrollReveal className="col-span-12 lg:col-span-7" delay={80}>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.035em] font-medium">
              {t.work.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end" delay={160}>
            <p className="text-muted text-base sm:text-lg leading-[1.7]">
              {t.work.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Projects list — editorial rows */}
        <ol className="space-y-0 border-y border-border">
          {t.work.items.map((project, i) => {
            const meta = projectsMeta[i];
            const num = String(i + 1).padStart(2, "0");
            const isEnterprise = project.title === "Comafrique Technologies";
            return (
              <ScrollReveal key={project.title} delay={120 + i * 100}>
                <li
                  className={`group relative grid grid-cols-12 gap-4 sm:gap-6 py-10 sm:py-14 lg:py-16 transition-colors duration-700 ${
                    i > 0 ? "border-t border-border" : ""
                  } ${isEnterprise ? "bg-surface/45 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8" : ""}`}
                >
                  {/* Index */}
                  <div className="col-span-12 lg:col-span-1">
                    <span className="font-mono text-accent text-[11px] sm:text-[12px] tracking-[0.18em]">
                      {num}
                    </span>
                  </div>

                  {/* Title + tagline */}
                  <div className="col-span-12 lg:col-span-5">
                    <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl leading-[1.05] tracking-[-0.025em] font-medium mb-3">
                      {project.title}
                    </h3>
                    <p className="text-foreground/80 text-sm sm:text-base leading-[1.5] max-w-[40ch]">
                      {project.tagline}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-muted">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inset-0 rounded-full bg-accent opacity-50 animate-ping" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                      </span>
                      {project.status}
                    </div>
                  </div>

                  {/* Description + stack + metrics */}
                  <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
                    <p className="text-foreground/70 text-sm sm:text-base leading-[1.75]">
                      {project.description}
                    </p>

                    {"metrics" in project && project.metrics && (
                      <div className={`grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-border ${
                        isEnterprise ? "border-foreground/15" : ""
                      }`}>
                        {project.metrics.map((m) => (
                          <div key={m.label}>
                            <p className="font-display text-2xl sm:text-3xl leading-none tracking-[-0.025em]">
                              {m.value}
                            </p>
                            <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.12em] uppercase text-muted mt-2">
                              {m.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {"decision" in project && project.decision && (
                      <p className="text-foreground/80 text-sm sm:text-[0.95rem] leading-[1.6] italic font-display">
                        {project.decision}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] tracking-[0.04em] text-foreground/65 border border-border bg-background/35 px-2.5 py-1.5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {meta?.url && (
                      <a
                        href={meta.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-hover
                        className="group/link inline-flex items-center gap-2.5 self-start min-h-[50px] px-6 py-2.5 bg-foreground text-background font-mono text-[13px] tracking-[0.03em] uppercase hover:bg-accent transition-colors duration-500"
                      >
                        {t.work.visitLabel}
                        <span className="inline-block transition-transform duration-500 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5">
                          ↗
                        </span>
                      </a>
                    )}
                  </div>
                </li>
              </ScrollReveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
