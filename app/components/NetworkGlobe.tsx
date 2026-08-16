"use client";

import { useEffect, useRef } from "react";

const markers = [
  { location: [5.36, -4.01] as [number, number], size: 0.09 },
  { location: [6.52, 3.38] as [number, number], size: 0.05 },
  { location: [14.72, -17.47] as [number, number], size: 0.045 },
  { location: [48.86, 2.35] as [number, number], size: 0.045 },
  { location: [-1.29, 36.82] as [number, number], size: 0.04 },
];

const arcs = [
  { from: [5.36, -4.01] as [number, number], to: [6.52, 3.38] as [number, number] },
  { from: [5.36, -4.01] as [number, number], to: [14.72, -17.47] as [number, number] },
  { from: [5.36, -4.01] as [number, number], to: [48.86, 2.35] as [number, number] },
  { from: [5.36, -4.01] as [number, number], to: [-1.29, 36.82] as [number, number] },
];

export default function NetworkGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef(0);
  const pointerRef = useRef<number | null>(null);
  const dragStartRef = useRef(0);
  const dragOffsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let frame = 0;
    let destroy = () => {};
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new ResizeObserver(([entry]) => {
      sizeRef.current = entry.contentRect.width;
    });
    observer.observe(canvas);

    const setup = async () => {
      const { default: createGlobe } = await import("cobe");
      if (disposed) return;

      let phi = 0.25;
      sizeRef.current = canvas.getBoundingClientRect().width;
      const globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(2, window.devicePixelRatio || 1),
        width: Math.max(1, sizeRef.current * 2),
        height: Math.max(1, sizeRef.current * 2),
        phi,
        theta: 0.22,
        dark: 1,
        diffuse: 1.35,
        mapSamples: 20000,
        mapBrightness: 8,
        baseColor: [0.12, 0.17, 0.42],
        markerColor: [0.19, 0.35, 1],
        glowColor: [0.05, 0.07, 0.16],
        markers,
        arcs,
        arcColor: [0.19, 0.35, 1],
        arcWidth: 0.55,
        arcHeight: 0.22,
        markerElevation: 0.015,
      });

      const render = () => {
        if (!reduced && pointerRef.current === null) phi += 0.0024;
        globe.update({
          phi: phi + dragOffsetRef.current,
          width: Math.max(1, sizeRef.current * 2),
          height: Math.max(1, sizeRef.current * 2),
        });
        frame = window.requestAnimationFrame(render);
      };

      frame = window.requestAnimationFrame(render);
      destroy = () => {
        window.cancelAnimationFrame(frame);
        globe.destroy();
      };
    };

    setup();
    return () => {
      disposed = true;
      observer.disconnect();
      destroy();
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
        event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={() => {
        pointerRef.current = null;
      }}
    />
  );
}
