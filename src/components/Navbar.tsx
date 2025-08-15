"use client";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin, FaChevronDown, FaRocket } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import { BR, US } from "country-flag-icons/react/3x2";
import { useLanguage } from "../contexts/LanguageContext";
import { useRocket } from "../contexts/RocketContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { isRocketEnabled, toggleRocket } = useRocket();

  const [mounted, setMounted] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  // Close dropdown/menu when clicking outside (mas ignora clique no botão do menu)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Se clicou no próprio botão, não fecha aqui (deixa o onClick cuidar do toggle)
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
    setIsMobileMenuOpen(false); // Fecha o menu mobile ao navegar
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  const getCurrentFlag = () => {
    return language === "pt" ? (
      <BR
        title="Português (Brasil)"
        style={{ width: "20px", height: "14px" }}
      />
    ) : (
      <US
        title="English (United States)"
        style={{ width: "20px", height: "14px" }}
      />
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-xs border-b border-gray-200/20 dark:border-gray-700/20 py-2 px-4">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Botão hamburger (Mobile) */}
        <button
          ref={menuButtonRef}
          onMouseDown={(e) => e.stopPropagation()} // evita que o outside-fechamento dispare antes
          onClick={() => setIsMobileMenuOpen((open) => !open)} // atualização funcional
          className="md:hidden p-1.5 rounded-lg text-gray-900 dark:text-gray-100 hover:bg-gray-200/70 dark:hover:bg-gray-700/70 transition-all duration-300 relative z-50 ml-0"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {/* Ícone hamburger simples */}
          <svg
            className="w-6 h-6"
            fill="none"
            strokeWidth={2}
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navegação Desktop (esquerda) */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors duration-500 ease-in-out cursor-pointer"
          >
            {t.navbar.home}
          </button>
          <button
            onClick={() => scrollToSection("sobre")}
            className="text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors duration-500 ease-in-out cursor-pointer"
          >
            {t.navbar.about}
          </button>
          <button
            onClick={() => scrollToSection("projetos")}
            className="text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors duration-500 ease-in-out cursor-pointer"
          >
            {t.navbar.projects}
          </button>
          <button
            onClick={() => scrollToSection("conhecimentos")}
            className="text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors duration-500 ease-in-out cursor-pointer"
          >
            {t.navbar.skills}
          </button>
          <button
            onClick={() => scrollToSection("contato")}
            className="text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors duration-500 ease-in-out cursor-pointer"
          >
            {t.navbar.contact}
          </button>
        </div>

        {/* Ícones + tema + idioma (direita) */}
        <div className="flex items-center space-x-2">
          <a
            href="https://github.com/gabrielcaixeta01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-1.5 rounded-full text-gray-700 dark:text-gray-300 transition-colors duration-500 ease-in-out cursor-pointer hidden sm:block"
          >
            <FaGithub size={16} />
          </a>
          <a
            href="https://linkedin.com/in/gabriel-caixeta-romero"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-1.5 rounded-full text-gray-700 dark:text-gray-300 transition-colors duration-500 ease-in-out cursor-pointer hidden sm:block"
          >
            <FaLinkedin size={16} />
          </a>

          {/* Rocket Toggle */}
          <button
            onClick={toggleRocket}
            aria-label={
              isRocketEnabled ? "Disable rocket cursor" : "Enable rocket cursor"
            }
            className={`p-1.5 rounded-full transition-colors duration-500 ease-in-out cursor-pointer hidden sm:block ${
              isRocketEnabled
                ? "text-blue-500 dark:text-blue-400 scale-110"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            <FaRocket size={16} />
          </button>

          {/* Seletor de idioma */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen((open) => !open)}
              className="flex items-center space-x-1 p-1.5 rounded-full transition-colors duration-500 ease-in-out cursor-pointer"
              aria-label="Change language"
              aria-expanded={isLanguageDropdownOpen}
            >
              {getCurrentFlag()}
              <FaChevronDown
                size={8}
                className={`transition-all duration-500 ease-in-out text-gray-500 ${
                  isLanguageDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isLanguageDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="language-dropdown absolute right-0 mt-1 backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-lg py-2 min-w-[120px] z-40"
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
                      className="w-full px-3 py-2 text-left flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-500 ease-in-out cursor-pointer"
                    >
                      <lang.flag style={{ width: "16px", height: "11px" }} />
                      <span>{lang.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {mounted && (
            <button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              aria-label="Toggle theme"
              className="p-1.5 rounded-full text-gray-700 dark:text-gray-300 transition-colors duration-500 ease-in-out cursor-pointer"
            >
              {resolvedTheme === "dark" ? (
                <BsSun size={16} />
              ) : (
                <BsMoon size={16} />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }} // mais lento/suave
            className="mobile-menu md:hidden absolute top-full left-2 w-64 backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-lg py-2 z-40 mt-2"
          >
            {/* Links Mobile */}
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
                className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                {item.label}
              </motion.button>
            ))}

            {/* Social links Mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.2 }}
              className="pt-2 pl-2"
            >
              {[
                {
                  href: "https://github.com/gabrielcaixeta01",
                  label: "GitHub",
                },
                {
                  href: "https://linkedin.com/in/gabriel-caixeta-romero",
                  label: "LinkedIn",
                },
              ].map((link, index) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.2 }}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 block"
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
