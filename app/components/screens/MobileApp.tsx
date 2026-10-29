"use client";

import { Check, ChevronLeft, Clock, Ellipsis, Plus, RefreshCw, WifiOff } from "lucide-react";
import { useSite } from "../site/SiteProvider";

export type Sync = "synced" | "pending" | "syncing";
export type Task = { id: number; label: string; done: boolean; sync: Sync };

/**
 * Application de tâches hors ligne, à la manière de Rappels : grand titre, cercles à cocher,
 * état de synchronisation sous chaque tâche, bouton « Nouvelle tâche » en bas. Mesures en
 * unités de conteneur.
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
  const state = !online ? "offline" : pending > 0 ? "syncing" : "synced";
  const banner = !online ? copy.bannerOffline : pending > 0 ? copy.bannerSync : copy.allSynced;

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
      <p className="rem-state" data-state={state}>
        {state === "offline" ? <WifiOff strokeWidth={2.2} /> : state === "syncing" ? <RefreshCw strokeWidth={2.2} /> : <Check strokeWidth={2.6} />}
        <span>{banner}</span>
      </p>

      <ul className="rem-list">
        {tasks.map((task) => (
          <li key={task.id} data-sync={task.sync} data-done={task.done ? "" : undefined}>
            <button type="button" className="rem-task" aria-pressed={task.done} onClick={() => onToggle?.(task.id)} tabIndex={-1}>
              <span className="rem-check" />
              <span className="rem-text">
                <span className="rem-label">{task.label}</span>
                <span className="rem-meta">
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
