"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { motion } from "motion/react";
import { whatsappUrl } from "../../data/site";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import { useSite } from "./SiteProvider";

/** Offres : une grille de tuiles arrondies, comme les « Pourquoi » d’une page produit. */
export default function Offers() {
  const { t } = useSite();
  return (
    <section id="offers" className="offers band is-gray" aria-labelledby="offers-title">
      <div className="band-inner">
        <p className="eyebrow">{t.offers.label}</p>
        <RevealText as="h2" id="offers-title" className="band-title" text={t.offers.title} />
        <p className="band-intro">{t.offers.intro}</p>
      </div>
      <div className="tiles">
        {t.offers.items.map((offer, index) => (
          <motion.article
            key={offer.id}
            className="tile"
            aria-labelledby={`offer-${offer.id}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease: EASE_OUT }}
          >
            <p className="tile-tag">0{index + 1}</p>
            <h3 id={`offer-${offer.id}`} className="tile-title">
              {offer.title}
            </h3>
            <p className="tile-tagline">{offer.tagline}</p>
            <p className="tile-body">{offer.body}</p>
            <ul className="tile-list">
              {offer.deliverables.map((item) => (
                <li key={item}>
                  <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="tile-stack">{offer.stack}</p>
            <a className="link-arrow" href={whatsappUrl(t.offers.message.replace("{offer}", offer.subject))} target="_blank" rel="noreferrer">
              {t.offers.cta}
              <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
            </a>
          </motion.article>
        ))}
      </div>
      <p className="offers-other">
        {t.offers.other}{" "}
        <a className="link-arrow" href="#contact">
          {t.offers.otherCta}
        </a>
      </p>
    </section>
  );
}
