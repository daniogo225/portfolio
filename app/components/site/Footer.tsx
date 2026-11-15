"use client";

import { ArrowUp, Pause, Play } from "lucide-react";
import { cvPdf, links } from "../../data/site";
import { useSite } from "./SiteProvider";

/** Pied de page, dans le prolongement du contact : la signature, trois liens, la pause des animations. */
export default function Footer() {
  const { t, locale, paused, setPaused } = useSite();
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
          <button
            type="button"
            className="chip-button"
            aria-pressed={paused}
            aria-label={paused ? t.footer.play : t.footer.pause}
            onClick={() => setPaused(!paused)}
          >
            {t.footer.motion}
            {paused ? <Play size={14} strokeWidth={2} aria-hidden="true" /> : <Pause size={14} strokeWidth={2} aria-hidden="true" />}
          </button>
          <a className="icon-button is-outlined" href="#top" aria-label={t.footer.top} title={t.footer.top}>
            <ArrowUp size={18} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
