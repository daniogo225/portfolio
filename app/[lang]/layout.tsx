import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Newsreader, Public_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import "../sections.css";
import { isLocale, locales, person, siteUrl } from "../data/site";

// Titres : Newsreader 500 (axe opsz). Le mot mis en valeur en italique 400, couleur du texte.
const display = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

// Texte courant.
const sans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

// Étiquettes et détails.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
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
    <html lang={lang} className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
