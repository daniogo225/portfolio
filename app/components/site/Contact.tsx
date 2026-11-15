"use client";

import { ArrowUpRight, Check, Copy } from "lucide-react";
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

/** Contact : la question, une phrase, le disque WhatsApp en face, puis trois coordonnées sur une ligne. */
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
        <div className="contact-stage">
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

          <motion.div
            className="contact-circle"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE_OUT }}
          >
            <Magnetic strength={0.3}>
              <a className="circle-button is-accent" href={whatsappUrl(t.hero.message)} target="_blank" rel="noreferrer">
                <span>{c.circle}</span>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <ul className="contact-lines">
          <li>
            <button type="button" className="contact-line" onClick={copy} title={copied ? c.copied : c.copy}>
              <span>{links.email}</span>
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
              <span className="sr-only">, {c.copy}</span>
            </button>
            <span className="sr-only" role="status">
              {copied ? c.copied : ""}
            </span>
          </li>
          <li>
            <a className="contact-line" href={links.tel}>
              <span>{links.phone}</span>
            </a>
          </li>
          <li>
            <a className="contact-line" href={links.github} target="_blank" rel="noreferrer">
              <span>{links.githubLabel}</span>
              <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
