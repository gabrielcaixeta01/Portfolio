"use client";

import { useMemo } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import ScrollNetworkHero, { NetProject } from "../three/ScrollNetworkHero";

/**
 * Scroll-driven 3D network journey through the featured projects.
 * Data mirrors the Projetos section so both stay in sync with i18n.
 */
export default function RedeProjetos() {
  const { t } = useLanguage();

  const projects: NetProject[] = useMemo(
    () => [
      {
        id: "electrum",
        name: t.projects.electrumSite.title,
        sub: t.projects.electrumSite.description,
        href: "https://gabrielcaixeta01.github.io/electrum-observatory/",
        tech: ["Python", "Jupyter", "Network Analysis", "scikit-learn"],
      },
      {
        id: "giogas",
        name: t.projects.giogas.title,
        sub: t.projects.giogas.description,
        href: "https://site-giogas.vercel.app/",
        tech: ["React", "Next.js", "Tailwind", "TypeScript"],
      },
      {
        id: "barber",
        name: t.projects.baberAgenda.title,
        sub: t.projects.baberAgenda.description,
        href: "https://barber-agenda-one.vercel.app/",
        tech: ["React", "TypeScript", "Tailwind", "Supabase"],
      },
    ],
    [t]
  );

  return <ScrollNetworkHero projects={projects} labels={t.network} />;
}
