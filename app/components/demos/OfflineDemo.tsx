"use client";

import { Check, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { useEffect, useId, useState } from "react";
import IPhone from "../devices/IPhone";
import MobileApp, { type Sync, type Task } from "../screens/MobileApp";
import { useSite } from "../site/SiteProvider";
import DemoFrame from "./DemoFrame";

const MAX_TASKS = 6;
const SYNC_MS = 650;
// Après la synchronisation, l’îlot confirme un instant puis se replie.
const DONE_MS = 1800;

/**
 * Application hors ligne dans l’iPhone. Le seul réglage est le réseau : coupé, les actions restent
 * sur l’appareil et la Dynamic Island les compte ; rétabli, elles partent une par une, puis l’îlot
 * confirme et se replie, comme une activité en direct d’iOS.
 */
export default function OfflineDemo() {
  const { t } = useSite();
  const copy = t.demos.offline;
  const id = useId();
  const [online, setOnline] = useState(true);
  const [next, setNext] = useState(0);
  const [justSynced, setJustSynced] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(() =>
    copy.initial.map((label, index) => ({ id: index, label, done: index === 0, sync: "synced" as Sync })),
  );

  const pending = tasks.filter((task) => task.sync !== "synced").length;
  const syncing = tasks.find((task) => task.sync === "syncing");

  useEffect(() => {
    if (!online) return;
    const timer = window.setTimeout(
      () => {
        setTasks((list) => {
          const index = list.findIndex((task) => task.sync === "syncing");
          if (index >= 0) {
            const updated = list.map((task, position) => (position === index ? { ...task, sync: "synced" as Sync } : task));
            if (!updated.some((task) => task.sync !== "synced")) setJustSynced(true);
            return updated;
          }
          const waiting = list.findIndex((task) => task.sync === "pending");
          if (waiting < 0) return list;
          return list.map((task, position) => (position === waiting ? { ...task, sync: "syncing" as Sync } : task));
        });
      },
      syncing ? SYNC_MS : 120,
    );
    return () => window.clearTimeout(timer);
  }, [online, tasks, syncing]);

  useEffect(() => {
    if (!justSynced) return;
    const timer = window.setTimeout(() => setJustSynced(false), DONE_MS);
    return () => window.clearTimeout(timer);
  }, [justSynced]);

  function add() {
    const label = copy.presets[next % copy.presets.length];
    setNext((value) => value + 1);
    setJustSynced(false);
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
    setJustSynced(false);
    setTasks((list) => list.map((task) => (task.id === taskId ? { ...task, done: !task.done, sync: "pending" } : task)));
  }

  const island =
    !online && pending > 0 ? (
      <>
        <WifiOff className="island-icon is-warn" strokeWidth={2.4} />
        <span>{copy.islandPending.replace("{n}", String(pending))}</span>
      </>
    ) : online && pending > 0 ? (
      <>
        <RefreshCw className="island-icon is-sync" strokeWidth={2.4} />
        <span>{copy.syncing}</span>
      </>
    ) : justSynced ? (
      <>
        <Check className="island-icon is-done" strokeWidth={3} />
        <span>{copy.synced}</span>
      </>
    ) : undefined;

  const summary = pending === 0 ? copy.allSynced : pending === 1 ? copy.pendingOne : copy.pendingMany.replace("{n}", String(pending));

  return (
    <DemoFrame number="2.2" label={copy.label} note={copy.hint} className="offline-demo">
      <div className="offline" data-online={online ? "" : undefined}>
        <IPhone className="offline-phone" offline={!online} island={island}>
          <MobileApp tasks={tasks} online={online} pending={pending} onAdd={add} onToggle={toggle} />
        </IPhone>

        <div className="offline-control">
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
            <span id={`${id}-network`} className="offline-network">
              {online ? <Wifi size={16} strokeWidth={1.75} aria-hidden="true" /> : <WifiOff size={16} strokeWidth={1.75} aria-hidden="true" />}
              {copy.networkLine.replace("{state}", online ? copy.online : copy.offline)}
            </span>
          </button>
          <p className="offline-summary" aria-live="polite" data-pending={pending > 0 ? "" : undefined}>
            {summary}
          </p>
        </div>
      </div>
    </DemoFrame>
  );
}
