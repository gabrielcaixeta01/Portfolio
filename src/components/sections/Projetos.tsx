"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useLanguage } from "../../contexts/LanguageContext";
import ProjectCard, { Project } from "../ProjectCard";
import SplitText from "@/components/SplitText";

const getImgSrc = (path?: string) =>
  path ? `${process.env.NODE_ENV === "production" ? "/Portfolio" : ""}${path}` : null;

export default function Projetos() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 280, damping: 28 });
  const springY = useSpring(rawY, { stiffness: 280, damping: 28 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set(e.clientX - rect.left);
      rawY.set(e.clientY - rect.top);
    },
    [rawX, rawY]
  );

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
      badge: language === "pt" ? "Projeto Freelancer" : "Freelance Project",
      title: t.projects.giogas.title,
      description: t.projects.giogas.description,
      tech: ["React", "Next.js", "Tailwind", "TypeScript"],
      image: t.projects.giogas.image,
      link: "https://site-giogas.vercel.app/",
      linkLabel: language === "pt" ? "Visitar Site" : "Visit Site",
    },
    {
      badge: language === "pt" ? "Projeto Pessoal" : "Personal Project",
      title: t.projects.baberAgenda.title,
      description: t.projects.baberAgenda.description,
      tech: ["React", "TypeScript", "Tailwind", "Supabase"],
      image: t.projects.baberAgenda.image,
      link: "https://barber-agenda-one.vercel.app/",
      linkLabel: language === "pt" ? "Visitar Site" : "Visit Site",
    },
  ];

  const hoveredImgSrc = getImgSrc(hoveredProject?.image);

  return (
    <section
      ref={sectionRef}
      id="projetos"
      className="relative scroll-mt-20 px-4 py-16 sm:py-24 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-14 sm:mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-indigo-500 dark:text-indigo-400">
            {language === "pt" ? "projetos" : "projects"}
          </span>
          <h2 className="mt-2 text-4xl sm:text-5xl font-semibold tracking-[-0.045em] leading-[1.05] text-[var(--cc-title)]">
            <SplitText text={t.projects.title} />
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--cc-text)] opacity-55 max-w-xl">
            {t.projects.description}
          </p>
        </motion.div>

        {/* ── Project rows ─────────────────────────────────────────────────── */}
        <div>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              onHover={setHoveredProject}
            />
          ))}
          {/* Closing rule */}
          <div className="h-px bg-[var(--pc-border)]" />
        </div>

      </div>

      {/* ── Floating image preview ────────────────────────────────────────── */}
      <AnimatePresence>
        {hoveredImgSrc && (
          <motion.div
            className="absolute pointer-events-none z-50 w-72 h-44 rounded-2xl overflow-hidden shadow-[0_24px_60px_-8px_rgba(0,0,0,0.35)]"
            style={{
              left: springX,
              top: springY,
              translateX: "-50%",
              translateY: "-115%",
            }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <Image
              src={hoveredImgSrc}
              alt={hoveredProject?.title ?? ""}
              fill
              className="object-cover"
              sizes="288px"
            />
            {/* Subtle inner ring */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
