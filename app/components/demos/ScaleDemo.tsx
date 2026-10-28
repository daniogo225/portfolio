"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Theme } from "../site/SiteProvider";
import { useSite } from "../site/SiteProvider";
import DemoFrame from "./DemoFrame";

// Modèle volontairement simple : chaque instance sert confortablement CAPACITY utilisateurs.
const CAPACITY = 150;
const MIN_USERS = 20;
const MAX_USERS = 600;
const MAX_INSTANCES = 4;

type State = "calm" | "busy" | "queued" | "dropped";

export function simulate(users: number, instances: number, queue: boolean) {
  const capacity = instances * CAPACITY;
  const load = users / capacity;
  const state: State = load <= 0.7 ? "calm" : load <= 1 ? "busy" : queue ? "queued" : "dropped";
  const dropRate = !queue && load > 1 ? 1 - capacity / users : 0;
  const wait = queue && load > 1 ? Math.min(2600, (load - 1) * 1600) : 0;
  return { load, state, dropRate, wait };
}

type Particle = {
  x: number;
  y: number;
  phase: 0 | 1 | 2 | 3;
  target: number;
  drop: boolean;
  until: number;
  slot: number;
  alpha: number;
  vy: number;
};

type Colors = { fg: string; muted: string; line: string; accent: string; danger: string; font: string };

function readColors(element: HTMLElement): Colors {
  const style = getComputedStyle(element);
  const get = (name: string) => style.getPropertyValue(name).trim();
  return {
    fg: get("--fg"),
    muted: get("--fg-muted"),
    line: get("--line-strong"),
    accent: get("--accent"),
    danger: get("--danger"),
    font: style.fontFamily,
  };
}

function Canvas({
  users,
  instances,
  queue,
  theme,
  calm,
  labels,
  description,
}: {
  users: number;
  instances: number;
  queue: boolean;
  theme: Theme;
  calm: boolean;
  labels: { balancer: string; instance: string };
  description: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const params = useRef({ users, instances, queue });

  useEffect(() => {
    params.current = { users, instances, queue };
  }, [users, instances, queue]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const ctx = context;
    const surface = canvas;
    let colors = readColors(surface);
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let visible = false;
    let last = performance.now();
    let spawnDebt = 0;
    let robin = 0;
    let fill = 0;
    const particles: Particle[] = [];

    function layout() {
      const n = params.current.instances;
      const boxX = width * 0.64;
      const boxW = width - boxX - 4;
      const gap = 10;
      const slotH = Math.min(52, (height - 24 - gap * (MAX_INSTANCES - 1)) / MAX_INSTANCES);
      const totalH = n * slotH + (n - 1) * gap;
      const top = (height - totalH) / 2;
      const boxes = Array.from({ length: n }, (_, index) => ({ x: boxX, y: top + index * (slotH + gap), w: boxW, h: slotH }));
      return { lbX: width * 0.4, midY: height / 2, queueX: width * 0.3, boxes };
    }

    function resize() {
      const rect = surface.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      surface.width = Math.round(width * ratio);
      surface.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function step(now: number, dt: number) {
      const { users: u, instances: n, queue: q } = params.current;
      const model = simulate(u, n, q);
      const geo = layout();
      fill += (Math.min(model.load, 1.25) - fill) * Math.min(1, dt / 260);

      spawnDebt += (0.15 + (u / MAX_USERS) * 0.85) * 64 * (dt / 1000);
      while (spawnDebt >= 1 && particles.length < 260) {
        spawnDebt -= 1;
        particles.push({
          x: -4,
          y: height * (0.12 + Math.random() * 0.76),
          phase: 0,
          target: robin++ % n,
          drop: Math.random() < model.dropRate,
          until: 0,
          slot: 0,
          alpha: 1,
          vy: 0,
        });
      }

      let queued = 0;
      const speed = 0.26 * dt;
      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const p = particles[index];
        if (p.target >= n) p.target = p.target % n;
        if (p.phase === 0) {
          // Vers le répartiteur.
          const ty = geo.midY + (p.y - geo.midY) * 0.25;
          const dx = geo.lbX - p.x;
          p.x += Math.min(speed, dx);
          p.y += (ty - p.y) * 0.08;
          if (dx <= 1) {
            if (p.drop) p.phase = 3;
            else if (model.wait > 0) {
              p.phase = 1;
              p.until = now + model.wait * (0.6 + Math.random() * 0.8);
            } else p.phase = 2;
          }
        } else if (p.phase === 1) {
          // En file : les requêtes s’empilent devant le répartiteur.
          p.slot = queued++;
          const column = Math.floor(p.slot / 9);
          const tx = geo.queueX - column * 7;
          const ty = geo.midY - 32 + (p.slot % 9) * 8;
          p.x += (tx - p.x) * 0.2;
          p.y += (ty - p.y) * 0.2;
          if (now >= p.until || !params.current.queue) p.phase = 2;
        } else if (p.phase === 2) {
          const box = geo.boxes[p.target];
          const tx = box.x + 6;
          const ty = box.y + box.h / 2 + ((index % 5) - 2) * 4;
          const dx = tx - p.x;
          const dy = ty - p.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 3) {
            particles.splice(index, 1);
            continue;
          }
          const move = Math.min(speed * 1.2, distance);
          p.x += (dx / distance) * move;
          p.y += (dy / distance) * move;
        } else {
          // Rejetée : la requête tombe et s’efface.
          p.vy += 0.012 * dt;
          p.y += p.vy;
          p.x += speed * 0.4;
          p.alpha -= dt / 700;
          if (p.alpha <= 0) particles.splice(index, 1);
        }
      }
    }

    function draw() {
      const { users: u, instances: n, queue: q } = params.current;
      const model = simulate(u, n, q);
      const geo = layout();
      ctx.clearRect(0, 0, width, height);
      ctx.font = `500 11px ${colors.font}`;
      ctx.textBaseline = "middle";

      // Répartiteur.
      ctx.fillStyle = colors.fg;
      ctx.fillRect(geo.lbX - 1.5, geo.midY - 46, 3, 92);
      ctx.fillStyle = colors.muted;
      ctx.textAlign = "center";
      ctx.fillText(labels.balancer.toUpperCase(), geo.lbX, geo.midY + 62);

      // Liaisons vers les instances.
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const box of geo.boxes) {
        ctx.moveTo(geo.lbX + 2, geo.midY);
        ctx.bezierCurveTo(geo.lbX + (box.x - geo.lbX) * 0.5, geo.midY, geo.lbX + (box.x - geo.lbX) * 0.5, box.y + box.h / 2, box.x, box.y + box.h / 2);
      }
      ctx.stroke();

      // Instances et leur charge.
      const level = calm ? Math.min(model.load, 1.25) : fill;
      const tone = model.state === "dropped" ? colors.danger : model.state === "calm" ? colors.fg : colors.accent;
      geo.boxes.forEach((box, index) => {
        ctx.strokeStyle = colors.line;
        ctx.strokeRect(box.x + 0.5, box.y + 0.5, box.w - 1, box.h - 1);
        ctx.fillStyle = tone;
        ctx.globalAlpha = 0.9;
        ctx.fillRect(box.x + 4, box.y + box.h - 7, (box.w - 8) * Math.min(level, 1), 3);
        ctx.globalAlpha = 1;
        ctx.fillStyle = colors.fg;
        ctx.textAlign = "left";
        ctx.fillText(`${labels.instance.toUpperCase()} ${index + 1}`, box.x + 12, box.y + box.h / 2 - 3);
      });

      for (const p of particles) {
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.phase === 3 ? colors.danger : p.phase === 1 ? colors.accent : colors.fg;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function tick(now: number) {
      const dt = Math.min(48, now - last);
      last = now;
      step(now, dt);
      draw();
      frame = requestAnimationFrame(tick);
    }

    function sync() {
      const shouldRun = !calm && visible && !document.hidden;
      if (shouldRun && !running) {
        running = true;
        last = performance.now();
        frame = requestAnimationFrame(tick);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
      if (!running) draw();
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    resize();
    colors = readColors(surface);
    draw();
    resizeObserver.observe(surface);
    intersection.observe(surface);
    document.addEventListener("visibilitychange", sync);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [theme, calm, labels.balancer, labels.instance]);

  return <canvas ref={canvasRef} className="scale-canvas" role="img" aria-label={description} />;
}

export default function ScaleDemo() {
  const { t, theme, calm } = useSite();
  const copy = t.demos.scale;
  const [users, setUsers] = useState(240);
  const [instances, setInstances] = useState(1);
  const [queue, setQueue] = useState(false);
  const id = useId();
  const model = simulate(users, instances, queue);
  const percent = Math.round(model.load * 100);
  const status = copy.status[model.state];

  return (
    <DemoFrame label={copy.label} note={copy.note} className="scale-demo">
      <div className="scale">
        {/* Sans animation, le canvas est recréé à chaque réglage pour redessiner l’image fixe. */}
        <Canvas
          key={calm ? `${users}-${instances}-${queue}` : "live"}
          users={users}
          instances={instances}
          queue={queue}
          theme={theme}
          calm={calm}
          labels={{ balancer: copy.balancer, instance: copy.instance }}
          description={`${copy.users} : ${users}. ${copy.instances} : ${instances}. ${status}`}
        />

        <div className="scale-readout" data-state={model.state}>
          <p className="scale-load">
            <span className="mono">{copy.load}</span>
            <strong>{percent} %</strong>
          </p>
          <p className="scale-status" aria-live="polite">
            {status}
          </p>
        </div>

        <div className="scale-controls">
          <div className="scale-range">
            <label htmlFor={`${id}-users`} className="mono">
              {copy.users}
            </label>
            <output htmlFor={`${id}-users`}>{users}</output>
            <input
              id={`${id}-users`}
              type="range"
              min={MIN_USERS}
              max={MAX_USERS}
              step={10}
              value={users}
              onChange={(event) => setUsers(Number(event.target.value))}
            />
          </div>
          <div className="scale-row">
            <div className="scale-field">
              <span id={`${id}-instances`} className="mono">
                {copy.instances}
              </span>
              <div className="scale-segment" role="radiogroup" aria-labelledby={`${id}-instances`}>
                {Array.from({ length: MAX_INSTANCES }, (_, index) => index + 1).map((count) => (
                  <button key={count} type="button" role="radio" aria-checked={instances === count} onClick={() => setInstances(count)}>
                    {count}
                  </button>
                ))}
              </div>
            </div>
            <div className="scale-field">
              <span id={`${id}-queue`} className="mono">
                {copy.queue}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={queue}
                aria-labelledby={`${id}-queue`}
                className="switch"
                onClick={() => setQueue((value) => !value)}
              >
                <span className="switch-track" aria-hidden="true">
                  <span className="switch-thumb" />
                </span>
                <span>{queue ? copy.on : copy.off}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
