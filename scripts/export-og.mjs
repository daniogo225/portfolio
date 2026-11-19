// Génère les deux images de partage (1200 × 630) : public/og/og-fr.png et public/og/og-en.png.
// Le portrait est celui en noir (public/portraits/daniogo-product-engineer-cutout.png).
//
// Usage : node scripts/export-og.mjs
// Playwright n’est pas une dépendance du projet : il est cherché dans le dossier courant, comme
// pour export-cv.mjs. Les polices du site (Newsreader, Public Sans, IBM Plex Mono) sont chargées
// depuis Google Fonts : lancer le script avec le réseau.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(`${process.cwd()}/`);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  console.error("Playwright est introuvable depuis ce dossier. Installez-le ici : npm i playwright");
  process.exit(1);
}

const root = fileURLToPath(new URL("../", import.meta.url));
const data = (path, type) => `data:${type};base64,${readFileSync(`${root}${path}`).toString("base64")}`;
const portrait = data("public/portraits/daniogo-product-engineer-cutout.png", "image/png");

const copy = {
  fr: {
    place: "Zié Daniogo / Abidjan, Côte d’Ivoire",
    title: "Des applications web et mobiles, conçues, développées et mises en ligne <em>de bout en bout.</em>",
    role: "Développeur full-stack et IA",
    detail: "Web, mobile, IA intégrée / Français, anglais",
  },
  en: {
    place: "Zié Daniogo / Abidjan, Côte d’Ivoire",
    title: "Web and mobile applications, designed, built and shipped <em>end to end.</em>",
    role: "Full-stack and AI developer",
    detail: "Web, mobile, built-in AI / English, French",
  },
};

const html = (t) => `<!doctype html>
<html><head><meta charset="utf-8">
<style>
@import url("https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;1,6..72,400&family=Public+Sans:wght@400;500&family=IBM+Plex+Mono:wght@500&display=block");
* { box-sizing: border-box; margin: 0; }
body { position: relative; width: 1200px; height: 630px; overflow: hidden; background: #0c0c0d; color: #ececea; font-family: "Public Sans", sans-serif; -webkit-font-smoothing: antialiased; }
.text { position: absolute; inset: 64px auto 60px 72px; display: flex; flex-direction: column; width: 700px; }
.place { color: #9a9993; font: 500 17px/1 "IBM Plex Mono", monospace; letter-spacing: 0.1em; text-transform: uppercase; }
h1 { max-width: 640px; margin-top: 44px; font-family: "Newsreader", serif; font-size: 58px; font-weight: 500; line-height: 1.06; letter-spacing: -0.025em; text-wrap: balance; }
h1 em { font-style: italic; font-weight: 400; }
.role { margin-top: auto; font-size: 27px; font-weight: 500; letter-spacing: -0.01em; }
.detail { margin-top: 10px; color: #9a9993; font-size: 21px; }
.portrait { position: absolute; top: 34px; right: 28px; width: 470px; }
</style></head>
<body>
  <img class="portrait" src="${portrait}" alt="">
  <div class="text">
    <p class="place">${t.place}</p>
    <h1>${t.title}</h1>
    <p class="role">${t.role}</p>
    <p class="detail">${t.detail}</p>
  </div>
</body></html>`;

const browser = await chromium.launch();
for (const lang of ["fr", "en"]) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(html(copy[lang]), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const file = `${root}public/og/og-${lang}.png`;
  await page.screenshot({ path: file });
  console.log(`og-${lang}.png -> ${file}`);
  await page.close();
}
await browser.close();
