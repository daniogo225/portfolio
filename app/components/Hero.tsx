"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useI18n } from "../i18n";

export default function Hero() {
  const { locale, t } = useI18n();
  const [ready, setReady] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);

  const copy = locale === "fr"
    ? {
        label: "Ingénierie produit / systèmes numériques",
        lines: ["Je construis", "des systèmes", "qui tiennent."],
        intro: "Du premier choix produit au comportement en production, je conçois des expériences web, mobile et IA utiles, maintenables et faites pour durer.",
        live: "Disponible pour des missions ciblées",
        location: "Abidjan · UTC+0",
        statA: "Depuis 2019",
        statALabel: "ingénierie produit",
        statB: "Web + mobile",
        statBLabel: "une vision système",
        statC: "Production",
        statCLabel: "comme standard",
        visualLabel: "Signal opérationnel",
        visualCore: "Produit",
        portraitLabel: "Daniogo Aboubakar · Ingénieur produit",
      }
    : {
        label: "Product engineering / digital systems",
        lines: ["I build", "systems", "that hold."],
        intro: "From the first product decision to production behavior, I design web, mobile, and AI experiences that are useful, maintainable, and built to last.",
        live: "Available for focused engagements",
        location: "Abidjan · UTC+0",
        statA: "Since 2019",
        statALabel: "product engineering",
        statB: "Web + mobile",
        statBLabel: "one system view",
        statC: "Production",
        statCLabel: "as the standard",
        visualLabel: "Operational signal",
        visualCore: "Product",
        portraitLabel: "Daniogo Aboubakar · Product engineer",
      };

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const visual = visualRef.current;
    if (!visual || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;

    const move = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 18;
      const y = (event.clientY / window.innerHeight - 0.5) * 18;
      visual.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden pt-24 lg:pt-28">
      <div className="content-shell flex min-h-[calc(100svh-7rem)] flex-col justify-between">
        <div className="grid flex-1 grid-cols-12 items-center gap-x-4 gap-y-12 py-14 lg:gap-x-8 lg:py-10">
          <div className="relative z-10 col-span-12 lg:col-span-8">
            <div className={`mb-8 flex items-center gap-3 transition-all duration-1000 ${ready ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
              <span className="signal-dot" />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{copy.label}</span>
            </div>

            <h1 className="font-display text-[clamp(3.6rem,8vw,8.2rem)] leading-[0.8] text-foreground">
              <span className="reveal-mask"><span>{copy.lines[0]}</span></span>
              <span className="reveal-mask"><span className="serif-accent ml-[7vw] text-accent lg:ml-[10vw]">{copy.lines[1]}</span></span>
              <span className="reveal-mask"><span>{copy.lines[2]}</span></span>
            </h1>

            <div className={`relative mt-7 h-[390px] w-full max-w-[520px] overflow-hidden transition-all delay-300 duration-1000 lg:hidden ${ready ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>
              <div className="absolute left-1/2 top-[48%] h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
              <div className="absolute left-1/2 top-[48%] h-[365px] w-[365px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border" />
              <Image
                src="/portraits/daniogo-product-engineer-cutout.png"
                alt="Daniogo Aboubakar"
                fill
                loading="eager"
                sizes="(max-width: 1023px) calc(100vw - 40px), 0px"
                className="object-contain object-bottom drop-shadow-[0_26px_36px_rgba(0,0,0,0.34)]"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-border py-3">
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">{copy.portraitLabel}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </div>
            </div>

            <div className={`mt-10 grid grid-cols-12 gap-4 transition-all delay-500 duration-1000 lg:mt-14 ${ready ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}>
              <p className="col-span-12 max-w-[610px] text-base leading-[1.7] text-muted sm:text-lg lg:col-span-7 lg:col-start-5">
                {copy.intro}
              </p>
              <div className="col-span-12 mt-3 flex flex-col gap-3 sm:flex-row lg:col-span-8 lg:col-start-5">
                <a href="#work" data-hover className="group flex min-h-14 items-center justify-between bg-foreground px-6 font-mono text-[11px] uppercase tracking-[0.12em] text-background transition-colors duration-500 hover:bg-accent sm:min-w-[220px]">
                  {t.hero.ctaSecondary}<span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </a>
                <a href="#contact" data-hover className="group flex min-h-14 items-center justify-between border border-border px-6 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-500 hover:border-foreground sm:min-w-[220px]">
                  {t.hero.ctaPrimary}<span className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </a>
              </div>
            </div>
          </div>

          <div className="hero-portrait-system pointer-events-none absolute z-0 hidden lg:block lg:opacity-95">
            <div ref={visualRef} className="relative h-full w-full transition-transform duration-700 ease-out">
              <div className="absolute inset-0 rounded-full border border-border" />
              <div className="absolute inset-[12%] rounded-full border border-border" />
              <div className="absolute inset-[24%] rounded-full border border-border" />
              <div className="absolute inset-[36%] rounded-full border border-accent/60" />
              <div className="absolute left-1/2 top-0 h-full w-px bg-border" />
              <div className="absolute left-0 top-1/2 h-px w-full bg-border" />
              <div className="absolute left-[8%] top-[28%] h-2.5 w-2.5 rounded-full bg-foreground" />
              <div className="absolute bottom-[18%] right-[19%] h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="absolute left-[27%] top-[25%] font-mono text-[8px] uppercase tracking-[0.18em] text-muted">{copy.visualLabel}</span>

              <div className="absolute left-1/2 top-[52%] h-[78%] w-[50%] -translate-x-1/2 -translate-y-1/2">
                <div className="absolute left-1/2 top-[45%] h-[60%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
                <Image
                  src="/portraits/daniogo-product-engineer-cutout.png"
                  alt="Daniogo Aboubakar"
                  fill
                  loading="eager"
                  sizes="(min-width: 1024px) 28vw, 0px"
                  className="object-contain object-bottom drop-shadow-[0_40px_45px_rgba(0,0,0,0.38)]"
                />
                <span className="absolute bottom-[3%] right-[-3%] font-mono text-[8px] uppercase tracking-[0.14em] text-muted">Daniogo / 001</span>
              </div>

              <div className="absolute left-[72%] top-[48%] flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-2 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted">Abidjan · UTC+0</span>
              </div>
            </div>
          </div>
        </div>

        <div className={`relative z-10 grid border-t border-border transition-opacity delay-700 duration-1000 ${ready ? "opacity-100" : "opacity-0"} md:grid-cols-[1.2fr_1fr_1fr_1fr]`}>
          <div className="flex min-h-20 items-center justify-between border-b border-border pr-5 md:border-b-0 md:border-r">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-foreground">{copy.live}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.13em] text-muted">{copy.location}</p>
            </div>
            <span className="signal-dot" />
          </div>
          {[
            [copy.statA, copy.statALabel],
            [copy.statB, copy.statBLabel],
            [copy.statC, copy.statCLabel],
          ].map(([value, label]) => (
            <div key={value} className="hidden min-h-20 flex-col justify-center border-r border-border px-5 last:border-r-0 md:flex">
              <strong className="text-sm font-medium">{value}</strong>
              <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
