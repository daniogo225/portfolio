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
  pitch: "Je conçois, construis et mets en production des applications web, mobiles et IA, de la maquette au serveur.",
  method: "J’orchestre des agents IA spécialisés et je relis chaque livraison : la cadence d’une petite équipe, un seul responsable.",
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
    title: "Responsable technique de l’équipe Dev",
    path: "Arrivé comme développeur full-stack.",
    highlights: [
      { title: "Livraison", body: "Applications web et mobiles livrées de bout en bout, du cadrage à la mise en production." },
      { title: "Architecture", body: "Plateforme multi-instances déployée pour plusieurs entités d’un même groupe." },
      { title: "Encadrement", body: "Conduite technique de l’équipe : architecture, revues de code, choix techniques." },
      { title: "IA", body: "Agents IA et assistants vocaux intégrés dans des applications métier." },
      { title: "Cloud", body: "Serveurs déployés et exploités sur Oracle Cloud et Forge : mises en production, supervision." },
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
  pitch: "I design, build and ship web, mobile and AI applications, from mockup to production.",
  method: "I orchestrate specialized AI agents and review every delivery: the pace of a small team, one accountable person.",
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
    title: "Technical lead of the development team",
    path: "Joined as a full-stack developer.",
    highlights: [
      { title: "Delivery", body: "Web and mobile applications shipped end to end, from scoping to production." },
      { title: "Architecture", body: "Multi-instance platform deployed for several entities of the same group." },
      { title: "Leadership", body: "Team leadership: architecture, code reviews, technical choices." },
      { title: "AI", body: "AI agents and voice assistants built into business applications." },
      { title: "Cloud", body: "Servers deployed and run on Oracle Cloud and Forge: releases, monitoring." },
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
