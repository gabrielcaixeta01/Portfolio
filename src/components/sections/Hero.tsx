"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import dynamic from "next/dynamic";
import MagneticButton from "@/components/ui/MagneticButton";

const NeuralCore = dynamic(() => import("@/components/three/NeuralCore"), { ssr: false });

// ── Animated headline line (rise from clip) ──────────────────────────────────
function RiseLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const { language } = useLanguage();
  const pt = language === "pt";

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[100svh] flex items-center px-5 sm:px-8 py-24"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

        {/* ── left: typographic statement ── */}
        <div className="lg:col-span-7">
          {/* eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-[0.18em] text-zinc-400 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            gabriel_caixeta · {pt ? "desenvolvedor" : "developer"} · brasília
          </motion.p>

          {/* name */}
          <h1
            className="font-semibold uppercase leading-[0.95] tracking-[-0.04em] text-[clamp(3.2rem,9.5vw,7rem)] text-zinc-100"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <RiseLine delay={0.15}>Gabriel</RiseLine>
            <RiseLine delay={0.28}>
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(129,140,248,0.85)" }}
              >
                Caixeta
              </span>
            </RiseLine>
          </h1>

          {/* subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="mt-6 max-w-md text-sm sm:text-base text-zinc-400 leading-relaxed"
          >
            {pt
              ? "Desenvolvedor full-stack e estudante de Engenharia de Computação na UnB — interfaces rápidas, design consistente e código bem estruturado."
              : "Full-stack developer and Computer Engineering student at UnB — fast interfaces, consistent design, and well-structured code."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.68, ease: "easeOut" }}
            className="mt-9 flex flex-col sm:flex-row gap-3"
          >
            <MagneticButton
              onClick={() => document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" })}
              className="
                w-full sm:w-auto items-center justify-center rounded-full px-7 py-3 text-sm font-medium
                bg-gradient-to-r from-indigo-500 to-indigo-400 text-white
                shadow-[0_8px_28px_-8px_rgba(99,102,241,0.7)]
                hover:shadow-[0_12px_36px_-8px_rgba(99,102,241,0.9)]
                transition-shadow duration-200
              "
            >
              {pt ? "Ver projetos" : "View projects"}
            </MagneticButton>

            <MagneticButton
              onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
              className="
                w-full sm:w-auto items-center justify-center rounded-full px-7 py-3 text-sm font-medium
                border border-white/[0.14] text-zinc-300
                hover:bg-white/[0.06] hover:border-white/[0.25]
                transition-all duration-200
              "
            >
              {pt ? "Entrar em contato" : "Get in touch"}
            </MagneticButton>
          </motion.div>
        </div>

        {/* ── right: neural core ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:col-span-5 w-full max-w-[520px] mx-auto lg:mx-0"
        >
          {/* glow bed */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,rgba(99,102,241,0.16),transparent_65%)]"
          />
          <NeuralCore className="h-[300px] sm:h-[380px] lg:h-[480px]" />
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.15em] text-zinc-500"
      >
        scroll ↓
      </motion.div>
    </section>
  );
}
