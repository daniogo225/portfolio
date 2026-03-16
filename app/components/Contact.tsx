"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const links = [
  { label: "Email", value: "daniogoaboubakar@icloud.com", href: "mailto:daniogoaboubakar@icloud.com" },
  { label: "GitHub", value: "github.com/daniogo225", href: "https://github.com/daniogo225" },
  { label: "LinkedIn", value: "linkedin.com/in/daniogo", href: "https://linkedin.com/in/daniogo" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-8 md:px-16 lg:px-24">
        <SectionHeading
          index="04"
          label="Parlons-en"
          title="Contact"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-2xl md:text-4xl font-bold leading-tight tracking-tight text-[var(--foreground)]">
              Un projet en t&ecirc;te ?
              <br />
              <span className="text-[var(--muted)]">Construisons-le ensemble.</span>
            </p>

            <motion.a
              href="mailto:daniogoaboubakar@icloud.com"
              className="group inline-flex items-center gap-4 mt-10 px-10 py-5 bg-[var(--foreground)] text-[var(--background)] text-sm font-medium uppercase tracking-wider hover:gap-6 transition-all duration-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Envoyer un message
              <svg
                className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>

          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="border-t border-[var(--border)]">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-5 border-b border-[var(--border)]"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-[family-name:var(--font-mono)] text-[var(--muted)] uppercase tracking-wider">
                      {link.label}
                    </span>
                    <span className="text-base text-[var(--foreground)] font-medium group-hover:text-[var(--accent)] transition-colors duration-300">
                      {link.value}
                    </span>
                  </div>
                  <svg
                    className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
