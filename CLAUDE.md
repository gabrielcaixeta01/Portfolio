# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # static export to /out
npm run lint     # ESLint via next lint
```

No test suite is configured.

## Architecture

Single-page portfolio built with Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion, and Three.js.

**Page structure** (`src/app/page.tsx`): sections render in a fixed order — Hero → SobreMim → Trajetoria → Projetos → CircularScramble → Conhecimentos → Contato → Footer.

**Layout** (`src/app/layout.tsx`): wraps everything in `ThemeProvider` (next-themes, dark mode via `class` strategy) → `LanguageProvider` → `ScrollProgress` + `Navbar`.

**Sections** live in `src/components/sections/` — one file per section (Hero, SobreMim, Trajetoria, Projetos, Conhecimentos, Contato).

**Shared components** in `src/components/`: Navbar, Footer, ScrollProgress, CircularScramble, MagneticWrapper, SplitText, ThemeSwitch, ProjectCard.

**Internationalisation**: all copy (PT and EN) lives in a single `translations` object inside `src/contexts/LanguageContext.tsx`. Components consume it via `const { t } = useLanguage()`. To add or change visible text, edit that file — both `pt` and `en` keys.

**Fonts**: Inter (`--font-sans`, body) and Space Grotesk (`--font-display`), loaded via `next/font/google`.

## Deployment

The site is deployed as a static export to GitHub Pages. `next.config.ts` sets `output: "export"`, `basePath: "/Portfolio"`, and `assetPrefix: "/Portfolio/"` in production. Public assets go in `/public/` and are referenced without the base path in JSX (Next.js handles prefixing).
