---
name: verify
description: Receita de verificação runtime deste portfolio — build, launch e drive com screenshots via puppeteer-core + Chrome do sistema.
---

# Verificação runtime do portfolio

## Launch
- `npm run dev` — porta 3000 (se ocupada, o Next cai pra 3001 mas FALHA por lock de `.next/dev/lock` se já houver outro `next dev` rodando; nesse caso use o server existente na 3000).
- Confirme com `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/` → 200.

## Drive (GUI → pixels)
- `npm i puppeteer-core` num diretório temporário (fora do repo) e use o Chrome do sistema:
  `executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`, `headless: "new"`, `args: ["--hide-scrollbars"]`.
- Desktop 1440×900; mobile 390×844. WebGL (NeuralCore, TechSphere, ScrollNetworkHero) renderiza no headless via SwiftShader — espere ~2.5s após load.
- Navegação por seção: `document.getElementById("sobre"|"projetos"|"conhecimentos").scrollIntoView()`.

## Flows que valem dirigir
- **Hero**: canvas presente em `#hero canvas`; sem restos de terminal (`whoami` não deve existir no body).
- **Painel de projetos**: a seção `#projetos` tem 340vh; role em passos de `0.45 * innerHeight` até um botão "ver detalhes" cujo caption tenha `opacity > 0.5`, clique, cheque `[role='dialog']`, imagem carregada (`img.complete && naturalWidth > 0`), `document.body.style.overflow === "hidden"`, Esc fecha e restaura.
- **Conhecimentos mobile**: nomes/nível/barra ficam `display: none` abaixo de `sm`; só tiles de ícone.

## Gotchas
- Textos com `text-transform: uppercase` saem transformados no `innerText` — compare case-insensitive.
- Animações `whileInView` demoram ~1-2s após o scroll; screenshots precisam de sleep.
- `asset()` (src/lib/asset.ts) só prefixa `/Portfolio` em produção — em dev os srcs são `/foo.png` mesmo; pra validar produção, grep `"/Portfolio"` nos chunks de `out/_next/static/chunks/` após `npm run build`.
