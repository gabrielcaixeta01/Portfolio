"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface TimelineItem {
  title: string;
  subtitle?: string;
  description: string;
  type?: "education" | "work" | "achievement" | "other";
}

interface TimelineYear {
  year: string;
  events: TimelineItem[];
}

export default function TimeLine() {
  const { t } = useLanguage();
  const timelineYears: TimelineYear[] = t.timeline.years;

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case "education":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case "work":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case "achievement":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <section
      id="timeline"
      className="
        scroll-mt-20
        relative overflow-hidden
        min-h-screen
        px-4 sm:px-6
        py-14 sm:py-18 md:py-22
      "
    >
      {/* background suave */}
      <div
        className="
          pointer-events-none absolute inset-0
          
        "
      />
      <div className="max-w-5xl w-full mx-auto relative">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            {t.timeline.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base max-w-2xl mx-auto">
            {t.timeline.description}
          </p>
        </div>

        <div className="relative">
          {/* Linha vertical mais sutil */}
          <div
            className="
              absolute left-[12px] sm:left-10 top-0 bottom-0
              w-px
              bg-gradient-to-b
              from-transparent via-gray-200 to-transparent
              dark:via-gray-800
            "
          />

          <div className="space-y-10 sm:space-y-14">
            {timelineYears.map((yearData, yearIndex) => (
              <div key={yearIndex} className="relative">
                {/* Ano */}
                <div className="relative pl-14 sm:pl-24 mb-5 sm:mb-7">
                  <div
                    className="
                      absolute left-[4px] sm:left-8 top-0
                      w-6 h-6 rounded-full
                      bg-[var(--pc-bg)] border border-[var(--pc-border)]
                      backdrop-blur
                      shadow-[var(--pc-shadow,_0_1px_0_rgba(0,0,0,0.04))]
                      flex items-center justify-center
                    "
                  >
                    <div className="w-2 h-2 rounded-full bg-[var(--pc-title)]" />
                  </div>

                  <h3
                    className="
                      inline-flex items-center
                      text-xl sm:text-2xl font-semibold
                    
                      tracking-tight
                    "
                  >
                    {yearData.year}
                    <span className="ml-3 h-px w-10 sm:w-16 bg-gray-200 dark:bg-gray-800" />
                  </h3>
                </div>

                {/* Eventos */}
                <div className="space-y-4 sm:space-y-6">
                  {yearData.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="relative pl-14 sm:pl-24">
                      {/* Ícone */}
                      <div
                        className="
                          absolute left-[0px] sm:left-6 top-4
                          w-9 h-9 rounded-xl
                          bg-[var(--pc-bg)] border border-[var(--pc-border)]
                          backdrop-blur
                          shadow-[var(--pc-shadow,_0_1px_0_rgba(0,0,0,0.04))]
                          flex items-center justify-center
                          text-[var(--pc-title)]
                          transition-transform duration-200
                        "
                      >
                        {getTypeIcon(event.type)}
                      </div>

                      {/* Card */}
                      <div
                        className="
                          group relative
                          rounded-2xl
                          bg-[var(--pc-bg)] border border-[var(--pc-border)]
                          backdrop-blur
                          p-4 sm:p-5
                          shadow-[var(--pc-shadow,_inset_0_0_0_1px_var(--pc-outline))]
                          transition-all duration-200
                          hover:-translate-y-0.5
                          hover:shadow-[0_12px_32px_rgba(2,6,23,0.10)]
                        "
                      >
                        {/* brilho sutil no hover */}
                        <div
                          className="
                            pointer-events-none absolute inset-0 rounded-2xl
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-200
                            bg-[radial-gradient(55%_70%_at_30%_0%,rgba(99,102,241,0.08),transparent_55%)]
                          "
                        />

                        <div className="relative">
                          <h4 className="text-sm sm:text-base font-semibold text-[var(--pc-title)]">
                            {event.title}
                          </h4>

                          {event.subtitle && (
                            <p className="mt-0.5 text-xs sm:text-sm text-[var(--pc-text)]">
                              {event.subtitle}
                            </p>
                          )}

                          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[var(--pc-text)]">
                            {event.description}
                          </p>
                        </div>

                        {/* borda “viva” no hover */}
                        <div
                          className="
                            pointer-events-none absolute inset-0 rounded-2xl
                            ring-1 ring-transparent
                            group-hover:ring-indigo-500/15
                            transition duration-200
                          "
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}