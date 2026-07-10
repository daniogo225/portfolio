"use client";

import { useI18n } from "../i18n";
import ScrollReveal from "./ScrollReveal";

export default function Process() {
  const { locale, t } = useI18n();
  const note = locale === "fr"
    ? "La vitesse vient de la clarté, pas de la précipitation."
    : "Speed comes from clarity, not haste.";

  return (
    <section id="process" className="section-space border-t border-border">
      <div className="content-shell">
        <div className="grid grid-cols-12 gap-x-4 gap-y-14 lg:gap-x-8">
          <ScrollReveal className="col-span-12 lg:col-span-4">
            <span className="section-kicker">{t.process.sectionLabel}</span>
            <h2 className="mt-7 font-display text-[clamp(3rem,6vw,6rem)] leading-[0.88]">{t.process.title}</h2>
            <p className="mt-7 max-w-[26ch] font-serif text-xl italic leading-[1.35] text-accent sm:text-2xl">{note}</p>
          </ScrollReveal>

          <ol className="col-span-12 lg:col-span-8">
            {t.process.steps.map((step, index) => (
              <ScrollReveal key={step.title} delay={index * 90}>
                <li className="group grid min-h-[220px] grid-cols-12 gap-4 border-t border-border py-8 last:border-b lg:gap-6 lg:py-10">
                  <div className="col-span-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border font-mono text-[9px] text-accent transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-[#11110f]">0{index + 1}</span>
                  </div>
                  <div className="col-span-10 lg:col-span-5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">{step.duration}</span>
                    <h3 className="mt-4 font-display text-3xl leading-[1] sm:text-4xl">{step.title}</h3>
                  </div>
                  <p className="col-span-10 col-start-3 mt-4 self-center text-sm leading-[1.75] text-muted sm:text-base lg:col-span-5 lg:col-start-8 lg:mt-0">{step.body}</p>
                </li>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
