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
      image: t.projects.electrumSite.image,
      link: "https://gabrielcaixeta01.github.io/electrum-observatory/",
      linkLabel: "Visitar Site",
    },
    {
      badge: "Projeto Pessoal",
      title: t.projects.kodo.title,
      description: t.projects.kodo.description,
      tech: ["Next.js", "TypeScript", "Tailwind", "Supabase", "PWA"],
      image: t.projects.kodo.image,
      link: "https://kodo-app-delta.vercel.app/",
      linkLabel: "Visitar Site",
    },
    {
      badge: "Projeto Freelancer",
      title: t.projects.giogas.title,
      description: t.projects.giogas.description,
      tech: ["React", "Next.js", "Tailwind", "TypeScript"],
      image: t.projects.giogas.image,
      link: "https://site-giogas.vercel.app/",
      linkLabel: "Visitar Site",
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