"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import { useCallback, useEffect, useState } from "react";
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
      await sleep(200);
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

// ── Floating glass terminal with 3D tilt ─────────────────────────────────────
function TerminalCard({ language, enabled }: { language: string; enabled: boolean }) {
  const { text, done } = useTypewriter(language, enabled);
  const [blink, setBlink] = useState(true);
  const reduced = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 16, mass: 0.2 });
  const sry = useSpring(ry, { stiffness: 120, damping: 16, mass: 0.2 });

  useEffect(() => {
    const id = setInterval(() => setBlink(v => !v), 530);
    return () => clearInterval(id);
  }, []);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced) return;
      const r = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry.set(px * 10);
      rx.set(-py * 8);
    },
    [rx, ry, reduced]
  );

  const onLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
  }, [rx, ry]);

  return (
    <div style={{ perspective: "1200px" }}>
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="
          relative w-full rounded-2xl overflow-hidden
          border border-white/[0.09]
          bg-[rgba(15,16,22,0.72)] backdrop-blur-xl
          shadow-[0_32px_80px_-16px_rgba(0,0,0,0.7),0_0_60px_-12px_rgba(99,102,241,0.25)]
        "
      >
        {/* top edge glow */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent"
        />
        {/* glare */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.05)_0%,transparent_35%)]"
        />

        {/* window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-auto text-[10px] text-white/[0.22] font-mono">gabriel@unb — zsh</span>
        </div>

        {/* body */}
        <div className="px-5 py-5 min-h-[240px] sm:min-h-[264px]">
          <pre className="font-mono text-[12.5px] leading-[1.85] whitespace-pre-wrap break-words">
            {renderTerminal(text)}
            <span
              className="inline-block w-[7px] h-[13px] align-middle ml-px"
              style={{ background: done ? "#4ade80" : "#6b7280", opacity: blink ? 1 : 0, transition: "opacity 50ms" }}
            />
          </pre>
        </div>
      </motion.div>
    </div>
  );
}

// ── Animated headline line (rise from clip) ──────────────────────────────────
function RiseLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const { language } = useLanguage();
  const pt = language === "pt";
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTyping(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[100svh] flex items-center px-5 sm:px-8 py-24"
    >
      {/* particle background */}
      <div className="absolute inset-0 pointer-events-none">
        <HeroScene />
      </div>

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_30%,rgba(10,10,10,0.6)_100%)]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* ── left: typographic statement ── */}
        <div className="lg:col-span-7">
          {/* eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-[0.18em] text-zinc-400 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            gabriel_caixeta · {pt ? "desenvolvedor" : "developer"} · brasília
          </motion.p>

          {/* name */}
          <h1
            className="font-semibold uppercase leading-[0.95] tracking-[-0.04em] text-[clamp(3.2rem,9.5vw,7rem)] text-zinc-100"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <RiseLine delay={0.15}>Gabriel</RiseLine>
            <RiseLine delay={0.28}>
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1.5px rgba(129,140,248,0.85)" }}
              >
                Caixeta
              </span>
            </RiseLine>
          </h1>

          {/* subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="mt-6 max-w-md text-sm sm:text-base text-zinc-400 leading-relaxed"
          >
            {pt
              ? "Desenvolvedor full-stack e estudante de Engenharia de Computação na UnB — interfaces rápidas, design consistente e código bem estruturado."
              : "Full-stack developer and Computer Engineering student at UnB — fast interfaces, consistent design, and well-structured code."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.68, ease: "easeOut" }}
            className="mt-9 flex flex-col sm:flex-row gap-3"
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
        </div>

        {/* ── right: floating terminal ── */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 w-full max-w-[480px] mx-auto lg:mx-0"
        >
          <TerminalCard language={language} enabled={typing} />
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.15em] text-zinc-500"
      >
        scroll ↓
      </motion.div>
    </section>
  );
}
