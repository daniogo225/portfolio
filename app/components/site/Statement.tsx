"use client";

import Magnetic from "../ui/Magnetic";
import RevealText from "../ui/RevealText";
import { useSite } from "./SiteProvider";

/** Point de vue : une seule phrase, en grand, et un bouton rond vers le profil. */
export default function Statement() {
  const { t } = useSite();
  return (
    <section className="intro section" aria-labelledby="intro-title">
      <div className="shell">
        <div className="intro-grid">
          <RevealText as="h2" id="intro-title" className="intro-text" text={t.statement.text} interval={0.025} />
          <div className="intro-side">
            <Magnetic strength={0.35}>
              <a className="circle-button" href="#profile">
                <span>{t.statement.cta}</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
