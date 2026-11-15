"use client";

import OrchestraDemo from "../demos/OrchestraDemo";
import RevealText from "../ui/RevealText";
import { useSite } from "./SiteProvider";

/** Méthode : une phrase qui dit la règle, et le planning qui la montre. Rien d’autre. */
export default function Method() {
  const { t } = useSite();

  return (
    <section id="method" className="method section" aria-labelledby="method-title">
      <div className="shell method-grid">
        <header className="method-head">
          <p className="section-label mono">{t.method.label}</p>
          <RevealText as="h2" id="method-title" className="method-title" text={t.method.title} />
        </header>
        <OrchestraDemo />
      </div>
    </section>
  );
}
