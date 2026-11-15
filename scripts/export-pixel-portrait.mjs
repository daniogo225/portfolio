// Génère le portrait en pixel art du Profil à partir du vrai portrait en noir
// (public/portraits/daniogo-product-engineer-cutout.png) : public/portraits/pixel/zie-<largeur>.png.
// La plus fine (48 pixels de large) est l’image affichée ; les plus grossières servent à la mise au
// point quand le portrait entre dans l’écran. Six gris de la palette du site, fond transparent :
// la même image sert en clair et en sombre.
//
// Usage : node scripts/export-pixel-portrait.mjs
// sharp n’est pas une dépendance du projet : il est cherché dans le dossier courant, comme
// Playwright pour export-cv.mjs.
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(`${process.cwd()}/`);
let sharp;
try {
  sharp = require("sharp");
} catch {
  console.error("sharp est introuvable depuis ce dossier. Installez-le ici : npm i sharp");
  process.exit(1);
}

const root = fileURLToPath(new URL("../", import.meta.url));
const source = `${root}public/portraits/daniogo-product-engineer-cutout.png`;
const out = `${root}public/portraits/pixel`;

// Cadrage 3:4 sur la tête et les épaules, dans l’image d’origine (1024 × 1536).
export const CROP = { left: 253, top: 36, width: 462, height: 616 };
// Du plus grossier au plus fin : chaque palier double la finesse.
export const WIDTHS = [6, 12, 24, 48];
// Du noir du fond au blanc du texte.
export const GREYS = ["#0c0c0d", "#26262a", "#4a4946", "#7b7a75", "#b3b2ac", "#ececea"];

const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

/**
 * Le portrait réduit à `width` pixels de large, en six gris.
 * `background` : une couleur pleine derrière la silhouette (sinon transparent).
 * `dither` : trame ordonnée entre deux gris voisins (0 = aplats).
 */
export async function pixelPortrait(width, { background, dither = 0 } = {}) {
  const height = Math.round((width * 4) / 3);
  const palette = GREYS.map(rgb);
  const top = palette.length - 1;
  const resized = () => sharp(source).extract(CROP).resize(width, height, { kernel: "lanczos3" });
  const raw = (image) => image.ensureAlpha().raw().toBuffer();
  const soft = await raw(resized());
  // Un léger accent garde les yeux et la bouche lisibles. Il ne vaut que pour la peau : sur la
  // veste, il ferait du grain. Inutile sur les paliers grossiers.
  const crisp = width >= 32 ? await raw(resized().sharpen({ sigma: 0.8, m1: 1, m2: 2 })) : soft;
  const luminanceOf = (data, i) => (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
  const pixels = Buffer.alloc(width * height * 4);
  const fill = background ? rgb(background) : null;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (soft[i + 3] < 153) {
        if (fill) pixels.set([...fill, 255], i);
        continue;
      }
      const luminance = luminanceOf(soft, i) > 0.2 ? luminanceOf(crisp, i) : luminanceOf(soft, i);
      // La photo est sombre : on étire ses tons sur toute la palette.
      const tone = Math.pow(Math.min(1, Math.max(0, (luminance - 0.02) / 0.88)), 0.75);
      const noise = dither ? ((BAYER[y % 4][x % 4] + 0.5) / 16 - 0.5) * dither : 0;
      const level = Math.min(top, Math.max(0, Math.round(tone * top + noise)));
      pixels.set([...palette[level], 255], i);
    }
  }

  return sharp(pixels, { raw: { width, height, channels: 4 } }).png({ compressionLevel: 9, palette: true, colours: 8 });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  mkdirSync(out, { recursive: true });
  for (const width of WIDTHS) {
    const file = `${out}/zie-${String(width).padStart(2, "0")}.png`;
    const info = await (await pixelPortrait(width)).toFile(file);
    console.log(`${file.replace(root, "")} ${info.width} × ${info.height}, ${info.size} octets`);
  }
}
