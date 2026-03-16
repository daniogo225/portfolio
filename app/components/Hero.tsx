"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import NeuralNetwork from "./NeuralNetwork";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  dur: number;
  delay: number;
  op: number;
  moveY: number;
  moveX: number;
}

function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        dur: Math.random() * 20 + 8,
        delay: Math.random() * 8,
        op: Math.random() * 0.4 + 0.05,
        moveY: -40 - Math.random() * 30,
        moveX: (Math.random() - 0.5) * 40,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.id % 3 === 0 ? "var(--accent-light)" : "rgba(255,255,255,0.4)",
            opacity: p.id % 3 === 0 ? 0.6 : 0.4,
          }}
          animate={{
            y: [0, p.moveY, 0],
            x: [0, p.moveX, 0],
            opacity: [p.op, p.op * 2.5, p.op],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function OrbitRing({
  size,
  duration,
  reverse,
  opacity,
  dotColor,
  dotSize,
}: {
  size: string;
  duration: number;
  reverse?: boolean;
  opacity: number;
  dotColor: string;
  dotSize: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full border"
      style={{
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
        borderColor: `rgba(255,255,255,${opacity})`,
      }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: dotSize,
          height: dotSize,
          backgroundColor: dotColor,
          top: -dotSize / 2,
          left: "50%",
          marginLeft: -dotSize / 2,
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: dotSize * 0.6,
          height: dotSize * 0.6,
          backgroundColor: `rgba(255,255,255,${opacity * 3})`,
          bottom: -dotSize * 0.3,
          left: "50%",
          marginLeft: -dotSize * 0.3,
        }}
      />
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const textOp = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.85]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
  const statsY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen overflow-hidden"
      style={{ backgroundColor: "#030303" }}
    >
      {/* Radial ambient glow */}
      <motion.div
        className="absolute z-[0]"
        style={{
          width: "900px",
          height: "900px",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 12%, transparent) 0%, color-mix(in srgb, var(--accent) 3%, transparent) 40%, transparent 65%)",
          scale: glowScale,
        }}
      />

      {/* Pulsing glow */}
      <motion.div
        className="absolute z-[0]"
        style={{
          width: "500px",
          height: "500px",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          background: "radial-gradient(circle, color-mix(in srgb, var(--accent-light) 15%, transparent) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <NeuralNetwork />
      <FloatingParticles />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* ---- CENTRAL COMPOSITION ---- */}
      <div className="relative z-[5] h-full flex flex-col items-center justify-center w-full max-w-[1200px] mx-auto px-8 md:px-16 lg:px-24">

        {/* Photo at center with orbits -- desktop */}
        <motion.div
          className="absolute right-[8%] md:right-[10%] top-1/2 -translate-y-1/2 hidden md:block"
          style={{ y: photoY }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Orbit rings */}
          <OrbitRing size="420px" duration={25} opacity={0.04} dotColor="var(--accent)" dotSize={8} />
          <OrbitRing size="340px" duration={18} reverse opacity={0.06} dotColor="var(--accent-light)" dotSize={6} />
          <OrbitRing size="260px" duration={30} opacity={0.03} dotColor="rgba(255,255,255,0.3)" dotSize={4} />

          {/* Photo */}
          <motion.div
            className="relative w-[200px] h-[200px] rounded-full overflow-hidden ring-[3px] ring-[var(--accent)]/30"
            style={{
              scale: photoScale,
              boxShadow: "0 0 80px color-mix(in srgb, var(--accent-light) 15%, transparent), 0 0 160px color-mix(in srgb, var(--accent) 8%, transparent)",
            }}
          >
            <Image
              src="/dani2.jpg"
              alt="daniogo"
              fill
              className="object-cover"
              style={{ objectPosition: "center 75%" }}
              sizes="200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </motion.div>
        </motion.div>

        {/* Photo -- mobile (smaller, above text) */}
        <motion.div
          className="md:hidden mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div
            className="relative w-32 h-32 rounded-full overflow-hidden ring-2 ring-[var(--accent)]/30"
            style={{ boxShadow: "0 0 40px color-mix(in srgb, var(--accent-light) 15%, transparent)" }}
          >
            <Image
              src="/dani2.jpg"
              alt="daniogo"
              fill
              className="object-cover"
              style={{ objectPosition: "center 75%" }}
              sizes="128px"
              priority
            />
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          className="w-full md:max-w-[55%] text-center md:text-left self-center md:self-auto"
          style={{ y: textY, opacity: textOp }}
        >
          <motion.div
            className="flex items-center gap-3 mb-5 justify-center md:justify-start"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="w-2.5 h-2.5 bg-[var(--accent)] rounded-full"
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs uppercase tracking-[0.3em] text-white/40 font-medium font-[family-name:var(--font-mono)]">
              Fullstack Developer
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tighter text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            daniogo
            <span className="text-[var(--accent)]">.</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-white/30 max-w-md leading-relaxed mt-5 mx-auto md:mx-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Plus que de simples apps,{" "}
            <span className="text-white/90 font-semibold">
              je construis des exp&eacute;riences.
            </span>
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4 mt-8 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a
              href="#projets"
              className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[var(--accent)] text-white text-sm font-semibold uppercase tracking-wider rounded-sm hover:brightness-125 hover:gap-5 transition-all duration-500"
            >
              Voir mes projets
              <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 text-sm text-white/30 border border-white/10 hover:border-[var(--accent)]/50 hover:text-[var(--accent-light)] transition-all duration-300 uppercase tracking-wider font-medium rounded-sm"
            >
              Me contacter
            </a>
          </motion.div>
        </motion.div>

        {/* Stats row -- bottom */}
        <motion.div
          className="absolute bottom-20 md:bottom-16 left-0 right-0 z-10"
          style={{ y: statsY }}
        >
          <div className="w-full max-w-[1200px] mx-auto px-8 md:px-16 lg:px-24">
            <motion.div
              className="flex items-center gap-6 md:gap-10 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {[
                { value: "4+", label: "Ans" },
                { value: "10+", label: "Projets" },
                { value: "100%", label: "Passion" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-baseline gap-2">
                  <motion.span
                    className="text-2xl md:text-3xl font-bold text-[var(--accent-light)]"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.15, duration: 0.5, type: "spring" }}
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-[10px] md:text-xs text-white/25 uppercase tracking-wider font-[family-name:var(--font-mono)]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom line + tech stack */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />
        <div className="w-full max-w-[1200px] mx-auto px-8 md:px-16 lg:px-24 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 text-[10px] md:text-xs text-white/15 font-[family-name:var(--font-mono)]">
            <span>Laravel</span>
            <span className="w-1 h-1 rounded-full bg-[var(--accent)]/50" />
            <span>React</span>
            <span className="w-1 h-1 rounded-full bg-[var(--accent)]/50" />
            <span>TypeScript</span>
          </div>
          <motion.div
            className="hidden md:flex items-center gap-2 text-white/15"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-[family-name:var(--font-mono)]">Scroll</span>
            <svg width="10" height="14" viewBox="0 0 10 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 1v12M1 9l4 4 4-4" />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
