"use client";

import Image from "next/image";
import { useI18n } from "../i18n";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  const { locale, t } = useI18n();
  const portraitLabel = locale === "fr" ? "Portrait / Abidjan / 2026" : "Portrait / Abidjan / 2026";
  const statement = locale === "fr"
    ? "Je travaille à la jonction du produit, de l’interface et de l’infrastructure. C’est là que les bonnes idées deviennent des systèmes fiables."
    : "I work at the intersection of product, interface, and infrastructure. That is where good ideas become reliable systems.";

  return (
    <section id="about" className="section-space overflow-hidden bg-surface">
      <div className="content-shell">
        <div className="grid grid-cols-12 gap-x-4 gap-y-12 lg:gap-x-8">
          <ScrollReveal className="col-span-12 lg:col-span-5" direction="left">
            <div className="relative aspect-[4/5] max-h-[720px]">
              <div className="absolute left-1/2 top-[47%] h-[70%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
              <div className="absolute left-1/2 top-[47%] h-[86%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-border" />
              <div className="absolute inset-0">
                <Image
                  src="/portraits/daniogo-about-seated-cutout.png"
                  alt="Daniogo Aboubakar"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="origin-bottom scale-[1.06] object-contain object-bottom drop-shadow-[0_35px_50px_rgba(0,0,0,0.32)] transition-transform duration-[1200ms] hover:scale-[1.09]"
                />
                <span className="absolute bottom-3 left-0 font-mono text-[9px] uppercase tracking-[0.14em] text-muted">{portraitLabel}</span>
              </div>
              <div className="absolute -bottom-10 -right-4 hidden h-32 w-32 items-center justify-center rounded-full bg-accent text-[#11110f] lg:flex">
                <span className="font-serif text-6xl italic">D.</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <ScrollReveal>
              <span className="section-kicker">{t.about.sectionLabel}</span>
              <h2 className="mt-7 font-display text-[clamp(3.5rem,7vw,7.5rem)] leading-[0.82]">{t.about.title}</h2>
              <p className="mt-8 max-w-[26ch] font-serif text-2xl italic leading-[1.3] text-accent sm:text-3xl">{statement}</p>
            </ScrollReveal>

            <div className="mt-12 space-y-6 text-sm leading-[1.8] text-muted sm:text-base lg:ml-[16%] lg:mt-16">
              <ScrollReveal delay={100}><p className="text-foreground">{t.about.role}</p></ScrollReveal>
              <ScrollReveal delay={160}><p>{t.about.paragraph1}</p></ScrollReveal>
              <ScrollReveal delay={220}><p>{t.about.paragraph2}</p></ScrollReveal>
              <ScrollReveal delay={280}><p>{t.about.paragraph3}</p></ScrollReveal>
            </div>

            <ScrollReveal delay={340} className="mt-12 lg:ml-[16%]">
              <ol className="border-t border-border">
                {t.about.timeline.map((entry) => (
                  <li key={entry.year} className="grid grid-cols-[72px_1fr] border-b border-border py-4">
                    <span className="font-mono text-[10px] tracking-[0.12em] text-accent">{entry.year}</span>
                    <span className="text-sm text-muted">{entry.event}</span>
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
