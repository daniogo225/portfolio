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

    const progress = document.querySelector<HTMLElement>("[data-progress]");
    let previousY = 0;
    let ticking = false;
    let scrollFrame = 0;

    const updateScrollState = () => {
      const currentY = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress?.style.setProperty("transform", `scaleX(${Math.min(1, currentY / max)})`);

      if (currentY > 140 && currentY > previousY + 5) root.classList.add("header-is-hidden");
      if (currentY < previousY - 5 || currentY < 80) root.classList.remove("header-is-hidden");

      previousY = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      scrollFrame = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(introFrame);
      window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", onScroll);
      root.classList.remove("motion-ready", "intro-ready", "header-is-hidden");
    };
  }, []);

  return null;
}
