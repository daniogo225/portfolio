"use client";

import { ArrowUpRight, Calendar, Check, Copy, Download, Mail } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { links, mailtoUrl, whatsappUrl } from "../../data/site";
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
  const c = t.contact;
  const id = useId();
  const [need, setNeed] = useState(0);
  const [time, setTime] = useState(0);
  const [details, setDetails] = useState("");
  const [copied, setCopied] = useState(false);
  const timeout = useRef(0);
  const now = useAbidjanTime();

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  const phrase = c.needs[need].phrase;
  const lines = [
    c.greeting,
    "",
    c.needLine.replace("{need}", phrase),
    c.timeLine.replace("{time}", c.times[time]),
    ...(details.trim() ? [c.detailsLine.replace("{details}", details.trim())] : []),
  ];
  const message = lines.join("\n");
  const subject = c.subject.replace("{need}", c.needs[need].label);

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
        <p className="chapter-meta mono">
          <span>
            {t.chapter} 05
          </span>
          <span>{c.label}</span>
        </p>
        <RevealText as="h2" id="contact-title" className="contact-title" text={c.title} interval={0.08} />
        <p className="contact-email-lead mono">{c.emailLead}</p>
        <a className="contact-email" href={`mailto:${links.email}`}>
          {links.email}
        </a>

        <div className="contact-grid">
          <div className="contact-aside">
            <motion.p
              className="contact-body"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
            >
              {c.body}
            </motion.p>

            <div className="contact-direct">
              <h3 className="block-label">{c.directLabel}</h3>
              <dl className="contact-meta">
                <div>
                  <dt>{c.whatsappLabel}</dt>
                  <dd>
                    <a className="text-link" href={links.whatsapp} target="_blank" rel="noreferrer">
                      {links.phone}
                      <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{c.emailLabel}</dt>
                  <dd className="contact-mail">
                    <a className="text-link" href={`mailto:${links.email}`}>
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
                          {copied ? <Check size={15} strokeWidth={2} aria-hidden="true" /> : <Copy size={15} strokeWidth={1.75} aria-hidden="true" />}
                        </motion.span>
                      </AnimatePresence>
                      {copied ? c.copied : c.copy}
                    </button>
                    <span className="sr-only" role="status">
                      {copied ? c.copied : ""}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt>{c.call}</dt>
                  <dd>
                    <a className="text-link" href={links.calendar} target="_blank" rel="noreferrer">
                      cal.com
                      <Calendar size={16} strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>vCard</dt>
                  <dd>
                    <a className="text-link" href={links.vcard} download>
                      {c.vcard}
                      <Download size={16} strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{c.github}</dt>
                  <dd>
                    <a className="text-link" href={links.github} target="_blank" rel="noreferrer">
                      {links.githubLabel}
                      <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>{c.place}</dt>
                  <dd>
                    {c.timeNow} <time>{now || "--:--"}</time> (UTC+0)
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <form className="brief" onSubmit={(event) => event.preventDefault()}>
            <fieldset className="brief-group">
              <legend>{c.needLabel}</legend>
              <div className="brief-chips">
                {c.needs.map((item, index) => (
                  <label key={item.label} className="chip">
                    <input type="radio" name={`${id}-need`} checked={need === index} onChange={() => setNeed(index)} />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="brief-group">
              <legend>{c.timeLabel}</legend>
              <div className="brief-chips">
                {c.times.map((item, index) => (
                  <label key={item} className="chip">
                    <input type="radio" name={`${id}-time`} checked={time === index} onChange={() => setTime(index)} />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="brief-group">
              <label htmlFor={`${id}-details`} className="brief-legend">
                {c.detailsLabel}
              </label>
              <textarea
                id={`${id}-details`}
                rows={3}
                maxLength={600}
                value={details}
                placeholder={c.detailsPlaceholder}
                onChange={(event) => setDetails(event.target.value)}
              />
            </div>

            <div className="brief-preview">
              <p className="brief-preview-label">{c.previewLabel}</p>
              <p className="brief-message">{message}</p>
            </div>

            <div className="brief-actions">
              <Magnetic strength={0.18}>
                <a className="button button-accent" href={whatsappUrl(message)} target="_blank" rel="noreferrer">
                  <span className="roll" data-text={c.whatsapp}>
                    <span>{c.whatsapp}</span>
                  </span>
                  <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
                </a>
              </Magnetic>
              <a className="button button-ghost" href={mailtoUrl(subject, message)}>
                <span className="roll" data-text={c.email}>
                  <span>{c.email}</span>
                </span>
                <Mail size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
