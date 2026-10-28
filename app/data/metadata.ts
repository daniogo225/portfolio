import type { Metadata } from "next";
import { content } from "./content";
import { links, localePath, person, siteUrl, type Locale } from "./site";

/** Métadonnées complètes d’une page : titre, description, URL canonique, alternatives de langue, partage. */
export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  const t = content[locale];
  const url = localePath(locale, path);
  const image = { url: `/og/og-${locale}.png`, width: 1200, height: 630, alt: t.meta.ogAlt };
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { fr: localePath("fr", path), en: localePath("en", path), "x-default": localePath("fr", path) },
    },
    openGraph: {
      type: "website",
      siteName: person.name,
      url,
      title,
      description,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

/** Données structurées schema.org de la personne, pour les moteurs de recherche. */
export function personJsonLd(locale: Locale) {
  const t = content[locale];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    alternateName: person.fullName,
    jobTitle: locale === "fr" ? "Ingénieur produit full-stack et IA" : "Full-stack and AI product engineer",
    description: t.meta.description,
    url: `${siteUrl}${localePath(locale)}`,
    image: `${siteUrl}/og/og-${locale}.png`,
    email: `mailto:${links.email}`,
    telephone: links.tel.replace("tel:", ""),
    address: { "@type": "PostalAddress", addressLocality: "Abidjan", addressCountry: "CI" },
    knowsLanguage: ["fr", "en"],
    knowsAbout: [
      "Laravel",
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "Expo",
      "Node.js",
      "AI agents",
      "Voice assistants",
      "Oracle Cloud Infrastructure",
    ],
    sameAs: [links.github],
  };
}
