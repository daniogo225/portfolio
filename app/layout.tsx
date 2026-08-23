import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${instrumentSerif.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
