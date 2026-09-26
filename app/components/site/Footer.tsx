"use client";

import { ArrowUp, Pause, Play } from "lucide-react";
import { motion, stagger } from "motion/react";
import { EASE_OUT } from "../ui/RevealText";
import { useSite } from "./SiteProvider";

const LETTERS = Array.from("Daniogo");

export default function Footer() {
  const { t, paused, setPaused } = useSite();

  return (
    <footer className="site-footer">
      <div className="shell">
        <motion.p
          className="footer-wordmark"
          aria-hidden="true"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.5 }}
          variants={{ hidden: {}, shown: { transition: { delayChildren: stagger(0.06) } } }}
        >
          {LETTERS.map((letter, index) => (
            <span className="letter-mask" key={index}>
              <motion.span
                variants={{
                  hidden: { y: "105%" },
                  shown: { y: "0%", transition: { duration: 1.1, ease: EASE_OUT } },
                }}
              >
                {letter}
              </motion.span>
            </span>
          ))}
        </motion.p>

        <div className="footer-bar">
          <p>
            © {new Date().getFullYear()} Daniogo Aboubakar / {t.footer.rights}
          </p>
          <div className="footer-actions">
            <button
              type="button"
              className="chip-button"
              aria-pressed={paused}
              aria-label={paused ? t.footer.play : t.footer.pause}
              onClick={() => setPaused(!paused)}
            >
              {t.footer.motion}
              {paused ? <Play size={14} strokeWidth={2} aria-hidden="true" /> : <Pause size={14} strokeWidth={2} aria-hidden="true" />}
            </button>
            <a className="icon-button is-outlined" href="#top" aria-label={t.footer.top} title={t.footer.top}>
              <ArrowUp size={18} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
