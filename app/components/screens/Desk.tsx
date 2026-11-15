"use client";

import { Check } from "lucide-react";
import type { CSSProperties } from "react";
import { useSite } from "../site/SiteProvider";

/**
 * Le back-office : une carte découpée en zones à gauche, la fiche du dossier à droite. Le
 * signalement y arrive résumé et classé, un responsable l’assigne, puis il passe à « Traité ».
 * Données fictives. Les mesures suivent la largeur de la fenêtre (unités de conteneur).
 */
export default function Desk({ plan }: { plan: number }) {
  const { t } = useSite();
  const copy = t.chain.desk;
  const arrived = plan >= 1;
  const open = arrived && plan < 3 ? 4 : 3;

  return (
    <div className="desk" data-plan={plan} data-arrived={arrived ? "" : undefined}>
      <div className="desk-bar">
        <span className="desk-app">
          <span className="desk-logo" />
          {copy.app}
        </span>
        <span className="desk-open">
          {copy.open}
          <strong key={open}>{open}</strong>
        </span>
      </div>

      <div className="desk-body">
        <div className="desk-map">
          <svg viewBox="0 0 400 330" preserveAspectRatio="xMinYMin slice">
            <rect className="map-ground" width="400" height="330" />
            {/* Trois zones, séparées par une lagune et un boulevard. */}
            <path className="map-zone is-north" d="M-10 -10h420v128c-58 14-104-6-162 6S136 150 78 138 20 120-10 128z" />
            <path className="map-water" d="M-10 128c30-8 30-2 88 10s112-2 170-14 104 8 162-6v44c-58 14-104-8-162 4S136 196 78 184 20 164-10 172z" />
            <path className="map-zone" d="M-10 172c30-8 30 0 88 12s112-6 170-18 104 8 162-4v82H-10z" />
            <path className="map-zone" d="M-10 252h420v90H-10z" />
            <path className="map-road" d="M-10 252h420M150 -10l22 150M286 -10l-18 122M92 190l26 150M262 172l30 170M-10 62l420-22" />
            <path className="map-bridge" d="M168 122l8 60" />
            <text className="map-label" x="18" y="30">
              {copy.zones[0]}
            </text>
            <text className="map-label" x="18" y="218">
              {copy.zones[1]}
            </text>
            <text className="map-label" x="18" y="282">
              {copy.zones[2]}
            </text>
            {/* Dossiers déjà ouverts ailleurs. */}
            <g className="map-pin" transform="translate(236 226)">
              <path d="M0 0c-7-9-10-13-10-18a10 10 0 0 1 20 0c0 5-3 9-10 18z" />
            </g>
            <g className="map-pin" transform="translate(112 306)">
              <path d="M0 0c-7-9-10-13-10-18a10 10 0 0 1 20 0c0 5-3 9-10 18z" />
            </g>
            <g className="map-pin" transform="translate(222 50)">
              <path d="M0 0c-7-9-10-13-10-18a10 10 0 0 1 20 0c0 5-3 9-10 18z" />
            </g>
            {/* Le nouveau signalement : trois signalements au même endroit, regroupés. */}
            <g transform="translate(128 98)">
              <circle className="map-ring" cy="-4" r="26" />
              <g className="map-new">
                <path className="map-new-pin" d="M0 0c-10-13-15-19-15-27a15 15 0 0 1 30 0c0 8-5 14-15 27z" />
                <text className="map-count" y="-26">
                  3
                </text>
                <path className="map-check" d="M-6.5-27l4.5 4.5 8.5-9" />
              </g>
            </g>
          </svg>
        </div>

        <div className="desk-file">
          <p className="desk-empty">{copy.empty}</p>
          <div className="desk-case">
            <p className="desk-ref">{copy.ref}</p>
            <p className="desk-title">{copy.title}</p>
            <div className="desk-summary" style={{ "--i": 0 } as CSSProperties}>
              <span>{copy.summaryLabel}</span>
              <p>{copy.summary}</p>
            </div>
            <dl className="desk-rows">
              {copy.rows.map((row, index) => (
                <div key={row.label} style={{ "--i": index + 1 } as CSSProperties}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            <div className="desk-action" style={{ "--i": copy.rows.length + 1 } as CSSProperties}>
              <span className="desk-assign">{copy.assign}</span>
              <ol className="desk-steps">
                {copy.steps.map((step, index) => (
                  <li key={step.label} data-done={plan >= index + 1 ? "" : undefined}>
                    <span className="desk-step-mark">
                      <Check strokeWidth={3} />
                    </span>
                    <span className="desk-step-label">{step.label}</span>
                    <time>{step.time}</time>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
