import type { Locale } from "../data/content";
import NetworkGlobe from "./NetworkGlobe";

export default function ProjectVisual({ index, locale }: { index: number; locale: Locale }) {
  if (index === 0) {
    return (
      <div
        className="case-visual case-visual-contract"
        role="img"
        aria-label={locale === "fr" ? "Pipeline d’analyse contractuelle et rapport de risques" : "Contract analysis pipeline and risk report"}
      >
        <div className="visual-topline"><span>CONTRACT::PIPELINE</span><span>[ 00:47 ]</span></div>
        <div className="contract-flow">
          <div className="contract-source">
            <span>INPUT / 01</span>
            <strong>CONTRAT.PDF</strong>
            <small>24 PAGES / FR</small>
          </div>
          <pre className="contract-pipeline" aria-hidden="true">{`EXTRACT ──> CLASSIFY\n                │\nRECOMMEND <── SCORE`}</pre>
          <div className="contract-report">
            <div className="report-score"><span>RISK / 100</span><strong>68</strong></div>
            <ul>
              <li><span>01</span>TERMINATION <b>REVIEW</b></li>
              <li><span>02</span>LIABILITY <b>REVIEW</b></li>
              <li><span>03</span>JURISDICTION <b>CLEAR</b></li>
            </ul>
          </div>
        </div>
        <div className="scan-line" data-scan />
        <span className="visual-caption">{locale === "fr" ? "Entrée brute → décision lisible en moins de 60 secondes" : "Raw input → readable decision in under 60 seconds"}</span>
      </div>
    );
  }

  return (
    <div
      className="case-visual case-visual-globe"
      role="img"
      aria-label={locale === "fr" ? "Topologie conceptuelle des surfaces web, mobile, données et opérations" : "Conceptual topology of web, mobile, data, and operations surfaces"}
    >
      <div className="visual-topline"><span>SYSTEM::REACH</span><span>[ CONCEPTUAL ]</span></div>
      <div className="globe-layout">
        <div className="globe-stage">
          <NetworkGlobe />
          <span className="globe-origin">ABIDJAN<br />05.36°N</span>
        </div>
        <div className="globe-intelligence">
          <span className="globe-intelligence-label">DELIVERY::TOPOLOGY</span>
          <pre aria-hidden="true">{`WEB    ──┐\nMOBILE ──┼── DOMAIN ── PROD\nDATA   ──┘       │\n              OBSERVE`}</pre>
          <dl>
            <div><dt>WEB + MOBILE</dt><dd>{locale === "fr" ? "Surfaces métier partagées" : "Shared business surfaces"}</dd></div>
            <div><dt>DOMAIN + DATA</dt><dd>{locale === "fr" ? "Règles et audit préservés" : "Rules and audit preserved"}</dd></div>
            <div><dt>OPS + PROD</dt><dd>{locale === "fr" ? "Livraison et suivi continus" : "Continuous delivery and monitoring"}</dd></div>
          </dl>
        </div>
      </div>
      <span className="visual-caption">{locale === "fr" ? "Schéma conceptuel, détails opérationnels confidentiels" : "Conceptual map, operational details remain confidential"}</span>
    </div>
  );
}
