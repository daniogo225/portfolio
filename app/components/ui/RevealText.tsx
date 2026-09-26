"use client";

import { motion, stagger, type Variants } from "motion/react";
import { Fragment } from "react";
import { parseEmphasis, plain } from "../../data/content";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type RevealTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  id?: string;
  delay?: number;
  interval?: number;
  /** « mount » joue l’animation au chargement, « view » à l’entrée dans l’écran. */
  mode?: "mount" | "view";
};

const word: Variants = {
  hidden: { y: "112%" },
  shown: { y: "0%", transition: { duration: 1, ease: EASE_OUT } },
};

/**
 * Révèle un texte mot à mot, chaque mot glissant hors d’un masque.
 * Le texte complet reste lisible par les lecteurs d’écran.
 */
export default function RevealText({
  text,
  as = "span",
  className,
  id,
  delay = 0,
  interval = 0.045,
  mode = "view",
}: RevealTextProps) {
  const Tag = motion[as];
  const words = parseEmphasis(text).flatMap((segment) =>
    segment.text
      .split(/[ \n\t]+/)
      .filter(Boolean)
      .map((value) => ({ value, em: segment.em })),
  );
  const container: Variants = {
    hidden: {},
    shown: { transition: { delayChildren: stagger(interval, { startDelay: delay }) } },
  };
  const trigger =
    mode === "mount"
      ? { animate: "shown" }
      : { whileInView: "shown", viewport: { once: true, amount: 0.35 } };

  return (
    <Tag className={className} id={id} initial="hidden" variants={container} {...trigger}>
      <span className="sr-only">{plain(text)}</span>
      <span aria-hidden="true">
        {words.map(({ value, em }, index) => (
          <Fragment key={`${text}-${index}`}>
            <span className="word-mask">
              <motion.span className={em ? "word word-em" : "word"} variants={word}>
                {value}
              </motion.span>
            </span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
