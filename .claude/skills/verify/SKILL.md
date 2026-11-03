---
name: verify
description: Receita de verificação runtime deste portfolio — build, launch e drive com screenshots via puppeteer-core + Chrome do sistema.
---

# Verificação runtime do portfolio

## Launch
- `npm run dev` — porta 3000 (se já houver um `next dev` rodando, use o server existente).
- Confirme com `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/` → 200.

## Drive (GUI → pixels)
- `npm i puppeteer-core` num diretório temporário (fora do repo) e use o Chrome do sistema:
  `executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`, `headless: "new"`, `args: ["--hide-scrollbars"]`.
- Desktop 1440×900; mobile 390×844. Página estática, sem animações — screenshots logo após `networkidle0`.
- Seções: `about`, `experience`, `education`, `projects`, `skills` (`document.getElementById(id).scrollIntoView()`).

## Flows que valem dirigir
- **Menu lateral (lg)**: item ativo tem a classe exata `w-16` no `<span>` da linha (use `classList.contains`, não `className.includes` — os inativos têm `group-hover:w-16`). No fim da página, `skills` deve estar ativo.
- **Foto**: `header img` com `complete && naturalWidth > 0`.
- **Idioma**: o botão PT/EN no header troca todos os textos.
- **Mobile**: sem scroll horizontal (`scrollWidth <= innerWidth`).

## Gotchas
- Textos com `text-transform: uppercase` saem transformados no `innerText` — compare case-insensitive.
- `asset()` (src/lib/asset.ts) só prefixa `/Portfolio` em produção. Para validar, após `npm run build` faça grep de `/Portfolio/cv.pdf` e `/Portfolio/gabriel-sm.jpg` em `out/index.html`.
