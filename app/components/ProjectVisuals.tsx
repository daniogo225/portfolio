import type { Locale } from "../data/content";

export default function ProjectVisual({ index, locale }: { index: number; locale: Locale }) {
  if (index === 0) {
    return (
      <div
        className="case-visual case-visual-contract"
        role="img"
        aria-label={locale === "fr" ? "Aperçu statique d’un rapport d’analyse contractuelle" : "Static preview of a contract analysis report"}
      >
        <div className="visual-topline"><span>CONTRACT REVIEW</span><span>00:47</span></div>
        <div className="contract-workspace">
          <div className="contract-document">
            <span>{locale === "fr" ? "Document source" : "Source document"}</span>
            <strong>CONTRAT.PDF</strong>
            <small>24 PAGES · FR</small>
            <div className="document-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          </div>
          <div className="contract-summary">
            <div className="summary-heading">
              <div><span>{locale === "fr" ? "Analyse terminée" : "Analysis complete"}</span><small>{locale === "fr" ? "3 points à vérifier" : "3 points to review"}</small></div>
              <strong>68<small>/100</small></strong>
            </div>
            <dl>
              <div><dt>{locale === "fr" ? "Résiliation" : "Termination"}</dt><dd>{locale === "fr" ? "À revoir" : "Review"}</dd></div>
              <div><dt>{locale === "fr" ? "Responsabilité" : "Liability"}</dt><dd>{locale === "fr" ? "À préciser" : "Clarify"}</dd></div>
              <div><dt>{locale === "fr" ? "Juridiction" : "Jurisdiction"}</dt><dd>{locale === "fr" ? "Conforme" : "Clear"}</dd></div>
            </dl>
            <p>{locale === "fr" ? "Recommandation prête à être relue et validée." : "Recommendation ready for review and validation."}</p>
          </div>
        </div>
        <span className="visual-caption">{locale === "fr" ? "Du document brut à une décision structurée" : "From raw document to structured decision"}</span>
      </div>
    );
  }

  return (
    <div
      className="case-visual case-visual-system"
      role="img"
      aria-label={locale === "fr" ? "Schéma statique reliant interfaces, règles métier, données et opérations" : "Static map connecting interfaces, business rules, data, and operations"}
    >
      <div className="visual-topline"><span>PRODUCT SYSTEM</span><span>ABIDJAN · CI</span></div>
      <div className="system-workspace">
        <div className="system-map">
          <div className="system-node system-node-mobile"><span>MOBILE</span><strong>{locale === "fr" ? "Terrain" : "Field"}</strong></div>
          <div className="system-node system-node-web"><span>WEB</span><strong>{locale === "fr" ? "Équipes" : "Teams"}</strong></div>
          <div className="system-core"><span>{locale === "fr" ? "Noyau métier" : "Business core"}</span><strong>{locale === "fr" ? "Règles + données" : "Rules + data"}</strong></div>
          <div className="system-node system-node-data"><span>DATA</span><strong>Audit</strong></div>
          <div className="system-node system-node-ops"><span>OPS</span><strong>Production</strong></div>
        </div>
        <div className="system-principles">
          <span>{locale === "fr" ? "Principes de livraison" : "Delivery principles"}</span>
          <dl>
            <div><dt>01</dt><dd>{locale === "fr" ? "Une règle métier, plusieurs interfaces" : "One business rule, multiple interfaces"}</dd></div>
            <div><dt>02</dt><dd>{locale === "fr" ? "Audit et permissions intégrés" : "Built-in audit and permissions"}</dd></div>
            <div><dt>03</dt><dd>{locale === "fr" ? "Déploiement et suivi continus" : "Continuous delivery and monitoring"}</dd></div>
          </dl>
        </div>
      </div>
      <span className="visual-caption">{locale === "fr" ? "Architecture conceptuelle, détails opérationnels confidentiels" : "Conceptual architecture, operational details remain confidential"}</span>
    </div>
  );
}
