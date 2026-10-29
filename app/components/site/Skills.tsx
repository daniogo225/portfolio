"use client";

import type { ReactNode } from "react";
import AgentDemo from "../demos/AgentDemo";
import OfflineDemo from "../demos/OfflineDemo";
import ProductDemo from "../demos/ProductDemo";
import ScaleDemo from "../demos/ScaleDemo";
import RevealText from "../ui/RevealText";
import { useSite } from "./SiteProvider";

/** Savoir-faire : quatre sections « feature » pleine largeur, blanc et noir en alternance. */
export default function Skills() {
  const { t, locale } = useSite();
  const demos: Record<string, ReactNode> = {
    product: <ProductDemo />,
    ai: <AgentDemo key={locale} />,
    scale: <ScaleDemo />,
    mobile: <OfflineDemo key={locale} />,
  };

  return (
    <div id="expertise" className="skills" aria-label={t.skills.label}>
      <section className="band">
        <div className="band-inner">
          <p className="eyebrow">{t.skills.label}</p>
          <RevealText as="h2" className="band-title" text={t.skills.title} />
          <p className="band-intro">{t.skills.intro}</p>
        </div>
      </section>
      {t.skills.items.map((item, index) => (
        <section key={item.id} className={index % 2 ? "feature band is-dark" : "feature band"} aria-labelledby={`skill-${item.id}`}>
          <div className="band-inner">
            <RevealText as="h2" id={`skill-${item.id}`} className="feature-title" text={item.headline} />
            <p className="feature-body">{item.body}</p>
          </div>
          <div className="feature-visual">{demos[item.id]}</div>
          <div className="band-inner feature-foot">
            <ul className="feature-points">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="feature-tools">
              <span>{t.skills.toolsLabel}</span> {item.tools}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
