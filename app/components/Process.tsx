"use client";

import ScrollReveal from "./ScrollReveal";
import { useI18n } from "../i18n";

export default function Process() {
  const { t } = useI18n();

  return (
    <section
      id="process"
      className="relative py-24 sm:py-32 lg:py-44 px-6 sm:px-10 lg:px-20 border-t border-border"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="flex items-center gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
            <span className="font-mono text-accent text-[10px] sm:text-[11px] tracking-[0.18em] uppercase">
              {t.process.section}
            </span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-muted text-[10px] sm:text-[11px] tracking-[0.18em] uppercase">
              {t.process.sectionLabel}
            </span>
          </div>
        </ScrollReveal>

        {/* Title block */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6 mb-16 sm:mb-20 lg:mb-28">
          <ScrollReveal className="col-span-12 lg:col-span-7" delay={80}>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.035em] font-medium">
              {t.process.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end" delay={160}>
            <p className="text-muted text-base sm:text-lg leading-[1.7]">
              {t.process.subtitle}
            </p>
          </ScrollReveal>
        </div>

        {/* Steps — 3 column on desktop, vertical on mobile */}
        <ol className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border">
          {t.process.steps.map((step, i) => (
            <ScrollReveal
              key={step.title}
              delay={120 + i * 100}
              className="bg-background"
            >
              <li className="group relative h-full p-7 sm:p-10 lg:p-12 transition-colors duration-700 hover:bg-surface">
                <div className="flex items-baseline justify-between mb-8 sm:mb-12">
                  <span className="font-mono text-accent text-[11px] sm:text-[12px] tracking-[0.18em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-muted">
                    {step.duration}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-[2rem] leading-[1.1] tracking-[-0.025em] font-medium mb-4 sm:mb-5">
                  {step.title}
                </h3>
                <p className="text-muted text-sm sm:text-base leading-[1.7]">
                  {step.body}
                </p>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
