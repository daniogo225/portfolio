"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import { useSite } from "./SiteProvider";

/** Liste des domaines. La ligne au centre de l’écran passe au premier plan pendant la lecture. */
export default function Expertise() {
  const { t, calm } = useSite();
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    list.querySelectorAll("li").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="expertise" className="expertise section" aria-labelledby="expertise-title">
      <div className="shell expertise-grid">
        <header className="expertise-head">
          <p className="section-label mono">
            <span>02</span>
            <span>{t.expertise.label}</span>
          </p>
          <RevealText as="h2" id="expertise-title" className="section-title" text={t.expertise.title} />
        </header>
        <ol ref={listRef} className="skills" data-focus={calm ? undefined : ""}>
          {t.expertise.groups.map((group, index) => (
            <motion.li
              key={group.title}
              data-index={index}
              data-active={active === index ? "" : undefined}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
            >
              <span className="skill-index mono">0{index + 1}</span>
              <h3 className="skill-title">{group.title}</h3>
              <p className="skill-body">{group.body}</p>
              <p className="skill-tools mono">{group.tools}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
