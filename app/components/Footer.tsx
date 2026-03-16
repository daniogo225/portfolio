"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto px-8 md:px-16 lg:px-24 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-[var(--foreground)] tracking-tight">
            daniogo.
          </span>
          <div className="w-[1px] h-4 bg-[var(--border)]" />
          <span className="text-xs text-[var(--muted)] font-[family-name:var(--font-mono)]">
            {year}
          </span>
        </div>

        <motion.p
          className="text-xs text-[var(--muted)] font-[family-name:var(--font-mono)] tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Con&ccedil;u avec rigueur et pr&eacute;cision
        </motion.p>
      </div>
    </footer>
  );
}
