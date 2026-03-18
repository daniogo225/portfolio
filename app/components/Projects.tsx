"use client";

import ScrollReveal from "./ScrollReveal";

interface Project {
  index: string;
  title: string;
  description: string;
  stack: string[];
  status: string;
  statusColor: string;
  url?: string;
}

const projects: Project[] = [
  {
    index: "01",
    title: "Inexus Business",
    description:
      "SaaS de gestion commerciale pour revendeurs Apple en Afrique de l'Ouest. Facturation, inventaire, CRM — un système complet pour digitaliser les opérations.",
    stack: ["Laravel", "Inertia.js", "React", "Laravel Cloud"],
    status: "En production",
    statusColor: "text-emerald-400",
    url: "https://inexus-business.com",
  },
  {
    index: "02",
    title: "School Management",
    description:
      "Gestion scolaire pour établissements secondaires privés en Côte d'Ivoire. Notes, emplois du temps, communication parents-école.",
    stack: ["Laravel", "React", "Mobile-first"],
    status: "En développement",
    statusColor: "text-gold",
  },
  {
    index: "03",
    title: "Divine Grace Vacation Homes",
    description:
      "Développement sur mesure pour une entreprise de gestion immobilière aux Émirats Arabes Unis.",
    stack: ["Laravel"],
    status: "Contrat actif",
    statusColor: "text-accent-light",
  },
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
      className={`group relative border border-border bg-surface/30 transition-all duration-500 hover:border-accent/40 hover:bg-surface/60 ${
        compact ? "p-7 md:p-8" : "p-8 md:p-12 h-full"
      }`}
    >
      {/* Hover corner accents */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-transparent group-hover:border-accent/60 transition-all duration-500" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-transparent group-hover:border-accent/60 transition-all duration-500" />

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
            className="font-mono text-[10px] tracking-[0.1em] text-muted/80 border border-border/80 px-3 py-1.5 group-hover:border-accent/20 transition-colors duration-300"
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
          className="inline-flex items-center gap-2 text-[13px] tracking-wide text-accent hover:text-foreground transition-colors duration-300 group/link"
          data-hover
        >
          <span>Visit project</span>
          <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-0.5">
            ↗
          </span>
        </a>
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="py-28 md:py-44 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <ScrollReveal className="mb-20">
          <div className="flex items-center gap-6">
            <span className="font-mono text-gold text-[11px] tracking-[0.35em]">
              03
            </span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-muted text-[11px] tracking-[0.35em] uppercase">
              Featured Work
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
        </div>
      </div>
    </section>
  );
}
