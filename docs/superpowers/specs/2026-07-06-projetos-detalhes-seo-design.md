# Design: Painel de detalhes dos projetos + pacote SEO

**Data:** 2026-07-06
**Status:** aprovado

## Objetivo

1. Dar profundidade aos projetos da rede 3D: role, mini-case (problema → solução → resultado), stack visível e screenshot, via painel overlay por nó.
2. Completar o SEO: OG image 1200×630 com a identidade do site, sitemap.xml, robots.txt e JSON-LD Person.

Escopo decidido: manter os 3 projetos atuais (Electrum, GIOGÁS, Barber Agenda); remover traduções órfãs do Kodo. Conteúdo dos cases: rascunhado por Claude, revisado pelo usuário. Favicon e metadata por idioma ficam fora do escopo.

## 1. Dados + i18n

Em `src/contexts/LanguageContext.tsx`, cada projeto (`electrumSite`, `giogas`, `baberAgenda`) ganha, em `pt` e `en`:

- `role: string` — 1 linha (ex.: "Autor único — pesquisa, análise e visualização")
- `problem: string` — 2-3 frases
- `solution: string` — 2-3 frases
- `result: string` — 2-3 frases

Remover o bloco `kodo` de ambos os idiomas.

`tech[]`, `href`, `github` permanecem em `src/components/sections/RedeProjetos.tsx` (não são traduzíveis). O tipo `NetProject` (`src/components/three/ScrollNetworkHero.tsx`) ganha campos `role`, `problem`, `solution`, `result`, `image` (todos string; `image` aponta para os PNGs existentes em `/public`).

Labels novos no i18n, em `network`: `details` ("ver detalhes"/"view details"), `problem` ("problema"/"problem"), `solution` ("solução"/"solution"), `result` ("resultado"/"result"), `close` ("fechar"/"close"), `visit` ("ver projeto"/"view project").

## 2. Componente `ProjectDetailPanel`

Novo arquivo `src/components/ui/ProjectDetailPanel.tsx` (client component).

**Props:** `project: NetProject | null`, `onClose: () => void`, `labels` (strings i18n necessárias: rótulos de problema/solução/resultado, role, CTA, fechar).

**Comportamento:**
- Overlay `fixed inset-0 z-[80]`, backdrop `bg-black/70 backdrop-blur-md`.
- Framer Motion `AnimatePresence`: backdrop faz fade, painel entra com spring suave (subindo).
- Fechar por: botão ×, tecla `Esc`, clique no backdrop.
- Scroll lock: `document.body.style.overflow = "hidden"` no mount, restaurado no unmount.
- A11y: `role="dialog"`, `aria-modal="true"`, foco movido ao painel na abertura e devolvido ao botão de origem no fechamento.

**Layout (desktop):** card central `max-w-3xl`, fundo `#0f0f12`, borda `white/10`.
1. Screenshot no topo (aspect 16/9, `next/image` com `unoptimized` — export estático).
2. Título em Space Grotesk + linha de role em monospace (estilo eyebrow das demais seções).
3. Case em três blocos rotulados `// problema`, `// solução`, `// resultado`.
4. Chips de stack (pills com borda indigo).
5. Rodapé: links "ver projeto ↗" e GitHub (quando existir).

**Mobile:** sheet full-screen com scroll interno.

## 3. Integração com a rede 3D

- `ScrollNetworkHero` ganha prop opcional `onSelect(project: NetProject)`. A legenda de cada nó ganha botão "ver detalhes" ao lado dos links existentes.
- Estado `selected: NetProject | null` vive em `RedeProjetos.tsx`, que renderiza `<ProjectDetailPanel project={selected} onClose={...} />` como irmão do `ScrollNetworkHero`.
- Zero mudança na lógica de cena/scroll do Three.js.

## 4. Pacote SEO

- **OG image:** HTML 1200×630 com a identidade (fundo `#0a0a0a`, nome em Space Grotesk, tagline, acento gradiente indigo→purple→cyan, grade de pontos sutil ecoando a rede). Screenshot via browser headless, uma única vez; commit de `public/og.png`. O HTML fonte não entra no repo. Metadata de `src/app/layout.tsx` (openGraph.images e twitter.images) passa a apontar para `og.png` (URL absoluta com basePath).
- **sitemap.xml + robots.txt:** estáticos em `/public`. Sitemap com a URL raiz (`https://gabrielcaixeta01.github.io/Portfolio/`); robots liberando tudo e apontando o sitemap.
- **JSON-LD Person:** `<script type="application/ld+json">` no layout com nome, jobTitle, url, sameAs (GitHub, LinkedIn — extraídos dos links já usados em Contato/Footer) e alumniOf (UnB).

## Validação

Sem test suite configurado. Gates por etapa: `npm run lint`, `tsc --noEmit`, `npm run build`. Verificação manual no dev server: abrir/fechar painel nos 3 nós (×, Esc, backdrop), foco restaurado, mobile viewport, scroll lock. OG validável pós-deploy com o LinkedIn Post Inspector.

## Entrega

Commits separados por etapa:
1. `feat(i18n)`: campos role/problem/solution/result + remoção do Kodo + label details.
2. `feat(ui)`: componente ProjectDetailPanel.
3. `feat(projetos)`: integração onSelect na rede + estado em RedeProjetos.
4. `feat(seo)`: og.png + metadata + sitemap + robots + JSON-LD.
