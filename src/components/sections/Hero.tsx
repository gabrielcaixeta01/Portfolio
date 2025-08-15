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

  // Typewriter effect for job titles
  useEffect(() => {
    const jobTitles =
      language === "pt"
        ? ["desenvolvedor", "desenvolvedor front-end", "desenvolvedor back-end"]
        : ["developer", "front-end developer", "back-end developer"];

    const currentTitle = jobTitles[jobIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      // Typing animation
      if (currentJobTitle.length < currentTitle.length) {
        timeout = setTimeout(() => {
          setCurrentJobTitle(currentTitle.slice(0, currentJobTitle.length + 1));
        }, 100); // Speed of typing
      } else {
        // Finished typing, wait then start erasing
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Pause before erasing
      }
    } else {
      // Erasing animation
      if (currentJobTitle.length > 0) {
        timeout = setTimeout(() => {
          setCurrentJobTitle(currentJobTitle.slice(0, -1));
        }, 50); // Speed of erasing (faster than typing)
      } else {
        // Finished erasing, move to next job title
        setJobIndex((prev) => (prev + 1) % jobTitles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentJobTitle, isTyping, jobIndex, language]);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center z-10 max-w-4xl mx-auto"
      >
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 sm:mb-8"
        >
          <span className="welcome-badge inline-block px-6 py-3 rounded-full text-sm sm:text-base font-medium">
            {language === "pt"
              ? "✨ Bem-vindo ao meu universo digital"
              : "✨ Welcome to my digital universe"}
          </span>
        </motion.div>
        {/* Main Name - appears once and stays fixed */}
        <div className="mb-6 sm:mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="hero-name text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-tight"
          >
            {/* Always show single line with modern styling */}
            {name.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5 + index * 0.05,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
        </div>
        {/* Description Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-8 sm:mb-10"
        >
          <p className="hero-description text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto px-4">
            {language === "pt"
              ? "Criando experiências digitais extraordinárias que conectam pessoas e tecnologia"
              : "Creating extraordinary digital experiences that connect people and technology"}
          </p>
        </motion.div>
        {/* Typewriter job title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="typewriter-container relative flex items-center justify-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center">
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-800 dark:text-gray-200 mr-3">
              {language === "pt" ? "Eu sou " : "I'm a "}
            </span>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-wide bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {currentJobTitle}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-block ml-1 w-0.5 h-5 sm:h-6 md:h-7 bg-gradient-to-b from-blue-500 to-purple-600"
              />
            </h2>
          </div>
        </motion.div>
        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center mb-12 sm:mb-16"
        >
          <button
            onClick={() => {
              const section = document.getElementById("projetos");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
            className="hero-button-primary w-full sm:w-auto px-8 py-3 text-white font-semibold rounded-full"
          >
            {language === "pt" ? "🚀 Explorar Projetos" : "🚀 Explore Projects"}
          </button>
          <button
            onClick={() => {
              const section = document.getElementById("contato");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
            className="hero-button-secondary w-full sm:w-auto px-8 py-3 font-semibold rounded-full"
          >
            {language === "pt" ? "💬 Vamos Conversar" : "💬 Let's Talk"}
          </button>
        </motion.div>{" "}
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center text-gray-500 dark:text-gray-400"
          >
            <span className="text-sm mb-2 tracking-wide">
              {language === "pt" ? "Role para baixo" : "Scroll down"}
            </span>
            <svg
              className="w-6 h-6"
              fill="none"
              strokeWidth={2}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
