"use client";

import ScrollReveal from "./ScrollReveal";
import { useI18n } from "../i18n";
import { projectsMeta } from "../data/projects";

interface ProjectMetric {
  value: string;
  label: string;
}

interface Project {
  index: string;
  title: string;
  description: string;
  stack: string[];
  status: string;
  statusColor: string;
  url?: string;
  visitLabel?: string;
  metrics?: ProjectMetric[];
}

function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <div
      className={`card-lift group relative border border-border bg-surface/40 hover:border-accent-light/40 hover:bg-surface/70 overflow-hidden ${
        compact ? "p-7 md:p-8" : "p-8 md:p-12 h-full"
      }`}
    >
      {/* Subtle sheen on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-accent-light/[0.04] via-transparent to-gold/[0.03]" />

      {/* Top accent line — slides in on hover */}
      <div className="pointer-events-none absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-accent-light via-accent-light/60 to-transparent group-hover:w-full transition-[width] duration-[900ms] ease-out" />

      {/* Hover corner accents */}
      <div className="pointer-events-none absolute top-0 left-0 w-5 h-5 border-t border-l border-transparent group-hover:border-accent-light/60 group-hover:w-7 group-hover:h-7 transition-all duration-700 ease-out" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-5 h-5 border-b border-r border-transparent group-hover:border-accent-light/60 group-hover:w-7 group-hover:h-7 transition-all duration-700 ease-out" />

      {/* Header row */}
      <div className="relative flex items-start justify-between mb-6">
        <span className="font-mono text-accent text-[11px] tracking-[0.35em]">
          {project.index}
        </span>
        <span
          className={`flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase ${project.statusColor}`}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-current opacity-40 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
          </span>
          {project.status}
        </span>
      </div>

      {/* Title */}
      <h3
        className={`relative font-display leading-tight mb-5 transition-colors duration-500 group-hover:text-foreground ${
          compact ? "text-xl md:text-2xl" : "text-2xl md:text-4xl"
        }`}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        className={`text-muted leading-relaxed mb-8 ${
          compact ? "text-sm" : "text-sm md:text-base"
        }`}
      >
        {project.description}
      </p>

      {/* Metrics (featured card only) */}
      {!compact && project.metrics && project.metrics.length > 0 && (
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8 pt-6 border-t border-border/60">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <p className="font-display text-xl md:text-2xl leading-none text-foreground">
                {metric.value}
              </p>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted mt-2">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Stack tags */}
      <div className="relative flex flex-wrap gap-2 mb-6">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[10px] tracking-[0.1em] text-muted/80 border border-border/80 bg-background/30 px-3 py-1.5 group-hover:border-accent-light/25 group-hover:text-muted transition-all duration-500 ease-out"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Link */}
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center gap-2 text-[12px] tracking-[0.12em] uppercase text-accent-light hover:text-foreground transition-colors duration-500 ease-out group/link"
          data-hover
        >
          <span className="relative">
            {project.visitLabel}
            <span className="absolute left-0 -bottom-0.5 h-px w-full bg-accent-light/40 group-hover/link:bg-foreground transition-colors duration-500" />
          </span>
          <span className="inline-block transition-transform duration-500 ease-out group-hover/link:translate-x-1.5 group-hover/link:-translate-y-0.5">
            ↗
          </span>
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  const { t } = useI18n();

  const projects: Project[] = t.projects.items.map((item, i) => {
    const meta = projectsMeta[i];
    return {
      index: String(i + 1).padStart(2, "0"),
      title: item.title,
      description: item.description,
      stack: [...item.stack],
      status: item.status,
      statusColor: meta?.statusColor ?? "text-accent-light",
      url: meta?.url,
      visitLabel: t.projects.visitProject,
      metrics: item.metrics ? [...item.metrics] : undefined,
    };
  });

  return (
    <section id="work" className="py-28 md:py-44 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <ScrollReveal className="mb-20">
          <div className="flex items-center gap-6">
            <span className="font-mono text-gold text-[11px] tracking-[0.35em]">
              {t.projects.section}
            </span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-muted text-[11px] tracking-[0.35em] uppercase">
              {t.projects.sectionLabel}
            </span>
          </div>
        </ScrollReveal>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-12 gap-5 md:gap-6">
          {/* Featured project — wide */}
          <ScrollReveal
            className="col-span-12 lg:col-span-8"
            delay={80}
          >
            <ProjectCard project={projects[0]} />
          </ScrollReveal>

          {/* Smaller projects stacked */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-5 md:gap-6">
            <ScrollReveal delay={200}>
              <ProjectCard project={projects[1]} compact />
            </ScrollReveal>
            <ScrollReveal delay={320}>
              <ProjectCard project={projects[2]} compact />
            </ScrollReveal>
          </div>

          {/* Full width */}
          <ScrollReveal className="col-span-12" delay={440}>
            <ProjectCard project={projects[3]} compact />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
