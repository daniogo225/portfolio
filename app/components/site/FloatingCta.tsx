"use client";

import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { whatsappUrl } from "../../data/site";
import { EASE_OUT } from "../ui/RevealText";
import { useSite } from "./SiteProvider";

/**
 * Appel à l’action toujours à portée de pouce : il apparaît après le hero
 * et s’efface quand la section contact ou le pied de page sont à l’écran.
 */
export default function FloatingCta() {
  const { t } = useSite();
  const { scrollY } = useScroll();
  const [past, setPast] = useState(false);
  const [covered, setCovered] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    setPast(value > window.innerHeight * 0.85);
  });

  useEffect(() => {
    const targets = [document.getElementById("contact"), document.querySelector(".site-footer")].filter(
      (element): element is HTMLElement => element !== null,
    );
    const seen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) seen.add(entry.target);
        else seen.delete(entry.target);
      });
      setCovered(seen.size > 0);
    });
    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const shown = past && !covered;

  return (
    <AnimatePresence>
      {shown && (
        <motion.a
          key="floating"
          className="floating-cta"
          href={whatsappUrl(t.hero.message)}
          target="_blank"
          rel="noreferrer"
          aria-label={t.floating.aria}
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.92 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
        >
          <MessageCircle size={22} strokeWidth={1.5} aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
