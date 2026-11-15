"use client";

import { ArrowUpRight, Download } from "lucide-react";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { cvPdf, localePath } from "../../data/site";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import { useSite } from "./SiteProvider";

const appear = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
} as const;

// Le portrait se dévoile de haut en bas quand il entre dans l’écran, pendant que l’image,
// d’abord un peu trop grande, se pose à sa taille.
const unveil: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  shown: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.1, ease: [0.77, 0, 0.175, 1] } },
};

const settle: Variants = {
  hidden: { scale: 1.16 },
  shown: { scale: 1, transition: { duration: 1.6, ease: EASE_OUT } },
};

/**
 * Profil : après le plan large de la hero, la vignette. Le portrait reste petit, donc net ; la
 * phrase prend la place. Les deux partagent le même haut et le même bas.
 */
export default function Profile() {
  const { t, locale } = useSite();
  const p = t.profile;

  return (
    <section id="profile" className="profile section" aria-labelledby="profile-title">
      <div className="shell profile-grid">
        <p className="section-label mono">{p.label}</p>

        <motion.figure className="profile-still" initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.3 }}>
          <motion.div className="profile-still-frame" variants={unveil}>
            <motion.div className="profile-still-image" variants={settle}>
              <Image className="is-light" src="/portraits/cv-portrait.jpg" alt={p.photo} fill sizes="(min-width: 1024px) 320px, 160px" />
              <Image className="is-dark" src="/portraits/cv-portrait-band.jpg" alt={p.photo} fill sizes="(min-width: 1024px) 320px, 160px" />
            </motion.div>
          </motion.div>
          <figcaption className="mono">
            <span>{t.contact.place}</span>
            <span>{p.languages}</span>
          </figcaption>
        </motion.figure>

        <RevealText as="h2" id="profile-title" className="profile-statement" text={p.lead} />

        <div className="profile-text">
          <motion.p className="profile-body" {...appear} transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}>
            {p.body}
          </motion.p>
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
