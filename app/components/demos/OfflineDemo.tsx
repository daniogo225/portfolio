"use client";

import { Server, Smartphone, Wifi, WifiOff } from "lucide-react";
import { useEffect, useId, useState } from "react";
import IPhone from "../devices/IPhone";
import MobileApp, { type Sync, type Task } from "../screens/MobileApp";
import { useSite } from "../site/SiteProvider";
import DemoFrame from "./DemoFrame";

const MAX_TASKS = 6;
const SYNC_MS = 650;

/**
 * Application hors ligne dans l’iPhone : les actions faites sans réseau restent dans la file
 * d’envoi de l’appareil, puis partent une par une, dans l’ordre, quand le réseau revient.
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
    <DemoFrame number="2.2" label={copy.label} note={copy.hint} className="offline-demo">
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
              {online ? <Wifi size={16} strokeWidth={1.75} aria-hidden="true" /> : <WifiOff size={16} strokeWidth={1.75} aria-hidden="true" />}
              <span>{online ? copy.online : copy.offline}</span>
            </button>
          </div>

          <div className="sync" aria-hidden="true">
            <span className="sync-node">
              <span className="sync-icon">
                <Smartphone size={18} strokeWidth={1.6} />
              </span>
              <span className="sync-name">{copy.device}</span>
            </span>
            <span className="sync-link">
              <span className="sync-queue">
                {queued
                  .slice()
                  .reverse()
                  .map((task) => (
                    <i key={task.id} data-sync={task.sync} />
                  ))}
              </span>
              <span className="sync-cut">
                <WifiOff size={13} strokeWidth={2} />
              </span>
              <span className="sync-queue-label">{copy.queue}</span>
            </span>
            <span className="sync-node">
              <span className="sync-icon">
                <Server size={18} strokeWidth={1.6} />
              </span>
              <span className="sync-name">{copy.server}</span>
            </span>
          </div>
          <p className="offline-summary" aria-live="polite" data-pending={pending > 0 ? "" : undefined}>
            {summary}
          </p>
        </div>

        <IPhone className="offline-phone" offline={!online}>
          <MobileApp tasks={tasks} online={online} pending={pending} onAdd={add} onToggle={toggle} />
        </IPhone>
      </div>
    </DemoFrame>
  );
}
