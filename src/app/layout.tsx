// src/app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import ParticlesBackground from "../components/ParticlesBackground";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Meu Portfólio",
  description: "Descrição aqui",
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
          <ParticlesBackground />
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
