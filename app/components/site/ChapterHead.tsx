"use client";

import { motion } from "motion/react";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import { useSite } from "./SiteProvider";

/**
 * Tête de chapitre commune : numéro et nom sur un filet, le titre en serif à gauche,
 * l’introduction à droite, calée sur la ligne de base du titre.
 */
export default function ChapterHead({
  number,
  label,
  title,
  intro,
  id,
  compact,
}: {
  number: string;
  label: string;
  title: string;
  intro?: string;
  id: string;
  compact?: boolean;
}) {
  const { t } = useSite();
  return (
    <header className={compact ? "chapter-head is-compact" : "chapter-head"}>
      <p className="chapter-meta mono">
        <span>
          {t.chapter} {number}
        </span>
        <span>{label}</span>
      </p>
      <RevealText as="h2" id={id} className="chapter-title" text={title} />
      {intro && (
        <motion.p
          className="chapter-intro"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
        >
          {intro}
        </motion.p>
      )}
    </header>
  );
}
