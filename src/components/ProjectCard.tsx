"use client";

import { motion } from "framer-motion";
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
  onHover?: (project: Project | null) => void;
}

// ─── Tech icon map ────────────────────────────────────────────────────────────
const techIcons: Record<string, React.ReactElement> = {
  "Next.js":          <SiNextdotjs className="w-3 h-3" />,
  Tailwind:           <SiTailwindcss className="w-3 h-3 text-[#38BDF8]" />,
  "Tailwind CSS":     <SiTailwindcss className="w-3 h-3 text-[#38BDF8]" />,
  NestJS:             <SiNestjs className="w-3 h-3 text-[#E0234E]" />,
  "Nest.js":          <SiNestjs className="w-3 h-3 text-[#E0234E]" />,
  Prisma:             <SiPrisma className="w-3 h-3" />,
  Redis:              <SiRedis className="w-3 h-3 text-[#FF4438]" />,
  PostgreSQL:         <SiPostgresql className="w-3 h-3 text-[#336791]" />,
  TypeScript:         <SiTypescript className="w-3 h-3 text-[#3178C6]" />,
  React:              <FaReact className="w-3 h-3 text-[#61DAFB]" />,
  "Node.js":          <SiNodedotjs className="w-3 h-3 text-[#68A063]" />,
  Python:             <SiPython className="w-3 h-3 text-[#FFD43B]" />,
  "C++":              <SiCplusplus className="w-3 h-3 text-[#00599C]" />,
  Figma:              <SiFigma className="w-3 h-3 text-[#F24E1E]" />,
  Jupyter:            <SiJupyter className="w-3 h-3 text-[#F37726]" />,
  "Google Colab":     <SiGooglecolab className="w-3 h-3 text-[#F9AB00]" />,
  Git:                <SiGit className="w-3 h-3 text-[#F05032]" />,
  GitHub:             <SiGithub className="w-3 h-3" />,
  NumPy:              <SiNumpy className="w-3 h-3 text-[#013243]" />,
  Pandas:             <SiPandas className="w-3 h-3 text-[#150458]" />,
  "Framer Motion":    <SiFramer className="w-3 h-3" />,
  Vercel:             <SiVercel className="w-3 h-3" />,
  Supabase:           <SiSupabase className="w-3 h-3 text-[#3ECF8E]" />,
  "scikit-learn":     <SiPython className="w-3 h-3 text-[#F7931E]" />,
  "Network Analysis": (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="6" cy="12" r="2" strokeWidth={1.8} />
      <circle cx="18" cy="6" r="2" strokeWidth={1.8} />
      <circle cx="18" cy="18" r="2" strokeWidth={1.8} />
      <path d="M8 12h8M8 11l8-4M8 13l8 4" strokeWidth={1.5} />
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
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide ${cls}`}>
      {text}
    </span>
  );
}

// ─── Project row ──────────────────────────────────────────────────────────────
export default function ProjectCard({ project, index, onHover }: ProjectCardProps) {
  const { badge, title, description, tech, link, linkLabel = "Visitar Site", githubLink } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.09 }}
      viewport={{ once: true }}
      onMouseEnter={() => onHover?.(project)}
      onMouseLeave={() => onHover?.(null)}
      className="group border-t border-[var(--pc-border)] py-8 sm:py-10"
    >
      <div className="flex items-start gap-5 sm:gap-8">

        {/* Ordinal number */}
        <div className="hidden sm:block flex-shrink-0 w-20 pt-0.5">
          <span
            className="block text-[4.5rem] leading-none font-bold tracking-[-0.05em] select-none tabular-nums text-[var(--cc-title)] opacity-[0.07] group-hover:opacity-[0.15] transition-opacity duration-300"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-2.5">
            {/* Mobile number */}
            <span
              className="sm:hidden text-xs font-bold opacity-20 tracking-tight tabular-nums"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <BadgePill text={badge} />
          </div>

          <h3 className="text-[1.2rem] sm:text-[1.45rem] font-semibold tracking-[-0.03em] leading-tight text-[var(--pc-title)] group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200">
            {title}
          </h3>

          <p className="mt-2 text-[13px] sm:text-sm text-[var(--pc-text)] opacity-60 leading-relaxed line-clamp-2 max-w-2xl">
            {description}
          </p>

          {/* Tech — minimal inline list */}
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
            {tech.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-1.5 text-[11.5px] text-[var(--pc-text)] opacity-45 group-hover:opacity-65 transition-opacity duration-200"
              >
                {techIcons[name] ?? <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />}
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex-shrink-0 flex items-center gap-2 mt-0.5">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-full border border-[var(--pc-border)] flex items-center justify-center text-[var(--pc-text)] opacity-40 hover:opacity-80 hover:border-[var(--pc-title)]/30 transition-all duration-150"
            >
              <SiGithub className="w-3.5 h-3.5" />
            </a>
          )}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={linkLabel}
            className="w-9 h-9 rounded-full border border-[var(--pc-border)] flex items-center justify-center text-[var(--pc-title)] opacity-50 group-hover:opacity-100 group-hover:bg-indigo-500 group-hover:border-indigo-500 group-hover:text-white transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

      </div>
    </motion.div>
  );
}
