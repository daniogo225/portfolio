"use client";

import { ChevronLeft, ChevronRight, Lock, PanelLeft, Plus, RotateCw, Share } from "lucide-react";
import type { ReactNode } from "react";
import { useSite } from "../site/SiteProvider";

export type MacKind = "browser" | "editor" | "terminal";

/**
 * Le bureau macOS dans l’écran du MacBook : la barre des menus, puis une fenêtre agrandie.
 * Safari pour l’application web, un éditeur pour le code, le Terminal pour la mise en ligne.
 */
export default function MacScreen({ kind, title, children }: { kind: MacKind; title: string; children: ReactNode }) {
  const { t } = useSite();
  const mac = t.demos.product.mac;
  const app = kind === "browser" ? mac.browser : kind === "editor" ? mac.editor : mac.terminal;
  const dark = kind !== "browser";

  return (
    <div className="mac" data-kind={kind}>
      <div className="mac-menubar">
        <span className="mac-menubar-app">{app}</span>
        {mac.menu.map((item) => (
          <span key={item}>{item}</span>
        ))}
        <span className="mac-menubar-right">
          <svg viewBox="0 0 16 12" className="mac-menubar-wifi">
            <path d="M8 2.4c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .6 10.4 10.4 0 0 0 .8 3.5L2 4.8a8.6 8.6 0 0 1 6-2.4Z" />
            <path d="M8 6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.6 6.6 0 0 0 8 4.2c-1.8 0-3.4.7-4.6 1.8l1.2 1.3C5.5 6.5 6.7 6 8 6Z" />
            <path d="M8 9.6c.4 0 .8.2 1.1.4L8 11.4 6.9 10c.3-.2.7-.4 1.1-.4Z" />
          </svg>
          <svg viewBox="0 0 27 13" className="mac-menubar-battery">
            <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" strokeOpacity="0.5" />
            <rect x="2" y="2" width="17" height="9" rx="2" />
            <path d="M25 4.4v4.2c.8-.3 1.4-1.1 1.4-2.1S25.8 4.7 25 4.4Z" opacity="0.5" />
          </svg>
          <span>{mac.clock}</span>
        </span>
      </div>

      <div className="mac-window" data-dark={dark ? "" : undefined}>
        <div className="mac-toolbar">
          <span className="mac-lights">
            <i />
            <i />
            <i />
          </span>
          {kind === "browser" ? (
            <>
              <span className="mac-tools">
                <PanelLeft strokeWidth={1.8} />
                <ChevronLeft strokeWidth={2} />
                <ChevronRight strokeWidth={2} className="is-off" />
              </span>
              <span className="mac-url">
                <Lock strokeWidth={2.4} />
                <span>{title}</span>
                <RotateCw strokeWidth={2} className="mac-url-reload" />
              </span>
              <span className="mac-tools is-end">
                <Share strokeWidth={1.8} />
                <Plus strokeWidth={2} />
              </span>
            </>
          ) : (
            <span className="mac-title">{title}</span>
          )}
        </div>
        <div className="mac-page">{children}</div>
      </div>
    </div>
  );
}
