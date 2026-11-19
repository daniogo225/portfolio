import type { MetadataRoute } from "next";
import { lastUpdated, siteUrl } from "./data/site";

// Chaque page figure dans ses deux langues, avec ses alternatives (hreflang) et sa date de mise à jour.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { fr: "/", en: "/en", priority: 1 },
  ];
  return pages.flatMap(({ fr, en, priority }) => {
    const languages = { fr: `${siteUrl}${fr}`, en: `${siteUrl}${en}`, "x-default": `${siteUrl}${fr}` };
    const shared = { lastModified: lastUpdated, changeFrequency: "monthly" as const, priority, alternates: { languages } };
    return [
      { url: languages.fr, ...shared },
      { url: languages.en, ...shared },
    ];
  });
}
