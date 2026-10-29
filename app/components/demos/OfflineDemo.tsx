"use client";

import { useEffect, useId, useState } from "react";
import { useSite } from "../site/SiteProvider";
import DemoFrame from "./DemoFrame";

type Sync = "synced" | "pending" | "syncing";
type Task = { id: number; label: string; done: boolean; sync: Sync };

const MAX_TASKS = 5;
const SYNC_MS = 650;

/**
 * Application hors ligne : les actions faites sans réseau restent dans la file d’envoi de l’appareil,
 * puis partent une par une, dans l’ordre, quand le réseau revient. Le schéma à côté du téléphone
 * montre cette file et la liaison avec le serveur.
 */
export default function OfflineDemo() {
  const { t } = useSite();
  const copy = t.demos.offline;
  const id = useId();
  const [online, setOnline] = useState(true);
  const [next, setNext] = useState(0);
  const [tasks, setTasks] = useState<Task[]>(() =>
    copy.initial.map((label, index) => ({ id: index, label, done: index === 0, sync: "synced" as Sync })),
  );

  const queued = tasks.filter((task) => task.sync !== "synced");
  const pending = queued.length;
  const syncing = tasks.find((task) => task.sync === "syncing");

  // File d’envoi : une action à la fois, la plus ancienne d’abord.
  useEffect(() => {
    if (!online) return;
    const timer = window.setTimeout(
      () => {
        setTasks((list) => {
          const index = list.findIndex((task) => task.sync === "syncing");
          if (index >= 0) return list.map((task, position) => (position === index ? { ...task, sync: "synced" } : task));
          const waiting = list.findIndex((task) => task.sync === "pending");
          if (waiting < 0) return list;
          return list.map((task, position) => (position === waiting ? { ...task, sync: "syncing" } : task));
        });
      },
      syncing ? SYNC_MS : 120,
    );
    return () => window.clearTimeout(timer);
  }, [online, tasks, syncing]);

  function add() {
    const label = copy.presets[next % copy.presets.length];
    setNext((value) => value + 1);
    setTasks((list) => {
      const task: Task = { id: Date.now(), label, done: false, sync: "pending" };
      let updated = [task, ...list];
      // L’écran reste lisible : on retire la plus ancienne tâche déjà synchronisée.
      while (updated.length > MAX_TASKS) {
        const oldest = updated.findLastIndex((item) => item.sync === "synced");
        if (oldest < 0) break;
        updated = updated.filter((_, index) => index !== oldest);
      }
      return updated;
    });
  }

  function toggle(taskId: number) {
    setTasks((list) => list.map((task) => (task.id === taskId ? { ...task, done: !task.done, sync: "pending" } : task)));
  }

  const summary =
    pending === 0 ? copy.allSynced : pending === 1 ? copy.pendingOne : copy.pendingMany.replace("{n}", String(pending));

  return (
    <DemoFrame number="2.4" label={copy.label} note={copy.hint} className="offline-demo">
      <div className="offline" data-online={online ? "" : undefined}>
        <div className="offline-panel">
          <div className="offline-control">
            <span id={`${id}-network`} className="spec-label">
              {copy.network}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={online}
              aria-labelledby={`${id}-network`}
              className="switch"
              onClick={() => setOnline((value) => !value)}
            >
              <span className="switch-track" aria-hidden="true">
                <span className="switch-thumb" />
              </span>
              <span>{online ? copy.online : copy.offline}</span>
            </button>
          </div>

          {/* Schéma : l’appareil, sa file d’envoi, le serveur. La liaison se coupe avec le réseau. */}
          <div className="sync" aria-hidden="true">
            <span className="sync-node">{copy.device}</span>
            <span className="sync-link">
              <span className="sync-queue">
                {queued
                  .slice()
                  .reverse()
                  .map((task) => (
                    <i key={task.id} data-sync={task.sync} />
                  ))}
              </span>
              <span className="sync-cut">×</span>
            </span>
            <span className="sync-node">{copy.server}</span>
            <span className="sync-queue-label">{copy.queue}</span>
          </div>
          <p className="offline-summary" aria-live="polite" data-pending={pending > 0 ? "" : undefined}>
            {summary}
          </p>
        </div>

        <div className="phone">
          <div className="phone-screen">
            <div className="phone-bar mono" aria-hidden="true">
              <span>9:41</span>
              <span>{online ? copy.online : copy.offline}</span>
            </div>
            <p className="phone-banner" data-shown={!online || pending > 0 ? "" : undefined}>
              {!online ? copy.bannerOffline : pending > 0 ? copy.bannerSync : copy.allSynced}
            </p>
            <div className="phone-head">
              <p className="phone-title">{copy.appTitle}</p>
              <button type="button" className="phone-add" onClick={add}>
                + {copy.add}
              </button>
            </div>
            <ul className="phone-list">
              {tasks.map((task) => (
                <li key={task.id} data-sync={task.sync}>
                  <button type="button" className="phone-task" aria-pressed={task.done} onClick={() => toggle(task.id)}>
                    <span className="phone-check" aria-hidden="true" />
                    <span className="phone-label">
                      {task.label}
                      <span className="sr-only">, {task.done ? copy.done : copy.todo}</span>
                    </span>
                  </button>
                  <span className="phone-sync mono">
                    {task.sync === "synced" ? copy.synced : task.sync === "pending" ? copy.pending : copy.syncing}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
