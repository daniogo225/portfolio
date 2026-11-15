"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { motion } from "motion/react";
import { cvPdf, localePath } from "../../data/site";
import PixelPortrait from "../ui/PixelPortrait";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import { useSite } from "./SiteProvider";

const appear = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
} as const;

/**
 * Profil : après la photo de la hero, le même portrait en pixel art, qui se met au point en
 * entrant dans l’écran. À côté, le titre, la description et le CV, calés contre l’image.
 */
export default function Profile() {
  const { t, locale, calm } = useSite();
  const p = t.profile;

  return (
    <section id="profile" className="profile section" aria-labelledby="profile-title">
      <div className="shell profile-grid">
        <p className="section-label mono">{p.label}</p>

        <figure className="profile-still">
          <div className="profile-still-frame">
            <PixelPortrait alt={p.photo} still={calm} />
          </div>
          <figcaption className="mono">
            <span>{t.contact.place}</span>
            <span>{p.languages}</span>
          </figcaption>
        </figure>

        <RevealText as="h2" id="profile-title" className="profile-statement" text={p.lead} />

        <div className="profile-text">
          {/* La description, puis les outils du quotidien sur leur propre ligne. */}
          <motion.div className="profile-body" {...appear} transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}>
            <p>{p.body}</p>
            <p>{p.stack}</p>
          </motion.div>
          <motion.div className="profile-cv" {...appear} transition={{ duration: 0.8, delay: 0.25, ease: EASE_OUT }}>
            <a className="button button-primary" href={cvPdf(locale)} download>
              <span className="roll" data-text={p.cvPdf}>
                <span>{p.cvPdf}</span>
              </span>
              <Download size={17} strokeWidth={1.75} aria-hidden="true" />
            </a>
            <a className="text-link" href={localePath(locale, "cv")}>
              {p.cvOnline}
              <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
