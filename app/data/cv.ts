import type { Locale } from "./site";

// Contenu du CV (une page A4). Importé uniquement côté serveur.
// Règle : l’expérience salariée reste générique, sans produit, client ni chiffre.

const fr = {
  meta: {
    title: "CV de Zié Daniogo, ingénieur produit full-stack et IA",
    description:
      "CV de Zié Daniogo, ingénieur produit full-stack et IA à Abidjan : applications web et mobiles, agents IA, montée en charge et déploiement cloud.",
  },
  toolbar: {
    back: "Portfolio",
    print: "Imprimer",
    download: "Télécharger le PDF",
    language: "Langue du CV",
  },
  role: "Ingénieur produit full-stack et IA",
  pitch: "Je conçois toute la chaîne d’applications web, mobiles et IA, de l’idée à la mise en ligne.",
  method: "J’orchestre des agents IA spécialisés et je relis chaque livraison : la cadence d’une petite équipe, un seul interlocuteur.",
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
      { title: "Architecture", body: "Une même plateforme déployée séparément pour plusieurs sociétés d’un groupe." },
      { title: "Produit", body: "Interfaces conçues avec les utilisateurs métier, tests automatisés et revues de code." },
      { title: "IA", body: "Agents IA et assistants vocaux intégrés dans des applications métier." },
      { title: "Cloud", body: "Serveurs installés et maintenus sur Oracle Cloud et Forge : mises en ligne, surveillance." },
      { title: "Sécurité", body: "Audits de sécurité des applications et correction des failles." },
    ],
  },
  skills: [
    { title: "Interface", body: "React, Next.js, Inertia, TypeScript, Tailwind" },
    { title: "Back-end", body: "Laravel, PHP, Node, API, files d’attente" },
    { title: "IA", body: "Agents avec outils, voix en temps réel, ingénierie de contexte, Claude Code, Codex" },
    { title: "Mobile", body: "React Native, Expo" },
    { title: "Qualité", body: "Pest, Vitest, Playwright" },
    { title: "Cloud", body: "Oracle Cloud, Forge, Docker, VPS, Git" },
  ],
  education: {
    school: "Pigier Côte d’Ivoire, Abidjan",
    body: "Développement d’applications. Admissible au BTS IDA (2022), licence 1 validée.",
  },
  languages: [
    { name: "Français", level: "courant" },
    { name: "Anglais", level: "" },
  ],
  interests: "Design d’interfaces, produit, football.",
  qr: "Portfolio, démonstrations et contact",
};

export type CvContent = typeof fr;

const en: CvContent = {
  meta: {
    title: "Résumé of Zié Daniogo, full-stack and AI product engineer",
    description:
      "Résumé of Zié Daniogo, full-stack and AI product engineer in Abidjan: web and mobile apps, AI agents, scaling and cloud deployment.",
  },
  toolbar: {
    back: "Portfolio",
    print: "Print",
    download: "Download PDF",
    language: "Résumé language",
  },
  role: "Full-stack and AI product engineer",
  pitch: "I build web, mobile and AI applications end to end, from idea to launch.",
  method: "I orchestrate specialized AI agents and review every delivery: the pace of a small team, a single point of contact.",
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
      { title: "Architecture", body: "One platform deployed separately for several companies of the same group." },
      { title: "Product", body: "Interfaces designed with business users, automated tests and code reviews." },
      { title: "AI", body: "AI agents and voice assistants built into business applications." },
      { title: "Cloud", body: "Servers set up and maintained on Oracle Cloud and Forge: releases, monitoring." },
      { title: "Security", body: "Application security audits and vulnerability fixes." },
    ],
  },
  skills: [
    { title: "Interface", body: "React, Next.js, Inertia, TypeScript, Tailwind" },
    { title: "Back end", body: "Laravel, PHP, Node, APIs, queues" },
    { title: "AI", body: "Tool-using agents, real-time voice, context engineering, Claude Code, Codex" },
    { title: "Mobile", body: "React Native, Expo" },
    { title: "Quality", body: "Pest, Vitest, Playwright" },
    { title: "Cloud", body: "Oracle Cloud, Forge, Docker, VPS, Git" },
  ],
  education: {
    school: "Pigier Côte d’Ivoire, Abidjan",
    body: "Application development. Passed the BTS IDA admission (2022, two-year technical degree), first year of bachelor’s completed.",
  },
  languages: [
    { name: "French", level: "fluent" },
    { name: "English", level: "" },
  ],
  interests: "Interface design, product, football.",
  qr: "Portfolio, live demos and contact",
};

export const cv: Record<Locale, CvContent> = { fr, en };
