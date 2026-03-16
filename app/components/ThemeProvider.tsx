"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: (e?: React.MouseEvent) => void;
}>({
  theme: "light",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
    setMounted(true);
  }, []);

  const toggle = useCallback((e?: React.MouseEvent) => {
    // Get click origin
    let x = window.innerWidth - 40;
    let y = 32;
    if (e) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    const maxRadius = Math.ceil(
      Math.sqrt(
        Math.max(x, window.innerWidth - x) ** 2 +
        Math.max(y, window.innerHeight - y) ** 2
      )
    );

    // Check if View Transitions API is available
    if (document.startViewTransition) {
      // Use native View Transitions API
      document.documentElement.style.setProperty("--pulse-x", `${x}px`);
      document.documentElement.style.setProperty("--pulse-y", `${y}px`);
      document.documentElement.style.setProperty("--pulse-radius", `${maxRadius}px`);

      const transition = document.startViewTransition(() => {
        setTheme((prev) => {
          const next = prev === "light" ? "dark" : "light";
          localStorage.setItem("theme", next);
          document.documentElement.classList.toggle("dark", next === "dark");
          return next;
        });
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 700,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      // Fallback: manual clip-path animation
      setTheme((prev) => {
        const next = prev === "light" ? "dark" : "light";
        localStorage.setItem("theme", next);

        // Apply new theme
        document.documentElement.classList.toggle("dark", next === "dark");

        // Animate clip-path on body
        document.body.style.clipPath = `circle(0px at ${x}px ${y}px)`;
        requestAnimationFrame(() => {
          document.body.style.transition = "clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
          document.body.style.clipPath = `circle(${maxRadius}px at ${x}px ${y}px)`;

          setTimeout(() => {
            document.body.style.clipPath = "";
            document.body.style.transition = "";
          }, 750);
        });

        return next;
      });
    }
  }, []);

  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
