"use client";

import ScrollReveal from "./ScrollReveal";
import { useI18n } from "../i18n";

export default function Approach() {
  const { t } = useI18n();

  return (
    <section
      id="approach"
      className="py-28 md:py-44 px-6 md:px-12 lg:px-20 border-t border-border/50"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <ScrollReveal className="mb-16 md:mb-20">
          <div className="flex items-center gap-6">
            <span className="font-mono text-gold text-[11px] tracking-[0.35em]">
              {t.approach.section}
            </span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-muted text-[11px] tracking-[0.35em] uppercase">
              {t.approach.sectionLabel}
            </span>
          </div>
        </ScrollReveal>

        {/* Title block */}
        <div className="grid grid-cols-12 gap-6 md:gap-8 mb-16 md:mb-24">
          <ScrollReveal className="col-span-12 lg:col-span-7" delay={80}>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1]">
              {t.approach.title}
              <span className="text-accent">.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal
            className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end"
            delay={160}
          >
            <p className="text-muted text-base md:text-lg leading-[1.75]">
              {t.approach.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-10">
          {t.approach.steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={200 + i * 120}>
              <div className="group relative h-full py-8 md:py-2 md:pl-8 border-t md:border-t-0 md:border-l border-border first:border-t-0 md:first:border-l transition-colors duration-500 hover:border-accent-light/40">
                {/* Animated top/side accent on hover */}
                <span className="hidden md:block absolute left-0 top-0 w-px h-0 bg-accent-light group-hover:h-full transition-[height] duration-700 ease-out" />
                <span className="md:hidden absolute top-0 left-0 h-px w-0 bg-accent-light group-hover:w-full transition-[width] duration-700 ease-out" />

                {/* Step number */}
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="font-mono text-accent text-[11px] tracking-[0.35em] transition-colors duration-500 group-hover:text-accent-light">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px w-8 bg-border group-hover:w-12 group-hover:bg-accent-light/70 transition-all duration-700 ease-out" />
                </div>

                {/* Step title */}
                <h3 className="font-display text-xl md:text-2xl leading-tight mb-4 transition-transform duration-500 group-hover:translate-x-0.5">
                  {step.title}
                </h3>

                {/* Step body */}
                <p className="text-muted text-sm md:text-base leading-[1.75] group-hover:text-foreground/80 transition-colors duration-500">
                  {step.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
