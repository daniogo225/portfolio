"use client";

import { Check, Lock, Mail, UserPlus } from "lucide-react";
import { useInView } from "motion/react";
import { Fragment, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useSite } from "../site/SiteProvider";
import DemoFrame, { Window } from "./DemoFrame";

const STEP_MS = 3800;

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

/** Coloration minimale, suffisante pour un extrait de quelques lignes. */
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

export default function ProductDemo() {
  const { t, calm } = useSite();
  const copy = t.demos.product;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [tab, setTab] = useState(0);
  const [touched, setTouched] = useState(false);
  const [role, setRole] = useState(1);
  const [sent, setSent] = useState(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const autoplay = inView && !calm && !touched;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => setTab((current) => (current + 1) % copy.tabs.length), STEP_MS);
    return () => window.clearTimeout(timer);
  }, [autoplay, tab, copy.tabs.length]);

  useEffect(() => {
    if (!sent) return;
    const timer = window.setTimeout(() => setSent(false), 2600);
    return () => window.clearTimeout(timer);
  }, [sent]);

  function select(index: number) {
    setTouched(true);
    setTab(index);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const count = copy.tabs.length;
    let next = -1;
    if (event.key === "ArrowRight") next = (tab + 1) % count;
    else if (event.key === "ArrowLeft") next = (tab - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    if (next < 0) return;
    event.preventDefault();
    select(next);
    tabsRef.current[next]?.focus();
  }

  const lines = codeLines(copy.comment, copy.flash);

  return (
    <DemoFrame label={copy.label} className="product-demo">
      <div ref={ref} className="pd">
        <div className="pd-tabs" role="tablist" aria-label={copy.label}>
          {copy.tabs.map((label, index) => (
            <button
              key={label}
              ref={(node) => {
                tabsRef.current[index] = node;
              }}
              id={`pd-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={tab === index}
              aria-controls="pd-panel"
              tabIndex={tab === index ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={onKeyDown}
            >
              <span className="pd-tab-index">0{index + 1}</span>
              {label}
              {tab === index && autoplay && <span className="pd-progress" style={{ animationDuration: `${STEP_MS}ms` }} aria-hidden="true" />}
            </button>
          ))}
        </div>

        <Window className="pd-window" icon={<Lock size={11} strokeWidth={2.25} />} title={copy.url}>
          <div id="pd-panel" className="pd-stage" role="tabpanel" aria-labelledby={`pd-tab-${tab}`} data-view={tab}>
            {tab === 0 && (
              <div className="pd-view pd-wire" key="wire">
                <div className="pd-frame">
                  <span className="pd-frame-name" aria-hidden="true">
                    {copy.title}
                  </span>
                  <span className="pd-sk is-title">
                    <span className="pd-sk-label">{copy.wire[0]}</span>
                  </span>
                  <span className="pd-sk is-line" aria-hidden="true" />
                  <span className="pd-sk is-field is-selected">
                    <span className="pd-sk-label">{copy.wire[1]}</span>
                    <i className="pd-handle is-tl" aria-hidden="true" />
                    <i className="pd-handle is-tr" aria-hidden="true" />
                    <i className="pd-handle is-bl" aria-hidden="true" />
                    <i className="pd-handle is-br" aria-hidden="true" />
                    <span className="pd-size" aria-hidden="true">
                      Fill × 44
                    </span>
                  </span>
                  <span className="pd-sk-row">
                    <span className="pd-sk is-chip">
                      <span className="pd-sk-label">{copy.wire[2]}</span>
                    </span>
                    <span className="pd-sk is-chip" aria-hidden="true" />
                    <span className="pd-sk is-chip" aria-hidden="true" />
                  </span>
                  <span className="pd-sk is-action">
                    <span className="pd-sk-label">{copy.wire[3]}</span>
                  </span>
                </div>
              </div>
            )}

            {tab === 1 && (
              <div className="pd-view pd-ui" key="ui">
                <div className="pd-modal">
                  <div className="pd-modal-head">
                    <span className="pd-modal-icon" aria-hidden="true">
                      <UserPlus size={18} strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="pd-ui-title">{copy.title}</p>
                      <p className="pd-ui-hint">{copy.hint}</p>
                    </div>
                  </div>
                  <label className="pd-field">
                    <span>{copy.emailLabel}</span>
                    <span className="pd-input">
                      <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
                      <input type="email" value={copy.email} readOnly onFocus={() => setTouched(true)} />
                    </span>
                  </label>
                  <div className="pd-field">
                    <span id="pd-role-label">{copy.roleLabel}</span>
                    <div className="pd-roles" role="radiogroup" aria-labelledby="pd-role-label">
                      {copy.roles.map((name, index) => (
                        <button
                          key={name}
                          type="button"
                          role="radio"
                          aria-checked={role === index}
                          onClick={() => {
                            setTouched(true);
                            setRole(index);
                          }}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="pd-submit"
                    onClick={() => {
                      setTouched(true);
                      setSent(true);
                    }}
                  >
                    {copy.submit}
                  </button>
                </div>
                <p className="pd-toast" role="status" data-shown={sent ? "" : undefined}>
                  {sent && (
                    <>
                      <Check size={16} strokeWidth={2} aria-hidden="true" />
                      {copy.sent}
                    </>
                  )}
                </p>
              </div>
            )}

            {tab === 2 && (
              <div className="pd-view pd-code" key="code">
                <p className="pd-file">
                  <span className="pd-file-tab">InvitationController.php</span>
                  <span className="pd-file-path" aria-hidden="true">
                    app/Http/Controllers
                  </span>
                </p>
                <pre tabIndex={0}>
                  <code>
                    {lines.map((line, index) => (
                      <span key={index} className="pd-line">
                        <span className="pd-gutter" aria-hidden="true">
                          {index + 1}
                        </span>
                        {highlight(line).map((part, partIndex) =>
                          part.kind ? (
                            <span key={partIndex} className={`tk-${part.kind}`}>
                              {part.text}
                            </span>
                          ) : (
                            <Fragment key={partIndex}>{part.text}</Fragment>
                          ),
                        )}
                      </span>
                    ))}
                  </code>
                </pre>
              </div>
            )}

            {tab === 3 && (
              <div className="pd-view pd-live" key="live">
                <div className="pd-live-head">
                  <p className="pd-url">{copy.url}</p>
                  <p className="pd-live-badge" style={{ animationDelay: calm ? "0ms" : `${200 + copy.steps.length * 380}ms` }}>
                    {copy.live}
                  </p>
                </div>
                <ol className="pd-steps">
                  {copy.steps.map((step, index) => (
                    <li key={step} style={{ animationDelay: calm ? "0ms" : `${200 + index * 380}ms` }}>
                      <span className="pd-step-check" aria-hidden="true">
                        <Check size={13} strokeWidth={2.5} />
                      </span>
                      <span>{step}</span>
                      <span className="pd-step-ok">ok</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </Window>
      </div>
    </DemoFrame>
  );
}
