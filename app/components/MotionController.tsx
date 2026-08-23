"use client";

import { useEffect } from "react";

export default function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");
    const introFrame = window.requestAnimationFrame(() => root.classList.add("intro-ready"));

    return () => {
      window.cancelAnimationFrame(introFrame);
      root.classList.remove("motion-ready", "intro-ready");
    };
  }, []);

  return null;
}
