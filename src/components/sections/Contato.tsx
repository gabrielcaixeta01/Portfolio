"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FiMail, FiCheck, FiSend } from "react-icons/fi";

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

// Create a free form at https://formspree.io and paste your endpoint here
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function Contato() {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const email = "gabrielcaixetaromero@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormState("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

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

  const inputClass = `
    w-full rounded-xl px-4 py-3
    text-sm text-[var(--cc-title)]
    bg-[var(--cc-bg)] border border-[var(--cc-border)]
    placeholder:text-[var(--cc-text)] placeholder:opacity-50
    focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30
    transition duration-150
  `;

  const isConfigured = !FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID");

  return (
    <section
      id="contato"
      className="
        relative scroll-mt-5 flex items-center justify-center
        px-2 sm:px-3 md:px-4
        py-6 sm:py-8 md:py-16
      "
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
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
              text-left
              px-1 sm:px-0
            "
          >
            {t.contact.description}
          </motion.p>

          {/* Formulário */}
          {isConfigured && (
            <motion.form
              variants={item}
              onSubmit={handleSubmit}
              className="mb-6 sm:mb-8 flex flex-col gap-3"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  placeholder={language === "pt" ? "Seu nome" : "Your name"}
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  className={inputClass}
                  aria-label="Nome"
                />
                <input
                  type="email"
                  required
                  placeholder={language === "pt" ? "Seu e-mail" : "Your email"}
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  className={inputClass}
                  aria-label="Email"
                />
              </div>
              <textarea
                required
                rows={4}
                placeholder={language === "pt" ? "Sua mensagem..." : "Your message..."}
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                className={`${inputClass} resize-none`}
                aria-label="Mensagem"
              />
              <div className="flex items-center gap-3">
                <motion.button
                  type="submit"
                  disabled={formState === "sending" || formState === "sent"}
                  whileHover={{ y: -1, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  className="
                    inline-flex items-center gap-2
                    px-6 py-2.5
                    text-sm font-semibold rounded-xl
                    bg-gradient-to-r from-indigo-500 to-purple-600
                    shadow-[0_8px_24px_-10px_rgba(99,102,241,0.6)]
                    disabled:opacity-60 disabled:cursor-not-allowed
                    transition-all duration-200
                  "
                >
                  {formState === "sending" ? (
                    <>{language === "pt" ? "Enviando..." : "Sending..."}</>
                  ) : formState === "sent" ? (
                    <><FiCheck className="w-4 h-4" /> {language === "pt" ? "Enviado!" : "Sent!"}</>
                  ) : (
                    <><FiSend className="w-4 h-4" /> {language === "pt" ? "Enviar mensagem" : "Send message"}</>
                  )}
                </motion.button>
                {formState === "error" && (
                  <span className="text-sm text-red-400">
                    {language === "pt" ? "Erro ao enviar. Tente por e-mail." : "Send failed. Try email."}
                  </span>
                )}
              </div>
            </motion.form>
          )}

          {/* Divisor */}
          {isConfigured && (
            <motion.div variants={item} className="relative flex items-center gap-4 mb-6 sm:mb-8">
              <div className="flex-1 h-px bg-[var(--cc-border)]" />
              <span className="text-xs text-[var(--cc-text)] opacity-50 uppercase tracking-widest">
                {language === "pt" ? "ou" : "or"}
              </span>
              <div className="flex-1 h-px bg-[var(--cc-border)]" />
            </motion.div>
          )}

          {/* Grid de links */}
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
              aria-label="Abrir LinkedIn de Gabriel Caixeta"
              className={`${linkCardClass} lg:row-start-1`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FaLinkedin className="text-xl sm:text-[1.125rem] lg:text-[1.25rem] flex-shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs sm:text-sm truncate opacity-80">{t.contact.linkedin}</span>
                  <span className="text-sm sm:text-base font-semibold truncate">gabriel-caixeta-romero</span>
                </div>
              </div>
              <span className="text-xs opacity-80 group-hover:translate-x-0.5 transition-transform flex-shrink-0">↗</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/gabrielcaixeta01"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="Abrir GitHub de Gabriel Caixeta"
              className={`${linkCardClass} lg:row-start-1`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FaGithub className="text-xl sm:text-[1.125rem] lg:text-[1.25rem] flex-shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs sm:text-sm truncate opacity-80">{t.contact.github}</span>
                  <span className="text-sm sm:text-base font-semibold truncate">gabrielcaixeta01</span>
                </div>
              </div>
              <span className="text-xs opacity-80 group-hover:translate-x-0.5 transition-transform flex-shrink-0">↗</span>
            </a>

            {/* Email */}
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copiar endereço de e-mail"
              className={`${linkCardClass} lg:col-span-2 lg:row-start-2`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <FiMail className="text-xl sm:text-[1.125rem] lg:text-[1.25rem] flex-shrink-0" />
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs sm:text-sm truncate opacity-80">{t.contact.email}</span>
                  <span className="text-sm sm:text-base font-semibold truncate sm:truncate break-all sm:break-normal">
                    {email}
                  </span>
                </div>
              </div>
              <span
                className="
                  inline-flex items-center gap-2
                  text-xs font-medium opacity-95
                  px-2.5 py-1 rounded-full
                  border border-[var(--cc-border)]
                  bg-white/6 dark:bg-white/7
                  flex-shrink-0
                "
              >
                {copied ? (
                  <><FiCheck className="text-base" /> {language === "pt" ? "Copiado" : "Copied"}</>
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
