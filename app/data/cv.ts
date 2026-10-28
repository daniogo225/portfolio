import type { Locale } from "./site";

// Contenu du CV (une page A4). Importé uniquement côté serveur.
// Règle : l’expérience salariée reste générique, sans produit, client ni chiffre.

const fr = {
  meta: {
    title: "CV de Zié Daniogo, ingénieur produit full-stack et IA",
    description:
      "CV de Zié Daniogo, ingénieur produit full-stack et IA à Abidjan : applications web et mobiles, agents IA, montée en charge et déploiement cloud.",
  },
  toolbar: {
    back: "Portfolio",
    print: "Imprimer",
    download: "Télécharger le PDF",
    language: "Langue du CV",
  },
  role: "Ingénieur produit full-stack et IA",
  tagline: "De la maquette au *serveur.*",
  summary:
    "Je conçois, construis et mets en production des applications web et mobiles, des services et des agents IA. Responsable technique d’une équipe de développement, j’orchestre aussi des agents IA spécialisés pour livrer avec la cadence d’une petite équipe. Exigeant sur le design, la qualité et la fiabilité en production.",
  place: "Abidjan, Côte d’Ivoire",
  whatsapp: "WhatsApp",
  photo: "Portrait de Zié Daniogo",
  sections: {
    experience: "Expérience",
    missions: "Missions proposées",
    method: "Méthode",
    skills: "Compétences",
    education: "Formation",
    languages: "Langues",
    interests: "Centres d’intérêt",
    portfolio: "Portfolio",
  },
  experience: [
    {
      org: "Comafrique Technologies",
      place: "Abidjan",
      dates: "Depuis janvier 2023",
      role: "Développeur full-stack, aujourd’hui responsable technique de l’équipe Dev",
      bullets: [
        "Conception et livraison d’applications web et mobiles, du cadrage à la mise en production.",
        "Encadrement technique de l’équipe : architecture, revues de code, choix techniques et qualité.",
        "Intégration de l’IA dans les applications, de la conception à l’exploitation.",
        "Déploiement et exploitation de serveurs cloud : mise en production, supervision, sécurité.",
      ],
    },
  ],
  missions: [
    { title: "MVP SaaS", body: "lancer un produit web en quelques semaines, du cadrage au déploiement." },
    { title: "Agents IA et assistants vocaux", body: "des agents avec outils et une voix en temps réel, avec garde-fous." },
    { title: "Application mobile", body: "iOS et Android avec React Native et Expo, hors ligne compris." },
    { title: "Audit et montée en charge", body: "sécurité, performance, multi-instances, déploiement cloud." },
  ],
  method:
    "J’orchestre des agents IA spécialisés (développement, communication, exploitation des serveurs) : je cadre, je découpe, je relis et je décide. Un seul responsable, plusieurs chantiers en parallèle, une relecture humaine avant chaque livraison.",
  skills: [
    { title: "Produit et interface", body: "React, Next.js, Inertia, TypeScript, Tailwind. Parcours, maquettes, interfaces accessibles." },
    { title: "Back-end", body: "Laravel, PHP, Node. API, files d’attente, applications multi-instances." },
    {
      title: "Intelligence artificielle",
      body: "Agents avec outils, assistants vocaux temps réel, services IA en Node pour la montée en charge, ingénierie de contexte et de prompts.",
    },
    { title: "Mobile", body: "React Native, Expo." },
    { title: "Qualité et sécurité", body: "Pest, Vitest, Playwright. Audits de sécurité." },
    { title: "Cloud et outils", body: "Oracle Cloud (OCI), Forge, VPS, Docker, Git. Claude Code, Codex." },
  ],
  education: {
    school: "Pigier Côte d’Ivoire, Abidjan",
    body: "Informatique, développement d’applications : BTS IDA, licence 1 validée.",
  },
  languages: [
    { name: "Français", level: "courant" },
    { name: "Anglais", level: "" },
  ],
  interests: "Design d’interfaces, technologie, produit, football.",
  qr: "Scannez pour voir le portfolio et me contacter.",
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
  tagline: "From mockup to *production.*",
  summary:
    "I design, build and ship web and mobile applications, AI services and agents. As technical lead of a development team, I also orchestrate specialized AI agents to deliver at the pace of a small team. Demanding about design, quality and reliability in production.",
  place: "Abidjan, Côte d’Ivoire",
  whatsapp: "WhatsApp",
  photo: "Portrait of Zié Daniogo",
  sections: {
    experience: "Experience",
    missions: "Engagements",
    method: "Method",
    skills: "Skills",
    education: "Education",
    languages: "Languages",
    interests: "Interests",
    portfolio: "Portfolio",
  },
  experience: [
    {
      org: "Comafrique Technologies",
      place: "Abidjan",
      dates: "Since January 2023",
      role: "Full-stack developer, now technical lead of the development team",
      bullets: [
        "Design and delivery of web and mobile applications, from scoping to production.",
        "Technical leadership of the team: architecture, code reviews, technical choices and quality.",
        "Integration of AI into applications, from design to operations.",
        "Deployment and operation of cloud servers: releases, monitoring, security.",
      ],
    },
  ],
  missions: [
    { title: "SaaS MVP", body: "launch a web product in a few weeks, from scoping to deployment." },
    { title: "AI agents and voice assistants", body: "tool-using agents and real-time voice, with guardrails." },
    { title: "Mobile app", body: "iOS and Android with React Native and Expo, offline included." },
    { title: "Audit and scaling", body: "security, performance, multiple instances, cloud deployment." },
  ],
  method:
    "I orchestrate specialized AI agents (development, communication, server operations): I scope, split the work, review and decide. One accountable person, several workstreams in parallel, a human review before every delivery.",
  skills: [
    { title: "Product and interface", body: "React, Next.js, Inertia, TypeScript, Tailwind. User flows, mockups, accessible interfaces." },
    { title: "Back end", body: "Laravel, PHP, Node. APIs, queues, multi-instance applications." },
    {
      title: "Artificial intelligence",
      body: "Tool-using agents, real-time voice assistants, Node AI services built to scale, context and prompt engineering.",
    },
    { title: "Mobile", body: "React Native, Expo." },
    { title: "Quality and security", body: "Pest, Vitest, Playwright. Security audits." },
    { title: "Cloud and tools", body: "Oracle Cloud (OCI), Forge, VPS, Docker, Git. Claude Code, Codex." },
  ],
  education: {
    school: "Pigier Côte d’Ivoire, Abidjan",
    body: "Computer science, application development: BTS IDA (two-year technical degree), first year of bachelor’s completed.",
  },
  languages: [
    { name: "French", level: "fluent" },
    { name: "English", level: "" },
  ],
  interests: "Interface design, technology, product, football.",
  qr: "Scan to see the portfolio and get in touch.",
};

export const cv: Record<Locale, CvContent> = { fr, en };
