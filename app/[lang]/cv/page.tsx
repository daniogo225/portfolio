import { ArrowLeft, Download } from "lucide-react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import PrintButton from "../../components/cv/PrintButton";
import { cv } from "../../data/cv";
import { pageMetadata } from "../../data/metadata";
import { cvPdf, isLocale, links, localePath, locales, person, siteUrl } from "../../data/site";
import "./cv.css";

// Polices statiques pour la feuille : Chrome les embarque en TrueType dans le PDF,
// ce qui garde un texte net, sélectionnable et lisible par les logiciels de tri de CV.
const cvSans = localFont({
  src: [
    { path: "./fonts/Geist-Regular.ttf", weight: "400" },
    { path: "./fonts/Geist-Medium.ttf", weight: "500" },
    { path: "./fonts/Geist-SemiBold.ttf", weight: "600" },
  ],
  variable: "--font-cv-sans",
  display: "swap",
  preload: false,
});

const cvMono = localFont({
  src: [{ path: "./fonts/GeistMono-Medium.ttf", weight: "500" }],
  variable: "--font-cv-mono",
  display: "swap",
  preload: false,
});

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = cv[lang];
  return pageMetadata(lang, "cv", t.meta.title, t.meta.description);
}

/** CV sur une page A4 : lisible à l’écran, imprimable tel quel et exporté en PDF. */
export default async function CvPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = cv[lang];
  const portfolio = `${siteUrl.replace("https://", "")}${lang === "en" ? "/en" : ""}`;

  return (
    <div className="cv-page">
      <nav className="cv-toolbar" aria-label={t.toolbar.language}>
        <a className="cv-tool" href={localePath(lang)}>
          <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
          {t.toolbar.back}
        </a>
        <div className="cv-tools">
          <div className="cv-langs" role="group" aria-label={t.toolbar.language}>
            {locales.map((code) => (
              <a
                key={code}
                href={localePath(code, "cv")}
                hrefLang={code}
                lang={code}
                aria-current={code === lang ? "page" : undefined}
              >
                {code.toUpperCase()}
                <span className="sr-only">{code === "fr" ? ", CV en français" : ", résumé in English"}</span>
              </a>
            ))}
          </div>
          <PrintButton label={t.toolbar.print} />
          <a className="cv-tool is-primary" href={cvPdf(lang)} download>
            {t.toolbar.download}
            <Download size={16} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </nav>

      <main className={`cv-sheet ${cvSans.variable} ${cvMono.variable}`}>
        <header className="cv-head">
          <div>
            <h1>{person.name}</h1>
            <p className="cv-role">{t.role}</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- image fixe, imprimée telle quelle dans le PDF */}
          <img className="cv-photo" src="/portraits/cv-portrait.jpg" alt={t.photo} width={600} height={720} />
        </header>

        <ul className="cv-contacts">
          <li>{t.place}</li>
          <li>
            <span>{t.whatsapp}</span> <a href={links.whatsapp}>{links.phone}</a>
          </li>
          <li>
            <a href={`mailto:${links.email}`}>{links.email}</a>
          </li>
          <li>
            <a href={links.github}>{links.githubLabel}</a>
          </li>
        </ul>

        <div className="cv-row cv-intro">
          <div className="cv-intro-text">
            <p>{t.pitch}</p>
            <p>{t.method}</p>
          </div>
        </div>

        <section className="cv-row cv-section" aria-labelledby="cv-experience">
          <h2 id="cv-experience">
            <span className="cv-index" aria-hidden="true">01</span>
            {t.sections.experience}
          </h2>
          <article className="cv-job">
            <div className="cv-job-head">
              <h3>{t.job.org}</h3>
              <p>
                {t.job.place}, {t.job.dates}
              </p>
            </div>
            <p className="cv-job-title">{t.job.title}</p>
            <p className="cv-job-path">{t.job.path}</p>
            <ul className="cv-highlights">
              {t.job.highlights.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.body}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="cv-row cv-section" aria-labelledby="cv-skills">
          <h2 id="cv-skills">
            <span className="cv-index" aria-hidden="true">02</span>
            {t.sections.skills}
          </h2>
          <dl className="cv-skills">
            {t.skills.map((skill) => (
              <div key={skill.title}>
                <dt>{skill.title}</dt>
                <dd>{skill.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="cv-row cv-section" aria-labelledby="cv-education">
          <h2 id="cv-education">
            <span className="cv-index" aria-hidden="true">03</span>
            {t.sections.education}
          </h2>
          <div className="cv-pair">
            <div>
              <h3>{t.education.school}</h3>
              <p>{t.education.body}</p>
            </div>
            <div>
              <section aria-labelledby="cv-languages">
                <h2 id="cv-languages" className="cv-subhead">
                  {t.sections.languages}
                </h2>
                <p>
                  {t.languages.map((item, index) => (
                    <span key={item.name}>
                      {index > 0 && (lang === "fr" ? "\u202f; " : "; ")}
                      {item.name}
                      {item.level && `, ${item.level}`}
                    </span>
                  ))}
                </p>
              </section>
              <section aria-labelledby="cv-interests">
                <h2 id="cv-interests" className="cv-subhead">
                  {t.sections.interests}
                </h2>
                <p>{t.interests}</p>
              </section>
            </div>
          </div>
        </section>

        <footer className="cv-row cv-foot">
          <h2 className="cv-foot-label">{t.sections.portfolio}</h2>
          <div className="cv-foot-body">
            <p>
              <a href={`${siteUrl}${localePath(lang)}`}>{portfolio}</a>
              <span>{t.qr}</span>
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element -- QR vectoriel, doit rester net à l’impression */}
            <img src={`/qr/portfolio-${lang}.svg`} alt="" width={33} height={33} />
          </div>
        </footer>
      </main>
    </div>
  );
}
