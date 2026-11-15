"use client";

import { ArrowUp } from "lucide-react";
import { cvPdf, links } from "../../data/site";
import { useSite } from "./SiteProvider";

/** Pied de page, dans le prolongement du contact : la signature, trois liens, l’interrupteur des animations. */
export default function Footer() {
  const { t, locale, calm, setCalm } = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell footer-bar">
        <p className="footer-sign">
          © {year} Zié Daniogo. {t.footer.rights}.
        </p>

        <nav className="footer-links" aria-label={t.footer.linksLabel}>
          <div>
            <a href={links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={cvPdf(locale)} download>
              {t.footer.cv}
            </a>
            <a href={links.vcard} download>
              vCard
            </a>
          </div>
        </nav>

        <div className="footer-actions">
          {/* Un interrupteur : allumé, le site bouge ; éteint, plus rien ne bouge. L’état se lit sans légende. */}
          <button type="button" role="switch" className="chip-button switch" aria-checked={!calm} onClick={() => setCalm(!calm)}>
            {t.footer.motion}
            <span className="switch-track" aria-hidden="true">
              <span className="switch-thumb" />
            </span>
          </button>
          <a className="icon-button is-outlined" href="#top" aria-label={t.footer.top} title={t.footer.top}>
            <ArrowUp size={18} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
