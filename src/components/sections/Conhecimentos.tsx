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
import { Carousel } from "@/components/Carousel";

interface SkillData {
  name: string;
  description: string;
  experience: number;
  maxExperience: number;
}

const SkillIcon = ({ skillName }: { skillName: string }) => {
  const base = "w-12 h-12"; // menor e mais premium
  const lowerName = skillName.toLowerCase();

  switch (lowerName) {
    case "react":
      return <FaReact className={`${base} text-[#61DAFB]`} />;
    case "next.js":
    case "nextjs":
    case "next":
      return (
        <div className="w-12 h-12 rounded-lg bg-black dark:bg-white flex items-center justify-center">
          <SiNextdotjs className="w-9 h-9 text-white dark:text-black" />
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
        <div className="w-12 h-12 rounded-lg bg-gray-400/80 flex items-center justify-center text-white font-semibold text-xs">
          {skillName.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};

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
        relative overflow-hidden
        scroll-mt-20
        min-h-screen
        px-4
        py-20 sm:py-24
      "
    >

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-6xl mx-auto text-center"
      >
        {/* Header premium */}
        <div className="mb-10 sm:mb-14">
          <h2
            className="
              text-3xl sm:text-4xl lg:text-6xl
              font-semibold tracking-[-0.045em]
              leading-[1.05]
              text-[var(--cc-title)] dark:text-[var(--cc-title)]
              mb-4 sm:mb-5
            "
          >
            {t.skills.title}
          </h2>

          <p
            className="
              max-w-3xl mx-auto
              text-sm sm:text-base md:text-lg
              leading-[1.85]
              tracking-[0.01em]
              text-[var(--cc-text)] dark:text-[var(--cc-text)]
              opacity-90
              px-2 sm:px-0
              text-justify sm:text-center
            "
          >
            {t.skills.description}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel visible={3}>
            {skills.map((s, i) => {
              const progress = s.maxExperience > 0 ? (s.experience / s.maxExperience) * 100 : 0;

              return (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.03, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="
                    group relative
                    h-[360px] md:h-[350px] w-full
                    rounded-2xl
                    bg-[var(--pc-bg)]
                    border border-[var(--pc-border)]
                    shadow-[var(--pc-shadow),_inset_0_0_0_1px_var(--pc-outline)]
                    backdrop-blur-[10px]
                    overflow-hidden
                    p-6 sm:p-7
                    transition-[transform,box-shadow] duration-200 ease-out
                    hover:-translate-y-1 hover:shadow-[0_18px_50px_-34px_rgba(2,6,23,0.55)]
                  "
                >
                  {/* brilho sutil */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(45%_45%_at_50%_0%,rgba(99,102,241,0.14),transparent_60%)]" />

                  <div className="relative flex h-full flex-col">
                    {/* Top */}
                    {/* Header: ícone + título */}
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          shrink-0
                          w-14 h-14 rounded-2xl
                          bg-white/70 dark:bg-white/8
                          border border-black/5 dark:border-white/10
                          flex items-center justify-center
                          shadow-sm
                        "
                      >
                        <SkillIcon skillName={s.name} />
                      </div>

                      <h3
                        className="
                          text-lg sm:text-xl
                          font-semibold tracking-[-0.02em]
                          text-[var(--cc-title)] dark:text-[var(--cc-title)]
                          leading-tight
                        "
                      >
                        {s.name}
                      </h3>
                    </div>

                    {/* Descrição — agora embaixo dos dois */}
                    <p
                      className="
                        mt-3
                        text-sm sm:text-[15px]
                        leading-[1.7]
                        text-[var(--cc-text)] dark:text-[var(--cc-text)]
                        opacity-90
                        text-justify
                      "
                    >
                      {s.description}
                    </p>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Bottom */}
                    <div className="pt-5">
                      <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                        <span className="text-[var(--cc-text)] dark:text-[var(--cc-text)] opacity-80">
                          {t.skills.experienceLabel}
                        </span>
                        <span className="text-[var(--cc-title)] dark:text-[var(--cc-title)] font-semibold">
                          {s.experience} {t.skills.yearsLabel}
                        </span>
                      </div>

                      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                        <div
                          style={{ width: `${progress}%` }}
                          className="
                            h-full rounded-full
                            bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
                            transition-[width] duration-700 ease-out
                          "
                        />
                        {/* highlight */}
                        <div className="pointer-events-none absolute inset-0 opacity-70 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.22),transparent)]" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </Carousel>
        </div>
      </motion.div>
    </section>
  );
}