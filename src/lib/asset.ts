/**
 * next/image (e tags <img>) NÃO aplicam o basePath ao src automaticamente —
 * apenas rotas/links são prefixados. Em produção o site vive sob /Portfolio
 * (GitHub Pages), então todo asset de /public referenciado em JSX precisa
 * passar por aqui. Espelha a lógica de basePath do next.config.ts.
 */
const prefix = process.env.NODE_ENV === "production" ? "/Portfolio" : "";

export const asset = (path: string) => `${prefix}${path}`;
