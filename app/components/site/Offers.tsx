"use client";

import { ArrowDown, ArrowUpRight, Check, Plus } from "lucide-react";
import { useState } from "react";
import { whatsappUrl } from "../../data/site";
import RevealText from "../ui/RevealText";
import { useSite } from "./SiteProvider";

/**
 * Offres présentées en accordéon éditorial : une seule ouverte à la fois.
 * Le détail de chaque offre reste dans la page (lisible sans JavaScript et par les moteurs).
 */
export default function Offers() {
  const { t } = useSite();
  const [open, setOpen] = useState(0);

  return (
    <section id="offers" className="offers section" aria-labelledby="offers-title">
      <div className="shell offers-layout">
        <header className="offers-aside">
          <p className="section-label">
            <span>01</span>
            <span>{t.offers.label}</span>
          </p>
          <RevealText as="h2" id="offers-title" className="section-title" text={t.offers.title} />
          <p className="section-intro">{t.offers.intro}</p>
          <div className="offers-other">
            <p>{t.offers.other}</p>
            <a className="button button-ghost" href="#contact">
              <span className="roll" data-text={t.offers.otherCta}>
                <span>{t.offers.otherCta}</span>
              </span>
              <ArrowDown size={18} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </header>

        <ol className="offer-list">
          {t.offers.items.map((offer, index) => {
            const expanded = open === index;
            const panelId = `offer-panel-${offer.id}`;
            const triggerId = `offer-trigger-${offer.id}`;
            return (
              <li key={offer.id} className="offer" data-open={expanded ? "" : undefined}>
                <h3 className="offer-heading">
                  <button
                    id={triggerId}
                    type="button"
                    className="offer-trigger"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? -1 : index)}
                  >
                    <span className="offer-index">0{index + 1}</span>
                    <span className="offer-title">{offer.title}</span>
                    <span className="offer-tagline">{offer.tagline}</span>
                    <span className="offer-toggle" aria-hidden="true">
                      <Plus size={20} strokeWidth={1.5} />
                    </span>
                  </button>
                </h3>
                <div id={panelId} className="offer-panel" role="region" aria-labelledby={triggerId} inert={!expanded}>
                  <div className="offer-panel-inner">
                    <div className="offer-content">
                      <p className="offer-body">{offer.body}</p>
                      <div className="offer-columns">
                        <div className="offer-audience">
                          <h4>{t.offers.audienceLabel}</h4>
                          <p>{offer.audience}</p>
                        </div>
                        <div className="offer-side">
                          <h4>{t.offers.deliverablesLabel}</h4>
                          <ul className="offer-deliverables">
                            {offer.deliverables.map((item) => (
                              <li key={item}>
                                <Check size={15} strokeWidth={2.25} aria-hidden="true" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="offer-foot">
                        <p className="offer-stack">
                          <span className="mono">{t.offers.stackLabel}</span>
                          <span>{offer.stack}</span>
                        </p>
                        <a
                          className="button button-primary offer-cta"
                          href={whatsappUrl(t.offers.message.replace("{offer}", offer.subject))}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className="roll" data-text={t.offers.cta}>
                            <span>{t.offers.cta}</span>
                          </span>
                          <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
