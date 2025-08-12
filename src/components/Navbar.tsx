"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import { BR } from "country-flag-icons/react/3x2";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-white/20 dark:border-white/10 py-6 px-8">
      <div className="flex items-center justify-between w-full">
        {/* Navigation sections - Left side */}
        <div className="flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("sobre")}
            className="text-black dark:text-white hover:text-cyan-400 transition-colors duration-200"
          >
            Sobre Mim
          </button>
          <button
            onClick={() => scrollToSection("projetos")}
            className="text-black dark:text-white hover:text-cyan-400 transition-colors duration-200"
          >
            Projetos
          </button>
          <button
            onClick={() => scrollToSection("conhecimentos")}
            className="text-black dark:text-white hover:text-cyan-400 transition-colors duration-200"
          >
            Conhecimentos
          </button>
          <button
            onClick={() => scrollToSection("contato")}
            className="text-black dark:text-white hover:text-cyan-400 transition-colors duration-200"
          >
            Contato
          </button>
        </div>

        {/* Icons and theme switcher - Right side */}
        <div className="flex items-center space-x-6">
          <a
            href="https://github.com/gabrielcaixeta01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-black dark:text-white hover:text-cyan-400 transition-colors duration-200"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com/in/gabriel-caixeta-romero"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-black dark:text-white hover:text-cyan-400 transition-colors duration-200"
          >
            <FaLinkedin size={20} />
          </a>
          <BR
            title="Português (Brasil)"
            style={{ width: "24px", height: "16px" }}
          />
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="text-black dark:text-white hover:text-cyan-400 transition-colors duration-200"
            >
              {theme === "dark" ? <BsSun size={20} /> : <BsMoon size={20} />}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
