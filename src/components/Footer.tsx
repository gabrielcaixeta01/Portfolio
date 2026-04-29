"use client";

import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();

  const links = [
    { id: "sobre", label: t.navbar.about },
    { id: "timeline", label: t.navbar.timeline },
    { id: "projetos", label: t.navbar.projects },
    { id: "conhecimentos", label: t.navbar.skills },
    { id: "contato", label: t.navbar.contact },
  ];

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="w-full border-t border-white/8 bg-black/20 backdrop-blur-sm mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8">
          {/* Brand */}
          <div>
            <span className="text-lg font-semibold tracking-tight text-white/90">
              Gabriel Caixeta
            </span>
            <p className="mt-1 text-xs text-white/40 max-w-[220px]">
              {language === "pt"
                ? "Desenvolvedor full-stack focado em interfaces modernas."
                : "Full-stack developer focused on modern interfaces."}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links" className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2">
            {links.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="text-sm text-white/50 hover:text-white/90 transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Gabriel Caixeta.{" "}
            {language === "pt" ? "Todos os direitos reservados." : "All rights reserved."}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/gabriel-caixeta-romero"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="LinkedIn"
              className="text-white/40 hover:text-white/80 transition-colors"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/gabrielcaixeta01"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label="GitHub"
              className="text-white/40 hover:text-white/80 transition-colors"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href="mailto:gabrielcaixetaromero@gmail.com"
              aria-label="Email"
              className="text-white/40 hover:text-white/80 transition-colors"
            >
              <FiMail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
