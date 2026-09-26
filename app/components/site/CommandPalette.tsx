"use client";

import { CornerDownLeft, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { links } from "../../data/content";
import { copyEmail } from "./Contact";
import { SECTIONS } from "./Header";
import { useSite } from "./SiteProvider";

type Action = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  run: () => void;
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

/** Palette d’actions au clavier (Ctrl K ou ⌘ K) : sections, thème, langue, contact. */
export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, locale, setLocale, theme, toggleTheme, paused, setPaused, scrollTo, lockScroll } = useSite();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      lockScroll(true);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, lockScroll]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const closed = () => {
      lockScroll(false);
      setQuery("");
      setSelected(0);
      setNotice("");
      onClose();
    };
    dialog.addEventListener("close", closed);
    return () => dialog.removeEventListener("close", closed);
  }, [onClose, lockScroll]);

  const actions = useMemo<Action[]>(() => {
    const navigate = [
      ...SECTIONS.map((id) => ({
        id,
        group: t.palette.navigate,
        label: t.nav[id],
        hint: `#${id}`,
        run: () => scrollTo(`#${id}`),
      })),
      { id: "top", group: t.palette.navigate, label: t.palette.top, hint: "#top", run: () => scrollTo(0) },
    ];
    const tools: Action[] = [
      {
        id: "copy",
        group: t.palette.actions,
        label: t.palette.copyEmail,
        hint: links.email,
        run: () => {
          void copyEmail().then((done) => {
            if (!done) window.location.href = `mailto:${links.email}`;
          });
        },
      },
      { id: "book", group: t.palette.actions, label: t.palette.book, hint: "cal.com", run: () => openExternal(links.calendar) },
      {
        id: "product",
        group: t.palette.actions,
        label: t.palette.openProduct,
        hint: "checker",
        run: () => openExternal(links.contractChecker),
      },
      {
        id: "theme",
        group: t.palette.actions,
        label: theme === "dark" ? t.palette.toLight : t.palette.toDark,
        run: () => toggleTheme(),
      },
      {
        id: "language",
        group: t.palette.actions,
        label: t.palette.otherLanguage,
        hint: locale === "fr" ? "EN" : "FR",
        run: () => setLocale(locale === "fr" ? "en" : "fr"),
      },
      {
        id: "vcard",
        group: t.palette.actions,
        label: t.palette.vcard,
        hint: ".vcf",
        run: () => {
          const anchor = document.createElement("a");
          anchor.href = links.vcard;
          anchor.download = "daniogo.vcf";
          anchor.click();
        },
      },
      {
        id: "motion",
        group: t.palette.actions,
        label: paused ? t.palette.play : t.palette.pause,
        run: () => setPaused(!paused),
      },
    ];
    return [...navigate, ...tools];
  }, [locale, paused, scrollTo, setLocale, setPaused, t, theme, toggleTheme]);

  const filtered = useMemo(() => {
    const needle = normalize(query.trim());
    if (!needle) return actions;
    return actions.filter((action) => normalize(`${action.label} ${action.hint ?? ""}`).includes(needle));
  }, [actions, query]);

  const current = Math.min(selected, Math.max(0, filtered.length - 1));

  function run(action: Action | undefined) {
    if (!action) return;
    if (action.id === "copy") {
      action.run();
      setNotice(t.palette.copied);
      window.setTimeout(() => dialogRef.current?.close(), 700);
      return;
    }
    dialogRef.current?.close();
    // Laisse le défilement se déverrouiller avant de naviguer.
    requestAnimationFrame(() => action.run());
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected((current + 1) % Math.max(1, filtered.length));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected((current - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(filtered[current]);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="palette"
      aria-label={t.palette.title}
      data-lenis-prevent=""
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
    >
      <div className="palette-panel">
        <div className="palette-search">
          <Search size={18} strokeWidth={1.75} aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={filtered[current] ? `palette-${filtered[current].id}` : undefined}
            aria-autocomplete="list"
            placeholder={t.palette.placeholder}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelected(0);
            }}
            onKeyDown={onKeyDown}
          />
          <button type="button" className="palette-close mono" onClick={() => dialogRef.current?.close()}>
            Esc
            <span className="sr-only">{t.palette.close}</span>
          </button>
        </div>
        <ul id="palette-list" className="palette-list" role="listbox" aria-label={t.palette.title}>
          {filtered.length === 0 && <li className="palette-empty">{t.palette.empty}</li>}
          {filtered.map((action, index) => {
            const heading = index === 0 || filtered[index - 1].group !== action.group ? action.group : null;
            return (
              <li key={action.id} role="presentation">
                {heading && (
                  <span className="palette-group mono" aria-hidden="true">
                    {heading}
                  </span>
                )}
                <div
                  id={`palette-${action.id}`}
                  role="option"
                  aria-selected={index === current}
                  className="palette-option"
                  onMouseMove={() => setSelected(index)}
                  onClick={() => run(action)}
                >
                  <span>{action.label}</span>
                  {action.hint && <span className="palette-hint mono">{action.hint}</span>}
                  {index === current && <CornerDownLeft size={15} strokeWidth={1.75} aria-hidden="true" />}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="palette-foot mono" role="status">
          {notice || t.palette.hint}
        </p>
      </div>
    </dialog>
  );
}
