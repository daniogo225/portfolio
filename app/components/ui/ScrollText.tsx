"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Fragment, useRef } from "react";
import { parseEmphasis, plain } from "../../data/site";

// Opacité d’un mot encore à lire : assez présent pour qu’on devine la phrase entière.
const DIM = 0.14;

function Word({ value, em, index, count, progress }: { value: string; em: boolean; index: number; count: number; progress: MotionValue<number> }) {
  const start = index / count;
  const opacity = useTransform(progress, [start, Math.min(1, start + 1.5 / count)], [DIM, 1]);
  return (
    <motion.span className={em ? "word word-em" : "word"} style={{ opacity }}>
      {value}
    </motion.span>
  );
}

/**
 * Une phrase qui s’encre mot à mot au fil du défilement, comme si on la lisait. Sans animation,
 * elle s’affiche entière. Le texte complet reste lisible par les lecteurs d’écran.
 */
export default function ScrollText({
  text,
  as: Tag = "p",
  className,
  id,
  calm,
}: {
  text: string;
  as?: "h2" | "p";
  className?: string;
  id?: string;
  calm?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.82", "end 0.5"] });
  const words = parseEmphasis(text).flatMap((segment) =>
    segment.text
      .split(/[ \n\t]+/)
      .filter(Boolean)
      .map((value) => ({ value, em: segment.em })),
  );

  return (
    <Tag ref={ref as never} className={className} id={id}>
      <span className="sr-only">{plain(text)}</span>
      <span aria-hidden="true">
        {words.map(({ value, em }, index) => (
          <Fragment key={`${index}-${value}`}>
            {calm ? (
              <span className={em ? "word word-em" : "word"}>{value}</span>
            ) : (
              <Word value={value} em={em} index={index} count={words.length} progress={scrollYProgress} />
            )}
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
