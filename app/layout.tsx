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
  title: "Daniogo — Product Engineer",
  description:
    "Product engineer in Abidjan building web and mobile products with Laravel, Inertia, React, React Native, Expo, AI workflows, and production discipline.",
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
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
