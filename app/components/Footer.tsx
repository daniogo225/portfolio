"use client";

import { useI18n } from "../i18n";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative py-10 sm:py-12 px-6 sm:px-10 lg:px-20 border-t border-border">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <a
          href="#"
          className="group font-display text-base tracking-[-0.02em] inline-flex items-center self-start font-medium min-h-[44px] -ml-2 px-2"
        >
          <span className="transition-colors duration-500 group-hover:text-accent">daniogo</span>
          <span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] uppercase">
          <span className="text-muted">{t.footer.liveLabel}</span>
          <a
            href="https://contracttchecker.laravel.cloud/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors duration-500 border border-border hover:border-foreground min-h-[44px] px-3"
            data-hover
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-accent opacity-50 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span>{t.footer.contractTchecker}</span>
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </div>

        <span className="font-mono text-muted text-[10px] tracking-[0.15em]">
          {t.footer.copyright}
        </span>
      </div>
    </footer>
  );
}
