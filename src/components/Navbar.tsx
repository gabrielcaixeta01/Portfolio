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
    <nav className="fixed flex flex-row items-center justify-around top-0 left-0 w-full z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
          <button onClick={() => scrollToSection('sobre')} className="hover:text-cyan-400 transition">Sobre Mim</button>
          <button onClick={() => scrollToSection('projetos')} className="hover:text-cyan-400 transition">Projetos</button>
          <button onClick={() => scrollToSection('conhecimentos')} className="hover:text-cyan-400 transition">Conhecimentos</button>
          <button onClick={() => scrollToSection('contato')} className="hover:text-cyan-400 transition">Contato</button>
       
          <a href="https://github.com/gabrielcaixeta01" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/gabriel-caixeta-romero" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin size={20} />
          </a>
          <BR title="Português (Brasil)" style={{ width: '24px', height: '16px' }} />
          {mounted && (
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
              {theme === 'dark' ? <BsSun size={20} /> : <BsMoon size={20} />}
            </button>
          )}
    </nav>
  );
}