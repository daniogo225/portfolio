"use client";

import { ArrowUpRight, Calendar, Check, Copy, Mail } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { links, mailtoUrl, whatsappUrl } from "../../data/site";
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

export default function Contact() {
  const { t } = useSite();
  const c = t.contact;
  const id = useId();
  const [need, setNeed] = useState(0);
  const [time, setTime] = useState(0);
  const [details, setDetails] = useState("");
  const [copied, setCopied] = useState(false);
  const timeout = useRef(0);

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
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="shell">
        <div className="contact-head">
          <Image className="contact-avatar" src="/portraits/cv-portrait.jpg" alt="" width={192} height={192} />
          <RevealText as="h2" id="contact-title" className="contact-title" text={c.title} interval={0.07} />
        </div>

        <div className="contact-rule">
          <div className="contact-circle">
            <Magnetic strength={0.3}>
              <a className="circle-button is-accent" href={whatsappUrl(message)} target="_blank" rel="noreferrer">
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

        <div className="contact-grid">
          <motion.p
            className="contact-body"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            {c.body}
          </motion.p>

          <form className="brief" onSubmit={(event) => event.preventDefault()}>
            <fieldset className="brief-group">
              <legend className="mono">{c.needLabel}</legend>
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
              <legend className="mono">{c.timeLabel}</legend>
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
              <label htmlFor={`${id}-details`} className="mono brief-legend">
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
              <p className="mono">{c.previewLabel}</p>
              <p className="brief-message">{message}</p>
            </div>

            <div className="brief-actions">
              <a className="button button-light" href={whatsappUrl(message)} target="_blank" rel="noreferrer">
                <span className="roll" data-text={c.whatsapp}>
                  <span>{c.whatsapp}</span>
                </span>
                <ArrowUpRight size={17} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a className="button button-ghost" href={mailtoUrl(subject, message)}>
                <span className="roll" data-text={c.email}>
                  <span>{c.email}</span>
                </span>
                <Mail size={17} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
