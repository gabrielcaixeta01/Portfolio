"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HiExternalLink } from "react-icons/hi";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiNestjs,
  SiPrisma,
  SiRedis,
  SiPostgresql,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiCplusplus,
  SiFigma,
  SiJupyter,
  SiGooglecolab,
  SiGit,
  SiGithub,
  SiNumpy,
  SiPandas,
  SiFramer,
  SiVercel,
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
  Matplotlib: <SiPython className="w-4 h-4" />, // Using Python icon for Matplotlib
  "Machine Learning": <SiPython className="w-4 h-4" />, // Using Python icon for ML
  Catch2: <SiCplusplus className="w-4 h-4" />, // Using C++ icon for Catch2
  Vercel: <SiVercel className="w-4 h-4" />,
  "scikit-learn": <SiPython className="w-4 h-4" />, // Using Python icon for scikit-learn
  "Design System": <SiFigma className="w-4 h-4" />, // Using Figma icon for Design System
  "UX Flows": <SiFigma className="w-4 h-4" />, // Using Figma icon for UX
  UX: <SiFigma className="w-4 h-4" />, // Using Figma icon for UX
  Prototyping: <SiFigma className="w-4 h-4" />, // Using Figma icon for Prototyping
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const {
    badge,
    title,
    description,
    tech,
    image,
    link,
    linkLabel = "Link",
  } = project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      className="group relative flex flex-col h-full p-6 rounded-2xl border shadow-sm bg-white/90 dark:bg-zinc-900/60 backdrop-blur-md ring-1 ring-slate-200/60 dark:ring-white/10 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 motion-reduce:hover:transform-none motion-reduce:transition-none"
    >
      {/* Badge */}
      {badge && (
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-black/80 text-white dark:bg-white/90 dark:text-black">
            {badge}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900 dark:text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="text-slate-600 dark:text-zinc-300 mb-4 flex-grow leading-relaxed">
        {description}
      </p>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((techName, techIndex) => (
          <motion.span
            key={techIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1 + techIndex * 0.05,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 border border-slate-200/60 dark:border-zinc-700/50 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors duration-200"
          >
            {techIcons[techName]}
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
          transition={{
            duration: 0.4,
            delay: index * 0.1 + 0.3,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
        >
          <Image
            src={image}
            alt={`${title} - Project screenshot showing the application interface and features`}
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded-xl border border-slate-200/60 dark:border-zinc-700/50 hover:border-slate-300 dark:hover:border-zinc-600 transition-colors duration-200"
            loading="lazy"
          />
        </motion.div>
      )}

      {/* Link Button */}
      <div className="mt-auto">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full mt-6 inline-flex items-center justify-center gap-2 rounded-2xl text-base font-semibold py-3 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400/60 dark:focus:ring-zinc-500/60 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900"
        >
          <HiExternalLink className="w-5 h-5" />
          {linkLabel}
        </a>
      </div>
    </motion.article>
  );
}
