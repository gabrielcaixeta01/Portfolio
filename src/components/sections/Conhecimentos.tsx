"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
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

const TechSphere = dynamic(
  () => import("@/components/TechSphere").then((m) => ({ default: m.TechSphere })),
  { ssr: false }
);

interface SkillData {
  name: string;
  description: string;
  experience: number;
  maxExperience: number;
  category: "frontend" | "backend" | "tools";
}

const SkillIcon = ({ skillName }: { skillName: string }) => {
  const base = "w-7 h-7";
  const lowerName = skillName.toLowerCase();

  switch (lowerName) {
    case "react":
      return <FaReact className={`${base} text-[#61DAFB]`} />;
    case "next.js":
    case "nextjs":
    case "next":
      return (
        <div className="w-7 h-7 rounded-md bg-black dark:bg-white flex items-center justify-center">
          <SiNextdotjs className="w-5 h-5 text-white dark:text-black" />
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
        <div className="w-7 h-7 rounded-md bg-gray-400/80 flex items-center justify-center text-white font-semibold text-[10px]">
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
      className="relative overflow-hidden scroll-mt-20 px-4 py-20 sm:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <h2
            className="
              text-3xl sm:text-4xl lg:text-5xl
              font-semibold tracking-[-0.045em]
              leading-[1.05]
              text-[var(--cc-title)]
              mb-3 sm:mb-4
            "
          >
            <SplitText text={t.skills.title} />
          </h2>
          <p
            className="
              max-w-2xl
              text-sm sm:text-base
              leading-[1.85]
              text-[var(--cc-text)]
              opacity-80
            "
          >
            {t.skills.description}
          </p>
        </div>

        {/* Mobile: TechSphere only */}
        <div className="md:hidden">
          <TechSphere className="w-full h-[400px]" />
        </div>

        {/* Desktop: skills list + sticky sphere */}
        <div className="hidden md:grid grid-cols-[1fr_340px] gap-12 items-start">

          {/* Left: filters + skill grid */}
          <div>
            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
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
                        ? "bg-indigo-500 border-indigo-500 text-white shadow-[0_4px_14px_-4px_rgba(99,102,241,0.55)]"
                        : "bg-[var(--pc-bg)] border-[var(--pc-border)] text-[var(--pc-text)] hover:border-indigo-400/50"
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Skill grid */}
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
              >
                {filtered.map((s, i) => {
                  const progress = s.maxExperience > 0 ? (s.experience / s.maxExperience) * 100 : 0;

                  return (
                    <motion.article
                      key={s.name}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: i * 0.025, ease: "easeOut" }}
                      className="
                        group relative flex items-center gap-3
                        rounded-xl p-3
                        bg-[var(--pc-bg)]
                        border border-[var(--pc-border)]
                        hover:-translate-y-0.5
                        hover:border-indigo-500/20
                        hover:shadow-[0_8px_30px_-12px_rgba(99,102,241,0.25)]
                        transition-all duration-200 ease-out
                      "
                    >
                      {/* Icon container */}
                      <div
                        className="
                          shrink-0 w-11 h-11 rounded-xl
                          bg-white/70 dark:bg-white/8
                          border border-black/5 dark:border-white/10
                          flex items-center justify-center
                          shadow-sm
                        "
                      >
                        <SkillIcon skillName={s.name} />
                      </div>

                      {/* Name + level */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold tracking-[-0.02em] text-[var(--cc-title)] truncate leading-tight">
                          {s.name}
                        </h3>
                        <span className={`text-xs font-medium ${levelColor(progress)}`}>
                          {levelLabel(progress, language)}
                        </span>
                      </div>

                      {/* Hover ring */}
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-indigo-500/12 transition duration-200" />
                    </motion.article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: TechSphere — sticky */}
          <div className="sticky top-28">
            <TechSphere className="w-full h-[420px]" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
