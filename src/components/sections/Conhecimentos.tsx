"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { useState, useEffect } from "react";
import { FaReact, FaNode, FaPython, FaGitAlt } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNestjs,
} from "react-icons/si";

interface SkillData {
  name: string;
  description: string;
  experience: number;
  maxExperience: number;
}

// Skill Icon Component
const SkillIcon = ({ skillName }: { skillName: string }) => {
  const iconProps = { className: "w-16 h-16" };

  switch (skillName.toLowerCase()) {
    case "react":
      return <FaReact {...iconProps} className="w-16 h-16 text-blue-400" />;
    case "next.js":
      return (
        <SiNextdotjs
          {...iconProps}
          className="w-16 h-16 text-white dark:text-black"
        />
      );
    case "typescript":
      return (
        <SiTypescript {...iconProps} className="w-16 h-16 text-blue-600" />
      );
    case "tailwind css":
      return (
        <SiTailwindcss {...iconProps} className="w-16 h-16 text-cyan-400" />
      );
    case "node.js":
      return <FaNode {...iconProps} className="w-16 h-16 text-green-500" />;
    case "nestjs":
      return <SiNestjs {...iconProps} className="w-16 h-16 text-red-500" />;
    case "python":
      return <FaPython {...iconProps} className="w-16 h-16 text-yellow-400" />;
    case "git":
      return <FaGitAlt {...iconProps} className="w-16 h-16 text-orange-500" />;
    default:
      return <div {...iconProps} className="w-16 h-16 bg-gray-400 rounded" />;
  }
};

// Custom Arrow Components
const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);

export default function Conhecimentos() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const skills: SkillData[] = t.skills.skillsData;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % skills.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, skills.length]);

  const nextSkill = () => {
    setCurrentIndex((prev) => (prev + 1) % skills.length);
    setIsAutoPlaying(false);
  };

  const prevSkill = () => {
    setCurrentIndex((prev) => (prev - 1 + skills.length) % skills.length);
    setIsAutoPlaying(false);
  };

  const goToSkill = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentSkill = skills[currentIndex];
  const progressPercentage =
    (currentSkill.experience / currentSkill.maxExperience) * 100;

  return (
    <section
      id="conhecimentos"
      className="scroll-mt-24 flex items-center justify-center min-h-screen px-4 py-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-4xl w-full"
      >
        <h2 className="text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          {t.skills.title}
        </h2>
        <p className="text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
          {t.skills.description}
        </p>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSkill}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
            aria-label="Previous skill"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <button
            onClick={nextSkill}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
            aria-label="Next skill"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Skill Card */}
          <div className="relative h-96 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-2xl p-8 max-w-md w-full mx-4">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <SkillIcon skillName={currentSkill.name} />
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    {currentSkill.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 text-center">
                    {currentSkill.description}
                  </p>

                  {/* Experience Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t.skills.experienceLabel}</span>
                      <span>
                        {currentSkill.experience} {t.skills.yearsLabel}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{
                          duration: 0.8,
                          delay: 0.2,
                          ease: "easeOut",
                        }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {skills.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSkill(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-blue-500 scale-110"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to skill ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-xs text-gray-400 hover:text-gray-300 transition-colors"
            >
              {isAutoPlaying
                ? `⏸️ ${t.skills.pauseLabel}`
                : `▶️ ${t.skills.playLabel}`}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
