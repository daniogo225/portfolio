// Données partagées entre le serveur et le navigateur. Les textes traduits vivent dans content.ts
// et cv.ts, importés uniquement côté serveur pour ne pas alourdir le JavaScript envoyé.

export type Locale = "fr" | "en";

export const locales: Locale[] = ["fr", "en"];

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

export const siteUrl = "https://portfolio-eight-rust-82.vercel.app";

export const person = {
  name: "Zié Daniogo",
  fullName: "Zié Aboubakar junior Daniogo",
};

export const links = {
  email: "daniogoaboubakar@icloud.com",
  phone: "+225 07 15 73 68 02",
  tel: "tel:+2250715736802",
  whatsapp: "https://wa.me/2250715736802",
  github: "https://github.com/daniogo225",
  githubLabel: "github.com/daniogo225",
  calendar: "https://cal.com/dani-walker-uqwwfc/30min",
  vcard: "/daniogo.vcf",
} as const;

/** Chemin d’une page dans une langue : le français est à la racine, l’anglais sous /en. */
export function localePath(locale: Locale, path = "") {
  const clean = path.replace(/^\/+/, "");
  if (locale === "fr") return `/${clean}`;
  return clean ? `/en/${clean}` : "/en";
}

export function cvPdf(locale: Locale) {
  return `/cv-zie-daniogo-${locale}.pdf`;
}

export function whatsappUrl(text: string) {
  return `${links.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function mailtoUrl(subject: string, body: string) {
  return `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Découpe un texte en segments, ceux entre astérisques étant mis en valeur. */
export function parseEmphasis(text: string) {
  return text
    .split("*")
    .map((part, index) => ({ text: part, em: index % 2 === 1 }))
    .filter((part) => part.text);
}

/** Texte brut, sans les marqueurs de mise en valeur. */
export function plain(text: string) {
  return text.replaceAll("*", "");
}
