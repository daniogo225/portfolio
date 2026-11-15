# Portfolio de Zié Daniogo

Site personnel et CV de Zié Daniogo, développeur full-stack et IA. Next.js 16, React 19, Tailwind 4, motion et lenis, déployé par Vercel depuis `master`.

Ce que le site dit, le ton et ce qu’on ne publie jamais sont dans [`docs/positionnement.md`](docs/positionnement.md). À lire avant de modifier un texte.

## Commandes

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # build de production
pnpm lint
```

## Pages

| Adresse | Contenu |
| --- | --- |
| `/` | Portfolio en français |
| `/en` | Portfolio en anglais |
| `/cv`, `/en/cv` | CV sur une page A4, imprimable |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | Référencement |

Les pages vivent dans `app/[lang]/`. Le français est servi à la racine grâce à une réécriture dans `next.config.ts` ; les adresses `/fr/...` redirigent vers la racine.

## Où sont les textes

- `app/data/content.ts` : textes du portfolio (FR et EN), importés seulement côté serveur. Le parcours de la section Profil reste générique, sans le nom de l’employeur.
- `app/data/cv.ts` : textes du CV (FR et EN).
- `app/data/site.ts` : coordonnées, liens, adresse du site, date de mise à jour (`lastUpdated`, reprise par le sitemap et les données structurées).
- `app/data/metadata.ts` : titres, descriptions, hreflang et données structurées (WebSite, ProfilePage, Person).

Règles : aucun projet, produit, client, chiffre ou capture de l’employeur ; aucun produit personnel nommé ; rien d’inventé. Voir `docs/positionnement.md`.

## Régénérer les PDF du CV

Après toute modification de `app/data/cv.ts` ou de `app/[lang]/cv/` :

```bash
pnpm build && pnpm start              # le site tourne sur http://localhost:3000
mkdir -p /tmp/cv-export && cd /tmp/cv-export
npm i playwright && npx playwright install chromium
node ~/code/portfolio/scripts/export-cv.mjs http://localhost:3000
```

Le script écrit `public/cv-zie-daniogo-fr.pdf` et `public/cv-zie-daniogo-en.pdf` et refuse d’exporter si le contenu dépasse la page A4. La feuille utilise des polices Geist statiques (`app/[lang]/cv/fonts`, licence OFL) pour que le PDF contienne du texte TrueType net et sélectionnable.

## Structure de la page

1. Hero : trois pièces. Le portrait en noir au centre ; le nom en bannière, qui défile le long d’un U passant derrière lui (texte sur tracé SVG, `NameBanner` dans `app/components/site/Hero.tsx`) ; le texte en légende dans les deux coins du haut, alignés sur les marges de l’en-tête : la phrase à gauche, le métier et l’action à droite. Le creux du U reste libre autour du visage ; il se calcule sur la scène et se réduit seulement si les lettres frôlaient le texte. Sur téléphone il n’est plus qu’une légère courbe, et le texte passe au-dessus du portrait.
2. Ce que je fais (`app/components/site/Build.tsx`) : trois scènes, une illustration isométrique au centre, et dessous, centrés, une phrase (un énoncé de compétence) et ses outils en petite ligne : les applications mobiles, les applications web avec IA, la mise en production. La section est épinglée et le défilement fait glisser la caméra d’une scène à l’autre ; sans animation, les scènes se lisent l’une sous l’autre. Illustrations dans `public/scenes/` (générées avec Codex, optimisées en WebP).
3. Méthode : la règle centrée, une phrase par ligne, et le planning « seul / avec des agents » dessous, dans le même axe.
4. Profil : le portrait en pixel art (`app/components/ui/PixelPortrait.tsx`, 48 × 64 pixels, six gris) à côté du titre, de la description et du CV. C’est le seul écran qui porte un paragraphe : son texte reste à gauche, contre l’image. Quand il entre dans l’écran, le portrait arrive en gros pixels et se met au point en trois paliers.
5. Contact : « Un projet, une question ? Écrivez-moi. », centré, le disque WhatsApp dessous, trois coordonnées.

Alignement : les écrans à phrase courte (2, 3, 5) se lisent dans l’axe ; le paragraphe du Profil et le planning restent à gauche.

Styles des sections dans `app/sections.css`. Le mouvement (entrée de la hero : le portrait, la bannière qui se déroule depuis son dos, puis les deux coins de texte ensemble ; rideau, travelling) se coupe avec `prefers-reduced-motion` ou le bouton « Animations » du pied de page.

Photos : seuls les portraits en noir de `public/portraits/` sont publiés. Les photos retirées sont dans `docs/photos-retirees/`, hors du site.

## Régénérer le portrait en pixel art

```bash
cd /tmp/cv-export            # un dossier où sharp est installé (npm i sharp)
node ~/code/portfolio/scripts/export-pixel-portrait.mjs
```

Le script part du portrait en noir de la hero et écrit `public/portraits/pixel/zie-06.png` à `zie-48.png` : l’image affichée et les trois paliers de la mise au point. Le cadrage, la palette et les finesses sont en tête du script.

## Régénérer les images de partage

```bash
cd /tmp/cv-export            # un dossier où Playwright est installé
node ~/code/portfolio/scripts/export-og.mjs
```

Le script écrit `public/og/og-fr.png` et `public/og/og-en.png` (1200 × 630) à partir du portrait en noir.

## Si l’adresse du site change

1. Modifier `siteUrl` dans `app/data/site.ts` (métadonnées, sitemap, CV).
2. Régénérer les QR codes du CV :
   ```bash
   cd /tmp/cv-export && npm i qrcode
   node -e "const q=require('qrcode');const fs=require('fs');for(const [l,p] of [['fr','/'],['en','/en']])q.toString('NOUVELLE_ADRESSE'+p,{type:'svg',errorCorrectionLevel:'M',margin:0,color:{dark:'#121211ff',light:'#ffffff00'}}).then(s=>fs.writeFileSync('$HOME/code/portfolio/public/qr/portfolio-'+l+'.svg',s))"
   ```
3. Mettre à jour `public/daniogo.vcf`, puis régénérer les PDF.
