"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { useState, useEffect } from "react";

export default function Hero() {
  const { language } = useLanguage();
  const [currentJobTitle, setCurrentJobTitle] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [jobIndex, setJobIndex] = useState(0);

  const name = "Gabriel Caixeta";

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
        }, 100);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (currentJobTitle.length > 0) {
        timeout = setTimeout(() => setCurrentJobTitle(currentJobTitle.slice(0, -1)), 50);
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
      className={`relative overflow-hidden min-h-screen flex items-center justify-center px-4 sm:px-4 py-8`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`text-center z-10 max-w-4xl mx-auto`}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`mb-6 sm:mb-8`}
        >
          <span
            className={`inline-block rounded-full text-sm sm:text-base font-medium px-6 py-3 bg-white/12 backdrop-blur-2xl border border-white/25 shadow-[0_8px_32px_rgba(99,102,241,0.15)] text-blue-700 animate-[float_6s_ease-in-out_infinite] dark:bg-black/25 dark:border-white/10 dark:text-blue-400`}
          >
            {language === "pt"
              ? "✨ Bem-vindo ao meu universo digital"
              : "✨ Welcome to my digital universe"}
          </span>
        </motion.div>

        {/* Nome */}
        <div className={`mb-6 sm:mb-8`}>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className={`font-bold tracking-tight leading-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl whitespace-nowrap truncate drop-shadow-[0_4px_12px_rgba(99,102,241,0.15)]`}
            style={{
              backgroundImage: "linear-gradient(135deg,#00ccff 0%,#bb00ff 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              backgroundSize: "200% 200%",
            }}
          >
            <motion.span
              animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              style={{
                display: "inline-block",
                backgroundImage: "inherit",
                WebkitBackgroundClip: "inherit",
                backgroundClip: "inherit",
                color: "inherit",
                backgroundSize: "inherit",
              }}
            >
              {name.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.6, ease: "easeOut" }}
                  className={`inline-block`}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>
        </div>

        {/* Descrição */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className={`mb-8 sm:mb-10`}
        >
          <p className={`text-lg sm:text-xl md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto px-4`}>
            {language === "pt"
              ? "Criando experiências digitais extraordinárias que conectam pessoas e tecnologia"
              : "Creating extraordinary digital experiences that connect people and technology"}
          </p>
        </motion.div>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className={`my-8 sm:my-12 relative flex items-center justify-center`}
        >
          <div className={`flex items-center justify-center`}>
            <span className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mr-3`}>
              {language === "pt" ? "Eu sou " : "I'm a "}
            </span>
            <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-wide bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent`}>
              {currentJobTitle}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className={`inline-block ml-1 w-0.5 h-5 sm:h-6 md:h-7 bg-gradient-to-b from-blue-500 to-purple-600`}
              />
            </h2>
          </div>
        </motion.div>

        {/* Botões */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className={`flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center mb-12 sm:mb-16`}
        >
          <motion.button
            whileHover={{ y: -3, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={() => document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" })}
            className={`w-full sm:w-auto rounded-full text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 shadow-[0_10px_30px_rgba(99,102,241,0.25)]`}
            style={{ backgroundImage: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)", backgroundSize: "200% 200%" }}
          >
            
              {language === "pt" ? "🚀 Explorar Projetos" : "🚀 Explore Projects"}
            
          </motion.button>

          <motion.button
            whileHover={{ y: -3, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
            className={`w-full sm:w-auto rounded-full font-semibold px-6 sm:px-8 py-2.5 sm:py-3 bg-white/12 backdrop-blur-2xl border-2 border-white/50 shadow-lg hover:bg-white/20 dark:hover:bg-black/35 hover:border-indigo-300/40 transition-colors`}
          >
            {language === "pt" ? "💬 Vamos Conversar" : "💬 Let's Talk"}
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.8 }}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2`}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={`flex flex-col items-center text-gray-500 dark:text-gray-400`}
          >
            <span className={`text-sm mb-2 tracking-wide`}>
              {language === "pt" ? "Role para baixo" : "Scroll down"}
            </span>
            <svg className={`w-6 h-6`} fill="none" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* keyframes “float” locais */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </section>
  );
}