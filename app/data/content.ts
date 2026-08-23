export type Locale = "fr" | "en";

export const content = {
  fr: {
    nav: {
      work: "Projets",
      profile: "Profil",
      expertise: "Expertise",
      contact: "Parler d’un projet",
      menu: "Menu",
      close: "Fermer",
    },
    hero: {
      role: "Ingénieur produit",
      location: "Abidjan, Côte d’Ivoire",
      status: "Disponible pour des collaborations ciblées",
      headline: ["Je transforme", "la complexité métier", "en produits fiables."],
      intro:
        "Je conçois et livre des systèmes web, mobile et IA où le produit, l’interface et l’infrastructure avancent comme un seul ensemble.",
      primary: "Voir les preuves",
      secondary: "Me contacter",
      portrait: "Daniogo Aboubakar, ingénieur produit",
      scroll: "Explorer le portfolio",
    },
    statement: {
      label: "Point de vue",
      title: "Le code n’est pas la finalité. C’est le moyen de rendre une décision produit durable.",
      body:
        "Depuis 2019, je travaille au point de rencontre entre les usages, les contraintes métier et la production. Je ne livre pas seulement des fonctionnalités. Je construis des systèmes que les équipes comprennent, utilisent et peuvent faire évoluer sans crainte.",
      note: "Penser. Construire. Opérer.",
    },
    work: {
      label: "Travaux sélectionnés",
      title: "Deux systèmes, une même exigence.",
      intro:
        "Partir d’un problème réel, construire une réponse lisible et la livrer jusqu’en production.",
      cases: [
        {
          index: "01",
          kind: "Produit IA public",
          title: "ContractTchecker",
          subtitle: "Faire passer l’analyse contractuelle de plusieurs jours à moins d’une minute.",
          story:
            "L’examen d’un contrat pouvait demander trois jours et coûter 200 000 FCFA. J’ai conçu un workflow qui transforme ce délai en une analyse structurée : score de risque, clauses sensibles et recommandations directement exploitables.",
          decision:
            "Décision structurante : facturer à l’analyse, au moment du besoin, plutôt que d’imposer un abonnement par utilisateur.",
          metrics: [
            ["2 500+", "contrats analysés"],
            ["< 60 s", "analyse moyenne"],
            ["13", "juridictions"],
          ],
          stack: ["Laravel", "Inertia", "React", "IA", "Laravel Cloud"],
          link: "https://checker.65-21-0-100.sslip.io/",
          linkLabel: "Ouvrir le produit",
        },
        {
          index: "02",
          kind: "Ingénierie en entreprise",
          title: "Comafrique Technologies",
          subtitle: "Transformer des opérations critiques en systèmes lisibles et maintenables.",
          story:
            "Depuis plus de trois ans, je construis des plateformes métier web et mobile : workflows opérationnels, applications terrain, administration, audit, déploiements et expérimentations IA. Les détails sensibles restent confidentiels, la responsabilité technique est bien réelle.",
          decision:
            "Principe directeur : chaque interface doit simplifier le travail sans fragiliser les règles métier ni la production.",
          metrics: [
            ["3+ ans", "dans l’entreprise"],
            ["Web + mobile", "surfaces livrées"],
            ["Production", "standard quotidien"],
          ],
          stack: ["Laravel", "React", "React Native", "Expo", "Intégrations IA", "Forge"],
          link: "#profile",
          linkLabel: "Voir mon approche",
        },
      ],
    },
    profile: {
      label: "Profil",
      title: "Assez proche du produit pour comprendre. Assez technique pour livrer.",
      paragraphs: [
        "Je suis Daniogo Aboubakar, ingénieur produit basé à Abidjan. J’ai commencé à livrer des logiciels en production en 2019, pour des startups, des entreprises en croissance et des équipes dont certains projets restent confidentiels.",
        "Mon terrain de jeu va de l’interface à l’infrastructure : Laravel, Inertia, React, Next.js, React Native, Expo, automatisation, IA appliquée et exploitation sur de vrais environnements.",
        "L’IA accélère mon travail, mais elle ne prend pas les décisions à ma place. Je l’utilise comme levier, avec du jugement, des validations humaines et une attention constante à ce qui se passe après la mise en ligne.",
      ],
      timeline: [
        ["2019", "Premiers produits en production"],
        ["2022", "Systèmes métier multi-équipes"],
        ["2024", "IA intégrée au cycle de livraison"],
        ["2026", "Produit, mobile, systèmes et opérations"],
      ],
      photo: "Portrait de Daniogo Aboubakar à Abidjan",
    },
    expertise: {
      label: "Système de travail",
      title: "Une vision complète, de l’intention au comportement en production.",
      groups: [
        {
          index: "01",
          title: "Produit et interface",
          body: "Cadrage, parcours, systèmes d’interface, prototypes et boucles de retour rapides.",
          tools: "React, Next.js, Inertia, TypeScript",
        },
        {
          index: "02",
          title: "Ingénierie métier",
          body: "Règles complexes, API, permissions, audit, données et intégrations durables.",
          tools: "Laravel, PostgreSQL, Node.js",
        },
        {
          index: "03",
          title: "Mobile terrain",
          body: "Expériences non bloquantes, synchronisation, contraintes réseau et publication mobile.",
          tools: "React Native, Expo, EAS",
        },
        {
          index: "04",
          title: "Intégration d’intelligence artificielle",
          body: "Fonctionnalités assistées, extraction, classification, génération encadrée et validation humaine.",
          tools: "OpenAI, Claude, API, automatisation",
        },
        {
          index: "05",
          title: "Opérations et fiabilité",
          body: "Déploiement, monitoring, observabilité et amélioration continue des systèmes en production.",
          tools: "Forge, CI/CD, monitoring, exploitation",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: ["Un produit sérieux", "à construire ?"],
      body:
        "Parlez-moi du système, du point de friction et de ce qui doit changer. Je répondrai avec un regard direct sur le produit et la faisabilité.",
      email: "daniogoaboubakar@icloud.com",
      emailLabel: "Écrire un message",
      call: "Réserver 30 minutes",
      location: "Abidjan / UTC+0",
    },
    footer: "Conçu et développé à Abidjan",
  },
  en: {
    nav: {
      work: "Work",
      profile: "Profile",
      expertise: "Expertise",
      contact: "Discuss a project",
      menu: "Menu",
      close: "Close",
    },
    hero: {
      role: "Product engineer",
      location: "Abidjan, Côte d’Ivoire",
      status: "Available for focused collaborations",
      headline: ["I turn", "business complexity", "into reliable products."],
      intro:
        "I design and ship web, mobile, and AI systems where product, interface, and infrastructure move as one.",
      primary: "See the proof",
      secondary: "Get in touch",
      portrait: "Daniogo Aboubakar, product engineer",
      scroll: "Explore the portfolio",
    },
    statement: {
      label: "Point of view",
      title: "Code is not the outcome. It is how a product decision becomes durable.",
      body:
        "Since 2019, I have worked at the intersection of users, business constraints, and production. I do not just ship features. I build systems teams can understand, use, and evolve with confidence.",
      note: "Think. Build. Operate.",
    },
    work: {
      label: "Selected work",
      title: "Two systems, one standard.",
      intro:
        "Start from a real problem, build a readable response, and carry it all the way to production.",
      cases: [
        {
          index: "01",
          kind: "Public AI product",
          title: "ContractTchecker",
          subtitle: "Taking contract analysis from several days to under one minute.",
          story:
            "Reviewing a contract could take three days and cost 200,000 FCFA. I designed a workflow that turns that delay into a structured analysis with a risk score, flagged clauses, and actionable recommendations.",
          decision:
            "Defining decision: charge per analysis, at the moment of need, instead of forcing a subscription per user.",
          metrics: [
            ["2,500+", "contracts analyzed"],
            ["< 60 s", "average analysis"],
            ["13", "jurisdictions"],
          ],
          stack: ["Laravel", "Inertia", "React", "AI", "Laravel Cloud"],
          link: "https://checker.65-21-0-100.sslip.io/",
          linkLabel: "Open the product",
        },
        {
          index: "02",
          kind: "Enterprise engineering",
          title: "Comafrique Technologies",
          subtitle: "Turning critical operations into readable and maintainable systems.",
          story:
            "For more than three years, I have built business web and mobile platforms: operational workflows, field apps, administration, auditing, deployments, and AI experiments. Sensitive details remain confidential. The engineering responsibility is very real.",
          decision:
            "Guiding principle: every interface should simplify the work without weakening business rules or production.",
          metrics: [
            ["3+ years", "inside the company"],
            ["Web + mobile", "shipped surfaces"],
            ["Production", "daily standard"],
          ],
          stack: ["Laravel", "React", "React Native", "Expo", "AI integrations", "Forge"],
          link: "#profile",
          linkLabel: "See my approach",
        },
      ],
    },
    profile: {
      label: "Profile",
      title: "Close enough to product to understand. Technical enough to deliver.",
      paragraphs: [
        "I am Daniogo Aboubakar, a product engineer based in Abidjan. I started shipping production software in 2019 for startups, growing companies, and teams whose work sometimes remains confidential.",
        "My scope runs from interface to infrastructure: Laravel, Inertia, React, Next.js, React Native, Expo, automation, applied AI, and operating real environments.",
        "AI makes me faster, but it does not make decisions for me. I use it as leverage, with engineering judgment, human validation, and constant attention to what happens after launch.",
      ],
      timeline: [
        ["2019", "First products in production"],
        ["2022", "Multi-team business systems"],
        ["2024", "AI integrated into delivery"],
        ["2026", "Product, mobile, systems, and operations"],
      ],
      photo: "Portrait of Daniogo Aboubakar in Abidjan",
    },
    expertise: {
      label: "Working system",
      title: "A complete view, from intent to production behavior.",
      groups: [
        {
          index: "01",
          title: "Product and interface",
          body: "Framing, journeys, interface systems, prototypes, and fast feedback loops.",
          tools: "React, Next.js, Inertia, TypeScript",
        },
        {
          index: "02",
          title: "Business engineering",
          body: "Complex rules, APIs, permissions, audit, data, and durable integrations.",
          tools: "Laravel, PostgreSQL, Node.js",
        },
        {
          index: "03",
          title: "Field mobile",
          body: "Non-blocking experiences, synchronization, network constraints, and mobile releases.",
          tools: "React Native, Expo, EAS",
        },
        {
          index: "04",
          title: "Artificial intelligence integration",
          body: "Assisted features, extraction, classification, controlled generation, and human validation.",
          tools: "OpenAI, Claude, APIs, automation",
        },
        {
          index: "05",
          title: "Operations and reliability",
          body: "Deployment, monitoring, observability, and continuous improvement of production systems.",
          tools: "Forge, CI/CD, monitoring, operations",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: ["A serious product", "to build?"],
      body:
        "Tell me about the system, the friction point, and what needs to change. I will reply with a direct view on product and feasibility.",
      email: "daniogoaboubakar@icloud.com",
      emailLabel: "Write a message",
      call: "Book 30 minutes",
      location: "Abidjan / UTC+0",
    },
    footer: "Designed and built in Abidjan",
  },
} as const;
