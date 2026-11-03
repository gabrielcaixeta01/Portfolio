# Navbar — morph em cápsula flutuante

**Data:** 2026-08-03
**Arquivo afetado:** `src/components/Navbar.tsx` (único)
**Referência:** `~/Developer/wyg-landing/src/components/Navbar.tsx`

## Objetivo

Portar da wyg-landing o efeito de a barra de navegação encolher numa cápsula
flutuante ao rolar a página. Hoje a nav do portfolio é uma barra de largura
total colada no topo que apenas ganha fundo e borda inferior ao rolar.

## Escopo

**Dentro:** o morph visual (largura, raio, afastamento do topo, sombra, fundo,
borda) e a dissolução do container que envolve os links.

**Fora, decidido explicitamente:**

- Troca do cálculo de seção ativa por `IntersectionObserver`. O cálculo atual
  por `scrollY` permanece.
- Menu mobile dockado com focus trap, `Escape` e trava de scroll do body.
- Animação de entrada da barra ao carregar a página.

Estes três existem na referência e foram deixados de fora de propósito.

## Estrutura

O `<nav>` hoje acumula posicionamento fixo e a caixa visual. Passa a ter duas
camadas, como na referência:

```
<div>    fixed inset-x-0 top-0 z-50 flex justify-center    ← afastamento do topo
  <nav>  relative w-full flex items-center justify-between ← a cápsula
```

O `relative` no `<nav>` é obrigatório, não cosmético. O menu mobile é
`absolute left-3 right-3 top-full` e hoje se ancora no `<nav>`, que é `fixed` e
portanto posicionado. Sem `relative`, ele passaria a se ancorar no wrapper de
largura total e escaparia da cápsula.

## Estados

Limiar de scroll: `window.scrollY > 40` (hoje é `> 8`), igual à referência.

| | topo (`scrollY <= 40`) | rolado (`scrollY > 40`) |
|---|---|---|
| wrapper | `pt-0 px-0` | `pt-3 px-4` |
| largura da cápsula | `max-w-7xl mx-auto` | `max-w-5xl` |
| raio | `rounded-none` | `rounded-full` |
| fundo | `bg-transparent` | `bg-[#0a0a0a]/75 backdrop-blur-xl` |
| borda | `border-transparent` | `border-white/[0.08]` |
| sombra | nenhuma | `shadow-[0_8px_40px_rgba(0,0,0,0.45)]` |
| padding | `px-4 py-3` | `px-4 py-2` |

Wrapper e cápsula levam `transition-all duration-500 ease-out`. É o
`transition-all` que faz `max-width`, raio, padding e sombra animarem juntos e
produz o morph — uma lista restrita de propriedades (como a atual,
`transition-[background-color,border-color,backdrop-filter]`) não serve.

## Container dos links

O container `rounded-full` que envolve os links dissolve ao rolar: borda, fundo
e blur viram transparentes, restando apenas a pill deslizante do item ativo.
Resultado: uma borda só no estado flutuante, em vez de dois anéis concêntricos.

O `p-1` é mantido nos dois estados para a geometria da pill não saltar durante a
transição.

## Restrições verificadas

**Cabimento.** O conteúdo do portfolio é maior que o da referência: 544px de
links (68+72+95+87+137+85, medidos no browser) mais logo, dois ícones sociais e
o seletor de idioma, totalizando ≈760px. Em `max-w-5xl` (1024px) sobra folga.

**`prefers-reduced-motion`.** Não é tratado em nenhum lugar do projeto
(verificado em `globals.css`). Como o morph introduz uma animação de 500ms
disparada por scroll, os dois elementos que transicionam levam
`motion-reduce:transition-none`.

**`ScrollProgress`.** É `fixed top-0 left-0 right-0 h-[2px] z-[9998]`,
independente da nav. Com a cápsula afastada 12px do topo, a linha de progresso
fica sozinha na borda superior. Consequência visual aceita, não é regressão.

## Preservado sem alteração

Seção ativa por scroll, pill deslizante (`layoutId="nav-pill"`), dropdown de
idioma, hambúrguer e menu mobile, anéis de foco, i18n e a guarda de hidratação
via `useSyncExternalStore`.

## Skeleton de SSR

O bloco `if (!mounted)` devolve um esqueleto que hoje espelha a barra colada no
topo. Passa a espelhar o estado "topo" da nova estrutura (wrapper sem padding +
cápsula `max-w-7xl` sem borda), para não haver salto na hidratação.

## Critérios de aceitação

1. Em `scrollY = 0`: barra de largura total, sem borda, sem sombra, colada no topo.
2. Após rolar além de 40px: cápsula `max-w-5xl` arredondada, afastada 12px do
   topo, com sombra e blur; a transição dura 500ms.
3. O container dos links perde borda e fundo no estado rolado; a pill do item
   ativo continua deslizando entre itens.
4. O menu mobile abre alinhado à cápsula, não à largura da viewport.
5. Sem overflow horizontal em 320px, 390px e 1440px.
6. `eslint src`, `tsc --noEmit` e `npm run build` passam; zero erro de console.
