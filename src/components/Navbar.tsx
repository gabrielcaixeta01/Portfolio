"use client";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin, FaChevronDown } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import { BR, US } from "country-flag-icons/react/3x2";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState("pt");
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
    // Here you can add logic to actually change the language content
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md py-4 px-8">
      <div className="flex items-center justify-between w-full">
        {/* Navigation sections - Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => scrollToSection("sobre")}
            className="transition-colors duration-200"
          >
            Sobre Mim
          </button>
          <button
            onClick={() => scrollToSection("projetos")}
            className="transition-colors duration-200"
          >
            Projetos
          </button>
          <button
            onClick={() => scrollToSection("conhecimentos")}
            className="transition-colors duration-200"
          >
            Conhecimentos
          </button>
          <button
            onClick={() => scrollToSection("contato")}
            className="transition-colors duration-200"
          >
            Contato
          </button>
        </div>

        {/* Icons and theme switcher - Right side */}
        <div className="flex items-center space-x-2">
          <a
            href="https://github.com/gabrielcaixeta01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors duration-200"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com/in/gabriel-caixeta-romero"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors duration-200"
          >
            <FaLinkedin size={20} />
          </a>

          {/* Language Switcher Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center space-x-1 px-2 py-1 transition-colors duration-200"
              aria-label="Change language"
            >
              {getCurrentFlag()}
              <FaChevronDown
                size={10}
                className={`transition-transform duration-200 ${
                  isLanguageDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isLanguageDropdownOpen && (
              <div className="language-dropdown absolute right-0 mt-2 backdrop-blur-md rounded-lg shadow-lg py-3 min-w-[140px] z-10">
                <button
                  onClick={() => handleLanguageChange("pt")}
                  className={`w-full px-4 py-3 mb-1 text-left flex items-center space-x-3 transition-colors duration-200`}
                >
                  <BR style={{ width: "18px", height: "13px" }} />
                  <span className="text-sm">Português</span>
                </button>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-colors duration-200`}
                >
                  <US style={{ width: "18px", height: "13px" }} />
                  <span className="text-sm">English</span>
                </button>
              </div>
            )}
          </div>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="transition-colors duration-200"
            >
              {theme === "dark" ? <BsSun size={20} /> : <BsMoon size={20} />}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
