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

1. Hero : le portrait en noir, le nom en travers, une phrase, une action.
2. Ce que je fais (`app/components/site/Build.tsx`) : trois scènes, une illustration isométrique, une phrase et sa précision : l’application mobile, le back-office web, la mise en production. La section est épinglée et le défilement fait glisser la caméra d’une scène à l’autre ; sans animation, les scènes se lisent l’une sous l’autre. Illustrations dans `public/scenes/` (générées avec Codex, optimisées en WebP).
3. Méthode : la règle à gauche, le planning « seul / avec des agents » à droite.
4. Profil : le portrait en vignette, en noir et blanc, à côté de la phrase en grand ; un paragraphe, le CV. Le portrait d’origine est petit (600 px) : il reste affiché petit pour rester net.
5. Contact : « Écrivez-moi », le disque WhatsApp, trois coordonnées.

Styles des sections dans `app/sections.css`. Le mouvement (entrée de la hero, rideau, travelling) se coupe avec `prefers-reduced-motion` ou le bouton « Animations » du pied de page.

Photos : seuls les portraits en noir de `public/portraits/` sont publiés. Les photos retirées sont dans `docs/photos-retirees/`, hors du site.

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
