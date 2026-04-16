"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "../i18n";

function AnimatedLetters({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="animate-letter-up"
          style={{ animationDelay: `${delay + i * 0.04}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] max-h-[1000px] flex flex-col justify-center pt-16 md:pt-20 pb-20 md:pb-24 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ height: "100svh" }}
    >
      {/* Decorative vertical grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className="absolute top-0 bottom-0 w-px bg-foreground"
            style={{ left: `${n * (100 / 6)}%` }}
          />
        ))}
      </div>

      {/* Accent line */}
      <div
        className="absolute top-0 left-0 w-px bg-accent"
        style={{
          height: loaded ? "40%" : "0%",
          transition: "height 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto w-full grid grid-cols-12 gap-4 md:gap-6">
        {/* Mobile portrait */}
        <div
          className="col-span-12 lg:hidden flex justify-center mb-5"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(20px) scale(0.95)",
            transition:
              "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        >
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-accent-light/30 shadow-[0_20px_40px_-20px_rgba(45,106,79,0.6)]">
            <Image
              src="/dani2.jpg"
              alt="Aboubakar Daniogo"
              fill
              className="object-cover object-[center_30%]"
              sizes="128px"
              priority
            />
          </div>
        </div>

        {/* Text */}
        <div className="col-span-12 lg:col-span-7">
          {/* Section index */}
          <div
            className="mb-5 md:mb-8"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(10px)",
              transition:
                "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            }}
          >
            <span className="font-mono text-gold text-[11px] tracking-[0.35em] uppercase">
              {t.hero.section}
            </span>
          </div>

          {/* Name */}
          <h1 className="font-display text-[clamp(2.25rem,5.2vw,5.25rem)] leading-[0.9] tracking-[-0.025em] mb-4 md:mb-5">
            <span className="block overflow-hidden pb-2">
              <AnimatedLetters text="ABOUBAKAR" delay={0.6} />
            </span>
            <span className="block overflow-hidden pb-2">
              <AnimatedLetters text="DANIOGO" delay={1.0} />
            </span>
          </h1>

          {/* Horizontal rule */}
          <div
            className="h-px bg-border mb-5 md:mb-6 max-w-md"
            style={{
              transform: loaded ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition:
                "transform 1s cubic-bezier(0.16, 1, 0.3, 1) 1.6s",
            }}
          />

          {/* Subtitle */}
          <p
            className="font-sans text-muted text-sm md:text-base tracking-[0.08em] mb-5 md:mb-6"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(16px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 1.7s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 1.7s",
            }}
          >
            {t.hero.subtitle}
          </p>

          {/* Tagline */}
          <p
            className="font-display text-base md:text-xl lg:text-[1.45rem] italic text-foreground/80 max-w-lg leading-snug"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(16px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 2s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 2s",
            }}
          >
            {t.hero.tagline}
          </p>

          {/* Metrics ticker */}
          <div
            className="mt-6 md:mt-7 flex flex-wrap items-baseline gap-x-5 gap-y-2.5 md:gap-x-7"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(16px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 2.15s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 2.15s",
            }}
          >
            {t.hero.ticker.map((item, i) => (
              <div key={item.label} className="flex items-baseline gap-2">
                {i > 0 && (
                  <span className="text-border/50 font-mono text-xs mr-3 md:mr-5 select-none">
                    /
                  </span>
                )}
                <span className="font-display text-foreground text-base md:text-lg leading-none">
                  {item.value}
                </span>
                <span className="font-mono text-muted/80 text-[9px] md:text-[10px] tracking-[0.25em] uppercase">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-6 md:mt-7 flex items-center gap-5"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(16px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 2.4s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 2.4s",
            }}
          >
            <a
              href="/daniogo.vcf"
              download="Daniogo Aboubakar.vcf"
              className="group relative inline-flex items-center gap-3 px-6 py-3 border border-accent-light/40 hover:border-accent-light overflow-hidden transition-colors duration-500 ease-out"
              data-hover
            >
              {/* Hover sweep */}
              <span className="absolute inset-0 bg-accent-light/[0.08] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="relative text-accent-light transition-transform duration-500 ease-out group-hover:-rotate-6"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="relative text-[12px] tracking-[0.15em] uppercase text-foreground/80 group-hover:text-foreground transition-colors duration-500">
                {t.hero.saveContact}
              </span>
            </a>
          </div>
        </div>

        {/* Portrait */}
        <div className="hidden lg:flex col-span-5 items-center justify-end">
          <div
            className="group relative w-full max-w-[380px] aspect-[4/5]"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(30px) scale(0.97)",
              transition:
                "opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 1.2s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 1.2s",
            }}
          >
            {/* Photo frame */}
            <div className="absolute inset-0 overflow-hidden border border-border shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]">
              <Image
                src="/dani2.jpg"
                alt="Aboubakar Daniogo"
                fill
                className="object-cover object-[70%_80%] scale-[1.45] transition-transform duration-[1400ms] ease-out group-hover:scale-[1.5]"
                sizes="340px"
                priority
              />
              {/* Subtle green overlay */}
              <div className="absolute inset-0 bg-accent/[0.08] mix-blend-multiply" />
              {/* Premium duotone glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-gold/10 mix-blend-overlay" />
              {/* Top shine */}
              <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-light/60 to-transparent" />
            </div>

            {/* Corner accents */}
            <div className="absolute -top-3 -right-3 w-10 h-10 border-t-[2px] border-r-[2px] border-accent-light transition-all duration-700 group-hover:-top-4 group-hover:-right-4" />
            <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-[2px] border-l-[2px] border-gold transition-all duration-700 group-hover:-bottom-4 group-hover:-left-4" />

            {/* Side label */}
            <span
              className="absolute -right-8 top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-[0.4em] text-muted/40 uppercase"
              style={{
                writingMode: "vertical-rl",
              }}
            >
              Abidjan · 2026
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 2.6s",
        }}
      >
        <span className="font-mono text-[9px] tracking-[0.4em] text-muted/70 uppercase">
          {t.hero.scroll}
        </span>
        <div className="w-px h-7 bg-gradient-to-b from-accent/60 to-transparent animate-pulse-line" />
      </div>
    </section>
  );
}
