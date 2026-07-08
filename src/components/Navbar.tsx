"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaChevronDown } from "react-icons/fa";
import { BR, US } from "country-flag-icons/react/3x2";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

/* Painéis flutuantes (dropdown, menu mobile) são SÓLIDOS de propósito:
   translúcido + backdrop-blur solto sobre conteúdo variado lê como
   "transparente/quebrado". Blur só na barra, que cobre a página inteira. */
const PANEL =
  "bg-[#101014] border border-white/[0.10] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.85)]";

const springMenu = { type: "spring" as const, stiffness: 420, damping: 32, mass: 0.7 };

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();

  const [mounted, setMounted] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setActiveSection("contato");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const ids = ["hero", "sobre", "trajetoria", "projetos", "conhecimentos", "contato"];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [mounted]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLanguageDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuButtonRef.current?.contains(target)) return;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsLanguageDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = useMemo(
    () => [
      { id: "hero",          label: t.navbar.home },
      { id: "sobre",         label: t.navbar.about },
      { id: "trajetoria",    label: t.navbar.timeline },
      { id: "projetos",      label: t.navbar.projects },
      { id: "conhecimentos", label: t.navbar.skills },
      { id: "contato",       label: t.navbar.contact },
    ],
    [t]
  );

  // ── SSR skeleton ────────────────────────────────────────────────────────────
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 w-full z-50 px-4 py-3 bg-transparent border-b border-transparent">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20" />
          <div className="hidden md:flex items-center space-x-2" />
          <div className="flex items-center gap-2">
            <div className="md:hidden w-9 h-9 rounded-xl" />
          </div>
        </div>
      </nav>
    );
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  const getCurrentFlag = () =>
    language === "pt"
      ? <BR title="Português (Brasil)" style={{ width: "18px", height: "12px" }} />
      : <US title="English (United States)" style={{ width: "18px", height: "12px" }} />;

  const glassNav = [
    "fixed top-0 left-0 w-full z-50",
    "px-4 py-3",
    "transition-[background-color,border-color,backdrop-filter] duration-300 ease-out",
    isScrolled
      ? "bg-[#0a0a0a]/75 backdrop-blur-xl border-b border-white/[0.06]"
      : "bg-transparent border-b border-transparent",
  ].join(" ");

  const iconBtn = [
    "inline-flex items-center justify-center",
    "w-9 h-9 rounded-full",
    "border border-transparent",
    "text-zinc-400",
    "hover:text-zinc-100 hover:border-white/[0.12] hover:bg-white/[0.04]",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40",
  ].join(" ");

  return (
    <nav className={glassNav}>
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">

        {/* ── Left: Logo ─────────────────────────────────────────────────── */}
        <button
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-2 group"
          aria-label="Ir ao início"
        >
          <span className="
            w-7 h-7 rounded-lg
            bg-gradient-to-br from-indigo-500 to-purple-600
            flex items-center justify-center
            text-white text-[11px] font-light tracking-tight
            shadow-[0_2px_8px_rgba(99,102,241,0.4)]
            group-hover:shadow-[0_4px_16px_rgba(99,102,241,0.6)]
            group-hover:scale-105
            transition-[box-shadow,transform] duration-200
          ">
            GC
          </span>
        </button>

        {/* ── Center: Desktop nav pill ────────────────────────────────────── */}
        <div className="hidden md:flex items-center justify-center">
          <div className="
            inline-flex items-center gap-0.5
            rounded-full
            border border-white/[0.08]
            bg-white/[0.03]
            backdrop-blur-md
            p-1
          ">
            {navItems.map((it) => {
              const isActive = activeSection === it.id;
              return (
                <button
                  key={it.id}
                  onClick={() => scrollToSection(it.id)}
                  className={`
                    relative px-4 py-1.5 rounded-full text-sm font-medium
                    transition-colors duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/35
                    ${isActive ? "text-zinc-50" : "text-zinc-400 hover:text-zinc-200"}
                  `}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.06]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{it.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right: actions ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-1.5 sm:gap-2">

          {/* Social — desktop only */}
          <a
            href="https://github.com/gabrielcaixeta01"
            target="_blank" rel="noopener noreferrer"
            aria-label="GitHub"
            className={`hidden md:inline-flex ${iconBtn}`}
          >
            <FaGithub size={16} />
          </a>
          <a
            href="https://linkedin.com/in/gabriel-caixeta-romero"
            target="_blank" rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`hidden md:inline-flex ${iconBtn}`}
          >
            <FaLinkedin size={16} />
          </a>

          {/* Language */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen((open) => !open)}
              className="
                inline-flex items-center gap-1.5
                px-2.5 h-9 rounded-full
                border border-white/[0.08]
                bg-white/[0.03]
                text-zinc-300
                transition-[background-color,border-color] duration-200
                hover:border-white/[0.16] hover:bg-white/[0.05]
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40
              "
              aria-label="Change language"
              aria-expanded={isLanguageDropdownOpen}
            >
              {getCurrentFlag()}
              <FaChevronDown
                size={9}
                className={`text-zinc-500 transition-transform duration-300 ${isLanguageDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isLanguageDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={springMenu}
                  className={`absolute right-0 mt-2 z-50 min-w-[170px] rounded-2xl overflow-hidden p-1.5 ${PANEL}`}
                >
                  {[
                    { key: "pt", Flag: BR, label: t.navbar.portuguese },
                    { key: "en", Flag: US, label: t.navbar.english },
                  ].map(({ key, Flag, label }) => (
                    <button
                      key={key}
                      onClick={() => handleLanguageChange(key)}
                      className={`
                        w-full px-3 py-2.5 rounded-xl
                        text-left text-sm font-medium
                        flex items-center gap-2.5
                        transition-colors duration-150
                        ${language === key
                          ? "text-indigo-300 bg-indigo-500/10"
                          : "text-zinc-300 hover:bg-white/[0.05]"}
                      `}
                    >
                      <Flag style={{ width: "18px", height: "12px" }} className="rounded-[2px]" />
                      <span>{label}</span>
                      {language === key && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hamburger — mobile only */}
          <button
            ref={menuButtonRef}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="
              md:hidden
              inline-flex items-center justify-center
              w-9 h-9 rounded-full
              border border-white/[0.08]
              bg-white/[0.03]
              text-zinc-300
              transition-[background-color,border-color] duration-200
              hover:border-white/[0.16] hover:bg-white/[0.05]
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40
            "
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.svg
                  key="close"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="w-4.5 h-4.5"
                  fill="none" strokeWidth={2.2} stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="open"
                  initial={{ rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="w-4.5 h-4.5"
                  fill="none" strokeWidth={2.2} stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={springMenu}
            className={`md:hidden absolute left-3 right-3 top-full mt-2 z-50 rounded-2xl overflow-hidden ${PANEL}`}
          >
            {/* Nav links */}
            <div className="p-2">
              {navItems.map((it, index) => {
                const isActive = activeSection === it.id;
                return (
                  <motion.button
                    key={it.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 + index * 0.035, duration: 0.2, ease: "easeOut" }}
                    onClick={() => scrollToSection(it.id)}
                    className={`
                      w-full flex items-center gap-3
                      px-3.5 py-2.5 rounded-xl
                      text-left text-sm font-medium
                      transition-colors duration-150
                      ${isActive
                        ? "text-indigo-300 bg-indigo-500/10"
                        : "text-zinc-300 hover:bg-white/[0.05] hover:text-zinc-100"
                      }
                    `}
                  >
                    <span className={`
                      w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-150
                      ${isActive ? "bg-indigo-400" : "bg-zinc-700"}
                    `} />
                    {it.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Divider + Social */}
            <div className="px-2 pb-2 border-t border-white/[0.06]">
              <div className="pt-2 grid grid-cols-2 gap-2">
                <a
                  href="https://github.com/gabrielcaixeta01"
                  target="_blank" rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="
                    inline-flex items-center justify-center gap-2
                    px-3 py-2.5 rounded-xl text-sm font-medium
                    border border-white/[0.08]
                    text-zinc-300
                    hover:bg-white/[0.05] hover:text-zinc-100
                    transition-colors duration-150
                  "
                >
                  <FaGithub size={14} />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/gabriel-caixeta-romero"
                  target="_blank" rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="
                    inline-flex items-center justify-center gap-2
                    px-3 py-2.5 rounded-xl text-sm font-medium
                    border border-white/[0.08]
                    text-zinc-300
                    hover:bg-white/[0.05] hover:text-zinc-100
                    transition-colors duration-150
                  "
                >
                  <FaLinkedin size={14} className="text-[#0A66C2]" />
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
