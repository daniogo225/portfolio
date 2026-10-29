import type { ReactNode } from "react";

/**
 * MacBook Pro argent en CSS, vu de face : liseré aluminium, verre noir, encoche, charnière et
 * base avec son échancrure d’ouverture. L’écran est un conteneur : son contenu se mesure en
 * unités de conteneur (1 cqw = 1 % de la largeur de l’écran).
 */
export default function MacBook({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={["macbook", className].filter(Boolean).join(" ")} aria-hidden="true">
      <span className="macbook-shadow" />
      <div className="macbook-lid">
        <div className="macbook-bezel">
          <div className="macbook-screen">
            {children}
            <span className="macbook-notch" />
          </div>
        </div>
      </div>
      <div className="macbook-hinge" />
      <div className="macbook-base">
        <span className="macbook-scoop" />
      </div>
    </div>
  );
}
