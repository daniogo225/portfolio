"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  index: string;
}

export default function SectionHeading({
  label,
  title,
  index,
}: SectionHeadingProps) {
  return (
    <div className="mb-16 md:mb-24">
      <motion.div
        className="flex items-center gap-4 mb-4"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-xs font-[family-name:var(--font-mono)] text-[var(--accent)] tracking-wider">
          {index}
        </span>
        <div className="w-12 h-[1px] bg-[var(--accent)]" />
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--muted)] font-medium">
          {label}
        </span>
      </motion.div>
      <div className="overflow-hidden">
        <motion.h2
          className="text-4xl md:text-6xl font-bold tracking-tighter text-[var(--foreground)]"
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
}
