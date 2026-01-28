"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Hero() {
  const { language } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentJobTitle, setCurrentJobTitle] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [jobIndex, setJobIndex] = useState(0);

  const name = "Gabriel Caixeta";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const jobTitles =
      language === "pt"
        ? ["desenvolvedor", "desenvolvedor front-end", "desenvolvedor back-end"]
        : ["developer", "front-end developer", "back-end developer"];

    const currentTitle = jobTitles[jobIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (currentJobTitle.length < currentTitle.length) {
        timeout = setTimeout(() => {
          setCurrentJobTitle(currentTitle.slice(0, currentJobTitle.length + 1));
        }, 90);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 1600);
      }
    } else {
      if (currentJobTitle.length > 0) {
        timeout = setTimeout(() => setCurrentJobTitle(currentJobTitle.slice(0, -1)), 45);
      } else {
        setJobIndex((prev) => (prev + 1) % jobTitles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentJobTitle, isTyping, jobIndex, language]);

  return (
    <section
      id="hero"
      className="
        relative overflow-hidden min-h-[100svh]
        flex items-center justify-center px-4 py-10
      "
    >
      {/* Overlay pra "domar" os particles e dar firmeza (apenas em dark mode) */}
      {mounted && resolvedTheme === "dark" && (
        <>
          <div
            className="
              pointer-events-none absolute inset-0 z-[1]
              bg-[radial-gradient(60%_60%_at_50%_30%,rgba(99,102,241,0.18),transparent_60%)]
              [mask-image:radial-gradient(70%_70%_at_50%_35%,black,transparent_78%)]
            "
          />
          <div
            className="
              pointer-events-none absolute inset-0 z-[1]
              bg-gradient-to-b from-black/40 via-black/40 to-black/65
            "
          />
        </>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 w-full max-w-5xl mx-auto text-center"
      >
        {/* Badge (menos “inflado”) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-7 sm:mb-9"
        >
          <span
            className="
              inline-flex items-center gap-2
              rounded-full px-5 py-2.5
              text-xs sm:text-sm font-light
              bg-[var(--pc-bg)] border border-[var(--pc-border)]
              text-[var(--pc-title)]
              backdrop-blur-xl
              uppercase tracking-widest
            "
          >
            <span className="inline-block h-1.5  w-1.5 rounded-full bg-indigo-400" />
            {language === "pt" ? "Bem-vindo ao meu portfólio" : "Welcome to my portfolio"}
          </span>
        </motion.div>

        {/* Nome (mais moderno e firme) */}
        <div className="mb-6 sm:mb-7">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
            className="
              font-thin tracking-[-0.04em] leading-[0.92]
              text-5xl sm:text-7xl md:text-8xl lg:text-[96px]
              text-transparent bg-clip-text
              drop-shadow-[0_10px_40px_rgba(99,102,241,0.14)]
            "
            style={{
              backgroundImage: "linear-gradient(135deg,#3b82f6 0%,#a855f7 55%,#22d3ee 110%)",
              backgroundSize: "180% 180%",
            }}
          >
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              style={{
                display: "inline-block",
                backgroundImage: "inherit",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                backgroundSize: "inherit",
              }}
            >
              {name}
            </motion.span>
          </motion.h1>
        </div>

        {/* Descrição (mais “produto”, menos frase genérica) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mb-7 sm:mb-9"
        >
          <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl font-light tracking-wide leading-relaxed">
            {language === "pt"
              ? "Interfaces rápidas, design consistente e código bem estruturado."
              : "Fast interfaces, consistent design, and well-structured code."}
          </p>
        </motion.div>

        {/* Typewriter (menos peso, mais elegante) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="my-8 sm:my-10 flex items-center justify-center"
        >
          <span className="text-lg sm:text-xl md:text-2xl font-light mr-3">
            {language === "pt" ? "Eu sou" : "I'm a"}
          </span>

          <h2 className="text-lg sm:text-xl md:text-2xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            {currentJobTitle}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block ml-1 w-px h-5 sm:h-6 md:h-7 bg-gradient-to-b from-blue-400 to-purple-400"
            />
          </h2>
        </motion.div>

        {/* Botões (sem emoji = + firmeza) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center mb-12 sm:mb-16"
        >
          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
            onClick={() => document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" })}
            className="
              w-full sm:w-auto rounded-full
              px-7 py-3
              text-sm sm:text-base font-medium
              bg-gradient-to-r from-indigo-500 to-purple-600
              shadow-[0_14px_40px_-18px_rgba(99,102,241,0.65)]
              border border-white/10
            "
          >
            {language === "pt" ? "Explorar projetos" : "Explore projects"}
          </motion.button>

          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 450, damping: 32 }}
            onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
            className="
              w-full sm:w-auto rounded-full
              px-7 py-3
              text-sm sm:text-base font-medium
              bg-[var(--pc-bg)] border border-[var(--pc-border)]
              text-[var(--pc-title)]
              backdrop-blur-xl
              hover:shadow-[0_8px_20px_rgba(2,6,23,0.08)]
              transition-all duration-200
            "
          >
            {language === "pt" ? "Vamos conversar" : "Let's talk"}
          </motion.button>
        </motion.div>

        
      </motion.div>
    </section>
  );
}