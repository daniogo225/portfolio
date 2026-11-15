"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { cvPdf, localePath } from "../../data/site";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import Figures from "./Figures";
import { useSite } from "./SiteProvider";

const appear = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
} as const;

/**
 * Profil : le portrait en noir de la hero, détouré, posé à même le fond de la section. Il n’a ni
 * cadre ni fond : son bas se dissout dans la page. À côté, le titre, la description et le CV.
 */
export default function Profile() {
  const { t, locale } = useSite();
  const p = t.profile;

  return (
    <section id="profile" className="profile section" aria-labelledby="profile-title">
      <div className="shell profile-grid">
        <p className="section-label mono">{p.label}</p>

        <motion.figure
          className="profile-portrait"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: EASE_OUT }}
        >
          <Image
            src="/portraits/daniogo-product-engineer-cutout.png"
            alt={p.photo}
            width={1024}
            height={1536}
            sizes="(min-width: 1024px) 44vw, 92vw"
          />
          <figcaption className="mono">
            <span>{t.contact.place}</span>
            <span>{p.languages}</span>
          </figcaption>
        </motion.figure>

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

        <Figures />
      </div>
    </section>
  );
}
