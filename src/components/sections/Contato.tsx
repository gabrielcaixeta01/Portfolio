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
        <motion.div variants={item} className="contact-card p-8 md:p-10">
          <motion.h2
            variants={item}
            className="contact-title text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            {t.contact.title}
          </motion.h2>

          <motion.p
            variants={item}
            className="contact-desc text-base md:text-lg leading-relaxed mb-8"
          >
            {t.contact.description}
          </motion.p>

          {/* links */}
          <motion.div variants={item} className="contact-links-grid">
            <a
              href="https://www.linkedin.com/in/gabriel-caixeta-romero"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link group flex items-center justify-between gap-3"
              aria-label="LinkedIn"
            >
              <div className="contact-content flex items-center gap-3 min-w-0 flex-1">
                <FaLinkedin className="contact-icon text-xl flex-shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="contact-label text-sm">
                    {t.contact.linkedin}
                  </span>
                  <span className="contact-value text-sm font-medium truncate">
                    gabriel-caixeta-romero
                  </span>
                </div>
              </div>
              <span className="contact-action contact-label text-xs group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                ↗
              </span>
            </a>

            <a
              href="https://github.com/gabrielcaixeta01"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link group flex items-center justify-between gap-3"
              aria-label="GitHub"
            >
              <div className="contact-content flex items-center gap-3 min-w-0 flex-1">
                <FaGithub className="contact-icon text-xl flex-shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="contact-label text-sm">
                    {t.contact.github}
                  </span>
                  <span className="contact-value text-sm font-medium truncate">
                    gabrielcaixeta01
                  </span>
                </div>
              </div>
              <span className="contact-action contact-label text-xs group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                ↗
              </span>
            </a>

            <button
              onClick={copyEmail}
              className="contact-link group flex items-center justify-between gap-3"
              aria-label="Copy email"
            >
              <div className="contact-content flex items-center gap-3 min-w-0 flex-1">
                <FiMail className="contact-icon text-xl flex-shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="contact-label text-sm">
                    {t.contact.email}
                  </span>
                  <span className="contact-value text-sm font-medium truncate">
                    {email}
                  </span>
                </div>
              </div>
              <span className="contact-action contact-label text-xs flex-shrink-0">
                {copied ? <FiCheck /> : t.contact.copy}
              </span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
