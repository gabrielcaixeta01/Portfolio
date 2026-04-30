"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import ProjectCard, { Project } from "../ProjectCard";
import SplitText from "@/components/SplitText";

export default function Projetos() {
  const { t, language } = useLanguage();

  const projects: Project[] = [
    {
      badge: "Electrum Observatory",
      title: t.projects.electrumSite.title,
      description: t.projects.electrumSite.description,
      tech: ["Python", "Jupyter", "Network Analysis", "scikit-learn"],
      image: t.projects.electrumSite.image,
      link: "https://gabrielcaixeta01.github.io/electrum-observatory/",
      linkLabel: language === "pt" ? "Visitar Site" : "Visit Site",
      githubLink: "https://github.com/gabrielcaixeta01/electrum-observatory",
      featured: true,
    },
    {
      badge: "Projeto Freelancer",
      title: t.projects.giogas.title,
      description: t.projects.giogas.description,
      tech: ["React", "Next.js", "Tailwind", "TypeScript"],
      image: t.projects.giogas.image,
      link: "https://site-giogas.vercel.app/",
      linkLabel: language === "pt" ? "Visitar Site" : "Visit Site",
    },
    {
      badge: "Projeto Pessoal",
      title: t.projects.baberAgenda.title,
      description: t.projects.baberAgenda.description,
      tech: ["React", "TypeScript", "Tailwind", "Supabase"],
      image: t.projects.baberAgenda.image,
      link: "https://barber-agenda-one.vercel.app/",
      linkLabel: language === "pt" ? "Visitar Site" : "Visit Site",
    },
  ];

  const [featured, ...rest] = projects;

  return (
    <section id="projetos" className="scroll-mt-20 px-4 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-10 sm:mb-12"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-indigo-500 dark:text-indigo-400">
            {language === "pt" ? "projetos" : "projects"}
          </span>
          <h2 className="mt-1.5 text-4xl sm:text-5xl font-semibold tracking-[-0.045em] leading-[1.05] text-[var(--cc-title)]">
            <SplitText text={t.projects.title} />
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--cc-text)] opacity-60 max-w-xl">
            {t.projects.description}
          </p>
        </motion.div>

        {/* ── Featured ────────────────────────────────────────────────────── */}
        <div className="mb-5 sm:mb-6">
          <ProjectCard project={featured} index={0} />
        </div>

        {/* ── Grid ────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {rest.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i + 1} />
          ))}
        </div>

      </div>
    </section>
  );
}
