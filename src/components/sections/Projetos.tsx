"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import ProjectCard, { Project } from "../ProjectCard";

export default function Projetos() {
  const { t } = useLanguage();

  // Projects data - real projects
  const projects: Project[] = [
    {
      badge: "CS50 Capstone",
      title: "Stock Predictor",
      description:
        "Stock prediction platform built for the CS50 final project, mixing Next.js UI with Python models (Random Forest + news sentiment). Includes charts and ticker search.",
      tech: [
        "Next.js",
        "TypeScript",
        "Tailwind",
        "Python",
        "scikit-learn",
        "Vercel",
      ],
      // image: "/images/stock-predictor-cover.jpg", // Add this when image is available
      link: "https://github.com/gabrielcaixeta01/stock-predictor",
      linkLabel: "Link",
    },
    {
      badge: "Personal",
      title: "UnB Academic Agenda",
      description:
        "Visual schedule planner for UnB: create, organize and visualize classes and tasks. Built with a clean Tailwind UI and local storage.",
      tech: ["React", "Next.js", "Tailwind", "TypeScript"],
      // image: "/images/unb-agenda-cover.jpg", // Add this when image is available
      link: "https://github.com/gabrielcaixeta01/unb-agenda",
      linkLabel: "Link",
    },
    {
      badge: "CJTR – Site",
      title: "TREINI (Teacher Evaluation)",
      description:
        "Website for evaluating professors, developed for CJTR. Focused on accessibility, fast search and clear submission flow.",
      tech: ["Next.js", "Tailwind", "NestJS", "PostgreSQL", "Prisma"],
      // image: "/images/treini-cover.jpg", // Add this when image is available
      link: "https://github.com/gabrielcaixeta01/treini",
      linkLabel: "Link",
    },
    {
      badge: "CJTR – Consulting",
      title: "Dental Marketplace (Figma)",
      description:
        "Product design for a fast and secure marketplace of dental products. Information architecture, UI system and flows delivered in Figma.",
      tech: ["Figma", "Design System", "UX Flows"],
      // image: "/images/dental-marketplace-cover.jpg", // Add this when image is available
      link: "https://figma.com/dental-marketplace-design",
      linkLabel: "Figma",
    },
    {
      badge: "CJTR – Consulting",
      title: "Ontological Project (Figma)",
      description:
        "Consulting project with ontological modeling and UI prototypes to support data consistency and navigation. Delivered as Figma prototypes.",
      tech: ["Figma", "UX", "Prototyping"],
      // image: "/images/ontologico-cover.jpg", // Add this when image is available
      link: "https://figma.com/ontological-project",
      linkLabel: "Figma",
    },
  ];

  return (
    <section id="projetos" className="scroll-mt-18 min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            {t.projects.title}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            {t.projects.description}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
