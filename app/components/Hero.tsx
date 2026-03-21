"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 overflow-hidden">
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

      <div className="relative max-w-[1400px] mx-auto w-full grid grid-cols-12 gap-4 md:gap-6 pt-24 md:pt-0">
        {/* Text */}
        <div className="col-span-12 lg:col-span-8">
          {/* Section index */}
          <div
            className="mb-10 md:mb-14"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(10px)",
              transition:
                "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
            }}
          >
            <span className="font-mono text-gold text-[11px] tracking-[0.35em] uppercase">
              01 — Portfolio
            </span>
          </div>

          {/* Name */}
          <h1 className="font-display text-[clamp(3rem,8vw,8.5rem)] leading-[0.88] tracking-[-0.02em] mb-8">
            <span className="block overflow-hidden pb-2">
              <AnimatedLetters text="ABOUBAKAR" delay={0.6} />
            </span>
            <span className="block overflow-hidden pb-2">
              <AnimatedLetters text="DANIOGO" delay={1.0} />
            </span>
          </h1>

          {/* Horizontal rule */}
          <div
            className="h-px bg-border mb-8 max-w-md"
            style={{
              transform: loaded ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition:
                "transform 1s cubic-bezier(0.16, 1, 0.3, 1) 1.6s",
            }}
          />

          {/* Subtitle */}
          <p
            className="font-sans text-muted text-base md:text-lg tracking-[0.08em] mb-8"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(16px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 1.7s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 1.7s",
            }}
          >
            Senior Fullstack Developer · SaaS Founder · Abidjan, CI
          </p>

          {/* Tagline */}
          <p
            className="font-display text-lg md:text-2xl lg:text-[1.65rem] italic text-foreground/75 max-w-lg leading-snug"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(16px)",
              transition:
                "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 2s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 2s",
            }}
          >
            &ldquo;I build products that solve real problems for African
            businesses.&rdquo;
          </p>
        </div>

        {/* Portrait */}
        <div className="hidden lg:flex col-span-4 items-center justify-end">
          <div
            className="relative w-full max-w-[300px] aspect-[3/4]"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(30px) scale(0.97)",
              transition:
                "opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 1.2s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 1.2s",
            }}
          >
            {/* Photo frame */}
            <div className="absolute inset-0 overflow-hidden border border-border">
              <Image
                src="/dani2.jpg"
                alt="Aboubakar Daniogo"
                fill
                className="object-cover object-[center_75%]"
                sizes="300px"
                priority
              />
              {/* Subtle green overlay */}
              <div className="absolute inset-0 bg-accent/[0.08] mix-blend-multiply" />
            </div>

            {/* Corner accents */}
            <div className="absolute -top-3 -right-3 w-10 h-10 border-t-[2px] border-r-[2px] border-accent-light" />
            <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-[2px] border-l-[2px] border-gold" />

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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 2.6s",
        }}
      >
        <span className="font-mono text-[10px] tracking-[0.4em] text-muted uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-accent/60 animate-pulse-line" />
      </div>
    </section>
  );
}
