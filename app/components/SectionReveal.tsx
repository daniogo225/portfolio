"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SectionReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });

  const clipProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const clipPath = useTransform(
    clipProgress,
    (v) => `inset(${100 - v}% 0% 0% 0%)`
  );
  const borderOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div ref={ref} className="relative">
      {/* Top reveal line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-[var(--accent)]"
        style={{
          opacity: borderOpacity,
          scaleX: scrollYProgress,
          transformOrigin: "left",
        }}
      />

      <motion.div style={{ clipPath }}>
        {children}
      </motion.div>
    </div>
  );
}
