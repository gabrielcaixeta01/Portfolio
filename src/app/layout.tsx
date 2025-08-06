// src/app/layout.tsx
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';
import ParticlesBackground from '../components/ParticlesBackground';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Meu Portfólio',
  description: 'Descrição aqui',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ParticlesBackground />
          <div className="relative z-10">
            <Navbar />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}