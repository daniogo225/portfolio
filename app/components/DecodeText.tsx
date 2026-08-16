"use client";

import { useEffect, useRef } from "react";

const glyphs = "01{}[]<>/\\+=*#_";

type DecodeTextProps = {
  text: string;
  className?: string;
  delay?: number;
  eager?: boolean;
};

export default function DecodeText({
  text,
  className,
  delay = 0,
  eager = false,
}: DecodeTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    element.textContent = text;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let timeout = 0;
    let started = false;
    let observer: IntersectionObserver | undefined;

    const run = () => {
      if (started) return;
      started = true;

      timeout = window.setTimeout(() => {
        const duration = Math.min(980, Math.max(620, text.length * 13));
        const start = performance.now();

        const update = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const revealed = Math.floor(text.length * Math.pow(progress, 1.65));

          element.textContent = Array.from(text)
            .map((character, index) => {
              if (index < revealed || !/[\p{L}\p{N}]/u.test(character)) return character;
              return glyphs[(Math.floor(now / 34) + index * 7) % glyphs.length];
            })
            .join("");

          if (progress < 1) frame = window.requestAnimationFrame(update);
          else element.textContent = text;
        };

        frame = window.requestAnimationFrame(update);
      }, delay);
    };

    if (eager) {
      run();
    } else {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer?.disconnect();
          run();
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
  }, [delay, eager, text]);

  return (
    <span className={className} aria-label={text}>
      <span ref={textRef} aria-hidden="true">
        {text}
      </span>
    </span>
  );
}
