"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const WORDS = {
  pt: ["Design", "Código", "Build", "Deploy"],
  en: ["Design", "Code",   "Build", "Deploy"],
};

export default function CircularScramble() {
  const { language } = useLanguage();
  const words = WORDS[language as keyof typeof WORDS] ?? WORDS.en;
  const count = words.length;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const wh   = window.innerHeight;
      const h    = el.offsetHeight;
      // 0 = section just entering from bottom, 1 = section fully passed top
      const p = Math.max(0, Math.min(1, (wh - rect.top) / (wh + h)));
      el.style.setProperty("--sr", p.toFixed(4));
    };

    window.addEventListener("scroll", update, { passive: true });
    requestAnimationFrame(update);
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center min-h-[80vh] bg-[#050508] overflow-hidden select-none"
      style={{ "--sr": "0" } as React.CSSProperties}
      aria-label="Circular decorative text"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-[500px] h-[500px] rounded-full bg-indigo-600/8 blur-[130px]" />
      </div>

      {/* Circle */}
      <ul
        className="scramble-circle"
        aria-hidden="true"
        style={{ "--sw-count": count } as React.CSSProperties}
      >
        {words.map((word, wi) => (
          <li
            key={word}
            className={`scramble-word${wi === 0 ? " text-indigo-400" : " text-white/50"}`}
            style={{ "--sw-i": wi + 1 } as React.CSSProperties}
          >
            {[...word].map((char, ci) => (
              <span
                key={ci}
                className="scramble-char"
                style={{ "--sc-i": ci + 1 } as React.CSSProperties}
              >
                {char}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}
