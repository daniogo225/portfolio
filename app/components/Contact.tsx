"use client";

import { useI18n } from "../i18n";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {
  const { locale, t } = useI18n();
  const headline = locale === "fr"
    ? ["Un produit", "sérieux à", "construire ?"]
    : ["A serious", "product to", "build?"];
  const detail = locale === "fr"
    ? "Expliquez-moi le système, le point de friction et ce qui doit changer. Je vous répondrai avec un avis direct."
    : "Tell me about the system, the friction point, and what needs to change. I will reply with a direct point of view.";

  return (
    <section id="contact" className="relative overflow-hidden bg-accent py-24 text-[#11110f] sm:py-32 lg:py-40">
      <div className="absolute -right-[12vw] top-[-10vw] h-[45vw] w-[45vw] rounded-full border border-black/15" aria-hidden />
      <div className="absolute -right-[3vw] top-[-1vw] h-[27vw] w-[27vw] rounded-full border border-black/15" aria-hidden />
      <div className="content-shell relative">
        <ScrollReveal>
          <div className="flex items-center justify-between border-b border-black/25 pb-5 font-mono text-[9px] uppercase tracking-[0.14em]">
            <span>{t.contact.sectionLabel}</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-black" />Abidjan / UTC+0</span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-12 gap-x-4 gap-y-14 pt-12 lg:gap-x-8 lg:pt-16">
          <ScrollReveal className="col-span-12 lg:col-span-9">
            <h2 className="font-display text-[clamp(4rem,11vw,11rem)] leading-[0.75]">
              <span className="block">{headline[0]}</span>
              <span className="serif-accent ml-[8vw] block">{headline[1]}</span>
              <span className="block">{headline[2]}</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal className="col-span-12 lg:col-span-4 lg:col-start-9" delay={160}>
            <p className="text-base leading-[1.7] text-black/70 sm:text-lg">{detail}</p>
            <div className="mt-8 flex flex-col gap-3">
              <a href={`mailto:${t.contact.emailLabel}`} data-hover className="group flex min-h-16 items-center justify-between bg-[#11110f] px-6 font-mono text-[10px] uppercase tracking-[0.1em] text-[#f2efe7] transition-transform duration-500 hover:-translate-y-1">
                {t.contact.emailLabel}<span className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
              <a href="https://cal.com/dani-walker-uqwwfc/30min?overlayCalendar=true" target="_blank" rel="noreferrer" data-hover className="group flex min-h-16 items-center justify-between border border-black/40 px-6 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-500 hover:bg-black hover:text-white">
                {t.contact.ctaCall}<span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
