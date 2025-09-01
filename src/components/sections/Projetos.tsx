"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import ProjectCard, { Project } from "../ProjectCard";

export default function Projetos() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get the correct text color based on theme
  const getTitleColor = () => {
    if (!mounted) return "#0f172a"; // Default to dark color during SSR
    return theme === "dark" ? "#ffffff" : "#0f172a";
  };

  // Projects data - translated
  const projects: Project[] = [
    {
      badge: "Projeto Final CS50",
      title: t.projects.smartTicker.title,
      description: t.projects.smartTicker.description,
      tech: [
        "Next.js",
        "TypeScript",
        "Tailwind",
        "Python",
        "scikit-learn",
        "Vercel",
      ],
      // image: "/images/stock-predictor-cover.jpg",
      link: "https://github.com/gabrielcaixeta01/stock-predictor",
      linkLabel: "GitHub",
    },
    {
      badge: "Projeto Pessoal",
      title: t.projects.agendaUnb.title,
      description: t.projects.agendaUnb.description,
      tech: ["React", "Next.js", "Tailwind", "TypeScript"],
      // image: "/images/unb-agenda-cover.jpg",
      link: "https://github.com/gabrielcaixeta01/unb-agenda",
      linkLabel: "GitHub",
    },
    {
      badge: "TP1 – Técnicas de Programação",
      title: t.projects.contaPalavras.title,
      description: t.projects.contaPalavras.description,
      tech: ["C++", "Catch2", "TDD"],
      // image: "",
      link: "https://github.com/gabrielcaixeta01/conta-palavras",
      linkLabel: "GitHub",
    },
    {
      badge: "Processo Trainee CJR",
      title: t.projects.avaliaProfessores.title,
      description: t.projects.avaliaProfessores.description,
      tech: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma"],
      // image: "",
      link: "https://github.com/gabrielcaixeta01/avalia-professores",
      linkLabel: "GitHub",
    },
    {
      badge: "CJR – Consultoria",
      title: t.projects.marketplace.title,
      description: t.projects.marketplace.description,
      tech: ["Figma", "Design System", "UX Flows"],
      // image: "/images/dental-marketplace-cover.jpg",
      link: "https://figma.com/dental-marketplace-design",
      linkLabel: "Figma",
    },
    {
      badge: "Projeto Noções de IA",
      title: t.projects.fipePredictor.title,
      description: t.projects.fipePredictor.description,
      tech: ["Python", "Jupyter", "scikit-learn", "MLP", "Regressão Linear"],
      // image: "",
      link: "https://github.com/gabrielcaixeta01/fipe-predictor",
      linkLabel: "GitHub",
    },
  ];

  return (
    <section
      id="projetos"
      className="scroll-mt-18 min-h-screen py-24 sm:py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
            style={{
              color: getTitleColor(),
            }}
          >
            {t.projects.title}
          </h2>
          <p className="projects-description text-base sm:text-lg md:text-xl text-slate-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            {t.projects.description}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
