"use client";

import type { ReactNode } from "react";
import { useSite } from "../site/SiteProvider";

/**
 * Scène commune des démonstrations : un fond sombre éclairé, la mention « Démonstration »
 * et la légende en tête, la note facultative en pied.
 */
export default function DemoFrame({
  label,
  note,
  className,
  children,
}: {
  label: string;
  note?: string;
  className?: string;
  children: ReactNode;
}) {
  const { t } = useSite();
  return (
    <figure className={["demo", className].filter(Boolean).join(" ")}>
      <figcaption className="demo-head">
        <span className="demo-tag">{t.demos.tag}</span>
        <span className="demo-label">{label}</span>
      </figcaption>
      <div className="demo-body">{children}</div>
      {note && <p className="demo-note">{note}</p>}
    </figure>
  );
}

/** Fenêtre d’application posée sur la scène : barre de titre décorative, puis le contenu. */
export function Window({
  title,
  icon,
  className,
  children,
}: {
  title?: ReactNode;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={["window", className].filter(Boolean).join(" ")}>
      <div className="window-bar" aria-hidden="true">
        <span className="window-dots">
          <i />
          <i />
          <i />
        </span>
        {title && (
          <span className="window-title">
            {icon}
            {title}
          </span>
        )}
      </div>
      <div className="window-body">{children}</div>
    </div>
  );
}
