import type { ReactNode } from "react";

/**
 * MacBook Pro en CSS : écran avec encoche, bordure noire fine, base aluminium avec l’échancrure
 * d’ouverture. L’écran est un conteneur, le contenu se mesure en unités de conteneur.
 */
export default function MacBook({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={["macbook", className].filter(Boolean).join(" ")} aria-hidden="true">
      <div className="macbook-lid">
        <div className="macbook-screen">
          <span className="macbook-notch" />
          {children}
        </div>
      </div>
      <div className="macbook-base">
        <span className="macbook-lip" />
      </div>
      <div className="macbook-shadow" />
    </div>
  );
}
