"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import ProjectCard, { Project } from "../ProjectCard";

export default function Projetos() {
  const { t } = useLanguage();

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
    {
      badge: "Projeto Pessoal",
      title: t.projects.baberAgenda.title,
      description: t.projects.baberAgenda.description,
      tech: ["React", "TypeScript", "Tailwind","Supabase"],
      image: t.projects.baberAgenda.image,
      link: "https://barber-agenda-one.vercel.app/",
      linkLabel: "Visitar Site",
    },
  ];

  return (
    <section
      id="projetos"
      className="
        scroll-mt-20
        relative overflow-hidden
        py-20 sm:py-24 md:py-28
        px-4
      "
    >
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14 md:mb-16"
        >
          <h2
            className="
              text-3xl sm:text-4xl lg:text-6xl
              font-semibold tracking-[-0.045em]
              leading-[1.05]
              text-[var(--pc-title)]
              mb-4 sm:mb-5
            "
          >
            {t.projects.title}
          </h2>

          <p
            className="
              text-[var(--pc-text)]
              text-sm sm:text-base md:text-lg
              max-w-3xl mx-auto
              leading-[1.8]
              tracking-[0.01em]
              opacity-90
              px-1 sm:px-0
            "
          >
            {t.projects.description}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div
          className="
            grid grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-4 sm:gap-6 md:gap-7
            items-stretch
          "
        >
          {projects.map((project, index) => (
            <ProjectCard key={`${project.title}-${index}`} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}