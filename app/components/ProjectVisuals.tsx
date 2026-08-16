import type { Locale } from "../data/content";
import NetworkGlobe from "./NetworkGlobe";

export default function ProjectVisual({ index, locale }: { index: number; locale: Locale }) {
  if (index === 0) {
    return (
      <div className="case-visual case-visual-contract" aria-hidden="true">
        <div className="visual-topline"><span>CONTRACT::SCAN</span><span>[ RUNNING ]</span></div>
        <div className="contract-document">
          <div className="document-head"><span>RISK/REPORT</span><strong>68</strong></div>
          <div className="document-code">
            <span>01 / TERMINATION</span><b>REVIEW</b>
            <span>02 / LIABILITY</span><b>REVIEW</b>
            <span>03 / JURISDICTION</span><b>CLEAR</b>
            <span>04 / DATA</span><b>CLEAR</b>
          </div>
          <div className="document-bars"><i style={{ width: "68%" }} /><i style={{ width: "42%" }} /><i style={{ width: "82%" }} /></div>
        </div>
        <div className="scan-line" data-scan />
        <span className="visual-caption">{locale === "fr" ? "Analyse structurée en moins de 60 secondes" : "Structured analysis in under 60 seconds"}</span>
      </div>
    );
  }

  return (
    <div className="case-visual case-visual-globe" aria-hidden="true">
      <div className="visual-topline"><span>NETWORK::OPERATIONS</span><span>[ LIVE ]</span></div>
      <div className="globe-stage">
        <NetworkGlobe />
        <span className="globe-origin">ABIDJAN<br />05.36°N</span>
      </div>
      <div className="globe-readout">
        <span>WEB / MOBILE</span>
        <span>OPS / DATA</span>
        <span>CI / PROD</span>
      </div>
      <span className="visual-caption">{locale === "fr" ? "Des produits connectés au réel, depuis Abidjan" : "Products connected to reality, from Abidjan"}</span>
    </div>
  );
}
