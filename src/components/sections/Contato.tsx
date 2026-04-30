"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import SplitText from "@/components/SplitText";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FiMail, FiCheck, FiCopy, FiSend } from "react-icons/fi";

// Create a free account at https://formspree.io and paste your endpoint here
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
  viewport: { once: true as const },
});

// ─── Contact row ──────────────────────────────────────────────────────────────
interface RowProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  href?: string;
  onCopy?: () => void;
  isCopied?: boolean;
  delay: number;
  copyLabel: string;
  copiedLabel: string;
}

function ContactRow({ icon, iconBg, label, value, href, onCopy, isCopied, delay, copyLabel, copiedLabel }: RowProps) {
  const inner = (
    <div className="
      group relative flex items-center gap-4
      rounded-xl px-4 py-3.5 -mx-4
      border border-transparent
      hover:bg-[var(--pc-bg)] hover:border-[var(--pc-border)]
      transition-all duration-200 cursor-pointer
    ">
      {/* Left accent on hover */}
      <div className="
        absolute left-0 top-3 bottom-3 w-[2.5px] rounded-full
        bg-indigo-500/0 group-hover:bg-indigo-500/50
        transition-all duration-200
      " />

      {/* Icon bubble */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[10.5px] uppercase tracking-[0.18em] font-medium text-[var(--cc-text)] opacity-50 mb-0.5">
          {label}
        </p>
        <p className="text-sm font-semibold text-[var(--cc-title)] truncate leading-tight">{value}</p>
      </div>

      {/* Action */}
      {onCopy ? (
        <span className={`
          flex-shrink-0 inline-flex items-center gap-1.5
          text-[11px] font-medium px-2.5 py-1 rounded-full
          border border-[var(--cc-border)] transition-all duration-150
          ${isCopied
            ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
            : "text-[var(--cc-text)] opacity-60 group-hover:opacity-100"
          }
        `}>
          {isCopied
            ? <><FiCheck className="w-3 h-3" />{copiedLabel}</>
            : <><FiCopy className="w-3 h-3" />{copyLabel}</>
          }
        </span>
      ) : (
        <span className="flex-shrink-0 text-sm text-[var(--cc-text)] opacity-35 group-hover:opacity-75 group-hover:translate-x-0.5 transition-all duration-150">
          ↗
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <motion.a {...fu(delay)} href={href} target="_blank" rel="noopener noreferrer me" className="block">
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button {...fu(delay)} type="button" onClick={onCopy} className="w-full text-left">
      {inner}
    </motion.button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Contato() {
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const emailAddress = "gabrielcaixetaromero@gmail.com";
  const isConfigured = !FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
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

  const inputClass = `
    w-full rounded-xl px-4 py-2.5
    text-sm text-[var(--cc-title)]
    bg-[var(--pc-bg)] border border-[var(--pc-border)]
    placeholder:text-[var(--cc-text)] placeholder:opacity-40
    focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20
    transition duration-150
  `;

  const pt = language === "pt";

  return (
    <section id="contato" className="scroll-mt-20 px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">

        {/* ── Layout: split on desktop ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 sm:gap-12 lg:gap-16 items-start">

          {/* ── LEFT: CTA ───────────────────────────────────────────────────── */}
          <div>
            <motion.div {...fu(0)}>
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-indigo-500 dark:text-indigo-400">
                {pt ? "contato" : "contact"}
              </span>
              <h2 className="mt-1.5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.045em] leading-[1.05] text-[var(--cc-title)]">
                <SplitText text={t.contact.title} />
              </h2>
            </motion.div>

            <motion.p {...fu(0.1)} className="mt-3 sm:mt-4 text-sm sm:text-base text-[var(--cc-text)] opacity-65 leading-relaxed">
              {t.contact.description}
            </motion.p>
          </div>

          {/* ── RIGHT: links + optional form ────────────────────────────────── */}
          <div>

            {/* Form (only when Formspree is configured) */}
            {isConfigured && (
              <motion.form
                {...fu(0.1)}
                onSubmit={handleSubmit}
                className="mb-8 flex flex-col gap-2.5"
              >
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text" required aria-label="Nome"
                    placeholder={pt ? "Seu nome" : "Your name"}
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className={inputClass}
                  />
                  <input
                    type="email" required aria-label="Email"
                    placeholder={pt ? "Seu e-mail" : "Your email"}
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <textarea
                  required rows={4} aria-label="Mensagem"
                  placeholder={pt ? "Sua mensagem..." : "Your message..."}
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  className={`${inputClass} resize-none`}
                />
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={formState === "sending" || formState === "sent"}
                    className="
                      inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                      text-sm font-semibold text-white
                      bg-gradient-to-r from-indigo-500 to-purple-600
                      shadow-[0_6px_20px_-8px_rgba(99,102,241,0.6)]
                      disabled:opacity-60 disabled:cursor-not-allowed
                      transition-opacity duration-150
                    "
                  >
                    {formState === "sending" && (pt ? "Enviando…" : "Sending…")}
                    {formState === "sent" && <><FiCheck className="w-4 h-4" />{pt ? "Enviado!" : "Sent!"}</>}
                    {(formState === "idle" || formState === "error") && <><FiSend className="w-4 h-4" />{pt ? "Enviar mensagem" : "Send message"}</>}
                  </button>
                  {formState === "error" && (
                    <span className="text-xs text-red-400">
                      {pt ? "Erro ao enviar." : "Send failed."}
                    </span>
                  )}
                </div>
              </motion.form>
            )}

            {/* Divider between form and links */}
            {isConfigured && (
              <motion.div {...fu(0.18)} className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-[var(--pc-border)]" />
                <span className="text-[10px] uppercase tracking-widest text-[var(--cc-text)] opacity-40">
                  {pt ? "ou" : "or"}
                </span>
                <div className="flex-1 h-px bg-[var(--pc-border)]" />
              </motion.div>
            )}

            {/* Contact rows */}
            <div className="space-y-1">
              <ContactRow
                delay={isConfigured ? 0.24 : 0.12}
                icon={<FaLinkedin className="w-4.5 h-4.5 text-[#0A66C2]" />}
                iconBg="bg-blue-500/10 border border-blue-500/15"
                label="LinkedIn"
                value="gabriel-caixeta-romero"
                href="https://www.linkedin.com/in/gabriel-caixeta-romero"
                copyLabel=""
                copiedLabel=""
              />
              <ContactRow
                delay={isConfigured ? 0.3 : 0.18}
                icon={<FaGithub className="w-4.5 h-4.5 text-[var(--cc-title)]" />}
                iconBg="bg-[var(--pc-bg)] border border-[var(--pc-border)]"
                label="GitHub"
                value="gabrielcaixeta01"
                href="https://github.com/gabrielcaixeta01"
                copyLabel=""
                copiedLabel=""
              />
              <ContactRow
                delay={isConfigured ? 0.36 : 0.24}
                icon={<FiMail className="w-4 h-4 text-indigo-400" />}
                iconBg="bg-indigo-500/10 border border-indigo-500/15"
                label={t.contact.email}
                value={emailAddress}
                onCopy={copyEmail}
                isCopied={copied}
                copyLabel={t.contact.copy}
                copiedLabel={pt ? "Copiado!" : "Copied!"}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
