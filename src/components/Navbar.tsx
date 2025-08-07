'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import { BR } from 'country-flag-icons/react/3x2';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="mb-20 top-0 w-full h-16 border-b backdrop-blur-md z-50 bg-white/70 dark:bg-black/50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">
        {/* Links */}
        <div className="flex gap-6">
          <button onClick={() => scrollToSection('sobre')} className="hover:text-cyan-400 transition">Sobre Mim</button>
          <button onClick={() => scrollToSection('projetos')} className="hover:text-cyan-400 transition">Projetos</button>
          <button onClick={() => scrollToSection('conhecimentos')} className="hover:text-cyan-400 transition">Conhecimentos</button>
          <button onClick={() => scrollToSection('contato')} className="hover:text-cyan-400 transition">Contato</button>
        </div>

        {/* Ícones */}
        <div className="flex items-center gap-4">
          <a href="https://github.com/gabrielcaixeta01" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/gabrielcaixetahomero" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin size={20} />
          </a>
          <BR title="Português (Brasil)" style={{ width: '24px', height: '16px' }} />
          {mounted && (
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
              {theme === 'dark' ? <BsSun size={20} /> : <BsMoon size={20} />}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}