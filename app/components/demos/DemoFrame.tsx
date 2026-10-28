import type { ReactNode } from "react";

/** Cadre commun des démonstrations : légende en tête, note facultative en pied. */
export default function DemoFrame({
  label,
  note,
  className,
  children,
}: {
  label: string;
  note?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <figure className={["demo", className].filter(Boolean).join(" ")}>
      <figcaption className="demo-label mono">{label}</figcaption>
      {children}
      {note && <p className="demo-note">{note}</p>}
    </figure>
  );
}
