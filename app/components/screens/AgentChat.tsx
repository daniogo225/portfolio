"use client";

import { ArrowUp, Mic, ShieldCheck, Wrench } from "lucide-react";
import { useSite } from "../site/SiteProvider";

/**
 * Assistant IA dans l’iPhone : la demande de remboursement, l’appel d’outil, le garde-fou et la
 * validation humaine. Écran fixe, mesures en unités de conteneur.
 */
export default function AgentChat() {
  const { t } = useSite();
  const copy = t.demos.agent;
  const scenario = copy.scenarios[2];
  const tool = scenario.steps.find((step) => step.kind === "tool");
  const result = scenario.steps.find((step) => step.kind === "result");
  const guard = scenario.steps.find((step) => step.kind === "guard");

  return (
    <div className="chat">
      <p className="chat-title">{copy.chatTitle}</p>
      <div className="chat-thread">
        <p className="chat-bubble is-user">{scenario.prompt}</p>
        {tool && (
          <p className="chat-tool">
            <Wrench strokeWidth={2} />
            <code>{tool.text}</code>
          </p>
        )}
        {result && <p className="chat-bubble">{result.text}</p>}
        {guard && (
          <p className="chat-guard">
            <ShieldCheck strokeWidth={2} />
            {guard.text}
          </p>
        )}
        {scenario.approval && (
          <div className="chat-approval">
            <p>{scenario.approval.question}</p>
            <div>
              <span className="is-primary">{copy.approve}</span>
              <span>{copy.reject}</span>
            </div>
          </div>
        )}
      </div>
      <div className="chat-input">
        <span>{copy.chatInput}</span>
        <Mic strokeWidth={2} />
        <span className="chat-send">
          <ArrowUp strokeWidth={2.5} />
        </span>
      </div>
    </div>
  );
}
