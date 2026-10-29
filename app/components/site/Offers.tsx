"use client";

import { ArrowDown, ArrowUpRight, Check, Plus } from "lucide-react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useState, type PointerEvent, type ReactNode } from "react";
import { whatsappUrl } from "../../data/site";
import IPhone from "../devices/IPhone";
import MacBook from "../devices/MacBook";
import AgentChat from "../screens/AgentChat";
import MobileApp, { type Task } from "../screens/MobileApp";
import WebApp from "../screens/WebApp";
import RevealText from "../ui/RevealText";
import { useSite } from "./SiteProvider";

/** L’appareil qui illustre chaque offre : le MacBook pour le web, l’iPhone pour le mobile et l’IA. */
function useDevices(): Record<string, ReactNode> {
  const { t } = useSite();
  // L’application hors ligne : deux actions attendent le retour du réseau, le reste est synchronisé.
  const offline = t.demos.offline;
  const tasks: Task[] = [
    { id: 10, label: offline.presets[0], done: false, sync: "pending" },
    { id: 11, label: offline.presets[2], done: true, sync: "pending" },
    { id: 0, label: offline.initial[0], done: true, sync: "synced" },
    { id: 1, label: offline.initial[1], done: false, sync: "synced" },
    { id: 12, label: offline.presets[3], done: false, sync: "synced" },
  ];
  return {
    mvp: (
      <MacBook className="preview-mac">
        <WebApp view="ui" modal={false} />
      </MacBook>
    ),
    ai: (
      <IPhone className="preview-phone">
        <AgentChat />
      </IPhone>
    ),
    mobile: (
      <IPhone className="preview-phone" offline>
        <MobileApp tasks={tasks} online={false} pending={2} />
      </IPhone>
    ),
    audit: (
      <MacBook className="preview-mac">
        <WebApp view="live" calm />
      </MacBook>
    ),
  };
}

/**
 * Offres en grandes lignes, sans cartes. Au survol d’une ligne, l’appareil qui l’illustre suit le
 * pointeur ; un clic ouvre le détail (lisible sans JavaScript et par les moteurs).
 */
export default function Offers() {
  const { t, calm } = useSite();
  const devices = useDevices();
  const [open, setOpen] = useState(-1);
  const [hover, setHover] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });

  function follow(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    x.set(event.clientX);
    y.set(event.clientY);
  }

  return (
    <section id="offers" className="offers section" aria-labelledby="offers-title">
      <div className="shell">
        <header className="section-head">
          <p className="section-label mono">
            <span>01</span>
            <span>{t.offers.label}</span>
          </p>
          <RevealText as="h2" id="offers-title" className="section-title" text={t.offers.title} />
          <p className="section-intro">{t.offers.intro}</p>
        </header>

        <ol className="offer-list" onPointerMove={follow} onPointerLeave={() => setHover(null)}>
          {t.offers.items.map((offer, index) => {
            const expanded = open === index;
            const panelId = `offer-panel-${offer.id}`;
            const triggerId = `offer-trigger-${offer.id}`;
            return (
              <li
                key={offer.id}
                className="offer"
                data-open={expanded ? "" : undefined}
                data-dim={hover !== null && hover !== index ? "" : undefined}
              >
                <h3 className="offer-heading">
                  <button
                    id={triggerId}
                    type="button"
                    className="offer-trigger"
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => setOpen(expanded ? -1 : index)}
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") setHover(index);
                    }}
                    onPointerLeave={() => setHover(null)}
                  >
                    <span className="offer-index mono">0{index + 1}</span>
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
                      <div className="offer-copy">
                        <p className="offer-body">{offer.body}</p>
                        <div className="offer-columns">
                          <div>
                            <h4 className="mono">{t.offers.audienceLabel}</h4>
                            <p className="offer-audience">{offer.audience}</p>
                          </div>
                          <div>
                            <h4 className="mono">{t.offers.deliverablesLabel}</h4>
                            <ul className="offer-deliverables">
                              {offer.deliverables.map((item) => (
                                <li key={item}>
                                  <Check size={15} strokeWidth={2} aria-hidden="true" />
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
                            className="button button-primary"
                            href={whatsappUrl(t.offers.message.replace("{offer}", offer.subject))}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span className="roll" data-text={t.offers.cta}>
                              <span>{t.offers.cta}</span>
                            </span>
                            <ArrowUpRight size={17} strokeWidth={1.75} aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                      <div className="offer-device" aria-hidden="true">
                        {devices[offer.id]}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="offers-other">
          <p>{t.offers.other}</p>
          <a className="text-link" href="#contact">
            {t.offers.otherCta}
            <ArrowDown size={16} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>

      <motion.div
        className="offer-preview"
        aria-hidden="true"
        data-shown={hover !== null && hover !== open ? "" : undefined}
        style={calm ? { x, y } : { x: sx, y: sy }}
      >
        <div className="offer-preview-inner">
          {t.offers.items.map((offer, index) => (
            <div key={offer.id} className="offer-preview-item" data-active={hover === index ? "" : undefined}>
              {devices[offer.id]}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
