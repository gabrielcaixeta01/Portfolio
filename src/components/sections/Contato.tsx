"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import SplitText from "@/components/SplitText";
import MagneticButton from "@/components/ui/MagneticButton";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FiMail, FiCheck, FiCopy, FiArrowUpRight } from "react-icons/fi";

const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  viewport: { once: true as const },
});

export default function Contato() {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const emailAddress = "gabrielcaixetaromero@gmail.com";
  const pt = language === "pt";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <section id="contato" className="scroll-mt-20 px-4 sm:px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative overflow-hidden max-w-5xl mx-auto rounded-3xl bg-zinc-950 border border-white/[0.06] p-8 sm:p-12 lg:p-16"
      >
        {/* top edge glow — same signature as the hero terminal */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent"
        />

        {/* background glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[70%] h-[300px] bg-indigo-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[40%] h-[200px] bg-purple-700/15 blur-[80px] rounded-full" />
        </div>

        {/* subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">

          {/* ── left: statement + CTA ── */}
          <div>
            <motion.p
              {...fu(0)}
              className="flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-indigo-400 mb-5"
            >
              {pt ? "contato" : "contact"}
            </motion.p>

            <motion.h2
              {...fu(0.08)}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-[-0.04em] leading-[1.02] mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <SplitText text={t.contact.title} />
            </motion.h2>

            <motion.p
              {...fu(0.16)}
              className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md mb-7"
            >
              {t.contact.description}
            </motion.p>

            {/* availability */}
            <motion.p
              {...fu(0.22)}
              className="flex items-center gap-2.5 font-mono text-[12px] text-zinc-400 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              {pt ? "disponível para novos projetos" : "open to new projects"}
            </motion.p>

            <motion.div {...fu(0.28)}>
              <MagneticButton
                href={`mailto:${emailAddress}`}
                className="
                  items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium
                  bg-gradient-to-r from-indigo-500 to-indigo-400 text-white
                  shadow-[0_8px_28px_-8px_rgba(99,102,241,0.7)]
                  hover:shadow-[0_12px_36px_-8px_rgba(99,102,241,0.9)]
                  transition-shadow duration-200
                "
              >
                <FiMail size={15} />
                {pt ? "Enviar e-mail" : "Send an email"}
              </MagneticButton>
            </motion.div>
          </div>

          {/* ── right: contact channels ── */}
          <div className="flex flex-col gap-3">

            {/* LinkedIn */}
            <motion.a
              {...fu(0.2)}
              href="https://www.linkedin.com/in/gabriel-caixeta-romero"
              target="_blank"
              rel="noopener noreferrer me"
              className="
                group flex items-center gap-4 p-4 rounded-2xl
                bg-white/[0.04] border border-white/[0.07]
                hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/25
                transition-all duration-300 ease-out
              "
            >
              <div className="shrink-0 w-11 h-11 rounded-xl bg-[#0A66C2]/15 border border-[#0A66C2]/20 flex items-center justify-center">
                <FaLinkedin size={18} className="text-[#0A66C2]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-0.5">LinkedIn</p>
                <p className="text-sm font-semibold text-white truncate">gabriel-caixeta-romero</p>
              </div>
              <FiArrowUpRight
                size={16}
                className="shrink-0 text-zinc-600 group-hover:text-zinc-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
              />
            </motion.a>

            {/* GitHub */}
            <motion.a
              {...fu(0.26)}
              href="https://github.com/gabrielcaixeta01"
              target="_blank"
              rel="noopener noreferrer me"
              className="
                group flex items-center gap-4 p-4 rounded-2xl
                bg-white/[0.04] border border-white/[0.07]
                hover:bg-white/[0.08] hover:border-white/[0.15]
                transition-all duration-300 ease-out
              "
            >
              <div className="shrink-0 w-11 h-11 rounded-xl bg-white/[0.07] border border-white/[0.12] flex items-center justify-center">
                <FaGithub size={18} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-0.5">GitHub</p>
                <p className="text-sm font-semibold text-white truncate">gabrielcaixeta01</p>
              </div>
              <FiArrowUpRight
                size={16}
                className="shrink-0 text-zinc-600 group-hover:text-zinc-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
              />
            </motion.a>

            {/* Email copy */}
            <motion.button
              {...fu(0.32)}
              type="button"
              onClick={copyEmail}
              className="
                group flex items-center gap-4 p-4 rounded-2xl text-left
                bg-white/[0.04] border border-white/[0.07]
                hover:bg-indigo-600/10 hover:border-indigo-500/25
                transition-all duration-300 ease-out
              "
            >
              <div className="shrink-0 w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
                <FiMail size={16} className="text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-0.5">
                  {t.contact.email}
                </p>
                <p className="text-sm font-semibold text-white truncate">{emailAddress}</p>
              </div>
              <span
                className={`shrink-0 flex items-center gap-1.5 font-mono text-[11px] transition-all duration-200 ${
                  copied ? "text-emerald-400" : "text-zinc-600 group-hover:text-zinc-300"
                }`}
              >
                {copied ? (
                  <>
                    <FiCheck size={12} />
                    {pt ? "copiado!" : "copied!"}
                  </>
                ) : (
                  <>
                    <FiCopy size={12} />
                    {t.contact.copy}
                  </>
                )}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
