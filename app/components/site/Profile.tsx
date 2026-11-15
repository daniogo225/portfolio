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

/**
 * Profil : après le plan large de la hero, le plan serré. Le même portrait en noir, sur fond clair
 * ou sombre selon le thème, une phrase à la première personne, quatre repères et le CV.
 */
export default function Profile() {
  const { t, locale } = useSite();
  const p = t.profile;
  const time = useAbidjanTime();

  return (
    <section id="profile" className="profile section" aria-labelledby="profile-title">
      <div className="shell">
        <div className="profile-grid">
          <figure className="profile-still">
            <div className="profile-still-frame">
              <Image className="is-light" src="/portraits/cv-portrait.jpg" alt={p.photo} fill sizes="(min-width: 1024px) 30vw, 420px" />
              <Image className="is-dark" src="/portraits/cv-portrait-band.jpg" alt={p.photo} fill sizes="(min-width: 1024px) 30vw, 420px" />
            </div>
            <figcaption className="mono">
              <span>{t.contact.place}</span>
              <span>
                UTC+0 <time>{time || "--:--"}</time>
              </span>
            </figcaption>
          </figure>

          <div className="profile-copy">
            <p className="section-label mono">
              <span>{p.label}</span>
            </p>
            <RevealText as="h2" id="profile-title" className="profile-statement" text={p.lead} />
            <motion.p className="profile-lead" {...appear}>
              {p.body}
            </motion.p>

            <dl className="profile-facts">
              {p.facts.map((fact) => (
                <motion.div key={fact.label} {...appear}>
                  <dt className="mono">{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </motion.div>
              ))}
            </dl>

            <div className="profile-cv">
              <a className="button button-primary" href={cvPdf(locale)} download>
                <span className="roll" data-text={p.cvPdf}>
                  <span>{p.cvPdf}</span>
                </span>
                <Download size={17} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a className="button button-ghost" href={localePath(locale, "cv")}>
                <span className="roll" data-text={p.cvOnline}>
                  <span>{p.cvOnline}</span>
                </span>
                <ArrowUpRight size={17} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
