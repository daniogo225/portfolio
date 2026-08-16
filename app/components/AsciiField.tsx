"use client";

import { useEffect, useRef } from "react";

const rows = [
  "01010110  PRODUCT::SYSTEM  00110100",
  "[INPUT]     PEOPLE + CONTEXT + TIME",
  "     ┌────────────────────────────┐",
  "     │  OBSERVE / FRAME / DECIDE  │",
  "0110 │  BUILD   TEST   OPERATE    │ 10",
  "     │  SIGNAL > NOISE            │",
  "     └────────────────────────────┘",
  "WEB::MOBILE::AI::OPS::WEB::MOBILE",
  "{ reliability: true, ego: false }",
  "11001010  ABIDJAN::UTC+0  10110101",
];

export default function AsciiField() {
  const fieldRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let last = 0;
    const chars = "01<>/{}[]+=*";
    const source = rows.join("\n");

    const tick = (time: number) => {
      if (time - last > 100) {
        const position = frame % source.length;
        field.textContent = source
          .split("")
          .map((character, index) => {
            if (character === "\n" || character === " ") return character;
            if (index === position || index === (position * 7) % source.length) {
              return chars[(frame + index) % chars.length];
            }
            return character;
          })
          .join("");
        frame += 1;
        last = time;
      }
      requestId = window.requestAnimationFrame(tick);
    };

    let requestId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(requestId);
  }, []);

  return (
    <pre ref={fieldRef} className="ascii-field" aria-hidden="true">
      {rows.join("\n")}
    </pre>
  );
}
