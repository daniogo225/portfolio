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
    "I don't ship apps. I ship experiences. Product engineering powered by 6+ years of craft and AI-native velocity. Based in Abidjan, working with teams worldwide.",
  keywords: [
    "product engineer",
    "fullstack developer",
    "ai-native",
    "react",
    "next.js",
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
