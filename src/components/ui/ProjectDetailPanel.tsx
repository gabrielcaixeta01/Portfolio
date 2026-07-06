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
const FOCUSABLE_SELECTOR =
  'a[href], button, [tabindex]:not([tabindex="-1"])';

export default function ProjectDetailPanel({ project, labels, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!project) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key === "Tab") {
        const panel = panelRef.current;
        if (!panel) return;
        const focusable = Array.from(
          panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ).filter((el) => !el.hasAttribute("disabled"));
        if (focusable.length === 0) {
          e.preventDefault();
          panel.focus();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (e.shiftKey) {
          if (active === first || !panel.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else if (active === last || !panel.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.id]);

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
            key={project.id}
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

              {project.tech && project.tech.length > 0 && (
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
