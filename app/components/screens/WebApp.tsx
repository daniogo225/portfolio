"use client";

import { Bell, Check, Plus, Search } from "lucide-react";
import { useSite } from "../site/SiteProvider";

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

/**
 * Application web SaaS, page Équipe, affichée dans le MacBook. Quatre états de la même page :
 * la maquette filaire, l’interface finie avec la fenêtre d’invitation, le code du contrôleur,
 * le journal de mise en ligne. Toutes les mesures sont en unités de conteneur.
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
  const lines = codeLines(copy.comment, copy.flash);

  if (view === "code") {
    return (
      <div className="webapp is-code">
        <div className="webapp-editor-bar">
          <span className="webapp-editor-tab">InvitationController.php</span>
          <span className="webapp-editor-path">app/Http/Controllers</span>
        </div>
        <pre className="webapp-editor">
          {lines.map((line, index) => (
            <span key={index} className="webapp-line">
              <span className="webapp-gutter">{index + 1}</span>
              {highlight(line).map((part, i) => (
                <span key={i} className={part.kind ? `tk-${part.kind}` : undefined}>
                  {part.text}
                </span>
              ))}
            </span>
          ))}
        </pre>
      </div>
    );
  }

  if (view === "live") {
    return (
      <div className="webapp is-live">
        <div className="webapp-live-head">
          <span className="webapp-url">{copy.url}</span>
          <span className="webapp-live-badge" style={{ animationDelay: calm ? "0ms" : `${300 + copy.steps.length * 380}ms` }}>
            {copy.live}
          </span>
        </div>
        <ol className="webapp-steps">
          {copy.steps.map((step, index) => (
            <li key={step} style={{ animationDelay: calm ? "0ms" : `${300 + index * 380}ms` }}>
              <span className="webapp-step-check">
                <Check strokeWidth={3} />
              </span>
              <span>{step}</span>
              <span className="webapp-step-ok">ok</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  const wire = view === "wire";
  return (
    <div className="webapp" data-wire={wire ? "" : undefined}>
      <aside className="webapp-side">
        <div className="webapp-brand">
          <span className="webapp-logo" />
          <span>{app.name}</span>
        </div>
        <nav className="webapp-nav">
          {app.nav.map((item, index) => (
            <span key={item} data-active={index === app.active ? "" : undefined}>
              {item}
            </span>
          ))}
        </nav>
        <div className="webapp-me">
          <span className="webapp-avatar" />
          <span>{app.me}</span>
        </div>
      </aside>
      <main className="webapp-main">
        <div className="webapp-top">
          <span className="webapp-search">
            <Search strokeWidth={2} />
          </span>
          <span className="webapp-bell">
            <Bell strokeWidth={2} />
          </span>
        </div>
        <div className="webapp-head">
          <div>
            <h3>{app.heading}</h3>
            <p>{app.subheading}</p>
          </div>
          <button type="button" className="webapp-primary" tabIndex={-1}>
            <Plus strokeWidth={2.5} />
            {app.invite}
          </button>
        </div>
        <table className="webapp-table">
          <thead>
            <tr>
              {app.columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {app.rows.map((row) => (
              <tr key={row[0]}>
                <td>
                  <span className="webapp-avatar is-small" />
                  {row[0]}
                </td>
                <td>{row[1]}</td>
                <td>
                  <span className="webapp-status" data-pending={row[2] === app.rows[3][2] ? "" : undefined}>
                    {row[2]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {modal && (
        <div className="webapp-scrim">
          <div className="webapp-modal">
            <h4>{copy.title}</h4>
            <p>{copy.hint}</p>
            <label>
              <span>{copy.emailLabel}</span>
              <span className="webapp-input">{copy.email}</span>
            </label>
            <div className="webapp-field">
              <span>{copy.roleLabel}</span>
              <div className="webapp-roles">
                {copy.roles.map((name, index) => (
                  <button key={name} type="button" data-on={(role ?? 1) === index ? "" : undefined} onClick={() => onRole?.(index)} tabIndex={-1}>
                    {name}
                  </button>
                ))}
              </div>
            </div>
            <button type="button" className="webapp-primary is-wide" onClick={onSend} tabIndex={-1}>
              {copy.submit}
            </button>
          </div>
          <div className="webapp-toast" data-shown={sent ? "" : undefined}>
            <Check strokeWidth={3} />
            {copy.sent}
          </div>
        </div>
      )}
    </div>
  );
}
