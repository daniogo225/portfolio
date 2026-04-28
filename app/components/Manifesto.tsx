"use client";

import ScrollReveal from "./ScrollReveal";
import { useI18n } from "../i18n";

export default function Manifesto() {
  const { t } = useI18n();

  return (
    <section
      id="manifesto"
      className="relative py-24 sm:py-32 lg:py-44 px-6 sm:px-10 lg:px-20 border-t border-border"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="flex items-center gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
            <span className="font-mono text-accent text-[10px] sm:text-[11px] tracking-[0.18em] uppercase">
              {t.manifesto.section}
            </span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-muted text-[10px] sm:text-[11px] tracking-[0.18em] uppercase">
              {t.manifesto.sectionLabel}
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          {/* Headline */}
          <ScrollReveal className="col-span-12 lg:col-span-9 lg:col-start-2" delay={80}>
            <h2 className="font-display text-[clamp(1.875rem,5.5vw,4.5rem)] leading-[1.05] tracking-[-0.035em] font-medium max-w-[18ch]">
              {t.manifesto.title}
            </h2>
          </ScrollReveal>

          {/* Body — narrative reveal */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-6 mt-12 sm:mt-16 lg:mt-20 space-y-7 sm:space-y-8">
            <ScrollReveal delay={160}>
              <p className="text-foreground/90 text-lg sm:text-xl leading-[1.6]">
                {t.manifesto.body1}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={240}>
              <p className="text-muted text-base sm:text-lg leading-[1.7]">
                {t.manifesto.body2}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={320}>
              <p className="text-foreground text-lg sm:text-xl leading-[1.6] font-display italic">
                {t.manifesto.body3}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
