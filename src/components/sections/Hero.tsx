"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MagneticWrapper from "@/components/MagneticWrapper";

const HeroScene = dynamic(() => import("@/components/HeroScene"), { ssr: false });

// ── Typewriter engine ─────────────────────────────────────────────────────────
function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function useTypewriter(language: string) {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const pt = language === "pt";
    const seq = [
      { str: "❯ whoami",                                               speed: 55              },
      { str: "\n\n  Gabriel Caixeta\n  " + (pt
          ? "Desenvolvedor Full-Stack"
          : "Full-Stack Developer"),                                    speed: 12, delay: 280  },
      { str: "\n\n❯ echo $STATUS",                                     speed: 55, delay: 520  },
      { str: "\n\n  " + (pt
          ? "Eng. de Computação · UnB, Brasília"
          : "Computer Engineering · UnB, Brasília"),                   speed: 12, delay: 260  },
      { str: "\n\n❯ ",                                                  speed: 55, delay: 440  },
    ];

    let cancelled = false;
    let buf = "";

    (async () => {
      await sleep(800);
      for (const step of seq) {
        if (cancelled) return;
        if (step.delay) await sleep(step.delay);
        for (const ch of step.str) {
          if (cancelled) return;
          buf += ch;
          setText(buf);
          await sleep(step.speed + (Math.random() * 16 - 8));
        }
      }
      if (!cancelled) setDone(true);
    })();

    return () => { cancelled = true; };
  }, [language]);

  return { text, done };
}

// ── Terminal text renderer ────────────────────────────────────────────────────
function renderTerminal(raw: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let rem = raw;
  let k = 0;

  while (rem.length > 0) {
    const idx = rem.indexOf("❯");

    if (idx === -1) {
      nodes.push(<span key={k++} className="text-zinc-500">{rem}</span>);
      break;
    }

    // output text before this prompt
    if (idx > 0) {
      nodes.push(<span key={k++} className="text-zinc-500">{rem.slice(0, idx)}</span>);
    }

    // the ❯ glyph
    nodes.push(<span key={k++} className="text-green-400">❯</span>);

    // command text until next newline
    const nl = rem.indexOf("\n", idx + 1);
    const end = nl === -1 ? rem.length : nl;
    nodes.push(<span key={k++} className="text-zinc-200">{rem.slice(idx + 1, end)}</span>);

    rem = nl === -1 ? "" : rem.slice(nl);
  }

  return nodes;
}

// ── Terminal card ─────────────────────────────────────────────────────────────
function Terminal({ language }: { language: string }) {
  const { text, done } = useTypewriter(language);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setBlink((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="
        w-[min(480px,90vw)]
        rounded-2xl overflow-hidden
        bg-[#0b0e14]/95
        border border-white/[0.08]
        shadow-[0_48px_100px_-24px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.03)]
        backdrop-blur-sm
      "
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.015]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-[11px] text-white/[0.18] font-mono tracking-wide">
          ~ gabriel
        </span>
      </div>

      {/* Body */}
      <div className="px-5 pt-5 pb-7 min-h-[190px]">
        <pre className="font-mono text-[13px] sm:text-[13.5px] leading-[1.9] whitespace-pre-wrap break-words">
          {renderTerminal(text)}
          <span
            className="inline-block w-[8px] h-[14px] align-middle ml-px"
            style={{
              background: done ? "#4ade80" : "#6b7280",
              opacity: blink ? 1 : 0,
              transition: "opacity 50ms",
            }}
          />
        </pre>
      </div>
    </div>
  );
}

// ── Hero section ──────────────────────────────────────────────────────────────
export default function Hero() {
  const { language } = useLanguage();
  const pt = language === "pt";

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[100svh] flex flex-col items-center justify-center"
    >
      {/* Particle field */}
      <div className="absolute inset-0 pointer-events-none">
        <HeroScene />
      </div>

      {/* Vignette — darkens edges so terminal reads clearly */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_20%,rgba(10,10,10,0.65)_100%)]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-7 px-4 py-24">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: "easeOut" }}
        >
          <Terminal language={language} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-3 w-[min(480px,90vw)] sm:w-auto"
        >
          <MagneticWrapper>
            <button
              onClick={() => document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" })}
              className="
                w-full sm:w-auto
                rounded-full px-7 py-3 text-sm font-medium
                bg-gradient-to-r from-indigo-500 to-indigo-400
                text-white
                shadow-[0_8px_28px_-8px_rgba(99,102,241,0.7)]
                hover:shadow-[0_12px_36px_-8px_rgba(99,102,241,0.9)]
                transition-shadow duration-200
              "
            >
              {pt ? "Ver projetos" : "View projects"}
            </button>
          </MagneticWrapper>

          <MagneticWrapper>
            <button
              onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
              className="
                w-full sm:w-auto
                rounded-full px-7 py-3 text-sm font-medium
                border border-white/[0.14] text-zinc-300
                hover:bg-white/[0.06] hover:border-white/[0.25]
                transition-all duration-200
              "
            >
              {pt ? "Entrar em contato" : "Get in touch"}
            </button>
          </MagneticWrapper>
        </motion.div>
      </div>
    </section>
  );
}
