import type { Metadata } from "next";
import { ThemeProvider } from "./components/ThemeProvider";
import { I18nProvider } from "./i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "DANI — Senior Fullstack Developer & SaaS Founder",
  description:
    "I build products that solve real problems for African businesses. Senior Fullstack Developer & SaaS Founder based in Abidjan, Côte d'Ivoire.",
  keywords: [
    "developer",
    "fullstack",
    "laravel",
    "react",
    "saas",
    "portfolio",
    "abidjan",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
