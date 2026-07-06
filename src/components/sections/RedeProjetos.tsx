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
