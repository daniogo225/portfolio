import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap", preload: false });

export const metadata: Metadata = {
  title: "Page introuvable | Zié Daniogo",
  robots: { index: false },
};

// Page 404 commune aux deux langues : le site n’a pas de mise en page racine hors de [lang].
export default function GlobalNotFound() {
  return (
    <html lang="fr" className={`${sans.variable} ${mono.variable}`}>
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
