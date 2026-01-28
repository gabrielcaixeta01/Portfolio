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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      viewport={{ once: true }}
      className="
        group relative flex h-full flex-col
        rounded-2xl
        bg-[var(--pc-bg)]
        border border-[var(--pc-border)]
        shadow-[var(--pc-shadow),_inset_0_0_0_1px_var(--pc-outline)]
        backdrop-blur-[10px]
        transition-[box-shadow,transform,border-color] duration-200 ease-out
        hover:-translate-y-0.5 hover:shadow-[0_16px_44px_-28px_rgba(2,6,23,0.45)]
        overflow-hidden
      "
    >
      {/* HEADER (imagem + badge) */}
      {image && (
        <div className="p-4 sm:p-5">
          <div
            className="
              relative overflow-hidden rounded-xl
              border border-[var(--pc-border)]
              bg-black/[0.03] dark:bg-white/[0.03]
              aspect-[16/9]
            "
          >
            <Image
              src={image}
              alt={`${title} - screenshot`}
              fill
              className="
                object-cover
                transition-transform duration-500 ease-out
                group-hover:scale-[1.04]
              "
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              priority={false}
            />

            {/* overlay sutil */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* badge por cima da imagem (fica premium e economiza espaço) */}
            {badge && (
              <div className="absolute left-3 top-3">
                <span
                  className="
                    inline-flex items-center gap-2 px-3 py-1
                    text-[12px] font-semibold tracking-wide
                    rounded-full
                    bg-[var(--pc-badge-bg)] text-[var(--pc-badge-text)]
                    shadow-sm
                  "
                >
                  {badge}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BODY */}
      <div className="flex flex-1 flex-col px-4 sm:px-5 pb-4 sm:pb-5">
        {/* Se não tiver imagem, badge volta pro topo */}
        {!image && badge && (
          <div className="mb-3">
            <span
              className="
                inline-flex items-center gap-2 px-3 py-1
                text-[12px] font-semibold tracking-wide
                rounded-full
                bg-[var(--pc-badge-bg)] text-[var(--pc-badge-text)]
              "
            >
              {badge}
            </span>
          </div>
        )}

        {/* Title */}
        <h3
          className="
            text-[var(--pc-title)]
            font-[var(--font-display)]
            tracking-[-0.02em]
            text-xl sm:text-2xl
            leading-tight
          "
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="
            mt-2
            text-[var(--pc-text)]
            text-sm sm:text-[15px]
            leading-[1.7]
            opacity-90
            flex-grow
            max-md:text-justify
          "
        >
          {description}
        </p>

        {/* Tech chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tech.map((techName, techIndex) => (
            <motion.span
              key={`${techName}-${techIndex}`}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.22, delay: techIndex * 0.02, ease: "easeOut" }}
              viewport={{ once: true }}
              className="
                inline-flex items-center gap-2
                px-3 py-1
                text-[12.5px] font-medium
                rounded-full
                bg-[var(--pc-chip-bg)] text-[var(--pc-chip-text)]
                border
                [border-color:color-mix(in_oklab,_var(--pc-chip-text)_18%,_transparent)]
              "
              title={techName}
            >
              {techIcons[techName] ?? <span className="w-4 h-4 rounded-full bg-current/40" />}
              {techName}
            </motion.span>
          ))}
        </div>

        {/* Footer link (separado dá hierarquia) */}
        <div className="mt-5 pt-4 border-t border-[var(--pc-border)]">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center gap-2
              w-full
              px-4 py-2.5
              text-sm font-semibold
              rounded-xl
              bg-[var(--pc-btn-bg)] text-[var(--pc-btn-text)]
              transition-[transform,box-shadow] duration-200 ease-out
              hover:-translate-y-0.5
              hover:shadow-[0_12px_30px_-18px_rgba(99,102,241,0.6)]
              focus-visible:outline-none
              focus-visible:[box-shadow:0_0_0_3px_color-mix(in_oklab,_var(--pc-btn-bg)_35%,_transparent)]
            "
            aria-label={linkLabel}
          >
            {linkLabel} <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
}