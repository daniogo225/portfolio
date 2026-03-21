"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { useI18n } from "../i18n";

function AnimatedCounter({
  end,
  suffix = "",
}: {
  end: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1400;
          const start = performance.now();

          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Math.floor(eased * end));
            if (t < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="py-28 md:py-44 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <ScrollReveal className="mb-20">
          <div className="flex items-center gap-6">
            <span className="font-mono text-gold text-[11px] tracking-[0.35em]">
              {t.about.section}
            </span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-muted text-[11px] tracking-[0.35em] uppercase">
              {t.about.sectionLabel}
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Main text */}
          <div className="col-span-12 lg:col-span-7">
            <ScrollReveal delay={80}>
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] mb-10">
                {t.about.title}
                <br />
                {t.about.titleLine2}
                <span className="text-accent">.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <p className="text-muted text-base md:text-lg leading-[1.75] max-w-xl mb-6">
                {t.about.description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={240}>
              <div className="flex items-center gap-4 mt-10">
                <div className="w-8 h-px bg-gold" />
                <p className="font-display text-gold/80 italic text-base md:text-lg">
                  {t.about.quote}
                  <span className="text-muted text-sm not-italic ml-2">
                    {t.about.quoteAuthor}
                  </span>
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Stats */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex flex-col gap-12 mt-16 lg:mt-4">
            <ScrollReveal delay={200}>
              <div className="border-l-2 border-accent pl-7">
                <p className="font-display text-[clamp(2.5rem,5vw,3.8rem)] leading-none">
                  <AnimatedCounter end={5} suffix="+" />
                </p>
                <p className="text-muted text-[11px] tracking-[0.2em] uppercase mt-3 font-mono">
                  {t.about.yearsLabel}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={320}>
              <div className="border-l-2 border-gold pl-7">
                <p className="font-display text-[clamp(2.5rem,5vw,3.8rem)] leading-none">
                  <AnimatedCounter end={2} />
                </p>
                <p className="text-muted text-[11px] tracking-[0.2em] uppercase mt-3 font-mono">
                  {t.about.saasLabel}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={440}>
              <div className="border-l-2 border-border pl-7">
                <p className="font-display text-xl leading-none">
                  {t.about.coreStack}
                </p>
                <p className="text-muted text-[11px] tracking-[0.2em] uppercase mt-3 font-mono">
                  {t.about.coreStackLabel}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
