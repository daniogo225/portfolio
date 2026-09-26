"use client";

import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { links } from "../../data/content";
import Magnetic from "../ui/Magnetic";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import useAbidjanTime from "../ui/useAbidjanTime";
import { useSite } from "./SiteProvider";

export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(links.email);
    return true;
  } catch {
    return false;
  }
}

export default function Contact() {
  const { t } = useSite();
  const [copied, setCopied] = useState(false);
  const timeout = useRef(0);
  const time = useAbidjanTime();

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  async function copy() {
    if (!(await copyEmail())) {
      window.location.href = `mailto:${links.email}`;
      return;
    }
    setCopied(true);
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setCopied(false), 2400);
  }

  return (
    <section id="contact" className="contact section" aria-labelledby="contact-title">
      <div className="shell">
        <p className="section-label mono">
          <span>04</span>
          <span>{t.contact.label}</span>
        </p>
        <RevealText as="h2" id="contact-title" className="contact-title" text={t.contact.title} interval={0.08} />

        <div className="contact-grid">
          <motion.p
            className="contact-body"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            {t.contact.body}
          </motion.p>

          <div className="contact-mail">
            <span className="mono contact-mail-label">{t.contact.emailLabel}</span>
            <a className="mail-link" href={`mailto:${links.email}`}>
              {links.email}
            </a>
            <button type="button" className="copy-button" onClick={copy}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "done" : "idle"}
                  className="copy-icon"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {copied ? <Check size={16} strokeWidth={2} aria-hidden="true" /> : <Copy size={16} strokeWidth={1.75} aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
              {copied ? t.contact.copied : t.contact.copy}
            </button>
            <span className="sr-only" role="status">
              {copied ? t.contact.copied : ""}
            </span>
          </div>

          <div className="contact-cta">
            <Magnetic strength={0.22}>
              <a className="cta-orb" href={links.calendar} target="_blank" rel="noreferrer">
                <span>{t.contact.call}</span>
                <ArrowUpRight size={28} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </Magnetic>
          </div>
        </div>

        <dl className="contact-meta">
          <div>
            <dt className="mono">{t.contact.place}</dt>
            <dd>
              {t.contact.timeLabel} <time>{time || "--:--"}</time> (UTC+0)
            </dd>
          </div>
          <div>
            <dt className="mono">vCard</dt>
            <dd>
              <a className="text-link" href={links.vcard} download>
                {t.contact.vcard}
                <Download size={16} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
