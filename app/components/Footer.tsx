"use client";

import { useI18n } from "../i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative py-10 px-6 md:px-12 lg:px-20 border-t border-border/50">
      {/* Top gradient edge */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-light/20 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <a href="#" className="group font-display text-lg tracking-tight inline-flex items-baseline">
          <span className="transition-colors duration-500 group-hover:text-accent-light">dani</span>
          <span className="text-accent transition-colors duration-500 group-hover:text-accent-light">.</span>
        </a>

        <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.25em] uppercase">
          <span className="text-muted/60">{t.footer.liveLabel}</span>
          <a
            href="https://contracttchecker.laravel.cloud/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-muted hover:text-accent-light transition-colors duration-500 border border-border/60 hover:border-accent-light/40 px-3 py-1.5"
            data-hover
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-50 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span>{t.footer.contractTchecker}</span>
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>

        <span className="font-mono text-muted text-[11px] tracking-[0.2em]">
          {t.footer.copyright}
        </span>
      </div>
    </footer>
  );
}
