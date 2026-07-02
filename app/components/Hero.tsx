"use client";

import { useEffect, useState, useRef } from "react";
import { useI18n } from "../i18n";

function MagneticLink({
  children,
  href,
  variant = "primary",
  ...rest
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);
      const radius = 80;
      if (distance > radius) return;
      const strength = 0.25;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const base =
    "magnetic-link group relative inline-flex items-center justify-center gap-2 font-mono text-[13px] sm:text-[14px] tracking-[0.03em] uppercase min-h-[54px] px-7 sm:px-8";
  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:bg-accent"
      : "border border-border text-foreground hover:border-foreground";

  return (
    <a
      ref={ref}
      href={href}
      data-hover
      className={`${base} ${styles}`}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {variant === "primary" && (
          <span className="inline-block transition-transform duration-500 group-hover:translate-x-0.5">
            →
          </span>
        )}
      </span>
    </a>
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const tm = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(tm);
  }, []);

  return (
    <section
      className="relative flex flex-col justify-between min-h-[100svh] pt-20 sm:pt-24 lg:pt-24 pb-12 sm:pb-12 lg:pb-10 px-6 sm:px-10 lg:px-20 overflow-hidden"
    >
      {/* Top index bar */}
      <div
        className="relative flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-muted"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.7s var(--ease-out-expo) 0.2s, transform 0.7s var(--ease-out-expo) 0.2s",
        }}
      >
        <span>{t.hero.eyebrow}</span>
        <span className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-accent opacity-50 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          {t.hero.availability}
        </span>
      </div>

      {/* Title block */}
      <div className="relative max-w-[1400px] mx-auto w-full grid grid-cols-12 gap-4 sm:gap-6 flex-1 content-center my-6 sm:my-8 lg:my-0">
        <h1 className="col-span-12 lg:col-span-10 font-display text-[clamp(2.4rem,6.5vw,6.5rem)] leading-[0.95] tracking-[-0.04em] font-medium">
          <span className="block overflow-hidden">
            <span
              className="block"
              style={{
                transform: loaded ? "translateY(0)" : "translateY(110%)",
                opacity: loaded ? 1 : 0,
                transition: "transform 1s var(--ease-out-expo) 0.4s, opacity 0.6s ease 0.4s",
              }}
            >
              {t.hero.titleLine1}
            </span>
          </span>
          <span className="block overflow-hidden mt-1 sm:mt-2">
            <span
              className="block"
              style={{
                transform: loaded ? "translateY(0)" : "translateY(110%)",
                opacity: loaded ? 1 : 0,
                transition: "transform 1s var(--ease-out-expo) 0.55s, opacity 0.6s ease 0.55s",
              }}
            >
              {t.hero.titleLine2Pre}
              <span className="text-accent italic font-display">
                {t.hero.titleLine2Highlight}
              </span>
              {t.hero.titleLine2Post}
            </span>
          </span>
        </h1>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6 mt-7 sm:mt-9 lg:mt-10">
          <p
            className="text-foreground/75 text-[1.05rem] sm:text-xl leading-[1.65] max-w-[560px] lg:ml-auto"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.8s var(--ease-out-expo) 1s, transform 0.8s var(--ease-out-expo) 1s",
            }}
          >
            {t.hero.sub}
          </p>

          <div
            className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4 lg:justify-end"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.8s var(--ease-out-expo) 1.2s, transform 0.8s var(--ease-out-expo) 1.2s",
            }}
          >
            <MagneticLink href="#contact" variant="primary">
              {t.hero.ctaPrimary}
            </MagneticLink>
            <MagneticLink href="#work" variant="secondary">
              {t.hero.ctaSecondary}
            </MagneticLink>
          </div>
        </div>
      </div>

      {/* Bottom bar with line */}
      <div className="relative">
        <div
          className="h-px bg-border w-full mb-5"
          style={{
            transformOrigin: "left",
            transform: loaded ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 1.4s var(--ease-out-expo) 0.2s",
          }}
        />
        <div
          className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-muted"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.8s var(--ease-out-expo) 1.5s",
          }}
        >
          <span className="flex items-center gap-2">
            <span className="hidden sm:inline">{t.hero.scroll}</span>
            <span className="block w-px h-4 bg-muted/50" aria-hidden />
          </span>
          <span>{t.hero.location}</span>
        </div>
      </div>
    </section>
  );
}
