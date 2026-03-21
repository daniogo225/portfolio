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
      saasValue: "2",
      saasLabel: "SaaS in production",
      coreStack: "Laravel · React",
      coreStackLabel: "Core stack",
    },
    projects: {
      section: "03",
      sectionLabel: "Featured Work",
      visitProject: "Visit project",
      items: [
        {
          title: "Comafrique Technologies",
          description: "Full-time web application developer for 3 years. Building and maintaining enterprise-grade web applications for one of Côte d'Ivoire's leading technology companies.",
          stack: ["Laravel", "React", "Inertia.js"],
          status: "Full-time",
        },
        {
          title: "Inexus Business",
          description: "Commercial management SaaS for Apple resellers in West Africa. Invoicing, inventory, CRM — a complete system to digitalize operations.",
          stack: ["Laravel", "Inertia.js", "React", "Laravel Cloud"],
          status: "In production",
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
      section: "04",
      sectionLabel: "Stack",
    },
    contact: {
      section: "05",
      sectionLabel: "Contact",
      titleLine1: "Let's build",
      titleLine2: "something",
      titleLine3: "meaningful",
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} — Abidjan, Côte d'Ivoire`,
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
      saasValue: "2",
      saasLabel: "SaaS en production",
      coreStack: "Laravel · React",
      coreStackLabel: "Stack principal",
    },
    projects: {
      section: "03",
      sectionLabel: "Projets",
      visitProject: "Voir le projet",
      items: [
        {
          title: "Comafrique Technologies",
          description: "Développeur d'applications web à temps plein depuis 3 ans. Conception et maintenance d'applications web d'entreprise pour l'une des principales sociétés technologiques de Côte d'Ivoire.",
          stack: ["Laravel", "React", "Inertia.js"],
          status: "Temps plein",
        },
        {
          title: "Inexus Business",
          description: "SaaS de gestion commerciale pour revendeurs Apple en Afrique de l'Ouest. Facturation, inventaire, CRM — un système complet pour digitaliser les opérations.",
          stack: ["Laravel", "Inertia.js", "React", "Laravel Cloud"],
          status: "En production",
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
      section: "04",
      sectionLabel: "Stack",
    },
    contact: {
      section: "05",
      sectionLabel: "Contact",
      titleLine1: "Construisons",
      titleLine2: "quelque chose",
      titleLine3: "d'important",
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} — Abidjan, Côte d'Ivoire`,
    },
  },
};

interface ProjectItem {
  title: string;
  description: string;
  stack: string[];
  status: string;
}

interface Translations {
  nav: { about: string; work: string; stack: string; contact: string };
  hero: { section: string; subtitle: string; tagline: string; saveContact: string; scroll: string };
  about: { section: string; sectionLabel: string; title: string; titleLine2: string; description: string; quote: string; quoteAuthor: string; yearsValue: string; yearsLabel: string; saasValue: string; saasLabel: string; coreStack: string; coreStackLabel: string };
  projects: { section: string; sectionLabel: string; visitProject: string; items: ProjectItem[] };
  stack: { section: string; sectionLabel: string };
  contact: { section: string; sectionLabel: string; titleLine1: string; titleLine2: string; titleLine3: string };
  footer: { copyright: string };
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
