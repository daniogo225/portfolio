"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  text: string;
  speed?: number;
  outlined?: boolean;
}

export default function Marquee({
  text,
  speed = 20,
  outlined = false,
}: MarqueeProps) {
  const items = Array(6).fill(text);

  return (
    <div className="relative overflow-hidden py-8 md:py-12 border-y border-[var(--border)]">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: { duration: speed, repeat: Infinity, ease: "linear" },
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className={`text-5xl md:text-8xl font-bold tracking-tighter ${
              outlined
                ? "text-transparent [-webkit-text-stroke:1px_var(--accent)]"
                : "text-[var(--accent)] opacity-10"
            }`}
          >
            {item}
            <span className="mx-8 text-[var(--accent)] opacity-40">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
