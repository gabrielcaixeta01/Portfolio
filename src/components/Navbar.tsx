'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="relative z-10 flex justify-between items-center px-8 py-4">
      <div className="font-bold text-lg">Portfolio</div>
      <div className="flex items-center gap-6">
        {/* seus links aqui... */}

        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="px-4 py-2 rounded bg-cyan-400 text-black dark:text-zinc-900 font-medium transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        )}
      </div>
    </nav>
  );
}