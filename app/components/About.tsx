"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./SectionHeading";

const stats = [
  { value: "4 ans", label: "Exp\u00e9rience" },
  { value: "Fullstack", label: "Sp\u00e9cialit\u00e9" },
  { value: "Laravel", label: "Backend" },
  { value: "React", label: "Frontend" },
];

export default function About() {
  return (
    <section
      id="apropos"
      className="relative py-24 md:py-32"
    >
      <div className="max-w-[1200px] mx-auto px-8 md:px-16 lg:px-24">
        <SectionHeading index="02" label="Qui suis-je" title="A propos" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Photo + text column */}
          <motion.div
            className="md:col-span-7 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
          >
            {/* Photo with geometric frame */}
            <div className="relative w-fit">
              <div className="absolute -top-3 -left-3 w-full h-full border-2 border-[var(--accent)] opacity-20" />
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-[var(--accent)] opacity-10" />

              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[var(--accent)]" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[var(--accent)] opacity-50" />

              <div className="relative w-52 md:w-60 aspect-square overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <Image
                  src="/dani2.jpg"
                  alt="daniogo"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 75%" }}
                  sizes="(max-width: 768px) 208px, 240px"
                />
                <div className="absolute inset-0 bg-[var(--accent)] opacity-10 mix-blend-multiply hover:opacity-0 transition-opacity duration-700" />
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xl md:text-2xl leading-relaxed text-[var(--foreground)]">
                Je suis{" "}
                <span className="font-bold">daniogo</span>, d&eacute;veloppeur web
                fullstack avec <span className="font-bold text-[var(--accent)]">4 ans d&apos;exp&eacute;rience</span>,
                passionn&eacute; par la cr&eacute;ation d&apos;exp&eacute;riences digitales
                qui comptent.
              </p>
              <p className="text-base leading-relaxed text-[var(--muted)]">
                Sp&eacute;cialis&eacute; en Laravel et React, je con&ccedil;ois des applications web
                robustes et &eacute;l&eacute;gantes. Mon approche est guid&eacute;e par un principe
                simple : chaque ligne de code doit servir l&apos;exp&eacute;rience
                utilisateur.
              </p>
              <p className="text-base leading-relaxed text-[var(--muted)]">
                Du backend solide au frontend raffin&eacute;, je m&apos;assure que chaque
                d&eacute;tail technique se traduit en valeur r&eacute;elle pour l&apos;utilisateur
                final. Actuellement, je me concentre sur le d&eacute;veloppement de
                solutions pour le march&eacute; africain.
              </p>

              <div className="pt-4 flex items-center gap-4">
                <div className="w-12 h-[2px] bg-[var(--accent)]" />
                <span className="text-sm font-[family-name:var(--font-mono)] text-[var(--muted)]">
                  Disponible pour de nouveaux projets
                </span>
              </div>
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            className="md:col-span-5 grid grid-cols-2 gap-[1px] bg-[var(--border)] self-start border border-[var(--border)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[var(--surface-elevated)] p-6 md:p-8 flex flex-col gap-2"
              >
                <span className="text-xl md:text-2xl font-bold text-[var(--foreground)]">
                  {stat.value}
                </span>
                <span className="text-xs font-[family-name:var(--font-mono)] text-[var(--muted)] uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
