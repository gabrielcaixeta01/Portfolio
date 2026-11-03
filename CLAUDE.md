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

Minimal single-page portfolio (Next.js App Router, TypeScript, Tailwind CSS v4), focused on ML/data. No animation or 3D libraries — keep it simple and text-first.

**Layout**: `src/app/layout.tsx` (metadata, JSON-LD, Inter font, `LanguageProvider`) → `src/app/page.tsx`, which holds the whole page: a sticky left sidebar on `lg` (name, role, tagline, section nav with active-section highlight via IntersectionObserver, socials, résumé link, PT/EN toggle) and a right column with sections `about` → `experience` → `education` → `projects` → `skills`.

**Visual identity**: dark only, background `#0b0d12`, gray body text, light headings, single teal accent (`--accent: #5eead4`). Colour tokens live on `:root` in `src/app/globals.css`; `.link` is the shared link style.

**Internationalisation**: all copy (PT and EN) lives in the `translations` object in `src/contexts/LanguageContext.tsx` (experience/education as `Entry[]`, projects as `Project[]`). Edit both `pt` and `en`.

**Résumé**: `public/cv.pdf`, linked via `asset("/cv.pdf")`. Replace the file to update it.

## Deployment

The site is deployed as a static export to GitHub Pages. `next.config.ts` sets `output: "export"`, `basePath: "/Portfolio"`, and `assetPrefix: "/Portfolio/"` in production. Public assets go in `/public/`, but **`next/image` and `<img>` do NOT get the base path automatically** — always wrap the src with `asset()` from `src/lib/asset.ts` (e.g. `src={asset("/foto.png")}`), which prefixes `/Portfolio` in production. Referencing `"/foto.png"` directly works in dev and 404s on GitHub Pages.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
