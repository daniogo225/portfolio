"use client";

import { ArrowUpRight } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import type { SiteContent } from "../../data/content";
import CountUp from "../ui/CountUp";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import { ContractMock, SystemsMock } from "./CaseVisuals";
import { useSite } from "./SiteProvider";

type CaseItem = SiteContent["work"]["cases"][number];

function Frame({
  item,
  children,
  openLabel,
}: {
  item: CaseItem;
  children: ReactNode;
  openLabel: string;
}) {
  const { calm } = useSite();
  const external = item.link.startsWith("http");
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const followX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const followY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  if (!external) return <div className="case-frame-wrap">{children}</div>;

  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
    if (!hovered) setHovered(true);
  }

  return (
    <a
      className="case-frame-wrap is-link"
      href={item.link}
      target="_blank"
      rel="noreferrer"
      aria-label={`${item.title} : ${item.linkLabel}`}
      onPointerMove={move}
      onPointerLeave={() => setHovered(false)}
      data-cursor={hovered && !calm ? "" : undefined}
    >
      {children}
      <AnimatePresence>
        {hovered && !calm && (
          <motion.span
            className="cursor-label"
            style={{ x: followX, y: followY }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            aria-hidden="true"
          >
            {openLabel}
            <ArrowUpRight size={16} strokeWidth={2} />
          </motion.span>
        )}
      </AnimatePresence>
    </a>
  );
}

function Case({ item }: { item: CaseItem }) {
  const { t, calm } = useSite();
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "start 0.25"] });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(10% 8% 10% 8% round 32px)", "inset(0% 0% 0% 0% round 24px)"],
  );
  const tilt = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const external = item.link.startsWith("http");

  return (
    <article className={`case case-${item.id}`} aria-labelledby={`case-${item.id}`}>
      <div className="case-head">
        <p className="case-kind mono">
          <span>{item.index}</span>
          <span>{item.kind}</span>
        </p>
        <RevealText as="h3" id={`case-${item.id}`} className="case-title" text={item.title} />
        <motion.p
          className="case-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
        >
          {item.subtitle}
        </motion.p>
      </div>

      <Frame item={item} openLabel={t.work.open}>
        <motion.div ref={frameRef} className={`case-frame frame-${item.id}`} style={{ clipPath: calm ? "none" : clipPath }}>
          {item.id === "contract" ? (
            <ContractMock copy={t.work.contractMock} tilt={calm ? undefined : tilt} lift={calm ? undefined : lift} />
          ) : (
            <SystemsMock copy={t.work.systemsMock} calm={calm} scale={calm ? undefined : scale} />
          )}
        </motion.div>
      </Frame>
      <p className="case-caption mono">{item.caption}</p>

      <div className="case-body">
        <div className="case-text">
          <h4 className="mono">{t.work.problem}</h4>
          <p>{item.story}</p>
        </div>
        <div className="case-text">
          <h4 className="mono">{t.work.decision}</h4>
          <p>{item.decision}</p>
        </div>
        <div className="case-results">
          <h4 className="mono">{t.work.results}</h4>
          <dl className="case-metrics">
            {item.metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>
                  <CountUp value={metric.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="case-foot">
        <p className="case-stack">
          <span className="mono">{t.work.stack}</span>
          <span>{item.stack.join(" / ")}</span>
        </p>
        <a
          className="button button-ghost"
          href={item.link}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
        >
          <span className="roll" data-text={item.linkLabel}>
            <span>{item.linkLabel}</span>
          </span>
          <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export default function Work() {
  const { t } = useSite();
  return (
    <section id="work" className="work section" aria-labelledby="work-title">
      <div className="shell">
        <header className="section-head">
          <p className="section-label mono">
            <span>01</span>
            <span>{t.work.label}</span>
          </p>
          <RevealText as="h2" id="work-title" className="section-title" text={t.work.title} />
          <p className="section-intro">{t.work.intro}</p>
        </header>
        <div className="cases">
          {t.work.cases.map((item) => (
            <Case key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
