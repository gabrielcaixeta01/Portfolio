"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FiMail, FiCheck } from "react-icons/fi";

const container = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function Contato() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const email = "gabrielcaixetaromero@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  return (
    <section
      id="contato"
      className="relative scroll-mt-5 min-h-screen flex items-center justify-center px-4 py-16"
    >
      {/* blobs discretos de fundo (mais suaves no claro) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-fuchsia-300/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#0000000f_1px,transparent_1px)] [background-size:22px_22px] dark:opacity-[0.07] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative w-full max-w-3xl"
      >
        {/* card glass mais claro no modo claro */}
        <motion.div
          variants={item}
          className="rounded-2xl border border-slate-100 dark:border-white/10 bg-white/90 dark:bg-zinc-900/50 backdrop-blur-xl shadow-xl p-8 md:p-10"
        >
          <motion.h2
            variants={item}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4
                       bg-gradient-to-r from-slate-700 via-slate-500 to-slate-700
                       dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100
                       bg-clip-text text-transparent"
          >
            {t.contact.title}
          </motion.h2>

          <motion.p
            variants={item}
            className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-zinc-300 mb-8"
          >
            {t.contact.description}
          </motion.p>

          {/* links */}
          <motion.div
            variants={item}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <a
              href="https://www.linkedin.com/in/gabriel-caixeta-romero"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 rounded-xl border border-slate-100 dark:border-zinc-700/40 bg-white/95 dark:bg-zinc-900/60 backdrop-blur-md px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-200 dark:hover:border-zinc-600/60"
              aria-label="LinkedIn"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FaLinkedin className="text-slate-700 dark:text-zinc-200 text-xl flex-shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm text-slate-500 dark:text-zinc-400">
                    {t.contact.linkedin}
                  </span>
                  <span className="text-sm font-medium text-slate-900 dark:text-zinc-100 truncate">
                    gabriel-caixeta-romero
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-500 group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                ↗
              </span>
            </a>

            <a
              href="https://github.com/gabrielcaixeta01"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 rounded-xl border border-slate-100 dark:border-zinc-700/40 bg-white/95 dark:bg-zinc-900/60 backdrop-blur-md px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-200 dark:hover:border-zinc-600/60"
              aria-label="GitHub"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FaGithub className="text-slate-700 dark:text-zinc-200 text-xl flex-shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm text-slate-500 dark:text-zinc-400">
                    {t.contact.github}
                  </span>
                  <span className="text-sm font-medium text-slate-900 dark:text-zinc-100 truncate">
                    gabrielcaixeta01
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-500 group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                ↗
              </span>
            </a>

            <button
              onClick={copyEmail}
              className="group flex items-center justify-between gap-3 rounded-xl border border-slate-100 dark:border-zinc-700/40 bg-white/95 dark:bg-zinc-900/60 backdrop-blur-md px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-200 dark:hover:border-zinc-600/60"
              aria-label="Copy email"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FiMail className="text-slate-700 dark:text-zinc-200 text-xl flex-shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm text-slate-500 dark:text-zinc-400">
                    {t.contact.email}
                  </span>
                  <span className="text-sm font-medium text-slate-900 dark:text-zinc-100 truncate">
                    {email}
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-500 flex-shrink-0">
                {copied ? <FiCheck /> : t.contact.copy}
              </span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}