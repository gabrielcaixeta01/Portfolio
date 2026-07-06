# Painel de Detalhes de Projetos + Pacote SEO — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Painel overlay com case completo (role, problema→solução→resultado, stack, screenshot) por nó da rede 3D + OG image/sitemap/robots/JSON-LD.

**Architecture:** O painel é um client component independente (`ProjectDetailPanel`) renderizado como irmão do canvas 3D em `RedeProjetos`; o `ScrollNetworkHero` só ganha um callback `onSelect`. Conteúdo traduzível vive no `LanguageContext` (PT+EN); dados não-traduzíveis (tech, links, imagem) ficam em `RedeProjetos`. SEO é estático: PNG commitado, XML/TXT em `/public`, JSON-LD no layout.

**Tech Stack:** Next.js App Router (static export), TypeScript, Tailwind CSS v4, Framer Motion, Three.js (não tocado na lógica de cena).

**Spec:** `docs/superpowers/specs/2026-07-06-projetos-detalhes-seo-design.md`

## Global Constraints

- Export estático: `output: "export"`, `basePath: "/Portfolio"` em produção — URLs absolutas de SEO usam `https://gabrielcaixeta01.github.io/Portfolio/`.
- Todo texto visível existe em `pt` E `en` no `translations` de `src/contexts/LanguageContext.tsx`.
- Sem dependências novas. Sem test suite — gates de cada task: `npm run lint` && `npx tsc --noEmit` && `npm run build`, todos limpos.
- Identidade visual: fundo `#0a0a0a`, acentos `#6366f1`/`#a855f7`/`#22d3ee`, Space Grotesk (`--font-display`) em títulos, monospace em eyebrows/labels.
- Imagens em JSX via `next/image` com `unoptimized`, `src` sem basePath (Next prefixa).
- 1 commit por task, mensagens conforme definidas em cada task.
- Os textos de case (Task 1) são RASCUNHOS — o usuário revisa o conteúdo no checkpoint final.

---

### Task 1: i18n — campos de case, labels do painel, remoção do Kodo

**Files:**
- Modify: `src/contexts/LanguageContext.tsx` (blocos `projects` e `network`, PT ~linhas 42-81, EN ~linhas 285-323)

**Interfaces:**
- Produces: `t.projects.{electrumSite|giogas|baberAgenda}.{role,problem,solution,result}` (strings), `t.network.{details,problem,solution,result,close,visit}` (strings). Task 3 consome ambos.

- [ ] **Step 1: Adicionar campos de case no bloco PT**

Em `src/contexts/LanguageContext.tsx`, substituir os quatro sub-blocos de `projects` do PT (incluindo remoção do `kodo`) por:

```ts
      electrumSite: {
        title: "Observatório Electrum",
        description:
          "Um projeto de pesquisa que analisa o ecossistema de servidores Electrum por meio de varredura de rede, fingerprinting comportamental e clustering de metadados.",
        image: "/electrum.png",
        role: "Autor único — pesquisa, engenharia de dados e análise",
        problem:
          "O ecossistema de servidores Electrum (Bitcoin) é opaco: não se sabe quantos servidores existem, quem os opera, nem quão centralizada é a infraestrutura da qual milhares de carteiras dependem.",
        solution:
          "Construí um pipeline de varredura e fingerprinting comportamental que coleta metadados dos servidores e os agrupa via clustering, revelando operadores recorrentes e padrões de infraestrutura.",
        result:
          "Um observatório reprodutível do ecossistema, com análises e visualizações que mapeiam a concentração real da rede.",
      },
      giogas: {
        title: "Site GIOGÁS",
        description:
          "Site institucional para a GIOGÁS, empresa do Rio de Janeiro.",
        image: "/giogas.png",
        role: "Desenvolvimento completo — do design à publicação",
        problem:
          "A GIOGÁS não tinha presença digital própria: dependia de canais de terceiros para apresentar seus serviços e receber contatos comerciais.",
        solution:
          "Site institucional em Next.js e Tailwind, com seções de serviços e contato direto, responsivo e otimizado para carregamento rápido.",
        result:
          "Presença online própria e profissional, com canal direto de contato para clientes, publicada na Vercel.",
      },
      baberAgenda: {
        title: "Agenda de Barbearia",
        description:
          "Aplicação web para agendamento de serviços em barbearias, com painel administrativo para gerenciamento de horários e clientes.",
        image: "/barber-agenda.png",
        role: "Desenvolvimento full-stack — do modelo de dados à interface",
        problem:
          "Barbearias pequenas ainda agendam por telefone e mensagem, o que gera conflitos de horário e nenhum histórico de clientes.",
        solution:
          "Aplicação web com agendamento self-service para o cliente e painel administrativo para gerenciar horários, serviços e clientes, com dados no Supabase.",
        result:
          "Fluxo de agendamento de ponta a ponta, centralizando a agenda e eliminando a coordenação manual.",
      },
```

(O bloco `kodo` do PT é removido nesta substituição.)

- [ ] **Step 2: Adicionar labels do painel no `network` PT**

```ts
    network: {
      eyebrow: "projetos",
      title: "Uma rede, três destinos",
      intro: "Role para viajar de nó em nó.",
      node: "nó",
      hint: "role para navegar pela rede ↓",
      cta: "ver projeto",
      details: "ver detalhes",
      problem: "problema",
      solution: "solução",
      result: "resultado",
      close: "fechar",
      visit: "ver projeto",
    },
```

- [ ] **Step 3: Espelhar no bloco EN**

Sub-blocos de `projects` do EN (removendo `kodo`):

```ts
      electrumSite: {
        title: "Electrum Observatory",
        description:
          "A research project analyzing the Electrum server ecosystem through network scanning, behavioral fingerprinting, and metadata clustering.",
        image: "/electrum.png",
        role: "Sole author — research, data engineering, and analysis",
        problem:
          "The Electrum (Bitcoin) server ecosystem is opaque: nobody knows how many servers exist, who operates them, or how centralized the infrastructure thousands of wallets depend on really is.",
        solution:
          "I built a scanning and behavioral-fingerprinting pipeline that collects server metadata and groups it via clustering, revealing recurring operators and infrastructure patterns.",
        result:
          "A reproducible observatory of the ecosystem, with analyses and visualizations mapping the network's actual concentration.",
      },
      giogas: {
        title: "GIOGÁS Website",
        description:
          "Institutional website for GIOGÁS, a company based in Rio de Janeiro.",
        image: "/giogas.png",
        role: "End-to-end development — from design to deployment",
        problem:
          "GIOGÁS had no digital presence of its own: it relied on third-party channels to present its services and receive business inquiries.",
        solution:
          "Institutional website built with Next.js and Tailwind, with service sections and direct contact, responsive and optimized for fast loading.",
        result:
          "A professional online presence with a direct contact channel for clients, deployed on Vercel.",
      },
      baberAgenda: {
        title: "Barber Agenda",
        description:
          "Web application for scheduling services in barbershops, with an admin panel for managing appointments and clients.",
        image: "/barber-agenda.png",
        role: "Full-stack development — from data model to interface",
        problem:
          "Small barbershops still schedule by phone and text, which causes booking conflicts and leaves no client history.",
        solution:
          "Web app with self-service booking for clients and an admin panel to manage schedules, services, and clients, with data on Supabase.",
        result:
          "An end-to-end booking flow that centralizes the schedule and removes manual coordination.",
      },
```

(Aproveitar para corrigir o typo do title EN: "Baber Agenda" → "Barber Agenda".)

`network` EN:

```ts
    network: {
      eyebrow: "projects",
      title: "One network, three destinations",
      intro: "Scroll to travel from node to node.",
      node: "node",
      hint: "scroll to navigate the network ↓",
      cta: "view project",
      details: "view details",
      problem: "problem",
      solution: "solution",
      result: "result",
      close: "close",
      visit: "view project",
    },
```

- [ ] **Step 4: Verificar que nada mais referencia `kodo`**

Run: `grep -rn "kodo" src/`
Expected: nenhum resultado. (Se aparecer algo fora do LanguageContext, remover a referência.)

- [ ] **Step 5: Gates**

Run: `npm run lint && npx tsc --noEmit && npm run build`
Expected: todos limpos. (Se `tsc` falhar porque `translations.en` deixou de espelhar `translations.pt`, os dois blocos ficaram assimétricos — conferir campo a campo.)

- [ ] **Step 6: Commit**

```bash
git add src/contexts/LanguageContext.tsx
git commit -m "feat(i18n): cases dos projetos (role/problema/solução/resultado) e labels do painel

Remove traduções órfãs do Kodo; corrige typo Barber Agenda no EN.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Componente ProjectDetailPanel

**Files:**
- Modify: `src/components/three/ScrollNetworkHero.tsx:6-13` (apenas o tipo `NetProject`)
- Create: `src/components/ui/ProjectDetailPanel.tsx`

**Interfaces:**
- Consumes: tipo `NetProject` de `../three/ScrollNetworkHero`.
- Produces: `NetProject` estendido com `role: string; problem: string; solution: string; result: string; image: string;` (obrigatórios). Componente `ProjectDetailPanel({ project, labels, onClose })` com `project: NetProject | null`, `labels: { problem: string; solution: string; result: string; close: string; visit: string }`, `onClose: () => void`. Task 3 consome ambos.

- [ ] **Step 1: Estender o tipo NetProject (campos opcionais)**

Em `src/components/three/ScrollNetworkHero.tsx`, substituir o tipo. Os campos novos entram como **opcionais** nesta task para o commit continuar verde (`RedeProjetos.tsx` ainda não os fornece); a Task 3 os torna obrigatórios ao preencher os dados:

```ts
export type NetProject = {
  id: string;
  name: string;
  sub: string;
  href?: string;
  github?: string;
  tech?: string[];
  role?: string;
  problem?: string;
  solution?: string;
  result?: string;
  image?: string;
};
```

- [ ] **Step 2: Criar `src/components/ui/ProjectDetailPanel.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { NetProject } from "../three/ScrollNetworkHero";

export type PanelLabels = {
  problem: string;
  solution: string;
  result: string;
  close: string;
  visit: string;
};

type Props = {
  project: NetProject | null;
  labels: PanelLabels;
  onClose: () => void;
};

/**
 * Overlay de detalhes de um projeto da rede 3D. Irmão do canvas — não toca
 * a cena. Fecha por ×, Esc ou clique no backdrop; trava o scroll enquanto
 * aberto e devolve o foco ao elemento de origem ao fechar.
 */
export default function ProjectDetailPanel({ project, labels, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus();
    };
  }, [project, onClose]);

  const caseBlocks = project
    ? ([
        [labels.problem, project.problem],
        [labels.solution, project.solution],
        [labels.result, project.result],
      ] as const)
    : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop */}
          <button
            aria-label={labels.close}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-default"
          />

          {/* painel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={project.name}
            tabIndex={-1}
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 32, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full sm:max-w-3xl max-h-full sm:max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-white/10 bg-[#0f0f12] outline-none"
          >
            {/* screenshot */}
            {project.image && (
              <div className="relative aspect-video w-full border-b border-white/10">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  unoptimized
                  className="object-cover object-top"
                />
              </div>
            )}

            {/* botão fechar */}
            <button
              onClick={onClose}
              aria-label={labels.close}
              className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/60 border border-white/15 text-zinc-300 hover:text-white hover:border-white/40 transition-colors"
            >
              ×
            </button>

            <div className="p-6 sm:p-10">
              {project.role && (
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-indigo-400 mb-3">
                  {project.role}
                </p>
              )}
              <h3
                className="text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-zinc-100"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {project.name}
              </h3>

              <div className="mt-8 flex flex-col gap-6">
                {caseBlocks.map(
                  ([label, text]) =>
                    text && (
                      <div key={label}>
                        <p className="font-mono text-[11px] text-zinc-500 mb-1.5">
                          {"// "}
                          {label}
                        </p>
                        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                          {text}
                        </p>
                      </div>
                    )
                )}
              </div>

              {project.tech && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] px-3 py-1 rounded-full border border-indigo-400/30 text-indigo-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-10 flex items-center gap-6">
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[13px] text-indigo-400 border-b border-indigo-400/40 hover:border-indigo-400 transition-colors"
                  >
                    {labels.visit} ↗
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[13px] text-zinc-500 border-b border-zinc-500/30 hover:text-zinc-300 hover:border-zinc-400 transition-colors"
                  >
                    github ↗
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Gates**

Run: `npm run lint && npx tsc --noEmit && npm run build`
Expected: todos limpos (o componente ainda não é usado — apenas compila).

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ProjectDetailPanel.tsx src/components/three/ScrollNetworkHero.tsx
git commit -m "feat(ui): painel overlay de detalhes de projeto

Dialog acessível (Esc, backdrop, foco restaurado, scroll lock) com case
problema/solução/resultado, chips de stack, screenshot e links.

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Integração — botão "ver detalhes" na rede + estado em RedeProjetos

**Files:**
- Modify: `src/components/three/ScrollNetworkHero.tsx` (tipos `Labels`/`Props`, assinatura do componente, bloco de links da legenda ~linhas 401-422)
- Modify: `src/components/sections/RedeProjetos.tsx` (reescrita completa abaixo)

**Interfaces:**
- Consumes: `ProjectDetailPanel` e `NetProject` (Task 2); `t.projects.*.{role,problem,solution,result,image}` e `t.network.*` (Task 1).
- Produces: `ScrollNetworkHero` aceita `onSelect?: (p: NetProject) => void`; `Labels` ganha `details: string`.

- [ ] **Step 1: Tornar obrigatórios os campos novos de NetProject**

Em `src/components/three/ScrollNetworkHero.tsx` (agora que os dados serão preenchidos):

```ts
export type NetProject = {
  id: string;
  name: string;
  sub: string;
  href?: string;
  github?: string;
  tech?: string[];
  role: string;
  problem: string;
  solution: string;
  result: string;
  image: string;
};
```

- [ ] **Step 2: Prop `onSelect` + label `details` no ScrollNetworkHero**

Tipo `Labels` ganha o campo:

```ts
type Labels = {
  eyebrow: string;
  title: string;
  intro: string;
  node: string;
  hint: string;
  cta: string;
  details: string;
};
```

`Props` e assinatura:

```ts
type Props = {
  projects: NetProject[];
  labels: Labels;
  heightVh?: number;
  onSelect?: (p: NetProject) => void;
};
```

```ts
export default function ScrollNetworkHero({ projects, labels, heightVh = 340, onSelect }: Props) {
```

- [ ] **Step 3: Botão "ver detalhes" na legenda**

No bloco `<div className="flex items-center gap-5 mt-4">` da legenda, inserir o botão ANTES do link `p.href`:

```tsx
            <div className="flex items-center gap-5 mt-4">
              {onSelect && (
                <button
                  onClick={() => onSelect(p)}
                  className="font-mono text-[13px] text-cyan-300 border-b border-cyan-300/40 hover:border-cyan-300 transition-colors cursor-pointer"
                >
                  {labels.details} +
                </button>
              )}
              {p.href && (
```

(O restante do bloco de links permanece igual.)

- [ ] **Step 4: Reescrever RedeProjetos com dados completos + estado**

Substituir o conteúdo de `src/components/sections/RedeProjetos.tsx` por:

```tsx
"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import ScrollNetworkHero, { NetProject } from "../three/ScrollNetworkHero";
import ProjectDetailPanel from "../ui/ProjectDetailPanel";

/**
 * Scroll-driven 3D network journey through the featured projects.
 * Data mirrors the Projetos section so both stay in sync with i18n.
 * Clicking "details" on a node opens the ProjectDetailPanel overlay.
 */
export default function RedeProjetos() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<NetProject | null>(null);

  const projects: NetProject[] = useMemo(
    () => [
      {
        id: "electrum",
        name: t.projects.electrumSite.title,
        sub: t.projects.electrumSite.description,
        href: "https://gabrielcaixeta01.github.io/electrum-observatory/",
        github: "https://github.com/gabrielcaixeta01/electrum-observatory",
        tech: ["Python", "Jupyter", "Network Analysis", "scikit-learn"],
        role: t.projects.electrumSite.role,
        problem: t.projects.electrumSite.problem,
        solution: t.projects.electrumSite.solution,
        result: t.projects.electrumSite.result,
        image: t.projects.electrumSite.image,
      },
      {
        id: "giogas",
        name: t.projects.giogas.title,
        sub: t.projects.giogas.description,
        href: "https://site-giogas.vercel.app/",
        tech: ["React", "Next.js", "Tailwind", "TypeScript"],
        role: t.projects.giogas.role,
        problem: t.projects.giogas.problem,
        solution: t.projects.giogas.solution,
        result: t.projects.giogas.result,
        image: t.projects.giogas.image,
      },
      {
        id: "barber",
        name: t.projects.baberAgenda.title,
        sub: t.projects.baberAgenda.description,
        href: "https://barber-agenda-one.vercel.app/",
        tech: ["React", "TypeScript", "Tailwind", "Supabase"],
        role: t.projects.baberAgenda.role,
        problem: t.projects.baberAgenda.problem,
        solution: t.projects.baberAgenda.solution,
        result: t.projects.baberAgenda.result,
        image: t.projects.baberAgenda.image,
      },
    ],
    [t]
  );

  return (
    <>
      <ScrollNetworkHero projects={projects} labels={t.network} onSelect={setSelected} />
      <ProjectDetailPanel
        project={selected}
        labels={t.network}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
```

- [ ] **Step 5: Gates**

Run: `npm run lint && npx tsc --noEmit && npm run build`
Expected: todos limpos.

- [ ] **Step 6: Verificação manual no dev server**

Run: `npm run dev` e abrir `http://localhost:3000`, rolar até a rede 3D. Verificar:
1. Botão "ver detalhes +" aparece na legenda de cada um dos 3 nós.
2. Clicar abre o painel com screenshot, role, 3 blocos de case, chips e links.
3. Fecha por: ×, Esc, clique fora. Foco volta ao botão. Scroll de fundo travado enquanto aberto.
4. Trocar idioma (navbar) → painel e labels em EN.
5. Viewport mobile (DevTools ~390px): painel vira sheet full-screen com scroll interno.

Expected: tudo funcionando; a cena 3D não muda de comportamento.

- [ ] **Step 7: Commit**

```bash
git add src/components/three/ScrollNetworkHero.tsx src/components/sections/RedeProjetos.tsx
git commit -m "feat(projetos): botão ver detalhes nos nós da rede abre painel de case

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Pacote SEO — og.png, sitemap, robots, JSON-LD

**Files:**
- Create: `public/og.png` (gerado, 1200×630)
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Modify: `src/app/layout.tsx` (metadata images + JSON-LD)
- Scratchpad (fora do repo): `og.html`

**Interfaces:**
- Consumes: nada das tasks anteriores (independente).
- Produces: artefatos estáticos finais; nenhuma task consome.

- [ ] **Step 1: Criar o HTML da OG image no scratchpad**

Criar `<scratchpad>/og.html` (usar o caminho do scratchpad da sessão):

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400&display=swap" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden; position: relative;
    background: #0a0a0a; color: #fafafa;
    font-family: "Space Grotesk", sans-serif;
  }
  .dots {
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(99,102,241,.22) 1px, transparent 1px);
    background-size: 36px 36px;
  }
  .glow-a {
    position: absolute; width: 700px; height: 700px; right: -220px; top: -260px;
    background: radial-gradient(circle, rgba(99,102,241,.30), transparent 60%);
  }
  .glow-b {
    position: absolute; width: 620px; height: 620px; left: -160px; bottom: -320px;
    background: radial-gradient(circle, rgba(34,211,238,.16), transparent 60%);
  }
  .wrap {
    position: absolute; inset: 0; padding: 80px;
    display: flex; flex-direction: column; justify-content: center;
  }
  .eyebrow {
    font-family: ui-monospace, "SF Mono", Menlo, monospace;
    font-size: 20px; letter-spacing: .25em; text-transform: uppercase;
    color: #818cf8; margin-bottom: 28px;
  }
  h1 { font-size: 88px; font-weight: 700; letter-spacing: -.04em; line-height: 1.02; }
  h1 .grad {
    background: linear-gradient(90deg, #6366f1, #a855f7, #22d3ee);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  p {
    font-family: "Inter", sans-serif; font-size: 28px; color: #a1a1aa;
    margin-top: 28px; max-width: 780px; line-height: 1.4;
  }
  .bar {
    position: absolute; left: 0; right: 0; bottom: 0; height: 8px;
    background: linear-gradient(90deg, #6366f1, #a855f7, #22d3ee);
  }
</style>
</head>
<body>
  <div class="dots"></div>
  <div class="glow-a"></div>
  <div class="glow-b"></div>
  <div class="wrap">
    <div class="eyebrow">// portfolio</div>
    <h1>Gabriel <span class="grad">Caixeta</span></h1>
    <p>Desenvolvedor full-stack — Next.js, TypeScript e código bem estruturado.</p>
  </div>
  <div class="bar"></div>
</body>
</html>
```

- [ ] **Step 2: Screenshot 1200×630 via Chrome headless**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --screenshot="<scratchpad>/og.png" \
  --window-size=1200,630 --hide-scrollbars --virtual-time-budget=8000 \
  "file://<scratchpad>/og.html"
```

(Se o Chrome não existir nesse caminho, tentar `Chromium`/`Brave`/`Microsoft Edge` em `/Applications`, mesmos flags. `--virtual-time-budget` dá tempo das webfonts carregarem.)

- [ ] **Step 3: Validar dimensões e inspecionar visualmente**

Run: `sips -g pixelWidth -g pixelHeight <scratchpad>/og.png`
Expected: `pixelWidth: 1200`, `pixelHeight: 630`.
Depois, LER o PNG (tool Read) e conferir: fontes carregadas (não serif fallback), gradiente no sobrenome, sem texto cortado. Se estiver ruim, ajustar o HTML e repetir Step 2.

- [ ] **Step 4: Copiar para /public**

```bash
cp "<scratchpad>/og.png" public/og.png
```

- [ ] **Step 5: Criar robots.txt e sitemap.xml**

`public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://gabrielcaixeta01.github.io/Portfolio/sitemap.xml
```

`public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://gabrielcaixeta01.github.io/Portfolio/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 6: Apontar metadata para og.png e adicionar JSON-LD**

Em `src/app/layout.tsx`:

(a) Em `metadata.openGraph.images`, trocar a URL:

```ts
    images: [
      {
        url: "https://gabrielcaixeta01.github.io/Portfolio/og.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Caixeta — Desenvolvedor Full-Stack",
      },
    ],
```

(b) Em `metadata.twitter.images`:

```ts
    images: ["https://gabrielcaixeta01.github.io/Portfolio/og.png"],
```

(c) Antes do `export default function RootLayout`, adicionar:

```ts
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gabriel Caixeta Romero",
  jobTitle: "Full-Stack Developer",
  url: "https://gabrielcaixeta01.github.io/Portfolio/",
  sameAs: [
    "https://github.com/gabrielcaixeta01",
    "https://www.linkedin.com/in/gabriel-caixeta-romero",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidade de Brasília",
  },
};
```

(d) Dentro do `<body>`, antes de `<LanguageProvider>`:

```tsx
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
```

- [ ] **Step 7: Gates + conferência do export**

Run: `npm run lint && npx tsc --noEmit && npm run build`
Expected: limpos.

Run: `ls out/og.png out/robots.txt out/sitemap.xml && grep -o 'og.png' out/index.html | head -1 && grep -o 'application/ld+json' out/index.html`
Expected: os 3 arquivos existem no export; `og.png` e `application/ld+json` aparecem no HTML gerado.

- [ ] **Step 8: Commit**

```bash
git add public/og.png public/robots.txt public/sitemap.xml src/app/layout.tsx
git commit -m "feat(seo): OG image com a identidade do site, sitemap, robots e JSON-LD Person

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

## Checkpoint final (com o usuário)

1. Revisar os textos de case (PT/EN) — são rascunhos; corrigir fatos/tom.
2. Passar pelo fluxo do painel nos 3 nós no dev server.
3. Após push + deploy: validar preview com LinkedIn Post Inspector e `https://gabrielcaixeta01.github.io/Portfolio/og.png` no browser.
