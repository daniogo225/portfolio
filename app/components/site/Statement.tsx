"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Fragment, useRef } from "react";
import { parseEmphasis, plain } from "../../data/site";
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
  // Même « éteint », un mot garde un contraste suffisant pour un grand texte (3:1).
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <motion.span className={em ? "statement-word word-em" : "statement-word"} style={{ opacity }}>
      {children}
    </motion.span>
  );
}

/** Déclaration épinglée : la page défile, la phrase reste et s’allume mot à mot. */
export default function Statement() {
  const { t, calm } = useSite();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = parseEmphasis(t.statement.text).flatMap((segment) =>
    segment.text
      .split(/[ \n\t]+/)
      .filter(Boolean)
      .map((value) => ({ value, em: segment.em })),
  );

  return (
    <section className="statement" aria-labelledby="statement-label">
      <div ref={ref} className="statement-track">
        <div className="statement-pin">
        <div className="shell statement-grid">
          <h2 className="section-label" id="statement-label">
            <span>{t.statement.label}</span>
          </h2>
          <p className="statement-text">
            <span className="sr-only">{plain(t.statement.text)}</span>
            <span aria-hidden="true">
              {words.map(({ value, em }, index) => (
                <Fragment key={`${t.statement.text}-${index}`}>
                  {calm ? (
                    <span className={em ? "statement-word word-em" : "statement-word"}>{value}</span>
                  ) : (
                    <Word progress={scrollYProgress} range={[(index / words.length) * 0.85, ((index + 1) / words.length) * 0.85]} em={em}>
                      {value}
                    </Word>
                  )}
                  {index < words.length - 1 ? " " : null}
                </Fragment>
              ))}
            </span>
          </p>
        </div>
        </div>
      </div>

      <div className="shell">
        <ol className="statement-points">
          {t.statement.points.map((point, index) => (
            <motion.li
              key={point.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: index * 0.12, ease: EASE_OUT }}
            >
              <span className="step-index mono">0{index + 1}</span>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
