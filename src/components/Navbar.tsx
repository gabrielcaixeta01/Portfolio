'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { BsSun, BsMoon } from 'react-icons/bs';
import { BR } from 'country-flag-icons/react/3x2';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="w-full backdrop-blur-sm px-8 py-4 fixed top-0 z-50 flex justify-between items-center">
      <div className="flex w-full items-center justify-evenly gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
        <ul className="flex space-x-8 text-sm font-light">
          <li>
            <button onClick={() => scrollToSection('sobre')} className="hover:text-cyan-400 transition">Sobre Mim</button>
          </li>
          <li>
            <button onClick={() => scrollToSection('projetos')} className="hover:text-cyan-400 transition">Projetos</button>
          </li>
          <li>
            <button onClick={() => scrollToSection('conhecimentos')} className="hover:text-cyan-400 transition">Conhecimentos</button>
          </li>
          <li>
            <button onClick={() => scrollToSection('contato')} className="hover:text-cyan-400 transition">Contato</button>
          </li>
        </ul>

        <div className='flex items-center px-5 min-w-fit justify-between gap-4'>
          <a href="https://github.com/gabrielcaixeta01" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/gabrielcaixetahomero" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin size={20} />
          </a>

          <BR title="Português (Brasil)" style={{ width: '24px', height: '16px' }} />

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <BsSun size={20} /> : <BsMoon size={20} />}
            </button>
          )}
        </div>
        

       
      </div>
    </nav>
  );
}