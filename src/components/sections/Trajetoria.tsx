"use client";

import { motion } from "framer-motion";
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

// ─── Type badge config ────────────────────────────────────────────────────────
const badge: Record<string, { ring: string; dot: string; label: Record<string, string> }> = {
  work:        { ring: "ring-blue-500/25",   dot: "bg-blue-400",   label: { pt: "Trabalho",  en: "Work"        } },
  education:   { ring: "ring-violet-500/25", dot: "bg-violet-400", label: { pt: "Educação",  en: "Education"   } },
  achievement: { ring: "ring-amber-500/25",  dot: "bg-amber-400",  label: { pt: "Conquista", en: "Achievement" } },
  other:       { ring: "ring-slate-500/25",  dot: "bg-slate-400",  label: { pt: "Outro",     en: "Other"       } },
};

const isCurrentJob = (t: TimelineItem) => t.title === "ApexBrasil";

// ─── Component ────────────────────────────────────────────────────────────────
export default function Trajetoria() {
  const { t, language } = useLanguage();
  const years: TimelineYear[] = t.timeline.years;

  return (
    <section id="trajetoria" className="scroll-mt-20 px-4 py-16 sm:py-20">
      <div className="max-w-2xl mx-auto">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 sm:mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-indigo-500 dark:text-indigo-400">
            {language === "pt" ? "trajetória" : "journey"}
          </span>
          <h2 className="mt-1.5 text-4xl sm:text-5xl font-semibold tracking-[-0.045em] leading-[1.05] text-[var(--cc-title)]">
            <SplitText text={t.timeline.title} />
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--cc-text)] opacity-60 max-w-md">
            {t.timeline.description}
          </p>
        </motion.div>

        {/* ── Timeline body ────────────────────────────────────────────────── */}
        <div className="relative">

          {/* Animated vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.6, delay: 0.1 }}
            viewport={{ once: true }}
            style={{ transformOrigin: "top" }}
            className="absolute left-[5px] top-1 bottom-8 w-px bg-gradient-to-b from-indigo-500/70 via-purple-500/40 to-transparent pointer-events-none"
          />

          <div className="space-y-10">
            {years.map((yearData, yi) => (
              <motion.div
                key={yearData.year}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: yi * 0.1 }}
                viewport={{ once: true, amount: 0.15 }}
              >
                {/* ── Year anchor ─────────────────────────────────────────── */}
                <div className="relative flex items-center gap-3 mb-5">
                  {/* Dot on line */}
                  <div className="relative z-10 flex-shrink-0 w-[11px] h-[11px] rounded-full border-2 border-indigo-500 bg-[var(--background)]" />

                  {/* Year text */}
                  <span className="text-xs font-bold tracking-[0.25em] uppercase text-indigo-500 dark:text-indigo-400">
                    {yearData.year}
                  </span>

                  {/* Rule */}
                  <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/25 to-transparent" />
                </div>

                {/* ── Events ──────────────────────────────────────────────── */}
                <div className="ml-6 space-y-1">
                  {yearData.events.map((event, ei) => {
                    const cfg = badge[event.type ?? "other"];
                    const current = isCurrentJob(event);

                    return (
                      <motion.div
                        key={ei}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.38, delay: yi * 0.08 + ei * 0.07 }}
                        viewport={{ once: true }}
                        className="
                          group relative
                          rounded-xl px-4 py-3.5 -mx-4
                          border border-transparent
                          hover:bg-[var(--pc-bg)]
                          hover:border-[var(--pc-border)]
                          hover:shadow-[var(--pc-shadow)]
                          transition-all duration-200 ease-out
                          cursor-default
                        "
                      >
                        {/* Hover left accent */}
                        <div className="
                          absolute left-0 top-[14px] bottom-[14px]
                          w-[2.5px] rounded-full
                          bg-indigo-500/0 group-hover:bg-indigo-500/50
                          transition-all duration-200
                        " />

                        {/* Title row */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 flex-wrap min-w-0">

                            {/* Type dot */}
                            <span className={`
                              flex-shrink-0 inline-flex w-[7px] h-[7px] rounded-full mt-[5px]
                              ${current ? "bg-emerald-400" : cfg.dot}
                              ${current ? "shadow-[0_0_6px_2px_rgba(52,211,153,0.4)]" : ""}
                            `} />

                            <h4 className="text-sm sm:text-[15px] font-semibold text-[var(--cc-title)] leading-snug">
                              {event.title}
                            </h4>

                            {current && (
                              <span className="inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 leading-none">
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                                </span>
                                {language === "pt" ? "presente" : "current"}
                              </span>
                            )}

                            {!current && (
                              <span className={`
                                text-[10px] font-medium px-1.5 py-0.5 rounded-full
                                bg-transparent ring-1 ${cfg.ring}
                                text-[var(--cc-text)] opacity-60
                              `}>
                                {cfg.label[language] ?? cfg.label["pt"]}
                              </span>
                            )}
                          </div>

                          {event.link && (
                            <a
                              href={event.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Ver ${event.title}`}
                              className="flex-shrink-0 text-[var(--cc-text)] opacity-30 hover:opacity-80 hover:text-indigo-400 transition-all mt-0.5"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                        </div>

                        {/* Subtitle */}
                        {event.subtitle && (
                          <p className="ml-[15px] mt-0.5 text-xs sm:text-[13px] text-[var(--cc-text)] opacity-65 font-medium">
                            {event.subtitle}
                          </p>
                        )}

                        {/* Description */}
                        <p className="ml-[15px] mt-1 text-xs sm:text-[13px] text-[var(--cc-text)] opacity-50 leading-relaxed">
                          {event.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
