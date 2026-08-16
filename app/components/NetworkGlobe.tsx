"use client";

import { useEffect, useRef } from "react";
import type { Globe } from "cobe";

const markers = [
  { location: [5.36, -4.01] as [number, number], size: 0.09 },
  { location: [6.52, 3.38] as [number, number], size: 0.045 },
  { location: [14.72, -17.47] as [number, number], size: 0.04 },
  { location: [48.86, 2.35] as [number, number], size: 0.04 },
];

const arcs = markers.slice(1).map((marker) => ({
  from: markers[0].location,
  to: marker.location,
}));

export default function NetworkGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<number | null>(null);
  const dragStartRef = useRef(0);
  const dragOffsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = window.innerWidth < 700 ? 1.1 : Math.min(1.5, window.devicePixelRatio || 1);
    let globe: Globe | undefined;
    let disposed = false;
    let initializing = false;
    let inViewport = false;
    let pageVisible = document.visibilityState === "visible";
    let frame = 0;
    let lastFrame = 0;
    let phi = 0.25;
    let size = canvas.getBoundingClientRect().width;

    const pixelSize = () => Math.max(1, Math.round(size * dpr));
    const stop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const render = (time: number) => {
      if (!globe || !inViewport || !pageVisible || reduced) {
        frame = 0;
        return;
      }

      if (time - lastFrame >= 32) {
        if (pointerRef.current === null) phi += 0.0027;
        globe.update({
          phi: phi + dragOffsetRef.current,
          width: pixelSize(),
          height: pixelSize(),
        });
        lastFrame = time;
      }

      frame = window.requestAnimationFrame(render);
    };

    const start = () => {
      if (frame || reduced || !globe || !inViewport || !pageVisible) return;
      frame = window.requestAnimationFrame(render);
    };

    const setup = async () => {
      if (initializing || globe || disposed) return;
      initializing = true;
      const { default: createGlobe } = await import("cobe");
      if (disposed) return;

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: pixelSize(),
        height: pixelSize(),
        phi,
        theta: 0.22,
        dark: 1,
        diffuse: 1.15,
        mapSamples: 9000,
        mapBrightness: 7,
        baseColor: [0.13, 0.18, 0.39],
        markerColor: [0.19, 0.35, 1],
        glowColor: [0.035, 0.045, 0.1],
        markers,
        arcs,
        arcColor: [0.19, 0.35, 1],
        arcWidth: 0.45,
        arcHeight: 0.18,
        markerElevation: 0.012,
      });

      initializing = false;
      start();
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        if (inViewport) {
          if (globe) start();
          else setup();
        } else {
          stop();
        }
      },
      { rootMargin: "180px 0px", threshold: 0.01 },
    );

    const resizeObserver = new ResizeObserver(([entry]) => {
      size = entry.contentRect.width;
      globe?.update({ width: pixelSize(), height: pixelSize() });
    });

    const onVisibilityChange = () => {
      pageVisible = document.visibilityState === "visible";
      if (pageVisible) start();
      else stop();
    };

    visibilityObserver.observe(canvas);
    resizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      disposed = true;
      stop();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      globe?.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="network-globe-canvas"
      aria-hidden="true"
      onPointerDown={(event) => {
        pointerRef.current = event.pointerId;
        dragStartRef.current = event.clientX - dragOffsetRef.current * 180;
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (pointerRef.current !== event.pointerId) return;
        dragOffsetRef.current = (event.clientX - dragStartRef.current) / 180;
      }}
      onPointerUp={(event) => {
        pointerRef.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      }}
      onPointerCancel={() => {
        pointerRef.current = null;
      }}
    />
  );
}
