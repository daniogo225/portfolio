import type { Locale } from "./site";

// Textes du portfolio. Importé uniquement côté serveur : chaque page ne transmet au navigateur
// que la langue affichée. Les mots entourés d’astérisques sont mis en valeur (italique, accent) :
// seulement dans la hero et le contact. Aucun projet, client ni employeur n’est nommé.
// L’anglais est réécrit, pas traduit mot à mot.

const fr = {
  meta: {
    title: "Zié Daniogo, développeur full-stack et IA à Abidjan",
    description:
      "Zié Daniogo, développeur full-stack et IA basé à Abidjan, Côte d’Ivoire. Applications web et mobiles conçues, développées et mises en ligne de bout en bout, avec intégration d’IA.",
    ogAlt: "Zié Daniogo, développeur full-stack et IA basé à Abidjan. Des applications web et mobiles, conçues, développées et mises en ligne de bout en bout.",
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
    title: "Des applications web et mobiles, conçues, développées et mises en ligne *de bout en bout.*",
    primary: "Écrire sur WhatsApp",
    portrait: "Zié Daniogo, debout, en veste noire",
    message: "Bonjour Zié, je vous écris depuis votre portfolio.",
  },
  build: {
    label: "Ce que je fais",
    scenes: [
      {
        id: "mobile",
        text: "Des applications mobiles iOS et Android au design soigné, pensées pour être adoptées dès la première utilisation.",
        tools: "React Native",
        alt: "Un téléphone debout, devant deux croquis d’écran et un crayon.",
      },
      {
        id: "desk",
        text: "Des applications web modernes, avec intégration d’intelligence artificielle, pour les cas d’usage les plus exigeants.",
        tools: "Laravel, React",
        alt: "Un bureau, avec un écran qui affiche une carte et ses repères.",
      },
      {
        id: "server",
        text: "Une mise en production maîtrisée\u202f: déploiement, sécurité et suivi, sans intermédiaire.",
        tools: "Linux, Docker",
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
    title: "Les agents IA avancent en parallèle.\nJe relis chaque livraison.",
  },
  profile: {
    label: "Profil",
    lead: "Développeur full-stack et IA, basé à Abidjan.",
    body: "Je conçois et développe des applications web et mobiles de bout en bout, de la maquette à la mise en production. Des interfaces claires, une architecture solide, et l’intelligence artificielle intégrée là où elle apporte une vraie valeur.",
    stack: "Au quotidien\u202f: Laravel, React, Next.js et React Native.",
    languages: "Français, anglais",
    photo: "Portrait de Zié Daniogo, en veste noire",
    cvPdf: "Télécharger le CV",
    cvOnline: "Le lire en ligne",
  },
  contact: {
    label: "Contact",
    title: "Un projet, une question\u202f?\n*Écrivez-moi.*",
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
      "Zié Daniogo, full-stack and AI developer based in Abidjan, Côte d’Ivoire (Ivory Coast). Web and mobile applications designed, built and shipped end to end, with AI integration.",
    ogAlt: "Zié Daniogo, full-stack and AI developer based in Abidjan. Web and mobile applications, designed, built and shipped end to end.",
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
    title: "Web and mobile applications, designed, built and shipped *end to end.*",
    primary: "Message me on WhatsApp",
    portrait: "Zié Daniogo, standing, wearing a black overshirt",
    message: "Hi Zié, I found you through your portfolio.",
  },
  build: {
    label: "What I do",
    scenes: [
      {
        id: "mobile",
        text: "iOS and Android mobile applications with carefully crafted design, built to be adopted from the very first use.",
        tools: "React Native",
        alt: "A phone standing behind two screen sketches and a pencil.",
      },
      {
        id: "desk",
        text: "Modern web applications with integrated artificial intelligence, built for the most demanding use cases.",
        tools: "Laravel, React",
        alt: "A desk with a screen showing a map and its pins.",
      },
      {
        id: "server",
        text: "Controlled production releases: deployment, security and monitoring, with no intermediary.",
        tools: "Linux, Docker",
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
    title: "AI agents work in parallel.\nI review everything before it ships.",
  },
  profile: {
    label: "About",
    lead: "Full-stack and AI developer, based in Abidjan.",
    body: "I design and build web and mobile applications end to end, from first mockup to production. Clear interfaces, a solid architecture, and artificial intelligence built in where it brings real value.",
    stack: "Day to day: Laravel, React, Next.js and React Native.",
    languages: "French, English",
    photo: "Portrait of Zié Daniogo, wearing a black overshirt",
    cvPdf: "Download the résumé",
    cvOnline: "Read it online",
  },
  contact: {
    label: "Contact",
    title: "A project, a question?\n*Write to me.*",
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
