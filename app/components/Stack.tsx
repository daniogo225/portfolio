"use client";

import { type IconType } from "react-icons";
import {
  SiLaravel,
  SiReact,
  SiTypescript,
  SiCloudflare,
  SiGit,
  SiFigma,
} from "react-icons/si";
import { TbBrandInertia } from "react-icons/tb";
import { VscCloud } from "react-icons/vsc";
import { HiServerStack } from "react-icons/hi2";
import { RiRobot2Line } from "react-icons/ri";
import { BsCloudFill } from "react-icons/bs";
import ScrollReveal from "./ScrollReveal";

interface StackItem {
  name: string;
  icon: IconType;
}

const stackData: { category: string; items: StackItem[] }[] = [
  {
    category: "Core",
    items: [
      { name: "Laravel", icon: SiLaravel },
      { name: "Inertia.js", icon: TbBrandInertia },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
    ],
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Laravel Cloud", icon: VscCloud },
      { name: "Laravel Forge", icon: HiServerStack },
      { name: "OCI", icon: BsCloudFill },
      { name: "Cloudflare", icon: SiCloudflare },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Claude Code", icon: RiRobot2Line },
      { name: "Git", icon: SiGit },
      { name: "Figma", icon: SiFigma },
    ],
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
                  {group.items.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.name}
                        className="group/item flex items-center gap-4 py-[14px] border-b border-border/40 hover:border-accent-light/30 transition-all duration-300 cursor-default"
                      >
                        <Icon className="w-[18px] h-[18px] text-muted/40 group-hover/item:text-accent-light transition-colors duration-300 shrink-0" />
                        <span className="text-[15px] text-foreground/80 group-hover/item:text-foreground transition-colors duration-300 flex-1">
                          {item.name}
                        </span>
                        <span className="font-mono text-[10px] text-muted/30 tracking-widest">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
