# Portfolio de Zié Daniogo

Site personnel et CV de Zié Daniogo, ingénieur produit full-stack et IA. Next.js 16, React 19, Tailwind 4, motion et lenis, déployé par Vercel depuis `master`.

Le positionnement, les offres, le ton et les textes réutilisables (LinkedIn, Malt, Upwork, Fiverr) sont dans [`docs/positionnement.md`](docs/positionnement.md). À lire avant de modifier un texte.

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
| `/sitemap.xml`, `/robots.txt` | Référencement |

Les pages vivent dans `app/[lang]/`. Le français est servi à la racine grâce à une réécriture dans `next.config.ts` ; les adresses `/fr/...` redirigent vers la racine.

## Où sont les textes

- `app/data/content.ts` : textes du portfolio (FR et EN), importés seulement côté serveur. Le parcours et les compétences de la section Profil sont repris de `cv.ts`, sans le nom de l’employeur.
- `app/data/cv.ts` : textes du CV (FR et EN).
- `app/data/site.ts` : coordonnées, liens, adresse du site.

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

## Si l’adresse du site change

1. Modifier `siteUrl` dans `app/data/site.ts` (métadonnées, sitemap, CV).
2. Régénérer les QR codes du CV :
   ```bash
   cd /tmp/cv-export && npm i qrcode
   node -e "const q=require('qrcode');const fs=require('fs');for(const [l,p] of [['fr','/'],['en','/en']])q.toString('NOUVELLE_ADRESSE'+p,{type:'svg',errorCorrectionLevel:'M',margin:0,color:{dark:'#121211ff',light:'#ffffff00'}}).then(s=>fs.writeFileSync('$HOME/code/portfolio/public/qr/portfolio-'+l+'.svg',s))"
   ```
3. Mettre à jour `public/daniogo.vcf`, puis régénérer les PDF.
