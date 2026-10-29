"use client";

import { useSite } from "./SiteProvider";

/** Rangée des technologies : une ligne fixe, sans défilement. */
export default function Marquee() {
  const { t } = useSite();
  return (
    <div className="stack-row shell" aria-hidden="true">
      <ul className="mono">
        {t.marquee.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
