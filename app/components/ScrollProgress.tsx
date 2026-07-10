"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const root = document.documentElement;
      const total = root.scrollHeight - root.clientHeight;
      setProgress(total > 0 ? root.scrollTop / total : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed right-0 top-0 z-[70] h-screen w-[3px] bg-transparent" aria-hidden>
      <div
        className="w-full origin-top bg-accent"
        style={{
          height: "100%",
          transform: `scaleY(${progress})`,
          transition: "transform 90ms linear",
        }}
      />
    </div>
  );
}
