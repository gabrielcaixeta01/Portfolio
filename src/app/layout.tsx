// src/app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { LanguageProvider } from "../contexts/LanguageContext";
import ParticlesBackground from "../components/ParticlesBackground";
import Navbar from "../components/Navbar";
import { Inter, Space_Grotesk } from "next/font/google";

export const metadata = {
  title: "Gabriel Caixeta - Portfólio",
  description: "Portfólio de Gabriel Caixeta, desenvolvedor web full-stack.",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
 });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${space.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>
          <LanguageProvider>
            <ParticlesBackground />
            <Navbar />
            <main>{children}</main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
