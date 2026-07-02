"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Locale = "en" | "fr";

const translations = {
  en: {
    nav: {
      manifesto: "Manifesto",
      approach: "Approach",
      work: "Work",
      capabilities: "Capabilities",
      process: "Process",
      about: "About",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Index — Daniogo",
      availability: "Product engineer · Abidjan",
      titleLine1: "I build products",
      titleLine2Pre: "that hold up in ",
      titleLine2Highlight: "production",
      titleLine2Post: ".",
      sub: "Web and mobile product engineering across Laravel, Inertia, React, React Native, Expo, AI workflows, and real production constraints.",
      ctaPrimary: "Discuss product",
      ctaSecondary: "See selected work",
      scroll: "Scroll",
      location: "Daniogo · Abidjan",
    },
    manifesto: {
      section: "01",
      sectionLabel: "Manifesto",
      title: "Most software gets built. Few products get crafted.",
      body1: "Anyone can ship an app today. AI made that part easy.",
      body2: "What's hard — what still separates a product people use from one they love — is the thinking behind every decision. The friction you removed. The detail nobody asked for, but everyone notices.",
      body3: "That's the part I obsess over.",
    },
    approach: {
      section: "02",
      sectionLabel: "Approach",
      title: "How I think.",
      subtitle: "Five principles. They show up in every line of code I ship.",
      pillars: [
        {
          title: "Craft over output",
          body: "Six years of building production software taught me one thing: the decision you make today shows up in two years. I optimize for the version of the codebase your future team will inherit — not the demo you're showing on Friday.",
        },
        {
          title: "AI as leverage, not crutch",
          body: "AI doesn't replace engineering judgment. It amplifies it. I use it to move 3x faster on the parts that should be fast — so I can spend real time on the parts that need a human brain.",
        },
        {
          title: "Product thinking first",
          body: "I don't start with the stack. I start with: who is this for, what changes for them, and why now? If those answers aren't sharp, no amount of clean code will save the product.",
        },
        {
          title: "Experiences, not features",
          body: "A feature solves a problem. An experience makes someone come back. The gap between the two is in the details — the easings, the empty states, the way errors actually help. That gap is where I live.",
        },
        {
          title: "Owner mindset",
          body: "I don't show up as a contractor. I show up as someone who's going to feel personally responsible if your product underperforms. That's not a posture — it's how I work.",
        },
      ],
    },
    work: {
      section: "03",
      sectionLabel: "Selected Work",
      title: "Production proof.",
      subtitle: "A public AI product, and the enterprise product engineering I use every day at Comafrique Technologies.",
      visitLabel: "Visit project",
      caseStudyLabel: "Read case",
      items: [
        {
          title: "ContractTchecker",
          tagline: "AI-powered contract analysis for the African market.",
          description: "They had legal contracts that took 3 days and 200 000 FCFA to review. They needed answers in minutes, for a fraction of the cost. I shipped an AI workflow that delivers a risk score, flagged clauses, and concrete recommendations in under 60 seconds.",
          stack: ["Laravel", "Inertia.js", "React", "AI", "Laravel Cloud"],
          status: "In production",
          metrics: [
            { value: "2 500+", label: "contracts analyzed" },
            { value: "<60s", label: "avg. analysis" },
            { value: "13", label: "jurisdictions" },
          ],
          decision: "The decision that mattered: pricing per analysis, not per seat. Made it accessible at the moment of need, not as a subscription.",
        },
        {
          title: "Comafrique Technologies",
          tagline: "Enterprise product engineering across web, mobile, and production systems.",
          description: "Full-time product engineering on business-critical platforms: Laravel/Inertia/React web apps, React Native and Expo mobile experiences, Forge deployments, audit trails, admin workflows, and AI or monitoring experiments. Some product details stay confidential; the production constraints are the proof.",
          stack: ["Laravel", "Inertia.js", "React", "React Native", "Expo", "Forge", "AI"],
          status: "Full-time · enterprise",
          metrics: [
            { value: "3+ yrs", label: "in production" },
            { value: "Web + mobile", label: "surfaces" },
            { value: "Ops", label: "workflows" },
          ],
          decision: "The important work: turn operational complexity into interfaces teams can trust, maintain, and improve without breaking production.",
        },
      ],
    },
    capabilities: {
      section: "04",
      sectionLabel: "Capabilities",
      title: "A system, not a stack.",
      subtitle: "Tools change every year. The way I combine them is what compounds.",
      groups: [
        {
          title: "Engineering",
          description: "Production-grade across the full stack.",
          items: [
            { name: "TypeScript", svgl: "typescript" },
            { name: "React", svgl: "react" },
            { name: "Next.js", svgl: "nextjs_icon_dark" },
            { name: "Node.js", svgl: "nodejs" },
            { name: "Laravel", svgl: "laravel" },
            { name: "PostgreSQL", svgl: "postgresql" },
          ],
        },
        {
          title: "AI integration",
          description: "Production-scale, not just demos.",
          items: [
            { name: "Claude", svgl: "claude" },
            { name: "OpenAI", svgl: "openai_dark" },
            { name: "LangChain", svgl: "langchain_dark" },
            { name: "Vercel AI SDK", svgl: "vercel_dark" },
          ],
        },
        {
          title: "Product",
          description: "Thinking, not just shipping.",
          items: [
            { name: "Figma", svgl: "figma" },
            { name: "Linear", svgl: "linear_dark" },
            { name: "Notion", svgl: "notion_dark" },
            { name: "Git", svgl: "git" },
          ],
        },
      ],
    },
    process: {
      section: "05",
      sectionLabel: "Process",
      title: "How I work.",
      subtitle: "Clear scope, production discipline, and visible progress.",
      steps: [
        {
          duration: "1 week",
          title: "Understand the system",
          body: "I start with the product, the users, the constraints, and the business workflow. The stack comes after the problem is clear.",
        },
        {
          duration: "Weekly",
          title: "Build in visible loops",
          body: "Short feedback cycles, readable decisions, and working increments. Progress should be visible before the final delivery.",
        },
        {
          duration: "30 days",
          title: "Ship, observe, improve",
          body: "Launch is not the end. Production behavior, user feedback, and operational edge cases decide what needs to be hardened next.",
        },
      ],
    },
    about: {
      section: "06",
      sectionLabel: "About",
      title: "Daniogo.",
      role: "Product engineer. Based in Abidjan, working with teams worldwide.",
      paragraph1: "I started building software in 2019. Since then I've shipped products for early-stage startups, scaling companies, and a few teams I can't name.",
      paragraph2: "Somewhere along the way, AI stopped being a feature I built for clients and became a tool I build with.",
      paragraph3: "Today I focus on products where engineering is part of product thinking: decisions, interfaces, constraints, reliability, and the details teams live with after launch.",
      timeline: [
        { year: "2019", event: "First production deploy." },
        { year: "2022", event: "Lead on multi-team product builds." },
        { year: "2024", event: "AI-native workflow becomes core to how I ship." },
        { year: "2025", event: "Going international." },
      ],
    },
    contact: {
      section: "07",
      sectionLabel: "Contact",
      titleLine1: "Let's talk",
      titleLine2: "about products",
      titleLine3Pre: "that need ",
      titleLine3Highlight: "engineering",
      titleLine3Post: ".",
      availability: "Open to serious conversations around web, mobile, and AI products in production.",
      hint: "For product teams, technical leaders, and companies that care about reliable software.",
      emailLabel: "daniogoaboubakar@icloud.com",
      ctaCall: "Book a 30-min conversation",
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} — Daniogo · Abidjan, Côte d'Ivoire`,
      liveLabel: "Live",
      contractTchecker: "ContractTchecker",
    },
  },
  fr: {
    nav: {
      manifesto: "Manifeste",
      approach: "Approche",
      work: "Projets",
      capabilities: "Capacités",
      process: "Process",
      about: "À propos",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Index — Daniogo",
      availability: "Ingénieur produit · Abidjan",
      titleLine1: "Je construis des produits",
      titleLine2Pre: "qui tiennent en ",
      titleLine2Highlight: "production",
      titleLine2Post: ".",
      sub: "Ingénierie produit web et mobile avec Laravel, Inertia, React, React Native, Expo, des workflows IA et de vraies contraintes de production.",
      ctaPrimary: "Discuter produit",
      ctaSecondary: "Voir mes projets",
      scroll: "Défiler",
      location: "Daniogo · Abidjan",
    },
    manifesto: {
      section: "01",
      sectionLabel: "Manifeste",
      title: "Beaucoup de logiciels sont construits. Peu de produits sont vraiment travaillés.",
      body1: "N'importe qui peut livrer une app aujourd'hui. L'IA a rendu cette partie facile.",
      body2: "Ce qui reste difficile — ce qui sépare encore un produit qu'on utilise d'un produit qu'on aime — c'est la réflexion derrière chaque décision. Le frottement supprimé. Le détail que personne n'a demandé, mais que tout le monde remarque.",
      body3: "C'est cette partie-là qui m'obsède.",
    },
    approach: {
      section: "02",
      sectionLabel: "Approche",
      title: "Comment je pense.",
      subtitle: "Cinq principes. Ils transparaissent dans chaque ligne de code que je livre.",
      pillars: [
        {
          title: "Le craft avant le débit",
          body: "Six années à construire des logiciels en production m'ont appris une chose : la décision prise aujourd'hui se paie dans deux ans. J'optimise pour la version du code que votre futur équipe va hériter — pas pour la démo de vendredi.",
        },
        {
          title: "L'IA comme levier, pas béquille",
          body: "L'IA ne remplace pas le jugement d'ingénieur. Elle l'amplifie. Je l'utilise pour aller 3x plus vite sur les parties qui doivent être rapides — afin de consacrer du vrai temps aux parties qui demandent un cerveau humain.",
        },
        {
          title: "Penser produit d'abord",
          body: "Je ne commence pas par la stack. Je commence par : pour qui, qu'est-ce qui change pour eux, pourquoi maintenant. Si ces réponses ne sont pas tranchées, aucun code propre ne sauvera le produit.",
        },
        {
          title: "Des expériences, pas des features",
          body: "Une feature résout un problème. Une expérience donne envie de revenir. L'écart entre les deux est dans les détails — les easings, les états vides, la façon dont les erreurs aident vraiment. C'est dans cet écart que je vis.",
        },
        {
          title: "Mentalité de propriétaire",
          body: "Je n'arrive pas en prestataire. J'arrive comme quelqu'un qui se sentira personnellement responsable si votre produit sous-performe. Ce n'est pas une posture — c'est ma façon de travailler.",
        },
      ],
    },
    work: {
      section: "03",
      sectionLabel: "Projets sélectionnés",
      title: "Deux preuves de production.",
      subtitle: "Un produit IA public, et l'ingénierie produit en entreprise que je pratique au quotidien chez Comafrique Technologies.",
      visitLabel: "Voir le projet",
      caseStudyLabel: "Lire le cas",
      items: [
        {
          title: "ContractTchecker",
          tagline: "Analyse de contrats par IA pour le marché africain.",
          description: "Ils avaient des contrats juridiques qui prenaient 3 jours et 200 000 FCFA à examiner. Ils voulaient des réponses en minutes, à une fraction du coût. J'ai livré un workflow IA qui délivre un score de risque, les clauses sensibles, et des recommandations concrètes en moins de 60 secondes.",
          stack: ["Laravel", "Inertia.js", "React", "IA", "Laravel Cloud"],
          status: "En production",
          metrics: [
            { value: "2 500+", label: "contrats analysés" },
            { value: "<60s", label: "analyse moyenne" },
            { value: "13", label: "juridictions" },
          ],
          decision: "La décision qui a tout changé : facturer à l'analyse, pas au siège. Ça a rendu le produit accessible au moment du besoin, pas en abonnement.",
        },
        {
          title: "Comafrique Technologies",
          tagline: "Ingénierie produit en entreprise, du web au mobile.",
          description: "Ingénieur produit à temps plein sur des plateformes métier critiques : applications Laravel/Inertia/React, expériences React Native et Expo, déploiements Forge, journaux d'audit, workflows admin et expérimentations IA ou monitoring. Certains détails produit restent confidentiels ; les contraintes de production sont la preuve.",
          stack: ["Laravel", "Inertia.js", "React", "React Native", "Expo", "Forge", "IA"],
          status: "Temps plein · entreprise",
          metrics: [
            { value: "3+ ans", label: "en production" },
            { value: "Web + mobile", label: "surfaces" },
            { value: "Métier", label: "workflows" },
          ],
          decision: "Le travail important : transformer des opérations complexes en interfaces fiables, maintenables et utilisables par de vraies équipes.",
        },
      ],
    },
    capabilities: {
      section: "04",
      sectionLabel: "Capacités",
      title: "Un système, pas une stack.",
      subtitle: "Les outils changent chaque année. C'est la façon de les combiner qui se capitalise.",
      groups: [
        {
          title: "Engineering",
          description: "Niveau production sur tout le stack.",
          items: [
            { name: "TypeScript", svgl: "typescript" },
            { name: "React", svgl: "react" },
            { name: "Next.js", svgl: "nextjs_icon_dark" },
            { name: "Node.js", svgl: "nodejs" },
            { name: "Laravel", svgl: "laravel" },
            { name: "PostgreSQL", svgl: "postgresql" },
          ],
        },
        {
          title: "Intégration IA",
          description: "Production réelle, pas que des démos.",
          items: [
            { name: "Claude", svgl: "claude" },
            { name: "OpenAI", svgl: "openai_dark" },
            { name: "LangChain", svgl: "langchain_dark" },
            { name: "Vercel AI SDK", svgl: "vercel_dark" },
          ],
        },
        {
          title: "Produit",
          description: "Penser, pas seulement livrer.",
          items: [
            { name: "Figma", svgl: "figma" },
            { name: "Linear", svgl: "linear_dark" },
            { name: "Notion", svgl: "notion_dark" },
            { name: "Git", svgl: "git" },
          ],
        },
      ],
    },
    process: {
      section: "05",
      sectionLabel: "Process",
      title: "Comment je travaille.",
      subtitle: "Scope clair, discipline de production, progrès visible.",
      steps: [
        {
          duration: "1 semaine",
          title: "Comprendre le système",
          body: "Je commence par le produit, les utilisateurs, les contraintes et le workflow métier. La stack vient après la compréhension du problème.",
        },
        {
          duration: "Hebdo",
          title: "Construire en boucles visibles",
          body: "Cycles courts, décisions lisibles et incréments utilisables. Le progrès doit être visible avant la livraison finale.",
        },
        {
          duration: "30 jours",
          title: "Livrer, observer, améliorer",
          body: "Le lancement n'est pas la fin. Le comportement en production, les retours utilisateurs et les cas limites métier décident de ce qu'il faut renforcer ensuite.",
        },
      ],
    },
    about: {
      section: "06",
      sectionLabel: "À propos",
      title: "Daniogo.",
      role: "Ingénieur produit. Basé à Abidjan, travaillant avec des équipes du monde entier.",
      paragraph1: "J'ai commencé à construire des logiciels en 2019. Depuis, j'ai livré des produits pour des startups early-stage, des entreprises en croissance, et quelques équipes que je ne peux pas nommer.",
      paragraph2: "Quelque part en route, l'IA a cessé d'être une feature que je construisais pour mes clients pour devenir un outil avec lequel je construis.",
      paragraph3: "Aujourd'hui je me concentre sur les produits où l'ingénierie fait partie de la réflexion produit : décisions, interfaces, contraintes, fiabilité et détails que les équipes vivent après le lancement.",
      timeline: [
        { year: "2019", event: "Premier déploiement en production." },
        { year: "2022", event: "Lead sur des produits multi-équipes." },
        { year: "2024", event: "Workflow AI-natif au cœur de ma livraison." },
        { year: "2025", event: "Cap sur l'international." },
      ],
    },
    contact: {
      section: "07",
      sectionLabel: "Contact",
      titleLine1: "Parlons",
      titleLine2: "de produits",
      titleLine3Pre: "qui demandent de ",
      titleLine3Highlight: "l'ingénierie",
      titleLine3Post: ".",
      availability: "Ouvert aux échanges sérieux autour des produits web, mobile et IA en production.",
      hint: "Pour les équipes produit, les responsables techniques et les entreprises qui prennent la fiabilité au sérieux.",
      emailLabel: "daniogoaboubakar@icloud.com",
      ctaCall: "Réserver un échange de 30 min",
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} — Daniogo · Abidjan, Côte d'Ivoire`,
      liveLabel: "En ligne",
      contractTchecker: "ContractTchecker",
    },
  },
};

type Translations = typeof translations.en;

const I18nContext = createContext<{
  locale: Locale;
  t: Translations;
  setLocale: (l: Locale) => void;
}>({
  locale: "en",
  t: translations.en,
  setLocale: () => {},
});

export const useI18n = () => useContext(I18nContext);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-locale") as Locale | null;
    if (stored) {
      setLocaleState(stored);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      setLocaleState(browserLang === "fr" ? "fr" : "en");
    }
    setMounted(true);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("portfolio-locale", l);
  };

  if (!mounted) return null;

  return (
    <I18nContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}
