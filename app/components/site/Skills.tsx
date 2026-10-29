"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import AgentDemo from "../demos/AgentDemo";
import OfflineDemo from "../demos/OfflineDemo";
import ProductDemo from "../demos/ProductDemo";
import ScaleDemo from "../demos/ScaleDemo";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import { useSite } from "./SiteProvider";

/** Savoir-faire : chaque compétence est accompagnée d’une démonstration interactive construite dans la page. */
export default function Skills() {
  const { t, locale } = useSite();
  const demos: Record<string, ReactNode> = {
    product: <ProductDemo />,
    ai: <AgentDemo key={locale} />,
    scale: <ScaleDemo />,
    mobile: <OfflineDemo key={locale} />,
  };

  return (
    <section id="expertise" className="skills section tone-ink" aria-labelledby="skills-title">
      <div className="shell">
        <header className="section-head">
          <p className="section-label">
            <span>02</span>
            <span>{t.skills.label}</span>
          </p>
          <RevealText as="h2" id="skills-title" className="section-title" text={t.skills.title} />
          <p className="section-intro">{t.skills.intro}</p>
        </header>

        <div className="skill-list">
          {t.skills.items.map((item, index) => (
            <article key={item.id} className="skill" data-flip={index % 2 ? "" : undefined} aria-labelledby={`skill-${item.id}`}>
              <motion.div
                className="skill-copy"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: EASE_OUT }}
              >
                <p className="skill-index">02.{index + 1}</p>
                <h3 id={`skill-${item.id}`} className="skill-title">
                  {item.title}
                </h3>
                <p className="skill-body">{item.body}</p>
                <ul className="skill-points">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <p className="skill-tools">
                  <span className="sr-only">{t.skills.toolsLabel}</span>
                  {item.tools.split(", ").map((tool) => (
                    <span key={tool} className="tag">
                      {tool}
                    </span>
                  ))}
                </p>
              </motion.div>
              <motion.div
                className="skill-demo"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: EASE_OUT }}
              >
                {demos[item.id]}
              </motion.div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
