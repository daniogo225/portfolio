"use client";

import type { ReactNode } from "react";
import { useSite } from "../site/SiteProvider";

/**
 * Cadre commun des figures : un numéro et une légende en tête, comme dans un manuel technique,
 * une note facultative en pied. Le dessin lui-même vit sur le fond de la page, sans carte.
 */
export default function DemoFrame({
  number,
  label,
  note,
  className,
  children,
}: {
  number: string;
  label: string;
  note?: string;
  className?: string;
  children: ReactNode;
}) {
  const { t } = useSite();
  return (
    <figure className={["figure", className].filter(Boolean).join(" ")}>
      <figcaption className="figure-head">
        <span className="figure-number">
          {t.demos.tag} {number}
        </span>
        <span className="figure-label">{label}</span>
      </figcaption>
      <div className="figure-body">{children}</div>
      {note && <p className="figure-note">{note}</p>}
    </figure>
  );
}
