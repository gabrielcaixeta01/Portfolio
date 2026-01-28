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

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  // Scroll: dá “presença” premium quando sai do topo
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ESC fecha menus
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

  // click outside
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
      { id: "hero", label: t.navbar.home },
      { id: "sobre", label: t.navbar.about },
      { id: "timeline", label: t.navbar.timeline },
      { id: "projetos", label: t.navbar.projects },
      { id: "conhecimentos", label: t.navbar.skills },
      { id: "contato", label: t.navbar.contact },
    ],
    [t]
  );

  if (!mounted) {
    return (
      <nav
        className="
          fixed top-0 left-0 w-full z-50
          px-4 py-3
          bg-transparent
          border-b border-gray-200/40 dark:border-white/10
          backdrop-blur-md
        "
      >
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <button
            className="
              md:hidden p-2 rounded-xl
              text-gray-900 dark:text-gray-50
              opacity-70
            "
            disabled
          >
            <svg className="w-6 h-6" fill="none" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="hidden md:flex items-center space-x-2" />
          <div className="hidden md:flex items-center space-x-4" />
        </div>
      </nav>
    );
  }

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  const getCurrentFlag = () =>
    language === "pt" ? (
      <BR title="Português (Brasil)" style={{ width: "18px", height: "12px" }} />
    ) : (
      <US title="English (United States)" style={{ width: "18px", height: "12px" }} />
    );

  const glassNav = `
    fixed top-0 left-0 w-full z-50
    px-4 py-3
    transition-[background-color,border-color,box-shadow] duration-200 ease-out
    backdrop-blur-md
    ${isScrolled
      ? "bg-[var(--pc-bg)] border-b border-[var(--pc-border)] shadow-[var(--pc-shadow)]"
      : "bg-transparent border-b border-transparent"}
  `;

  const iconBtn = `
    inline-flex items-center justify-center
    w-9 h-9 rounded-full
    border border-transparent
    text-[var(--pc-title)]
    bg-white/0
    hover:bg-[var(--pc-bg)] hover:border-[var(--pc-border)]
    transition-[transform,background-color,border-color,color] duration-200
    hover:scale-[1.04]
    focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-indigo-500/40
  `;

  const desktopLink = `
    relative
    px-4 py-2
    rounded-full
    text-sm font-medium
    text-[var(--pc-title)]
    hover:text-[var(--pc-title)]
    transition-colors duration-200
    focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-indigo-500/35
  `;

  return (
    <nav className={glassNav}>
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Left: Mobile menu */}
        <div className="flex items-center gap-2">
          <button
            ref={menuButtonRef}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className={`
              md:hidden
              inline-flex items-center justify-center
              w-10 h-10 rounded-xl
              border border-[var(--pc-border)]
              bg-[var(--pc-bg)]
              text-[var(--pc-title)]
              backdrop-blur
              transition-[transform,background-color] duration-200
              active:scale-[0.98]
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-indigo-500/40
            `}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Center: Desktop nav */}
        <div className="hidden md:flex items-center justify-center gap-2">
          <div
            className="
              inline-flex items-center gap-1
              rounded-full
              border border-[var(--pc-border)]
              bg-[var(--pc-bg)]
              backdrop-blur
              p-1
            "
          >
            {navItems.map((it) => (
              <button
                key={it.id}
                onClick={() => scrollToSection(it.id)}
                className={desktopLink}
              >
                <span className="relative z-10">{it.label}</span>

                {/* hover highlight “premium” */}
                <span
                  className="
                    absolute inset-0
                    rounded-full
                    opacity-0
                    group-hover:opacity-100
                  "
                />

                <span
                  className="
                    pointer-events-none
                    absolute inset-0 rounded-full
                    opacity-0 hover:opacity-100
                    transition-opacity duration-200
                    bg-[radial-gradient(60%_80%_at_50%_0%,rgba(99,102,241,0.22),transparent_70%)]
                  "
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: icons / language / theme */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/gabrielcaixeta01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={`hidden sm:inline-flex ${iconBtn}`}
          >
            <FaGithub size={16} />
          </a>

          <a
            href="https://linkedin.com/in/gabriel-caixeta-romero"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`hidden sm:inline-flex ${iconBtn}`}
          >
            <FaLinkedin size={16} />
          </a>

          {/* Language */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen((open) => !open)}
              className={`
                inline-flex items-center gap-2
                px-3 h-9 rounded-full
                border border-white/10
                bg-white/8 dark:bg-white/6
                backdrop-blur
                text-gray-900/90 dark:text-gray-100/85
                transition-[transform,background-color,border-color] duration-200
                hover:bg-white/12 dark:hover:bg-white/10
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-indigo-500/40
              `}
              aria-label="Change language"
              aria-expanded={isLanguageDropdownOpen}
            >
              {getCurrentFlag()}
              <FaChevronDown
                size={10}
                className={`text-[var(--pc-text)] transition-transform duration-200 ${
                  isLanguageDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isLanguageDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="
                    absolute right-0 mt-2 z-50 min-w-[170px]
                    rounded-2xl
                    bg-[var(--pc-bg)]
                    border border-[var(--pc-border)]
                    shadow-[var(--pc-shadow)]
                    backdrop-blur-xl
                    overflow-hidden
                  "
                >
                  {[
                    { key: "pt", flag: BR, label: t.navbar.portuguese },
                    { key: "en", flag: US, label: t.navbar.english },
                  ].map((lang, idx) => (
                    <motion.button
                      key={lang.key}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.18 }}
                      onClick={() => handleLanguageChange(lang.key)}
                      className="
                        w-full px-4 py-3
                        text-left text-sm
                        flex items-center gap-2
                        text-[var(--pc-title)]
                        hover:bg-[var(--pc-bg)]
                        transition-colors
                      "
                    >
                      <lang.flag style={{ width: "18px", height: "12px" }} />
                      <span className="font-medium">{lang.label}</span>
                    </motion.button>
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
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="
              md:hidden
              absolute left-4 right-4 top-full mt-2 z-50
              rounded-2xl
              bg-[var(--pc-bg)]
              border border-[var(--pc-border)]
              shadow-[var(--pc-shadow)]
              backdrop-blur-xl
              overflow-hidden
            "
          >
            <div className="p-2">
              {navItems.map((it, index) => (
                <motion.button
                  key={it.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.18 }}
                  onClick={() => scrollToSection(it.id)}
                  className="
                    w-full px-3 py-3
                    text-left text-sm font-medium
                    rounded-xl
                    text-[var(--pc-title)]
                    hover:bg-[var(--pc-bg)]
                    transition-colors
                  "
                >
                  {it.label}
                </motion.button>
              ))}

              <div className="mt-2 grid grid-cols-2 gap-2">
                <a
                  href="https://github.com/gabrielcaixeta01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center justify-center gap-2
                    px-3 py-3 rounded-xl
                    border border-[var(--pc-border)]
                    bg-[var(--pc-bg)]
                    text-[var(--pc-title)]
                    hover:bg-[var(--pc-bg)]
                    transition-colors
                  "
                >
                  <FaGithub size={16} />
                  GitHub
                </a>

                <a
                  href="https://linkedin.com/in/gabriel-caixeta-romero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center justify-center gap-2
                    px-3 py-3 rounded-xl
                    border border-[var(--pc-border)]
                    bg-[var(--pc-bg)]
                    text-[var(--pc-title)]
                    hover:bg-[var(--pc-bg)]
                    transition-colors
                  "
                >
                  <FaLinkedin size={16} />
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