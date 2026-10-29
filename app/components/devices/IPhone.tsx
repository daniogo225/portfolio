import type { ReactNode } from "react";

/**
 * iPhone en CSS : châssis titane, écran bord à bord, Dynamic Island, boutons latéraux,
 * barre d’état et indicateur d’accueil. L’écran est un conteneur : son contenu se mesure
 * en unités de conteneur, donc l’appareil peut prendre n’importe quelle taille.
 */
export default function IPhone({ children, className, time = "9:41", status }: { children: ReactNode; className?: string; time?: string; status?: ReactNode }) {
  return (
    <div className={["iphone", className].filter(Boolean).join(" ")} aria-hidden="true">
      <span className="iphone-btn is-action" />
      <span className="iphone-btn is-vol-up" />
      <span className="iphone-btn is-vol-down" />
      <span className="iphone-btn is-power" />
      <div className="iphone-screen">
        <div className="iphone-status">
          <span className="iphone-time">{time}</span>
          <span className="iphone-island" />
          <span className="iphone-signals">
            {status ?? (
              <>
                <i className="iphone-cell" />
                <i className="iphone-wifi" />
                <i className="iphone-battery" />
              </>
            )}
          </span>
        </div>
        <div className="iphone-content">{children}</div>
        <span className="iphone-home" />
      </div>
    </div>
  );
}
