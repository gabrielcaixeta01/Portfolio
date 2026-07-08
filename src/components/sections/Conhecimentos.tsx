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
  const base = "w-6 h-6";
  const lowerName = skillName.toLowerCase();

  switch (lowerName) {
    case "react":
      return <FaReact className={`${base} text-[#61DAFB]`} />;
    case "next.js":
    case "nextjs":
    case "next":
      return (
        <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center">
          <SiNextdotjs className="w-4 h-4 text-black" />
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
        <div className="w-6 h-6 rounded-md bg-zinc-600 flex items-center justify-center text-white font-semibold text-[10px]">
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
    if (progress >= 80) return "avançado";
    if (progress >= 50) return "intermediário";
    return "iniciante";
  }
  if (progress >= 80) return "advanced";
  if (progress >= 50) return "intermediate";
  return "beginner";
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
    { key: "all" as const, label: language === "pt" ? "todos" : "all" },
    { key: "frontend" as const, label: "front-end" },
    { key: "backend" as const, label: "back-end" },
    { key: "tools" as const, label: language === "pt" ? "ferramentas" : "tools" },
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
        {/* ── header ── */}
        <div className="mb-10 sm:mb-12">
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-indigo-400">
            {language === "pt" ? "conhecimentos" : "skills"}
          </span>
          <h2
            className="mt-2 text-4xl sm:text-5xl font-semibold tracking-[-0.045em] leading-[1.05] text-[var(--cc-title)] mb-3 sm:mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <SplitText text={t.skills.title} />
          </h2>
          <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--cc-text)] opacity-60">
            {t.skills.description}
          </p>
        </div>

        {/* ── mobile: sphere on top ── */}
        <div className="md:hidden -mt-2 mb-8">
          <TechSphere className="w-full h-[320px]" />
        </div>

        <div className="md:grid md:grid-cols-[1fr_340px] md:gap-12 items-start">

          {/* ── left: filters + skill grid ── */}
          <div>
            {/* category filters — mono, terminal-flavoured */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveCategory(key)}
                  className={`
                    px-4 py-1.5 rounded-full font-mono text-[12px] tracking-[0.08em]
                    border transition-all duration-200
                    ${
                      activeCategory === key
                        ? "bg-indigo-500/15 border-indigo-400/50 text-indigo-300 shadow-[0_0_20px_-6px_rgba(99,102,241,0.5)]"
                        : "bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:border-indigo-400/40 hover:text-zinc-200"
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* skill grid */}
            <AnimatePresence mode="popLayout">
              <motion.div layout className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
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
                      title={s.name}
                      aria-label={s.name}
                      className="
                        group relative rounded-xl p-3 sm:p-4
                        bg-[var(--pc-bg)]
                        border border-[var(--pc-border)]
                        hover:-translate-y-0.5
                        hover:border-indigo-500/25
                        hover:shadow-[0_8px_30px_-12px_rgba(99,102,241,0.3)]
                        transition-all duration-200 ease-out
                      "
                    >
                      <div className="flex items-center justify-center sm:justify-start gap-3 mb-0 sm:mb-3">
                        <div
                          className="
                            shrink-0 w-10 h-10 rounded-lg
                            bg-white/[0.06] border border-white/[0.08]
                            flex items-center justify-center
                          "
                        >
                          <SkillIcon skillName={s.name} />
                        </div>
                        <div className="hidden sm:block flex-1 min-w-0">
                          <h3 className="text-sm font-semibold tracking-[-0.02em] text-[var(--cc-title)] truncate leading-tight">
                            {s.name}
                          </h3>
                          <span className="font-mono text-[10.5px] text-zinc-500">
                            {levelLabel(progress, language)}
                          </span>
                        </div>
                      </div>

                      {/* proficiency bar — hidden on mobile (icon-only tiles) */}
                      <div className="hidden sm:block h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: progress / 100 }}
                          transition={{ duration: 0.9, delay: 0.15 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                          viewport={{ once: true }}
                          style={{ transformOrigin: "left" }}
                          className="h-full w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400"
                        />
                      </div>

                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-indigo-500/15 transition duration-200" />
                    </motion.article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── right: TechSphere, sticky (desktop only) ── */}
          <div className="hidden md:block sticky top-28">
            <TechSphere className="w-full h-[420px]" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
