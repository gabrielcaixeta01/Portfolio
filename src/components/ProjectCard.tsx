"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  SiNextdotjs, SiTailwindcss, SiNestjs, SiPrisma, SiRedis, SiPostgresql,
  SiTypescript, SiNodedotjs, SiPython, SiCplusplus, SiFigma,
  SiJupyter, SiGooglecolab, SiGit, SiGithub, SiNumpy, SiPandas, SiFramer,
  SiVercel, SiSupabase,
} from "react-icons/si";
import { FaReact } from "react-icons/fa";

// ─── Types ────────────────────────────────────────────────────────────────────
export type Project = {
  badge?: string;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  link: string;
  linkLabel?: string;
  githubLink?: string;
  featured?: boolean;
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

// ─── Tech icon map ────────────────────────────────────────────────────────────
const techIcons: Record<string, React.ReactElement> = {
  "Next.js":        <SiNextdotjs className="w-3.5 h-3.5" />,
  Tailwind:         <SiTailwindcss className="w-3.5 h-3.5 text-[#38BDF8]" />,
  "Tailwind CSS":   <SiTailwindcss className="w-3.5 h-3.5 text-[#38BDF8]" />,
  NestJS:           <SiNestjs className="w-3.5 h-3.5 text-[#E0234E]" />,
  "Nest.js":        <SiNestjs className="w-3.5 h-3.5 text-[#E0234E]" />,
  Prisma:           <SiPrisma className="w-3.5 h-3.5" />,
  Redis:            <SiRedis className="w-3.5 h-3.5 text-[#FF4438]" />,
  PostgreSQL:       <SiPostgresql className="w-3.5 h-3.5 text-[#336791]" />,
  TypeScript:       <SiTypescript className="w-3.5 h-3.5 text-[#3178C6]" />,
  React:            <FaReact className="w-3.5 h-3.5 text-[#61DAFB]" />,
  "Node.js":        <SiNodedotjs className="w-3.5 h-3.5 text-[#68A063]" />,
  Python:           <SiPython className="w-3.5 h-3.5 text-[#FFD43B]" />,
  "C++":            <SiCplusplus className="w-3.5 h-3.5 text-[#00599C]" />,
  Figma:            <SiFigma className="w-3.5 h-3.5 text-[#F24E1E]" />,
  Jupyter:          <SiJupyter className="w-3.5 h-3.5 text-[#F37726]" />,
  "Google Colab":   <SiGooglecolab className="w-3.5 h-3.5 text-[#F9AB00]" />,
  Git:              <SiGit className="w-3.5 h-3.5 text-[#F05032]" />,
  GitHub:           <SiGithub className="w-3.5 h-3.5" />,
  NumPy:            <SiNumpy className="w-3.5 h-3.5 text-[#013243]" />,
  Pandas:           <SiPandas className="w-3.5 h-3.5 text-[#150458]" />,
  "Framer Motion":  <SiFramer className="w-3.5 h-3.5" />,
  Vercel:           <SiVercel className="w-3.5 h-3.5" />,
  Supabase:         <SiSupabase className="w-3.5 h-3.5 text-[#3ECF8E]" />,
  "scikit-learn":   <SiPython className="w-3.5 h-3.5 text-[#F7931E]" />,
  "Network Analysis": (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="6" cy="12" r="2" strokeWidth={1.8} />
      <circle cx="18" cy="6" r="2" strokeWidth={1.8} />
      <circle cx="18" cy="18" r="2" strokeWidth={1.8} />
      <path d="M8 12h8M8 11l8-4M8 13l8 4" strokeWidth={1.5} />
    </svg>
  ),
  PWA: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 18.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 5.5V3M12 21v-2.5M5.5 12H3M21 12h-2.5" />
    </svg>
  ),
};

// ─── Badge pill ───────────────────────────────────────────────────────────────
const badgeColorMap: Record<string, string> = {
  "Electrum Observatory": "bg-indigo-500/10 text-indigo-400 ring-1 ring-inset ring-indigo-500/20",
  "Projeto Pessoal":      "bg-blue-500/10   text-blue-400   ring-1 ring-inset ring-blue-500/20",
  "Projeto Freelancer":   "bg-amber-500/10  text-amber-400  ring-1 ring-inset ring-amber-500/20",
  "Personal Project":     "bg-blue-500/10   text-blue-400   ring-1 ring-inset ring-blue-500/20",
  "Freelance Project":    "bg-amber-500/10  text-amber-400  ring-1 ring-inset ring-amber-500/20",
};

function BadgePill({ text }: { text?: string }) {
  if (!text) return null;
  const cls = badgeColorMap[text] ?? "bg-slate-500/10 text-slate-400 ring-1 ring-inset ring-slate-500/20";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${cls}`}>
      {text}
    </span>
  );
}

// ─── Tech chip ────────────────────────────────────────────────────────────────
function TechChip({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-medium bg-[var(--pc-chip-bg)] text-[var(--pc-chip-text)]">
      {techIcons[name] ?? <span className="w-3 h-3 rounded-full bg-current/30 inline-block" />}
      {name}
    </span>
  );
}

// ─── Featured card ────────────────────────────────────────────────────────────
function FeaturedCard({ project }: { project: Project }) {
  const { badge, title, description, tech, image, link, linkLabel = "Visitar Site", githubLink } = project;
  const imgSrc = `${process.env.NODE_ENV === "production" ? "/Portfolio" : ""}${image}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="
        group relative overflow-hidden rounded-2xl
        bg-[var(--pc-bg)] border border-[var(--pc-border)]
        shadow-[var(--pc-shadow)]
        hover:shadow-[0_24px_64px_-20px_rgba(99,102,241,0.22)]
        transition-all duration-300
      "
    >
      <div className="flex flex-col lg:flex-row">

        {/* Image — fills left 55% */}
        <div className="relative w-full lg:w-[55%] aspect-video lg:aspect-auto lg:min-h-[360px] overflow-hidden flex-shrink-0">
          {image && (
            <>
              <Image
                src={imgSrc}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              {/* Right fade into card bg (desktop) */}
              <div className="hidden lg:block absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--pc-bg)] via-[var(--pc-bg)]/60 to-transparent" />
              {/* Bottom fade (mobile) */}
              <div className="lg:hidden absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--pc-bg)] to-transparent" />
            </>
          )}
          {/* Featured watermark */}
          <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.18em] font-medium text-white/50 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
            ★ featured
          </span>
        </div>

        {/* Content — right 45% */}
        <div className="flex flex-col justify-center p-6 lg:p-8 lg:pl-6 gap-4 lg:w-[45%]">
          <BadgePill text={badge} />

          <div>
            <h3 className="text-2xl sm:text-[1.65rem] font-semibold tracking-[-0.03em] leading-tight text-[var(--pc-title)]">
              {title}
            </h3>
            <p className="mt-3 text-sm sm:text-[14.5px] text-[var(--pc-text)] leading-relaxed opacity-75">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {tech.map((t) => <TechChip key={t} name={t} />)}
          </div>

          <div className="flex gap-2 pt-1">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={linkLabel}
              className="
                inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl
                text-sm font-semibold
                bg-[var(--pc-btn-bg)] text-[var(--pc-btn-text)]
                hover:opacity-90 transition-opacity
              "
            >
              {linkLabel}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver código no GitHub"
                className="
                  inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl
                  text-sm font-semibold
                  border border-[var(--pc-border)] text-[var(--pc-title)]
                  hover:border-indigo-400/40 transition-colors
                "
              >
                <SiGithub className="w-4 h-4" />
                Código
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Standard card ────────────────────────────────────────────────────────────
export default function ProjectCard({ project, index }: ProjectCardProps) {
  if (project.featured) return <FeaturedCard project={project} />;

  const { badge, title, description, tech, image, link, linkLabel = "Visitar Site", githubLink } = project;
  const imgSrc = `${process.env.NODE_ENV === "production" ? "/Portfolio" : ""}${image}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.max(0, (index - 1) * 0.09) }}
      viewport={{ once: true }}
      className="
        group flex flex-col h-full
        rounded-2xl overflow-hidden
        bg-[var(--pc-bg)] border border-[var(--pc-border)]
        shadow-[var(--pc-shadow)]
        hover:-translate-y-1
        hover:shadow-[0_20px_50px_-20px_rgba(2,6,23,0.18)]
        dark:hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]
        transition-all duration-200 ease-out
      "
    >
      {/* Image — full bleed */}
      {image && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <BadgePill text={badge} />
        </div>

        <div className="flex-1">
          <h3 className="text-[17px] font-semibold tracking-[-0.02em] leading-snug text-[var(--pc-title)]">
            {title}
          </h3>
          <p className="mt-1.5 text-[13.5px] text-[var(--pc-text)] leading-relaxed opacity-70 line-clamp-3">
            {description}
          </p>
        </div>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5">
          {tech.map((t) => <TechChip key={t} name={t} />)}
        </div>

        {/* Footer */}
        <div className="pt-3 mt-auto border-t border-[var(--pc-border)] flex gap-2">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={linkLabel}
            className={`
              inline-flex items-center justify-center gap-1.5
              px-4 py-2 rounded-lg text-[13px] font-semibold
              bg-[var(--pc-btn-bg)] text-[var(--pc-btn-text)]
              hover:opacity-90 transition-opacity
              ${githubLink ? "flex-1" : "w-full"}
            `}
          >
            {linkLabel}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver código no GitHub"
              className="
                inline-flex items-center justify-center
                px-3 py-2 rounded-lg
                border border-[var(--pc-border)] text-[var(--pc-title)]
                hover:border-indigo-400/40 transition-colors
              "
            >
              <SiGithub className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
