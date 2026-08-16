"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { content, type Locale } from "../data/content";
import AsciiField from "./AsciiField";
import DecodeText from "./DecodeText";
import MotionController from "./MotionController";
import ProjectVisual from "./ProjectVisuals";

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

export default function Portfolio() {
  const [locale, setLocale] = useState<Locale>("fr");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("00");
  const lastMenuTriggerRef = useRef<HTMLButtonElement | null>(null);
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
      lastMenuTriggerRef.current?.focus({ preventScroll: true });
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
      <MotionController />

      <header className="site-header" data-header-mode="opening-only">
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
          <button className="menu-toggle" type="button" onClick={(event) => { lastMenuTriggerRef.current = event.currentTarget; setMenuOpen((open) => !open); }} aria-expanded={menuOpen} aria-controls="mobile-menu">{menuOpen ? t.nav.close : t.nav.menu}</button>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!menuOpen}>
        <div className="mobile-menu-topline">
          <span>{locale === "fr" ? "Navigation" : "Navigation"} /{activeSection}</span>
          <button type="button" onClick={() => setMenuOpen(false)}>{t.nav.close}</button>
        </div>
        <nav aria-label="Navigation mobile">
          {[["#work", t.nav.work], ["#profile", t.nav.profile], ["#expertise", t.nav.expertise], ["#contact", t.nav.contact]].map(([href, label], index) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}><span>0{index + 2}</span>{label}</a>
          ))}
        </nav>
        <button type="button" onClick={changeLocale}>{locale === "fr" ? "Read in English" : "Lire en français"}</button>
      </div>

      <button className={`mobile-menu-dock ${activeSection === "00" ? "" : "is-visible"}`} type="button" onClick={(event) => { lastMenuTriggerRef.current = event.currentTarget; setMenuOpen(true); }} aria-expanded={menuOpen} aria-controls="mobile-menu">
        <span>/{activeSection}</span>{t.nav.menu}
      </button>

      <main>
        <section className="hero" id="top">
          <AsciiField />
          <div className="hero-meta" data-hero-meta><span>{t.hero.role}</span><span>{t.hero.location}</span><span>[ {t.hero.status} ]</span></div>
          <div className="hero-layout">
            <div className="hero-copy">
              <h1>{t.hero.headline.map((line, index) => <span className={`hero-line hero-line-${index + 1}`} key={line}><span data-hero-line><DecodeText text={line} eager loop={index === 1} delay={260 + index * 150} /></span></span>)}</h1>
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
            <div className="statement-detail" data-reveal>
              <p>{t.statement.body}</p>
              <div className="statement-system">
                <strong>{t.statement.note}</strong>
                <pre aria-hidden="true">{`OBSERVE ──┐\n          ├─ BUILD ── OPERATE\nDECIDE  ──┘`}</pre>
              </div>
            </div>
          </div>
        </section>

        <section className="work" id="work" data-section-transition="continuous">
          <div className="work-shell">
            <div className="section-heading work-heading">
              <div className="section-label" data-reveal><span>02</span>{t.work.label}</div>
              <div data-reveal><h2><DecodeText text={t.work.title} /></h2><p>{t.work.intro}</p></div>
            </div>
            <div className="case-list">
              {t.work.cases.map((project, index) => (
                <article className="case-study" key={project.title}>
                  <div className="case-heading" data-reveal>
                    <div className="case-reference"><span className="case-index">/{project.index}</span><span className="case-kind">{project.kind}</span></div>
                    <h3><DecodeText text={project.title} /></h3>
                    <p>{project.subtitle}</p>
                  </div>
                  <div className="case-grid">
                    <div className="case-visual-wrap" data-reveal><ProjectVisual index={index} locale={locale} /></div>
                    <div className="case-notes" data-reveal>
                      <div className="case-copy-block"><span>{locale === "fr" ? "Contexte" : "Context"}</span><p className="case-story">{project.story}</p></div>
                      <div className="case-copy-block case-decision"><span>{locale === "fr" ? "Décision" : "Decision"}</span><p>{project.decision}</p></div>
                      <a className="project-link" href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel={project.link.startsWith("http") ? "noreferrer" : undefined}>{project.linkLabel}<span>↗</span></a>
                    </div>
                  </div>
                  <div className="case-outcomes" data-reveal>
                    <dl className="case-metrics">{project.metrics.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}</dl>
                    <div className="case-stack"><span>STACK</span><p>{project.stack.join(" / ")}</p></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="profile" id="profile" data-section-transition="continuous">
          <div className="profile-photo" data-profile-photo>
            <div><Image src="/portraits/daniogo-about-seated-cutout.png" alt={t.profile.photo} fill sizes="(min-width: 900px) 48vw, 100vw" className="profile-image" /></div>
            <div className="profile-ascii" aria-hidden="true"><span>HUMAN::SYSTEM</span><pre>{`PRODUCT  <──>  ENGINEERING\n              │\n           DELIVERY`}</pre></div>
            <span className="profile-photo-code">ABJ / 05.34°N / 04.01°W</span>
          </div>
          <div className="profile-content">
            <div className="section-label" data-reveal><span>03</span>{t.profile.label}</div>
            <h2 data-reveal><DecodeText text={t.profile.title} /></h2>
            <div className="profile-copy" data-reveal>{t.profile.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <ol className="timeline" data-reveal>{t.profile.timeline.map(([year, event]) => <li key={year}><span>{year}</span>{event}</li>)}</ol>
          </div>
        </section>

        <section className="expertise section-shell" id="expertise">
          <div className="section-heading expertise-heading"><div className="section-label" data-reveal><span>04</span>{t.expertise.label}</div><h2 data-reveal><DecodeText text={t.expertise.title} /></h2></div>
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

      <footer className="site-footer"><a href="#top">DA / INDEX</a><span>© {new Date().getFullYear()} {t.footer}</span><span>NEXT.JS / REACT / COBE</span></footer>
    </div>
  );
}
