"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import MagneticButton from "@/components/ui/MagneticButton";

const HeroScene = dynamic(() => import("@/components/HeroScene"), { ssr: false });

// ── Typewriter ────────────────────────────────────────────────────────────────
function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function useTypewriter(language: string, enabled: boolean) {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) return;
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
      await sleep(300);
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
  }, [language, enabled]);

  return { text, done };
}

function renderTerminal(raw: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let rem = raw, k = 0;
  while (rem.length > 0) {
    const idx = rem.indexOf("❯");
    if (idx === -1) { nodes.push(<span key={k++} className="text-zinc-500">{rem}</span>); break; }
    if (idx > 0) nodes.push(<span key={k++} className="text-zinc-500">{rem.slice(0, idx)}</span>);
    nodes.push(<span key={k++} className="text-green-400">❯</span>);
    const nl = rem.indexOf("\n", idx + 1);
    const end = nl === -1 ? rem.length : nl;
    nodes.push(<span key={k++} className="text-zinc-200">{rem.slice(idx + 1, end)}</span>);
    rem = nl === -1 ? "" : rem.slice(nl);
  }
  return nodes;
}

// ── Terminal card (inside screen) ─────────────────────────────────────────────
function ScreenTerminal({ language, enabled }: { language: string; enabled: boolean }) {
  const { text, done } = useTypewriter(language, enabled);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setBlink(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.06] bg-white/[0.015] shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-[10px] text-white/[0.18] font-mono">~ gabriel</span>
      </div>
      {/* Body */}
      <div className="flex-1 px-4 py-4 overflow-hidden">
        <pre className="font-mono text-[12px] leading-[1.85] whitespace-pre-wrap break-words h-full">
          {renderTerminal(text)}
          <span
            className="inline-block w-[7px] h-[13px] align-middle ml-px"
            style={{ background: done ? "#4ade80" : "#6b7280", opacity: blink ? 1 : 0, transition: "opacity 50ms" }}
          />
        </pre>
      </div>
    </div>
  );
}

// ── CSS 3D Laptop ─────────────────────────────────────────────────────────────
function CSSLaptop({ language }: { language: string }) {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setOpen(true), 500);
    const t2 = setTimeout(() => setTyping(true), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}>
      {/* Laptop group — slight downward tilt for depth */}
      <div style={{ transform: "rotateX(18deg)", transformStyle: "preserve-3d" }}>

        {/* ── LID ─────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ rotateX: -90 }}
          animate={{ rotateX: open ? -22 : -90 }}
          transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width:            "min(540px, 86vw)",
            height:           "min(338px, calc(86vw * 0.625))",
            transformOrigin:  "bottom center",
            transformStyle:   "preserve-3d",
            position:         "relative",
            marginBottom:     "-1px",
          }}
        >
          {/* Screen face */}
          <div style={{
            position: "absolute", inset: 0,
            background: "#0b0e14",
            borderRadius: "10px 10px 3px 3px",
            border: "9px solid #1e1e1e",
            borderBottom: "5px solid #1e1e1e",
            overflow: "hidden",
            boxShadow: open ? "inset 0 0 60px rgba(99,102,241,0.08)" : "none",
          }}>
            <ScreenTerminal language={language} enabled={typing} />
          </div>

          {/* Lid back face */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)",
            borderRadius: "10px 10px 3px 3px",
            transform: "rotateX(180deg) translateZ(1px)",
            backfaceVisibility: "hidden",
          }}>
            {/* Apple logo hint */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "26px", height: "30px",
              background: "rgba(255,255,255,0.04)",
              borderRadius: "5px",
            }} />
          </div>
        </motion.div>

        {/* ── BASE ─────────────────────────────────────────────────────────── */}
        <div style={{
          width:        "min(540px, 86vw)",
          height:       "20px",
          position:     "relative",
          background:   "linear-gradient(to bottom, #282828, #1e1e1e)",
          borderRadius: "0 0 8px 8px",
          border:       "1px solid #333",
          borderTop:    "1px solid #2c2c2c",
        }}>
          {/* Trackpad */}
          <div style={{
            position:     "absolute",
            top: "50%", left: "50%",
            transform:    "translate(-50%, -50%)",
            width:        "min(72px, 13vw)",
            height:       "9px",
            background:   "#232323",
            borderRadius: "3px",
            border:       "1px solid #2e2e2e",
          }} />
        </div>

        {/* ── BOTTOM EDGE (3D depth strip) ──────────────────────────────────── */}
        <div style={{
          width:      "min(530px, 84vw)",
          height:     "4px",
          margin:     "0 auto",
          background: "#141414",
          borderRadius: "0 0 6px 6px",
        }} />

      </div>

      {/* Shadow under laptop */}
      <div style={{
        width:     "min(400px, 70vw)",
        height:    "24px",
        margin:    "4px auto 0",
        background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)",
        filter:    "blur(8px)",
      }} />
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const { language } = useLanguage();
  const pt = language === "pt";
  const [ctasVisible, setCtasVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setCtasVisible(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[100svh] flex flex-col items-center justify-center gap-8 px-4 py-24"
    >
      {/* Particle background */}
      <div className="absolute inset-0 pointer-events-none">
        <HeroScene />
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_30%,rgba(10,10,10,0.6)_100%)]" />

      {/* Laptop */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className="relative z-10"
      >
        <CSSLaptop language={language} />
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: ctasVisible ? 1 : 0, y: ctasVisible ? 0 : 12 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col sm:flex-row gap-3 w-[min(480px,90vw)] sm:w-auto"
      >
        <MagneticButton
          onClick={() => document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" })}
          className="
            w-full sm:w-auto items-center justify-center rounded-full px-7 py-3 text-sm font-medium
            bg-gradient-to-r from-indigo-500 to-indigo-400 text-white
            shadow-[0_8px_28px_-8px_rgba(99,102,241,0.7)]
            hover:shadow-[0_12px_36px_-8px_rgba(99,102,241,0.9)]
            transition-shadow duration-200
          "
        >
          {pt ? "Ver projetos" : "View projects"}
        </MagneticButton>

        <MagneticButton
          onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
          className="
            w-full sm:w-auto items-center justify-center rounded-full px-7 py-3 text-sm font-medium
            border border-white/[0.14] text-zinc-300
            hover:bg-white/[0.06] hover:border-white/[0.25]
            transition-all duration-200
          "
        >
          {pt ? "Entrar em contato" : "Get in touch"}
        </MagneticButton>
      </motion.div>
    </section>
  );
}
