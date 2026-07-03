"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import Image from "next/image";
import { useState, useCallback } from "react";
import SplitText from "@/components/SplitText";

const fu = (delay = 0) => ({
  initial:    { opacity: 0, y: 22 },
  whileInView:{ opacity: 1, y: 0  },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
  viewport:   { once: true as const },
});

export default function SobreMim() {
  const { t, language } = useLanguage();
  const pt = language === "pt";
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r  = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
    const ny = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    const ease = (v: number) => Math.sign(v) * (1 - Math.pow(1 - Math.abs(v), 3));
    setTilt({ x: ease(ny) * -6, y: ease(nx) * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  const imgSrc = `${process.env.NODE_ENV === "production" ? "/Portfolio" : ""}/gabriel.jpg`;

  return (
    <section id="sobre" className="scroll-mt-20 px-4 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Content ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-7">

            {/* Terminal-style label */}
            <motion.div {...fu(0)}>
              <span className="font-mono text-[11px] tracking-[0.22em] text-indigo-400 select-none">
                &gt;_ {pt ? "sobre mim" : "about me"}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div {...fu(0.07)}>
              <h2
                className="
                  text-4xl sm:text-5xl lg:text-[3.5rem]
                  font-semibold tracking-[-0.04em] leading-[1.05]
                  text-zinc-100
                "
                style={{ fontFamily: "var(--font-display)" }}
              >
                <SplitText text={t.about.title} />
              </h2>
            </motion.div>

            {/* Accent line */}
            <motion.div
              {...fu(0.13)}
              className="h-px w-12 bg-gradient-to-r from-indigo-500 to-transparent"
            />

            {/* Bio text */}
            <motion.div {...fu(0.19)} className="space-y-4">
              <p className="text-[15px] sm:text-base leading-[1.9] text-zinc-400">
                {t.about.paragraph1}
              </p>
              <p className="text-[15px] sm:text-base leading-[1.9] text-zinc-400">
                {t.about.paragraph2}
              </p>
            </motion.div>

            {/* Currently — status indicator */}
            <motion.div
              {...fu(0.27)}
              className="flex items-start gap-3.5 py-4 border-t border-b border-white/[0.06]"
            >
              {/* Pulsing online dot */}
              <span className="relative flex h-2.5 w-2.5 mt-[3px] shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>

              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-600">
                  {pt ? "atualmente" : "currently"}
                </span>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="text-sm font-semibold text-zinc-200">ApexBrasil</span>
                  <span className="text-zinc-700">·</span>
                  <span className="text-sm text-zinc-400">
                    {pt ? "Estagiário · Coord. de Sistemas e Aplicações" : "Intern · Systems & Applications Division"}
                  </span>
                </div>
                <span className="text-xs text-zinc-600 font-mono">
                  {pt ? "mar. 2026 – presente · Brasília, DF" : "Mar. 2026 – present · Brasília, DF"}
                </span>
              </div>
            </motion.div>

            {/* Data facts */}
            <motion.div {...fu(0.33)} className="flex flex-wrap gap-x-8 gap-y-2">
              {[
                { label: pt ? "Localização" : "Location", value: "Brasília, DF" },
                { label: pt ? "Formação"   : "Education", value: pt ? "Eng. Computação · UnB" : "Comp. Eng. · UnB" },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase tracking-[0.18em] font-medium text-zinc-700">
                    {label}
                  </span>
                  <span className="text-sm text-zinc-300 font-mono">{value}</span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* ── RIGHT: Photo ──────────────────────────────────────────────── */}
          <motion.div
            {...fu(0.12)}
            className="
              relative rounded-2xl overflow-hidden
              min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]
              cursor-default
              order-first lg:order-last
            "
            style={{
              transform:       `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle:  "preserve-3d",
              transition:      "transform 180ms ease-out",
              willChange:      "transform",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Photo */}
            <Image
              src={imgSrc}
              alt="Gabriel Caixeta"
              fill
              className="object-cover object-top"
              priority
            />

            {/* Scan-line overlay — subtle tech texture */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.035) 3px, rgba(0,0,0,0.035) 4px)",
              }}
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

            {/* Identity tag */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="font-mono text-white/90 text-sm font-medium leading-tight tracking-tight">
                gabriel_caixeta
              </p>
              <p className="font-mono text-white/40 text-[11px] mt-0.5">
                {pt ? "desenvolvedor · brasília" : "developer · brasília"}
              </p>
            </div>

            {/* Corner accent */}
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/[0.15] rounded-tr-sm pointer-events-none" />
            <div className="absolute bottom-12 left-4 w-5 h-5 border-b border-l border-indigo-500/30 rounded-bl-sm pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
