"use client";

import { motion } from "motion/react";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import { useSite } from "./SiteProvider";

/** Point de vue : un titre centré sur fond clair, puis trois colonnes. */
export default function Statement() {
  const { t } = useSite();
  return (
    <section className="statement band" aria-labelledby="statement-title">
      <div className="band-inner">
        <p className="eyebrow">{t.statement.label}</p>
        <RevealText as="h2" id="statement-title" className="band-title" text={t.statement.text} interval={0.03} />
        <ol className="statement-points">
          {t.statement.points.map((point, index) => (
            <motion.li
              key={point.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: EASE_OUT }}
            >
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
