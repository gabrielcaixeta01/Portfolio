"use client";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin, FaChevronDown} from "react-icons/fa";
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

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

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

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  const getCurrentFlag = () => {
    return language === "pt" ? (
      <BR title="Português (Brasil)" style={{ width: "20px", height: "14px" }} />
    ) : (
      <US title="English (United States)" style={{ width: "20px", height: "14px" }} />
    );
  };

  return (
    <nav
      className={
        [
          "fixed top-0 left-0 w-full z-50",
          "bg-transparent",
          "px-4 py-2",
          "backdrop-blur-xs",
          // border bottom por tema (equivalente ao CSS)
          "border-b",
          "border-gray-300 dark:border-gray-600",
          // transição de cor global nos itens
          "transition-colors duration-200 ease-linear",
        ].join(" ")
      }
    >
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Hamburger (Mobile) */}
        <button
          ref={menuButtonRef}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className={[
            "md:hidden relative z-50 ml-0",
            "p-1.5 rounded-lg",
            "text-gray-900 dark:text-gray-50",
            "hover:bg-gray-300/20 dark:hover:bg-gray-500/20",
            "transition-all duration-200",
          ].join(" ")}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg className="w-6 h-6" fill="none" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Navegação Desktop (esquerda) */}
        <div className="hidden md:flex items-center space-x-2">
          {[
            { id: "hero", label: t.navbar.home },
            { id: "sobre", label: t.navbar.about },
            { id: "projetos", label: t.navbar.projects },
            { id: "conhecimentos", label: t.navbar.skills },
            { id: "contato", label: t.navbar.contact },
          ].map((item) => (
            // dentro do map(...)
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="nav-link text-sm font-medium px-4 py-2 rounded-full
                        transition-colors duration-200 text-gray-900 dark:text-gray-200"
            >
              <span className="nav-label inline-block
                              group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600
                              group-hover:bg-clip-text group-hover:text-transparent
                              transition-[color,background] duration-200">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Lado direito: ícones / idioma / tema */}
        <div className="flex items-center space-x-2">
          <a
            href="https://github.com/gabrielcaixeta01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden sm:block p-1.5 rounded-full text-gray-900 dark:text-gray-200 transition-colors duration-200 hover:text-indigo-600"
          >
            <FaGithub size={16} />
          </a>
          <a
            href="https://linkedin.com/in/gabriel-caixeta-romero"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden sm:block p-1.5 rounded-full text-gray-900 dark:text-gray-200 transition-colors duration-200 hover:text-indigo-600"
          >
            <FaLinkedin size={16} />
          </a>

          {/* Idioma */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen((open) => !open)}
              className="flex items-center space-x-1 p-1.5 rounded-full transition-colors duration-200 hover:text-violet-500"
              aria-label="Change language"
              aria-expanded={isLanguageDropdownOpen}
            >
              {getCurrentFlag()}
              <FaChevronDown
                size={10}
                className={`text-gray-500 transition-transform duration-200 ${isLanguageDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isLanguageDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={[
                    "absolute right-0 mt-1 z-40 min-w-[120px] rounded-xl shadow-lg py-2",
                    // fundo/borda por tema (equivalente ao CSS)
                    "backdrop-blur-lg",
                    "bg-white/95 dark:bg-slate-800/95",
                    "border border-gray-300 dark:border-gray-600",
                  ].join(" ")}
                >
                  {[
                    { key: "pt", flag: BR, label: t.navbar.portuguese },
                    { key: "en", flag: US, label: t.navbar.english },
                  ].map((lang, index) => (
                    <motion.button
                      key={lang.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      onClick={() => handleLanguageChange(lang.key)}
                      className={[
                        "w-full px-3 py-2 text-left flex items-center space-x-2 text-sm",
                        "text-gray-800 dark:text-gray-200",
                        // sem background no hover (como no CSS): pode manter leve highlight sutil
                        "hover:bg-transparent",
                        "cursor-pointer",
                      ].join(" ")}
                    >
                      <lang.flag style={{ width: "16px", height: "11px" }} />
                      <span>{lang.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="p-1.5 rounded-full text-gray-700 dark:text-gray-300 transition-colors duration-200 hover:text-indigo-600"
            >
              {resolvedTheme === "dark" ? <BsSun size={16} /> : <BsMoon size={16} />}
            </button>
          )}
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
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={[
              "md:hidden absolute left-2 top-full mt-2 w-64 z-40",
              "rounded-xl shadow-lg py-2",
              "backdrop-blur-lg",
              "bg-white/95 dark:bg-slate-800/95",
              "border border-gray-300 dark:border-gray-600",
            ].join(" ")}
          >
            {/* Links */}
            {[
              { key: "hero", label: t.navbar.home },
              { key: "sobre", label: t.navbar.about },
              { key: "projetos", label: t.navbar.projects },
              { key: "conhecimentos", label: t.navbar.skills },
              { key: "contato", label: t.navbar.contact },
            ].map((item, index) => (
              <motion.button
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                onClick={() => scrollToSection(item.key)}
                className="w-full px-4 py-2 text-left text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200/10 dark:hover:bg-white/5 transition-colors duration-200"
              >
                {item.label}
              </motion.button>
            ))}

            {/* Social */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.2 }} className="pt-2 pl-2">
              {[
                { href: "https://github.com/gabrielcaixeta01", label: "GitHub" },
                { href: "https://linkedin.com/in/gabriel-caixeta-romero", label: "LinkedIn" },
              ].map((link, index) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.2 }}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-200/10 dark:hover:bg-white/5 transition-colors duration-200"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}