"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Locale = "en" | "fr";

const translations = {
  en: {
    nav: {
      about: "About",
      work: "Work",
      stack: "Stack",
      contact: "Contact",
    },
    hero: {
      section: "01 — Portfolio",
      subtitle: "Senior Fullstack Developer · SaaS Founder · Abidjan, CI",
      tagline: "\u201CI build products that solve real problems for African businesses.\u201D",
      saveContact: "Save contact",
      scroll: "Scroll",
      ticker: [
        { value: "5+", label: "years" },
        { value: "3", label: "SaaS shipped" },
        { value: "2 500+", label: "users" },
      ],
    },
    about: {
      section: "02",
      sectionLabel: "About",
      title: "Product engineer,",
      titleLine2: "not just developer",
      description: "I build B2B SaaS products for the African francophone market. From database architecture to pixel-perfect interfaces, I own the full stack with Laravel and React.",
      quote: "\u201CLess, but better.\u201D",
      quoteAuthor: "— Dieter Rams",
      yearsValue: "5+",
      yearsLabel: "Years of experience",
      saasValue: "2 500+",
      saasLabel: "Contracts analyzed",
      coreStack: "Laravel · React",
      coreStackLabel: "Core stack",
    },
    approach: {
      section: "03",
      sectionLabel: "Approach",
      title: "How I build",
      subtitle: "Three rules I follow on every product I ship.",
      steps: [
        {
          title: "Find a real problem",
          body: "Not a 'nice to have'. Something people already pay too much for, wait too long for, or simply avoid. ContractTchecker exists because reading a contract costs 200 000 FCFA and 3 days.",
        },
        {
          title: "Price for the market",
          body: "Software built for Africa must be priced for Africa. 1 000 FCFA pay-per-use, not a 50 €/month SaaS copy-pasted from San Francisco. Accessibility is a design choice.",
        },
        {
          title: "Ship, then iterate",
          body: "Production beats perfection. Every project above is live, used, measured. Feedback from real users shapes the next version, not assumptions from a whiteboard.",
        },
      ],
    },
    projects: {
      section: "04",
      sectionLabel: "Featured Work",
      visitProject: "Visit project",
      items: [
        {
          title: "ContractTchecker",
          description: "AI-powered contract analysis for the African market. Upload a contract, get a risk score, flagged clauses and concrete recommendations in under 60 seconds — for 1 000 FCFA instead of 200 000 FCFA at a lawyer.",
          stack: ["Laravel", "Inertia.js", "React", "AI", "Laravel Cloud"],
          status: "In production",
          metrics: [
            { value: "2 500+", label: "contracts analyzed" },
            { value: "<60s", label: "avg. analysis" },
            { value: "13", label: "jurisdictions" },
          ],
        },
        {
          title: "Comafrique Technologies",
          description: "Full-time web application developer for 3 years. Building and maintaining enterprise-grade web applications for one of Côte d'Ivoire's leading technology companies.",
          stack: ["Laravel", "React", "Inertia.js"],
          status: "Full-time",
        },
        {
          title: "School Management",
          description: "School management for private secondary schools in Côte d'Ivoire. Grades, schedules, parent-school communication.",
          stack: ["Laravel", "React", "Mobile-first"],
          status: "In development",
        },
        {
          title: "Divine Grace Vacation Homes",
          description: "Custom development for a property management company in the United Arab Emirates.",
          stack: ["React Native"],
          status: "Freelance",
        },
      ],
    },
    stack: {
      section: "05",
      sectionLabel: "Stack",
    },
    contact: {
      section: "06",
      sectionLabel: "Contact",
      titleLine1: "Let's build",
      titleLine2: "something",
      titleLine3: "meaningful",
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} — Abidjan, Côte d'Ivoire`,
      liveLabel: "Live products",
      contractTchecker: "ContractTchecker",
    },
  },
  fr: {
    nav: {
      about: "À propos",
      work: "Projets",
      stack: "Stack",
      contact: "Contact",
    },
    hero: {
      section: "01 — Portfolio",
      subtitle: "Développeur Fullstack Senior · Fondateur SaaS · Abidjan, CI",
      tagline: "\u201CJe construis des produits qui résolvent de vrais problèmes pour les entreprises africaines.\u201D",
      saveContact: "Enregistrer le contact",
      scroll: "Défiler",
      ticker: [
        { value: "5+", label: "années" },
        { value: "3", label: "SaaS livrés" },
        { value: "2 500+", label: "utilisateurs" },
      ],
    },
    about: {
      section: "02",
      sectionLabel: "À propos",
      title: "Ingénieur produit,",
      titleLine2: "pas juste développeur",
      description: "Je construis des produits SaaS B2B pour le marché francophone africain. De l'architecture base de données aux interfaces pixel-perfect, je maîtrise tout le stack avec Laravel et React.",
      quote: "\u201CMoins, mais mieux.\u201D",
      quoteAuthor: "— Dieter Rams",
      yearsValue: "5+",
      yearsLabel: "Années d'expérience",
      saasValue: "2 500+",
      saasLabel: "Contrats analysés",
      coreStack: "Laravel · React",
      coreStackLabel: "Stack principal",
    },
    approach: {
      section: "03",
      sectionLabel: "Approche",
      title: "Comment je construis",
      subtitle: "Trois règles que je suis sur chaque produit que je livre.",
      steps: [
        {
          title: "Trouver un vrai problème",
          body: "Pas un \u00AB\u00A0nice to have\u00A0\u00BB. Quelque chose pour lequel les gens paient trop, attendent trop, ou qu'ils évitent. ContractTchecker existe parce que lire un contrat coûte 200 000 FCFA et 3 jours.",
        },
        {
          title: "Prix adapté au marché",
          body: "Un logiciel pensé pour l'Afrique doit être prix pour l'Afrique. 1 000 FCFA à l'usage, pas un SaaS à 50 €/mois copié de San Francisco. L'accessibilité est une décision de design.",
        },
        {
          title: "Livrer, puis itérer",
          body: "La production bat la perfection. Chaque projet ci-dessus est en ligne, utilisé, mesuré. Les retours des vrais utilisateurs guident la v2, pas les hypothèses d'un tableau blanc.",
        },
      ],
    },
    projects: {
      section: "04",
      sectionLabel: "Projets",
      visitProject: "Voir le projet",
      items: [
        {
          title: "ContractTchecker",
          description: "Analyse de contrats par IA pour le marché africain. Uploadez un contrat, obtenez un score de risque, les clauses à risque et des recommandations concrètes en moins de 60 secondes — pour 1 000 FCFA au lieu de 200 000 FCFA chez un avocat.",
          stack: ["Laravel", "Inertia.js", "React", "IA", "Laravel Cloud"],
          status: "En production",
          metrics: [
            { value: "2 500+", label: "contrats analysés" },
            { value: "<60s", label: "analyse moyenne" },
            { value: "13", label: "juridictions" },
          ],
        },
        {
          title: "Comafrique Technologies",
          description: "Développeur d'applications web à temps plein depuis 3 ans. Conception et maintenance d'applications web d'entreprise pour l'une des principales sociétés technologiques de Côte d'Ivoire.",
          stack: ["Laravel", "React", "Inertia.js"],
          status: "Temps plein",
        },
        {
          title: "School Management",
          description: "Gestion scolaire pour établissements secondaires privés en Côte d'Ivoire. Notes, emplois du temps, communication parents-école.",
          stack: ["Laravel", "React", "Mobile-first"],
          status: "En développement",
        },
        {
          title: "Divine Grace Vacation Homes",
          description: "Développement sur mesure pour une entreprise de gestion immobilière aux Émirats Arabes Unis.",
          stack: ["React Native"],
          status: "Freelance",
        },
      ],
    },
    stack: {
      section: "05",
      sectionLabel: "Stack",
    },
    contact: {
      section: "06",
      sectionLabel: "Contact",
      titleLine1: "Construisons",
      titleLine2: "quelque chose",
      titleLine3: "d'important",
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} — Abidjan, Côte d'Ivoire`,
      liveLabel: "Produits en ligne",
      contractTchecker: "ContractTchecker",
    },
  },
};

interface ProjectMetric {
  value: string;
  label: string;
}

interface ProjectItem {
  title: string;
  description: string;
  stack: string[];
  status: string;
  metrics?: ProjectMetric[];
}

interface TickerItem {
  value: string;
  label: string;
}

interface ApproachStep {
  title: string;
  body: string;
}

interface Translations {
  nav: { about: string; work: string; stack: string; contact: string };
  hero: { section: string; subtitle: string; tagline: string; saveContact: string; scroll: string; ticker: TickerItem[] };
  about: { section: string; sectionLabel: string; title: string; titleLine2: string; description: string; quote: string; quoteAuthor: string; yearsValue: string; yearsLabel: string; saasValue: string; saasLabel: string; coreStack: string; coreStackLabel: string };
  approach: { section: string; sectionLabel: string; title: string; subtitle: string; steps: ApproachStep[] };
  projects: { section: string; sectionLabel: string; visitProject: string; items: ProjectItem[] };
  stack: { section: string; sectionLabel: string };
  contact: { section: string; sectionLabel: string; titleLine1: string; titleLine2: string; titleLine3: string };
  footer: { copyright: string; liveLabel: string; contractTchecker: string };
}

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
