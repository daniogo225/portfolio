"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setVisible(true);

    const lerp = { x: -100, y: -100 };
    const speed = 0.15;

    const animate = () => {
      lerp.x += (posRef.current.x - lerp.x) * speed;
      lerp.y += (posRef.current.y - lerp.y) * speed;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${lerp.x}px, ${lerp.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-hover]"));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{ willChange: "transform" }}
    >
      <div
        className="rounded-full bg-white transition-all duration-300 ease-out"
        style={{
          width: hovering ? 48 : 10,
          height: hovering ? 48 : 10,
          marginLeft: hovering ? -24 : -5,
          marginTop: hovering ? -24 : -5,
          opacity: hovering ? 0.4 : 1,
        }}
      />
    </div>
  );
}
