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
      // padding responsivo (aproxima as media queries originais)
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
        {/* card glass (substitui .contact-card) */}
        <motion.div
          variants={item}
          className="
            w-full max-w-[48rem]
            bg-[var(--cc-bg)]
            border border-[var(--cc-border)]
            shadow-[var(--cc-shadow)]
            backdrop-blur-lg
            rounded-xl
            transition duration-200 ease-in-out
            hover:shadow-lg 
            p-4 sm:p-6 md:p-10
            mx-auto
          "
        >
          {/* título (substitui .contact-title + responsividade) */}
          <motion.h2
            variants={item}
            className="
              text-[var(--cc-title)]
              text-3xl sm:text-4xl md:text-5xl
              font-bold tracking-tight
              mb-3 sm:mb-4
              text-center md:text-left
            "
          >
            {t.contact.title}
          </motion.h2>

          {/* descrição (substitui .contact-desc + responsividade) */}
          <motion.p
            variants={item}
            className="
              text-[var(--cc-text)]
              text-sm sm:text-base md:text-lg
              leading-relaxed
              mb-6 sm:mb-8
              text-justify md:text-left
              px-1 sm:px-0
            "
          >
            {t.contact.description}
          </motion.p>

          {/* GRID de links (substitui .contact-links-grid + media queries) */}
          <motion.div
            variants={item}
            className="
              grid grid-cols-1 gap-3
              lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-6
              xl:gap-8
            "
          >
            {/* LINKEDIN (equivale a .contact-link #1) */}
            <a
              href="https://www.linkedin.com/in/gabriel-caixeta-romero"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="
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
                hover:translate-x-[1px] transition-transform
                lg:row-start-1
              "
            >
              {/* bloco esquerdo (ícone + textos) → substitui .contact-content e estrutura flex */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FaLinkedin className="text-xl sm:text-[1.125rem] lg:text-[1.25rem] flex-shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs sm:text-sm truncate opacity-80">
                    {t.contact.linkedin}
                  </span>
                  <span className="text-sm sm:text-base font-medium truncate">
                    gabriel-caixeta-romero
                  </span>
                </div>
              </div>

              {/* ação (↗) → substitui .contact-action */}
              <span className="text-xs opacity-80 group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                ↗
              </span>
            </a>

            {/* GITHUB (equivale a .contact-link #2) */}
            <a
              href="https://github.com/gabrielcaixeta01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="
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
                hover:translate-x-[1px] transition-transform
                lg:row-start-1
              "
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FaGithub className="text-xl sm:text-[1.125rem] lg:text-[1.25rem] flex-shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs sm:text-sm truncate opacity-80">
                    {t.contact.github}
                  </span>
                  <span className="text-sm sm:text-base font-medium truncate">
                    gabrielcaixeta01
                  </span>
                </div>
              </div>
              <span className="text-xs opacity-80 group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                ↗
              </span>
            </a>

            {/* EMAIL (equivale a .contact-link #3; em lg: ocupar duas colunas) */}
            <button
              onClick={copyEmail}
              aria-label="Copy email"
              className="
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
                transition
                lg:col-span-2 lg:row-start-2
              "
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FiMail className="text-xl sm:text-[1.125rem] lg:text-[1.25rem] flex-shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs sm:text-sm truncate opacity-80">
                    {t.contact.email}
                  </span>
                  {/* em telas muito pequenas, permitir quebrar o email */}
                  <span className="text-sm sm:text-base font-medium truncate sm:truncate break-all sm:break-normal">
                    {email}
                  </span>
                </div>
              </div>
              <span className="text-xs opacity-80 flex-shrink-0">
                {copied ? <FiCheck /> : t.contact.copy}
              </span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}