"use client";

import ScrollReveal from "./ScrollReveal";
import { useI18n } from "../i18n";

interface Project {
  index: string;
  title: string;
  description: string;
  stack: string[];
  status: string;
  statusColor: string;
  url?: string;
  visitLabel?: string;
}

const statusColors = [
  "text-accent-light",
  "text-emerald-400",
  "text-gold",
  "text-accent-light",
];

const urls = [
  undefined,
  "https://inexus-business.com",
  undefined,
  undefined,
];

function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  return (
    <div
      className={`group relative border border-border bg-surface/30 transition-all duration-700 ease-out hover:border-accent-light/40 hover:bg-surface/60 ${
        compact ? "p-7 md:p-8" : "p-8 md:p-12 h-full"
      }`}
    >
      {/* Hover corner accents */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-transparent group-hover:border-accent-light/60 transition-all duration-700 ease-out" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-transparent group-hover:border-accent-light/60 transition-all duration-700 ease-out" />

      {/* Header row */}
      <div className="flex items-start justify-between mb-6">
        <span className="font-mono text-accent text-[11px] tracking-[0.35em]">
          {project.index}
        </span>
        <span
          className={`font-mono text-[10px] tracking-[0.2em] uppercase ${project.statusColor}`}
        >
          {project.status}
        </span>
      </div>

      {/* Title */}
      <h3
        className={`font-display leading-tight mb-5 ${
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

      {/* Stack tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[10px] tracking-[0.1em] text-muted/80 border border-border/80 px-3 py-1.5 group-hover:border-accent-light/20 transition-colors duration-500 ease-out"
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
          className="inline-flex items-center gap-2 text-[13px] tracking-wide text-accent-light hover:text-foreground transition-colors duration-500 ease-out group/link"
          data-hover
        >
          <span>{project.visitLabel}</span>
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

  const projects: Project[] = t.projects.items.map((item, i) => ({
    index: String(i + 1).padStart(2, "0"),
    title: item.title,
    description: item.description,
    stack: [...item.stack],
    status: item.status,
    statusColor: statusColors[i] || "text-accent-light",
    url: urls[i],
    visitLabel: t.projects.visitProject,
  }));

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
