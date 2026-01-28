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

  // Base class pra deixar os “cards-link” bem tech/premium
  const linkCardClass = `
    group
    flex items-center justify-between gap-3
    w-full
    min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem] lg:min-h-[5rem]
    px-3 py-2 sm:px-3.5 sm:py-3 lg:p-5
    rounded-md lg:rounded-lg
    border border-[var(--cc-border)]
    bg-[var(--cc-bg)]
    shadow-[var(--cc-shadow)]
    backdrop-blur-[12px]
    transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out
    hover:-translate-y-0.5
    hover:border-[color-mix(in_oklab,var(--cc-title)_18%,transparent)]
    hover:[box-shadow:0_16px_40px_rgba(0,0,0,0.20)]
    focus-visible:outline-none
    focus-visible:[box-shadow:0_0_0_3px_color-mix(in_oklab,var(--cc-title)_22%,transparent)]
  `;

  return (
    <section
      id="contato"
      className="
        relative scroll-mt-5 min-h-screen flex items-center justify-center
        px-2 sm:px-3 md:px-4
        py-6 sm:py-8 md:py-16
      "
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative w-full max-w-3xl"
      >
        {/* Card glass */}
        <motion.div
          variants={item}
          className="
            w-full max-w-[48rem]
            bg-[var(--cc-bg)]
            border border-[var(--cc-border)]
            shadow-[var(--cc-shadow)]
            backdrop-blur-lg
            rounded-2xl
            transition duration-200 ease-in-out
            hover:shadow-lg
            p-4 sm:p-6 md:p-10
            mx-auto
          "
        >

          {/* Título */}
          <motion.h2
            variants={item}
            className="
              text-[var(--cc-title)]
              text-3xl sm:text-4xl md:text-5xl
              font-[var(--font-display)]
              tracking-[-0.04em] leading-[1.05]
              mb-4
              text-center md:text-left
              relative
            "
          >
            {t.contact.title}

            {/* Divider premium */}
            <span
              className="
                hidden md:block
                absolute -bottom-3 left-0
                h-px w-24
                bg-gradient-to-r from-transparent via-indigo-500/45 to-transparent
              "
            />
          </motion.h2>

          {/* Descrição */}
          <motion.p
            variants={item}
            className="
              text-[var(--cc-text)]
              text-sm sm:text-base md:text-lg
              leading-[1.85]
              tracking-[0.01em]
              opacity-90
              mb-6 sm:mb-8
              text-justify md:text-left
              px-1 sm:px-0
            "
          >
            {t.contact.description}
          </motion.p>

          {/* Grid */}
          <motion.div
            variants={item}
            className="
              grid grid-cols-1 gap-3
              lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-6
              xl:gap-8
            "
          >
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/gabriel-caixeta-romero"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="LinkedIn"
              className={`${linkCardClass} lg:row-start-1`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FaLinkedin className="text-xl sm:text-[1.125rem] lg:text-[1.25rem] flex-shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs sm:text-sm truncate opacity-80">
                    {t.contact.linkedin}
                  </span>
                  <span className="text-sm sm:text-base font-semibold truncate">
                    gabriel-caixeta-romero
                  </span>
                </div>
              </div>

              <span className="text-xs opacity-80 group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                ↗
              </span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/gabrielcaixeta01"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="GitHub"
              className={`${linkCardClass} lg:row-start-1`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FaGithub className="text-xl sm:text-[1.125rem] lg:text-[1.25rem] flex-shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs sm:text-sm truncate opacity-80">
                    {t.contact.github}
                  </span>
                  <span className="text-sm sm:text-base font-semibold truncate">
                    gabrielcaixeta01
                  </span>
                </div>
              </div>

              <span className="text-xs opacity-80 group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                ↗
              </span>
            </a>

            {/* Email (col-span 2 no lg) */}
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email"
              className={`${linkCardClass} lg:col-span-2 lg:row-start-2`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FiMail className="text-xl sm:text-[1.125rem] lg:text-[1.25rem] flex-shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs sm:text-sm truncate opacity-80">
                    {t.contact.email}
                  </span>
                  <span className="text-sm sm:text-base font-semibold truncate sm:truncate break-all sm:break-normal">
                    {email}
                  </span>
                </div>
              </div>

              <span
                className="
                  inline-flex items-center gap-2
                  text-xs font-medium
                  opacity-95
                  px-2.5 py-1 rounded-full
                  border border-[var(--cc-border)]
                  bg-white/6 dark:bg-white/7
                  flex-shrink-0
                "
              >
                {copied ? (
                  <>
                    <FiCheck className="text-base" />
                    Copiado
                  </>
                ) : (
                  t.contact.copy
                )}
              </span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}