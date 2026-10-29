"use client";

import { useSyncExternalStore } from "react";

/** Vrai quand la requête média correspond. Faux côté serveur, puis mis à jour à l’hydratation. */
export default function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const media = matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => matchMedia(query).matches,
    () => false,
  );
}
