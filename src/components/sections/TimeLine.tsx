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
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case "work":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case "achievement":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <section
      id="timeline"
      className="
        scroll-mt-18 min-h-screen flex items-center justify-center
        px-3 sm:px-4
        py-12 sm:py-16 md:py-20
      "
    >
      <div className="max-w-4xl w-full mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
          {t.timeline.title}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
          {t.timeline.description}
        </p>

        <div className="relative">
          {/* Linha vertical - posição responsiva */}
          <div className="absolute left-[10px] sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

          {/* Timeline items */}
          <div className="space-y-8 sm:space-y-12">
            {timelineYears.map((yearData, yearIndex) => (
              <div key={yearIndex} className="relative">
                {/* Ano com destaque */}
                <div className="relative pl-12 sm:pl-20 mb-4 sm:mb-6">
                  <div className="absolute left-[-6px] sm:left-4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                    {yearData.year}
                  </h3>
                </div>

                {/* Eventos do ano */}
                <div className="space-y-4 sm:space-y-6">
                  {yearData.events.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className="relative pl-12 sm:pl-20 group flex flex-col"
                    >
                      {/* Ícone do evento - alinhado ao topo do card */}
                      <div className="absolute left-[-6px] sm:left-4 top-0 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0">
                        {getTypeIcon(event.type)}
                      </div>

                      {/* Card de conteúdo */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group-hover:border-blue-500 dark:group-hover:border-blue-400">
                        {/* Título */}
                        <h4 className="text-lg sm:text-xl font-bold mb-1 text-gray-900 dark:text-white break-words">
                          {event.title}
                        </h4>

                        {/* Subtítulo */}
                        {event.subtitle && (
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 font-medium break-words">
                            {event.subtitle}
                          </p>
                        )}

                        {/* Descrição */}
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                          {event.description}
                        </p>
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