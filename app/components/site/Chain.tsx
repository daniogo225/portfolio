"use client";

import { ArrowUpRight, WifiOff } from "lucide-react";
import { useInView } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { whatsappUrl } from "../../data/site";
import IPhone from "../devices/IPhone";
import Desk from "../screens/Desk";
import FieldApp from "../screens/FieldApp";
import RevealText from "../ui/RevealText";
import { useSite } from "./SiteProvider";

// Durée d’un plan quand la séquence se joue seule.
const PLAN_MS = 6500;

/**
 * La démonstration : une seule demande suivie à travers toute la chaîne. Quatre plans (terrain,
 * tri, bureau, service), et chacun correspond à ce qu’on peut commander. La séquence se joue
 * seule tant qu’on ne touche à rien ; un clic sur un plan la fige. Le texte des quatre plans est
 * toujours dans la page : seul le plan choisi est affiché.
 */
export default function Chain() {
  const { t, calm } = useSite();
  const c = t.chain;
  const [plan, setPlan] = useState(0);
  const [auto, setAuto] = useState(true);
  const stage = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(stage, { amount: 0.5 });
  const playing = auto && inView && !calm;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setPlan((value) => (value + 1) % c.plans.length), PLAN_MS);
    return () => window.clearTimeout(timer);
  }, [playing, plan, c.plans.length]);

  function choose(index: number) {
    setAuto(false);
    setPlan(index);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const count = c.plans.length;
    let next = -1;
    if (event.key === "ArrowRight") next = (plan + 1) % count;
    else if (event.key === "ArrowLeft") next = (plan - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    if (next < 0) return;
    event.preventDefault();
    choose(next);
    tabs.current[next]?.focus();
  }

  const island =
    plan === 0 ? (
      <>
        <WifiOff className="island-icon" strokeWidth={2.4} />
        <span>{c.phone.island}</span>
      </>
    ) : undefined;

  return (
    <section id="demo" className="chain section" aria-labelledby="chain-title">
      <div className="shell">
        <header className="chain-head">
          <p className="section-label mono">
            <span>{c.label}</span>
            <span>{c.note}</span>
          </p>
          <RevealText as="h2" id="chain-title" className="chain-title" text={c.title} />
        </header>

        <div className="chain-stage" data-plan={plan}>
          <div ref={stage} className="chain-visual" aria-hidden="true">
            <div className="chain-phone" data-dim={plan === 1 || plan === 2 ? "" : undefined}>
              <IPhone time={plan === 3 ? "11:20" : plan === 0 ? "09:41" : "09:42"} offline={plan === 0} island={island}>
                <FieldApp plan={plan} />
              </IPhone>
            </div>
            <div className="chain-desk" data-dim={plan === 0 ? "" : undefined}>
              <Desk plan={plan} />
            </div>
          </div>
          <p className="sr-only">{c.alt}</p>

          <div className="chain-detail">
            {c.plans.map((item, index) => (
              <div
                key={item.id}
                id={`chain-panel-${item.id}`}
                role="tabpanel"
                aria-labelledby={`chain-tab-${item.id}`}
                className="chain-panel"
                data-active={plan === index ? "" : undefined}
                inert={plan !== index}
              >
                <h3 className="chain-offer">{item.offer}</h3>
                <p className="chain-body">{item.body}</p>
                <dl className="chain-facts">
                  <div>
                    <dt className="mono">{c.deliverLabel}</dt>
                    <dd>{item.deliver}</dd>
                  </div>
                  <div>
                    <dt className="mono">{c.toolsLabel}</dt>
                    <dd>{item.tools}</dd>
                  </div>
                </dl>
                <a className="text-link chain-cta" href={whatsappUrl(c.message.replace("{subject}", item.subject))} target="_blank" rel="noreferrer">
                  {item.cta}
                  <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div
          className="chain-timeline"
          role="tablist"
          aria-label={c.plansLabel}
          data-playing={playing ? "" : undefined}
          style={{ "--plan-ms": `${PLAN_MS}ms` } as CSSProperties}
        >
          {c.plans.map((item, index) => (
            <button
              key={item.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              id={`chain-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={plan === index}
              aria-controls={`chain-panel-${item.id}`}
              tabIndex={plan === index ? 0 : -1}
              data-past={index < plan ? "" : undefined}
              onClick={() => choose(index)}
              onKeyDown={onKeyDown}
            >
              <span className="chain-tab-track" aria-hidden="true">
                <span className="chain-tab-fill" />
              </span>
              <span className="chain-tab-index mono">0{index + 1}</span>
              <span className="chain-tab-name">{item.name}</span>
              <span className="chain-tab-offer">{item.offer}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
