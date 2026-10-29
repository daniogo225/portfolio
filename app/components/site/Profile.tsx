"use client";

import { ArrowUpRight, Download } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cvPdf, localePath } from "../../data/site";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import useAbidjanTime from "../ui/useAbidjanTime";
import { useSite } from "./SiteProvider";

const appear = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.8, ease: EASE_OUT },
} as const;

export default function Profile() {
  const { t, calm, locale } = useSite();
  const p = t.profile;
  const photoRef = useRef<HTMLElement>(null);
  const time = useAbidjanTime();

  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const reveal = useTransform(scrollYProgress, [0, 0.35], ["inset(14% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.35], [1.18, 1]);

  return (
    <section id="profile" className="profile section" aria-labelledby="profile-title">
      <div className="shell">
        <div className="profile-grid">
          <figure ref={photoRef} className="profile-photo">
            <motion.div className="profile-photo-frame" style={{ clipPath: calm ? "none" : reveal }}>
              <motion.div className="profile-photo-image" style={calm ? { y: 0, scale: 1 } : { y: imageY, scale: imageScale }}>
                <Image
                  src="/portraits/daniogo-about-seated-cutout.png"
                  alt={p.photo}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </motion.div>
            </motion.div>
            <figcaption>
              <span>{t.contact.place}</span>
              <span>
                UTC+0 <time>{time || "--:--"}</time>
              </span>
            </figcaption>
          </figure>

          <div className="profile-copy">
            <p className="section-label">
              <span>04</span>
              <span>{p.label}</span>
            </p>
            <RevealText as="h2" id="profile-title" className="section-title" text={p.title} />
            <div className="profile-text">
              {p.paragraphs.map((paragraph, index) => (
                <motion.p key={paragraph} className={index === 0 ? "lead" : undefined} {...appear}>
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <div className="path">
              <h3 className="block-label">{p.pathLabel}</h3>
              <ol className="path-list">
                <motion.li {...appear}>
                  <p className="path-dates">{p.experience.dates}</p>
                  <div className="path-body">
                    <h4>{p.experience.role}</h4>
                    <p className="path-place">{p.experience.place}</p>
                    <ul className="path-highlights">
                      {p.experience.highlights.map((item) => (
                        <li key={item.title}>
                          <strong>{item.title}</strong>
                          <span>{item.body}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
                <motion.li {...appear}>
                  <p className="path-dates">{p.education.dates}</p>
                  <div className="path-body">
                    <h4>{p.education.school}</h4>
                    <p className="path-place">{p.education.body}</p>
                  </div>
                </motion.li>
              </ol>
            </div>

            <dl className="profile-facts">
              {p.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="profile-cv">
              <h3 className="sr-only">{p.cvLabel}</h3>
              <a className="button button-primary" href={cvPdf(locale)} download>
                <span className="roll" data-text={p.cvPdf}>
                  <span>{p.cvPdf}</span>
                </span>
                <Download size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a className="button button-ghost" href={localePath(locale, "cv")}>
                <span className="roll" data-text={p.cvOnline}>
                  <span>{p.cvOnline}</span>
                </span>
                <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="toolkit">
          <header className="toolkit-head">
            <p className="section-label">
              <span>{p.skillsLabel}</span>
            </p>
            <RevealText as="h3" className="toolkit-title" text={p.skillsTitle} />
          </header>
          <dl className="toolkit-grid">
            {p.skills.map((skill, index) => (
              <motion.div key={skill.title} {...appear} transition={{ ...appear.transition, delay: (index % 3) * 0.08 }}>
                <dt>
                  <span className="toolkit-index">0{index + 1}</span>
                  {skill.title}
                </dt>
                <dd>{skill.body}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
