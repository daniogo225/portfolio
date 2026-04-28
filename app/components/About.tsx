"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useI18n } from "../i18n";

export default function About() {
  const { t } = useI18n();

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 lg:py-44 px-6 sm:px-10 lg:px-20 border-t border-border"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="flex items-center gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
            <span className="font-mono text-accent text-[10px] sm:text-[11px] tracking-[0.18em] uppercase">
              {t.about.section}
            </span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-muted text-[10px] sm:text-[11px] tracking-[0.18em] uppercase">
              {t.about.sectionLabel}
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-12 gap-6 sm:gap-8">
          {/* Portrait + name */}
          <div className="col-span-12 lg:col-span-5">
            <ScrollReveal delay={80}>
              <div className="relative w-full max-w-[360px] aspect-[4/5] mb-8 sm:mb-10 overflow-hidden border border-border">
                <Image
                  src="/dani2.jpg"
                  alt="Daniogo"
                  fill
                  className="object-cover object-[70%_30%] grayscale hover:grayscale-0 transition-[filter] duration-700"
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <h2 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1] tracking-[-0.04em] font-medium mb-4">
                {t.about.title}
              </h2>
              <p className="text-muted text-base sm:text-lg leading-[1.6] max-w-[36ch]">
                {t.about.role}
              </p>
            </ScrollReveal>
          </div>

          {/* Narrative + timeline */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="space-y-6 sm:space-y-7 mb-12 sm:mb-16 lg:mb-20">
              <ScrollReveal delay={200}>
                <p className="text-foreground/90 text-base sm:text-lg leading-[1.7]">
                  {t.about.paragraph1}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={280}>
                <p className="text-muted text-base sm:text-lg leading-[1.7]">
                  {t.about.paragraph2}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={360}>
                <p className="text-foreground/90 text-base sm:text-lg leading-[1.7]">
                  {t.about.paragraph3}
                </p>
              </ScrollReveal>
            </div>

            {/* Timeline */}
            <ScrollReveal delay={440}>
              <ol className="border-t border-border">
                {t.about.timeline.map((entry) => (
                  <li
                    key={entry.year}
                    className="grid grid-cols-12 gap-4 py-5 sm:py-6 border-b border-border"
                  >
                    <span className="col-span-3 sm:col-span-2 font-mono text-accent text-xs sm:text-sm tracking-[0.1em]">
                      {entry.year}
                    </span>
                    <span className="col-span-9 sm:col-span-10 text-foreground/85 text-sm sm:text-base leading-[1.5]">
                      {entry.event}
                    </span>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
