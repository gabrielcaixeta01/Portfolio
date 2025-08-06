'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 50); // pequeno delay evita flick
    return () => clearTimeout(timeout);
  }, []);

  return (
    <nav
      className={`flex justify-between items-center px-8 py-4 transition-all duration-500 ${
        mounted ? 'opacity-100' : 'opacity-0'
      } bg-white text-black dark:bg-zinc-900 dark:text-white`}
    >
      <div className="font-bold text-xl">Portfolio</div>
      <ul className="flex gap-8 list-none m-0 p-0">
        {navItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className="hover:text-cyan-400 transition-colors"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="ml-8 px-4 py-2 rounded bg-cyan-400 text-black dark:bg-white dark:text-zinc-900 font-medium transition-all"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
};

export default Navbar;