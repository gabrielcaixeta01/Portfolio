"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const { language } = useLanguage();
  const pt = language === "pt";

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navLinks = [
    { id: "hero",          label: pt ? "Início"        : "Home"      },
    { id: "sobre",         label: pt ? "Sobre"         : "About"     },
    { id: "trajetoria",    label: pt ? "Trajetória"    : "Timeline"  },
    { id: "projetos",      label: pt ? "Projetos"      : "Projects"  },
    { id: "conhecimentos", label: pt ? "Conhecimentos" : "Skills"    },
    { id: "contato",       label: pt ? "Contato"       : "Contact"   },
  ];

  return (
    <footer className="w-full mt-8 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mb-10">

          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="
              w-8 h-8 rounded-lg
              bg-gradient-to-br from-indigo-500 to-purple-600
              flex items-center justify-center
              text-white text-[11px] font-light tracking-tight
              shadow-[0_2px_10px_rgba(99,102,241,0.35)]
            ">
              GC
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-200 leading-tight">Gabriel Caixeta</p>
              <p className="text-[11px] text-zinc-500 leading-tight">
                {pt ? "Desenvolvedor Full-Stack" : "Full-Stack Developer"}
              </p>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://github.com/gabrielcaixeta01"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="
                w-8 h-8 rounded-full
                border border-white/[0.08]
                flex items-center justify-center
                text-zinc-400
                hover:text-zinc-100 hover:border-white/20
                transition-all duration-200
              "
            >
              <FaGithub size={14} />
            </a>
            <a
              href="https://linkedin.com/in/gabriel-caixeta-romero"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="
                w-8 h-8 rounded-full
                border border-white/[0.08]
                flex items-center justify-center
                text-zinc-400
                hover:text-[#0A66C2] hover:border-[#0A66C2]/30
                transition-all duration-200
              "
            >
              <FaLinkedin size={14} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.05] mb-6" />

        {/* Copyright */}
        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} Gabriel Caixeta
          {" · "}
          {pt ? "Todos os direitos reservados." : "All rights reserved."}
        </p>

      </div>
    </footer>
  );
}
