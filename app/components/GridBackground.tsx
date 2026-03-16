"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";

function RotatingGrid({ rotate }: { rotate: MotionValue<number> }) {
  const rotateStr = useTransform(rotate, (v) => `rotate(${v}deg)`);

  return (
    <motion.div
      className="absolute inset-0 grid-bg"
      style={{ rotate: rotateStr }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Corners />
    </motion.div>
  );
}

function StaticGrid() {
  return (
    <motion.div
      className="absolute inset-0 grid-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <Corners />
    </motion.div>
  );
}

function Corners() {
  return (
    <>
      <div className="absolute top-8 left-8 w-8 h-8 border-t-[1px] border-l-[1px] border-[var(--grid-color-strong)]" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t-[1px] border-r-[1px] border-[var(--grid-color-strong)]" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b-[1px] border-l-[1px] border-[var(--grid-color-strong)]" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-[1px] border-r-[1px] border-[var(--grid-color-strong)]" />
    </>
  );
}

export default function GridBackground({
  rotate,
}: {
  rotate?: MotionValue<number>;
}) {
  if (rotate) {
    return <RotatingGrid rotate={rotate} />;
  }
  return <StaticGrid />;
}
