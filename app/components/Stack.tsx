"use client";

import ScrollReveal from "./ScrollReveal";

const stackData = [
  {
    category: "Core",
    items: ["Laravel", "Inertia.js", "React", "TypeScript"],
  },
  {
    category: "Infrastructure",
    items: ["Laravel Cloud", "Laravel Forge", "OCI", "Cloudflare"],
  },
  {
    category: "Tools",
    items: ["Claude Code", "Git", "Figma"],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="py-28 md:py-44 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <ScrollReveal className="mb-20">
          <div className="flex items-center gap-6">
            <span className="font-mono text-gold text-[11px] tracking-[0.35em]">
              04
            </span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-muted text-[11px] tracking-[0.35em] uppercase">
              Stack
            </span>
          </div>
        </ScrollReveal>

        {/* 3-column editorial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10 lg:gap-14">
          {stackData.map((group, groupIdx) => (
            <ScrollReveal key={group.category} delay={groupIdx * 120}>
              <div>
                <h3 className="font-display text-2xl mb-10">
                  {group.category}
                  <span className="text-accent">.</span>
                </h3>
                <div className="flex flex-col">
                  {group.items.map((item, i) => (
                    <div
                      key={item}
                      className="group/item flex items-center justify-between py-[14px] border-b border-border/40 hover:border-accent/30 transition-colors duration-300 cursor-default"
                    >
                      <span className="text-[15px] text-foreground/80 group-hover/item:text-foreground transition-colors duration-300">
                        {item}
                      </span>
                      <span className="font-mono text-[10px] text-muted/30 tracking-widest">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
