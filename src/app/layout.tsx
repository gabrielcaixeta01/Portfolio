// src/app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { LanguageProvider } from "../contexts/LanguageContext";
import { RocketProvider } from "../contexts/RocketContext";
import ParticlesBackground from "../components/ParticlesBackground";
import Navbar from "../components/Navbar";
import CursorRocketWrapper from "../components/CursorRocketWrapper";

export const metadata = {
  title: "Gabriel Caixeta - Portfólio",
  description: "Portfólio de Gabriel Caixeta, desenvolvedor web full-stack.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <RocketProvider>
              <ParticlesBackground />
              <Navbar />
              <main>{children}</main>
              <CursorRocketWrapper />
            </RocketProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
