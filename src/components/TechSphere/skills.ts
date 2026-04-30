export interface Skill {
  name: string;
  slug: string;
  color: string;
}

export const SKILLS: Skill[] = [
  { name: "GIT",        slug: "git",          color: "F05032" },
  { name: "DOCKER",     slug: "docker",        color: "2496ED" },
  { name: "NODE.JS",    slug: "nodedotjs",     color: "339933" },
  { name: "PYTHON",     slug: "python",        color: "3776AB" },
  { name: "C++",        slug: "cplusplus",     color: "00599C" },
  { name: "TYPESCRIPT", slug: "typescript",    color: "3178C6" },
  { name: "NESTJS",     slug: "nestjs",        color: "E0234E" },
  { name: "REACT",      slug: "react",         color: "61DAFB" },
  { name: "JAVASCRIPT", slug: "javascript",    color: "F7DF1E" },
  { name: "NEXT.JS",    slug: "nextdotjs",     color: "FFFFFF" },
  { name: "PRISMA",     slug: "prisma",        color: "FFFFFF" },
  { name: "TAILWIND",   slug: "tailwindcss",   color: "06B6D4" },
  { name: "VERCEL",     slug: "vercel",        color: "FFFFFF" },
  { name: "FIGMA",      slug: "figma",         color: "F24E1E" },
  { name: "POSTGRESQL", slug: "postgresql",    color: "4169E1" },
  { name: "GITHUB",     slug: "github",        color: "FFFFFF" },
];
