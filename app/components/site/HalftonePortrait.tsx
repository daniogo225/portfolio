"use client";

import { useEffect, useRef } from "react";
import type { Theme } from "./SiteProvider";

const SOURCE = "/portraits/daniogo-halftone.webp";
const TAU = Math.PI * 2;
// Position approximative du visage dans l’image source, point de départ de l’onde d’apparition.
const FACE = { x: 0.45, y: 0.27 };

let cachedImage: HTMLImageElement | null = null;

type Rgb = [number, number, number];

function parseColor(value: string, fallback: Rgb): Rgb {
  const hex = value.trim().replace("#", "");
  if (/^[0-9a-f]{6}$/i.test(hex)) {
    return [0, 2, 4].map((start) => parseInt(hex.slice(start, start + 2), 16)) as Rgb;
  }
  return fallback;
}

function mix(a: Rgb, b: Rgb, amount: number) {
  const channel = (index: number) => Math.round(a[index] + (b[index] - a[index]) * amount);
  return `rgb(${channel(0)} ${channel(1)} ${channel(2)})`;
}

const easeOut = (value: number) => 1 - Math.pow(1 - value, 3);

/**
 * Portrait reconstruit en trame de points. Les points se rassemblent au chargement,
 * s’écartent sous le pointeur et prennent la couleur d’accent. Un appui crée une onde.
 */
export default function HalftonePortrait({
  theme,
  calm,
  label,
}: {
  theme: Theme;
  calm: boolean;
  label: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introPlayed = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const ctx = context;
    const surface = canvas;

    let disposed = false;
    let frame = 0;
    let running = false;
    let visible = true;
    let width = 0;
    let height = 0;
    let count = 0;
    let maxDelay = 0;
    let hx = new Float32Array(0);
    let hy = new Float32Array(0);
    let x = new Float32Array(0);
    let y = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let size = new Float32Array(0);
    let heat = new Float32Array(0);
    let delay = new Float32Array(0);
    let subject = new Uint8Array(0);
    let dim = new Uint8Array(0);
    let bucket = new Uint8Array(0);
    let palette: string[] = [];
    let faint = "";
    let shade = "";
    const pointer = { x: -1e4, y: -1e4, speed: 0, inside: false };
    const pulses: { x: number; y: number; start: number }[] = [];
    const playIntro = !introPlayed.current && !calm;
    // Sans intro (changement de thème, redimensionnement), les points apparaissent directement à leur place.
    let start = performance.now() - (playIntro ? 0 : 1e6);

    function readColors() {
      const style = getComputedStyle(surface);
      const dark = theme === "dark";
      const fg = parseColor(style.getPropertyValue("--fg"), dark ? [237, 237, 234] : [18, 18, 17]);
      const accent = parseColor(style.getPropertyValue("--accent"), [255, 107, 26]);
      palette = [0, 0.3, 0.68, 1].map((amount) => mix(fg, accent, amount));
      faint = `rgb(${fg[0]} ${fg[1]} ${fg[2]} / ${dark ? 0.2 : 0.22})`;
      shade = `rgb(${fg[0]} ${fg[1]} ${fg[2]} / ${dark ? 0.62 : 0.7})`;
    }

    function build(image: HTMLImageElement) {
      const rect = surface.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (!width || !height) return false;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      surface.width = Math.round(width * ratio);
      surface.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const step = width < 420 ? 5.8 : width < 640 ? 6.2 : 6.8;
      const cols = Math.floor(width / step);
      const rows = Math.floor(height / step);
      const originX = (width - cols * step) / 2 + step / 2;
      const originY = (height - rows * step) / 2 + step / 2;

      // L’image est ajustée dans le canvas, alignée en bas, puis échantillonnée à raison d’un pixel par point.
      const scale = Math.min(width / image.naturalWidth, (height * 0.98) / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const left = (width - drawWidth) / 2;
      const top = height - drawHeight;
      const sample = document.createElement("canvas");
      sample.width = cols;
      sample.height = rows;
      const sampleCtx = sample.getContext("2d", { willReadFrequently: true });
      if (!sampleCtx) return false;
      sampleCtx.imageSmoothingQuality = "high";
      sampleCtx.drawImage(
        image,
        (left - originX + step / 2) / step,
        (top - originY + step / 2) / step,
        drawWidth / step,
        drawHeight / step,
      );
      const pixels = sampleCtx.getImageData(0, 0, cols, rows).data;

      // Étire le contraste sur les seuls pixels du sujet pour garder du relief dans le visage.
      const tones: number[] = [];
      for (let index = 0; index < cols * rows; index += 1) {
        const offset = index * 4;
        if (pixels[offset + 3] > 128) {
          tones.push((0.2126 * pixels[offset] + 0.7152 * pixels[offset + 1] + 0.0722 * pixels[offset + 2]) / 255);
        }
      }
      tones.sort((a, b) => a - b);
      const low = tones[Math.floor(tones.length * 0.04)] ?? 0;
      const high = tones[Math.floor(tones.length * 0.985)] ?? 1;

      count = cols * rows;
      hx = new Float32Array(count);
      hy = new Float32Array(count);
      x = new Float32Array(count);
      y = new Float32Array(count);
      vx = new Float32Array(count);
      vy = new Float32Array(count);
      size = new Float32Array(count);
      heat = new Float32Array(count);
      delay = new Float32Array(count);
      subject = new Uint8Array(count);
      dim = new Uint8Array(count);
      bucket = new Uint8Array(count);

      const maxRadius = step * 0.48;
      const faceX = left + FACE.x * drawWidth;
      const faceY = top + FACE.y * drawHeight;
      maxDelay = 0;

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const index = row * cols + col;
          const offset = index * 4;
          const alpha = pixels[offset + 3] / 255;
          const px = originX + col * step;
          const py = originY + row * step;
          hx[index] = px;
          hy[index] = py;
          if (alpha > 0.1) {
            const tone =
              (0.2126 * pixels[offset] + 0.7152 * pixels[offset + 1] + 0.0722 * pixels[offset + 2]) / 255;
            const normalized = Math.min(1, Math.max(0, (tone - low) / Math.max(0.001, high - low)));
            const weight = theme === "dark" ? normalized : 1 - normalized;
            size[index] = maxRadius * Math.min(1, alpha * 1.15) * (0.36 + 0.64 * Math.pow(weight, 0.75));
            subject[index] = 1;
            // Les zones peu marquées (vêtements, ombres) sont atténuées pour faire ressortir le visage.
            dim[index] = weight < 0.2 ? 1 : 0;
          } else {
            size[index] = 0.62;
          }
          if (playIntro) {
            const distance = Math.hypot(px - faceX, py - faceY);
            delay[index] = distance * 1.15 + Math.random() * 140;
            const angle = Math.random() * TAU;
            const spread = 18 + Math.random() * 46;
            x[index] = px + Math.cos(angle) * spread;
            y[index] = py + Math.sin(angle) * spread;
            maxDelay = Math.max(maxDelay, delay[index]);
          } else {
            x[index] = px;
            y[index] = py;
          }
        }
      }
      return true;
    }

    function simulate(now: number, elapsed: number) {
      const radius = width < 520 ? 64 : 92;
      const radiusSquared = radius * radius;
      const boost = 1 + Math.min(pointer.speed, 40) / 32;
      pointer.speed *= 0.86;
      // Bande de balayage lente, comme un scanner qui relit le portrait.
      const scanY = (((elapsed / 5600) % 1.5) - 0.25) * height;

      for (let index = 0; index < count; index += 1) {
        if (elapsed < delay[index]) continue;
        let ax = (hx[index] - x[index]) * 0.052;
        let ay = (hy[index] - y[index]) * 0.052;

        if (pointer.inside) {
          const dx = x[index] - pointer.x;
          const dy = y[index] - pointer.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared < radiusSquared && distanceSquared > 0.01) {
            const distance = Math.sqrt(distanceSquared);
            const force = (1 - distance / radius) ** 2;
            ax += (dx / distance) * force * 2.2 * boost;
            ay += (dy / distance) * force * 2.2 * boost;
            heat[index] = Math.max(heat[index], force * 1.25);
          }
        }

        for (const pulse of pulses) {
          const age = now - pulse.start;
          const ring = age * 0.75;
          const dx = x[index] - pulse.x;
          const dy = y[index] - pulse.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          const gap = Math.abs(distance - ring);
          if (gap < 34) {
            const force = (1 - gap / 34) * Math.max(0, 1 - age / 1400);
            ax += (dx / distance) * force * 2.4;
            ay += (dy / distance) * force * 2.4;
            heat[index] = Math.max(heat[index], force);
          }
        }

        if (subject[index]) {
          const band = Math.abs(hy[index] - scanY);
          if (band < 20) heat[index] = Math.max(heat[index], (1 - band / 20) * 0.3);
        }

        vx[index] = (vx[index] + ax) * 0.8;
        vy[index] = (vy[index] + ay) * 0.8;
        x[index] += vx[index];
        y[index] += vy[index];
        heat[index] *= 0.93;
      }

      for (let index = pulses.length - 1; index >= 0; index -= 1) {
        if (now - pulses[index].start > 1400) pulses.splice(index, 1);
      }
    }

    function draw(elapsed: number, still: boolean) {
      ctx.clearRect(0, 0, width, height);
      for (let index = 0; index < count; index += 1) {
        const h = still ? 0 : heat[index];
        bucket[index] = h < 0.08 ? 0 : h < 0.38 ? 1 : h < 0.7 ? 2 : 3;
      }

      ctx.fillStyle = faint;
      ctx.beginPath();
      for (let index = 0; index < count; index += 1) {
        if (subject[index] || bucket[index] !== 0) continue;
        if (!still && elapsed < delay[index]) continue;
        const grow = still ? 1 : easeOut(Math.min(1, (elapsed - delay[index]) / 650));
        const r = size[index] * grow;
        ctx.moveTo(x[index] + r, y[index]);
        ctx.arc(x[index], y[index], r, 0, TAU);
      }
      ctx.fill();

      // Niveau -1 : points atténués du sujet, puis quatre niveaux du texte vers l’accent.
      for (let level = -1; level < 4; level += 1) {
        ctx.fillStyle = level < 0 ? shade : palette[level];
        ctx.beginPath();
        for (let index = 0; index < count; index += 1) {
          const target = bucket[index] === 0 && dim[index] ? -1 : bucket[index];
          if (target !== level) continue;
          if (level <= 0 && !subject[index]) continue;
          if (!still && elapsed < delay[index]) continue;
          const grow = still ? 1 : easeOut(Math.min(1, (elapsed - delay[index]) / 650));
          const h = still ? 0 : heat[index];
          const base = subject[index] ? size[index] * (1 + h * 0.45) : size[index] + h * 1.7;
          const r = base * grow;
          if (r < 0.2) continue;
          ctx.moveTo(x[index] + r, y[index]);
          ctx.arc(x[index], y[index], r, 0, TAU);
        }
        ctx.fill();
      }
    }

    function tick(now: number) {
      if (disposed) return;
      const elapsed = now - start;
      simulate(now, elapsed);
      draw(elapsed, false);
      if (!introPlayed.current && elapsed > maxDelay + 700) introPlayed.current = true;
      frame = requestAnimationFrame(tick);
    }

    function sync() {
      const shouldRun = !calm && visible && !document.hidden && count > 0;
      if (shouldRun && !running) {
        running = true;
        frame = requestAnimationFrame(tick);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    }

    function setup(image: HTMLImageElement) {
      if (disposed) return;
      readColors();
      if (!build(image)) return;
      if (calm) {
        draw(0, true);
        introPlayed.current = true;
      } else {
        draw(performance.now() - start, false);
      }
      sync();
    }

    function locate(event: PointerEvent) {
      const rect = surface.getBoundingClientRect();
      return { px: event.clientX - rect.left, py: event.clientY - rect.top };
    }

    function move(event: PointerEvent) {
      const { px, py } = locate(event);
      if (pointer.inside) pointer.speed = Math.max(pointer.speed, Math.hypot(px - pointer.x, py - pointer.y));
      pointer.x = px;
      pointer.y = py;
      pointer.inside = true;
    }

    function leave() {
      pointer.inside = false;
    }

    function press(event: PointerEvent) {
      const { px, py } = locate(event);
      pulses.push({ x: px, y: py, start: performance.now() });
      if (pulses.length > 4) pulses.shift();
    }

    let resizeFrame = 0;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        const image = cachedImage;
        if (!image || disposed) return;
        const rect = surface.getBoundingClientRect();
        if (Math.abs(rect.width - width) < 1 && Math.abs(rect.height - height) < 1) return;
        start = performance.now() - (introPlayed.current ? 1e6 : 0);
        setup(image);
      });
    });

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });

    if (cachedImage) setup(cachedImage);
    else {
      const image = new Image();
      image.src = SOURCE;
      image
        .decode()
        .then(() => {
          cachedImage = image;
          if (playIntro) start = performance.now();
          setup(image);
        })
        .catch(() => {
          /* Sans image, la zone reste vide : le reste de la page fonctionne. */
        });
    }

    resizeObserver.observe(surface);
    intersection.observe(surface);
    document.addEventListener("visibilitychange", sync);
    if (!calm) {
      surface.addEventListener("pointermove", move);
      surface.addEventListener("pointerleave", leave);
      surface.addEventListener("pointercancel", leave);
      surface.addEventListener("pointerdown", press);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(resizeFrame);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", sync);
      surface.removeEventListener("pointermove", move);
      surface.removeEventListener("pointerleave", leave);
      surface.removeEventListener("pointercancel", leave);
      surface.removeEventListener("pointerdown", press);
    };
  }, [theme, calm]);

  return <canvas ref={canvasRef} className="halftone" role="img" aria-label={label} />;
}
