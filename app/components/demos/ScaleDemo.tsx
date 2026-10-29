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
// Historique de la charge : un point toutes les 100 ms, sur 12 secondes.
const SAMPLE_MS = 100;
const SAMPLES = 120;
// Échelle verticale du graphique : en racine carrée jusqu’à 400 %, la capacité tombe à mi-hauteur.
const CHART_MAX = 4;

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
  y0: number;
  phase: 0 | 1 | 2 | 3;
  target: number;
  drop: boolean;
  until: number;
  t: number;
  alpha: number;
  vx: number;
  vy: number;
};

type Colors = { fg: string; muted: string; line: string; strong: string; accent: string; bg: string; sans: string; mono: string };

function readColors(element: HTMLElement): Colors {
  const style = getComputedStyle(element);
  const get = (name: string) => style.getPropertyValue(name).trim();
  return {
    fg: get("--fg"),
    muted: get("--fg-muted"),
    line: get("--line"),
    strong: get("--line-strong"),
    accent: get("--accent"),
    bg: get("--bg"),
    sans: style.fontFamily,
    mono: get("--font-mono") || "monospace",
  };
}

function bezier(a: number, b: number, c: number, d: number, t: number) {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
}

function smooth(t: number) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
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
  labels: { balancer: string; instance: string; idle: string; history: string; capacity: string };
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
    let sampleClock = 0;
    let spin = 0;
    const start = simulate(params.current.users, params.current.instances, params.current.queue);
    let fill = Math.min(start.load, CHART_MAX);
    const history: number[] = Array.from({ length: SAMPLES }, () => fill);
    const flashes = Array.from({ length: MAX_INSTANCES }, () => 0);
    const particles: Particle[] = [];

    function layout() {
      const narrow = width < 520;
      const chartH = narrow ? 92 : 104;
      const flowH = height - chartH;
      const lbX = width * (narrow ? 0.3 : 0.34);
      const midY = flowH / 2;
      const ringX = width * (narrow ? 0.6 : 0.66);
      const slotH = (flowH - 12) / MAX_INSTANCES;
      const radius = Math.min(17, slotH * 0.34);
      const rings = Array.from({ length: MAX_INSTANCES }, (_, index) => ({ x: ringX, y: 6 + slotH * (index + 0.5), r: radius }));
      return { flowH, chartH, lbX, midY, rings };
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

    // Trajet du répartiteur vers une instance : une courbe en S.
    function route(geo: ReturnType<typeof layout>, index: number) {
      const ring = geo.rings[index];
      const x0 = geo.lbX + 16;
      const x3 = ring.x - ring.r - 4;
      return { x0, y0: geo.midY, x1: x0 + (x3 - x0) * 0.5, y1: geo.midY, x2: x0 + (x3 - x0) * 0.5, y2: ring.y, x3, y3: ring.y };
    }

    function step(now: number, dt: number) {
      const { users: u, instances: n, queue: q } = params.current;
      const model = simulate(u, n, q);
      const geo = layout();
      fill += (Math.min(model.load, CHART_MAX) - fill) * Math.min(1, dt / 320);
      spin += dt * (model.state === "calm" ? 0.0015 : 0.004);
      for (let index = 0; index < flashes.length; index += 1) flashes[index] = Math.max(0, flashes[index] - dt / 380);

      sampleClock += dt;
      while (sampleClock >= SAMPLE_MS) {
        sampleClock -= SAMPLE_MS;
        history.push(fill);
        history.shift();
      }

      spawnDebt += (0.15 + (u / MAX_USERS) * 0.85) * 60 * (dt / 1000);
      while (spawnDebt >= 1 && particles.length < 260) {
        spawnDebt -= 1;
        const y = geo.flowH * (0.1 + Math.random() * 0.8);
        particles.push({ x: -4, y, y0: y, phase: 0, target: robin++ % n, drop: Math.random() < model.dropRate, until: 0, t: 0, alpha: 1, vx: 0, vy: 0 });
      }

      let queued = 0;
      const speed = 0.2 * dt;
      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const p = particles[index];
        if (p.target >= n) p.target %= n;
        if (p.phase === 0) {
          // Vers le répartiteur : les requêtes convergent en douceur.
          p.x = Math.min(geo.lbX - 15, p.x + speed);
          p.y = p.y0 + (geo.midY - p.y0) * smooth(p.x / (geo.lbX - 15));
          if (p.x >= geo.lbX - 15) {
            if (p.drop) {
              p.phase = 3;
              p.vx = 0.04 + Math.random() * 0.05;
              p.vy = -0.05 - Math.random() * 0.08;
            } else if (model.wait > 0) {
              p.phase = 1;
              p.until = now + model.wait * (0.6 + Math.random() * 0.8);
            } else p.phase = 2;
          }
        } else if (p.phase === 1) {
          // En file : les requêtes attendent en arc devant le répartiteur.
          const slot = queued++;
          const ring = Math.floor(slot / 15);
          const angle = Math.PI * (0.62 + ((slot % 15) / 14) * 0.76);
          const radius = 30 + ring * 8;
          p.x += (geo.lbX + Math.cos(angle) * radius - p.x) * 0.18;
          p.y += (geo.midY + Math.sin(angle) * radius - p.y) * 0.18;
          if (now >= p.until || !params.current.queue) {
            p.phase = 0;
            p.x = geo.lbX - 15;
            p.y0 = geo.midY;
            p.y = geo.midY;
            p.phase = 2;
          }
        } else if (p.phase === 2) {
          const r = route(geo, p.target);
          p.t += speed / Math.max(60, r.x3 - r.x0) / 1.1;
          if (p.t >= 1) {
            flashes[p.target] = 1;
            particles.splice(index, 1);
            continue;
          }
          p.x = bezier(r.x0, r.x1, r.x2, r.x3, p.t);
          p.y = bezier(r.y0, r.y1, r.y2, r.y3, p.t);
        } else {
          // Rejetée : la requête retombe et s’efface.
          p.vy += 0.0009 * dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.alpha -= dt / 650;
          if (p.alpha <= 0) particles.splice(index, 1);
        }
      }
    }

    function draw() {
      const { users: u, instances: n, queue: q } = params.current;
      const model = simulate(u, n, q);
      const geo = layout();
      const level = calm ? Math.min(model.load, CHART_MAX) : fill;
      const hot = model.state === "dropped" || model.state === "queued";
      ctx.clearRect(0, 0, width, height);
      ctx.textBaseline = "middle";
      ctx.lineCap = "round";

      // Les liaisons vers les instances : pleines si l’instance tourne, en pointillés sinon.
      geo.rings.forEach((_, index) => {
        const r = route(geo, index);
        const active = index < n;
        ctx.setLineDash(active ? [] : [2, 5]);
        ctx.strokeStyle = active ? colors.strong : colors.line;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(r.x0, r.y0);
        ctx.bezierCurveTo(r.x1, r.y1, r.x2, r.y2, r.x3, r.y3);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Le répartiteur : un anneau, un point au centre, un arc qui tourne plus vite sous la charge.
      ctx.strokeStyle = colors.fg;
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.arc(geo.lbX, geo.midY, 14, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = colors.fg;
      ctx.beginPath();
      ctx.arc(geo.lbX, geo.midY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = hot ? colors.accent : colors.strong;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(geo.lbX, geo.midY, 20, spin, spin + Math.PI * 0.45);
      ctx.stroke();
      ctx.fillStyle = colors.muted;
      ctx.textAlign = "center";
      ctx.font = `500 11px ${colors.sans}`;
      ctx.fillText(labels.balancer, geo.lbX, geo.midY + 38);

      // Les instances : une jauge circulaire, son nom et sa charge à droite.
      geo.rings.forEach((ring, index) => {
        const active = index < n;
        ctx.lineWidth = 1.5;
        ctx.setLineDash(active ? [] : [2, 4]);
        ctx.strokeStyle = colors.line;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        if (active) {
          const share = Math.min(level, 1);
          ctx.strokeStyle = level > 1 ? colors.accent : colors.fg;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(ring.x, ring.y, ring.r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.max(0.02, share));
          ctx.stroke();
          if (flashes[index] > 0) {
            ctx.globalAlpha = flashes[index] * 0.5;
            ctx.strokeStyle = level > 1 ? colors.accent : colors.fg;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(ring.x, ring.y, ring.r + 3 + (1 - flashes[index]) * 4, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
        ctx.fillStyle = active ? colors.fg : colors.muted;
        ctx.textAlign = "center";
        ctx.font = `500 10px ${colors.mono}`;
        ctx.fillText(String(index + 1), ring.x, ring.y + 0.5);

        const tx = ring.x + ring.r + 14;
        ctx.textAlign = "left";
        ctx.font = `500 12px ${colors.sans}`;
        ctx.fillStyle = active ? colors.fg : colors.muted;
        ctx.fillText(`${labels.instance} ${index + 1}`, tx, ring.y - 7);
        ctx.font = `400 11px ${colors.mono}`;
        ctx.fillStyle = active && model.load > 1 ? colors.accent : colors.muted;
        ctx.fillText(active ? `${Math.round(model.load * 100)} %` : labels.idle, tx, ring.y + 9);
      });

      // Les requêtes : encre en route, accent dans la file et quand elles sont rejetées.
      for (const p of particles) {
        ctx.globalAlpha = Math.max(0, p.alpha) * (p.phase === 3 ? 0.85 : 1);
        ctx.fillStyle = p.phase === 1 || p.phase === 3 ? colors.accent : colors.fg;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.phase === 2 ? 1.8 : 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Le graphique : la charge des 12 dernières secondes, la capacité en pointillés.
      const top = geo.flowH + 26;
      const bottom = height - 4;
      const y = (value: number) => bottom - Math.sqrt(Math.min(value, CHART_MAX) / CHART_MAX) * (bottom - top);
      const capY = y(1);
      ctx.strokeStyle = colors.line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, geo.flowH + 0.5);
      ctx.lineTo(width, geo.flowH + 0.5);
      ctx.moveTo(0, bottom + 0.5);
      ctx.lineTo(width, bottom + 0.5);
      ctx.stroke();
      ctx.fillStyle = colors.muted;
      ctx.textAlign = "left";
      ctx.font = `500 11px ${colors.sans}`;
      ctx.fillText(labels.history, 0, geo.flowH + 14);

      const points = calm ? history.map(() => level) : history;
      const stepX = width / (SAMPLES - 1);
      ctx.beginPath();
      points.forEach((value, index) => {
        const px = index * stepX;
        if (index === 0) ctx.moveTo(px, y(value));
        else ctx.lineTo(px, y(value));
      });
      ctx.lineTo(width, bottom);
      ctx.lineTo(0, bottom);
      ctx.closePath();
      ctx.save();
      ctx.clip();
      ctx.globalAlpha = 0.06;
      ctx.fillStyle = colors.fg;
      ctx.fillRect(0, capY, width, bottom - capY);
      ctx.globalAlpha = 0.14;
      ctx.fillStyle = colors.accent;
      ctx.fillRect(0, top - 2, width, capY - top + 2);
      ctx.restore();
      ctx.globalAlpha = 1;

      ctx.strokeStyle = hot ? colors.accent : colors.fg;
      ctx.lineWidth = 1.5;
      ctx.lineJoin = "round";
      ctx.beginPath();
      points.forEach((value, index) => {
        const px = index * stepX;
        if (index === 0) ctx.moveTo(px, y(value));
        else ctx.lineTo(px, y(value));
      });
      ctx.stroke();

      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, Math.round(capY) + 0.5);
      ctx.lineTo(width, Math.round(capY) + 0.5);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = colors.accent;
      ctx.textAlign = "right";
      ctx.font = `500 10px ${colors.mono}`;
      ctx.fillText(labels.capacity.toUpperCase(), width, capY - 8);
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
  }, [theme, calm, labels.balancer, labels.instance, labels.idle, labels.history, labels.capacity]);

  return <canvas ref={canvasRef} className="scale-canvas" role="img" aria-label={description} />;
}

export default function ScaleDemo() {
  const { t, theme, calm, locale } = useSite();
  const copy = t.demos.scale;
  const [users, setUsers] = useState(240);
  const [instances, setInstances] = useState(1);
  const [queue, setQueue] = useState(false);
  const id = useId();
  const model = simulate(users, instances, queue);
  const percent = Math.round(model.load * 100);
  const status = copy.status[model.state];
  const seconds = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(model.wait / 1000);

  return (
    <DemoFrame number="2.4" label={copy.label} note={copy.note} className="scale-demo">
      <div className="scale">
        <div className="scale-canvas-wrap">
          {/* Sans animation, le canvas est recréé à chaque réglage pour redessiner l’image fixe. */}
          <Canvas
            key={calm ? `${users}-${instances}-${queue}` : "live"}
            users={users}
            instances={instances}
            queue={queue}
            theme={theme}
            calm={calm}
            labels={{ balancer: copy.balancer, instance: copy.instance, idle: copy.idle, history: copy.history, capacity: copy.capacity }}
            description={`${copy.users} : ${users}. ${copy.instances} : ${instances}. ${status}`}
          />
        </div>

        <div className="scale-readout" data-state={model.state}>
          <p className="scale-load">
            <strong>{percent}&#8239;%</strong>
            <span>{copy.load}</span>
          </p>
          <dl className="scale-stats">
            <div>
              <dt>{copy.dropped}</dt>
              <dd data-alert={model.dropRate > 0 ? "" : undefined}>{Math.round(model.dropRate * 100)}&#8239;%</dd>
            </div>
            <div>
              <dt>{copy.wait}</dt>
              <dd data-alert={model.wait > 0 ? "" : undefined}>{seconds}&#8239;s</dd>
            </div>
          </dl>
          <p className="scale-status" aria-live="polite">
            {status}
          </p>
        </div>

        <dl className="spec scale-controls">
          <div className="spec-row">
            <dt>
              <label htmlFor={`${id}-users`}>{copy.users}</label>
            </dt>
            <dd className="scale-range">
              <input
                id={`${id}-users`}
                type="range"
                min={MIN_USERS}
                max={MAX_USERS}
                step={10}
                value={users}
                onChange={(event) => setUsers(Number(event.target.value))}
              />
              <output htmlFor={`${id}-users`} className="mono">
                {users}
              </output>
            </dd>
          </div>
          <div className="spec-row">
            <dt id={`${id}-instances`}>{copy.instances}</dt>
            <dd>
              <div className="choice" role="radiogroup" aria-labelledby={`${id}-instances`}>
                {Array.from({ length: MAX_INSTANCES }, (_, index) => index + 1).map((count) => (
                  <button key={count} type="button" role="radio" aria-checked={instances === count} onClick={() => setInstances(count)}>
                    {count}
                  </button>
                ))}
              </div>
            </dd>
          </div>
          <div className="spec-row">
            <dt id={`${id}-queue`}>{copy.queue}</dt>
            <dd>
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
            </dd>
          </div>
        </dl>
      </div>
    </DemoFrame>
  );
}
