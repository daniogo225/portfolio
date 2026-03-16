"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface ColorTheme {
  name: string;
  accent: string;
  preview: string;
  light: {
    background: string;
    foreground: string;
    accent: string;
    accentLight: string;
    accentDark: string;
    muted: string;
    border: string;
    surface: string;
    surfaceElevated: string;
    gridColor: string;
    gridColorStrong: string;
    heroGradient: string;
  };
  dark: {
    background: string;
    foreground: string;
    accent: string;
    accentLight: string;
    accentDark: string;
    muted: string;
    border: string;
    surface: string;
    surfaceElevated: string;
    gridColor: string;
    gridColorStrong: string;
    heroGradient: string;
  };
}

const allThemes: ColorTheme[] = [
  {
    name: "Gold",
    accent: "#b8860b",
    preview: "#d4a843",
    light: {
      background: "#faf9f6",
      foreground: "#1a1a1a",
      accent: "#b8860b",
      accentLight: "#d4a843",
      accentDark: "#7a5a0b",
      muted: "#8c7e6a",
      border: "#e8e0d4",
      surface: "#ffffff",
      surfaceElevated: "#f5f0e8",
      gridColor: "rgba(184, 134, 11, 0.06)",
      gridColorStrong: "rgba(184, 134, 11, 0.12)",
      heroGradient: "linear-gradient(135deg, #1a1a1a 0%, #2d2418 40%, #3d2e14 70%, #1a1a1a 100%)",
    },
    dark: {
      background: "#111111",
      foreground: "#f5f0e8",
      accent: "#d4a843",
      accentLight: "#e8c56d",
      accentDark: "#8b6914",
      muted: "#a89880",
      border: "#2a2520",
      surface: "#1a1714",
      surfaceElevated: "#221e19",
      gridColor: "rgba(212, 168, 67, 0.05)",
      gridColorStrong: "rgba(212, 168, 67, 0.10)",
      heroGradient: "linear-gradient(135deg, #0a0a0a 0%, #1a1408 40%, #251c0a 70%, #0a0a0a 100%)",
    },
  },
  {
    name: "Emeraude",
    accent: "#059669",
    preview: "#34d399",
    light: {
      background: "#f0fdf4",
      foreground: "#022c22",
      accent: "#059669",
      accentLight: "#34d399",
      accentDark: "#064e3b",
      muted: "#4b7c6b",
      border: "#a7f3d0",
      surface: "#ecfdf5",
      surfaceElevated: "#d1fae5",
      gridColor: "rgba(5, 150, 105, 0.08)",
      gridColorStrong: "rgba(5, 150, 105, 0.15)",
      heroGradient: "linear-gradient(135deg, #064e3b 0%, #059669 50%, #022c22 100%)",
    },
    dark: {
      background: "#022c22",
      foreground: "#ecfdf5",
      accent: "#34d399",
      accentLight: "#6ee7b7",
      accentDark: "#065f46",
      muted: "#86c4aa",
      border: "#065f46",
      surface: "#064e3b",
      surfaceElevated: "#065f46",
      gridColor: "rgba(52, 211, 153, 0.06)",
      gridColorStrong: "rgba(52, 211, 153, 0.12)",
      heroGradient: "linear-gradient(135deg, #011e18 0%, #064e3b 50%, #022c22 100%)",
    },
  },
  {
    name: "Rubis",
    accent: "#be123c",
    preview: "#f43f5e",
    light: {
      background: "#fef2f2",
      foreground: "#1a1a1a",
      accent: "#be123c",
      accentLight: "#f43f5e",
      accentDark: "#881337",
      muted: "#8c6a6a",
      border: "#fecdd3",
      surface: "#fff1f2",
      surfaceElevated: "#ffe4e6",
      gridColor: "rgba(190, 18, 60, 0.06)",
      gridColorStrong: "rgba(190, 18, 60, 0.12)",
      heroGradient: "linear-gradient(135deg, #1a1a1a 0%, #2d1418 40%, #3d1420 70%, #1a1a1a 100%)",
    },
    dark: {
      background: "#1a0a0e",
      foreground: "#ffe4e6",
      accent: "#f43f5e",
      accentLight: "#fb7185",
      accentDark: "#9f1239",
      muted: "#b08080",
      border: "#3d1420",
      surface: "#2a1015",
      surfaceElevated: "#33121a",
      gridColor: "rgba(244, 63, 94, 0.05)",
      gridColorStrong: "rgba(244, 63, 94, 0.10)",
      heroGradient: "linear-gradient(135deg, #0a0506 0%, #1a0a0e 40%, #2a0a12 70%, #0a0506 100%)",
    },
  },
  {
    name: "Saphir",
    accent: "#1d4ed8",
    preview: "#3b82f6",
    light: {
      background: "#eff6ff",
      foreground: "#0f172a",
      accent: "#1d4ed8",
      accentLight: "#3b82f6",
      accentDark: "#1e3a5f",
      muted: "#6478a0",
      border: "#bfdbfe",
      surface: "#f0f5ff",
      surfaceElevated: "#dbeafe",
      gridColor: "rgba(29, 78, 216, 0.06)",
      gridColorStrong: "rgba(29, 78, 216, 0.12)",
      heroGradient: "linear-gradient(135deg, #0f172a 0%, #1e2d4a 40%, #1d3660 70%, #0f172a 100%)",
    },
    dark: {
      background: "#0a1128",
      foreground: "#e0eaff",
      accent: "#3b82f6",
      accentLight: "#60a5fa",
      accentDark: "#1e40af",
      muted: "#8098c0",
      border: "#1e2d4a",
      surface: "#111a30",
      surfaceElevated: "#162040",
      gridColor: "rgba(59, 130, 246, 0.05)",
      gridColorStrong: "rgba(59, 130, 246, 0.10)",
      heroGradient: "linear-gradient(135deg, #050a18 0%, #0a1128 40%, #0f1a3a 70%, #050a18 100%)",
    },
  },
  {
    name: "Amethyste",
    accent: "#7c3aed",
    preview: "#a78bfa",
    light: {
      background: "#f5f3ff",
      foreground: "#1a1a2e",
      accent: "#7c3aed",
      accentLight: "#a78bfa",
      accentDark: "#5b21b6",
      muted: "#7c6f9b",
      border: "#ddd6fe",
      surface: "#f5f3ff",
      surfaceElevated: "#ede9fe",
      gridColor: "rgba(124, 58, 237, 0.06)",
      gridColorStrong: "rgba(124, 58, 237, 0.12)",
      heroGradient: "linear-gradient(135deg, #1a1a2e 0%, #2d1a4a 40%, #3b1a60 70%, #1a1a2e 100%)",
    },
    dark: {
      background: "#110e1a",
      foreground: "#ede9fe",
      accent: "#a78bfa",
      accentLight: "#c4b5fd",
      accentDark: "#6d28d9",
      muted: "#9a8cba",
      border: "#2d1a4a",
      surface: "#1a1425",
      surfaceElevated: "#221a33",
      gridColor: "rgba(167, 139, 250, 0.05)",
      gridColorStrong: "rgba(167, 139, 250, 0.10)",
      heroGradient: "linear-gradient(135deg, #08060e 0%, #110e1a 40%, #1a1228 70%, #08060e 100%)",
    },
  },
];

// Emeraude first as default
const themes = [
  allThemes.find((t) => t.name === "Emeraude")!,
  ...allThemes.filter((t) => t.name !== "Emeraude"),
];

function applyTheme(theme: ColorTheme, mode: "light" | "dark") {
  const colors = mode === "dark" ? theme.dark : theme.light;
  const root = document.documentElement;

  root.style.setProperty("--background", colors.background);
  root.style.setProperty("--foreground", colors.foreground);
  root.style.setProperty("--accent", colors.accent);
  root.style.setProperty("--accent-light", colors.accentLight);
  root.style.setProperty("--accent-dark", colors.accentDark);
  root.style.setProperty("--muted", colors.muted);
  root.style.setProperty("--border", colors.border);
  root.style.setProperty("--surface", colors.surface);
  root.style.setProperty("--surface-elevated", colors.surfaceElevated);
  root.style.setProperty("--grid-color", colors.gridColor);
  root.style.setProperty("--grid-color-strong", colors.gridColorStrong);
  root.style.setProperty("--hero-gradient", colors.heroGradient);
}

export default function ColorSelector() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Emeraude");

  useEffect(() => {
    const stored = localStorage.getItem("color-theme");
    if (stored) {
      const theme = themes.find((t) => t.name === stored);
      if (theme) {
        setActive(theme.name);
        const mode = document.documentElement.classList.contains("dark")
          ? "dark"
          : "light";
        applyTheme(theme, mode);
      }
    }
  }, []);

  // Listen for dark/light mode changes to re-apply color theme
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const theme = themes.find((t) => t.name === active);
      if (theme) {
        const mode = document.documentElement.classList.contains("dark")
          ? "dark"
          : "light";
        applyTheme(theme, mode);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [active]);

  const selectTheme = useCallback(
    (theme: ColorTheme) => {
      setActive(theme.name);
      localStorage.setItem("color-theme", theme.name);
      const mode = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
      applyTheme(theme, mode);
      setOpen(false);
    },
    []
  );

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute bottom-12 md:bottom-14 right-0 flex flex-row md:flex-col gap-1.5 md:gap-2 p-2 md:p-3 bg-[var(--surface)] border border-[var(--border)] shadow-xl"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => selectTheme(theme)}
                className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 md:py-2 transition-colors duration-200 whitespace-nowrap"
                title={theme.name}
              >
                <div
                  className={`w-5 h-5 md:w-4 md:h-4 rounded-full flex-shrink-0 ${
                    active === theme.name ? "ring-2 ring-offset-1 ring-[var(--foreground)]" : ""
                  }`}
                  style={{ backgroundColor: theme.preview }}
                />
                <span className={`hidden md:inline text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider ${
                  active === theme.name
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}>
                  {theme.name}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-[var(--border)] bg-[var(--surface)] shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Changer le theme de couleur"
      >
        <motion.div
          className="w-4 h-4 md:w-5 md:h-5 rounded-full"
          style={{ backgroundColor: themes.find((t) => t.name === active)?.preview }}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </div>
  );
}
