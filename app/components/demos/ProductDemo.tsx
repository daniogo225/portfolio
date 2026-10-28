"use client";

import { Check } from "lucide-react";
import { useInView } from "motion/react";
import { Fragment, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useSite } from "../site/SiteProvider";
import DemoFrame from "./DemoFrame";

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
      <div ref={ref}>
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
              <span className="mono">0{index + 1}</span>
              {label}
              {tab === index && autoplay && <span className="pd-progress" style={{ animationDuration: `${STEP_MS}ms` }} aria-hidden="true" />}
            </button>
          ))}
        </div>

        <div id="pd-panel" className="pd-stage" role="tabpanel" aria-labelledby={`pd-tab-${tab}`} data-view={tab}>
          {tab === 0 && (
            <div className="pd-view pd-wire" key="wire">
              <span className="pd-wire-box is-title">{copy.wire[0]}</span>
              <span className="pd-wire-line" />
              <span className="pd-wire-box is-field">{copy.wire[1]}</span>
              <span className="pd-wire-row">
                <span className="pd-wire-box">{copy.wire[2]}</span>
                <span className="pd-wire-box" />
                <span className="pd-wire-box" />
              </span>
              <span className="pd-wire-box is-action">{copy.wire[3]}</span>
            </div>
          )}

          {tab === 1 && (
            <div className="pd-view pd-ui" key="ui">
              <p className="pd-ui-title">{copy.title}</p>
              <p className="pd-ui-hint">{copy.hint}</p>
              <label className="pd-field">
                <span>{copy.emailLabel}</span>
                <input type="email" value={copy.email} readOnly onFocus={() => setTouched(true)} />
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
              <p className="pd-file mono">app/Http/Controllers/InvitationController.php</p>
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
              <p className="pd-url mono">
                <span aria-hidden="true">https://</span>
                {copy.url}
              </p>
              <ol className="pd-steps">
                {copy.steps.map((step, index) => (
                  <li key={step} style={{ animationDelay: calm ? "0ms" : `${200 + index * 380}ms` }}>
                    <Check size={16} strokeWidth={2} aria-hidden="true" />
                    <span>{step}</span>
                    <span className="mono">ok</span>
                  </li>
                ))}
              </ol>
              <p className="pd-live-badge" style={{ animationDelay: calm ? "0ms" : `${200 + copy.steps.length * 380}ms` }}>
                {copy.live}
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoFrame>
  );
}
