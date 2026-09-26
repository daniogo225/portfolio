import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daniogo Aboubakar | Ingénieur produit",
  description:
    "Ingénieur produit à Abidjan. Je transforme des contraintes métier complexes en produits web, mobile et IA fiables.",
  icons: {
    icon: {
      url: "/portraits/daniogo-product-engineer-cutout.png",
      type: "image/png",
    },
    apple: "/portraits/daniogo-product-engineer-cutout.png",
  },
  keywords: [
    "product engineer",
    "fullstack developer",
    "ai workflows",
    "react",
    "react native",
    "expo",
    "next.js",
    "inertia",
    "laravel",
    "typescript",
    "abidjan",
    "daniogo",
  ],
  openGraph: {
    title: "Daniogo Aboubakar | Ingénieur produit",
    description: "Je transforme la complexité métier en produits web, mobile et IA fiables.",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f2ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

// Applique le thème choisi avant le premier rendu pour éviter un flash de la mauvaise couleur.
const themeScript = `try{var t=localStorage.getItem("portfolio-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
