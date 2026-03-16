"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function GeometricDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineLeft = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "45%", "0%"]);
  const lineRight = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "45%", "0%"]);
  const diamondRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const diamondScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 0.5]);
  const circleScale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const verticalLine = useTransform(scrollYProgress, [0.2, 0.5, 0.8], ["0%", "100%", "0%"]);

  return (
    <div ref={ref} className="relative py-12 md:py-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Main horizontal construction */}
        <div className="flex items-center gap-0 justify-center">
          <motion.div
            className="h-[1px] bg-[var(--accent)] opacity-30"
            style={{ width: lineLeft }}
          />
          <div className="relative mx-4 flex items-center justify-center w-8 h-8">
            <motion.div
              className="absolute w-5 h-5 border border-[var(--accent)] opacity-40"
              style={{ rotate: diamondRotate, scale: diamondScale }}
            />
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-[var(--accent)] opacity-30"
              style={{ scale: circleScale }}
            />
          </div>
          <motion.div
            className="h-[1px] bg-[var(--accent)] opacity-30"
            style={{ width: lineRight }}
          />
        </div>

        {/* Small vertical tick marks */}
        <div className="flex justify-center mt-3">
          <motion.div
            className="w-[1px] bg-[var(--accent)] opacity-15"
            style={{ height: verticalLine }}
          />
        </div>
      </div>
    </div>
  );
}
