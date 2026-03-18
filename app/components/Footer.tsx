export default function Footer() {
  return (
    <footer className="py-10 px-6 md:px-12 lg:px-20 border-t border-border/50">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display text-lg tracking-tight">
          dani<span className="text-accent">.</span>
        </span>
        <span className="font-mono text-muted text-[11px] tracking-[0.2em]">
          © {new Date().getFullYear()} — Abidjan, Côte d&apos;Ivoire
        </span>
      </div>
    </footer>
  );
}
