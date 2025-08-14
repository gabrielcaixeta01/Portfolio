"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { useState, useEffect, useMemo, useRef } from "react";
import { FaReact, FaNode, FaPython, FaGitAlt } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNestjs,
  SiCplusplus,
  SiJupyter,
  SiGooglecolab,
  SiFigma,
} from "react-icons/si";

interface SkillData {
  name: string;
  description: string;
  experience: number;
  maxExperience: number;
}

// =======================
// Skill Icon Component
// =======================
const SkillIcon = ({ skillName }: { skillName: string }) => {
  const base = "w-16 h-16";
  const lowerName = skillName.toLowerCase();

  switch (lowerName) {
    case "react":
      return <FaReact className={`${base} text-[#61DAFB]`} />;
    case "next.js":
    case "nextjs":
    case "next":
      return (
        <div
          className={`${base} rounded-lg bg-black dark:bg-white flex items-center justify-center`}
        >
          <SiNextdotjs className="w-12 h-12 text-white dark:text-black" />
        </div>
      );
    case "typescript":
      return <SiTypescript className={`${base} text-[#3178C6]`} />;
    case "tailwind css":
    case "tailwind":
      return <SiTailwindcss className={`${base} text-[#38BDF8]`} />;
    case "node.js":
    case "node":
      return <FaNode className={`${base} text-[#68A063]`} />;
    case "nestjs":
      return <SiNestjs className={`${base} text-[#E0234E]`} />;
    case "python":
      return <FaPython className={`${base} text-[#FFD43B]`} />;
    case "git":
      return <FaGitAlt className={`${base} text-[#F05032]`} />;

    // ======= Novas skills =======
    case "c++":
    case "cplusplus":
      return <SiCplusplus className={`${base} text-[#00599C]`} />;
    case "jupyter":
      return <SiJupyter className={`${base} text-[#F37726]`} />;
    case "google colab":
    case "colab":
      return <SiGooglecolab className={`${base} text-[#F9AB00]`} />;
    case "figma":
      return <SiFigma className={`${base} text-[#F24E1E]`} />;

    default:
      return (
        <div
          className={`${base} rounded bg-gray-400 flex items-center justify-center text-white font-bold text-xs`}
        >
          {skillName.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};

// =======================
// Ícones de navegação
// =======================
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
      d="M15.75 19.5 8.25 12l7.5-7.5"
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
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </svg>
);

// =======================
// Extras desejados (fora do component)
// =======================
const desiredExtras: SkillData[] = [
  {
    name: "C++",
    description: "Algoritmos, estruturas de dados e alto desempenho.",
    experience: 2,
    maxExperience: 5,
  },
  {
    name: "Jupyter",
    description: "Prototipagem e análise exploratória com notebooks.",
    experience: 3,
    maxExperience: 5,
  },
  {
    name: "Google Colab",
    description: "Notebooks em nuvem para ML com GPU.",
    experience: 3,
    maxExperience: 5,
  },
  {
    name: "Figma",
    description: "UI design, prototipagem e handoff.",
    experience: 3,
    maxExperience: 5,
  },
];

export default function Conhecimentos() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // ==== autoplay com pausa temporária após interação ====
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const AUTOPLAY_MS = 4000; // intervalo de rolagem
  const PAUSE_MS = 5500; // tempo que fica pausado após interação

  // Base + extras (sem duplicar)
  const baseSkills: SkillData[] = t.skills.skillsData;
  const skills: SkillData[] = useMemo(() => {
    const existing = new Set(
      baseSkills.map((s) => s.name.toLowerCase().trim())
    );
    const extrasFiltered = desiredExtras.filter(
      (s) => !existing.has(s.name.toLowerCase().trim())
    );
    return [...baseSkills, ...extrasFiltered];
  }, [baseSkills]);

  // Inicia / reinicia intervalo quando não estiver pausado
  useEffect(() => {
    if (skills.length === 0) return;

    // limpa anterior
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % skills.length);
      }, AUTOPLAY_MS);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, skills.length]);

  const temporarilyPause = () => {
    // limpa possível timer anterior
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    setIsPaused(true);
    pauseTimerRef.current = setTimeout(() => setIsPaused(false), PAUSE_MS);
  };

  // limpa timers ao desmontar
  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Handlers de interação (pausam e navegam)
  const nextSkill = () => {
    setCurrentIndex((prev) => (prev + 1) % skills.length);
    temporarilyPause();
  };
  const prevSkill = () => {
    setCurrentIndex((prev) => (prev - 1 + skills.length) % skills.length);
    temporarilyPause();
  };
  const goToSkill = (index: number) => {
    setCurrentIndex(index);
    temporarilyPause();
  };

  const currentSkill = skills[currentIndex] ?? {
    name: "",
    description: "",
    experience: 0,
    maxExperience: 1,
  };
  const progressPercentage =
    currentSkill.maxExperience > 0
      ? (currentSkill.experience / currentSkill.maxExperience) * 100
      : 0;

  return (
    <section
      id="conhecimentos"
      className="scroll-mt-18 flex items-center justify-center min-h-screen px-4 py-16"
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
                  <p className="skills-description text-sm leading-relaxed mb-6 text-center">
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

          {/* Removido o botão de autoplay com emojis; pausa é automática nas interações */}
          {/* Se quiser um feedback sutil, dá pra mostrar um chip discreto quando pausado: */}
          {/* {isPaused && (
            <div className="mt-4 text-xs text-gray-400">
              {t.skills.resumingSoonLabel ?? "Retomando automaticamente..."}
            </div>
          )} */}
        </div>
      </motion.div>
    </section>
  );
}
