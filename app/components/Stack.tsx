"use client";

import { motion } from "framer-motion";
import {
  SiLaravel,
  SiPhp,
  SiMysql,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiGit,
  SiDocker,
  SiLinux,
  SiFigma,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import SectionHeading from "./SectionHeading";
import type { IconType } from "react-icons";

interface StackItem {
  name: string;
  category: string;
  level: number;
  icon: IconType;
}

const stack: StackItem[] = [
  { name: "Laravel", category: "Backend", level: 5, icon: SiLaravel },
  { name: "PHP", category: "Backend", level: 5, icon: SiPhp },
  { name: "MySQL / PostgreSQL", category: "Backend", level: 4, icon: SiMysql },
  { name: "API REST", category: "Backend", level: 5, icon: TbApi },
  { name: "React", category: "Frontend", level: 4, icon: SiReact },
  { name: "Next.js", category: "Frontend", level: 4, icon: SiNextdotjs },
  { name: "TypeScript", category: "Frontend", level: 4, icon: SiTypescript },
  { name: "Tailwind CSS", category: "Frontend", level: 5, icon: SiTailwindcss },
  { name: "Git", category: "Outils", level: 4, icon: SiGit },
  { name: "Docker", category: "Outils", level: 3, icon: SiDocker },
  { name: "Linux / Servers", category: "Outils", level: 3, icon: SiLinux },
  { name: "Figma", category: "Outils", level: 3, icon: SiFigma },
];

const categories = ["Backend", "Frontend", "Outils"];

export default function Stack() {
  return (
    <section
      id="stack"
      className="relative py-24 md:py-32 bg-[var(--surface-elevated)]"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[var(--border)]" />

      <div className="max-w-[1200px] mx-auto px-8 md:px-16 lg:px-24">
        <SectionHeading
          index="03"
          label="Technologies"
          title="Stack technique"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-[var(--accent)]" />
                <h3 className="text-sm font-[family-name:var(--font-mono)] uppercase tracking-[0.2em] text-[var(--muted)]">
                  {category}
                </h3>
              </div>

              <div className="border-t border-[var(--border)]">
                {stack
                  .filter((s) => s.category === category)
                  .map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.name}
                        className="group py-4 border-b border-[var(--border)] flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors duration-300" />
                          <span className="text-sm text-[var(--foreground)] font-medium group-hover:text-[var(--accent)] transition-colors duration-300">
                            {item.name}
                          </span>
                        </div>

                        <div className="flex gap-1.5">
                          {Array.from({ length: 5 }).map((_, di) => (
                            <div
                              key={di}
                              className={`w-1.5 h-1.5 rounded-full ${
                                di < item.level
                                  ? "bg-[var(--accent)]"
                                  : "bg-[var(--border)]"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--border)]" />
    </section>
  );
}
