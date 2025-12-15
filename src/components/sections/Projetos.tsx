"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import ProjectCard, { Project } from "../ProjectCard";

export default function Projetos() {
  const { t } = useLanguage();

  // Projects data - translated
  const projects: Project[] = [
    {
      badge: "Electrum Observatory",
      title: t.projects.electrumSite.title,
      description: t.projects.electrumSite.description,
      tech: ["Python", "Jupyter", "Network Analysis", "scikit-learn"],
      link: "https://gabrielcaixeta01.github.io/electrum-observatory/",
      linkLabel: "Visitar Site",
    },
    {
      badge: "Projeto Freelancer",
      title: t.projects.giogas.title,
      description: t.projects.giogas.description,
      tech: ["React", "Next.js", "Tailwind", "TypeScript"],
      link: "https://site-giogas.vercel.app/",
      linkLabel: "Visitar Site",
    },
    {
      badge: "Projeto Noções de IA",
      title: t.projects.fipePredictor.title,
      description: t.projects.fipePredictor.description,
      tech: ["Python", "Jupyter", "Google Colab", "scikit-learn", "MLP", "Regressão Linear"],
      link: "https://github.com/gabrielcaixeta01/NocoesDeIA",
      linkLabel: "Repositório GitHub",
    },
    {
      badge: "Processo Trainee CJR",
      title: t.projects.avaliaProfessores.title,
      description: t.projects.avaliaProfessores.description,
      tech: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Prisma"],
      link: "https://github.com/gabrielcaixeta01/avalia-professores",
      linkLabel: "Deploy Indisponível",
    },
    {
      badge: "Projeto Final CS50",
      title: t.projects.smartTicker.title,
      description: t.projects.smartTicker.description,
      tech: ["Next.js", "TypeScript", "Tailwind", "Python", "scikit-learn", "Vercel"],
      link: "https://github.com/gabrielcaixeta01/StockPredictor",
      linkLabel: "Repositório GitHub",
    },
  ];

  return (
    <section id="projetos" className="scroll-mt-18 min-h-screen py-24 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-[var(--pc-title)] text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            {t.projects.title}
          </h2>
          <p className="text-[var(--pc-text)] text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            {t.projects.description}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={`${project.title}-${index}`} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}