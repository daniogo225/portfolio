import type { MetadataRoute } from "next";
import { siteUrl } from "./data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { fr: "/", en: "/en", priority: 1 },
    { fr: "/cv", en: "/en/cv", priority: 0.6 },
  ];
  return pages.flatMap(({ fr, en, priority }) => {
    const languages = { fr: `${siteUrl}${fr}`, en: `${siteUrl}${en}` };
    return [
      { url: languages.fr, changeFrequency: "monthly" as const, priority, alternates: { languages } },
      { url: languages.en, changeFrequency: "monthly" as const, priority, alternates: { languages } },
    ];
  });
}
