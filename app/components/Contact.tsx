"use client";

import ScrollReveal from "./ScrollReveal";
import { useI18n } from "../i18n";

export default function Contact() {
  const { t } = useI18n();

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 lg:py-44 px-6 sm:px-10 lg:px-20 border-t border-border overflow-hidden"
    >
      <div className="relative max-w-[1400px] mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="flex items-center gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
            <span className="font-mono text-accent text-[10px] sm:text-[11px] tracking-[0.18em] uppercase">
              {t.contact.section}
            </span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-muted text-[10px] sm:text-[11px] tracking-[0.18em] uppercase">
              {t.contact.sectionLabel}
            </span>
          </div>
        </ScrollReveal>

        {/* Headline */}
        <ScrollReveal delay={80}>
          <h2 className="font-display text-[clamp(2.5rem,8vw,7.5rem)] leading-[0.95] tracking-[-0.04em] font-medium mb-12 sm:mb-16 max-w-[12ch]">
            <span className="block">{t.contact.titleLine1}</span>
            <span className="block">{t.contact.titleLine2}</span>
            <span className="block">
              {t.contact.titleLine3Pre}
              <span className="text-accent italic">{t.contact.titleLine3Highlight}</span>
              {t.contact.titleLine3Post}
            </span>
          </h2>
        </ScrollReveal>

        {/* Availability + hint */}
        <ScrollReveal delay={200} className="mb-10 sm:mb-12">
          <div className="grid grid-cols-12 gap-4 sm:gap-6">
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <div className="flex items-center gap-3 mb-4 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-accent opacity-50 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {t.contact.availability}
              </div>
              <p className="text-muted text-base sm:text-lg leading-[1.7] max-w-[42ch]">
                {t.contact.hint}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* CTAs */}
        <ScrollReveal delay={280}>
          <div className="grid grid-cols-12 gap-4 sm:gap-6">
            <div className="col-span-12 lg:col-span-7 lg:col-start-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href={`mailto:${t.contact.emailLabel}`}
                data-hover
                className="group inline-flex items-center justify-center gap-2 min-h-[52px] px-6 bg-foreground text-background font-mono text-[12px] tracking-[0.12em] uppercase hover:bg-accent transition-colors duration-500"
              >
                <span>{t.contact.emailLabel}</span>
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
              <a
                href="https://cal.com/dani-walker-uqwwfc/30min?overlayCalendar=true"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="group inline-flex items-center justify-center gap-2 min-h-[52px] px-6 border border-border text-foreground font-mono text-[12px] tracking-[0.12em] uppercase hover:border-foreground transition-colors duration-500"
              >
                <span>{t.contact.ctaCall}</span>
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
