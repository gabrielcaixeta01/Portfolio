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
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center z-10"
      >
        {/* Main Name - appears once and stays fixed */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight"
          >
            {name.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
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

        {/* Typewriter job title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="relative h-20 flex items-center justify-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-wider text-gray-600 dark:text-gray-300">
            {currentJobTitle}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block ml-1 w-0.5 h-8 bg-blue-500"
            />
          </h2>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
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
