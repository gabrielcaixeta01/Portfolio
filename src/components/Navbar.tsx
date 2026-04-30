"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaChevronDown } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import { BR, US } from "country-flag-icons/react/3x2";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
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
    const onScroll = () => setIsScrolled(window.scrollY > 8);
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
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
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
      <nav className="fixed top-0 left-0 w-full z-50 px-4 py-3 bg-transparent border-b border-transparent backdrop-blur-md">
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
    "transition-[background-color,border-color,box-shadow] duration-200 ease-out",
    "backdrop-blur-md",
    isScrolled
      ? "bg-[var(--pc-bg)] border-b border-[var(--pc-border)] shadow-[var(--pc-shadow)]"
      : "bg-transparent border-b border-transparent",
  ].join(" ");

  const iconBtn = [
    "inline-flex items-center justify-center",
    "w-9 h-9 rounded-full",
    "border border-transparent",
    "text-[var(--pc-title)]",
    "hover:bg-[var(--pc-bg)] hover:border-[var(--pc-border)]",
    "transition-[background-color,border-color] duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40",
  ].join(" ");

  const desktopLink = [
    "relative px-4 py-2 rounded-full",
    "text-sm font-medium text-[var(--pc-title)]",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/35",
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
            group-hover:shadow-[0_4px_14px_rgba(99,102,241,0.55)]
            transition-shadow duration-200
          ">
            GC
          </span>
        </button>

        {/* ── Center: Desktop nav pill ────────────────────────────────────── */}
        <div className="hidden md:flex items-center justify-center">
          <div className="
            inline-flex items-center gap-1
            rounded-full
            border border-[var(--pc-border)]
            bg-[var(--pc-bg)]
            backdrop-blur
            p-1
          ">
            {navItems.map((it) => {
              const isActive = activeSection === it.id;
              return (
                <button
                  key={it.id}
                  onClick={() => scrollToSection(it.id)}
                  className={desktopLink + (isActive ? " !text-indigo-500" : "")}
                >
                  <span className="relative z-10">{it.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="
                    pointer-events-none absolute inset-0 rounded-full
                    opacity-0 hover:opacity-100 transition-opacity duration-200
                    bg-[radial-gradient(60%_80%_at_50%_0%,rgba(99,102,241,0.18),transparent_70%)]
                  " />
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
                border border-[var(--pc-border)]
                bg-[var(--pc-bg)]
                backdrop-blur
                text-[var(--pc-title)]
                transition-[background-color,border-color] duration-200
                hover:border-indigo-400/30
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40
              "
              aria-label="Change language"
              aria-expanded={isLanguageDropdownOpen}
            >
              {getCurrentFlag()}
              <FaChevronDown
                size={9}
                className={`text-[var(--pc-text)] transition-transform duration-200 ${isLanguageDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isLanguageDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="
                    absolute right-0 mt-2 z-50 min-w-[160px]
                    rounded-2xl
                    bg-[var(--pc-bg)]
                    border border-[var(--pc-border)]
                    shadow-[var(--pc-shadow)]
                    backdrop-blur-xl
                    overflow-hidden
                  "
                >
                  {[
                    { key: "pt", Flag: BR, label: t.navbar.portuguese },
                    { key: "en", Flag: US, label: t.navbar.english },
                  ].map(({ key, Flag, label }, idx) => (
                    <button
                      key={key}
                      onClick={() => handleLanguageChange(key)}
                      className={`
                        w-full px-4 py-3
                        text-left text-sm
                        flex items-center gap-2.5
                        text-[var(--pc-title)]
                        transition-colors duration-150
                        hover:bg-indigo-500/8
                        ${idx === 0 ? "" : "border-t border-[var(--pc-border)]"}
                        ${language === key ? "text-indigo-500" : ""}
                      `}
                    >
                      <Flag style={{ width: "18px", height: "12px" }} />
                      <span className="font-medium">{label}</span>
                      {language === key && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme */}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className={iconBtn}
          >
            {resolvedTheme === "dark" ? <BsSun size={16} /> : <BsMoon size={16} />}
          </button>

          {/* Hamburger — mobile only */}
          <button
            ref={menuButtonRef}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="
              md:hidden
              inline-flex items-center justify-center
              w-9 h-9 rounded-full
              border border-[var(--pc-border)]
              bg-[var(--pc-bg)]
              text-[var(--pc-title)]
              transition-[background-color,border-color] duration-200
              hover:border-indigo-400/30
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
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="
              md:hidden
              absolute left-3 right-3 top-full mt-2 z-50
              rounded-2xl
              bg-white dark:bg-zinc-900
              border border-zinc-200 dark:border-zinc-700/60
              shadow-[0_16px_48px_-12px_rgba(0,0,0,0.18)]
              dark:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.7)]
              overflow-hidden
            "
          >
            {/* Nav links */}
            <div className="p-2">
              {navItems.map((it, index) => {
                const isActive = activeSection === it.id;
                return (
                  <motion.button
                    key={it.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.025, duration: 0.15 }}
                    onClick={() => scrollToSection(it.id)}
                    className={`
                      w-full flex items-center gap-3
                      px-3 py-2.5 rounded-xl
                      text-left text-sm font-medium
                      transition-colors duration-150
                      ${isActive
                        ? "text-indigo-500 bg-indigo-500/10"
                        : "text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }
                    `}
                  >
                    <span className={`
                      w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors duration-150
                      ${isActive ? "bg-indigo-500" : "bg-zinc-300 dark:bg-zinc-600"}
                    `} />
                    {it.label}
                    {isActive && (
                      <span className="ml-auto text-[10px] font-medium text-indigo-400 opacity-70">
                        ●
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Divider + Social */}
            <div className="px-2 pb-2 border-t border-zinc-200 dark:border-zinc-700/60">
              <div className="pt-2 grid grid-cols-2 gap-2">
                <a
                  href="https://github.com/gabrielcaixeta01"
                  target="_blank" rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="
                    inline-flex items-center justify-center gap-2
                    px-3 py-2.5 rounded-xl text-sm font-medium
                    border border-zinc-200 dark:border-zinc-700/60
                    text-zinc-800 dark:text-zinc-100
                    hover:bg-zinc-100 dark:hover:bg-zinc-800
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
                    border border-zinc-200 dark:border-zinc-700/60
                    text-zinc-800 dark:text-zinc-100
                    hover:bg-zinc-100 dark:hover:bg-zinc-800
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
