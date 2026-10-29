"use client";

import { Calendar, Check, Copy } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { links, whatsappUrl } from "../../data/site";
import Magnetic from "../ui/Magnetic";
import RevealText, { EASE_OUT } from "../ui/RevealText";
import { useSite } from "./SiteProvider";

export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(links.email);
    return true;
  } catch {
    return false;
  }
}

/** Contact : le titre, une phrase, le bouton rond WhatsApp posé sur le filet, puis les coordonnées. */
export default function Contact() {
  const { t } = useSite();
  const c = t.contact;
  const [copied, setCopied] = useState(false);
  const timeout = useRef(0);

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
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="shell">
        <div className="contact-head">
          <Image className="contact-avatar" src="/portraits/cv-portrait.jpg" alt="" width={192} height={192} />
          <div className="contact-heading">
            <RevealText as="h2" id="contact-title" className="contact-title" text={c.title} interval={0.07} />
            <motion.p
              className="contact-body"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
            >
              {c.body}
            </motion.p>
          </div>
        </div>

        <div className="contact-rule">
          <div className="contact-circle">
            <Magnetic strength={0.3}>
              <a className="circle-button is-accent" href={whatsappUrl(t.hero.message)} target="_blank" rel="noreferrer">
                <span>{c.circle}</span>
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="contact-pills">
          <a className="pill" href={`mailto:${links.email}`}>
            {links.email}
          </a>
          <button type="button" className="pill is-icon" onClick={copy} aria-label={copied ? c.copied : c.copy} title={copied ? c.copied : c.copy}>
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
          </button>
          <span className="sr-only" role="status">
            {copied ? c.copied : ""}
          </span>
          <a className="pill" href={links.whatsapp} target="_blank" rel="noreferrer">
            {links.phone}
          </a>
          <a className="pill" href={links.calendar} target="_blank" rel="noreferrer">
            {c.call}
            <Calendar size={16} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
