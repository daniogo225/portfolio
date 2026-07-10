"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let frame = 0;
    let currentX = -40;
    let currentY = -40;
    let targetX = -40;
    let targetY = -40;

    const render = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      frame = requestAnimationFrame(render);
    };

    const move = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.dataset.visible = "true";
    };

    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      cursor.dataset.active = target.closest("a, button, [data-hover]") ? "true" : "false";
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden
      data-visible="false"
      data-active="false"
      className="fixed left-0 top-0 z-[90] hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent pointer-events-none opacity-0 transition-[width,height,opacity,background-color] duration-300 data-[visible=true]:opacity-100 data-[active=true]:h-12 data-[active=true]:w-12 data-[active=true]:bg-accent/15 lg:block"
    />
  );
}
