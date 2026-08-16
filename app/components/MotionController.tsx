"use client";

import { useEffect } from "react";

export default function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-word-reveal]"),
    );

    root.classList.add("motion-ready");
    const introFrame = window.requestAnimationFrame(() => root.classList.add("intro-ready"));

    let observer: IntersectionObserver | undefined;
    if (reduced) {
      revealTargets.forEach((element) => element.classList.add("is-visible"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            (entry.target as HTMLElement).classList.add("is-visible");
            observer?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -9%", threshold: 0.06 },
      );
      revealTargets.forEach((element) => observer?.observe(element));
    }

    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(introFrame);
      root.classList.remove("motion-ready", "intro-ready");
    };
  }, []);

  return null;
}
