import type { Locale } from "./site";

// Contenu du CV (une page A4). Importé uniquement côté serveur.
// Règle : l’expérience salariée reste générique, sans produit, client ni chiffre.

const fr = {
  meta: {
    title: "CV de Zié Daniogo, développeur full-stack (Laravel, React, React Native)",
    description:
      "CV de Zié Daniogo, développeur full-stack et IA basé à Abidjan, Côte d’Ivoire : applications web et mobiles (Laravel, React, React Native), intégration d’IA, mise en production.",
  },
  toolbar: {
    back: "Portfolio",
    print: "Imprimer",
    download: "Télécharger le PDF",
    language: "Langue du CV",
  },
  role: "Développeur full-stack et IA",
  pitch: "Applications web et mobiles avec intégration d’intelligence artificielle : je conçois les interfaces, j’écris le code et j’assure la mise en ligne, de bout en bout.",
  method: "Je travaille avec des agents IA spécialisés (code, tests, rédaction) et je relis chaque livraison avant qu’elle parte.",
  place: "Abidjan, Côte d’Ivoire",
  whatsapp: "WhatsApp",
  photo: "Portrait de Zié Daniogo",
  sections: {
    experience: "Expérience",
    skills: "Compétences",
    education: "Formation",
    languages: "Langues",
    interests: "Centres d’intérêt",
    portfolio: "Portfolio",
  },
  job: {
    org: "Comafrique Technologies",
    place: "Abidjan",
    dates: "depuis janvier 2023",
    title: "Développeur full-stack",
    highlights: [
      { title: "Livraison", body: "Applications web et mobiles livrées de bout en bout, du cadrage à la mise en ligne." },
      { title: "Architecture", body: "API, files d’attente et bases de données ; une même application déployée en plusieurs instances isolées." },
      { title: "Produit", body: "Parcours et interfaces dessinés avant le code, tests automatisés et revues de code." },
      { title: "Mobile", body: "Applications iOS et Android en React Native, écrans dessinés avant le code, envoi différé hors ligne." },
      { title: "IA", body: "Intégration de modèles de langage et de vision, voix, lecture de documents, recherche sémantique." },
      { title: "Production", body: "Serveurs Linux sur Oracle Cloud et Hetzner : mises en ligne, surveillance, sécurité." },
    ],
  },
  skills: [
    { title: "Interface", body: "React, Next.js, Inertia, TypeScript, Tailwind" },
    { title: "Back-end", body: "Laravel, PHP, Node, API, files d’attente, PostgreSQL et PostGIS, MySQL" },
    { title: "IA", body: "Modèles de langage et de vision, voix, OCR, recherche sémantique, Claude Code, Codex" },
    { title: "Mobile", body: "React Native, Expo, hors ligne, notifications push" },
    { title: "Qualité", body: "Pest, Vitest, Playwright" },
    { title: "Production", body: "Linux, Docker, Laravel Forge, Oracle Cloud, Hetzner, Git" },
  ],
  education: {
    school: "Pigier Côte d’Ivoire, Abidjan",
    body: "Développement d’applications. Admissible au BTS IDA (2022), licence 1 validée.",
  },
  languages: [
    { name: "Français, anglais", level: "" },
  ],
  interests: "Design d’interfaces, produit, football.",
  qr: "Portfolio, démonstrations et contact",
};

export type CvContent = typeof fr;

const en: CvContent = {
  meta: {
    title: "Résumé of Zié Daniogo, full-stack developer (Laravel, React, React Native)",
    description:
      "Résumé of Zié Daniogo, full-stack and AI developer based in Abidjan, Côte d’Ivoire: web and mobile applications (Laravel, React, React Native), AI integration, production releases.",
  },
  toolbar: {
    back: "Portfolio",
    print: "Print",
    download: "Download PDF",
    language: "Résumé language",
  },
  role: "Full-stack and AI developer",
  pitch: "Web and mobile applications with integrated artificial intelligence: I design the interfaces, write the code and handle the release, end to end.",
  method: "I work with specialized AI agents (code, tests, writing) and review every delivery before it goes out.",
  place: "Abidjan, Côte d’Ivoire",
  whatsapp: "WhatsApp",
  photo: "Portrait of Zié Daniogo",
  sections: {
    experience: "Experience",
    skills: "Skills",
    education: "Education",
    languages: "Languages",
    interests: "Interests",
    portfolio: "Portfolio",
  },
  job: {
    org: "Comafrique Technologies",
    place: "Abidjan",
    dates: "since January 2023",
    title: "Full-stack developer",
    highlights: [
      { title: "Delivery", body: "Web and mobile applications shipped end to end, from scoping to launch." },
      { title: "Architecture", body: "APIs, queues and databases; one application deployed as several isolated instances." },
      { title: "Product", body: "Flows and interfaces designed before any code, automated tests and code reviews." },
      { title: "Mobile", body: "iOS and Android apps in React Native, screens designed before any code, offline queueing." },
      { title: "AI", body: "Integration of language and vision models, voice, document reading, semantic search." },
      { title: "Production", body: "Linux servers on Oracle Cloud and Hetzner: releases, monitoring, security." },
    ],
  },
  skills: [
    { title: "Interface", body: "React, Next.js, Inertia, TypeScript, Tailwind" },
    { title: "Back end", body: "Laravel, PHP, Node, APIs, queues, PostgreSQL with PostGIS, MySQL" },
    { title: "AI", body: "Language and vision models, voice, OCR, semantic search, Claude Code, Codex" },
    { title: "Mobile", body: "React Native, Expo, offline, push notifications" },
    { title: "Quality", body: "Pest, Vitest, Playwright" },
    { title: "Production", body: "Linux, Docker, Laravel Forge, Oracle Cloud, Hetzner, Git" },
  ],
  education: {
    school: "Pigier Côte d’Ivoire, Abidjan",
    body: "Application development. Passed the BTS IDA admission (2022, two-year technical degree), first year of bachelor’s completed.",
  },
  languages: [
    { name: "French, English", level: "" },
  ],
  interests: "Interface design, product, football.",
  qr: "Portfolio, live demos and contact",
};

export const cv: Record<Locale, CvContent> = { fr, en };
