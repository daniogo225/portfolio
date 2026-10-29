"use client";

import { motion } from "motion/react";
import OrchestraDemo from "../demos/OrchestraDemo";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import { useSite } from "./SiteProvider";

/** Méthode : l’orchestration d’agents IA, puis les étapes d’une mission en cinq colonnes. */
export default function Method() {
  const { t } = useSite();
  return (
    <section id="method" className="method band is-gray" aria-labelledby="method-title">
      <div className="band-inner">
        <p className="eyebrow">{t.method.label}</p>
        <RevealText as="h2" id="method-title" className="band-title" text={t.method.title} />
        <p className="band-intro">{t.method.body}</p>
      </div>
      <div className="feature-visual is-card">
        <OrchestraDemo />
      </div>
      <div className="band-inner">
        <ul className="feature-points is-center">
          {t.method.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
      <div className="mission">
        <h3 className="mission-label">{t.method.stepsLabel}</h3>
        <ol className="mission-steps">
          {t.method.steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: EASE_OUT }}
            >
              <span className="step-index">{index + 1}</span>
              <h4>{step.title}</h4>
              <p>{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
