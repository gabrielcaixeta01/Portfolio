"use client";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin, FaChevronDown } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import { BR, US } from "country-flag-icons/react/3x2";
import { useLanguage } from "../contexts/LanguageContext";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
    console.log("Language changed to:", lang);
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-xs border-b border-gray-200/20 dark:border-gray-700/20 py-2 px-6">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Mobile hamburger button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors duration-300"
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeWidth={2}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation sections - Left side */}
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

        {/* Desktop Icons and theme switcher - Right side */}
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

          {/* Language Switcher Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center space-x-1 p-1.5 rounded-full transition-colors duration-500 ease-in-out cursor-pointer"
              aria-label="Change language"
            >
              {getCurrentFlag()}
              <FaChevronDown
                size={8}
                className={`transition-all duration-500 ease-in-out text-gray-500 ${
                  isLanguageDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isLanguageDropdownOpen && (
              <div className="language-dropdown absolute right-0 mt-1 backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-xl shadow-lg py-2 min-w-[120px] z-10">
                <button
                  onClick={() => handleLanguageChange("pt")}
                  className="w-full px-3 py-2 text-left flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-500 ease-in-out cursor-pointer"
                >
                  <BR style={{ width: "16px", height: "11px" }} />
                  <span>{t.navbar.portuguese}</span>
                </button>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className="w-full px-3 py-2 text-left flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-500 ease-in-out cursor-pointer"
                >
                  <US style={{ width: "16px", height: "11px" }} />
                  <span>{t.navbar.english}</span>
                </button>
              </div>
            )}
          </div>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="p-1.5 rounded-full text-gray-700 dark:text-gray-300 transition-colors duration-500 ease-in-out cursor-pointer"
            >
              {theme === "dark" ? <BsSun size={16} /> : <BsMoon size={16} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="mobile-menu md:hidden absolute top-full left-0 w-80 max-w-[80vw] bg-white dark:bg-black border-r border-gray-200 dark:border-gray-700 shadow-lg min-h-screen"
        >
          <div className="px-6 py-4 space-y-2">
            {/* Mobile Navigation Links */}
            <button
              onClick={() => scrollToSection("hero")}
              className="block w-full text-left py-3 px-4 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              {t.navbar.home}
            </button>
            <button
              onClick={() => scrollToSection("sobre")}
              className="block w-full text-left py-3 px-4 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              {t.navbar.about}
            </button>
            <button
              onClick={() => scrollToSection("projetos")}
              className="block w-full text-left py-3 px-4 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              {t.navbar.projects}
            </button>
            <button
              onClick={() => scrollToSection("conhecimentos")}
              className="block w-full text-left py-3 px-4 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              {t.navbar.skills}
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="block w-full text-left py-3 px-4 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              {t.navbar.contact}
            </button>

            {/* Mobile Social Links as buttons */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <a
                href="https://github.com/gabrielcaixeta01"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left py-3 px-4 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/gabriel-caixeta-romero"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left py-3 px-4 rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
