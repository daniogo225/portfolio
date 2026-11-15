"use client";

import OrchestraDemo from "../demos/OrchestraDemo";
import RevealText from "../ui/RevealText";
import { useSite } from "./SiteProvider";

/**
 * Méthode : une phrase qui dit la règle (les agents avancent en parallèle, tout est relu), puis
 * le planning en pleine largeur. Rien d’autre : le planning porte la démonstration.
 */
export default function Method() {
  const { t } = useSite();

  return (
    <section id="method" className="method section" aria-labelledby="method-title">
      <div className="shell">
        <header className="method-head">
          <p className="section-label mono">
            <span>{t.method.label}</span>
          </p>
          <RevealText as="h2" id="method-title" className="section-title method-title" text={t.method.title} />
        </header>

        <div className="method-demo">
          <OrchestraDemo />
        </div>
      </div>
    </section>
  );
}
