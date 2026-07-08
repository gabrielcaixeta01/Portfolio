# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # static export to /out
npm run lint     # ESLint (eslint src)
```

No test suite is configured.

## Architecture

Single-page portfolio built with Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion, and Three.js. Dark theme only (`dark` class hardcoded on `<html>`).

**Page structure** (`src/app/page.tsx`): sections render in a fixed order — Hero → SobreMim → Trajetoria → RedeProjetos (full-bleed 3D network, `id="projetos"`) → Conhecimentos → Contato → Footer.

**Layout** (`src/app/layout.tsx`): wraps everything in `LanguageProvider` → `ScrollProgress` + `Navbar`.

**Sections** live in `src/components/sections/` — one file per section (Hero, SobreMim, Trajetoria, RedeProjetos, Conhecimentos, Contato).

**Shared components** in `src/components/`: Navbar, Footer, ScrollProgress, SplitText, HeroScene (hero particle field), TechSphere/ (skills 3D sphere), `ui/` (MagneticButton, ScrollReveal), `three/` (ScrollNetworkHero — the scroll-driven 3D project network).

**Visual identity**: background `#0a0a0a`, indigo/purple/cyan accents (`#6366f1` → `#a855f7` → `#22d3ee`), Space Grotesk (`--font-display`) for headings with occasional text-stroke ghost treatment, Inter (`--font-sans`) for body, monospace for terminal-flavoured labels/eyebrows.

**Internationalisation**: all copy (PT and EN) lives in a single `translations` object inside `src/contexts/LanguageContext.tsx`. Components consume it via `const { t } = useLanguage()`. To add or change visible text, edit that file — both `pt` and `en` keys.

**Fonts**: Inter (`--font-sans`, body) and Space Grotesk (`--font-display`), loaded via `next/font/google`.

## Deployment

The site is deployed as a static export to GitHub Pages. `next.config.ts` sets `output: "export"`, `basePath: "/Portfolio"`, and `assetPrefix: "/Portfolio/"` in production. Public assets go in `/public/`, but **`next/image` and `<img>` do NOT get the base path automatically** — always wrap the src with `asset()` from `src/lib/asset.ts` (e.g. `src={asset("/foto.png")}`), which prefixes `/Portfolio` in production. Referencing `"/foto.png"` directly works in dev and 404s on GitHub Pages.
