"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { content, type Locale } from "../data/content";
import AsciiField from "./AsciiField";
import GsapController from "./GsapController";

function Words({ children }: { children: string }) {
  return (
    <span className="word-reveal" data-word-reveal>
      {children.split(" ").map((word, index) => (
        <span className="word-clip" key={`${word}-${index}`}>
          <span>{word}&nbsp;</span>
        </span>
      ))}
    </span>
  );
}

function ProjectVisual({ index, locale }: { index: number; locale: Locale }) {
  if (index === 0) {
    return (
      <div className="case-visual case-visual-contract" aria-hidden="true">
        <div className="visual-topline"><span>CONTRACT::SCAN</span><span>[ RUNNING ]</span></div>
        <div className="contract-document">
          <div className="document-head"><span>RISK/REPORT</span><strong>68</strong></div>
          <div className="document-code">
            <span>01 / TERMINATION</span><b>REVIEW</b>
            <span>02 / LIABILITY</span><b>REVIEW</b>
            <span>03 / JURISDICTION</span><b>CLEAR</b>
            <span>04 / DATA</span><b>CLEAR</b>
          </div>
          <div className="document-bars"><i style={{ width: "68%" }} /><i style={{ width: "42%" }} /><i style={{ width: "82%" }} /></div>
        </div>
        <div className="scan-line" data-scan />
        <span className="visual-caption">{locale === "fr" ? "Analyse structurée en moins de 60 secondes" : "Structured analysis in under 60 seconds"}</span>
      </div>
    );
  }

  return (
    <div className="case-visual case-visual-systems" aria-hidden="true">
      <div className="visual-topline"><span>ENTERPRISE::TOPOLOGY</span><span>[ STABLE ]</span></div>
      <div className="system-map">
        <div className="system-core">CT</div>
        {[["WEB", "node-web"], ["MOBILE", "node-mobile"], ["OPS", "node-ops"], ["DATA", "node-data"]].map(([label, className]) => (
          <div className={`system-node ${className}`} key={label}>{`< ${label} />`}</div>
        ))}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M50 50 L14 26 M50 50 L18 80 M50 50 L84 25 M50 50 L84 79" /></svg>
      </div>
      <div className="scan-line" data-scan />
      <span className="visual-caption">{locale === "fr" ? "Un système partagé entre produit et opérations" : "One system shared by product and operations"}</span>
    </div>
  );
}

export default function Portfolio() {
  const [locale, setLocale] = useState<Locale>("fr");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("00");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuWasOpen = useRef(false);
  const t = content[locale];

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-locale-v3") as Locale | null;
    if (stored !== "fr" && stored !== "en") return;

    const frame = window.requestAnimationFrame(() => setLocale(stored));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("portfolio-locale-v3", locale);
  }, [locale]);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);

    if (menuOpen) {
      menuWasOpen.current = true;
      const frame = window.requestAnimationFrame(() => {
        document.querySelector<HTMLAnchorElement>("#mobile-menu a")?.focus();
      });

      const closeOnEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") setMenuOpen(false);
      };

      window.addEventListener("keydown", closeOnEscape);
      return () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener("keydown", closeOnEscape);
        document.body.classList.remove("menu-is-open");
      };
    }

    if (menuWasOpen.current) {
      menuWasOpen.current = false;
      menuButtonRef.current?.focus();
    }

    return () => document.body.classList.remove("menu-is-open");
  }, [menuOpen]);

  useEffect(() => {
    const sections = [
      ["top", "00"],
      ["statement", "01"],
      ["work", "02"],
      ["profile", "03"],
      ["expertise", "04"],
      ["contact", "05"],
    ] as const;

    const updateSection = () => {
      const readingLine = window.scrollY + window.innerHeight * 0.28;
      let current = "00";

      sections.forEach(([id, index]) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= readingLine) current = index;
      });

      setActiveSection(current);
    };

    updateSection();
    window.addEventListener("scroll", updateSection, { passive: true });
    return () => window.removeEventListener("scroll", updateSection);
  }, []);

  const changeLocale = () => setLocale((current) => (current === "fr" ? "en" : "fr"));

  return (
    <div className="site-shell">
      <GsapController />
      <div className="reading-progress" data-progress aria-hidden="true" />

      <header className="site-header">
        <a className="identity" href="#top" aria-label="Daniogo Aboubakar, accueil">
          <span className="identity-mark">DA</span>
          <span className="identity-text">Product Engineer<br />Abidjan / CI</span>
        </a>
        <nav className="desktop-nav" aria-label="Navigation principale">
          <a href="#work">{t.nav.work}</a><a href="#profile">{t.nav.profile}</a><a href="#expertise">{t.nav.expertise}</a>
        </nav>
        <div className="header-actions">
          <span className="mobile-section-index" aria-label={`${locale === "fr" ? "Section" : "Section"} ${activeSection}`}>/{activeSection}</span>
          <button className="language-switch" type="button" onClick={changeLocale} aria-label="Changer de langue">{locale === "fr" ? "EN" : "FR"}</button>
          <a className="header-contact" href="#contact">{t.nav.contact}<span>↗</span></a>
          <button ref={menuButtonRef} className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="mobile-menu">{menuOpen ? t.nav.close : t.nav.menu}</button>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!menuOpen}>
        <nav aria-label="Navigation mobile">
          {[["#work", t.nav.work], ["#profile", t.nav.profile], ["#expertise", t.nav.expertise], ["#contact", t.nav.contact]].map(([href, label], index) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}><span>0{index + 2}</span>{label}</a>
          ))}
        </nav>
        <button type="button" onClick={changeLocale}>{locale === "fr" ? "Read in English" : "Lire en français"}</button>
      </div>

      <main>
        <section className="hero" id="top">
          <AsciiField />
          <div className="hero-meta" data-hero-meta><span>{t.hero.role}</span><span>{t.hero.location}</span><span>[ {t.hero.status} ]</span></div>
          <div className="hero-layout">
            <div className="hero-copy">
              <h1>{t.hero.headline.map((line, index) => <span className={`hero-line hero-line-${index + 1}`} key={line}><span data-hero-line>{line}</span></span>)}</h1>
              <div className="hero-intro" data-hero-copy>
                <p>{t.hero.intro}</p>
                <div className="hero-links"><a className="text-link text-link-solid" href="#work">{t.hero.primary}<span>↓</span></a><a className="text-link" href="#contact">{t.hero.secondary}<span>↗</span></a></div>
              </div>
            </div>
            <figure className="hero-portrait" data-portrait>
              <span className="portrait-index">PORTRAIT::001</span>
              <div className="portrait-surface">
                <Image src="/portraits/daniogo-product-engineer-cutout.png" alt={t.hero.portrait} fill loading="eager" sizes="(min-width: 1024px) 34vw, 86vw" className="portrait-image" />
                <span className="portrait-ascii" aria-hidden="true">++++<br />++DA<br />++++</span>
              </div>
              <figcaption>DANIOGO ABOUBAKAR / 2026</figcaption>
            </figure>
          </div>
          <a className="hero-scroll" href="#statement"><span>↓</span>{t.hero.scroll}</a>
        </section>

        <section className="statement section-shell" id="statement">
          <div className="section-label" data-reveal><span>01</span>{t.statement.label}</div>
          <div className="statement-content">
            <h2><Words>{t.statement.title}</Words></h2>
            <div className="statement-detail" data-reveal><p>{t.statement.body}</p><strong>{t.statement.note}</strong></div>
          </div>
        </section>

        <section className="work section-shell" id="work">
          <div className="section-heading">
            <div className="section-label" data-reveal><span>02</span>{t.work.label}</div>
            <div data-reveal><h2>{t.work.title}</h2><p>{t.work.intro}</p></div>
          </div>
          <div className="case-list">
            {t.work.cases.map((project, index) => (
              <article className="case-study" key={project.title}>
                <div className="case-heading" data-reveal><span className="case-index">/{project.index}</span><span className="case-kind">{project.kind}</span><h3>{project.title}</h3><p>{project.subtitle}</p></div>
                <div className="case-grid">
                  <div data-reveal><ProjectVisual index={index} locale={locale} /></div>
                  <div className="case-notes" data-reveal>
                    <p className="case-story">{project.story}</p>
                    <p className="case-decision"><span>{locale === "fr" ? "Décision" : "Decision"}</span>{project.decision}</p>
                    <dl className="case-metrics">{project.metrics.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}</dl>
                    <div className="case-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                    <a className="project-link" href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel={project.link.startsWith("http") ? "noreferrer" : undefined}>{project.linkLabel}<span>↗</span></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="profile" id="profile">
          <div className="profile-photo" data-profile-photo>
            <div data-portrait-parallax><Image src="/portraits/daniogo-about-seated-cutout.png" alt={t.profile.photo} fill sizes="(min-width: 900px) 48vw, 100vw" className="profile-image" /></div>
            <span className="profile-photo-code">ABJ / 05.34°N / 04.01°W</span>
          </div>
          <div className="profile-content">
            <div className="section-label" data-reveal><span>03</span>{t.profile.label}</div>
            <h2 data-reveal>{t.profile.title}</h2>
            <div className="profile-copy" data-reveal>{t.profile.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <ol className="timeline" data-reveal>{t.profile.timeline.map(([year, event]) => <li key={year}><span>{year}</span>{event}</li>)}</ol>
          </div>
        </section>

        <section className="expertise section-shell" id="expertise">
          <div className="section-heading expertise-heading"><div className="section-label" data-reveal><span>04</span>{t.expertise.label}</div><h2 data-reveal>{t.expertise.title}</h2></div>
          <ol className="expertise-list">{t.expertise.groups.map((group) => <li key={group.index} data-reveal><span className="expertise-index">/{group.index}</span><h3>{group.title}</h3><p>{group.body}</p><span className="expertise-tools">{group.tools}</span></li>)}</ol>
        </section>

        <section className="contact" id="contact">
          <div className="contact-topline"><div className="section-label"><span>05</span>{t.contact.label}</div><span>{t.contact.location}</span></div>
          <div className="contact-main">
            <h2><span>{t.contact.title[0]}</span><span>{t.contact.title[1]}</span></h2>
            <div className="contact-detail"><p>{t.contact.body}</p><a className="contact-email" href={`mailto:${t.contact.email}`}>{t.contact.emailLabel}<span>↗</span></a><a className="contact-call" href="https://cal.com/dani-walker-uqwwfc/30min?overlayCalendar=true" target="_blank" rel="noreferrer">{t.contact.call}<span>↗</span></a></div>
          </div>
          <div className="contact-ascii" aria-hidden="true"><span>READY_FOR::</span><span>THE_NEXT_BUILD</span></div>
        </section>
      </main>

      <footer className="site-footer"><a href="#top">DA / INDEX</a><span>© {new Date().getFullYear()} {t.footer}</span><span>NEXT.JS / REACT / GSAP</span></footer>
    </div>
  );
}
