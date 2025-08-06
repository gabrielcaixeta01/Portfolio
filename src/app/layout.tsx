// src/app/layout.tsx
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';
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
    <html>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}