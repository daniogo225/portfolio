"use client";

import { ArrowUpRight, Download } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef } from "react";
import { cvPdf, localePath } from "../../data/site";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import { useSite } from "./SiteProvider";

const appear = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
} as const;

// Le portrait se dévoile de haut en bas quand il entre dans l’écran.
const unveil: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  shown: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] } },
};

/**
 * Profil : après le plan large de la hero, le plan serré. Le portrait en noir occupe toute la
 * hauteur de la colonne ; en face, une conviction, un paragraphe et le CV.
 */
export default function Profile() {
  const { t, locale, calm } = useSite();
  const p = t.profile;
  const frame = useRef<HTMLDivElement>(null);
  // Le portrait glisse lentement dans son cadre pendant que la section traverse l’écran.
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id="profile" className="profile section" aria-labelledby="profile-title">
      <div className="shell profile-grid">
        <motion.figure className="profile-still" initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.25 }}>
          <motion.div ref={frame} className="profile-still-frame" variants={unveil}>
            <motion.div className="profile-still-image" style={calm ? undefined : { y: drift }}>
              <Image className="is-light" src="/portraits/cv-portrait.jpg" alt={p.photo} fill sizes="(min-width: 1024px) 36vw, 92vw" />
              <Image className="is-dark" src="/portraits/cv-portrait-band.jpg" alt={p.photo} fill sizes="(min-width: 1024px) 36vw, 92vw" />
            </motion.div>
          </motion.div>
          <figcaption className="mono">
            <span>{t.contact.place}</span>
            <span>{p.languages}</span>
          </figcaption>
        </motion.figure>

        <div className="profile-copy">
          <p className="section-label mono">{p.label}</p>
          <RevealText as="h2" id="profile-title" className="profile-statement" text={p.lead} />
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
