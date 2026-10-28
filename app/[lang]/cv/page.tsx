import { ArrowLeft, Download } from "lucide-react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import PrintButton from "../../components/cv/PrintButton";
import { cv } from "../../data/cv";
import { pageMetadata } from "../../data/metadata";
import { cvPdf, isLocale, links, localePath, locales, parseEmphasis, person, siteUrl } from "../../data/site";
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

function Emphasis({ text }: { text: string }) {
  return (
    <>
      {parseEmphasis(text).map((part, index) => (part.em ? <em key={index}>{part.text}</em> : <Fragment key={index}>{part.text}</Fragment>))}
    </>
  );
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
          <div className="cv-identity">
            <h1>{person.name}</h1>
            <p className="cv-role">{t.role}</p>
            <p className="cv-tagline">
              <Emphasis text={t.tagline} />
            </p>
          </div>
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
            <li>
              <a href={`${siteUrl}${localePath(lang)}`}>{portfolio}</a>
            </li>
          </ul>
          {/* eslint-disable-next-line @next/next/no-img-element -- image fixe, imprimée telle quelle dans le PDF */}
          <img className="cv-photo" src="/portraits/cv-portrait.jpg" alt={t.photo} width={600} height={720} />
        </header>

        <p className="cv-summary">{t.summary}</p>

        <div className="cv-columns">
          <div className="cv-main">
            <section aria-labelledby="cv-experience">
              <h2 id="cv-experience">{t.sections.experience}</h2>
              {t.experience.map((job) => (
                <article key={job.org} className="cv-job">
                  <div className="cv-job-head">
                    <h3>{job.org}</h3>
                    <p>
                      {job.place} / {job.dates}
                    </p>
                  </div>
                  <p className="cv-job-role">{job.role}</p>
                  <ul>
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </section>

            <section aria-labelledby="cv-method">
              <h2 id="cv-method">{t.sections.method}</h2>
              <p>{t.method}</p>
            </section>

            <section aria-labelledby="cv-missions">
              <h2 id="cv-missions">{t.sections.missions}</h2>
              <ul className="cv-missions">
                {t.missions.map((mission) => (
                  <li key={mission.title}>
                    <strong>{mission.title}</strong>
                    {lang === "fr" ? "\u202f: " : ": "}
                    {mission.body}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="cv-education">
              <h2 id="cv-education">{t.sections.education}</h2>
              <h3>{t.education.school}</h3>
              <p>{t.education.body}</p>
            </section>
          </div>

          <aside className="cv-side">
            <section aria-labelledby="cv-skills">
              <h2 id="cv-skills">{t.sections.skills}</h2>
              <dl className="cv-skills">
                {t.skills.map((skill) => (
                  <div key={skill.title}>
                    <dt>{skill.title}</dt>
                    <dd>{skill.body}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="cv-languages">
              <h2 id="cv-languages">{t.sections.languages}</h2>
              <ul className="cv-plain">
                {t.languages.map((item) => (
                  <li key={item.name}>
                    {item.name}
                    {item.level && <span>, {item.level}</span>}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="cv-interests">
              <h2 id="cv-interests">{t.sections.interests}</h2>
              <p>{t.interests}</p>
            </section>

            <section className="cv-qr" aria-labelledby="cv-portfolio">
              {/* eslint-disable-next-line @next/next/no-img-element -- QR vectoriel, doit rester net à l’impression */}
              <img src={`/qr/portfolio-${lang}.svg`} alt="" width={33} height={33} />
              <div>
                <h2 id="cv-portfolio">{t.sections.portfolio}</h2>
                <p>{t.qr}</p>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
