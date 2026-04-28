"use client";

import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiLaravel,
  SiPostgresql,
  SiClaude,
  SiOpenai,
  SiLangchain,
  SiVercel,
  SiFigma,
  SiLinear,
  SiNotion,
  SiGit,
} from "react-icons/si";
import { type IconType } from "react-icons";
import ScrollReveal from "./ScrollReveal";
import { useI18n } from "../i18n";

const iconMap: Record<string, IconType> = {
  TypeScript: SiTypescript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  Laravel: SiLaravel,
  PostgreSQL: SiPostgresql,
  Claude: SiClaude,
  OpenAI: SiOpenai,
  LangChain: SiLangchain,
  "Vercel AI SDK": SiVercel,
  Figma: SiFigma,
  Linear: SiLinear,
  Notion: SiNotion,
  Git: SiGit,
};

function StackIcon({ name }: { name: string }) {
  const Icon = iconMap[name];
  if (!Icon) {
    return (
      <span
        aria-hidden
        className="inline-block w-5 h-5 sm:w-6 sm:h-6 rounded-sm border border-border bg-surface"
      />
    );
  }
  return (
    <Icon
      aria-hidden
      className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-muted/50 group-hover/item:text-foreground group-hover/item:scale-110 transition-all duration-500 shrink-0"
    />
  );
}

export default function Stack() {
  const { t } = useI18n();

  return (
    <section
      id="capabilities"
      className="relative py-24 sm:py-32 lg:py-44 px-6 sm:px-10 lg:px-20 border-t border-border"
    >
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
            <span className="font-mono text-accent text-[10px] sm:text-[11px] tracking-[0.18em] uppercase">
              {t.capabilities.section}
            </span>
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-muted text-[10px] sm:text-[11px] tracking-[0.18em] uppercase">
              {t.capabilities.sectionLabel}
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-12 gap-4 sm:gap-6 mb-16 sm:mb-20 lg:mb-28">
          <ScrollReveal className="col-span-12 lg:col-span-7" delay={80}>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.035em] font-medium">
              {t.capabilities.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal
            className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end"
            delay={160}
          >
            <p className="text-muted text-base sm:text-lg leading-[1.7]">
              {t.capabilities.subtitle}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-10 lg:gap-14">
          {t.capabilities.groups.map((group, gi) => (
            <ScrollReveal key={group.title} delay={120 + gi * 100}>
              <div>
                <div className="mb-7 sm:mb-9">
                  <h3 className="font-display text-xl sm:text-2xl tracking-[-0.02em] font-medium mb-2">
                    {group.title}
                  </h3>
                  <p className="text-muted text-sm leading-[1.6]">
                    {group.description}
                  </p>
                </div>
                <ul className="flex flex-col">
                  {group.items.map((item, ii) => (
                    <li
                      key={item.name}
                      className="group/item relative flex items-center gap-4 py-3 sm:py-4 border-b border-border min-h-[48px] transition-colors duration-500"
                    >
                      <StackIcon name={item.name} />
                      <span className="text-foreground/80 text-sm sm:text-[15px] flex-1 group-hover/item:text-foreground group-hover/item:translate-x-0.5 transition-all duration-500">
                        {item.name}
                      </span>
                      <span className="font-mono text-[10px] text-muted/60 tracking-widest">
                        {String(ii + 1).padStart(2, "0")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
