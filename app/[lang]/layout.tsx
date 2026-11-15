import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import "../sections.css";
import { isLocale, locales, person, siteUrl } from "../data/site";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

// Police de titrage : droite pour les titres, italique pour le mot mis en valeur.
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

// Seules les deux langues existent : toute autre valeur donne une page 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Les pages complètent ces métadonnées communes (titre, description, URL, partage).
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: person.name,
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f2ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

// Applique le thème et le réglage des animations avant le premier rendu : ni flash de la mauvaise
// couleur, ni entrée qui démarre alors que le visiteur a coupé le mouvement.
const themeScript = `try{var d=document.documentElement,t=localStorage.getItem("portfolio-theme"),m=localStorage.getItem("portfolio-motion");if(t==="light"||t==="dark")d.dataset.theme=t;if(m!=="on"&&m!=="off")m=matchMedia("(prefers-reduced-motion: reduce)").matches?"off":"on";d.dataset.motion=m}catch(e){}`;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
