export type Locale = "fr" | "en";

export const links = {
  email: "daniogoaboubakar@icloud.com",
  calendar: "https://cal.com/dani-walker-uqwwfc/30min?overlayCalendar=true",
  vcard: "/daniogo.vcf",
  contractChecker: "https://checker.65-21-0-100.sslip.io/",
} as const;

// Les mots entourés d’astérisques sont mis en valeur (italique, couleur d’accent).
const fr = {
  meta: {
    skip: "Aller au contenu",
    navLabel: "Navigation principale",
    mobileNavLabel: "Navigation mobile",
  },
  nav: {
    work: "Projets",
    expertise: "Expertise",
    profile: "Profil",
    contact: "Contact",
    menu: "Menu",
    close: "Fermer",
  },
  controls: {
    language: "Langue",
    toLight: "Passer en mode clair",
    toDark: "Passer en mode sombre",
    palette: "Ouvrir les actions rapides",
    localTime: "Abidjan",
  },
  hero: {
    role: "Ingénieur produit",
    eyebrow: "Ingénieur produit / Abidjan, Côte d’Ivoire",
    title: "Je transforme la complexité métier en produits *fiables.*",
    intro:
      "Je conçois et livre des systèmes web, mobile et IA où le produit, l’interface et l’infrastructure avancent comme un seul ensemble.",
    primary: "Voir les projets",
    secondary: "Réserver 30 minutes",
    status: "Disponible pour des collaborations ciblées",
    since: "En production depuis 2019",
    scroll: "Défiler",
    portrait: "Portrait de Daniogo Aboubakar en trame de points, réactif au pointeur",
  },
  marquee: ["Laravel", "React", "Next.js", "TypeScript", "React Native", "Expo", "Inertia", "PostgreSQL", "IA appliquée", "CI/CD"],
  statement: {
    label: "Point de vue",
    text: "Le code n’est pas la finalité. C’est le moyen de rendre une décision produit *durable.*",
    body: "Depuis 2019, je travaille au point de rencontre entre les usages, les contraintes métier et la production. Je ne livre pas seulement des fonctionnalités : je construis des systèmes que les équipes comprennent, utilisent et font évoluer sans crainte.",
    steps: [
      { title: "Penser", body: "Comprendre le problème et ses règles avant d’écrire la solution." },
      { title: "Construire", body: "Des interfaces claires, posées sur une logique métier solide." },
      { title: "Opérer", body: "Suivre ce qui se passe réellement après la mise en ligne." },
    ],
  },
  work: {
    label: "Projets sélectionnés",
    title: "Deux systèmes, une même *exigence.*",
    intro:
      "Partir d’un problème réel, construire une réponse lisible et la livrer jusqu’en production.",
    problem: "Le problème",
    decision: "La décision",
    results: "Résultats",
    stack: "Stack",
    open: "Ouvrir",
    cases: [
      {
        id: "contract",
        index: "01",
        kind: "Produit IA public",
        title: "ContractTchecker",
        subtitle: "L’analyse contractuelle passe de plusieurs jours à moins d’une minute.",
        story:
          "L’examen d’un contrat pouvait demander trois jours et coûter 200 000 FCFA. J’ai conçu un parcours qui transforme ce délai en analyse structurée : score de risque, clauses sensibles et recommandations directement exploitables.",
        decision:
          "Facturer à l’analyse, au moment du besoin, plutôt que d’imposer un abonnement par utilisateur.",
        metrics: [
          { value: "2 500+", label: "contrats analysés" },
          { value: "< 60 s", label: "par analyse" },
          { value: "13", label: "juridictions" },
        ],
        stack: ["Laravel", "Inertia", "React", "IA"],
        link: links.contractChecker,
        linkLabel: "Ouvrir le produit",
        caption: "Illustration du parcours d’analyse",
      },
      {
        id: "systems",
        index: "02",
        kind: "Ingénierie en entreprise",
        title: "Comafrique Technologies",
        subtitle: "Des opérations critiques devenues des systèmes lisibles et maintenables.",
        story:
          "Depuis plus de trois ans, je construis des plateformes métier web et mobile : parcours opérationnels, applications terrain, administration, audit, déploiements et expérimentations IA. Les détails restent confidentiels, la responsabilité technique est bien réelle.",
        decision:
          "Chaque interface doit simplifier le travail sans fragiliser les règles métier ni la production.",
        metrics: [
          { value: "3+ ans", label: "dans l’entreprise" },
          { value: "Web + mobile", label: "surfaces livrées" },
          { value: "Production", label: "standard quotidien" },
        ],
        stack: ["Laravel", "React", "React Native", "Expo", "IA", "Forge"],
        link: "#profile",
        linkLabel: "Voir mon approche",
        caption: "Architecture conceptuelle, détails confidentiels",
      },
    ],
    contractMock: {
      file: "contrat_prestation.pdf",
      status: "Analyse terminée en 48 s",
      score: "Score de risque",
      level: "Élevé",
      clausesTitle: "Clauses à revoir",
      clauses: [
        { ref: "Art. 7", name: "Résiliation unilatérale", severity: "Élevée" },
        { ref: "Art. 12", name: "Pénalités de retard", severity: "Moyenne" },
        { ref: "Art. 15", name: "Juridiction compétente", severity: "Moyenne" },
      ],
      recommendation: "Renégocier l’article 7 avant signature.",
      recommendationLabel: "Recommandation",
    },
    systemsMock: {
      field: ["App terrain", "Mode hors ligne"],
      web: ["Back-office web", "Administration"],
      api: ["API métier", "Laravel"],
      rules: ["Règles et droits", "Permissions"],
      ai: ["IA assistée", "Validation humaine"],
      audit: ["Audit", "Traçabilité"],
      ops: "Production surveillée",
    },
  },
  expertise: {
    label: "Expertise",
    title: "Une vision complète, de l’intention au comportement en *production.*",
    groups: [
      {
        title: "Produit et interface",
        body: "Cadrage, parcours, systèmes d’interface, prototypes et boucles de retour rapides.",
        tools: "React, Next.js, Inertia, TypeScript",
      },
      {
        title: "Ingénierie métier",
        body: "Règles complexes, API, permissions, audit, données et intégrations durables.",
        tools: "Laravel, PostgreSQL, Node.js",
      },
      {
        title: "Mobile terrain",
        body: "Expériences non bloquantes, synchronisation, contraintes réseau et publication mobile.",
        tools: "React Native, Expo, EAS",
      },
      {
        title: "Intelligence artificielle",
        body: "Fonctionnalités assistées, extraction, classification, génération encadrée et validation humaine.",
        tools: "OpenAI, Claude, API, automatisation",
      },
      {
        title: "Opérations et fiabilité",
        body: "Déploiement, supervision, observabilité et amélioration continue des systèmes en production.",
        tools: "Forge, CI/CD, monitoring",
      },
    ],
  },
  profile: {
    label: "Profil",
    title: "Assez proche du produit pour comprendre. Assez technique pour *livrer.*",
    paragraphs: [
      "Je suis Daniogo Aboubakar, ingénieur produit basé à Abidjan. J’ai commencé à livrer des logiciels en production en 2019, pour des startups, des entreprises en croissance et des équipes dont certains projets restent confidentiels.",
      "Mon terrain de jeu va de l’interface à l’infrastructure : Laravel, Inertia, React, Next.js, React Native, Expo, automatisation, IA appliquée et exploitation d’environnements réels.",
      "L’IA accélère mon travail, mais elle ne prend pas les décisions à ma place. Je l’utilise comme levier, avec du jugement, des validations humaines et une attention constante à ce qui se passe après la mise en ligne.",
    ],
    timelineLabel: "Parcours",
    timeline: [
      { year: "2019", text: "Premiers produits en production" },
      { year: "2022", text: "Systèmes métier multi-équipes" },
      { year: "2024", text: "IA intégrée au cycle de livraison" },
      { year: "2026", text: "Produit, mobile, systèmes et opérations" },
    ],
    photo: "Daniogo Aboubakar, assis, en polo vert",
    place: "Abidjan, Côte d’Ivoire",
  },
  contact: {
    label: "Contact",
    title: "Un produit sérieux à *construire ?*",
    body: "Parlez-moi du système, du point de friction et de ce qui doit changer. Je répondrai avec un regard direct sur le produit et la faisabilité.",
    copy: "Copier l’adresse",
    copied: "Adresse copiée",
    call: "Réserver 30 minutes",
    vcard: "Enregistrer mon contact",
    place: "Abidjan, Côte d’Ivoire",
    timeLabel: "Heure locale",
    emailLabel: "E-mail",
  },
  footer: {
    rights: "Conçu et développé à Abidjan",
    top: "Retour en haut",
    motion: "Animations",
    pause: "Mettre les animations en pause",
    play: "Relancer les animations",
  },
  palette: {
    title: "Actions rapides",
    placeholder: "Rechercher une section ou une action",
    empty: "Aucune action ne correspond.",
    navigate: "Aller à",
    actions: "Actions",
    top: "Haut de page",
    copyEmail: "Copier l’adresse e-mail",
    copied: "Adresse copiée",
    toLight: "Passer en mode clair",
    toDark: "Passer en mode sombre",
    otherLanguage: "Switch to English",
    openProduct: "Ouvrir ContractTchecker",
    book: "Réserver 30 minutes",
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
    skip: "Skip to content",
    navLabel: "Main navigation",
    mobileNavLabel: "Mobile navigation",
  },
  nav: {
    work: "Work",
    expertise: "Expertise",
    profile: "Profile",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
  },
  controls: {
    language: "Language",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
    palette: "Open quick actions",
    localTime: "Abidjan",
  },
  hero: {
    role: "Product engineer",
    eyebrow: "Product engineer / Abidjan, Côte d’Ivoire",
    title: "I turn business complexity into *reliable* products.",
    intro:
      "I design and ship web, mobile, and AI systems where product, interface, and infrastructure move as one.",
    primary: "See the work",
    secondary: "Book 30 minutes",
    status: "Available for focused collaborations",
    since: "Shipping to production since 2019",
    scroll: "Scroll",
    portrait: "Halftone portrait of Daniogo Aboubakar that reacts to the pointer",
  },
  marquee: ["Laravel", "React", "Next.js", "TypeScript", "React Native", "Expo", "Inertia", "PostgreSQL", "Applied AI", "CI/CD"],
  statement: {
    label: "Point of view",
    text: "Code is not the outcome. It is how a product decision becomes *durable.*",
    body: "Since 2019, I have worked where users, business constraints, and production meet. I do not just ship features: I build systems teams can understand, use, and evolve with confidence.",
    steps: [
      { title: "Think", body: "Understand the problem and its rules before writing the solution." },
      { title: "Build", body: "Clear interfaces, grounded in solid business logic." },
      { title: "Operate", body: "Follow what really happens after launch." },
    ],
  },
  work: {
    label: "Selected work",
    title: "Two systems, one *standard.*",
    intro:
      "Start from a real problem, build a readable response, and carry it all the way to production.",
    problem: "The problem",
    decision: "The decision",
    results: "Results",
    stack: "Stack",
    open: "Open",
    cases: [
      {
        id: "contract",
        index: "01",
        kind: "Public AI product",
        title: "ContractTchecker",
        subtitle: "Contract review goes from several days to under one minute.",
        story:
          "Reviewing a contract could take three days and cost 200,000 FCFA. I designed a flow that turns that delay into a structured analysis: a risk score, flagged clauses, and actionable recommendations.",
        decision:
          "Charge per analysis, at the moment of need, instead of forcing a subscription per user.",
        metrics: [
          { value: "2,500+", label: "contracts analyzed" },
          { value: "< 60 s", label: "per analysis" },
          { value: "13", label: "jurisdictions" },
        ],
        stack: ["Laravel", "Inertia", "React", "AI"],
        link: links.contractChecker,
        linkLabel: "Open the product",
        caption: "Illustration of the analysis flow",
      },
      {
        id: "systems",
        index: "02",
        kind: "Enterprise engineering",
        title: "Comafrique Technologies",
        subtitle: "Critical operations turned into readable, maintainable systems.",
        story:
          "For more than three years, I have built business web and mobile platforms: operational workflows, field apps, administration, auditing, deployments, and AI experiments. The details stay confidential. The engineering responsibility is very real.",
        decision:
          "Every interface should simplify the work without weakening business rules or production.",
        metrics: [
          { value: "3+ years", label: "inside the company" },
          { value: "Web + mobile", label: "shipped surfaces" },
          { value: "Production", label: "daily standard" },
        ],
        stack: ["Laravel", "React", "React Native", "Expo", "AI", "Forge"],
        link: "#profile",
        linkLabel: "See my approach",
        caption: "Conceptual architecture, details confidential",
      },
    ],
    contractMock: {
      file: "service_agreement.pdf",
      status: "Analysis done in 48 s",
      score: "Risk score",
      level: "High",
      clausesTitle: "Clauses to review",
      clauses: [
        { ref: "Art. 7", name: "Unilateral termination", severity: "High" },
        { ref: "Art. 12", name: "Late penalties", severity: "Medium" },
        { ref: "Art. 15", name: "Governing jurisdiction", severity: "Medium" },
      ],
      recommendation: "Renegotiate article 7 before signing.",
      recommendationLabel: "Recommendation",
    },
    systemsMock: {
      field: ["Field app", "Offline sync"],
      web: ["Web back office", "Administration"],
      api: ["Business API", "Laravel"],
      rules: ["Rules and access", "Permissions"],
      ai: ["Assisted AI", "Human review"],
      audit: ["Audit", "Traceability"],
      ops: "Monitored production",
    },
  },
  expertise: {
    label: "Expertise",
    title: "A complete view, from intent to behavior in *production.*",
    groups: [
      {
        title: "Product and interface",
        body: "Framing, journeys, interface systems, prototypes, and fast feedback loops.",
        tools: "React, Next.js, Inertia, TypeScript",
      },
      {
        title: "Business engineering",
        body: "Complex rules, APIs, permissions, audit, data, and durable integrations.",
        tools: "Laravel, PostgreSQL, Node.js",
      },
      {
        title: "Field mobile",
        body: "Non-blocking experiences, synchronization, network constraints, and mobile releases.",
        tools: "React Native, Expo, EAS",
      },
      {
        title: "Artificial intelligence",
        body: "Assisted features, extraction, classification, controlled generation, and human validation.",
        tools: "OpenAI, Claude, APIs, automation",
      },
      {
        title: "Operations and reliability",
        body: "Deployment, monitoring, observability, and continuous improvement of production systems.",
        tools: "Forge, CI/CD, monitoring",
      },
    ],
  },
  profile: {
    label: "Profile",
    title: "Close enough to product to understand. Technical enough to *deliver.*",
    paragraphs: [
      "I am Daniogo Aboubakar, a product engineer based in Abidjan. I started shipping production software in 2019 for startups, growing companies, and teams whose work sometimes remains confidential.",
      "My scope runs from interface to infrastructure: Laravel, Inertia, React, Next.js, React Native, Expo, automation, applied AI, and operating real environments.",
      "AI makes me faster, but it does not make decisions for me. I use it as leverage, with engineering judgment, human validation, and constant attention to what happens after launch.",
    ],
    timelineLabel: "Path",
    timeline: [
      { year: "2019", text: "First products in production" },
      { year: "2022", text: "Multi-team business systems" },
      { year: "2024", text: "AI integrated into delivery" },
      { year: "2026", text: "Product, mobile, systems, and operations" },
    ],
    photo: "Daniogo Aboubakar, seated, wearing a green polo",
    place: "Abidjan, Côte d’Ivoire",
  },
  contact: {
    label: "Contact",
    title: "A serious product to *build?*",
    body: "Tell me about the system, the friction point, and what needs to change. I will reply with a direct view on product and feasibility.",
    copy: "Copy address",
    copied: "Address copied",
    call: "Book 30 minutes",
    vcard: "Save my contact",
    place: "Abidjan, Côte d’Ivoire",
    timeLabel: "Local time",
    emailLabel: "Email",
  },
  footer: {
    rights: "Designed and built in Abidjan",
    top: "Back to top",
    motion: "Motion",
    pause: "Pause animations",
    play: "Resume animations",
  },
  palette: {
    title: "Quick actions",
    placeholder: "Search a section or an action",
    empty: "No matching action.",
    navigate: "Go to",
    actions: "Actions",
    top: "Top of page",
    copyEmail: "Copy email address",
    copied: "Address copied",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
    otherLanguage: "Passer en français",
    openProduct: "Open ContractTchecker",
    book: "Book 30 minutes",
    vcard: "Download the vCard",
    pause: "Pause animations",
    play: "Resume animations",
    hint: "Enter to run, Esc to close",
    close: "Close",
  },
};

export const content: Record<Locale, SiteContent> = { fr, en };

/** Découpe un texte en segments, ceux entre astérisques étant mis en valeur. */
export function parseEmphasis(text: string) {
  return text.split("*").map((part, index) => ({ text: part, em: index % 2 === 1 })).filter((part) => part.text);
}

/** Texte brut, sans les marqueurs de mise en valeur. */
export function plain(text: string) {
  return text.replaceAll("*", "");
}
