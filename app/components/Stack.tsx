"use client";

import { useI18n } from "../i18n";
import ScrollReveal from "./ScrollReveal";

export default function Stack() {
  const { locale, t } = useI18n();
  const headline = locale === "fr"
    ? "Du langage au déploiement, sans perdre le produit de vue."
    : "From language to deployment, without losing sight of the product.";

  return (
    <section id="capabilities" className="section-space overflow-hidden bg-foreground text-background">
      <div className="content-shell">
        <ScrollReveal>
          <div className="grid grid-cols-12 gap-x-4 gap-y-10 lg:gap-x-8">
            <div className="col-span-12 lg:col-span-3">
              <span className="section-kicker !text-background/60 before:!border-accent">{t.capabilities.sectionLabel}</span>
            </div>
            <h2 className="col-span-12 max-w-[16ch] font-display text-[clamp(3rem,7vw,7.2rem)] leading-[0.88] lg:col-span-9">{headline}</h2>
          </div>
        </ScrollReveal>

        <div className="mt-20 grid grid-cols-1 border-t border-background/20 md:grid-cols-3 lg:mt-28">
          {t.capabilities.groups.map((group, groupIndex) => (
            <ScrollReveal key={group.title} delay={groupIndex * 100} className="border-b border-background/20 px-0 py-9 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-3xl">{group.title}</h3>
                <span className="font-mono text-[9px] tracking-[0.14em] text-accent">0{groupIndex + 1}</span>
              </div>
              <p className="mt-3 min-h-11 text-sm leading-[1.6] text-background/55">{group.description}</p>
              <ul className="mt-8">
                {group.items.map((item, itemIndex) => (
                  <li key={item.name} className="group flex items-center justify-between border-t border-background/20 py-3.5">
                    <span className="text-sm text-background/80 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-background">{item.name}</span>
                    <span className="font-mono text-[8px] tracking-[0.12em] text-background/35">{String(itemIndex + 1).padStart(2, "0")}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
