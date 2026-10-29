"use client";

import { Check, ChevronLeft, Clock, CloudCheck, Ellipsis, Plus, RefreshCw, WifiOff } from "lucide-react";
import { useSite } from "../site/SiteProvider";

export type Sync = "synced" | "pending" | "syncing";
export type Task = { id: number; label: string; done: boolean; sync: Sync };

/**
 * Application de tâches hors ligne, à la manière des apps iOS natives : fond groupé, carte de
 * synthèse avec l’anneau de progression et l’état du réseau, liste en carte arrondie, bouton
 * « Nouvelle tâche » en bas. Mesures en unités de conteneur.
 */
export default function MobileApp({
  tasks,
  online,
  pending,
  onAdd,
  onToggle,
}: {
  tasks: Task[];
  online: boolean;
  pending: number;
  onAdd?: () => void;
  onToggle?: (id: number) => void;
}) {
  const { t } = useSite();
  const copy = t.demos.offline;
  const done = tasks.filter((task) => task.done).length;
  const total = Math.max(1, tasks.length);
  const state = !online ? "offline" : pending > 0 ? "syncing" : "synced";
  const waiting = pending === 1 ? copy.pendingOne : copy.pendingMany.replace("{n}", String(pending));
  const status = state === "offline" ? `${copy.offlineShort} · ${waiting}` : state === "syncing" ? copy.syncShort : copy.allSynced;
  // Anneau de progression : circonférence d’un cercle de rayon 15,9 ≈ 100 unités.
  const progress = (done / total) * 100;

  return (
    <div className="ios rem">
      <div className="rem-nav">
        <span className="rem-back">
          <ChevronLeft strokeWidth={2.6} />
          {copy.lists}
        </span>
        <span className="rem-more">
          <Ellipsis strokeWidth={2.4} />
        </span>
      </div>

      <h3 className="rem-title">{copy.appTitle}</h3>

      <div className="rem-summary" data-state={state}>
        <svg className="rem-ring" viewBox="0 0 36 36">
          <circle className="rem-ring-track" cx="18" cy="18" r="15.9" />
          <circle className="rem-ring-value" cx="18" cy="18" r="15.9" strokeDasharray={`${progress} 100`} />
        </svg>
        <div className="rem-summary-text">
          <strong>{copy.summary.replace("{done}", String(done)).replace("{total}", String(tasks.length))}</strong>
          <span className="rem-status">
            {state === "offline" ? <WifiOff strokeWidth={2.2} /> : state === "syncing" ? <RefreshCw strokeWidth={2.2} /> : <CloudCheck strokeWidth={2.2} />}
            {status}
          </span>
        </div>
      </div>

      <p className="rem-section">{copy.todo}</p>
      <ul className="rem-list">
        {tasks.map((task) => (
          <li key={task.id} data-sync={task.sync} data-done={task.done ? "" : undefined}>
            <button type="button" className="rem-task" aria-pressed={task.done} onClick={() => onToggle?.(task.id)} tabIndex={-1}>
              <span className="rem-check">{task.done && <Check strokeWidth={3.4} />}</span>
              <span className="rem-text">
                <span className="rem-label">{task.label}</span>
                <span className="rem-meta">
                  {task.sync === "synced" && <CloudCheck strokeWidth={2.2} />}
                  {task.sync === "pending" && <Clock strokeWidth={2.4} />}
                  {task.sync === "syncing" && <RefreshCw strokeWidth={2.4} />}
                  {task.sync === "synced" ? copy.synced : task.sync === "pending" ? copy.pending : copy.syncing}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <button type="button" className="rem-add" onClick={onAdd} tabIndex={-1} aria-label={copy.add}>
        <span className="rem-add-icon">
          <Plus strokeWidth={3} />
        </span>
        {copy.newTask}
      </button>
    </div>
  );
}
