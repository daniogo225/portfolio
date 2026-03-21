"use client";

import ScrollReveal from "./ScrollReveal";

const contactLinks = [
  { label: "daniogoaboubakar@icloud.com", href: "mailto:daniogoaboubakar@icloud.com" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-28 md:py-44 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-accent/[0.02] pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Section header */}
        <ScrollReveal className="mb-20">
          <div className="flex items-center gap-6">
            <span className="font-mono text-gold text-[11px] tracking-[0.35em]">
              05
            </span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-muted text-[11px] tracking-[0.35em] uppercase">
              Contact
            </span>
          </div>
        </ScrollReveal>

        {/* Oversize headline */}
        <ScrollReveal delay={80}>
          <h2 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.02em] mb-16 max-w-4xl">
            Let&apos;s build
            <br />
            something
            <br />
            meaningful<span className="text-accent">.</span>
          </h2>
        </ScrollReveal>

        {/* Links */}
        <ScrollReveal delay={200}>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-14">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group inline-flex items-center gap-2.5 text-base md:text-lg text-muted hover:text-foreground transition-colors duration-500 ease-out"
                data-hover
              >
                <span>{link.label}</span>
                <span className="inline-block transition-all duration-500 ease-out group-hover:translate-x-1.5 group-hover:-translate-y-0.5 text-accent-light/60 group-hover:text-accent-light">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
