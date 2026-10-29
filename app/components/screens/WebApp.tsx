"use client";

import { Bell, Check, CreditCard, Ellipsis, FileCode2, Folder, FolderKanban, LayoutGrid, Plus, Search, Settings, Users } from "lucide-react";
import { useSite } from "../site/SiteProvider";
import MacScreen from "./MacScreen";

export type WebView = "wire" | "ui" | "code" | "live";

// Extrait Laravel volontairement court : autorisation, validation, envoi différé par la file.
function codeLines(comment: string, flash: string) {
  return [
    "public function store(InviteRequest $request, Team $team)",
    "{",
    `    ${comment}`,
    "    $this->authorize('invite', $team);",
    "",
    "    $invitation = $team->invitations()->create(",
    "        $request->validated()",
    "    );",
    "",
    "    Mail::to($invitation->email)",
    "        ->queue(new TeamInvitation($invitation));",
    "",
    `    return back()->with('status', __('${flash}'));`,
    "}",
  ];
}

const TOKEN = /(\/\/.*$)|('(?:[^'\\]|\\.)*')|(\$\w+)|\b(public|function|return|new)\b|(->\w+|::\w+)|\b([A-Z]\w+)\b/g;

function highlight(line: string) {
  const parts: { text: string; kind?: string }[] = [];
  let last = 0;
  for (const match of line.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) parts.push({ text: line.slice(last, index) });
    const kind = match[1] ? "comment" : match[2] ? "string" : match[3] ? "variable" : match[4] ? "keyword" : match[5] ? "call" : "type";
    parts.push({ text: match[0], kind });
    last = index + match[0].length;
  }
  if (last < line.length) parts.push({ text: line.slice(last) });
  return parts;
}

// Fichiers du projet de démonstration, dans l’explorateur de l’éditeur.
const TREE = [
  { name: "app", depth: 0, folder: true },
  { name: "Http/Controllers", depth: 1, folder: true },
  { name: "InvitationController.php", depth: 2, active: true },
  { name: "TeamController.php", depth: 2 },
  { name: "Mail", depth: 1, folder: true },
  { name: "TeamInvitation.php", depth: 2 },
  { name: "Models", depth: 1, folder: true },
  { name: "Invitation.php", depth: 2 },
  { name: "Team.php", depth: 2 },
  { name: "routes", depth: 0, folder: true },
  { name: "web.php", depth: 1 },
  { name: "tests", depth: 0, folder: true },
  { name: "InvitationTest.php", depth: 1 },
];

const NAV_ICONS = [LayoutGrid, FolderKanban, Users, CreditCard, Settings];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

function email(name: string) {
  const slug = name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, ".");
  return `${slug}@example.com`;
}

/**
 * La page Équipe d’une application SaaS, dans le MacBook. Quatre états de la même fonctionnalité :
 * la maquette filaire et l’interface finie dans Safari, le contrôleur dans l’éditeur, la mise en
 * ligne dans le Terminal. Toutes les mesures sont en unités de conteneur.
 */
export default function WebApp({
  view = "ui",
  modal = true,
  role,
  onRole,
  sent,
  onSend,
  calm,
}: {
  view?: WebView;
  modal?: boolean;
  role?: number;
  onRole?: (index: number) => void;
  sent?: boolean;
  onSend?: () => void;
  calm?: boolean;
}) {
  const { t } = useSite();
  const copy = t.demos.product;
  const app = copy.app;

  if (view === "code") {
    const lines = codeLines(copy.comment, copy.flash);
    return (
      <MacScreen kind="editor" title="InvitationController.php — atelier">
        <div className="editor">
          <aside className="editor-tree">
            <p className="editor-tree-head">atelier</p>
            {TREE.map((item) => (
              <span key={item.name} className="editor-file" data-active={item.active ? "" : undefined} style={{ paddingLeft: `${1 + item.depth * 1.1}cqw` }}>
                {item.folder ? <Folder strokeWidth={2} /> : <FileCode2 strokeWidth={2} />}
                {item.name}
              </span>
            ))}
          </aside>
          <div className="editor-main">
            <div className="editor-tabs">
              <span className="editor-tab" data-active="">
                InvitationController.php
              </span>
              <span className="editor-tab">InvitationTest.php</span>
            </div>
            <pre className="editor-code">
              {lines.map((line, index) => (
                <span key={index} className="editor-line" data-current={index === 3 ? "" : undefined}>
                  <span className="editor-gutter">{index + 1}</span>
                  {highlight(line).map((part, i) => (
                    <span key={i} className={part.kind ? `tk-${part.kind}` : undefined}>
                      {part.text}
                    </span>
                  ))}
                </span>
              ))}
            </pre>
          </div>
        </div>
      </MacScreen>
    );
  }

  if (view === "live") {
    return (
      <MacScreen kind="terminal" title="atelier — zsh">
        <div className="term">
          <p className="term-line">
            <span className="term-path">~/atelier</span> <span className="term-branch">main</span> <span className="term-prompt">$</span> {copy.mac.command}
          </p>
          <ol className="term-steps">
            {copy.steps.map((step, index) => (
              <li key={step} style={{ animationDelay: calm ? "0ms" : `${250 + index * 360}ms` }}>
                <span className="term-ok">✓</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <p className="term-live" style={{ animationDelay: calm ? "0ms" : `${250 + copy.steps.length * 360}ms` }}>
            <span className="term-dot" />
            {copy.live}
            <span className="term-url">https://{copy.url}</span>
          </p>
        </div>
      </MacScreen>
    );
  }

  const wire = view === "wire";
  return (
    <MacScreen kind="browser" title={copy.url}>
      <div className="webapp" data-wire={wire ? "" : undefined}>
        <aside className="webapp-side">
          <div className="webapp-brand">
            <span className="webapp-logo" />
            <span className="tx">{app.name}</span>
          </div>
          <nav className="webapp-nav">
            {app.nav.map((item, index) => {
              const Icon = NAV_ICONS[index] ?? LayoutGrid;
              return (
                <span key={item} data-active={index === app.active ? "" : undefined}>
                  <Icon strokeWidth={2} />
                  <span className="tx">{item}</span>
                </span>
              );
            })}
          </nav>
          <div className="webapp-me">
            <span className="webapp-avatar" data-tone="0">
              {initials(app.me)}
            </span>
            <span className="tx">{app.me}</span>
          </div>
        </aside>

        <main className="webapp-main">
          <div className="webapp-top">
            <span className="webapp-search">
              <Search strokeWidth={2} />
              <span className="tx">{copy.search}</span>
              <kbd>⌘K</kbd>
            </span>
            <Bell className="webapp-bell" strokeWidth={2} />
          </div>

          <div className="webapp-head">
            <div>
              <h3>
                <span className="tx">{app.heading}</span>
              </h3>
              <p>
                <span className="tx">{app.subheading}</span>
              </p>
            </div>
            <span className="webapp-primary">
              <Plus strokeWidth={2.5} />
              <span className="tx">{app.invite}</span>
            </span>
          </div>

          <div className="webapp-tabs">
            {app.tabs.map((tab, index) => (
              <span key={tab} data-active={index === 0 ? "" : undefined}>
                <span className="tx">{tab}</span>
                <span className="webapp-count">{index === 0 ? app.rows.length + 1 : 2}</span>
              </span>
            ))}
          </div>

          <table className="webapp-table">
            <thead>
              <tr>
                {app.columns.map((column) => (
                  <th key={column}>
                    <span className="tx">{column}</span>
                  </th>
                ))}
                <th />
              </tr>
            </thead>
            <tbody>
              {app.rows.map((row, index) => (
                <tr key={row[0]}>
                  <td>
                    <span className="webapp-person">
                      <span className="webapp-avatar" data-tone={(index % 5) + 1}>
                        {initials(row[0])}
                      </span>
                      <span className="webapp-who">
                        <span className="tx">{row[0]}</span>
                        <span className="tx webapp-mail">{email(row[0])}</span>
                      </span>
                    </span>
                  </td>
                  <td>
                    <span className="webapp-role tx">{row[1]}</span>
                  </td>
                  <td>
                    <span className="webapp-status" data-pending={row[2] === app.rows[3][2] ? "" : undefined}>
                      <span className="tx">{row[2]}</span>
                    </span>
                  </td>
                  <td className="webapp-more">
                    <Ellipsis strokeWidth={2} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        {modal && (
          <div className="webapp-scrim">
            <div className="webapp-modal">
              <h4>
                <span className="tx">{copy.title}</span>
              </h4>
              <p>
                <span className="tx">{copy.hint}</span>
              </p>
              <label>
                <span className="tx">{copy.emailLabel}</span>
                <span className="webapp-input">
                  <span className="tx">{copy.email}</span>
                </span>
              </label>
              <div className="webapp-field">
                <span className="tx">{copy.roleLabel}</span>
                <div className="webapp-roles">
                  {copy.roles.map((name, index) => (
                    <button key={name} type="button" data-on={(role ?? 1) === index ? "" : undefined} onClick={() => onRole?.(index)} tabIndex={-1}>
                      <span className="tx">{name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="webapp-actions">
                <span className="webapp-ghost">
                  <span className="tx">{copy.cancel}</span>
                </span>
                <button type="button" className="webapp-primary" onClick={onSend} tabIndex={-1}>
                  <span className="tx">{copy.submit}</span>
                </button>
              </div>
            </div>
            <div className="webapp-toast" data-shown={sent ? "" : undefined}>
              <Check strokeWidth={3} />
              {copy.sent}
            </div>
          </div>
        )}
      </div>
    </MacScreen>
  );
}
