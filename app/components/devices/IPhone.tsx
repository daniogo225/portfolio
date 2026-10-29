import type { ReactNode } from "react";

/**
 * iPhone 16 Pro en CSS : châssis titane, verre noir, Dynamic Island, boutons latéraux, barre
 * d’état aux icônes d’iOS et indicateur d’accueil. L’écran est un conteneur : son contenu se
 * mesure en unités de conteneur (1 cqw = 1 % de la largeur de l’écran), à n’importe quelle taille.
 */

function Signal({ off }: { off?: boolean }) {
  // Quatre barres, comme iOS. Sans réseau, elles passent en gris clair.
  return (
    <svg className="ios-signal" viewBox="0 0 18 12" data-off={off ? "" : undefined}>
      <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.9" />
      <rect x="4.9" y="5" width="3.2" height="7" rx="0.9" />
      <rect x="9.8" y="2.5" width="3.2" height="9.5" rx="0.9" />
      <rect x="14.7" y="0" width="3.2" height="12" rx="0.9" />
    </svg>
  );
}

function Wifi() {
  return (
    <svg className="ios-wifi" viewBox="0 0 16 12">
      <path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .6 10.4 10.4 0 0 0 .8 3.5L2 4.8a8.6 8.6 0 0 1 6-2.4Z" />
      <path d="M8 6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.6 6.6 0 0 0 8 4.2c-1.8 0-3.4.7-4.6 1.8l1.2 1.3C5.5 6.5 6.7 6 8 6Z" />
      <path d="M8 9.6c.4 0 .8.2 1.1.4L8 11.4 6.9 10c.3-.2.7-.4 1.1-.4Z" />
    </svg>
  );
}

function Battery() {
  return (
    <svg className="ios-battery" viewBox="0 0 27 13">
      <rect className="ios-battery-shell" x="0.5" y="0.5" width="23" height="12" rx="3.8" />
      <rect className="ios-battery-level" x="2" y="2" width="20" height="9" rx="2.4" />
      <path className="ios-battery-cap" d="M25 4.4v4.2c.8-.3 1.4-1.1 1.4-2.1S25.8 4.7 25 4.4Z" />
    </svg>
  );
}

export default function IPhone({
  children,
  className,
  time = "9:41",
  offline,
  island,
}: {
  children: ReactNode;
  className?: string;
  time?: string;
  offline?: boolean;
  /** Activité en direct : l’îlot s’élargit et affiche ce contenu, comme sur iOS. */
  island?: ReactNode;
}) {
  return (
    <div className={["iphone", className].filter(Boolean).join(" ")} aria-hidden="true">
      <span className="iphone-btn is-action" />
      <span className="iphone-btn is-vol-up" />
      <span className="iphone-btn is-vol-down" />
      <span className="iphone-btn is-power" />
      <span className="iphone-btn is-camera" />
      <div className="iphone-glass">
        <div className="iphone-screen">
          <div className="iphone-status">
            <span className="iphone-time">{time}</span>
            <span className="iphone-island" data-live={island ? "" : undefined}>
              <span className="iphone-island-content">{island}</span>
            </span>
            <span className="iphone-signals">
              <Signal off={offline} />
              {!offline && <Wifi />}
              <Battery />
            </span>
          </div>
          <div className="iphone-content">{children}</div>
          <span className="iphone-home" />
        </div>
      </div>
    </div>
  );
}
