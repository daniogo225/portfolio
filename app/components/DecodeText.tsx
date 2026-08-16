"use client";

import { useEffect, useRef } from "react";

const glyphs = "01{}[]<>/\\+=*#_";
const alphaNumeric = /[\p{L}\p{N}]/u;

type DecodeTextProps = {
  text: string;
  className?: string;
  delay?: number;
  eager?: boolean;
  loop?: boolean;
};

export default function DecodeText({
  text,
  className,
  delay = 0,
  eager = false,
  loop = false,
}: DecodeTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    element.textContent = text;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const characters = Array.from(text);
    let frame = 0;
    let timeout = 0;
    let started = false;
    let visible = eager;
    let cycleScheduled = false;
    let observer: IntersectionObserver | undefined;

    const run = (nextDelay = delay) => {
      if (!visible || cycleScheduled) return;
      cycleScheduled = true;
      timeout = window.setTimeout(() => {
        const duration = Math.min(980, Math.max(620, text.length * 13));
        const start = performance.now();

        const update = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const revealed = Math.floor(text.length * Math.pow(progress, 1.65));

          element.textContent = characters
            .map((character, index) => {
              if (index < revealed || !alphaNumeric.test(character)) return character;
              return glyphs[(Math.floor(now / 34) + index * 7) % glyphs.length];
            })
            .join("");

          if (progress < 1) frame = window.requestAnimationFrame(update);
          else {
            element.textContent = text;
            cycleScheduled = false;
            if (loop && visible) run(2200);
          }
        };

        frame = window.requestAnimationFrame(update);
      }, nextDelay);
    };

    if (eager) {
      started = true;
      run();
    }

    if (loop || !eager) {
      observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (!visible) {
            window.clearTimeout(timeout);
            window.cancelAnimationFrame(frame);
            cycleScheduled = false;
            element.textContent = text;
            return;
          }

          if (!started) started = true;
          run(loop ? 450 : delay);
        },
        { rootMargin: "0px 0px -12%", threshold: 0.08 },
      );
      observer.observe(element);
    }

    return () => {
      observer?.disconnect();
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frame);
    };
  }, [delay, eager, loop, text]);

  return (
    <span className={className} aria-label={text}>
      <span ref={textRef} aria-hidden="true">
        {text}
      </span>
    </span>
  );
}
