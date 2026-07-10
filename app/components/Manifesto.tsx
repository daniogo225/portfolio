"use client";

import { useI18n } from "../i18n";
import ScrollReveal from "./ScrollReveal";

export default function Manifesto() {
  const { locale, t } = useI18n();
  const note = locale === "fr"
    ? "Le code est une matière. Le produit, une responsabilité."
    : "Code is a material. Product is a responsibility.";

  return (
    <section id="manifesto" className="section-space border-t border-border">
      <div className="content-shell">
        <div className="grid grid-cols-12 gap-x-4 gap-y-12 lg:gap-x-8">
          <ScrollReveal className="col-span-12 lg:col-span-3">
            <span className="section-kicker">{t.manifesto.sectionLabel}</span>
          </ScrollReveal>

          <div className="col-span-12 lg:col-span-9">
            <ScrollReveal>
              <p className="font-display max-w-[18ch] text-[clamp(2.35rem,5.5vw,5.8rem)] leading-[0.96]">
                {t.manifesto.title}
              </p>
            </ScrollReveal>

            <div className="mt-14 grid grid-cols-12 gap-x-4 gap-y-10 border-t border-border pt-8 lg:mt-20 lg:gap-x-8 lg:pt-10">
              <ScrollReveal className="col-span-12 lg:col-span-4" delay={120}>
                <p className="font-serif text-2xl italic leading-[1.25] text-accent">{note}</p>
              </ScrollReveal>
              <div className="col-span-12 space-y-6 text-base leading-[1.75] text-muted sm:text-lg lg:col-span-7 lg:col-start-6">
                <ScrollReveal delay={180}><p className="text-foreground">{t.manifesto.body1}</p></ScrollReveal>
                <ScrollReveal delay={240}><p>{t.manifesto.body2}</p></ScrollReveal>
                <ScrollReveal delay={300}><p className="text-foreground">{t.manifesto.body3}</p></ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
