"use client";

import { useEffect } from "react";

export default function GsapController() {
  useEffect(() => {
    let cleanup = () => {};

    const setup = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set("[data-reveal], [data-hero-line], [data-hero-meta], [data-portrait]", {
          clearProps: "all",
        });
        return;
      }

      const context = gsap.context(() => {
        const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
        intro
          .from("[data-hero-meta]", { opacity: 0, y: 14, duration: 0.8 })
          .from(
            "[data-hero-line]",
            { yPercent: 112, rotate: 1.5, duration: 1.15, stagger: 0.1 },
            "-=0.45",
          )
          .from(
            "[data-portrait]",
            { clipPath: "inset(100% 0 0 0)", y: 36, duration: 1.25 },
            "-=0.9",
          )
          .from("[data-hero-copy]", { opacity: 0, y: 24, duration: 0.9 }, "-=0.65");

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 54 },
            {
              opacity: 1,
              y: 0,
              duration: 1.05,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 86%", once: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-word-reveal]").forEach((element) => {
          gsap.from(element.children, {
            yPercent: 115,
            duration: 1,
            stagger: 0.045,
            ease: "power4.out",
            scrollTrigger: { trigger: element, start: "top 82%", once: true },
          });
        });

        gsap.to("[data-portrait-parallax]", {
          yPercent: 9,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-profile-photo]",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-scan]").forEach((element) => {
          gsap.fromTo(
            element,
            { yPercent: -20 },
            {
              yPercent: 620,
              ease: "none",
              scrollTrigger: {
                trigger: element.parentElement,
                start: "top 85%",
                end: "bottom 15%",
                scrub: 0.4,
              },
            },
          );
        });

        gsap.to("[data-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.15 },
        });
      });

      cleanup = () => {
        context.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    };

    setup();
    return () => cleanup();
  }, []);

  return null;
}
