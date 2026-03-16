"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

interface Project {
  title: string;
  description: string;
  tags: string[];
  year: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "Inexus Business",
    description:
      "Logiciel de gestion cloud pour revendeurs Apple en Afrique de l\u2019Ouest. Suivi de stock, facturation automatique, assistant IA vocal et vitrine en ligne pour plus de 130 produits.",
    tags: ["Laravel", "React", "API REST", "PostgreSQL", "IA"],
    year: "2024",
    link: "https://inexus-business.com/",
  },
  {
    title: "Portfolio v2",
    description:
      "Ce portfolio \u2014 une exploration du design suisse et de la g\u00e9om\u00e9trie en mouvement. Construit avec Next.js et Framer Motion.",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    year: "2025",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const isEven = index % 2 === 0;

  // 3D perspective transforms
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [15, 3, 0, -3, -15]);
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    isEven ? [-8, -2, 0, 2, 8] : [8, 2, 0, -2, -8]
  );
  const cardScale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.85, 0.97, 1, 0.97, 0.85]);
  const cardY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Inner geometric elements
  const innerRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const innerScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 0.5]);
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  // Text slide
  const textX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5],
    isEven ? [60, 10, 0] : [-60, -10, 0]
  );
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div
      ref={cardRef}
      className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center ${
        index > 0 ? "mt-32 md:mt-48" : ""
      }`}
    >
      {/* Project visual - 3D perspective */}
      <div
        className={`${
          isEven ? "md:col-span-7" : "md:col-span-7 md:order-2"
        } perspective`}
      >
        <motion.div
          className="relative"
          style={{ rotateX, rotateY, scale: cardScale, y: cardY }}
        >
          <div className="relative aspect-[16/10] bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
            <div className="absolute inset-0 grid-bg-dense opacity-40" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-3/4 h-3/4">
                {/* Accent block */}
                <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-[var(--accent)] opacity-8" />
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 border-2 border-[var(--accent)] opacity-15" />

                {/* Rotating ring */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border border-[var(--accent)] opacity-20"
                  style={{ rotate: innerRotate, scale: innerScale }}
                >
                  <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[var(--accent)] opacity-40" />
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--accent)] opacity-40" />
                  <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--accent)] opacity-60" />
                </motion.div>

                {/* Animated corner lines */}
                <motion.div
                  className="absolute top-0 left-0 h-[1px] bg-[var(--accent)] opacity-30 origin-left"
                  style={{ scaleX: lineProgress }}
                />
                <motion.div
                  className="absolute top-0 left-0 w-[1px] bg-[var(--accent)] opacity-30 origin-top"
                  style={{ scaleY: lineProgress }}
                />

                {/* Diamond */}
                <motion.div
                  className="absolute top-[8%] right-[8%] w-4 h-4 border border-[var(--accent)] opacity-25"
                  style={{ rotate: useTransform(scrollYProgress, [0, 1], [45, 225]) }}
                />

                {/* Title */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl md:text-5xl font-bold tracking-tighter text-[var(--foreground)] opacity-60">
                    {project.title.split(" ")[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-12 h-[2px] bg-[var(--accent)]" />
            <div className="absolute top-0 left-0 w-[2px] h-12 bg-[var(--accent)]" />
            <div className="absolute bottom-0 right-0 w-12 h-[2px] bg-[var(--accent)] opacity-50" />
            <div className="absolute bottom-0 right-0 w-[2px] h-12 bg-[var(--accent)] opacity-50" />

            <div className="absolute bottom-4 right-4 text-xs font-[family-name:var(--font-mono)] text-[var(--muted)]">
              {project.year}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project info - slides in */}
      <motion.div
        className={`${
          isEven ? "md:col-span-5" : "md:col-span-5 md:order-1"
        } flex flex-col gap-6`}
        style={{ x: textX, opacity: textOpacity }}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
          <span className="text-xs font-[family-name:var(--font-mono)] text-[var(--muted)] uppercase tracking-wider">
            Projet {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="text-3xl md:text-4xl font-bold tracking-tighter text-[var(--foreground)]">
          {project.title}
        </h3>

        <p className="text-[var(--muted)] leading-relaxed text-base">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs font-[family-name:var(--font-mono)] border border-[var(--border)] text-[var(--muted)] uppercase tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[var(--accent)] font-medium uppercase tracking-wider hover:gap-3 transition-all duration-300"
          >
            Voir le projet
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        )}
      </motion.div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projets" className="relative py-32 md:py-48">
      <div className="max-w-[1200px] mx-auto px-8 md:px-16 lg:px-24">
        <SectionHeading index="01" label="Travaux" title="Projets" />
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
