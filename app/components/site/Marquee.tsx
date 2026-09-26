"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { useRef } from "react";
import { useSite } from "./SiteProvider";

const COPIES = 4;

/** Bandeau des technologies. Sa vitesse et son sens suivent ceux du défilement. */
export default function Marquee() {
  const { t, calm } = useSite();
  const base = useMotionValue(0);
  const direction = useRef(-1);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(base, (value) => `${wrap(-100 / COPIES, 0, value)}%`);

  useAnimationFrame((_, delta) => {
    if (calm) return;
    const boost = factor.get();
    if (boost < 0) direction.current = 1;
    else if (boost > 0) direction.current = -1;
    const move = direction.current * 1.6 * (delta / 1000) * (1 + Math.abs(boost));
    base.set(base.get() + move);
  });

  return (
    <div className="marquee" aria-hidden="true">
      <motion.div className="marquee-track" style={{ x }}>
        {Array.from({ length: COPIES }, (_, copy) => (
          <div className="marquee-group" key={copy}>
            {t.marquee.map((item, index) => (
              <span key={item} className={index % 2 ? "marquee-item is-outline" : "marquee-item"}>
                {item}
                <span className="marquee-sep">/</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
