import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo", display: "swap" });
const sans = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-plex-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: "500", variable: "--font-plex-mono", display: "swap", preload: false });

export const metadata: Metadata = {
  title: "Page introuvable | Zié Daniogo",
  robots: { index: false },
};

// Page 404 commune aux deux langues : le site n’a pas de mise en page racine hors de [lang].
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <main className="not-found shell">
          <p className="mono">404</p>
          <h1>Cette page n’existe pas.</h1>
          <p lang="en" className="not-found-en">
            This page does not exist.
          </p>
          <div className="not-found-actions">
            <Link className="button button-primary" href="/">
              Retour au portfolio
            </Link>
            <Link className="button button-ghost" href="/en" hrefLang="en" lang="en">
              Back to the portfolio
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
