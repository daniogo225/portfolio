"use client";

import { ArrowUpRight, Download } from "lucide-react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { cvPdf, localePath } from "../../data/site";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import useAbidjanTime from "../ui/useAbidjanTime";
import { useSite } from "./SiteProvider";

export default function Profile() {
  const { t, calm, locale } = useSite();
  const photoRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [reached, setReached] = useState(-1);
  const time = useAbidjanTime();

  const { scrollYProgress: photoProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const reveal = useTransform(photoProgress, [0, 0.4], ["inset(100% 0% 0% 0% round 24px)", "inset(0% 0% 0% 0% round 24px)"]);
  const imageY = useTransform(photoProgress, [0, 1], ["-8%", "8%"]);
  const imageScale = useTransform(photoProgress, [0, 0.4], [1.25, 1]);

  const { scrollYProgress: lineProgress } = useScroll({ target: timelineRef, offset: ["start 0.8", "end 0.55"] });
  const steps = t.profile.timeline.length;
  useMotionValueEvent(lineProgress, "change", (value) => {
    setReached(Math.min(steps - 1, Math.floor(value * (steps - 1) + 0.02)));
  });

  return (
    <section id="profile" className="profile section" aria-labelledby="profile-title">
      <div className="shell profile-grid">
        <figure ref={photoRef} className="profile-photo">
          <motion.div className="profile-photo-frame" style={{ clipPath: calm ? "none" : reveal }}>
            <motion.div className="profile-photo-image" style={calm ? { y: 0, scale: 1 } : { y: imageY, scale: imageScale }}>
              <Image
                src="/portraits/daniogo-about-seated-cutout.png"
                alt={t.profile.photo}
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
              />
            </motion.div>
          </motion.div>
          <figcaption className="mono">
            <span>{t.contact.place}</span>
            <span>
              UTC+0 <time>{time}</time>
            </span>
          </figcaption>
        </figure>

        <div className="profile-copy">
          <p className="section-label mono">
            <span>04</span>
            <span>{t.profile.label}</span>
          </p>
          <RevealText as="h2" id="profile-title" className="section-title" text={t.profile.title} />
          <div className="profile-text">
            {t.profile.paragraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph}
                className={index === 0 ? "lead" : undefined}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <dl className="profile-facts">
            {t.profile.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="mono">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="timeline-block">
            <h3 className="mono timeline-label">{t.profile.timelineLabel}</h3>
            <div ref={timelineRef} className="timeline">
              <span className="timeline-rail" aria-hidden="true">
                <motion.span className="timeline-fill" style={{ scaleY: calm ? 1 : lineProgress }} />
              </span>
              <ol>
                {t.profile.timeline.map((entry, index) => (
                  <li key={entry.year} data-reached={calm || index <= reached ? "" : undefined}>
                    <span className="timeline-year mono">{entry.year}</span>
                    <span className="timeline-text">{entry.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="profile-cv">
            <h3 className="mono">{t.profile.cvLabel}</h3>
            <div className="profile-cv-actions">
              <a className="button button-primary" href={cvPdf(locale)} download>
                <span className="roll" data-text={t.profile.cvPdf}>
                  <span>{t.profile.cvPdf}</span>
                </span>
                <Download size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a className="button button-ghost" href={localePath(locale, "cv")}>
                <span className="roll" data-text={t.profile.cvOnline}>
                  <span>{t.profile.cvOnline}</span>
                </span>
                <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
