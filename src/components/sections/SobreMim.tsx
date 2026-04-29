"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import Image from "next/image";
import { useState, useCallback } from "react";

const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true as const },
});

export default function SobreMim() {
  const { t, language } = useLanguage();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    const ease = (v: number) => Math.sign(v) * (1 - Math.pow(1 - Math.abs(v), 3));
    setTilt({ x: ease(ny) * -7, y: ease(nx) * 7 });
  }, []);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  const imgSrc = `${process.env.NODE_ENV === "production" ? "/Portfolio" : ""}/gabriel.jpg`;

  return (
    <section
      id="sobre"
      className="scroll-mt-20 px-4 py-4 sm:py-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Section eyebrow ─────────────────────────────────────────────── */}
        <motion.div
          {...fu(0)}
          className="mb-10 sm:mb-12"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-indigo-500 dark:text-indigo-400">
            {language === "pt" ? "sobre mim" : "about me"}
          </span>
          <h2 className="mt-1.5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.045em] leading-[1.05] text-[var(--cc-title)]">
            {t.about.title}
          </h2>
        </motion.div>

        {/* ── Main grid ───────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-5 lg:gap-6 items-start">

          {/* ── Photo card ─────────────────────────────────────────────── */}
          <motion.div
            {...fu(0.15)}
            className="relative rounded-2xl overflow-hidden min-h-[420px] lg:min-h-[500px] cursor-default"
            style={{
              transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
              transition: "transform 180ms ease-out",
              willChange: "transform",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={imgSrc}
              alt="Gabriel Caixeta"
              fill
              className="object-cover object-top"
              priority
            />

            {/* Bottom gradient + overlay info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5">
              {/* Name + role */}
              <p className="text-white font-semibold text-lg leading-tight">Gabriel Caixeta</p>
              <p className="text-white/60 text-sm mt-0.5">
                {language === "pt" ? "Desenvolvedor Full-Stack" : "Full-Stack Developer"}
              </p>
            </div>
          </motion.div>

          {/* ── Right side ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">

            {/* Bio text */}
            <motion.div
              {...fu(0.25)}
              className="
                rounded-2xl p-6 sm:p-7
                bg-[var(--pc-bg)] border border-[var(--pc-border)]
                shadow-[var(--pc-shadow)]
                backdrop-blur-sm
              "
            >
              <div className="space-y-4 text-[15.5px] sm:text-base leading-[1.9] text-[var(--cc-text)]">
                <p>{t.about.paragraph1}</p>
                <p>{t.about.paragraph2}</p>
              </div>
            </motion.div>

            {/* "Atualmente" highlighted card */}
            <motion.div
              {...fu(0.35)}
              className="
                relative rounded-2xl p-5 sm:p-6 overflow-hidden
                bg-[var(--pc-bg)] border border-[var(--pc-border)]
                shadow-[var(--pc-shadow)]
                backdrop-blur-sm
              "
            >
              {/* Indigo left accent */}
              <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-indigo-500 to-purple-500" />

              <div className="pl-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-indigo-500 dark:text-indigo-400">
                  {language === "pt" ? "atualmente" : "currently"}
                </span>

                <div className="mt-2 flex items-start gap-3">
                  {/* Company icon placeholder */}
                  <div className="mt-0.5 w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[var(--cc-title)] leading-tight">ApexBrasil</p>
                    <p className="text-xs text-[var(--cc-text)] mt-0.5">
                      {language === "pt"
                        ? "Estagiário · Coordenação de Sistemas e Aplicações"
                        : "Intern · Systems and Applications Division"}
                    </p>
                    <p className="text-xs text-[var(--cc-text)] opacity-60 mt-1">
                      {language === "pt" ? "mar. 2026 – presente · Brasília, DF" : "Mar. 2026 – present · Brasília, DF"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Fact chips row */}
            <motion.div
              {...fu(0.44)}
              className="grid grid-cols-2 gap-3"
            >
              {/* Location */}
              <div className="
                flex items-center gap-3 rounded-xl p-4
                bg-[var(--pc-bg)] border border-[var(--pc-border)]
                shadow-[var(--pc-shadow)]
              ">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] text-[var(--cc-text)] opacity-60 uppercase tracking-wide">
                    {language === "pt" ? "Localização" : "Location"}
                  </p>
                  <p className="text-sm font-medium text-[var(--cc-title)] leading-tight">Brasília, DF</p>
                </div>
              </div>

              {/* Education */}
              <div className="
                flex items-center gap-3 rounded-xl p-4
                bg-[var(--pc-bg)] border border-[var(--pc-border)]
                shadow-[var(--pc-shadow)]
              ">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] text-[var(--cc-text)] opacity-60 uppercase tracking-wide">
                    {language === "pt" ? "Formação" : "Education"}
                  </p>
                  <p className="text-sm font-medium text-[var(--cc-title)] leading-tight">
                    {language === "pt" ? "Eng. Computação – UnB" : "Comp. Eng. – UnB"}
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
