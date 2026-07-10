"use client";

import { useI18n } from "../i18n";
import ScrollReveal from "./ScrollReveal";

export default function Approach() {
  const { locale, t } = useI18n();
  const sideNote = locale === "fr"
    ? "Des principes visibles dans les choix, pas affichés comme des slogans."
    : "Principles made visible through decisions, not displayed as slogans.";

  return (
    <section id="approach" className="section-space bg-surface text-foreground">
      <div className="content-shell">
        <div className="grid grid-cols-12 gap-x-4 gap-y-14 lg:gap-x-8">
          <ScrollReveal className="col-span-12 lg:col-span-4">
            <span className="section-kicker">{t.approach.sectionLabel}</span>
            <h2 className="mt-7 font-display text-[clamp(2.7rem,5.5vw,5.6rem)] leading-[0.9]">{t.approach.title}</h2>
            <p className="mt-7 max-w-[30ch] text-sm leading-[1.7] text-muted">{sideNote}</p>
          </ScrollReveal>

          <ol className="col-span-12 border-t border-border lg:col-span-8">
            {t.approach.pillars.map((pillar, index) => (
              <ScrollReveal key={pillar.title} delay={index * 60}>
                <li className="group grid grid-cols-12 gap-4 border-b border-border py-7 transition-colors duration-500 hover:bg-background/25 sm:py-9 lg:gap-6 lg:px-4">
                  <span className="col-span-2 font-mono text-[10px] tracking-[0.16em] text-accent">0{index + 1}</span>
                  <h3 className="col-span-10 font-display text-2xl leading-[1.05] transition-transform duration-700 group-hover:translate-x-2 sm:text-3xl lg:col-span-4">{pillar.title}</h3>
                  <p className="col-span-10 col-start-3 mt-3 text-sm leading-[1.7] text-muted lg:col-span-5 lg:col-start-8 lg:mt-0">{pillar.body}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
