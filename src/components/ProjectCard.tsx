"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  SiNextdotjs, SiTailwindcss, SiNestjs, SiPrisma, SiRedis, SiPostgresql,
  SiTypescript, SiReact, SiNodedotjs, SiPython, SiCplusplus, SiFigma,
  SiJupyter, SiGooglecolab, SiGit, SiGithub, SiNumpy, SiPandas, SiFramer, SiVercel
} from "react-icons/si";

export type Project = {
  badge?: string;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  link: string;
  linkLabel?: string;
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const techIcons: Record<string, React.ReactElement> = {
  "Next.js": <SiNextdotjs className="w-4 h-4" />,
  Tailwind: <SiTailwindcss className="w-4 h-4" />,
  "Tailwind CSS": <SiTailwindcss className="w-4 h-4" />,
  "Nest.js": <SiNestjs className="w-4 h-4" />,
  NestJS: <SiNestjs className="w-4 h-4" />,
  Prisma: <SiPrisma className="w-4 h-4" />,
  Redis: <SiRedis className="w-4 h-4" />,
  PostgreSQL: <SiPostgresql className="w-4 h-4" />,
  TypeScript: <SiTypescript className="w-4 h-4" />,
  React: <SiReact className="w-4 h-4" />,
  "Node.js": <SiNodedotjs className="w-4 h-4" />,
  Python: <SiPython className="w-4 h-4" />,
  "C++": <SiCplusplus className="w-4 h-4" />,
  Figma: <SiFigma className="w-4 h-4" />,
  Jupyter: <SiJupyter className="w-4 h-4" />,
  "Google Colab": <SiGooglecolab className="w-4 h-4" />,
  Git: <SiGit className="w-4 h-4" />,
  GitHub: <SiGithub className="w-4 h-4" />,
  NumPy: <SiNumpy className="w-4 h-4" />,
  Pandas: <SiPandas className="w-4 h-4" />,
  "Framer Motion": <SiFramer className="w-4 h-4" />,
  Matplotlib: <SiPython className="w-4 h-4" />,
  "Machine Learning": <SiPython className="w-4 h-4" />,
  Catch2: <SiCplusplus className="w-4 h-4" />,
  Vercel: <SiVercel className="w-4 h-4" />,
  "scikit-learn": <SiPython className="w-4 h-4" />,
  "Design System": <SiFigma className="w-4 h-4" />,
  "UX Flows": <SiFigma className="w-4 h-4" />,
  UX: <SiFigma className="w-4 h-4" />,
  Prototyping: <SiFigma className="w-4 h-4" />,
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { badge, title, description, tech, image, link, linkLabel = "Link" } = project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`
        group relative flex h-full flex-col
        rounded-2xl
        backdrop-blur-[8px]
        transition-[box-shadow,transform,background,border-color] duration-200 ease-out
        // .project-card (via CSS vars)
        bg-[var(--pc-bg)] border border-[var(--pc-border)]
        shadow-[var(--pc-shadow),_inset_0_0_0_1px_var(--pc-outline)]
        hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(2,6,23,0.10)]
        p-6 md:p-7 sm:p-5 max-sm:p-4
      `}
    >
      {/* Badge */}
      {badge && (
        <div className="mb-4">
          <span
            className="
              inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold
              // .project-badge
              rounded-full bg-[var(--pc-badge-bg)] text-[var(--pc-badge-text)]
            "
          >
            {badge}
          </span>
        </div>
      )}

      {/* Title */}
      <h3
        className={`
          text-xl md:text-2xl font-bold mb-3
          // .project-title
          text-[var(--pc-title)]
          max-sm:text-[1.125rem] sm:max-md:text-[1.25rem] leading-tight
        `}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={`
          mb-4 flex-grow leading-relaxed
          // .project-desc
          text-[var(--pc-text)]
          max-md:text-justify max-md:text-[0.9rem] max-md:leading-[1.5]
          max-sm:text-[0.875rem]
        `}
      >
        {description}
      </p>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((techName, techIndex) => (
          <motion.span
            key={`${techName}-${techIndex}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, delay: techIndex * 0.03, ease: "easeOut" }}
            viewport={{ once: true }}
            className="
              inline-flex items-center gap-2 px-3 py-1 text-sm font-medium
              // .project-chip
              rounded-full bg-[var(--pc-chip-bg)] text-[var(--pc-chip-text)]
              border
              [border-color:color-mix(in_oklab,_var(--pc-chip-text)_20%,_transparent)]
            "
            title={techName}
          >
            {techIcons[techName] ?? <span className="w-4 h-4 rounded-full bg-current/40" />}
            {techName}
          </motion.span>
        ))}
      </div>

      {/* Preview Image */}
      {image && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Image
            src={image}
            alt={`${title} - screenshot`}
            width={400}
            height={200}
            className="
              w-full h-48 object-cover rounded-xl
              border border-slate-200/60 dark:border-zinc-700/50
              hover:border-slate-300 dark:hover:border-zinc-600
              transition-colors duration-200
            "
            loading="lazy"
          />
        </motion.div>
      )}

      {/* Link Button — usa <a>, não <button href> */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-2 inline-flex items-center justify-center gap-2 px-4 py-2
          text-sm font-semibold
          // .project-button
          rounded-[1rem]
          bg-[var(--pc-btn-bg)] text-[var(--pc-btn-text)]
          transition-[background-color,color,box-shadow,transform] duration-180 ease-out
          hover:-translate-y-0.5
          focus-visible:outline-none
          focus-visible:[box-shadow:0_0_0_3px_color-mix(in_oklab,_var(--pc-btn-bg)_35%,_transparent)]
        "
        aria-label={linkLabel}
      >
        {linkLabel} ↗
      </a>
    </motion.article>
  );
}