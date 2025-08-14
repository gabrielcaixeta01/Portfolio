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
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
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
        {/* Navigation sections - Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out cursor-pointer"
          >
            {t.navbar.home}
          </button>
          <button
            onClick={() => scrollToSection("sobre")}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out cursor-pointer"
          >
            {t.navbar.about}
          </button>
          <button
            onClick={() => scrollToSection("projetos")}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out cursor-pointer"
          >
            {t.navbar.projects}
          </button>
          <button
            onClick={() => scrollToSection("conhecimentos")}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out cursor-pointer"
          >
            {t.navbar.skills}
          </button>
          <button
            onClick={() => scrollToSection("contato")}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-500 ease-in-out cursor-pointer"
          >
            {t.navbar.contact}
          </button>
        </div>

        {/* Icons and theme switcher - Right side */}
        <div className="flex items-center space-x-2">
          <a
            href="https://github.com/gabrielcaixeta01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-1.5 rounded-full text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500 ease-in-out cursor-pointer"
          >
            <FaGithub size={16} />
          </a>
          <a
            href="https://linkedin.com/in/gabriel-caixeta-romero"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-1.5 rounded-full text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500 ease-in-out cursor-pointer"
          >
            <FaLinkedin size={16} />
          </a>

          {/* Language Switcher Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center space-x-1 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500 ease-in-out cursor-pointer"
              aria-label="Change language"
            >
              {getCurrentFlag()}
              <FaChevronDown
                size={8}
                className={`transition-transform duration-500 ease-in-out text-gray-500 ${
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
              className="p-1.5 rounded-full text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500 ease-in-out cursor-pointer"
            >
              {theme === "dark" ? <BsSun size={16} /> : <BsMoon size={16} />}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
