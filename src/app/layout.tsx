// src/app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { LanguageProvider } from "../contexts/LanguageContext";
import Navbar from "../components/Navbar";
import ScrollProgress from "../components/ScrollProgress";
import { Inter, Space_Grotesk } from "next/font/google";

export const metadata = {
  title: "Gabriel Caixeta — Desenvolvedor Full-Stack",
  description:
    "Portfólio de Gabriel Caixeta, desenvolvedor full-stack com foco em Next.js, TypeScript e Tailwind CSS. Estudante de Engenharia de Computação na UnB.",
  openGraph: {
    title: "Gabriel Caixeta — Desenvolvedor Full-Stack",
    description:
      "Interfaces rápidas, design consistente e código bem estruturado. Conheça os projetos e a trajetória de Gabriel Caixeta.",
    url: "https://gabrielcaixeta01.github.io/Portfolio/",
    siteName: "Gabriel Caixeta",
    images: [
      {
        url: "https://gabrielcaixeta01.github.io/Portfolio/gabriel.jpg",
        width: 1200,
        height: 630,
        alt: "Gabriel Caixeta — Desenvolvedor Full-Stack",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Caixeta — Desenvolvedor Full-Stack",
    description: "Interfaces rápidas, design consistente e código bem estruturado.",
    images: ["https://gabrielcaixeta01.github.io/Portfolio/gabriel.jpg"],
  },
  metadataBase: new URL("https://gabrielcaixeta01.github.io/Portfolio/"),
};

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${space.variable}`} suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>
          <LanguageProvider>
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
