"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import SplitText from "@/components/SplitText";

interface TimelineItem {
  title: string;
  subtitle?: string;
  description: string;
  type?: "education" | "work" | "achievement" | "other";
  link?: string;
}

interface TimelineYear {
  year: string;
  events: TimelineItem[];
}

/* type labels — the site's gradient colors (indigo → purple → cyan) */
const badge: Record<string, { text: string; dot: string; label: Record<string, string> }> = {
  work:        { text: "text-indigo-400", dot: "bg-indigo-400", label: { pt: "trabalho",  en: "work"        } },
  education:   { text: "text-purple-400", dot: "bg-purple-400", label: { pt: "educação",  en: "education"   } },
  achievement: { text: "text-cyan-400",   dot: "bg-cyan-400",   label: { pt: "conquista", en: "achievement" } },
  other:       { text: "text-zinc-400",   dot: "bg-zinc-400",   label: { pt: "outro",     en: "other"       } },
};

const isCurrentJob = (t: TimelineItem) => t.title === "ApexBrasil";

export default function Trajetoria() {
  const { t, language } = useLanguage();
  const years: TimelineYear[] = t.timeline.years;
  const bodyRef = useRef<HTMLDivElement>(null);

  /* line fills as the timeline crosses the viewport */
  const { scrollYProgress } = useScroll({
    target: bodyRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 22, restDelta: 0.001 });

  return (
    <section id="trajetoria" className="scroll-mt-20 px-4 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto">

        {/* ── header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 sm:mb-20"
        >
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium text-indigo-400">
            {language === "pt" ? "trajetória" : "journey"}
          </span>
          <h2
            className="mt-2 text-4xl sm:text-5xl font-semibold tracking-[-0.045em] leading-[1.05] text-[var(--cc-title)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <SplitText text={t.timeline.title} />
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--cc-text)] opacity-60 max-w-md">
            {t.timeline.description}
          </p>
        </motion.div>

        {/* ── timeline body ── */}
        <div ref={bodyRef} className="relative">

          {/* track + progress line */}
          <div className="absolute left-[5px] md:left-[171px] top-2 bottom-2 w-px bg-white/[0.07]" />
          <motion.div
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="absolute left-[5px] md:left-[171px] top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-400"
          />

          <div className="space-y-16 sm:space-y-20">
            {years.map((yearData) => (
              <div
                key={yearData.year}
                className="relative grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-16"
              >
                {/* ── ghost year ── */}
                <div className="relative">
                  <motion.span
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="
                      block md:sticky md:top-32
                      pl-6 md:pl-0 md:text-right
                      text-4xl md:text-6xl font-bold leading-none
                      text-transparent select-none
                    "
                    style={{
                      fontFamily: "var(--font-display)",
                      WebkitTextStroke: "1px rgba(129,140,248,0.45)",
                    }}
                  >
                    {yearData.year}
                  </motion.span>
                </div>

                {/* node on the line */}
                <div
                  className="
                    absolute top-2 md:top-3
                    left-[5px] md:left-[171px] -translate-x-1/2
                    w-[11px] h-[11px] rounded-full
                    border-2 border-indigo-400 bg-[var(--background)]
                    shadow-[0_0_10px_rgba(99,102,241,0.5)]
                  "
                />

                {/* ── events ── */}
                <div className="pl-6 md:pl-0 space-y-8">
                  {yearData.events.map((event, ei) => {
                    const cfg = badge[event.type ?? "other"];
                    const current = isCurrentJob(event);

                    return (
                      <motion.article
                        key={ei}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: ei * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="group relative"
                      >
                        {/* meta row */}
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className={`inline-flex w-1.5 h-1.5 rounded-full ${current ? "bg-emerald-400" : cfg.dot}`} />
                          <span className={`font-mono text-[11px] tracking-[0.18em] ${current ? "text-emerald-400" : cfg.text}`}>
                            {current
                              ? (language === "pt" ? "presente" : "current")
                              : (cfg.label[language] ?? cfg.label.pt)}
                          </span>
                          {current && (
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                            </span>
                          )}
                        </div>

                        {/* title */}
                        <div className="flex items-start justify-between gap-3">
                          <h3
                            className="text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-zinc-100 leading-snug"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {event.title}
                          </h3>
                          {event.link && (
                            <a
                              href={event.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Ver ${event.title}`}
                              className="flex-shrink-0 mt-1.5 text-zinc-600 hover:text-indigo-400 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>

                        {/* subtitle */}
                        {event.subtitle && (
                          <p className="mt-1 text-[13px] sm:text-sm font-medium text-zinc-400">
                            {event.subtitle}
                          </p>
                        )}

                        {/* description */}
                        <p className="mt-2 text-[13px] sm:text-sm text-zinc-500 leading-relaxed max-w-xl">
                          {event.description}
                        </p>

                        {/* hover underline accent */}
                        <div className="mt-4 h-px w-0 group-hover:w-16 bg-gradient-to-r from-indigo-500 to-transparent transition-all duration-500" />
                      </motion.article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
