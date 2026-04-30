"use client";

import { motion, type Variants } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FaReact, FaNode, FaPython, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiNestjs } from "react-icons/si";

// ─── Syntax token helpers ───────────────────────────────────────────────────
const Kw = ({ c }: { c: React.ReactNode }) => <span className="text-[#c678dd]">{c}</span>;
const Vr = ({ c }: { c: React.ReactNode }) => <span className="text-[#61afef]">{c}</span>;
const Pr = ({ c }: { c: React.ReactNode }) => <span className="text-[#e06c75]">{c}</span>;
const St = ({ c }: { c: React.ReactNode }) => <span className="text-[#98c379]">{c}</span>;
const Pl = ({ c }: { c: React.ReactNode }) => <span className="text-[#abb2bf]">{c}</span>;
const Ln = ({ n }: { n: number }) => (
  <span className="inline-block w-5 text-right mr-5 text-[#3d4350] select-none text-[11px]">{n}</span>
);

// ─── Code card ───────────────────────────────────────────────────────────────
function CodeCard({ language }: { language: string }) {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setBlink((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  const status = language === "pt" ? "aberto a oportunidades" : "open to opportunities";
  const loc = "Brasília, BR";

  return (
    <motion.div
      initial={{ opacity: 0, x: 36, y: 8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.85, delay: 0.55, ease: "easeOut" }}
      className="
        w-[330px] xl:w-[390px]
        rounded-2xl overflow-hidden
        bg-[#0d1117]
        border border-white/[0.09]
        shadow-[0_48px_100px_-24px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)]
      "
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.07] bg-white/[0.025]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] text-white/25 font-mono tracking-wide">gabriel.ts</span>
      </div>

      {/* Code body */}
      <div className="px-4 py-5 font-mono text-[12.5px] leading-[1.9] select-none">
        <div><Ln n={1} /><Kw c="const" /> <Vr c="gabriel" /> <Pl c="= {" /></div>
        <div><Ln n={2} /><Pr c="  name" /><Pl c=": " /><St c={`"Gabriel Caixeta"`} /><Pl c="," /></div>
        <div><Ln n={3} /><Pr c="  role" /><Pl c=": " /><St c={`"Full-Stack Dev"`} /><Pl c="," /></div>
        <div><Ln n={4} /><Pr c="  location" /><Pl c=": " /><St c={`"${loc}"`} /><Pl c="," /></div>
        <div><Ln n={5} /><Pr c="  stack" /><Pl c=": [" /></div>
        <div><Ln n={6} /><Pl c="    " /><St c='"Next.js"' /><Pl c=", " /><St c='"TypeScript"' /><Pl c="," /></div>
        <div><Ln n={7} /><Pl c="    " /><St c='"NestJS"' /><Pl c=", " /><St c='"Tailwind"' /><Pl c="," /></div>
        <div><Ln n={8} /><Pl c="  ]," /></div>
        <div><Ln n={9} /><Pr c="  status" /><Pl c=": " /><St c={`"${status}"`} /><Pl c="," /></div>
        <div><Ln n={10} /><Pl c="}" /></div>
        <div><Ln n={11} /><Pl c=" " /></div>
        <div>
          <Ln n={12} />
          <Kw c="export default" /> <Vr c="gabriel" />
          <span
            className="inline-block w-[2px] h-[13px] ml-0.5 bg-indigo-400 align-middle"
            style={{ opacity: blink ? 1 : 0, transition: "opacity 60ms" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Tech stack strip ────────────────────────────────────────────────────────
const stack = [
  { name: "Next.js",    Icon: SiNextdotjs,  color: "#ffffff" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "React",      Icon: FaReact,      color: "#61DAFB" },
  { name: "Tailwind",   Icon: SiTailwindcss,color: "#38BDF8" },
  { name: "NestJS",     Icon: SiNestjs,     color: "#E0234E" },
  { name: "Python",     Icon: FaPython,     color: "#FFD43B" },
  { name: "Git",        Icon: FaGitAlt,     color: "#F05032" },
  { name: "Node.js",    Icon: FaNode,       color: "#68A063" },
];

// ─── Framer variants ─────────────────────────────────────────────────────────
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function Hero() {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[100svh] flex items-center px-6 sm:px-10"
    >
      {/* Dark overlay — only in dark mode */}
      {isDark && (
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
      )}

      {/* Aurora blobs */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.22, 0.34, 0.22] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[750px] h-[750px] rounded-full bg-indigo-700/25 blur-[130px]"
        />
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.14, 0.22, 0.14] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute -bottom-56 right-0 w-[650px] h-[650px] rounded-full bg-purple-700/20 blur-[120px]"
        />
      </div>

      {/* Main grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-14 lg:gap-10 py-28 lg:py-0 min-h-[100svh]">

        {/* ── LEFT: text ─────────────────────────────────────────────────── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex-1 text-center lg:text-left"
        >

          {/* Name — huge */}
          <motion.h1
            variants={fadeUp}
            className="
              font-light tracking-[-0.05em] leading-[0.88]
              text-[clamp(3.5rem,10vw,8.5rem)]
              mb-7
            "
          >
            <span className="text-[var(--cc-title)]">Gabriel</span>
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #818cf8 0%, #a78bfa 45%, #67e8f9 100%)",
              }}
            >
              Caixeta
            </span>
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-[var(--cc-text)] font-light tracking-wide mb-4"
          >
            {language === "pt"
              ? "Desenvolvedor Full-Stack · Engenharia de Computação – UnB"
              : "Full-Stack Developer · Computer Engineering – UnB"}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="max-w-md text-sm sm:text-base text-[var(--cc-text)] opacity-60 font-light leading-relaxed mb-10 mx-auto lg:mx-0"
          >
            {language === "pt"
              ? "Interfaces rápidas, design consistente e código bem estruturado."
              : "Fast interfaces, consistent design, and well-structured code."}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-12"
          >
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              onClick={() => document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" })}
              className="
                rounded-full px-7 py-3 text-sm font-medium
                bg-gradient-to-r from-indigo-500 to-purple-600
                text-white
                shadow-[0_8px_30px_-10px_rgba(99,102,241,0.7)]
                border border-white/10
                transition-shadow duration-200
              "
            >
              {language === "pt" ? "Ver projetos" : "View projects"}
            </motion.button>

            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 450, damping: 32 }}
              onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
              className="
                rounded-full px-7 py-3 text-sm font-medium
                border border-[var(--pc-border)] text-[var(--pc-title)]
                hover:bg-[var(--pc-bg)] hover:border-indigo-400/40
                transition-all duration-150
              "
            >
              {language === "pt" ? "Vamos conversar" : "Let's talk"}
            </motion.button>
          </motion.div>

          {/* Tech strip */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 flex-wrap justify-center lg:justify-start"
          >
            <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--cc-text)] opacity-40 font-medium mr-1">
              Stack
            </span>
            <div className="h-px w-6 bg-[var(--pc-border)]" />
            {stack.map(({ name, Icon, color }) => (
              <span
                key={name}
                title={name}
                className="
                  flex items-center gap-1.5 px-2.5 py-1 rounded-lg
                  bg-[var(--pc-bg)] border border-[var(--pc-border)]
                  text-[var(--pc-text)] hover:text-[var(--pc-title)]
                  transition-colors duration-150 cursor-default
                "
              >
                <Icon className="w-3.5 h-3.5 shrink-0" style={{ color }} />
                <span className="text-[11px] font-medium">{name}</span>
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: code card (desktop only) ────────────────────────────── */}
        <div className="hidden lg:flex flex-shrink-0 items-center">
          <CodeCard language={language} />
        </div>
      </div>
    </section>
  );
}
