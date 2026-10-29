"use client";

import { ArrowUp, Pause, Play } from "lucide-react";
import { cvPdf, links, whatsappUrl } from "../../data/site";
import useAbidjanTime from "../ui/useAbidjanTime";
import { useSite } from "./SiteProvider";

/** Pied de page, dans le prolongement du contact : édition, heure locale, liens. */
export default function Footer() {
  const { t, locale, paused, setPaused } = useSite();
  const year = new Date().getFullYear();
  const time = useAbidjanTime();

  return (
    <footer className="site-footer">
      <div className="shell footer-bar">
        <div className="footer-meta">
          <div>
            <p className="mono">{t.footer.version}</p>
            <p>
              {year} © Zié Daniogo
            </p>
          </div>
          <div>
            <p className="mono">{t.footer.localTime}</p>
            <p>
              <time>{time || "--:--"}</time> UTC+0, Abidjan
            </p>
          </div>
        </div>

        <nav className="footer-links" aria-label={t.footer.linksLabel}>
          <p className="mono">{t.footer.linksLabel}</p>
          <div>
            <a href={whatsappUrl(t.hero.message)} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
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
      <p className="sr-only">{t.footer.rights}</p>
    </footer>
  );
}
