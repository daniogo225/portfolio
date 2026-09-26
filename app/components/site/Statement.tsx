"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Fragment, useRef } from "react";
import { parseEmphasis, plain } from "../../data/content";
import { EASE_OUT } from "../ui/RevealText";
import { useSite } from "./SiteProvider";

function Word({
  children,
  progress,
  range,
  em,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  em: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span className={em ? "statement-word word-em" : "statement-word"} style={{ opacity, y }}>
      {children}
    </motion.span>
  );
}

/** Déclaration dont les mots s’allument au rythme du défilement. */
export default function Statement() {
  const { t, calm } = useSite();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const words = parseEmphasis(t.statement.text).flatMap((segment) =>
    segment.text
      .split(/[ \n\t]+/)
      .filter(Boolean)
      .map((value) => ({ value, em: segment.em })),
  );

  return (
    <section className="statement section" aria-labelledby="statement-label">
      <div className="shell statement-grid">
        <p className="section-label mono" id="statement-label">
          <span>{t.statement.label}</span>
        </p>
        <p ref={ref} className="statement-text">
          <span className="sr-only">{plain(t.statement.text)}</span>
          <span aria-hidden="true">
            {words.map(({ value, em }, index) => (
              <Fragment key={`${t.statement.text}-${index}`}>
                {calm ? (
                  <span className={em ? "statement-word word-em" : "statement-word"}>{value}</span>
                ) : (
                  <Word progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]} em={em}>
                    {value}
                  </Word>
                )}
                {index < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </span>
        </p>
        <div className="statement-foot">
          <motion.p
            className="statement-body"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
          >
            {t.statement.body}
          </motion.p>
          <ol className="steps">
            {t.statement.steps.map((step, index) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: EASE_OUT }}
              >
                <span className="mono step-index">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
