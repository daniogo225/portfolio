"use client";

import { motion } from "motion/react";
import Magnetic from "../ui/Magnetic";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import { useSite } from "./SiteProvider";

/**
 * Présentation : la phrase de positionnement en grand à gauche, le résumé et un bouton rond vers
 * le profil à droite, puis les trois principes posés sur des filets.
 */
export default function Statement() {
  const { t } = useSite();
  return (
    <section className="intro section" aria-labelledby="intro-title">
      <div className="shell">
        <div className="intro-grid">
          <RevealText as="h2" id="intro-title" className="intro-text" text={t.statement.text} interval={0.025} />
          <div className="intro-side">
            <motion.p
              className="intro-lead"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT }}
            >
              {t.hero.intro}
            </motion.p>
            <Magnetic strength={0.35}>
              <a className="circle-button" href="#profile">
                <span>{t.statement.cta}</span>
              </a>
            </Magnetic>
          </div>
        </div>

        <ol className="principles">
          {t.statement.points.map((point, index) => (
            <motion.li
              key={point.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: EASE_OUT }}
            >
              <span className="principle-index mono">0{index + 1}</span>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
