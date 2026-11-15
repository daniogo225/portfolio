"use client";

import { Camera, Check, CheckCheck, MapPin, Mic, WifiOff } from "lucide-react";
import { useSite } from "../site/SiteProvider";

/**
 * L’application de terrain dans l’iPhone : un signalement saisi sans réseau (photo, note dictée,
 * position), son état d’envoi, puis la notification quand il est traité. Données fictives.
 * Mesures en unités de conteneur : 1 cqw = 1 % de la largeur de l’écran.
 */
export default function FieldApp({ plan }: { plan: number }) {
  const { t } = useSite();
  const copy = t.chain.phone;
  const state = plan === 0 ? "offline" : plan === 3 ? "done" : "sent";

  return (
    <div className="ios fa" data-state={state}>
      <div className="fa-nav">
        <span className="fa-cancel">{copy.cancel}</span>
        <strong>{copy.title}</strong>
        <span />
      </div>

      <div className="fa-photo">
        {/* La photo jointe, dessinée : une chaussée, une flaque, le jet de la fuite. */}
        <svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice">
          <rect className="fa-sky" width="320" height="150" />
          <path className="fa-wall" d="M0 0h320v62H0z" />
          <path className="fa-stall" d="M196 22h92v40h-92zM188 22l8-12h92l8 12z" />
          <path className="fa-ground" d="M0 62h320v88H0z" />
          <path className="fa-curb" d="M0 62h320v7H0z" />
          <ellipse className="fa-puddle" cx="132" cy="112" rx="96" ry="22" />
          <ellipse className="fa-ripple" cx="118" cy="112" rx="44" ry="9" />
          <ellipse className="fa-ripple" cx="118" cy="112" rx="20" ry="4" />
          <path className="fa-jet" d="M118 110c-2-26 6-44 22-52M118 110c2-22-4-36-14-44M118 110c0-20 1-34 3-48" />
        </svg>
        <span className="fa-photo-tag">
          <Camera strokeWidth={2.2} />
          {copy.photo}
        </span>
      </div>

      <div className="fa-card fa-note">
        <span className="fa-note-label">
          <Mic strokeWidth={2.4} />
          {copy.dictated}
        </span>
        <p>{copy.note}</p>
      </div>

      <div className="fa-card fa-rows">
        <div>
          <span>{copy.category}</span>
          <strong>{copy.categoryValue}</strong>
        </div>
        <div>
          <span>{copy.place}</span>
          <strong>
            <MapPin strokeWidth={2.4} />
            {copy.placeValue}
          </strong>
        </div>
        <div>
          <span>{copy.captured}</span>
          <strong>{copy.capturedValue}</strong>
        </div>
      </div>

      <div className="fa-status">
        <div data-for="offline">
          <span className="fa-status-icon">
            <WifiOff strokeWidth={2.4} />
          </span>
          <p>
            <strong>{copy.offline}</strong>
            <span>{copy.offlineText}</span>
          </p>
        </div>
        <div data-for="sent">
          <span className="fa-status-icon">
            <Check strokeWidth={3} />
          </span>
          <p>
            <strong>{copy.sent}</strong>
            <span>{copy.sentText}</span>
          </p>
        </div>
        <div data-for="done">
          <span className="fa-status-icon">
            <CheckCheck strokeWidth={2.6} />
          </span>
          <p>
            <strong>{copy.done}</strong>
            <span>{copy.doneText}</span>
          </p>
        </div>
      </div>

      <div className="fa-push">
        <span className="fa-push-icon">
          <MapPin strokeWidth={2.4} />
        </span>
        <p>
          <span className="fa-push-head">
            <span>{copy.app}</span>
            <span>{copy.now}</span>
          </span>
          <strong>{copy.pushTitle}</strong>
          <span>{copy.pushText}</span>
        </p>
      </div>
    </div>
  );
}
