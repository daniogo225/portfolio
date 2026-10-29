"use client";

import ScrollText from "../ui/ScrollText";
import { useSite } from "./SiteProvider";

/** Point de vue : une seule phrase, en très grand, qui s’encre au fil de la lecture. */
export default function Statement() {
  const { t, calm } = useSite();
  return (
    <section className="intro section" aria-labelledby="intro-title">
      <div className="shell">
        <p className="section-label mono">
          <span>{t.statement.label}</span>
        </p>
        <ScrollText as="h2" id="intro-title" className="intro-text" text={t.statement.text} calm={calm} />
      </div>
    </section>
  );
}
