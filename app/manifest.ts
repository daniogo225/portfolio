import type { MetadataRoute } from "next";
import { person } from "./data/site";

// Manifeste du site : nom, couleurs et icônes pour l’ajout à l’écran d’accueil.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${person.name}, développeur full-stack et IA`,
    short_name: person.name,
    description: "Zié Daniogo, développeur full-stack et IA à Abidjan : applications mobiles, applications web et IA intégrée.",
    start_url: "/",
    display: "standalone",
    lang: "fr",
    background_color: "#0c0c0d",
    theme_color: "#0c0c0d",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
