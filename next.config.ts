import path from "node:path";
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Sem isto o Turbopack infere a raiz do workspace a partir de lockfiles
  // soltos acima do projeto e o PostCSS deixa de resolver o tailwindcss.
  turbopack: {
    root: path.join(__dirname),
  },
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/Portfolio" : "",
  assetPrefix: isProd ? "/Portfolio/" : "",
  trailingSlash: true,
};

export default nextConfig;
