"use client";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { useMemo } from "react";
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
import { Carousel } from "@/components/Carousel"; // <- ajuste o caminho

interface SkillData {
  name: string;
  description: string;
  experience: number;
  maxExperience: number;
}

/* =======================
   Skill Icon
======================= */
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
        <div className={`${base} rounded-lg bg-black dark:bg-white flex items-center justify-center`}>
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
        <div className={`${base} rounded bg-gray-400 flex items-center justify-center text-white font-bold text-xs`}>
          {skillName.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};

/* =======================
   Extras (não duplicar)
======================= */
const desiredExtras: SkillData[] = [
  { name: "C++", description: "Algoritmos, estruturas de dados e alto desempenho.", experience: 2, maxExperience: 5 },
  { name: "Jupyter", description: "Prototipagem e análise exploratória com notebooks.", experience: 3, maxExperience: 5 },
  { name: "Google Colab", description: "Notebooks em nuvem para ML com GPU.", experience: 3, maxExperience: 5 },
  { name: "Figma", description: "UI design, prototipagem e handoff.", experience: 3, maxExperience: 5 },
];

export default function Conhecimentos() {
  const { t } = useLanguage();

  const baseSkills: SkillData[] = t.skills.skillsData;
  const skills: SkillData[] = useMemo(() => {
    const existing = new Set(baseSkills.map((s) => s.name.toLowerCase().trim()));
    const extrasFiltered = desiredExtras.filter((s) => !existing.has(s.name.toLowerCase().trim()));
    return [...baseSkills, ...extrasFiltered];
  }, [baseSkills]);

  return (
    <section
      id="conhecimentos"
      className="
        scroll-mt-18 flex items-center justify-center min-h-screen
        px-4 md:px-4
        py-8 md:py-16
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-6xl w-full"
      >
        <h2
          className="
            text-[var(--cc-title)] dark:text-[var(--cc-title)]
            text-3xl sm:text-4xl lg:text-6xl
            font-bold tracking-tight
            mb-4 sm:mb-6
          "
        >
          {t.skills.title}
        </h2>

        <p
          className="
            text-[var(--cc-text)] dark:text-[var(--cc-text)]
            text-sm sm:text-base
            leading-relaxed
            mb-8 sm:mb-12
            max-w-2xl mx-auto
            px-2 sm:px-0
            text-justify
          "
        >
          {t.skills.description}
        </p>

        {/* === Usa o Carousel fornecido === */}
        <div className="relative">
          <Carousel visible={3}>
            {skills.map((s, i) => {
              const progress =
                s.maxExperience > 0 ? (s.experience / s.maxExperience) * 100 : 0;

              return (
                <article
                  key={i}
                  className="
                    h-[360px] md:h-[340px]
                    bg-white/90 border border-gray-200
                    dark:bg-white/10 dark:border-white/20
                    rounded-2xl
                    p-4 sm:p-6 md:p-8
                    w-full
                    transition duration-200 ease-in-out
                    hover:-translate-y-1 hover:shadow-lg
                  "
                >
                  <div className="flex flex-col items-center text-center justify-between h-full">
                    {/* Ícone + título + descrição */}
                    <div className="flex flex-col items-center gap-2 mb-3">
                      <div className="w-16 h-16 rounded-xl bg-white/80 dark:bg-white/10 flex items-center justify-center shadow-md mb-1">
                        <SkillIcon skillName={s.name} />
                      </div>
                      <div className="text-[var(--cc-title)] dark:text-[var(--cc-title)] font-semibold text-base leading-tight">
                        {s.name}
                      </div>
                      <div className="text-[var(--cc-text)] dark:text-[var(--cc-text)] text-xs sm:text-sm font-light max-w-xs text-justify">
                        {s.description}
                      </div>
                    </div>

                    {/* Barra de experiência */}
                    <div className="w-full max-w-sm mt-auto">
                      <div className="flex justify-between text-xs sm:text-sm mb-1 text-[var(--cc-title)]/80 dark:text-[var(--cc-title)]/80">
                        <span>{t.skills.experienceLabel}</span>
                        <span>
                          {s.experience} {t.skills.yearsLabel}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div
                          style={{ width: `${progress}%` }}
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-[width] duration-700 ease-out"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </Carousel>
        </div>
      </motion.div>
    </section>
  );
}