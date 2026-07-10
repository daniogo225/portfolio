import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import { I18nProvider } from "./i18n";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daniogo — Ingénieur produit",
  description:
    "Ingénieur produit à Abidjan. Je conçois et livre des systèmes web, mobile et IA pensés pour la production.",
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
    <html lang="fr" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} dark`}>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
