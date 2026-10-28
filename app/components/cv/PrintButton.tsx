"use client";

import { Printer } from "lucide-react";

export default function PrintButton({ label }: { label: string }) {
  return (
    <button type="button" className="cv-tool" onClick={() => window.print()}>
      <Printer size={16} strokeWidth={1.75} aria-hidden="true" />
      {label}
    </button>
  );
}
