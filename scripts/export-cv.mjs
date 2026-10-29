// Exporte les deux PDF du CV (une page A4 chacun) à partir du site lancé en local.
//
// Usage : node scripts/export-cv.mjs [adresse du site, par défaut http://localhost:3000]
// Playwright n’est pas une dépendance du projet : il est cherché dans le dossier courant,
// par exemple après « npm i playwright && npx playwright install chromium » dans un dossier de travail.
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

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const publicDir = fileURLToPath(new URL("../public/", import.meta.url));
const pages = [
  { lang: "fr", path: "/cv" },
  { lang: "en", path: "/en/cv" },
];

const browser = await chromium.launch();
let failed = false;
for (const { lang, path } of pages) {
  const page = await browser.newPage({ colorScheme: "light" });
  await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "print" });
  // La feuille doit tenir sur une page : on refuse d’exporter un contenu qui déborde.
  const overflow = await page.evaluate(() =>
    [...document.querySelectorAll(".cv-sheet")].some((element) => element.scrollHeight > element.clientHeight + 1),
  );
  if (overflow) {
    console.error(`${path} : le contenu dépasse la page A4, PDF non exporté.`);
    failed = true;
    continue;
  }
  const file = `${publicDir}cv-zie-daniogo-${lang}.pdf`;
  await page.pdf({ path: file, preferCSSPageSize: true, printBackground: true, tagged: true });
  console.log(`${path} -> ${file}`);
  await page.close();
}
await browser.close();
process.exit(failed ? 1 : 0);
