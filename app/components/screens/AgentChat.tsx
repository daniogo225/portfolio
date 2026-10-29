"use client";

import { ChevronLeft, ChevronRight, Mic, Plus, ShieldCheck, Video, Wrench } from "lucide-react";
import { useSite } from "../site/SiteProvider";

/**
 * L’assistant dans l’iPhone, à la manière de Messages : la demande en bulle bleue, l’appel
 * d’outil et le garde-fou en notes système, la validation humaine en alerte iOS. Écran fixe,
 * mesures en unités de conteneur.
 */
export default function AgentChat() {
  const { t } = useSite();
  const copy = t.demos.agent;
  const scenario = copy.scenarios[2];
  const tool = scenario.steps.find((step) => step.kind === "tool");
  const result = scenario.steps.find((step) => step.kind === "result");
  const guard = scenario.steps.find((step) => step.kind === "guard");

  return (
    <div className="ios chat">
      <header className="chat-nav">
        <ChevronLeft className="chat-back" strokeWidth={2.6} />
        <div className="chat-contact">
          <span className="chat-avatar">IA</span>
          <span className="chat-name">
            {copy.chatTitle}
            <ChevronRight strokeWidth={2.6} />
          </span>
        </div>
        <Video className="chat-video" strokeWidth={2} />
      </header>

      <div className="chat-thread">
        <p className="chat-stamp">{copy.today}</p>
        <p className="chat-bubble is-me">{scenario.prompt}</p>
        {tool && (
          <p className="chat-event">
            <Wrench strokeWidth={2.2} />
            <code>{tool.text}</code>
          </p>
        )}
        {result && <p className="chat-bubble">{result.text}</p>}
        {guard && (
          <p className="chat-event is-guard">
            <ShieldCheck strokeWidth={2.2} />
            <span>{guard.text}</span>
          </p>
        )}
        {scenario.approval && (
          <div className="chat-alert">
            <p className="chat-alert-title">{copy.approval}</p>
            <p className="chat-alert-text">{scenario.approval.question}</p>
            <div className="chat-alert-actions">
              <span className="is-destructive">{copy.reject}</span>
              <span className="is-default">{copy.approve}</span>
            </div>
          </div>
        )}
      </div>

      <footer className="chat-bar">
        <span className="chat-plus">
          <Plus strokeWidth={2.4} />
        </span>
        <span className="chat-field">
          <span>{copy.chatInput}</span>
          <Mic strokeWidth={2.2} />
        </span>
      </footer>
    </div>
  );
}
