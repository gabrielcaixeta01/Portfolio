"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import SplitText from "@/components/SplitText";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FiMail, FiCheck, FiCopy } from "react-icons/fi";

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
        className="relative overflow-hidden max-w-5xl mx-auto rounded-3xl bg-zinc-950 p-8 sm:p-12 lg:p-16"
      >
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[70%] h-[300px] bg-indigo-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[40%] h-[200px] bg-purple-700/15 blur-[80px] rounded-full" />
        </div>

        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Label */}
          <motion.span
            {...fu(0)}
            className="block text-[11px] uppercase tracking-[0.28em] font-medium text-indigo-400 mb-4"
          >
            {pt ? "contato" : "contact"}
          </motion.span>

          {/* Title + description */}
          <div className="mb-10 sm:mb-12">
            <motion.h2
              {...fu(0.08)}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-[-0.035em] leading-[1.05] mb-4"
            >
              <SplitText text={t.contact.title} />
            </motion.h2>
            <motion.p
              {...fu(0.16)}
              className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-lg"
            >
              {t.contact.description}
            </motion.p>
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">

            {/* LinkedIn */}
            <motion.a
              {...fu(0.22)}
              href="https://www.linkedin.com/in/gabriel-caixeta-romero"
              target="_blank"
              rel="noopener noreferrer me"
              className="
                group flex flex-col gap-4 p-5 rounded-2xl
                bg-white/[0.04] border border-white/[0.07]
                hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/25
                transition-all duration-300 ease-out
              "
            >
              <div className="w-11 h-11 rounded-xl bg-[#0A66C2]/15 border border-[#0A66C2]/20 flex items-center justify-center">
                <FaLinkedin size={19} className="text-[#0A66C2]" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.22em] font-medium text-zinc-500 mb-1">
                  LinkedIn
                </p>
                <p className="text-sm font-semibold text-white">
                  gabriel-caixeta-romero
                </p>
              </div>
              <span className="text-zinc-600 group-hover:text-zinc-300 text-base transition-colors duration-200">
                ↗
              </span>
            </motion.a>

            {/* GitHub */}
            <motion.a
              {...fu(0.28)}
              href="https://github.com/gabrielcaixeta01"
              target="_blank"
              rel="noopener noreferrer me"
              className="
                group flex flex-col gap-4 p-5 rounded-2xl
                bg-white/[0.04] border border-white/[0.07]
                hover:bg-white/[0.08] hover:border-white/[0.15]
                transition-all duration-300 ease-out
              "
            >
              <div className="w-11 h-11 rounded-xl bg-white/[0.07] border border-white/[0.12] flex items-center justify-center">
                <FaGithub size={19} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-[0.22em] font-medium text-zinc-500 mb-1">
                  GitHub
                </p>
                <p className="text-sm font-semibold text-white">
                  gabrielcaixeta01
                </p>
              </div>
              <span className="text-zinc-600 group-hover:text-zinc-300 text-base transition-colors duration-200">
                ↗
              </span>
            </motion.a>

            {/* Email */}
            <motion.button
              {...fu(0.34)}
              type="button"
              onClick={copyEmail}
              className="
                group flex flex-col gap-4 p-5 rounded-2xl text-left
                bg-white/[0.04] border border-white/[0.07]
                hover:bg-indigo-600/10 hover:border-indigo-500/25
                transition-all duration-300 ease-out
              "
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
                <FiMail size={17} className="text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.22em] font-medium text-zinc-500 mb-1">
                  {t.contact.email}
                </p>
                <p className="text-sm font-semibold text-white truncate">
                  {emailAddress}
                </p>
              </div>
              <span
                className={`flex items-center gap-1.5 text-xs font-medium transition-all duration-200 ${
                  copied
                    ? "text-emerald-400"
                    : "text-zinc-600 group-hover:text-zinc-300"
                }`}
              >
                {copied ? (
                  <>
                    <FiCheck size={12} />
                    {pt ? "Copiado!" : "Copied!"}
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
