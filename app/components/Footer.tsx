"use client";

import { useI18n } from "../i18n";

export default function Footer() {
  const { locale, t } = useI18n();

  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="content-shell grid gap-6 font-mono text-[9px] uppercase tracking-[0.13em] text-muted sm:grid-cols-3 sm:items-center">
        <a href="#top" className="group flex items-center gap-3 text-foreground">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-[#11110f]">DA</span>
          <span>Daniogo Aboubakar</span>
        </a>
        <a href="https://contracttchecker.laravel.cloud/" target="_blank" rel="noreferrer" className="flex items-center gap-2 sm:justify-center">
          <span className="signal-dot !h-1.5 !w-1.5" />{t.footer.liveLabel} · {t.footer.contractTchecker}
        </a>
        <span className="sm:text-right">© {new Date().getFullYear()} · {locale === "fr" ? "Conçu et développé à Abidjan" : "Designed and built in Abidjan"}</span>
      </div>
    </footer>
  );
}
