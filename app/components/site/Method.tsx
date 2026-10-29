"use client";

import { motion } from "motion/react";
import OrchestraDemo from "../demos/OrchestraDemo";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import { useSite } from "./SiteProvider";

/**
 * Collaboration : le titre et une phrase, le planning en pleine largeur, puis le déroulé d’une
 * mission sur une seule ligne, comme une frise.
 */
export default function Method() {
  const { t } = useSite();

  return (
    <section id="process" className="method section" aria-labelledby="method-title">
      <div className="shell">
        <header className="method-head">
          <p className="section-label mono">
            <span>03</span>
            <span>{t.method.label}</span>
          </p>
          <RevealText as="h2" id="method-title" className="section-title" text={t.method.title} />
          <motion.p
            className="method-body"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            {t.method.body}
          </motion.p>
        </header>

        <div className="method-demo">
          <OrchestraDemo />
        </div>

        <div className="mission">
          <h3 className="mission-label mono">{t.method.stepsLabel}</h3>
          <ol className="mission-steps">
            {t.method.steps.map((step, index) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: EASE_OUT }}
              >
                <span className="mission-dot mono" aria-hidden="true">
                  {index + 1}
                </span>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
