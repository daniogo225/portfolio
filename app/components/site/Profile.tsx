"use client";

import { ArrowUpRight, Download } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
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

/** Profil : la photo et le texte côte à côte, puis le parcours et le tableau des caractéristiques. */
export default function Profile() {
  const { t, locale } = useSite();
  const p = t.profile;
  const time = useAbidjanTime();

  return (
    <section id="profile" className="profile band" aria-labelledby="profile-title">
      <div className="band-inner">
        <p className="eyebrow">{p.label}</p>
        <RevealText as="h2" id="profile-title" className="band-title" text={p.title} />
      </div>

      <div className="profile-grid">
        <motion.figure className="profile-photo" {...appear}>
          <div className="profile-photo-frame">
            <Image src="/portraits/daniogo-about-seated-cutout.png" alt={p.photo} fill sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
          <figcaption>
            <span>{t.contact.place}</span>
            <span>
              UTC+0 <time>{time || "--:--"}</time>
            </span>
          </figcaption>
        </motion.figure>

        <div className="profile-copy">
          <div className="profile-text">
            {p.paragraphs.map((paragraph, index) => (
              <motion.p key={paragraph} className={index === 0 ? "lead" : undefined} {...appear}>
                {paragraph}
              </motion.p>
            ))}
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
            <a className="button button-primary" href={cvPdf(locale)} download>
              {p.cvPdf}
              <Download size={16} strokeWidth={2} aria-hidden="true" />
            </a>
            <a className="link-arrow" href={localePath(locale, "cv")}>
              {p.cvOnline}
              <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="path">
        <h3 className="specs-title">{p.pathLabel}</h3>
        <ol className="path-list">
          <li>
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
          </li>
          <li>
            <p className="path-dates">{p.education.dates}</p>
            <div className="path-body">
              <h4>{p.education.school}</h4>
              <p className="path-place">{p.education.body}</p>
            </div>
          </li>
        </ol>
      </div>

      <div className="specs">
        <h3 className="specs-title">{p.skillsTitle}</h3>
        <dl className="specs-table">
          {p.skills.map((skill) => (
            <div key={skill.title}>
              <dt>{skill.title}</dt>
              <dd>{skill.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
