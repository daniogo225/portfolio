"use client";

import { Check, Plus } from "lucide-react";
import { useSite } from "../site/SiteProvider";

export type Sync = "synced" | "pending" | "syncing";
export type Task = { id: number; label: string; done: boolean; sync: Sync };

/** Application de tâches hors ligne, affichée dans l’iPhone. Mesures en unités de conteneur. */
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
  return (
    <div className="mobapp">
      <div className="mobapp-banner" data-shown={!online || pending > 0 ? "" : undefined} data-offline={!online ? "" : undefined}>
        {!online ? copy.bannerOffline : pending > 0 ? copy.bannerSync : copy.allSynced}
      </div>
      <div className="mobapp-head">
        <p className="mobapp-eyebrow">{copy.network}: {online ? copy.online : copy.offline}</p>
        <h3>{copy.appTitle}</h3>
        <div className="mobapp-progress">
          <span style={{ width: `${(done / Math.max(1, tasks.length)) * 100}%` }} />
        </div>
      </div>
      <ul className="mobapp-list">
        {tasks.map((task) => (
          <li key={task.id} data-sync={task.sync}>
            <button type="button" className="mobapp-task" aria-pressed={task.done} onClick={() => onToggle?.(task.id)} tabIndex={-1}>
              <span className="mobapp-check">{task.done && <Check strokeWidth={3.5} />}</span>
              <span className="mobapp-label">{task.label}</span>
            </button>
            <span className="mobapp-sync">
              {task.sync === "synced" ? copy.synced : task.sync === "pending" ? copy.pending : copy.syncing}
            </span>
          </li>
        ))}
      </ul>
      <button type="button" className="mobapp-fab" onClick={onAdd} tabIndex={-1} aria-label={copy.add}>
        <Plus strokeWidth={2.5} />
      </button>
    </div>
  );
}
