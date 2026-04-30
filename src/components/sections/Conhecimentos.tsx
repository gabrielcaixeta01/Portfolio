"use client";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { useMemo, useState } from "react";
import SplitText from "@/components/SplitText";
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
  category: "frontend" | "backend" | "tools";
}

const SkillIcon = ({ skillName }: { skillName: string }) => {
  const base = "w-10 h-10";
  const lowerName = skillName.toLowerCase();

  switch (lowerName) {
    case "react":
      return <FaReact className={`${base} text-[#61DAFB]`} />;
    case "next.js":
    case "nextjs":
    case "next":
      return (
        <div className="w-10 h-10 rounded-lg bg-black dark:bg-white flex items-center justify-center">
          <SiNextdotjs className="w-7 h-7 text-white dark:text-black" />
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
        <div className="w-10 h-10 rounded-lg bg-gray-400/80 flex items-center justify-center text-white font-semibold text-xs">
          {skillName.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};

const categoryMap: Record<string, "frontend" | "backend" | "tools"> = {
  react: "frontend",
  "next.js": "frontend",
  typescript: "frontend",
  "tailwind css": "frontend",
  figma: "frontend",
  "node.js": "backend",
  nestjs: "backend",
  python: "backend",
  git: "tools",
  "c++": "tools",
  jupyter: "tools",
  "google colab": "tools",
};

const levelLabel = (progress: number, lang: string) => {
  if (lang === "pt") {
    if (progress >= 80) return "Avançado";
    if (progress >= 50) return "Intermediário";
    return "Iniciante";
  }
  if (progress >= 80) return "Advanced";
  if (progress >= 50) return "Intermediate";
  return "Beginner";
};

const levelColor = (progress: number) => {
  if (progress >= 80) return "text-emerald-400";
  if (progress >= 50) return "text-amber-400";
  return "text-blue-400";
};

export default function Conhecimentos() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<"all" | "frontend" | "backend" | "tools">("all");

  const skills: SkillData[] = useMemo(
    () =>
      t.skills.skillsData.map((s) => ({
        ...s,
        category: categoryMap[s.name.toLowerCase()] ?? "tools",
      })),
    [t.skills.skillsData]
  );

  const filtered = activeCategory === "all" ? skills : skills.filter((s) => s.category === activeCategory);

  const categories = [
    { key: "all" as const, label: language === "pt" ? "Todos" : "All" },
    { key: "frontend" as const, label: "Front-end" },
    { key: "backend" as const, label: "Back-end" },
    { key: "tools" as const, label: language === "pt" ? "Ferramentas" : "Tools" },
  ];

  return (
    <section
      id="conhecimentos"
      className="
        relative overflow-hidden
        scroll-mt-20
        px-4
        py-20 sm:py-24
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2
            className="
              text-3xl sm:text-4xl lg:text-6xl
              font-semibold tracking-[-0.045em]
              leading-[1.05]
              text-[var(--cc-title)] dark:text-[var(--cc-title)]
              mb-4 sm:mb-5
            "
          >
            <SplitText text={t.skills.title} />
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
              text-center
            "
          >
            {t.skills.description}
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveCategory(key)}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium
                border transition-all duration-200
                ${
                  activeCategory === key
                    ? "bg-indigo-500 border-indigo-500 text-white shadow-[0_4px_14px_-4px_rgba(99,102,241,0.6)]"
                    : "bg-[var(--pc-bg)] border-[var(--pc-border)] text-[var(--pc-text)] hover:border-indigo-400/50"
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
        >
          {filtered.map((s, i) => {
            const progress = s.maxExperience > 0 ? (s.experience / s.maxExperience) * 100 : 0;
            const yearsText =
              s.experience === 1
                ? `1 ${t.skills.yearsLabel === "anos" ? "ano" : "year"}`
                : `${s.experience} ${t.skills.yearsLabel}`;

            return (
              <motion.article
                key={s.name}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, delay: i * 0.03, ease: "easeOut" }}
                className="
                  group relative flex flex-col
                  rounded-2xl
                  bg-[var(--pc-bg)]
                  border border-[var(--pc-border)]
                  shadow-[var(--pc-shadow),_inset_0_0_0_1px_var(--pc-outline)]
                  backdrop-blur-[10px]
                  overflow-hidden
                  p-5
                  transition-[transform,box-shadow] duration-200 ease-out
                  hover:-translate-y-1 hover:shadow-[0_18px_50px_-34px_rgba(2,6,23,0.55)]
                "
              >
                {/* Subtle hover glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(45%_45%_at_50%_0%,rgba(99,102,241,0.12),transparent_60%)]" />

                <div className="relative flex h-full flex-col gap-3">
                  {/* Icon + name */}
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        shrink-0 w-12 h-12 rounded-xl
                        bg-white/70 dark:bg-white/8
                        border border-black/5 dark:border-white/10
                        flex items-center justify-center shadow-sm
                      "
                    >
                      <SkillIcon skillName={s.name} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold tracking-[-0.02em] text-[var(--cc-title)] leading-tight">
                        {s.name}
                      </h3>
                      <span className={`text-xs font-medium ${levelColor(progress)}`}>
                        {levelLabel(progress, language)}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-[1.7] text-[var(--cc-text)] opacity-90 text-left flex-1">
                    {s.description}
                  </p>

                  {/* Progress bar */}
                  <div className="pt-1">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-[var(--cc-text)] opacity-70">{t.skills.experienceLabel}</span>
                      <span className="text-[var(--cc-title)] font-semibold">{yearsText}</span>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                      <div
                        style={{ width: `${progress}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-[width] duration-700 ease-out"
                      />
                    </div>
                  </div>
                </div>

                {/* Hover ring */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-indigo-500/15 transition duration-200" />
              </motion.article>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
