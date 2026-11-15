import type { Locale } from "./site";

// Textes du portfolio. Importé uniquement côté serveur : chaque page ne transmet au navigateur
// que la langue affichée. Les mots entourés d’astérisques sont mis en valeur (italique, accent) :
// seulement dans la hero et le contact. Aucun projet, client ni employeur n’est nommé.
// L’anglais est réécrit, pas traduit mot à mot.

const fr = {
  meta: {
    title: "Zié Daniogo, développeur full-stack et IA à Abidjan",
    description:
      "Zié Daniogo, développeur full-stack et IA à Abidjan, Côte d’Ivoire. Applications iOS et Android en React Native, back-offices web en Laravel et React, IA intégrée.",
    ogAlt: "Zié Daniogo, développeur full-stack et IA à Abidjan. Je dessine, je code, je mets en ligne. Moi-même.",
    skip: "Aller au contenu",
    navLabel: "Navigation principale",
    mobileNavLabel: "Navigation mobile",
  },
  nav: {
    build: "Travail",
    method: "Méthode",
    profile: "Profil",
    contact: "Contact",
    menu: "Menu",
    close: "Fermer",
    cta: "M’écrire",
  },
  controls: {
    language: "Langue",
    toLight: "Passer en mode clair",
    toDark: "Passer en mode sombre",
    localTime: "Abidjan",
  },
  hero: {
    eyebrow: "Développeur full-stack et IA",
    clock: "Il est {time} à Abidjan.",
    title: "Je dessine,\nje code,\nje mets en ligne.\n*Moi-même.*",
    primary: "Écrire sur WhatsApp",
    portrait: "Zié Daniogo, debout, en veste noire",
    message: "Bonjour Zié, je vous écris depuis votre portfolio.",
  },
  build: {
    label: "Ce que je fais",
    scenes: [
      {
        id: "mobile",
        text: "Je fais des applications iOS et Android.",
        note: "En React Native. Je dessine chaque écran avant de le coder.",
        alt: "Un téléphone debout, devant deux croquis d’écran et un crayon.",
      },
      {
        id: "desk",
        text: "Derrière,\nle back-office web.",
        note: "En Laravel et React. J’y branche l’IA\u202f: modèles de langage, voix, lecture de documents.",
        alt: "Un bureau, avec un écran qui affiche une carte et ses repères.",
      },
      {
        id: "server",
        text: "Je déploie moi-même.",
        note: "Sur des serveurs Linux que j’administre.",
        alt: "Une baie de serveurs, câbles rangés.",
      },
    ],
  },
  demos: {
    orchestra: {
      label: "Le même projet, mené de deux façons",
      solo: "Seul",
      team: "Avec des agents",
      lanes: ["Zié", "Agent code", "Agent tests", "Agent rédaction"],
      tasks: {
        frame: "Cadrage",
        design: "Maquettes",
        build: "Développement",
        tests: "Tests",
        docs: "Documentation",
        report: "Comptes rendus",
        review: "Relecture",
      },
      start: "Début",
      end: "Livraison",
    },
  },
  method: {
    label: "Méthode",
    title: "Les agents IA avancent en parallèle. Je relis chaque livraison.",
  },
  profile: {
    label: "Profil",
    lead: "Je tiens à des écrans\nqu’on comprend\ndu premier coup.",
    body: "Développeur full-stack à Abidjan. Web, mobile et IA intégrée : je dessine, je code et je mets en ligne.",
    languages: "Français, anglais",
    photo: "Portrait de Zié Daniogo, en veste noire",
    cvPdf: "Télécharger le CV",
    cvOnline: "Le lire en ligne",
  },
  contact: {
    label: "Contact",
    title: "*Écrivez-moi.*",
    body: "Je réponds sur WhatsApp et par e-mail.",
    circle: "Écrire sur WhatsApp",
    copy: "Copier l’adresse",
    copied: "Adresse copiée",
    place: "Abidjan, Côte d’Ivoire",
  },
  floating: {
    label: "M’écrire",
    aria: "Écrire à Zié sur WhatsApp",
  },
  footer: {
    rights: "Conçu et développé à Abidjan",
    top: "Retour en haut",
    motion: "Animations",
    pause: "Mettre les animations en pause",
    play: "Relancer les animations",
    linksLabel: "Liens",
    cv: "CV en PDF",
  },
  palette: {
    title: "Actions rapides",
    placeholder: "Rechercher une section ou une action",
    empty: "Aucune action ne correspond.",
    navigate: "Aller à",
    actions: "Actions",
    top: "Haut de page",
    whatsapp: "Écrire sur WhatsApp",
    copyEmail: "Copier l’adresse e-mail",
    copied: "Adresse copiée",
    cv: "Ouvrir le CV",
    toLight: "Passer en mode clair",
    toDark: "Passer en mode sombre",
    otherLanguage: "Switch to English",
    vcard: "Télécharger la vCard",
    pause: "Mettre les animations en pause",
    play: "Relancer les animations",
    hint: "Entrée pour valider, Échap pour fermer",
    close: "Fermer",
  },
};

export type SiteContent = typeof fr;

const en: SiteContent = {
  meta: {
    title: "Zié Daniogo, full-stack and AI developer in Abidjan",
    description:
      "Zié Daniogo, full-stack and AI developer in Abidjan, Côte d’Ivoire (Ivory Coast). iOS and Android apps in React Native, web back offices in Laravel and React, AI built in.",
    ogAlt: "Zié Daniogo, full-stack and AI developer in Abidjan. I design it, build it and ship it. Myself.",
    skip: "Skip to content",
    navLabel: "Main navigation",
    mobileNavLabel: "Mobile navigation",
  },
  nav: {
    build: "Work",
    method: "Method",
    profile: "About",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    cta: "Write to me",
  },
  controls: {
    language: "Language",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
    localTime: "Abidjan",
  },
  hero: {
    eyebrow: "Full-stack and AI developer",
    clock: "It’s {time} in Abidjan.",
    title: "I design it,\nbuild it,\nship it.\n*Myself.*",
    primary: "Message me on WhatsApp",
    portrait: "Zié Daniogo, standing, wearing a black overshirt",
    message: "Hi Zié, I found you through your portfolio.",
  },
  build: {
    label: "What I do",
    scenes: [
      {
        id: "mobile",
        text: "I make iOS and Android apps.",
        note: "In React Native. I draw every screen before I code it.",
        alt: "A phone standing behind two screen sketches and a pencil.",
      },
      {
        id: "desk",
        text: "Behind them,\na web back office.",
        note: "Laravel and React. That’s where I wire in the AI: language models, voice, document reading.",
        alt: "A desk with a screen showing a map and its pins.",
      },
      {
        id: "server",
        text: "I deploy it myself.",
        note: "On Linux servers I run.",
        alt: "A server rack with tidy cables.",
      },
    ],
  },
  demos: {
    orchestra: {
      label: "The same project, run two ways",
      solo: "Alone",
      team: "With agents",
      lanes: ["Zié", "Code agent", "Test agent", "Writing agent"],
      tasks: {
        frame: "Scoping",
        design: "Mockups",
        build: "Development",
        tests: "Tests",
        docs: "Documentation",
        report: "Status reports",
        review: "Review",
      },
      start: "Start",
      end: "Delivery",
    },
  },
  method: {
    label: "Method",
    title: "AI agents work in parallel. I review everything before it ships.",
  },
  profile: {
    label: "About",
    lead: "I care about screens\npeople understand\nat first glance.",
    body: "Full-stack developer in Abidjan. Web, mobile and built-in AI: I design, build and ship.",
    languages: "French, English",
    photo: "Portrait of Zié Daniogo, wearing a black overshirt",
    cvPdf: "Download the résumé",
    cvOnline: "Read it online",
  },
  contact: {
    label: "Contact",
    title: "*Write to me.*",
    body: "I answer on WhatsApp and by email.",
    circle: "Message me on WhatsApp",
    copy: "Copy address",
    copied: "Address copied",
    place: "Abidjan, Côte d’Ivoire",
  },
  floating: {
    label: "Write to me",
    aria: "Message Zié on WhatsApp",
  },
  footer: {
    rights: "Designed and built in Abidjan",
    top: "Back to top",
    motion: "Animations",
    pause: "Pause animations",
    play: "Resume animations",
    linksLabel: "Links",
    cv: "Résumé as PDF",
  },
  palette: {
    title: "Quick actions",
    placeholder: "Search a section or an action",
    empty: "No matching action.",
    navigate: "Go to",
    actions: "Actions",
    top: "Top of page",
    whatsapp: "Message on WhatsApp",
    copyEmail: "Copy email address",
    copied: "Address copied",
    cv: "Open the résumé",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
    otherLanguage: "Passer en français",
    vcard: "Download the vCard",
    pause: "Pause animations",
    play: "Resume animations",
    hint: "Enter to run, Esc to close",
    close: "Close",
  },
};

export const content: Record<Locale, SiteContent> = { fr, en };
