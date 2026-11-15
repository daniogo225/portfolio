import type { Metadata } from "next";
import { content } from "./content";
import { lastUpdated, links, localePath, person, siteUrl, type Locale } from "./site";

/** Portrait utilisé par les moteurs de recherche pour la fiche de la personne (en noir, fond clair). */
const portrait = { url: `${siteUrl}/portraits/cv-portrait.jpg`, width: 600, height: 720 };

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
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      type: "profile",
      firstName: person.givenName,
      lastName: person.familyName,
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

const jobTitle: Record<Locale, string> = {
  fr: "Développeur full-stack et IA",
  en: "Full-stack and AI developer",
};

// Ce que la personne sait construire : technologies et types de systèmes, sans produit ni client.
const knowsAbout = [
  "Laravel",
  "PHP",
  "React",
  "Next.js",
  "TypeScript",
  "Inertia.js",
  "Tailwind CSS",
  "React Native",
  "Expo",
  "PostgreSQL",
  "PostGIS",
  "MySQL",
  "Docker",
  "Offline-first mobile apps",
  "AI integration",
  "Speech recognition",
  "Optical character recognition",
  "Semantic search",
];

/**
 * Données structurées schema.org de la page d’accueil : le site, la page de profil et la personne,
 * reliés par leurs identifiants. L’employeur n’y figure pas, comme sur le site.
 */
export function profileJsonLd(locale: Locale) {
  const t = content[locale];
  const url = `${siteUrl}${localePath(locale)}`;
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: person.name,
        inLanguage: ["fr", "en"],
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId },
        dateModified: lastUpdated,
        primaryImageOfPage: { "@type": "ImageObject", ...portrait },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: person.name,
        givenName: person.givenName,
        familyName: person.familyName,
        alternateName: person.fullName,
        jobTitle: jobTitle[locale],
        description: t.meta.description,
        url,
        image: { "@type": "ImageObject", ...portrait },
        email: `mailto:${links.email}`,
        telephone: links.tel.replace("tel:", ""),
        address: { "@type": "PostalAddress", addressLocality: "Abidjan", addressCountry: "CI" },
        workLocation: { "@type": "City", name: "Abidjan" },
        knowsLanguage: ["fr", "en"],
        knowsAbout,
        alumniOf: { "@type": "EducationalOrganization", name: "Pigier Côte d’Ivoire" },
        hasOccupation: {
          "@type": "Occupation",
          name: jobTitle[locale],
          occupationLocation: { "@type": "Country", name: "Côte d’Ivoire" },
          skills: knowsAbout.join(", "),
        },
        sameAs: [links.github],
      },
    ],
  };
}
