import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
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
    <html lang="fr" className={`${bricolage.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
